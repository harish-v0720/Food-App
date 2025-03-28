import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyholeIcon, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {

  const navigate = useNavigate();
  const {token} = useParams();
  const [newPassword, setNewPassword] = useState<string>("");

  const {loading, resetPassword } = useUserStore();

  const resetPasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     await resetPassword( token ,newPassword)
     navigate("/login")
    } catch (error) {
     console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form onSubmit={resetPasswordHandler} className="flex flex-col gap-5  md:p-8 w-full max-w-md rounded-lg">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">
          Enter your new password to reset your password
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="pl-10"
          />
          <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
        </div>
        {
          loading ? <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button> : <Button className="bg-orange hover:bg-hoverOrange">Reset</Button>
        }
        <span className="text-center">
          Back to {" "}
          <Link to={"/Login"} className="text-blue-500">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
