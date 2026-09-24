"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * HaloUI ActionBar Variants
 *
 * A contextual container for organizing actions related to the user's current selection or task.
 * Designed as a composition primitive that houses Button, Icon Button, Button Group, and custom controls
 * while preserving their native semantics, accessible focus rings, and activation models.
 */
export const actionBarVariants = cva(
  [
    // Base layout: flexible contextual container
    "relative inline-flex items-center isolate select-none",
    "transition-all duration-200 ease-out",
    // Material Substrate: Balanced HaloUI physical optical body
    "bg-card/85 dark:bg-neutral-900/85 backdrop-blur-xl backdrop-saturate-150",
    "border border-black/[0.12] dark:border-white/[0.16]",
    "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12),0_1px_3px_0_rgba(0,0,0,0.06)]",
    "dark:shadow-[0_8px_32px_-6px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.14)]",
    // Critical: Do NOT use overflow-hidden so child focus rings and dropdown menus are never clipped!
    "overflow-visible",
  ],
  {
    variants: {
      density: {
        compact: "p-1.5 gap-1.5 rounded-xl",
        default: "p-2 sm:p-2.5 gap-2 sm:gap-2.5 rounded-2xl",
        spacious: "p-3 sm:p-3.5 gap-3 sm:gap-3.5 rounded-2xl",
      },
      fullWidth: {
        true: "w-full flex justify-between",
        false: "w-fit max-w-full",
      },
    },
    defaultVariants: {
      density: "default",
      fullWidth: false,
    },
  }
);

export type ActionBarDensity = NonNullable<VariantProps<typeof actionBarVariants>["density"]>;

export interface ActionBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof actionBarVariants> {
  /**
   * Density scaling for inner padding and gap spacing.
   * @default "default"
   */
  density?: ActionBarDensity;
  /**
   * Whether the action bar stretches across 100% of its container width.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * ActionBar — HaloUI Actions 12
 *
 * A contextual structural container that organizes actions related to the user's current selection or task.
 * Note: ActionBar does not own selection or business actions; the consumer supplies contextual controls.
 */
export const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
  ({ className, density = "default", fullWidth = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-orientation="horizontal"
        data-slot="action-bar"
        data-density={density}
        className={cn(actionBarVariants({ density, fullWidth }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ActionBar.displayName = "ActionBar";

export interface ActionBarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional custom alignment within the group.
   */
  align?: "start" | "center" | "end";
}

/**
 * ActionBarGroup
 *
 * Semantic layout cluster for grouping closely related actions within an ActionBar.
 */
export const ActionBarGroup = React.forwardRef<HTMLDivElement, ActionBarGroupProps>(
  ({ className, align = "start", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="action-bar-group"
        className={cn(
          "inline-flex items-center gap-1.5 sm:gap-2 shrink-0 overflow-visible",
          align === "center" && "justify-center",
          align === "end" && "justify-end ml-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ActionBarGroup.displayName = "ActionBarGroup";

export interface ActionBarLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional badge-like count highlight.
   */
  count?: number | string;
}

/**
 * ActionBarLabel
 *
 * Contextual text or selection readout (e.g. "3 items selected") displayed inside an ActionBar.
 */
export const ActionBarLabel = React.forwardRef<HTMLSpanElement, ActionBarLabelProps>(
  ({ className, count, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="action-bar-label"
        className={cn(
          "inline-flex items-center gap-2 px-2 text-xs sm:text-sm font-medium text-foreground select-none shrink-0",
          className
        )}
        {...props}
      >
        {count !== undefined && (
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold rounded-md bg-muted text-foreground border border-border">
            {count}
          </span>
        )}
        <span>{children}</span>
      </span>
    );
  }
);

ActionBarLabel.displayName = "ActionBarLabel";

export interface ActionBarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Spatial orientation of the divider.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * ActionBarSeparator
 *
 * Subtle optical divider separating distinct groups of contextual actions.
 */
export const ActionBarSeparator = React.forwardRef<HTMLDivElement, ActionBarSeparatorProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        data-slot="action-bar-separator"
        className={cn(
          "shrink-0 bg-black/[0.12] dark:bg-white/[0.16]",
          orientation === "vertical" ? "h-5 w-px mx-0.5 sm:mx-1" : "w-full h-px my-0.5 sm:my-1",
          className
        )}
        {...props}
      />
    );
  }
);

ActionBarSeparator.displayName = "ActionBarSeparator";
