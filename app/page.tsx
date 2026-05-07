import Hero from "@/components/layout/hero";

export default function Home() {
  return (
    <main style={styles.page}>
      <Hero />

      {/* STATS */}
      <section style={styles.stats}>
        <div style={styles.statCard}>
          <h2>120+</h2>
          <p>Products</p>
        </div>

        <div style={styles.statCard}>
          <h2>450+</h2>
          <p>Orders</p>
        </div>

        <div style={styles.statCard}>
          <h2>99%</h2>
          <p>Uptime</p>
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section style={styles.preview}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>

        <div style={styles.grid}>
          <div style={styles.card}>👕 Hoodie Premium</div>
          <div style={styles.card}>👕 T-Shirt Basic</div>
          <div style={styles.card}>👕 Jacket Streetwear</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={styles.testimonials}>
        <h2 style={styles.sectionTitle}>What Users Say</h2>

        <div style={styles.grid}>
          <div style={styles.card}>“Simple and powerful admin system.”</div>
          <div style={styles.card}>“Feels like Shopify but lightweight.”</div>
          <div style={styles.card}>“Clean architecture and fast performance.”</div>
        </div>
      </section>
    </main>
  );
}

/* =========================
   SAFE STYLE EXTENSION
========================= */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    fontFamily: "sans-serif",
    background: "linear-gradient(to bottom, #f9fafb, #ffffff)",
    padding: "60px 20px",
  },

  hero: {
    maxWidth: 900,
    margin: "0 auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,

    /* subtle animated gradient (safe) */
    background:
      "radial-gradient(circle at top, rgba(59,130,246,0.08), transparent)",
    padding: 30,
    borderRadius: 16,
  },

  badge: {
    fontSize: 12,
    padding: "6px 12px",
    borderRadius: 999,
    background: "#111",
    color: "#fff",
  },

  title: {
    fontSize: 44,
    fontWeight: 800,
    lineHeight: 1.2,
  },

  highlight: {
    color: "#3b82f6",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    maxWidth: 600,
  },

  actions: {
    display: "flex",
    gap: 12,
    marginTop: 10,
  },

  primaryBtn: {
    padding: "12px 18px",
    background: "#111",
    color: "#fff",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
  },

  secondaryBtn: {
    padding: "12px 18px",
    background: "#fff",
    color: "#111",
    borderRadius: 10,
    textDecoration: "none",
    border: "1px solid #ddd",
    fontWeight: 600,
  },

  stats: {
    maxWidth: 800,
    margin: "60px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 16,
    textAlign: "center",
  },

  statCard: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
  },

  preview: {
    maxWidth: 1000,
    margin: "60px auto 0",
  },

  testimonials: {
    maxWidth: 1000,
    margin: "60px auto 0",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
    textAlign: "center",
  },
};