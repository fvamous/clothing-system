"use client";

import { useTheme } from "next-themes";

import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";

type DashboardChartsProps = {
  revenueData: {
    name: string;
    revenue: number;
  }[];

  orderData: {
    name: string;
    orders: number;
  }[];
};

export default function DashboardCharts({
  revenueData,
  orderData,
}: DashboardChartsProps) {
  const { theme, systemTheme } =
    useTheme();

  const currentTheme =
    theme === "system"
      ? systemTheme
      : theme;

  const isDark =
    currentTheme === "dark";

  const cardBg = isDark
    ? "rgba(24,24,27,0.60)"
    : "rgba(255,255,255,0.72)";

  const border = isDark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(15,23,42,0.06)";

  const text = isDark
    ? "#ffffff"
    : "#0f172a";

  const muted = isDark
    ? "#a1a1aa"
    : "#64748b";

  const grid = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(15,23,42,0.08)";

  const stroke = isDark
    ? "#ffffff"
    : "#0f172a";

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Revenue Chart */}
      <div
        style={{
          background: cardBg,
          border,
          boxShadow: isDark
            ? "0 20px 50px rgba(0,0,0,0.25)"
            : "0 20px 50px rgba(15,23,42,0.08)",
        }}
        className="
          rounded-[28px]
          backdrop-blur-2xl
          p-5
          transition-all
        "
      >
        <div className="mb-6">
          <h2
            style={{ color: text }}
            className="text-xl font-semibold"
          >
            Revenue Overview
          </h2>

          <p
            style={{ color: muted }}
            className="mt-1 text-sm"
          >
            Monthly revenue analytics
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={stroke}
                    stopOpacity={0.28}
                  />

                  <stop
                    offset="95%"
                    stopColor={stroke}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={grid}
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: muted,
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: muted,
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  background:
                    isDark
                      ? "#18181b"
                      : "#ffffff",

                  border: border,

                  borderRadius: 18,

                  color: text,

                  backdropFilter:
                    "blur(20px)",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke={stroke}
                fill="url(#revenueGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Chart */}
      <div
        style={{
          background: cardBg,
          border,
          boxShadow: isDark
            ? "0 20px 50px rgba(0,0,0,0.25)"
            : "0 20px 50px rgba(15,23,42,0.08)",
        }}
        className="
          rounded-[28px]
          backdrop-blur-2xl
          p-5
          transition-all
        "
      >
        <div className="mb-6">
          <h2
            style={{ color: text }}
            className="text-xl font-semibold"
          >
            Orders Analytics
          </h2>

          <p
            style={{ color: muted }}
            className="mt-1 text-sm"
          >
            Order activity overview
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={orderData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={grid}
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: muted,
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: muted,
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  background:
                    isDark
                      ? "#18181b"
                      : "#ffffff",

                  border: border,

                  borderRadius: 18,

                  color: text,

                  backdropFilter:
                    "blur(20px)",
                }}
              />

              <Line
                type="monotone"
                dataKey="orders"
                stroke={stroke}
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: stroke,
                }}
                activeDot={{
                  r: 7,
                  fill: stroke,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}