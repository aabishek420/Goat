import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../ui/utils";

/* -------------------------------- Section -------------------------------- */

const sectionVariants = cva("space-y-4", {
  variants: {
    layout: {
      default: "",
      grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
    },
  },
  defaultVariants: {
    layout: "grid",
  },
});

export function FormSection({
  title,
  children,
  layout,
}: {
  title: string;
  children: React.ReactNode;
  layout?: "default" | "grid";
}) {
  return (
    <div>
      <h3 className="mb-4 border-b pb-2 text-lg font-semibold">{title}</h3>
      <div className={cn(sectionVariants({ layout }))}>{children}</div>
    </div>
  );
}

/* -------------------------------- Input -------------------------------- */

const inputVariants = cva(
  "w-full rounded-lg border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
  {
    variants: {
      size: {
        sm: "h-9",
        md: "h-11",
      },
      error: {
        true: "border-destructive focus:ring-destructive/30",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input
          ref={ref}
          className={cn(inputVariants({ error }), className)}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

/* -------------------------------- Select -------------------------------- */

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <select
          ref={ref}
          className={cn(
            inputVariants({ error }),
            "appearance-none pr-10",
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";

/* -------------------------------- Textarea -------------------------------- */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <textarea
          ref={ref}
          className={cn(inputVariants({ error }), "min-h-[80px]", className)}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
