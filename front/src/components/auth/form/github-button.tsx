"use client";

import { Button } from "@/components/ui/button"
import React from "react";

export default function GithubSignInButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Button onClick={handleClick} className="w-full">
      Sign In with Github
    </Button>
  )
}