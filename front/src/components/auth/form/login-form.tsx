"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useActionState, useState } from "react"
import GithubSignInButton from "./github-button";
import { useRouter } from "next/navigation";
import InputField, { FormInput } from "./input-field";
import { loginAction } from "@/app/login/action";
import { Mail } from "lucide-react";

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
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    errors: {},
  });

  return (
    <form
      action={formAction}
      className="space-y-4"
    >
      <FormInput
        name="email"
        placeholder="example@email.com"
        type="text"
        error={state?.errors?.email}
        icon={Mail}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
      />
      {/* {loginError && <p className="text-red-500 text-sm">{loginError}</p>} */}
      <Button
        type="submit"
        className="w-full"
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}