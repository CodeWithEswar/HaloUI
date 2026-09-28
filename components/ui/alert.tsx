import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  InformationCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  AlertCircleIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type AlertVariant = "default" | "info" | "success" | "warning" | "destructive";
export type AlertIntensity = "subtle" | "balanced" | "plain";

export const alertVariants = cva(
  [
    "@container/alert relative w-full isolate overflow-hidden rounded-xl transition-all duration-150",
    "text-sm text-foreground",
    // Base layout: responsive flex reflow across container widths down to 240px
    "p-3.5 sm:p-4 flex flex-col @[480px]/alert:flex-row @[480px]/alert:items-start gap-3",
  ],
  {
    variants: {
      variant: {
        default: [
          // Semantic Tone: Info / Default
          "text-sky-950 dark:text-sky-100",
          "[&_a]:text-sky-900 dark:[&_a]:text-sky-200",
          "[&_[data-slot=alert-icon]]:text-sky-600 dark:[&_[data-slot=alert-icon]]:text-sky-400",
        ],
        info: [
          // Semantic Tone: Info
          "text-sky-950 dark:text-sky-100",
          "[&_a]:text-sky-900 dark:[&_a]:text-sky-200",
          "[&_[data-slot=alert-icon]]:text-sky-600 dark:[&_[data-slot=alert-icon]]:text-sky-400",
        ],
        success: [
          // Semantic Tone: Positive / Success
          "text-emerald-950 dark:text-emerald-100",
          "[&_a]:text-emerald-900 dark:[&_a]:text-emerald-200",
          "[&_[data-slot=alert-icon]]:text-emerald-600 dark:[&_[data-slot=alert-icon]]:text-emerald-400",
        ],
        warning: [
          // Semantic Tone: Warning / Caution
          "text-amber-950 dark:text-amber-100",
          "[&_a]:text-amber-900 dark:[&_a]:text-amber-200",
          "[&_[data-slot=alert-icon]]:text-amber-600 dark:[&_[data-slot=alert-icon]]:text-amber-400",
        ],
        destructive: [
          // Semantic Tone: Critical / Destructive
          "text-rose-950 dark:text-rose-100",
          "[&_a]:text-rose-900 dark:[&_a]:text-rose-200",
          "[&_[data-slot=alert-icon]]:text-rose-600 dark:[&_[data-slot=alert-icon]]:text-rose-400",
        ],
      },
      intensity: {
        subtle: [
          // Canonical Subtle Liquid Glass: high legibility, restrained 10-layer physical optics
          "backdrop-blur-md backdrop-saturate-150",
          "border shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.7)]",
          "dark:shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]",
        ],
        balanced: [
          // Balanced Liquid Glass: enhanced ambient depth for prominent contextual callouts
          "backdrop-blur-xl backdrop-saturate-180",
          "border shadow-[0_6px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "dark:shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]",
        ],
        plain: [
          // Plain / Reduced Transparency: solid, flat background for embedding inside glass surfaces
          "border shadow-xs backdrop-blur-none backdrop-saturate-100",
        ],
      },
    },
    compoundVariants: [
      // Subtle + Variant recipes (Light & Dark calibrated)
      {
        variant: ["default", "info"],
        intensity: "subtle",
        className: [
          "border-sky-500/25 bg-sky-500/[0.04] dark:border-sky-400/20 dark:bg-sky-500/[0.07]",
        ],
      },
      {
        variant: "success",
        intensity: "subtle",
        className: [
          "border-emerald-500/25 bg-emerald-500/[0.04] dark:border-emerald-400/20 dark:bg-emerald-500/[0.07]",
        ],
      },
      {
        variant: "warning",
        intensity: "subtle",
        className: [
          "border-amber-500/30 bg-amber-500/[0.04] dark:border-amber-400/20 dark:bg-amber-500/[0.07]",
        ],
      },
      {
        variant: "destructive",
        intensity: "subtle",
        className: [
          "border-rose-500/30 bg-rose-500/[0.05] dark:border-rose-400/20 dark:bg-rose-500/[0.08]",
        ],
      },

      // Balanced + Variant recipes
      {
        variant: ["default", "info"],
        intensity: "balanced",
        className: [
          "border-sky-500/35 bg-sky-500/[0.08] dark:border-sky-400/30 dark:bg-sky-500/[0.12]",
        ],
      },
      {
        variant: "success",
        intensity: "balanced",
        className: [
          "border-emerald-500/35 bg-emerald-500/[0.08] dark:border-emerald-400/30 dark:bg-emerald-500/[0.12]",
        ],
      },
      {
        variant: "warning",
        intensity: "balanced",
        className: [
          "border-amber-500/40 bg-amber-500/[0.08] dark:border-amber-400/30 dark:bg-amber-500/[0.12]",
        ],
      },
      {
        variant: "destructive",
        intensity: "balanced",
        className: [
          "border-rose-500/40 bg-rose-500/[0.09] dark:border-rose-400/30 dark:bg-rose-500/[0.14]",
        ],
      },

      // Plain + Variant recipes
      {
        variant: ["default", "info"],
        intensity: "plain",
        className: [
          "border-sky-500/30 bg-sky-50/80 dark:border-sky-500/20 dark:bg-sky-950/40",
        ],
      },
      {
        variant: "success",
        intensity: "plain",
        className: [
          "border-emerald-500/30 bg-emerald-50/80 dark:border-emerald-500/20 dark:bg-emerald-950/40",
        ],
      },
      {
        variant: "warning",
        intensity: "plain",
        className: [
          "border-amber-500/35 bg-amber-50/80 dark:border-amber-500/20 dark:bg-amber-950/40",
        ],
      },
      {
        variant: "destructive",
        intensity: "plain",
        className: [
          "border-rose-500/35 bg-rose-50/80 dark:border-rose-500/20 dark:bg-rose-950/40",
        ],
      },
    ],
    defaultVariants: {
      variant: "default",
      intensity: "subtle",
    },
  }
);

