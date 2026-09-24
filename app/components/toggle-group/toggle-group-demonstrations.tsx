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
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

/**
 * Single Selection Demonstration:
 * Exactly one item active at a time (e.g., text alignment).
 */
export function ToggleGroupSinglePreview() {
  const [alignment, setAlignment] = React.useState<string>("left");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      <ToggleGroup
        type="single"
        value={alignment}
        onValueChange={(val) => val && setAlignment(val)}
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
        Active Alignment: <strong className="text-foreground capitalize">{alignment}</strong>
      </span>
    </div>
  );
}

/**
 * Multi Selection Demonstration:
 * Any combination of items can be active simultaneously (e.g., text formatting).
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
