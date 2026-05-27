"use client";

import Image from "next/image";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({
  images,
}: ProductGalleryProps) {
  const [active, setActive] =
    useState(0);

  return (
    <div className="space-y-4">
      <div
        className="
          relative
          aspect-square
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/5
        "
      >
        <Image
          src={images[active]}
          alt={`Product image ${
            active + 1
          }`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={img}
            onClick={() =>
              setActive(index)
            }
            className={`
              relative
              h-20
              w-20
              overflow-hidden
              rounded-2xl
              border
              transition-all

              ${
                active === index
                  ? "border-white"
                  : "border-white/10"
              }
            `}
          >
            <Image
              src={img}
              alt={`Thumbnail ${
                index + 1
              }`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}