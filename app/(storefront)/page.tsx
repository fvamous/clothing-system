import HomeClient from "@/components/home/HomeClient";

import { prisma } from "@/lib/infra/prisma/client";

export default async function HomePage() {
  const products =
    await prisma.product.findMany({
      where: {
        isDeleted: false,
      },

      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 8,
    });

  return (
    <main
      className="
        relative
        overflow-hidden
      "
    >
      {/* GLOBAL BG */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
        "
      >
        {/* TOP GLOW */}
        <div
          className="
            absolute
            left-[-120px]
            top-[-120px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-pink-400/20
            blur-3xl
            dark:bg-blue-500/10
          "
        />

        {/* BOTTOM GLOW */}
        <div
          className="
            absolute
            bottom-[-160px]
            right-[-120px]
            h-[460px]
            w-[460px]
            rounded-full
            bg-violet-400/20
            blur-3xl
            dark:bg-cyan-500/10
          "
        />

        {/* GRID */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
            dark:opacity-[0.05]
          "
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize:
              "40px 40px",
          }}
        />
      </div>

      <HomeClient
        products={products}
      />
    </main>
  );
}