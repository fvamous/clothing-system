    export default function Hero() {
  return (
    <section style={styles.hero}>
      <div style={styles.badge}>🔥 Modern Ecommerce System</div>

      <h1 style={styles.title}>
        Build Your <span style={styles.highlight}>Clothing Store</span> Like Shopify
      </h1>

      <p style={styles.subtitle}>
        Fullstack system with admin panel, orders, catalog, and authentication.
      </p>

      <div style={styles.actions}>
        <a href="/catalog" style={styles.primaryBtn}>
          Browse Catalog →
        </a>

        <a href="/admin" style={styles.secondaryBtn}>
          Admin Panel
        </a>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    maxWidth: 900,
    margin: "80px auto 0",
    textAlign: "center",
    padding: 30,
    borderRadius: 16,

    background:
      "linear-gradient(-45deg, #f9fafb, #ffffff, #e0f2fe, #fef3c7)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 12s ease infinite",
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#111",
    color: "#fff",
    fontSize: 12,
    marginBottom: 16,
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
    marginTop: 10,
  },

  actions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginTop: 20,
  },

  primaryBtn: {
    padding: "12px 18px",
    background: "#111",
    color: "#fff",
    borderRadius: 10,
    textDecoration: "none",
  },

  secondaryBtn: {
    padding: "12px 18px",
    background: "#fff",
    color: "#111",
    borderRadius: 10,
    border: "1px solid #ddd",
    textDecoration: "none",
  },
};