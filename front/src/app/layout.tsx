import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { SessionProvider } from "@/lib/constants/session-provider";

export const metadata: Metadata = {
  title: "Authentication Project",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <main className="ma-auto max-w text-2xl gap-2">
            <Header />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
