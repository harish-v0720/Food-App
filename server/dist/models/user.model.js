"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        default: "Update your address",
    },
    city: {
        type: String,
        default: "Update your city",
    },
    country: {
        type: String,
        default: "Update your country",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    admin: {
        type: Boolean,
        default: false,
    },
    // advance authentication
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
