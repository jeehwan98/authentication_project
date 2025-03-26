import { AuthContainer, AuthHeader, RegisterFormContainer } from "@/components/auth/components";
import RegisterForm from "@/components/auth/form/register";
import Link from "next/link";

export function RegisterFooter() {
  const className = 'text-blue-400 hover:text-blue-600'
  return (
    <div className="flex items-center justify-center mt-4 text-sm">
      <span className="mr-2">Already have an account?</span>
      <Link href="/login" className={className}>
        Login
      </Link>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <AuthContainer>
      <AuthHeader>Register</AuthHeader>
      <RegisterFormContainer>
        <RegisterForm />
        <RegisterFooter />
      </RegisterFormContainer>
    </AuthContainer>
  )
}