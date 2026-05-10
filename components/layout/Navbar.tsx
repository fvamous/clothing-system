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

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Menu,
  X,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

import CartDrawer from "@/components/cart/CartDrawer";
import DarkToggle from "@/components/ui/DarkToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart();

  const [openCart, setOpenCart] = useState(false);
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  const isAdmin =
    session?.user?.role === "ADMIN";

  const cartCount = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  }, [cart]);

  /* =========================
     MOBILE DETECTION
  ========================= */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkMobile
      );
  }, []);

  /* =========================
     SCROLL EFFECT
  ========================= */
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

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  /* =========================
     LOCK BODY
  ========================= */
  useEffect(() => {
    document.body.style.overflow =
      openCart || mobileOpen
        ? "hidden"
        : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCart, mobileOpen]);

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}
      <motion.header
        initial={{
          y: -25,
          opacity: 0,
        }}
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
            ? "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,223,233,0.45))"
            : "linear-gradient(135deg, rgba(255,255,255,0.68), rgba(255,223,233,0.28))",

          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid rgba(255,255,255,0.35)",

          boxShadow: scrolled
            ? "0 18px 40px rgba(255,154,158,0.10)"
            : "0 10px 30px rgba(255,154,158,0.06)",
        }}
      >
        {/* LEFT */}
        <div style={styles.left}>
          <Link href="/" style={styles.logoWrap}>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                duration: 0.2,
              }}
              style={styles.logoFrame}
            >
              <Image
                src="/logo.jpeg"
                alt="EV Logo"
                width={34}
                height={34}
                priority
                style={styles.logoImg}
              />
            </motion.div>

            <span style={styles.brand}>
              EV Store
            </span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <nav style={styles.desktopNav}>
            <motion.div whileHover={{ y: -1 }}>
              <Link
                href="/catalog"
                style={styles.link}
              >
                Catalog
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setOpenCart(true)
              }
              style={styles.cartBtn}
              type="button"
            >
              Cart

              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  style={styles.badge}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {isAdmin && (
              <motion.div whileHover={{ y: -1 }}>
                <Link
                  href="/admin"
                  style={styles.adminLink}
                >
                  Admin
                </Link>
              </motion.div>
            )}
          </nav>
        )}

        {/* RIGHT */}
        <div style={styles.right}>
          {/* DESKTOP */}
          {!isMobile && (
            <div style={styles.desktopRight}>
              <DarkToggle />

              {!session ? (
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  type="button"
                  onClick={() =>
                    signIn("google")
                  }
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
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    type="button"
                    onClick={() =>
                      signOut()
                    }
                    style={styles.button}
                  >
                    Logout
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE BUTTON */}
          {isMobile && (
            <button
              type="button"
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              style={styles.mobileButton}
            >
              {mobileOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          )}
        </div>
      </motion.header>

      {/* =========================
          MOBILE MENU
      ========================= */}
      <AnimatePresence>
        {mobileOpen && isMobile && (
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.22,
            }}
            style={styles.mobileMenu}
          >
            <Link
              href="/catalog"
              style={styles.mobileLink}
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Catalog
            </Link>

            <button
              type="button"
              onClick={() => {
                setOpenCart(true);
                setMobileOpen(false);
              }}
              style={styles.mobileCart}
            >
              Cart ({cartCount})
            </button>

            {isAdmin && (
              <Link
                href="/admin"
                style={styles.mobileLink}
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Admin
              </Link>
            )}

            <div style={styles.mobileBottom}>
              <DarkToggle />

              {!session ? (
                <button
                  type="button"
                  onClick={() =>
                    signIn("google")
                  }
                  style={styles.button}
                >
                  Login
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    signOut()
                  }
                  style={styles.button}
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  );
}

/* =========================
   STYLES
========================= */

const styles: Record<
  string,
  React.CSSProperties
> = {
header: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  padding: "14px 20px",

  position: "sticky",
  top: 16,

  zIndex: 50,

  transition: "all .3s ease",

  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",

  borderRadius: 28,

  margin: "16px",

  border:
    "1px solid rgba(255,255,255,0.18)",

  background:
    "rgba(255,255,255,0.58)",

  boxShadow:
    "0 18px 40px rgba(15,23,42,0.08)",
},

  left: {
    display: "flex",
    alignItems: "center",
  },

logoWrap: {
  display: "flex",
  alignItems: "center",
  gap: 12,

  textDecoration: "none",

  padding: "10px 16px",

  borderRadius: 24,

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58))",

  border:
    "1px solid rgba(255,255,255,0.7)",

  backdropFilter: "blur(18px)",

  boxShadow:
    "0 10px 30px rgba(15,23,42,0.06)",
},

 logoFrame: {
  width: 42,
  height: 42,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: 14,

  padding: 3,

  background:
    "linear-gradient(135deg, #ffffff, #f8fafc)",

  border:
    "1px solid rgba(0,0,0,0.06)",

  boxShadow:
    "0 8px 20px rgba(15,23,42,0.08)",
},

  logoImg: {
    borderRadius: 8,
    width: "auto",
    height: "auto",
  },

 brand: {
  fontSize: 15,
  fontWeight: 700,

  color: "#0f172a",

  letterSpacing: 0.2,
},

desktopNav: {
  display: "flex",
  alignItems: "center",
  gap: 10,

  padding: "8px",

  borderRadius: 26,

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.45))",

  border:
    "1px solid rgba(255,255,255,0.65)",

  backdropFilter: "blur(20px)",

  boxShadow:
    "0 12px 35px rgba(15,23,42,0.06)",
},

