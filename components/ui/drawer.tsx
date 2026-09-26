"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HaloIcon } from "@/components/icons/halo-icon"

export type DrawerIntensity = "subtle" | "balanced" | "rich"
export type DrawerScrimBlur = "none" | "subtle" | "balanced" | "deep"
export type DrawerScrimTint = "neutral" | "soft" | "deep" | "vibrant"

type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
  intensity: DrawerIntensity
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

export interface DrawerProps extends DrawerPrimitive.Root.Props {
  showSwipeHandle?: boolean
  intensity?: DrawerIntensity
}

function Drawer({
  modal = true,
  showSwipeHandle = true,
  intensity = "balanced",
  snapPoints,
  swipeDirection = "down",
  ...props
}: DrawerProps) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = React.useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection, intensity }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection, intensity]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

export interface DrawerOverlayProps extends DrawerPrimitive.Backdrop.Props {
  blur?: DrawerScrimBlur
  tint?: DrawerScrimTint
}

function DrawerOverlay({
  className,
  blur = "balanced",
  tint = "neutral",
  ...props
}: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 min-h-dvh select-none transition-opacity duration-300 ease-out",
        "opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress,0)))]",
        "data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)]",
        "data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0",
        "supports-[-webkit-touch-callout:none]:absolute",
        // Scrim blur calibration
        blur === "none" && "backdrop-blur-none",
        blur === "subtle" && "backdrop-blur-xs md:backdrop-blur-sm",
        blur === "balanced" && "backdrop-blur-sm md:backdrop-blur-md",
        blur === "deep" && "backdrop-blur-md md:backdrop-blur-lg",
        // Scrim tint occlusion
        tint === "soft" && "bg-black/25 dark:bg-black/40",
        tint === "neutral" && "bg-black/45 dark:bg-black/65",
        tint === "deep" && "bg-black/70 dark:bg-black/85",
        tint === "vibrant" && "bg-[#07090e]/50 backdrop-saturate-150",
        className
      )}
      {...props}
    />
  )
}

function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        "relative z-10 flex shrink-0 cursor-grab items-center justify-center py-2.5 transition-opacity duration-200 active:cursor-grabbing",
        "group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100",
        "group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=x]/drawer-popup:w-5 group-data-[swipe-axis=x]/drawer-popup:py-0 group-data-[swipe-axis=x]/drawer-popup:px-2",
        "group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:h-6",
        "group-data-[swipe-direction=down]/drawer-popup:items-center",
        "group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=left]/drawer-popup:justify-start",
        "group-data-[swipe-direction=right]/drawer-popup:justify-end",
        "group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:items-center",
        // Pill affordance with optical meniscus
        "after:block after:shrink-0 after:rounded-full after:bg-foreground/20 hover:after:bg-foreground/35 after:transition-colors",
        "group-data-[swipe-axis=x]/drawer-popup:after:h-16 group-data-[swipe-axis=x]/drawer-popup:after:w-1.5",
        "group-data-[swipe-axis=y]/drawer-popup:after:h-1.5 group-data-[swipe-axis=y]/drawer-popup:after:w-12 sm:group-data-[swipe-axis=y]/drawer-popup:after:w-16",
        className
      )}
      {...props}
    />
  )
}

export interface DrawerContentProps extends DrawerPrimitive.Popup.Props {
  intensity?: DrawerIntensity
  scrimBlur?: DrawerScrimBlur
  scrimTint?: DrawerScrimTint
  showCloseButton?: boolean
}

