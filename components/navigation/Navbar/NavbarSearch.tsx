"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
  Search,
  ArrowRight,
  Shirt,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

import Input from "@/components/ui/input";

type SearchItem = {
  title: string;
  href: string;
  category: string;
  icon: React.ElementType;
};

const items: SearchItem[] = [
  {
    title: "Oversized Hoodie",
    href: "/catalog",
    category: "Streetwear",
    icon: Shirt,
  },

  {
    title: "Cargo Pants",
    href: "/catalog",
    category: "Fashion",
    icon: ShoppingBag,
  },

  {
    title: "AI Style Collection",
    href: "/collections/ai-style",
    category: "Collection",
    icon: Sparkles,
  },

  {
    title: "Vintage Washed Tee",
    href: "/catalog",
    category: "T-Shirt",
    icon: Shirt,
  },
];

export default function NavbarSearch() {
  const [query, setQuery] =
    useState("");

  const [focused, setFocused] =
    useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    return items.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        item.category
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
    );
  }, [query]);

  return (
    <div
      className="
        relative
        hidden
        w-full
        max-w-md

        lg:block
      "
    >
      {/* INPUT */}
      <div className="relative">
        <Search
          className="
            absolute
            left-4
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-zinc-400
          "
        />

        <Input
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          onFocus={() =>
            setFocused(true)
          }
          onBlur={() => {
            setTimeout(() => {
              setFocused(false);
            }, 150);
          }}
          placeholder="Search products..."
          className="
            h-12
            rounded-2xl
            border-zinc-200/70
            bg-white/70
            pl-11
            pr-4
            backdrop-blur-xl

            dark:border-white/10
            dark:bg-white/[0.04]
          "
        />
      </div>

      {/* RESULT */}
      {focused && (
        <div
          className="
            absolute
            top-[58px]
            z-50
            w-full
            overflow-hidden
            rounded-[28px]
            border
            border-zinc-200/70
            bg-white/92
            p-2
            shadow-[0_20px_60px_rgba(15,23,42,0.12)]
            backdrop-blur-2xl

            dark:border-white/10
            dark:bg-[#09090b]/92
          "
        >
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        px-4
                        py-3
                        transition-all
                        hover:bg-zinc-100

                        dark:hover:bg-white/[0.05]
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-2xl
                            bg-zinc-100
                            text-zinc-700

                            dark:bg-white/[0.06]
                            dark:text-zinc-200
                          "
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-zinc-900

                              dark:text-white
                            "
                          >
                            {
                              item.title
                            }
                          </p>

                          <p
                            className="
                              text-xs
                              text-zinc-500

                              dark:text-zinc-400
                            "
                          >
                            {
                              item.category
                            }
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        className="
                          h-4
                          w-4
                          text-zinc-400
                        "
                      />
                    </Link>
                  );
                }
              )}
            </div>
          ) : (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-2
                px-6
                py-10
                text-center
              "
            >
              <Search
                className="
                  h-8
                  w-8
                  text-zinc-300
                "
              />

              <p
                className="
                  text-sm
                  font-medium
                  text-zinc-500
                "
              >
                No products found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
