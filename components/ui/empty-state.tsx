import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type EmptyStateVariant = "default" | "outline" | "glass" | "ghost";
export type EmptyStateDensity = "default" | "compact" | "relaxed";
export type EmptyStateVisualVariant = "default" | "icon" | "ghost";
export type EmptyStateVisualSize = "default" | "sm" | "lg";

export interface EmptyStateProps extends React.ComponentProps<"div"> {
  /**
   * Visual framing variant for the outer container:
   * - "default": Unbordered transparent container, optically calm for nested cards or tables.
   * - "outline": Clean dashed or hairline border boundary.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular reflection.
   * - "ghost": Borderless, edge-to-edge unstyled layout.
   * @default "default"
   */
  variant?: EmptyStateVariant;
  /**
   * Spatial density scale controlling vertical and horizontal padding:
   * - "default": Standard 32px padding, ideal for main page regions and views.
   * - "compact": Tight 16px padding, ideal for tables, sidebars, and popovers.
   * - "relaxed": Generous 48px padding, ideal for full-page onboarding empty states.
   * @default "default"
   */
  density?: EmptyStateDensity;
}

export interface EmptyStateVisualProps extends React.ComponentProps<"div"> {
  /**
   * Visual framing style for the icon or graphic:
   * - "default": Subtle rounded badge with border and soft background.
   * - "icon": Unframed direct glyph container.
   * - "ghost": Transparent minimal container.
   * @default "default"
   */
  variant?: EmptyStateVisualVariant;
  /**
   * Size scale for the visual container and nested icons:
   * - "default": 48px badge with 24px icon.
   * - "sm": 36px badge with 18px icon.
   * - "lg": 64px badge with 32px icon.
   * @default "default"
   */
  size?: EmptyStateVisualSize;
  /**
   * Optional icon node passed directly.
   */
  icon?: React.ReactNode;
}

export interface EmptyStateContentProps extends React.ComponentProps<"div"> {}
export interface EmptyStateTitleProps extends React.ComponentProps<"h3"> {}
export interface EmptyStateDescriptionProps extends React.ComponentProps<"p"> {}
export interface EmptyStateActionsProps extends React.ComponentProps<"div"> {}

/* -------------------------------------------------------------------------
 * 1. ROOT EMPTY STATE
 * Foundational no-data/no-result guidance container.
 * Features container-aware responsive reflow and restrained Liquid Glass outer shell.
 * ----------------------------------------------------------------------- */

export function EmptyState({
  className,
  variant = "default",
  density = "default",
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      data-variant={variant}
      data-density={density}
      className={cn(
        // Responsive container query boundary and centered flex layout
        "@container/empty-state group/empty-state relative flex w-full flex-col items-center justify-center min-w-0 text-center text-balance",
        "transition-colors duration-150",

        // Outer surface variants
        variant === "default" && "bg-transparent",
        variant === "outline" && "rounded-2xl border border-dashed border-border/80 bg-card/30 p-6 sm:p-8 shadow-2xs",
        variant === "ghost" && "border-none bg-transparent shadow-none p-4",
        variant === "glass" && [
          "rounded-2xl border border-border/70 dark:border-white/16",
          "bg-card/75 dark:bg-card/30 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]",
          "p-6 sm:p-8",
        ],

        // Density scale coordination
        density === "default" && "py-8 sm:py-12 px-4 sm:px-6 gap-4",
        density === "compact" && "py-5 sm:py-6 px-3 sm:px-4 gap-2.5",
        density === "relaxed" && "py-12 sm:py-16 px-6 sm:px-8 gap-5",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. EMPTY STATE VISUAL
 * Icon or graphic indicator container with responsive scaling.
 * Preserves 100% media fidelity with zero refraction.
 * ----------------------------------------------------------------------- */

export function EmptyStateVisual({
  className,
  variant = "default",
  size = "default",
  icon,
  children,
  ...props
}: EmptyStateVisualProps) {
  return (
    <div
      data-slot="empty-state-visual"
      data-variant={variant}
      data-size={size}
      aria-hidden="true"
      className={cn(
        "relative shrink-0 flex items-center justify-center select-none transition-all duration-150",

        // Size configurations
        size === "default" && "size-11 sm:size-12 [&_svg]:size-5 sm:[&_svg]:size-6",
        size === "sm" && "size-8 sm:size-9 [&_svg]:size-4 sm:[&_svg]:size-4.5",
        size === "lg" && "size-14 sm:size-16 [&_svg]:size-7 sm:[&_svg]:size-8",

        // Visual framing variants
        variant === "default" && [
          "rounded-2xl border border-border/80 dark:border-white/12",
          "bg-muted/50 dark:bg-card/60 text-muted-foreground",
          "shadow-2xs",
        ],
        variant === "icon" && "bg-transparent text-muted-foreground",
        variant === "ghost" && "bg-transparent text-foreground",

        className
      )}
      {...props}
    >
      {icon ?? children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 3. EMPTY STATE CONTENT
 * Central column slot holding Title, Description, and contextual text.
 * Constrained with max-w-md to ensure optimal reading line lengths.
 * ----------------------------------------------------------------------- */

export function EmptyStateContent({
  className,
  children,
  ...props
}: EmptyStateContentProps) {
  return (
    <div
      data-slot="empty-state-content"
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 max-w-md min-w-0 w-full text-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 4. EMPTY STATE TITLE
 * Primary explanation of why the region is currently empty.
 * ----------------------------------------------------------------------- */

export function EmptyStateTitle({
  className,
  children,
  ...props
}: EmptyStateTitleProps) {
  return (
    <h3
      data-slot="empty-state-title"
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

/* -------------------------------------------------------------------------
 * 5. EMPTY STATE DESCRIPTION
 * Secondary contextual guidance explaining what happened or what can be done.
 * ----------------------------------------------------------------------- */

export function EmptyStateDescription({
  className,
  children,
  ...props
}: EmptyStateDescriptionProps) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(
        "text-xs sm:text-sm text-muted-foreground leading-relaxed break-words min-w-0 max-w-sm",
        "[&_a]:underline [&_a]:underline-offset-4 [&_a]:text-foreground hover:[&_a]:text-primary",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------
 * 6. EMPTY STATE ACTIONS
 * Trailing interactive action controls (Create, Clear Filters, Refresh).
 * Uses fluid flex layout: inline on wide, stacks/wraps cleanly on mobile.
 * ----------------------------------------------------------------------- */

export function EmptyStateActions({
  className,
  children,
  ...props
}: EmptyStateActionsProps) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn(
        // Fluid responsive layout:
        // On narrow viewports/containers: wraps or stacks naturally without truncation
        // On wide containers: spaces actions inline
        "mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 min-w-0 w-full",
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

EmptyState.Visual = EmptyStateVisual;
EmptyState.Content = EmptyStateContent;
EmptyState.Title = EmptyStateTitle;
EmptyState.Description = EmptyStateDescription;
EmptyState.Actions = EmptyStateActions;
