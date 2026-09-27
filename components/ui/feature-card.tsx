import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Card,
  type CardProps,
  type CardIntensity,
  type CardSize,
  type CardVariant,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type FeatureCardOrientation = "vertical" | "horizontal";
export type FeatureCardVisualVariant = "default" | "muted" | "media";

export interface FeatureCardProps extends CardProps {
  /**
   * Layout orientation of the feature presentation.
   * - "vertical": Standard stacked presentation ideal for 2, 3, or 4-column feature grids.
   * - "horizontal": Inline row layout pairing visual, description, and action horizontally.
   * @default "vertical"
   */
  orientation?: FeatureCardOrientation;
}

/* -------------------------------------------------------------------------
 * 1. ROOT FEATURE CARD COMPONENT
 * Opinionated feature/benefit surface built directly on Card architecture.
 * Server-Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function FeatureCard({
  className,
  size = "default",
  intensity = "subtle",
  variant = "default",
  interactive = false,
  orientation = "vertical",
  asChild = false,
  children,
  ...props
}: FeatureCardProps) {
  return (
    <Card
      data-slot="feature-card"
      data-orientation={orientation}
      size={size}
      intensity={intensity}
      variant={variant}
      interactive={interactive}
      asChild={asChild}
      className={cn(
        "group/feature-card min-w-0 transition-colors",
        orientation === "horizontal" &&
          "flex-col sm:flex-row sm:items-center justify-between gap-4",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

/* -------------------------------------------------------------------------
 * 2. FEATURE CARD VISUAL
 * Container for feature icons, illustrations, screenshot fragments, or UI previews.
 * Preserves media fidelity without applying distorting optical parent filters.
 * ----------------------------------------------------------------------- */

export interface FeatureCardVisualProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  /**
   * Visual framing variant:
   * - "default": Restrained, subtly tinted boundary for iconography.
   * - "muted": Flatter, lower-contrast boundary.
   * - "media": Edge-to-edge or optically isolated frame for screenshots and UI fragments.
   * @default "default"
   */
  variant?: FeatureCardVisualVariant;
}

export function FeatureCardVisual({
  className,
  asChild = false,
  variant = "default",
  ...props
}: FeatureCardVisualProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="feature-card-visual"
      data-variant={variant}
      className={cn(
        "shrink-0 select-none transition-colors",
        // Icon / Glyphic container variants
        variant === "default" && [
          "flex size-10 sm:size-11 items-center justify-center rounded-xl",
          "bg-muted/40 border border-border/50 text-foreground",
          "group-hover/feature-card:bg-muted/60",
          "group-data-[size=sm]/card:size-8 sm:group-data-[size=sm]/card:size-9 group-data-[size=sm]/card:rounded-lg",
          "group-data-[size=lg]/card:size-12 sm:group-data-[size=lg]/card:size-14 group-data-[size=lg]/card:rounded-2xl",
        ],
        variant === "muted" && [
          "flex size-10 sm:size-11 items-center justify-center rounded-xl",
          "bg-background/60 border border-border/40 text-muted-foreground",
          "group-hover/feature-card:text-foreground",
          "group-data-[size=sm]/card:size-8 sm:group-data-[size=sm]/card:size-9 group-data-[size=sm]/card:rounded-lg",
          "group-data-[size=lg]/card:size-12 sm:group-data-[size=lg]/card:size-14 group-data-[size=lg]/card:rounded-2xl",
        ],
        // Media / Screenshot / Mini UI preview slot
        variant === "media" && [
          "relative w-full overflow-hidden rounded-xl border border-border/50 bg-muted/20 isolate",
          "group-data-[size=sm]/card:rounded-lg",
          "group-data-[size=lg]/card:rounded-2xl",
        ],
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. FEATURE CARD TITLE
 * Visual and structural title text. Supports polymorphic heading tags (h1-h6).
 * ----------------------------------------------------------------------- */

export interface FeatureCardTitleProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
}

export function FeatureCardTitle({
  className,
  asChild = false,
  as = "h3",
  ...props
}: FeatureCardTitleProps) {
  const Comp = asChild ? Slot : (as as any);

  return (
    <Comp
      data-slot="feature-card-title"
      className={cn(
        "font-heading text-base font-semibold tracking-tight text-foreground leading-snug",
        "group-data-[size=sm]/card:text-sm group-data-[size=sm]/card:font-medium",
        "group-data-[size=lg]/card:text-lg sm:group-data-[size=lg]/card:text-xl",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. FEATURE CARD DESCRIPTION
 * Explains the capability, mechanism, or benefit. Supports natural wrapping.
 * ----------------------------------------------------------------------- */

export interface FeatureCardDescriptionProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export function FeatureCardDescription({
  className,
  asChild = false,
  ...props
}: FeatureCardDescriptionProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="feature-card-description"
      className={cn(
        "text-xs sm:text-sm text-muted-foreground leading-relaxed",
        "group-data-[size=sm]/card:text-xs",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. FEATURE CARD CONTENT
 * Primary slot for optional supporting metadata, feature highlights, or badges.
 * ----------------------------------------------------------------------- */

export interface FeatureCardContentProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export function FeatureCardContent({
  className,
  asChild = false,
  ...props
}: FeatureCardContentProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="feature-card-content"
      className={cn(
        "flex flex-col gap-2 min-w-0 text-xs sm:text-sm text-muted-foreground leading-normal",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. FEATURE CARD ACTION
 * Optional action or link slot (e.g. "Learn more", "Explore docs", or trigger Button).
 * Does not capture synthetic pointer events; relies on real anchor/button semantics.
 * ----------------------------------------------------------------------- */

export interface FeatureCardActionProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export function FeatureCardAction({
  className,
  asChild = false,
  ...props
}: FeatureCardActionProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="feature-card-action"
      className={cn(
        "flex items-center gap-2 pt-1 min-w-0 text-xs sm:text-sm font-medium text-foreground",
        "group-data-[orientation=horizontal]/feature-card:pt-0 shrink-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND & SUBCOMPONENT EXPORTS
 * ----------------------------------------------------------------------- */

FeatureCard.Visual = FeatureCardVisual;
FeatureCard.Title = FeatureCardTitle;
FeatureCard.Description = FeatureCardDescription;
FeatureCard.Content = FeatureCardContent;
FeatureCard.Action = FeatureCardAction;

export {
  FeatureCard as Root,
  FeatureCardVisual as Visual,
  FeatureCardTitle as Title,
  FeatureCardDescription as Description,
  FeatureCardContent as Content,
  FeatureCardAction as Action,
};
