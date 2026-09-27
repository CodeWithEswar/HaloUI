"use client";

import * as React from "react";
import {
  ArrowRight01Icon,
  SparklesIcon,
  CheckmarkCircle01Icon,
  Download01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/button";
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

export function ButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<ButtonVariant>("default");
  const [size, setSize] = React.useState<ButtonSize>("default");
  const [disabled, setDisabled] = React.useState(false);
  const [withIcon, setWithIcon] = React.useState(false);
  const [hasLongText, setHasLongText] = React.useState(false);
  const [isFullWidth, setIsFullWidth] = React.useState(false);
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

  const buttonLabel = hasLongText
    ? "Provision Cryptographically Signed Zero-Trust Enclave Cluster"
    : variant === "default"
      ? "Create application"
      : "Continue";

  const generatedCode = React.useMemo(() => {
    const iconImport = withIcon
      ? `import { ArrowRight01Icon, SparklesIcon } from "@hugeicons/core-free-icons";\nimport { HaloIcon } from "@/components/icons/halo-icon";\n\n`
      : "";
    const propsList: string[] = [];
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (disabled) propsList.push("disabled");
    if (isFullWidth) propsList.push('className="w-full"');

    const propsStr = propsList.length > 0 ? " " + propsList.join(" ") : "";

    if (withIcon && size !== "icon") {
      return `${iconImport}import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <Button${propsStr}>
      <HaloIcon icon={SparklesIcon} size={${size === "sm" ? 14 : 16}} />
      ${buttonLabel}
      <HaloIcon icon={ArrowRight01Icon} size={${size === "sm" ? 13 : 15}} />
    </Button>
  );
}`;
    }

    if (size === "icon") {
      return `import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <Button${propsStr} aria-label="Next step">
      <HaloIcon icon={ArrowRight01Icon} size={16} />
    </Button>
  );
}`;
    }

    return `import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <Button${propsStr}>
      ${buttonLabel}
    </Button>
  );
}`;
  }, [variant, size, disabled, withIcon, isFullWidth, buttonLabel]);

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
    setWithIcon(false);
    setHasLongText(false);
    setIsFullWidth(false);
    setContainerWidth("full");
  };

  const telemetry: TelemetryItem[] = [
    { label: "Variant", value: variant.toUpperCase(), variant: "default" },
    { label: "Size", value: size.toUpperCase(), variant: "default" },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    { label: "Intensity", value: "SUBTLE", variant: "default" },
    {
      label: "State",
      value: disabled ? "DISABLED" : "INTERACTIVE",
      variant: disabled ? "warning" : "success",
    },
  ];

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect tactile compression, optical specular catch, and accessible states across responsive viewports and background environments."
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
              onChange={(val) => setVariant(val as ButtonVariant)}
              options={[
                { label: "Default (Liquid Glass)", value: "default" },
                { label: "Primary (Solid Monotone)", value: "primary" },
                { label: "Secondary (Tinted Glass)", value: "secondary" },
                { label: "Outline (Structural Hairline)", value: "outline" },
                { label: "Ghost (Minimal Flat)", value: "ghost" },
                { label: "Destructive (Crimson Glass)", value: "destructive" },
                { label: "Link (High Contrast)", value: "link" },
              ]}
            />

            <StageControlSelect
              label="Size"
              value={size}
              onChange={(val) => setSize(val as ButtonSize)}
              options={[
                { label: "SM (32px)", value: "sm" },
                { label: "Default (40px)", value: "default" },
                { label: "LG (48px)", value: "lg" },
                { label: "Icon (40px)", value: "icon" },
                { label: "XS (24px)", value: "xs" },
              ]}
            />

            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />

            <StageControlSelect
              label="Icon Slot"
              value={withIcon ? "with-icon" : "no-icon"}
              onChange={(val) => setWithIcon(val === "with-icon")}
              options={[
                { label: "Text Only", value: "no-icon" },
                { label: "Leading & Trailing Icons", value: "with-icon" },
              ]}
            />
          </div>

          {/* QA Toggles Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
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
              {hasLongText ? "✓ Long Label" : "Long Label"}
            </button>

            <button
              type="button"
              onClick={() => setIsFullWidth(!isFullWidth)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                isFullWidth
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {isFullWidth ? "✓ Full Width (w-full)" : "Full Width"}
            </button>

            <button
              type="button"
              onClick={() => setWithIcon(!withIcon)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                withIcon
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {withIcon ? "✓ With Icons" : "With Icons"}
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
          {/* Action Composition with Real Container Constraint */}
          <div
            className={cn(
              "w-full flex flex-wrap items-center justify-center gap-3",
              isFullWidth && "flex-col"
            )}
          >
            {!isFullWidth && (
              <>
                <Button variant="ghost" size={size} disabled={disabled}>
                  Cancel
                </Button>
                <Button variant="secondary" size={size} disabled={disabled}>
                  Draft
                </Button>
              </>
            )}

            <Button
              variant={variant}
              size={size}
              disabled={disabled}
              className={cn("gap-2", isFullWidth && "w-full")}
              aria-label={size === "icon" ? "Next step" : undefined}
            >
              {withIcon && size !== "icon" && (
                <HaloIcon icon={SparklesIcon} size={size === "sm" ? 14 : 16} />
              )}
              {size === "icon" ? (
                <HaloIcon icon={ArrowRight01Icon} size={16} />
              ) : (
                buttonLabel
              )}
              {withIcon && size !== "icon" && (
                <HaloIcon icon={ArrowRight01Icon} size={size === "sm" ? 13 : 15} />
              )}
            </Button>
          </div>

          {/* Environmental telemetry pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 px-3 py-1 rounded-full border border-border/70 bg-card/60 backdrop-blur-md shadow-2xs text-[11px] font-mono text-muted-foreground text-center">
            <span>variant="{variant}"</span>
            <span>&bull;</span>
            <span>size="{size}"</span>
            <span>&bull;</span>
            <span>container: {containerWidth === "full" ? "100%" : `${containerWidth}px`}</span>
            {disabled && (
              <>
                <span>&bull;</span>
                <span className="text-amber-500 font-medium">disabled</span>
              </>
            )}
            {hasLongText && (
              <>
                <span>&bull;</span>
                <span className="text-primary font-medium">wrapped</span>
              </>
            )}
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
