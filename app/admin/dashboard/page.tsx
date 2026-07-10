import { getStats } from "@/server/queries/stats/getStats";

export default async function DashboardPage() {
  // Menambahkan komentar ini agar ESLint tidak komplain
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _stats = await getStats();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
      {/* Nanti Anda bisa gunakan _stats di sini */}
    </div>
  );
}