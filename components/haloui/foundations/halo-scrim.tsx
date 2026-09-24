"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type ScrimBlur = "none" | "subtle" | "balanced" | "deep";
export type ScrimTint = "neutral" | "soft" | "deep" | "vibrant";

export interface HaloScrimProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optical backdrop blur strength.
   * - none: 0px blur, pure occlusion
   * - subtle: 4px blur, preserves underlying spatial context
   * - balanced: 8px blur, optimal dialog focus
   * - deep: 16px blur, strong isolation
   * @default "balanced"
   */
  blur?: ScrimBlur;
  /**
   * Color tint and environmental darkness.
   * - neutral: Standard dark graphite occlusion
   * - soft: Light wash for transient popovers
   * - deep: Heavy ambient occlusion for critical alerts
   * - vibrant: Chromatic dispersion
   * @default "neutral"
   */
  tint?: ScrimTint;
  /**
   * Optional click handler for backdrop dismissal.
   */
  onDismiss?: () => void;
  /**
   * Merges classes onto child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
}

/**
 * HaloScrim
 * Backdrop / scrim treatment positioned behind modal dialogs, drawers, and overlays.
 * Provides calibrated optical diffusion blur and ambient darkness.
 */
export const HaloScrim = React.forwardRef<HTMLDivElement, HaloScrimProps>(
  (
    {
      blur = "balanced",
      tint = "neutral",
      onDismiss,
      asChild = false,
      className,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (e.target === e.currentTarget && onDismiss) {
        onDismiss();
      }
    };

    return (
      <Component
        ref={ref}
        aria-hidden="true"
        onClick={handleClick}
        className={cn(
          "fixed inset-0 z-40 transition-all duration-300",
          // Blur diffusion tiers
          blur === "none" && "backdrop-blur-none",
          blur === "subtle" && "backdrop-blur-xs md:backdrop-blur-sm",
          blur === "balanced" && "backdrop-blur-sm md:backdrop-blur-md",
          blur === "deep" && "backdrop-blur-md md:backdrop-blur-lg",
          // Tint occlusion tiers
          tint === "soft" && "bg-black/25 dark:bg-black/40",
          tint === "neutral" && "bg-black/45 dark:bg-black/65",
          tint === "deep" && "bg-black/70 dark:bg-black/85",
          tint === "vibrant" && "bg-[#07090e]/50 backdrop-saturate-150",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

HaloScrim.displayName = "HaloScrim";
