"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * HaloUI Floating Action Button (FAB) Variants
 *
 * Implements a high-priority contextual action elevated above the surrounding interface.
 * Built on HaloUI's 10-layer physical liquid optical material engine:
 * - default: Signature liquid glass lens with multi-layered specular reflections, refraction edge, and deep spatial elevation.
 * - secondary: Elevated frosted crystal body with soft optical boundary and refined contrast.
 *
 * Placement is strictly container-owned (never default fixed) to permit seamless embedding
 * across app shells, floating panels, maps, mobile viewports, and nested layouts.
 *
 * Geometry & Sizing:
 * - default: 56px (size-14) touch target with 24px icon. Capsule when extended.
 * - lg: 64px (size-16) touch target with 28px icon. Capsule when extended.
 */
export const floatingActionButtonVariants = cva(
  [
    // Base layout: deliberate elevation, isolation, and tactile interaction
    "group/fab relative inline-flex items-center justify-center font-medium select-none isolate overflow-hidden cursor-pointer",
    "transition-all duration-200 ease-out outline-none shrink-0",
    "rounded-full",
    // Halo Focus Ring: double-contrast perimeter operating independently outside material boundary and shadow
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-20 halo-focus-ring",
    // Tactile press response during pointer/keyboard down
    "halo-tactile-press",
    // Disabled State: muted optical transmission while preserving spatial identifiability
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:transform-none",
    // SVG alignment: locks icon geometry and prevents pointer events interception
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "halo-liquid-glass text-neutral-900 dark:text-white",
          // Elevated spatial shadow calibrated to survive over Neutral, Image, Dense UI, and Dark substrates
          "shadow-[0_12px_36px_-6px_rgba(0,0,0,0.22),0_8px_18px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.9)]",
          "dark:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.7),0_8px_20px_-4px_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.25)]",
          // Hover elevation refinement (lift without exaggerated jumping)
          "hover:shadow-[0_16px_44px_-6px_rgba(0,0,0,0.28),0_10px_24px_-4px_rgba(0,0,0,0.16)]",
          "dark:hover:shadow-[0_20px_48px_-6px_rgba(0,0,0,0.8),0_10px_24px_-4px_rgba(0,0,0,0.55)]",
          "hover:-translate-y-0.5",
          // Active compression settling
          "active:translate-y-0 active:scale-[0.96]",
          "active:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.25)] dark:active:shadow-[0_6px_20px_-2px_rgba(0,0,0,0.6)]",
        ],
        secondary: [
          "bg-white/70 dark:bg-neutral-900/75 text-neutral-800 dark:text-neutral-100",
          "border border-black/[0.14] dark:border-white/[0.18]",
          "backdrop-blur-[16px] backdrop-saturate-150",
          "shadow-[0_10px_30px_-6px_rgba(0,0,0,0.18),0_6px_14px_-3px_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.8)]",
          "dark:shadow-[0_14px_36px_-6px_rgba(0,0,0,0.65),0_6px_16px_-4px_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.15)]",
          "hover:bg-white/85 dark:hover:bg-neutral-900/90 hover:border-black/[0.22] dark:hover:border-white/[0.26]",
          "hover:shadow-[0_14px_36px_-6px_rgba(0,0,0,0.22),0_8px_18px_-4px_rgba(0,0,0,0.12)]",
          "dark:hover:shadow-[0_18px_42px_-6px_rgba(0,0,0,0.75),0_8px_20px_-4px_rgba(0,0,0,0.5)]",
          "hover:-translate-y-0.5",
          "active:translate-y-0 active:scale-[0.96]",
          "active:shadow-[0_4px_14px_-2px_rgba(0,0,0,0.2)] dark:active:shadow-[0_6px_18px_-2px_rgba(0,0,0,0.55)]",
        ],
      },
      size: {
        default: "size-14 min-w-14 min-h-14 p-0 [&_svg:not([class*='size-'])]:size-6",
        lg: "size-16 min-w-16 min-h-16 p-0 [&_svg:not([class*='size-'])]:size-7",
      },
      extended: {
        true: "w-auto whitespace-nowrap",
        false: "",
      },
    },
    compoundVariants: [
      {
        extended: true,
        size: "default",
        className: "h-14 min-w-14 px-6 gap-3 text-sm tracking-wide font-medium",
      },
      {
        extended: true,
        size: "lg",
        className: "h-16 min-w-16 px-7 gap-3.5 text-base tracking-wide font-medium",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      extended: false,
    },
  }
);

export type FloatingActionButtonVariant = NonNullable<
  VariantProps<typeof floatingActionButtonVariants>["variant"]
>;
export type FloatingActionButtonSize = NonNullable<
  VariantProps<typeof floatingActionButtonVariants>["size"]
>;

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof floatingActionButtonVariants> {
  /**
   * Render as a Radix Slot for polymorphic composition.
   */
  asChild?: boolean;
  /**
   * Enables extended presentation displaying both an icon and a text label in a capsule geometry.
   * When false (default), the FAB maintains canonical circular dimensions.
   */
  extended?: boolean;
  /**
   * Base UI / composite render prop function or element.
   */
  render?: any;
}

/**
 * Floating Action Button (FAB) — HaloUI Actions Primitive
 *
 * A prominent, spatially elevated control reserved for a primary contextual action.
 * Deliberately elevated and spatially separated from the surrounding content.
 *
 * An accessible name MUST be provided via `aria-label`, `aria-labelledby`, or visible text (when extended).
 */
export const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      extended = false,
      asChild = false,
      render,
      type,
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
          extended ||
          asChild
      );
      if (!hasAccessibleName && typeof console !== "undefined") {
        console.warn(
          "[HaloUI FloatingActionButton]: An accessible name is mandatory for icon-only Floating Action Buttons. Please provide an 'aria-label' or 'aria-labelledby' attribute."
        );
      }
    }

    if (render) {
      const mergedClassName = cn(
        floatingActionButtonVariants({ variant, size, extended }),
        className
      );
      if (typeof render === "function") {
        return render({
          ref,
          "data-slot": "floating-action-button",
          "data-variant": variant,
          "data-size": size,
          "data-extended": extended ? "true" : "false",
          className: mergedClassName,
          ...props,
          children,
        });
      }
      const el = render as React.ReactElement<any>;
      return React.cloneElement(el, {
        ref,
        "data-slot": "floating-action-button",
        "data-variant": variant,
        "data-size": size,
        "data-extended": extended ? "true" : "false",
        className: cn(mergedClassName, el.props?.className),
        ...props,
        children: el.props?.children ?? children,
      });
    }

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        data-slot="floating-action-button"
        data-variant={variant}
        data-size={size}
        data-extended={extended ? "true" : "false"}
        className={cn(
          floatingActionButtonVariants({ variant, size, extended }),
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

FloatingActionButton.displayName = "FloatingActionButton";
