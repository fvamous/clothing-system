import Providers from "./providers";
import Navbar from "@/components/navigation/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white transition-colors duration-300 dark:bg-[#020617] dark:text-white light:bg-white light:text-black">

      {/* BASE BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-[#020617] dark:bg-[#020617]" />

      {/* GLOW */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_55%)]" />

      {/* VIGNETTE */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7))]" />

      {/* NAV */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 min-h-screen">
        {children}
      </main>

      {/* NOISE */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03] bg-[url('/noise.png')]" />
    </div>
  );
}