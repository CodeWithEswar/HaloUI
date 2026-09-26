"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * HaloUI Button Variants
 *
 * Physical 10-layer liquid optical material engine applied to interactive action controls:
 * - default: Authentic physical liquid glass lens with multi-layered specular reflections and refraction edge
 * - secondary: Subtle translucent crystal body
 * - outline: Recessed optical boundary with hairline perimeter
 * - ghost: Pure clarity at rest, resolving frosted glass on hover
 * - destructive: Refractive liquid ruby glass
 * - link: High-contrast textual action with accessible underline-offset
 */
export const buttonVariants = cva(
  [
    "group/button relative inline-flex items-center justify-center font-medium select-none isolate overflow-hidden cursor-pointer",
    "whitespace-nowrap transition-all duration-200 ease-out outline-none",
    // Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-10 halo-focus-ring",
    // Tactile press response
    "halo-tactile-press",
    // Disabled State: muted optical transmission without destroying label legibility
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:transform-none",
    // SVG / Hugeicons Alignment
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: [
          "halo-liquid-glass text-neutral-900 dark:text-white",
        ],
        secondary: [
          "halo-liquid-glass text-neutral-800 dark:text-neutral-200 ",
        ],
        outline: [
          "bg-white/[0.03] dark:bg-white/[0.02] text-neutral-800 dark:text-neutral-200",
          "border border-black/[0.18] dark:border-white/[0.22] hover:border-black/[0.32] dark:hover:border-white/[0.38]",
          "",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_0_rgba(0,0,0,0.15)]",
          "halo-tactile-press",
        ],
        ghost: [
          "bg-transparent text-neutral-600 dark:text-neutral-400 border border-transparent",
          "hover:bg-white/[0.08] dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white hover:border-black/[0.08] dark:hover:border-white/[0.12]",
          "hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.4)]",
          " halo-tactile-press",
        ],
        destructive: [
          "halo-liquid-glass text-rose-800 dark:text-rose-100 bg-rose-50/95 dark:bg-rose-950/95 border-rose-500/30 dark:border-rose-500/40",
          "focus-visible:ring-rose-500",
        ],
        link: [
          "text-primary underline-offset-4 hover:underline",
          "border-0 bg-transparent shadow-none p-0 h-auto font-normal rounded-none backdrop-blur-none",
          "active:scale-100 active:translate-y-0 hover:translate-y-0",
          "before:hidden after:hidden",
        ],
      },
      size: {
        default: "h-10 px-5 text-sm gap-2 rounded-full",
        sm: "h-8 px-3.5 text-xs gap-1.5 rounded-full",
        lg: "h-12 px-6 text-base gap-2.5 rounded-full",
        icon: "size-10 p-0 rounded-full justify-center shrink-0",
        // Extended compatibility sizes for internal composite UI controls
        xs: "h-6 px-2 text-xs gap-1 rounded-md",
        "icon-xs": "size-6 p-0 rounded-md justify-center shrink-0",
        "icon-sm": "size-8 p-0 rounded-full justify-center shrink-0",
        "icon-lg": "size-12 p-0 rounded-full justify-center shrink-0",
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
