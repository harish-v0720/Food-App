import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {  Loader2, LockKeyhole, Mail, PhoneCall, User } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

const Signup = () => {

  //const loading = false;

  const [input, setInput] = useState<SignupInputState>({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    admin: false,
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const {signup, loading} = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setInput({...input, [name]:value})
  }

  const toggleAdmin = () => {
    setInput({...input, admin: !input.admin})
  };

  const loginSubmitHandler = async (e:FormEvent) => {
    e.preventDefault();
    // form validation check
    const result = userSignupSchema.safeParse(input);
    if(!result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>)
      return;
    }
    // login api implementation start here
    try {
      await signup(input);
      navigate("/verify-email")
    } catch (error) {
      navigate("/signup")
      console.log(error)
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form onSubmit={loginSubmitHandler} className="md: p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">FOODIE FASTER</h1>
        </div>
        <div className="mb-4">
          <div className=" relative">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              className="pl-10 focus-visible: ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs text-red-500">{errors.fullName}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className=" relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible: ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className=" relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible: ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs text-red-500">{errors.password}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className=" relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible: ring-1"
            />
            <PhoneCall className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs text-red-500">{errors.contact}</span>}
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <Checkbox onCheckedChange={toggleAdmin} className="mr-2"/>
          <Label>Want to post your restaurant?</Label>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button disabled className=" w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className=" w-full bg-orange hover:bg-hoverOrange">
              Signup
            </Button>
          )}
        </div>
        <Separator/>
        <p className="mt-2">Already have an account? <Link to={"/login"} className="text-blue-500">Login</Link> </p>
      </form>
    </div>
  )
};

export default Signup;
