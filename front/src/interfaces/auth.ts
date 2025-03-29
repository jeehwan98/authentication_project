export interface LoginDetailsProps {
  email: string;
  password: string;
}

export interface LoginResponseProps {
  success: boolean;
  message: string | { [key: string]: string };
  data?: object;
}

export interface RegisterDetailsProps {
  email: string;
  password: string;
  name: string;
}