"use client";

import * as React from "react";
import {
  Add01Icon,
  PencilEdit01Icon,
  Message01Icon,
  Search01Icon,
  PinIcon,
  Folder01Icon,
  Mail01Icon,
  Navigation01Icon,
  CompassIcon,
  Layers01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  FloatingActionButton,
  type FloatingActionButtonVariant,
  type FloatingActionButtonSize,
} from "@/components/ui/floating-action-button";
import { HaloBackground } from "@/components/haloui/foundations/halo-background";
import { cn } from "@/lib/utils";

/**
 * 1. CENTERPIECE: Background-Response Stress Test
 *
 * Demonstrates the exact same Floating Action Button floating across
 * Neutral, Photographic Image, Dense UI, and Deep Dark environments.
 * Features an interactive keyboard focus toggle to stress-test the
 * double-contrast Halo Focus Ring perimeter against complex substrates.
 */
export function FloatingActionButtonBackgroundResponsePreview() {
  const [testFocus, setTestFocus] = React.useState(false);
  const [variant, setVariant] = React.useState<FloatingActionButtonVariant>("default");
  const [isExtended, setIsExtended] = React.useState(false);

  const environments = [
    {
      id: "neutral" as const,
      label: "1. Neutral Canvas",
      sublabel: "Subtle stone-100 backdrop with high-key ambient light",
      bgClass: "bg-stone-100/70 dark:bg-neutral-900/60 border border-border/80",
    },
    {
      id: "image" as const,
      label: "2. Photographic Image",
      sublabel: "High dynamic range architectural grid with gradient illumination",
      bgClass: "bg-slate-900 border border-sky-500/20",
    },
    {
      id: "dense-ui" as const,
      label: "3. Dense UI / Data Rows",
      sublabel: "Micro-typography, dividers, and active text-heavy layout",
      bgClass: "bg-stone-50 dark:bg-[#0b0c0e] border border-border/80",
    },
    {
      id: "dark" as const,
      label: "4. Deep Dark Night",
      sublabel: "OLED black canvas with graphite contact shadows",
      bgClass: "bg-[#07080a] border border-white/10",
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground">Stress Test:</span>
          <button
            type="button"
            onClick={() => setTestFocus(!testFocus)}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
              testFocus
                ? "bg-primary text-primary-foreground shadow-xs"
                : "border border-border/80 bg-background hover:bg-muted/50 text-muted-foreground"
            )}
          >
            {testFocus ? "Focus Ring: Active (Simulated)" : "Simulate Keyboard Focus"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border/60 p-0.5 bg-background text-xs">
            <button
              type="button"
              onClick={() => setIsExtended(false)}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors cursor-pointer",
                !isExtended ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              Icon-only
            </button>
            <button
              type="button"
              onClick={() => setIsExtended(true)}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors cursor-pointer",
                isExtended ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              Extended
            </button>
          </div>

          <div className="flex items-center rounded-lg border border-border/60 p-0.5 bg-background text-xs">
            <button
              type="button"
              onClick={() => setVariant("default")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors cursor-pointer",
                variant === "default" ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => setVariant("secondary")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors cursor-pointer",
                variant === "secondary" ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              Secondary
            </button>
          </div>
        </div>
      </div>

      {/* 2x2 Grid of Substrates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {environments.map((env) => (
          <div
            key={env.id}
            className={cn(
              "relative rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-between p-5 transition-all shadow-xs",
              env.bgClass
            )}
          >
            {/* Background Texture Details */}
            {env.id === "image" && (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-25 pointer-events-none" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-sky-500/20 via-indigo-500/10 to-transparent blur-2xl pointer-events-none" />
              </>
            )}

            {env.id === "dense-ui" && (
              <div className="space-y-1.5 opacity-60 text-[10px] font-mono pointer-events-none select-none">
                <div className="flex justify-between border-b border-border/40 pb-1 text-muted-foreground">
                  <span>RECORD_ID</span>
                  <span>TIMESTAMP</span>
                  <span>STATUS</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>HL-9821</span>
                  <span>22:41:04</span>
                  <span className="text-emerald-500">SYNCED</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>HL-9822</span>
                  <span>22:41:19</span>
                  <span className="text-sky-500">OPTICAL_EDGE</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>HL-9823</span>
                  <span>22:42:01</span>
                  <span className="text-amber-500">REFRACTION</span>
                </div>
              </div>
            )}

            {/* Header info */}
            <div className="relative z-10 space-y-0.5">
              <span className={cn(
                "text-xs font-semibold tracking-tight",
                env.id === "image" || env.id === "dark" ? "text-white" : "text-foreground"
              )}>
                {env.label}
              </span>
              <p className={cn(
                "text-[11px]",
                env.id === "image" || env.id === "dark" ? "text-slate-400" : "text-muted-foreground"
              )}>
                {env.sublabel}
              </p>
            </div>

            {/* Floating Action Button Placement */}
            <div className="relative z-10 flex items-end justify-end pt-8">
              <FloatingActionButton
                variant={variant}
                extended={isExtended}
                aria-label="Create item"
                className={cn(
                  testFocus &&
                    "outline-none ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)] z-20"
                )}
              >
                <HaloIcon icon={Add01Icon} size={20} />
                {isExtended && <span>Create item</span>}
              </FloatingActionButton>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-1">
        Notice how the 10-layer physical optical engine retains boundary definition, directional specular rim, and contact elevation across diverse substrates without muddying or glowing uncontrollably.
      </p>
    </div>
  );
}

/**
 * 2. SIZES DEMONSTRATION
 *
 * Compares Default (56px) and Large (64px) touch dimensions.
 */
export function FloatingActionButtonSizesPreview() {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Default 56px */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-border/80 bg-stone-100/50 dark:bg-neutral-900/40">
          <FloatingActionButton size="default" aria-label="Create item (default size)">
            <HaloIcon icon={Add01Icon} size={20} />
          </FloatingActionButton>
          <div className="text-center">
            <span className="text-xs font-semibold text-foreground">Default (56px)</span>
            <p className="text-[11px] text-muted-foreground">Standard touch target · 24px icon</p>
          </div>
        </div>

        {/* Large 64px */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-border/80 bg-stone-100/50 dark:bg-neutral-900/40">
          <FloatingActionButton size="lg" aria-label="Create item (large size)">
            <HaloIcon icon={Add01Icon} size={24} />
          </FloatingActionButton>
          <div className="text-center">
            <span className="text-xs font-semibold text-foreground">Large (64px)</span>
            <p className="text-[11px] text-muted-foreground">Prominent touch target · 28px icon</p>
          </div>
        </div>
      </div>

      {/* Extended Sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/80 bg-muted/20">
          <FloatingActionButton size="default" extended aria-label="Compose new message">
            <HaloIcon icon={Message01Icon} size={20} />
            <span>Compose message</span>
          </FloatingActionButton>
          <span className="text-[11px] text-muted-foreground font-mono">h-14 px-6 (56px height)</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/80 bg-muted/20">
          <FloatingActionButton size="lg" extended aria-label="Compose new message">
            <HaloIcon icon={Message01Icon} size={24} />
            <span>Compose message</span>
          </FloatingActionButton>
          <span className="text-[11px] text-muted-foreground font-mono">h-16 px-7 (64px height)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. EXTENDED VS ICON-ONLY DEMONSTRATION
 */
export function FloatingActionButtonExtendedPreview() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-border/80 bg-muted/20">
        <FloatingActionButton aria-label="Create new milestone">
          <HaloIcon icon={PencilEdit01Icon} size={20} />
        </FloatingActionButton>
        <div className="text-center">
          <span className="text-xs font-semibold text-foreground">Icon-Only FAB</span>
          <p className="text-[11px] text-muted-foreground">Mandatory aria-label="Create new milestone"</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-border/80 bg-muted/20">
        <FloatingActionButton extended aria-label="New milestone">
          <HaloIcon icon={PencilEdit01Icon} size={20} />
          <span>New milestone</span>
        </FloatingActionButton>
        <div className="text-center">
          <span className="text-xs font-semibold text-foreground">Extended FAB</span>
          <p className="text-[11px] text-muted-foreground">Icon + visible label in balanced capsule geometry</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. CONTAINER PLACEMENT & LAYOUT ARCHITECTURE
 *
 * Demonstrates how placement is strictly container-owned:
 * A) Map/Canvas application with bottom-end control
 * B) Mobile viewport with safe-area spacing
 */
export function FloatingActionButtonPlacementPreview() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Map / Canvas Container */}
      <div className="relative h-[280px] rounded-2xl border border-border/80 bg-stone-900 text-white overflow-hidden p-4 flex flex-col justify-between">
        {/* Mock Map Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-emerald-500/15 blur-2xl" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs">
            <HaloIcon icon={CompassIcon} size={14} className="text-sky-400" />
            <span className="font-medium">Map Canvas Viewport</span>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-slate-300">
            <HaloIcon icon={Layers01Icon} size={14} />
          </div>
        </div>

        {/* Layout-owned absolute placement */}
        <div className="relative z-10 flex justify-end">
          <FloatingActionButton
            aria-label="Recenter coordinates"
            className="shadow-2xl"
          >
            <HaloIcon icon={Navigation01Icon} size={20} />
          </FloatingActionButton>
        </div>
      </div>

      {/* Mobile Shell with Safe-Area spacing */}
      <div className="relative h-[280px] rounded-2xl border border-border/80 bg-background p-4 flex flex-col justify-between overflow-hidden shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-semibold text-foreground">Mobile App Shell</span>
            <span className="text-[10px] font-mono text-muted-foreground">390 × 844 px</span>
          </div>
          <p className="text-xs text-muted-foreground">
            FAB positioned at bottom-end with 16px lateral padding and safe-area clearance above navigation.
          </p>
        </div>

        {/* Mobile bottom bar simulation */}
        <div className="space-y-3">
          <div className="flex justify-end">
            <FloatingActionButton
              extended
              aria-label="Add transaction"
              size="default"
            >
              <HaloIcon icon={Add01Icon} size={20} />
              <span>Add entry</span>
            </FloatingActionButton>
          </div>

          <div className="h-10 rounded-xl border border-border/70 bg-muted/40 flex items-center justify-around text-[10px] text-muted-foreground">
            <span>Home</span>
            <span className="font-semibold text-foreground">Activity</span>
            <span>Analytics</span>
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 5. INTERACTION STATES REFERENCE
 */
export function FloatingActionButtonStatesPreview() {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-3">
      {/* Rest */}
      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-border/70 bg-stone-100/40 dark:bg-neutral-900/30">
        <FloatingActionButton aria-label="Rest state item">
          <HaloIcon icon={Add01Icon} size={20} />
        </FloatingActionButton>
        <span className="text-xs font-medium text-foreground">Rest</span>
      </div>

      {/* Hover */}
      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-border/70 bg-stone-100/40 dark:bg-neutral-900/30">
        <FloatingActionButton
          aria-label="Hover state item"
          className="-translate-y-0.5 shadow-[0_16px_44px_-6px_rgba(0,0,0,0.28)]"
        >
          <HaloIcon icon={Add01Icon} size={20} />
        </FloatingActionButton>
        <span className="text-xs font-medium text-foreground">Hover</span>
      </div>

      {/* Focus */}
      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-border/70 bg-stone-100/40 dark:bg-neutral-900/30">
        <FloatingActionButton
          aria-label="Focus state item"
          className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)] z-20"
        >
          <HaloIcon icon={Add01Icon} size={20} />
        </FloatingActionButton>
        <span className="text-xs font-medium text-foreground">Focus (z-20)</span>
      </div>

      {/* Pressed */}
      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-border/70 bg-stone-100/40 dark:bg-neutral-900/30">
        <FloatingActionButton
          aria-label="Pressed state item"
          className="scale-[0.96] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.25)]"
        >
          <HaloIcon icon={Add01Icon} size={20} />
        </FloatingActionButton>
        <span className="text-xs font-medium text-foreground">Pressed</span>
      </div>

      {/* Disabled */}
      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-border/70 bg-stone-100/40 dark:bg-neutral-900/30 col-span-2 sm:col-span-1">
        <FloatingActionButton
          disabled
          aria-label="Disabled state item"
        >
          <HaloIcon icon={Add01Icon} size={20} />
        </FloatingActionButton>
        <span className="text-xs font-medium text-muted-foreground">Disabled</span>
      </div>
    </div>
  );
}

/**
 * 6. KEYBOARD INTERACTION DEMO
 */
export function FloatingActionButtonKeyboardPreview() {
  const [activations, setActivations] = React.useState(0);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-border/80 bg-stone-100/50 dark:bg-neutral-900/40">
      <div className="space-y-1.5 text-center sm:text-left">
        <span className="text-xs font-semibold text-foreground">Accessible Keyboard Navigation</span>
        <p className="text-xs text-muted-foreground max-w-sm">
          Use <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[11px]">Tab</kbd> to focus the control, then press <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[11px]">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono text-[11px]">Space</kbd> to activate.
        </p>
        <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium pt-1">
          Activations logged: {activations}
        </p>
      </div>

      <FloatingActionButton
        onClick={() => setActivations((c) => c + 1)}
        aria-label="Create item via keyboard"
      >
        <HaloIcon icon={Add01Icon} size={20} />
      </FloatingActionButton>
    </div>
  );
}
