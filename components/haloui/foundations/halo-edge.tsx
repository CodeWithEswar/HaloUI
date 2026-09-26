"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type HaloEdgeStrength = "subtle" | "balanced" | "strong";
export type HaloEdgePlacement = "outer" | "inner" | "both";

export interface HaloEdgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optical contrast strength of the boundary hairlines.
   * - `subtle`: Quiet boundary for dense UI, forms, and repeated rows.
   * - `balanced`: Calibrated general material boundary (default).
   * - `strong`: High separation for floating overlays and modal panels.
   * @default "balanced"
   */
  strength?: HaloEdgeStrength;
  /**
   * Structural boundary positioning.
   * - `outer`: 1px sub-pixel outer edge separating material from environment.
   * - `inner`: Inset specular catch suggesting material thickness.
   * - `both`: Coordinated dual boundary (default).
   * @default "both"
   */
  placement?: HaloEdgePlacement;
  /**
   * Merge props and render as child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
}

/**
 * HaloEdge — Foundations & Material
 *
 * Layered outer and inset optical boundary treatment for translucent HaloUI materials.
 * Communicates material thickness, directional virtual lighting, and environmental separation
 * without resorting to a flat uniform border.
 *
 * Decorative primitive: purely optical, non-focusable, pointer-events-none.
 */
export const HaloEdge = React.forwardRef<HTMLDivElement, HaloEdgeProps>(
  (
    {
      strength = "balanced",
      placement = "both",
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
        data-halo-edge=""
        data-strength={strength}
        data-placement={placement}
        aria-hidden="true"
        className={cn("halo-optical-edge pointer-events-none absolute inset-0 select-none rounded-[inherit]", className)}
        {...props}
      />
    );
  }
);

HaloEdge.displayName = "HaloEdge";
