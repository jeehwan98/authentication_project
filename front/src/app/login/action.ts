"use server"

import { loginAPI } from "../api/auth";

export type LoginActionState = {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
  };
}

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {

  const { email, password } = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };

  const response = await loginAPI({ email, password });

  return {
    success: true
  }
}