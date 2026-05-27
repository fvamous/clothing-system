"use client";

import { useStats } from "@/hooks/ui/useStats";

import AsyncBoundary from "@/components/primitives/feedback/AsyncBoundary";

export default function DashboardStats() {
  const {
    data,
    isLoading,
    isError,
  } = useStats();

  return (
    <AsyncBoundary
      loading={isLoading}
      error={isError}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm opacity-70">
            Products
          </div>

          <div className="mt-2 text-3xl font-bold">
            {data?.totalProducts ?? 0}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm opacity-70">
            Orders
          </div>

          <div className="mt-2 text-3xl font-bold">
            {data?.totalOrders ?? 0}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm opacity-70">
            Users
          </div>

          <div className="mt-2 text-3xl font-bold">
            {data?.totalUsers ?? 0}
          </div>
        </div>
      </div>
    </AsyncBoundary>
  );
}