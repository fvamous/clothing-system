"use client";

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { updateProductAction } from "@/server/actions/products/updateProduct";

export function useUpdateProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) =>
      updateProductAction(id, data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}