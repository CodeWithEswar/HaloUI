"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type MarqueeDirection = "forward" | "reverse";
export type MarqueeVariant = "default" | "glass" | "plain";
export type MarqueeSize = "sm" | "default" | "lg";

export interface MarqueeProps extends React.ComponentProps<"div"> {
  /**
   * Continuous sequential content (logos, brand cards, badges, text).
   */
  children: React.ReactNode;
  /**
   * Flow direction:
   * - "forward": Right-to-left translation (standard).
   * - "reverse": Left-to-right translation.
   * @default "forward"
   */
  direction?: MarqueeDirection;
  /**
   * Duration in seconds for one complete cycle.
   * @default 30
   */
  duration?: number;
  /**
   * Spacing between track items (e.g. "1.5rem", "2rem", "24px").
   * @default "1.5rem"
   */
  gap?: string;
  /**
   * Visual framing variant:
   * - "plain": Frameless unbordered display for embedding directly in sections.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular highlight rim.
   * - "default": Subtle border and stable background for dense layouts.
   * @default "plain"
   */
  variant?: MarqueeVariant;
  /**
   * Sizing scale for vertical clearance and density:
   * - "sm": Compact scale for dense tickers and badges.
   * - "default": Standard comfortable scale for cards and links.
   * - "lg": Spacious scale for prominent hero logos.
   * @default "default"
   */
  size?: MarqueeSize;
  /**
   * Whether to pause continuous movement when pointer hovers over the marquee.
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Whether to pause continuous movement when keyboard focus moves into the marquee.
   * @default true
   */
  pauseOnFocus?: boolean;
  /**
   * Whether to render subtle gradient edge fade masks on the left and right borders.
   * @default true
   */
  fadeEdges?: boolean;
  /**
   * Number of visual clone repetitions for seamless ultra-wide coverage.
   * Clones are strictly hidden from screen readers (aria-hidden) and keyboard focus.
   * @default 2
   */
  repeat?: number;
}

/* -------------------------------------------------------------------------
 * ROOT MARQUEE COMPONENT
 * Continuous content presentation primitive engineered with pure CSS transform
 * performance, automatic reduced-motion static fallback, and accessible clone isolation.
 * ----------------------------------------------------------------------- */

export function Marquee({
  className,
  children,
  direction = "forward",
  duration = 30,
  gap = "1.5rem",
  variant = "plain",
  size = "default",
  pauseOnHover = true,
  pauseOnFocus = true,
  fadeEdges = true,
  repeat = 2,
  style,
  ...props
}: MarqueeProps) {
  // Safe repeat multiplier (at least 2 for seamless loop)
  const cloneCount = Math.max(1, repeat - 1);

  return (
    <div
      data-slot="marquee"
      data-variant={variant}
      data-size={size}
      data-direction={direction}
      style={
        {
          "--marquee-gap": gap,
          "--marquee-duration": `${duration}s`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        // Container query boundary
        "@container/marquee group/marquee relative w-full overflow-hidden select-none",

        // Hover & Focus Pause triggers
        pauseOnHover && "hover:[&_[data-slot=marquee-track]]:[animation-play-state:paused]",
        pauseOnFocus && "focus-within:[&_[data-slot=marquee-track]]:[animation-play-state:paused]",

        // Sizing tiers
        size === "sm" && "py-1.5",
        size === "default" && "py-3",
        size === "lg" && "py-5",

        // Framing Variants
        variant === "default" && [
          "rounded-2xl border border-border/80 bg-card/85 dark:bg-card/50 shadow-xs",
        ],
        variant === "glass" && [
          "rounded-2xl border border-border/70 dark:border-white/12",
          "bg-card/75 dark:bg-card/40 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_6px_20px_-3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]",
        ],
        variant === "plain" && "bg-transparent",

        // Restrained Optical Edge Fade Masking
        fadeEdges && [
          "[mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]",
          "[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]",
        ],

        className
      )}
      {...props}
    >
      <div className="flex w-max min-w-full items-center">
        {/* Canonical Track: Fully accessible to screen readers and keyboard focus */}
        <div
          data-slot="marquee-track"
          data-canonical="true"
          className={cn(
            "flex shrink-0 min-w-full items-center justify-around gap-[var(--marquee-gap)] animate-halo-marquee",
            direction === "reverse" && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>

        {/* Decorative Clones: Hidden from assistive technology & keyboard navigation, completely omitted under reduced-motion */}
        {Array.from({ length: cloneCount }).map((_, index) => (
          <div
            key={index}
            data-slot="marquee-track"
            data-clone="true"
            aria-hidden="true"
            tabIndex={-1}
            // @ts-expect-error React 19 inert attribute for complete focus/AT isolation
            inert=""
            className={cn(
              "flex shrink-0 min-w-full items-center justify-around gap-[var(--marquee-gap)] animate-halo-marquee motion-reduce:hidden",
              direction === "reverse" && "[animation-direction:reverse]"
            )}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
