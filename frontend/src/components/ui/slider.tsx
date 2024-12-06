"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    variant?: 'default' | 'video'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track 
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full transition-all",
        variant === 'default' 
          ? "bg-gray-900/20 dark:bg-gray-50/20" 
          : "bg-white/30 group-hover:h-2"
      )}
    >
      <SliderPrimitive.Range 
        className={cn(
          "absolute h-full",
          variant === 'default'
            ? "bg-gray-900 dark:bg-gray-50"
            : "bg-purple-500"
        )} 
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className={cn(
        "block rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === 'default' 
          ? "h-4 w-4 border-gray-200 border-gray-900/50 bg-white ring-offset-white dark:border-gray-800 dark:border-gray-50/50 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300"
          : "h-3 w-3 border-white/70 bg-white opacity-0 group-hover:opacity-100 hover:scale-110"
      )} 
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 