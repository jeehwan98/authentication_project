"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="px-10 py-2">
      <h1>Login</h1>
      <Button onClick={() => signIn("github", { callbackUrl: "/" })}>Sign in with Github</Button>
    </div>
  )
}