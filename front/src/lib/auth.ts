import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { loginAPI } from "@/app/api/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await loginAPI({
            email: credentials.email,
            password: credentials.password,
          });

          if (response.success && response.data) {
            // Set the access token in cookies
            const cookieStore = cookies();
            cookieStore.set("accessToken", response.data.accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              path: "/",
            });

            // Return the user object that will be stored in the session
            return {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
              role: response.data.user.role,
              image: response.data.user.image,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
}; 