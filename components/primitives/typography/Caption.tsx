import { cn } from "@/lib/core/utils";

export default function Caption({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-xs text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}