"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

const handleCheckout = async () => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    items: cart.map((i) => ({
        productId: i.id,
        quantity: i.qty,
    })),
    }),
  });

    const data = await res.json();

    if (!res.ok) {
    console.log("FULL ERROR:", data);
    alert(data.error || "Checkout failed");
    return;
    }

  if (!data.orderId) {
    console.error("No orderId returned:", data);
    return;
  }

  router.push(`/success/${data.orderId}`);
};
}
