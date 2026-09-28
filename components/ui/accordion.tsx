"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type AccordionVariant = "default" | "outline" | "muted" | "glass" | "ghost";
export type AccordionDensity = "default" | "compact" | "relaxed";

export interface AccordionProps
  extends Omit<AccordionPrimitive.Root.Props, "value" | "defaultValue"> {
  /**
   * Controlled value of the expanded item(s).
   * Accepts a single string identifier or an array of strings.
   */
  value?: string | string[] | any;
  /**
   * Initial value of the expanded item(s) in uncontrolled mode.
   * Accepts a single string identifier or an array of strings.
   */
  defaultValue?: string | string[] | any;
  /**
   * Visual framing variant for the outer disclosure group:
   * - "default": Subtle border with neutral tinted card background.
   * - "outline": Crisp 1px structural hairline border with transparent background.
   * - "muted": Soft low-contrast tinted background.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular reflection and ambient depth.
   * - "ghost": Unbordered, minimal edge-to-edge layout.
   * @default "default"
   */
  variant?: AccordionVariant;
  /**
   * Spatial density scale controlling vertical and horizontal padding across triggers and panels:
   * - "default": Standard 14px vertical padding (text-sm).
   * - "compact": High-density 8-10px vertical padding (text-xs).
   * - "relaxed": Spacious 18px vertical rhythm for FAQ and property pages.
   * @default "default"
   */
  density?: AccordionDensity;
}

export interface AccordionItemProps extends AccordionPrimitive.Item.Props {
  /**
   * Optional custom class names applied to the item boundary.
   */
  className?: string;
}

export interface AccordionTriggerProps extends AccordionPrimitive.Trigger.Props {
  /**
   * Optional custom decorative icon placed before the trigger label.
   */
  icon?: React.ReactNode;
  /**
   * Custom badge or metadata element displayed beside the trigger label.
   */
  badge?: React.ReactNode;
  /**
   * Hide the automatic rotating chevron disclosure indicator.
   * @default false
   */
  hideIndicator?: boolean;
}

export interface AccordionContentProps extends AccordionPrimitive.Panel.Props {
  /**
   * Optional custom class names applied to the expanded panel container.
   */
  className?: string;
}

/* -------------------------------------------------------------------------
 * 1. ROOT ACCORDION COMPONENT
 * Coordinated disclosure group primitive built on Base UI Accordion.
 * Features container-aware responsive layout and restrained Liquid Glass outer shell.
 * ----------------------------------------------------------------------- */

export function Accordion({
  className,
  variant = "default",
  density = "default",
  value,
  defaultValue,
  ...props
}: AccordionProps) {
  const normalizedValue = typeof value === "string" ? [value] : value;
  const normalizedDefaultValue =
    typeof defaultValue === "string" ? [defaultValue] : defaultValue;

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      data-density={density}
      value={normalizedValue}
      defaultValue={normalizedDefaultValue}
      className={cn(
        // Responsive container query boundary and group styling
        "@container/accordion group/accordion relative flex w-full flex-col min-w-0 text-foreground",
        "transition-colors duration-150",

        // Outer surface variants
        variant === "default" && [
          "rounded-xl border border-border/70 bg-card/40 divide-y divide-border/60",
          "shadow-xs",
        ],
        variant === "outline" && [
          "rounded-xl border border-border/80 bg-transparent divide-y divide-border/60",
        ],
        variant === "muted" && [
          "rounded-xl border border-border/40 bg-muted/40 divide-y divide-border/50",
        ],
        variant === "ghost" && [
          "border-none bg-transparent shadow-none divide-y divide-border/60",
        ],
        variant === "glass" && [
          "rounded-2xl border border-border/70 dark:border-white/16",
          "bg-card/75 dark:bg-card/30 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]",
          "divide-y divide-border/60 dark:divide-white/10",
        ],

        // Density scale coordination across triggers and panels via pure CSS
        density === "default" && [
          "[&_[data-slot=accordion-trigger]]:px-4 [&_[data-slot=accordion-trigger]]:py-3.5",
          "[&_[data-slot=accordion-content-inner]]:px-4 [&_[data-slot=accordion-content-inner]]:pb-4",
        ],
        density === "compact" && [
          "[&_[data-slot=accordion-trigger]]:px-3 [&_[data-slot=accordion-trigger]]:py-2.5 [&_[data-slot=accordion-trigger]]:text-xs",
          "[&_[data-slot=accordion-content-inner]]:px-3 [&_[data-slot=accordion-content-inner]]:pb-3 [&_[data-slot=accordion-content-inner]]:text-xs",
        ],
        density === "relaxed" && [
          "[&_[data-slot=accordion-trigger]]:px-5 [&_[data-slot=accordion-trigger]]:py-4.5 [&_[data-slot=accordion-trigger]]:text-base",
          "[&_[data-slot=accordion-content-inner]]:px-5 [&_[data-slot=accordion-content-inner]]:pb-5",
        ],

        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. ACCORDION ITEM
 * Individual expandable disclosure section item.
 * Strictly transparent/quiet — zero individual heavy glass surfaces per item.
 * ----------------------------------------------------------------------- */

export function AccordionItem({
  className,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "relative flex flex-col w-full min-w-0 transition-colors duration-150",
        // Subtle optical emphasis when item is open
        "data-open:bg-muted/15 dark:data-open:bg-white/[0.02]",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. ACCORDION TRIGGER
 * Accessible interactive trigger button with automatic label wrapping,
 * independent Halo focus ring, and smoothly rotating disclosure chevron.
 * ----------------------------------------------------------------------- */

export function AccordionTrigger({
  className,
  children,
  icon,
  badge,
  hideIndicator = false,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between text-left text-sm font-medium",
          "w-full min-w-0 select-none transition-colors duration-150",
          // Hover scan-assistance
          "hover:bg-muted/40 dark:hover:bg-muted/20",
          // Accessible Halo Focus Ring
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:z-10",
          // Disabled state
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-3">
          {icon && (
            <span className="shrink-0 text-muted-foreground flex items-center">
              {icon}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 min-w-0 flex-1">
            <span className="min-w-0 break-words font-medium leading-normal text-foreground">
              {children}
            </span>
            {badge && <span className="shrink-0">{badge}</span>}
          </div>
        </div>

        {!hideIndicator && (
          <HaloIcon
            icon={ArrowDown01Icon}
            size={16}
            data-slot="accordion-trigger-icon"
            className={cn(
              "text-muted-foreground shrink-0 transition-transform duration-200 ease-out",
              "group-aria-expanded/accordion-trigger:rotate-180 group-data-[open]/accordion-trigger:rotate-180",
              "motion-reduce:transition-none"
            )}
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/* -------------------------------------------------------------------------
 * 4. ACCORDION CONTENT
 * Expandable content panel revealing arbitrary semantic child elements.
 * ----------------------------------------------------------------------- */

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground transition-all",
        "data-open:animate-accordion-down data-closed:animate-accordion-up",
        className
      )}
      {...props}
    >
      <div
        data-slot="accordion-content-inner"
        className="pt-0 text-muted-foreground leading-relaxed [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-3"
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND ATTACHMENTS
 * ----------------------------------------------------------------------- */

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
