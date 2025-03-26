import { ReactNode } from "react";

export interface RegisterDetails {
  email: string;
  password: string;
  name: string;
  provider: string;
}

export interface ChildrenProps {
  children: ReactNode
}