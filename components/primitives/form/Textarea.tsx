import { forwardRef } from "react";

import { cn } from "@/lib/core/utils";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[140px] w-full rounded-2xl",
        "border border-white/10",
        "bg-white/5",
        "p-4",
        "text-sm text-white",
        "outline-none",
        "transition-all duration-200",
        "placeholder:text-white/30",
        "focus:border-white/20",
        "focus:bg-white/10",
        className
      )}
      {...props}
    />
  );
});

export default Textarea;