import { URL } from "@/constants";
import { RegisterDetails } from "@/interfaces";

export async function registerAPI(data: RegisterDetails) {
  console.log("URL?: ", URL.REGISTER_USER_EMAIL);
  try {
    const response = await fetch(URL.REGISTER_USER_EMAIL, {
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