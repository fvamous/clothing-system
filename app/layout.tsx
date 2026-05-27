import type { Metadata } from "next";

import "./globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Clothing System",
  description: "Modern AI Commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}