"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Standard utility classes for Halo Focus Ring.
 * Can be passed directly to interactive elements.
 */
export const haloFocusRingClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-10 halo-focus-ring";

export const haloFocusRingVariants = cva(
  "transition-shadow duration-150 focus-visible:outline-none halo-focus-ring",
  {
    variants: {
      offset: {
        none: "focus-visible:ring-offset-0",
        sm: "focus-visible:ring-offset-1",
        default: "focus-visible:ring-offset-2",
        lg: "focus-visible:ring-offset-4",
      },
      variant: {
        default:
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-[var(--halo-focus-offset-color)]",
        subtle:
          "focus-visible:ring-1.5 focus-visible:ring-[var(--halo-focus-color)]/80 focus-visible:ring-offset-[var(--halo-focus-offset-color)]",
        destructive:
          "focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-[var(--halo-focus-offset-color)]",
        inset:
          "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--halo-focus-color)]",
      },
    },
    defaultVariants: {
      offset: "default",
      variant: "default",
    },
  }
);

export interface HaloFocusRingProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof haloFocusRingVariants> {
  /**
   * Merge props onto child element instead of rendering a wrapper node.
   * Useful when wrapping interactive components like `<Button>`, `<Input>`, etc.
   */
  asChild?: boolean;
}

/**
 * HaloFocusRing
 *
 * Shared high-contrast accessibility infrastructure for HaloUI interactive components.
 * Renders an independent, double-contrast `:focus-visible` perimeter that remains
 * clearly perceivable across dark/light modes, translucent glass surfaces, and dense UI.
 *
 * Notice: Material effects (Halo Edge, Halo Glow, Halo Highlight) are NOT focus indicators.
 * Halo Focus Ring operates independently outside the material boundary.
 */
export const HaloFocusRing = React.forwardRef<HTMLElement, HaloFocusRingProps>(
  ({ className, asChild = false, offset, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref as any}
        className={cn(haloFocusRingVariants({ offset, variant }), className)}
        {...props}
      />
    );
  }
);

HaloFocusRing.displayName = "HaloFocusRing";
