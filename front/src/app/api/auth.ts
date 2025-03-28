import { LoginDetails, RegisterDetails } from "@/interfaces";
import { URL } from "@/lib/constants/url";

export async function loginAPI(data: LoginDetails) {
  console.log("inputted data?: ", data);

}

export async function registerAPI(data: RegisterDetails) {
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