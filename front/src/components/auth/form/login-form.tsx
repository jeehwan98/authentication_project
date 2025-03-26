"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react"
import GithubSignInButton from "./github-button";
import { useRouter } from "next/navigation";
import InputField from "./input-field";

interface LoginDetails {
  email: string;
  password: string;
}

function BottomNav() {
  const className = 'text-blue-400 hover:text-blue-600'
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <Link href="#" className={className}
      >
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
  const [loginError, setLoginError] = useState<string>("");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(false);
    try {
      const response = await signIn("credentials", {
        email: loginDetails.email,
        password: loginDetails.password,
        redirect: false // to handle the error here
        // redirect: true,
        // callbackUrl: "/"
      });

      if (response?.error) {

        setLoginError(response.error);
      } else {
        console.log("login successful:", response);
        router.push("/");
      }
    } catch (error) {
      setLoginLoading(false);
      console.error("error occurred while logging in: ", error);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          type="text"
          name="email"
          placeholder="example@email.com"
          value={loginDetails.email}
          onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={loginDetails.password}
          onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
        />
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
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