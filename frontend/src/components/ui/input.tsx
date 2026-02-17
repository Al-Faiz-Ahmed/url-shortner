import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground border-px border-muted-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-background dark:bg-input/30 w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        xs: "h-8 px-2 text-xs",
        sm: "h-9 px-3 text-xs md:text-sm",
        md: "h-10 px-3.5 text-sm md:text-base",
        lg: "h-11 px-4 text-base md:text-lg",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "sm", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        data-size={size}
        className={cn(inputVariants({ size }), className)}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }
