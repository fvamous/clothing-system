import { User2, LogOut, ShieldCheck, LayoutDashboard } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/infra/auth/authOptions";
import PlaceholderPage from "@/components/layout/PlaceholderPage";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  // Menggunakan casting record aman pengganti 'any'
  const userRole = (user as Record<string, unknown>)?.role as string | undefined;
  const isAdmin = userRole === "ADMIN";

  // Jika SUDAH login, tampilkan informasi akun, foto profil, dan opsi khusus
  if (session) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-neutral-900 border border-neutral-800 rounded-2xl text-white mt-10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <Image 
                src={user.image} 
                alt={user.name || "User Profile"} 
                width={60} 
                height={60} 
                className="rounded-full border-2 border-neutral-700 shadow-md" 
              />
            ) : (
              <div className="p-3 bg-neutral-800 rounded-full">
                <User2 className="w-6 h-6" />
              </div>
            )}
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Active Session</span>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
            </div>
          </div>

          {isAdmin && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
              <ShieldCheck className="w-4 h-4" /> Admin
            </span>
          )}
        </div>

        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6 space-y-2 text-sm text-neutral-300">
          <p><strong className="text-neutral-400">Email:</strong> {user?.email}</p>
          <p><strong className="text-neutral-400">Database Role:</strong> {userRole || "USER"}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition">
              <LayoutDashboard className="w-4 h-4" /> Masuk Panel Admin
            </Link>
          )}
          <Link href="/api/auth/signout" className="flex items-center gap-2 px-5 py-2.5 bg-red-600/10 text-red-400 border border-red-500/20 font-medium rounded-xl hover:bg-red-600/20 transition">
            <LogOut className="w-4 h-4" /> Logout
          </Link>
        </div>
      </div>
    );
  }

  // Jika BELUM login, gunakan kembali komponen PlaceholderPage bawaan Anda
  return (
    <PlaceholderPage
      eyebrow="Profile"
      title="Customer profile is ready for account features."
      description="Use this route for customer identity, addresses, order history, and saved preferences. Admin access remains protected separately."
      icon={User2}
      primaryAction={{
        href: "/login",
        label: "Login",
      }}
      secondaryAction={{
        href: "/admin",
        label: "Admin Panel",
      }}
    />
  );
}