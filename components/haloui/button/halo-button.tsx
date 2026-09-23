"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { IconSvgElement } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";

export const haloButtonVariants = cva(
  [
    "group relative inline-flex items-center justify-center font-medium select-none isolate overflow-hidden",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500",
    "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none",
    "halo-tactile-press",
  ],
  {
    variants: {
      variant: {
        // 1. Primary: Signature Liquid Glass with Luminous Rim
        primary: [
          "bg-[var(--halo-surface-elevated)] text-[var(--halo-text-primary)]",
          "border border-[var(--halo-edge)] hover:border-[var(--halo-edge-bright)]",
          "shadow-[var(--halo-shadow-elevated)] hover:shadow-[var(--halo-shadow-ambient)]",
          "hover:bg-[var(--halo-surface-strong)]",
          // Specular hairline reflection top
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
          "before:shadow-[var(--halo-edge-inner)]",
        ],
        // 2. Neutral: Balanced Tactile Optical Glass
        neutral: [
          "bg-[var(--halo-surface)] text-[var(--halo-text-primary)]",
          "border border-[var(--halo-edge-soft)] hover:border-[var(--halo-edge)]",
          "shadow-[var(--halo-shadow-contact)] hover:shadow-[var(--halo-shadow-elevated)]",
          "hover:bg-[var(--halo-surface-elevated)]",
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
          "before:shadow-[var(--halo-edge-inner)]",
        ],
        // 3. Subtle: Restrained Glass for Dense Interfaces
        subtle: [
          "bg-[var(--halo-surface-recessed)] text-[var(--halo-text-secondary)] hover:text-[var(--halo-text-primary)]",
          "border border-black/[0.04] dark:border-white/[0.06] hover:border-[var(--halo-edge-soft)]",
          "hover:bg-[var(--halo-surface)]",
          "shadow-none",
        ],
        // 4. Ghost: Pure Clarity resolving on Hover
        ghost: [
          "bg-transparent text-[var(--halo-text-secondary)] hover:text-[var(--halo-text-primary)]",
          "border border-transparent hover:border-[var(--halo-edge-soft)] hover:bg-[var(--halo-surface)]",
          "hover:shadow-[var(--halo-shadow-contact)]",
        ],
        // 5. Destructive: Refractive Warning Glass
        destructive: [
          "bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300",
          "border border-rose-500/25 hover:border-rose-500/40",
          "shadow-[0_2px_8px_-2px_rgba(244,63,94,0.15)] hover:shadow-[0_4px_16px_-4px_rgba(244,63,94,0.3)]",
          "hover:bg-rose-500/20",
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
          "before:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
        ],
        // 6. Rich: Elevated Showcase Glass with High Specular Catch
        rich: [
          "bg-[var(--halo-surface-strong)] text-[var(--halo-text-primary)]",
          "border border-[var(--halo-edge-bright)]",
          "shadow-[var(--halo-shadow-ambient)]",
          "ring-1 ring-white/20 dark:ring-white/10",
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
          "before:shadow-[var(--halo-edge-inner)]",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5 rounded-[var(--halo-radius-sm)]",
        md: "h-10 px-4 text-sm gap-2 rounded-[var(--halo-radius-md)]",
        lg: "h-12 px-6 text-base gap-2.5 rounded-[var(--halo-radius-md)]",
        xl: "h-14 px-8 text-lg gap-3 rounded-[var(--halo-radius-lg)]",
        icon: "h-10 w-10 p-0 rounded-[var(--halo-radius-md)] justify-center",
        "icon-sm": "h-8 w-8 p-0 rounded-[var(--halo-radius-sm)] justify-center",
        "icon-lg": "h-12 w-12 p-0 rounded-[var(--halo-radius-md)] justify-center",
      },
      intensity: {
        subtle: "halo-intensity-subtle backdrop-blur-[8px]",
        balanced: "halo-intensity-balanced backdrop-blur-[16px]",
        rich: "halo-intensity-rich backdrop-blur-[28px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      intensity: "balanced",
    },
  }
);

export interface HaloButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof haloButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  magnetic?: boolean;
  leftIcon?: IconSvgElement;
  rightIcon?: IconSvgElement;
  specular?: boolean;
  refraction?: boolean;
}

/**
 * HaloUI Liquid Action Button
 * Engineered with neoskeuomorphic depth cues:
 * - Directional upper-left specular reflection
 * - Inner edge hairline catch
 * - Restrained contact & elevated shadow layers
 * - Tactile press compression (scale 0.98 + translateY 1px)
 * - Optional restrained magnetic pull
 * - High-clarity typography with Hugeicons integration
 */
export const HaloButton = React.forwardRef<HTMLButtonElement, HaloButtonProps>(
  (
    {
      className,
      variant,
      size,
      intensity,
      asChild = false,
      loading = false,
      magnetic = false,
      leftIcon,
      rightIcon,
      specular = true,
      refraction = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [magneticOffset, setMagneticOffset] = React.useState({ x: 0, y: 0 });

    // Restrained physical magnetic response (max 4px pull)
    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!magnetic || disabled || loading) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.12;
        const deltaY = (e.clientY - centerY) * 0.12;
        // Clamp to 5px max
        const clampedX = Math.max(-5, Math.min(5, deltaX));
        const clampedY = Math.max(-5, Math.min(5, deltaY));
        setMagneticOffset({ x: clampedX, y: clampedY });
      },
      [magnetic, disabled, loading]
    );

    const handleMouseLeave = React.useCallback(() => {
      if (magnetic) {
        setMagneticOffset({ x: 0, y: 0 });
      }
    }, [magnetic]);

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            magneticOffset.x || magneticOffset.y
              ? `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`
              : undefined,
        }}
        className={cn(haloButtonVariants({ variant, size, intensity }), className)}
        {...props}
      >
        {/* Layer 04: Geometry-aware Specular Highlight */}
        {specular && variant !== "ghost" && (
          <span
            className="absolute inset-0 pointer-events-none rounded-[inherit] bg-gradient-to-br from-white/30 via-white/5 to-transparent dark:from-white/15 dark:via-white/2 dark:to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Layer 05: Refraction Edge Hairline */}
        {refraction && variant !== "ghost" && (
          <span
            className="absolute top-0 left-2 right-2 h-[1px] pointer-events-none bg-gradient-to-r from-transparent via-white/50 dark:via-white/25 to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Content & State */}
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {loading ? (
            <span className="animate-spin inline-flex items-center">
              <HaloIcon icon={Loading03Icon} size={size === "sm" ? 14 : 18} />
            </span>
          ) : (
            leftIcon && (
              <HaloIcon
                icon={leftIcon}
                size={size === "sm" ? 14 : size === "lg" || size === "xl" ? 20 : 16}
              />
            )
          )}

          {children}

          {!loading && rightIcon && (
            <HaloIcon
              icon={rightIcon}
              size={size === "sm" ? 14 : size === "lg" || size === "xl" ? 20 : 16}
            />
          )}
        </span>
      </Comp>
    );
  }
);

HaloButton.displayName = "HaloButton";
