"use client";

import { useQuery } from "@tanstack/react-query";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],

    queryFn: async () => {
      const response = await fetch(
        "/api/orders"
      );

      const data =
        await response.json();

      return data.data;
    },
  });
}