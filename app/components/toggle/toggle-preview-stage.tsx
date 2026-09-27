"use client";

import * as React from "react";
import {
  PinIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  CheckmarkCircle02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Toggle,
  type ToggleVariant,
  type ToggleSize,
} from "@/components/ui/toggle";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
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

export function TogglePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<ToggleVariant>("default");
  const [size, setSize] = React.useState<ToggleSize>("default");
  const [contentMode, setContentMode] = React.useState<"icon-text" | "text" | "icon">("icon-text");
  const [pressed, setPressed] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);
  const [hasLongText, setHasLongText] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState("full");
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

  const labelText = hasLongText
    ? "Pin Workspace Security Diagnostics To Navigation Bar"
    : contentMode === "text"
      ? "Bold"
      : "Pin to sidebar";

  const generatedCode = React.useMemo(() => {
    const variantProp = variant !== "default" ? ` variant="${variant}"` : "";
    const sizeProp = size !== "default" ? ` size="${size}"` : "";
    const disabledProp = disabled ? " disabled" : "";

    if (contentMode === "icon") {
      return `import * as React from "react";
import { PinIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  const [pinned, setPinned] = React.useState(${pressed});

  return (
    <Toggle${variantProp}${sizeProp}
      pressed={pinned}
      onPressedChange={setPinned}
      aria-label="Pin document to top"${disabledProp}
    >
      <HaloIcon icon={PinIcon} size={${size === "sm" ? 14 : size === "lg" ? 18 : 16}} />
    </Toggle>
  );
}`;
    }

    if (contentMode === "text") {
      return `import * as React from "react";
import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  const [active, setActive] = React.useState(${pressed});

  return (
    <Toggle${variantProp}${sizeProp}
      pressed={active}
      onPressedChange={setActive}${disabledProp}
    >
      ${labelText}
    </Toggle>
  );
}`;
    }

    return `import * as React from "react";
import { PinIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  const [pinned, setPinned] = React.useState(${pressed});

  return (
    <Toggle${variantProp}${sizeProp}
      pressed={pinned}
      onPressedChange={setPinned}${disabledProp}
    >
      <HaloIcon icon={PinIcon} size={${size === "sm" ? 14 : size === "lg" ? 18 : 16}} />
      <span>${labelText}</span>
    </Toggle>
  );
}`;
  }, [variant, size, contentMode, pressed, disabled, labelText]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setVariant("default");
    setSize("default");
    setContentMode("icon-text");
    setPressed(true);
    setDisabled(false);
    setHasLongText(false);
    setContainerWidth("full");
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "State",
      value: pressed ? "PRESSED (ACTIVE)" : "UNPRESSED (REST)",
      variant: pressed ? "success" : "default",
    },
    {
      label: "aria-pressed",
      value: pressed ? "TRUE" : "FALSE",
      variant: pressed ? "success" : "default",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Touch Target",
      value: size === "sm" ? "32px (Compact)" : "≥40px (Compliant)",
      variant: size === "sm" ? "warning" : "success",
    },
    {
      label: "Intensity",
      value: "SUBTLE",
      variant: "default",
    },
  ];

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect persistent pressed state communication, dual-contrast Halo Focus Ring layering, and accessible aria-pressed semantics."
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

            <StageControlSelect
              label="Content"
              value={contentMode}
              onChange={(val) => setContentMode(val as "icon-text" | "icon" | "text")}
              options={[
                { label: "Icon + Text", value: "icon-text" },
                { label: "Icon Only", value: "icon" },
                { label: "Text Only", value: "text" },
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
              onClick={() => setPressed(!pressed)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                pressed
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {pressed ? "✓ Pressed (aria-pressed=true)" : "Unpressed (false)"}
            </button>

            <button
              type="button"
              onClick={() => setHasLongText(!hasLongText)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                hasLongText
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {hasLongText ? "✓ Long Label (240px Reflow)" : "Long Label"}
            </button>

            <button
              type="button"
              onClick={() => setDisabled(!disabled)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                disabled
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {disabled ? "✓ Disabled" : "Disabled"}
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
          {/* Centerpiece Interactive Toggle with Real Container Constraint */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <Toggle
              variant={variant}
              size={size}
              pressed={pressed}
              onPressedChange={setPressed}
              disabled={disabled}
              aria-label={contentMode === "icon" ? "Pin to sidebar" : undefined}
            >
              {contentMode === "icon" && (
                <HaloIcon
                  icon={PinIcon}
                  size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                />
              )}
              {contentMode === "text" && <span>{labelText}</span>}
              {contentMode === "icon-text" && (
                <>
                  <HaloIcon
                    icon={PinIcon}
                    size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                  />
                  <span>{labelText}</span>
                </>
              )}
            </Toggle>

            {/* Live Persistent State Feedback Notification */}
            <div className="min-h-[28px] flex items-center justify-center text-center">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  pressed
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-muted/40 text-muted-foreground border-border/40"
                }`}
              >
                <HaloIcon
                  icon={pressed ? CheckmarkCircle02Icon : SparklesIcon}
                  size={14}
                />
                <span>
                  Persistent State: <strong>{pressed ? "Pressed (aria-pressed=true)" : "Unpressed (aria-pressed=false)"}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Real Formatting Toolbar Example */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-border/50 bg-background/60 shadow-2xs backdrop-blur-sm">
            <Toggle
              size="sm"
              pressed={pressed}
              onPressedChange={setPressed}
              aria-label="Toggle bold"
            >
              <HaloIcon icon={TextBoldIcon} size={14} />
            </Toggle>
            <Toggle
              size="sm"
              defaultPressed={false}
              aria-label="Toggle italic"
            >
              <HaloIcon icon={TextItalicIcon} size={14} />
            </Toggle>
            <Toggle
              size="sm"
              defaultPressed={true}
              aria-label="Toggle underline"
            >
              <HaloIcon icon={TextUnderlineIcon} size={14} />
            </Toggle>
          </div>

          {/* Environmental telemetry pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 px-3 py-1 rounded-full border border-border/70 bg-card/60 backdrop-blur-md shadow-2xs text-[11px] font-mono text-muted-foreground text-center">
            <span>variant="{variant}"</span>
            <span>&bull;</span>
            <span>size="{size}"</span>
            <span>&bull;</span>
            <span>container: {containerWidth === "full" ? "100%" : `${containerWidth}px`}</span>
            <span>&bull;</span>
            <span className={pressed ? "text-emerald-500 font-semibold" : "text-muted-foreground"}>
              pressed={String(pressed)}
            </span>
            {disabled && (
              <>
                <span>&bull;</span>
                <span className="text-amber-500 font-medium">disabled</span>
              </>
            )}
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
