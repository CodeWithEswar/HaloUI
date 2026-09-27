import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type StatusTone =
  | "neutral"
  | "positive"
  | "warning"
  | "critical"
  | "info";

export type StatusSize = "sm" | "default" | "lg";

export interface StatusBadgeProps
  extends Omit<React.ComponentProps<"span">, "color"> {
  /**
   * Explicit semantic intent / tone.
   * Decoupled from visible text to prevent application-specific business hardcoding.
   * - "neutral": Muted, baseline state (e.g. Draft, Inactive, Offline, Paused).
   * - "positive": Favorable, healthy state (e.g. Operational, Active, Published, Verified).
   * - "warning": Attention required (e.g. Degraded, Pending, Expiring, Awaiting Approval).
   * - "critical": Erroneous or destructive state (e.g. Outage, Failed, Cancelled, Blocked).
   * - "info": Informational or progress state (e.g. Processing, In Review, Staging).
   * @default "neutral"
   */
  tone?: StatusTone;
  /**
   * Sizing scale controlling internal padding, indicator size, and typography.
   * @default "default"
   */
  size?: StatusSize;
  /**
   * Whether to display an accessible, decorative dot indicator.
   * Note: The dot is supplementary. Accessible state meaning is communicated through text.
   * @default true
   */
  dot?: boolean;
  /**
   * Optional custom decorative icon preceding the status label.
   * When supplied, takes precedence over the dot indicator.
   */
  icon?: React.ReactNode;
}

/* -------------------------------------------------------------------------
 * 1. ROOT STATUS BADGE COMPONENT
 * Semantic state communication primitive built directly on Badge architecture.
 * Server-Component compatible with zero client-side JavaScript overhead.
 * ----------------------------------------------------------------------- */

export function StatusBadge({
  className,
  tone = "neutral",
  size = "default",
  dot = true,
  icon,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      data-slot="status-badge"
      data-tone={tone}
      data-size={size}
      className={cn(
        // Base reset & inline geometry with physical liquid glass optical engine
        "inline-flex items-center shrink-0 font-medium select-none tracking-normal border",
        "backdrop-blur-sm backdrop-saturate-150",
        // Sizing scale
        size === "sm" && "h-4.5 px-1.5 text-[11px] gap-1 rounded-full",
        size === "default" && "h-5 px-2 text-xs gap-1.5 rounded-full",
        size === "lg" && "h-6 px-2.5 text-xs gap-1.5 rounded-full",

        // Semantic Tone: Neutral
        tone === "neutral" && [
          "border-border/70 bg-muted/40 text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.02)]",
          "dark:border-white/12 dark:bg-white/[0.06] dark:text-neutral-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.25)]",
        ],

        // Semantic Tone: Positive (Operational, Healthy, Active)
        tone === "positive" && [
          "border-emerald-500/30 bg-emerald-500/12 text-emerald-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(16,185,129,0.08)]",
          "dark:border-emerald-400/25 dark:bg-emerald-500/15 dark:text-emerald-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.25)]",
        ],

        // Semantic Tone: Warning (Degraded, Pending, Paused)
        tone === "warning" && [
          "border-amber-500/30 bg-amber-500/12 text-amber-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(245,158,11,0.08)]",
          "dark:border-amber-400/25 dark:bg-amber-500/15 dark:text-amber-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.25)]",
        ],

        // Semantic Tone: Critical (Failed, Outage, Error)
        tone === "critical" && [
          "border-rose-500/30 bg-rose-500/12 text-rose-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(244,63,94,0.08)]",
          "dark:border-rose-400/25 dark:bg-rose-500/15 dark:text-rose-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.25)]",
        ],

        // Semantic Tone: Info (Processing, Staging, Informational)
        tone === "info" && [
          "border-sky-500/30 bg-sky-500/12 text-sky-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(14,165,233,0.08)]",
          "dark:border-sky-400/25 dark:bg-sky-500/15 dark:text-sky-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.25)]",
        ],

        className
      )}
      {...props}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className="shrink-0 flex items-center justify-center [&>svg]:size-3"
        >
          {icon}
        </span>
      ) : dot ? (
        <span
          aria-hidden="true"
          data-slot="status-badge-dot"
          className={cn(
            "rounded-full shrink-0",
            size === "sm" ? "size-1.25" : "size-1.5",
            tone === "neutral" && "bg-muted-foreground/70",
            tone === "positive" && "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]",
            tone === "warning" && "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.65)]",
            tone === "critical" && "bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.7)]",
            tone === "info" && "bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.65)]"
          )}
        />
      ) : null}
      <span className="truncate">{children}</span>
    </Badge>
  );
}
