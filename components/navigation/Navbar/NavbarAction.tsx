"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import {
  Heart,
  ShoppingBag,
  User2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type NavbarActionProps = {
  cartCount?: number;
};

export default function NavbarAction({
  cartCount = 0,
}: NavbarActionProps) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div
      className="
        flex
        items-center
        gap-2
        sm:gap-3
      "
    >
      {/* AI */}
      <Link href="/ai">
        <Button
          variant="outline"
          className="
            hidden
            h-11
            rounded-2xl
            border-zinc-200/70
            bg-white/70
            px-4
            backdrop-blur-xl

            md:flex

            dark:border-white/10
            dark:bg-white/[0.04]
          "
        >
          <Sparkles className="mr-2 h-4 w-4" />

          AI Style
        </Button>
      </Link>

      {/* WISHLIST */}
      <Link href="/wishlist">
        <button
          className="
            flex
            h-11
            w-11
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
          <Heart className="h-5 w-5" />
        </button>
      </Link>

      {/* CART */}
      <Link
        href="/cart"
        className="relative"
      >
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-zinc-200/70
            bg-black
            text-white
            shadow-lg
            transition-all
            hover:scale-[1.03]

            dark:border-white/10
            dark:bg-white
            dark:text-black
          "
        >
          <ShoppingBag className="h-5 w-5" />
        </button>

        {cartCount > 0 && (
          <div
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-[20px]
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
            "
          >
            {cartCount}
          </div>
        )}
      </Link>

      {/* PROFILE */}
      <Link href="/profile">
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            overflow-hidden
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
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "Profile"}
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          ) : (
            <User2 className="h-5 w-5" />
          )}
        </button>
      </Link>
    </div>
  );
}