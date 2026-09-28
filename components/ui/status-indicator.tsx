import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type StatusIndicatorIntent =
  | "neutral"
  | "positive"
  | "warning"
  | "destructive"
  | "info";

export type StatusIndicatorSize = "sm" | "md" | "lg";

export const statusIndicatorVariants = cva(
  [
    "@container/status-indicator inline-flex items-center min-w-0 transition-colors",
    "select-none font-normal leading-tight",
  ],
  {
    variants: {
      size: {
        sm: "gap-1.5 text-xs",
        md: "gap-2 text-sm",
        lg: "gap-2.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const statusIndicatorDotVariants = cva(
  [
    "rounded-full shrink-0 transition-transform duration-200",
    "ring-1 ring-black/10 dark:ring-white/15",
    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]",
    "motion-reduce:animate-none",
  ],
  {
    variants: {
      intent: {
        neutral: "bg-zinc-400 dark:bg-zinc-500",
        positive: "bg-emerald-500 dark:bg-emerald-400",
        warning: "bg-amber-500 dark:bg-amber-400",
        destructive: "bg-rose-500 dark:bg-rose-400",
        info: "bg-sky-500 dark:bg-sky-400",
      },
      size: {
        sm: "size-1.5",
        md: "size-2",
        lg: "size-2.5",
      },
      pulse: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      intent: "neutral",
      size: "md",
      pulse: false,
    },
  }
);

/* -------------------------------------------------------------------------
 * STATUS INDICATOR PROPS
 * ----------------------------------------------------------------------- */

export interface StatusIndicatorProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof statusIndicatorVariants> {
  /**
   * Semantic intent of the state representation:
   * - "neutral": Muted, baseline state (e.g. Offline, Paused, Idle)
   * - "positive": Healthy, favorable state (e.g. Online, Operational, Active)
   * - "warning": Attention required (e.g. Degraded, Syncing, Pending)
   * - "destructive": Error or outage state (e.g. Failed, Critical, Disconnected)
   * - "info": Informational state (e.g. In Review, Processing, Staging)
   * @default "neutral"
   */
  intent?: StatusIndicatorIntent;
  /**
   * Sizing scale for the indicator dot/icon and label typography.
   * @default "md"
   */
  size?: StatusIndicatorSize;
  /**
   * Whether to display the geometric indicator dot.
   * @default true
   */
  dot?: boolean;
  /**
   * Optional custom semantic icon (e.g., from Hugeicons).
   * When provided, the icon is rendered instead of the geometric dot.
   */
  icon?: React.ReactNode;
  /**
   * Optional text label. Can also be provided via `children`.
   */
  label?: React.ReactNode;
  /**
   * Optional secondary supporting text displayed beside the primary label.
   */
  supportingText?: React.ReactNode;
  /**
   * Whether to enable restrained continuous pulse animation on the dot.
   * Defaults to false for vestibular accessibility and battery performance.
   * @default false
   */
  pulse?: boolean;
}

/* -------------------------------------------------------------------------
 * STATUS INDICATOR COMPONENT
 * Dot/icon + text state representation engineered for high-density tables, lists,
 * and cards with minimal near-flat Liquid Glass optics and zero layout overhead.
 * ----------------------------------------------------------------------- */

export function StatusIndicator({
  className,
  intent = "neutral",
  size = "md",
  dot = true,
  icon,
  label,
  supportingText,
  pulse = false,
  children,
  ...props
}: StatusIndicatorProps) {
  const content = children ?? label;
  const isLabelOnly = !dot && !icon;

  return (
    <span
      data-slot="status-indicator"
      data-intent={intent}
      data-size={size}
      className={cn(statusIndicatorVariants({ size }), className)}
      {...props}
    >
      {/* Visual Indicator: Custom Icon or Geometric Optical Dot */}
      {icon ? (
        <span
          data-slot="status-indicator-icon"
          aria-hidden="true"
          className={cn(
            "shrink-0 inline-flex items-center justify-center transition-colors",
            intent === "neutral" && "text-zinc-500 dark:text-zinc-400",
            intent === "positive" && "text-emerald-600 dark:text-emerald-400",
            intent === "warning" && "text-amber-600 dark:text-amber-400",
            intent === "destructive" && "text-rose-600 dark:text-rose-400",
            intent === "info" && "text-sky-600 dark:text-sky-400"
          )}
        >
          {icon}
        </span>
      ) : dot ? (
        <span
          data-slot="status-indicator-dot"
          aria-hidden="true"
          className={cn(statusIndicatorDotVariants({ intent, size, pulse }))}
        />
      ) : null}

      {/* Semantic Text Content */}
      {content && (
        <span
          data-slot="status-indicator-label"
          className={cn(
            "truncate text-foreground font-medium",
            intent === "neutral" && "text-muted-foreground font-normal"
          )}
        >
          {content}
        </span>
      )}

      {/* Secondary Supporting Text */}
      {supportingText && (
        <span
          data-slot="status-indicator-supporting"
          className="text-muted-foreground/80 font-normal text-[0.9em] shrink-0"
        >
          {supportingText}
        </span>
      )}
    </span>
  );
}
