import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type DescriptionListVariant = "default" | "outline" | "muted" | "glass" | "ghost";
export type DescriptionListDensity = "default" | "compact" | "relaxed";
export type DescriptionListLayout = "auto" | "horizontal" | "vertical";

export interface DescriptionListProps extends React.ComponentProps<"dl"> {
  /**
   * Render as a Radix Slot child element to compose directly onto consumer semantic nodes.
   */
  asChild?: boolean;
  /**
   * Visual framing variant for the outer metadata surface:
   * - "default": Transparent, optically calm boundary suitable for cards and dense panels.
   * - "outline": Clean hairline structural border boundary.
   * - "muted": Flat, low-contrast tinted background.
   * - "glass": Restrained HaloUI liquid glass outer boundary with specular highlight and ambient depth.
   * - "ghost": Unframed, borderless layout.
   * @default "default"
   */
  variant?: DescriptionListVariant;
  /**
   * Spatial density scale controlling vertical and horizontal spacing between term/value pairs:
   * - "default": Standard 12px vertical item rhythm.
   * - "compact": Dense 8px vertical item rhythm for high-density sidebars and dialogs.
   * - "relaxed": Spacious 16px vertical item rhythm for primary property pages.
   * @default "default"
   */
  density?: DescriptionListDensity;
  /**
   * Layout strategy for term/value alignment:
   * - "auto": Intrinsic container-aware reflow (@container). Displays side-by-side above 480px,
   *   and automatically stacks vertically below 480px without any JS width listeners.
   * - "horizontal": Always side-by-side columns (term left, value right).
   * - "vertical": Always stacked (term above value).
   * @default "auto"
   */
  layout?: DescriptionListLayout;
  /**
   * Whether to render subtle divider borders between child metadata rows.
   * @default false
   */
  divided?: boolean;
}

export interface DescriptionListItemProps extends React.ComponentProps<"div"> {
  /**
   * Render as a Radix Slot child element.
   */
  asChild?: boolean;
}

export interface DescriptionListTermProps extends React.ComponentProps<"dt"> {
  /**
   * Render as a Radix Slot child element.
   */
  asChild?: boolean;
}

export interface DescriptionListDetailsProps extends React.ComponentProps<"dd"> {
  /**
   * Render as a Radix Slot child element.
   */
  asChild?: boolean;
}

export interface DescriptionListHeaderProps extends React.ComponentProps<"div"> {
  /**
   * Render as a Radix Slot child element.
   */
  asChild?: boolean;
}

export interface DescriptionListSeparatorProps extends React.ComponentProps<"div"> {}

/* -------------------------------------------------------------------------
 * 1. ROOT DESCRIPTION LIST COMPONENT
 * Foundational label/value metadata surface preserving native <dl> semantics.
 * Server-Component compatible with zero client-side JavaScript overhead.
 * Employs container queries (@container/description-list) for intrinsic auto-reflow.
 * ----------------------------------------------------------------------- */

