import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  MinusSignIcon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type MetricVariant = "default" | "muted" | "glass";
export type MetricSize = "sm" | "default" | "lg" | "xl" | "2xl";
export type MetricLayout = "auto" | "stacked" | "inline";
export type MetricAlignment = "left" | "center" | "right";
export type MetricTrendDirection = "up" | "down" | "neutral";
export type MetricTrendSentiment = "positive" | "negative" | "neutral";

export interface MetricProps extends React.ComponentProps<"div"> {
  /**
   * Visual framing variant:
   * - "default": Transparent base, optically quiet for embedding in Cards, tables, or dashboards.
   * - "muted": Soft, low-contrast tinted background.
   * - "glass": Restrained subtle HaloUI liquid glass outer boundary when rendered standalone.
   * @default "default"
   */
  variant?: MetricVariant;
  /**
   * Typography and scale tier:
   * - "sm": Compact metric (20-24px) for dense data displays and table cells.
   * - "default": Standard metric (24-30px) for general dashboard and detail sections.
   * - "lg": Prominent metric (30-36px) for section highlights.
   * - "xl": Large metric (36-48px) for dashboard hero sections.
   * - "2xl": Showcase metric (48-60px) for high-impact analytics hero displays.
   * @default "default"
   */
  size?: MetricSize;
  /**
   * Arrangement of label, value, and description:
   * - "auto": Responsive container-aware reflow (stacked on narrow containers).
   * - "stacked": Strict vertical column hierarchy.
   * - "inline": Horizontal alignment with baseline-aligned value and label.
   * @default "stacked"
   */
  layout?: MetricLayout;
  /**
   * Horizontal content alignment:
   * - "left": Start-aligned (default).
   * - "center": Centered alignment for hero cards or solitary badges.
   * - "right": End-aligned for tabular or financial columns.
   * @default "left"
   */
  alignment?: MetricAlignment;
  /**
   * Optional shorthand numeric or formatted string value.
   * Strictly preserves 0 and negative values.
   */
  value?: React.ReactNode;
  /**
   * Optional shorthand label.
   */
  label?: React.ReactNode;
  /**
   * Optional shorthand unit (e.g. "ms", "%", "GB").
   */
  unit?: React.ReactNode;
  /**
   * Optional shorthand description text.
   */
  description?: React.ReactNode;
}

export interface MetricLabelProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface MetricValueProps extends React.ComponentProps<"div"> {
  /**
   * Raw or formatted numeric value.
   * NOTE: 0 is explicitly supported and rendered as a legitimate metric.
   */
  value?: React.ReactNode;
}

export interface MetricUnitProps extends React.ComponentProps<"span"> {
  /**
   * Position relative to the numeric value:
   * - "suffix": Placed after the number (default, e.g. "342 ms", "99.9%").
   * - "prefix": Placed before the number (e.g. "$", "₹").
   * @default "suffix"
   */
  position?: "prefix" | "suffix";
}

export interface MetricDescriptionProps extends React.ComponentProps<"p"> {}

export interface MetricDeltaProps extends React.ComponentProps<"span"> {
  /**
   * Geometric direction of the delta trend:
   * - "up": Upward trending arrow.
   * - "down": Downward trending arrow.
   * - "neutral": Horizontal flat bar.
   * @default "neutral"
   */
  direction?: MetricTrendDirection;
  /**
   * Decoupled business sentiment:
   * - "positive": Favorable semantic tone (green).
   * - "negative": Unfavorable semantic tone (red/amber).
   * - "neutral": Muted tone without value judgment.
   * Note: Metric never assumes "up" is positive or "down" is negative.
   * @default "neutral"
   */
  sentiment?: MetricTrendSentiment;
}

export interface MetricGroupProps extends React.ComponentProps<"div"> {
  /**
   * Number of columns on wide containers:
   * - 1 to 6 columns with automatic responsive collapse.
   * @default 3
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Density / spacing between metric cells:
   * - "default": 24px gap.
   * - "compact": 16px gap.
   * - "relaxed": 32px gap.
   * @default "default"
   */
  density?: "compact" | "default" | "relaxed";
}

