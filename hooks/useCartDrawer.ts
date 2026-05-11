"use client";

import { useEffect, useState } from "react";

let externalSetOpen: ((v: boolean) => void) | null = null;

export function useCartDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    externalSetOpen = setOpen;

    const handler = () => setOpen(true);

    window.addEventListener("open-cart", handler);

    return () => {
      window.removeEventListener("open-cart", handler);
      externalSetOpen = null;
    };
  }, []);

  return {
    open,
    close: () => setOpen(false),
    openDrawer: () => setOpen(true),
  };
}

// optional global trigger helper
export function openCartDrawer() {
  externalSetOpen?.(true);
}