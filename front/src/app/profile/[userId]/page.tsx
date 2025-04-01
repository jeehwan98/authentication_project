import { getServerSession } from "@/lib/auth/auth-server";

export default async function UserProfile() {
  const user = await getServerSession();

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