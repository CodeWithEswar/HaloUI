"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

/**
 * SplitButton container variants.
 * Coordinates connected geometry, border overlap, and independent child stacking contexts.
 */
export const splitButtonVariants = cva(
  [
    "inline-flex isolate items-stretch",
    // Child stacking context: hover/focus/active controls float above adjacent borders
    "[&>*]:hover:z-10",
    "[&>*]:focus-visible:z-20",
    "[&>*]:active:z-20",
    // Connected geometry: primary action collapses end radius; trigger collapses start radius with 1px border overlap
    "[&>[data-slot='split-button-action']]:rounded-e-none",
    "[&>[data-slot='split-button-trigger']]:rounded-s-none",
    "[&>[data-slot='split-button-trigger']]:-ms-px",
    "[&>:first-child:not(:last-child)]:rounded-e-none",
    "[&>:last-child:not(:first-child)]:rounded-s-none",
    "[&>:not(:first-child)]:-ms-px",
  ],
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

/**
 * SplitButtonAction variants (Primary action button).
 * Inherits HaloUI's 10-layer physical liquid optical material engine.
 */
export const splitButtonActionVariants = cva(
  [
    "group/split-action relative inline-flex items-center justify-center font-medium select-none isolate overflow-hidden cursor-pointer",
    "whitespace-nowrap transition-all duration-200 ease-out outline-none",
    // Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-20 halo-focus-ring",
    // Tactile press response
    "halo-tactile-press",
    // Disabled State: muted optical transmission without destroying label legibility
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:transform-none",
    // SVG alignment
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "halo-liquid-glass text-neutral-900 dark:text-white",
        ],
        secondary: [
          "halo-liquid-glass text-neutral-800 dark:text-neutral-200 opacity-90 hover:opacity-100",
        ],
        outline: [
          "bg-white/[0.03] dark:bg-white/[0.02] text-neutral-800 dark:text-neutral-200",
          "border border-black/[0.18] dark:border-white/[0.22] hover:border-black/[0.32] dark:hover:border-white/[0.38]",
          "backdrop-blur-[8px]",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_0_rgba(0,0,0,0.15)]",
          "hover:-translate-y-0.5 active:scale-[0.96]",
        ],
        ghost: [
          "bg-transparent text-neutral-600 dark:text-neutral-400 border border-transparent",
          "hover:bg-white/[0.08] dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white hover:border-black/[0.08] dark:hover:border-white/[0.12]",
          "hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.4)]",
          "backdrop-blur-[8px] hover:-translate-y-0.5 active:scale-[0.96]",
        ],
        destructive: [
          "halo-liquid-glass text-rose-700 dark:text-rose-200 bg-rose-500/[0.08] dark:bg-rose-500/[0.12] border-rose-500/30 dark:border-rose-500/40",
          "shadow-[0_4px_16px_-4px_rgba(244,63,94,0.35),inset_2px_-2px_1px_-1px_rgba(255,255,255,0.7),inset_-2px_2px_1px_-1px_rgba(255,255,255,0.7)]",
          "focus-visible:ring-rose-500",
        ],
      },
      size: {
        default: "h-10 px-5 text-sm gap-2 rounded-full [&_svg:not([class*='size-'])]:size-4",
        sm: "h-8 px-3.5 text-xs gap-1.5 rounded-full [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 px-6 text-base gap-2.5 rounded-full [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * SplitButtonTrigger variants (Secondary dropdown menu trigger).
 * Dedicated square-geometry trigger sharing the parent's material family and size alignment.
 */
export const splitButtonTriggerVariants = cva(
  [
    "group/split-trigger relative inline-flex items-center justify-center font-medium select-none isolate overflow-hidden cursor-pointer",
    "whitespace-nowrap transition-all duration-200 ease-out outline-none shrink-0",
    // Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-20 halo-focus-ring",
    // Tactile press response
    "halo-tactile-press",
    // Disabled State
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:transform-none",
    // Restrained open/active state
    "data-popup-open:bg-black/10 dark:data-popup-open:bg-white/15 aria-expanded:bg-black/10 dark:aria-expanded:bg-white/15 data-[state=open]:bg-black/10 dark:data-[state=open]:bg-white/15",
    // SVG alignment
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "halo-liquid-glass text-neutral-900 dark:text-white",
        ],
        secondary: [
          "halo-liquid-glass text-neutral-800 dark:text-neutral-200 opacity-90 hover:opacity-100",
        ],
        outline: [
          "bg-white/[0.03] dark:bg-white/[0.02] text-neutral-800 dark:text-neutral-200",
          "border border-black/[0.18] dark:border-white/[0.22] hover:border-black/[0.32] dark:hover:border-white/[0.38]",
          "backdrop-blur-[8px]",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_0_rgba(0,0,0,0.15)]",
          "hover:-translate-y-0.5 active:scale-[0.96]",
        ],
        ghost: [
          "bg-transparent text-neutral-600 dark:text-neutral-400 border border-transparent",
          "hover:bg-white/[0.08] dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white hover:border-black/[0.08] dark:hover:border-white/[0.12]",
          "hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.4)]",
          "backdrop-blur-[8px] hover:-translate-y-0.5 active:scale-[0.96]",
        ],
        destructive: [
          "halo-liquid-glass text-rose-700 dark:text-rose-200 bg-rose-500/[0.08] dark:bg-rose-500/[0.12] border-rose-500/30 dark:border-rose-500/40",
          "shadow-[0_4px_16px_-4px_rgba(244,63,94,0.35),inset_2px_-2px_1px_-1px_rgba(255,255,255,0.7),inset_-2px_2px_1px_-1px_rgba(255,255,255,0.7)]",
          "focus-visible:ring-rose-500",
        ],
      },
      size: {
        default: "size-10 p-0 rounded-full [&_svg:not([class*='size-'])]:size-4",
        sm: "size-8 p-0 rounded-full [&_svg:not([class*='size-'])]:size-3.5",
        lg: "size-12 p-0 rounded-full [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type SplitButtonVariant = NonNullable<VariantProps<typeof splitButtonActionVariants>["variant"]>;
export type SplitButtonSize = NonNullable<VariantProps<typeof splitButtonActionVariants>["size"]>;

interface SplitButtonContextValue {
  variant: SplitButtonVariant;
  size: SplitButtonSize;
  disabled?: boolean;
}

const SplitButtonContext = React.createContext<SplitButtonContextValue>({
  variant: "default",
  size: "default",
  disabled: false,
});

export interface SplitButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof splitButtonVariants> {
  /**
   * Semantic visual material family applied to child actions.
   * @default "default"
   */
  variant?: SplitButtonVariant;
  /**
   * Unified size tier coordinating height and padding.
   * @default "default"
   */
  size?: SplitButtonSize;
  /**
   * Disables both the primary action and the secondary menu trigger.
   * @default false
   */
  disabled?: boolean;
  /**
   * Controlled open state for the secondary action menu.
   */
  open?: boolean;
  /**
   * Uncontrolled initial open state for the secondary action menu.
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when the open state of the secondary menu changes.
   */
  onOpenChange?: (open: boolean, eventDetails: any) => void;
  /**
   * Whether the secondary menu is modal.
   * @default false
   */
  modal?: boolean;
  /**
   * When true, provides the accessible MenuPrimitive.Root automatically.
   * Set to false if composing inside an existing external DropdownMenu provider.
   * @default true
   */
  root?: boolean;
}

/**
 * SplitButton — HaloUI Actions Primitive
 *
 * Combines a primary immediate action with a secondary menu of closely related alternative actions.
 * Reuses HaloUI connected geometry with zero focus ring clipping and authentic 10-layer liquid optical material.
 */
export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      disabled = false,
      open,
      defaultOpen,
      onOpenChange,
      modal = false,
      root = true,
      children,
      ...props
    },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        role="group"
        data-slot="split-button"
        data-variant={variant}
        data-size={size}
        className={cn(splitButtonVariants(), className)}
        {...props}
      >
        <SplitButtonContext.Provider value={{ variant, size, disabled }}>
          {children}
        </SplitButtonContext.Provider>
      </div>
    );

    if (!root) {
      return content;
    }

    return (
      <MenuPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        modal={modal}
        disabled={disabled}
      >
        {content}
      </MenuPrimitive.Root>
    );
  }
);

