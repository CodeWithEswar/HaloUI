"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowDown01Icon, Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

/**
 * Combobox — Forms & Fields Primitive
 *
 * An accessible searchable option picker for selecting one value
 * from a filterable collection, styled with HaloUI's 10-layer
 * optical liquid glass engine.
 */
const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("flex size-7 items-center justify-center text-muted-foreground select-none", className)}
      {...props}
    >
      {children}
      <HaloIcon icon={ArrowDown01Icon} size={15} />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <HaloIcon icon={Cancel01Icon} size={14} className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

export interface ComboboxInputProps extends ComboboxPrimitive.Input.Props {
  showTrigger?: boolean;
  showClear?: boolean;
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxInputProps) {
  return (
    <InputGroup className={cn("w-full", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  children,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
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
          <div className="relative z-10">{children}</div>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "max-h-60 overflow-y-auto overscroll-contain p-0.5 space-y-0.5 outline-none",
        className
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl py-2 pl-3 pr-8 text-sm outline-none select-none transition-all duration-150",
        // Active roving focus state: frosted glass highlight
        "data-highlighted:bg-white/80 dark:data-highlighted:bg-white/[0.14] data-highlighted:backdrop-blur-md",
        "data-highlighted:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),0_1px_3px_0_rgba(0,0,0,0.06)]",
        "dark:data-highlighted:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),0_2px_6px_0_rgba(0,0,0,0.4)]",
        "data-highlighted:text-foreground",
        // Selected committed state
        "data-selected:font-medium data-selected:text-foreground",
        // Disabled option
        "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-35",
        className
      )}
      {...props}
    >
      <span className="flex flex-1 items-center gap-2 truncate">{children}</span>
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2.5 flex size-4 items-center justify-center text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]">
            <HaloIcon icon={Tick02Icon} size={15} />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("p-1", className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none", className)}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "py-6 text-center text-sm text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-black/[0.08] dark:bg-white/[0.08]", className)}
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxValue,
};

export default Combobox;
