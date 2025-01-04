'use client'

import { usePathname } from "next/navigation";

export default function AuthHeader() {
  const pathname = usePathname();

  const headerName = pathname === '/login' ? 'Sign In' : pathname === '/register' ? 'Register' : '';
  return (
    <h1 className="text-4xl font-bold text-center my-4 mb-4">
      {headerName}
    </h1>
  )
}