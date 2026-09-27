import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type ListVariant = "default" | "outline" | "muted" | "glass";
export type ListDensity = "default" | "compact" | "relaxed";
export type ListMarker = "none" | "disc" | "decimal";

export interface ListProps extends React.ComponentProps<"ul"> {
  /**
   * Render as a Radix Slot child element to compose directly onto consumer semantic nodes.
   */
  asChild?: boolean;
  /**
   * Root HTML tag override. Automatically defaults to `<ol>` when `ordered` is true, or `<ul>` otherwise.
   */
  as?: "ul" | "ol" | "div";
  /**
   * Visual framing variant for the collection surface:
   * - "default": Transparent container, optically calm for dense dashboards and nested cards.
   * - "outline": Hairline structural border boundary.
   * - "muted": Flat, low-contrast tinted background.
   * - "glass": Luminous HaloUI liquid glass outer boundary with specular highlight and backdrop blur.
   * @default "default"
   */
  variant?: ListVariant;
  /**
   * Spatial density scale controlling vertical and horizontal spacing between items.
   * - "default": Standard 4px item gap or standard divided row rhythm.
   * - "compact": Tight 2px item gap for high-density sidebars and compact dropdowns.
   * - "relaxed": Generous 8px item gap for spacious detail views and reading flows.
   * @default "default"
   */
  density?: ListDensity;
  /**
   * Whether to render subtle divider borders between child items.
   * Eliminates the need to manually insert separator elements.
   * @default false
   */
  divided?: boolean;
  /**
   * List marker presentation:
   * - "none": Unbulleted application row collection (standard for UI items).
   * - "disc": Semantic bullet marker for descriptive prose.
   * - "decimal": Numbered sequence marker for ordered steps.
   * @default "none"
   */
  marker?: ListMarker;
  /**
   * Whether the list represents a strict ordered sequence.
   * Renders `<ol>` under the hood to preserve screen reader sequence announcements.
   * @default false
   */
  ordered?: boolean;
}

export interface ListItemProps extends React.ComponentProps<"li"> {
  /**
   * Render as a Radix Slot child element to compose directly onto consumer semantic nodes (e.g. Item or Link).
   */
  asChild?: boolean;
}

export interface ListHeaderProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface ListFooterProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface ListSeparatorProps extends React.ComponentProps<"div"> {}

export interface ListEmptyProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

/* -------------------------------------------------------------------------
 * 1. ROOT LIST COMPONENT
 * Foundational collection container. Server-Component compatible with zero
 * client-side JavaScript overhead. Features intrinsic @container responsiveness.
 * ----------------------------------------------------------------------- */

export function List({
  className,
  variant = "default",
  density = "default",
  divided = false,
  marker = "none",
  ordered = false,
  as,
  asChild = false,
  ...props
}: ListProps) {
  // Determine semantic element: Slot > explicit `as` > ordered `<ol>` > unordered `<ul>`
  const Comp = asChild ? Slot : ((as || (ordered ? "ol" : "ul")) as any);

  return (
    <Comp
      data-slot="list"
      data-variant={variant}
      data-density={density}
      data-divided={divided ? "true" : undefined}
      data-marker={marker}
      className={cn(
        // Container query establishment: allows children to respond to the parent container width
        "@container/list group/list relative flex flex-col w-full min-w-0 max-w-full text-foreground transition-all duration-150",

        // List marker reset & styles
        marker === "none" && "list-none p-0 m-0",
        marker === "disc" && "list-disc list-inside ps-4",
        marker === "decimal" && "list-decimal list-inside ps-4",

        // Density & Item spacing
        !divided && [
          density === "default" && "gap-1.5",
          density === "compact" && "gap-0.5",
          density === "relaxed" && "gap-3",
        ],

        // Divided mode: subtle divider lines between consecutive items
        divided && [
          "gap-0 divide-y divide-border/60 dark:divide-white/8",
          // When divided inside a framed surface, ensure padding and child item bounds align
          variant !== "default" && "overflow-hidden",
        ],

        // Variant: Default (transparent base, calm inside Cards and Sheets)
        variant === "default" && "border border-transparent bg-transparent",

        // Variant: Outline (hairline structural boundary)
        variant === "outline" && [
          "rounded-2xl border border-border/80 dark:border-white/12 bg-transparent p-1.5",
          divided && "p-0",
        ],

        // Variant: Muted (flat tinted background)
        variant === "muted" && [
          "rounded-2xl border border-transparent bg-muted/40 dark:bg-white/[0.03] p-1.5",
          divided && "p-0",
        ],

        // Variant: Glass (Luminous HaloUI Liquid Glass collection boundary)
        variant === "glass" && [
          "rounded-2xl border border-border/70 dark:border-white/16",
          "bg-card/75 dark:bg-card/30 backdrop-blur-md backdrop-saturate-150",
          "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_16px_rgba(255,255,255,0.015)]",
          "p-1.5",
          divided && "p-0",
        ],

        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. LIST ITEM
 * Semantic row container (<li>). Preserves native accessibility while
 * supporting full composition with HaloUI Item or custom row nodes.
 * ----------------------------------------------------------------------- */

export function ListItem({
  className,
  asChild = false,
  ...props
}: ListItemProps) {
  const Comp = asChild ? Slot : "li";

  return (
    <Comp
      data-slot="list-item"
      className={cn(
        "group/list-item relative flex w-full min-w-0 items-center justify-between text-left transition-colors",
        // When parent is divided, provide default comfortable row padding if child doesn't own it
        "group-data-[divided=true]/list:py-2.5 group-data-[divided=true]/list:px-3.5",
        "group-data-[divided=true]/list:group-data-[density=compact]/list:py-1.5 group-data-[divided=true]/list:group-data-[density=compact]/list:px-2.5",
        "group-data-[divided=true]/list:group-data-[density=relaxed]/list:py-3.5 group-data-[divided=true]/list:group-data-[density=relaxed]/list:px-4",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. LIST HEADER
 * Optional section label, title, or controls above collection items.
 * ----------------------------------------------------------------------- */

export function ListHeader({
  className,
  asChild = false,
  ...props
}: ListHeaderProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="list-header"
      className={cn(
        "flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. LIST FOOTER
 * Optional summary or trailing pagination/action slot below collection items.
 * ----------------------------------------------------------------------- */

export function ListFooter({
  className,
  asChild = false,
  ...props
}: ListFooterProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="list-footer"
      className={cn(
        "flex items-center justify-between px-3 py-2 text-xs text-muted-foreground border-t border-border/40 dark:border-white/6",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. LIST SEPARATOR
 * Hairline divider separating items when manual divider placement is desired.
 * ----------------------------------------------------------------------- */

export function ListSeparator({
  className,
  ...props
}: ListSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="list-separator"
      className={cn(
        "my-1 h-px w-full bg-border/60 dark:bg-white/8",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. LIST EMPTY
 * Graceful empty state container rendered when a collection has no records.
 * ----------------------------------------------------------------------- */

export function ListEmpty({
  className,
  asChild = false,
  ...props
}: ListEmptyProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="list-empty"
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND & SUBCOMPONENT EXPORTS
 * ----------------------------------------------------------------------- */

List.Item = ListItem;
List.Header = ListHeader;
List.Footer = ListFooter;
List.Separator = ListSeparator;
List.Empty = ListEmpty;

export {
  List as Root,
  ListItem as Item,
  ListHeader as Header,
  ListFooter as Footer,
  ListSeparator as Separator,
  ListEmpty as Empty,
};
