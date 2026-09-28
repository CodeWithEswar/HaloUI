import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Megaphone01Icon,
  InformationCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  AlertCircleIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type BannerVariant = "default" | "info" | "success" | "warning" | "destructive";
export type BannerIntensity = "subtle" | "balanced" | "plain";
export type BannerLayout = "contained" | "full-width";

export const bannerVariants = cva(
  [
    "@container/banner relative w-full isolate overflow-hidden transition-all duration-150",
    "text-sm text-foreground",
    // Base layout: responsive flex reflow across container widths down to 240px
    "px-3.5 py-3 @[560px]/banner:px-6 @[560px]/banner:py-3.5 flex flex-col @[560px]/banner:flex-row @[560px]/banner:items-center justify-between gap-3",
  ],
  {
    variants: {
      variant: {
        default: [
          // Semantic Tone: Default / Product Announcement
          "text-sky-950 dark:text-sky-100",
          "[&_a]:text-sky-900 dark:[&_a]:text-sky-200",
          "[&_[data-slot=banner-icon]]:text-sky-600 dark:[&_[data-slot=banner-icon]]:text-sky-400",
        ],
        info: [
          // Semantic Tone: Info
          "text-sky-950 dark:text-sky-100",
          "[&_a]:text-sky-900 dark:[&_a]:text-sky-200",
          "[&_[data-slot=banner-icon]]:text-sky-600 dark:[&_[data-slot=banner-icon]]:text-sky-400",
        ],
        success: [
          // Semantic Tone: Success / Operational
          "text-emerald-950 dark:text-emerald-100",
          "[&_a]:text-emerald-900 dark:[&_a]:text-emerald-200",
          "[&_[data-slot=banner-icon]]:text-emerald-600 dark:[&_[data-slot=banner-icon]]:text-emerald-400",
        ],
        warning: [
          // Semantic Tone: Warning / Maintenance
          "text-amber-950 dark:text-amber-100",
          "[&_a]:text-amber-900 dark:[&_a]:text-amber-200",
          "[&_[data-slot=banner-icon]]:text-amber-600 dark:[&_[data-slot=banner-icon]]:text-amber-400",
        ],
        destructive: [
          // Semantic Tone: Critical / Outage
          "text-rose-950 dark:text-rose-100",
          "[&_a]:text-rose-900 dark:[&_a]:text-rose-200",
          "[&_[data-slot=banner-icon]]:text-rose-600 dark:[&_[data-slot=banner-icon]]:text-rose-400",
        ],
      },
      intensity: {
        subtle: [
          // Canonical Subtle Liquid Glass: high legibility, restrained 10-layer physical optics
          "backdrop-blur-md backdrop-saturate-150",
          "border shadow-[0_2px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.7)]",
          "dark:shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]",
        ],
        balanced: [
          // Balanced Liquid Glass: enhanced ambient depth for prominent section headers
          "backdrop-blur-xl backdrop-saturate-180",
          "border shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "dark:shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]",
        ],
        plain: [
          // Plain / Reduced Transparency: solid, flat background for embedding or reduced transparency
          "border shadow-xs backdrop-blur-none backdrop-saturate-100",
        ],
      },
      layout: {
        contained: "rounded-xl sm:rounded-2xl",
        "full-width": "rounded-none border-x-0 border-y",
      },
    },
    compoundVariants: [
      // Subtle + Variant recipes
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
          "border-sky-500/30 bg-sky-50/85 dark:border-sky-500/20 dark:bg-sky-950/45",
        ],
      },
      {
        variant: "success",
        intensity: "plain",
        className: [
          "border-emerald-500/30 bg-emerald-50/85 dark:border-emerald-500/20 dark:bg-emerald-950/45",
        ],
      },
      {
        variant: "warning",
        intensity: "plain",
        className: [
          "border-amber-500/35 bg-amber-50/85 dark:border-amber-500/20 dark:bg-amber-950/45",
        ],
      },
      {
        variant: "destructive",
        intensity: "plain",
        className: [
          "border-rose-500/35 bg-rose-50/85 dark:border-rose-500/20 dark:bg-rose-950/45",
        ],
      },
    ],
    defaultVariants: {
      variant: "default",
      intensity: "subtle",
      layout: "contained",
    },
  }
);

/* -------------------------------------------------------------------------
 * DEFAULT ICON MAP
 * ----------------------------------------------------------------------- */

const DEFAULT_BANNER_ICONS: Record<BannerVariant, typeof Megaphone01Icon> = {
  default: Megaphone01Icon,
  info: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  destructive: AlertCircleIcon,
};

