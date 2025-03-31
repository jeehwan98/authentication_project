"use client"

import { getClientSession } from "@/lib/constants/session-provider";

export default function UserProfile() {
  const { user } = getClientSession();

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}