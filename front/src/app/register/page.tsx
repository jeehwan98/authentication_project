import { AuthContainer, AuthHeader, RegisterFormContainer } from "@/components/auth/components";
import RegisterForm from "@/components/auth/form/register-form";

export default function RegisterPage() {
  return (
    <AuthContainer>
      <AuthHeader>Register</AuthHeader>
      <RegisterFormContainer>
        <RegisterForm />
      </RegisterFormContainer>
    </AuthContainer>
  )
}