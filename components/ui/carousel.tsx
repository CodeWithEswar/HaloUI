"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & CONTEXT
 * ----------------------------------------------------------------------- */

export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = UseCarouselParameters[0];
export type CarouselPlugin = UseCarouselParameters[1];

export interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

/* -------------------------------------------------------------------------
 * ROOT CAROUSEL COMPONENT
 * Container-aware (@container/carousel), accessible WAI-ARIA carousel shell.
 * Automatically aligns navigation arrows to the slide track without skew from dots.
 * ----------------------------------------------------------------------- */

export function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (orientation === "horizontal") {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      } else {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          scrollNext();
        }
      }
    },
    [orientation, scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    onSelect(api);

    api.on("reInit", () => {
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
    });
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Separate track children from bottom dots so arrows are always vertically centered on the slide track
  const trackChildren: React.ReactNode[] = [];
  const footerChildren: React.ReactNode[] = [];
  let hasExplicitTrack = false;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      trackChildren.push(child);
      return;
    }

    const slot = (child.props as Record<string, unknown> | undefined)?.["data-slot"];
    if (
      slot === "carousel-track" ||
      (child.type as { displayName?: string })?.displayName === "CarouselTrack"
    ) {
      hasExplicitTrack = true;
    }

    if (
      slot === "carousel-dots" ||
      (child.type as { displayName?: string })?.displayName === "CarouselDots"
    ) {
      footerChildren.push(child);
    } else {
      trackChildren.push(child);
    }
  });

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn(
          "@container/carousel group/carousel w-full min-w-0 select-none",
          !hasExplicitTrack && footerChildren.length === 0 && "relative",
          className
        )}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {hasExplicitTrack || footerChildren.length === 0 ? (
          children
        ) : (
          <>
            <div className="relative w-full min-w-0" data-slot="carousel-track">
              {trackChildren}
            </div>
            {footerChildren}
          </>
        )}
      </div>
    </CarouselContext.Provider>
  );
}

/* -------------------------------------------------------------------------
 * CAROUSEL TRACK (EXPLICIT WRAPPER FOR SLIDES & ARROWS)
 * Encloses the slide viewport and arrows to ensure perfect vertical centering.
 * ----------------------------------------------------------------------- */

export function CarouselTrack({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-track"
      className={cn("relative w-full min-w-0", className)}
      {...props}
    />
  );
}
CarouselTrack.displayName = "CarouselTrack";

/* -------------------------------------------------------------------------
 * CAROUSEL CONTENT (TRACK VIEWPORT)
 * ----------------------------------------------------------------------- */

export function CarouselContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden w-full min-w-0"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
 * CAROUSEL ITEM (SLIDE)
 * ----------------------------------------------------------------------- */

export function CarouselItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * NAVIGATION CONTROLS: PREVIOUS & NEXT BUTTONS
 * Supports "edge" (outside) and "inset" (floating inside with liquid glass)
 * ----------------------------------------------------------------------- */

export interface CarouselControlProps
  extends React.ComponentProps<typeof Button> {
  /**
   * Placement strategy:
   * - "inset": Floats gracefully inside the carousel bounds with liquid glass.
   * - "edge": Extends outside the carousel on desktop, automatically tucks in on mobile.
   * @default "inset"
   */
  position?: "inset" | "edge";
}

export function CarouselPrevious({
  className,
  variant = "glass",
  size = "icon-sm",
  position = "inset",
  ...props
}: CarouselControlProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10 touch-manipulation rounded-full shadow-sm transition-all duration-200 cursor-pointer",
        // Liquid glass backdrop styling
        variant === "glass" && [
          "bg-card/75 dark:bg-card/50 backdrop-blur-md border border-border/70 dark:border-white/15",
          "hover:bg-card/90 dark:hover:bg-card/70 hover:scale-105 active:scale-95",
        ],
        // Positioning
        orientation === "horizontal" && [
          "top-1/2 -translate-y-1/2",
          position === "inset" && "left-2 sm:left-3",
          position === "edge" && "-left-4 @[640px]/carousel:-left-12",
        ],
        orientation === "vertical" && [
          "left-1/2 -translate-x-1/2",
          position === "inset" && "top-2 sm:top-3 rotate-90",
          position === "edge" && "-top-4 @[640px]/carousel:-top-12 rotate-90",
        ],
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <HaloIcon icon={ArrowLeft01Icon} size={16} />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

export function CarouselNext({
  className,
  variant = "glass",
  size = "icon-sm",
  position = "inset",
  ...props
}: CarouselControlProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10 touch-manipulation rounded-full shadow-sm transition-all duration-200 cursor-pointer",
        // Liquid glass backdrop styling
        variant === "glass" && [
          "bg-card/75 dark:bg-card/50 backdrop-blur-md border border-border/70 dark:border-white/15",
          "hover:bg-card/90 dark:hover:bg-card/70 hover:scale-105 active:scale-95",
        ],
        // Positioning
        orientation === "horizontal" && [
          "top-1/2 -translate-y-1/2",
          position === "inset" && "right-2 sm:right-3",
          position === "edge" && "-right-4 @[640px]/carousel:-right-12",
        ],
        orientation === "vertical" && [
          "left-1/2 -translate-x-1/2",
          position === "inset" && "bottom-2 sm:bottom-3 rotate-90",
          position === "edge" && "-bottom-4 @[640px]/carousel:-bottom-12 rotate-90",
        ],
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <HaloIcon icon={ArrowRight01Icon} size={16} />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

/* -------------------------------------------------------------------------
 * PAGINATION INDICATORS (DOTS)
 * Accessible pill indicators supporting click-to-scroll.
 * ----------------------------------------------------------------------- */

export interface CarouselDotsProps extends React.ComponentProps<"div"> {
  /**
   * Optional custom styling for the active dot.
   */
  activeClassName?: string;
  /**
   * Optional custom styling for inactive dots.
   */
  inactiveClassName?: string;
}

export function CarouselDots({
  className,
  activeClassName,
  inactiveClassName,
  ...props
}: CarouselDotsProps) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();

  if (scrollSnaps.length <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Carousel slide pagination"
      data-slot="carousel-dots"
      className={cn(
        "flex items-center justify-center gap-1.5 py-2",
        className
      )}
      {...props}
    >
      {scrollSnaps.map((_, index) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              isSelected
                ? cn("w-6 bg-primary shadow-xs", activeClassName)
                : cn(
                    "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                    inactiveClassName
                  )
            )}
          />
        );
      })}
    </div>
  );
}
CarouselDots.displayName = "CarouselDots";
