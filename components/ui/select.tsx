"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon, ArrowUp01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

/**
 * Select — Forms & Fields Primitive
 *
 * An accessible custom option picker for selecting one value
 * from a structured list of choices, rendered with HaloUI's
 * 10-layer physical optical liquid glass engine.
 */
const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left truncate data-placeholder:text-muted-foreground", className)}
      {...props}
    />
  );
}

export interface SelectTriggerProps extends SelectPrimitive.Trigger.Props {
  size?: "default" | "sm";
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // HaloUI Physical Liquid Glass Engine (Inherited directly from Button specification)
        "halo-liquid-glass group/trigger relative flex w-full min-w-0 items-center justify-between gap-2 text-sm outline-none cursor-pointer text-foreground select-none",
        size === "sm" ? "h-8 text-xs px-2.5 rounded-lg" : "h-10 text-sm px-3.5 rounded-xl",
        // Independent Double-Contrast Focus Ring (Halo Focus Ring)
        "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
        // Invalid state (Dual Indicator Visibility)
        "aria-invalid:border-destructive/80 aria-invalid:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)] dark:aria-invalid:border-destructive/70",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex flex-1 items-center gap-2 truncate">{children}</span>
      <SelectPrimitive.Icon
        render={
          <span className="pointer-events-none relative z-10 flex size-4 items-center justify-center text-muted-foreground select-none transition-transform duration-200 group-data-[open]/trigger:rotate-180">
            <HaloIcon icon={ArrowDown01Icon} size={15} />
          </span>
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            // HaloUI Physical Liquid Glass Engine (Button Specification with elevated backdrop opacity)
            "halo-liquid-glass relative isolate z-50 max-h-(--available-height) min-w-(--anchor-width) w-auto max-w-sm origin-(--transform-origin) overflow-hidden rounded-2xl p-1.5 text-foreground outline-none",
            "!bg-white/85 dark:!bg-neutral-950/80 !backdrop-blur-2xl !backdrop-saturate-200",
            // Micro animation
            "duration-150 data-[side=bottom]:slide-in-from-top-1.5 data-[side=top]:slide-in-from-bottom-1.5 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-98 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-98",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="relative z-10 p-0.5 space-y-0.5">{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl py-2 pl-3 pr-8 text-sm outline-none select-none transition-all duration-150",
        // Active roving focus state: frosted glass highlight
        "data-highlighted:bg-white/80 dark:data-highlighted:bg-white/[0.14] data-highlighted:backdrop-blur-md",
        "data-highlighted:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),0_1px_3px_0_rgba(0,0,0,0.06)]",
        "dark:data-highlighted:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),0_2px_6px_0_rgba(0,0,0,0.4)]",
        "data-highlighted:text-foreground",
        // Selected committed state
        "data-selected:font-medium data-selected:text-foreground",
        // Disabled item
        "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-35",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2.5 flex size-4 items-center justify-center text-primary">
            <HaloIcon icon={Tick02Icon} size={15} />
          </span>
        }
      />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-black/[0.08] dark:bg-white/[0.08]", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-20 flex w-full cursor-default items-center justify-center bg-white/40 dark:bg-black/40 py-1 text-muted-foreground select-none backdrop-blur-md",
        className
      )}
      {...props}
    >
      <HaloIcon icon={ArrowUp01Icon} size={14} />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-20 flex w-full cursor-default items-center justify-center bg-white/40 dark:bg-black/40 py-1 text-muted-foreground select-none backdrop-blur-md",
        className
      )}
      {...props}
    >
      <HaloIcon icon={ArrowDown01Icon} size={14} />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

export default Select;
