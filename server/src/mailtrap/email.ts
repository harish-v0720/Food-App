import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml } from "./htmlEmail";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (email:string, verificationToken:string) =>{
 const recipient = [{email}];
 const htmlContent = "<p>Click here to verify: {verificationToken}</p>";
 try {
  const res = await client.send({
    from:sender,
    to:recipient,
    subject: 'Verify ypu email',
    html:htmlContent.replace("{verificationToken}", verificationToken),
    category:'Email Verification'
  })
 } catch (error) {
  console.log(error)
  throw new Error("Failed to send email verification")
 }
}
export const sendWelcomeEmail = async(email:string, name: string) => {
  const recipient = [{email}];
  const htmlContent = generateWelcomeEmailHtml(name) ;
  try {
   const res = await client.send({
     from:sender,
     to:recipient,
     subject: 'Welcome to Foodie Faster',
     html:htmlContent,
     template_variables:{
      company_info_name: "Foodie Faster",
      name:name,
     }
   })
  } catch (error) {
   console.log(error)
   throw new Error("Failed to send welcome email")
  }
}

export const sendPasswordResetEmail = async (email:string, resetURL:string)=> {
  const recipient = [{email}];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  try {
   const res = await client.send({
     from:sender,
     to:recipient,
     subject: 'Reset your password',
     html:htmlContent,
     category:"Reset Password"
   })
  } catch (error) {
   console.log(error)
   throw new Error("Failed to send reset password email")
  }
}
export const sendResetSuccessEmail = async (email:string)=> {
  const recipient = [{email}];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
   const res = await client.send({
     from:sender,
     to:recipient,
     subject: 'Password reset successfully',
     html:htmlContent,
     category:"Reset Password"
   })
  } catch (error) {
   console.log(error)
   throw new Error("Failed to send password reset success email")
  }
}