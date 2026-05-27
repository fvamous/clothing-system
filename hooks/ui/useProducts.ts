"use client";

import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const response = await fetch(
        "/api/products"
      );

      const data =
        await response.json();

      return data.data;
    },
  });
}