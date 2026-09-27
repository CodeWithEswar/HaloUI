import * as React from "react";
import { type AvatarSize } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type AvatarGroupStacking = "last-on-top" | "first-on-top";

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  /**
   * Sizing scale controlling overlap spacing and child Avatar dimensions.
   * - "sm": 24px avatars with -6px overlap
   * - "default": 32px avatars with -8px overlap
   * - "lg": 40px avatars with -10px overlap
   * - "xl": 48px avatars with -12px overlap
   * @default "default"
   */
  size?: AvatarSize;
  /**
   * Maximum number of visible identity avatars to render before truncating into an overflow indicator.
   */
  max?: number;
  /**
   * Total number of group members. When supplied with `max`, computes the overflow count from totalCount
   * (e.g. 100 members total with 3 visible renders `+97`).
   */
  totalCount?: number;
  /**
   * Visual stacking order of overlapping avatars.
   * - "last-on-top": Later avatars stack above preceding siblings (natural DOM order).
   * - "first-on-top": First avatar stacks above subsequent siblings.
   * @default "last-on-top"
   */
  stacking?: AvatarGroupStacking;
  /**
   * Accessible group label describing the membership context to assistive technologies.
   */
  "aria-label"?: string;
}

export interface AvatarGroupCountProps extends React.ComponentProps<"div"> {
  /**
   * Sizing scale matching the avatar size.
   * @default "default"
   */
  size?: AvatarSize;
}

/* -------------------------------------------------------------------------
 * 1. ROOT AVATAR GROUP
 * Composition primitive arranging multiple Avatar components into a compact,
 * overlapping identity cluster. Server-Component compatible with zero client JS.
 * ----------------------------------------------------------------------- */

export function AvatarGroup({
  className,
  size = "default",
  max,
  totalCount,
  stacking = "last-on-top",
  children,
  role = "group",
  ...props
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children).filter(Boolean);

  let visibleChildren = childArray;
  let overflowCount = 0;

  if (typeof max === "number" && max > 0 && childArray.length > max) {
    visibleChildren = childArray.slice(0, max);
    if (typeof totalCount === "number" && totalCount > max) {
      overflowCount = totalCount - max;
    } else {
      overflowCount = childArray.length - max;
    }
  } else if (typeof totalCount === "number" && totalCount > childArray.length) {
    overflowCount = totalCount - childArray.length;
  }

  return (
    <div
      role={role}
      data-slot="avatar-group"
      data-size={size}
      data-stacking={stacking}
      className={cn(
        "group/avatar-group isolate flex items-center select-none",
        // Deterministic overlap spacing with RTL logical support
        size === "sm" && "-space-x-1.5 rtl:space-x-reverse",
        size === "default" && "-space-x-2 rtl:space-x-reverse",
        size === "lg" && "-space-x-2.5 rtl:space-x-reverse",
        size === "xl" && "-space-x-3 rtl:space-x-reverse",

        // Separation knockout ring token
        "*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        "*:data-[slot=avatar-group-count]:ring-2 *:data-[slot=avatar-group-count]:ring-background",

        // Focus & interaction elevation: focused avatar pops to top so Halo focus ring is never clipped
        "*:data-[slot=avatar]:transition-transform",
        "*:data-[slot=avatar]:focus-within:z-20 *:data-[slot=avatar]:focus-visible:z-20",
        "*:data-[slot=avatar]:hover:z-10 *:data-[slot=avatar]:hover:scale-105",

        className
      )}
      {...props}
    >
      {visibleChildren.map((child, index) => {
        const style =
          stacking === "first-on-top"
            ? { zIndex: visibleChildren.length - index, ...((child as any).props?.style || {}) }
            : (child as any).props?.style;

        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            key: index,
            size: (child.props as any).size || size,
            style,
          });
        }
        return child;
      })}

      {overflowCount > 0 && (
        <AvatarGroupCount size={size}>
          +{overflowCount}
        </AvatarGroupCount>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. AVATAR GROUP COUNT
 * Remaining entity count indicator preserving overlapping stack rhythm.
 * ----------------------------------------------------------------------- */

export function AvatarGroupCount({
  className,
  size = "default",
  children,
  ...props
}: AvatarGroupCountProps) {
  return (
    <div
      data-slot="avatar-group-count"
      data-size={size}
      aria-hidden="true"
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full font-semibold select-none tracking-normal z-0 transition-transform duration-150 hover:scale-105",
        // Luminous Liquid Glass count surface
        "bg-card/80 dark:bg-white/[0.08] text-foreground border border-border/70 dark:border-white/15 backdrop-blur-md backdrop-saturate-150",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]",
        // Sizing matching Avatar dimensions
        size === "sm" && "size-6 text-[10px]",
        size === "default" && "size-8 text-xs",
        size === "lg" && "size-10 text-sm",
        size === "xl" && "size-12 text-base",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
