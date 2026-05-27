"use client";

import Image from "next/image";

import type { CartItem as TCartItem } from "@/types/entities/cart";

import { useCart } from "@/context/CartContext";

type CartItemProps = {
  item: TCartItem;
};

export default function CartItem({
  item,
}: CartItemProps) {
  const {
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  return (
    <div
      className="
        flex
        gap-4
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-4
      "
    >
      <div
        className="
          relative
          h-24
          w-20
          overflow-hidden
          rounded-2xl
          bg-zinc-100
          dark:bg-zinc-900
        "
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-xs
              text-zinc-400
            "
          >
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-medium">
          {item.name}
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          Rp{" "}
          {item.price.toLocaleString(
            "id-ID"
          )}
        </p>

        <div className="mt-auto flex items-center gap-3">
          <button
            onClick={() =>
              decreaseQty(item.productId)
            }
            className="h-8 w-8 rounded-xl border"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              increaseQty(item.productId)
            }
            className="h-8 w-8 rounded-xl border"
          >
            +
          </button>

          <button
            onClick={() =>
              removeFromCart(item.productId)
            }
            className="
              ml-auto
              text-sm
              text-red-500
            "
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}