"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);

  return (
    <div style={styles.wrap}>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && " / "}
        </span>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
};