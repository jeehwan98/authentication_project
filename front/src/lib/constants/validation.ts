import { ConfirmPasswordProps } from "@/interfaces/inputs";

export function validatePassword({ password, confirmPassword }: ConfirmPasswordProps): boolean {
  if (password !== confirmPassword) return false;
}