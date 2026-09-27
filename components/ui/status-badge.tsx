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
        // Base reset & inline geometry
        "inline-flex items-center shrink-0 font-medium select-none tracking-normal border",
        // Sizing scale
        size === "sm" && "h-4.5 px-1.5 text-[11px] gap-1 rounded-full",
        size === "default" && "h-5 px-2 text-xs gap-1.5 rounded-full",
        size === "lg" && "h-6 px-2.5 text-xs gap-1.5 rounded-full",

        // Semantic Tone: Neutral
        tone === "neutral" && [
          "border-border/60 bg-muted/40 text-muted-foreground",
          "dark:border-border/50 dark:bg-muted/20",
        ],

        // Semantic Tone: Positive (Operational, Healthy, Active)
        tone === "positive" && [
          "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
          "dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-400",
        ],

        // Semantic Tone: Warning (Degraded, Pending, Paused)
        tone === "warning" && [
          "border-amber-500/25 bg-amber-500/10 text-amber-800",
          "dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-400",
        ],

        // Semantic Tone: Critical (Failed, Outage, Error)
        tone === "critical" && [
          "border-rose-500/25 bg-rose-500/10 text-rose-700",
          "dark:border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-400",
        ],

        // Semantic Tone: Info (Processing, Staging, Informational)
        tone === "info" && [
          "border-sky-500/25 bg-sky-500/10 text-sky-700",
          "dark:border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-400",
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
            tone === "positive" && "bg-emerald-500",
            tone === "warning" && "bg-amber-500",
            tone === "critical" && "bg-rose-500",
            tone === "info" && "bg-sky-500"
          )}
        />
      ) : null}
      <span className="truncate">{children}</span>
    </Badge>
  );
}
