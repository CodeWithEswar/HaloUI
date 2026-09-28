"use client";

import * as React from "react";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  AlertCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";

const toast = ToastPrimitive.createToastManager();

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

export interface ToastViewportProps extends ToastPrimitive.Viewport.Props {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "top-center" | "bottom-center";
}

function ToastViewport({
  className,
  position = "bottom-right",
  ...props
}: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      data-position={position}
      className={cn(
        "pointer-events-none fixed z-50 flex flex-col gap-2 p-3 sm:p-4 outline-none",
        // Responsive mobile viewport safety: fill screen width with safe margins, desktop fixed width
        "w-full max-w-[calc(100vw-1.5rem)] sm:max-w-sm",
        position === "bottom-right" && "bottom-0 right-0 items-end",
        position === "bottom-left" && "bottom-0 left-0 items-start",
        position === "top-right" && "top-0 right-0 items-end",
        position === "top-left" && "top-0 left-0 items-start",
        position === "bottom-center" && "bottom-0 left-1/2 -translate-x-1/2 items-center",
        position === "top-center" && "top-0 left-1/2 -translate-x-1/2 items-center",
        className
      )}
      {...props}
    />
  );
}

export type ToastIntensity = "subtle" | "balanced" | "plain";

export interface ToastProps extends ToastPrimitive.Root.Props {
  intensity?: ToastIntensity;
}

function Toast({
  className,
  intensity = "balanced",
  ...props
}: ToastProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      data-intensity={intensity}
      className={cn(
        "group/toast pointer-events-auto relative z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-xl sm:rounded-2xl transition-all duration-200 outline-none select-none",
        // HaloUI Balanced Liquid Glass optical engine
        intensity === "balanced" && [
          "bg-card/90 dark:bg-card/50 backdrop-blur-xl backdrop-saturate-180",
          "border border-white/60 dark:border-white/18",
          "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "dark:shadow-[0_16px_48px_-4px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.25)]",
        ],
        intensity === "subtle" && [
          "bg-card/80 dark:bg-card/40 backdrop-blur-md backdrop-saturate-150",
          "border border-border/70 dark:border-white/14",
          "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]",
          "dark:shadow-[0_8px_28px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)]",
        ],
        intensity === "plain" && [
          "bg-popover text-popover-foreground border border-border shadow-md backdrop-blur-none",
        ],
        // HaloUI Focus Ring
        "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color,#0284c7)] focus-visible:ring-offset-2",
        // Base-UI Toast stacking physics variables
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.08)))] [--shrink:calc(1-var(--scale))]",
        "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_400ms_cubic-bezier(0.22,1,0.36,1),opacity_300ms,height_150ms]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-limited:opacity-0 data-starting-style:[transform:translateY(120%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(120%)]",
        "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+120%))]",
        "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-120%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+120%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-120%))]",
        className
      )}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3 p-3.5 sm:p-4 transition-opacity duration-200 ease-out data-behind:opacity-0 data-expanded:opacity-100",
        className
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn(
        "text-xs sm:text-sm font-semibold tracking-tight text-foreground leading-snug break-words min-w-0",
        className
      )}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn(
        "text-xs text-muted-foreground leading-relaxed break-words min-w-0",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:text-foreground",
        className
      )}
      {...props}
    />
  );
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" className="h-7 text-xs px-2.5" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

function ToastClose({
  className,
  children,
  render = (
    <Button
      variant="ghost"
      size="icon-sm"
      className="size-6 text-muted-foreground/80 hover:text-foreground"
    />
  ),
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        "relative shrink-0 text-muted-foreground hover:text-foreground transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color,#0284c7)] rounded-md",
        className
      )}
      {...props}
    >
      {children ?? <HaloIcon icon={Cancel01Icon} size={14} strokeWidth={1.75} />}
    </ToastPrimitive.Close>
  );
}

function ToastIcon({ type }: { type: string | undefined }) {
  if (type === "success") {
    return (
      <span data-slot="toast-icon" className="shrink-0 text-emerald-600 dark:text-emerald-400">
        <HaloIcon icon={CheckmarkCircle02Icon} size={18} strokeWidth={1.75} />
      </span>
    );
  }

  if (type === "info") {
    return (
      <span data-slot="toast-icon" className="shrink-0 text-sky-600 dark:text-sky-400">
        <HaloIcon icon={InformationCircleIcon} size={18} strokeWidth={1.75} />
      </span>
    );
  }

  if (type === "warning") {
    return (
      <span data-slot="toast-icon" className="shrink-0 text-amber-600 dark:text-amber-400">
        <HaloIcon icon={Alert02Icon} size={18} strokeWidth={1.75} />
      </span>
    );
  }

  if (type === "error") {
    return (
      <span data-slot="toast-icon" className="shrink-0 text-rose-600 dark:text-rose-400">
        <HaloIcon icon={AlertCircleIcon} size={18} strokeWidth={1.75} />
      </span>
    );
  }

  if (type === "loading") {
    return (
      <span data-slot="toast-icon" className="shrink-0 text-sky-600 dark:text-sky-400 animate-spin">
        <HaloIcon icon={Loading03Icon} size={18} strokeWidth={1.75} />
      </span>
    );
  }

  return null;
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ));
}

export interface ToasterProps extends ToastPrimitive.Provider.Props {
  position?: ToastViewportProps["position"];
  intensity?: ToastIntensity;
}

function Toaster({
  children,
  position = "bottom-right",
  toastManager = toast,
  ...props
}: ToasterProps) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport position={position}>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
};
