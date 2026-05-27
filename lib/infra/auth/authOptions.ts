import bcrypt from "bcryptjs";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthOptions } from "next-auth";

import { prisma } from "@/lib/infra/prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},

        password: {},
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const user =
          await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

        if (!user?.hashedPassword) {
          return null;
        }

        const isValid =
          await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,

          email: user.email,

          name: user.name,

          role: user.role,
        };
      },
    }),
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
        session.user.id = token.id;

        session.user.role = token.role;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};