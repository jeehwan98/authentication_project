"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react"
import GithubSignInButton from "./GithubSignInButton";

interface LoginDetails {
  email: string;
  password: string;
}

function BottomNav() {
  const className = 'text-primary text-blue-500 underline-offset-1 hover:underline'
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <Link href="#" className={className}>
        Forgot password?
      </Link>
      <Link href="/register" className={className}>
        Register
      </Link>
    </div>
  )
}

function Line() {
  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="w-1/5 border-b border-gray-400"></span>
      <span className="text-sm text-gray-400">or continue with</span>
      <span className="w-1/5 border-b border-gray-400"></span>
    </div>
  )
}

export default function LoginForm() {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(false);
    try {
      const response = await signIn("credentials", {
        email: loginDetails.email,
        password: loginDetails.password,
        redirect: true,
        callbackUrl: "/"
      });

      console.log("response?:", response); // login success가 나오겠지?
    } catch (error) {
      setLoginLoading(false);
      console.error("error occurred while logging in: ", error);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full p-3 border rounded focus:outline-none"
          type="text"
          name="email"
          placeholder="example@email.com"
          value={loginDetails.email}
          onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
        />
        <input
          className="w-full p-3 border rounded focus:outline-none"
          type="password"
          name="password"
          placeholder="Password"
          value={loginDetails.password}
          onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
        />
        <Button
          type="submit"
          disabled={loginLoading}
          className="w-full"
        >
          {loginLoading ? 'Logging in...' : 'Login'}
        </Button>
        <BottomNav />
        <Line />
        <GithubSignInButton />
      </form>
    </div>
  )
}