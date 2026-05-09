import { prisma } from "@/lib/infra/prisma/client";
import { notFound } from "next/navigation";

async function getOrder(id: string) {
  if (!id) return null;

  return prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
    },
  });
}

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  const order = await getOrder(id);

  if (!order) return notFound();

  const formatPrice = (v: number) =>
    new Intl.NumberFormat("id-ID").format(v);

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>
        <h2>🎉 Order Success</h2>

        <p><b>ID:</b> {order.id}</p>
        <p><b>Status:</b> {order.status}</p>
        <p>
          <b>Total:</b> Rp {formatPrice(order.total)}
        </p>

        <div style={{ marginTop: 16 }}>
          <h4>Items</h4>

          {order.items.map((item) => (
            <div key={item.id} style={styles.item}>
              <span>{item.product?.name}</span>
              <span>
                x {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },

  card: {
    width: "100%",
    maxWidth: 420,
    background: "white",
    padding: 24,
    borderRadius: 20,
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #eee",
  },
};