/* -------------------------------------------------------------------------
 * ICON MAP
 * ----------------------------------------------------------------------- */

const DEFAULT_VARIANT_ICONS: Record<AlertVariant, typeof InformationCircleIcon> = {
  default: InformationCircleIcon,
  info: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  destructive: AlertCircleIcon,
};

/* -------------------------------------------------------------------------
 * 1. ROOT ALERT COMPONENT
 * Inline contextual feedback surface with automatic responsive reflow.
 * Server-Component compatible with zero JS breakpoint dependencies.
 * ----------------------------------------------------------------------- */

export interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
  /**
   * Optional custom icon to override default semantic Hugeicons.
   * Pass false to completely suppress icon rendering.
   */
  icon?: React.ReactNode | false;
  /**
   * Whether to display an accessible dismiss button.
   * @default false
   */
  dismissible?: boolean;
  /**
   * Callback invoked when the dismiss button is clicked.
   */
  onDismiss?: () => void;
}

export function Alert({
  className,
  variant = "default",
  intensity = "subtle",
  icon,
  dismissible = false,
  onDismiss,
  role,
  children,
  ...props
}: AlertProps) {
  const resolvedVariant = variant ?? "default";
  const resolvedIntensity = intensity ?? "subtle";

  // WAI-ARIA role semantics:
  // Destructive errors default to "alert" (assertive announcement).
  // Status/warning defaults to "status" (polite announcement).
  // Static informational alerts can default to "region" or undefined.
  const resolvedRole =
    role !== undefined
      ? role
      : resolvedVariant === "destructive"
      ? "alert"
      : resolvedVariant === "warning" || resolvedVariant === "success"
      ? "status"
      : "region";

  const showIcon = icon !== false;
  const DefaultIcon = DEFAULT_VARIANT_ICONS[resolvedVariant];

  return (
    <div
      data-slot="alert"
      data-variant={resolvedVariant}
      data-intensity={resolvedIntensity}
      role={resolvedRole}
      className={cn(alertVariants({ variant: resolvedVariant, intensity: resolvedIntensity }), className)}
      {...props}
    >
      {/* Icon Slot: optical alignment with title baseline */}
      {showIcon && (
        <div
          data-slot="alert-icon"
          aria-hidden="true"
          className="shrink-0 flex items-center justify-center pt-0.5"
        >
          {icon ? (
            icon
          ) : (
            <HaloIcon icon={DefaultIcon} size="md" strokeWidth={1.75} />
          )}
        </div>
      )}

      {/* Main Content Area: expands intrinsically */}
      <div
        data-slot="alert-content"
        className={cn(
          "flex-1 min-w-0 space-y-1",
          (dismissible || onDismiss) && "pr-8 @[480px]/alert:pr-0"
        )}
      >
        {children}
      </div>

      {/* Dismiss Button: Top right on mobile, aligned on desktop */}
      {(dismissible || onDismiss) && (
        <button
          type="button"
          data-slot="alert-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className={cn(
            "absolute top-2.5 right-2.5 @[480px]/alert:static @[480px]/alert:top-auto @[480px]/alert:right-auto",
            "shrink-0 inline-flex items-center justify-center size-7 rounded-lg text-muted-foreground/80",
            "hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
            "active:scale-95 transition-all outline-none",
            "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color,#0284c7)] focus-visible:ring-offset-1"
          )}
        >
          <HaloIcon icon={Cancel01Icon} size={15} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. ALERT TITLE
 * Semantic title with natural wrapping and high-contrast typography.
 * ----------------------------------------------------------------------- */

export function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn(
        "font-semibold text-sm leading-tight tracking-tight text-foreground break-words min-w-0",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:opacity-80",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. ALERT DESCRIPTION
 * High-legibility description area supporting formatted text and links.
 * ----------------------------------------------------------------------- */

export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-xs sm:text-sm text-muted-foreground leading-relaxed break-words min-w-0",
        "[&_p:not(:last-child)]:mb-2",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:text-foreground",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. ALERT ACTION
 * Container-aware action container that reflows below content on narrow viewports.
 * ----------------------------------------------------------------------- */

export function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        "shrink-0 flex items-center flex-wrap gap-2 pt-2 @[480px]/alert:pt-0 @[480px]/alert:self-center",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. ALERT ICON (OPTIONAL EXPLICIT PRIMITIVE)
 * ----------------------------------------------------------------------- */

export function AlertIcon({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="alert-icon"
      aria-hidden="true"
      className={cn("shrink-0 inline-flex items-center justify-center text-current", className)}
      {...props}
    >
      {children}
    </span>
  );
}
