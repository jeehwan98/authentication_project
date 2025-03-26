import { ReactNode } from "react";

// A reusable header component for authentication pages
export function AuthHeader({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-4xl font-bold text-center my-4 mb-4">
      {children}
    </h1>
  );
}
