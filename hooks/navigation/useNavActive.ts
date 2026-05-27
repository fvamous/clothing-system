"use client";

import { usePathname } from "next/navigation";

export function useNavActive(href: string) {
  const pathname = usePathname();

  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}