import * as React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: Props) {
  return (
    <div
      className={`
        rounded-[28px]
        border border-white/40
        bg-white/50
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        ${className}
      `}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: Props) {
  return (
    <div
      className={`
        p-6 pb-4
        ${className}
      `}
      {...props}
    />
  );
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`
        text-lg font-semibold tracking-tight
        text-gray-900
        ${className}
      `}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: Props) {
  return (
    <div
      className={`p-6 pt-0 ${className}`}
      {...props}
    />
  );
}