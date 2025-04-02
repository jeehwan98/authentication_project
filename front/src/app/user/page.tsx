"use client";

import { useEffect, useState } from "react";
import { getUsersAPI } from "../api/users";

export default function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsersAPI();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);
  return (
    <>
      {users.map((user: { id: string; name: string }) => (
        <div key={user.id}>
          <span>{user.name}</span>
        </div>
      ))}
    </>
  )
}