function DrawerContent({
  className,
  children,
  intensity: intensityProp,
  scrimBlur = "balanced",
  scrimTint = "neutral",
  showCloseButton = false,
  ...props
}: DrawerContentProps) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection, intensity: contextIntensity } = useDrawer()
  const intensity = intensityProp ?? contextIntensity
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay
          data-snap-points={hasSnapPoints ? "" : undefined}
          blur={scrimBlur}
          tint={scrimTint}
        />
      )}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className={cn(
          "fixed inset-0 isolate z-50 pointer-events-none select-none flex",
          swipeDirection === "down" && "items-end justify-center touch-none",
          swipeDirection === "up" && "items-start justify-center touch-none",
          swipeDirection === "left" && "items-stretch justify-start touch-none",
          swipeDirection === "right" && "items-stretch justify-end touch-none"
        )}
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-swipe-direction={swipeDirection}
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={cn(
            // Base positioning & container mechanics
            "group/drawer-popup pointer-events-auto relative z-50 flex flex-col text-sm text-foreground outline-none select-none overflow-hidden halo-liquid-glass-surface shadow-2xl",
            // Material optical intensity
            intensity === "subtle" && "halo-intensity-subtle",
            intensity === "balanced" && "halo-intensity-balanced",
            intensity === "rich" && "halo-intensity-rich",
            // Edge-specific geometry and transforms
            swipeDirection === "down" && [
              "w-full max-w-2xl max-h-[calc(90dvh)]",
              "!rounded-t-3xl !rounded-b-none border-t border-x border-border/60",
              "pb-[max(1rem,env(safe-area-inset-bottom,1rem))]",
              "[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))]",
              "transition-[transform,box-shadow,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
              "data-starting-style:[transform:translateY(calc(100%+2px))]",
              "data-ending-style:[transform:translateY(calc(100%+2px))]",
              "data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)]",
            ],
            swipeDirection === "up" && [
              "w-full max-w-2xl max-h-[calc(90dvh)]",
              "!rounded-b-3xl !rounded-t-none border-b border-x border-border/60",
              "pt-[max(1rem,env(safe-area-inset-top,1rem))]",
              "[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))]",
              "transition-[transform,box-shadow,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
              "data-starting-style:[transform:translateY(calc(-100%-2px))]",
              "data-ending-style:[transform:translateY(calc(-100%-2px))]",
              "data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)]",
            ],
            swipeDirection === "right" && [
              "h-full w-full max-w-md",
              "!rounded-l-3xl !rounded-r-none border-l border-y border-border/60",
              "[transform:translateX(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-x,0px)))]",
              "transition-[transform,box-shadow,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
              "data-starting-style:[transform:translateX(calc(100%+2px))]",
              "data-ending-style:[transform:translateX(calc(100%+2px))]",
              "data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)]",
            ],
            swipeDirection === "left" && [
              "h-full w-full max-w-md",
              "!rounded-r-3xl !rounded-l-none border-r border-y border-border/60",
              "[transform:translateX(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-x,0px)))]",
              "transition-[transform,box-shadow,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
              "data-starting-style:[transform:translateX(calc(-100%-2px))]",
              "data-ending-style:[transform:translateX(calc(-100%-2px))]",
              "data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)]",
            ],
            // Bleed cover for overscroll bounce gestures
            "after:pointer-events-none after:absolute after:bg-background/80 after:backdrop-blur-xl",
            swipeAxis === "x" ? "after:inset-y-0 after:w-12" : "after:inset-x-0 after:h-12",
            swipeDirection === "down" && "after:top-full",
            swipeDirection === "up" && "after:bottom-full",
            swipeDirection === "left" && "after:right-full",
            swipeDirection === "right" && "after:left-full",
            className
          )}
          {...props}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none"
            )}
          >
            {children}
          </DrawerPrimitive.Content>

          {showCloseButton && (
            <DrawerClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full border border-border/40 bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground transition-all duration-200"
                  aria-label="Close drawer"
                >
                  <HaloIcon icon={Cancel01Icon} className="h-4 w-4" />
                </Button>
              }
            />
          )}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-1.5 p-4 sm:p-6 pb-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex shrink-0 flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5 p-4 sm:p-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] border-t border-border/40 bg-background/40 backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-heading text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
