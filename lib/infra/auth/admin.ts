import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/infra/auth/authOptions";

export async function requireAdmin() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user) {
    throw new Error(
      "Unauthorized"
    );
  }

  if (
    session.user.role !==
    "ADMIN"
  ) {
    throw new Error(
      "Forbidden"
    );
  }

  return session.user;
}