import { ERROR_MESSAGE } from "@/lib/constants/error";
import { validatePassword } from "@/lib/constants/validation";
import { registerAPI } from "../api/auth";

export type RegisterActionState = {
  success: boolean;
  errors?: {
    email?: string;
    password?: string[];
    confirmPassword: string;
    name?: string;
    image?: File;
  }
}

export default async function registerAction(
  prevState: RegisterActionState,
  formData: FormData
) {
  const {
    email,
    password,
    confirmPassword,
    name,
    image
  } = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    image: File
  };

  // validate form inputs
  if (!validatePassword({ password, confirmPassword })) {
    return {
      success: false,
      errors: { confirmPassword: ERROR_MESSAGE.CONFIRM_PASSWORD }
    }
  }

  const response = await registerAPI({ email, password, name });

  return { succes: true };
}