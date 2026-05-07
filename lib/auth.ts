import { type NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // =========================
      // ALWAYS REFRESH ROLE
      // =========================
      if (token.email) {
        const dbUser =
          await prisma.user.findUnique({
            where: {
              email: token.email,
            },
          });

        if (dbUser) {
          token.id = dbUser.id;

          token.role =
            dbUser.role ?? Role.USER;
        }
      }

      return token;
    },

    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.id =
          token.id as string;

        session.user.role =
          token.role as Role;
      }

      return session;
    },
  },

  secret:
    process.env.NEXTAUTH_SECRET,
};