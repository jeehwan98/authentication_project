import AuthHeader from "@/components/Authentication/AuthHeader";
import RegisterForm from "@/components/Authentication/Form/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="px-10 py-2">
      <AuthHeader />
      <RegisterForm />
    </div>
  )
}