"use client";

import { cn } from "@/lib/core/utils";

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  muted?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-3xl font-semibold",
};

export function Text({
  className,
  muted = false,
  size = "md",
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        "leading-relaxed",
        sizes[size],
        muted && "text-current opacity-60",
        className
      )}
      {...props}
    />
  );
}
