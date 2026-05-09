import { prisma } from "@/lib/prisma/client";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={styles.grid}>
      {products.map((p) => (
        <div key={p.id} style={styles.card}>
          <h3>{p.name}</h3>
          <p>Rp {Number(p.price).toLocaleString("id-ID")}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 16,
    maxWidth: 900,
    margin: "40px auto",
  },

  card: {
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 12,
    background: "#fff",
  },
};