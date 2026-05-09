import { prisma } from "@/lib/infra/prisma/client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/infra/auth/authOptions";

import { redirect } from "next/navigation";

import OrderStatusButtons from "@/components/admin/modules/orders/OrderStatusButtons";

import SmartImage from "@/components/ui/SmartImage";
import Badge from "@/components/ui/badge";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "PAID":
        return "success";
      case "SHIPPED":
        return "warning";
      case "CANCELLED":
        return "danger";
      case "COMPLETED":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Orders</h1>
        <p style={styles.subtitle}>Manage customer orders</p>
      </div>

      <div style={styles.grid}>
        {orders.map((order) => (
          <div key={order.id} style={styles.card}>
            {/* HEADER */}
            <div style={styles.top}>
              <h3 style={styles.orderId}>
                Order #{order.id.slice(0, 8)}
              </h3>

              <Badge variant={getBadgeVariant(order.status)}>
                {order.status}
              </Badge>
            </div>

            <p style={styles.text}>
              <b>User:</b> {order.user.email || "No email"}
            </p>

            {/* ITEMS */}
            <div style={styles.items}>
              {order.items.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <SmartImage
                    src={item.product?.imageUrl || "/placeholder.png"}
                    alt={item.product?.name || "Product"}
                    style={styles.image}
                  />

                  <div style={styles.itemDetail}>
                    <p style={styles.itemName}>
                      {item.productName ||
                        item.product?.name ||
                        "Unknown Product"}
                    </p>

                    <p style={styles.itemMeta}>
                      Qty: {item.quantity} × Rp{" "}
                      {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <p style={styles.total}>
              Total: Rp {order.total.toLocaleString("id-ID")}
            </p>

            {/* ACTION */}
            <div style={styles.action}>
              <OrderStatusButtons
                orderId={order.id}
                status={order.status}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

/* =========================
   MODERN ORDER GRID UI
========================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "2rem",
    background: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 700,
  },

  subtitle: {
    color: "#666",
    fontSize: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 16,
    fontWeight: 700,
  },

  text: {
    fontSize: 13,
    color: "#444",
  },

  items: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  itemCard: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eee",
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 140,
    objectFit: "cover",
    background: "#f3f4f6",
  },

  itemDetail: {
    padding: 10,
  },

  itemName: {
    fontSize: 14,
    fontWeight: 600,
  },

  itemMeta: {
    fontSize: 12,
    color: "#666",
  },

  total: {
    fontWeight: 700,
    fontSize: 14,
    marginTop: 6,
  },

  action: {
    marginTop: 8,
  },
};