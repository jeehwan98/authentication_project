"use server"

import { getServerSession } from "@/lib/auth/auth-server";

export default async function UserProfile() {
  const user = await getServerSession();
  console.log("user: ", user);

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h1>{(user as any).name}</h1>
      <p>{(user as any).email}</p>
    </div>
  )
}