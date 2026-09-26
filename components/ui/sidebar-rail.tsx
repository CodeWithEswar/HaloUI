"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { SidebarLeftIcon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

/* -------------------------------------------------------------------------- */
/* SidebarRail Root                                                           */
/* -------------------------------------------------------------------------- */

export interface SidebarRailProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional custom width class. Defaults to w-14 (3.5rem / 56px).
   */
  className?: string;
  /**
   * If true, always renders the compact rail regardless of SidebarProvider open state.
   * If false (default), synchronizes with SidebarProvider to render when collapsed or standalone.
   */
  standalone?: boolean;
}

export const SidebarRail = React.forwardRef<HTMLElement, SidebarRailProps>(
  function SidebarRail({ className, children, standalone = false, ...props }, ref) {
    // Optional integration with SidebarProvider context if present
    let isCollapsed = true;
    try {
      const sidebarContext = useSidebar();
      if (!standalone && sidebarContext) {
        isCollapsed = sidebarContext.state === "collapsed";
      }
    } catch {
      // Standalone mode without SidebarProvider
      isCollapsed = true;
    }

    if (!standalone && !isCollapsed) {
      return null;
    }

    return (
      <aside
        ref={ref}
        data-slot="sidebar-rail"
        aria-label="Compact application navigation"
        className={cn(
          "relative isolate flex h-full w-14 shrink-0 flex-col items-center py-3 text-sidebar-foreground transition-[width] duration-200 ease-linear select-none",
          // HaloUI Subtle Liquid Optical Engine
          "bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180",
          "border-r border-white/80 dark:border-white/[0.12]",
          // Inner Refraction Rim & Overhead Specular Highlight
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8)] dark:before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]",
          "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:bg-gradient-to-b after:from-white/20 after:via-white/5 after:to-transparent dark:after:from-white/10 dark:after:via-transparent dark:after:to-transparent",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* SidebarRailHeader                                                          */
/* -------------------------------------------------------------------------- */

export interface SidebarRailHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarRailHeader = React.forwardRef<HTMLDivElement, SidebarRailHeaderProps>(
  function SidebarRailHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-rail-header"
        className={cn("flex shrink-0 flex-col items-center gap-2 pb-3", className)}
        {...props}
      />
    );
  }
);

/* -------------------------------------------------------------------------- */
/* SidebarRailContent                                                         */
/* -------------------------------------------------------------------------- */

export interface SidebarRailContentProps extends React.HTMLAttributes<HTMLElement> {}

export const SidebarRailContent = React.forwardRef<HTMLElement, SidebarRailContentProps>(
  function SidebarRailContent({ className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        data-slot="sidebar-rail-content"
        aria-label="Navigation rail destinations"
        className={cn(
          "no-scrollbar flex min-h-0 flex-1 w-full flex-col items-center gap-1.5 overflow-y-auto px-1.5 py-1",
          className
        )}
        {...props}
      />
    );
  }
);

/* -------------------------------------------------------------------------- */
/* SidebarRailFooter                                                          */
/* -------------------------------------------------------------------------- */

export interface SidebarRailFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarRailFooter = React.forwardRef<HTMLDivElement, SidebarRailFooterProps>(
  function SidebarRailFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-rail-footer"
        className={cn("flex shrink-0 flex-col items-center gap-2 pt-3 border-t border-white/40 dark:border-white/[0.08]", className)}
        {...props}
      />
    );
  }
);

/* -------------------------------------------------------------------------- */
/* SidebarRailLink                                                            */
/* -------------------------------------------------------------------------- */

export interface SidebarRailLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Accessible text label for the destination. Mandatory for screen readers even when hidden.
   */
  label: string;
  /**
   * Hugeicon symbol representing the destination.
   */
  icon: IconSvgElement;
  /**
   * Whether this destination represents the current page route.
   */
  isActive?: boolean;
  /**
   * Optional badge count or unread dot string (e.g. "12", "•").
   */
  badge?: string | number;
  /**
   * Tooltip side. Defaults to "right".
   */
  tooltipSide?: "right" | "top" | "bottom" | "left";
}

export const SidebarRailLink = React.forwardRef<HTMLAnchorElement, SidebarRailLinkProps>(
  function SidebarRailLink(
    {
      label,
      icon,
      isActive = false,
      badge,
      tooltipSide = "right",
      className,
      href,
      children,
      ...props
    },
    ref
  ) {
    const linkElement = (
      <a
        ref={ref}
        href={href}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        data-slot="sidebar-rail-link"
        data-active={isActive ? "true" : undefined}
        className={cn(
          "relative flex size-10 items-center justify-center rounded-xl transition-all duration-150 outline-none select-none",
          isActive
            ? "bg-black/[0.06] dark:bg-white/[0.12] text-foreground font-semibold border border-black/[0.08] dark:border-white/[0.14] shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.9),0_2px_8px_-2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),0_2px_8px_-2px_rgba(0,0,0,0.4)] backdrop-blur-md after:absolute after:left-[-6px] after:top-2 after:bottom-2 after:w-1 after:rounded-r-full after:bg-[var(--halo-primary,theme(colors.primary.DEFAULT))]"
            : "text-muted-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
        {...props}
      >
        <HaloIcon icon={icon} size={18} />
        <span className="sr-only">{label}</span>
        {badge !== undefined && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground leading-none shadow-xs">
            {badge}
          </span>
        )}
        {children}
      </a>
    );

    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
        <TooltipContent side={tooltipSide} sideOffset={8}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* SidebarRailAction                                                          */
/* -------------------------------------------------------------------------- */

export interface SidebarRailActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: IconSvgElement;
  badge?: string | number;
  tooltipSide?: "right" | "top" | "bottom" | "left";
}

export const SidebarRailAction = React.forwardRef<HTMLButtonElement, SidebarRailActionProps>(
  function SidebarRailAction(
    { label, icon, badge, tooltipSide = "right", className, ...props },
    ref
  ) {
    const buttonElement = (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        data-slot="sidebar-rail-action"
        className={cn(
          "relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-150 outline-none select-none",
          "hover:bg-white/50 dark:hover:bg-white/5 hover:text-foreground active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
        {...props}
      >
        <HaloIcon icon={icon} size={18} />
        <span className="sr-only">{label}</span>
        {badge !== undefined && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground leading-none shadow-xs">
            {badge}
          </span>
        )}
      </button>
    );

    return (
      <Tooltip>
        <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
        <TooltipContent side={tooltipSide} sideOffset={8}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* SidebarRailExpand                                                          */
/* -------------------------------------------------------------------------- */

export interface SidebarRailExpandProps extends React.ComponentProps<typeof Button> {}

export const SidebarRailExpand = React.forwardRef<HTMLButtonElement, SidebarRailExpandProps>(
  function SidebarRailExpand({ className, onClick, ...props }, ref) {
    let toggleSidebar: (() => void) | undefined;
    try {
      const sidebarContext = useSidebar();
      toggleSidebar = sidebarContext.toggleSidebar;
    } catch {
      toggleSidebar = undefined;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size="icon-sm"
            aria-label="Expand sidebar"
            className={cn("size-10 rounded-xl text-muted-foreground hover:text-foreground", className)}
            onClick={(e) => {
              onClick?.(e);
              toggleSidebar?.();
            }}
            {...props}
          >
            <HaloIcon icon={SidebarLeftIcon} size={18} />
            <span className="sr-only">Expand sidebar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Expand sidebar
        </TooltipContent>
      </Tooltip>
    );
  }
);
