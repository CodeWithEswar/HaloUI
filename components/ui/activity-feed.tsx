import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type ActivityFeedVariant = "default" | "outline" | "glass" | "ghost";
export type ActivityFeedDensity = "default" | "compact" | "relaxed";

export interface ActivityFeedProps extends React.ComponentProps<"div"> {
  /**
   * Visual framing variant for the outer activity feed container:
   * - "default": Transparent unbordered container with subtle spacing.
   * - "outline": Crisp structural border framing the activity feed.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular reflection.
   * - "ghost": Borderless, edge-to-edge unstyled layout.
   * @default "default"
   */
  variant?: ActivityFeedVariant;
  /**
   * Spatial density scale controlling vertical gap between activity items:
   * - "default": Standard 16px item gap for general dashboards and workspaces.
   * - "compact": High-density 10px item gap for tight sidebars and notification drawers.
   * - "relaxed": Spacious 24px item gap for social timelines and changelogs.
   * @default "default"
   */
  density?: ActivityFeedDensity;
  /**
   * HTML role for semantic assistive technology traversal.
   * @default "feed"
   */
  role?: string;
}

export interface ActivityFeedItemProps extends React.ComponentProps<"article"> {
  /**
   * Whether the entire row has an intentional interactive link or action.
   * By default, ActivityFeed items are static non-clickable presentation rows.
   * @default false
   */
  interactive?: boolean;
}

export interface ActivityFeedIndicatorProps extends React.ComponentProps<"div"> {
  /**
   * Optional custom indicator or icon container.
   */
  icon?: React.ReactNode;
}

export interface ActivityFeedContentProps extends React.ComponentProps<"div"> {}
export interface ActivityFeedHeaderProps extends React.ComponentProps<"div"> {}
export interface ActivityFeedTitleProps extends React.ComponentProps<"p"> {}
export interface ActivityFeedTimestampProps extends React.ComponentProps<"time"> {}
export interface ActivityFeedMetadataProps extends React.ComponentProps<"div"> {}
export interface ActivityFeedActionsProps extends React.ComponentProps<"div"> {}
export interface ActivityFeedSeparatorProps extends React.ComponentProps<"div"> {}

/* -------------------------------------------------------------------------
 * 1. ROOT ACTIVITY FEED
 * Scannable recent actions and events stream.
 * Features container-aware responsive reflow and restrained Liquid Glass outer shell.
 * ----------------------------------------------------------------------- */

