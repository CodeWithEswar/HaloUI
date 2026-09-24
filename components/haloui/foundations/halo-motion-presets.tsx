"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Standard motion tokens representing HaloUI's physical kinetic model.
 */
export const haloMotionTokens = {
  duration: {
    micro: "120ms",
    state: "180ms",
    reveal: "240ms",
    settle: "320ms",
  },
  easing: {
    tactile: "cubic-bezier(0.2, 0.8, 0.3, 1)",
    spring: "cubic-bezier(0.16, 1, 0.3, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
  },
} as const;

/**
 * Direct CSS class names for HaloUI motion presets.
 */
export const haloMotion = {
  press: "halo-motion-press",
  lift: "halo-motion-lift",
  reveal: "halo-motion-reveal",
  settle: "halo-motion-settle",
  float: "halo-motion-float",
} as const;

export type HaloMotionPreset = keyof typeof haloMotion;

export const haloMotionVariants = cva("", {
  variants: {
    preset: {
      press: "halo-motion-press",
      lift: "halo-motion-lift",
      reveal: "halo-motion-reveal",
      settle: "halo-motion-settle",
      float: "halo-motion-float",
    },
  },
  defaultVariants: {
    preset: "press",
  },
});

export interface HaloMotionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof haloMotionVariants> {
  /**
   * Merge motion behavior onto immediate child element without extra DOM nodes.
   */
  asChild?: boolean;
}

/**
 * HaloMotion
 *
 * Central motion vocabulary providing physical press compression, elevation lift,
 * spring-settle entrance, and graceful reduced-motion fallbacks across HaloUI.
 */
export const HaloMotion = React.forwardRef<HTMLElement, HaloMotionProps>(
  ({ className, asChild = false, preset, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref as any}
        className={cn(haloMotionVariants({ preset }), className)}
        {...props}
      />
    );
  }
);

HaloMotion.displayName = "HaloMotion";
