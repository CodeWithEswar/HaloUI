"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Cancel01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  AlertCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------- */
/* Types & Context                                                            */
/* -------------------------------------------------------------------------- */

export type LightboxTheme = "adaptive" | "dark" | "light";

export interface LightboxItem {
  id?: string;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  credit?: string;
  aspectRatio?: number;
}

interface LightboxContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: LightboxItem[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  loop: boolean;
  theme: LightboxTheme;
  ambientBloom: boolean;
}

const LightboxContext = React.createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const context = React.useContext(LightboxContext);
  if (!context) {
    throw new Error("Lightbox compound components must be used within <Lightbox />");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* Lightbox Root Container                                                    */
/* -------------------------------------------------------------------------- */

export interface LightboxProps {
  /**
   * Controlled open state.
   */
  open?: boolean;
  /**
   * Default open state for uncontrolled usage.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Array of media items for gallery mode. If single item, pass 1 item.
   */
  items?: LightboxItem[];
  /**
   * Single image source shorthand if not using items array.
   */
  src?: string;
  /**
   * Single image alt text shorthand.
   */
  alt?: string;
  /**
   * Single image title shorthand.
   */
  title?: string;
  /**
   * Single image description shorthand.
   */
  description?: string;
  /**
   * Single image credit/author shorthand.
   */
  credit?: string;
  /**
   * Controlled active gallery index.
   */
  index?: number;
  /**
   * Default active gallery index.
   * @default 0
   */
  defaultIndex?: number;
  /**
   * Callback fired when active gallery item changes.
   */
  onIndexChange?: (index: number) => void;
  /**
   * Whether gallery wraps around from last to first item.
   * @default false
   */
  loop?: boolean;
  /**
   * Optical material theme mode.
   * - adaptive: Adapts to system or active document theme (frosted crystal in light, obsidian in dark).
   * - dark: Forces dark obsidian glass HUD.
   * - light: Forces frosted crystal glass HUD.
   * @default "adaptive"
   */
  theme?: LightboxTheme;
  /**
   * Whether to project a soft, chromatic ambient backlight bloom of the media onto the background scrim.
   * @default true
   */
  ambientBloom?: boolean;
  children?: React.ReactNode;
}

export function Lightbox({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  items: rawItems,
  src,
  alt,
  title,
  description,
  credit,
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  loop = false,
  theme = "adaptive",
  ambientBloom = true,
  children,
}: LightboxProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlledOpen = controlledOpen !== undefined;
  const isOpen = isControlledOpen ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlledOpen) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlledOpen, onOpenChange]
  );

  // Normalize single vs array items
  const items = React.useMemo<LightboxItem[]>(() => {
    if (rawItems && rawItems.length > 0) return rawItems;
    if (src) return [{ id: "single", src, alt, title, description, credit }];
    return [];
  }, [rawItems, src, alt, title, description, credit]);

  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(defaultIndex);
  const isControlledIndex = controlledIndex !== undefined;
  const currentIndex = isControlledIndex ? controlledIndex : uncontrolledIndex;

  const handleIndexChange = React.useCallback(
    (nextIndex: number) => {
      if (!isControlledIndex) {
        setUncontrolledIndex(nextIndex);
      }
      onIndexChange?.(nextIndex);
    },
    [isControlledIndex, onIndexChange]
  );

  const hasNext = loop || currentIndex < items.length - 1;
  const hasPrevious = loop || currentIndex > 0;

  const goToNext = React.useCallback(() => {
    if (items.length <= 1) return;
    if (currentIndex < items.length - 1) {
      handleIndexChange(currentIndex + 1);
    } else if (loop) {
      handleIndexChange(0);
    }
  }, [currentIndex, items.length, loop, handleIndexChange]);

  const goToPrevious = React.useCallback(() => {
    if (items.length <= 1) return;
    if (currentIndex > 0) {
      handleIndexChange(currentIndex - 1);
    } else if (loop) {
      handleIndexChange(items.length - 1);
    }
  }, [currentIndex, items.length, loop, handleIndexChange]);

  // Gallery keyboard navigation (ArrowLeft / ArrowRight)
  React.useEffect(() => {
    if (!isOpen || items.length <= 1) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items.length, goToNext, goToPrevious]);

  const contextValue = React.useMemo<LightboxContextValue>(
    () => ({
      open: isOpen,
      setOpen: handleOpenChange,
      items,
      currentIndex,
      setCurrentIndex: handleIndexChange,
      goToNext,
      goToPrevious,
      hasNext,
      hasPrevious,
      loop,
      theme,
      ambientBloom,
    }),
    [
      isOpen,
      handleOpenChange,
      items,
      currentIndex,
      handleIndexChange,
      goToNext,
      goToPrevious,
      hasNext,
      hasPrevious,
      loop,
      theme,
      ambientBloom,
    ]
  );

  return (
    <LightboxContext.Provider value={contextValue}>
      <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        {children}
      </DialogPrimitive.Root>
    </LightboxContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* LightboxTrigger                                                            */
/* -------------------------------------------------------------------------- */

export interface LightboxTriggerProps extends DialogPrimitive.Trigger.Props {}

export const LightboxTrigger = React.forwardRef<
  HTMLButtonElement,
  LightboxTriggerProps
>(function LightboxTrigger(props, ref) {
  return <DialogPrimitive.Trigger ref={ref} data-slot="lightbox-trigger" {...props} />;
});

/* -------------------------------------------------------------------------- */
/* LightboxContent (Full-Viewport Modal Overlay)                              */
/* -------------------------------------------------------------------------- */

export interface LightboxContentProps {
  /**
   * Optical backdrop scrim darkness and blur strength.
   * @default "deep"
   */
  scrimIntensity?: "balanced" | "deep";
  /**
   * Accessible modal title for screen reader announcement.
   * @default "Media Viewer"
   */
  title?: string;
  /**
   * Accessible modal description for screen reader announcement.
   * @default "Focused view of full-resolution image media."
   */
  description?: string;
  /**
   * Optional custom container element to portal into.
   */
  container?: HTMLElement | null | React.RefObject<HTMLElement | null>;
  /**
   * Whether clicking the dark backdrop outside media closes the viewer.
   * @default true
   */
  closeOnBackdropClick?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function LightboxContent({
  scrimIntensity = "deep",
  title = "Media Viewer",
  description = "Focused view of full-resolution image media.",
  container,
  closeOnBackdropClick = true,
  className,
  children,
}: LightboxContentProps) {
  const { setOpen, goToNext, goToPrevious, items, theme } = useLightbox();

  // Mobile Touch Swipe Handling
  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchEnd = React.useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;

      // Detect horizontal swipe if deltaX is dominant (> 45px) and not a vertical scroll
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
        if (deltaX < 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [goToNext, goToPrevious]
  );

  const handleBackdropClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        setOpen(false);
      }
    },
    [closeOnBackdropClick, setOpen]
  );

  return (
    <DialogPrimitive.Portal container={container}>
      {/* Halo Scrim: Multi-Layer Optical Liquid Backdrop with Radial Ambient Attenuation */}
      <DialogPrimitive.Backdrop
        data-slot="lightbox-scrim"
        className={cn(
          "fixed inset-0 z-50 transition-all duration-300",
          // Light Mode Scrim: Frosted High-Key Crystal Atmosphere
          theme === "light" && [
            "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.88)_0%,rgba(238,240,246,0.95)_100%)]",
            "backdrop-blur-2xl backdrop-saturate-180",
          ],
          // Dark or Adaptive Scrim: Cinematic Multi-Tonal Smoked Obsidian with Deep Radial Glow
          theme !== "light" && [
            scrimIntensity === "deep" && [
              "bg-[radial-gradient(circle_at_center,rgba(26,28,38,0.88)_0%,rgba(8,9,13,0.96)_100%)]",
              "backdrop-blur-2xl backdrop-saturate-180",
            ],
            scrimIntensity === "balanced" && [
              "bg-[radial-gradient(circle_at_center,rgba(26,28,38,0.76)_0%,rgba(8,9,13,0.88)_100%)]",
              "backdrop-blur-xl backdrop-saturate-160",
            ],
          ],
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        )}
      />

      {/* Floating Modal Media Stage with Responsive Touch Gestures */}
      <DialogPrimitive.Popup
        data-slot="lightbox-popup"
        data-theme={theme !== "adaptive" ? theme : undefined}
        onClick={handleBackdropClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center outline-none select-none duration-200",
          "p-2 sm:p-6 md:p-8",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          theme === "dark" && "dark",
          theme === "light" && "light",
          className
        )}
      >
        <div className="sr-only">
          <h2 id="lightbox-title">{title}</h2>
          <p id="lightbox-description">{description}</p>
        </div>

        {children || (
          <>
            <LightboxControls showCounter={items.length > 1} />
            <LightboxMedia />
            <LightboxCaption />
          </>
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

/* -------------------------------------------------------------------------- */
/* LightboxMedia (Fidelity-Preserving Image Stage with Fluid Ambient Bloom)    */
/* -------------------------------------------------------------------------- */

export interface LightboxMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  onImageLoad?: () => void;
  onImageError?: () => void;
  ambientBloom?: boolean;
}

export function LightboxMedia({
  className,
  onImageLoad,
  onImageError,
  ambientBloom: propAmbientBloom,
  ...props
}: LightboxMediaProps) {
  const { items, currentIndex, ambientBloom: contextAmbientBloom } = useLightbox();
  const currentItem = items[currentIndex];

  const ambientBloom = propAmbientBloom !== undefined ? propAmbientBloom : contextAmbientBloom;

  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Reset loading state upon index change
  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [currentIndex, currentItem?.src]);

  if (!currentItem) {
    return null;
  }

  return (
    <div
      data-slot="lightbox-media-stage"
      className={cn(
        "relative flex items-center justify-center transition-all duration-300",
        // Responsive viewport dimensions with clear bottom margin so the image NEVER hides behind caption
        "max-h-[calc(100dvh-12rem)] sm:max-h-[calc(100dvh-13.5rem)]",
        "max-w-[calc(100dvw-1.5rem)] sm:max-w-[calc(100dvw-5rem)] md:max-w-[calc(100dvw-7rem)]",
        "mb-12 sm:mb-16",
        className
      )}
      {...props}
    >
      {/* Fluid Ambient Light Bloom: Softly projects image chromatic colors into the background scrim */}
      {ambientBloom && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-10 -z-10 flex items-center justify-center overflow-visible transition-opacity duration-700 select-none",
            isLoading ? "opacity-0" : "opacity-35 dark:opacity-50"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`ambient-${currentItem.src}`}
            src={currentItem.src}
            alt=""
            className="h-full w-full max-h-[85vh] max-w-[90vw] object-cover scale-115 sm:scale-125 blur-3xl filter saturate-160 select-none"
          />
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div
          data-slot="lightbox-loader"
          className="absolute inset-0 flex items-center justify-center text-white/70 animate-pulse pointer-events-none z-10"
        >
          <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-black/40 dark:bg-black/60 px-5 py-4 backdrop-blur-xl border border-white/15">
            <HaloIcon icon={Loading03Icon} size={32} className="animate-spin text-white/90" />
            <span className="text-[11px] font-medium tracking-wide text-white/70">Loading High-Res Media...</span>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div
          data-slot="lightbox-error"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-black/60 p-6 sm:p-8 text-center text-white/85 backdrop-blur-2xl max-w-md shadow-2xl"
        >
          <HaloIcon icon={AlertCircleIcon} size={36} className="text-red-400" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">Media Unavailable</h4>
            <p className="text-xs text-white/60">
              Unable to load the requested image from the network source.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
            }}
            className="rounded-lg border border-white/30 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition-colors cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      ) : (
        /* Native Media Element: Strictly ZERO filter/refraction/noise distortion */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={currentItem.src}
          src={currentItem.src}
          alt={currentItem.alt || currentItem.title || "Full resolution media"}
          onLoad={() => {
            setIsLoading(false);
            onImageLoad?.();
          }}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
            onImageError?.();
          }}
          className={cn(
            "rounded-xl sm:rounded-2xl object-contain pointer-events-none select-none transition-all duration-300",
            "max-h-[calc(100dvh-12rem)] sm:max-h-[calc(100dvh-13.5rem)]",
            "max-w-[calc(100dvw-1.5rem)] sm:max-w-[calc(100dvw-5rem)] md:max-w-[calc(100dvw-7rem)]",
            "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]",
            isLoading ? "opacity-0 scale-98" : "opacity-100 scale-100"
          )}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LightboxControls (Floating Liquid Glass Action Buttons)                    */
