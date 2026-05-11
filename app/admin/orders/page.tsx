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

    background: "var(--background)",

    minHeight: "100vh",
    fontFamily: "sans-serif",

    color: "var(--foreground)",
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 700,

    color: "var(--foreground)",
  },

  subtitle: {
    color: "var(--muted-foreground)",
    fontSize: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 16,
  },

  card: {
    background: "rgba(255,255,255,0.72)",

    border: "1px solid rgba(255,255,255,0.12)",

    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",

    borderRadius: 14,
    padding: 16,

    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",

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

    color: "var(--foreground)",
  },

  text: {
    fontSize: 13,
    color: "var(--muted-foreground)",
  },

  items: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  itemCard: {
    display: "flex",
    flexDirection: "column",

    border: "1px solid rgba(148,163,184,0.14)",

    borderRadius: 10,
    overflow: "hidden",

    background: "rgba(255,255,255,0.42)",

    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  },

  image: {
    width: "100%",
    height: 140,
    objectFit: "cover",

    background: "rgba(148,163,184,0.08)",
  },

  itemDetail: {
    padding: 10,
  },

  itemName: {
    fontSize: 14,
    fontWeight: 600,

    color: "var(--foreground)",
  },

  itemMeta: {
    fontSize: 12,
    color: "var(--muted-foreground)",
  },

  total: {
    fontWeight: 700,
    fontSize: 14,
    marginTop: 6,

    color: "var(--foreground)",
  },

  action: {
    marginTop: 8,
  },
};