export function ActivityFeed({
  className,
  variant = "default",
  density = "default",
  role = "feed",
  children,
  ...props
}: ActivityFeedProps) {
  return (
    <div
      role={role}
      data-slot="activity-feed"
      data-variant={variant}
      data-density={density}
      className={cn(
        // Responsive container query boundary and group styling
        "@container/activity-feed group/activity-feed relative flex w-full flex-col min-w-0 text-foreground",
        "transition-colors duration-150",

        // Outer surface variants (Single consolidated boundary, no per-row glass)
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
        density === "default" && "gap-4",
        density === "compact" && "gap-2.5",
        density === "relaxed" && "gap-6",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. ACTIVITY FEED ITEM
 * Individual recent activity event entry. Static by default to preserve
 * native link and button accessibility.
 * ----------------------------------------------------------------------- */

export function ActivityFeedItem({
  className,
  interactive = false,
  children,
  ...props
}: ActivityFeedItemProps) {
  return (
    <article
      data-slot="activity-feed-item"
      data-interactive={interactive ? "true" : undefined}
      className={cn(
        "group/activity-feed-item relative flex items-start gap-3 sm:gap-3.5 min-w-0 w-full rounded-xl transition-all duration-150",
        // Flat transparent row background to prevent heavy glass-on-glass noise
        "bg-transparent text-foreground p-1 sm:p-1.5",

        // Optional interactive row state
        interactive && [
          "cursor-pointer select-none hover:bg-muted/40 dark:hover:bg-white/[0.04]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ],

        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}

/* -------------------------------------------------------------------------
 * 3. ACTIVITY FEED INDICATOR / MEDIA
 * Leading slot for Avatar, Service Icon, or State Indicator.
 * Preserves 100% media fidelity with zero refraction or distortion.
 * ----------------------------------------------------------------------- */

export function ActivityFeedIndicator({
  className,
  icon,
  children,
  ...props
}: ActivityFeedIndicatorProps) {
  return (
    <div
      data-slot="activity-feed-indicator"
      className={cn(
        "relative shrink-0 flex items-center justify-center select-none mt-0.5",
        // Default styling for glyph or standalone icon indicator
        !children && icon && [
          "size-7 sm:size-8 rounded-full border border-border/70 bg-muted/40 dark:bg-card/60 text-muted-foreground",
          "[&_svg]:size-3.5 sm:[&_svg]:size-4",
        ],
        className
      )}
      {...props}
    >
      {children ?? icon}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 4. ACTIVITY FEED CONTENT
 * Event sentence, supporting metadata, code blocks, and action container.
 * ----------------------------------------------------------------------- */

export function ActivityFeedContent({
  className,
  children,
  ...props
}: ActivityFeedContentProps) {
  return (
    <div
      data-slot="activity-feed-content"
      className={cn(
        "flex flex-col flex-1 min-w-0 text-sm leading-normal text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 5. ACTIVITY FEED HEADER
 * Responsive flex layout coordinating event sentence, badges, and timestamp.
 * ----------------------------------------------------------------------- */

export function ActivityFeedHeader({
  className,
  children,
  ...props
}: ActivityFeedHeaderProps) {
  return (
    <div
      data-slot="activity-feed-header"
      className={cn(
        // Fluid responsive reflow:
        // On narrow viewports/sidebars: wraps timestamp below without clipping actor
        // On wide containers: cleanly spaces title from timestamp
        "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 min-w-0 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 6. ACTIVITY FEED TITLE / SENTENCE
 * Natural language event sentence ("Eswar deployed API Gateway to production").
 * ----------------------------------------------------------------------- */

export function ActivityFeedTitle({
  className,
  children,
  ...props
}: ActivityFeedTitleProps) {
  return (
    <p
      data-slot="activity-feed-title"
      className={cn(
        "text-xs sm:text-sm font-normal text-foreground break-words min-w-0 leading-snug",
        // Style emphasis tags or links within the event sentence
        "[&_strong]:font-semibold [&_strong]:text-foreground [&_code]:font-mono [&_code]:text-xs [&_code]:bg-muted/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------
 * 7. ACTIVITY FEED TIMESTAMP
 * Semantic timestamp (<time>) with mono or subtle text styling.
 * ----------------------------------------------------------------------- */

export function ActivityFeedTimestamp({
  className,
  children,
  ...props
}: ActivityFeedTimestampProps) {
  return (
    <time
      data-slot="activity-feed-timestamp"
      className={cn(
        "text-[11px] sm:text-xs font-mono text-muted-foreground/75 shrink-0 select-none whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </time>
  );
}

/* -------------------------------------------------------------------------
 * 8. ACTIVITY FEED METADATA
 * Contextual supporting content: commit hashes, pull request diffs,
 * review comments, or tag clusters.
 * ----------------------------------------------------------------------- */

export function ActivityFeedMetadata({
  className,
  children,
  ...props
}: ActivityFeedMetadataProps) {
  return (
    <div
      data-slot="activity-feed-metadata"
      className={cn(
        "mt-1.5 text-xs text-muted-foreground leading-relaxed break-words min-w-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 9. ACTIVITY FEED ACTIONS
 * Contextual action buttons (View PR, Rollback, Comment, Approve).
 * ----------------------------------------------------------------------- */

export function ActivityFeedActions({
  className,
  children,
  ...props
}: ActivityFeedActionsProps) {
  return (
    <div
      data-slot="activity-feed-actions"
      className={cn(
        "mt-2 flex flex-wrap items-center gap-2 min-w-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 10. ACTIVITY FEED SEPARATOR
 * Hairline boundary separating stacked activity items in dense configurations.
 * ----------------------------------------------------------------------- */

export function ActivityFeedSeparator({
  className,
  ...props
}: ActivityFeedSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="activity-feed-separator"
      className={cn(
        "my-1 h-px w-full bg-border/40 dark:bg-white/[0.06]",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND ATTACHMENTS
 * ----------------------------------------------------------------------- */

ActivityFeed.Item = ActivityFeedItem;
ActivityFeed.Indicator = ActivityFeedIndicator;
ActivityFeed.Content = ActivityFeedContent;
ActivityFeed.Header = ActivityFeedHeader;
ActivityFeed.Title = ActivityFeedTitle;
ActivityFeed.Timestamp = ActivityFeedTimestamp;
ActivityFeed.Metadata = ActivityFeedMetadata;
ActivityFeed.Actions = ActivityFeedActions;
ActivityFeed.Separator = ActivityFeedSeparator;
