import { cn } from "@/lib/core/utils";

export default function Surface({
  children,
  className,
  glass = false,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-200/70 bg-white/70",
        "backdrop-blur-xl",
        "dark:border-white/10 dark:bg-white/5",
        glass && "bg-white/85 dark:bg-white/10",
        hover && "hover:-translate-y-1 hover:bg-white dark:hover:bg-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}
