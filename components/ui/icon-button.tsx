"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * HaloUI IconButton Variants
 *
 * Dedicated square-geometry action control sharing HaloUI's 10-layer physical liquid optical engine:
 * - default: Signature liquid glass lens with multi-layered specular reflections and refraction edge
 * - secondary: Elevated translucent crystal body with soft boundary
 * - outline: Recessed ambient surface with defined hairline perimeter
 * - ghost: Pure clarity at rest, resolving frosted glass on hover (ideal for toolbars)
 * - destructive: Liquid ruby glass with optical containment and contrast
 */
export const iconButtonVariants = cva(
  [
    "group/icon-button relative inline-flex items-center justify-center select-none isolate overflow-hidden cursor-pointer",
    "transition-all duration-200 ease-out outline-none shrink-0",
    // Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-10 halo-focus-ring",
    // Tactile press response
    "halo-tactile-press",
    // Disabled State: muted optical transmission without destroying icon legibility
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:transform-none",
    // SVG / Hugeicons Alignment: prevents SVG from intercepting events or breaking square geometry
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "halo-liquid-glass text-neutral-900 dark:text-white",
        ],
        secondary: [
          "halo-liquid-glass text-neutral-800 dark:text-neutral-200 opacity-90 hover:opacity-100",
        ],
        outline: [
          "bg-white/[0.03] dark:bg-white/[0.02] text-neutral-800 dark:text-neutral-200",
          "border border-black/[0.18] dark:border-white/[0.22] hover:border-black/[0.32] dark:hover:border-white/[0.38]",
          "backdrop-blur-[8px]",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_0_rgba(0,0,0,0.15)]",
          "hover:-translate-y-0.5 active:scale-[0.96]",
        ],
        ghost: [
          "bg-transparent text-neutral-600 dark:text-neutral-400 border border-transparent",
          "hover:bg-white/[0.08] dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white hover:border-black/[0.08] dark:hover:border-white/[0.12]",
          "hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.4)]",
          "backdrop-blur-[8px] hover:-translate-y-0.5 active:scale-[0.96]",
        ],
        destructive: [
          "halo-liquid-glass text-rose-700 dark:text-rose-200 bg-rose-500/[0.08] dark:bg-rose-500/[0.12] border-rose-500/30 dark:border-rose-500/40",
          "shadow-[0_4px_16px_-4px_rgba(244,63,94,0.35),inset_2px_-2px_1px_-1px_rgba(255,255,255,0.7),inset_-2px_2px_1px_-1px_rgba(255,255,255,0.7)]",
          "focus-visible:ring-rose-500",
        ],
      },
      size: {
        sm: "size-8 rounded-full [&_svg:not([class*='size-'])]:size-3.5",
        default: "size-10 rounded-full [&_svg:not([class*='size-'])]:size-4.5",
        lg: "size-12 rounded-full [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type IconButtonVariant = NonNullable<VariantProps<typeof iconButtonVariants>["variant"]>;
export type IconButtonSize = NonNullable<VariantProps<typeof iconButtonVariants>["size"]>;

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /**
   * Render as Radix Slot child component for polymorphic composition.
   */
  asChild?: boolean;
  /**
   * Base UI / composite render prop function or element.
   */
  render?: any;
}

/**
 * IconButton — HaloUI Actions Primitive
 *
 * A compact icon-only control for common actions, with mandatory accessible naming,
 * HaloUI material states, and consistent keyboard and touch behavior.
 *
 * An accessible name MUST be provided via `aria-label`, `aria-labelledby`, or `title`.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      render,
      type,
      children,
      ...props
    },
    ref
  ) => {
    // Development-time accessibility notice
    if (process.env.NODE_ENV !== "production") {
      const hasAccessibleName = Boolean(
        props["aria-label"] || props["aria-labelledby"] || props.title || asChild
      );
      if (!hasAccessibleName && typeof console !== "undefined") {
        console.warn(
          "[HaloUI IconButton]: An accessible name is mandatory for icon-only buttons. Please provide an 'aria-label' or 'aria-labelledby' attribute."
        );
      }
    }

    if (render) {
      const mergedClassName = cn(iconButtonVariants({ variant, size }), className);
      if (typeof render === "function") {
        return render({
          ref,
          "data-slot": "icon-button",
          "data-variant": variant,
          "data-size": size,
          className: mergedClassName,
          ...props,
          children,
        });
      }
      const el = render as React.ReactElement<any>;
      return React.cloneElement(el, {
        ref,
        "data-slot": "icon-button",
        "data-variant": variant,
        "data-size": size,
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
        data-slot="icon-button"
        data-variant={variant}
        data-size={size}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

IconButton.displayName = "IconButton";
