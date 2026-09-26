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
    "group/icon-button relative inline-flex items-center justify-center select-none isolate cursor-pointer",
    "transition-all duration-100 ease-out outline-none shrink-0",
    // Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-10 halo-focus-ring",
    // Tactile press response
    "halo-tactile-press",
    // Disabled State: muted without destroying icon legibility
    "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed",
    // SVG / Hugeicons Alignment: prevents SVG from intercepting events or breaking square geometry
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "halo-liquid-glass",
          "text-[var(--halo-glass-text)]",
          "hover:translate-y-[-2px] hover:brightness-105",
          "active:scale-[0.94] active:text-[var(--halo-glass-text-active)]",
        ],
        primary: [
          "bg-[#18191d] text-white dark:bg-white dark:text-neutral-900",
          "border border-[#23252a] dark:border-[#e2e4e9]",
          "shadow-md hover:brightness-105 active:scale-[0.95]",
        ],
        secondary: [
          "halo-liquid-glass",
          "bg-white/10 dark:bg-white/5",
          "text-foreground",
          "hover:bg-white/15 dark:hover:bg-white/10 hover:translate-y-[-2px]",
          "active:scale-[0.95]",
        ],
        outline: [
          "bg-background text-foreground",
          "border border-border",
          "hover:bg-muted hover:text-foreground",
          "active:scale-[0.96]",
        ],
        ghost: [
          "bg-transparent text-muted-foreground",
          "border border-transparent",
          "hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground",
          "active:scale-[0.96]",
        ],
        destructive: [
          "halo-liquid-glass",
          "border-[#b71c1c]/40 dark:border-[#991b1b]/50",
          "text-destructive",
          "hover:translate-y-[-2px]",
          "active:scale-[0.94]",
        ],
      },
      size: {
        sm: "size-8 rounded-[9px] [&_svg:not([class*='size-'])]:size-3.5",
        default: "size-10 rounded-[11px] [&_svg:not([class*='size-'])]:size-4.5",
        lg: "size-12 rounded-[13px] [&_svg:not([class*='size-'])]:size-5",
        showcase: "size-[100px] rounded-[24px] [&_svg:not([class*='size-'])]:size-8",
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
        {variant === "default" && !asChild && (
          <span className="halo-liquid-overlay pointer-events-none" aria-hidden="true" />
        )}
        <span className="relative z-10 flex items-center justify-center shrink-0">{children}</span>
      </Comp>
    );
  }
);

IconButton.displayName = "IconButton";
