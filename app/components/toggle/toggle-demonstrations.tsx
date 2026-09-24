"use client";

import * as React from "react";
import {
  PinIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  Bookmark01Icon,
  VolumeHighIcon,
  VolumeMute01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Toggle,
  toggleVariants,
} from "@/components/ui/toggle";

/**
 * State Matrix Demonstration:
 * The centerpiece demonstration for Toggle:
 * Rows: Unpressed, Pressed
 * Columns: Rest, Hover, Focus, Active, Disabled
 */
export function ToggleStateMatrixPreview() {
  return (
    <div className="w-full space-y-4">
      {/* Desktop / Tablet Matrix Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-border/50 bg-muted/10 p-4 sm:p-6">
        <table className="w-full min-w-[560px] text-center border-collapse">
          <thead>
            <tr className="border-b border-border/40 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              <th className="text-left pb-3 pl-2 font-medium">State</th>
              <th className="pb-3 font-medium">Rest</th>
              <th className="pb-3 font-medium">Hover</th>
              <th className="pb-3 font-medium">Focus</th>
              <th className="pb-3 font-medium">Active (Press)</th>
              <th className="pb-3 font-medium">Disabled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30 text-xs">
            {/* Row 1: Unpressed */}
            <tr>
              <td className="text-left py-4 pl-2 font-mono font-medium text-muted-foreground whitespace-nowrap">
                Unpressed
              </td>
              <td className="py-4 px-2">
                <Toggle defaultPressed={false} aria-label="Pin rest">
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
              <td className="py-4 px-2">
                <Toggle
                  defaultPressed={false}
                  aria-label="Pin hover"
                  className="-translate-y-0.5 shadow-sm text-neutral-950 dark:text-white"
                >
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
              <td className="py-4 px-2">
                <Toggle
                  defaultPressed={false}
                  aria-label="Pin focus"
                  className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)] z-20"
                >
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
              <td className="py-4 px-2">
                <Toggle
                  defaultPressed={false}
                  aria-label="Pin active"
                  className="scale-95"
                >
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
              <td className="py-4 px-2">
                <Toggle
                  defaultPressed={false}
                  disabled
                  aria-label="Pin disabled unpressed"
                >
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
            </tr>

            {/* Row 2: Pressed */}
            <tr>
              <td className="text-left py-4 pl-2 font-mono font-medium text-foreground whitespace-nowrap">
                Pressed
              </td>
              <td className="py-4 px-2">
                <Toggle defaultPressed={true} aria-label="Pin pressed rest">
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
              <td className="py-4 px-2">
                <Toggle
                  defaultPressed={true}
                  aria-label="Pin pressed hover"
                  className="-translate-y-0.5"
                >
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
              <td className="py-4 px-2">
                <Toggle
                  defaultPressed={true}
                  aria-label="Pin pressed focus"
                  className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)] z-20"
                >
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
              <td className="py-4 px-2">
                <Toggle
                  defaultPressed={true}
                  aria-label="Pin pressed active"
                  className="scale-95"
                >
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
              <td className="py-4 px-2">
                <Toggle
                  defaultPressed={true}
                  disabled
                  aria-label="Pin disabled pressed"
                >
                  <HaloIcon icon={PinIcon} size={16} />
                </Toggle>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Responsive Cards */}
      <div className="md:hidden space-y-4">
        {/* Unpressed Group */}
        <div className="rounded-xl border border-border/50 bg-muted/15 p-4 space-y-3">
          <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Unpressed States
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/50 border border-border/30">
              <span className="text-[10px] text-muted-foreground font-mono">Rest</span>
              <Toggle defaultPressed={false} aria-label="Rest">
                <HaloIcon icon={PinIcon} size={15} />
              </Toggle>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/50 border border-border/30">
              <span className="text-[10px] text-muted-foreground font-mono">Focused</span>
              <Toggle
                defaultPressed={false}
                aria-label="Focus"
                className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)]"
              >
                <HaloIcon icon={PinIcon} size={15} />
              </Toggle>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/50 border border-border/30 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-muted-foreground font-mono">Disabled</span>
              <Toggle defaultPressed={false} disabled aria-label="Disabled">
                <HaloIcon icon={PinIcon} size={15} />
              </Toggle>
            </div>
          </div>
        </div>

        {/* Pressed Group */}
        <div className="rounded-xl border border-border/50 bg-muted/15 p-4 space-y-3">
          <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
            Pressed States
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/50 border border-border/30">
              <span className="text-[10px] text-muted-foreground font-mono">Pressed Rest</span>
              <Toggle defaultPressed={true} aria-label="Pressed Rest">
                <HaloIcon icon={PinIcon} size={15} />
              </Toggle>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/50 border border-border/30">
              <span className="text-[10px] text-muted-foreground font-mono">Pressed + Focus</span>
              <Toggle
                defaultPressed={true}
                aria-label="Pressed Focus"
                className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)]"
              >
                <HaloIcon icon={PinIcon} size={15} />
              </Toggle>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/50 border border-border/30 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-muted-foreground font-mono">Pressed + Disabled</span>
              <Toggle defaultPressed={true} disabled aria-label="Pressed Disabled">
                <HaloIcon icon={PinIcon} size={15} />
              </Toggle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Variants Demonstration: Default (Liquid Glass) vs Outline
 * Shows both unpressed and pressed states for every variant.
 */
