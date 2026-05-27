// lib/ui/semantic.ts

export const semantic = {
  success: {
    bg: `
      bg-green-100
      dark:bg-green-500/15
    `,

    text: `
      text-green-700
      dark:text-green-300
    `,

    border: `
      border-green-200
      dark:border-green-500/20
    `,
  },

  warning: {
    bg: `
      bg-yellow-100
      dark:bg-yellow-500/15
    `,

    text: `
      text-yellow-700
      dark:text-yellow-300
    `,

    border: `
      border-yellow-200
      dark:border-yellow-500/20
    `,
  },

  danger: {
    bg: `
      bg-red-100
      dark:bg-red-500/15
    `,

    text: `
      text-red-700
      dark:text-red-300
    `,

    border: `
      border-red-200
      dark:border-red-500/20
    `,
  },

  info: {
    bg: `
      bg-blue-100
      dark:bg-blue-500/15
    `,

    text: `
      text-blue-700
      dark:text-blue-300
    `,

    border: `
      border-blue-200
      dark:border-blue-500/20
    `,
  },

  neutral: {
    bg: `
      bg-slate-100
      dark:bg-white/[0.05]
    `,

    text: `
      text-slate-700
      dark:text-slate-300
    `,

    border: `
      border-slate-200
      dark:border-white/10
    `,
  },
};

export type SemanticColor =
  keyof typeof semantic;