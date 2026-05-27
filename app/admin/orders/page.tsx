import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import {
  Package2,
  ShoppingBag,
  TrendingUp,
  Truck,
} from "lucide-react";

import { prisma } from "@/lib/infra/prisma/client";

import { authOptions } from "@/lib/infra/auth/authOptions";

import SmartImage from "@/components/primitives/media/SmartImage";

import Surface from "@/components/primitives/surface/Surface";

import OrderStatusButtons from "@/components/admin/modules/orders/OrderStatusButtons";

export default async function OrdersPage() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user) {
    redirect("/");
  }

  if (
    session.user.role !== "ADMIN"
  ) {
    redirect("/");
  }

  const orders =
    await prisma.order.findMany({
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

  /*
  -----------------------------------
  stats
  -----------------------------------
  */

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + order.total,
      0
    );

  const paidOrders =
    orders.filter(
      (o) => o.status === "PAID"
    ).length;

  const shippedOrders =
    orders.filter(
      (o) =>
        o.status === "SHIPPED"
    ).length;

  /*
  -----------------------------------
  status styles
  -----------------------------------
  */

  function getStatusStyles(
    status: string
  ) {
    switch (status) {
      case "PAID":
        return `
          border-emerald-500/20
          bg-emerald-500/15
          text-emerald-500
        `;

      case "SHIPPED":
        return `
          border-amber-500/20
          bg-amber-500/15
          text-amber-500
        `;

      case "CANCELLED":
        return `
          border-red-500/20
          bg-red-500/15
          text-red-500
        `;

      case "COMPLETED":
        return `
          border-blue-500/20
          bg-blue-500/15
          text-blue-500
        `;

      default:
        return `
          border-zinc-500/20
          bg-zinc-500/15
          text-zinc-500
        `;
    }
  }

  return (
    <section className="space-y-8">
      {/* header */}

      <div
        className="
          flex
          flex-col
          gap-6
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        <div>
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-zinc-200
              bg-white/70
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-zinc-600
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-zinc-300
            "
          >
            <ShoppingBag className="h-4 w-4" />

            Order Management
          </div>

          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              text-zinc-900
              dark:text-white
            "
          >
            Orders
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-relaxed
              text-zinc-500
              dark:text-zinc-400
            "
          >
            Monitor customer
            transactions, payment
            status, shipping progress,
            and fulfillment workflow.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-4
            md:grid-cols-4
          "
        >
          <StatsCard
            icon={
              <Package2 className="h-5 w-5" />
            }
            label="Total Orders"
            value={orders.length.toString()}
          />

          <StatsCard
            icon={
              <TrendingUp className="h-5 w-5" />
            }
            label="Revenue"
            value={`Rp ${totalRevenue.toLocaleString(
              "id-ID"
            )}`}
          />

          <StatsCard
            icon={
              <ShoppingBag className="h-5 w-5" />
            }
            label="Paid"
            value={paidOrders.toString()}
          />

          <StatsCard
            icon={
              <Truck className="h-5 w-5" />
            }
            label="Shipped"
            value={shippedOrders.toString()}
          />
        </div>
      </div>

      {/* orders */}

      {orders.length === 0 ? (
        <Surface
          className="
            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center
            rounded-[42px]
            p-10
            text-center
          "
        >
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[32px]
              bg-zinc-100
              dark:bg-white/[0.05]
            "
          >
            <ShoppingBag
              className="
                h-10
                w-10
                text-zinc-400
              "
            />
          </div>

          <h2
            className="
              mt-6
              text-2xl
              font-black
              text-zinc-900
              dark:text-white
            "
          >
            No Orders Yet
          </h2>

          <p
            className="
              mt-3
              max-w-md
              text-sm
              leading-relaxed
              text-zinc-500
              dark:text-zinc-400
            "
          >
            Customer orders will
            appear here after checkout
            transactions are completed.
          </p>
        </Surface>
      ) : (
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            2xl:grid-cols-3
          "
        >
          {orders.map((order) => (
            <Surface
              key={order.id}
              className="
                rounded-[38px]
                p-6
              "
            >
              {/* top */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-zinc-500
                    "
                  >
                    Order ID
                  </p>

                  <h2
                    className="
                      mt-2
                      text-xl
                      font-black
                      text-zinc-900
                      dark:text-white
                    "
                  >
                    #
                    {order.id.slice(
                      0,
                      8
                    )}
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-zinc-500
                      dark:text-zinc-400
                    "
                  >
                    {
                      order.user
                        ?.email
                    }
                  </p>
                </div>

                <span
                  className={`
                    rounded-full
                    border
                    px-4
                    py-2
                    text-xs
                    font-black
                    tracking-wide
                    ${getStatusStyles(
                      order.status
                    )}
                  `}
                >
                  {order.status}
                </span>
              </div>

              {/* items */}

              <div className="mt-6 space-y-4">
                {order.items.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="
                        overflow-hidden
                        rounded-[30px]
                        border
                        border-zinc-200
                        bg-zinc-50
                        dark:border-white/10
                        dark:bg-white/[0.03]
                      "
                    >
                      <div className="relative overflow-hidden">
                        <SmartImage
                          src={
                            item
                              .product
                              ?.imageUrl ||
                            "/placeholder.png"
                          }
                          alt={
                            item
                              .product
                              ?.name ||
                            "Product"
                          }
                          className="
                            h-52
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            hover:scale-105
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/60
                            via-transparent
                            to-transparent
                          "
                        />
                      </div>

                      <div className="p-5">
                        <h3
                          className="
                            line-clamp-1
                            text-sm
                            font-black
                            text-zinc-900
                            dark:text-white
                          "
                        >
                          {item.productName ||
                            item
                              .product
                              ?.name ||
                            "Unknown Product"}
                        </h3>

                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            justify-between
                          "
                        >
                          <p
                            className="
                              text-xs
                              text-zinc-500
                              dark:text-zinc-400
                            "
                          >
                            Qty{" "}
                            {
                              item.quantity
                            }
                          </p>

                          <p
                            className="
                              text-sm
                              font-bold
                              text-zinc-900
                              dark:text-white
                            "
                          >
                            Rp{" "}
                            {item.price.toLocaleString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* bottom */}

              <div
                className="
                  mt-6
                  rounded-[30px]
                  border
                  border-zinc-200
                  bg-zinc-50
                  p-5
                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-zinc-500
                      "
                    >
                      Total
                    </p>

                    <p
                      className="
                        mt-2
                        text-2xl
                        font-black
                        text-zinc-900
                        dark:text-white
                      "
                    >
                      Rp{" "}
                      {order.total.toLocaleString(
                        "id-ID"
                      )}
                    </p>
                  </div>

                  <div
                    className="
                      text-right
                    "
                  >
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-zinc-500
                      "
                    >
                      Items
                    </p>

                    <p
                      className="
                        mt-2
                        text-lg
                        font-black
                        text-zinc-900
                        dark:text-white
                      "
                    >
                      {
                        order.items
                          .length
                      }
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <OrderStatusButtons
                    orderId={order.id}
                    status={
                      order.status
                    }
                  />
                </div>
              </div>
            </Surface>
          ))}
        </div>
      )}
    </section>
  );
}

/*
-----------------------------------
stats card
-----------------------------------
*/

function StatsCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;

  label: string;

  value: string;
}) {
  return (
    <Surface
      className="
        rounded-[28px]
        p-5
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-zinc-100
          dark:bg-white/[0.05]
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-4
          text-xs
          uppercase
          tracking-[0.2em]
          text-zinc-500
        "
      >
        {label}
      </p>

      <h3
        className="
          mt-2
          text-2xl
          font-black
          text-zinc-900
          dark:text-white
        "
      >
        {value}
      </h3>
    </Surface>
  );
}