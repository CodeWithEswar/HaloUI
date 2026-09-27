"use client";

import * as React from "react";
import {
  UndoIcon,
  RedoIcon,
  MoreHorizontalIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  ButtonGroup,
  type ButtonGroupOrientation,
} from "@/components/ui/button-group";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { cn } from "@/lib/utils";

type GroupActionVariant = "default" | "secondary" | "outline" | "ghost";
type GroupActionSize = "sm" | "default" | "lg";

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

export function ButtonGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [orientation, setOrientation] = React.useState<ButtonGroupOrientation>("horizontal");
  const [variant, setVariant] = React.useState<GroupActionVariant>("default");
  const [size, setSize] = React.useState<GroupActionSize>("default");
  const [disabledFirst, setDisabledFirst] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [hasLongLabels, setHasLongLabels] = React.useState(false);
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
        return "max-w-2xl";
    }
  };

  const prevLabel = hasLongLabels ? "Previous Workspace" : "Previous";
  const nextLabel = hasLongLabels ? "Next Workspace" : "Next";

  const generatedCode = React.useMemo(() => {
    const orientProp = orientation === "vertical" ? ' orientation="vertical"' : "";
    const variantProp = variant !== "default" ? ` variant="${variant}"` : "";
    const sizeProp = size !== "default" ? ` size="${size}"` : "";

    return `import { ArrowLeft01Icon, ArrowRight01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Navigation History Group */}
      <ButtonGroup${orientProp}>
        <Button${variantProp}${sizeProp}${disabledFirst ? " disabled" : ""}>
          <HaloIcon icon={ArrowLeft01Icon} size={16} />
          ${prevLabel}
        </Button>
        <Button${variantProp}${sizeProp}>
          Overview
        </Button>
        <Button${variantProp}${sizeProp}>
          ${nextLabel}
          <HaloIcon icon={ArrowRight01Icon} size={16} />
        </Button>
      </ButtonGroup>

      {/* Split-style Action Group */}
      <ButtonGroup${orientProp}>
        <Button${variantProp}${sizeProp}>
          Save changes
        </Button>
        <IconButton${variantProp}${sizeProp} aria-label="More publishing options">
          <HaloIcon icon={MoreHorizontalIcon} size={16} />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}`;
  }, [orientation, variant, size, disabledFirst, prevLabel, nextLabel]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setOrientation("horizontal");
    setVariant("default");
    setSize("default");
    setDisabledFirst(false);
    setContainerWidth("full");
    setHasLongLabels(false);
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Orientation",
      value: orientation.toUpperCase(),
      variant: "default",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Geometry",
      value: "Collapsing Radii (-ms-px)",
      variant: "default",
    },
    {
      label: "Intensity",
      value: "SUBTLE",
      variant: "default",
    },
    {
      label: "Focus Ring",
      value: "z-20 Unclipped",
      variant: "success",
    },
  ];

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect connected geometry, border collapse, and unclipped focus layering across responsive viewports and background environments."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={generatedCode}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={resetStage}
      onCopy={copyCode}
      copied={copied}
      telemetry={telemetry}
      controls={
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <StageControlSelect
              label="Orientation"
              value={orientation}
              onChange={(val) => setOrientation(val as ButtonGroupOrientation)}
              options={[
                { label: "Horizontal", value: "horizontal" },
                { label: "Vertical", value: "vertical" },
              ]}
            />

            <StageControlSelect
              label="Variant"
              value={variant}
              onChange={(val) => setVariant(val as GroupActionVariant)}
              options={[
                { label: "Default (Liquid Glass)", value: "default" },
                { label: "Secondary (Tinted)", value: "secondary" },
                { label: "Outline (Structural)", value: "outline" },
                { label: "Ghost (Minimal)", value: "ghost" },
              ]}
            />

            <StageControlSelect
              label="Size"
              value={size}
              onChange={(val) => setSize(val as GroupActionSize)}
              options={[
                { label: "SM (32px)", value: "sm" },
                { label: "Default (40px)", value: "default" },
                { label: "LG (48px)", value: "lg" },
              ]}
            />

            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          {/* QA Toggles Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
            <button
              type="button"
              onClick={() => setDisabledFirst(!disabledFirst)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                disabledFirst
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {disabledFirst ? "✓ First Disabled" : "First Disabled"}
            </button>

            <button
              type="button"
              onClick={() => setHasLongLabels(!hasLongLabels)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                hasLongLabels
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {hasLongLabels ? "✓ Long Labels" : "Long Labels"}
            </button>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-8 px-2 sm:px-4">
        <div
          className={cn(
            "w-full transition-all duration-300 mx-auto flex flex-col items-center justify-center gap-6",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          {/* Action Groups with Container-Aware Constraint */}
          <div
            className={cn(
              "w-full flex items-center justify-center gap-4 sm:gap-6",
              orientation === "vertical" ? "flex-col" : "flex-wrap"
            )}
          >
            {/* 1. History Navigation Cluster */}
            <ButtonGroup orientation={orientation}>
              <Button
                variant={variant}
                size={size}
                disabled={disabledFirst}
              >
                <HaloIcon icon={ArrowLeft01Icon} size={size === "sm" ? 14 : 16} />
                {prevLabel}
              </Button>
              <Button variant={variant} size={size}>
                Overview
              </Button>
              <Button variant={variant} size={size}>
                {nextLabel}
                <HaloIcon icon={ArrowRight01Icon} size={size === "sm" ? 14 : 16} />
              </Button>
            </ButtonGroup>

            {/* 2. Split Action Cluster */}
            <ButtonGroup orientation={orientation}>
              <Button variant={variant} size={size}>
                Save changes
              </Button>
              <IconButton
                variant={variant}
                size={size}
                aria-label="More publishing options"
              >
                <HaloIcon icon={MoreHorizontalIcon} size={size === "sm" ? 14 : 16} />
              </IconButton>
            </ButtonGroup>
          </div>

          {/* Environmental telemetry pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 px-3 py-1 rounded-full border border-border/70 bg-card/60 backdrop-blur-md shadow-2xs text-[11px] font-mono text-muted-foreground text-center">
            <span>orientation="{orientation}"</span>
            <span>&bull;</span>
            <span>variant="{variant}"</span>
            <span>&bull;</span>
            <span>size="{size}"</span>
            <span>&bull;</span>
            <span>container: {containerWidth === "full" ? "100%" : `${containerWidth}px`}</span>
            {disabledFirst && (
              <>
                <span>&bull;</span>
                <span className="text-amber-500 font-medium">1st disabled</span>
              </>
            )}
            {hasLongLabels && (
              <>
                <span>&bull;</span>
                <span className="text-primary font-medium">long labels</span>
              </>
            )}
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
