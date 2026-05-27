"use client";

import { useState } from "react";

type Props = {
  orderId: string;
  status: string;
};

export default function OrderStatusButtons({
  orderId,
  status,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    try {
      setLoading(true);

      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      // optional: refresh page biar data update
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        disabled={loading || status === "PAID"}
        onClick={() => updateStatus("PAID")}
        className="rounded-xl bg-emerald-500 px-3 py-1 text-xs font-bold text-white"
      >
        Paid
      </button>

      <button
        disabled={loading || status === "SHIPPED"}
        onClick={() => updateStatus("SHIPPED")}
        className="rounded-xl bg-amber-500 px-3 py-1 text-xs font-bold text-white"
      >
        Shipped
      </button>

      <button
        disabled={loading || status === "COMPLETED"}
        onClick={() => updateStatus("COMPLETED")}
        className="rounded-xl bg-blue-500 px-3 py-1 text-xs font-bold text-white"
      >
        Done
      </button>
    </div>
  );
}
