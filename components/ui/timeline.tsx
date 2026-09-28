import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type TimelineVariant = "default" | "outline" | "glass" | "ghost";
export type TimelineDensity = "default" | "compact" | "relaxed";
export type TimelineMarkerTone =
  | "default"
  | "primary"
  | "positive"
  | "warning"
  | "critical"
  | "info"
  | "ghost";

export interface TimelineProps extends React.ComponentProps<"ol"> {
  /**
   * Visual framing variant for the outer timeline container:
   * - "default": Clean unbordered transparent container with subtle structure.
   * - "outline": Crisp hairline border framing the chronological feed.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular reflection.
   * - "ghost": Pure edge-to-edge unbordered layout.
   * @default "default"
   */
  variant?: TimelineVariant;
  /**
   * Spatial density scale controlling vertical and horizontal padding across items and connectors:
   * - "default": Standard 24px vertical item gap with 10px marker.
   * - "compact": High-density 16px item gap with 8px marker for dense audit logs and sidebars.
   * - "relaxed": Spacious 36px item gap with 12px marker for major milestones and marketing.
   * @default "default"
   */
  density?: TimelineDensity;
}

export interface TimelineItemProps extends React.ComponentProps<"li"> {
  /**
   * Explicit status or milestone indicator state.
   */
  tone?: TimelineMarkerTone;
  /**
   * Flag indicating whether this item is the terminal milestone in the sequence.
   * When true, suppresses the trailing connector line.
   * @default false
   */
  isLast?: boolean;
}

export interface TimelineMarkerProps extends React.ComponentProps<"div"> {
  /**
   * Semantic tone for marker background, border, and specular catch:
   * @default "default"
   */
  tone?: TimelineMarkerTone;
  /**
   * Optional custom icon or indicator element placed inside the marker.
   */
  icon?: React.ReactNode;
}

export interface TimelineConnectorProps extends React.ComponentProps<"div"> {
  /**
   * Custom style variant or status of the connector rail.
   */
  tone?: TimelineMarkerTone;
}

export interface TimelineContentProps extends React.ComponentProps<"div"> {}
export interface TimelineHeaderProps extends React.ComponentProps<"div"> {}
export interface TimelineTitleProps extends React.ComponentProps<"h3"> {}
export interface TimelineTimestampProps extends React.ComponentProps<"time"> {}
export interface TimelineDescriptionProps extends React.ComponentProps<"p"> {}

/* -------------------------------------------------------------------------
 * 1. ROOT TIMELINE COMPONENT
 * Semantic ordered chronological event stream (<ol>).
 * Features container-aware responsive reflow and restrained Liquid Glass outer shell.
 * ----------------------------------------------------------------------- */

