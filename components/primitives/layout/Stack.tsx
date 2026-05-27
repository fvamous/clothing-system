import type { ReactNode } from "react";

import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  gap?: string;
};

export default function Stack({
  children,
  className,
  gap = "gap-4",
}: Props) {
  return (
    <div
      className={clsx(
        "flex flex-col",
        gap,
        className
      )}
    >
      {children}
    </div>
  );
}