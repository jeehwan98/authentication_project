"use client";

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function GithubSignInButton() {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/images/githubDarkLogo.png" : "/images/githubLightLogo.png";

  const handleGithubLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "http://localhost:8080/api/v1/auth/login/github";
  };

  return (
    <Button
      onClick={handleGithubLogin}
      className="w-full mt-5"
    >
      <Image
        src={logo}
        alt="Github Logo"
        width={20}
        height={20}
      />
      Sign In with Github
    </Button>
  )
}