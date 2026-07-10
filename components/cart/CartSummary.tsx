"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const {
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div
      className="
        space-y-5
        rounded-[32px]
        border
        border-zinc-200/70
        bg-white/70
        p-6
        text-zinc-950
        shadow-sm
        backdrop-blur-xl
        dark:border-white/10
        dark:bg-white/5
        dark:text-white
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-zinc-500 dark:text-zinc-400">
          Total Items
        </span>

        <span>{totalItems}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-zinc-500 dark:text-zinc-400">
          Total Price
        </span>

        <span className="font-semibold">
          Rp {totalPrice.toLocaleString("id-ID")}
        </span>
      </div>

      <Link
        href="/checkout"
        className="
          flex
          h-12
          items-center
          justify-center
          rounded-2xl
          bg-black
          text-sm
          font-medium
          text-white
          dark:bg-white
          dark:text-black
        "
      >
        Checkout
      </Link>
    </div>
  );
}
