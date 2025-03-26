"use client"

import { Button } from "@/components/ui/button";
import React, { useActionState, useState } from "react"
import { loginAction } from "@/app/login/action";
import { Mail } from "lucide-react";
import { FormInput, PasswordInput } from "@/components/ui/input";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
        icon={Mail}
        name="email"
        error={state?.errors?.email}
        placeholder="example@email.com"
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        toggleVisibility={() => setShowPassword((prev) => !prev)}
        isVisible={showPassword}
        error={state?.errors?.password}
      />
      <Button
        type="submit"
        className="w-full"
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}