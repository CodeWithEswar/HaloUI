"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type HaloRefractionIntensity = "subtle" | "balanced";

export interface HaloRefractionLayerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Refraction intensity controlling the environmental displacement magnitude
   * and perimeter meniscus distortion.
   * @default "subtle"
   */
  intensity?: HaloRefractionIntensity;
  /**
   * Render as a Radix Slot child element to compose directly onto consumer elements
   * without adding extra DOM nodes.
   * @default false
   */
  asChild?: boolean;
  /**
   * Optional custom CSS class string for layout adjustments.
   */
  className?: string;
}

/**
 * HaloRefractionLayer — Optional progressive-enhancement optical foundation.
 *
 * Uses a static perimeter reflection approximation without environmental displacement
 * simulating liquid material refraction. Designed to compose inside HaloSurface.
 *
 * Content Safety Contract:
 * - Operates purely behind or around consumer content.
 * - aria-hidden="true" and pointer-events-none enforced.
 * - Text, icons, forms, and focus indicators are never distorted.
 */
export const HaloRefractionLayer = React.forwardRef<
  HTMLDivElement,
  HaloRefractionLayerProps
>(function HaloRefractionLayer(
  {
    intensity = "subtle",
    asChild = false,
    className,
    children,
    ...props
  },
  ref
) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      aria-hidden="true"
      data-halo-layer="refraction"
      data-intensity={intensity}
      className={cn(
        "halo-optical-refraction select-none",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});

HaloRefractionLayer.displayName = "HaloRefractionLayer";
