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
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import type { ToggleVariant, ToggleSize } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const CONTAINER_WIDTH_OPTIONS = [
  { value: "full", label: "Full Container (100%)" },
  { value: "1024", label: "Desktop (1024px)" },
  { value: "768", label: "Tablet (768px)" },
  { value: "640", label: "Phablet (640px)" },
  { value: "480", label: "Mobile Wide (480px)" },
  { value: "390", label: "iPhone 15 Pro (390px)" },
  { value: "320", label: "Small Device (320px)" },
  { value: "280", label: "Compact Rail (280px)" },
  { value: "240", label: "Strict QA Min (240px)" },
];

export function ToggleGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // ToggleGroup Configuration Controls
  const [spacing, setSpacing] = React.useState<ToggleGroupSpacing>("connected");
  const [orientation, setOrientation] = React.useState<ToggleGroupOrientation>("horizontal");
  const [variant, setVariant] = React.useState<ToggleVariant>("default");
  const [size, setSize] = React.useState<ToggleSize>("default");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [disabled, setDisabled] = React.useState(false);
  const [hasLongLabels, setHasLongLabels] = React.useState(false);

  // Selection states for both real side-by-side examples
  const [singleValue, setSingleValue] = React.useState<string>("center");
  const [multiValue, setMultiValue] = React.useState<string[]>(["bold", "italic"]);
  const [copied, setCopied] = React.useState(false);

  const getContainerMaxWidthClass = (width: string) => {
    switch (width) {
      case "1024":
        return "max-w-[1024px]";
      case "768":
        return "max-w-[768px]";
      case "640":
        return "max-w-[640px]";
      case "480":
        return "max-w-[480px]";
      case "390":
        return "max-w-[390px]";
      case "320":
        return "max-w-[320px]";
      case "280":
        return "max-w-[280px]";
      case "240":
        return "max-w-[240px]";
      default:
        return "max-w-4xl";
    }
  };

  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  const generatedCode = React.useMemo(() => {
    const spacingProp = spacing === "separated" ? ' spacing="separated"' : "";
    const orientProp = orientation === "vertical" ? ' orientation="vertical"' : "";
    const variantProp = variant !== "default" ? ` variant="${variant}"` : "";
    const sizeProp = size !== "default" ? ` size="${size}"` : "";
    const disabledProp = disabled ? " disabled" : "";

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
        onValueChange={setAlign}${spacingProp}${orientProp}${variantProp}${sizeProp}${disabledProp}
        aria-label="Text alignment"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <HaloIcon icon={TextAlignLeftIcon} size={${iconSize}} />${hasLongLabels ? '\n          <span className="ms-1.5 text-xs">Align Left</span>' : ""}
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <HaloIcon icon={TextAlignCenterIcon} size={${iconSize}} />${hasLongLabels ? '\n          <span className="ms-1.5 text-xs">Center</span>' : ""}
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <HaloIcon icon={TextAlignRightIcon} size={${iconSize}} />${hasLongLabels ? '\n          <span className="ms-1.5 text-xs">Align Right</span>' : ""}
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align justify">
          <HaloIcon icon={TextAlignJustifyIcon} size={${iconSize}} />${hasLongLabels ? '\n          <span className="ms-1.5 text-xs">Justify</span>' : ""}
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Multiple Selection */}
      <ToggleGroup
        type="multiple"
        value={format}
        onValueChange={setFormat}${spacingProp}${orientProp}${variantProp}${sizeProp}${disabledProp}
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <HaloIcon icon={TextBoldIcon} size={${iconSize}} />${hasLongLabels ? '\n          <span className="ms-1.5 text-xs">Bold</span>' : ""}
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <HaloIcon icon={TextItalicIcon} size={${iconSize}} />${hasLongLabels ? '\n          <span className="ms-1.5 text-xs">Italic</span>' : ""}
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <HaloIcon icon={TextUnderlineIcon} size={${iconSize}} />${hasLongLabels ? '\n          <span className="ms-1.5 text-xs">Underline</span>' : ""}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`;
  }, [singleValue, multiValue, spacing, orientation, variant, size, disabled, hasLongLabels, iconSize]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setSpacing("connected");
    setOrientation("horizontal");
    setVariant("default");
    setSize("default");
    setContainerWidth("full");
    setDisabled(false);
    setHasLongLabels(false);
    setSingleValue("center");
    setMultiValue(["bold", "italic"]);
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Geometry",
      value: spacing === "connected" ? "CONNECTED (-ms-px)" : "SEPARATED (gap)",
      variant: spacing === "connected" ? "success" : "default",
    },
    {
      label: "Orientation",
      value: orientation === "horizontal" ? "HORIZONTAL" : "VERTICAL",
      variant: "default",
    },
    {
      label: "Focus Ring",
      value: "ROVING (z-20 unclipped)",
      variant: "success",
    },
    {
      label: "Layering",
      value: "PRESSED z-[5] · REST z-0",
      variant: "success",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
  ];

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect connected optical seams (-ms-px), roving tabindex arrow navigation, elevated focus ring layering (z-20), and 240px container reflow."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={resetStage}
      onCopy={copyCode}
      copied={copied}
      code={generatedCode}
      telemetry={telemetry}
      controls={
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <StageControlSelect
              label="Geometry"
              value={spacing}
              onChange={(val) => setSpacing(val as ToggleGroupSpacing)}
              options={[
                { label: "Connected (1px Seam)", value: "connected" },
                { label: "Separated (Discrete Gaps)", value: "separated" },
              ]}
            />

            <StageControlSelect
              label="Orientation"
              value={orientation}
              onChange={(val) => setOrientation(val as ToggleGroupOrientation)}
              options={[
                { label: "Horizontal", value: "horizontal" },
                { label: "Vertical", value: "vertical" },
              ]}
            />

            <StageControlSelect
              label="Variant"
              value={variant}
              onChange={(val) => setVariant(val as ToggleVariant)}
              options={[
                { label: "Default (Liquid Glass)", value: "default" },
                { label: "Outline (Hairline)", value: "outline" },
              ]}
            />

            <StageControlSelect
              label="Size"
              value={size}
              onChange={(val) => setSize(val as ToggleSize)}
              options={[
                { label: "SM (32px)", value: "sm" },
                { label: "Default (40px)", value: "default" },
                { label: "LG (48px)", value: "lg" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />

            <div className="md:col-span-3 flex flex-wrap items-center gap-2 pt-2 md:pt-4 border-t md:border-t-0 border-border/40">
              <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
              <button
                type="button"
                onClick={() => setHasLongLabels(!hasLongLabels)}
                className={cn(
                  "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                  hasLongLabels
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
                )}
              >
                {hasLongLabels ? "✓ Long Labels (240px QA)" : "Long Labels"}
              </button>

              <button
                type="button"
                onClick={() => setDisabled(!disabled)}
                className={cn(
                  "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                  disabled
                    ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
                )}
              >
                {disabled ? "✓ Disabled" : "Disabled"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSpacing(spacing === "connected" ? "separated" : "connected");
                }}
                className="h-7 px-2.5 rounded-md text-xs font-medium border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60 transition-colors cursor-pointer select-none"
              >
                Toggle Spacing
              </button>
            </div>
          </div>
        </div>
      }
    >
      <div
        className={cn(
          "w-full mx-auto transition-all duration-300 ease-out flex flex-col items-center justify-center gap-8 py-6 sm:py-10",
          getContainerMaxWidthClass(containerWidth)
        )}
      >
        {/* Two Real Examples Side-by-Side / Stacked: Alignment (Single) & Formatting (Multiple) */}
        <div
          className={cn(
            "grid gap-6 w-full",
            containerWidth === "240" || containerWidth === "280" || containerWidth === "320"
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2"
          )}
        >
          {/* Column 1: Single Selection (Alignment) */}
          <div className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-sm gap-4 min-w-0 max-w-full">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Alignment
              </h3>
              <p className="text-xs text-muted-foreground">
                Single selection (one-of-many)
              </p>
            </div>

            <div className="max-w-full overflow-x-auto py-1 px-1">
              <ToggleGroup
                type="single"
                value={singleValue}
                onValueChange={setSingleValue}
                spacing={spacing}
                orientation={orientation}
                variant={variant}
                size={size}
                disabled={disabled}
                aria-label="Text alignment options"
              >
                <ToggleGroupItem value="left" aria-label="Align left">
                  <HaloIcon icon={TextAlignLeftIcon} size={iconSize} />
                  {(hasLongLabels || orientation === "vertical") && (
                    <span className="text-xs ms-1.5 font-normal">Left</span>
                  )}
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <HaloIcon icon={TextAlignCenterIcon} size={iconSize} />
                  {(hasLongLabels || orientation === "vertical") && (
                    <span className="text-xs ms-1.5 font-normal">Center</span>
                  )}
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <HaloIcon icon={TextAlignRightIcon} size={iconSize} />
                  {(hasLongLabels || orientation === "vertical") && (
                    <span className="text-xs ms-1.5 font-normal">Right</span>
                  )}
                </ToggleGroupItem>
                <ToggleGroupItem value="justify" aria-label="Align justify">
                  <HaloIcon icon={TextAlignJustifyIcon} size={iconSize} />
                  {(hasLongLabels || orientation === "vertical") && (
                    <span className="text-xs ms-1.5 font-normal">Justify</span>
                  )}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="text-xs font-mono text-muted-foreground text-center">
              Selected: <strong className="text-foreground font-semibold capitalize">{singleValue || "none"}</strong>
            </div>
          </div>

          {/* Column 2: Multiple Selection (Formatting) */}
          <div className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-sm gap-4 min-w-0 max-w-full">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Formatting
              </h3>
              <p className="text-xs text-muted-foreground">
                Multiple selection (independent)
              </p>
            </div>

            <div className="max-w-full overflow-x-auto py-1 px-1">
              <ToggleGroup
                type="multiple"
                value={multiValue}
                onValueChange={setMultiValue}
                spacing={spacing}
                orientation={orientation}
                variant={variant}
                size={size}
                disabled={disabled}
                aria-label="Text formatting options"
              >
                <ToggleGroupItem value="bold" aria-label="Toggle bold formatting">
                  <HaloIcon icon={TextBoldIcon} size={iconSize} />
                  {(hasLongLabels || orientation === "vertical") && (
                    <span className="text-xs ms-1.5 font-normal">Bold</span>
                  )}
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic formatting">
                  <HaloIcon icon={TextItalicIcon} size={iconSize} />
                  {(hasLongLabels || orientation === "vertical") && (
                    <span className="text-xs ms-1.5 font-normal">Italic</span>
                  )}
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline formatting">
                  <HaloIcon icon={TextUnderlineIcon} size={iconSize} />
                  {(hasLongLabels || orientation === "vertical") && (
                    <span className="text-xs ms-1.5 font-normal">Underline</span>
                  )}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="text-xs font-mono text-muted-foreground text-center">
              Selected: <strong className="text-foreground font-semibold">{multiValue.length > 0 ? multiValue.join(", ") : "none"}</strong>
            </div>
          </div>
        </div>

        {/* Live Optical Telemetry Chips: Responsive separate badges */}
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
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Container:</span>
            <strong className={cn(containerWidth === "240" ? "text-amber-500" : "text-foreground")}>
              {containerWidth === "full" ? "Fluid (100%)" : `${containerWidth}px`}
            </strong>
          </span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
