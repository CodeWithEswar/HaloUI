"use client";

import * as React from "react";
import {
  UndoIcon,
  RedoIcon,
  ReloadIcon,
  Download01Icon,
  MoreHorizontalIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

/**
 * 1. Orientation Comparison Demonstration
 * Shows identical actions in Horizontal and Vertical orientations with signature HaloUI Liquid Glass
 */
export function ButtonGroupOrientationPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#f8f9fb] dark:bg-[#111215] bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] p-4 sm:p-6">
      <div className="relative z-10 flex flex-wrap items-center justify-around gap-8 py-4">
        {/* Horizontal */}
        <div className="flex flex-col items-center gap-3">
          <ButtonGroup orientation="horizontal">
            <Button variant="default" size="sm">Day</Button>
            <Button variant="default" size="sm">Week</Button>
            <Button variant="default" size="sm">Month</Button>
            <Button variant="default" size="sm">Year</Button>
          </ButtonGroup>
          <span className="font-mono text-[11px] text-muted-foreground">orientation="horizontal"</span>
        </div>

        {/* Vertical */}
        <div className="flex flex-col items-center gap-3">
          <ButtonGroup orientation="vertical">
            <Button variant="default" size="sm">Day</Button>
            <Button variant="default" size="sm">Week</Button>
            <Button variant="default" size="sm">Month</Button>
            <Button variant="default" size="sm">Year</Button>
          </ButtonGroup>
          <span className="font-mono text-[11px] text-muted-foreground">orientation="vertical"</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Text Buttons Demonstration
 * Shows grouped text actions across Liquid Glass and Secondary translucent crystal
 */
export function ButtonGroupTextPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#f8f9fb] dark:bg-[#111215] bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-6 py-2">
        <div className="flex flex-col items-center gap-2">
          <ButtonGroup>
            <Button variant="default">
              <HaloIcon icon={ArrowLeft01Icon} size={16} />
              Previous
            </Button>
            <Button variant="default">
              Next
              <HaloIcon icon={ArrowRight01Icon} size={16} />
            </Button>
          </ButtonGroup>
          <span className="font-mono text-[11px] text-muted-foreground">Pagination cluster (liquid glass)</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ButtonGroup>
            <Button variant="secondary">Accept</Button>
            <Button variant="secondary">Review</Button>
            <Button variant="secondary">Decline</Button>
          </ButtonGroup>
          <span className="font-mono text-[11px] text-muted-foreground">Workflow triage (secondary glass)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Icon Buttons Demonstration
 * Shows compact grouped icon actions with mandatory accessible names
 */
export function ButtonGroupIconPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#f8f9fb] dark:bg-[#111215] bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] p-4 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-6 py-3">
        <div className="flex flex-col items-center gap-2">
          <ButtonGroup>
            <IconButton variant="default" aria-label="Undo last action">
              <HaloIcon icon={UndoIcon} size={18} />
            </IconButton>
            <IconButton variant="default" aria-label="Redo last action">
              <HaloIcon icon={RedoIcon} size={18} />
            </IconButton>
            <IconButton variant="default" aria-label="Refresh workspace">
              <HaloIcon icon={ReloadIcon} size={18} />
            </IconButton>
          </ButtonGroup>
          <span className="font-mono text-[11px] text-muted-foreground">Document history cluster (liquid glass)</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ButtonGroup>
            <IconButton variant="secondary" aria-label="Step backward">
              <HaloIcon icon={ArrowLeft01Icon} size={18} />
            </IconButton>
            <IconButton variant="secondary" aria-label="Step forward">
              <HaloIcon icon={ArrowRight01Icon} size={18} />
            </IconButton>
          </ButtonGroup>
          <span className="font-mono text-[11px] text-muted-foreground">Navigation step cluster (secondary glass)</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Note: If icon controls represent persistent selection states (e.g. text alignment), use a Toggle Group instead of Button Group.
      </p>
    </div>
  );
}

/**
 * 4. Mixed Action Demonstration (Text + Icon)
 * Shows split-style action composition where a primary button connects with an options icon button
 */
export function ButtonGroupMixedPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#f8f9fb] dark:bg-[#111215] bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-center gap-6 py-4">
        {/* Default Liquid Glass Split Action */}
        <ButtonGroup>
          <Button variant="default">
            Publish document
          </Button>
          <IconButton variant="default" aria-label="Publishing schedule options">
            <HaloIcon icon={MoreHorizontalIcon} size={16} />
          </IconButton>
        </ButtonGroup>

        {/* Secondary Glass Split Action */}
        <ButtonGroup>
          <Button variant="secondary">
            <HaloIcon icon={Download01Icon} size={16} />
            Download report
          </Button>
          <IconButton variant="secondary" aria-label="Select download formats">
            <HaloIcon icon={MoreHorizontalIcon} size={16} />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
}

