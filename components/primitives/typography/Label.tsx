import type { ReactNode } from "react";

import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Label({
  children,
  className,
}: Props) {
  return (
    <label
      className={clsx(
        "text-sm font-medium text-white/80",
        className
      )}
    >
      {children}
    </label>
  );
}