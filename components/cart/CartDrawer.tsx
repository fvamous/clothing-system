"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "@/context/CartContext";

import { useCartDrawer } from "@/hooks/cart/useCartDrawer";

import CartItem from "./CartItem";

import CartSummary from "./CartSummary";

export default function CartDrawer() {
  const { open, onClose } =
    useCartDrawer();

  const { cart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[90]
              bg-black/50
              backdrop-blur-sm
            "
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 240,
            }}
            className="
              fixed
              right-0
              top-0
              z-[100]
              flex
              h-screen
              w-full
              max-w-md
              flex-col
              border-l
              border-white/10
              bg-white/80
              p-6
              backdrop-blur-2xl
              dark:bg-black/80
            "
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Shopping Cart
              </h2>

              <button onClick={onClose}>
                Close
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-auto">
              {cart.length === 0 ? (
                <div className="py-24 text-center text-zinc-500">
                  Cart is empty
                </div>
              ) : (
                cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                ))
              )}
            </div>

            <div className="mt-6">
              <CartSummary />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}