import { requireAdmin } from "@/lib/infra/auth/admin";

import AdminShell from "@/components/layout/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}