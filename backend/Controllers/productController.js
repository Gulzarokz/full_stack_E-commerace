
import product from "../Models/productModel.js";
import dataUri from "../Utils/dataUri.js";
import upload from 'cloudinary'
import cloudinary from "../Utils/cloudinary.js";
export const addProduct = async (req, res) => {
    try {
        // console.log("BODY:", req.body);
        // console.log("FILES:", req.files);

        const { productName, productDesc, productPrice, category, brand } = req.body
        const userid = req.id;

        if (!productName || !productDesc || !productPrice || !category || !brand) {
            return res.status(403).json({
                success: false,
                message: "All fields are required "
            })
        }

        //uploading multiple images to cloudinary
        const productImg = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const fileUri = dataUri(file);
                const result = await cloudinary.uploader.upload(fileUri, {
                    folder: "productImages"
                });

                productImg.push({
                    Url: result.secure_url,
                    public_id: result.public_id
                })
            }
        }
        // create a new product in DB
        const newProduct = new product({
            userid,
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            productImg
        })

        await newProduct.save();


        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export const deleteProducts = async (req, res) => {
    try {
        const { productId } = req.params;

        console.log("Product ID:", productId);

        const deleteProduct = await product.findById(productId);

        if (!deleteProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Save images before deleting product
        const images = deleteProduct.productImg || [];

        // Delete product from MongoDB
        await product.findByIdAndDelete(productId);

        // Delete images from Cloudinary
        for (const img of images) {
            try {
                await cloudinary.uploader.destroy(img.public_id);
                console.log("Cloudinary image deleted:", img.public_id);
            } catch (cloudinaryError) {
                console.log(
                    "Cloudinary delete failed:",
                    cloudinaryError.message
                );
            }
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log("Delete product error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProducts = async (req, res) => {
    try {
        const { productId } = req.params;

        const {
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            existingImages
        } = req.body;

        // Find product
        const existingProduct = await product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let updatedImages = [];

        // Handle existing images
        if (existingImages) {
            const keepIds = JSON.parse(existingImages);

            updatedImages = existingProduct.productImg.filter((img) =>
                keepIds.includes(img.public_id)
            );

            const removeImages = existingProduct.productImg.filter(
                (img) => !keepIds.includes(img.public_id)
            );

            // Delete removed images from Cloudinary
            for (const img of removeImages) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        } else {
            updatedImages = existingProduct.productImg;
        }

        // Handle new images
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {

                const fileUri = dataUri(file);

                const result = await cloudinary.uploader.upload(
                    fileUri.content,
                    {
                        folder: "mern-stack"
                    }
                );

                updatedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }

        // Update product
        existingProduct.productName =
            productName || existingProduct.productName;

        existingProduct.productDesc =
            productDesc || existingProduct.productDesc;

        existingProduct.productPrice =
            productPrice || existingProduct.productPrice;

        existingProduct.category =
            category || existingProduct.category;

        existingProduct.brand =
            brand || existingProduct.brand;

        existingProduct.productImg = updatedImages;

        await existingProduct.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: existingProduct
        });

    } catch (error) {
        console.error("Update product error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};