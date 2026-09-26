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
  variant?: "glass" | "default";
}

function SelectTrigger({
  className,
  size = "default",
  variant = "glass",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/trigger relative flex w-full min-w-0 items-center justify-between gap-2 text-sm outline-none cursor-pointer select-none transition-all duration-150",
        variant === "glass" ? [
          "halo-liquid-glass text-[var(--halo-glass-text)]",
          "hover:translate-y-[-1px]",
          "active:scale-[0.98]",
        ] : [
          "border border-border bg-background text-foreground shadow-2xs hover:bg-muted/70 hover:text-foreground",
        ],
        size === "sm" ? "h-8 text-xs px-2.5 rounded-[9px]" : "h-10 text-sm px-3.5 rounded-xl",
        // Independent Double-Contrast Focus Ring (Halo Focus Ring)
        "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
        // Invalid state (Dual Indicator Visibility)
        "aria-invalid:border-destructive/80 aria-invalid:shadow-[inset_0_1px_2px_rgba(244,63,94,0.15)] dark:aria-invalid:border-destructive/70",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex flex-1 items-center gap-2 truncate font-medium">{children}</span>
      <SelectPrimitive.Icon
        render={
          <span className="pointer-events-none relative z-10 flex size-5 items-center justify-center rounded-md bg-black/[0.05] dark:bg-white/[0.08] text-muted-foreground select-none transition-transform duration-200 group-data-[open]/trigger:rotate-180 group-data-[popup-open]/trigger:rotate-180 border border-black/5 dark:border-white/10 shadow-2xs">
            <HaloIcon icon={ArrowDown01Icon} size={14} />
          </span>
        }
      />
    </SelectPrimitive.Trigger>
  );
}

export interface SelectContentProps
  extends SelectPrimitive.Popup.Props,
    Pick<
      SelectPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    > {
  variant?: "glass" | "default";
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  variant = "glass",
  ...props
}: SelectContentProps) {
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
          data-variant={variant}
          className={cn(
            "relative isolate z-50 max-h-(--available-height) min-w-(--anchor-width) w-auto max-w-sm origin-(--transform-origin) overflow-hidden rounded-2xl p-1.5 text-foreground outline-none",
            // Floating Frosted Liquid Glass Surface (Apple iOS / macOS style, not too transparent)
            "halo-liquid-glass-surface",
            // Smooth Base UI Native CSS Transitions
            "transition-[opacity,transform] duration-150 ease-out",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:data-[side=bottom]:-translate-y-1 data-[starting-style]:data-[side=top]:translate-y-1",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:data-[side=bottom]:-translate-y-1 data-[ending-style]:data-[side=top]:translate-y-1",
            "data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:pointer-events-none",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="relative z-10 p-0.5 space-y-1">{children}</SelectPrimitive.List>
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
        "relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl py-2 pl-3 pr-8 text-sm outline-none select-none transition-colors duration-100",
        // Active roving focus state
        "hover:bg-black/[0.05] dark:hover:bg-white/[0.08]",
        "data-highlighted:bg-black/[0.06] dark:data-highlighted:bg-white/[0.1] data-highlighted:text-foreground",
        // Selected committed state
        "data-selected:font-semibold data-selected:text-foreground",
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
