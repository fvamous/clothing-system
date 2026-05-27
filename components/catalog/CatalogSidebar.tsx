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
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
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
              transition
              hover:border-white/10
              hover:bg-white/5
            "
          >
            {category.name}
          </button>
        ))}
      </div>
    </aside>
  );
}