SplitButton.displayName = "SplitButton";

export interface SplitButtonActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  asChild?: boolean;
}

/**
 * SplitButtonAction — Primary immediate action button.
 *
 * Independently focusable and interactive. Directly executes the primary action
 * upon activation without opening the secondary dropdown menu.
 */
export const SplitButtonAction = React.forwardRef<HTMLButtonElement, SplitButtonActionProps>(
  (
    {
      className,
      variant: explicitVariant,
      size: explicitSize,
      disabled,
      asChild = false,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(SplitButtonContext);
    const variant = explicitVariant ?? context.variant;
    const size = explicitSize ?? context.size;
    const isDisabled = disabled ?? context.disabled;

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        disabled={isDisabled}
        data-slot="split-button-action"
        data-variant={variant}
        data-size={size}
        className={cn(
          splitButtonActionVariants({ variant, size }),
          "rounded-e-none",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SplitButtonAction.displayName = "SplitButtonAction";

export interface SplitButtonTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger> {
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  /**
   * Accessible name for the menu trigger.
   * Required to name the alternative actions (e.g. "More save options").
   */
  "aria-label"?: string;
}

/**
 * SplitButtonTrigger — Secondary disclosure trigger.
 *
 * Opens the accessible dropdown menu exposing alternative actions without executing the primary action.
 * Enforces accessible naming via `aria-label` or `aria-labelledby`.
 */
export const SplitButtonTrigger = React.forwardRef<HTMLButtonElement, SplitButtonTriggerProps>(
  (
    {
      className,
      variant: explicitVariant,
      size: explicitSize,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(SplitButtonContext);
    const variant = explicitVariant ?? context.variant;
    const size = explicitSize ?? context.size;
    const isDisabled = disabled ?? context.disabled;

    // Accessibility validation in non-production
    if (process.env.NODE_ENV !== "production") {
      const hasAccessibleName = Boolean(
        props["aria-label"] || props["aria-labelledby"] || props.title
      );
      if (!hasAccessibleName && typeof console !== "undefined") {
        console.warn(
          "[HaloUI SplitButtonTrigger]: An accessible name is mandatory for the secondary menu trigger. Please provide an 'aria-label' describing the alternative actions (e.g., aria-label=\"More export options\")."
        );
      }
    }

    const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

    return (
      <MenuPrimitive.Trigger
        ref={ref}
        disabled={isDisabled}
        data-slot="split-button-trigger"
        data-variant={variant}
        data-size={size}
        className={cn(
          splitButtonTriggerVariants({ variant, size }),
          "rounded-s-none -ms-px",
          className
        )}
        {...props}
      >
        {children ?? (
          <HaloIcon
            icon={ArrowDown01Icon}
            size={iconSize}
            className="transition-transform duration-200 group-data-[state=open]/split-trigger:rotate-180 data-popup-open:rotate-180 aria-expanded:rotate-180"
          />
        )}
      </MenuPrimitive.Trigger>
    );
  }
);

SplitButtonTrigger.displayName = "SplitButtonTrigger";

export interface SplitButtonContentProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Popup>,
    Pick<
      MenuPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {}

/**
 * SplitButtonContent — Portalled overlay containing alternative actions.
 *
 * Uses the established accessible menu popup primitive with responsive positioning and smooth entrance motion.
 */
export function SplitButtonContent({
  align = "end",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  className,
  ...props
}: SplitButtonContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="split-button-content"
          className={cn(
            "z-50 max-h-(--available-height) min-w-44 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl bg-popover/95 p-1.5 text-popover-foreground shadow-xl ring-1 ring-foreground/10 backdrop-blur-md duration-150 outline-none",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export interface SplitButtonItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

/**
 * SplitButtonItem — Accessible alternative action item.
 */
export function SplitButtonItem({
  className,
  inset,
  variant = "default",
  ...props
}: SplitButtonItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="split-button-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/split-item relative flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-hidden select-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground",
        "data-inset:pl-7",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  );
}

/**
 * SplitButtonSeparator — Restrained menu boundary separator.
 */
export function SplitButtonSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      data-slot="split-button-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  );
}

/**
 * SplitButtonLabel — Section title inside alternative actions menu.
 */
export function SplitButtonLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
}) {
  return (
    <div
      data-slot="split-button-label"
      data-inset={inset}
      className={cn(
        "px-2.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  );
}

/**
 * SplitMenuGroup — Group wrapper for grouped alternative actions.
 */
export function SplitMenuGroup({
  ...props
}: React.ComponentPropsWithoutRef<typeof MenuPrimitive.Group>) {
  return <MenuPrimitive.Group data-slot="split-button-group" {...props} />;
}

// Convenient alias for backwards-compatibility or alternate composition
export { SplitButton as SplitButtonGroup };
