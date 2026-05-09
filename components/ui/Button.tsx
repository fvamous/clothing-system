"use client";

import * as React from "react";

type Props =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:
      | "default"
      | "outline"
      | "destructive";
  };

export function Button({
  className = "",
  variant = "default",
  ...props
}: Props) {
  let variantClass = "";

  if (variant === "outline") {
    variantClass =
      "border border-border bg-background hover:bg-muted";
  }

  if (variant === "destructive") {
    variantClass =
      "bg-red-500 text-white hover:bg-red-600";
  }

  if (variant === "default") {
    variantClass =
      "bg-black text-white hover:opacity-90";
  }

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-4
        py-2
        text-sm
        font-medium
        transition-all
        disabled:opacity-50
        ${variantClass}
        ${className}
      `}
      {...props}
    />
  );
}