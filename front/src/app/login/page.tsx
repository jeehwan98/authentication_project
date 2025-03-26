import { AuthContainer, AuthHeader, LoginFormContainer } from "@/components/auth/components";
import GithubSignInButton from "@/components/auth/form/github-button";
import LoginForm from "@/components/auth/form/login";
import Link from "next/link";
import { Fragment } from "react";

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

export default function LoginPage() {
  return (
    <AuthContainer>
      <AuthHeader>Login</AuthHeader>
      <LoginFormContainer>
        <LoginForm />
        <LoginFooter />
      </LoginFormContainer>
    </AuthContainer>
  )
}