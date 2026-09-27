"use client";

import * as React from "react";
import {
  Add01Icon,
  Search01Icon,
  InboxIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Folder01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  FloatingActionButton,
  type FloatingActionButtonVariant,
  type FloatingActionButtonSize,
} from "@/components/ui/floating-action-button";
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

export function FloatingActionButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<FloatingActionButtonVariant>("default");
  const [size, setSize] = React.useState<FloatingActionButtonSize>("default");
  const [isExtended, setIsExtended] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [hasLongLabel, setHasLongLabel] = React.useState(false);
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

  const labelText = hasLongLabel
    ? "Create New Milestone And Launch Sprint"
    : "New milestone";

  const generatedCode = React.useMemo(() => {
    const propsList: string[] = [];
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (isExtended) propsList.push("extended");
    if (disabled) propsList.push("disabled");

    const propsStr = propsList.length > 0 ? " " + propsList.join(" ") : "";

    if (isExtended) {
      return `import { Add01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

export function WorkspaceFABDemo() {
  return (
    <div className="relative min-h-[360px] w-full rounded-2xl border border-border/80 bg-background/90 p-6 overflow-hidden">
      {/* App Workspace Content */}
      <div className="space-y-4 max-w-md">
        <h3 className="text-base font-semibold text-foreground">Project Workspace</h3>
        <p className="text-sm text-muted-foreground">
          Review recent team activity, milestone deliverables, and scheduled reviews.
        </p>
      </div>

      {/* Floating Action Button: Positioned by the surrounding container layout */}
      <div className="absolute bottom-6 right-6 z-10">
        <FloatingActionButton${propsStr} aria-label="${labelText}">
          <HaloIcon icon={Add01Icon} size={${size === "lg" ? 24 : 20}} />
          <span>${labelText}</span>
        </FloatingActionButton>
      </div>
    </div>
  );
}`;
    }

    return `import { Add01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

export function WorkspaceFABDemo() {
  return (
    <div className="relative min-h-[360px] w-full rounded-2xl border border-border/80 bg-background/90 p-6 overflow-hidden">
      {/* App Workspace Content */}
      <div className="space-y-4 max-w-md">
        <h3 className="text-base font-semibold text-foreground">Project Workspace</h3>
        <p className="text-sm text-muted-foreground">
          Review recent team activity, milestone deliverables, and scheduled reviews.
        </p>
      </div>

      {/* Floating Action Button: Canonical icon-only form elevated above the interface */}
      <div className="absolute bottom-6 right-6 z-10">
        <FloatingActionButton${propsStr} aria-label="Create item">
          <HaloIcon icon={Add01Icon} size={${size === "lg" ? 24 : 20}} />
        </FloatingActionButton>
      </div>
    </div>
  );
}`;
  }, [variant, size, isExtended, disabled, labelText]);

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
    setIsExtended(false);
    setDisabled(false);
    setHasLongLabel(false);
    setContainerWidth("full");
  };

  const iconPx = size === "lg" ? 24 : 20;

  const telemetry: TelemetryItem[] = [
    {
      label: "Elevation",
      value: "FLOATING (Level 3)",
      variant: "success",
    },
    {
      label: "Touch Target",
      value: size === "lg" ? "64 × 64 px" : "56 × 56 px",
      variant: "success",
    },
    {
      label: "Focus Ring",
      value: "z-20 (Unclipped)",
      variant: "success",
    },
    {
      label: "Physics",
      value: "Tactile Press (No Bob)",
      variant: "default",
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
      description="Inspect elevated spatial presence, tactile compression, optical boundary separation, and layout-neutral container positioning across responsive viewports and background environments."
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
              label="Mode"
              value={isExtended ? "extended" : "icon-only"}
              onChange={(val) => setIsExtended(val === "extended")}
              options={[
                { label: "Icon-only (Circular)", value: "icon-only" },
                { label: "Extended (Capsule)", value: "extended" },
              ]}
            />

            <StageControlSelect
              label="Variant"
              value={variant}
              onChange={(val) => setVariant(val as FloatingActionButtonVariant)}
              options={[
                { label: "Default (Liquid Glass)", value: "default" },
                { label: "Secondary (Frosted)", value: "secondary" },
              ]}
            />

            <StageControlSelect
              label="Size"
              value={size}
              onChange={(val) => setSize(val as FloatingActionButtonSize)}
              options={[
                { label: "56px (Default)", value: "default" },
                { label: "64px (Lg)", value: "lg" },
              ]}
            />

            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
            {isExtended && (
              <button
                type="button"
                onClick={() => setHasLongLabel(!hasLongLabel)}
                className={cn(
                  "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                  hasLongLabel
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
                )}
              >
                {hasLongLabel ? "✓ Long Label (240px Reflow)" : "Long Label"}
              </button>
            )}

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
              onClick={() => setIsExtended(!isExtended)}
              className="h-7 px-2.5 rounded-md text-xs font-medium border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60 transition-colors cursor-pointer select-none"
            >
              {isExtended ? "Switch to Icon-only" : "Switch to Extended"}
            </button>
          </div>
        </div>
      }
    >
      <div
        className={cn(
          "w-full mx-auto p-4 sm:p-6 transition-all duration-300 ease-out",
          getContainerMaxWidthClass(containerWidth)
        )}
      >
        {/* Realistic App Content Container illustrating layout-owned placement */}
        <div className="relative min-h-[380px] w-full rounded-2xl border border-border/80 bg-background/85 dark:bg-neutral-950/80 backdrop-blur-md p-4 sm:p-6 shadow-sm overflow-hidden flex flex-col justify-between transition-all">
          {/* App Header & Search */}
          <div className="space-y-4 min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="size-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <HaloIcon icon={InboxIcon} size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">Inbox & Tasks</h3>
                  <p className="text-[11px] text-muted-foreground truncate">3 pending milestones</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/70 bg-muted/40 text-xs text-muted-foreground">
                <HaloIcon icon={Search01Icon} size={13} />
                <span className="truncate">Search tasks...</span>
              </div>
            </div>

            {/* Mock Task Rows */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-5 shrink-0 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <HaloIcon icon={CheckmarkCircle02Icon} size={12} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">Finalize Optical Refraction specs</p>
                    <p className="text-[10px] text-muted-foreground truncate">Completed today</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/80 shrink-0 ms-2">v1.4</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-5 shrink-0 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <HaloIcon icon={Clock01Icon} size={12} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">Audit WCAG 2.1 AA focus ring</p>
                    <p className="text-[10px] text-muted-foreground truncate">Due tomorrow</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 shrink-0 ms-2">Review</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-5 shrink-0 rounded-full border border-border flex items-center justify-center text-muted-foreground">
                    <HaloIcon icon={Folder01Icon} size={12} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">Release Actions 07: FAB</p>
                    <p className="text-[10px] text-muted-foreground truncate">High priority</p>
                  </div>
                </div>
                <HaloIcon icon={StarIcon} size={13} className="text-amber-500 shrink-0 ms-2" />
              </div>
            </div>
          </div>

          {/* Surrounding Context Hint */}
          <div className="pt-8 pb-2 text-[11px] text-muted-foreground/70 flex items-center justify-between border-t border-border/40">
            <span className="truncate">Layout-owned</span>
            <span className="font-mono text-[10px] shrink-0">bottom-4 right-4</span>
          </div>

          {/* Floating Action Button: Positioned by container layout, NOT baked into component */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 max-w-[calc(100%-2rem)]">
            <FloatingActionButton
              variant={variant}
              size={size}
              extended={isExtended}
              disabled={disabled}
              aria-label={isExtended ? labelText : "Create item"}
            >
              <HaloIcon icon={Add01Icon} size={iconPx} />
              {isExtended && <span className="truncate">{labelText}</span>}
            </FloatingActionButton>
          </div>
        </div>

        {/* Live Optical Telemetry Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-mono text-muted-foreground/80 text-center max-w-full px-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Elevation:</span>
            <strong className="text-foreground capitalize">Level 3 Floating</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Size:</span>
            <strong className="text-foreground capitalize">{size === "lg" ? "64px (Lg)" : "56px (Default)"}</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Mode:</span>
            <strong className="text-foreground capitalize">{isExtended ? "Extended" : "Icon-only"}</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/70 bg-background/80 backdrop-blur-md shadow-2xs">
            <span className="text-muted-foreground/70">Focus:</span>
            <strong className="text-sky-500 dark:text-sky-400">z-20 Unclipped</strong>
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
