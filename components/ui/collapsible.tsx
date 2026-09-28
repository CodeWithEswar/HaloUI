"use client";

import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type CollapsibleVariant = "default" | "outline" | "muted" | "glass" | "ghost";
export type CollapsibleDensity = "default" | "compact" | "relaxed";

export interface CollapsibleProps extends CollapsiblePrimitive.Root.Props {
  /**
   * Visual framing variant for the disclosure container:
   * - "default": Subtle border with neutral tinted card background.
   * - "outline": Crisp 1px structural hairline border with transparent background.
   * - "muted": Soft low-contrast tinted background.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular reflection and ambient depth.
   * - "ghost": Unbordered, minimal edge-to-edge layout without background.
   * @default "default"
   */
  variant?: CollapsibleVariant;
  /**
   * Spatial density scale controlling vertical and horizontal padding across trigger and content:
   * - "default": Standard 14px vertical padding (text-sm).
   * - "compact": High-density 8-10px vertical padding (text-xs).
   * - "relaxed": Spacious 18px vertical rhythm for hero disclosures and settings panels.
   * @default "default"
   */
  density?: CollapsibleDensity;
}

export interface CollapsibleTriggerProps extends CollapsiblePrimitive.Trigger.Props {
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
   * Useful when composing custom trigger buttons or external action bars.
   * @default false
   */
  hideIndicator?: boolean;
}

export interface CollapsibleContentProps extends CollapsiblePrimitive.Panel.Props {
  /**
   * Optional custom class names applied to the expanded panel container.
   */
  className?: string;
}

/* -------------------------------------------------------------------------
 * 1. ROOT COLLAPSIBLE COMPONENT
 * Independent expandable disclosure primitive built on Base UI Collapsible.
 * Features container-aware responsive reflow and restrained Liquid Glass outer shell.
 * ----------------------------------------------------------------------- */

export function Collapsible({
  className,
  variant = "default",
  density = "default",
  ...props
}: CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      data-variant={variant}
      data-density={density}
      className={cn(
        // Responsive container query boundary and group styling
        "@container/collapsible group/collapsible relative flex w-full flex-col min-w-0 text-foreground",
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
          "[&_[data-slot=collapsible-trigger]]:px-4 [&_[data-slot=collapsible-trigger]]:py-3.5",
          "[&_[data-slot=collapsible-content-inner]]:px-4 [&_[data-slot=collapsible-content-inner]]:pb-4",
        ],
        density === "compact" && [
          "[&_[data-slot=collapsible-trigger]]:px-3 [&_[data-slot=collapsible-trigger]]:py-2.5 [&_[data-slot=collapsible-trigger]]:text-xs",
          "[&_[data-slot=collapsible-content-inner]]:px-3 [&_[data-slot=collapsible-content-inner]]:pb-3 [&_[data-slot=collapsible-content-inner]]:text-xs",
        ],
        density === "relaxed" && [
          "[&_[data-slot=collapsible-trigger]]:px-5 [&_[data-slot=collapsible-trigger]]:py-4.5 [&_[data-slot=collapsible-trigger]]:text-base",
          "[&_[data-slot=collapsible-content-inner]]:px-5 [&_[data-slot=collapsible-content-inner]]:pb-5",
        ],

        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. COLLAPSIBLE TRIGGER
 * Accessible interactive trigger button with automatic label wrapping,
 * independent Halo focus ring, and smoothly rotating disclosure chevron.
 * ----------------------------------------------------------------------- */

export function CollapsibleTrigger({
  className,
  children,
  icon,
  badge,
  hideIndicator = false,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "group/collapsible-trigger relative flex flex-1 items-center justify-between text-left text-sm font-medium",
        "w-full min-w-0 select-none transition-colors duration-150",
        // Hover scan-assistance
        "hover:bg-muted/40 dark:hover:bg-muted/20",
        // Accessible Halo Focus Ring
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:z-10",
        // Disabled state
        "disabled:pointer-events-none disabled:opacity-50",
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
          data-slot="collapsible-trigger-icon"
          className={cn(
            "text-muted-foreground shrink-0 transition-transform duration-200 ease-out",
            "group-aria-expanded/collapsible-trigger:rotate-180 group-data-[panel-open]/collapsible-trigger:rotate-180 group-data-[open]/collapsible-trigger:rotate-180",
            "motion-reduce:transition-none"
          )}
        />
      )}
    </CollapsiblePrimitive.Trigger>
  );
}

/* -------------------------------------------------------------------------
 * 3. COLLAPSIBLE CONTENT
 * Expandable content panel revealing arbitrary semantic child elements.
 * ----------------------------------------------------------------------- */

export function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground transition-all duration-200 ease-out",
        "data-starting-style:h-0 data-ending-style:h-0",
        "data-open:animate-accordion-down data-closed:animate-accordion-up",
        className
      )}
      {...props}
    >
      <div
        data-slot="collapsible-content-inner"
        className="pt-3 text-muted-foreground leading-relaxed [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-3"
      >
        {children}
      </div>
    </CollapsiblePrimitive.Panel>
  );
}

/* -------------------------------------------------------------------------
 * COMPOUND ATTACHMENTS
 * ----------------------------------------------------------------------- */

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;
