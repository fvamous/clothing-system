"use client";

import Image from "next/image";

import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

type CartItemProps = {
  item: {
    id: string;

    name: string;

    price: number;

    imageUrl?: string;

    quantity: number;
  };
};

export default function CartItem({
  item,
}: CartItemProps) {
  const {
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  // =========================
  // SUBTOTAL
  // =========================
  const subtotal =
    item.price * item.quantity;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex gap-4">
        {/* IMAGE */}
        <Link
          href={`/product/${item.id}`}
          className="
            relative
            h-28
            w-28
            shrink-0
            overflow-hidden
            rounded-2xl
            bg-gray-100
          "
        >
          <Image
            src={
              item.imageUrl ||
              "/file.svg"
            }
            alt={item.name}
            fill
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </Link>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col">
          {/* TOP */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Link
                href={`/product/${item.id}`}
                className="
                  line-clamp-2
                  text-lg
                  font-semibold
                  text-black
                  transition-opacity
                  hover:opacity-70
                "
              >
                {item.name}
              </Link>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Rp{" "}
                {item.price.toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>

            {/* DELETE */}
            <button
              type="button"
              onClick={() =>
                removeFromCart(
                  item.id
                )
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                bg-white
                transition-all
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-500
              "
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* BOTTOM */}
          <div className="mt-auto flex items-end justify-between pt-5">
            {/* QUANTITY */}
            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                p-1
              "
            >
              <button
                type="button"
                onClick={() =>
                  decreaseQty(
                    item.id
                  )
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  hover:bg-white
                "
              >
                <Minus className="h-4 w-4" />
              </button>

              <span
                className="
                  min-w-[36px]
                  text-center
                  text-sm
                  font-semibold
                "
              >
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  increaseQty(
                    item.id
                  )
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  hover:bg-white
                "
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* SUBTOTAL */}
            <div className="text-right">
              <p
                className="
                  text-xs
                  text-gray-400
                "
              >
                Subtotal
              </p>

              <p
                className="
                  mt-1
                  text-xl
                  font-bold
                  tracking-tight
                  text-black
                "
              >
                Rp{" "}
                {subtotal.toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HOVER GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            -right-10
            -top-10
            h-32
            w-32
            rounded-full
            bg-gray-200/40
            blur-3xl
          "
        />
      </div>
    </div>
  );
}