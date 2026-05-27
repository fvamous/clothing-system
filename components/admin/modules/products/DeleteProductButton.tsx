"use client";

import { useDeleteProduct } from "@/hooks/ui/useDeleteProduct";

interface Props {
  productId: string;
}

export default function DeleteProductButton({
  productId,
}: Props) {
  const mutation =
    useDeleteProduct();

  return (
    <button
      onClick={() =>
        mutation.mutate(productId)
      }
      disabled={mutation.isPending}
      className="rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-400"
    >
      {mutation.isPending
        ? "Deleting..."
        : "Delete"}
    </button>
  );
}