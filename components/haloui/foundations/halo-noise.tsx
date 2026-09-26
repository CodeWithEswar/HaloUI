"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type HaloNoiseStrength = "subtle" | "balanced" | "strong";
export type HaloNoiseBlendMode = "overlay" | "soft-light" | "screen" | "multiply";

export interface HaloNoiseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Density and opacity of the physical material tooth/grain.
   * - `subtle`: Ultra-fine micro-grain (~1.2% opacity) to eliminate gradient banding without visible grit.
   * - `balanced`: Standard tactile material grain (~2% opacity) for cards, sheets, and dialogs.
   * - `strong`: Restrained micro-texture (~3% opacity) for exceptional rich surfaces.
   * @default "balanced"
   */
  strength?: HaloNoiseStrength;
  /**
   * CSS mix-blend-mode used to integrate the noise with underlying surface tints and blurs.
   * @default "overlay"
   */
  blendMode?: HaloNoiseBlendMode;
  /**
   * Merge props and render as child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
}

// Seamless 128x128 fractal micro-grain SVG data URI
const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";

/**
 * HaloNoise — Foundations & Material
 *
 * Micro-texture and physical material tooth layer used to eliminate digital gradient
 * banding and sterile flat color across translucent HaloUI liquid glass bodies.
 *
 * Purely decorative primitive: pointer-events-none, aria-hidden="true", zero runtime weight.
 */
export const HaloNoise = React.forwardRef<HTMLDivElement, HaloNoiseProps>(
  (
    {
      strength = "balanced",
      blendMode = "overlay",
      asChild = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        data-halo-noise=""
        data-strength={strength}
        data-blend-mode={blendMode}
        aria-hidden="true"
        className={cn(
          // Optical positioning conforming to host geometry
          "pointer-events-none absolute inset-0 select-none rounded-[inherit]",
          // Background repetition for seamless infinite coverage
          "bg-repeat",
          // Blend mode mapping
          blendMode === "overlay" && "mix-blend-overlay",
          blendMode === "soft-light" && "mix-blend-soft-light",
          blendMode === "screen" && "mix-blend-screen",
          blendMode === "multiply" && "mix-blend-multiply",

          // Calibrated opacity presets
          strength === "subtle" && "opacity-[0.012]",
          strength === "balanced" && "opacity-[0.02]",
          strength === "strong" && "opacity-[0.03]",

          className
        )}
        style={{
          backgroundImage: NOISE_DATA_URI,
          backgroundSize: "160px 160px",
          ...style,
        }}
        {...props}
      />
    );
  }
);

HaloNoise.displayName = "HaloNoise";
