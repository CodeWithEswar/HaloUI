"use client";

import * as React from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "@/lib/utils";

interface LinkPreviewContextValue {
  openDelay?: number;
  closeDelay?: number;
}

const LinkPreviewContext = React.createContext<LinkPreviewContextValue>({});

export interface LinkPreviewProps extends PreviewCardPrimitive.Root.Props {
  /**
   * Delay in milliseconds before opening the preview card on hover/focus.
   * @default 300
   */
  openDelay?: number;
  /**
   * Delay in milliseconds before closing the preview card when leaving.
   * @default 200
   */
  closeDelay?: number;
}

/**
 * LinkPreview
 * Root container for supplemental destination context around a navigation link.
 */
function LinkPreview({
  openDelay = 300,
  closeDelay = 200,
  children,
  ...props
}: LinkPreviewProps) {
  return (
    <LinkPreviewContext.Provider value={{ openDelay, closeDelay }}>
      <PreviewCardPrimitive.Root data-slot="link-preview" {...props}>
        {children}
      </PreviewCardPrimitive.Root>
    </LinkPreviewContext.Provider>
  );
}

export interface LinkPreviewTriggerProps
  extends PreviewCardPrimitive.Trigger.Props {
  asChild?: boolean;
  href?: string;
}

/**
 * LinkPreviewTrigger
 * The interactive navigation link that triggers the supplemental preview card.
 * Always renders a native semantic anchor (<a>) and preserves native navigation.
 */
function LinkPreviewTrigger({
  asChild,
  className,
  children,
  delay,
  closeDelay,
  ...props
}: LinkPreviewTriggerProps) {
  const context = React.useContext(LinkPreviewContext);
  const effectiveDelay = delay ?? context.openDelay ?? 300;
  const effectiveCloseDelay = closeDelay ?? context.closeDelay ?? 200;

  const triggerClasses = cn(
    "inline font-medium text-foreground underline underline-offset-4 decoration-primary/40 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs cursor-pointer transition-colors",
    className
  );

  if (asChild && React.isValidElement(children)) {
    return (
      <PreviewCardPrimitive.Trigger
        data-slot="link-preview-trigger"
        delay={effectiveDelay}
        closeDelay={effectiveCloseDelay}
        render={children as React.ReactElement}
        className={triggerClasses}
        {...props}
      />
    );
  }

  return (
    <PreviewCardPrimitive.Trigger
      data-slot="link-preview-trigger"
      delay={effectiveDelay}
      closeDelay={effectiveCloseDelay}
      className={triggerClasses}
      {...props}
    >
      {children}
    </PreviewCardPrimitive.Trigger>
  );
}

export interface LinkPreviewContentProps
  extends PreviewCardPrimitive.Popup.Props,
    Pick<
      PreviewCardPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {
  intensity?: "subtle" | "balanced" | "rich";
  container?: PreviewCardPrimitive.Portal.Props["container"];
}

/**
 * LinkPreviewContent
 * Supplemental destination preview overlay using the 10-layer physical liquid glass surface engine.
 */
function LinkPreviewContent({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  intensity = "balanced",
  container,
  children,
  ...props
}: LinkPreviewContentProps) {
  return (
    <PreviewCardPrimitive.Portal container={container} data-slot="link-preview-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-[100] pointer-events-auto"
      >
        <PreviewCardPrimitive.Popup
          data-slot="link-preview-content"
          data-intensity={intensity}
          className={cn(
            "halo-liquid-glass-surface z-[100] w-72 max-w-[calc(100vw-2rem)] origin-(--transform-origin) rounded-2xl p-4 text-sm text-foreground outline-none duration-150",
            // Explicit liquid optical background & refractive boundary
            "bg-[var(--halo-glass-pop-background,rgba(255,255,255,0.92))] dark:bg-[var(--halo-glass-pop-background,rgba(22,24,30,0.92))]",
            "border border-[var(--halo-glass-pop-border,rgba(255,255,255,0.85))] dark:border-[var(--halo-glass-pop-border,rgba(255,255,255,0.15))]",
            // Liquid Glass Specular & Refraction Depth: Physical Inset Edge + Soft Elevation
            "shadow-[var(--halo-glass-pop-shadow,inset_0_1px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.04),0_20px_48px_-8px_rgba(0,0,0,0.16),0_8px_16px_-4px_rgba(0,0,0,0.08))] dark:shadow-[var(--halo-glass-pop-shadow,inset_0_1px_1px_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.70),0_24px_56px_-8px_rgba(0,0,0,0.65),0_8px_20px_rgba(0,0,0,0.50))]",
            // Apple iOS/macOS Frosted Optical Diffusion
            intensity === "subtle" && "backdrop-blur-md backdrop-saturate-180",
            intensity === "balanced" && "backdrop-blur-xl backdrop-saturate-190",
            intensity === "rich" && "backdrop-blur-2xl backdrop-saturate-200",
            // Directional Entry Transitions
            "data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          <div className="relative z-10">{children}</div>
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

function LinkPreviewTitle({
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
      data-slot="link-preview-title"
      className={cn(
        "text-sm font-semibold tracking-tight text-foreground line-clamp-1",
        className
      )}
      {...props}
    />
  );
}

function LinkPreviewDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="link-preview-description"
      className={cn(
        "text-xs leading-relaxed text-muted-foreground line-clamp-2 mt-1",
        className
      )}
      {...props}
    />
  );
}

function LinkPreviewMetadata({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="link-preview-metadata"
      className={cn(
        "flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground/80 mt-2.5 pt-2 border-t border-border/40",
        className
      )}
      {...props}
    />
  );
}

export {
  LinkPreview,
  LinkPreviewTrigger,
  LinkPreviewContent,
  LinkPreviewTitle,
  LinkPreviewDescription,
  LinkPreviewMetadata,
};
