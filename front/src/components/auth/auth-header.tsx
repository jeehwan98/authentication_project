export function Auth({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}

import { ReactNode } from "react";

Auth.Header = function AuthHeader({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-4xl font-bold text-center my-4 mb-4">
      {children}
    </h1>
  )
}