/**
 * 5. Disabled Child Demonstration
 * Proves that individual children remain independently disabled without disabling the entire group
 */
export function ButtonGroupDisabledPreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#f8f9fb] dark:bg-[#111215] bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] p-4 sm:p-6">
      <div className="flex flex-col items-center justify-center gap-3 py-3">
        <ButtonGroup>
          <IconButton variant="default" disabled aria-label="Undo (no history available)">
            <HaloIcon icon={UndoIcon} size={18} />
          </IconButton>
          <IconButton variant="default" aria-label="Redo action">
            <HaloIcon icon={RedoIcon} size={18} />
          </IconButton>
          <IconButton variant="default" aria-label="Refresh workspace">
            <HaloIcon icon={ReloadIcon} size={18} />
          </IconButton>
        </ButtonGroup>

        <span className="font-mono text-[11px] text-muted-foreground">
          First child disabled (<code className="text-foreground">disabled</code>), remaining two active
        </span>
      </div>
    </div>
  );
}

/**
 * 6. Focus Ring Stress Test
 * Specifically tests that first, middle, and last controls have fully unclipped, layered focus rings
 * with signature HaloUI Liquid Glass
 */
export function ButtonGroupFocusStressPreview() {
  const [stressVariant, setStressVariant] = React.useState<"default" | "outline" | "secondary">("default");

  return (
    <div className="rounded-xl border border-border bg-[#f8f9fb] dark:bg-[#111215] bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] p-4 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-foreground">Middle-Child Focus Stress Test</h4>
          <p className="text-xs text-muted-foreground">
            In connected button groups, middle buttons frequently suffer from focus rings being clipped by adjacent sibling elements.
            HaloUI solves this through local z-index stacking contexts (<code className="text-foreground font-mono text-[11px]">focus-visible:z-20</code>) and zero overflow clipping.
          </p>
        </div>

        {/* Variant selector for live stress test */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-background/80 p-1 backdrop-blur-xs">
          {(["default", "secondary", "outline"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setStressVariant(v)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                stressVariant === v
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v === "default" ? "Liquid Glass" : v === "secondary" ? "Secondary" : "Outline"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 py-6">
        {/* 3-Button cluster for live testing */}
        <ButtonGroup>
          <Button variant={stressVariant}>
            1. First
          </Button>
          <Button variant={stressVariant}>
            2. Middle (Focus Stress)
          </Button>
          <Button variant={stressVariant}>
            3. Last
          </Button>
        </ButtonGroup>
      </div>

      <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 p-3 text-xs text-muted-foreground space-y-1">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <HaloIcon icon={CheckmarkCircle02Icon} size={14} className="text-sky-500" />
          <span>Interactive Verification Instruction</span>
        </div>
        <p>
          Press <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">Tab</kbd> to focus through the buttons above.
          Notice that when <strong>2. Middle</strong> receives focus, its complete dual-contrast focus perimeter floats completely on top of both adjacent button boundaries with zero visual clipping.
        </p>
      </div>
    </div>
  );
}

/**
 * 7. Real Keyboard Interaction Playground
 */
export function ButtonGroupKeyboardPreview() {
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
    <div className="rounded-xl border border-border bg-[#f8f9fb] dark:bg-[#111215] bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] p-4 sm:p-6 space-y-5">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Sequential Tab Order Verification</h4>
        <p className="text-xs text-muted-foreground">
          Button Group preserves standard native tab order. Use <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Tab</kbd> and <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Shift+Tab</kbd> to move between actions. Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Enter</kbd> or <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Space</kbd> to activate.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 py-4">
        <ButtonGroup>
          <Button
            variant="default"
            onClick={(e) => trigger("Step 1 (Start)", e)}
          >
            Step 1
          </Button>

          <Button
            variant="default"
            onClick={(e) => trigger("Step 2 (Middle)", e)}
          >
            Step 2
          </Button>

          <Button
            variant="default"
            onClick={(e) => trigger("Step 3 (End)", e)}
          >
            Step 3
          </Button>
        </ButtonGroup>
      </div>

      {/* Real-time telemetry */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border/80 bg-background/80 px-3.5 py-2.5 text-xs text-muted-foreground font-mono backdrop-blur-xs">
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

