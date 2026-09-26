"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cn } from "@/lib/utils"

import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/button"

export type AlertDialogSize = "sm" | "default" | "md" | "lg"
export type AlertDialogIntensity = "subtle" | "balanced" | "rich"
export type AlertDialogScrimBlur = "none" | "subtle" | "balanced" | "deep"
export type AlertDialogScrimTint = "neutral" | "soft" | "deep" | "vibrant"

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

export interface AlertDialogOverlayProps extends AlertDialogPrimitive.Backdrop.Props {
  blur?: AlertDialogScrimBlur
  tint?: AlertDialogScrimTint
}

function AlertDialogOverlay({
  className,
  blur = "deep",
  tint = "deep",
  ...props
}: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 transition-all duration-200",
        // Scrim blur calibration — alerts default to deep diffusion for consequence isolation
        blur === "none" && "backdrop-blur-none",
        blur === "subtle" && "backdrop-blur-xs md:backdrop-blur-sm",
        blur === "balanced" && "backdrop-blur-sm md:backdrop-blur-md",
        blur === "deep" && "backdrop-blur-md md:backdrop-blur-lg",
        // Ambient tint occlusion
        tint === "soft" && "bg-black/30 dark:bg-black/50",
        tint === "neutral" && "bg-black/50 dark:bg-black/70",
        tint === "deep" && "bg-black/70 dark:bg-black/85",
        tint === "vibrant" && "bg-[#07090e]/60 backdrop-saturate-150",
        // State transitions
        "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

export interface AlertDialogContentProps extends AlertDialogPrimitive.Popup.Props {
  size?: AlertDialogSize
  intensity?: AlertDialogIntensity
  scrimBlur?: AlertDialogScrimBlur
  scrimTint?: AlertDialogScrimTint
}

function AlertDialogContent({
  className,
  size = "default",
  intensity = "balanced",
  scrimBlur = "deep",
  scrimTint = "deep",
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay blur={scrimBlur} tint={scrimTint} />
      <AlertDialogPrimitive.Viewport className="fixed inset-0 isolate z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <AlertDialogPrimitive.Popup
          data-slot="alert-dialog-content"
          data-size={size}
          data-intensity={intensity}
          className={cn(
            "group/alert-dialog-content relative grid w-full gap-4 rounded-2xl halo-liquid-glass-surface p-6 text-foreground duration-200 outline-none my-auto max-h-[calc(100dvh-3rem)] overflow-y-auto",
            // Alert Dialog Size tiers
            size === "sm" && "max-w-sm",
            (size === "default" || size === "md") && "max-w-md",
            size === "lg" && "max-w-lg",
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
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "flex flex-col gap-2 text-center sm:text-left has-data-[slot=alert-dialog-media]:grid has-data-[slot=alert-dialog-media]:grid-cols-[auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 has-data-[slot=alert-dialog-media]:items-start",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2.5 pt-4 border-t border-border/40",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/40 text-foreground shadow-xs sm:row-span-2 *:[svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-lg font-semibold tracking-tight text-foreground leading-snug",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-balance text-muted-foreground leading-relaxed md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export interface AlertDialogActionProps
  extends AlertDialogPrimitive.Close.Props,
    Pick<React.ComponentProps<typeof Button>, "variant" | "size"> {}

function AlertDialogAction({
  className,
  variant = "destructive",
  size = "default",
  ...props
}: AlertDialogActionProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

export interface AlertDialogCancelProps
  extends AlertDialogPrimitive.Close.Props,
    Pick<React.ComponentProps<typeof Button>, "variant" | "size"> {}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}

