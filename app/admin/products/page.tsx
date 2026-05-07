import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function ProductsAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Products</h1>
          <p style={styles.subtitle}>Manage your catalog</p>
        </div>

        <Link href="/admin/products/new">
          <button style={styles.addBtn}>+ Add Product</button>
        </Link>
      </div>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.imageUrl || "/placeholder.png"}
              style={styles.image}
            />

            <div style={styles.content}>
              <h3 style={styles.name}>{p.name}</h3>
              <p style={styles.price}>
                Rp {Number(p.price).toLocaleString("id-ID")}
              </p>
              <p style={styles.stock}>Stock: {p.stock}</p>
            </div>

            <div style={styles.actions}>
              <Link href={`/admin/products/${p.id}/edit`}>
                <button style={styles.editBtn}>Edit</button>
              </Link>

              <DeleteProductButton productId={p.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

/* =========================
   MODERN SHOPIFY STYLE UI
========================= */
const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "2rem",
    fontFamily: "sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
  },

  subtitle: {
    margin: 0,
    color: "#666",
  },

  addBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    transition: "0.2s",
    display: "flex",
    flexDirection: "column",
  },

  imageWrap: {
    width: "100%",
    height: 180,
    background: "#f5f5f5",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  content: {
    padding: 12,
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 6,
  },

  price: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },

  stock: {
    fontSize: 12,
    color: "#888",
  },

  actions: {
    display: "flex",
    gap: 8,
    padding: 12,
    borderTop: "1px solid #eee",
  },

  editBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },
};