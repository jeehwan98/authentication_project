import { LoginDetailsProps, LoginResponseProps, RegisterDetailsProps } from "@/interfaces/auth";
import { ERROR_MESSAGE } from "@/lib/constants/error";
import { METHOD, URL } from "@/lib/constants/url";

let responseData;
export async function loginAPI(data: LoginDetailsProps): Promise<LoginResponseProps> {
  try {
    const response = await fetch(`${URL.BASE_URL}/auth/login`, {
      method: METHOD.POST,
      headers: URL.HEADERS,
      body: JSON.stringify(data)
    });

    responseData = await response.json();

    if (!responseData.success) {
      return {
        success: responseData.success,
        message: responseData.message,
        data: responseData.null
      }
    }
  } catch (error) {
    console.error(ERROR_MESSAGE.LOGIN, error);
    throw error;
  }

  return {
    success: true,
    message: responseData.message,
    data: responseData.data
  }
}

export async function registerAPI(data: RegisterDetailsProps) {
  try {
    const response = await fetch(`${URL.BASE_URL}/auth/register`, {
      method: "POST",
      headers: URL.HEADERS,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error || "Registration failed");
    }
    const user = responseData.success;
    return user;
  } catch (error) {
    console.error("Error during registration", error);
    throw error;
  }
}