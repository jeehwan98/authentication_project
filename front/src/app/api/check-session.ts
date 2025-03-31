import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return Response.json({
      success: false,
      message: "Not authenticated"
    });
  }

  return Response.json({
    success: true,
    message: "Authenticated"
  });
}