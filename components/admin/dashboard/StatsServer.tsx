import { prisma } from "@/lib/prisma/client";

export default async function StatsServer() {
  const [products, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
  ]);

  return (
    <div style={styles.stats}>
      <div style={styles.card}>
        <h2>{products}</h2>
        <p>Products</p>
      </div>

      <div style={styles.card}>
        <h2>{orders}</h2>
        <p>Orders</p>
      </div>

      <div style={styles.card}>
        <h2>Live</h2>
        <p>System Status</p>
      </div>
    </div>
  );
}

const styles = {
  stats: {
    maxWidth: 900,
    margin: "60px auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    border: "1px solid #eee",
    padding: 20,
    borderRadius: 14,
    textAlign: "center" as const,
  },
};