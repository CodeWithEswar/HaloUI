"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Cancel01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Image01Icon,
  AlertCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------- */
/* Types & Context                                                            */
/* -------------------------------------------------------------------------- */

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
  className?: string;
  children?: React.ReactNode;
}

export function LightboxContent({
  scrimIntensity = "deep",
  title = "Media Viewer",
  description = "Focused view of full-resolution image media.",
  container,
  className,
  children,
}: LightboxContentProps) {
  return (
    <DialogPrimitive.Portal container={container}>
      {/* Halo Scrim: Calibrated Deep Viewing Attenuation */}
      <DialogPrimitive.Backdrop
        data-slot="lightbox-scrim"
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-200",
          scrimIntensity === "deep" && "bg-black/90 backdrop-blur-md",
          scrimIntensity === "balanced" && "bg-black/75 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        )}
      />

      {/* Floating Modal Media Stage */}
      <DialogPrimitive.Popup
        data-slot="lightbox-popup"
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 outline-none select-none duration-200",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
      >
        <div className="sr-only">
          <h2 id="lightbox-title">{title}</h2>
          <p id="lightbox-description">{description}</p>
        </div>

        {children || (
          <>
            <LightboxControls />
            <LightboxMedia />
            <LightboxCaption />
          </>
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

/* -------------------------------------------------------------------------- */
/* LightboxMedia (Fidelity-Preserving Image Stage)                             */
/* -------------------------------------------------------------------------- */

export interface LightboxMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  onImageLoad?: () => void;
  onImageError?: () => void;
}

export function LightboxMedia({
  className,
  onImageLoad,
  onImageError,
  ...props
}: LightboxMediaProps) {
  const { items, currentIndex } = useLightbox();
  const currentItem = items[currentIndex];

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
        "relative flex max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-8rem)] max-w-full items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div
          data-slot="lightbox-loader"
          className="absolute inset-0 flex items-center justify-center text-white/60 animate-pulse"
        >
          <HaloIcon icon={Loading03Icon} size={36} className="animate-spin text-white/70" />
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div
          data-slot="lightbox-error"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-8 text-center text-white/80 backdrop-blur-md max-w-md"
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
            className="rounded-lg border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition-colors cursor-pointer"
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
            "max-h-[calc(100vh-7rem)] sm:max-h-[calc(100vh-8rem)] max-w-full rounded-lg object-contain shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] transition-opacity duration-200",
            isLoading ? "opacity-0" : "opacity-100"
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
  const { items, currentIndex, setOpen, goToNext, goToPrevious, hasNext, hasPrevious } =
    useLightbox();
  const isGallery = items.length > 1;

  return (
    <div
      data-slot="lightbox-controls"
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      {...props}
    >
      {/* Top Bar: Close Button & Optional Counter */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3">
        {showCounter && isGallery && (
          <div
            data-slot="lightbox-counter"
            className="pointer-events-auto rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs font-mono font-medium text-white/90 backdrop-blur-md shadow-lg select-none"
          >
            {currentIndex + 1} / {items.length}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close media viewer (Escape)"
          className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/90 backdrop-blur-xl shadow-lg hover:bg-black/60 hover:border-white/50 active:scale-95 transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <HaloIcon icon={Cancel01Icon} size={20} />
        </button>
      </div>

      {/* Gallery Navigation: Previous Image */}
      {isGallery && (
        <button
          type="button"
          onClick={goToPrevious}
          disabled={!hasPrevious}
          aria-label="Previous image (Left Arrow)"
          className={cn(
            "pointer-events-auto absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/90 backdrop-blur-xl shadow-xl hover:bg-black/60 hover:border-white/50 active:scale-95 transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/80",
            !hasPrevious && "opacity-25 pointer-events-none"
          )}
        >
          <HaloIcon icon={ArrowLeft01Icon} size={22} />
        </button>
      )}

      {/* Gallery Navigation: Next Image */}
      {isGallery && (
        <button
          type="button"
          onClick={goToNext}
          disabled={!hasNext}
          aria-label="Next image (Right Arrow)"
          className={cn(
            "pointer-events-auto absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/90 backdrop-blur-xl shadow-xl hover:bg-black/60 hover:border-white/50 active:scale-95 transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/80",
            !hasNext && "opacity-25 pointer-events-none"
          )}
        >
          <HaloIcon icon={ArrowRight01Icon} size={22} />
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LightboxCaption (Floating Frosted Glass Caption Surface)                   */
/* -------------------------------------------------------------------------- */

export interface LightboxCaptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LightboxCaption({ className, ...props }: LightboxCaptionProps) {
  const { items, currentIndex } = useLightbox();
  const currentItem = items[currentIndex];

  if (!currentItem || (!currentItem.title && !currentItem.description && !currentItem.credit)) {
    return null;
  }

  return (
    <div
      data-slot="lightbox-caption"
      className={cn(
        "absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 w-auto max-w-[calc(100%-2rem)] sm:max-w-xl",
        "rounded-2xl border border-white/20 bg-black/50 px-4 py-2.5 sm:px-6 sm:py-3 text-center text-white backdrop-blur-xl shadow-xl",
        className
      )}
      {...props}
    >
      {currentItem.title && (
        <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-white">
          {currentItem.title}
        </h4>
      )}
      {currentItem.description && (
        <p className="mt-0.5 text-[11px] sm:text-xs text-white/75 leading-relaxed">
          {currentItem.description}
        </p>
      )}
      {currentItem.credit && (
        <p className="mt-1 text-[10px] text-white/50 font-mono">
          {currentItem.credit}
        </p>
      )}
    </div>
  );
}
