"use client";

import { useQuery } from "@tanstack/react-query";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],

    queryFn: async () => {
      const response = await fetch(
        "/api/stats"
      );

      const data =
        await response.json();

      return data.data;
    },
  });
}