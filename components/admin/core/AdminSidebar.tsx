"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Images,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const { theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme =
    theme === "system" ? systemTheme : theme;

  const isDark = currentTheme === "dark";

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(path);
  };

  const menus = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },

    {
      href: "/admin/products",
      label: "Products",
      icon: <Package size={18} />,
    },

    {
      href: "/admin/orders",
      label: "Orders",
      icon: <ShoppingCart size={18} />,
    },

    {
      href: "/admin/lookbook",
      label: "Lookbook",
      icon: <Images size={18} />,
    },
  ];

  return (
    <aside
      style={{
        ...styles.sidebar,

        background: isDark
          ? "linear-gradient(180deg, #0f172a 0%, #111827 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",

        borderRight: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(15,23,42,0.06)",

        boxShadow: isDark
          ? "0 20px 50px rgba(15,23,42,0.35)"
          : "0 20px 50px rgba(15,23,42,0.08)",
      }}
    >
      {/* TOP */}
      <div style={styles.top}>
        <div
          style={{
            ...styles.logoWrap,

            background: isDark
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.75)",

            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(15,23,42,0.06)",
          }}
        >
          <div style={styles.logoCircle}>EV</div>

          <div>
            <h2
              style={{
                ...styles.logo,
                color: isDark ? "#fff" : "#0f172a",
              }}
            >
              EV Admin
            </h2>

            <p
              style={{
                ...styles.subLogo,
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            >
              Premium Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav style={styles.nav}>
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            style={{
              ...styles.link,

              color: isActive(menu.href)
                ? isDark
                  ? "#fff"
                  : "#0f172a"
                : isDark
                ? "#94a3b8"
                : "#64748b",

              ...(isActive(menu.href)
                ? {
                    background: isDark
                      ? "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.22))"
                      : "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.10))",

                    border: isDark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(15,23,42,0.08)",

                    boxShadow: isDark
                      ? "0 12px 30px rgba(59,130,246,0.15)"
                      : "0 12px 30px rgba(59,130,246,0.08)",
                  }
                : {}),
            }}
          >
            <span style={styles.icon}>
              {menu.icon}
            </span>

            <span>{menu.label}</span>
          </Link>
        ))}
      </nav>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        <div
          style={{
            ...styles.bottomCard,

            background: isDark
              ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
              : "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",

            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(15,23,42,0.06)",
          }}
        >
          <div style={styles.bottomGlow} />

          <p
            style={{
              ...styles.bottomTitle,
              color: isDark ? "#fff" : "#0f172a",
            }}
          >
            System Status
          </p>

          <div style={styles.statusRow}>
            <span style={styles.statusDot} />

            <span
              style={{
                ...styles.statusText,
                color: isDark ? "#cbd5e1" : "#475569",
              }}
            >
              All services running
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  sidebar: {
    width: 260,

    minHeight: "100vh",

    position: "sticky",
    top: 0,

    display: "flex",
    flexDirection: "column",

    padding: 18,

    boxSizing: "border-box",
    borderRadius: 32,

    overflow: "hidden",
  },

  top: {
    marginBottom: 24,
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 14,

    padding: 14,

    borderRadius: 24,

    backdropFilter: "blur(18px)",
  },

  logoCircle: {
    width: 46,
    height: 46,

    borderRadius: 16,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontWeight: 800,
    fontSize: 15,

    color: "#fff",

    background:
      "linear-gradient(135deg, #3b82f6, #8b5cf6)",

    boxShadow:
      "0 10px 25px rgba(59,130,246,0.35)",
  },

  logo: {
    margin: 0,

    fontSize: 16,
    fontWeight: 700,
  },

  subLogo: {
    margin: "3px 0 0",

    fontSize: 12,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 10,

    flex: 1,
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: 12,

    padding: "14px 16px",

    borderRadius: 18,

    textDecoration: "none",

    fontSize: 14,
    fontWeight: 500,

    transition: "all .25s ease",

    border:
      "1px solid transparent",
  },

  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  bottom: {
    marginTop: "auto",
    paddingTop: 20,
  },

  bottomCard: {
    position: "relative",

    overflow: "hidden",

    padding: 18,

    borderRadius: 26,

    backdropFilter: "blur(18px)",

    minHeight: 120,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  bottomGlow: {
    position: "absolute",

    width: 120,
    height: 120,

    borderRadius: "50%",

    background:
      "rgba(59,130,246,0.25)",

    filter: "blur(50px)",

    right: -30,
    bottom: -30,
  },

  bottomTitle: {
    margin: 0,

    position: "relative",

    fontSize: 15,
    fontWeight: 700,
  },

  statusRow: {
    position: "relative",

    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  statusDot: {
    width: 10,
    height: 10,

    borderRadius: "50%",

    background: "#22c55e",

    boxShadow:
      "0 0 14px rgba(34,197,94,0.8)",
  },

  statusText: {
    fontSize: 13,
  },
};