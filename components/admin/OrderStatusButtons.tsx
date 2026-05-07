"use client";

import { useRouter } from "next/navigation";
import { getAllowedActions, OrderStatus } from "@/lib/orderFlow";

export default function OrderStatusButtons({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const router = useRouter();

  const allowed = getAllowedActions(status);

  const updateStatus = async (newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed update");

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  // 🔥 FINAL STATE (NO ACTION)
  if (allowed.length === 0) {
    return (
      <p style={{ fontSize: 12, color: "#888" }}>
        No actions available
      </p>
    );
  }

  return (
    <div style={styles.wrap}>
      {allowed.includes("PAID") && (
        <button
          style={styles.pay}
          onClick={() => updateStatus("PAID")}
        >
          Mark Paid
        </button>
      )}

      {allowed.includes("SHIPPED") && (
        <button
          style={styles.ship}
          onClick={() => updateStatus("SHIPPED")}
        >
          Mark Shipped
        </button>
      )}

      {allowed.includes("DELIVERED") && (
        <button
          style={styles.deliver}
          onClick={() => updateStatus("DELIVERED")}
        >
          Mark Delivered
        </button>
      )}

      {allowed.includes("CANCELLED") && (
        <button
          style={styles.cancel}
          onClick={() => updateStatus("CANCELLED")}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },

  pay: {
    padding: "6px 10px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },

  ship: {
    padding: "6px 10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },

  deliver: {
    padding: "6px 10px",
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },

  cancel: {
    padding: "6px 10px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },
};