import {
  Package2,
  ShoppingCart,
  Wallet,
} from "lucide-react";

import { prisma } from "@/lib/infra/prisma/client";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/infra/auth/authOptions";

import { redirect } from "next/navigation";

export default async function AdminPage() {
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

  // =========================
  // DB STATS
  // =========================
  const [
    totalProducts,
    totalOrders,
  ] = await Promise.all([
    prisma.product.count({
      where: {
        isDeleted: false,
      },
    }),

    prisma.order.count(),
  ]);

  const totalRevenue =
    await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

  const revenue =
    totalRevenue._sum.total ?? 0;

  const stats = [
    {
      title: "Products",
      value: totalProducts,
      icon: <Package2 size={22} />,
      glowClass: "bg-blue-500/10 dark:bg-blue-500/20",
      iconClass: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200",
    },

    {
      title: "Orders",
      value: totalOrders,
      icon: (
        <ShoppingCart size={22} />
      ),
      glowClass: "bg-violet-500/10 dark:bg-violet-500/20",
      iconClass: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200",
    },

    {
      title: "Revenue",
      value: `Rp ${revenue.toLocaleString(
        "id-ID"
      )}`,
      icon: <Wallet size={22} />,
      glowClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
      iconClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200",
    },
  ];

  return (
    <main className="space-y-6 lg:space-y-8">
      {/* ================= HEADER ================= */}
      <div className="space-y-2">
        <h1
          className="
            text-2xl
            font-bold
            tracking-tight

            text-slate-900
            dark:text-white

            sm:text-3xl
          "
        >
          Admin Dashboard
        </h1>

        <p
          className="
            text-sm

            text-slate-600
            dark:text-slate-400
          "
        >
          Welcome back,{" "}
          {session.user.name}
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div
        className="
          grid
          gap-4

          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {stats.map((item) => (
          <div
            key={item.title}
            className="
              group
              relative
              overflow-hidden

              rounded-2xl
              sm:rounded-3xl

              border

              border-slate-200/80
              dark:border-white/10

              bg-white/85
              dark:bg-white/[0.055]

              backdrop-blur-2xl

              p-5
              sm:p-6

              transition-all
              duration-300

              shadow-[0_14px_38px_rgba(15,23,42,0.07)]
              dark:shadow-[0_14px_38px_rgba(0,0,0,0.28)]

              hover:-translate-y-1
            "
          >
            {/* GLOW */}
            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10

                h-32
                w-32

                rounded-full

                ${item.glowClass}

                blur-3xl
              "
            />

            {/* ICON */}
            <div
              className="
                relative
                z-10

                mb-5

                flex
                h-14
                w-14

                items-center
                justify-center

                rounded-2xl

                ${item.iconClass}
              "
            >
              {item.icon}
            </div>

            {/* CONTENT */}
            <div className="relative z-10">
              <p
                className="
                  text-sm
                  font-medium

                  text-slate-500
                  dark:text-slate-400
                "
              >
                {item.title}
              </p>

              <h2
                className="
                  mt-2

                  break-words

                  text-2xl
                  font-bold
                  tracking-tight

                  text-slate-900
                  dark:text-white

                  sm:text-3xl
                "
              >
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* ================= OVERVIEW ================= */}
      <section
        className="
          relative
          overflow-hidden

          rounded-2xl
          sm:rounded-3xl

          border

          border-slate-200
          dark:border-white/10

          bg-white/85
          dark:bg-white/[0.055]

          backdrop-blur-2xl

          p-5
          sm:p-6
          lg:p-8

          shadow-[0_14px_38px_rgba(15,23,42,0.07)]
          dark:shadow-[0_14px_38px_rgba(0,0,0,0.28)]
        "
      >
        {/* GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0

            h-40
            w-40

            rounded-full

            bg-violet-500/10
            dark:bg-violet-500/20

            blur-3xl
          "
        />

        <div className="relative z-10">
          <h3
            className="
              text-lg
              font-semibold

              text-slate-900
              dark:text-white
            "
          >
            Store Overview
          </h3>

          <p
            className="
              mt-3

              max-w-3xl

              text-sm
              leading-7

              text-slate-600
              dark:text-slate-400
            "
          >
            Monitor products,
            customer orders, and
            revenue from a single
            admin dashboard with
            real-time analytics and
            premium management
            tools.
          </p>
        </div>
      </section>
    </main>
  );
}
