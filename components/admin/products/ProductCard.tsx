// components/admin/ProductCard.tsx

"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

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
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          aspect-square
          overflow-hidden
          bg-gray-100
        "
      >
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
            duration-500
            group-hover:scale-105
          "
        />

        {/* CATEGORY BADGE */}
        <div className="absolute left-4 top-4">
          <div
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-black/80
              px-3
              py-1
              text-xs
              font-medium
              text-white
              backdrop-blur
            "
          >
            <Package
              size={12}
            />

            <span>
              {product.category ||
                "Uncategorized"}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="space-y-5 p-5">
        {/* PRODUCT INFO */}
        <div className="space-y-2">
          <h3
            className="
              line-clamp-1
              text-lg
              font-semibold
              text-black
            "
          >
            {product.name}
          </h3>

          <p
            className="
              text-2xl
              font-bold
              tracking-tight
              text-black
            "
          >
            {formatPrice(
              product.price
            )}
          </p>
        </div>

        {/* STOCK */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            px-4
            py-3
          "
        >
          <span
            className="
              text-sm
              font-medium
              text-gray-500
            "
          >
            Stock
          </span>

          <span
            className="
              rounded-full
              bg-black
              px-3
              py-1
              text-sm
              font-semibold
              text-white
            "
          >
            {product.stock}
          </span>
        </div>

        {/* ACTION */}
        <div className="flex gap-3">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="flex-1"
          >
            <Button
              variant="outline"
              className="
                h-11
                w-full
                rounded-xl
              "
            >
              <Pencil
                size={16}
                className="mr-2"
              />

              Edit
            </Button>
          </Link>

          {!!onDelete && (
            <Button
              variant="destructive"
              className="
                h-11
                rounded-xl
                px-4
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
    </div>
  );
}