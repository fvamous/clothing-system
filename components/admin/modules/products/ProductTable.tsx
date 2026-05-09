"use client";

import Link from "next/link";

import { Pencil, Trash2, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import SmartImage from "@/components/ui/SmartImage";

type Product = {
  id: string | number;

  name: string;

  price: number;

  stock: number;

  category?: string | null;

  imageUrl?: string | null;
};

type Props = {
  products: Product[];

  onDelete?: (id: string | number) => void;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductTable({
  products,
  onDelete,
}: Props) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Package2 className="h-8 w-8 text-gray-400" />
        </div>

        <h2 className="text-xl font-semibold text-black">
          No products found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Start adding your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          {/* HEADER */}
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b transition-colors hover:bg-gray-50"
              >
                {/* PRODUCT */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200">
                      <SmartImage
                        src={
                          product.imageUrl ||
                          "/file.svg"
                        }
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold text-black">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-400">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* CATEGORY */}
                <td className="px-6 py-5">
                  <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {product.category || "Uncategorized"}
                  </span>
                </td>

                {/* PRICE */}
                <td className="px-6 py-5 text-sm font-semibold text-black">
                  {formatPrice(product.price)}
                </td>

                {/* STOCK */}
                <td className="px-6 py-5">
                  <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                    {product.stock}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant="outline" className="h-10 rounded-xl">
                        <Pencil size={16} />
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      className="h-10 rounded-xl"
                      onClick={() => onDelete?.(product.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}