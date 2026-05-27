"use client";

import Link from "next/link";

const items = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/cart",
    label: "Cart",
  },
  {
    href: "/about",
    label: "About",
  },
];

export default function MobileDock() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl lg:hidden">

      <div className="flex items-center justify-around">

        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-4 py-2 text-sm"
          >
            {item.label}
          </Link>
        ))}

      </div>

    </div>
  );
}