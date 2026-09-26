import * as React from "react";
import {
  Card,
  type CardProps,
  type CardIntensity,
  type CardSize,
  type CardVariant,
} from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  MinusSignIcon,
  Target02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type KpiTrendDirection = "up" | "down" | "neutral";
export type KpiTrendSentiment = "positive" | "negative" | "neutral";
export type KpiTargetSentiment = "positive" | "negative" | "neutral" | "warning";

export interface KpiCardProps extends CardProps {
  // Directly composes Card architecture and tokens
}

/* -------------------------------------------------------------------------
 * 1. ROOT KPI CARD COMPONENT
 * Performance-oriented metric surface with delta, target, and comparison context.
 * Server-Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function KpiCard({
  className,
  size = "default",
  intensity = "subtle",
  variant = "default",
  interactive = false,
  ...props
}: KpiCardProps) {
  return (
    <Card
      data-slot="kpi-card"
      size={size}
      intensity={intensity}
      variant={variant}
      interactive={interactive}
      className={cn("group/kpi-card min-w-0 justify-between", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. KPI CARD HEADER
 * Top structural row arranging the KPI label and optional action/info slots.
 * ----------------------------------------------------------------------- */

export interface KpiCardHeaderProps extends React.ComponentProps<"div"> {}

export function KpiCardHeader({ className, ...props }: KpiCardHeaderProps) {
  return (
    <div
      data-slot="kpi-card-header"
      className={cn(
        "flex items-center justify-between gap-2 px-(--card-spacing) min-w-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. KPI CARD LABEL
 * Concise metric name explaining what is being measured.
 * Supports polymorphic semantic heading tags or inline spans.
 * ----------------------------------------------------------------------- */

export interface KpiCardLabelProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  as?: "span" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

export function KpiCardLabel({
  className,
  asChild = false,
  as = "span",
  ...props
}: KpiCardLabelProps) {
  const Comp = as as any;

  return (
    <Comp
      data-slot="kpi-card-label"
      className={cn(
        "text-xs sm:text-sm font-medium text-muted-foreground truncate select-none leading-normal",
        "group-data-[size=sm]/card:text-xs",
        "group-data-[size=lg]/card:text-base",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. KPI CARD ACTION
 * Optional header slot for info tooltips, period selectors, or overflow menus.
 * ----------------------------------------------------------------------- */

export interface KpiCardActionProps extends React.ComponentProps<"div"> {}

export function KpiCardAction({ className, ...props }: KpiCardActionProps) {
  return (
    <div
      data-slot="kpi-card-action"
      className={cn("flex items-center gap-1 shrink-0 -mr-1", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. KPI CARD VALUE
 * The visually dominant primary quantitative metric.
 * Strictly supports numbers, strings, formatted currency, durations, and zero.
 * NOTE: Never coerces 0 to falsy.
 * ----------------------------------------------------------------------- */

export interface KpiCardValueProps extends React.ComponentProps<"div"> {}

export function KpiCardValue({
  className,
  children,
  ...props
}: KpiCardValueProps) {
  return (
    <div
      data-slot="kpi-card-value"
      className={cn(
        "px-(--card-spacing) font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums min-w-0 truncate leading-none",
        "group-data-[size=sm]/card:text-xl sm:group-data-[size=sm]/card:text-2xl",
        "group-data-[size=lg]/card:text-3xl sm:group-data-[size=lg]/card:text-4xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 6. KPI CARD DELTA & TREND
 * Directional and sentiment indicator.
 * CRITICAL ARCHITECTURAL MANDATE: DIRECTION != SENTIMENT
 * Lower latency is good (down = positive). Higher error rate is bad (up = negative).
 * Direction and sentiment are deliberately decoupled.
 * ----------------------------------------------------------------------- */

export interface KpiCardTrendProps extends React.ComponentProps<"span"> {
  /**
   * Geometric direction of change. Controls the icon arrow.
   * @default "neutral"
   */
  direction?: KpiTrendDirection;
  /**
   * Business/semantic desirability of the change. Controls color tokens.
   * @default "neutral"
   */
  sentiment?: KpiTrendSentiment;
  /**
   * Accessible description for screen readers.
   */
  srLabel?: string;
}

export function KpiCardTrend({
  direction = "neutral",
  sentiment = "neutral",
  srLabel,
  className,
  children,
  ...props
}: KpiCardTrendProps) {
  const IconComponent =
    direction === "up"
      ? ArrowUp01Icon
      : direction === "down"
      ? ArrowDown01Icon
      : MinusSignIcon;

  const defaultSrLabel =
    srLabel ||
    `${sentiment === "positive" ? "Favorable" : sentiment === "negative" ? "Unfavorable" : "Neutral"} trend: ${direction}`;

  return (
    <span
      data-slot="kpi-card-trend"
      data-direction={direction}
      data-sentiment={sentiment}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium text-xs tabular-nums border",
        // Semantic Sentiment Color Mapping (Decoupled from arrow direction)
        sentiment === "positive" && [
          "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
          "dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
        ],
        sentiment === "negative" && [
          "bg-rose-500/10 text-rose-700 border-rose-500/20",
          "dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30",
        ],
        sentiment === "neutral" && [
          "bg-muted/50 text-muted-foreground border-border/50",
          "dark:bg-muted/30 dark:text-muted-foreground dark:border-border/40",
        ],
        className
      )}
      {...props}
    >
      <span className="sr-only">{defaultSrLabel}: </span>
      <HaloIcon icon={IconComponent} size={12} className="shrink-0" aria-hidden="true" />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * 7. KPI CARD COMPARISON
 * Explicit reference context accompanying the delta (e.g. "vs previous 30 days").
 * Prevents ambiguous deltas where users cannot determine what the reference period is.
 * ----------------------------------------------------------------------- */

export interface KpiCardComparisonProps extends React.ComponentProps<"span"> {}

export function KpiCardComparison({
  className,
  ...props
}: KpiCardComparisonProps) {
  return (
    <span
      data-slot="kpi-card-comparison"
      className={cn("text-xs text-muted-foreground truncate leading-normal", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 8. KPI CARD TARGET
 * Target / SLA baseline container arranging reference values and performance status.
 * ----------------------------------------------------------------------- */

export interface KpiCardTargetProps extends React.ComponentProps<"div"> {}

export function KpiCardTarget({ className, ...props }: KpiCardTargetProps) {
  return (
    <div
      data-slot="kpi-card-target"
      className={cn(
        "flex flex-wrap items-center justify-between gap-1.5 px-(--card-spacing) text-xs pt-1.5 border-t border-border/40 min-w-0 leading-normal",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 9. KPI CARD TARGET LABEL & VALUE
 * ----------------------------------------------------------------------- */

export interface KpiCardTargetLabelProps extends React.ComponentProps<"span"> {}

export function KpiCardTargetLabel({
  className,
  children,
  ...props
}: KpiCardTargetLabelProps) {
  return (
    <span
      data-slot="kpi-card-target-label"
      className={cn("inline-flex items-center gap-1 text-muted-foreground font-medium", className)}
      {...props}
    >
      <HaloIcon icon={Target02Icon} size={12} className="shrink-0 opacity-70" aria-hidden="true" />
      {children}
    </span>
  );
}

export interface KpiCardTargetValueProps extends React.ComponentProps<"span"> {}

export function KpiCardTargetValue({
  className,
  ...props
}: KpiCardTargetValueProps) {
  return (
    <span
      data-slot="kpi-card-target-value"
      className={cn("font-semibold text-foreground tabular-nums", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 10. KPI CARD TARGET STATUS
 * Semantic badge indicating target standing (e.g. "Above target", "Within SLA", "At risk").
 * Does NOT assume "higher is better"; consumer explicitly provides or derives sentiment.
 * ----------------------------------------------------------------------- */

export interface KpiCardTargetStatusProps extends React.ComponentProps<"span"> {
  sentiment?: KpiTargetSentiment;
}

export function KpiCardTargetStatus({
  sentiment = "neutral",
  className,
  ...props
}: KpiCardTargetStatusProps) {
  return (
    <span
      data-slot="kpi-card-target-status"
      data-sentiment={sentiment}
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium leading-none border",
        sentiment === "positive" && [
          "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
          "dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
        ],
        sentiment === "negative" && [
          "bg-rose-500/10 text-rose-700 border-rose-500/20",
          "dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30",
        ],
        sentiment === "warning" && [
          "bg-amber-500/10 text-amber-700 border-amber-500/20",
          "dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30",
        ],
        sentiment === "neutral" && [
          "bg-muted/50 text-muted-foreground border-border/50",
          "dark:bg-muted/30 dark:text-muted-foreground dark:border-border/40",
        ],
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 11. KPI CARD PROGRESS
 * Target completion progress bar. Accessible and mathematically bounded.
 * ----------------------------------------------------------------------- */

export interface KpiCardProgressProps extends React.ComponentProps<"div"> {
  /**
   * Progress value (e.g. 0 to 100).
   */
  value: number;
  /**
   * Maximum bound.
   * @default 100
   */
  max?: number;
  /**
   * Semantic color fill for the progress indicator.
   * @default "positive"
   */
  sentiment?: KpiTargetSentiment;
  /**
   * Accessible description of the progressbar.
   */
  "aria-label"?: string;
}

export function KpiCardProgress({
  value,
  max = 100,
  sentiment = "positive",
  className,
  "aria-label": ariaLabel = "Target progress",
  ...props
}: KpiCardProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      data-slot="kpi-card-progress"
      className={cn("px-(--card-spacing) pt-1 min-w-0", className)}
      {...props}
    >
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/60 dark:bg-muted/30"
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            sentiment === "positive" && "bg-emerald-500 dark:bg-emerald-400",
            sentiment === "negative" && "bg-rose-500 dark:bg-rose-400",
            sentiment === "warning" && "bg-amber-500 dark:bg-amber-400",
            sentiment === "neutral" && "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 12. KPI CARD CHART
 * Compact visualization slot for lightweight SVG sparklines or mini trendlines.
 * Does NOT install heavy chart engines; acts as a responsive composition container.
 * ----------------------------------------------------------------------- */

export interface KpiCardChartProps extends React.ComponentProps<"div"> {}

export function KpiCardChart({ className, ...props }: KpiCardChartProps) {
  return (
    <div
      data-slot="kpi-card-chart"
      className={cn(
        "h-10 sm:h-12 w-full px-(--card-spacing) overflow-hidden flex items-center justify-center min-w-0 select-none",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 13. KPI CARD FOOTER
 * Section organizing trend deltas, comparison baselines, and timestamp metadata.
 * ----------------------------------------------------------------------- */

export interface KpiCardFooterProps extends React.ComponentProps<"div"> {}

export function KpiCardFooter({ className, ...props }: KpiCardFooterProps) {
  return (
    <div
      data-slot="kpi-card-footer"
      className={cn(
        "flex flex-wrap items-center gap-1.5 px-(--card-spacing) text-xs text-muted-foreground min-w-0 leading-normal",
        "group-data-[size=sm]/card:text-[11px]",
        className
      )}
      {...props}
    />
  );
}
