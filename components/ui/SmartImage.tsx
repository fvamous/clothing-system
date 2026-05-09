// components/ui/SmartImage.tsx

"use client";

import Image from "next/image";

type Props = {
  src?: string | null;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  style?: React.CSSProperties;
};

export default function SmartImage({
  src,
  alt = "Image",
  className,
  width = 600,
  height = 600,
  fill = false,
  priority = false,
  style,
}: Props) {
  const imageSrc =
    src && src.trim() !== ""
      ? src
      : "/file.svg";

  // =========================
  // BASE IMAGE
  // =========================
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        className={className}
        style={{
          objectFit: "cover",
          ...style,
        }}
        unoptimized={
          imageSrc.startsWith("data:")
        }
      />
    );
  }

  // =========================
  // NORMAL IMAGE
  // =========================
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={style}
      unoptimized={
        imageSrc.startsWith("data:")
      }
    />
  );
}