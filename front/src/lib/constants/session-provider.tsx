"use client";

import { User } from "@/interfaces/user";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { URL } from "./url";

interface SessionContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({
  children,
  initialUser
}: {
  children: ReactNode,
  initialUser: User | null
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   checkSession();
  // });

  // const checkSession = async () => {
  //   try {
  //     const response = await fetch("/api/auth/session");
  //     const data = await response.json();

  //     if (data.user) {
  //       setUser(data.user);
  //     }
  //   } catch (error) {
  //     console.error("Session check error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setLoading(false);
  }, [initialUser]);


  const signOut = async () => {
    try {
      await fetch(`${URL.BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      setUser(null);
    } catch (error) {
      console.error("Sign out failed: ", error);
    }
  };

  return (
    <SessionContext.Provider value={{ user, loading, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function getClientSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("getClientSession must be used within a SessionProvider");
  }
  return context;
}