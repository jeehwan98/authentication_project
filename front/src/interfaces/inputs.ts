import { LucideIcon } from "lucide-react";

export interface FormInputProps {
  name: string;
  placeholder: string;
  error?: string;
  icon?: LucideIcon
}

export interface PasswordInputProps {
  name: string;
  placeholder: string;
  toggleVisibility: () => void;
  isVisible: boolean;
  error?: string;
}

export interface PasswordVisibilityProps {
  isVisible: boolean;
  toggle: () => void;
}