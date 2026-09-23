"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type MaterialIntensity = "subtle" | "balanced" | "rich";
export type MaterialElevation = "flat" | "raised" | "floating" | "recessed";

export interface HaloSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  intensity?: MaterialIntensity;
  elevation?: MaterialElevation;
  glow?: boolean;
  interactive?: boolean;
  refraction?: boolean;
  noise?: boolean;
  specular?: boolean;
}

/**
 * HaloUI Liquid Material Surface
 * Implements the 10-layer physical optical engine:
 * Layer 01: Base Tint Body
 * Layer 02: Diffusion (Optimized backdrop blur)
 * Layer 03: Optical Dual Edge (internal catch + outer hairline)
 * Layer 04: Directional Specular Highlight (135° virtual light source)
 * Layer 05: Refraction Rim
 * Layer 06: Contact Shadow & Elevation Anchoring
 * Layer 07: Ambient Glow (Conditional)
 * Layer 08: Micro-Texture Noise (Subtle SVG turbulence)
 * Layer 09: Content Isolation
 * Layer 10: State Interaction & Tactile Feedback
 */
export const HaloSurface = React.forwardRef<HTMLDivElement, HaloSurfaceProps>(
  (
    {
      className,
      asChild = false,
      intensity = "balanced",
      elevation = "raised",
      glow = false,
      interactive = false,
      refraction = true,
      noise = true,
      specular = true,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          "relative overflow-hidden isolate",
          // Intensity classes
          intensity === "subtle" && "halo-intensity-subtle backdrop-blur-[8px]",
          intensity === "balanced" && "halo-intensity-balanced backdrop-blur-[16px]",
          intensity === "rich" && "halo-intensity-rich backdrop-blur-[28px]",
          // Elevation & Shadow Layer (Layer 06)
          elevation === "flat" && "shadow-[var(--halo-shadow-contact)]",
          elevation === "raised" && "shadow-[var(--halo-shadow-elevated)]",
          elevation === "floating" && "shadow-[var(--halo-shadow-ambient)]",
          elevation === "recessed" && "shadow-inner bg-[var(--halo-surface-recessed)]",
          // Base Body & Boundary (Layer 01 & 03)
          "bg-[var(--halo-surface)]",
          "border border-[var(--halo-edge)]",
          // Neoskeuomorphic Inner Edge Rim (Layer 03)
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
          "before:shadow-[var(--halo-edge-inner)]",
          // Directional Specular Highlight (Layer 04)
          specular &&
            "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit] after:bg-gradient-to-br after:from-white/20 after:via-transparent after:to-transparent dark:after:from-white/10",
          // Tactile press & interaction (Layer 10)
          interactive && "halo-tactile-press cursor-pointer hover:border-[var(--halo-edge-bright)]",
          // Ambient Glow (Layer 07)
          glow && "ring-1 ring-white/30 dark:ring-white/15 shadow-[0_0_24px_rgba(255,255,255,0.15)] dark:shadow-[0_0_28px_rgba(255,255,255,0.06)]",
          className
        )}
        {...props}
      >
        {/* Layer 08: Material Noise Texture */}
        {noise && (
          <span
            className="absolute inset-0 pointer-events-none opacity-[var(--halo-noise-opacity)] mix-blend-overlay rounded-[inherit]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Layer 05: Refraction Edge Rim catch */}
        {refraction && (
          <span
            className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Layer 09: Crisp Content */}
        <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
      </Comp>
    );
  }
);

HaloSurface.displayName = "HaloSurface";
