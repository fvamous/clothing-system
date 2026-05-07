"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTopNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div style={styles.bar}>
      <div style={styles.inner}>
        <h2 style={styles.logo}>Admin Panel</h2>

        <nav style={styles.nav}>
          <Link
            href="/admin/products"
            style={{
              ...styles.link,
              ...(isActive("/admin/products") ? styles.active : {}),
            }}
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            style={{
              ...styles.link,
              ...(isActive("/admin/orders") ? styles.active : {}),
            }}
          >
            Orders
          </Link>
        </nav>
      </div>
    </div>
  );
}

/* =========================
   STYLES (MUST OUTSIDE COMPONENT)
========================= */
const styles: Record<string, React.CSSProperties> = {
  bar: {
    background: "linear-gradient(90deg, #0f172a, #111827)",
    color: "#1d1a1a",
    padding: "10px 0",
    position: "sticky",
    top: 0,
    zIndex: 50,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },

  inner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 18px",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 0.5,
    margin: 0,
  },

  nav: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  link: {
    color: "#94a3b8",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 10,
    fontSize: 14,
    transition: "all 0.2s ease",
  },

  active: {
    background: "rgba(59,130,246,0.15)",
    color: "#60a5fa",
  },
};