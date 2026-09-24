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
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

export function ButtonPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [variant, setVariant] = React.useState<ButtonVariant>("default");
  const [size, setSize] = React.useState<ButtonSize>("default");
  const [disabled, setDisabled] = React.useState(false);
  const [withIcon, setWithIcon] = React.useState(true);
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
      Continue
      <HaloIcon icon={ArrowRight01Icon} size={16} />
    </Button>
  );
}`;
    }

    return `import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <Button${propsStr}>
      Save changes
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
    setWithIcon(true);
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
      controls={
        <>
          {/* Variant Selector */}
          <StageControlGroup label="Variant">
            {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map((v) => (
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
            {(["sm", "default", "lg", "icon"] as const).map((s) => (
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
              active={withIcon}
              onClick={() => setWithIcon(!withIcon)}
            >
              Icon
            </StageControlButton>
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
        {/* Realistic Action Composition */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="ghost" size={size} disabled={disabled}>
            Cancel
          </Button>

          <Button variant="secondary" size={size} disabled={disabled}>
            Save changes
          </Button>

          <Button variant={variant} size={size} disabled={disabled} className="gap-3">
            {withIcon && size !== "icon" && (
              <HaloIcon icon={SparklesIcon} size={size === "sm" ? 14 : 16} />
            )}
            {size === "icon" ? (
              <HaloIcon icon={ArrowRight01Icon} size={16} />
            ) : (
              "Get started"
            )}
            {withIcon && size !== "icon" && (
              <span className="flex size-6 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm transition-transform group-hover/button:scale-110">
                <HaloIcon icon={ArrowRight01Icon} size={13} />
              </span>
            )}
          </Button>
        </div>

        {/* State metadata label */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted-foreground/80 text-center max-w-full px-2">
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
