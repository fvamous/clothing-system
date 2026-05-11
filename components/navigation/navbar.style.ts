import { CSSProperties } from "react";

export const getNavbarStyles = (isDark: boolean) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    margin: 16,
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderRadius: 999,
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",

    background: isDark
      ? "rgba(2,6,23,0.65)"
      : "rgba(255,255,255,0.65)",

    border: isDark
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.06)",

    boxShadow: isDark
      ? "0 18px 40px rgba(0,0,0,0.55)"
      : "0 18px 40px rgba(0,0,0,0.08)",
  } as CSSProperties,

  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  brand: {
    fontSize: 18,
    fontWeight: 800,
    color: isDark ? "#e5e7eb" : "#0f172a",
  } as CSSProperties,

  nav: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  } as CSSProperties,

  link: {
    padding: "10px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    color: isDark ? "#e5e7eb" : "#0f172a",
    background: isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.04)",
  } as CSSProperties,

  admin: {
    padding: "10px 16px",
    borderRadius: 999,
    fontWeight: 700,
    color: "white",
    background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  } as CSSProperties,

  right: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  } as CSSProperties,

  button: {
    padding: "10px 16px",
    borderRadius: 999,
    cursor: "pointer",
    background: isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.85)",
    color: isDark ? "#e5e7eb" : "#111827",
  } as CSSProperties,

  email: {
    fontSize: 13,
    maxWidth: 160,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: isDark ? "#e5e7eb" : "#0f172a",
  } as CSSProperties,

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  } as CSSProperties,

  hamburger: {
    width: 44,
    height: 44,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  mobileMenu: {
    position: "fixed",
    top: 90,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    backdropFilter: "blur(24px)",
    background: isDark
      ? "rgba(2,6,23,0.85)"
      : "rgba(255,255,255,0.95)",
  } as CSSProperties,

  mobileLink: {
    padding: "12px 14px",
    borderRadius: 14,
    fontWeight: 600,
    color: isDark ? "#e5e7eb" : "#0f172a",
  } as CSSProperties,
});