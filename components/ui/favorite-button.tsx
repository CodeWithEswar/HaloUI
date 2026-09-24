"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

/**
 * HaloUI FavoriteButton Variants
 *
 * Implements a specialized toggle action for saving/favoriting items,
 * sharing HaloUI's 10-layer physical liquid optical material engine:
 * - default: Authentic liquid glass lens with multi-layered specular reflections
 * - ghost: Pure clarity at rest, resolving frosted glass on hover (ideal for media overlays & cards)
 * - outline: Recessed ambient boundary with defined hairline perimeter
 * - secondary: Elevated frosted crystal body with soft boundary
 *
 * Pressed State:
 * - When active (aria-pressed=true / data-pressed), the favorite icon adopts a high-contrast
 *   filled presentation with semantic warm rose emphasis and optical boundary consolidation.
 */
export const favoriteButtonVariants = cva(
  [
    "group/favorite-button relative inline-flex items-center justify-center font-medium select-none isolate overflow-hidden cursor-pointer",
    "transition-all duration-200 ease-out outline-none shrink-0 rounded-full",
    // Halo Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-20 halo-focus-ring",
    // Tactile press response during pointer/keyboard down
    "halo-tactile-press",
    // Reduced motion compliance
    "motion-reduce:transition-none motion-reduce:transform-none",
    // Disabled State: muted optical transmission while strictly preserving current favorited/unfavorited state
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:transform-none",
    // SVG alignment & icon sizing
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          // Unfavorited rest & hover
          "halo-liquid-glass text-neutral-800 dark:text-neutral-200",
          "hover:text-neutral-950 dark:hover:text-white",
          // Favorited state (aria-pressed=true / data-pressed / data-state=on)
          "aria-pressed:bg-rose-500/[0.08] dark:aria-pressed:bg-rose-500/[0.14]",
          "aria-pressed:text-rose-600 dark:aria-pressed:text-rose-400",
          "aria-pressed:border-rose-500/35 dark:aria-pressed:border-rose-500/45",
          "aria-pressed:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),0_2px_8px_-2px_rgba(244,63,94,0.25)]",
          "dark:aria-pressed:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15),0_2px_10px_-2px_rgba(244,63,94,0.35)]",
          "data-pressed:bg-rose-500/[0.08] dark:data-pressed:bg-rose-500/[0.14]",
          "data-pressed:text-rose-600 dark:data-pressed:text-rose-400",
          "data-pressed:border-rose-500/35 dark:data-pressed:border-rose-500/45",
          "data-[state=on]:bg-rose-500/[0.08] dark:data-[state=on]:bg-rose-500/[0.14]",
          "data-[state=on]:text-rose-600 dark:data-[state=on]:text-rose-400",
          "data-[state=on]:border-rose-500/35 dark:data-[state=on]:border-rose-500/45",
        ],
        ghost: [
          // Unfavorited rest & hover
          "bg-transparent text-neutral-600 dark:text-neutral-400 border border-transparent",
          "hover:bg-white/[0.10] dark:hover:bg-white/[0.10] hover:text-neutral-900 dark:hover:text-white hover:border-black/[0.08] dark:hover:border-white/[0.12]",
          "backdrop-blur-[8px]",
          // Favorited state
          "aria-pressed:text-rose-600 dark:aria-pressed:text-rose-400",
          "aria-pressed:bg-rose-500/[0.10] dark:aria-pressed:bg-rose-500/[0.15]",
          "aria-pressed:border-rose-500/30 dark:aria-pressed:border-rose-500/40",
          "data-pressed:text-rose-600 dark:data-pressed:text-rose-400",
          "data-pressed:bg-rose-500/[0.10] dark:data-pressed:bg-rose-500/[0.15]",
          "data-pressed:border-rose-500/30 dark:data-pressed:border-rose-500/40",
          "data-[state=on]:text-rose-600 dark:data-[state=on]:text-rose-400",
          "data-[state=on]:bg-rose-500/[0.10] dark:data-[state=on]:bg-rose-500/[0.15]",
          "data-[state=on]:border-rose-500/30 dark:data-[state=on]:border-rose-500/40",
        ],
        outline: [
          // Unfavorited rest & hover
          "bg-white/[0.03] dark:bg-white/[0.02] text-neutral-800 dark:text-neutral-200",
          "border border-black/[0.18] dark:border-white/[0.22]",
          "hover:border-black/[0.32] dark:hover:border-white/[0.38] hover:text-neutral-950 dark:hover:text-white",
          "backdrop-blur-[8px]",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_0_rgba(0,0,0,0.15)]",
          // Favorited state
          "aria-pressed:border-rose-500/45 dark:aria-pressed:border-rose-500/55",
          "aria-pressed:text-rose-600 dark:aria-pressed:text-rose-400",
          "aria-pressed:bg-rose-500/[0.08] dark:aria-pressed:bg-rose-500/[0.12]",
          "data-pressed:border-rose-500/45 dark:data-pressed:border-rose-500/55",
          "data-pressed:text-rose-600 dark:data-pressed:text-rose-400",
          "data-pressed:bg-rose-500/[0.08] dark:data-pressed:bg-rose-500/[0.12]",
          "data-[state=on]:border-rose-500/45 dark:data-[state=on]:border-rose-500/55",
          "data-[state=on]:text-rose-600 dark:data-[state=on]:text-rose-400",
          "data-[state=on]:bg-rose-500/[0.08] dark:data-[state=on]:bg-rose-500/[0.12]",
        ],
        secondary: [
          // Unfavorited rest & hover
          "bg-white/70 dark:bg-neutral-900/75 text-neutral-800 dark:text-neutral-100",
          "border border-black/[0.14] dark:border-white/[0.18]",
          "backdrop-blur-[16px] backdrop-saturate-150",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)]",
          "hover:bg-white/85 dark:hover:bg-neutral-900/90 hover:border-black/[0.22] dark:hover:border-white/[0.26]",
          // Favorited state
          "aria-pressed:text-rose-600 dark:aria-pressed:text-rose-400",
          "aria-pressed:border-rose-500/40 dark:aria-pressed:border-rose-500/50",
          "aria-pressed:bg-rose-500/[0.10] dark:aria-pressed:bg-rose-500/[0.16]",
          "data-pressed:text-rose-600 dark:data-pressed:text-rose-400",
          "data-pressed:border-rose-500/40 dark:data-pressed:border-rose-500/50",
          "data-[state=on]:text-rose-600 dark:data-[state=on]:text-rose-400",
          "data-[state=on]:border-rose-500/40 dark:data-[state=on]:border-rose-500/50",
        ],
      },
      size: {
        sm: "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        default: "size-10 [&_svg:not([class*='size-'])]:size-4.5",
        lg: "size-12 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type FavoriteButtonVariant = NonNullable<VariantProps<typeof favoriteButtonVariants>["variant"]>;
export type FavoriteButtonSize = NonNullable<VariantProps<typeof favoriteButtonVariants>["size"]>;

export interface FavoriteButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive>, "children">,
    VariantProps<typeof favoriteButtonVariants> {
  /**
   * Controlled pressed state. When provided, component behaves as a controlled input.
   */
  pressed?: boolean;
  /**
   * Initial pressed state for uncontrolled usage.
   * @default false
   */
  defaultPressed?: boolean;
  /**
   * Callback fired when the pressed state changes.
   */
  onPressedChange?: (pressed: boolean, eventDetails?: any) => void;
  /**
   * Convenience alias for `pressed` matching domain vocabulary.
   */
  favorited?: boolean;
  /**
   * Convenience alias for `onPressedChange` matching domain vocabulary.
   */
  onFavoritedChange?: (favorited: boolean) => void;
  /**
   * Custom icon component when unfavorited.
   * @default FavouriteIcon
   */
  icon?: any;
  /**
   * Custom icon component when favorited.
   * @default FavouriteIcon
   */
  activeIcon?: any;
  /**
   * Optional children for labeled presentations or dynamic render prop.
   */
  children?:
    | React.ReactNode
    | ((state: { pressed: boolean; favorited: boolean }) => React.ReactNode);
}

/**
 * FavoriteButton — HaloUI Actions 09
 *
 * A specialized persistent toggle action for saving, bookmarking, or favoriting items.
 * Unlike CopyButton, this state persists until explicitly toggled again by the user.
 */
export const FavoriteButton = React.forwardRef<HTMLButtonElement, FavoriteButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange: controlledOnPressedChange,
      favorited,
      onFavoritedChange,
      icon = FavouriteIcon,
      activeIcon,
      children,
      ...props
    },
    ref
  ) => {
    // Coordinate canonical pressed state with domain favorited alias
    const isControlled = controlledPressed !== undefined || favorited !== undefined;
    const effectivePressed = controlledPressed !== undefined ? controlledPressed : favorited;

    const [uncontrolledPressed, setUncontrolledPressed] = React.useState(defaultPressed);
    const currentPressed = isControlled ? Boolean(effectivePressed) : uncontrolledPressed;

    const handlePressedChange = (newPressed: boolean, details?: any) => {
      if (!isControlled) {
        setUncontrolledPressed(newPressed);
      }
      controlledOnPressedChange?.(newPressed, details);
      onFavoritedChange?.(newPressed);
    };

    // Accessible name computation
    const computedAriaLabel =
      props["aria-label"] ??
      (currentPressed ? "Remove from favorites" : "Add to favorites");

    const CurrentIcon = currentPressed && activeIcon ? activeIcon : icon;
    const isLabeled = children !== undefined;

    // Labeled presentation sizing classes
    const labeledSizeClasses = isLabeled
      ? size === "sm"
        ? "h-8 w-auto px-2.5 text-xs gap-1.5 rounded-full"
        : size === "lg"
          ? "h-12 w-auto px-5 text-base gap-2.5 rounded-full"
          : "h-10 w-auto px-4 text-sm gap-2 rounded-full"
      : "";

    const renderContent = () => {
      if (typeof children === "function") {
        return children({
          pressed: currentPressed,
          favorited: currentPressed,
        });
      }

      if (isLabeled) {
        return (
          <>
            <HaloIcon
              icon={CurrentIcon}
              className={cn(
                "transition-all duration-150 ease-out",
                currentPressed && "scale-105 fill-current",
                !currentPressed && "opacity-85"
              )}
            />
            <span className="truncate">{children}</span>
          </>
        );
      }

      return (
        <HaloIcon
          icon={CurrentIcon}
          className={cn(
            "transition-all duration-150 ease-out",
            currentPressed && "scale-110 fill-current",
            !currentPressed && "opacity-85"
          )}
        />
      );
    };

    return (
      <TogglePrimitive
        ref={ref}
        pressed={isControlled ? currentPressed : undefined}
        defaultPressed={isControlled ? undefined : defaultPressed}
        onPressedChange={handlePressedChange}
        data-slot="favorite-button"
        data-variant={variant}
        data-size={size}
        data-favorited={currentPressed}
        aria-label={computedAriaLabel}
        className={cn(
          favoriteButtonVariants({ variant, size }),
          labeledSizeClasses,
          className
        )}
        {...props}
      >
        {renderContent()}
      </TogglePrimitive>
    );
  }
);

FavoriteButton.displayName = "FavoriteButton";
