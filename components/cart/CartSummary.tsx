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
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-zinc-500">
          Total Items
        </span>

        <span>{totalItems}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-zinc-500">
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