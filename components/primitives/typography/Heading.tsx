import { cn } from "@/lib/core/utils";

export default function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-2xl font-bold tracking-tight md:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}