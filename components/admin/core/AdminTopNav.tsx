"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

type ProductSearch = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
};

export default function AdminTopNav() {
  const pathname = usePathname();

  const { theme, systemTheme } = useTheme();

  const currentTheme =
    theme === "system"
      ? systemTheme
      : theme;

  const isDark =
    currentTheme === "dark";

  /* =========================
     STATES
  ========================= */
  const [notifCount, setNotifCount] =
    useState<number>(0);

  const [query, setQuery] =
    useState<string>("");

  const [results, setResults] = useState<
    ProductSearch[]
  >([]);

  const [open, setOpen] =
    useState<boolean>(false);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [mobileMenu, setMobileMenu] =
    useState<boolean>(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  /* =========================
     ACTIVE NAV
  ========================= */
  const isActive = (path: string) =>
    pathname.startsWith(path);

  /* =========================
     PAGE TITLE
  ========================= */
  const title = useMemo(() => {
    if (
      pathname.startsWith(
        "/admin/products"
      )
    ) {
      return "Products";
    }

    if (
      pathname.startsWith(
        "/admin/orders"
      )
    ) {
      return "Orders";
    }

    if (
      pathname.startsWith(
        "/admin/lookbook"
      )
    ) {
      return "Lookbook";
    }

    return "Dashboard";
  }, [pathname]);

  /* =========================
     FETCH NOTIFICATION
  ========================= */
  useEffect(() => {
    let mounted = true;

    async function fetchNotif() {
      try {
        const res = await fetch(
          "/api/orders/unread"
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!mounted) return;

        setNotifCount(
          Number(data?.count ?? 0)
        );
      } catch {
        //
      }
    }

    fetchNotif();

    const interval = setInterval(
      fetchNotif,
      15000
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  /* =========================
     SEARCH
  ========================= */
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller =
      new AbortController();

    const delay = setTimeout(
      async () => {
        setLoading(true);

        try {
          const res = await fetch(
            `/api/search?q=${encodeURIComponent(
              query
            )}`,
            {
              signal:
                controller.signal,
            }
          );

          if (!res.ok) {
            setResults([]);
            return;
          }

          const data = await res.json();

          const safeProducts: ProductSearch[] =
            Array.isArray(
              data?.products
            )
              ? data.products.map(
                  (p: any) => ({
                    id: String(
                      p?.id ?? ""
                    ),

                    name: String(
                      p?.name ??
                        "Untitled"
                    ),

                    price: Number(
                      p?.price ?? 0
                    ),

                    image:
                      p?.imageUrl ??
                      null,
                  })
                )
              : [];

          setResults(safeProducts);
        } catch (err) {
          if (
            err instanceof
              DOMException &&
            err.name ===
              "AbortError"
          ) {
            return;
          }

          setResults([]);
        } finally {
          setLoading(false);
        }
      },
      300
    );

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query]);

  /* =========================
     CLOSE DROPDOWN
  ========================= */
  useEffect(() => {
    function handleClickOutside(
      e: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <>
      <header
        style={{
          ...styles.bar,

          background: isDark
            ? "rgba(15,23,42,0.78)"
            : "rgba(255,255,255,0.78)",

          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(15,23,42,0.06)",

          boxShadow: isDark
            ? "0 20px 40px rgba(0,0,0,0.18)"
            : "0 20px 40px rgba(15,23,42,0.08)",
        }}
      >
        {/* LEFT */}
        <div style={styles.left}>
          <button
            type="button"
            style={{
              ...styles.menu,

              background: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(15,23,42,0.04)",

              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(15,23,42,0.06)",

              color: isDark
                ? "#fff"
                : "#0f172a",
            }}
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
          >
            <Menu size={18} />
          </button>

          <h2
            style={{
              ...styles.title,
              color: isDark
                ? "#fff"
                : "#0f172a",
            }}
          >
            {title}
          </h2>

          {/* DESKTOP NAV */}
          <nav style={styles.nav}>
            <Link
              href="/admin/products"
              style={{
                ...styles.link,

                color: isDark
                  ? "#94a3b8"
                  : "#475569",

                ...(isActive(
                  "/admin/products"
                )
                  ? {
                      ...styles.active,

                      background: isDark
                        ? "rgba(59,130,246,0.16)"
                        : "rgba(59,130,246,0.10)",

                      color: isDark
                        ? "#60a5fa"
                        : "#2563eb",
                    }
                  : {}),
              }}
            >
              Products
            </Link>

            <Link
              href="/admin/orders"
              style={{
                ...styles.link,

                color: isDark
                  ? "#94a3b8"
                  : "#475569",

                ...(isActive(
                  "/admin/orders"
                )
                  ? {
                      ...styles.active,

                      background: isDark
                        ? "rgba(59,130,246,0.16)"
                        : "rgba(59,130,246,0.10)",

                      color: isDark
                        ? "#60a5fa"
                        : "#2563eb",
                    }
                  : {}),
              }}
            >
              Orders
            </Link>

            <Link
              href="/admin/lookbook"
              style={{
                ...styles.link,

                color: isDark
                  ? "#94a3b8"
                  : "#475569",

                ...(isActive(
                  "/admin/lookbook"
                )
                  ? {
                      ...styles.active,

                      background: isDark
                        ? "rgba(59,130,246,0.16)"
                        : "rgba(59,130,246,0.10)",

                      color: isDark
                        ? "#60a5fa"
                        : "#2563eb",
                    }
                  : {}),
              }}
            >
              Lookbook
            </Link>
          </nav>
        </div>

        {/* SEARCH */}
        <div
          style={styles.searchWrapper}
          ref={wrapperRef}
        >
          <div
            style={{
              ...styles.searchBox,

              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(15,23,42,0.04)",

              border: isDark
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(15,23,42,0.06)",

              color: isDark
                ? "#fff"
                : "#0f172a",
            }}
          >
            <Search size={16} />

            <input
              placeholder="Search product..."
              style={{
                ...styles.input,
                color: isDark
                  ? "#fff"
                  : "#0f172a",
              }}
              value={query}
              onChange={(e) => {
                setQuery(
                  e.target.value
                );

                setOpen(true);
              }}
              onFocus={() =>
                setOpen(true)
              }
            />
          </div>

          {/* DROPDOWN */}
          {open &&
            (loading ||
              results.length >
                0) && (
              <div
                style={{
                  ...styles.dropdown,

                  background: isDark
                    ? "#0f172a"
                    : "#ffffff",

                  border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(15,23,42,0.06)",

                  boxShadow: isDark
                    ? "0 20px 50px rgba(0,0,0,0.35)"
                    : "0 20px 50px rgba(15,23,42,0.10)",
                }}
              >
                {loading ? (
                  <div
                    style={{
                      ...styles.loading,
                      color: isDark
                        ? "#cbd5e1"
                        : "#475569",
                    }}
                  >
                    Searching...
                  </div>
                ) : (
                  results.map(
                    (item) => (
                      <Link
                        key={
                          item.id
                        }
                        href={`/product/${item.id}`}
                        style={{
                          ...styles.item,

                          color: isDark
                            ? "#fff"
                            : "#0f172a",

                          borderBottom: isDark
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "1px solid rgba(15,23,42,0.06)",
                        }}
                        onClick={() => {
                          setOpen(
                            false
                          );

                          setQuery(
                            ""
                          );
                        }}
                      >
                        <Image
                          src={
                            item.image ||
                            "/file.svg"
                          }
                          alt={
                            item.name
                          }
                          width={
                            42
                          }
                          height={
                            42
                          }
                          style={
                            styles.img
                          }
                        />

                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                            }}
                          >
                            {
                              item.name
                            }
                          </div>

                          <div
                            style={{
                              fontSize: 12,
                              opacity: 0.7,
                            }}
                          >
                            Rp{" "}
                            {item.price.toLocaleString(
                              "id-ID"
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  )
                )}
              </div>
            )}
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <button
            type="button"
            style={{
              ...styles.icon,

              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(15,23,42,0.04)",

              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(15,23,42,0.06)",

              color: isDark
                ? "#fff"
                : "#0f172a",
            }}
          >
            <Bell size={18} />

            {notifCount > 0 && (
              <span
                style={
                  styles.badge
                }
              >
                {notifCount}
              </span>
            )}
          </button>

          <div
            style={{
              ...styles.user,
              color: isDark
                ? "#fff"
                : "#0f172a",
            }}
          >
            👨‍💼 Admin
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div
          style={{
            ...styles.mobileMenu,

            background: isDark
              ? "#0f172a"
              : "#ffffff",

            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(15,23,42,0.06)",
          }}
        >
          <Link
            href="/admin/products"
            style={{
              ...styles.mobileLink,
              color: isDark
                ? "#fff"
                : "#0f172a",
            }}
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            style={{
              ...styles.mobileLink,
              color: isDark
                ? "#fff"
                : "#0f172a",
            }}
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Orders
          </Link>

          <Link
            href="/admin/lookbook"
            style={{
              ...styles.mobileLink,
              color: isDark
                ? "#fff"
                : "#0f172a",
            }}
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Lookbook
          </Link>
        </div>
      )}
    </>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  bar: {
    position: "sticky",
    top: 16,

    zIndex: 30,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 20,

    padding: "14px 18px",

    backdropFilter: "blur(20px)",
    WebkitBackdropFilter:
      "blur(20px)",

    borderRadius: 28,

    marginBottom: 16,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  menu: {
    width: 40,
    height: 40,

    display: "none",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 12,

    cursor: "pointer",
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  link: {
    textDecoration: "none",

    fontSize: 14,
    fontWeight: 500,

    padding: "8px 14px",

    borderRadius: 12,

    transition: "0.2s ease",
  },

  active: {
    fontWeight: 600,
  },

  searchWrapper: {
    flex: 1,
    maxWidth: 420,
    position: "relative",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,

    padding: "10px 14px",

    borderRadius: 16,
  },

  input: {
    width: "100%",

    border: "none",
    outline: "none",

    background: "transparent",

    fontSize: 14,
  },

  dropdown: {
    position: "absolute",

    top: 58,
    left: 0,

    width: "100%",

    overflow: "hidden",

    borderRadius: 20,

    zIndex: 100,
  },

  loading: {
    padding: 16,
    fontSize: 13,
  },

  item: {
    display: "flex",
    alignItems: "center",

    gap: 12,

    padding: 14,

    textDecoration: "none",
  },

  img: {
    borderRadius: 12,
    objectFit: "cover",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  icon: {
    position: "relative",

    width: 42,
    height: 42,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 14,

    cursor: "pointer",
  },

  badge: {
    position: "absolute",

    top: -4,
    right: -4,

    minWidth: 18,
    height: 18,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,

    background: "#ef4444",

    color: "#fff",

    fontSize: 10,
    fontWeight: 700,
  },

  user: {
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },

  mobileMenu: {
    display: "none",
  },

  mobileLink: {
    textDecoration: "none",
  },
};