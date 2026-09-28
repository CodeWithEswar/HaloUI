import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  InformationCircleIcon,
  SparklesIcon,
  StarIcon,
  Alert02Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & VARIANTS
 * ----------------------------------------------------------------------- */

export type CalloutTone = "note" | "tip" | "important" | "warning" | "caution";
export type CalloutIntensity = "subtle" | "balanced" | "plain";

export const calloutVariants = cva(
  [
    "@container/callout relative w-full isolate overflow-hidden rounded-xl transition-all duration-150 my-5",
    "text-sm text-foreground",
    // Base layout: responsive flex reflow across container widths down to 240px
    "p-3.5 sm:p-4.5 flex gap-3 sm:gap-3.5 items-start",
  ],
  {
    variants: {
      tone: {
        note: [
          // Semantic Tone: Note / Informational
          "text-sky-950 dark:text-sky-100",
          "[&_a]:text-sky-900 dark:[&_a]:text-sky-200",
          "[&_[data-slot=callout-icon]]:text-sky-600 dark:[&_[data-slot=callout-icon]]:text-sky-400",
        ],
        tip: [
          // Semantic Tone: Tip / Best Practice
          "text-emerald-950 dark:text-emerald-100",
          "[&_a]:text-emerald-900 dark:[&_a]:text-emerald-200",
          "[&_[data-slot=callout-icon]]:text-emerald-600 dark:[&_[data-slot=callout-icon]]:text-emerald-400",
        ],
        important: [
          // Semantic Tone: Important / Priority
          "text-purple-950 dark:text-purple-100",
          "[&_a]:text-purple-900 dark:[&_a]:text-purple-200",
          "[&_[data-slot=callout-icon]]:text-purple-600 dark:[&_[data-slot=callout-icon]]:text-purple-400",
        ],
        warning: [
          // Semantic Tone: Warning / Caveat
          "text-amber-950 dark:text-amber-100",
          "[&_a]:text-amber-900 dark:[&_a]:text-amber-200",
          "[&_[data-slot=callout-icon]]:text-amber-600 dark:[&_[data-slot=callout-icon]]:text-amber-400",
        ],
        caution: [
          // Semantic Tone: Caution / Data Loss
          "text-rose-950 dark:text-rose-100",
          "[&_a]:text-rose-900 dark:[&_a]:text-rose-200",
          "[&_[data-slot=callout-icon]]:text-rose-600 dark:[&_[data-slot=callout-icon]]:text-rose-400",
        ],
      },
      intensity: {
        subtle: [
          // Canonical Subtle Liquid Glass: reading-first optical clarity
          "backdrop-blur-md backdrop-saturate-150",
          "border shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.7)]",
          "dark:shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]",
        ],
        balanced: [
          // Balanced Liquid Glass: heightened optical contrast for standalone callouts
          "backdrop-blur-xl backdrop-saturate-180",
          "border shadow-[0_6px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "dark:shadow-[0_10px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]",
        ],
        plain: [
          // Plain / Reduced Transparency: solid, flat background for documentation prose
          "border shadow-xs backdrop-blur-none backdrop-saturate-100",
        ],
      },
    },
    compoundVariants: [
      // Subtle + Tone recipes
      {
        tone: "note",
        intensity: "subtle",
        className: [
          "border-sky-500/25 bg-sky-500/[0.04] dark:border-sky-400/20 dark:bg-sky-500/[0.07]",
        ],
      },
      {
        tone: "tip",
        intensity: "subtle",
        className: [
          "border-emerald-500/25 bg-emerald-500/[0.04] dark:border-emerald-400/20 dark:bg-emerald-500/[0.07]",
        ],
      },
      {
        tone: "important",
        intensity: "subtle",
        className: [
          "border-purple-500/25 bg-purple-500/[0.04] dark:border-purple-400/20 dark:bg-purple-500/[0.07]",
        ],
      },
      {
        tone: "warning",
        intensity: "subtle",
        className: [
          "border-amber-500/30 bg-amber-500/[0.04] dark:border-amber-400/20 dark:bg-amber-500/[0.07]",
        ],
      },
      {
        tone: "caution",
        intensity: "subtle",
        className: [
          "border-rose-500/30 bg-rose-500/[0.05] dark:border-rose-400/20 dark:bg-rose-500/[0.08]",
        ],
      },

      // Balanced + Tone recipes
      {
        tone: "note",
        intensity: "balanced",
        className: [
          "border-sky-500/35 bg-sky-500/[0.08] dark:border-sky-400/30 dark:bg-sky-500/[0.12]",
        ],
      },
      {
        tone: "tip",
        intensity: "balanced",
        className: [
          "border-emerald-500/35 bg-emerald-500/[0.08] dark:border-emerald-400/30 dark:bg-emerald-500/[0.12]",
        ],
      },
      {
        tone: "important",
        intensity: "balanced",
        className: [
          "border-purple-500/35 bg-purple-500/[0.08] dark:border-purple-400/30 dark:bg-purple-500/[0.12]",
        ],
      },
      {
        tone: "warning",
        intensity: "balanced",
        className: [
          "border-amber-500/40 bg-amber-500/[0.08] dark:border-amber-400/30 dark:bg-amber-500/[0.12]",
        ],
      },
      {
        tone: "caution",
        intensity: "balanced",
        className: [
          "border-rose-500/40 bg-rose-500/[0.09] dark:border-rose-400/30 dark:bg-rose-500/[0.14]",
        ],
      },

      // Plain + Tone recipes
      {
        tone: "note",
        intensity: "plain",
        className: [
          "border-sky-500/30 bg-sky-50/80 dark:border-sky-500/20 dark:bg-sky-950/40",
        ],
      },
      {
        tone: "tip",
        intensity: "plain",
        className: [
          "border-emerald-500/30 bg-emerald-50/80 dark:border-emerald-500/20 dark:bg-emerald-950/40",
        ],
      },
      {
        tone: "important",
        intensity: "plain",
        className: [
          "border-purple-500/30 bg-purple-50/80 dark:border-purple-500/20 dark:bg-purple-950/40",
        ],
      },
      {
        tone: "warning",
        intensity: "plain",
        className: [
          "border-amber-500/35 bg-amber-50/80 dark:border-amber-500/20 dark:bg-amber-950/40",
        ],
      },
      {
        tone: "caution",
        intensity: "plain",
        className: [
          "border-rose-500/35 bg-rose-50/80 dark:border-rose-500/20 dark:bg-rose-950/40",
        ],
      },
    ],
    defaultVariants: {
      tone: "note",
      intensity: "subtle",
    },
  }
);

