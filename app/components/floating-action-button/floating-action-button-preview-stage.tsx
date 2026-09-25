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
} from "@/components/docs/preview-stage-shell";

export function FloatingActionButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<FloatingActionButtonVariant>("default");
  const [size, setSize] = React.useState<FloatingActionButtonSize>("default");
  const [isExtended, setIsExtended] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

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
        <FloatingActionButton${propsStr} aria-label="Create new milestone">
          <HaloIcon icon={Add01Icon} size={${size === "lg" ? 24 : 20}} />
          <span>New milestone</span>
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
  }, [variant, size, isExtended, disabled]);

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
  };

  const iconPx = size === "lg" ? 24 : 20;

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
      telemetry={[
        {
          label: "Spatial Elevation",
          value: "Floating (Level 3)",
          variant: "success",
        },
        {
          label: "Touch Target",
          value: size === "lg" ? "64 × 64 px" : "56 × 56 px",
          variant: "success",
        },
        {
          label: "A11y Label",
          value: isExtended ? "Visible + Accessible" : "aria-label='Create item'",
          variant: "success",
        },
        {
          label: "Placement Owner",
          value: "Surrounding Layout",
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Mode"
            value={isExtended ? "extended" : "icon-only"}
            onValueChange={(val) => setIsExtended(val === "extended")}
            options={[
              { label: "Icon-only", value: "icon-only" },
              { label: "Extended", value: "extended" },
            ]}
          />

          <StageControlSelect
            label="Variant"
            value={variant}
            onValueChange={(val) => setVariant(val as FloatingActionButtonVariant)}
            options={[
              { label: "Default", value: "default" },
              { label: "Secondary", value: "secondary" },
            ]}
          />

          <StageControlSelect
            label="Size"
            value={size}
            onValueChange={(val) => setSize(val as FloatingActionButtonSize)}
            options={[
              { label: "56px (Default)", value: "default" },
              { label: "64px (Lg)", value: "lg" },
            ]}
          />

          <StageControlSelect
            label="Options"
            value={disabled ? "disabled" : "active"}
            onValueChange={(val) => setDisabled(val === "disabled")}
            options={[
              { label: "Active", value: "active" },
              { label: "Disabled", value: "disabled" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
        {/* Realistic App Content Container illustrating layout-owned placement */}
        <div className="relative min-h-[380px] w-full rounded-2xl border border-border/80 bg-background/85 dark:bg-neutral-950/80 backdrop-blur-md p-6 shadow-sm overflow-hidden flex flex-col justify-between transition-all">
          {/* App Header & Search */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <HaloIcon icon={InboxIcon} size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Inbox & Tasks</h3>
                  <p className="text-[11px] text-muted-foreground">3 pending milestones</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/70 bg-muted/40 text-xs text-muted-foreground">
                <HaloIcon icon={Search01Icon} size={13} />
                <span>Search tasks...</span>
              </div>
            </div>

            {/* Mock Task Rows */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <HaloIcon icon={CheckmarkCircle02Icon} size={12} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Finalize Optical Refraction Edge specs</p>
                    <p className="text-[10px] text-muted-foreground">Completed today · Design System</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/80">v1.4.0</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <HaloIcon icon={Clock01Icon} size={12} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Audit WCAG 2.1 AA Double-Contrast focus ring</p>
                    <p className="text-[10px] text-muted-foreground">Due tomorrow · Accessibility</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">In review</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded-full border border-border flex items-center justify-center text-muted-foreground">
                    <HaloIcon icon={Folder01Icon} size={12} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Release Actions 07: Floating Action Button</p>
                    <p className="text-[10px] text-muted-foreground">High priority · Component Catalog</p>
                  </div>
                </div>
                <HaloIcon icon={StarIcon} size={13} className="text-amber-500" />
              </div>
            </div>
          </div>

          {/* Surrounding Context Hint */}
          <div className="pt-8 pb-2 text-[11px] text-muted-foreground/70 flex items-center justify-between border-t border-border/40">
            <span>Container bounds (relative)</span>
            <span className="font-mono text-[10px]">placement: absolute bottom-6 right-6</span>
          </div>

          {/* Floating Action Button: Positioned by container layout, NOT baked into component */}
          <div className="absolute bottom-6 right-6 z-10">
            <FloatingActionButton
              variant={variant}
              size={size}
              extended={isExtended}
              disabled={disabled}
              aria-label="Create item"
            >
              <HaloIcon icon={Add01Icon} size={iconPx} />
              {isExtended && <span>Create item</span>}
            </FloatingActionButton>
          </div>
        </div>

        {/* State metadata readout */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted-foreground/80 text-center max-w-full px-2">
          <span>variant="{variant}"</span>
          <span>·</span>
          <span>size="{size}"</span>
          <span>·</span>
          <span>extended={isExtended ? "true" : "false"}</span>
          <span>·</span>
          <span className="text-emerald-500 font-medium">aria-label="Create item"</span>
          {disabled && (
            <>
              <span>·</span>
              <span className="text-amber-500 font-medium">disabled</span>
            </>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
