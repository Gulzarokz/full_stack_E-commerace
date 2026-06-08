import { session } from "../Models/sessionModel.js";
import User from "../Models/userModel.js";
import { sendEmail } from "../emailVerifies/verfiesEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
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
        message: 'Welcome back ${existingUser}',
        user: existingUser,
        accessToken,
        refreshToken
    })
}