import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePic: { type: String, default: "" },
    profilePicId: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    token: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    otp: { type: String, default: "" },
    otpExpiry: { type: Date, default: null },
    Address: { type: String },
    City: { type: String },
    ZipCode: { type: String },
    phoneNumber: { type: String }


}
    , { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;