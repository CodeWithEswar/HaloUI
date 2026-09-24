"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type HaloSurfaceIntensity = "subtle" | "balanced" | "rich";
export type HaloSurfaceElevation =
  | "inset"
  | "base"
  | "raised"
  | "floating"
  | "overlay";

// Backward-compatibility aliases
export type MaterialIntensity = HaloSurfaceIntensity;
export type SurfaceIntensity = HaloSurfaceIntensity;
export type MaterialElevation =
  | HaloSurfaceElevation
  | "flat"
  | "recessed";
export type SurfaceElevation = HaloSurfaceElevation;

export interface HaloSurfaceProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Render as Radix Slot child element to compose directly onto consumer nodes.
   * Preserves refs, attributes, and element semantics without wrapping divs.
   */
  asChild?: boolean;
  /**
   * Controls the optical diffusion depth, highlight vibrancy, and environmental transmission.
   * @default "balanced"
   */
  intensity?: MaterialIntensity;
  /**
   * Defines the surface's visual relationship to its surrounding environment via tint,
   * edge clarity, and anchoring contact shadow.
   * @default "base"
   */
  elevation?: MaterialElevation;
  /**
   * Optional legacy interactive press physics for action surfaces.
   * @deprecated Interactive behaviors belong to action primitives like HaloButton.
   */
  interactive?: boolean;
  /**
   * Optional glow emphasis rim.
   * @deprecated Specialized glow belongs to HaloGlow foundation layer.
   */
  glow?: boolean;
  /**
   * Optional refraction rim highlight.
   */
  refraction?: boolean;
  /**
   * Optional surface noise micro-texture.
   */
  noise?: boolean;
  /**
   * Optional directional specular reflection.
   */
  specular?: boolean;
}

/**
 * HaloUI Liquid Material Surface Primitive
 * Canonical Foundation Primitive: The base material container responsible
 * for expressing a HaloUI liquid glass surface.
 *
 * Coordinates:
 * - Surface tint & opacity
 * - Background diffusion (backdrop-filter)
 * - Elevation & anchoring contact shadow
 * - Optical dual edge & inner rim reflection (Layer 03)
 * - Directional 135° specular light highlight (Layer 04)
 * - Semantic accessibility neutrality (no default focus, no forced role)
 * - Deliberate overflow safety (preserves focus rings, badges, tooltips)
 */
export const HaloSurface = React.forwardRef<HTMLDivElement, HaloSurfaceProps>(
  (
    {
      className,
      asChild = false,
      intensity = "balanced",
      elevation = "base",
      interactive,
      glow,
      refraction,
      noise,
      specular,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    // Normalize legacy elevation aliases
    const normalizedElevation: "inset" | "base" | "raised" | "floating" | "overlay" =
      elevation === "flat" ? "base" : elevation === "recessed" ? "inset" : elevation;

    return (
      <Comp
        ref={ref}
        data-halo-surface=""
        data-intensity={intensity}
        data-elevation={normalizedElevation}
        className={cn(
          // Base Geometry & Stacking Context (Deliberately NOT overflow-hidden to avoid clipping focus rings & menus)
          "relative isolate rounded-2xl",
          // Intensity Levels: Diffusion & Optical Presets
          intensity === "subtle" && "halo-intensity-subtle backdrop-blur-[8px]",
          intensity === "balanced" && "halo-intensity-balanced backdrop-blur-[16px]",
          intensity === "rich" && "halo-intensity-rich backdrop-blur-[28px]",
          // Elevation & Shadow Anchorings
          normalizedElevation === "inset" &&
            "bg-[var(--halo-surface-recessed)] shadow-inner border border-black/5 dark:border-white/5",
          normalizedElevation === "base" &&
            "bg-[var(--halo-surface)] shadow-[var(--halo-shadow-contact)] border border-[var(--halo-edge-soft)]",
          normalizedElevation === "raised" &&
            "bg-[var(--halo-surface-elevated)] shadow-[var(--halo-shadow-elevated)] border border-[var(--halo-edge)]",
          normalizedElevation === "floating" &&
            "bg-[var(--halo-surface-strong)] shadow-[var(--halo-shadow-ambient)] border border-[var(--halo-edge-bright)]",
          normalizedElevation === "overlay" &&
            "bg-[var(--halo-surface-strong)] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7)] border border-[var(--halo-edge-bright)]",
          // Neoskeuomorphic Inner Edge Rim (Layer 03 - non-clipping pseudo element)
          normalizedElevation !== "inset" &&
            "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:shadow-[var(--halo-edge-inner)]",
          // Directional Specular Highlight at 135° (Layer 04 - non-clipping pseudo element)
          normalizedElevation !== "inset" &&
            "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit] after:bg-gradient-to-br after:from-white/25 after:via-white/5 after:to-transparent dark:after:from-white/12 dark:after:via-transparent dark:after:to-transparent",
          // Tactile press & interaction (Legacy compatibility)
          interactive && "halo-tactile-press cursor-pointer hover:border-[var(--halo-edge-bright)]",
          // Ambient Glow (Legacy compatibility)
          glow && "ring-1 ring-white/30 dark:ring-white/15 shadow-[0_0_24px_rgba(255,255,255,0.15)] dark:shadow-[0_0_28px_rgba(255,255,255,0.06)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

HaloSurface.displayName = "HaloSurface";
