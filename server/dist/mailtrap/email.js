"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const htmlEmail_1 = require("./htmlEmail");
const mailtrap_1 = require("./mailtrap");
const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const res = await mailtrap_1.client.send({
            from: mailtrap_1.sender,
            to: recipient,
            subject: "Verify your email",
            html: htmlEmail_1.htmlContent.replace("{verificationToken}", verificationToken),
            category: "Email Verification",
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification");
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    const htmlContent = (0, htmlEmail_1.generateWelcomeEmailHtml)(name);
    try {
        const res = await mailtrap_1.client.send({
            from: mailtrap_1.sender,
            to: recipient,
            subject: "Welcome to Foodie Faster",
            html: htmlContent,
            template_variables: {
                company_info_name: "Foodie Faster",
                name: name,
            },
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email");
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    const htmlContent = (0, htmlEmail_1.generatePasswordResetEmailHtml)(resetURL);
    try {
        const res = await mailtrap_1.client.send({
            from: mailtrap_1.sender,
            to: recipient,
            subject: "Reset your password",
            html: htmlContent,
            category: "Reset Password",
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to reset password");
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    const htmlContent = (0, htmlEmail_1.generateResetSuccessEmailHtml)();
    try {
        const res = await mailtrap_1.client.send({
            from: mailtrap_1.sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: htmlContent,
            category: "Password Reset",
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to send password reset success email");
    }
};
exports.sendResetSuccessEmail = sendResetSuccessEmail;
