"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type AvatarSize = "sm" | "default" | "lg" | "xl";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps extends AvatarPrimitive.Root.Props {
  /**
   * Sizing scale controlling outer dimensions and font scale.
   * - "sm": 24px (compact list rows, inline references)
   * - "default": 32px (standard cards, comment headers)
   * - "lg": 40px (hero items, prominent identity cards)
   * - "xl": 48px (profile headers, author spotlights)
   * @default "default"
   */
  size?: AvatarSize;
}

export interface AvatarBadgeProps extends React.ComponentProps<"span"> {
  /**
   * Semantic presence status communicating connectivity state.
   */
  status?: AvatarStatus;
}

/* -------------------------------------------------------------------------
 * 1. ROOT AVATAR
 * Foundational visual identity primitive. Preserves media fidelity without
 * applying distorting optical parent filters or blur over entity photos.
 * ----------------------------------------------------------------------- */

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex shrink-0 rounded-full select-none isolate overflow-visible",
        // Hairline optical refraction boundary
        "ring-1 ring-black/10 dark:ring-white/15 shadow-2xs",
        // Sizing scales
        size === "sm" && "size-6",
        size === "default" && "size-8",
        size === "lg" && "size-10",
        size === "xl" && "size-12",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 2. AVATAR IMAGE
 * High-fidelity identity photo presentation.
 * ----------------------------------------------------------------------- */

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. AVATAR FALLBACK
 * Graceful fallback presenting uppercase entity initials or glyphic icon.
 * ----------------------------------------------------------------------- */

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-card/90 dark:bg-white/[0.08] border border-border/50 dark:border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] font-semibold text-foreground uppercase tracking-normal select-none",
        "text-xs group-data-[size=sm]/avatar:text-[10px] group-data-[size=lg]/avatar:text-sm group-data-[size=xl]/avatar:text-base",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. AVATAR BADGE
 * Presence status or count indicator anchored to the bottom-right perimeter.
 * ----------------------------------------------------------------------- */

function AvatarBadge({
  className,
  status,
  children,
  ...props
}: AvatarBadgeProps) {
  return (
    <span
      data-slot="avatar-badge"
      data-status={status}
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full ring-2 ring-background select-none",
        // Size-responsive indicator positioning & sizing
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2.5",
        "group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
        // Semantic presence presets with optical luminous glow
        status === "online" && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.85)]",
        status === "away" && "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
        status === "busy" && "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.85)]",
        status === "offline" && "bg-neutral-400 dark:bg-neutral-600 shadow-[0_0_4px_rgba(0,0,0,0.2)]",
        !status && "bg-primary text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
};

export {
  AvatarGroup,
  AvatarGroupCount,
  type AvatarGroupProps,
  type AvatarGroupCountProps,
  type AvatarGroupStacking,
} from "@/components/ui/avatar-group";
