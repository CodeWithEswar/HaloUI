"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type HaloSurfaceIntensity = "subtle" | "balanced" | "rich";
export type HaloMaterialRecipe = "regular" | "clear" | "prominent";
export type HaloMaterialDensity = "compact" | "regular" | "floating" | "overlay";
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
  /** Optical recipe character: regular (balanced), clear (high transmission), prominent (high hierarchy). */
  material?: HaloMaterialRecipe;
  /** Diffusion scale appropriate to the surface's functional size. */
  density?: HaloMaterialDensity;
  /** Whether to render the directional 135° meniscus optical edge. @default true */
  edge?: boolean;
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
   * Optional local pointer-tracking for dynamic specular reflection response.
   * Updates CSS variables --halo-pointer-x and --halo-pointer-y directly without React state rerenders.
   */
  pointerResponsive?: boolean;
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
 * - Surface tint & transmission
 * - Background diffusion (backdrop-filter)
 * - Elevation & anchoring contact shadow
 * - Optical dual edge & inner rim reflection (Layer 01)
 * - Directional 135° specular light highlight (Layer 02)
 * - Semantic accessibility neutrality (no default focus, no forced role)
 * - Deliberate overflow safety (preserves focus rings, badges, tooltips)
 */
export const HaloSurface = React.forwardRef<HTMLDivElement, HaloSurfaceProps>(
  (
    {
      className,
      asChild = false,
      material = "regular",
      density,
      edge = true,
      intensity = "balanced",
      elevation = "base",
      pointerResponsive,
      interactive,
      glow,
      refraction,
      noise,
      specular,
      children,
      onPointerMove,
      onPointerLeave,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    // Normalize legacy elevation aliases
    const normalizedElevation: "inset" | "base" | "raised" | "floating" | "overlay" =
      elevation === "flat" ? "base" : elevation === "recessed" ? "inset" : elevation;

    // Enable pointer responsiveness explicitly or when intensity is rich
    const isPointerActive = pointerResponsive ?? (intensity === "rich");

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(e);
        if (!isPointerActive || !e.currentTarget) return;
        const rect = e.currentTarget.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--halo-pointer-x", `${x.toFixed(1)}%`);
        e.currentTarget.style.setProperty("--halo-pointer-y", `${y.toFixed(1)}%`);
      },
      [isPointerActive, onPointerMove]
    );

    const handlePointerLeave = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(e);
        if (!isPointerActive || !e.currentTarget) return;
        e.currentTarget.style.removeProperty("--halo-pointer-x");
        e.currentTarget.style.removeProperty("--halo-pointer-y");
      },
      [isPointerActive, onPointerLeave]
    );

    return (
      <Comp
        ref={ref}
        data-halo-surface=""
        data-material={material}
        data-density={density ?? (normalizedElevation === "overlay" ? "overlay" : normalizedElevation === "floating" ? "floating" : "regular")}
        data-edge={edge}
        data-specular={specular !== false}
        data-refraction={refraction || undefined}
        data-noise={noise || undefined}
        data-intensity={intensity}
        data-elevation={normalizedElevation}
        onPointerMove={isPointerActive ? handlePointerMove : onPointerMove}
        onPointerLeave={isPointerActive ? handlePointerLeave : onPointerLeave}
        className={cn(
          (normalizedElevation === "overlay" || normalizedElevation === "floating")
            ? "halo-liquid-glass-surface"
            : "halo-material",
          "relative isolate rounded-[var(--halo-radius-floating)]",
          `halo-intensity-${intensity}`,
          interactive && "halo-tactile-press cursor-pointer",
          glow && "halo-material-glow",
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
