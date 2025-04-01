import { getServerSession } from "@/lib/auth/auth-server";

export default function UserProfile() {
  const { user } = getServerSession();

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