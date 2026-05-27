"use client";

import Link from "next/link";

const items = [
  {
    href: "/admin",
    label: "Dashboard",
  },
  {
    href: "/admin/products",
    label: "Products",
  },
  {
    href: "/admin/orders",
    label: "Orders",
  },
  {
    href: "/admin/lookbook",
    label: "Lookbook",
  },
];

export default function NavigationRail() {
  return (
    <div className="flex h-screen w-[260px] flex-col p-6">

      <div className="mb-10">
        <h1 className="text-xl font-semibold">
          Clothing Admin
        </h1>
      </div>

      <nav className="flex flex-col gap-2">

        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-4 py-3 text-sm transition hover:bg-white/10"
          >
            {item.label}
          </Link>
        ))}

      </nav>

    </div>
  );
}