import { AuthContainer, AuthHeader, LoginFooter, LoginFormContainer } from "@/components/auth/components";
import LoginForm from "@/components/auth/form/login";

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