/* -------------------------------------------------------------------------
 * 1. ROOT METRIC COMPONENT
 * Standalone numeric metric presentation primitive.
 * Pure Server Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function Metric({
  className,
  variant = "default",
  size = "default",
  layout = "stacked",
  alignment = "left",
  value,
  label,
  unit,
  description,
  children,
  ...props
}: MetricProps) {
  // Support both shorthand props and compound subcomponents
  const hasShorthand = value !== undefined || label !== undefined;

  return (
    <div
      data-slot="metric"
      data-variant={variant}
      data-size={size}
      data-layout={layout}
      data-alignment={alignment}
      className={cn(
        // Container query boundary for strict container-aware responsiveness
        "@container/metric group/metric relative flex min-w-0 transition-colors duration-150",

        // Layout modes
        layout === "stacked" && "flex-col gap-1",
        layout === "inline" && "flex-wrap items-baseline gap-x-3 gap-y-1",
        layout === "auto" && "flex-col @[280px]/metric:flex-row @[280px]/metric:items-baseline @[280px]/metric:justify-between gap-1 @[280px]/metric:gap-3",

        // Horizontal alignment
        alignment === "left" && "items-start text-left",
        alignment === "center" && "items-center text-center justify-center",
        alignment === "right" && "items-end text-right",

        // Standalone Liquid Glass Material (Extremely restrained, never a heavy card)
        variant === "default" && "bg-transparent text-foreground",
        variant === "muted" && "rounded-xl bg-muted/40 dark:bg-white/[0.03] p-3 text-foreground border border-transparent",
        variant === "glass" && [
          "rounded-xl border border-border/70 dark:border-white/12 p-3.5",
          "bg-card/60 dark:bg-card/30 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]",
        ],

        className
      )}
      {...props}
    >
      {hasShorthand ? (
        <>
          {label && <MetricLabel>{label}</MetricLabel>}
          <div className="flex items-baseline gap-1 min-w-0">
            {unit && <MetricUnit position="prefix">{unit}</MetricUnit>}
            <MetricValue value={value} />
            {unit && <MetricUnit position="suffix">{unit}</MetricUnit>}
          </div>
          {description && <MetricDescription>{description}</MetricDescription>}
          {children}
        </>
      ) : (
        children
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. METRIC LABEL
 * Supporting descriptive context explaining what is being measured.
 * ----------------------------------------------------------------------- */

