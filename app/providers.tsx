"use client";

import ThemeProvider from "@/components/providers/ThemeProvider";

import SessionProvider from "@/components/providers/SessionProvider";

import ToastProvider from "@/components/providers/ToastProvider";

import QueryProvider from "@/components/providers/QueryProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <QueryProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </QueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}