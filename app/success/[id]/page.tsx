import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getOrder(id: string) {
  const orderId = Number(id);

  if (isNaN(orderId)) return null;

  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

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