export function ToggleVariantsPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* 1. Default (Liquid Glass) */}
      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-border/30 bg-background/40">
        <span className="text-xs font-medium text-foreground">Default (Liquid Glass)</span>
        <div className="flex items-center gap-3">
          <Toggle variant="default" defaultPressed={false}>
            Unpressed
          </Toggle>
          <Toggle variant="default" defaultPressed={true}>
            Pressed
          </Toggle>
        </div>
      </div>

      {/* 2. Outline */}
      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-border/30 bg-background/40">
        <span className="text-xs font-medium text-foreground">Outline</span>
        <div className="flex items-center gap-3">
          <Toggle variant="outline" defaultPressed={false}>
            Unpressed
          </Toggle>
          <Toggle variant="outline" defaultPressed={true}>
            Pressed
          </Toggle>
        </div>
      </div>
    </div>
  );
}

/**
 * Sizes Demonstration: sm (32px), default (40px), lg (48px)
 */
export function ToggleSizesPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* Small (32px) */}
      <div className="flex flex-col items-center gap-2">
        <Toggle size="sm" defaultPressed={true}>
          <HaloIcon icon={Bookmark01Icon} size={14} />
          <span>Small</span>
        </Toggle>
        <span className="text-[11px] font-mono text-muted-foreground">size="sm" (32px)</span>
      </div>

      {/* Default (40px) */}
      <div className="flex flex-col items-center gap-2">
        <Toggle size="default" defaultPressed={true}>
          <HaloIcon icon={Bookmark01Icon} size={16} />
          <span>Default</span>
        </Toggle>
        <span className="text-[11px] font-mono text-muted-foreground">size="default" (40px)</span>
      </div>

      {/* Large (48px) */}
      <div className="flex flex-col items-center gap-2">
        <Toggle size="lg" defaultPressed={true}>
          <HaloIcon icon={Bookmark01Icon} size={18} />
          <span>Large</span>
        </Toggle>
        <span className="text-[11px] font-mono text-muted-foreground">size="lg" (48px)</span>
      </div>
    </div>
  );
}

/**
 * Content Composition Demonstration: Text-only, Icon-only, Icon + Text
 */
export function ToggleContentPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* Text Only */}
      <div className="flex flex-col items-center gap-2">
        <Toggle defaultPressed={true}>
          Underline
        </Toggle>
        <span className="text-[11px] font-mono text-muted-foreground">Text Only</span>
      </div>

      {/* Icon Only */}
      <div className="flex flex-col items-center gap-2">
        <Toggle defaultPressed={true} aria-label="Pin item">
          <HaloIcon icon={PinIcon} size={16} />
        </Toggle>
        <span className="text-[11px] font-mono text-muted-foreground">Icon Only (aria-label)</span>
      </div>

      {/* Icon + Text */}
      <div className="flex flex-col items-center gap-2">
        <Toggle defaultPressed={true}>
          <HaloIcon icon={StarIcon} size={16} />
          <span>Favorite</span>
        </Toggle>
        <span className="text-[11px] font-mono text-muted-foreground">Icon + Text</span>
      </div>
    </div>
  );
}

/**
 * Controlled State Demonstration:
 * Demonstrates external state driving Toggle and responding to user toggles.
 */
export function ToggleControlledPreview() {
  const [muted, setMuted] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      <div className="flex items-center gap-3">
        <Toggle
          pressed={muted}
          onPressedChange={setMuted}
          aria-label={muted ? "Unmute audio" : "Mute audio"}
        >
          <HaloIcon icon={muted ? VolumeMute01Icon : VolumeHighIcon} size={16} />
          <span>{muted ? "Muted" : "Mute audio"}</span>
        </Toggle>

        <button
          type="button"
          onClick={() => setMuted(!muted)}
          className="text-xs text-primary underline underline-offset-4 hover:opacity-80"
        >
          Toggle externally: {muted ? "Unmute" : "Mute"}
        </button>
      </div>

      <div className="text-xs font-mono text-muted-foreground">
        Controlled React State: <code>pressed = &#123;{String(muted)}&#125;</code>
      </div>
    </div>
  );
}

/**
 * Real Keyboard Interactive Demo:
 * Allows direct testing of Space and Enter keyboard activation with real-time feedback.
 */
export function ToggleKeyboardPreview() {
  const [eventLog, setEventLog] = React.useState<string[]>([]);
  const [pressed, setPressed] = React.useState(false);

  const handleToggle = (next: boolean) => {
    setPressed(next);
    setEventLog((prev) => [
      `State changed to: ${next ? "PRESSED (aria-pressed=true)" : "UNPRESSED (aria-pressed=false)"}`,
      ...prev,
    ].slice(0, 5));
  };

  return (
    <div className="flex flex-col items-center gap-5 p-6 rounded-2xl border border-border/40 bg-muted/10 w-full">
      <Toggle
        pressed={pressed}
        onPressedChange={handleToggle}
        aria-label="Keyboard pin toggle"
      >
        <HaloIcon icon={PinIcon} size={16} />
        <span>{pressed ? "Pinned" : "Pin item"}</span>
      </Toggle>

      {/* Event Monitor */}
      <div className="w-full max-w-lg rounded-xl border border-border/60 bg-muted/30 p-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground border-b border-border/40 pb-1.5 mb-2">
          <span>Keyboard Event Monitor</span>
          <button
            type="button"
            onClick={() => setEventLog([])}
            className="hover:text-foreground text-[10px]"
          >
            Clear log
          </button>
        </div>
        {eventLog.length === 0 ? (
          <div className="text-xs text-muted-foreground/60 italic py-1 text-center">
            Press Tab to focus the Toggle, then press Space or Enter to toggle persistent state.
          </div>
        ) : (
          <div className="space-y-1">
            {eventLog.map((log, i) => (
              <div
                key={i}
                className="text-xs font-mono text-foreground/90 flex items-center gap-2"
              >
                <span className="text-[10px] text-muted-foreground">[{i + 1}]</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
