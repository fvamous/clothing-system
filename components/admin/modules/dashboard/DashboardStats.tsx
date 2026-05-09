// components/admin/DashboardStats.tsx

"use client";

import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
} from "lucide-react";

type DashboardStatsProps = {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  growth: number;
};

const stats = [
  {
    title: "Products",
    key: "totalProducts",
    icon: Package,
  },
  {
    title: "Orders",
    key: "totalOrders",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    key: "totalRevenue",
    icon: DollarSign,
  },
  {
    title: "Growth",
    key: "growth",
    icon: TrendingUp,
  },
] as const;

export default function DashboardStats({
  totalProducts,
  totalOrders,
  totalRevenue,
  growth,
}: DashboardStatsProps) {
  const values = {
    totalProducts,
    totalOrders,
    totalRevenue,
    growth,
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              rounded-2xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:bg-white/10
              dark:bg-zinc-900/60
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  {item.key === "totalRevenue"
                    ? `Rp ${Number(
                        values[item.key]
                      ).toLocaleString("id-ID")}`
                    : item.key === "growth"
                    ? `${values[item.key]}%`
                    : values[item.key]}
                </h2>
              </div>

              <div
                className="
                  flex h-12 w-12 items-center
                  justify-center rounded-2xl
                  bg-white/10
                "
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white/70"
                  style={{
                    width: `${
                      item.key === "growth"
                        ? Math.min(growth, 100)
                        : 70
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}