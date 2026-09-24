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
        className={cn(
          // Absolute positioning inheriting host boundary & geometry
          "pointer-events-none absolute inset-0 select-none rounded-[inherit] transition-all duration-200",

          // Base Outer Edge Hairline (Separation from environment)
          (placement === "outer" || placement === "both") && [
            strength === "subtle" &&
              "shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
            strength === "balanced" &&
              "shadow-[0_0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.13)]",
            strength === "strong" &&
              "shadow-[0_0_0_1px_rgba(0,0,0,0.12)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]",
          ],

          // Base Inner Edge Inset (Thickness & Directional 135° virtual light catch)
          (placement === "inner" || placement === "both") && [
            placement === "both"
              ? [
                  strength === "subtle" &&
                    "shadow-[0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_1px_0_rgba(255,255,255,0.6),inset_0_-1px_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.18),inset_0_-1px_1px_0_rgba(0,0,0,0.25)]",
                  strength === "balanced" &&
                    "shadow-[0_0_0_1px_rgba(0,0,0,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.85),inset_0_-1px_1px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.13),inset_0_1px_1px_0_rgba(255,255,255,0.28),inset_0_-1px_1px_0_rgba(0,0,0,0.3)]",
                  strength === "strong" &&
                    "shadow-[0_0_0_1px_rgba(0,0,0,0.12),inset_0_1.5px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1.5px_0_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.2),inset_0_1.5px_1.5px_0_rgba(255,255,255,0.42),inset_0_-1px_1.5px_0_rgba(0,0,0,0.4)]",
                ]
              : [
                  strength === "subtle" &&
                    "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6),inset_0_-1px_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),inset_0_-1px_1px_0_rgba(0,0,0,0.25)]",
                  strength === "balanced" &&
                    "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.85),inset_0_-1px_1px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.28),inset_0_-1px_1px_0_rgba(0,0,0,0.3)]",
                  strength === "strong" &&
                    "shadow-[inset_0_1.5px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1.5px_0_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1.5px_1.5px_0_rgba(255,255,255,0.42),inset_0_-1px_1.5px_0_rgba(0,0,0,0.4)]",
                ],
          ],

          className
        )}
        {...props}
      />
    );
  }
);

HaloEdge.displayName = "HaloEdge";
