"use client";

import * as React from "react";
import {
  Search01Icon,
  ReloadIcon,
  Settings01Icon,
  MoreHorizontalIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  IconButton,
  type IconButtonVariant,
  type IconButtonSize,
} from "@/components/ui/icon-button";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

export function IconButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<IconButtonVariant>("ghost");
  const [size, setSize] = React.useState<IconButtonSize>("default");
  const [disabled, setDisabled] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    const propsList: string[] = [];
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (disabled) propsList.push("disabled");

    const propsStr = propsList.length > 0 ? " " + propsList.join(" ") : "";

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
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-border/80 bg-background/80 backdrop-blur-md shadow-xs">
      {/* Search Action */}
      <IconButton${propsStr} aria-label="Search workspace">
        <HaloIcon icon={Search01Icon} size={18} />
      </IconButton>

      {/* Reload Action */}
      <IconButton${propsStr} aria-label="Refresh records">
        <HaloIcon icon={ReloadIcon} size={18} />
      </IconButton>

      <div className="h-4 w-px bg-border/60 mx-0.5" />

      {/* Settings Action */}
      <IconButton${propsStr} aria-label="Open settings">
        <HaloIcon icon={Settings01Icon} size={18} />
      </IconButton>

      {/* More Options */}
      <IconButton${propsStr} aria-label="More options">
        <HaloIcon icon={MoreHorizontalIcon} size={18} />
      </IconButton>

      <div className="h-4 w-px bg-border/60 mx-0.5" />

      {/* Destructive Action */}
      <IconButton variant="destructive" size="${size}"${disabled ? " disabled" : ""} aria-label="Delete document">
        <HaloIcon icon={Delete02Icon} size={18} />
      </IconButton>
    </div>
  );
}`;
  }, [variant, size, disabled]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setVariant("ghost");
    setSize("default");
    setDisabled(false);
  };

  const iconPx = size === "sm" ? 15 : size === "lg" ? 20 : 18;

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
      telemetry={[
        {
          label: "Geometry",
          value: size === "sm" ? "32 × 32 px" : size === "lg" ? "48 × 48 px" : "40 × 40 px",
        },
        {
          label: "Touch Target",
          value: size === "sm" ? "32px (Compact)" : "≥40px (Compliant)",
          variant: size === "sm" ? "warning" : "success",
        },
        {
          label: "A11y Name",
          value: "Mandatory (aria-label)",
          variant: "success",
        },
        {
          label: "Optical Engine",
          value: "Liquid Glass",
        },
      ]}
      controls={
        <>
          {/* Variant Selector */}
          <StageControlGroup label="Variant">
            {(["ghost", "default", "secondary", "outline", "destructive"] as const).map((v) => (
              <StageControlButton
                key={v}
                active={variant === v}
                onClick={() => setVariant(v)}
              >
                {v}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Size Selector */}
          <StageControlGroup label="Size">
            {(["sm", "default", "lg"] as const).map((s) => (
              <StageControlButton
                key={s}
                active={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Toggles */}
          <StageControlGroup label="Options">
            <StageControlButton
              active={disabled}
              onClick={() => setDisabled(!disabled)}
            >
              Disabled
            </StageControlButton>
          </StageControlGroup>
        </>
      }
    >
      <div className="flex flex-col items-center justify-center gap-6 p-6">
        {/* Realistic Compact Toolbar Fragment */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-border/80 bg-background/80 backdrop-blur-md shadow-xs transition-all">
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

          <div className="h-4 w-px bg-border/60 mx-0.5" />

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

          <div className="h-4 w-px bg-border/60 mx-0.5" />

          <IconButton
            variant="destructive"
            size={size}
            disabled={disabled}
            aria-label="Delete document"
          >
            <HaloIcon icon={Delete02Icon} size={iconPx} />
          </IconButton>
        </div>

        {/* State metadata tag */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted-foreground/80 text-center max-w-full px-2">
          <span>variant="{variant}"</span>
          <span>·</span>
          <span>size="{size}"</span>
          <span>·</span>
          <span className="text-emerald-500 font-medium">aria-label verified</span>
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
