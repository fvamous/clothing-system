"use client";

import * as React from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:opacity-90",
  secondary:
    "bg-muted text-foreground hover:bg-muted/80",
  outline:
    "border border-border bg-background hover:bg-muted",
  ghost:
    "bg-transparent hover:bg-muted text-foreground",
  danger:
    "bg-red-500 text-white hover:bg-red-600",
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: Props) {
  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        px-4
        py-2
        text-sm
        font-medium
        transition
        disabled:opacity-50
        disabled:pointer-events-none
        ${variants[variant]}
        ${className}
      `}
      {...props}
    />
  );
}