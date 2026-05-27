"use client";

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { createProductAction } from "@/server/actions/products/createProduct";

export function useCreateProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createProductAction,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}