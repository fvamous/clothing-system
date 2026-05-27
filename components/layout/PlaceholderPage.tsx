import Link from "next/link";

import type { LucideIcon } from "lucide-react";

type Action = {
  href: string;
  label: string;
};

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  primaryAction?: Action;
  secondaryAction?: Action;
};

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  icon: Icon,
  primaryAction,
  secondaryAction,
}: PlaceholderPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-50 px-4 py-24 text-zinc-950 dark:bg-[#050507] dark:text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

      <section className="relative mx-auto flex min-h-[520px] max-w-5xl items-center">
        <div className="w-full rounded-[40px] border border-zinc-200/70 bg-white/85 p-8 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            <Icon className="h-6 w-6" />
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            {eyebrow}
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-zinc-950 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {primaryAction.label}
              </Link>
            )}

            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white px-5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/10"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
