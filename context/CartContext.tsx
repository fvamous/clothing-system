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

  setCart: React.Dispatch<
    React.SetStateAction<CartItemType[]>
  >;

  addToCart: (
    item: CartItemType
  ) => void;

  removeFromCart: (
    id: string
  ) => void;

  clearCart: () => void;

  increaseQty: (
    id: string
  ) => void;

  decreaseQty: (
    id: string
  ) => void;

  totalPrice: number;
};

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<
    CartItemType[]
  >([]);

  // LOAD STORAGE
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("cart");

      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (error) {
      console.error(
        "Failed load cart",
        error
      );
    }
  }, []);

  // SAVE STORAGE
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // ADD
  const addToCart = (
    item: CartItemType
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity:
                  p.quantity + 1,
              }
            : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity:
            item.quantity || 1,
        },
      ];
    });
  };

  // REMOVE
  const removeFromCart = (
    id: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // INCREASE
  const increaseQty = (
    id: string
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (
    id: string
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  // CLEAR
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      item.price * item.quantity,
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

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}