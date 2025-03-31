import { User } from "./user";

export interface LoginDetailsProps {
  email: string;
  password: string;
}

export interface LoginResponseProps {
  success: boolean;
  message: string | { [key: string]: string };
  data?: {
    accessToken?: string;
    refreshToken?: string;
    user: User;
  };
}



export interface RegisterDetailsProps {
  email: string;
  password: string;
  name: string;
}