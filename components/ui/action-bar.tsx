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
    // 10-Layer Physical Optical Liquid Glass Engine
    "bg-white/65 dark:bg-neutral-950/65 backdrop-blur-2xl backdrop-saturate-180",
    "border border-white/80 dark:border-white/[0.18]",
    // Inner Refraction Rim (Layer 03)
    "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
    "before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.06)]",
    "dark:before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
    // 135° Directional Specular Reflection (Layer 04)
    "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit]",
    "after:bg-gradient-to-br after:from-white/35 after:via-white/5 after:to-transparent dark:after:from-white/12 dark:after:via-transparent dark:after:to-transparent",
    // Anchoring Dual Contact & Ambient Shadows
    "shadow-[0_12px_36px_-6px_rgba(0,0,0,0.14),0_2px_8px_-2px_rgba(0,0,0,0.06)]",
    "dark:shadow-[0_20px_54px_-8px_rgba(0,0,0,0.7),0_4px_16px_-4px_rgba(0,0,0,0.5)]",
    // Critical: Do NOT use overflow-hidden so child focus rings and dropdown menus are never clipped!
    "overflow-visible",
  ],
  {
    variants: {
      density: {
        compact: "p-1 sm:p-1.5 gap-1 sm:gap-1.5 rounded-xl",
        default: "p-1.5 sm:p-2.5 gap-1.5 sm:gap-2.5 rounded-xl sm:rounded-2xl",
        spacious: "p-2.5 sm:p-3.5 gap-2 sm:gap-3.5 rounded-xl sm:rounded-2xl",
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
        <div
          className={cn(
            "relative z-10 inline-flex items-center gap-[inherit] w-full overflow-visible",
            fullWidth && "justify-between"
          )}
        >
          {children}
        </div>
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
          "inline-flex items-center gap-1 sm:gap-2 shrink-0 overflow-visible",
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
          "inline-flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 text-xs sm:text-sm font-medium text-foreground select-none shrink-0",
          className
        )}
        {...props}
      >
        {count !== undefined && (
          <span className="inline-flex items-center justify-center min-w-5 px-1.5 py-0.5 text-xs font-semibold rounded-md bg-black/[0.06] dark:bg-white/[0.10] text-foreground border border-black/[0.08] dark:border-white/[0.14] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12)]">
            {count}
          </span>
        )}
        {children && <span className="truncate">{children}</span>}
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
          "shrink-0 bg-black/[0.12] dark:bg-white/[0.16] shadow-[1px_0_0_0_rgba(255,255,255,0.8)] dark:shadow-[1px_0_0_0_rgba(255,255,255,0.06)]",
          orientation === "vertical" ? "h-4 sm:h-5 w-px mx-0.5 sm:mx-1" : "w-full h-px my-0.5 sm:my-1",
          className
        )}
        {...props}
      />
    );
  }
);

ActionBarSeparator.displayName = "ActionBarSeparator";
