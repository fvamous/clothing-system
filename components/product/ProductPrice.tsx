type ProductPriceProps = {
  price: number;
  className?: string;
};

export default function ProductPrice({
  price,
  className,
}: ProductPriceProps) {
  return (
    <span
      className={[
        "font-semibold tracking-tight text-zinc-900 dark:text-white",
        className,
      ].join(" ")}
    >
      Rp {price.toLocaleString("id-ID")}
    </span>
  );
}