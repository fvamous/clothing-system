import Image from "next/image";

import { prisma } from "@/lib/infra/prisma/client";

import ProductPrice from "@/components/product/ProductPrice";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const product =
    await prisma.product.findFirst({
      where: {
        OR: [
          {
            id: params.id,
          },

          {
            slug: params.id,
          },
        ],
      },

      include: {
        category: true,
      },
    });

  if (!product) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-[32px]
            border
            border-white/10
            bg-white/40
            px-10
            py-8
            text-center
            shadow-2xl
            backdrop-blur-2xl
            dark:border-white/5
            dark:bg-white/[0.03]
          "
        >
          <h2
            className="
              text-2xl
              font-black
              tracking-tight
              text-zinc-900
              dark:text-white
            "
          >
            Product not found
          </h2>

          <p
            className="
              mt-3
              text-sm
              text-zinc-600
              dark:text-zinc-400
            "
          >
            The product does not exist
            or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        py-24
      "
    >
      {/* BG GLOW */}
      <div
        className="
          absolute
          right-[-160px]
          top-[-160px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-pink-400/20
          blur-3xl
          dark:bg-blue-500/10
        "
      />

      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          gap-14
          px-6
          lg:grid-cols-2
          lg:gap-20
        "
      >
        {/* IMAGE */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[42px]
            border
            border-white/20
            bg-white/40
            shadow-[0_40px_120px_rgba(0,0,0,0.12)]
            backdrop-blur-2xl
            dark:border-white/10
            dark:bg-white/[0.03]
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-white/10
              to-transparent
              pointer-events-none
            "
          />

          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
            "
          >
            <Image
              src={
                product.imageUrl ||
                "/logo.jpeg"
              }
              alt={product.name}
              fill
              priority
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.03]
              "
            />
          </div>
        </div>

        {/* CONTENT */}
        <div
          className="
            flex
            flex-col
            justify-center
          "
        >
          <div
            className="
              inline-flex
              w-fit
              items-center
              rounded-full
              border
              border-white/20
              bg-white/50
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.28em]
              text-zinc-600
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-zinc-400
            "
          >
            {product.category?.name ||
              "Fashion"}
          </div>

          <h1
            className="
              mt-6
              text-5xl
              font-black
              leading-none
              tracking-[-0.04em]
              text-zinc-900
              dark:text-white
              md:text-6xl
            "
          >
            {product.name}
          </h1>

          <div className="mt-8">
            <ProductPrice
              price={product.price}
              className="
                text-4xl
                font-black
              "
            />
          </div>

          <p
            className="
              mt-8
              max-w-2xl
              text-base
              leading-relaxed
              text-zinc-600
              dark:text-zinc-400
            "
          >
            {product.description ||
              "Premium modern apparel designed with a clean silhouette, elevated materials, and timeless aesthetics."}
          </p>

          {/* ACTIONS */}
          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "
          >
            <button
              className="
                inline-flex
                h-14
                items-center
                justify-center
                rounded-full
                bg-zinc-950
                px-8
                text-sm
                font-bold
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-2xl
                dark:bg-white
                dark:text-black
              "
            >
              Add to Cart
            </button>

            <button
              className="
                inline-flex
                h-14
                items-center
                justify-center
                rounded-full
                border
                border-zinc-300
                bg-white/50
                px-8
                text-sm
                font-bold
                text-zinc-900
                backdrop-blur-xl
                transition-all
                duration-300
                hover:bg-white
                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:hover:bg-white/[0.06]
              "
            >
              Buy Now
            </button>
          </div>

          {/* META */}
          <div
            className="
              mt-12
              grid
              gap-4
              sm:grid-cols-3
            "
          >
            {[
              "Premium Material",
              "Modern Fit",
              "Fast Delivery",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-[24px]
                  border
                  border-white/15
                  bg-white/40
                  px-5
                  py-4
                  text-sm
                  font-medium
                  text-zinc-700
                  shadow-lg
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-white/[0.03]
                  dark:text-zinc-300
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}