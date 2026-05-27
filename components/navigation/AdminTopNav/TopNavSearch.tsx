"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
  Search,
  Package2,
  ShoppingBag,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import Input from "@/components/ui/input";

type SearchItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
};

const searchItems: SearchItem[] =
  [
    {
      title: "Products",
      href: "/admin/products",
      icon: Package2,
      description:
        "Manage all products",
    },

    {
      title: "Create Product",
      href:
        "/admin/products/new",
      icon: Sparkles,
      description:
        "Add new AI assisted product",
    },

    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
      description:
        "Manage customer orders",
    },

    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
      description:
        "View customer database",
    },

    {
      title: "AI Studio",
      href: "/admin/ai",
      icon: Sparkles,
      description:
        "Generate AI content",
    },
  ];

export default function TopNavSearch() {
  const [query, setQuery] =
    useState("");

  const [focused, setFocused] =
    useState(false);

  const results = useMemo(() => {
    if (!query.trim()) {
      return searchItems;
    }

    return searchItems.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        item.description
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
    );
  }, [query]);

  return (
    <div className="relative w-full sm:w-[320px]">
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
          placeholder="Search admin panel..."
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

      {/* DROPDOWN */}
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
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map(
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
                              item.description
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
                No results found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}