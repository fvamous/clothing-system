"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

export default function AdminTopNav() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname.startsWith(path);

  const getTitle = () => {
    if (pathname.startsWith("/admin/products"))
      return "Products";

    if (pathname.startsWith("/admin/orders"))
      return "Orders";

    return "Dashboard";
  };

  return (
    <header style={styles.bar}>
      {/* LEFT */}
      <div style={styles.left}>
        <button style={styles.menu}>☰</button>

        <h2 style={styles.title}>
          {getTitle()}
        </h2>

        <nav style={styles.nav}>
          <Link
            href="/admin/products"
            style={{
              ...styles.link,
              ...(isActive("/admin/products")
                ? styles.active
                : {}),
            }}
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            style={{
              ...styles.link,
              ...(isActive("/admin/orders")
                ? styles.active
                : {}),
            }}
          >
            Orders
          </Link>
        </nav>
      </div>

      {/* CENTER SEARCH */}
      <div style={styles.searchBox}>
        <Search size={16} />
        <input
          placeholder="Cari produk, order..."
          style={styles.input}
        />
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <button style={styles.icon}>
          <Bell size={18} />
          <span style={styles.badge}>
            3
          </span>
        </button>

        <div style={styles.user}>
          👨‍💼 Admin
        </div>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    position: "sticky",
    top: 0,
    zIndex: 50,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "10px 16px",
    background:
      "linear-gradient(90deg, #0f172a, #111827)",
    color: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  menu: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
  },

  title: {
    fontSize: 15,
    fontWeight: 700,
  },

  nav: {
    display: "flex",
    gap: 10,
    marginLeft: 10,
  },

  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: 13,
    padding: "6px 10px",
    borderRadius: 8,
  },

  active: {
    background: "rgba(59,130,246,0.2)",
    color: "#60a5fa",
  },

  searchBox: {
    flex: 1,
    maxWidth: 400,

    display: "flex",
    alignItems: "center",
    gap: 8,

    background: "rgba(255,255,255,0.08)",
    padding: "6px 10px",
    borderRadius: 10,
    margin: "0 20px",
  },

  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  icon: {
    position: "relative",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    background: "red",
    color: "#fff",
    fontSize: 10,
    borderRadius: 999,
    padding: "2px 5px",
  },

  user: {
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },
};