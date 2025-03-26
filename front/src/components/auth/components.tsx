import Link from "next/link";
import { ReactNode } from "react";
import GithubSignInButton from "./form/github-button";

export function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <div className="px-10 py-2">
      {children}
    </div>
  )
}

export function LoginBottomLink() {
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

export function Line() {
  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="w-1/5 border-b border-gray-400"></span>
      <span className="text-sm text-gray-400">or continue with</span>
      <span className="w-1/5 border-b border-gray-400"></span>
    </div>
  )
}

export function LoginBottomNav() {
  return (
    <>
      <LoginBottomLink />
      <Line />
      <GithubSignInButton />
    </>
  )
}