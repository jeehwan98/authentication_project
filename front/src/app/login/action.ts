"use server"

import { loginAPI } from "../api/auth";

export type LoginActionState = {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
  };
}

export default async function loginAction(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {

  const { email, password } = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };

  const response = await loginAPI({ email, password });

  if (!response.success) {
    const errorMessage = response.message;

    if (typeof errorMessage === "object" && errorMessage !== null) {
      return {
        success: false,
        errors: {
          email: "email" in errorMessage ? errorMessage.email : undefined,
          password: "password" in errorMessage ? errorMessage.password : undefined,
        },
      };
    }
  }

  return { success: true };
}