import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productName: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    productImg: [
        {
            Url: { type: String, required: true },
            public_id: { type: String, required: true }
        }
    ]


}, { timestamps: true })

const product = mongoose.model("product", productSchema)
export default product;