"use client";

import * as React from "react";
import {
  ArrowRight01Icon,
  SparklesIcon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/button";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

export function ButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<ButtonVariant>("default");
  const [size, setSize] = React.useState<ButtonSize>("default");
  const [disabled, setDisabled] = React.useState(false);
  const [withIcon, setWithIcon] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    const iconImport = withIcon
      ? `import { ArrowRight01Icon } from "@hugeicons/core-free-icons";\nimport { HaloIcon } from "@/components/icons/halo-icon";\n\n`
      : "";
    const propsList: string[] = [];
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (disabled) propsList.push("disabled");

    const propsStr = propsList.length > 0 ? " " + propsList.join(" ") : "";

    if (withIcon) {
      return `${iconImport}import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <Button${propsStr}>
      Create application
      <HaloIcon icon={ArrowRight01Icon} size={16} />
    </Button>
  );
}`;
    }

    return `import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <Button${propsStr}>
      Create application
    </Button>
  );
}`;
  }, [variant, size, disabled, withIcon]);

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
  };

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
      telemetry={[
        { label: "Variant", value: variant.toUpperCase(), variant: "success" },
        { label: "Size", value: size.toUpperCase() },
        {
          label: "State",
          value: disabled ? "Disabled" : "Interactive",
          variant: disabled ? "warning" : "success",
        },
        { label: "Icon Presence", value: withIcon ? "Trailing Icon" : "Text Only" },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Variant"
            value={variant}
            onValueChange={(val) => setVariant(val as ButtonVariant)}
            options={[
              { label: "Default", value: "default" },
              { label: "Secondary", value: "secondary" },
              { label: "Outline", value: "outline" },
              { label: "Ghost", value: "ghost" },
              { label: "Destructive", value: "destructive" },
              { label: "Link", value: "link" },
            ]}
          />

          <StageControlSelect
            label="Size"
            value={size}
            onValueChange={(val) => setSize(val as ButtonSize)}
            options={[
              { label: "SM (32px)", value: "sm" },
              { label: "Default (40px)", value: "default" },
              { label: "LG (48px)", value: "lg" },
              { label: "Icon (40px)", value: "icon" },
            ]}
          />

          <StageControlSelect
            label="Icon"
            value={withIcon ? "with-icon" : "no-icon"}
            onValueChange={(val) => setWithIcon(val === "with-icon")}
            options={[
              { label: "With Icon", value: "with-icon" },
              { label: "No Icon", value: "no-icon" },
            ]}
          />

          <StageControlSelect
            label="State"
            value={disabled ? "disabled" : "interactive"}
            onValueChange={(val) => setDisabled(val === "disabled")}
            options={[
              { label: "Interactive", value: "interactive" },
              { label: "Disabled", value: "disabled" },
            ]}
          />
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-6 p-6">
        {/* Realistic Action Composition */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="ghost" size={size} disabled={disabled}>
            Cancel
          </Button>

          <Button variant="secondary" size={size} disabled={disabled}>
            Save changes
          </Button>

          <Button variant={variant} size={size} disabled={disabled} className="gap-2">
            {withIcon && size !== "icon" && (
              <HaloIcon icon={SparklesIcon} size={size === "sm" ? 14 : 16} />
            )}
            {size === "icon" ? (
              <HaloIcon icon={ArrowRight01Icon} size={16} />
            ) : (
              variant === "default" ? "Create application" : "Continue"
            )}
            {withIcon && size !== "icon" && (
              <HaloIcon icon={ArrowRight01Icon} size={size === "sm" ? 13 : 15} />
            )}
          </Button>
        </div>

        {/* State metadata label */}
        <div className="inline-flex items-center justify-center gap-x-2 px-3 py-1 rounded-full border border-border/80 bg-background/80 backdrop-blur-md shadow-2xs text-[11px] font-mono text-muted-foreground text-center">
          <span>variant="{variant}"</span>
          <span>·</span>
          <span>size="{size}"</span>
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
