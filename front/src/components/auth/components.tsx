import { ChildrenProps } from "@/interfaces";

export function AuthContainer({ children }: ChildrenProps) {
  return <div className="px-10 py-2">{children}</div>
}

export function AuthHeader({ children }: ChildrenProps) {
  return <h1 className="text-4xl font-bold text-center my-4 mb-4">{children}</h1>
}

export function LoginFormContainer({ children }: ChildrenProps) {
  return <div className="max-w-sm mx-auto mt-16 p-6">{children}</div>
}

export function RegisterFormContainer({ children }: ChildrenProps) {
  return <div className="max-w-sm mx-auto mt-16 p-6">{children}</div>
}