export function MetricLabel({
  className,
  children,
  ...props
}: MetricLabelProps) {
  return (
    <div
      data-slot="metric-label"
      className={cn(
        "font-medium text-muted-foreground select-none leading-normal min-w-0 truncate",
        // Size-aware label hierarchy
        "group-data-[size=sm]/metric:text-xs",
        "group-data-[size=default]/metric:text-xs sm:group-data-[size=default]/metric:text-sm",
        "group-data-[size=lg]/metric:text-sm",
        "group-data-[size=xl]/metric:text-sm sm:group-data-[size=xl]/metric:text-base",
        "group-data-[size=2xl]/metric:text-base sm:group-data-[size=2xl]/metric:text-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 3. METRIC VALUE
 * The dominant quantitative numeric visual element.
 * Strictly supports numbers, strings, formatted currency, durations, and zero.
 * NOTE: 0 is explicitly checked and rendered (never coerced by falsy checks).
 * ----------------------------------------------------------------------- */

export function MetricValue({
  className,
  value,
  children,
  ...props
}: MetricValueProps) {
  // Check explicitly for zero or valid value prop; fallback to children
  const displayContent = value !== undefined && value !== null ? value : children;

  return (
    <div
      data-slot="metric-value"
      className={cn(
        // Tabular numeric alignment and heading font weight
        "font-heading font-bold tracking-tight text-foreground tabular-nums min-w-0 leading-none",
        "break-words",

        // Size scaling with fluid container query clamps
        "group-data-[size=sm]/metric:text-xl @[240px]/metric:group-data-[size=sm]/metric:text-2xl",
        "group-data-[size=default]/metric:text-2xl @[240px]/metric:group-data-[size=default]/metric:text-3xl",
        "group-data-[size=lg]/metric:text-3xl @[240px]/metric:group-data-[size=lg]/metric:text-4xl",
        "group-data-[size=xl]/metric:text-3xl @[280px]/metric:group-data-[size=xl]/metric:text-4xl @[360px]/metric:group-data-[size=xl]/metric:text-5xl font-extrabold",
        "group-data-[size=2xl]/metric:text-4xl @[280px]/metric:group-data-[size=2xl]/metric:text-5xl @[420px]/metric:group-data-[size=2xl]/metric:text-6xl font-extrabold",

        className
      )}
      {...props}
    >
      {displayContent}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 4. METRIC UNIT
 * Measurement unit notation (e.g. "ms", "GB", "%", "req/s").
 * Kept semantically separate from numeric value to preserve tabular numbers.
 * ----------------------------------------------------------------------- */

export function MetricUnit({
  className,
  position = "suffix",
  children,
  ...props
}: MetricUnitProps) {
  return (
    <span
      data-slot="metric-unit"
      data-position={position}
      className={cn(
        "font-sans font-medium text-muted-foreground select-none leading-none",
        // Proportional sizing based on parent metric size
        "group-data-[size=sm]/metric:text-xs",
        "group-data-[size=default]/metric:text-xs sm:group-data-[size=default]/metric:text-sm",
        "group-data-[size=lg]/metric:text-sm sm:group-data-[size=lg]/metric:text-base",
        "group-data-[size=xl]/metric:text-base sm:group-data-[size=xl]/metric:text-lg",
        "group-data-[size=2xl]/metric:text-lg sm:group-data-[size=2xl]/metric:text-xl",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * 5. METRIC DESCRIPTION
 * Small secondary metadata or timeframe descriptor.
 * ----------------------------------------------------------------------- */

export function MetricDescription({
  className,
  children,
  ...props
}: MetricDescriptionProps) {
  return (
    <p
      data-slot="metric-description"
      className={cn(
        "text-xs text-muted-foreground/80 leading-relaxed min-w-0",
        "group-data-[size=sm]/metric:text-[11px]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------
 * 6. METRIC DELTA
 * Contextual change indicator with decoupled direction and business sentiment.
 * ----------------------------------------------------------------------- */

export function MetricDelta({
  className,
  direction = "neutral",
  sentiment = "neutral",
  children,
  ...props
}: MetricDeltaProps) {
  return (
    <span
      data-slot="metric-delta"
      data-direction={direction}
      data-sentiment={sentiment}
      className={cn(
        "inline-flex items-center gap-1 font-mono text-xs font-semibold select-none leading-none",

        // Decoupled sentiment styling (direction does not dictate positive/negative)
        sentiment === "positive" && "text-emerald-600 dark:text-emerald-400",
        sentiment === "negative" && "text-rose-600 dark:text-rose-400",
        sentiment === "neutral" && "text-muted-foreground",

        className
      )}
      {...props}
    >
      {direction === "up" && (
        <HaloIcon icon={ArrowUp01Icon} size={13} className="shrink-0 stroke-[2.5]" />
      )}
      {direction === "down" && (
        <HaloIcon icon={ArrowDown01Icon} size={13} className="shrink-0 stroke-[2.5]" />
      )}
      {direction === "neutral" && (
        <HaloIcon icon={MinusSignIcon} size={13} className="shrink-0" />
      )}
      <span>{children}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------
 * 7. METRIC GROUP
 * Container for arranging multiple Metric instances into responsive grids/ribbons.
 * ----------------------------------------------------------------------- */

export function MetricGroup({
  className,
  columns = 3,
  density = "default",
  children,
  ...props
}: MetricGroupProps) {
  return (
    <div
      data-slot="metric-group"
      data-columns={columns}
      data-density={density}
      className={cn(
        "grid w-full min-w-0",

        // Grid columns with automatic responsive collapse
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        columns === 5 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        columns === 6 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",

        // Density gaps
        density === "compact" && "gap-3",
        density === "default" && "gap-4 sm:gap-6",
        density === "relaxed" && "gap-6 sm:gap-8",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND ATTACHMENTS
 * ----------------------------------------------------------------------- */

Metric.Label = MetricLabel;
Metric.Value = MetricValue;
Metric.Unit = MetricUnit;
Metric.Description = MetricDescription;
Metric.Delta = MetricDelta;
Metric.Group = MetricGroup;

