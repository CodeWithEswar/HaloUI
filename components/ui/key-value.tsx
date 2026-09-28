import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type KeyValueVariant = "default" | "muted" | "glass";
export type KeyValueLayout = "auto" | "stacked" | "inline";
export type KeyValueDensity = "default" | "compact" | "relaxed";

export interface KeyValueProps extends React.ComponentProps<"div"> {
  /**
   * Visual framing variant:
   * - "default": Transparent base, optically calm for dense repeated metadata rows.
   * - "muted": Soft, low-contrast tinted background.
   * - "glass": Restrained subtle HaloUI liquid glass outer boundary when standalone.
   * @default "default"
   */
  variant?: KeyValueVariant;
  /**
   * Layout alignment between label and value:
   * - "auto": Fluid container-aware reflow (inline on wide containers, wraps cleanly when narrow).
   * - "stacked": Label positioned above value.
   * - "inline": Label positioned beside value with space-between alignment.
   * @default "auto"
   */
  layout?: KeyValueLayout;
  /**
   * Spatial density scale controlling vertical and horizontal padding:
   * - "default": Standard 8px padding.
   * - "compact": High-density 4px padding for tight inspector sidebars and tables.
   * - "relaxed": Spacious 12px padding for prominent summary panels.
   * @default "default"
   */
  density?: KeyValueDensity;
}

export interface KeyValueLabelProps extends React.ComponentProps<"span"> {
  /**
   * Optional contextual icon placed before the label.
   */
  icon?: React.ReactNode;
}

export interface KeyValueValueProps extends React.ComponentProps<"span"> {}

export interface KeyValueGroupProps extends React.ComponentProps<"div"> {
  /**
   * Columns distribution on wide viewports:
   * - 1, 2, 3, or 4 grid columns.
   * @default 1
   */
  columns?: 1 | 2 | 3 | 4;
}

/* -------------------------------------------------------------------------
 * 1. ROOT KEY VALUE
 * Compact label/value pair presentation primitive.
 * Server Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function KeyValue({
  className,
  variant = "default",
  layout = "auto",
  density = "default",
  children,
  ...props
}: KeyValueProps) {
  return (
    <div
      data-slot="key-value"
      data-variant={variant}
      data-layout={layout}
      data-density={density}
      className={cn(
        // Responsive container query boundary
        "@container/key-value group/key-value relative flex w-full min-w-0 rounded-lg transition-colors duration-150",

        // Layout alignments
        layout === "auto" && "flex-wrap @[260px]/key-value:flex-nowrap items-baseline justify-between gap-x-3 gap-y-0.5",
        layout === "stacked" && "flex-col items-start gap-0.5",
        layout === "inline" && "flex-row items-baseline justify-between gap-3",

        // Density scale
        density === "default" && "py-1.5 px-2",
        density === "compact" && "py-0.5 px-1.5",
        density === "relaxed" && "py-2.5 px-3",

        // Material Variants (Extremely restrained to prevent noise in repeated metadata)
        variant === "default" && "bg-transparent text-foreground",
        variant === "muted" && "bg-muted/40 dark:bg-white/[0.03] text-foreground border border-transparent",
        variant === "glass" && [
          "border border-border/70 dark:border-white/12",
          "bg-card/60 dark:bg-card/30 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]",
        ],

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. KEY VALUE LABEL
 * Secondary key or title describing the associated value.
 * ----------------------------------------------------------------------- */

export function KeyValueLabel({
  className,
  icon,
  children,
  ...props
}: KeyValueLabelProps) {
  return (
    <span
      data-slot="key-value-label"
      className={cn(
        "flex items-center gap-1.5 text-xs text-muted-foreground font-medium shrink-0 select-none",
        "[&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground/80",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * 3. KEY VALUE VALUE
 * Primary data value slot with safe break-words handling.
 * ----------------------------------------------------------------------- */

export function KeyValueValue({
  className,
  children,
  ...props
}: KeyValueValueProps) {
  return (
    <span
      data-slot="key-value-value"
      className={cn(
        "text-xs sm:text-sm font-medium text-foreground break-words min-w-0 flex items-center gap-1.5",
        // Mono styling for inline codes, URLs, or hashes
        "[&_code]:font-mono [&_code]:text-xs [&_code]:bg-muted/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-xs",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * 4. KEY VALUE GROUP
 * Responsive layout container for organizing multiple KeyValue pairs.
 * ----------------------------------------------------------------------- */

export function KeyValueGroup({
  className,
  columns = 1,
  children,
  ...props
}: KeyValueGroupProps) {
  return (
    <div
      data-slot="key-value-group"
      className={cn(
        "w-full min-w-0 grid gap-1.5 sm:gap-2",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
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

KeyValue.Label = KeyValueLabel;
KeyValue.Value = KeyValueValue;
KeyValue.Group = KeyValueGroup;
