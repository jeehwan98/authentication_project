import { ReactNode } from "react";

export interface LoginDetails {
  email: string;
  password: string;
}

export interface RegisterDetails {
  email: string;
  password: string;
  name: string;
  provider: string;
}

export interface ChildrenProps {
  children: ReactNode
}