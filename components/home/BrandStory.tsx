export default function BrandStory() {
  return (
    <section
      id="brand-story"
      className="
        grid
        gap-10
        rounded-[36px]
        border
        border-white/10
        bg-white/40
        p-10
        backdrop-blur-xl
        dark:bg-white/5
        lg:grid-cols-2
      "
    >
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
          Our DNA
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Minimal fashion.
          <br />
          modern system.
        </h2>
      </div>

      <div className="space-y-5 text-zinc-600 dark:text-zinc-400">
        <p>
          Clothing System dibangun sebagai modern
          fashion commerce architecture dengan fokus
          pada premium visual experience.
        </p>

        <p>
          Sistem ini scalable untuk AI commerce,
          automation, smart catalog, dan luxury
          storefront ecosystem.
        </p>
      </div>
    </section>
  );
}
