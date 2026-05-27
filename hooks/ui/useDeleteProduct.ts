"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProductAction } from "@/server/actions/products/deleteProduct";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductAction,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
