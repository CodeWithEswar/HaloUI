"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * HaloUI Button Variants — Tactile Solid Design System
 *
 * Crisp, solid, tactile UI architecture:
 * - default: Canonical "Create application" primary reference: solid blue, subtle vertical gradient,
 *   crisp 1px blue border, 11px radius, 1px top highlight, 2px darker bottom extrusion
 * - secondary: Solid light/dark neutral control with crisp border and subtle bottom extrusion
 * - outline: Crisp structural border on solid background with shallow 1px depth
 * - ghost: Pure flat control with subtle hover feedback
 * - destructive: Solid crimson action with high contrast and 2px extrusion
 * - link: High-contrast textual action with accessible underline-offset
 */
export const buttonVariants = cva(
  [
    "group/button relative inline-flex items-center justify-center font-semibold select-none isolate cursor-pointer",
    "whitespace-nowrap transition-all duration-100 ease-out outline-none",
    // Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-10 halo-focus-ring",
    // Tactile press response
    "halo-tactile-press",
    // Disabled State: muted without destroying label legibility, no press transform
    "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed",
    // SVG / Hugeicons Alignment
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        link: [
          "text-primary underline-offset-4 hover:underline",
          "border-0 bg-transparent shadow-none p-0 h-auto font-normal rounded-none",
          "active:scale-100 active:translate-y-0 hover:translate-y-0",
          "before:hidden after:hidden",
        ],
      },
      size: {
        default: "h-10 px-4.5 py-2.5 text-sm gap-2 rounded-[11px]",
        sm: "h-8 px-3 text-xs gap-1.5 rounded-[9px]",
        lg: "h-11 px-5 text-base gap-2.5 rounded-[12px]",
        icon: "size-10 p-0 rounded-[11px] justify-center shrink-0",
        // Extended compatibility sizes for internal composite UI controls
        xs: "h-6 px-2 text-xs gap-1 rounded-[6px]",
        "icon-xs": "size-6 p-0 rounded-[6px] justify-center shrink-0",
        "icon-sm": "size-8 p-0 rounded-[9px] justify-center shrink-0",
        "icon-lg": "size-11 p-0 rounded-[12px] justify-center shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  render?: any;
  nativeButton?: boolean;
}

/**
 * Button — HaloUI Actions Primitive
 *
 * A text or icon-supported action control with HaloUI liquid material,
 * semantic variants, accessible interaction states, and consistent keyboard behavior.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      render,
      nativeButton,
      type,
      children,
      ...props
    },
    ref
  ) => {
    if (render) {
      const mergedClassName = cn(buttonVariants({ variant, size }), className);
      if (typeof render === "function") {
        return render({
          ref,
          "data-slot": "button",
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
        "data-slot": "button",
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
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
