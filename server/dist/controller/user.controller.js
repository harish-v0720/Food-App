"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.checkAuth = exports.resetPassword = exports.forgotPassword = exports.logout = exports.verifyEmail = exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const generateVerificationCode_1 = require("../utils/generateVerificationCode");
const generateToken_1 = require("../utils/generateToken");
const email_1 = require("../mailtrap/email");
const signup = async (req, res) => {
    try {
        const { fullName, email, password, contact, admin } = req.body;
        console.log(fullName, email, password, contact, admin);
        let user = await user_model_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const verificationToken = (0, generateVerificationCode_1.generateVerificationCode)();
        user = await user_model_1.default.create({
            fullName,
            email,
            password: hashedPassword,
            contact: Number(contact),
            admin,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        (0, generateToken_1.generateToken)(res, user);
        await (0, email_1.sendVerificationEmail)(email, verificationToken);
        const userWithoutPassword = await user_model_1.default
            .findOne({ email })
            .select("-password");
        return res.status(201).json({
            success: true,
            message: "Account created. Please verify your email",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Incorrect Email" });
        }
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Incorrect Password" });
        }
        (0, generateToken_1.generateToken)(res, user);
        user.lastLogin = new Date();
        await user.save();
        // send user without password
        const userWithoutPassword = await user_model_1.default
            .findOne({ email })
            .select("-password");
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullName}`,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.login = login;
const verifyEmail = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        const user = await user_model_1.default
            .findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() },
        })
            .select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token",
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        // send welcome email
        await (0, email_1.sendWelcomeEmail)(user.email, user.fullName);
        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.verifyEmail = verifyEmail;
const logout = async (_, res) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.logout = logout;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: true,
                message: "User doesn't exist",
            });
        }
        const resetToken = crypto_1.default.randomBytes(40).toString("hex");
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); //1HR
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();
        // send email
        await (0, email_1.sendPasswordResetEmail)(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);
        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await user_model_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token",
            });
        }
        // update password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        // send success reset email
        await (0, email_1.sendResetSuccessEmail)(user.email);
        return res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.resetPassword = resetPassword;
const checkAuth = async (req, res) => {
    try {
        console.log(req.id);
        const userId = req.id;
        const user = await user_model_1.default.findById(userId).select("-password");
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.checkAuth = checkAuth;
const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { fullName, email, address, city, country, profilePicture } = req.body;
        // uoload image on cloudinary
        let cloudResponse;
        try {
            console.log(fullName, email, address, city, country);
            cloudResponse = await cloudinary_1.default.uploader.upload(profilePicture);
            const updatedData = {
                fullName,
                email,
                address,
                city,
                country,
                profilePicture,
            };
            const user = await user_model_1.default
                .findByIdAndUpdate(userId, updatedData, { new: true })
                .select("-password");
            return res.status(200).json({
                success: true,
                user,
                message: "Profile updated successfully",
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;
