import { prisma } from "@/lib/infra/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/infra/auth/authOptions";
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
      <h1 className="text-3xl font-bold dark:text-white">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Welcome, {session.user.name}
      </p>

      <div
        style={styles.card}
        className="
          dark:border
          dark:border-white/10
        "
      >
        <h3 className="text-lg font-semibold dark:text-white">
          Quick Stats
        </h3>

        <div className="mt-4 space-y-2">
          <p className="text-zinc-700 dark:text-zinc-300">
            Total Products: {totalProducts}
          </p>

          <p className="text-zinc-700 dark:text-zinc-300">
            Total Orders: {totalOrders}
          </p>

          <p className="text-zinc-700 dark:text-zinc-300">
            Total Revenue: Rp{" "}
            {(totalRevenue._sum.total ?? 0).toLocaleString(
              "id-ID"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    marginTop: 20,
    padding: 16,

    background:
      "rgba(255,255,255,0.75)",

    borderRadius: 18,

    border:
      "1px solid rgba(255,255,255,0.7)",

    backdropFilter: "blur(18px)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.06)",

    color: "var(--foreground)",
  },
};

/* =========================
   DARK MODE
========================= */

if (typeof document !== "undefined") {
  const dark =
    document.documentElement.classList.contains(
      "dark"
    );

  if (dark) {
    styles.card.background =
      "rgba(15,23,42,0.72)";

    styles.card.border =
      "1px solid rgba(255,255,255,0.08)";

    styles.card.boxShadow =
      "0 10px 30px rgba(0,0,0,0.35)";
  }
}