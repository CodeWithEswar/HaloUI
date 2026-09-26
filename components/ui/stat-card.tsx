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
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type StatTrendDirection = "up" | "down" | "neutral";
export type StatTrendSentiment = "positive" | "negative" | "neutral";

export interface StatCardProps extends CardProps {
  // Reuses all Card composition infrastructure
}

/* -------------------------------------------------------------------------
 * 1. ROOT STAT CARD COMPONENT
 * Single metric summary built directly on Card architecture.
 * Server-Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function StatCard({
  className,
  size = "default",
  intensity = "subtle",
  variant = "default",
  interactive = false,
  ...props
}: StatCardProps) {
  return (
    <Card
      data-slot="stat-card"
      size={size}
      intensity={intensity}
      variant={variant}
      interactive={interactive}
      className={cn("group/stat-card min-w-0 justify-between", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. STAT CARD HEADER
 * Structural row arranging the metric label and optional category icon or action.
 * ----------------------------------------------------------------------- */

export interface StatCardHeaderProps extends React.ComponentProps<"div"> {}

export function StatCardHeader({ className, ...props }: StatCardHeaderProps) {
  return (
    <div
      data-slot="stat-card-header"
      className={cn(
        "flex items-center justify-between gap-2 px-(--card-spacing) min-w-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. STAT CARD LABEL
 * Concise metric label explaining what the measurable value represents.
 * ----------------------------------------------------------------------- */

export interface StatCardLabelProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  as?: "span" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

export function StatCardLabel({
  className,
  asChild = false,
  as = "span",
  ...props
}: StatCardLabelProps) {
  const Comp = as as any;

  return (
    <Comp
      data-slot="stat-card-label"
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
 * 4. STAT CARD ICON
 * Category indicator container with restrained material styling.
 * Prohibits distracting glowing glass orbs in dense dashboard interfaces.
 * ----------------------------------------------------------------------- */

export interface StatCardIconProps extends React.ComponentProps<"div"> {}

export function StatCardIcon({ className, ...props }: StatCardIconProps) {
  return (
    <div
      data-slot="stat-card-icon"
      className={cn(
        "flex size-7 sm:size-8 items-center justify-center rounded-lg bg-muted/40 text-muted-foreground shrink-0 border border-border/40",
        "group-data-[size=sm]/card:size-6 sm:group-data-[size=sm]/card:size-7",
        "group-data-[size=lg]/card:size-9 sm:group-data-[size=lg]/card:size-10",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. STAT CARD ACTION
 * Optional action or menu slot positioned in the header.
 * ----------------------------------------------------------------------- */

export interface StatCardActionProps extends React.ComponentProps<"div"> {}

export function StatCardAction({ className, ...props }: StatCardActionProps) {
  return (
    <div
      data-slot="stat-card-action"
      className={cn("flex items-center gap-1 shrink-0 -mr-1", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. STAT CARD VALUE
 * The dominant visual quantitative metric.
 * Strictly supports numbers, strings, formatted currency, durations, and zero.
 * NOTE: Never coerces 0 to falsy.
 * ----------------------------------------------------------------------- */

export interface StatCardValueProps extends React.ComponentProps<"div"> {}

export function StatCardValue({
  className,
  children,
  ...props
}: StatCardValueProps) {
  return (
    <div
      data-slot="stat-card-value"
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
 * 7. STAT CARD FOOTER
 * Supporting region for delta trends, baseline periods, and comparisons.
 * ----------------------------------------------------------------------- */

export interface StatCardFooterProps extends React.ComponentProps<"div"> {}

export function StatCardFooter({ className, ...props }: StatCardFooterProps) {
  return (
    <div
      data-slot="stat-card-footer"
      className={cn(
        "flex flex-wrap items-center gap-1.5 px-(--card-spacing) text-xs text-muted-foreground min-w-0 leading-normal",
        "group-data-[size=sm]/card:text-[11px]",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 8. STAT CARD TREND
 * Directional and sentiment indicator.
 * CRITICAL ARCHITECTURAL MANDATE: DIRECTION != SENTIMENT
 * Lower latency is good (down = positive). Lower revenue is bad (down = negative).
 * Direction and sentiment are deliberately decoupled.
 * ----------------------------------------------------------------------- */

export interface StatCardTrendProps extends React.ComponentProps<"span"> {
  /**
   * Geometric direction of change. Controls the icon arrow.
   * @default "neutral"
   */
  direction?: StatTrendDirection;
  /**
   * Business/semantic desirability of the change. Controls color tokens.
   * @default "neutral"
   */
  sentiment?: StatTrendSentiment;
  /**
   * Accessible description for assistive technology.
   */
  srLabel?: string;
}

export function StatCardTrend({
  direction = "neutral",
  sentiment = "neutral",
  srLabel,
  className,
  children,
  ...props
}: StatCardTrendProps) {
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
      data-slot="stat-card-trend"
      data-direction={direction}
      data-sentiment={sentiment}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium text-xs tabular-nums border",
        // Semantic Sentiment Color Mapping (Decoupled from arrow direction)
        sentiment === "positive" && [
          "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        ],
        sentiment === "negative" && [
          "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-400",
        ],
        sentiment === "neutral" && [
          "border-border/60 bg-muted/40 text-muted-foreground",
        ],
        className
      )}
      {...props}
    >
      <HaloIcon icon={IconComponent} size={12} className="shrink-0" />
      <span>{children}</span>
      <span className="sr-only">({defaultSrLabel})</span>
    </span>
  );
}

/* -------------------------------------------------------------------------
 * 9. STAT CARD DESCRIPTION
 * Supporting description or baseline comparison text (e.g. "vs last month").
 * ----------------------------------------------------------------------- */

export interface StatCardDescriptionProps extends React.ComponentProps<"span"> {}

export function StatCardDescription({
  className,
  ...props
}: StatCardDescriptionProps) {
  return (
    <span
      data-slot="stat-card-description"
      className={cn("text-muted-foreground truncate", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND & SUBCOMPONENT EXPORTS
 * ----------------------------------------------------------------------- */

StatCard.Header = StatCardHeader;
StatCard.Label = StatCardLabel;
StatCard.Icon = StatCardIcon;
StatCard.Action = StatCardAction;
StatCard.Value = StatCardValue;
StatCard.Footer = StatCardFooter;
StatCard.Trend = StatCardTrend;
StatCard.Description = StatCardDescription;

export {
  StatCard as Root,
  StatCardHeader as Header,
  StatCardLabel as Label,
  StatCardIcon as Icon,
  StatCardAction as Action,
  StatCardValue as Value,
  StatCardFooter as Footer,
  StatCardTrend as Trend,
  StatCardDescription as Description,
};
