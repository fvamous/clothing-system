// components/admin/DashboardCharts.tsx

"use client";

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
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Revenue Chart */}
      <div
        className="
          rounded-2xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-5
          dark:bg-zinc-900/60
        "
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Monthly revenue analytics
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
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
                    stopColor="white"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="white"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.1}
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="white"
                fill="url(#revenueGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Chart */}
      <div
        className="
          rounded-2xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-5
          dark:bg-zinc-900/60
        "
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Orders Analytics
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Order activity overview
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={orderData}>
              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.1}
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="orders"
                stroke="white"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}