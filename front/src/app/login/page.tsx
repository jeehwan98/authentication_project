import AuthHeader from "@/components/auth/auth-header";
import LoginForm from "@/components/auth/form/login-form";

export default function LoginPage() {
  return (
    <div className="px-10 py-2">
      <AuthHeader />
      <LoginForm />
    </div>
  )
}