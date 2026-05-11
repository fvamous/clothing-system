"use client";

import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  const { cart, totalPrice } = useCart();
  const { theme, systemTheme } = useTheme();

  const currentTheme =
    theme === "system" ? systemTheme : theme;

  const isDark = currentTheme === "dark";

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          onClick={onClose}
          className="
            fixed inset-0 z-40
            backdrop-blur-md
          "
          style={{
            background: isDark
              ? "rgba(0,0,0,0.6)"
              : "rgba(0,0,0,0.3)",
          }}
        />
      )}

      {/* DRAWER WRAPPER */}
      <aside
        className={`
          fixed right-0 top-0 z-[1000]
          h-screen w-full max-w-md

          flex flex-col

          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* MAIN GLASS CAPSULE */}
        <div
          className="
            m-3 flex h-[calc(100vh-24px)] flex-col
            rounded-[36px]

            backdrop-blur-2xl

            overflow-hidden
          "
          style={{
            background: isDark
              ? "rgba(15,23,42,0.78)"
              : "rgba(255,255,255,0.4)",

            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(255,255,255,0.3)",

            boxShadow: isDark
              ? "0 30px 120px rgba(0,0,0,0.45)"
              : "0 30px 120px rgba(0,0,0,0.18)",
          }}
        >
          {/* HEADER */}
          <div
            className="
              flex items-center justify-between
              px-5 py-4

              backdrop-blur-xl
            "
            style={{
              background: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.2)",

              borderBottom: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl
                  backdrop-blur-xl
                "
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.4)",

                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                <ShoppingBag className="h-4 w-4" />
              </div>

              <h2
                className="text-lg font-bold"
                style={{
                  color: isDark ? "#f8fafc" : "#0f172a",
                }}
              >
                Shopping Cart
              </h2>
            </div>

            <button
              onClick={onClose}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl

                backdrop-blur-xl

                transition hover:scale-105
              "
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.4)",

                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(255,255,255,0.3)",

                color: isDark ? "#f8fafc" : "#0f172a",
              }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div
                className="
                  flex h-full flex-col
                  items-center justify-center
                  text-center
                "
              >
                <ShoppingBag
                  className="mb-4 h-12 w-12"
                  style={{
                    color: isDark ? "#64748b" : "#9ca3af",
                  }}
                />

                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: isDark ? "#f8fafc" : "#111827",
                  }}
                >
                  Cart Empty
                </h3>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color: isDark ? "#94a3b8" : "#6b7280",
                  }}
                >
                  Add product to cart
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))
            )}
          </div>

          {/* FOOTER */}
          {cart.length > 0 && (
            <div
              className="
                p-5
                backdrop-blur-xl
              "
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.2)",

                borderTop: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{
                    color: isDark ? "#94a3b8" : "#475569",
                  }}
                >
                  Total
                </span>

                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{
                    color: isDark ? "#f8fafc" : "#0f172a",
                  }}
                >
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="
                  mt-4 flex h-12 items-center justify-center
                  rounded-2xl

                  font-semibold

                  transition hover:scale-[1.02]
                "
                style={{
                  background: isDark
                    ? "linear-gradient(135deg,#f8fafc,#cbd5e1)"
                    : "rgba(0,0,0,0.9)",

                  color: isDark ? "#0f172a" : "#ffffff",

                  boxShadow: isDark
                    ? "0 12px 40px rgba(255,255,255,0.08)"
                    : "0 12px 40px rgba(0,0,0,0.18)",
                }}
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}