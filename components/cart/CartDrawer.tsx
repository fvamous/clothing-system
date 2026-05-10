"use client";

import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, totalPrice } = useCart();

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-black/30
            backdrop-blur-md
          "
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
        {/* 🔥 MAIN GLASS CAPSULE */}
        <div
          className="
            m-3 flex h-[calc(100vh-24px)] flex-col
            rounded-[36px]

            bg-white/40
            backdrop-blur-2xl

            border border-white/30

            shadow-[0_30px_120px_rgba(0,0,0,0.18)]

            overflow-hidden
          "
        >
          {/* HEADER */}
          <div
            className="
              flex items-center justify-between
              px-5 py-4

              bg-white/20
              backdrop-blur-xl
              border-b border-white/20
            "
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/40 backdrop-blur-xl">
                <ShoppingBag className="h-4 w-4" />
              </div>

              <h2 className="text-lg font-bold">
                Shopping Cart
              </h2>
            </div>

            <button
              onClick={onClose}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl

                bg-white/40 backdrop-blur-xl
                border border-white/30

                transition hover:scale-105
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center opacity-70">
                <ShoppingBag className="mb-4 h-12 w-12 text-gray-400" />
                <h3 className="text-lg font-semibold">Cart Empty</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add product to cart
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))
            )}
          </div>

          {/* FOOTER */}
          {cart.length > 0 && (
            <div
              className="
                p-5

                bg-white/20
                backdrop-blur-xl

                border-t border-white/20
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Total
                </span>

                <span className="text-2xl font-bold tracking-tight">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="
                  mt-4 flex h-12 items-center justify-center
                  rounded-2xl

                  bg-black/90 text-white font-semibold

                  transition hover:scale-[1.02]
                "
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