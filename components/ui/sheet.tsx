"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HaloIcon } from "@/components/icons/halo-icon"

export type SheetSide = "top" | "right" | "bottom" | "left"
export type SheetSize = "sm" | "default" | "md" | "lg" | "xl" | "full"
export type SheetIntensity = "subtle" | "balanced" | "rich"
export type SheetScrimBlur = "none" | "subtle" | "balanced" | "deep"
export type SheetScrimTint = "neutral" | "soft" | "deep" | "vibrant"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

export interface SheetOverlayProps extends SheetPrimitive.Backdrop.Props {
  blur?: SheetScrimBlur
  tint?: SheetScrimTint
}

function SheetOverlay({
  className,
  blur = "balanced",
  tint = "neutral",
  ...props
}: SheetOverlayProps) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 transition-all duration-300 ease-out select-none",
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
        // Motion state transitions
        "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

export interface SheetContentProps extends SheetPrimitive.Popup.Props {
  side?: SheetSide
  size?: SheetSize
  intensity?: SheetIntensity
  scrimBlur?: SheetScrimBlur
  scrimTint?: SheetScrimTint
  showCloseButton?: boolean
}

function SheetContent({
  className,
  children,
  side = "right",
  size = "default",
  intensity = "balanced",
  scrimBlur = "balanced",
  scrimTint = "neutral",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay blur={scrimBlur} tint={scrimTint} />
      <SheetPrimitive.Viewport
        data-slot="sheet-viewport"
        className={cn(
          "fixed inset-0 isolate z-50 flex pointer-events-none select-none",
          side === "right" && "justify-end items-stretch",
          side === "left" && "justify-start items-stretch",
          side === "top" && "justify-center items-start",
          side === "bottom" && "justify-center items-end"
        )}
      >
        <SheetPrimitive.Popup
          data-slot="sheet-content"
          data-side={side}
          data-size={size}
          data-intensity={intensity}
          className={cn(
            "pointer-events-auto relative flex flex-col gap-4 text-foreground shadow-2xl transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none overflow-hidden halo-liquid-glass-surface",
            // Material optical intensity
            intensity === "subtle" && "halo-intensity-subtle",
            intensity === "balanced" && "halo-intensity-balanced",
            intensity === "rich" && "halo-intensity-rich",
            // Edge Attachment & Directional Slide Motion
            side === "right" && [
              "h-full w-full border-l border-border/60",
              "!rounded-l-2xl sm:!rounded-l-3xl !rounded-r-none",
              "data-open:animate-in data-open:slide-in-from-right data-open:fade-in-0",
              "data-closed:animate-out data-closed:slide-out-to-right data-closed:fade-out-0",
              // Width tiers
              size === "sm" && "sm:max-w-sm",
              (size === "default" || size === "md") && "sm:max-w-md",
              size === "lg" && "sm:max-w-lg",
              size === "xl" && "sm:max-w-xl",
              size === "full" && "sm:max-w-3xl",
            ],
            side === "left" && [
              "h-full w-full border-r border-border/60",
              "!rounded-r-2xl sm:!rounded-r-3xl !rounded-l-none",
              "data-open:animate-in data-open:slide-in-from-left data-open:fade-in-0",
              "data-closed:animate-out data-closed:slide-out-to-left data-closed:fade-out-0",
              // Width tiers
              size === "sm" && "sm:max-w-sm",
              (size === "default" || size === "md") && "sm:max-w-md",
              size === "lg" && "sm:max-w-lg",
              size === "xl" && "sm:max-w-xl",
              size === "full" && "sm:max-w-3xl",
            ],
            side === "top" && [
              "w-full border-b border-border/60 max-h-[85dvh]",
              "!rounded-b-2xl sm:!rounded-b-3xl !rounded-t-none",
              "data-open:animate-in data-open:slide-in-from-top data-open:fade-in-0",
              "data-closed:animate-out data-closed:slide-out-to-top data-closed:fade-out-0",
            ],
            side === "bottom" && [
              "w-full border-t border-border/60 max-h-[85dvh]",
              "!rounded-t-2xl sm:!rounded-t-3xl !rounded-b-none",
              "data-open:animate-in data-open:slide-in-from-bottom data-open:fade-in-0",
              "data-closed:animate-out data-closed:slide-out-to-bottom data-closed:fade-out-0",
            ],
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <SheetPrimitive.Close
              data-slot="sheet-close"
              render={
                <Button
                  variant="ghost"
                  className="absolute top-4 right-4 z-20 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/10"
                  size="icon-sm"
                  aria-label="Close sheet"
                />
              }
            >
              <HaloIcon icon={Cancel01Icon} size={15} />
              <span className="sr-only">Close sheet</span>
            </SheetPrimitive.Close>
          )}
        </SheetPrimitive.Popup>
      </SheetPrimitive.Viewport>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6 pb-2 text-left", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex shrink-0 flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5 p-4 sm:p-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] border-t border-border/40 bg-background/40 backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-xs leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