/* -------------------------------------------------------------------------
 * DEFAULT ICON MAP
 * ----------------------------------------------------------------------- */

const DEFAULT_CALLOUT_ICONS: Record<CalloutTone, typeof InformationCircleIcon> = {
  note: InformationCircleIcon,
  tip: SparklesIcon,
  important: StarIcon,
  warning: Alert02Icon,
  caution: Shield01Icon,
};

/* -------------------------------------------------------------------------
 * 1. ROOT CALLOUT COMPONENT
 * Emphasized contextual note surface for prose, documentation, and technical guidance.
 * Server-Component compatible with zero JS breakpoint dependencies.
 * ----------------------------------------------------------------------- */

export interface CalloutProps
  extends Omit<React.ComponentProps<"aside">, "title">,
    VariantProps<typeof calloutVariants> {
  /**
   * Optional custom leading icon.
   * Pass false to completely suppress icon rendering.
   */
  icon?: React.ReactNode | false;
  /**
   * Optional heading title. Can also be supplied via CalloutTitle child subcomponent.
   */
  title?: React.ReactNode;
}

export function Callout({
  className,
  tone = "note",
  intensity = "subtle",
  icon,
  title,
  children,
  ...props
}: CalloutProps) {
  const resolvedTone = tone ?? "note";
  const resolvedIntensity = intensity ?? "subtle";

  const showIcon = icon !== false;
  const DefaultIcon = DEFAULT_CALLOUT_ICONS[resolvedTone];

  return (
    <aside
      data-slot="callout"
      data-tone={resolvedTone}
      data-intensity={resolvedIntensity}
      className={cn(calloutVariants({ tone: resolvedTone, intensity: resolvedIntensity }), className)}
      {...props}
    >
      {/* Leading Icon: baseline aligned with title text */}
      {showIcon && (
        <div
          data-slot="callout-icon"
          aria-hidden="true"
          className="shrink-0 flex items-center justify-center pt-0.5"
        >
          {icon ? icon : <HaloIcon icon={DefaultIcon} size="md" strokeWidth={1.75} />}
        </div>
      )}

      {/* Main Content Area */}
      <div data-slot="callout-body" className="flex-1 min-w-0 space-y-1.5">
        {title && <CalloutTitle>{title}</CalloutTitle>}
        {children}
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------
 * 2. CALLOUT TITLE
 * Semantic heading communicating the title of the contextual note.
 * ----------------------------------------------------------------------- */

export function CalloutTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="callout-title"
      className={cn(
        "font-semibold text-sm leading-snug tracking-tight text-foreground break-words min-w-0",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:opacity-80",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 3. CALLOUT CONTENT / DESCRIPTION
 * Flexible body supporting paragraphs, lists, inline code, and links.
 * ----------------------------------------------------------------------- */

export function CalloutContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-content"
      className={cn(
        "text-xs sm:text-sm text-muted-foreground leading-relaxed break-words min-w-0",
        "[&_p:not(:last-child)]:mb-2.5",
        "[&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1 [&_ul]:my-2",
        "[&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-1 [&_ol]:my-2",
        "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-black/5 dark:[&_code]:bg-white/10 [&_code]:font-mono [&_code]:text-[0.9em]",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:text-foreground",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
 * 4. CALLOUT ICON (OPTIONAL EXPLICIT PRIMITIVE)
 * ----------------------------------------------------------------------- */

export function CalloutIcon({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="callout-icon"
      aria-hidden="true"
      className={cn("shrink-0 inline-flex items-center justify-center text-current", className)}
      {...props}
    >
      {children}
    </span>
  );
}
