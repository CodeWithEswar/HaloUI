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
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import type { ToggleVariant, ToggleSize } from "@/components/ui/toggle";

export function ToggleGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // ToggleGroup Configuration Controls
  const [selectionMode, setSelectionMode] = React.useState<"single" | "multiple">("single");
  const [spacing, setSpacing] = React.useState<ToggleGroupSpacing>("connected");
  const [orientation, setOrientation] = React.useState<ToggleGroupOrientation>("horizontal");
  const [variant, setVariant] = React.useState<ToggleVariant>("default");
  const [size, setSize] = React.useState<ToggleSize>("default");

  // Selection states
  const [singleValue, setSingleValue] = React.useState<string>("center");
  const [multiValue, setMultiValue] = React.useState<string[]>(["bold"]);
  const [copied, setCopied] = React.useState(false);

  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  const generatedCode = React.useMemo(() => {
    const spacingProp = spacing === "separated" ? ' spacing="separated"' : "";
    const orientProp = orientation === "vertical" ? ' orientation="vertical"' : "";
    const variantProp = variant !== "default" ? ` variant="${variant}"` : "";
    const sizeProp = size !== "default" ? ` size="${size}"` : "";

    if (selectionMode === "single") {
      return `import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupSingleDemo() {
  const [alignment, setAlignment] = React.useState("${singleValue}");

  return (
    <ToggleGroup
      type="single"
      value={alignment}
      onValueChange={(val) => val && setAlignment(val)}${spacingProp}${orientProp}${variantProp}${sizeProp}
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
  );
}`;
    }

    return `import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupMultiDemo() {
  const [formatting, setFormatting] = React.useState<string[]>(${JSON.stringify(multiValue)});

  return (
    <ToggleGroup
      type="multiple"
      value={formatting}
      onValueChange={setFormatting}${spacingProp}${orientProp}${variantProp}${sizeProp}
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
  );
}`;
  }, [selectionMode, singleValue, multiValue, spacing, orientation, variant, size, iconSize]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeValueString =
    selectionMode === "single"
      ? singleValue || "none"
      : multiValue.length > 0
      ? multiValue.join(", ")
      : "none";

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
      controls={
        <>
          {/* Selection Mode Control */}
          <StageControlGroup label="Type">
            <StageControlButton
              active={selectionMode === "single"}
              onClick={() => setSelectionMode("single")}
            >
              Single
            </StageControlButton>
            <StageControlButton
              active={selectionMode === "multiple"}
              onClick={() => setSelectionMode("multiple")}
            >
              Multiple
            </StageControlButton>
          </StageControlGroup>

          {/* Spacing Geometry Control */}
          <StageControlGroup label="Geometry">
            <StageControlButton
              active={spacing === "connected"}
              onClick={() => setSpacing("connected")}
            >
              Connected
            </StageControlButton>
            <StageControlButton
              active={spacing === "separated"}
              onClick={() => setSpacing("separated")}
            >
              Separated
            </StageControlButton>
          </StageControlGroup>

          {/* Orientation Control */}
          <StageControlGroup label="Orientation">
            <StageControlButton
              active={orientation === "horizontal"}
              onClick={() => setOrientation("horizontal")}
            >
              Horizontal
            </StageControlButton>
            <StageControlButton
              active={orientation === "vertical"}
              onClick={() => setOrientation("vertical")}
            >
              Vertical
            </StageControlButton>
          </StageControlGroup>

          {/* Variant Control */}
          <StageControlGroup label="Variant">
            <StageControlButton
              active={variant === "default"}
              onClick={() => setVariant("default")}
            >
              Default
            </StageControlButton>
            <StageControlButton
              active={variant === "outline"}
              onClick={() => setVariant("outline")}
            >
              Outline
            </StageControlButton>
          </StageControlGroup>

          {/* Size Control */}
          <StageControlGroup label="Size">
            <StageControlButton
              active={size === "sm"}
              onClick={() => setSize("sm")}
            >
              SM
            </StageControlButton>
            <StageControlButton
              active={size === "default"}
              onClick={() => setSize("default")}
            >
              MD
            </StageControlButton>
            <StageControlButton
              active={size === "lg"}
              onClick={() => setSize("lg")}
            >
              LG
            </StageControlButton>
          </StageControlGroup>
        </>
      }
    >
      <div className="flex flex-col items-center justify-center gap-6 py-6 sm:py-10">
        {selectionMode === "single" ? (
          <ToggleGroup
            type="single"
            value={singleValue}
            onValueChange={(val) => val && setSingleValue(val)}
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
        ) : (
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
        )}

        {/* Live Optical Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-md text-[11px] font-mono text-muted-foreground shadow-sm">
          <span>
            Type: <strong className="text-foreground capitalize">{selectionMode}</strong>
          </span>
          <span className="text-border">•</span>
          <span>
            Value: <strong className="text-foreground font-semibold">{activeValueString}</strong>
          </span>
          <span className="text-border">•</span>
          <span>
            Geometry: <strong className="text-foreground capitalize">{spacing}</strong>
          </span>
          <span className="text-border">•</span>
          <span>
            Focus: <strong className="text-sky-500 dark:text-sky-400">Roving Tabindex</strong>
          </span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
