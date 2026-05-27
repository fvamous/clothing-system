"use client";

import {
  signOut,
  useSession,
} from "next-auth/react";

export default function TopNavProfile() {
  const { data } = useSession();

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">
        {data?.user?.name}
      </div>

      <button
        onClick={() => signOut()}
        className="rounded-xl border border-white/10 px-3 py-2 text-sm"
      >
        Logout
      </button>
    </div>
  );
}