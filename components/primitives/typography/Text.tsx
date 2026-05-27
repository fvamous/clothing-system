import type { ReactNode } from "react";

import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Text({
  children,
  className,
}: Props) {
  return (
    <p
      className={clsx(
        "text-sm leading-relaxed text-white/70 lg:text-base",
        className
      )}
    >
      {children}
    </p>
  );
}