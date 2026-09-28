"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "muted";

export const spinnerVariants = cva(
  [
    "shrink-0 inline-flex items-center justify-center transition-opacity duration-150 select-none",
    "animate-spin motion-reduce:animate-none motion-reduce:opacity-70",
  ],
  {
    variants: {
      size: {
        xs: "size-3",
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-8",
      },
      variant: {
        default: "text-current",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        success: "text-emerald-600 dark:text-emerald-400",
        warning: "text-amber-600 dark:text-amber-400",
        destructive: "text-rose-600 dark:text-rose-400",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "default",
    },
  }
);

/* -------------------------------------------------------------------------
 * SPINNER PROPS
 * ----------------------------------------------------------------------- */

export interface SpinnerProps
  extends React.ComponentProps<"svg">,
    VariantProps<typeof spinnerVariants> {
  /**
   * Accessible name announced by screen readers when standalone.
   * If omitted and no visible label is present, defaults to "Loading".
   */
  label?: string;
  /**
   * Optional custom stroke thickness for the SVG arc.
   * @default 2.75
   */
  strokeWidth?: number;
}

/* -------------------------------------------------------------------------
 * SPINNER COMPONENT
 * Indeterminate activity indicator engineered with pure SVG stroke geometry,
 * currentColor inheritance, zero-cost CSS rotation, and reduced-motion fallbacks.
 * ----------------------------------------------------------------------- */

export function Spinner({
  className,
  size = "sm",
  variant = "default",
  label = "Loading",
  strokeWidth = 2.75,
  role = "status",
  ...props
}: SpinnerProps) {
  return (
    <svg
      data-slot="spinner"
      viewBox="0 0 24 24"
      fill="none"
      role={role}
      aria-label={label}
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    >
      {/* Background Track Circle */}
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="opacity-20"
      />

      {/* Kinetic Activity Arc */}
      <path
        d="M12 2.5 A 9.5 9.5 0 0 1 21.5 12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
