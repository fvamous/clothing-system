"use client";

import { create } from "zustand";

type CartDrawerStore = {
  open: boolean;

  onOpen: () => void;

  onClose: () => void;
};

export const useCartDrawer =
  create<CartDrawerStore>((set) => ({
    open: false,

    onOpen: () =>
      set({
        open: true,
      }),

    onClose: () =>
      set({
        open: false,
      }),
  }));