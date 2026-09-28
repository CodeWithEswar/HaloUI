import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type SkeletonAnimation = "pulse" | "shimmer" | "none";
export type SkeletonIntensity = "subtle" | "balanced" | "plain";

export const skeletonVariants = cva(
  [
    "@container/skeleton relative isolate overflow-hidden rounded-md transition-colors duration-150",
    "motion-reduce:animate-none motion-reduce:transition-none",
  ],
  {
    variants: {
      animation: {
        pulse: "animate-pulse",
        shimmer: [
          "after:absolute after:inset-0 after:-translate-x-full",
          "after:animate-[halo-shimmer_1.8s_infinite]",
          "after:bg-gradient-to-r after:from-transparent after:via-white/15 dark:after:via-white/[0.08] after:to-transparent",
          "motion-reduce:after:animate-none motion-reduce:after:hidden",
        ],
        none: "",
      },
      intensity: {
        subtle: [
          // Canonical Subtle Liquid Glass: lightweight placeholder channel
          "bg-black/[0.05] dark:bg-white/[0.07]",
          "border border-black/[0.04] dark:border-white/[0.06]",
        ],
        balanced: [
          // Balanced Liquid Glass: heightened optical contrast for standalone skeletons
          "bg-black/[0.08] dark:bg-white/[0.11]",
          "border border-black/[0.08] dark:border-white/[0.12]",
        ],
        plain: [
          // Plain / Reduced Transparency: solid flat base
          "bg-muted/80 border border-border/50",
        ],
      },
    },
    defaultVariants: {
      animation: "pulse",
      intensity: "subtle",
    },
  }
);

/* -------------------------------------------------------------------------
 * SKELETON COMPONENT
 * Content loading placeholder engineered with Subtle Liquid Glass channels,
 * zero per-fragment backdrop filters, and vestibular reduced-motion safety.
 * ----------------------------------------------------------------------- */

export interface SkeletonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof skeletonVariants> {
  /**
   * Animation mode for the placeholder:
   * - "pulse": subtle opacity modulation (default)
   * - "shimmer": sweeping directional highlight
   * - "none": static placeholder
   */
  animation?: SkeletonAnimation;
  /**
   * Optical material intensity:
   * - "subtle": lightweight channel (default)
   * - "balanced": heightened contrast
   * - "plain": solid fallback
   */
  intensity?: SkeletonIntensity;
}

export function Skeleton({
  className,
  animation = "pulse",
  intensity = "subtle",
  "aria-hidden": ariaHidden = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      data-animation={animation}
      data-intensity={intensity}
      aria-hidden={ariaHidden}
      className={cn(skeletonVariants({ animation, intensity }), className)}
      {...props}
    />
  );
}
