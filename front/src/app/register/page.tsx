import AuthHeader from "@/components/auth/auth-header";
import RegisterForm from "@/components/auth/form/register-form";

export default function RegisterPage() {
  return (
    <div className="px-10 py-2">
      <AuthHeader />
      <RegisterForm />
    </div>
  )
}