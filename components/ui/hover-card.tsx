"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cn } from "@/lib/utils"

export type HoverCardIntensity = "subtle" | "balanced" | "rich"

interface HoverCardContextValue {
  openDelay?: number
  closeDelay?: number
}

const HoverCardContext = React.createContext<HoverCardContextValue>({})

export interface HoverCardProps extends PreviewCardPrimitive.Root.Props {
  /**
   * Delay in milliseconds before opening the preview card on hover/focus.
   * @default 300
   */
  openDelay?: number
  /**
   * Delay in milliseconds before closing the preview card when pointer leaves.
   * @default 200
   */
  closeDelay?: number
}

function HoverCard({
  openDelay = 300,
  closeDelay = 200,
  children,
  ...props
}: HoverCardProps) {
  return (
    <HoverCardContext.Provider value={{ openDelay, closeDelay }}>
      <PreviewCardPrimitive.Root data-slot="hover-card" {...props}>
        {children}
      </PreviewCardPrimitive.Root>
    </HoverCardContext.Provider>
  )
}

export interface HoverCardTriggerProps
  extends PreviewCardPrimitive.Trigger.Props {
  openDelay?: number
  closeDelay?: number
}

function HoverCardTrigger({
  className,
  openDelay,
  closeDelay,
  delay: explicitDelay,
  closeDelay: explicitCloseDelay,
  ...props
}: HoverCardTriggerProps) {
  const context = React.useContext(HoverCardContext)
  const effectiveDelay = explicitDelay ?? openDelay ?? context.openDelay ?? 300
  const effectiveCloseDelay =
    explicitCloseDelay ?? closeDelay ?? context.closeDelay ?? 200

  return (
    <PreviewCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      delay={effectiveDelay}
      closeDelay={effectiveCloseDelay}
      className={cn("outline-none transition-colors", className)}
      {...props}
    />
  )
}

function HoverCardPortal({ ...props }: PreviewCardPrimitive.Portal.Props) {
  return <PreviewCardPrimitive.Portal data-slot="hover-card-portal" {...props} />
}

function HoverCardArrow({
  className,
  ...props
}: PreviewCardPrimitive.Arrow.Props) {
  return (
    <PreviewCardPrimitive.Arrow
      data-slot="hover-card-arrow"
      className={cn("fill-popover text-border drop-shadow-sm", className)}
      {...props}
    />
  )
}

export interface HoverCardContentProps
  extends PreviewCardPrimitive.Popup.Props,
    Partial<
      Pick<
        PreviewCardPrimitive.Positioner.Props,
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
  intensity?: HoverCardIntensity
  showArrow?: boolean
}

function HoverCardContent({
  className,
  children,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  collisionBoundary,
  collisionPadding = 8,
  sticky,
  arrowPadding,
  intensity = "balanced",
  showArrow = false,
  ...props
}: HoverCardContentProps) {
  return (
    <HoverCardPortal>
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={sticky}
        arrowPadding={arrowPadding}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          data-intensity={intensity}
          className={cn(
            "relative z-50 flex w-80 max-w-[calc(100vw-2rem)] origin-(--transform-origin) flex-col gap-2.5 rounded-2xl p-4 text-sm text-foreground outline-none duration-150 select-text",
            "halo-liquid-glass-surface",
            intensity === "subtle" && "halo-intensity-subtle",
            intensity === "balanced" && "halo-intensity-balanced",
            intensity === "rich" && "halo-intensity-rich",
            // Kinematic entry/exit transitions
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            // Directional translation along anchor axis
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
            className
          )}
          {...props}
        >
          {showArrow && <HoverCardArrow />}
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </HoverCardPortal>
  )
}

export {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
}
