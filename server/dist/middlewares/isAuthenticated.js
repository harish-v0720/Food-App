"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        // verify the token
        const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        // check is decoding was successful
        if (!decode) {
            return res.status(200).json({
                success: false,
                message: "Invalid Token",
            });
        }
        req.id = decode.userId;
        next();
    }
    catch (error) {
        next(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
exports.isAuthenticated = isAuthenticated;
