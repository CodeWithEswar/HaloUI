"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type HaloGlowVariant = "ambient" | "emphasis" | "active";
export type HaloGlowStrength = "subtle" | "balanced" | "strong";
export type HaloGlowColor = "neutral" | "primary" | "accent";

export interface HaloGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The semantic purpose and diffusion profile of the ambient luminescence.
   * - `ambient`: Soft, wide-radius low-intensity aura for floating modals and sheets.
   * - `emphasis`: Focused luminous prominence for featured cards, tiers, or hero containers.
   * - `active`: High-energy glow communicating active toggle, selection, or interactive presence.
   * @default "ambient"
   */
  variant?: HaloGlowVariant;
  /**
   * Luminance intensity of the emitted light.
   * - `subtle`: Restrained presence suitable for dark-mode data surfaces.
   * - `balanced`: Standard calibrated halo radiance (default).
   * - `strong`: Vivid luminous diffusion for prominent hero focal points.
   * @default "balanced"
   */
  strength?: HaloGlowStrength;
  /**
   * Chromatic temperature of the emitted glow.
   * - `neutral`: Monochromatic white/graphite luminescence.
   * - `primary`: Calibrated indigo/violet liquid radiance.
   * - `accent`: Amber/warm specular glow.
   * @default "neutral"
   */
  color?: HaloGlowColor;
  /**
   * Merge props and render as child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
}

/**
 * HaloGlow — Foundations & Material
 *
 * Ambient luminous layer used selectively for active state, emphasis, or focus-adjacent depth.
 * Diffuses outside the host container's perimeter without clipping.
 *
 * Purely decorative primitive: pointer-events-none, aria-hidden="true", non-focusable.
 */
export const HaloGlow = React.forwardRef<HTMLDivElement, HaloGlowProps>(
  (
    {
      variant = "ambient",
      strength = "balanced",
      color = "neutral",
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
        data-halo-glow=""
        data-variant={variant}
        data-strength={strength}
        data-color={color}
        aria-hidden="true"
        className={cn(
          // Optical positioning: negative expansion so light diffuses outside host boundary
          "pointer-events-none absolute -inset-3 select-none rounded-[inherit] transition-all duration-300",

          // 1. Variant diffusion profiles
          variant === "ambient" && "-inset-4 blur-2xl",
          variant === "emphasis" && "-inset-2 blur-xl",
          variant === "active" && "-inset-1.5 blur-lg",

          // 2. Chromatic palettes
          // Neutral: Pure monochromatic diffuse light
          color === "neutral" && [
            "bg-gradient-to-b from-black/[0.06] to-transparent dark:from-white/[0.08] dark:to-transparent",
            variant === "active" && "from-black/[0.12] dark:from-white/[0.18]",
          ],

          // Primary: Calibrated luminous violet/indigo radiance
          color === "primary" && [
            "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/25 via-violet-500/15 to-transparent",
            variant === "active" && "from-indigo-500/40 via-violet-500/25 to-transparent",
          ],

          // Accent: Luminous warm amber/golden rim
          color === "accent" && [
            "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/25 via-orange-500/10 to-transparent",
            variant === "active" && "from-amber-500/40 via-orange-500/20 to-transparent",
          ],

          // 3. Calibrated Strength Modulations
          strength === "subtle" && "opacity-50",
          strength === "balanced" && "opacity-100",
          strength === "strong" && "opacity-150 saturate-150",

          className
        )}
        {...props}
      />
    );
  }
);

HaloGlow.displayName = "HaloGlow";
