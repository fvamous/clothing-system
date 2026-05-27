import type { ReactNode } from "react";

import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Grid({
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}