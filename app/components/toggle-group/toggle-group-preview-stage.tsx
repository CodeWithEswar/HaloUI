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
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupOrientation,
  type ToggleGroupSpacing,
} from "@/components/ui/toggle-group";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import type { ToggleVariant, ToggleSize } from "@/components/ui/toggle";

export function ToggleGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // ToggleGroup Configuration Controls
  const [spacing, setSpacing] = React.useState<ToggleGroupSpacing>("connected");
  const [orientation, setOrientation] = React.useState<ToggleGroupOrientation>("horizontal");
  const [variant, setVariant] = React.useState<ToggleVariant>("default");
  const [size, setSize] = React.useState<ToggleSize>("default");

  // Selection states for both real side-by-side examples
  const [singleValue, setSingleValue] = React.useState<string>("center");
  const [multiValue, setMultiValue] = React.useState<string[]>(["bold", "italic"]);
  const [copied, setCopied] = React.useState(false);

  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  const generatedCode = React.useMemo(() => {
    const spacingProp = spacing === "separated" ? ' spacing="separated"' : "";
    const orientProp = orientation === "vertical" ? ' orientation="vertical"' : "";
    const variantProp = variant !== "default" ? ` variant="${variant}"` : "";
    const sizeProp = size !== "default" ? ` size="${size}"` : "";

    return `import * as React from "react";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupWorkbench() {
  // Single selection: Alignment
  const [align, setAlign] = React.useState("${singleValue}");
  // Multiple selection: Formatting
  const [format, setFormat] = React.useState<string[]>(${JSON.stringify(multiValue)});

  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Single Selection */}
      <ToggleGroup
        type="single"
        value={align}
        onValueChange={setAlign}${spacingProp}${orientProp}${variantProp}${sizeProp}
        aria-label="Text alignment"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <HaloIcon icon={TextAlignLeftIcon} size={${iconSize}} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <HaloIcon icon={TextAlignCenterIcon} size={${iconSize}} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <HaloIcon icon={TextAlignRightIcon} size={${iconSize}} />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align justify">
          <HaloIcon icon={TextAlignJustifyIcon} size={${iconSize}} />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Multiple Selection */}
      <ToggleGroup
        type="multiple"
        value={format}
        onValueChange={setFormat}${spacingProp}${orientProp}${variantProp}${sizeProp}
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <HaloIcon icon={TextBoldIcon} size={${iconSize}} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <HaloIcon icon={TextItalicIcon} size={${iconSize}} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <HaloIcon icon={TextUnderlineIcon} size={${iconSize}} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`;
  }, [singleValue, multiValue, spacing, orientation, variant, size, iconSize]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onCopy={copyCode}
      copied={copied}
      code={generatedCode}
      telemetry={[
        { label: "Geometry", value: spacing === "connected" ? "Connected" : "Separated" },
        { label: "Variant", value: variant === "default" ? "Default" : "Outline" },
        { label: "Focus", value: "Roving Tabindex", variant: "success" },
        { label: "Layering", value: "Pressed z-[5] · Focus z-20", variant: "success" },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Geometry"
            value={spacing}
            onValueChange={(val) => setSpacing(val as ToggleGroupSpacing)}
            options={[
              { label: "Connected", value: "connected" },
              { label: "Separated", value: "separated" },
            ]}
          />

          <StageControlSelect
            label="Orientation"
            value={orientation}
            onValueChange={(val) => setOrientation(val as ToggleGroupOrientation)}
            options={[
              { label: "Horizontal", value: "horizontal" },
              { label: "Vertical", value: "vertical" },
            ]}
          />

          <StageControlSelect
            label="Variant"
            value={variant}
            onValueChange={(val) => setVariant(val as ToggleVariant)}
            options={[
              { label: "Default", value: "default" },
              { label: "Outline", value: "outline" },
            ]}
          />

          <StageControlSelect
            label="Size"
            value={size}
            onValueChange={(val) => setSize(val as ToggleSize)}
            options={[
              { label: "SM (32px)", value: "sm" },
              { label: "Default (40px)", value: "default" },
              { label: "LG (48px)", value: "lg" },
            ]}
          />
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 py-6 sm:py-10 w-full max-w-4xl mx-auto">
        {/* Two Real Examples Side-by-Side: Alignment (Single) & Formatting (Multiple) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Column 1: Single Selection (Alignment) */}
          <div className="flex flex-col items-center justify-between p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-sm gap-4">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Alignment
              </h3>
              <p className="text-xs text-muted-foreground">
                Single selection (one-of-many / optional empty)
              </p>
            </div>

            <ToggleGroup
              type="single"
              value={singleValue}
              onValueChange={setSingleValue}
              spacing={spacing}
              orientation={orientation}
              variant={variant}
              size={size}
              aria-label="Text alignment options"
            >
              <ToggleGroupItem value="left" aria-label="Align left">
                <HaloIcon icon={TextAlignLeftIcon} size={iconSize} />
                {orientation === "vertical" && <span className="text-xs ms-1.5 font-normal">Left</span>}
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <HaloIcon icon={TextAlignCenterIcon} size={iconSize} />
                {orientation === "vertical" && <span className="text-xs ms-1.5 font-normal">Center</span>}
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <HaloIcon icon={TextAlignRightIcon} size={iconSize} />
                {orientation === "vertical" && <span className="text-xs ms-1.5 font-normal">Right</span>}
              </ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Align justify">
                <HaloIcon icon={TextAlignJustifyIcon} size={iconSize} />
                {orientation === "vertical" && <span className="text-xs ms-1.5 font-normal">Justify</span>}
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="text-xs font-mono text-muted-foreground text-center">
              Selected: <strong className="text-foreground font-semibold capitalize">{singleValue || "none (empty)"}</strong>
            </div>
          </div>

          {/* Column 2: Multiple Selection (Formatting) */}
          <div className="flex flex-col items-center justify-between p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-sm gap-4">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Formatting
              </h3>
              <p className="text-xs text-muted-foreground">
                Multiple selection (independent concurrent states)
              </p>
            </div>

            <ToggleGroup
              type="multiple"
              value={multiValue}
              onValueChange={setMultiValue}
              spacing={spacing}
              orientation={orientation}
              variant={variant}
              size={size}
              aria-label="Text formatting options"
            >
              <ToggleGroupItem value="bold" aria-label="Toggle bold formatting">
                <HaloIcon icon={TextBoldIcon} size={iconSize} />
                {orientation === "vertical" && <span className="text-xs ms-1.5 font-normal">Bold</span>}
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic formatting">
                <HaloIcon icon={TextItalicIcon} size={iconSize} />
                {orientation === "vertical" && <span className="text-xs ms-1.5 font-normal">Italic</span>}
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline formatting">
                <HaloIcon icon={TextUnderlineIcon} size={iconSize} />
                {orientation === "vertical" && <span className="text-xs ms-1.5 font-normal">Underline</span>}
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="text-xs font-mono text-muted-foreground text-center">
              Selected: <strong className="text-foreground font-semibold">{multiValue.length > 0 ? multiValue.join(", ") : "none"}</strong>
            </div>
          </div>
        </div>

        {/* Live Optical Telemetry Chips: Responsive separate badges, never a deformed oval */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full text-[11px] font-mono text-muted-foreground text-center px-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Geometry:</span>
            <strong className="text-foreground capitalize">{spacing}</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Variant:</span>
            <strong className="text-foreground capitalize">{variant}</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Focus:</span>
            <strong className="text-sky-500 dark:text-sky-400">Roving Tabindex</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Layering:</span>
            <strong className="text-emerald-500 dark:text-emerald-400">Pressed z-[5] · Focus z-20</strong>
          </span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
