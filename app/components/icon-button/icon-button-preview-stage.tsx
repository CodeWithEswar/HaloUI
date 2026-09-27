"use client";

import * as React from "react";
import {
  Search01Icon,
  ReloadIcon,
  Settings01Icon,
  MoreHorizontalIcon,
  Delete02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  IconButton,
  type IconButtonVariant,
  type IconButtonSize,
} from "@/components/ui/icon-button";
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

export function IconButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<IconButtonVariant>("default");
  const [size, setSize] = React.useState<IconButtonSize>("default");
  const [disabled, setDisabled] = React.useState(false);
  const [composition, setComposition] = React.useState<"toolbar" | "single">("toolbar");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [wrapToolbar, setWrapToolbar] = React.useState(true);
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

  const generatedCode = React.useMemo(() => {
    const propsList: string[] = [];
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (disabled) propsList.push("disabled");

    const propsStr = propsList.length > 0 ? " " + propsList.join(" ") : "";

    if (composition === "single") {
      return `import { Search01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { IconButton } from "@/components/ui/icon-button";

export function SingleIconButtonDemo() {
  return (
    <IconButton${propsStr} aria-label="Search workspace">
      <HaloIcon icon={Search01Icon} size={${size === "sm" ? 15 : size === "lg" ? 20 : 18}} />
    </IconButton>
  );
}`;
    }

    return `import {
  Search01Icon,
  ReloadIcon,
  Settings01Icon,
  MoreHorizontalIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { IconButton } from "@/components/ui/icon-button";

export function ActionToolbarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border border-border/80 bg-background/80 backdrop-blur-md shadow-xs">
      {/* Search Action */}
      <IconButton${propsStr} aria-label="Search workspace">
        <HaloIcon icon={Search01Icon} size={${size === "sm" ? 15 : size === "lg" ? 20 : 18}} />
      </IconButton>

      {/* Reload Action */}
      <IconButton${propsStr} aria-label="Refresh records">
        <HaloIcon icon={ReloadIcon} size={${size === "sm" ? 15 : size === "lg" ? 20 : 18}} />
      </IconButton>

      <div className="h-4 w-px bg-border/60 mx-0.5" />

      {/* Settings Action */}
      <IconButton${propsStr} aria-label="Open settings">
        <HaloIcon icon={Settings01Icon} size={${size === "sm" ? 15 : size === "lg" ? 20 : 18}} />
      </IconButton>

      {/* More Options */}
      <IconButton${propsStr} aria-label="More options">
        <HaloIcon icon={MoreHorizontalIcon} size={${size === "sm" ? 15 : size === "lg" ? 20 : 18}} />
      </IconButton>

      <div className="h-4 w-px bg-border/60 mx-0.5" />

      {/* Destructive Action */}
      <IconButton variant="destructive" size="${size}"${disabled ? " disabled" : ""} aria-label="Delete document">
        <HaloIcon icon={Delete02Icon} size={${size === "sm" ? 15 : size === "lg" ? 20 : 18}} />
      </IconButton>
    </div>
  );
}`;
  }, [variant, size, disabled, composition]);

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
    setDisabled(false);
    setComposition("toolbar");
    setContainerWidth("full");
    setWrapToolbar(true);
  };

  const iconPx = size === "showcase" ? 36 : size === "sm" ? 15 : size === "lg" ? 20 : 18;

  const telemetry: TelemetryItem[] = [
    {
      label: "Geometry",
      value: size === "sm" ? "32 × 32 px" : size === "lg" ? "48 × 48 px" : size === "showcase" ? "100 × 100 px" : "40 × 40 px",
      variant: "default",
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
    {
      label: "A11y Name",
      value: "Mandatory (aria-label)",
      variant: "success",
    },
  ];

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect compact toolbar compositions, tactile compression, optical boundary contrast, and mandatory accessible naming across responsive viewports and background environments."
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
              onChange={(val) => setVariant(val as IconButtonVariant)}
              options={[
                { label: "Default (Liquid Glass)", value: "default" },
                { label: "Secondary (Tinted)", value: "secondary" },
                { label: "Outline (Structural)", value: "outline" },
                { label: "Ghost (Minimal)", value: "ghost" },
                { label: "Destructive (Crimson)", value: "destructive" },
              ]}
            />

            <StageControlSelect
              label="Size"
              value={size}
              onChange={(val) => setSize(val as IconButtonSize)}
              options={[
                { label: "SM (32px)", value: "sm" },
                { label: "Default (40px)", value: "default" },
                { label: "LG (48px)", value: "lg" },
                { label: "Showcase (100px)", value: "showcase" },
              ]}
            />

            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />

            <StageControlSelect
              label="Composition"
              value={composition}
              onChange={(val) => setComposition(val as "toolbar" | "single")}
              options={[
                { label: "Action Toolbar (Grouped)", value: "toolbar" },
                { label: "Single Isolated Action", value: "single" },
              ]}
            />
          </div>

          {/* QA Toggles Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
            <button
              type="button"
              onClick={() => setWrapToolbar(!wrapToolbar)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                wrapToolbar
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {wrapToolbar ? "✓ Flex Wrap (240px Safe)" : "No Wrap"}
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
          {size === "showcase" ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Canonical .box Lens</span>
                <div className="box">
                  <span className="circle-overlay" aria-hidden="true" />
                  <HaloIcon icon={Search01Icon} size={36} className="halo-liquid-icon relative z-10" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">HaloUI IconButton</span>
                <IconButton
                  variant={variant}
                  size="showcase"
                  disabled={disabled}
                  aria-label="Search workspace"
                >
                  <HaloIcon icon={Search01Icon} size={36} />
                </IconButton>
              </div>
            </div>
          ) : composition === "single" ? (
            <div className="flex items-center justify-center p-4">
              <IconButton
                variant={variant}
                size={size}
                disabled={disabled}
                aria-label="Search workspace"
              >
                <HaloIcon icon={Search01Icon} size={iconPx} />
              </IconButton>
            </div>
          ) : (
            <div
              className={cn(
                "flex items-center justify-center gap-1.5 p-1.5 rounded-2xl border border-border/80 bg-background/80 backdrop-blur-md shadow-xs transition-all max-w-full",
                wrapToolbar ? "flex-wrap" : "overflow-x-auto"
              )}
            >
              <IconButton
                variant={variant}
                size={size}
                disabled={disabled}
                aria-label="Search workspace"
              >
                <HaloIcon icon={Search01Icon} size={iconPx} />
              </IconButton>

              <IconButton
                variant={variant}
                size={size}
                disabled={disabled}
                aria-label="Refresh records"
              >
                <HaloIcon icon={ReloadIcon} size={iconPx} />
              </IconButton>

              <div className="h-4 w-px bg-border/60 mx-0.5 shrink-0" />

              <IconButton
                variant={variant}
                size={size}
                disabled={disabled}
                aria-label="Open settings"
              >
                <HaloIcon icon={Settings01Icon} size={iconPx} />
              </IconButton>

              <IconButton
                variant={variant}
                size={size}
                disabled={disabled}
                aria-label="More options"
              >
                <HaloIcon icon={MoreHorizontalIcon} size={iconPx} />
              </IconButton>

              <div className="h-4 w-px bg-border/60 mx-0.5 shrink-0" />

              <IconButton
                variant="destructive"
                size={size}
                disabled={disabled}
                aria-label="Delete document"
              >
                <HaloIcon icon={Delete02Icon} size={iconPx} />
              </IconButton>
            </div>
          )}

          {/* Environmental telemetry pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 px-3 py-1 rounded-full border border-border/70 bg-card/60 backdrop-blur-md shadow-2xs text-[11px] font-mono text-muted-foreground text-center">
            <span>variant="{variant}"</span>
            <span>&bull;</span>
            <span>size="{size}"</span>
            <span>&bull;</span>
            <span>container: {containerWidth === "full" ? "100%" : `${containerWidth}px`}</span>
            <span>&bull;</span>
            <span className="text-emerald-500 font-medium">aria-label</span>
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
