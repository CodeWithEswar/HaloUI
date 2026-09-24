"use client";

import * as React from "react";
import {
  Settings01Icon,
  Search01Icon,
  ReloadIcon,
  ArrowRight01Icon,
  Delete02Icon,
  Copy01Icon,
  Bookmark02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  IconButton,
  type IconButtonVariant,
  type IconButtonSize,
} from "@/components/ui/icon-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * 1. Variants Demonstration
 * Shows every real public variant with the exact same icon (Settings) over a subtle ambient substrate
 */
export function IconButtonVariantsPreview() {
  const variants: { name: IconButtonVariant; description: string }[] = [
    { name: "ghost", description: "Minimal at rest; reveals frosted liquid glass on hover (ideal for toolbars)" },
    { name: "default", description: "Signature liquid glass action lens with specular catch and refraction rim" },
    { name: "secondary", description: "Elevated translucent crystal body with soft optical boundary" },
    { name: "outline", description: "Recessed ambient surface with defined hairline perimeter" },
    { name: "destructive", description: "Liquid ruby glass with optical containment and contrast" },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/30 via-background to-background p-6">
      <div className="pointer-events-none absolute -top-12 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-400/5" />

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 py-4">
        {variants.map((v) => (
          <div key={v.name} className="flex flex-col items-center gap-2">
            <IconButton variant={v.name} aria-label={`Configure ${v.name} settings`}>
              <HaloIcon icon={Settings01Icon} size={18} />
            </IconButton>
            <span className="font-mono text-[11px] text-muted-foreground">{v.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 2. Sizes Demonstration
 * Shows actual supported sizes with constant variant over an optical canvas
 */
export function IconButtonSizesPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/30 via-background to-background p-6">
      <div className="pointer-events-none absolute -bottom-10 right-10 h-32 w-64 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-400/5" />

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 py-4">
        <div className="flex flex-col items-center gap-2">
          <IconButton size="sm" variant="default" aria-label="Search workspace">
            <HaloIcon icon={Search01Icon} size={15} />
          </IconButton>
          <div className="text-center">
            <span className="block font-mono text-[11px] font-medium text-foreground">sm</span>
            <span className="font-mono text-[10px] text-muted-foreground">32 × 32 px</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <IconButton size="default" variant="default" aria-label="Search workspace">
            <HaloIcon icon={Search01Icon} size={18} />
          </IconButton>
          <div className="text-center">
            <span className="block font-mono text-[11px] font-medium text-foreground">default</span>
            <span className="font-mono text-[10px] text-muted-foreground">40 × 40 px</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <IconButton size="lg" variant="default" aria-label="Search workspace">
            <HaloIcon icon={Search01Icon} size={20} />
          </IconButton>
          <div className="text-center">
            <span className="block font-mono text-[11px] font-medium text-foreground">lg</span>
            <span className="font-mono text-[10px] text-muted-foreground">48 × 48 px</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Icon Geometries Demonstration
 * Tests optical centering across different SVG glyph categories
 */
export function IconButtonGeometriesPreview() {
  const icons = [
    { icon: Search01Icon, label: "Search query", desc: "Linear / Angled" },
    { icon: ReloadIcon, label: "Reload documents", desc: "Circular / Radial" },
    { icon: ArrowRight01Icon, label: "Next step", desc: "Directional" },
    { icon: Bookmark02Icon, label: "Bookmark page", desc: "Symmetrical ribbon" },
    { icon: Copy01Icon, label: "Copy code", desc: "Layered rectangular" },
    { icon: Delete02Icon, label: "Delete item", desc: "Destructive bin" },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/30 via-background to-background p-6">
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-5 py-3">
        {icons.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <IconButton
              variant={item.icon === Delete02Icon ? "destructive" : "secondary"}
              aria-label={item.label}
            >
              <HaloIcon icon={item.icon} size={18} />
            </IconButton>
            <span className="font-mono text-[10px] text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 4. Tooltip Composition Demonstration
 * Demonstrates proper integration with Tooltip, where Tooltip provides visual guidance
 * and aria-label provides programmatic accessibility.
 */
export function IconButtonTooltipPreview() {
  return (
    <TooltipProvider delay={100}>
      <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/30 via-background to-background p-6">
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton variant="ghost" aria-label="Copy markdown content">
                  <HaloIcon icon={Copy01Icon} size={18} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent side="top">Copy markdown</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton variant="ghost" aria-label="Save to bookmarks">
                  <HaloIcon icon={Bookmark02Icon} size={18} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent side="top">Add to bookmarks</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton variant="ghost" aria-label="Configure preferences">
                  <HaloIcon icon={Settings01Icon} size={18} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent side="top">Preferences</TooltipContent>
            </Tooltip>
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-sm">
            Hover or focus with <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">Tab</kbd> to inspect the tooltip. Notice that the control remains independently named via <code className="text-foreground font-mono text-[11px]">aria-label</code>.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}

/**
 * 5. States Matrix Demonstration
 * Matrix: Rows = Variants, Columns = Rest, Hover, Focus-Visible, Pressed, Disabled
 */
export function IconButtonStatesPreview() {
  const rows: { variant: IconButtonVariant; label: string }[] = [
    { variant: "ghost", label: "Ghost" },
    { variant: "default", label: "Default" },
    { variant: "secondary", label: "Secondary" },
    { variant: "outline", label: "Outline" },
    { variant: "destructive", label: "Destructive" },
  ];

  return (
    <div className="space-y-4">
      {/* Desktop / Tablet Matrix View */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/20 via-background to-background">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-muted/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Variant</th>
              <th className="px-4 py-3 text-center">Rest</th>
              <th className="px-4 py-3 text-center">Hover</th>
              <th className="px-4 py-3 text-center">Focus-Visible</th>
              <th className="px-4 py-3 text-center">Pressed</th>
              <th className="px-4 py-3 text-center">Disabled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map(({ variant, label }) => (
              <tr key={variant} className="hover:bg-muted/10 transition-colors">
                <td className="px-4 py-3.5 font-medium text-foreground whitespace-nowrap">
                  {label}
                  <span className="block font-mono text-[10px] text-muted-foreground">variant="{variant}"</span>
                </td>

                {/* Rest */}
                <td className="px-4 py-3.5 text-center">
                  <div className="inline-flex justify-center">
                    <IconButton variant={variant} size="sm" aria-label={`${label} action`}>
                      <HaloIcon icon={Settings01Icon} size={15} />
                    </IconButton>
                  </div>
                </td>

                {/* Simulated Hover */}
                <td className="px-4 py-3.5 text-center">
                  <div className="inline-flex justify-center">
                    <IconButton
                      variant={variant}
                      size="sm"
                      aria-label={`${label} action`}
                      className="-translate-y-0.5 shadow-md"
                    >
                      <HaloIcon icon={Settings01Icon} size={15} />
                    </IconButton>
                  </div>
                </td>

                {/* Simulated Focus */}
                <td className="px-4 py-3.5 text-center">
                  <div className="inline-flex justify-center">
                    <IconButton
                      variant={variant}
                      size="sm"
                      aria-label={`${label} action`}
                      className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)] z-10"
                    >
                      <HaloIcon icon={Settings01Icon} size={15} />
                    </IconButton>
                  </div>
                </td>

                {/* Simulated Pressed */}
                <td className="px-4 py-3.5 text-center">
                  <div className="inline-flex justify-center">
                    <IconButton
                      variant={variant}
                      size="sm"
                      aria-label={`${label} action`}
                      className="scale-[0.96] translate-y-px shadow-[var(--halo-shadow-compressed)]"
                    >
                      <HaloIcon icon={Settings01Icon} size={15} />
                    </IconButton>
                  </div>
                </td>

                {/* Disabled */}
                <td className="px-4 py-3.5 text-center">
                  <div className="inline-flex justify-center">
                    <IconButton
                      variant={variant}
                      size="sm"
                      disabled
                      aria-label={`${label} action`}
                    >
                      <HaloIcon icon={Settings01Icon} size={15} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="space-y-4 md:hidden">
        {rows.map(({ variant, label }) => (
          <div key={variant} className="rounded-xl border border-border bg-card/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-sm font-semibold text-foreground">{label}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{variant}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground uppercase">Rest</span>
                <IconButton variant={variant} size="sm" aria-label={`${label} rest`}>
                  <HaloIcon icon={Settings01Icon} size={15} />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground uppercase">Hover</span>
                <IconButton
                  variant={variant}
                  size="sm"
                  aria-label={`${label} hover`}
                  className="-translate-y-0.5 shadow-md"
                >
                  <HaloIcon icon={Settings01Icon} size={15} />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground uppercase">Focus</span>
                <IconButton
                  variant={variant}
                  size="sm"
                  aria-label={`${label} focus`}
                  className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)]"
                >
                  <HaloIcon icon={Settings01Icon} size={15} />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground uppercase">Disabled</span>
                <IconButton variant={variant} size="sm" disabled aria-label={`${label} disabled`}>
                  <HaloIcon icon={Settings01Icon} size={15} />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-muted-foreground italic">
        Hover, Focus-Visible, and Pressed columns simulate visual tokens for comparative inspection. Live keyboard focus ring behavior can be tested below.
      </p>
    </div>
  );
}

/**
 * 6. Real Keyboard Interaction Playground
 */
export function IconButtonKeyboardPreview() {
  const [activeButton, setActiveButton] = React.useState<string | null>(null);
  const [activationCount, setActivationCount] = React.useState(0);
  const [lastTriggerKey, setLastTriggerKey] = React.useState<string>("Click/Keyboard");

  const trigger = (name: string, e: React.MouseEvent | React.KeyboardEvent) => {
    setActiveButton(name);
    setActivationCount((c) => c + 1);
    if ("key" in e && e.key) {
      setLastTriggerKey(`Key: "${e.key === " " ? "Space" : e.key}"`);
    } else {
      setLastTriggerKey("Pointer / Native Activation");
    }
  };

  return (
    <div className="rounded-xl border border-border bg-gradient-to-b from-muted/20 via-background to-background p-6 space-y-5">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Interactive Keyboard Verification</h4>
        <p className="text-xs text-muted-foreground">
          Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Tab</kbd> to focus between controls. Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Enter</kbd> or <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Space</kbd> to activate.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 py-2">
        <IconButton
          variant="ghost"
          aria-label="Search documents"
          onClick={(e) => trigger("Search (Ghost)", e)}
        >
          <HaloIcon icon={Search01Icon} size={18} />
        </IconButton>

        <IconButton
          variant="default"
          aria-label="Refresh database"
          onClick={(e) => trigger("Refresh (Default)", e)}
        >
          <HaloIcon icon={ReloadIcon} size={18} />
        </IconButton>

        <IconButton
          variant="secondary"
          aria-label="Configure system"
          onClick={(e) => trigger("Settings (Secondary)", e)}
        >
          <HaloIcon icon={Settings01Icon} size={18} />
        </IconButton>

        <IconButton
          variant="outline"
          aria-label="Copy public link"
          onClick={(e) => trigger("Copy Link (Outline)", e)}
        >
          <HaloIcon icon={Copy01Icon} size={18} />
        </IconButton>

        <IconButton
          variant="destructive"
          aria-label="Delete active draft"
          onClick={(e) => trigger("Delete Draft (Destructive)", e)}
        >
          <HaloIcon icon={Delete02Icon} size={18} />
        </IconButton>
      </div>

      {/* Real-time telemetry */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border/80 bg-muted/30 px-3.5 py-2.5 text-xs text-muted-foreground font-mono">
        <div className="flex items-center gap-1.5">
          <HaloIcon icon={CheckmarkCircle02Icon} size={14} className="text-emerald-500" />
          <span>Last Activated:</span>
          <span className="text-foreground font-semibold">{activeButton ?? "None (press Tab + Enter/Space)"}</span>
        </div>
        <span>·</span>
        <div>
          <span>Total Triggers:</span> <span className="text-foreground font-semibold">{activationCount}</span>
        </div>
        <span>·</span>
        <div>
          <span>Mechanism:</span> <span className="text-foreground font-semibold">{lastTriggerKey}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 7. Accessible Naming Educational Demonstration
 * Visual side-by-side contrasting accessible name implementation
 */
export function IconButtonAccessibleNamingPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Correct Pattern */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <HaloIcon icon={CheckmarkCircle02Icon} size={16} />
          <span>Compliant Accessible Name</span>
        </div>
        <div className="p-3 rounded-lg border border-border bg-background flex items-center justify-between">
          <IconButton variant="secondary" aria-label="Search workspace documents">
            <HaloIcon icon={Search01Icon} size={18} />
          </IconButton>
          <div className="text-right text-[11px] font-mono text-muted-foreground">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">aria-label="Search workspace documents"</span>
            <span className="block text-[10px]">Screen Reader: "Search workspace documents, button"</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Provides a descriptive, verb-based action title communicating intent clearly to screen readers and speech-control users.
        </p>
      </div>

      {/* Inaccessible Anti-Pattern */}
      <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-3">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-semibold">
          <HaloIcon icon={AlertCircleIcon} size={16} />
          <span>Inaccessible Anti-Pattern</span>
        </div>
        <div className="p-3 rounded-lg border border-border bg-background flex items-center justify-between opacity-80">
          <div className="size-10 rounded-full border border-border flex items-center justify-center text-muted-foreground">
            <HaloIcon icon={Search01Icon} size={18} />
          </div>
          <div className="text-right text-[11px] font-mono text-muted-foreground">
            <span className="text-rose-600 dark:text-rose-400 font-medium">Missing label attribute</span>
            <span className="block text-[10px]">Screen Reader: "button" (unlabeled)</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Sighted users see a magnifying glass icon, but assistive technology announces an unlabeled button with zero contextual meaning.
        </p>
      </div>
    </div>
  );
}
