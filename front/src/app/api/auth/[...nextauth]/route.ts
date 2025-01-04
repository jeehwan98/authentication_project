// import { URL } from "@/lib/backend-url";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { URL } from "@/lib/backend-url";

export const authOptions: NextAuthOptions = {
  providers: [
    // Github
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    // Custom Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@email.com" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(URL.LOGIN, {
            method: "POST",
            headers: URL.HEADERS,
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(responseData.error || "Login failed");
          }

          return responseData.success; // login success
        } catch (error) {
          console.error("error occurred: ", error);
          throw error || "An unexpected error occurred. Please try again.";
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // console.log("token/;", token);
      // console.log("user/;", user);
      // console.log("account/;", account);
      // console.log("profile/;", profile);
      if (account) {
        if (account.provider === "github" && profile) {
          // Handle GitHub login
          token.name = profile.name || token.name;
          token.email = profile.email || token.email;
          token.image = profile.image || token.image;
        } else if (account.provider === "credentials" && user) {
          // Handle Credentials login
          token.name = user.name || token.name;
          token.email = user.email || token.email;
          token.image = user.image || token.image; // Ensure image isn't overwritten if it's missing
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.image,
      };
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };