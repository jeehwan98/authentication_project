import { User } from "@/interfaces/user";
import { headers } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getServerSession() {
  const headersData = await headers();
  const cookieHeader = headersData.get("cookie") || "";

  // extract tokens from the cookie header
  const accessToken = cookieHeader
    .split("; ")
    .find((cookie) => cookie.startsWith("accessToken="))
    ?.split("=")[1];

  if (!accessToken) {
    console.log("No access token found.");
    return null;
  }

  const refreshToken = cookieHeader
    .split("; ")
    .find((cookie) => cookie.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!accessToken) {
    console.log("No access token found.");
    return null;
  }

  // if refreshToken is not expired, use it to get a new accessToken

  try {
    const decoded: any = jwtDecode(accessToken);

    const user: User = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      image: decoded.image,
      role: decoded.role,
      createdAt: decoded.createdAt,
    };

    return user;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}