import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none",
  {
    variants: {
      variant: {
        gold: "bg-amber-500 text-zinc-950 font-semibold hover:bg-amber-400 active:bg-amber-600 shadow-sm",
        outline:
          "border border-amber-500/40 text-zinc-100 hover:bg-amber-500/10 hover:border-amber-400 active:bg-amber-500/20",
        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800",
        ghost:
          "text-zinc-300 hover:bg-zinc-800/60 hover:text-amber-400 active:bg-zinc-800",
        link: "text-amber-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5 min-h-[44px]",
        sm: "h-9 rounded-md px-3.5 text-xs min-h-[36px]",
        lg: "h-12 rounded-md px-8 text-base min-h-[48px]",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
