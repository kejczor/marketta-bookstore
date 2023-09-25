import { prisma } from "@prisma/db";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Sign in",
      credentials: {
        usernameOrEmail: {
          label: "usernameOrEmail",
          type: "text",
          placeholder: "username or email",
        },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.password || !credentials.usernameOrEmail) return null;

        const user = await prisma.user.findUnique({
          where: credentials.usernameOrEmail?.includes("@")
            ? {
                email: credentials.usernameOrEmail.toLowerCase().trim(),
                password: credentials.password.trim(),
              }
            : {
                username: credentials.usernameOrEmail.toLowerCase().trim(),
                password: credentials.password.trim(),
              },
        });

        if (user == null) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (!session?.user || !token.sub) return session;
      session.user.id = token.sub;

      if (!session.user?.id) return session;

      const dbUser = await prisma.user.findUnique({ where: { id: session.user.id } });
      session.user.image = dbUser?.profileImgURL;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
