import * as React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`
        flex
        h-11
        w-full
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-2
        text-sm
        outline-none
        focus:ring-2
        focus:ring-black
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;