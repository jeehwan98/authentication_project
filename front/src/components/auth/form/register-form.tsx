"use client";

import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { FormInput, PasswordInput } from "@/components/ui/input";
import { Mail, User } from "lucide-react";
import registerAction from "@/app/register/action";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(registerAction, {
    success: false,
    errors: {},
  });

  return (
    <form
      action={formAction}
      className="space-y-4"
    >
      <FormInput
        icon={User}
        name="name"
        placeholder="John Doe"
        error={state?.errors.name}
      />
      <FormInput
        icon={Mail}
        name="email"
        placeholder="example@email.com"
        error={state?.errors?.email}
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        toggleVisibility={() => setShowPassword((prev) => !prev)}
        isVisible={showPassword}
        error={state?.errors?.password}
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        toggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
        isVisible={showConfirmPassword}
        error={state?.errors?.confirmPassword}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  )
}