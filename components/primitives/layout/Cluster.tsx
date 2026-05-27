import { cn } from "@/lib/core/utils";

export default function Cluster({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        className
      )}
    >
      {children}
    </div>
  );
}