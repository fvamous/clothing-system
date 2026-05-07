import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/");

  // 🔥 REAL DB STATS
  const [totalProducts, totalOrders] = await Promise.all([
    prisma.product.count({
      where: { isDeleted: false },
    }),
    prisma.order.count(),
  ]);

  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Welcome, {session.user.name}</p>

      <div style={styles.card}>
        <h3>Quick Stats</h3>

        <p>Total Products: {totalProducts}</p>
        <p>Total Orders: {totalOrders}</p>

        <p>
          Total Revenue: Rp{" "}
          {(totalRevenue._sum.total ?? 0).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    marginTop: 20,
    padding: 16,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
};