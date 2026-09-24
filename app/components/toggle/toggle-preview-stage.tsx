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
} from "@/components/docs/preview-stage-shell";

export function TogglePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<ToggleVariant>("default");
  const [size, setSize] = React.useState<ToggleSize>("default");
  const [contentMode, setContentMode] = React.useState<"icon-text" | "text" | "icon">("icon-text");
  const [pressed, setPressed] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

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
      Bold
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
      <span>Pin to sidebar</span>
    </Toggle>
  );
}`;
  }, [variant, size, contentMode, pressed, disabled]);

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
  };

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
      telemetry={[
        {
          label: "State",
          value: pressed ? "Pressed" : "Unpressed",
          variant: pressed ? "success" : undefined,
        },
        {
          label: "aria-pressed",
          value: pressed ? "true" : "false",
          variant: pressed ? "success" : undefined,
        },
        {
          label: "Touch Target",
          value: size === "sm" ? "32px (Compact)" : "≥40px (Compliant)",
          variant: size === "sm" ? "warning" : "success",
        },
        {
          label: "Focus",
          value: "z-20 Layered",
          variant: "success",
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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

          <StageControlSelect
            label="Content"
            value={contentMode}
            onValueChange={(val) => setContentMode(val as "icon-text" | "icon" | "text")}
            options={[
              { label: "Icon + Text", value: "icon-text" },
              { label: "Icon Only", value: "icon" },
              { label: "Text Only", value: "text" },
            ]}
          />

          <StageControlSelect
            label="State"
            value={disabled ? "disabled" : pressed ? "pressed" : "unpressed"}
            onValueChange={(val) => {
              if (val === "disabled") {
                setDisabled(true);
              } else if (val === "pressed") {
                setDisabled(false);
                setPressed(true);
              } else {
                setDisabled(false);
                setPressed(false);
              }
            }}
            options={[
              { label: "Unpressed", value: "unpressed" },
              { label: "Pressed", value: "pressed" },
              { label: "Disabled", value: "disabled" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full flex flex-col items-center justify-center gap-6 p-4 sm:p-8 min-h-[300px]">
        {/* Centerpiece Interactive Toggle */}
        <div className="flex flex-col items-center justify-center gap-4">
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
            {contentMode === "text" && <span>Bold</span>}
            {contentMode === "icon-text" && (
              <>
                <HaloIcon
                  icon={PinIcon}
                  size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
                />
                <span>Pin to sidebar</span>
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
                Persistent State: <strong>{pressed ? "Pressed (Active)" : "Unpressed (Inactive)"}</strong>
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
      </div>
    </PreviewStageShell>
  );
}
