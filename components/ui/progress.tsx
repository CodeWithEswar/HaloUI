"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressVariant = "default" | "success" | "warning" | "destructive" | "info" | "neutral";
export type ProgressIntensity = "subtle" | "balanced" | "plain";

export const progressTrackVariants = cva(
  [
    "@container/progress relative w-full isolate overflow-hidden rounded-full transition-all duration-150",
  ],
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
      intensity: {
        subtle: [
          // Canonical Subtle Liquid Glass: reading-first optical channel
          "bg-black/[0.06] dark:bg-white/[0.08]",
          "border border-black/[0.08] dark:border-white/[0.12]",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]",
          "backdrop-blur-xs",
        ],
        balanced: [
          // Balanced Liquid Glass: heightened optical contrast for standalone progress
          "bg-black/[0.1] dark:bg-white/[0.12]",
          "border border-black/[0.12] dark:border-white/[0.18]",
          "shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.12)] dark:shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.5)]",
          "backdrop-blur-sm",
        ],
        plain: [
          // Plain / Reduced Transparency: solid, flat background
          "bg-muted border border-border/80 shadow-inner",
        ],
      },
    },
    defaultVariants: {
      size: "md",
      intensity: "subtle",
    },
  }
);

export const progressIndicatorVariants = cva(
  [
    "h-full rounded-full transition-all duration-300 ease-out",
    "motion-reduce:transition-none",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        success: "bg-emerald-600 dark:bg-emerald-500 text-white",
        warning: "bg-amber-500 dark:bg-amber-400 text-amber-950",
        destructive: "bg-rose-600 dark:bg-rose-500 text-white",
        info: "bg-sky-600 dark:bg-sky-500 text-white",
        neutral: "bg-zinc-700 dark:bg-zinc-300 text-zinc-100 dark:text-zinc-900",
      },
      indeterminate: {
        true: "w-full animate-[progress-indeterminate_1.6s_ease-in-out_infinite] origin-left-right",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      indeterminate: false,
    },
  }
);

/* -------------------------------------------------------------------------
 * PROGRESS CONTEXT
 * ----------------------------------------------------------------------- */

interface ProgressContextValue {
  size: ProgressSize;
  variant: ProgressVariant;
  intensity: ProgressIntensity;
  isIndeterminate: boolean;
}

const ProgressContext = React.createContext<ProgressContextValue>({
  size: "md",
  variant: "default",
  intensity: "subtle",
  isIndeterminate: false,
});

/* -------------------------------------------------------------------------
 * 1. ROOT PROGRESS COMPONENT
 * Linear task completion indicator with WAI-ARIA semantics, container-aware
 * responsive reflow, and subtle Liquid Glass channel aesthetics.
 * ----------------------------------------------------------------------- */

export interface ProgressProps
  extends Omit<ProgressPrimitive.Root.Props, "value">,
    VariantProps<typeof progressTrackVariants> {
  /**
   * Current progress completion value between 0 and max.
   * Pass null or undefined to render in indeterminate mode.
   */
  value?: number | null;
  /**
   * Maximum progress value. Defaults to 100.
   */
  max?: number;
  /**
   * Semantic color variant of the progress indicator.
   */
  variant?: ProgressVariant;
  /**
   * Optical material intensity for the track channel.
   */
  intensity?: ProgressIntensity;
  /**
   * Accessible name for the progress bar.
   */
  "aria-label"?: string;
}

export function Progress({
  className,
  children,
  value,
  max = 100,
  size = "md",
  variant = "default",
  intensity = "subtle",
  ...props
}: ProgressProps) {
  const isIndeterminate = value === null || value === undefined;

  // Defensive clamping: 0 <= safeValue <= max, handles NaN/infinities cleanly
  const safeMax = typeof max === "number" && max > 0 ? max : 100;
  const safeValue =
    typeof value === "number" && !Number.isNaN(value)
      ? Math.min(Math.max(0, value), safeMax)
      : undefined;

  const contextValue = React.useMemo(
    () => ({
      size: size ?? "md",
      variant: variant ?? "default",
      intensity: intensity ?? "subtle",
      isIndeterminate,
    }),
    [size, variant, intensity, isIndeterminate]
  );

  return (
    <ProgressContext.Provider value={contextValue}>
      <ProgressPrimitive.Root
        value={safeValue}
        max={safeMax}
        data-slot="progress"
        data-size={size}
        data-variant={variant}
        data-intensity={intensity}
        data-state={isIndeterminate ? "indeterminate" : "determinate"}
        className={cn("w-full min-w-0 space-y-2", className)}
        {...props}
      >
        {children ? (
          children
        ) : (
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        )}
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  );
}

/* -------------------------------------------------------------------------
 * 2. PROGRESS TRACK
 * Optical channel surface for the completion range.
 * ----------------------------------------------------------------------- */

export interface ProgressTrackProps extends ProgressPrimitive.Track.Props {
  size?: ProgressSize;
  intensity?: ProgressIntensity;
}

export function ProgressTrack({
  className,
  size: sizeProp,
  intensity: intensityProp,
  children,
  ...props
}: ProgressTrackProps) {
  const context = React.useContext(ProgressContext);
  const size = sizeProp ?? context.size;
  const intensity = intensityProp ?? context.intensity;

  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(progressTrackVariants({ size, intensity }), className)}
      {...props}
    >
      {children ?? <ProgressIndicator />}
    </ProgressPrimitive.Track>
  );
}

/* -------------------------------------------------------------------------
 * 3. PROGRESS INDICATOR
 * Responsive completion fill supporting determinate transforms and
 * reduced-motion fallbacks.
 * ----------------------------------------------------------------------- */

export interface ProgressIndicatorProps extends ProgressPrimitive.Indicator.Props {
  variant?: ProgressVariant;
}

export function ProgressIndicator({
  className,
  variant: variantProp,
  ...props
}: ProgressIndicatorProps) {
  const context = React.useContext(ProgressContext);
  const variant = variantProp ?? context.variant;

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        progressIndicatorVariants({
          variant,
          indeterminate: context.isIndeterminate,
        }),
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. PROGRESS LABEL
 * Accessible text label describing the associated task.
 * ----------------------------------------------------------------------- */

export function ProgressLabel({
  className,
  ...props
}: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn(
        "text-xs sm:text-sm font-medium text-foreground tracking-tight break-words min-w-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. PROGRESS VALUE
 * Numerical percentage or formatted status output with tabular digits.
 * ----------------------------------------------------------------------- */

export function ProgressValue({
  className,
  ...props
}: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn(
        "ml-auto text-xs sm:text-sm text-muted-foreground font-mono tabular-nums shrink-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. PROGRESS HEADER (CONVENIENCE COMPOSITION HELPER)
 * Wraps Label and Value in a responsive flex row that wraps on narrow screens.
 * ----------------------------------------------------------------------- */

export function ProgressHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-header"
      className={cn("flex items-center justify-between gap-2 min-w-0 flex-wrap pb-0.5", className)}
      {...props}
    />
  );
}
