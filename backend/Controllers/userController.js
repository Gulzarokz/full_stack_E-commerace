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