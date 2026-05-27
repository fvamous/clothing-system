import { cn } from "@/lib/core/utils";

export default function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "py-10 md:py-14 lg:py-20",
        className
      )}
    >
      {children}
    </section>
  );
}