"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import type { IconSvgElement } from "@hugeicons/react";

/* -------------------------------------------------------------------------- */
/* BottomNavigation Root                                                      */
/* -------------------------------------------------------------------------- */

export interface BottomNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Material optical intensity level.
   * @default "balanced"
   */
  intensity?: "subtle" | "balanced" | "rich";
  /**
   * If true, anchors the navigation bar permanently to the viewport bottom with safe-area insets.
   * If false, renders as a standard block navigation surface.
   * @default false
   */
  fixed?: boolean;
}

export const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(
  function BottomNavigation(
    {
      intensity = "balanced",
      fixed = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Primary mobile navigation"
        data-slot="bottom-navigation"
        data-intensity={intensity}
        data-fixed={fixed ? "true" : undefined}
        className={cn(
          // Layout & Positioning
          "relative isolate flex w-full items-center justify-around select-none transition-all duration-200",
          fixed && "fixed inset-x-0 bottom-0 z-40",
          // Height and Safe-Area Inset Handling
          "h-16 pb-[env(safe-area-inset-bottom,0px)] px-2",
          "halo-liquid-glass-surface",
          className
        )}
        {...props}
      >
        <div className="flex w-full max-w-md items-center justify-around h-full">
          {children}
        </div>
      </nav>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* BottomNavigationItem                                                       */
/* -------------------------------------------------------------------------- */

export interface BottomNavigationItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Destination URL route. Renders as a semantic <a> element.
   */
  href: string;
  /**
   * Accessible text label for the destination.
   */
  label: string;
  /**
   * Hugeicon symbol representing the destination route.
   */
  icon: IconSvgElement;
  /**
   * Whether this destination represents the active/current page route.
   * Renders aria-current="page" and distinct visual indicator.
   * @default false
   */
  isActive?: boolean;
  /**
   * Optional notification count or unread dot string (e.g. "3", "99+", "•").
   */
  badge?: string | number;
}

export const BottomNavigationItem = React.forwardRef<HTMLAnchorElement, BottomNavigationItemProps>(
  function BottomNavigationItem(
    {
      href,
      label,
      icon,
      isActive = false,
      badge,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <a
        ref={ref}
        href={href}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        data-slot="bottom-navigation-item"
        data-active={isActive ? "true" : undefined}
        className={cn(
          // Hit Target & Flex Column Geometry
          "group/nav-item relative flex flex-1 flex-col items-center justify-center gap-1 my-1.5 py-1 px-1.5 h-[calc(100%-12px)] min-w-[56px] max-w-[80px]",
          "text-muted-foreground outline-none select-none transition-all duration-150 active:scale-95",
          // Focus Ring: High contrast, distinct from current indicator
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl",
          // Active state styling: Optical Lens with clear separation from top border
          isActive
            ? "text-foreground font-semibold bg-black/[0.05] dark:bg-white/[0.12] rounded-xl shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.85)] dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.2)]"
            : "hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
          className
        )}
        {...props}
      >
        {/* Active Pill Indicator on Top Edge */}
        {isActive && (
          <span
            aria-hidden="true"
            className="absolute -top-1.5 h-[2.5px] w-7 rounded-full bg-foreground transition-all duration-200"
          />
        )}

        {/* Icon & Badge Container */}
        <div className="relative flex items-center justify-center size-6 transition-transform duration-150 group-hover/nav-item:scale-105">
          <HaloIcon
            icon={icon}
            size={22}
            className={cn(
              "transition-colors duration-150",
              isActive ? "text-foreground" : "text-muted-foreground group-hover/nav-item:text-foreground"
            )}
          />
          {badge !== undefined && (
            <BottomNavigationBadge>{badge}</BottomNavigationBadge>
          )}
        </div>

        {/* Visible Text Label */}
        <BottomNavigationLabel isActive={isActive}>
          {label}
        </BottomNavigationLabel>

        {children}
      </a>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* BottomNavigationLabel                                                      */
/* -------------------------------------------------------------------------- */

export interface BottomNavigationLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  isActive?: boolean;
}

export const BottomNavigationLabel = React.forwardRef<HTMLSpanElement, BottomNavigationLabelProps>(
  function BottomNavigationLabel({ isActive = false, className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="bottom-navigation-label"
        className={cn(
          "text-[10px] tracking-tight leading-none select-none truncate max-w-[68px] transition-colors duration-150",
          isActive ? "font-semibold text-foreground" : "font-medium text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* BottomNavigationBadge                                                      */
/* -------------------------------------------------------------------------- */

export interface BottomNavigationBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const BottomNavigationBadge = React.forwardRef<HTMLSpanElement, BottomNavigationBadgeProps>(
  function BottomNavigationBadge({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="bottom-navigation-badge"
        className={cn(
          "absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground leading-none shadow-xs pointer-events-none select-none",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
