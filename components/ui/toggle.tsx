"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * HaloUI Toggle Variants
 *
 * Implements a persistent two-state action control sharing HaloUI's 10-layer physical liquid optical engine:
 * - Unpressed rest: Transparent frosted glass lens with subtle specular reflections and hairline boundary.
 * - Pressed state: Physically distinct optical compression with condensed surface tint, inset displacement shadow, and high-contrast typography.
 * - Independence of States: Pressed, Hover, Focus, Active, and Disabled are strictly isolated and never visually conflated.
 */
export const toggleVariants = cva(
  [
    "group/toggle relative inline-flex items-center justify-center font-medium select-none isolate overflow-hidden cursor-pointer",
    "whitespace-nowrap transition-all duration-200 ease-out outline-none shrink-0",
    // Halo Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-20 halo-focus-ring",
    // Tactile press response during pointer/keyboard down
    "halo-tactile-press",
    // Disabled State: muted optical transmission while strictly preserving current pressed/unpressed state information
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:transform-none",
    // SVG alignment
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          // Unpressed rest & hover
          "halo-liquid-glass text-neutral-800 dark:text-neutral-200",
          "hover:text-neutral-950 dark:hover:text-white",
          // Persistent Pressed state (aria-pressed=true / data-pressed / data-state=on)
          "aria-pressed:bg-neutral-900/[0.12] dark:aria-pressed:bg-white/[0.22]",
          "aria-pressed:text-neutral-950 dark:aria-pressed:text-white aria-pressed:font-semibold",
          "aria-pressed:border-black/30 dark:aria-pressed:border-white/40",
          "aria-pressed:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.05)]",
          "dark:aria-pressed:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.15)]",
          // Radix / Base UI data selector compatibility
          "data-[state=on]:bg-neutral-900/[0.12] dark:data-[state=on]:bg-white/[0.22]",
          "data-[state=on]:text-neutral-950 dark:data-[state=on]:text-white data-[state=on]:font-semibold",
          "data-[state=on]:border-black/30 dark:data-[state=on]:border-white/40",
          "data-[state=on]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)] dark:data-[state=on]:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]",
          "data-pressed:bg-neutral-900/[0.12] dark:data-pressed:bg-white/[0.22]",
          "data-pressed:text-neutral-950 dark:data-pressed:text-white data-pressed:font-semibold",
          "data-pressed:border-black/30 dark:data-pressed:border-white/40",
          "data-pressed:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)] dark:data-pressed:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]",
        ],
        outline: [
          // Unpressed rest & hover
          "bg-white/[0.03] dark:bg-white/[0.02] text-neutral-800 dark:text-neutral-200",
          "border border-black/[0.18] dark:border-white/[0.22]",
          "hover:border-black/[0.32] dark:hover:border-white/[0.38] hover:text-neutral-950 dark:hover:text-white",
          "backdrop-blur-[8px]",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_0_rgba(0,0,0,0.15)]",
          // Persistent Pressed state
          "aria-pressed:bg-neutral-900/[0.10] dark:aria-pressed:bg-white/[0.18]",
          "aria-pressed:border-black/[0.35] dark:aria-pressed:border-white/[0.45]",
          "aria-pressed:text-neutral-950 dark:aria-pressed:text-white aria-pressed:font-semibold",
          "aria-pressed:shadow-[inset_0_2px_4px_rgba(0,0,0,0.16)] dark:aria-pressed:shadow-[inset_0_2px_5px_rgba(0,0,0,0.45)]",
          "data-[state=on]:bg-neutral-900/[0.10] dark:data-[state=on]:bg-white/[0.18]",
          "data-[state=on]:border-black/[0.35] dark:data-[state=on]:border-white/[0.45]",
          "data-[state=on]:text-neutral-950 dark:data-[state=on]:text-white data-[state=on]:font-semibold",
          "data-pressed:bg-neutral-900/[0.10] dark:data-pressed:bg-white/[0.18]",
          "data-pressed:border-black/[0.35] dark:data-pressed:border-white/[0.45]",
          "data-pressed:text-neutral-950 dark:data-pressed:text-white data-pressed:font-semibold",
        ],
      },
      size: {
        default: "h-10 min-w-10 px-4 text-sm gap-2 rounded-full [&_svg:not([class*='size-'])]:size-4",
        sm: "h-8 min-w-8 px-2.5 text-xs gap-1.5 rounded-full [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 min-w-12 px-5 text-base gap-2.5 rounded-full [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ToggleVariant = NonNullable<VariantProps<typeof toggleVariants>["variant"]>;
export type ToggleSize = NonNullable<VariantProps<typeof toggleVariants>["size"]>;

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive>,
    VariantProps<typeof toggleVariants> {
  /**
   * Controlled pressed state. When provided, component behaves as a controlled input.
   */
  pressed?: boolean;
  /**
   * Initial pressed state for uncontrolled usage.
   * @default false
   */
  defaultPressed?: boolean;
  /**
   * Callback fired when the pressed state changes.
   */
  onPressedChange?: (pressed: boolean, eventDetails?: any) => void;
  /**
   * Semantic visual material treatment.
   * @default "default"
   */
  variant?: ToggleVariant;
  /**
   * Unified size tier coordinating height, padding, and square icon-only targets.
   * @default "default"
   */
  size?: ToggleSize;
}

/**
 * Toggle — HaloUI Actions Primitive
 *
 * A two-state action control that communicates and changes a persistent pressed or unpressed state.
 * Built on an accessible button-style semantic model with HaloUI's 10-layer physical liquid optical material.
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    // Development-time accessibility notice for icon-only usage
    if (process.env.NODE_ENV !== "production") {
      const hasAccessibleName = Boolean(
        props["aria-label"] ||
        props["aria-labelledby"] ||
        props.title ||
        typeof children === "string" ||
        (Array.isArray(children) && children.some((c) => typeof c === "string"))
      );
      if (!hasAccessibleName && typeof console !== "undefined") {
        console.warn(
          "[HaloUI Toggle]: An accessible name is mandatory for icon-only toggles. Please provide an 'aria-label' or visible text content."
        );
      }
    }

    return (
      <TogglePrimitive
        ref={ref}
        data-slot="toggle"
        data-variant={variant}
        data-size={size}
        className={cn(toggleVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </TogglePrimitive>
    );
  }
);

Toggle.displayName = "Toggle";
