"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  stock?: number;
};

type CartContextType = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;

  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;

  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

/* =========================
   SAFE LOAD FUNCTION
========================= */
function loadCart(): CartItemType[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse cart:", error);
    return [];
  }
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* =========================
     INIT STATE (NO FLICKER)
  ========================= */
  const [cart, setCart] = useState<CartItemType[]>(loadCart);

  /* =========================
     SYNC TO LOCALSTORAGE
  ========================= */
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed save cart:", error);
    }
  }, [cart]);

  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = (item: CartItemType) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity: p.quantity + 1,
              }
            : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  /* =========================
     REMOVE ITEM
  ========================= */
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* =========================
     INCREASE QTY
  ========================= */
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.stock
                ? Math.min(item.quantity + 1, item.stock)
                : item.quantity + 1,
            }
          : item
      )
    );
  };

  /* =========================
     DECREASE QTY
  ========================= */
  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* =========================
     CLEAR CART
  ========================= */
  const clearCart = () => {
    setCart([]);
  };

  /* =========================
     TOTAL PRICE
  ========================= */
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =========================
   HOOK
========================= */
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}