import { cn } from "@/lib/core/utils";

export default function FieldLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "mb-2 block text-sm font-medium text-foreground",
        className
      )}
    >
      {children}
    </label>
  );
}