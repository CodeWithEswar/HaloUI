"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type CircularProgressSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type CircularProgressVariant = "default" | "success" | "warning" | "destructive" | "info" | "neutral";
export type CircularProgressIntensity = "subtle" | "balanced" | "plain";

export const circularProgressVariants = cva(
  [
    "@container/circular-progress relative isolate shrink-0 inline-flex items-center justify-center transition-all duration-150",
  ],
  {
    variants: {
      size: {
        sm: "size-8 text-[10px]",
        md: "size-12 text-xs",
        lg: "size-16 text-sm",
        xl: "size-24 text-base font-semibold",
        "2xl": "size-32 text-xl font-bold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const circularTrackVariants = cva(
  ["transition-all duration-150 fill-none"],
  {
    variants: {
      intensity: {
        subtle: "stroke-black/[0.08] dark:stroke-white/[0.12]",
        balanced: "stroke-black/[0.14] dark:stroke-white/[0.2]",
        plain: "stroke-muted",
      },
    },
    defaultVariants: {
      intensity: "subtle",
    },
  }
);

export const circularIndicatorVariants = cva(
  [
    "fill-none transition-[stroke-dashoffset] duration-300 ease-out",
    "motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        default: "stroke-primary",
        success: "stroke-emerald-600 dark:stroke-emerald-500",
        warning: "stroke-amber-500 dark:stroke-amber-400",
        destructive: "stroke-rose-600 dark:stroke-rose-500",
        info: "stroke-sky-600 dark:stroke-sky-500",
        neutral: "stroke-zinc-700 dark:stroke-zinc-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* -------------------------------------------------------------------------
 * CIRCULAR PROGRESS PROPS
 * ----------------------------------------------------------------------- */

export interface CircularProgressProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof circularProgressVariants> {
  /**
   * Current progress value between 0 and max.
   * Pass null or undefined to render in indeterminate mode.
   */
  value?: number | null;
  /**
   * Maximum progress value. Defaults to 100.
   */
  max?: number;
  /**
   * Semantic color variant of the progress arc.
   */
  variant?: CircularProgressVariant;
  /**
   * Optical material intensity for the background track ring.
   */
  intensity?: CircularProgressIntensity;
  /**
   * Thickness of the SVG stroke in the 100x100 coordinate space.
   * Defaults to 8.
   */
  strokeWidth?: number;
  /**
   * Whether to automatically display the percentage in the center.
   * Ignored if children are provided.
   * @default false
   */
  showValue?: boolean;
  /**
   * Optional custom value formatting function for the center readout.
   */
  formatValue?: (value: number, max: number) => string;
}

/* -------------------------------------------------------------------------
 * CIRCULAR PROGRESS COMPONENT
 * Compact radial completion indicator engineered with SVG coordinate geometry,
 * Subtle Liquid Glass track channels, and WAI-ARIA progressbar semantics.
 * ----------------------------------------------------------------------- */

export function CircularProgress({
  className,
  value,
  max = 100,
  size = "md",
  variant = "default",
  intensity = "subtle",
  strokeWidth = 8,
  showValue = false,
  formatValue,
  children,
  role = "progressbar",
  "aria-label": ariaLabel,
  ...props
}: CircularProgressProps) {
  const isIndeterminate = value === null || value === undefined;

  // Defensive clamping: 0 <= safeValue <= safeMax, handles NaN/Infinities
  const safeMax = typeof max === "number" && max > 0 ? max : 100;
  const safeValue =
    typeof value === "number" && !Number.isNaN(value)
      ? Math.min(Math.max(0, value), safeMax)
      : undefined;

  // Centralized SVG Geometry in 100x100 viewBox
  const radius = (100 - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = safeValue !== undefined ? (safeValue / safeMax) * 100 : 0;
  const strokeDashoffset = isIndeterminate
    ? undefined
    : circumference - (percentage / 100) * circumference;

  const defaultFormatted = safeValue !== undefined ? `${Math.round(percentage)}%` : "";
  const renderedText = formatValue
    ? formatValue(safeValue ?? 0, safeMax)
    : defaultFormatted;

  return (
    <div
      data-slot="circular-progress"
      data-size={size}
      data-variant={variant}
      data-intensity={intensity}
      data-state={isIndeterminate ? "indeterminate" : "determinate"}
      role={role}
      aria-valuenow={isIndeterminate ? undefined : safeValue}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={ariaLabel ?? (isIndeterminate ? "Loading" : `Progress: ${defaultFormatted}`)}
      className={cn(circularProgressVariants({ size }), className)}
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "size-full transform-gpu",
          isIndeterminate
            ? "animate-spin motion-reduce:animate-none"
            : "-rotate-90"
        )}
        aria-hidden="true"
      >
        {/* Background Track Ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          className={circularTrackVariants({ intensity })}
        />

        {/* Dynamic Progress Indicator Arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={
            isIndeterminate
              ? `${circumference * 0.25} ${circumference * 0.75}`
              : circumference
          }
          strokeDashoffset={strokeDashoffset}
          className={circularIndicatorVariants({ variant })}
        />
      </svg>

      {/* Center Content Slot (Percentage or Custom Element) */}
      {(children || (showValue && !isIndeterminate)) && (
        <div
          data-slot="circular-progress-value"
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-center font-mono tabular-nums leading-none select-none pointer-events-none px-1 text-foreground"
        >
          {children ?? renderedText}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * SUBCOMPONENTS FOR COMPOUND WORKFLOWS
 * ----------------------------------------------------------------------- */

export function CircularProgressLabel({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="circular-progress-label"
      className={cn("text-xs sm:text-sm font-medium text-foreground tracking-tight break-words", className)}
      {...props}
    />
  );
}
