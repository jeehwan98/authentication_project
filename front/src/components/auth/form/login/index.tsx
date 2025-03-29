"use client"

import { Button } from "@/components/ui/button";
import React, { useActionState, useState } from "react"
import { Loader2, Mail } from "lucide-react";
import { FormInput, PasswordInput } from "@/components/ui/input";
import loginAction from "@/app/login/action";

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
        disabled={isPending}
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Login"}
      </Button>
    </form>
  )
}