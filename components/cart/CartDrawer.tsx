"use client";

import Link from "next/link";

import {
  X,
  ShoppingBag,
} from "lucide-react";

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
  const {
    cart,
    totalPrice,
  } = useCart();

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-sm
          "
        />
      )}

      {/* DRAWER */}
      <aside
        className={`
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-full
          max-w-md
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            p-5
          "
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />

            <h2 className="text-lg font-bold">
              Shopping Cart
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              transition
              hover:bg-gray-100
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div
          className="
            flex-1
            space-y-4
            overflow-y-auto
            p-5
          "
        >
          {cart.length === 0 ? (
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <ShoppingBag className="mb-4 h-12 w-12 text-gray-300" />

              <h3 className="text-lg font-semibold">
                Cart Empty
              </h3>

              <p className="mt-1 text-sm text-gray-500">
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
              space-y-4
              border-t
              p-5
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Total
              </span>

              <span className="text-2xl font-bold">
                Rp{" "}
                {totalPrice.toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="
                flex
                h-12
                items-center
                justify-center
                rounded-2xl
                bg-black
                text-sm
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}