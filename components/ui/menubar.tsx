"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { cn } from "@/lib/utils"
import { Tick01Icon } from "@hugeicons/core-free-icons"
import { HaloIcon } from "@/components/icons/halo-icon"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "relative inline-flex h-9 items-center gap-0.5 rounded-xl isolate select-none transition-all duration-200",
        // HaloUI 10-Layer Physical Optical Liquid Glass Engine
        "bg-white/65 dark:bg-neutral-950/65 backdrop-blur-2xl backdrop-saturate-180",
        "border border-white/80 dark:border-white/[0.18]",
        // Inner Refraction Rim (Layer 03)
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
        "before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.06)]",
        "dark:before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
        // 135° Directional Specular Reflection (Layer 04)
        "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit]",
        "after:bg-gradient-to-br after:from-white/35 after:via-white/5 after:to-transparent dark:after:from-white/12 dark:after:via-transparent dark:after:to-transparent",
        // Anchoring Shadows
        "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_2px_6px_-1px_rgba(0,0,0,0.04)]",
        "dark:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.7),0_4px_12px_-2px_rgba(0,0,0,0.5)]",
        "p-1 overflow-visible",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      className={cn(
        "flex cursor-pointer items-center rounded-lg px-2.5 py-1 text-xs sm:text-sm font-medium outline-hidden select-none transition-colors text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 focus:bg-black/5 dark:focus:bg-white/10 focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:outline-none aria-expanded:bg-black/10 dark:aria-expanded:bg-white/15 aria-expanded:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "min-w-48 rounded-2xl isolate p-1.5 duration-150 select-none overflow-visible",
        // HaloUI 10-Layer Optical Liquid Glass Popover Surface
        "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-2xl backdrop-saturate-180",
        "border border-white/80 dark:border-white/[0.18] text-popover-foreground",
        // Inner Refraction Rim
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
        "before:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1.5px_0_rgba(0,0,0,0.08)]",
        "dark:before:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_1.5px_0_rgba(0,0,0,0.7)]",
        // 135° Specular Reflection
        "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit]",
        "after:bg-gradient-to-br after:from-white/35 after:via-white/5 after:to-transparent dark:after:from-white/12 dark:after:via-transparent dark:after:to-transparent",
        // Floating Depth Shadows
        "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2),0_8px_20px_-4px_rgba(0,0,0,0.1)]",
        "dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),0_8px_24px_-4px_rgba(0,0,0,0.6)]",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        className
      )}
      {...props}
    />
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/menubar-item relative flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs sm:text-sm font-medium outline-hidden select-none transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus:bg-black/[0.06] dark:focus:bg-white/[0.1] text-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:opacity-50 data-disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pr-2 pl-7 text-xs sm:text-sm outline-hidden select-none transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus:bg-black/[0.06] dark:focus:bg-white/[0.1] text-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <HaloIcon icon={Tick01Icon} size={14} className="text-primary" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pr-2 pl-7 text-xs sm:text-sm outline-hidden select-none transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus:bg-black/[0.06] dark:focus:bg-white/[0.1] text-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <span className="size-1.5 rounded-full bg-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean
}) {
  return (
    <div
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider data-inset:pl-7 select-none",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border/70", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      data-slot="menubar-shortcut"
      className={cn(
        "ml-auto text-[11px] font-mono tracking-widest text-muted-foreground/80 group-focus/menubar-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "gap-1.5 rounded-lg px-2 py-1.5 text-xs sm:text-sm focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  return (
    <DropdownMenuSubContent
      data-slot="menubar-sub-content"
      className={cn(
        "min-w-44 rounded-2xl isolate p-1.5 duration-150 select-none overflow-visible",
        // HaloUI 10-Layer Optical Liquid Glass Popover Surface
        "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-2xl backdrop-saturate-180",
        "border border-white/80 dark:border-white/[0.18] text-popover-foreground",
        // Inner Refraction Rim
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
        "before:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1.5px_0_rgba(0,0,0,0.08)]",
        "dark:before:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_1.5px_0_rgba(0,0,0,0.7)]",
        // 135° Specular Reflection
        "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit]",
        "after:bg-gradient-to-br after:from-white/35 after:via-white/5 after:to-transparent dark:after:from-white/12 dark:after:via-transparent dark:after:to-transparent",
        // Floating Depth Shadows
        "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2),0_8px_20px_-4px_rgba(0,0,0,0.1)]",
        "dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),0_8px_24px_-4px_rgba(0,0,0,0.6)]",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
