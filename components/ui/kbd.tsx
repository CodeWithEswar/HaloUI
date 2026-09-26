import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.ComponentProps<"kbd"> {
  /**
   * Sizing variant for keycap representation.
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
}

/**
 * Kbd
 * A semantic visual representation of keyboard keys and shortcut combinations.
 * Pure Server Component-compatible, non-interactive presentational primitive.
 */
function Kbd({
  className,
  size = "default",
  children,
  ...props
}: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex w-fit items-center justify-center font-mono font-semibold tracking-tight text-foreground/90 select-text align-baseline transition-all",
        "rounded-md border border-black/[0.08] dark:border-white/[0.14] bg-white/75 dark:bg-white/[0.08] backdrop-blur-md",
        "shadow-[0_1.5px_2px_0_rgba(0,0,0,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1.5px_3px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.25),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
        size === "sm" && "h-4.5 min-w-4.5 px-1 text-[10px]",
        size === "default" && "h-5.5 min-w-5.5 px-1.5 text-[11px]",
        size === "lg" && "h-6.5 min-w-6.5 px-2 text-xs",
        "in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background in-data-[slot=tooltip-content]:border-background/20",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

export interface KbdGroupProps extends React.ComponentProps<"span"> {}

/**
 * KbdGroup
 * Semantic grouping container for multi-key shortcut combinations.
 */
function KbdGroup({
  className,
  children,
  ...props
}: KbdGroupProps) {
  return (
    <span
      data-slot="kbd-group"
      className={cn(
        "inline-flex items-center gap-1 text-xs text-muted-foreground select-text",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Kbd, KbdGroup };
