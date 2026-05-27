import { cn } from "@/lib/core/utils";

export default function Glass({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-white/10",
        "bg-white/5 backdrop-blur-2xl",
        "rounded-3xl shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}