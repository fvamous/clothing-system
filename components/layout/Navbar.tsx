"use client";

import Link from "next/link";
import Image from "next/image";

import {
  useSession,
  signIn,
  signOut,
} from "next-auth/react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import { useCart } from "@/context/CartContext";

import CartDrawer from "@/components/cart/CartDrawer";

import DarkToggle from "@/components/ui/DarkToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart();

  const [openCart, setOpenCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = session?.user?.role === "ADMIN";

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openCart ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCart]);

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}
      <motion.header
        initial={{ y: -25, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: scrolled ? 0.985 : 1,
        }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          ...styles.header,

          background: scrolled
          ? "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255, 223, 233, 0.35))"
          : "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255, 223, 233, 0.25))",

          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",

          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid rgba(255,255,255,0.35)",

          boxShadow: scrolled
          ? "0 18px 40px rgba(255, 154, 158, 0.10)"
          : "0 10px 30px rgba(255, 154, 158, 0.06)",
        }}
      >
        {/* LEFT */}
        <div style={styles.left}>
          <Link href="/" style={styles.logoWrap}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              style={styles.logoFrame}
            >
              <Image
                src="/logo.jpeg"
                alt="EV Logo"
                width={32}
                height={32}
                priority
                style={styles.logoImg}
              />
            </motion.div>

            <span style={styles.brand}>EV Store</span>
          </Link>
        </div>

        {/* CENTER NAV */}
        <nav style={styles.nav}>
          <motion.div whileHover={{ y: -1 }}>
            <Link href="/catalog" style={styles.link}>
              Catalog
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenCart(true)}
            style={styles.cartBtn}
            type="button"
          >
            Cart

            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={styles.badge}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          {isAdmin && (
            <motion.div whileHover={{ y: -1 }}>
              <Link href="/admin" style={styles.adminLink}>
                Admin
              </Link>
            </motion.div>
          )}
        </nav>

        {/* RIGHT */}
        <div style={styles.right}>
          <DarkToggle />

          {!session ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => signIn("google")}
              style={styles.button}
            >
              Login
            </motion.button>
          ) : (
            <div style={styles.userBox}>
              <span style={styles.email}>
                {session.user?.email}
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => signOut()}
                style={styles.button}
              >
                Logout
              </motion.button>
            </div>
          )}
        </div>
      </motion.header>

      {/* CART */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  );
}

/* =========================
   STYLES (PREMIUM SAAS UI)
========================= */

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "14px 28px",
    position: "sticky",
    top: 0,
    zIndex: 50,

    transition: "all .3s ease",

    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  },

  left: {
    display: "flex",
    alignItems: "center",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,

    textDecoration: "none",
    color: "#111",
    fontWeight: 700,

    padding: "8px 14px",
    borderRadius: 999,

    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },

  logoFrame: {
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 10,
    padding: 2,
    background: "#fff",
  },

  logoImg: {
    borderRadius: 8,
  },

  brand: {
    fontSize: 16,
    letterSpacing: 0.3,
  },

  nav: {
    display: "flex",
    gap: 10,
    alignItems: "center",

    padding: "8px 10px",
    borderRadius: 999,

    background: "rgba(255,255,255,0.45)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.4)",
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: 14,
    padding: "7px 14px",
    borderRadius: 999,
  },

  cartBtn: {
    background: "rgba(255,255,255,0.25)",
    border: "1px solid rgba(255,255,255,0.35)",
    cursor: "pointer",

    fontSize: 14,
    color: "#333",

    display: "flex",
    alignItems: "center",

    padding: "7px 14px",
    borderRadius: 999,

    backdropFilter: "blur(14px)",
  },

  adminLink: {
    color: "#d11a2a",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    padding: "6px 10px",
    borderRadius: 999,
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  email: {
    fontSize: 13,
    maxWidth: 180,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  button: {
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.04)",
    border: "1px solid rgba(255,255,255,0.5)",
    cursor: "pointer",
  },

  badge: {
    marginLeft: 6,
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    fontSize: 10,
    borderRadius: 999,
    padding: "2px 7px",
    minWidth: 18,
    textAlign: "center",
  },
};