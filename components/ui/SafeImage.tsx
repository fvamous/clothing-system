"use client";

import { useState } from "react";

type Props = {
  src?: string | null;
  alt?: string;
  style?: React.CSSProperties;
};

export default function SafeImage({ src, alt, style }: Props) {
  const [imgSrc, setImgSrc] = useState(src || "/placeholder.png");

  return (
    <img
      src={imgSrc}
      alt={alt || "image"}
      style={style}
      loading="lazy"
      onError={() => {
        setImgSrc("/placeholder.png");
      }}
    />
  );
}