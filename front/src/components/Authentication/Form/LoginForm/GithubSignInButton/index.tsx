"use client";

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react";
import React from "react";

export default function GithubSignInButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <Button onClick={handleClick} className="w-full">
      Sign In with Github
    </Button>
  )
}