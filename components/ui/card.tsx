import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type CardIntensity = "subtle" | "balanced" | "rich";
export type CardSize = "default" | "sm" | "lg";
export type CardVariant = "default" | "subtle" | "outline" | "elevated" | "ghost";

export interface CardProps extends React.ComponentProps<"div"> {
  /**
   * Render as Radix Slot child element to compose directly onto consumer nodes (e.g. Next.js Link or semantic article).
   */
  asChild?: boolean;
  /**
   * Sizing scale controlling internal padding and typography scale.
   * @default "default"
   */
  size?: CardSize;
  /**
   * Optical material intensity.
   * Note: Data display surfaces default to "subtle" to prevent visual noise in dense dashboards.
   * @default "subtle"
   */
  intensity?: CardIntensity;
  /**
   * Visual surface styling variant.
   * @default "default"
   */
  variant?: CardVariant;
  /**
   * Whether the card acts as an intentional interactive target (navigation or action).
   * Note: Static cards must NOT receive focus or hover lifting.
   * @default false
   */
  interactive?: boolean;
}

/* -------------------------------------------------------------------------
 * 1. ROOT CARD COMPONENT
 * General-purpose content surface establishing layout, boundary, and material.
 * Server-Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function Card({
  className,
  size = "default",
  intensity = "subtle",
  variant = "default",
  interactive = false,
  asChild = false,
  ...props
}: CardProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="card"
      data-size={size}
      data-intensity={intensity}
      data-variant={variant}
      data-interactive={interactive ? "true" : undefined}
      className={cn(
        // Base content grouping structure
        "group/card relative isolate flex flex-col gap-(--card-spacing) text-sm text-card-foreground leading-normal",
        "rounded-2xl transition-colors duration-150",
        // Spacing token orchestration via CSS variables
        "[--card-spacing:--spacing(5)] py-(--card-spacing)",
        "data-[size=sm]:[--card-spacing:--spacing(3.5)]",
        "data-[size=lg]:[--card-spacing:--spacing(6)]",
        // Section containment adjustments
        "has-data-[slot=card-footer]:pb-0",
        "has-[>img:first-child]:pt-0",
        "*:[img:first-child]:rounded-t-2xl *:[img:last-child]:rounded-b-2xl",

        // Variant: Default (Liquid Glass surface with optical depth and backdrop refraction)
        variant === "default" && [
          intensity === "subtle" && [
            "border border-border/70 dark:border-white/12",
            "bg-card/75 dark:bg-card/50 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
            "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_10px_32px_-4px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]",
          ],
          intensity === "balanced" && [
            "border border-white/60 dark:border-white/18",
            "bg-card/65 dark:bg-card/40 backdrop-blur-xl backdrop-saturate-180 halo-intensity-balanced",
            "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_14px_40px_-4px_rgba(0,0,0,0.6),0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.16)]",
          ],
          intensity === "rich" && [
            "border border-white/80 dark:border-white/24",
            "bg-card/50 dark:bg-card/25 backdrop-blur-2xl backdrop-saturate-200 halo-intensity-rich",
            "shadow-[0_16px_48px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_20px_56px_-6px_rgba(0,0,0,0.7),0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]",
          ],
        ],

        // Variant: Subtle (Low contrast, lightweight frosted boundary)
        variant === "subtle" && [
          "border border-border/50 dark:border-white/10 bg-muted/30 dark:bg-white/[0.04] backdrop-blur-sm",
          "shadow-[0_1px_2px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.08)]",
        ],

        // Variant: Outline (Pure structural boundary with hairline reflection)
        variant === "outline" && [
          "border border-border/80 dark:border-white/15 bg-transparent",
        ],

        // Variant: Elevated (Lightweight physical elevation with soft ambient depth and backdrop refraction)
        variant === "elevated" && [
          "border border-border/60 dark:border-white/15 bg-card/85 dark:bg-card/65 backdrop-blur-xl",
          "shadow-[0_12px_40px_-4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_16px_48px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.14)]",
        ],

        // Variant: Ghost (Unframed content group)
        variant === "ghost" && [
          "border-transparent bg-transparent shadow-none",
        ],

        // Interactive states: Only active when intentionally marked interactive
        interactive && [
          "cursor-pointer transition-all duration-150 ease-out",
          "hover:border-border/90 dark:hover:border-white/25 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-[0_16px_44px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]",
          "active:translate-y-0 active:scale-[0.99]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color,#0284c7)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ],

        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. CARD HEADER
 * Local structural hierarchy with responsive grid layout supporting actions.
 * ----------------------------------------------------------------------- */

export interface CardHeaderProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export function CardHeader({ className, asChild = false, ...props }: CardHeaderProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 px-(--card-spacing)",
        // Two-column layout when CardAction is present
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. CARD TITLE
 * Visual and structural title text. Supports polymorphic heading tags (h1-h6).
 * ----------------------------------------------------------------------- */

export interface CardTitleProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
}

export function CardTitle({
  className,
  asChild = false,
  as = "h3",
  ...props
}: CardTitleProps) {
  const Comp = asChild ? Slot : as;

  return (
    <Comp
      data-slot="card-title"
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
 * 4. CARD DESCRIPTION
 * Subordinate supporting context or description.
 * ----------------------------------------------------------------------- */

export interface CardDescriptionProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export function CardDescription({
  className,
  asChild = false,
  ...props
}: CardDescriptionProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="card-description"
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
 * 5. CARD ACTION
 * Layout slot for supplementary actions (e.g. Buttons, DropdownMenu triggers).
 * Does not itself receive interactive handlers.
 * ----------------------------------------------------------------------- */

export interface CardActionProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export function CardAction({
  className,
  asChild = false,
  ...props
}: CardActionProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end flex items-center gap-1.5",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. CARD CONTENT
 * Primary content region. Imposes no artificial heights or scroll constraints.
 * ----------------------------------------------------------------------- */

export interface CardContentProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export function CardContent({
  className,
  asChild = false,
  ...props
}: CardContentProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="card-content"
      className={cn("px-(--card-spacing) text-foreground/90", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 7. CARD FOOTER
 * Supporting actions or metadata region.
 * ----------------------------------------------------------------------- */

export interface CardFooterProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  /**
   * Optional top border separating the footer from the primary content.
   * @default false
   */
  divided?: boolean;
}

export function CardFooter({
  className,
  asChild = false,
  divided = false,
  ...props
}: CardFooterProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 px-(--card-spacing) pb-(--card-spacing)",
        divided && "mt-1 pt-3.5 border-t border-border/50",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND & SUBCOMPONENT EXPORTS
 * ----------------------------------------------------------------------- */

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Action = CardAction;
Card.Content = CardContent;
Card.Footer = CardFooter;

export {
  Card as Root,
  CardHeader as Header,
  CardTitle as Title,
  CardDescription as Description,
  CardAction as Action,
  CardContent as Content,
  CardFooter as Footer,
};
