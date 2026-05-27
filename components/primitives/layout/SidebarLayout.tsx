import { cn } from "@/lib/core/utils";

export default function SidebarLayout({
  sidebar,
  children,
  className,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]",
        className
      )}
    >
      <aside>{sidebar}</aside>

      <div>{children}</div>
    </div>
  );
}