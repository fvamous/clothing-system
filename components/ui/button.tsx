"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/core/utils";

type ButtonVariant = "default" | "outline" | "ghost" | "destructive";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-white text-black shadow-lg shadow-black/10 hover:bg-white/90",
  outline:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  ghost:
    "bg-transparent text-white hover:bg-white/10",
  destructive:
    "bg-red-500 text-white hover:bg-red-500/90",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "default", type = "button", ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold",
          "transition-all duration-200 hover:scale-[1.02]",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
