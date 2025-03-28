import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
   const {loading,forgotPassword } = useUserStore();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
     try {
      await forgotPassword(email)
      navigate("/login");
     } catch (error) {
      console.log(error)
     }
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form onSubmit={forgotPasswordHandler} className="flex flex-col gap-5  md:p-8 w-full max-w-md rounded-lg">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">
            Enter your email address to reset your password
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="email"
            value={email}
            onChange={(e:React.ChangeEvent<HTMLInputElement> ) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="pl-10"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
        </div>
        {
          loading ? <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button> : <Button type="submit" className="bg-orange hover:bg-hoverOrange">Send Reset Link</Button>
        }
        <span className="text-center">
          Back to {" "}
          <Link to={"/Login"} className="text-blue-500">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
