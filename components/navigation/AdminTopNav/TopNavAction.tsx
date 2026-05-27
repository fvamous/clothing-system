"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  Bell,
  Search,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import Input from "@/components/ui/input";

type TopNavActionProps = {
  title?: string;
  description?: string;
};

export default function TopNavAction({
  title,
  description,
}: TopNavActionProps) {
  const pathname =
    usePathname();

  function getPageTitle() {
    if (title) return title;

    if (
      pathname.startsWith(
        "/admin/products/new"
      )
    ) {
      return "Create Product";
    }

    if (
      pathname.startsWith(
        "/admin/products"
      )
    ) {
      return "Products";
    }

    if (
      pathname.startsWith(
        "/admin/orders"
      )
    ) {
      return "Orders";
    }

    if (
      pathname.startsWith(
        "/admin/customers"
      )
    ) {
      return "Customers";
    }

    if (
      pathname.startsWith(
        "/admin/settings"
      )
    ) {
      return "Settings";
    }

    return "Dashboard";
  }

  function getDescription() {
    if (description)
      return description;

    return "Manage your premium AI commerce platform";
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* LEFT */}
      <div>
        <h1
          className="
            text-3xl
            font-black
            tracking-tight
            text-zinc-900

            dark:text-white
          "
        >
          {getPageTitle()}
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-zinc-500

            dark:text-zinc-400
          "
        >
          {getDescription()}
        </p>
      </div>

      {/* RIGHT */}
      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
        "
      >
        {/* SEARCH */}
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
            placeholder="Search..."
            className="
              h-12
              w-full
              rounded-2xl
              border-zinc-200/70
              bg-white/70
              pl-11
              backdrop-blur-xl

              sm:w-[260px]

              dark:border-white/10
              dark:bg-white/[0.04]
            "
          />
        </div>

        {/* AI */}
        <Link href="/admin/ai">
          <Button
            className="
              h-12
              rounded-2xl
              px-5
              font-semibold
            "
          >
            <Sparkles className="mr-2 h-4 w-4" />

            AI Studio
          </Button>
        </Link>

        {/* NOTIFICATION */}
        <button
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-zinc-200/70
            bg-white/70
            text-zinc-700
            backdrop-blur-xl
            transition-all
            hover:scale-[1.03]

            dark:border-white/10
            dark:bg-white/[0.04]
            dark:text-zinc-200
          "
        >
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}