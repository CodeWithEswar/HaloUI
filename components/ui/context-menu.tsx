"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { cn } from "@/lib/utils"
import { ArrowRight01Icon, Tick01Icon } from "@hugeicons/core-free-icons"
import { HaloIcon } from "@/components/icons/halo-icon"

export type ContextMenuIntensity = "subtle" | "balanced" | "rich"

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

export interface ContextMenuTriggerProps
  extends ContextMenuPrimitive.Trigger.Props {
  asChild?: boolean
}

function ContextMenuTrigger({
  asChild,
  children,
  className,
  ...props
}: ContextMenuTriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return (
      <ContextMenuPrimitive.Trigger
        data-slot="context-menu-trigger"
        render={children as React.ReactElement}
        {...props}
      />
    )
  }
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Trigger>
  )
}

export interface ContextMenuContentProps
  extends ContextMenuPrimitive.Popup.Props,
    Partial<
      Pick<
        ContextMenuPrimitive.Positioner.Props,
        | "align"
        | "alignOffset"
        | "side"
        | "sideOffset"
        | "collisionBoundary"
        | "collisionPadding"
        | "sticky"
        | "arrowPadding"
      >
    > {
  intensity?: ContextMenuIntensity
}

function ContextMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  collisionBoundary,
  collisionPadding = 8,
  sticky,
  arrowPadding,
  intensity = "balanced",
  className,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={sticky}
        arrowPadding={arrowPadding}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          data-intensity={intensity}
          className={cn(
            "z-50 min-w-48 max-w-xs origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl p-1.5 text-foreground duration-150 outline-none shadow-lg",
            "halo-liquid-glass-surface",
            intensity === "subtle" && "halo-intensity-subtle",
            intensity === "balanced" && "halo-intensity-balanced",
            intensity === "rich" && "halo-intensity-rich",
            // Kinematic entry/exit transitions
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            // Axis directional slide
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2",
            className
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean
}) {
  return (
    <div
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider select-none",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

export interface ContextMenuItemProps
  extends ContextMenuPrimitive.Item.Props {
  inset?: boolean
  variant?: "default" | "destructive"
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/context-menu-item relative flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none select-none transition-colors",
        "text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.08] data-highlighted:bg-black/[0.06] dark:data-highlighted:bg-white/[0.1]",
        variant === "destructive" &&
          "text-destructive hover:bg-destructive/10 data-highlighted:bg-destructive/10 dark:hover:bg-destructive/20 dark:data-highlighted:bg-destructive/20",
        inset && "pl-8",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "group/sub-trigger flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none select-none transition-colors",
        "text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.08] data-highlighted:bg-black/[0.06] dark:data-highlighted:bg-white/[0.1] data-popup-open:bg-black/[0.06] dark:data-popup-open:bg-white/[0.1]",
        inset && "pl-8",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <HaloIcon
        icon={ArrowRight01Icon}
        size={14}
        className="ml-auto text-muted-foreground group-hover/sub-trigger:text-foreground transition-colors"
      />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

function ContextMenuSubContent({
  align = "start",
  alignOffset = -4,
  side = "right",
  sideOffset = 4,
  className,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cn("min-w-44", className)}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pr-8 pl-2.5 text-xs font-medium outline-none select-none transition-colors",
        "text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.08] data-highlighted:bg-black/[0.06] dark:data-highlighted:bg-white/[0.1]",
        inset && "pl-8",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2.5 flex items-center justify-center text-primary"
        data-slot="context-menu-checkbox-item-indicator"
      >
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <HaloIcon icon={Tick01Icon} size={14} />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioGroup({
  ...props
}: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pr-8 pl-2.5 text-xs font-medium outline-none select-none transition-colors",
        "text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.08] data-highlighted:bg-black/[0.06] dark:data-highlighted:bg-white/[0.1]",
        inset && "pl-8",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2.5 flex items-center justify-center text-primary"
        data-slot="context-menu-radio-item-indicator"
      >
        <ContextMenuPrimitive.RadioItemIndicator>
          <span className="size-1.5 rounded-full bg-current" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1.5 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto text-[11px] font-mono tracking-wider text-muted-foreground group-data-highlighted/context-menu-item:text-foreground transition-colors",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuPortal,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
}
