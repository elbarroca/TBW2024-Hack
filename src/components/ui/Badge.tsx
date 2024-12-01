import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-purple-500 text-white hover:bg-purple-600",
        secondary:
          "border-transparent bg-purple-100 text-purple-900 hover:bg-purple-200",
        destructive:
          "border-transparent bg-red-100 text-red-900 hover:bg-red-200",
        outline: "text-purple-900 hover:bg-purple-100",
        success:
          "border-transparent bg-green-100 text-green-900 hover:bg-green-200",
        warning:
          "border-transparent bg-yellow-100 text-yellow-900 hover:bg-yellow-200",
        info: "border-transparent bg-blue-100 text-blue-900 hover:bg-blue-200",
        gradient:
          "border-transparent bg-gradient-to-r from-purple-600 to-teal-500 text-white hover:from-purple-700 hover:to-teal-600",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants }; 