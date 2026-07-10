import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-gradient-to-br
        from-zinc-100
        to-white
        px-8
        py-24
        dark:from-zinc-900
        dark:to-black
        md:px-16
      "
    >
      {/* glow */}
      <div
        className="
          absolute
          left-0
          top-0
          h-72
          w-72
          rounded-full
          bg-white/20
          blur-3xl
        "
      />

      <div className="relative z-10 max-w-3xl">
        <p
          className="
            mb-5
            text-xs
            uppercase
            tracking-[0.28em]
            text-zinc-500
            dark:text-zinc-400
          "
        >
          Modern Fashion System
        </p>

        <h1
          className="
            text-5xl
            font-black
            leading-tight
            tracking-tight
            text-zinc-900
            dark:text-white
            md:text-7xl
          "
        >
          Build your
          <br />
          visual identity.
        </h1>

        <p
          className="
            mt-6
            max-w-xl
            text-base
            leading-relaxed
            text-zinc-600
            dark:text-zinc-400
          "
        >
          Premium clothing storefront with modern
          glassmorphism DNA, cinematic layouts,
          and scalable commerce architecture.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/catalog"
            className="
              rounded-2xl
              bg-black
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
              dark:bg-white
              dark:text-black
            "
          >
            Explore Catalog
          </Link>

          <Link
            href="#brand-story"
            className="
              rounded-2xl
              border
              border-zinc-300
              px-6
              py-3
              text-sm
              font-medium
              text-zinc-900
              dark:border-zinc-700
              dark:text-zinc-100
            "
          >
            Brand Story
          </Link>
        </div>
      </div>
    </section>
  );
}
