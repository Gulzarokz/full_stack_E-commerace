import { session } from "../Models/sessionModel.js";
import User from "../Models/userModel.js";
import { sendOTPMail } from "../emailVerifies/sendOTPMail.js";
import { sendEmail } from "../emailVerifies/verfiesEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        const verifyToken = jwt.sign({ id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        sendEmail(verifyToken, email);
        newUser.token = verifyToken;
        // console.log("Generated Token:", verifyToken);

        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });


    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error" });
    }

}

export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }

        const token = authHeader.split(" ")[1];
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token has expired"
                });
            }

            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.token = false;
        user.isVerified = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const reverify = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
        )

        user.token = token;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email varify successfully",
            token: user.token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }

}

export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All field are required"
        })
    }

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        return res.status(400).json({
            success: false,
            message: "User not exist"
        })
    }

    const isMatchPassword = await bcrypt.compare(password, existingUser.password)
    if (!isMatchPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid credential"
        })
    }

    const accessToken = await jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '10d' })
    const refreshToken = await jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    existingUser.isLoggedIn = true;
    await existingUser.save();


    const existingSession = await session.findOne({ userId: existingUser._id })
    if (existingSession) {
        await session.deleteOne({ userId: existingUser._id })
    }

    await session.create({
        userId: existingUser._id
    })

    return res.status(200).json({
        success: true,
        message: 'User login successfully',
        user: existingUser,
        accessToken,
        refreshToken
    })
}


export const logout = async (req, res) => {
    try {
        const userId = req.id;
        await session.deleteMany({ userId: userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });

        return res.status(200).json({
            success: true,
            message: "loggout successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save();
        await sendOTPMail(otp, email)

        return res.status(200).json({
            success: true,
            message: "Otp sent to your email successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    const email = req.params.email;
    if (!otp) {
        return res.status(400).json({
            success: false,
            message: "otp is required"
        })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User is not found"
        })
    }
    if (!user.otp || !user.otpExpiry) {
        return res.status(400).json({
            success: false,
            message: "otp is not generated or already verified"
        })
    }

    if (user.otpExpiry < new Date()) {
        return res.status(400).json({
            success: false,
            message: "otp has expired please request for new one"
        })
    }

    if (otp !== user.otp) {
        return res.status(400).json({
            success: false,
            message: "otp is invalid"
        })
    }
    user.otp = null
    user.otpExpiry = null
    await user.save();

    return res.status(200).json({
        success: false,
        message: "otp is verified successfully"
    })

}


export const changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body
    const { email } = req.params
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    if (!newPassword || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "passwrod don't match"
        })
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashPassword
    await user.save();

    return res.status(200).json({
        success: false,
        message: "Password change successfully"
    })
}
// CRUD opeations 

export const Allusers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId).select("-password -otp -otpExpiry -token")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const updateUser = async (req, res) => {
    try {
        const userIdToUpdate = req.params.userId;
        const loggedInUser = req.user;

        console.log("Logged user:", loggedInUser);
        console.log("Logged user ID:", loggedInUser?._id);
        console.log("User ID to update:", userIdToUpdate);
        console.log("Role:", loggedInUser?.role);

        const {
            firstname,
            lastname,
            address,
            zipCode,
            city,
            phoneNo,
            role,
        } = req.body || {};

        // Check authentication
        if (!loggedInUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login first.",
            });
        }

        // Authorization
        const isOwner =
            loggedInUser._id.toString() === userIdToUpdate;

        const isAdmin =
            loggedInUser.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this user",
            });
        }

        // Find user
        const user = await User.findById(userIdToUpdate);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update text fields
        user.firstname = firstname ?? user.firstname;
        user.lastname = lastname ?? user.lastname;
        user.address = address ?? user.address;
        user.zipCode = zipCode ?? user.zipCode;
        user.city = city ?? user.city;
        user.phoneNo = phoneNo ?? user.phoneNo;

        // Only admin can change role
        if (isAdmin && role) {
            user.role = role;
        }

        // Existing profile picture
        let profilePicUrl = user.profilePic;
        let profilePicPublicId = user.profilePicPublicId;

        // New profile picture
        if (req.file) {

            // Delete old Cloudinary image
            if (profilePicPublicId) {
                await cloudinary.uploader.destroy(
                    profilePicPublicId
                );
            }

            // Upload new image to Cloudinary
            const uploadResult = await new Promise(
                (resolve, reject) => {

                    const uploadStream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: "profile_pics",
                            },
                            (error, result) => {

                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result);
                                }

                            }
                        );

                    uploadStream.end(req.file.buffer);
                }
            );

            // Get Cloudinary information
            profilePicUrl = uploadResult.secure_url;
            profilePicPublicId = uploadResult.public_id;
        }

        // Save profile picture
        user.profilePic = profilePicUrl;

        // IMPORTANT:
        // Use the SAME field name everywhere
        user.profilePicPublicId = profilePicPublicId;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User Profile updated successfully",
            user,
        });

    } catch (error) {

        console.error("Update user error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
