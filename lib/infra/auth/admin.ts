import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import { authOptions } from "./authOptions";

export async function requireAdmin() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return session;
}