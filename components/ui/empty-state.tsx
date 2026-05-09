// components/ui/empty-state.tsx

import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex flex-col items-center
        justify-center
        rounded-3xl
        border border-dashed border-white/10
        bg-white/5
        px-6 py-16
        text-center
      "
    >
      <div
        className="
          mb-5 flex h-20 w-20
          items-center justify-center
          rounded-full bg-white/10
        "
      >
        <Inbox className="h-10 w-10" />
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-sm text-zinc-500">
          {description}
        </p>
      )}
    </div>
  );
}