"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type HaloHighlightKind = "edge" | "broad" | "specular";
export type HaloHighlightStrength = "subtle" | "balanced" | "strong";

export interface HaloHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The structural form of directional reflected light.
   * - `edge`: Localized light catch concentrated along the top-left boundary (buttons, inputs).
   * - `broad`: Low-frequency ambient light quadrant (cards, panels, dialogs).
   * - `specular`: Concentrated focal reflection (rich materials, floating docks).
   * @default "edge"
   */
  kind?: HaloHighlightKind;
  /**
   * Luminance intensity of the received light reflection.
   * - `subtle`: Quiet light transmission for dense data environments.
   * - `balanced`: Standard calibrated reflection (default).
   * - `strong`: Elevated focal sheen for prominent hero layers.
   * @default "balanced"
   */
  strength?: HaloHighlightStrength;
  /**
   * Merge props and render as child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
}

/**
 * HaloHighlight — Foundations & Material
 *
 * Directional reflected-light and restrained specular treatment communicating surface
 * orientation and physical material response against HaloUI's 135° virtual light vector.
 *
 * Decorative primitive: purely optical, non-focusable, pointer-events-none.
 */
export const HaloHighlight = React.forwardRef<HTMLDivElement, HaloHighlightProps>(
  (
    {
      kind = "edge",
      strength = "balanced",
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        data-halo-highlight=""
        data-kind={kind}
        data-strength={strength}
        aria-hidden="true"
        className={cn(
          // Absolute positioning conforming to host geometry
          "pointer-events-none absolute inset-0 select-none rounded-[inherit] transition-all duration-200",

          // 1. Edge Highlight: Localized 135° boundary sheen
          kind === "edge" && [
            "bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.08)_25%,transparent_50%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.03)_25%,transparent_50%)]",
          ],

          // 2. Broad Highlight: Low-frequency quadrant diffusion
          kind === "broad" && [
            "bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.06)_40%,transparent_80%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_40%,transparent_80%)]",
          ],

          // 3. Specular Highlight: Focused circular/elliptical light reflection
          kind === "specular" && [
            "bg-[radial-gradient(ellipse_at_16%_16%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_28%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_16%_16%,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.04)_28%,transparent_60%)]",
          ],

          // Strength Modulation
          strength === "subtle" && "opacity-60",
          strength === "balanced" && "opacity-100",
          strength === "strong" && "opacity-125 saturate-125",

          className
        )}
        {...props}
      />
    );
  }
);

HaloHighlight.displayName = "HaloHighlight";
