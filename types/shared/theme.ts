// shared/theme.ts

export const theme = {
  radius: {
    xs: 10,
    sm: 14,
    md: 20,
    lg: 28,
    xl: 40,
    "2xl": 56,
    full: 9999,
  },

  blur: {
    xs: "blur(6px)",
    sm: "blur(12px)",
    md: "blur(20px)",
    lg: "blur(30px)",
    xl: "blur(40px)",
  },

  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 72,
  },

  shadow: {
    softLight:
      "0 10px 30px rgba(15,23,42,0.06)",

    mediumLight:
      "0 20px 60px rgba(15,23,42,0.08)",

    heavyLight:
      "0 30px 100px rgba(15,23,42,0.12)",

    softDark:
      "0 10px 30px rgba(0,0,0,0.25)",

    mediumDark:
      "0 20px 60px rgba(0,0,0,0.45)",

    heavyDark:
      "0 40px 120px rgba(0,0,0,0.55)",

    glow:
      "0 0 40px rgba(255,255,255,0.08)",
  },

  border: {
    light:
      "1px solid rgba(15,23,42,0.08)",

    dark:
      "1px solid rgba(255,255,255,0.08)",

    lightStrong:
      "1px solid rgba(15,23,42,0.14)",

    darkStrong:
      "1px solid rgba(255,255,255,0.14)",
  },

  surface: {
    light:
      "rgba(255,255,255,0.72)",

    dark:
      "rgba(15,23,42,0.72)",

    lightSoft:
      "rgba(255,255,255,0.52)",

    darkSoft:
      "rgba(15,23,42,0.52)",

    lightStrong:
      "rgba(255,255,255,0.92)",

    darkStrong:
      "rgba(15,23,42,0.92)",
  },

  text: {
    primaryLight: "#0f172a",
    secondaryLight: "#475569",
    mutedLight: "#64748b",

    primaryDark: "#ffffff",
    secondaryDark: "#cbd5e1",
    mutedDark: "#94a3b8",
  },

  gradient: {
    light:
      "linear-gradient(135deg,#ffffff 0%,#f8fafc 45%,#fff1f5 100%)",

    dark:
      "linear-gradient(135deg,#020617 0%,#0f172a 45%,#111827 100%)",

    glass:
      "linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06))",

    premium:
      "linear-gradient(135deg,#0f172a,#111827,#000000)",
  },

  transition: {
    fast: "all .15s ease",
    normal: "all .25s ease",
    slow: "all .4s ease",
  },
};

export type AppTheme = typeof theme;