export function Timeline({
  className,
  variant = "default",
  density = "default",
  children,
  ...props
}: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      data-variant={variant}
      data-density={density}
      className={cn(
        // Responsive container query boundary and group styling
        "@container/timeline group/timeline relative flex w-full flex-col min-w-0 text-foreground list-none p-0 m-0",
        "transition-colors duration-150",

        // Outer surface variants
        variant === "default" && "bg-transparent",
        variant === "outline" && "rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-6 shadow-2xs",
        variant === "ghost" && "border-none bg-transparent shadow-none",
        variant === "glass" && [
          "rounded-2xl border border-border/70 dark:border-white/16",
          "bg-card/75 dark:bg-card/30 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]",
          "p-4 sm:p-6",
        ],

        // Density scale coordination
        density === "default" && "gap-6",
        density === "compact" && "gap-3.5",
        density === "relaxed" && "gap-9",

        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

/* -------------------------------------------------------------------------
 * 2. TIMELINE ITEM
 * Individual chronological event entry (<li>) with grid-aligned marker rail.
 * ----------------------------------------------------------------------- */

export function TimelineItem({
  className,
  tone = "default",
  isLast = false,
  children,
  ...props
}: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      data-tone={tone}
      data-last={isLast ? "true" : undefined}
      className={cn(
        "group/timeline-item relative flex items-start gap-3 sm:gap-4 min-w-0 w-full",
        // When not last item, establish connector coordinate context
        "[&:not(:last-child)_>[data-slot=timeline-rail]>[data-slot=timeline-connector]]:block",
        isLast && "[&_>[data-slot=timeline-rail]>[data-slot=timeline-connector]]:hidden",
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}

/* -------------------------------------------------------------------------
 * 3. TIMELINE RAIL & CONNECTOR
 * Visual vertical sequence line connecting markers through time.
 * ----------------------------------------------------------------------- */

export function TimelineRail({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-rail"
      className={cn(
        "relative flex flex-col items-center shrink-0 self-stretch min-w-[24px] sm:min-w-[28px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineConnector({
  className,
  tone = "default",
  ...props
}: TimelineConnectorProps) {
  return (
    <div
      data-slot="timeline-connector"
      aria-hidden="true"
      className={cn(
        "w-px flex-1 my-1.5 transition-colors duration-150",
        // Subtle hairline connector without loud neon glow
        tone === "default" && "bg-border/80 dark:bg-border/60",
        tone === "primary" && "bg-primary/40 dark:bg-primary/30",
        tone === "positive" && "bg-emerald-500/40 dark:bg-emerald-500/30",
        tone === "warning" && "bg-amber-500/40 dark:bg-amber-500/30",
        tone === "critical" && "bg-rose-500/40 dark:bg-rose-500/30",
        tone === "info" && "bg-sky-500/40 dark:bg-sky-500/30",
        tone === "ghost" && "bg-transparent",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. TIMELINE MARKER
 * Visual milestone anchor, status point, or icon container.
 * Uses compact restrained Halo material without expensive per-item refraction.
 * ----------------------------------------------------------------------- */

export function TimelineMarker({
  className,
  tone = "default",
  icon,
  children,
  ...props
}: TimelineMarkerProps) {
  return (
    <div
      data-slot="timeline-marker"
      data-tone={tone}
      aria-hidden="true"
      className={cn(
        "relative z-10 flex items-center justify-center shrink-0 rounded-full transition-all duration-150",
        // Standard dot when no icon/children
        !icon && !children && [
          "h-2.5 w-2.5 sm:h-3 sm:w-3 mt-1.5 ring-4 ring-background",
          tone === "default" && "bg-muted-foreground/60 border border-border",
          tone === "primary" && "bg-primary shadow-xs shadow-primary/20",
          tone === "positive" && "bg-emerald-500 shadow-xs shadow-emerald-500/20",
          tone === "warning" && "bg-amber-500 shadow-xs shadow-amber-500/20",
          tone === "critical" && "bg-rose-500 shadow-xs shadow-rose-500/20",
          tone === "info" && "bg-sky-500 shadow-xs shadow-sky-500/20",
          tone === "ghost" && "bg-background border border-border/80",
        ],

        // Icon or avatar badge container
        (icon || children) && [
          "h-7 w-7 sm:h-8 sm:w-8 mt-0.5 text-xs font-medium border shadow-2xs",
          tone === "default" && "bg-card/90 border-border/80 text-foreground",
          tone === "primary" && "bg-primary/10 border-primary/30 text-primary",
          tone === "positive" && "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
          tone === "warning" && "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
          tone === "critical" && "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
          tone === "info" && "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400",
          tone === "ghost" && "bg-background/80 border-border/60 text-muted-foreground",
        ],

        className
      )}
      {...props}
    >
      {icon ?? children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 5. TIMELINE CONTENT & HEADER
 * Event narrative, metadata, timestamp, and actions container.
 * ----------------------------------------------------------------------- */

export function TimelineContent({
  className,
  children,
  ...props
}: TimelineContentProps) {
  return (
    <div
      data-slot="timeline-content"
      className={cn(
        "flex flex-col flex-1 min-w-0 pb-2 text-sm text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineHeader({
  className,
  children,
  ...props
}: TimelineHeaderProps) {
  return (
    <div
      data-slot="timeline-header"
      className={cn(
        // Container-aware responsive flex layout:
        // On narrow containers/phones: wraps naturally without collision
        // On wide containers/desktops: separates title and timestamp gracefully
        "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 min-w-0 w-full mb-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineTitle({
  className,
  children,
  ...props
}: TimelineTitleProps) {
  return (
    <h3
      data-slot="timeline-title"
      className={cn(
        "text-sm sm:text-base font-semibold text-foreground tracking-tight break-words min-w-0 leading-snug",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TimelineTimestamp({
  className,
  children,
  ...props
}: TimelineTimestampProps) {
  return (
    <time
      data-slot="timeline-timestamp"
      className={cn(
        "text-xs font-mono text-muted-foreground/80 shrink-0 select-none",
        className
      )}
      {...props}
    >
      {children}
    </time>
  );
}

export function TimelineDescription({
  className,
  children,
  ...props
}: TimelineDescriptionProps) {
  return (
    <p
      data-slot="timeline-description"
      className={cn(
        "text-xs sm:text-sm text-muted-foreground leading-relaxed break-words min-w-0 mt-1 [&:not(:last-child)]:mb-2",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND ATTACHMENTS
 * ----------------------------------------------------------------------- */

Timeline.Item = TimelineItem;
Timeline.Rail = TimelineRail;
Timeline.Marker = TimelineMarker;
Timeline.Connector = TimelineConnector;
Timeline.Content = TimelineContent;
Timeline.Header = TimelineHeader;
Timeline.Title = TimelineTitle;
Timeline.Timestamp = TimelineTimestamp;
Timeline.Description = TimelineDescription;
