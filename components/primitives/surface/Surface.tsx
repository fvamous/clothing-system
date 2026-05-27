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
        "rounded-3xl border border-white/10 bg-white/5",
        "backdrop-blur-xl",
        glass && "bg-white/10",
        hover && "hover:-translate-y-1 hover:bg-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}