/* -------------------------------------------------------------------------- */

export interface LightboxControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  showCounter?: boolean;
}

export function LightboxControls({
  showCounter = true,
  className,
  ...props
}: LightboxControlsProps) {
  const { items, currentIndex, setOpen, goToNext, goToPrevious, hasNext, hasPrevious, theme } =
    useLightbox();
  const isGallery = items.length > 1;
  const isLight = theme === "light";

  return (
    <div
      data-slot="lightbox-controls"
      className={cn("pointer-events-none absolute inset-0 z-20 overflow-hidden", className)}
      {...props}
    >
      {/* Top Bar: Close Button & Counter Badge with Mobile Safe-Area Inset */}
      <div className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] left-[max(0.75rem,env(safe-area-inset-left))] flex items-center justify-between sm:justify-end gap-3 pointer-events-none">
        {/* Gallery Counter Pill */}
        {showCounter && isGallery && (
          <div
            data-slot="lightbox-counter"
            className={cn(
              "pointer-events-auto inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold select-none",
              "backdrop-blur-2xl backdrop-saturate-200 transition-all duration-200 shadow-xl",
              isLight && [
                "bg-white/80 text-neutral-900 border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_1.5px_0_rgba(255,255,255,1)]",
              ],
              !isLight && [
                "bg-black/55 text-white border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_1.5px_0_rgba(255,255,255,0.35)]",
              ]
            )}
          >
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            <span>{currentIndex + 1}</span>
            <span className="opacity-40">/</span>
            <span className="opacity-75">{items.length}</span>
          </div>
        )}

        {/* Close Button: HaloUI 10-Layer Liquid Glass */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close media viewer (Escape)"
          className={cn(
            "pointer-events-auto relative inline-flex size-10 sm:size-11 items-center justify-center rounded-full select-none cursor-pointer",
            "backdrop-blur-2xl backdrop-saturate-200 transition-all duration-200",
            isLight && [
              "bg-white/80 text-neutral-900 border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.14),inset_0_1px_1.5px_0_rgba(255,255,255,1),inset_0_-1px_1px_0_rgba(0,0,0,0.06)]",
              "hover:bg-white hover:scale-108 active:scale-95",
            ],
            !isLight && [
              "bg-black/55 text-white border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.7),inset_0_1px_1.5px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.7)]",
              "hover:bg-black/80 hover:border-white/40 hover:scale-108 active:scale-95",
            ],
            "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
        >
          <HaloIcon icon={Cancel01Icon} size={19} />
        </button>
      </div>

      {/* Gallery Navigation: Previous Image Button */}
      {isGallery && (
        <button
          type="button"
          onClick={goToPrevious}
          disabled={!hasPrevious}
          aria-label="Previous image (Left Arrow)"
          className={cn(
            "pointer-events-auto absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full select-none cursor-pointer",
            "left-[max(0.5rem,env(safe-area-inset-left))] sm:left-6 md:left-8",
            "size-10 sm:size-12",
            "backdrop-blur-2xl backdrop-saturate-200 transition-all duration-200",
            isLight && [
              "bg-white/80 text-neutral-900 border border-white/90 shadow-[0_10px_28px_rgba(0,0,0,0.16),inset_0_1px_1.5px_0_rgba(255,255,255,1)]",
              "hover:bg-white hover:scale-108 active:scale-95",
            ],
            !isLight && [
              "bg-black/55 text-white border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.75),inset_0_1px_1.5px_0_rgba(255,255,255,0.4)]",
              "hover:bg-black/80 hover:border-white/40 hover:scale-108 active:scale-95",
            ],
            "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            !hasPrevious && "opacity-25 pointer-events-none scale-95"
          )}
        >
          <HaloIcon icon={ArrowLeft01Icon} size={22} />
        </button>
      )}

      {/* Gallery Navigation: Next Image Button */}
      {isGallery && (
        <button
          type="button"
          onClick={goToNext}
          disabled={!hasNext}
          aria-label="Next image (Right Arrow)"
          className={cn(
            "pointer-events-auto absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full select-none cursor-pointer",
            "right-[max(0.5rem,env(safe-area-inset-right))] sm:right-6 md:right-8",
            "size-10 sm:size-12",
            "backdrop-blur-2xl backdrop-saturate-200 transition-all duration-200",
            isLight && [
              "bg-white/80 text-neutral-900 border border-white/90 shadow-[0_10px_28px_rgba(0,0,0,0.16),inset_0_1px_1.5px_0_rgba(255,255,255,1)]",
              "hover:bg-white hover:scale-108 active:scale-95",
            ],
            !isLight && [
              "bg-black/55 text-white border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.75),inset_0_1px_1.5px_0_rgba(255,255,255,0.4)]",
              "hover:bg-black/80 hover:border-white/40 hover:scale-108 active:scale-95",
            ],
            "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            !hasNext && "opacity-25 pointer-events-none scale-95"
          )}
        >
          <HaloIcon icon={ArrowRight01Icon} size={22} />
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LightboxCaption (Floating Liquid Glass Caption Surface)                    */
/* -------------------------------------------------------------------------- */

export interface LightboxCaptionProps extends React.HTMLAttributes<HTMLDivElement> {
  showIndicators?: boolean;
}

export function LightboxCaption({
  showIndicators = true,
  className,
  ...props
}: LightboxCaptionProps) {
  const { items, currentIndex, setCurrentIndex, theme } = useLightbox();
  const currentItem = items[currentIndex];

  if (!currentItem || (!currentItem.title && !currentItem.description && !currentItem.credit)) {
    return null;
  }

  const isGallery = items.length > 1;
  const isLight = theme === "light";

  return (
    <div
      data-slot="lightbox-caption"
      className={cn(
        "pointer-events-auto absolute left-1/2 -translate-x-1/2 z-20 w-auto select-none",
        "bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-5",
        "max-w-[calc(100vw-1.5rem)] sm:max-w-xl md:max-w-2xl",
        "rounded-2xl sm:rounded-3xl px-4 py-2.5 sm:px-6 sm:py-3.5 text-center",
        "backdrop-blur-2xl backdrop-saturate-200 transition-all duration-200",
        // Light mode: Frosted crystal glass surface
        isLight && [
          "bg-white/85 text-neutral-900 border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.18),inset_0_1px_2px_0_rgba(255,255,255,1),inset_0_-1px_1px_0_rgba(0,0,0,0.06)]",
        ],
        // Dark / Adaptive mode: Smoked obsidian liquid glass surface
        !isLight && [
          "bg-black/60 text-white border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.75),inset_0_1px_1.5px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_0_rgba(0,0,0,0.7)]",
        ],
        // 10-Layer Meniscus specular edge & directional top-down sheen
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.3)]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/12 after:via-white/2 after:to-transparent",
        className
      )}
      {...props}
    >
      {/* Title */}
      {currentItem.title && (
        <h4 className={cn(
          "text-xs sm:text-sm font-semibold tracking-tight truncate",
          isLight ? "text-neutral-900" : "text-white"
        )}>
          {currentItem.title}
        </h4>
      )}

      {/* Description */}
      {currentItem.description && (
        <p className={cn(
          "mt-0.5 text-[11px] sm:text-xs leading-relaxed line-clamp-2",
          isLight ? "text-neutral-600" : "text-white/80"
        )}>
          {currentItem.description}
        </p>
      )}

      {/* Photo Attribution Credit */}
      {currentItem.credit && (
        <p className={cn(
          "mt-1 text-[10px] font-mono",
          isLight ? "text-neutral-500" : "text-white/55"
        )}>
          {currentItem.credit}
        </p>
      )}

      {/* Interactive Thumbnail Indicator Rail (for galleries with <= 8 images) */}
      {showIndicators && isGallery && items.length <= 8 && (
        <div className={cn(
          "mt-2.5 flex items-center justify-center gap-1.5 pt-1 border-t",
          isLight ? "border-black/5" : "border-white/10"
        )}>
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to image ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
                idx === currentIndex
                  ? "w-6 bg-primary shadow-xs"
                  : isLight
                    ? "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
