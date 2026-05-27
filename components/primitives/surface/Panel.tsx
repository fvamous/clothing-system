import { cn } from "@/lib/core/utils";
import Surface from "./Surface";

export default function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Surface
      className={cn(
        "p-5 md:p-6",
        className
      )}
    >
      {children}
    </Surface>
  );
}