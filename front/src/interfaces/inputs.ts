import { LucideIcon } from "lucide-react";

export interface FormInputProps {
  name: string;
  placeholder: string;
  error?: string;
  icon?: LucideIcon
}