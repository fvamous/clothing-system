import bcrypt from "bcryptjs";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";

import type { NextAuthOptions } from "next-auth";

import { prisma } from "@/lib/infra/prisma/client";

const providers: NextAuthOptions["providers"] = [
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
];

if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
) {
  providers.push(
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        token.role = user.role;
      }

      if (!token.role && token.email) {
        const dbUser =
          await prisma.user.findUnique({
            where: {
              email: token.email,
            },
            select: {
              id: true,
              role: true,
            },
          });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
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
