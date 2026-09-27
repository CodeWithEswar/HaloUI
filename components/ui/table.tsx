import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type TableVariant = "default" | "outline" | "muted" | "glass" | "ghost";
export type TableDensity = "default" | "compact" | "comfortable";

export interface TableProps extends React.ComponentProps<"table"> {
  /**
   * Visual framing variant for the outer table container:
   * - "default": Subtle border with neutral tinted background suitable for general cards.
   * - "outline": Crisp 1px structural hairline border with transparent background.
   * - "muted": Soft, low-contrast tinted background.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular reflection and ambient depth.
   * - "ghost": Unbordered, minimal edge-to-edge layout.
   * @default "default"
   */
  variant?: TableVariant;
  /**
   * Spatial density scale controlling vertical and horizontal padding across cells:
   * - "default": Standard 12px vertical spacing (h-10 header, p-3 cell).
   * - "compact": High-density 6-8px vertical spacing (h-8 header, px-3 py-1.5 cell).
   * - "comfortable": Spacious 16px vertical spacing (h-12 header, px-5 py-4 cell).
   * @default "default"
   */
  density?: TableDensity;
  /**
   * Whether to display alternating zebra row backgrounds for scanability across wide datasets.
   * @default false
   */
  striped?: boolean;
  /**
   * Pin the table header to the top of the scrolling container during vertical scroll.
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Accessible description for the scrollable table region (aria-label).
   * @default "Tabular data"
   */
  containerLabel?: string;
  /**
   * Optional custom class names applied directly to the outer scrolling container div.
   */
  containerClassName?: string;
  /**
   * Optional props forwarded directly to the outer scrolling container div.
   */
  containerProps?: Omit<React.ComponentProps<"div">, "children" | "className">;
}

export interface TableHeaderProps extends React.ComponentProps<"thead"> {
  /**
   * Pin the header to top of container during vertical scrolling.
   */
  sticky?: boolean;
}

export interface TableBodyProps extends React.ComponentProps<"tbody"> {}

export interface TableFooterProps extends React.ComponentProps<"tfoot"> {}

export interface TableRowProps extends React.ComponentProps<"tr"> {
  /**
   * Mark row as interactively selected or highlighted.
   */
  selected?: boolean;
}

export interface TableHeadProps extends React.ComponentProps<"th"> {}

export interface TableCellProps extends React.ComponentProps<"td"> {}

export interface TableCaptionProps extends React.ComponentProps<"caption"> {}

/* -------------------------------------------------------------------------
 * 1. ROOT TABLE COMPONENT
 * Semantic tabular data primitive with responsive horizontal scroll containment.
 * 100% Server-Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function Table({
  className,
  variant = "default",
  density = "default",
  striped = false,
  stickyHeader = false,
  containerLabel = "Tabular data",
  containerClassName,
  containerProps,
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      data-variant={variant}
      data-density={density}
      role="region"
      aria-label={containerLabel}
      tabIndex={0}
      className={cn(
        // Responsive scroll containment: table container scrolls horizontally, page NEVER does
        "relative w-full overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1",
        "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",

        // Outer surface variants
        variant === "default" && [
          "rounded-xl border border-border/70 bg-card/40",
          "shadow-xs",
        ],
        variant === "outline" && [
          "rounded-xl border border-border/80 bg-transparent",
        ],
        variant === "muted" && [
          "rounded-xl border border-border/40 bg-muted/40",
        ],
        variant === "ghost" && [
          "border-none bg-transparent shadow-none",
        ],
        variant === "glass" && [
          "rounded-2xl border border-border/70 dark:border-white/16",
          "bg-card/75 dark:bg-card/30 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]",
        ],

        containerClassName
      )}
      {...containerProps}
    >
      <table
        data-slot="table"
        data-variant={variant}
        data-density={density}
        data-striped={striped ? "true" : undefined}
        className={cn(
          "w-full caption-bottom text-sm text-foreground",
          "border-collapse border-spacing-0",

          // Density scales automatically coordinated onto headers & cells via pure CSS
          density === "default" && [
            "[&_th]:h-10 [&_th]:px-4 [&_th]:py-2.5",
            "[&_td]:px-4 [&_td]:py-3",
          ],
          density === "compact" && [
            "text-xs",
            "[&_th]:h-8 [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-xs",
            "[&_td]:px-3 [&_td]:py-1.5 [&_td]:text-xs",
          ],
          density === "comfortable" && [
            "[&_th]:h-12 [&_th]:px-5 [&_th]:py-3.5",
            "[&_td]:px-5 [&_td]:py-4",
          ],

          // Striped alternating zebra row styling
          striped && [
            "[&_tbody>tr:nth-child(even)]:bg-muted/30 dark:[&_tbody>tr:nth-child(even)]:bg-muted/15",
          ],

          // Sticky header coordination
          stickyHeader && [
            "[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10",
            "[&_thead]:bg-background/95 [&_thead]:backdrop-blur-md dark:[&_thead]:bg-card/95",
            "[&_thead]:shadow-xs",
          ],

          className
        )}
        {...props}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. TABLE HEADER
 * Semantic <thead> wrapper with optical hierarchy separation.
 * ----------------------------------------------------------------------- */

export function TableHeader({ className, sticky = false, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      data-sticky={sticky ? "true" : undefined}
      className={cn(
        "border-b border-border/80 bg-muted/40 text-muted-foreground transition-colors dark:bg-muted/20",
        sticky && "sticky top-0 z-10 bg-background/95 backdrop-blur-md shadow-xs dark:bg-card/95",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. TABLE BODY
 * Semantic <tbody> container with clean child row borders.
 * ----------------------------------------------------------------------- */

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "divide-y divide-border/60 [&_tr:last-child]:border-0 dark:divide-border/40",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. TABLE FOOTER
 * Semantic <tfoot> wrapper for aggregates, summaries, and totals.
 * ----------------------------------------------------------------------- */

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border/80 bg-muted/50 font-medium text-foreground dark:bg-muted/30 [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. TABLE ROW
 * Semantic <tr> row with scan-assistance hover and semantic selected tint.
 * Notice: Zero individual glass surfaces per row.
 * ----------------------------------------------------------------------- */

export function TableRow({
  className,
  selected = false,
  ...props
}: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      data-state={selected ? "selected" : undefined}
      className={cn(
        "border-b border-border/60 transition-colors dark:border-border/40",
        // Scan-assistance hover (restrained, purely visual tint)
        "hover:bg-muted/50 dark:hover:bg-muted/25",
        // Selected state styling
        "data-[state=selected]:bg-muted/80 dark:data-[state=selected]:bg-muted/50",
        selected && "bg-muted/80 dark:bg-muted/50",
        // Focus state within row
        "has-focus-visible:outline-hidden",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. TABLE HEAD
 * Semantic <th> column or row header.
 * ----------------------------------------------------------------------- */

export function TableHead({
  className,
  scope = "col",
  ...props
}: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      scope={scope}
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap",
        "[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 7. TABLE CELL
 * Semantic <td> data cell supporting diverse content (text, badges, avatars, actions).
 * Strictly zero backdrop blur or refraction per cell.
 * ----------------------------------------------------------------------- */

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-4 align-middle text-foreground",
        "[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 8. TABLE CAPTION
 * Accessible table context and metadata summary.
 * ----------------------------------------------------------------------- */

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-xs text-muted-foreground caption-bottom", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND ATTACHMENTS
 * ----------------------------------------------------------------------- */

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;
