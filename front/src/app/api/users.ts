"use server";

import { METHOD, URL } from "@/lib/constants/url";
import { cookies } from "next/headers";

export async function getUsersAPI() {
  const response = await fetch(`${URL.BASE_URL}/users`, {
    method: METHOD.GET,
    // headers: URL.HEADERS,
    headers: { Cookie: (await cookies()).toString() },
  });

  if (!response.ok) {
    console.error("Error fetching users");
  }
  const responseData = await response.json();
  console.log(responseData);
  return responseData.data;
}