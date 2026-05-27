import { getServerSession } from "next-auth";

import { AuthError } from "@/lib/errors/AuthError";

import { authOptions } from "./authOptions";

export async function requireAdminApi() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user) {
    throw new AuthError("Login required");
  }

  if (session.user.role !== "ADMIN") {
    throw new AuthError("Admin access required");
  }

  return session;
}