export function DescriptionList({
  className,
  variant = "default",
  density = "default",
  layout = "auto",
  divided = false,
  asChild = false,
  ...props
}: DescriptionListProps) {
  const Comp = asChild ? Slot : "dl";

  return (
    <Comp
      data-slot="description-list"
      data-variant={variant}
      data-density={density}
      data-layout={layout}
      data-divided={divided ? "true" : undefined}
      className={cn(
        // Core structural container establishing container query scope & group context
        "@container/description-list group/description-list relative flex flex-col w-full min-w-0 text-sm leading-normal text-foreground",
        "transition-colors duration-150",

        // Collection Surface Variants
        variant === "default" && "bg-transparent",
        variant === "outline" && "rounded-xl border border-border/70 p-3 sm:p-4 bg-background/50",
        variant === "muted" && "rounded-xl border border-border/40 p-3 sm:p-4 bg-muted/40",
        variant === "ghost" && "border-none bg-transparent p-0 shadow-none",
        variant === "glass" && [
          "rounded-2xl border border-border/70 dark:border-white/16",
          "bg-card/75 dark:bg-card/30 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]",
          "p-3.5 sm:p-5",
        ],

        // Divided rows coordination
        divided && "divide-y divide-border/60 dark:divide-white/10",

        // Spacing between non-divided items
        !divided && [
          density === "default" && "space-y-3",
          density === "compact" && "space-y-2",
          density === "relaxed" && "space-y-4",
        ],

        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. DESCRIPTION LIST ITEM
 * Semantic row wrapper grouping a term (<dt>) and its description (<dd>).
 * HTML5 standard explicitly permits <div> inside <dl> to group dt/dd pairs.
 * Dynamically reflows from column-pair to stacked based on container width.
 * ----------------------------------------------------------------------- */

export function DescriptionListItem({
  className,
  asChild = false,
  ...props
}: DescriptionListItemProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="description-list-item"
      className={cn(
        // Base layout: min-w-0 prevents child flex/grid blowout from long identifiers
        "min-w-0 transition-colors",

        // Default Auto Reflow: Stacked on narrow containers (<480px), two columns on wide containers (>=480px)
        "flex flex-col gap-1",
        "sm:grid sm:grid-cols-[minmax(130px,200px)_1fr] sm:items-start sm:gap-4",
        "@[480px]/description-list:grid @[480px]/description-list:grid-cols-[minmax(130px,200px)_1fr] @[480px]/description-list:items-start @[480px]/description-list:gap-4",

        // Explicit Layout Overrides
        "group-data-[layout=horizontal]/description-list:grid! group-data-[layout=horizontal]/description-list:grid-cols-[minmax(130px,200px)_1fr]! group-data-[layout=horizontal]/description-list:items-start! group-data-[layout=horizontal]/description-list:gap-4!",
        "group-data-[layout=vertical]/description-list:flex! group-data-[layout=vertical]/description-list:flex-col! group-data-[layout=vertical]/description-list:gap-1!",

        // Divided mode vertical padding rhythm
        "group-data-[divided=true]/description-list:py-3 first:group-data-[divided=true]/description-list:pt-0 last:group-data-[divided=true]/description-list:pb-0",
        "group-data-[density=compact]/description-list:group-data-[divided=true]/description-list:py-2",
        "group-data-[density=relaxed]/description-list:group-data-[divided=true]/description-list:py-4",

        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. DESCRIPTION LIST TERM
 * Semantic label element (<dt>). High legibility, restrained visual weight.
 * ----------------------------------------------------------------------- */

export function DescriptionListTerm({
  className,
  asChild = false,
  ...props
}: DescriptionListTermProps) {
  const Comp = asChild ? Slot : "dt";

  return (
    <Comp
      data-slot="description-list-term"
      className={cn(
        "text-xs sm:text-sm font-medium text-muted-foreground break-words min-w-0 select-none",
        "flex items-center gap-1.5 leading-snug",
        // Compact density adjustments
        "group-data-[density=compact]/description-list:text-xs",
        // Relaxed density adjustments
        "group-data-[density=relaxed]/description-list:text-sm sm:group-data-[density=relaxed]/description-list:text-base",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. DESCRIPTION LIST DETAILS
 * Semantic value element (<dd>). Supports rich polymorphic content (text, badges, links, copy actions).
 * ----------------------------------------------------------------------- */

export function DescriptionListDetails({
  className,
  asChild = false,
  ...props
}: DescriptionListDetailsProps) {
  const Comp = asChild ? Slot : "dd";

  return (
    <Comp
      data-slot="description-list-details"
      className={cn(
        "text-xs sm:text-sm text-foreground break-words min-w-0 leading-normal",
        "flex flex-wrap items-center gap-2",
        // Compact density adjustments
        "group-data-[density=compact]/description-list:text-xs",
        // Relaxed density adjustments
        "group-data-[density=relaxed]/description-list:text-sm sm:group-data-[density=relaxed]/description-list:text-base",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. DESCRIPTION LIST HEADER
 * Optional category / section heading inside a description list.
 * ----------------------------------------------------------------------- */

export function DescriptionListHeader({
  className,
  asChild = false,
  ...props
}: DescriptionListHeaderProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="description-list-header"
      className={cn(
        "font-semibold text-xs uppercase tracking-wider text-muted-foreground/80 pb-1.5 pt-2 select-none first:pt-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. DESCRIPTION LIST SEPARATOR
 * Structural divider line between metadata sections.
 * ----------------------------------------------------------------------- */

export function DescriptionListSeparator({
  className,
  ...props
}: DescriptionListSeparatorProps) {
  return (
    <div
      role="separator"
      data-slot="description-list-separator"
      className={cn("h-px w-full bg-border/60 dark:bg-white/10 my-2", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND & SUBCOMPONENT EXPORTS
 * ----------------------------------------------------------------------- */

DescriptionList.Item = DescriptionListItem;
DescriptionList.Term = DescriptionListTerm;
DescriptionList.Details = DescriptionListDetails;
DescriptionList.Header = DescriptionListHeader;
DescriptionList.Separator = DescriptionListSeparator;

export {
  DescriptionList as Root,
  DescriptionListItem as Item,
  DescriptionListTerm as Term,
  DescriptionListDetails as Details,
  DescriptionListHeader as Header,
  DescriptionListSeparator as Separator,
};
