"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "@/lib/utils"

export type TooltipIntensity = "subtle" | "balanced"

function TooltipProvider({
  delay = 150,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

export interface TooltipTriggerProps
  extends TooltipPrimitive.Trigger.Props {
  asChild?: boolean
}

function TooltipTrigger({
  asChild,
  children,
  ...props
}: TooltipTriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return (
      <TooltipPrimitive.Trigger
        data-slot="tooltip-trigger"
        render={children as React.ReactElement}
        {...props}
      />
    )
  }
  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props}>
      {children}
    </TooltipPrimitive.Trigger>
  )
}

function TooltipPortal({ ...props }: TooltipPrimitive.Portal.Props) {
  return <TooltipPrimitive.Portal data-slot="tooltip-portal" {...props} />
}

function TooltipArrow({
  className,
  ...props
}: TooltipPrimitive.Arrow.Props) {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      className={cn("fill-popover text-border drop-shadow-xs", className)}
      {...props}
    />
  )
}

export interface TooltipContentProps
  extends TooltipPrimitive.Popup.Props,
    Partial<
      Pick<
        TooltipPrimitive.Positioner.Props,
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
  intensity?: TooltipIntensity
  showArrow?: boolean
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  collisionBoundary,
  collisionPadding = 8,
  sticky,
  arrowPadding,
  intensity = "subtle",
  showArrow = false,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={sticky}
        arrowPadding={arrowPadding}
        className="isolate z-50 pointer-events-none"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          data-intensity={intensity}
          className={cn(
            "relative z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-foreground select-none outline-none shadow-sm duration-150",
            "halo-liquid-glass-surface",
            intensity === "subtle" ? "halo-intensity-subtle" : "halo-intensity-balanced",
            // Kinematic entry/exit transitions
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            // Axis directional translation
            "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
            // Keyboard shortcut tag alignment
            "has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm",
            className
          )}
          {...props}
        >
          {showArrow && <TooltipArrow />}
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPortal>
  )
}

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
}
