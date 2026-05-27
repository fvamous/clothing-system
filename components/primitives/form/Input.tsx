import { forwardRef } from "react";

import { cn } from "@/lib/core/utils";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl",
        "border border-white/10",
        "bg-white/5",
        "px-4",
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

export default Input;