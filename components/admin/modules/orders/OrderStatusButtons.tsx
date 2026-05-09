"use client";

import { useRouter } from "next/navigation";
import { orderWorkflow } from "@/lib/domain/orders/workflow";
import { OrderStatus } from "@prisma/client";

type Props = {
  orderId: string;
  status: OrderStatus;
};

export default function OrderStatusButtons({
  orderId,
  status,
}: Props) {
  const router = useRouter();

  // ambil allowed next status dari workflow
  const allowedNext = orderWorkflow.getAllowedNext(status);

  const updateStatus = async (newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed update status");
      }

      router.refresh();
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const renderButton = (target: OrderStatus, label: string, color?: string) => {
    if (!allowedNext.includes(target)) return null;

    return (
      <button
        onClick={() => updateStatus(target)}
        style={{
          padding: "6px 10px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          background: color || "#111",
          color: "#fff",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {renderButton("PAID", "Mark Paid", "#16a34a")}
      {renderButton("PROCESSING", "Processing", "#2563eb")}
      {renderButton("SHIPPED", "Ship", "#7c3aed")}
      {renderButton("COMPLETED", "Complete", "#0f172a")}
      {renderButton("CANCELLED", "Cancel", "#dc2626")}
    </div>
  );
}