"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

import CartItem from "@/components/cart/CartItem";

export default function CartPage() {
  const { cart } =
  useCart();
  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price *
        item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500">
          Add some products first
        </p>

        <Link
          href="/catalog"
          className="rounded-xl bg-black px-5 py-3 text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your items
            before checkout
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* CART ITEMS */}
          <div className="space-y-5">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}
          </div>

          {/* SUMMARY */}
          <div className="sticky top-6 h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Items
                </span>

                <span>
                  {cart.length}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span>Free</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>
                    Rp{" "}
                    {total.toLocaleString(
                      "id-ID"
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-black font-medium text-white transition hover:opacity-90"
            >
              Checkout
            </Link>

            <p className="mt-4 text-center text-xs text-gray-400">
              Secure checkout powered
              by your store
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}