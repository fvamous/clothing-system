"use client";

import { useTheme } from "next-themes";

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
  const { theme, systemTheme } =
    useTheme();

  const currentTheme =
    theme === "system"
      ? systemTheme
      : theme;

  const isDark =
    currentTheme === "dark";

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
            style={{
              background: isDark
                ? "rgba(24,24,27,0.60)"
                : "rgba(255,255,255,0.72)",

              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(15,23,42,0.06)",

              boxShadow: isDark
                ? "0 20px 50px rgba(0,0,0,0.22)"
                : "0 20px 50px rgba(15,23,42,0.08)",
            }}
            className="
              rounded-[28px]
              backdrop-blur-2xl
              p-5
              transition-all
              duration-300
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  style={{
                    color: isDark
                      ? "#a1a1aa"
                      : "#64748b",
                  }}
                  className="text-sm"
                >
                  {item.title}
                </p>

                <h2
                  style={{
                    color: isDark
                      ? "#fff"
                      : "#0f172a",
                  }}
                  className="
                    mt-3
                    text-3xl
                    font-bold
                    tracking-tight
                  "
                >
                  {item.key ===
                  "totalRevenue"
                    ? `Rp ${Number(
                        values[
                          item.key
                        ]
                      ).toLocaleString(
                        "id-ID"
                      )}`
                    : item.key ===
                      "growth"
                    ? `${
                        values[
                          item.key
                        ]
                      }%`
                    : values[
                        item.key
                      ]}
                </h2>
              </div>

              <div
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(15,23,42,0.05)",

                  border: isDark
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(15,23,42,0.05)",

                  color: isDark
                    ? "#fff"
                    : "#0f172a",
                }}
                className="
                  flex h-12 w-12 items-center
                  justify-center rounded-2xl
                  backdrop-blur-xl
                "
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5">
              <div
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(15,23,42,0.06)",
                }}
                className="
                  h-2 overflow-hidden
                  rounded-full
                "
              >
                <div
                  style={{
                    width: `${
                      item.key ===
                      "growth"
                        ? Math.min(
                            growth,
                            100
                          )
                        : 70
                    }%`,

                    background:
                      isDark
                        ? "rgba(255,255,255,0.75)"
                        : "#0f172a",
                  }}
                  className="
                    h-full
                    rounded-full
                    transition-all
                  "
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}