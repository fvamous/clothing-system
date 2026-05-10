// components/admin/ProductCard.tsx

"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
  Package,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import SmartImage from "@/components/ui/SmartImage";

type Product = {
  id: string;

  name: string;

  price: number;

  stock: number;

  category?: string;

  imageUrl?: string;
};

type Props = {
  product: Product;

  onDelete?: (
    id: string
  ) => void;
};

function formatPrice(
  price: number
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",

      currency: "IDR",

      maximumFractionDigits: 0,
    }
  ).format(price);
}

export default function ProductCard({
  product,
  onDelete,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/40
        bg-white/70
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        transition-all
        duration-500
        hover:shadow-[0_25px_80px_rgba(255,154,158,0.22)]
      "
    >
      {/* PREMIUM GLOW */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            -right-16
            -top-16
            h-44
            w-44
            rounded-full
            bg-pink-300/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-20
            -left-10
            h-40
            w-40
            rounded-full
            bg-violet-300/20
            blur-3xl
          "
        />
      </div>

      {/* IMAGE */}
      <div
        className="
          relative
          aspect-square
          overflow-hidden
        "
      >
        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0
            z-10
            bg-gradient-to-t
            from-black/30
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        <SmartImage
          src={
            product.imageUrl ||
            "/placeholder.png"
          }
          alt={product.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-110
          "
        />

        {/* CATEGORY */}
        <div className="absolute left-4 top-4 z-20">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/30
              bg-black/55
              px-4
              py-2
              text-xs
              font-medium
              text-white
              backdrop-blur-xl
            "
          >
            <Package size={12} />

            <span>
              {product.category ||
                "Uncategorized"}
            </span>
          </div>
        </div>

        {/* FLOATING PREMIUM BADGE */}
        <div
          className="
            absolute
            right-4
            top-4
            z-20
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              border
              border-white/40
              bg-white/20
              text-white
              backdrop-blur-xl
            "
          >
            <Sparkles size={16} />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 space-y-5 p-6">
        {/* PRODUCT INFO */}
        <div className="space-y-3">
          <h3
            className="
              line-clamp-1
              text-xl
              font-semibold
              tracking-tight
              text-black
            "
          >
            {product.name}
          </h3>

          <div
            className="
              flex
              items-end
              justify-between
            "
          >
            <p
              className="
                text-3xl
                font-bold
                tracking-tight
                text-black
              "
            >
              {formatPrice(
                product.price
              )}
            </p>

            <div
              className="
                rounded-full
                bg-emerald-100
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-700
              "
            >
              Ready
            </div>
          </div>
        </div>

        {/* STOCK */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/40
            bg-gradient-to-r
            from-gray-50
            to-white
            px-4
            py-4
          "
        >
          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-wider
                text-gray-400
              "
            >
              Inventory
            </p>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-gray-600
              "
            >
              Available stock
            </p>
          </div>

          <div
            className="
              flex
              h-12
              min-w-[48px]
              items-center
              justify-center
              rounded-2xl
              bg-black
              px-4
              text-sm
              font-bold
              text-white
              shadow-lg
            "
          >
            {product.stock}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="flex-1"
          >
            <Button
              variant="outline"
              className="
                h-12
                w-full
                rounded-2xl
                border-white/40
                bg-white/70
                text-black
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-white
              "
            >
              <Pencil
                size={16}
                className="mr-2"
              />

              Edit Product
            </Button>
          </Link>

          {!!onDelete && (
            <Button
              variant="danger"
              className="
                h-12
                rounded-2xl
                px-5
                transition-all
                duration-300
                hover:scale-[1.04]
              "
              onClick={() =>
                onDelete(
                  product.id
                )
              }
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}