import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authenticate, type AuthenticatedUser } from "@/lib/auth/authenticate";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const res = await authenticate(email, password);
        if (!res) return null;

        return res;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const authedUser = user as AuthenticatedUser;
        token.id = authedUser.id;
        token.accessToken = authedUser.accessToken;
        token.refreshToken = authedUser.refreshToken;
        token.role = authedUser.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string | undefined) ?? "";
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
});