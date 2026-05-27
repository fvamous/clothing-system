import { cn } from "@/lib/core/utils";

export default function Floating({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed z-50",
        className
      )}
    >
      {children}
    </div>
  );
}