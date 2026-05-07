"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { CartItem } from "@/lib/cart-types";

type CartContextType = {
  cart: CartItem[];

  addToCart: (
    item: Omit<CartItem, "qty">
  ) => void;

  removeFromCart: (
    id: number
  ) => void;

  clearCart: () => void;
};

const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // =========================
  // LOAD CART SAFELY
  // =========================
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("cart");

      if (!stored) return;

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        localStorage.removeItem("cart");
        return;
      }

      setCart(parsed);
    } catch (err) {
      console.error(
        "Cart corrupted. Resetting cart..."
      );

      localStorage.removeItem("cart");
    }
  }, []);

  // =========================
  // SAVE CART
  // =========================
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================
  // ADD TO CART
  // =========================
  function addToCart(
    item: Omit<CartItem, "qty">
  ) {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id
      );

      // qty +1
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                qty: p.qty + 1,
              }
            : p
        );
      }

      // new item
      return [
        ...prev,
        {
          ...item,
          qty: 1,
        },
      ];
    });
  }

  // =========================
  // REMOVE / DECREMENT
  // =========================
  function removeFromCart(id: number) {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0);
    });
  }

  // =========================
  // CLEAR CART
  // =========================
  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return ctx;
}