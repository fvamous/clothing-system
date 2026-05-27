import { cn } from "@/lib/core/utils";

export default function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-2xl",
        "border border-white/10",
        "bg-zinc-950",
        "px-4",
        "text-sm text-white",
        "outline-none",
        "transition-all",
        "focus:border-white/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}