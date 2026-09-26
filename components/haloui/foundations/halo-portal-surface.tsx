"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { HaloSurface, type SurfaceElevation, type SurfaceIntensity } from "./halo-surface";
import { HaloGlow } from "./halo-glow";
import { cn } from "@/lib/utils";

export interface HaloPortalSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to wrap the surface in a React createPortal into document.body or container.
   * If false, renders as the material shell inside an existing external portal primitive (e.g. Radix/Base UI).
   * @default false
   */
  asPortal?: boolean;
  /**
   * Target DOM node when asPortal is true.
   * Defaults to document.body.
   */
  container?: HTMLElement | null;
  /**
   * Optical elevation tier for the portalled surface.
   * Overlays and dropdowns typically use "floating" (28px blur) or "overlay" (44px blur).
   * @default "overlay"
   */
  elevation?: SurfaceElevation;
  /**
   * Material intensity tier.
   * @default "balanced"
   */
  intensity?: SurfaceIntensity;
  /**
   * Whether to include the 135° directional specular highlight layer.
   * @default true
   */
  hasHighlight?: boolean;
  /**
   * Whether to include the layered optical boundary edge.
   * @default true
   */
  hasEdge?: boolean;
  /**
   * Whether to include the micro-grain noise texture mask.
   * @default false
   */
  hasNoise?: boolean;
  /**
   * Optional luminous glow tint for active or focused overlays.
   */
  glowColor?: "cyan" | "violet" | "amber" | "emerald" | "neutral" | "none";
  /**
   * Merges surface props onto the immediate child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
}

/**
 * HaloPortalSurface
 * Standardized liquid-glass material wrapper for portalled floating overlays,
 * modal dialogs, context menus, tooltips, and popovers.
 */
export const HaloPortalSurface = React.forwardRef<HTMLDivElement, HaloPortalSurfaceProps>(
  (
    {
      asPortal = false,
      container,
      elevation = "overlay",
      intensity = "balanced",
      hasHighlight = true,
      hasEdge = true,
      hasNoise = false,
      glowColor = "none",
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const surfaceContent = (
      <HaloSurface
        ref={ref}
        asChild={asChild}
        elevation={elevation}
        intensity={intensity}
        edge={hasEdge}
        specular={hasHighlight}
        noise={hasNoise}
        className={cn(
          "relative select-text",
          className
        )}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {glowColor !== "none" && (
              <HaloGlow
                variant="ambient"
                color={glowColor === "neutral" ? "neutral" : "primary"}
                strength={intensity === "rich" ? "strong" : "balanced"}
              />
            )}
            <div className="relative z-10 w-full h-full">{children}</div>
          </>
        )}
      </HaloSurface>
    );

    if (asPortal) {
      if (!mounted) return null;
      const targetContainer = container ?? (typeof document !== "undefined" ? document.body : null);
      if (!targetContainer) return null;
      return createPortal(surfaceContent, targetContainer);
    }

    return surfaceContent;
  }
);

HaloPortalSurface.displayName = "HaloPortalSurface";
