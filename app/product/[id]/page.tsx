import { prisma } from "@/lib/infra/prisma/client";
import { notFound } from "next/navigation";

/* =========================
   SAFE QUERY
========================= */
async function getOrder(id: string) {
  if (!id) return null;

  return prisma.order.findUnique({
    where: { id: String(id) },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
}

/* =========================
   PAGE (NEXT 16 FIX)
========================= */
export default async function SuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await getOrder(id);

  if (!order) return notFound();

  return (
    <div style={{ padding: 20 }}>
      <h1>Order Success 🎉</h1>

      <p>ID Order: {order.id}</p>
      <p>Status: {order.status}</p>
      <p>Total: Rp {order.total}</p>

      <h3>Items:</h3>

      {order.items.map((item: any) => (
        <div key={item.id}>
          {item.product?.name} x {item.quantity}
        </div>
      ))}
    </div>
  );
}