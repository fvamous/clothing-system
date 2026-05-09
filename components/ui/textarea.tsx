import * as React from "react";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(
  (
    { className = "", ...props },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        className={`
          min-h-[120px]
          w-full
          rounded-xl
          border
          border-border
          bg-background
          px-4
          py-3
          text-sm
          outline-none
          focus:ring-2
          focus:ring-black
          ${className}
        `}
        {...props}
      />
    );
  }
);

Textarea.displayName =
  "Textarea";

export default Textarea;