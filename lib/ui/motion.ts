// ui/motion.ts

export const motion = {
  fast: "all .15s ease",

  normal: "all .25s ease",

  slow: "all .4s ease",

  spring:
    "transform .35s cubic-bezier(.22,1,.36,1)",

  hover: {
    scale: "scale(1.02)",

    lift: "translateY(-2px)",
  },
};

export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  transition: {
    duration: 0.4,
  },
};