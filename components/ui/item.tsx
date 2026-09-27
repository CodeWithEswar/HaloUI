import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type ItemVariant = "default" | "outline" | "muted" | "glass";
export type ItemSize = "default" | "compact";

export interface ItemProps extends React.ComponentProps<"div"> {
  /**
   * Render as a Radix Slot child element to compose directly onto consumer semantic nodes
   * (e.g. Next.js Link, semantic <li>, or button).
   */
  asChild?: boolean;
  /**
   * Visual framing variant:
   * - "default": Transparent base, optically calm for dense repeated rows.
   * - "outline": Hairline structural border boundary.
   * - "muted": Flat, low-contrast tinted background.
   * - "glass": Luminous HaloUI liquid glass row surface with specular reflection and backdrop blur.
   * @default "default"
   */
  variant?: ItemVariant;
  /**
   * Spatial density scale controlling vertical and horizontal padding.
   * - "default": Standard 12px vertical padding, 14px horizontal padding (ideal for dashboard feeds, settings).
   * - "compact": Tight 8px vertical padding, 10px horizontal padding (ideal for dropdowns, dense member lists).
   * @default "default"
   */
  size?: ItemSize;
  /**
   * Whether the row acts as an intentional interactive target.
   * Note: Static items must NOT receive hover lifting or focus rings.
   * @default false
   */
  interactive?: boolean;
}

export interface ItemMediaProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  /**
   * Visual framing variant for leading media:
   * - "default": Unframed slot for Avatar, AvatarGroup, or Checkbox.
   * - "icon": Compact glyphic container with subtle background.
   * - "image": Square framed thumbnail container.
   * @default "default"
   */
  variant?: "default" | "icon" | "image";
}

export interface ItemContentProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface ItemTitleProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface ItemDescriptionProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface ItemActionsProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface ItemGroupProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface ItemSeparatorProps extends React.ComponentProps<"div"> {}

/* -------------------------------------------------------------------------
 * 1. ROOT ITEM
 * Foundational structural content-row primitive. Server-Component compatible
 * with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function Item({
  className,
  variant = "default",
  size = "default",
  interactive = false,
  asChild = false,
  ...props
}: ItemProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      data-interactive={interactive ? "true" : undefined}
      className={cn(
        // Base row layout and containment
        "group/item relative flex w-full items-center justify-between min-w-0 rounded-xl transition-all duration-150",
        // Fluid responsive reflow: wraps gracefully on ultra-compact mobile viewports
        "flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3.5",

        // Density scale
        size === "default" && "py-3 px-3.5 text-sm",
        size === "compact" && "py-2 px-2.5 text-xs sm:text-sm",

        // Variant: Default (transparent base for clean list rhythm)
        variant === "default" && [
          "border border-transparent bg-transparent text-foreground",
          interactive && "hover:bg-muted/50 dark:hover:bg-white/[0.04]",
        ],

        // Variant: Outline (hairline optical boundary)
        variant === "outline" && [
          "border border-border/70 dark:border-white/12 bg-transparent text-foreground",
          interactive && "hover:bg-muted/40 dark:hover:bg-white/[0.04] hover:border-border/90 dark:hover:border-white/20",
        ],

        // Variant: Muted (flat tinted surface)
        variant === "muted" && [
          "border border-transparent bg-muted/40 dark:bg-white/[0.03] text-foreground",
          interactive && "hover:bg-muted/70 dark:hover:bg-white/[0.06]",
        ],

        // Variant: Glass (Luminous HaloUI Liquid Glass row surface)
        variant === "glass" && [
          "border border-border/60 dark:border-white/12",
          "bg-card/60 dark:bg-card/35 backdrop-blur-md backdrop-saturate-150 text-foreground",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]",
          interactive && "hover:bg-card/85 dark:hover:bg-white/[0.08] hover:border-border/80 dark:hover:border-white/20 hover:shadow-md",
        ],

        // Interactive states
        interactive && [
          "cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-[0.995]",
        ],

        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. ITEM MEDIA
 * Leading container for Avatar, AvatarGroup, Icon, or Checkbox.
 * ----------------------------------------------------------------------- */

