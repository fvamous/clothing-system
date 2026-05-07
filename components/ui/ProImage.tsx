"use client";

import { useState } from "react";

type Props = {
  src?: string | null;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
};

export default function ProImage({
  src,
  alt,
  style,
  className,
}: Props) {
  const [imgSrc, setImgSrc] = useState(src || "/placeholder.png");
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#f3f4f6",
      }}
    >
      <img
        src={imgSrc}
        alt={alt || "image"}
        loading="lazy"
        className={className}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setImgSrc("/placeholder.png");
        }}
      />

      {/* LOADING SHIM (SKELETON EFFECT) */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,#eee,#f5f5f5,#eee)",
            animation: "pulse 1.2s infinite",
          }}
        />
      )}

      <style jsx>{`
        @keyframes pulse {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }
      `}</style>
    </div>
  );
}