link: {
  textDecoration: "none",

  color: "#334155",

  fontSize: 14,
  fontWeight: 600,

  padding: "11px 18px",

  borderRadius: 18,

  transition: "all .25s ease",

  background: "transparent",
},

cartBtn: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  gap: 6,

  padding: "11px 18px",

  borderRadius: 18,

  border:
    "1px solid rgba(255,255,255,0.55)",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58))",

  color: "#0f172a",

  fontSize: 14,
  fontWeight: 600,

  cursor: "pointer",

  transition: "all .25s ease",

  boxShadow:
    "0 10px 25px rgba(15,23,42,0.05)",
},

adminLink: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "11px 18px",

  borderRadius: 18,

  textDecoration: "none",

  fontSize: 14,
  fontWeight: 700,

  color: "#fff",

  background:
    "linear-gradient(135deg, #3b82f6, #8b5cf6)",

  boxShadow:
    "0 10px 25px rgba(59,130,246,0.28)",
},

  right: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

desktopRight: {
  display: "flex",
  alignItems: "center",
  gap: 12,

  padding: "8px",

  borderRadius: 24,

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.46))",

  border:
    "1px solid rgba(255,255,255,0.65)",

  backdropFilter: "blur(20px)",

  boxShadow:
    "0 10px 30px rgba(15,23,42,0.05)",
},

  mobileButton: {
    border: "none",
    background: "transparent",

    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: 44,
    height: 44,

    borderRadius: 14,

    backgroundColor:
      "rgba(255,255,255,0.65)",

    backdropFilter: "blur(16px)",
  },

  mobileMenu: {
    position: "fixed",

    top: 84,
    left: 16,
    right: 16,

    zIndex: 60,

    display: "flex",
    flexDirection: "column",

    gap: 14,

    padding: 20,

    borderRadius: 24,

    background:
      "rgba(255,255,255,0.92)",

    backdropFilter: "blur(24px)",

    boxShadow:
      "0 20px 50px rgba(0,0,0,0.12)",
  },

  mobileLink: {
    textDecoration: "none",

    color: "#111",

    fontSize: 15,
    fontWeight: 600,
  },

  mobileCart: {
    border: "none",

    background: "#111",
    color: "#fff",

    padding: "12px 16px",

    borderRadius: 14,

    cursor: "pointer",
  },

  mobileBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 10,
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
  padding: "10px 16px",

  borderRadius: 18,

  border:
    "1px solid rgba(255,255,255,0.6)",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))",

  color: "#111827",

  fontSize: 14,
  fontWeight: 600,

  cursor: "pointer",

  transition: "all .25s ease",
},

 badge: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  minWidth: 20,
  height: 20,

  padding: "0 6px",

  borderRadius: 999,

  background:
    "linear-gradient(135deg, #111827, #334155)",

  color: "#fff",

  fontSize: 10,
  fontWeight: 700,

  boxShadow:
    "0 6px 16px rgba(15,23,42,0.18)",
},
};