export function ItemMedia({
  className,
  variant = "default",
  asChild = false,
  ...props
}: ItemMediaProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="item-media"
      data-variant={variant}
      className={cn(
        "shrink-0 select-none flex items-center justify-center transition-colors",
        // Alignment handling: centers with single-line content, pins to top-start with descriptions
        "self-center group-has-data-[slot=item-description]/item:self-start group-has-data-[slot=item-description]/item:translate-y-0.5",

        // Slot styling variants
        variant === "default" && "bg-transparent",
        variant === "icon" && [
          "size-9 rounded-lg bg-muted/50 dark:bg-white/[0.06] border border-border/50 dark:border-white/10 text-muted-foreground",
          "group-hover/item:text-foreground group-hover/item:bg-muted/80 dark:group-hover/item:bg-white/[0.1]",
          "[&_svg]:size-4.5",
        ],
        variant === "image" && [
          "size-10 sm:size-11 overflow-hidden rounded-lg border border-border/50 dark:border-white/10 bg-muted/20 isolate",
          "[&_img]:size-full [&_img]:object-cover",
        ],

        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. ITEM CONTENT
 * Primary column slot hosting Title, Description, and inline metadata.
 * Implements strict min-w-0 to prevent horizontal overflow and allow natural text reflow.
 * ----------------------------------------------------------------------- */

export function ItemContent({
  className,
  asChild = false,
  ...props
}: ItemContentProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="item-content"
      className={cn(
        "min-w-0 flex-1 flex flex-col justify-center gap-0.5 text-left",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. ITEM TITLE
 * Primary heading/label for the row item.
 * ----------------------------------------------------------------------- */

export function ItemTitle({
  className,
  asChild = false,
  ...props
}: ItemTitleProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="item-title"
      className={cn(
        "min-w-0 font-medium text-foreground text-sm leading-snug break-words flex items-center gap-2",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. ITEM DESCRIPTION
 * Explanatory subtitle, helper text, or supporting metadata.
 * ----------------------------------------------------------------------- */

export function ItemDescription({
  className,
  asChild = false,
  ...props
}: ItemDescriptionProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="item-description"
      className={cn(
        "min-w-0 text-muted-foreground text-xs sm:text-sm leading-relaxed break-words",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. ITEM ACTIONS
 * Trailing container for interactive controls (Button, Switch, Badge, Menu, Chevron).
 * ----------------------------------------------------------------------- */

export function ItemActions({
  className,
  asChild = false,
  ...props
}: ItemActionsProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="item-actions"
      className={cn(
        "shrink-0 flex items-center gap-2 self-center",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 7. ITEM GROUP
 * Semantic collection container establishing list context and consistent spacing.
 * ----------------------------------------------------------------------- */

export function ItemGroup({
  className,
  asChild = false,
  role = "list",
  ...props
}: ItemGroupProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      role={role}
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-1.5",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 8. ITEM SEPARATOR
 * Hairline divider separating stacked rows in dense list configurations.
 * ----------------------------------------------------------------------- */

export function ItemSeparator({
  className,
  ...props
}: ItemSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="item-separator"
      className={cn(
        "my-1 h-px w-full bg-border/60 dark:bg-white/[0.08]",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND & SUBCOMPONENT EXPORTS
 * ----------------------------------------------------------------------- */

Item.Media = ItemMedia;
Item.Content = ItemContent;
Item.Title = ItemTitle;
Item.Description = ItemDescription;
Item.Actions = ItemActions;
Item.Group = ItemGroup;
Item.Separator = ItemSeparator;

export {
  Item as Root,
  ItemMedia as Media,
  ItemContent as Content,
  ItemTitle as Title,
  ItemDescription as Description,
  ItemActions as Actions,
  ItemGroup as Group,
  ItemSeparator as Separator,
};
