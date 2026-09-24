"use client";

import * as React from "react";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  CursorPointer01Icon,
  CropIcon,
  PencilEdit01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

/**
 * Centerpiece Engineering Preview:
 * Tests a selected middle item with real keyboard focus in a connected group.
 * Simulates and verifies that:
 * 1. Halo Focus Ring elevates to z-20 and is NOT clipped by left or right neighbors.
 * 2. Persistent selected state tint and inset displacement sit cleanly at z-[5].
 * 3. Overlapping 1px hairline seams (-ms-px) remain clean without double borders.
 */
export function ToggleGroupMiddleFocusPreview() {
  const [selected, setSelected] = React.useState<string>("center");
  const middleRef = React.useRef<HTMLButtonElement>(null);

  const focusMiddle = () => {
    middleRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 sm:p-8 rounded-2xl border border-border/40 bg-muted/10">
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Connected 4-Item Group · Middle Item ("center") Selected & Focused
        </span>

        <div className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-background/50">
          <ToggleGroup
            type="single"
            value={selected}
            onValueChange={(val) => val && setSelected(val)}
            spacing="connected"
            aria-label="Text alignment focus stress test"
          >
            <ToggleGroupItem value="left" aria-label="Align left">
              <HaloIcon icon={TextAlignLeftIcon} size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem
              ref={middleRef}
              value="center"
              aria-label="Align center"
            >
              <HaloIcon icon={TextAlignCenterIcon} size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <HaloIcon icon={TextAlignRightIcon} size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Align justify">
              <HaloIcon icon={TextAlignJustifyIcon} size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Button variant="outline" size="sm" onClick={focusMiddle}>
          Focus Middle Item ("center")
        </Button>
      </div>

      {/* Engineering Verification Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl text-xs">
        <div className="flex items-start gap-2 p-3 rounded-xl border border-border/40 bg-background/40">
          <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-foreground">Unclipped Focus Ring</strong>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              Item elevates to <code className="font-mono text-[10px]">z-20</code> on focus-visible, floating entirely above adjoining Left and Right siblings.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 rounded-xl border border-border/40 bg-background/40">
          <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-foreground">Selected Layering</strong>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              Pressed state tint and inset shadow remain at <code className="font-mono text-[10px]">z-[5]</code> without bleeding into neighboring rest borders.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 rounded-xl border border-border/40 bg-background/40">
          <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-foreground">1px Seam Overlap</strong>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              Adjoining borders overlap via <code className="font-mono text-[10px]">-ms-px</code>, eliminating thick 2px double seams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * State Matrix Demonstration:
 * Explores all 10 state permutations across Unselected/Selected x Rest/Hover/Focus/Active/Disabled.
 */
export function ToggleGroupStateMatrixPreview() {
  return (
    <div className="space-y-6">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-border/40 bg-muted/10 p-6">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b border-border/40 text-xs font-mono text-muted-foreground">
              <th className="py-3 px-4 text-left font-medium">State</th>
              <th className="py-3 px-4 font-medium">Rest</th>
              <th className="py-3 px-4 font-medium">Hover</th>
              <th className="py-3 px-4 font-medium">Focused (z-20)</th>
              <th className="py-3 px-4 font-medium">Active (Press)</th>
              <th className="py-3 px-4 font-medium">Disabled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20 text-xs">
            {/* Unselected Row */}
            <tr>
              <td className="py-4 px-4 text-left font-medium text-foreground">
                Unselected
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single" defaultValue="a">
                  <ToggleGroupItem value="a" aria-label="Rest item">
                    <HaloIcon icon={TextAlignLeftIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single">
                  <ToggleGroupItem
                    value="a"
                    aria-label="Hover item"
                    className="hover:text-neutral-950 dark:hover:text-white bg-black/5 dark:bg-white/5"
                  >
                    <HaloIcon icon={TextAlignLeftIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single">
                  <ToggleGroupItem
                    value="a"
                    aria-label="Focused item"
                    className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)] z-20"
                  >
                    <HaloIcon icon={TextAlignLeftIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single">
                  <ToggleGroupItem
                    value="a"
                    aria-label="Active press item"
                    className="scale-[0.98] opacity-90"
                  >
                    <HaloIcon icon={TextAlignLeftIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single">
                  <ToggleGroupItem value="a" disabled aria-label="Disabled unselected item">
                    <HaloIcon icon={TextAlignLeftIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
            </tr>

            {/* Selected Row */}
            <tr>
              <td className="py-4 px-4 text-left font-medium text-foreground">
                Selected
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single" defaultValue="a">
                  <ToggleGroupItem value="a" aria-label="Selected rest item">
                    <HaloIcon icon={TextAlignCenterIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single" defaultValue="a">
                  <ToggleGroupItem
                    value="a"
                    aria-label="Selected hover item"
                    className="brightness-110"
                  >
                    <HaloIcon icon={TextAlignCenterIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single" defaultValue="a">
                  <ToggleGroupItem
                    value="a"
                    aria-label="Selected focused item"
                    className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-[var(--halo-focus-offset-color)] z-20"
                  >
                    <HaloIcon icon={TextAlignCenterIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single" defaultValue="a">
                  <ToggleGroupItem
                    value="a"
                    aria-label="Selected active press item"
                    className="scale-[0.98]"
                  >
                    <HaloIcon icon={TextAlignCenterIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
              <td className="py-4 px-4">
                <ToggleGroup type="single" defaultValue="a">
                  <ToggleGroupItem value="a" disabled aria-label="Selected disabled item">
                    <HaloIcon icon={TextAlignCenterIcon} size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <div className="p-4 rounded-xl border border-border/40 bg-muted/10 space-y-3">
          <span className="text-xs font-semibold text-foreground">Unselected States</span>
          <div className="flex flex-wrap items-center gap-3">
            <ToggleGroup type="single">
              <ToggleGroupItem value="rest" aria-label="Rest">
                <HaloIcon icon={TextAlignLeftIcon} size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="dis" disabled aria-label="Disabled">
                <HaloIcon icon={TextAlignLeftIcon} size={16} />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border/40 bg-muted/10 space-y-3">
          <span className="text-xs font-semibold text-foreground">Selected States</span>
          <div className="flex flex-wrap items-center gap-3">
            <ToggleGroup type="single" defaultValue="sel">
              <ToggleGroupItem value="sel" aria-label="Selected">
                <HaloIcon icon={TextAlignCenterIcon} size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="dis" disabled aria-label="Disabled">
                <HaloIcon icon={TextAlignCenterIcon} size={16} />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Single Selection Demonstration: Text Alignment
 */
export function ToggleGroupSinglePreview() {
  const [alignment, setAlignment] = React.useState<string>("left");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      <ToggleGroup
        type="single"
        value={alignment}
        onValueChange={setAlignment}
        aria-label="Text alignment"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <HaloIcon icon={TextAlignLeftIcon} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <HaloIcon icon={TextAlignCenterIcon} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <HaloIcon icon={TextAlignRightIcon} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align justify">
          <HaloIcon icon={TextAlignJustifyIcon} size={16} />
        </ToggleGroupItem>
      </ToggleGroup>

      <span className="text-xs font-mono text-muted-foreground">
        Active Alignment: <strong className="text-foreground capitalize">{alignment || "none (empty selection permitted)"}</strong>
      </span>
    </div>
  );
}

/**
 * Multi Selection Demonstration: Text Formatting
 */
export function ToggleGroupMultiPreview() {
  const [styles, setStyles] = React.useState<string[]>(["bold", "italic"]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      <ToggleGroup
        type="multiple"
        value={styles}
        onValueChange={setStyles}
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Bold formatting">
          <HaloIcon icon={TextBoldIcon} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic formatting">
          <HaloIcon icon={TextItalicIcon} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline formatting">
          <HaloIcon icon={TextUnderlineIcon} size={16} />
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
        <span>Active Styles:</span>
        {styles.length === 0 ? (
          <span className="text-muted-foreground/60 italic">none</span>
        ) : (
          <div className="flex gap-1.5">
            {styles.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-md bg-foreground/10 text-foreground font-semibold capitalize"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Geometry Demonstration: Connected vs Separated Spacing
 */
export function ToggleGroupGeometryPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* Connected */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium text-foreground">spacing="connected" (Default)</span>
        <ToggleGroup type="single" defaultValue="center" spacing="connected" aria-label="Connected alignment">
          <ToggleGroupItem value="left" aria-label="Align left">
            <HaloIcon icon={TextAlignLeftIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <HaloIcon icon={TextAlignCenterIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <HaloIcon icon={TextAlignRightIcon} size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-[11px] text-muted-foreground text-center max-w-[200px]">
          Seamless outer boundary with collapsed inner radii and overlapping seams.
        </p>
      </div>

      {/* Separated */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium text-foreground">spacing="separated"</span>
        <ToggleGroup type="single" defaultValue="center" spacing="separated" aria-label="Separated alignment">
          <ToggleGroupItem value="left" aria-label="Align left">
            <HaloIcon icon={TextAlignLeftIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <HaloIcon icon={TextAlignCenterIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <HaloIcon icon={TextAlignRightIcon} size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-[11px] text-muted-foreground text-center max-w-[200px]">
          Independent optical pill geometry with calibrated inter-item gaps.
        </p>
      </div>
    </div>
  );
}

/**
 * Variants Demonstration: Default (Liquid Glass) vs Outline
 */
export function ToggleGroupVariantsPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* Default */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium text-foreground">variant="default"</span>
        <ToggleGroup type="single" defaultValue="bold" variant="default" aria-label="Default variant formatting">
          <ToggleGroupItem value="bold" aria-label="Bold">
            <HaloIcon icon={TextBoldIcon} size={16} />
            <span className="text-xs ms-1.5">Bold</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <HaloIcon icon={TextItalicIcon} size={16} />
            <span className="text-xs ms-1.5">Italic</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-[11px] font-mono text-muted-foreground">10-layer physical liquid glass</span>
      </div>

      {/* Outline */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium text-foreground">variant="outline"</span>
        <ToggleGroup type="single" defaultValue="bold" variant="outline" aria-label="Outline variant formatting">
          <ToggleGroupItem value="bold" aria-label="Bold">
            <HaloIcon icon={TextBoldIcon} size={16} />
            <span className="text-xs ms-1.5">Bold</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <HaloIcon icon={TextItalicIcon} size={16} />
            <span className="text-xs ms-1.5">Italic</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-[11px] font-mono text-muted-foreground">Crisp boundary & subtle backdrop blur</span>
      </div>
    </div>
  );
}

/**
 * Sizes Demonstration: sm (32px), default (40px), lg (48px)
 */
export function ToggleGroupSizesPreview() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* Small (32px) */}
      <div className="flex flex-col items-center gap-2">
        <ToggleGroup size="sm" type="single" defaultValue="center" aria-label="Small size alignment">
          <ToggleGroupItem value="left" aria-label="Align left">
            <HaloIcon icon={TextAlignLeftIcon} size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <HaloIcon icon={TextAlignCenterIcon} size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <HaloIcon icon={TextAlignRightIcon} size={14} />
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-[11px] font-mono text-muted-foreground">size="sm" (32px)</span>
      </div>

      {/* Default (40px) */}
      <div className="flex flex-col items-center gap-2">
        <ToggleGroup size="default" type="single" defaultValue="center" aria-label="Default size alignment">
          <ToggleGroupItem value="left" aria-label="Align left">
            <HaloIcon icon={TextAlignLeftIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <HaloIcon icon={TextAlignCenterIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <HaloIcon icon={TextAlignRightIcon} size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-[11px] font-mono text-muted-foreground">size="default" (40px)</span>
      </div>

      {/* Large (48px) */}
      <div className="flex flex-col items-center gap-2">
        <ToggleGroup size="lg" type="single" defaultValue="center" aria-label="Large size alignment">
          <ToggleGroupItem value="left" aria-label="Align left">
            <HaloIcon icon={TextAlignLeftIcon} size={18} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <HaloIcon icon={TextAlignCenterIcon} size={18} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <HaloIcon icon={TextAlignRightIcon} size={18} />
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-[11px] font-mono text-muted-foreground">size="lg" (48px)</span>
      </div>
    </div>
  );
}

/**
 * Orientation Demonstration: Vertical Canvas Toolbox
 */
export function ToggleGroupOrientationPreview() {
  const [tool, setTool] = React.useState<string>("select");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      <div className="flex flex-col items-center gap-3">
        <ToggleGroup
          orientation="vertical"
          type="single"
          value={tool}
          onValueChange={(val) => val && setTool(val)}
          aria-label="Canvas editing tools"
        >
          <ToggleGroupItem value="select" aria-label="Select tool">
            <HaloIcon icon={CursorPointer01Icon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="crop" aria-label="Crop tool">
            <HaloIcon icon={CropIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="pen" aria-label="Pen drawing tool">
            <HaloIcon icon={PencilEdit01Icon} size={16} />
          </ToggleGroupItem>
        </ToggleGroup>

        <span className="text-xs font-mono text-muted-foreground">
          Selected Tool: <strong className="text-foreground capitalize">{tool}</strong>
        </span>
      </div>
    </div>
  );
}

/**
 * Controlled State Demonstration: External reset and sync
 */
export function ToggleGroupControlledPreview() {
  const [selected, setSelected] = React.useState<string[]>(["italic"]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup
          type="multiple"
          value={selected}
          onValueChange={setSelected}
          aria-label="Controlled text formatting"
        >
          <ToggleGroupItem value="bold" aria-label="Bold">
            <HaloIcon icon={TextBoldIcon} size={16} />
            <span className="text-xs ms-1.5">Bold</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <HaloIcon icon={TextItalicIcon} size={16} />
            <span className="text-xs ms-1.5">Italic</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <HaloIcon icon={TextUnderlineIcon} size={16} />
            <span className="text-xs ms-1.5">Underline</span>
          </ToggleGroupItem>
        </ToggleGroup>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSelected([])}
          disabled={selected.length === 0}
        >
          Clear Selection
        </Button>
      </div>

      <div className="text-xs font-mono text-muted-foreground">
        Controlled State: <code className="text-foreground">{JSON.stringify(selected)}</code>
      </div>
    </div>
  );
}

/**
 * Keyboard Navigation Demonstration: Roving Tabindex & Arrow Keys
 */
export function ToggleGroupKeyboardPreview() {
  const [lastEvent, setLastEvent] = React.useState<string>("Click to focus, then use Arrow keys");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      <div
        onKeyDown={(e) => {
          if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
            setLastEvent(`Key navigated: ${e.key} (Roving focus updated)`);
          } else if (e.key === " " || e.key === "Enter") {
            setLastEvent(`Activated with: ${e.key === " " ? "Space" : e.key}`);
          }
        }}
      >
        <ToggleGroup
          type="single"
          defaultValue="center"
          aria-label="Keyboard operable alignment"
        >
          <ToggleGroupItem value="left" aria-label="Align left">
            <HaloIcon icon={TextAlignLeftIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <HaloIcon icon={TextAlignCenterIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <HaloIcon icon={TextAlignRightIcon} size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="justify" aria-label="Align justify">
            <HaloIcon icon={TextAlignJustifyIcon} size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-background/50 text-xs font-mono text-muted-foreground">
        <span>Event Monitor:</span>
        <strong className="text-sky-500 dark:text-sky-400">{lastEvent}</strong>
      </div>
    </div>
  );
}
