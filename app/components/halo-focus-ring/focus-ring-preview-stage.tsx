"use client";

import * as React from "react";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  KeyboardIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloFocusRing } from "@/components/haloui/foundations/halo-focus-ring";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloGlow } from "@/components/haloui/foundations/halo-glow";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { cn } from "@/lib/utils";

export function FocusRingPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [withEdge, setWithEdge] = React.useState(true);
  const [withGlow, setWithGlow] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [selectVal, setSelectVal] = React.useState("production");
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    return `import { HaloFocusRing } from "@/components/ui/halo-focus-ring";
import { HaloButton } from "@/components/ui/halo-button";
import { Input } from "@/components/ui/input";

export function AccessibleFocusForm() {
  return (
    <div className="space-y-4">
      {/* 1. Composing onto Action Button via Radix Slot */}
      <HaloFocusRing asChild${isInvalid ? ' state="invalid"' : ""}>
        <HaloButton variant="primary">Confirm Action</HaloButton>
      </HaloFocusRing>

      {/* 2. Composing onto Standard Input */}
      <HaloFocusRing asChild${isInvalid ? ' state="invalid"' : ""}>
        <Input placeholder="Enter username..." />
      </HaloFocusRing>
    </div>
  );
}`;
  }, [isInvalid]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setWithEdge(true);
    setWithGlow(false);
    setIsInvalid(false);
    setSwitchChecked(true);
    setSelectVal("production");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Test real keyboard navigation using Tab and Shift+Tab across interactive controls and reference environments."
      badge="Keyboard Accessibility"
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
      controls={
        <>
          {/* Validation State Selector */}
          <StageControlGroup label="State">
            <StageControlButton
              active={!isInvalid}
              onClick={() => setIsInvalid(false)}
            >
              Default
            </StageControlButton>
            <StageControlButton
              active={isInvalid}
              onClick={() => setIsInvalid(true)}
              className={isInvalid ? "text-rose-500 font-semibold" : ""}
            >
              Invalid
            </StageControlButton>
          </StageControlGroup>

          {/* Optical Layer Toggles */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="focus-edge-toggle"
                checked={withEdge}
                onCheckedChange={(checked) => setWithEdge(checked === true)}
              />
              <label
                htmlFor="focus-edge-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Active Edge
              </label>
            </div>

            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="focus-glow-toggle"
                checked={withGlow}
                onCheckedChange={(checked) => setWithGlow(checked === true)}
              />
              <label
                htmlFor="focus-glow-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Active Glow
              </label>
            </div>
          </div>
        </>
      }
      telemetry={[
        { label: "Spec", value: "WCAG 2.1 AA", variant: "success" },
        { label: "Perimeter", value: "2px offset + 2px ring" },
        {
          label: "Collision",
          value: isInvalid ? "Invalid Luminous" : "Dual-Contrast",
          variant: isInvalid ? "warning" : "default",
        },
      ]}
    >
      {/* Keyboard Instruction Hint */}
      <div className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background/90 border border-border text-xs text-muted-foreground shadow-2xs">
        <div className="size-5 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <HaloIcon icon={KeyboardIcon} size={13} />
        </div>
        <p className="leading-relaxed">
          <span className="font-semibold text-foreground">Interactive Test:</span> Press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px] text-foreground">
            Tab
          </kbd>{" "}
          and{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px] text-foreground">
            Shift + Tab
          </kbd>{" "}
          to move focus through each control.
        </p>
      </div>

      {/* Surface Assembly */}
      <HaloSurface
        intensity="balanced"
        elevation="raised"
        className="w-full p-6 sm:p-8 rounded-3xl relative space-y-6 text-left"
      >
        {withEdge && <HaloEdge strength="balanced" />}
        {withGlow && (
          <HaloGlow
            variant="emphasis"
            strength="balanced"
            color="primary"
          />
        )}

        {/* Row 1: Button & Switch */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <label className="text-xs font-medium text-foreground block mb-1.5">
              Liquid Action Button
            </label>
            <HaloFocusRing asChild>
              <HaloButton variant="primary" size="md">
                Action Button
              </HaloButton>
            </HaloFocusRing>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="focus-preview-switch"
              className="text-xs font-medium text-foreground cursor-pointer"
            >
              Hardware Scrim
            </label>
            <HaloFocusRing asChild>
              <Switch
                id="focus-preview-switch"
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
            </HaloFocusRing>
          </div>
        </div>

        {/* Row 2: Text Input & Select */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="focus-preview-input"
              className="text-xs font-medium text-foreground block mb-1.5"
            >
              Text Input Field
            </label>
            <HaloFocusRing asChild>
              <Input
                id="focus-preview-input"
                placeholder="Click or tab here..."
                className={cn(
                  "bg-background/80 text-xs",
                  isInvalid && "border-rose-500 focus-visible:ring-rose-500"
                )}
              />
            </HaloFocusRing>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground block mb-1.5">
              Select Menu
            </label>
            <Select
              value={selectVal}
              onValueChange={(val) => {
                if (val) setSelectVal(val);
              }}
            >
              <HaloFocusRing asChild>
                <SelectTrigger className="w-full bg-background/80 text-xs">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
              </HaloFocusRing>
              <SelectContent>
                <SelectItem value="production">Production V4</SelectItem>
                <SelectItem value="staging">Staging Mesh</SelectItem>
                <SelectItem value="canary">Canary Optical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 3: Segmented Tabs */}
        <div>
          <label className="text-xs font-medium text-foreground block mb-1.5">
            Segmented Tabs Control
          </label>
          <Tabs defaultValue="visual" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-muted/60">
              <HaloFocusRing asChild>
                <TabsTrigger value="visual" className="text-xs">Visual</TabsTrigger>
              </HaloFocusRing>
              <HaloFocusRing asChild>
                <TabsTrigger value="optical" className="text-xs">Optical</TabsTrigger>
              </HaloFocusRing>
              <HaloFocusRing asChild>
                <TabsTrigger value="kinetic" className="text-xs">Kinetic</TabsTrigger>
              </HaloFocusRing>
            </TabsList>
          </Tabs>
        </div>
      </HaloSurface>
    </PreviewStageShell>
  );
}
