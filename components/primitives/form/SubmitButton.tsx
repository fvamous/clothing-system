"use client";

import Spinner from "../feedback/Spinner";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function SubmitButton({
  loading,
  children,
  className = "",
  ...props
}: SubmitButtonProps) {
  return (
    <button
      className={`
        inline-flex h-12 items-center justify-center
        rounded-2xl px-5
        bg-white text-black
        text-sm font-semibold
        transition-all duration-200
        hover:scale-[1.02]
        disabled:opacity-50
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        children
      )}
    </button>
  );
}