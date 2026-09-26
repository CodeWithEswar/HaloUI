"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IconSvgElement } from "@hugeicons/react";

/* -------------------------------------------------------------------------- */
/* Dock Context                                                               */
/* -------------------------------------------------------------------------- */

interface DockContextValue {
  magnification: boolean;
  distance: number;
  maxScale: number;
  orientation: "horizontal" | "vertical";
  pointerPos: number | null;
  registerItem: (id: string, rect: DOMRect) => void;
  unregisterItem: (id: string) => void;
  itemsMap: React.MutableRefObject<Map<string, { center: number }>>;
}

const DockContext = React.createContext<DockContextValue | null>(null);

function useDock() {
  return React.useContext(DockContext);
}

/* -------------------------------------------------------------------------- */
/* Dock Root                                                                  */
/* -------------------------------------------------------------------------- */

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the dock layout.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Whether to enable local transform-based magnification on pointer hover.
   * Automatically disabled if user has prefers-reduced-motion enabled.
   * @default false
   */
  magnification?: boolean;
  /**
   * Radial distance (in pixels) from pointer where neighbors scale.
   * @default 120
   */
  distance?: number;
  /**
   * Maximum visual magnification scale factor (1.0 to 1.5).
   * @default 1.35
   */
  maxScale?: number;
  /**
   * Material optical intensity level.
   * @default "balanced"
   */
  intensity?: "subtle" | "balanced" | "rich";
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  function Dock(
    {
      orientation = "horizontal",
      magnification = false,
      distance = 120,
      maxScale = 1.35,
      intensity = "balanced",
      className,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) {
    const [pointerPos, setPointerPos] = React.useState<number | null>(null);
    const [reducedMotion, setReducedMotion] = React.useState(false);
    const itemsMap = React.useRef<Map<string, { center: number }>>(new Map());
    const dockRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const effectiveMagnification = magnification && !reducedMotion;

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!effectiveMagnification) return;
        if (orientation === "horizontal") {
          setPointerPos(e.clientX);
        } else {
          setPointerPos(e.clientY);
        }
        onMouseMove?.(e);
      },
      [effectiveMagnification, orientation, onMouseMove]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (effectiveMagnification) {
          setPointerPos(null);
        }
        onMouseLeave?.(e);
      },
      [effectiveMagnification, onMouseLeave]
    );

    const registerItem = React.useCallback(
      (id: string, rect: DOMRect) => {
        const center =
          orientation === "horizontal"
            ? rect.left + rect.width / 2
            : rect.top + rect.height / 2;
        itemsMap.current.set(id, { center });
      },
      [orientation]
    );

    const unregisterItem = React.useCallback((id: string) => {
      itemsMap.current.delete(id);
    }, []);

    // Merge internal and external refs
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        (dockRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const contextValue = React.useMemo<DockContextValue>(
      () => ({
        magnification: effectiveMagnification,
        distance,
        maxScale,
        orientation,
        pointerPos,
        registerItem,
        unregisterItem,
        itemsMap,
      }),
      [effectiveMagnification, distance, maxScale, orientation, pointerPos, registerItem, unregisterItem]
    );

    return (
      <DockContext.Provider value={contextValue}>
        <div
          ref={setRefs}
          role="toolbar"
          aria-label="Application dock"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          data-slot="dock"
          data-orientation={orientation}
          data-intensity={intensity}
          className={cn(
            // Layout & Geometry: Canonical Liquid Glass Dock Surface
            "relative isolate inline-flex items-center gap-1 sm:gap-2 p-2 select-none overflow-x-auto sm:overflow-visible max-w-full transition-all duration-150",
            "halo-liquid-glass-surface rounded-3xl",
            orientation === "horizontal" ? "flex-row" : "flex-col",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DockContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* DockItem                                                                   */
/* -------------------------------------------------------------------------- */

export interface DockItemProps {
  /**
   * Accessible text label for the item. Mandatory for screen readers even when hidden.
   */
  label: string;
  /**
   * Hugeicon symbol representing the destination or action.
   */
  icon: IconSvgElement;
  /**
   * If provided, renders semantic destination link (<a>) to this URL.
   * If omitted, renders semantic action button (<button>).
   */
  href?: string;
  /**
   * Whether this item represents the active/current destination page.
   * Only applicable when href is provided (renders aria-current="page").
   */
  isActive?: boolean;
  /**
   * Optional badge count or status dot string (e.g. "5", "•").
   */
  badge?: string | number;
  /**
   * Click handler for actions or destination navigation events.
   */
  onClick?: React.MouseEventHandler;
  /**
   * Side where the discovery tooltip opens. Defaults to "top" for horizontal dock.
   */
  tooltipSide?: "top" | "bottom" | "left" | "right";
  /**
   * Additional custom CSS classes.
   */
  className?: string;
}

export const DockItem = React.forwardRef<HTMLElement, DockItemProps>(
  function DockItem(
    {
      label,
      icon,
      href,
      isActive = false,
      badge,
      onClick,
      tooltipSide,
      className,
      ...props
    },
    ref
  ) {
    const dock = useDock();
    const itemId = React.useId();
    const itemRef = React.useRef<HTMLElement | null>(null);
    const [scale, setScale] = React.useState<number>(1);

    // Default tooltip placement based on dock orientation
    const effectiveSide =
      tooltipSide || (dock?.orientation === "vertical" ? "right" : "top");

    // Register item center coordinates for magnification
    React.useEffect(() => {
      if (!dock || !dock.magnification || !itemRef.current) return;

      const updatePosition = () => {
        if (itemRef.current) {
          const rect = itemRef.current.getBoundingClientRect();
          dock.registerItem(itemId, rect);
        }
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("resize", updatePosition);
        dock.unregisterItem(itemId);
      };
    }, [dock, itemId]);

    // Calculate magnification scale factor from pointer proximity
    React.useEffect(() => {
      if (!dock || !dock.magnification || dock.pointerPos === null) {
        setScale(1);
        return;
      }

      const itemInfo = dock.itemsMap.current.get(itemId);
      if (!itemInfo) {
        setScale(1);
        return;
      }

      const dist = Math.abs(dock.pointerPos - itemInfo.center);
      if (dist < dock.distance) {
        const factor = Math.cos((dist / dock.distance) * (Math.PI / 2));
        const newScale = 1 + (dock.maxScale - 1) * Math.max(0, factor);
        setScale(newScale);
      } else {
        setScale(1);
      }
    }, [dock, itemId]);

    // Shared visual interactive styling
    const baseClasses = cn(
      "relative flex size-8.5 sm:size-10 md:size-11 shrink-0 items-center justify-center rounded-xl outline-none select-none transition-all duration-100",
      "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      isActive
        ? "bg-black/[0.08] dark:bg-white/[0.12] text-foreground font-semibold border border-black/5 dark:border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8)] after:absolute after:-bottom-1 after:size-1 after:rounded-full after:bg-foreground"
        : "text-muted-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.08] hover:text-foreground active:scale-95",
      className
    );

    // Inner icon container that receives transform scaling (preventing layout shift)
    const iconContent = (
      <div
        className="flex size-full items-center justify-center transition-transform duration-100 ease-out origin-bottom will-change-transform"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <HaloIcon icon={icon} size={20} className="sm:size-5.5" />
        {badge !== undefined && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground leading-none shadow-xs">
            {badge}
          </span>
        )}
      </div>
    );

    let element: React.ReactElement;

    if (href !== undefined) {
      element = (
        <a
          ref={(node) => {
            itemRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }}
          href={href}
          aria-label={label}
          aria-current={isActive ? "page" : undefined}
          data-slot="dock-item-link"
          data-active={isActive ? "true" : undefined}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={baseClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {iconContent}
          <span className="sr-only">{label}</span>
        </a>
      );
    } else {
      element = (
        <button
          ref={(node) => {
            itemRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }}
          type="button"
          aria-label={label}
          data-slot="dock-item-button"
          onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
          className={baseClasses}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {iconContent}
          <span className="sr-only">{label}</span>
        </button>
      );
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{element}</TooltipTrigger>
        <TooltipContent side={effectiveSide} sideOffset={10}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* DockSeparator                                                              */
/* -------------------------------------------------------------------------- */

export interface DockSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DockSeparator = React.forwardRef<HTMLDivElement, DockSeparatorProps>(
  function DockSeparator({ className, ...props }, ref) {
    const dock = useDock();
    const isVertical = dock?.orientation === "vertical";

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={isVertical ? "horizontal" : "vertical"}
        data-slot="dock-separator"
        className={cn(
          "shrink-0 bg-white/40 dark:bg-white/[0.12]",
          isVertical ? "h-px w-6 my-1" : "h-6 w-px mx-1",
          className
        )}
        {...props}
      />
    );
  }
);

/* -------------------------------------------------------------------------- */
/* DockLabel                                                                  */
/* -------------------------------------------------------------------------- */

export interface DockLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const DockLabel = React.forwardRef<HTMLSpanElement, DockLabelProps>(
  function DockLabel({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="dock-label"
        className={cn("text-xs font-medium text-foreground tracking-tight select-none", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);
