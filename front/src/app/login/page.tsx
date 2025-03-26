import { Auth } from "@/components/auth/auth-header";
import { AuthContainer, LoginBottomNav } from "@/components/auth/components";
import LoginForm from "@/components/auth/form/login-form";

export default function LoginPage() {
  return (
    <AuthContainer>
      <Auth.Header>asd</Auth.Header>
      <div className="max-w-sm mx-auto mt-16 p-6">
        <LoginForm />
        <LoginBottomNav />
      </div>
    </AuthContainer>
  )
}