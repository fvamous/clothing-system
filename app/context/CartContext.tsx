"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  AddToCartPayload,
  CartItem,
} from "@/types/entities/cart";

type CartContextType = {
  cart: CartItem[];

  totalItems: number;

  totalPrice: number;

  addToCart: (payload: AddToCartPayload) => void;

  removeFromCart: (productId: string) => void;

  increaseQty: (productId: string) => void;

  decreaseQty: (productId: string) => void;

  clearCart: () => void;
};

const CartContext =
  createContext<CartContextType | null>(null);

const STORAGE_KEY = "clothing-system-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  /*
  -----------------------------------
  load storage
  -----------------------------------
  */

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return;

    try {
      setCart(JSON.parse(raw));
    } catch {
      setCart([]);
    }
  }, []);

  /*
  -----------------------------------
  persist storage
  -----------------------------------
  */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cart)
    );
  }, [cart]);

  /*
  -----------------------------------
  actions
  -----------------------------------
  */

  const addToCart = (
    payload: AddToCartPayload
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === payload.productId
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === payload.productId
            ? {
                ...item,
                quantity:
                  item.quantity +
                  (payload.quantity ?? 1),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...payload,
          id: crypto.randomUUID(),
          quantity: payload.quantity ?? 1,
        },
      ];
    });
  };

  const removeFromCart = (
    productId: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.productId !== productId
      )
    );
  };

  const increaseQty = (
    productId: string
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (
    productId: string
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  /*
  -----------------------------------
  computed
  -----------------------------------
  */

  const totalItems = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,

        totalItems,

        totalPrice,

        addToCart,

        removeFromCart,

        increaseQty,

        decreaseQty,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}