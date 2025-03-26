import Link from "next/link";
import GithubSignInButton from "./form/github-button";
import { ChildrenProps } from "@/interfaces";
import { Fragment } from "react";

export function AuthContainer({ children }: ChildrenProps) {
  return <div className="px-10 py-2">{children}</div>
}

export function AuthHeader({ children }: ChildrenProps) {
  return <h1 className="text-4xl font-bold text-center my-4 mb-4">{children}</h1>
}

export function LoginFooter() {
  return (
    <Fragment>
      <LoginBottomLink />
      <Line />
      <GithubSignInButton />
    </Fragment>
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

export function LoginFormContainer({ children }: ChildrenProps) {
  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      {children}
    </div>
  )
}

export function RegisterFormContainer({ children }: ChildrenProps) {
  return <div className="max-w-sm mx-auto mt-16 p-6">{children}</div>
}