"use client";

import * as React from "react";
import {
  Add01Icon,
  ArrowRight01Icon,
  Download01Icon,
  Settings01Icon,
  CheckmarkCircle02Icon,
  SparklesIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * 1. Variants Demonstration
 * Shows every real public variant with identical label over a subtle ambient substrate
 */
export function ButtonVariantsPreview() {
  const variants: { name: ButtonVariant; description: string }[] = [
    { name: "default", description: "Signature liquid glass action with specular catch and inner rim" },
    { name: "secondary", description: "Elevated translucent crystal body with soft boundary" },
    { name: "outline", description: "Recessed ambient surface with defined hairline perimeter" },
    { name: "ghost", description: "Visually quiet at rest, resolving glass surface on hover" },
    { name: "destructive", description: "Liquid ruby glass with optical containment and contrast" },
    { name: "link", description: "Textual action with accessible underline offset" },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/30 via-background to-background p-6">
      {/* Background ambient optical depth cue */}
      <div className="pointer-events-none absolute -top-12 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-400/5" />

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-5 py-4">
        {variants.map((v) => (
          <div key={v.name} className="flex flex-col items-center gap-2">
            <Button variant={v.name}>Button</Button>
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
export function ButtonSizesPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/30 via-background to-background p-6">
      <div className="pointer-events-none absolute -bottom-10 right-10 h-32 w-64 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-400/5" />

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 py-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="sm">Small button</Button>
          <span className="font-mono text-[11px] text-muted-foreground">sm (h-8)</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button size="default">Default button</Button>
          <span className="font-mono text-[11px] text-muted-foreground">default (h-9)</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button size="lg">Large button</Button>
          <span className="font-mono text-[11px] text-muted-foreground">lg (h-11)</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button size="icon" aria-label="Quick action">
            <HaloIcon icon={SparklesIcon} size={16} />
          </Button>
          <span className="font-mono text-[11px] text-muted-foreground">icon (size-9)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. With Icons Demonstration
 * Shows leading, trailing, and icon-only compositions with Hugeicons
 * Plus the signature tactile action button with inner icon housing
 */
export function ButtonIconsPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/30 via-background to-background p-6">
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 py-4">
        {/* Leading icon */}
        <Button>
          <HaloIcon icon={Add01Icon} size={16} />
          New project
        </Button>

        {/* Trailing icon */}
        <Button variant="secondary">
          Continue
          <HaloIcon icon={ArrowRight01Icon} size={16} />
        </Button>

        {/* Outline with icon */}
        <Button variant="outline">
          <HaloIcon icon={Download01Icon} size={16} />
          Export dataset
        </Button>

        {/* Tactile Pill Action with Inner Icon Badge (Signature Liquid Lens Control) */}
        <Button size="lg" className="rounded-full pl-6 pr-2.5 h-12 gap-3 text-base group/start">
          <span>Get started</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md transition-transform group-hover/start:scale-105 group-active/start:scale-95">
            <HaloIcon icon={ArrowRight01Icon} size={16} />
          </span>
        </Button>

        {/* Icon-only */}
        <Button variant="ghost" size="icon" aria-label="Settings">
          <HaloIcon icon={Settings01Icon} size={16} />
        </Button>
      </div>
    </div>
  );
}

/**
 * 4. States Matrix Demonstration
 * Matrix: Rows = Variants, Columns = Rest, Hover, Focus, Pressed, Disabled
 * Responsive: Desktop uses grid, Mobile stacks without horizontal overflow
 */
export function ButtonStatesPreview() {
  const rows: { variant: ButtonVariant; label: string }[] = [
    { variant: "default", label: "Default" },
    { variant: "secondary", label: "Secondary" },
    { variant: "outline", label: "Outline" },
    { variant: "ghost", label: "Ghost" },
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
                  <Button variant={variant} size="sm">
                    Action
                  </Button>
                </td>

                {/* Simulated Hover */}
                <td className="px-4 py-3.5 text-center">
                  <Button
                    variant={variant}
                    size="sm"
                    className="-translate-y-0.5 shadow-md"
                  >
                    Action
                  </Button>
                </td>

                {/* Simulated Focus */}
                <td className="px-4 py-3.5 text-center">
                  <Button
                    variant={variant}
                    size="sm"
                    className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)] z-10"
                  >
                    Action
                  </Button>
                </td>

                {/* Simulated Pressed */}
                <td className="px-4 py-3.5 text-center">
                  <Button
                    variant={variant}
                    size="sm"
                    className="scale-[0.97] translate-y-px shadow-[var(--halo-shadow-compressed)]"
                  >
                    Action
                  </Button>
                </td>

                {/* Disabled */}
                <td className="px-4 py-3.5 text-center">
                  <Button variant={variant} size="sm" disabled>
                    Action
                  </Button>
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
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase">Rest</span>
                <Button variant={variant} size="sm" className="w-full">Action</Button>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase">Hover</span>
                <Button
                  variant={variant}
                  size="sm"
                  className="w-full -translate-y-0.5 shadow-md"
                >
                  Action
                </Button>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase">Focus</span>
                <Button
                  variant={variant}
                  size="sm"
                  className="w-full ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)]"
                >
                  Action
                </Button>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase">Disabled</span>
                <Button variant={variant} size="sm" disabled className="w-full">Action</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-muted-foreground italic">
        Hover, Focus-Visible, and Pressed columns in this matrix simulate visual tokens for comparative inspection. Live keyboard focus ring behavior can be tested below.
      </p>
    </div>
  );
}

/**
 * 5. Real Keyboard Interaction Playground
 * Live interaction testing Tab, Enter, and Space
 */
export function ButtonKeyboardPreview() {
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
        <Button
          variant="default"
          onClick={(e) => trigger("Default Button", e)}
        >
          Primary Action
        </Button>

        <Button
          variant="secondary"
          onClick={(e) => trigger("Secondary Button", e)}
        >
          Secondary Action
        </Button>

        <Button
          variant="outline"
          onClick={(e) => trigger("Outline Button", e)}
        >
          Dismiss Action
        </Button>

        <Button
          variant="destructive"
          onClick={(e) => trigger("Destructive Button", e)}
        >
          Reset Session
        </Button>
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
