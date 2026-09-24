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

const INTENSITY_CONFIGS: Record<
  HaloRefractionIntensity,
  {
    blur: string;
    rimOpacity: string;
    displacementScale: string;
    chromaticShift: string;
  }
> = {
  subtle: {
    blur: "backdrop-blur-[2px]",
    rimOpacity: "opacity-40 dark:opacity-30",
    displacementScale: "scale-[1.015]",
    chromaticShift: "1px",
  },
  balanced: {
    blur: "backdrop-blur-[4px]",
    rimOpacity: "opacity-70 dark:opacity-55",
    displacementScale: "scale-[1.03]",
    chromaticShift: "2px",
  },
};

/**
 * HaloRefractionLayer — Optional progressive-enhancement optical foundation.
 *
 * Introduces restrained environmental displacement and perimeter meniscus distortion
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
  const config = INTENSITY_CONFIGS[intensity];
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      aria-hidden="true"
      data-halo-layer="refraction"
      data-intensity={intensity}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] select-none",
        className
      )}
      {...props}
    >
      {/* 
        Optical Refraction Substrate:
        Progressive enhancement layer applying localized perimeter curvature.
        Gracefully falls back to zero distortion on unsupported browsers.
      */}
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit] transition-opacity duration-300",
          config.blur,
          config.rimOpacity
        )}
        style={{
          /* 
            Perimeter Meniscus Mask:
            Distorts strictly along the material boundary where light enters 
            and bends, leaving central content 100% distortion-free.
          */
          maskImage:
            "radial-gradient(ellipse at center, transparent 65%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 65%, black 100%)",
        }}
      />

      {/* 
        Refractive Rim Dispersion:
        Simulates micro-chromatic displacement along the 135° virtual light vector.
      */}
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit] transition-transform duration-300 motion-reduce:transform-none",
          config.displacementScale
        )}
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.04) 70%, transparent 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Optical Meniscus Hairline */}
      <div
        className="absolute inset-[1px] rounded-[inherit] opacity-25 dark:opacity-15 pointer-events-none"
        style={{
          boxShadow: `inset 0 1px ${config.chromaticShift} 0 rgba(255, 255, 255, 0.4), inset 0 -1px ${config.chromaticShift} 0 rgba(0, 0, 0, 0.2)`,
        }}
      />

      {children}
    </Comp>
  );
});

HaloRefractionLayer.displayName = "HaloRefractionLayer";
