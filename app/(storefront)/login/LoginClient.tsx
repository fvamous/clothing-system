"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { Chrome, LockKeyhole, Mail } from "lucide-react";

type LoginClientProps = {
  googleEnabled: boolean;
  callbackUrl: string;
};

export default function LoginClient({
  googleEnabled,
  callbackUrl,
}: LoginClientProps) {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
        callbackUrl,
      }
    );

    setLoading(false);

    if (result?.ok) {
      router.push(
        result.url || callbackUrl
      );
      router.refresh();
      return;
    }

    setError(
      "Email atau password tidak valid."
    );
  }

  async function handleGoogleLogin() {
    if (!googleEnabled) {
      setError(
        "Google login belum dikonfigurasi. Tambahkan GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET."
      );
      return;
    }

    await signIn("google", {
      callbackUrl,
    });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 p-6 text-zinc-950 dark:bg-[#050507] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-zinc-200/70 bg-white/85 p-8 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
          Secure Access
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight">
          Admin Login
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Masuk dengan akun admin untuk mengelola produk,
          pesanan, dan lookbook.
        </p>

        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
        >
          <Chrome className="h-4 w-4" />
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-400">
          <span className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
          or
          <span className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
        </div>

        <label className="space-y-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Email
          </span>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 pl-11 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black/30 dark:focus:border-white/30"
            />
          </div>
        </label>

        <label className="mt-4 block space-y-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Password
          </span>
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 pl-11 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black/30 dark:focus:border-white/30"
            />
          </div>
        </label>

        <button
          disabled={loading}
          className="mt-6 h-12 w-full rounded-2xl bg-zinc-950 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {loading
            ? "Checking..."
            : "Login"}
        </button>
      </form>
    </main>
  );
}
