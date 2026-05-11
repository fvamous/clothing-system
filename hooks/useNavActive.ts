"use client";

import { usePathname } from "next/navigation";

export type NavKey = "home" | "catalog" | "cart" | "admin";

export function useNavActive(): NavKey {
  const pathname = usePathname();

  if (pathname === "/") return "home";
  if (pathname.startsWith("/catalog")) return "catalog";
  if (pathname.startsWith("/cart")) return "cart";
  if (pathname.startsWith("/admin")) return "admin";

  return "home";
}