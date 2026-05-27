// shared/surfaces.ts

export const surfaces = {
  glass: `
    border border-white/10
    bg-white/70
    backdrop-blur-2xl

    dark:bg-white/[0.04]
  `,

  card: `
    rounded-3xl
    border border-slate-200
    bg-white
    shadow-[0_10px_40px_rgba(15,23,42,0.06)]

    dark:border-white/10
    dark:bg-white/[0.04]
    dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
  `,

  elevated: `
    rounded-[32px]
    border border-slate-200/70
    bg-white/80
    backdrop-blur-2xl

    dark:border-white/10
    dark:bg-[#0f172a]/72
  `,
};