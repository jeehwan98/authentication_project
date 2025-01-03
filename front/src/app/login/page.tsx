import AuthHeader from "@/components/Authentication/AuthHeader";
import LoginForm from "@/components/Authentication/LoginForm";

export default function LoginPage() {
  return (
    <div className="px-10 py-2">
      <AuthHeader />
      <LoginForm />
    </div>
  )
}