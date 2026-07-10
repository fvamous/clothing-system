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
        "border border-zinc-200/70",
        "bg-white/80",
        "px-4",
        "text-sm text-zinc-950",
        "outline-none",
        "transition-all duration-200",
        "placeholder:text-zinc-400",
        "focus:border-zinc-400",
        "focus:bg-white",
        "dark:border-white/10",
        "dark:bg-white/5",
        "dark:text-white",
        "dark:placeholder:text-white/30",
        "dark:focus:border-white/20",
        "dark:focus:bg-white/10",
        className
      )}
      {...props}
    />
  );
});

export default Input;