/* -------------------------------------------------------------------------
 * 1. ROOT BANNER COMPONENT
 * Persistent page/section announcement surface with automatic responsive reflow.
 * Server-Component compatible with zero JS breakpoint dependencies.
 * ----------------------------------------------------------------------- */

export interface BannerProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bannerVariants> {
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

export function Banner({
  className,
  variant = "default",
  intensity = "subtle",
  layout = "contained",
  icon,
  dismissible = false,
  onDismiss,
  role,
  children,
  ...props
}: BannerProps) {
  const resolvedVariant = variant ?? "default";
  const resolvedIntensity = intensity ?? "subtle";
  const resolvedLayout = layout ?? "contained";

  // WAI-ARIA role semantics:
  // Persistent announcements default to "region" with accessible announcement intent.
  // Destructive critical notices default to "alert" (assertive live region).
  // Informational / maintenance banners can use "status" or "region".
  const resolvedRole =
    role !== undefined
      ? role
      : resolvedVariant === "destructive"
      ? "alert"
      : resolvedVariant === "warning" || resolvedVariant === "success"
      ? "status"
      : "region";

  const showIcon = icon !== false;
  const DefaultIcon = DEFAULT_BANNER_ICONS[resolvedVariant];

  return (
    <div
      data-slot="banner"
      data-variant={resolvedVariant}
      data-intensity={resolvedIntensity}
      data-layout={resolvedLayout}
      role={resolvedRole}
      aria-label={props["aria-label"] ?? (resolvedRole === "region" ? "Announcement" : undefined)}
      className={cn(
        bannerVariants({
          variant: resolvedVariant,
          intensity: resolvedIntensity,
          layout: resolvedLayout,
        }),
        className
      )}
      {...props}
    >
      {/* Primary Row / Leading Content */}
      <div
        className={cn(
          "flex items-start @[680px]/banner:items-center gap-3 min-w-0 flex-1",
          (dismissible || onDismiss) && "pr-8 @[560px]/banner:pr-0"
        )}
      >
        {showIcon && (
          <div
            data-slot="banner-icon"
            aria-hidden="true"
            className="shrink-0 flex items-center justify-center pt-0.5 @[680px]/banner:pt-0"
          >
            {icon ? icon : <HaloIcon icon={DefaultIcon} size="md" strokeWidth={1.75} />}
          </div>
        )}

        <div
          data-slot="banner-body"
          className="flex-1 min-w-0 flex flex-col @[680px]/banner:flex-row @[680px]/banner:items-center @[680px]/banner:justify-between gap-2 @[680px]/banner:gap-4"
        >
          {children}
        </div>
      </div>

      {/* Dismiss Button: Pinned to top-right on micro containers, inline on wider screens */}
      {(dismissible || onDismiss) && (
        <button
          type="button"
          data-slot="banner-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss banner"
          className={cn(
            "absolute top-2.5 right-2.5 @[560px]/banner:static @[560px]/banner:top-auto @[560px]/banner:right-auto",
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
 * 2. BANNER TITLE
 * High-contrast semantic heading communicating the announcement subject.
 * ----------------------------------------------------------------------- */

export function BannerTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="banner-title"
      className={cn(
        "font-semibold text-sm leading-snug tracking-tight text-foreground break-words min-w-0",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:opacity-80",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. BANNER DESCRIPTION
 * Explanatory context supporting formatted text, bullet highlights, and links.
 * ----------------------------------------------------------------------- */

export function BannerDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-description"
      className={cn(
        "text-xs @[560px]/banner:text-sm text-muted-foreground leading-relaxed break-words min-w-0",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:text-foreground",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. BANNER CONTENT
 * Coordinated title and description wrapper with responsive inline/stacked flow.
 * ----------------------------------------------------------------------- */

export function BannerContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-content"
      className={cn(
        "flex flex-col @[680px]/banner:flex-row @[680px]/banner:items-center gap-1 @[680px]/banner:gap-2.5 min-w-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. BANNER ACTION
 * Action slot for CTA buttons or links that reflows automatically on narrow screens.
 * ----------------------------------------------------------------------- */

export function BannerAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-action"
      className={cn(
        "shrink-0 flex items-center flex-wrap gap-2 pt-1.5 @[680px]/banner:pt-0 self-start @[680px]/banner:self-center max-w-full",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. BANNER ICON (OPTIONAL EXPLICIT PRIMITIVE)
 * ----------------------------------------------------------------------- */

export function BannerIcon({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="banner-icon"
      aria-hidden="true"
      className={cn("shrink-0 inline-flex items-center justify-center text-current", className)}
      {...props}
    >
      {children}
    </span>
  );
}
