import * as React from "react";
import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border-2 border-olive/10 bg-white/50 px-4 py-2 text-sm font-medium text-forest ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-olive/40 focus-visible:outline-none focus-visible:border-olive focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
