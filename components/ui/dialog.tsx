"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HaloIcon } from "@/components/icons/halo-icon"

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full"
export type DialogIntensity = "subtle" | "balanced" | "rich"
export type DialogScrimBlur = "none" | "subtle" | "balanced" | "deep"
export type DialogScrimTint = "neutral" | "soft" | "deep" | "vibrant"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

export interface DialogOverlayProps extends DialogPrimitive.Backdrop.Props {
  blur?: DialogScrimBlur
  tint?: DialogScrimTint
}

function DialogOverlay({
  className,
  blur = "balanced",
  tint = "neutral",
  ...props
}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 transition-all duration-200",
        // Scrim blur calibration
        blur === "none" && "backdrop-blur-none",
        blur === "subtle" && "backdrop-blur-xs md:backdrop-blur-sm",
        blur === "balanced" && "backdrop-blur-sm md:backdrop-blur-md",
        blur === "deep" && "backdrop-blur-md md:backdrop-blur-lg",
        // Ambient tint occlusion
        tint === "soft" && "bg-black/25 dark:bg-black/40",
        tint === "neutral" && "bg-black/45 dark:bg-black/65",
        tint === "deep" && "bg-black/70 dark:bg-black/85",
        tint === "vibrant" && "bg-[#07090e]/50 backdrop-saturate-150",
        // State transitions
        "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

export interface DialogContentProps extends DialogPrimitive.Popup.Props {
  showCloseButton?: boolean
  size?: DialogSize
  intensity?: DialogIntensity
  scrimBlur?: DialogScrimBlur
  scrimTint?: DialogScrimTint
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = "md",
  intensity = "balanced",
  scrimBlur = "balanced",
  scrimTint = "neutral",
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay blur={scrimBlur} tint={scrimTint} />
      <DialogPrimitive.Viewport className="fixed inset-0 isolate z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          data-size={size}
          data-intensity={intensity}
          className={cn(
            "relative grid w-full gap-4 rounded-2xl halo-liquid-glass-surface p-6 text-foreground duration-200 outline-none my-auto max-h-[calc(100dvh-3rem)] overflow-y-auto",
            // Dialog Size variants
            size === "sm" && "max-w-sm",
            size === "md" && "max-w-md",
            size === "lg" && "max-w-lg",
            size === "xl" && "max-w-xl",
            size === "full" && "max-w-3xl",
            // Material optical intensity
            intensity === "subtle" && "halo-intensity-subtle",
            intensity === "balanced" && "halo-intensity-balanced",
            intensity === "rich" && "halo-intensity-rich",
            // Motion transitions
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              render={
                <Button
                  variant="ghost"
                  className="absolute top-3.5 right-3.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/10"
                  size="icon-sm"
                  aria-label="Close dialog"
                />
              }
            >
              <HaloIcon icon={Cancel01Icon} size={15} />
              <span className="sr-only">Close dialog</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2.5 pt-4 border-t border-border/40",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-lg font-semibold tracking-tight text-foreground leading-snug",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground leading-relaxed *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

