// ui/variants.ts

export const buttonVariants = {
  primary: `
    bg-slate-900
    text-white
    hover:bg-slate-800

    dark:bg-white
    dark:text-black
    dark:hover:bg-zinc-200
  `,

  secondary: `
    border border-slate-200
    bg-white
    text-slate-900

    hover:bg-slate-50

    dark:border-white/10
    dark:bg-white/[0.04]
    dark:text-white
    dark:hover:bg-white/[0.08]
  `,

  ghost: `
    bg-transparent

    hover:bg-slate-100

    dark:hover:bg-white/[0.06]
  `,

  danger: `
    bg-red-500
    text-white
    hover:bg-red-600
  `,
};

export const badgeVariants = {
  success: `
    bg-green-100
    text-green-700

    dark:bg-green-500/20
    dark:text-green-300
  `,

  warning: `
    bg-yellow-100
    text-yellow-700

    dark:bg-yellow-500/20
    dark:text-yellow-300
  `,

  danger: `
    bg-red-100
    text-red-700

    dark:bg-red-500/20
    dark:text-red-300
  `,
};