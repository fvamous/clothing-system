import clsx from "clsx";

export function cn(
  ...inputs: (string | undefined | false)[]
) {
  return clsx(inputs);
}