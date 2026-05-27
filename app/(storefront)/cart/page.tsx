// app/(storefront)/cart/page.tsx

"use client";

import Link from "next/link";

import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import CartItem from "@/components/cart/CartItem";

import CartSummary from "@/components/cart/CartSummary";

import {
  useCart,
  type CartItem as CartItemType,
} from "@/hooks/cart/useCart";

export default function CartPage() {
  const { cart } = useCart();

  const isEmpty =
    cart.length === 0;

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden

        bg-gradient-to-br
        from-white
        via-rose-50
        to-slate-100

        px-4
        pb-24
        pt-32

        dark:from-[#020617]
        dark:via-[#0f172a]
        dark:to-[#111827]

        sm:px-6
        lg:px-8
      "
    >
      {/* BG GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          right-[-140px]
          top-[-140px]

          h-[420px]
          w-[420px]

          rounded-full

          bg-pink-400/20
          blur-3xl

          dark:bg-blue-500/10
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
        "
      >
        {/* HEADER */}
        <div className="mb-10">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.24em]

              text-slate-500
              dark:text-slate-400
            "
          >
            Shopping Cart
          </p>

          <h1
            className="
              mt-3

              text-4xl
              font-black
              tracking-tight

              text-slate-900
              dark:text-white

              sm:text-5xl
            "
          >
            Your Cart
          </h1>

          <p
            className="
              mt-3
              max-w-2xl

              text-sm
              leading-relaxed

              text-slate-600
              dark:text-slate-400
            "
          >
            Review your selected
            products before
            continuing to checkout.
          </p>
        </div>

        {/* EMPTY */}
        {isEmpty && (
          <div
            className="
              flex
              min-h-[420px]
              flex-col
              items-center
              justify-center

              rounded-[36px]

              border
              border-white/40

              bg-white/60

              px-6
              text-center

              shadow-[0_20px_80px_rgba(15,23,42,0.08)]

              backdrop-blur-2xl

              dark:border-white/10
              dark:bg-white/[0.04]
              dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            "
          >
            <div
              className="
                mb-6

                flex
                h-20
                w-20

                items-center
                justify-center

                rounded-[28px]

                bg-slate-100

                dark:bg-white/10
              "
            >
              <ShoppingBag
                className="
                  h-10
                  w-10

                  text-slate-500
                  dark:text-slate-300
                "
              />
            </div>

            <h2
              className="
                text-2xl
                font-black

                text-slate-900
                dark:text-white
              "
            >
              Cart Empty
            </h2>

            <p
              className="
                mt-3
                max-w-md

                text-sm
                leading-relaxed

                text-slate-600
                dark:text-slate-400
              "
            >
              Your shopping cart is
              currently empty. Start
              exploring products and
              build your outfit.
            </p>

            <Link
              href="/catalog"
              className="
                mt-8
                inline-flex
              "
            >
              <button
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  bg-slate-900

                  px-6
                  py-3

                  text-sm
                  font-semibold
                  text-white

                  transition-all
                  duration-300

                  hover:scale-[1.02]
                  hover:bg-slate-800

                  dark:bg-white
                  dark:text-black
                  dark:hover:bg-zinc-200
                "
              >
                Continue Shopping

                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        )}

        {/* CONTENT */}
        {!isEmpty && (
          <div
            className="
              grid
              gap-8

              lg:grid-cols-[1fr_360px]
              lg:items-start
            "
          >
            {/* ITEMS */}
            <div className="space-y-5">
              {cart.map(
                (
                  item: CartItemType
                ) => (
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                )
              )}
            </div>

            {/* SUMMARY */}
            <div
              className="
                lg:sticky
                lg:top-28
              "
            >
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}