"use client";

import Image from "next/image";

import Link from "next/link";

import type {
  Product,
  Category,
} from "@prisma/client";

import ProductPrice from "./ProductPrice";

import Surface from "@/components/primitives/surface/Surface";

type ProductWithCategory =
  Product & {
    category?: Category | null;
  };

type ProductCardProps = {
  product: ProductWithCategory;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
    >
      <Surface
        glass
        hover
        className="
          overflow-hidden
          rounded-[28px]
          transition-all
          duration-300
        "
      >
        <div
          className="
            aspect-[4/5]
            overflow-hidden
            bg-zinc-100

            dark:bg-zinc-900
          "
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={900}
              height={1200}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-sm
                text-zinc-400
              "
            >
              No Image
            </div>
          )}
        </div>

        <div className="space-y-2 p-5">
          {product.category && (
            <p
              className="
                text-xs
                uppercase
                tracking-[0.24em]
                text-zinc-500
              "
            >
              {product.category.name}
            </p>
          )}

          <h3
            className="
              line-clamp-2
              text-base
              font-medium
              text-zinc-900

              dark:text-white
            "
          >
            {product.name}
          </h3>

          <ProductPrice
            price={product.price}
          />
        </div>
      </Surface>
    </Link>
  );
}