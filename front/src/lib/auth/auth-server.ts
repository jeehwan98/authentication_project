import { User } from "@/interfaces/user";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getServerSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken) {
    return null;
  }

  if (!accessToken) {
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