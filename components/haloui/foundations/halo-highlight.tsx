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
        className={cn("halo-optical-highlight pointer-events-none absolute inset-0 select-none rounded-[inherit]", className)}
        {...props}
      />
    );
  }
);

HaloHighlight.displayName = "HaloHighlight";
