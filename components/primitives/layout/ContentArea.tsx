import { cn } from "@/lib/core/utils";

export default function ContentArea({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "min-h-screen w-full",
        className
      )}
    >
      {children}
    </main>
  );
}