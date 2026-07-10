type CatalogSidebarProps = {
  categories: {
    id: string;
    name: string;
  }[];
};

export default function CatalogSidebar({
  categories,
}: CatalogSidebarProps) {
  return (
    <aside
      className="
        rounded-[32px]
        border
        border-zinc-200/70
        bg-white/70
        p-6
        text-zinc-950
        shadow-sm
        backdrop-blur-xl
        dark:border-white/10
        dark:bg-white/5
        dark:text-white
      "
    >
      <h3 className="mb-6 font-semibold">
        Categories
      </h3>

      <div className="space-y-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className="
              block
              w-full
              rounded-2xl
              border
              border-transparent
              px-4
              py-3
              text-left
              text-zinc-600
              transition
              hover:border-zinc-200
              hover:bg-white
              hover:text-zinc-950
              dark:text-zinc-300
              dark:hover:border-white/10
              dark:hover:bg-white/5
              dark:hover:text-white
            "
          >
            {category.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
