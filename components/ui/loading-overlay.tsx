"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type LoadingOverlayIntensity = "subtle" | "balanced" | "opaque";
export type LoadingOverlayBlur = "none" | "sm" | "md" | "lg";

export const loadingOverlayVariants = cva(
  [
    "@container/loading-overlay isolate flex flex-col items-center justify-center",
    "transition-all duration-200 ease-out motion-reduce:transition-none",
  ],
  {
    variants: {
      intensity: {
        subtle: [
          "bg-background/60 dark:bg-background/65",
          "border border-black/[0.03] dark:border-white/[0.05]",
        ],
        balanced: [
          "bg-background/80 dark:bg-background/85",
          "border border-black/[0.06] dark:border-white/[0.08]",
          "shadow-sm",
        ],
        opaque: [
          "bg-background/96 border border-border",
        ],
      },
      blur: {
        none: "backdrop-blur-none",
        sm: "backdrop-blur-xs sm:backdrop-blur-sm",
        md: "backdrop-blur-sm sm:backdrop-blur-md",
        lg: "backdrop-blur-md sm:backdrop-blur-lg",
      },
      position: {
        scoped: "absolute inset-0 z-20 rounded-[inherit]",
        fullPage: "fixed inset-0 z-50",
      },
    },
    defaultVariants: {
      intensity: "balanced",
      blur: "md",
      position: "scoped",
    },
  }
);

/* -------------------------------------------------------------------------
 * LOADING OVERLAY SURFACE (Internal Presentation Primitive)
 * ----------------------------------------------------------------------- */

export interface LoadingOverlaySurfaceProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof loadingOverlayVariants> {
  /**
   * Visibility state of the overlay.
   * @default true
   */
  visible?: boolean;
  /**
   * Optional loading message displayed beneath the loading indicator.
   */
  message?: React.ReactNode;
  /**
   * Custom loading indicator component. Defaults to canonical `<Spinner size="md" />`.
   */
  spinner?: React.ReactNode;
  /**
   * Whether the overlay captures pointer events and blocks interactions.
   * @default true
   */
  blocking?: boolean;
  /**
   * When true, uses fixed viewport positioning (`fixed inset-0 z-50`).
   * @default false
   */
  fullPage?: boolean;
  /**
   * Custom className for the centered indicator and message card.
   */
  contentClassName?: string;
}

export function LoadingOverlaySurface({
  visible = true,
  message,
  spinner,
  intensity = "balanced",
  blur = "md",
  blocking = true,
  fullPage = false,
  className,
  contentClassName,
  children,
  ...props
}: LoadingOverlaySurfaceProps) {
  if (!visible) return null;

  return (
    <div
      data-slot="loading-overlay"
      data-visible={visible ? "true" : "false"}
      data-intensity={intensity}
      data-blocking={blocking ? "true" : "false"}
      aria-hidden={!visible}
      role="status"
      aria-live="polite"
      className={cn(
        loadingOverlayVariants({
          intensity,
          blur,
          position: fullPage ? "fullPage" : "scoped",
        }),
        blocking ? "pointer-events-auto" : "pointer-events-none",
        "p-4 sm:p-6 text-center select-none",
        className
      )}
      {...props}
    >
      {/* Centered Optical Card for Message + Spinner */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center justify-center gap-3",
          "max-w-[90%] sm:max-w-xs px-4 py-3.5 rounded-xl",
          intensity === "balanced" && [
            "bg-background/90 dark:bg-background/90 shadow-md",
            "border border-black/[0.06] dark:border-white/[0.08]",
          ],
          intensity === "subtle" && [
            "bg-background/70 dark:bg-background/75 shadow-sm",
            "border border-black/[0.04] dark:border-white/[0.06]",
          ],
          intensity === "opaque" && [
            "bg-card text-card-foreground border border-border shadow-sm",
          ],
          contentClassName
        )}
      >
        {/* Loading Indicator */}
        {spinner ?? <Spinner size="md" variant="primary" />}

        {/* Loading Message */}
        {message && (
          <div className="space-y-0.5">
            {typeof message === "string" ? (
              <p className="text-xs sm:text-sm font-medium text-foreground tracking-tight break-words text-center leading-relaxed">
                {message}
              </p>
            ) : (
              message
            )}
          </div>
        )}

        {/* Optional custom children inside the loader box */}
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * LOADING OVERLAY COMPONENT
 * Scoped blocking/loading surface engineered with Balanced Liquid Glass optics,
 * pointer and keyboard interaction blocking, and automatic container reflow.
 * ----------------------------------------------------------------------- */

export interface LoadingOverlayProps extends LoadingOverlaySurfaceProps {
  /**
   * Optional content to wrap. When provided, LoadingOverlay acts as a wrapper
   * around children with an automatic relative container and sets `inert` while active.
   */
  children?: React.ReactNode;
}

export function LoadingOverlay({
  visible = true,
  message,
  spinner,
  intensity = "balanced",
  blur = "md",
  blocking = true,
  fullPage = false,
  className,
  contentClassName,
  children,
  ...props
}: LoadingOverlayProps) {
  // If children are supplied, act as a container wrapper
  if (children) {
    return (
      <div
        data-slot="loading-overlay-wrapper"
        data-busy={visible ? "true" : "false"}
        className={cn("@container/loading-overlay relative isolate", className)}
        aria-busy={visible ? "true" : undefined}
        {...props}
      >
        {/* Scoped Content Region */}
        <div
          data-slot="loading-overlay-target"
          inert={visible && blocking ? true : undefined}
          className={cn(
            "transition-opacity duration-200",
            visible && "opacity-85 select-none"
          )}
        >
          {children}
        </div>

        {/* Overlay Surface */}
        <LoadingOverlaySurface
          visible={visible}
          message={message}
          spinner={spinner}
          intensity={intensity}
          blur={blur}
          blocking={blocking}
          fullPage={fullPage}
          contentClassName={contentClassName}
        />
      </div>
    );
  }

  // Standalone mode: renders surface directly into existing positioned parent
  return (
    <LoadingOverlaySurface
      visible={visible}
      message={message}
      spinner={spinner}
      intensity={intensity}
      blur={blur}
      blocking={blocking}
      fullPage={fullPage}
      className={className}
      contentClassName={contentClassName}
      {...props}
    />
  );
}
