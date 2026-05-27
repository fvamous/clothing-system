import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
};

export default function SmartImage({
  src,
  alt,
  className,
  fill,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
    />
  );
}