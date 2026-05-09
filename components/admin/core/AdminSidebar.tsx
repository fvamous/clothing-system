"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.logo}>Admin Panel</h2>

      <nav style={styles.nav}>
        <Link
          href="/admin"
          style={{
            ...styles.link,
            ...(isActive("/admin") ? styles.active : {}),
          }}
        >
          Dashboard
        </Link>

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

        <Link
          href="/admin/lookbook"
          style={{
            ...styles.link,
            ...(isActive("/admin/lookbook") ? styles.active : {}),
          }}
        >
          Lookbook
        </Link>
      </nav>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 220,
    background: "#111827",
    color: "#fff",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  logo: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  link: {
    color: "#9ca3af",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 14,
    transition: "all 0.2s ease",
  },

  active: {
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
  },
};