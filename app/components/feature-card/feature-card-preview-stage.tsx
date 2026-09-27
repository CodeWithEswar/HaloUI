"use client";

import * as React from "react";
import {
  FeatureCard,
  FeatureCardVisual,
  FeatureCardTitle,
  FeatureCardDescription,
  FeatureCardContent,
  FeatureCardAction,
  type FeatureCardOrientation,
} from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { type CardIntensity, type CardSize, type CardVariant } from "@/components/ui/card";
import {
  CpuIcon,
  Shield01Icon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

export function FeatureCardPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [orientation, setOrientation] = React.useState<FeatureCardOrientation>("vertical");
  const [size, setSize] = React.useState<CardSize>("default");
  const [intensity, setIntensity] = React.useState<CardIntensity>("subtle");
  const [variant, setVariant] = React.useState<CardVariant>("default");
  const [visualMode, setVisualMode] = React.useState<"icon" | "media" | "none">("icon");
  const [showAction, setShowAction] = React.useState(true);
  const [showContent, setShowContent] = React.useState(true);
  const [isInteractive, setIsInteractive] = React.useState(false);

  const handleReset = () => {
    setOrientation("vertical");
    setSize("default");
    setIntensity("subtle");
    setVariant("default");
    setVisualMode("icon");
    setShowAction(true);
    setShowContent(true);
    setIsInteractive(false);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Orientation",
      value: orientation.toUpperCase(),
      variant: "success",
    },
    {
      label: "Visual Slot",
      value: visualMode.toUpperCase(),
      variant: "default",
    },
    {
      label: "Optical Material",
      value: `Liquid ${intensity.charAt(0).toUpperCase() + intensity.slice(1)}`,
      variant: intensity === "subtle" ? "default" : "warning",
    },
  ];

  const generatedCode = React.useMemo(() => {
    const propsList = [];
    if (orientation !== "vertical") propsList.push(`orientation="${orientation}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (intensity !== "subtle") propsList.push(`intensity="${intensity}"`);
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (isInteractive) propsList.push(`interactive`);

    const propsStr = propsList.length > 0 ? ` ${propsList.join(" ")}` : "";

    return `import * as React from "react";
import {
  FeatureCard,
  FeatureCardVisual,
  FeatureCardTitle,
  FeatureCardDescription,
  FeatureCardContent,
  FeatureCardAction,
} from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { CpuIcon, ArrowRight01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";

export function EdgeComputeFeature() {
  return (
    <FeatureCard${propsStr} className="${orientation === "horizontal" ? "w-full max-w-xl" : "w-full max-w-sm"}">
      ${visualMode === "icon" ? `<FeatureCardVisual>
        <HaloIcon icon={CpuIcon} size={20} />
      </FeatureCardVisual>` : visualMode === "media" ? `<FeatureCardVisual variant="media" className="p-3 bg-muted/40 font-mono text-[11px]">
        <div className="flex items-center justify-between text-muted-foreground pb-2 border-b border-border/40">
          <span>edge-worker.ts</span>
          <span className="text-emerald-500 font-medium">99.99% uptime</span>
        </div>
        <div className="pt-2 text-foreground">
          export default async () =&gt; Response.json({ status: &quot;ready&quot; });
        </div>
      </FeatureCardVisual>` : ""}
      <div className="space-y-1.5 min-w-0">
        <FeatureCardTitle>Edge Compute & Routing</FeatureCardTitle>
        <FeatureCardDescription>
          Execute low-latency request interception and localized cache invalidation across 320 points of presence.
        </FeatureCardDescription>
      </div>
      ${showContent ? `<FeatureCardContent>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <HaloIcon icon={CheckmarkCircle01Icon} size={14} className="text-emerald-500" />
          <span>Sub-15ms cold start p99</span>
        </div>
      </FeatureCardContent>` : ""}
      ${showAction ? `<FeatureCardAction>
        <Button size="sm" variant="outline" className="gap-1.5">
          <span>Explore architecture</span>
          <HaloIcon icon={ArrowRight01Icon} size={14} />
        </Button>
      </FeatureCardAction>` : ""}
    </FeatureCard>
  );
}`;
  }, [orientation, size, intensity, variant, visualMode, showAction, showContent, isInteractive]);

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={telemetry}
      code={generatedCode}
      controls={
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StageControlSelect
              label="Orientation"
              value={orientation}
              onChange={(val) => setOrientation(val as FeatureCardOrientation)}
              options={[
                { value: "vertical", label: "Vertical (Stacked)" },
                { value: "horizontal", label: "Horizontal (Row)" },
              ]}
            />

            <StageControlSelect
              label="Size Scale"
              value={size}
              onChange={(val) => setSize(val as CardSize)}
              options={[
                { value: "sm", label: "Small (Compact)" },
                { value: "default", label: "Default" },
                { value: "lg", label: "Large (Featured)" },
              ]}
            />

            <StageControlSelect
              label="Visual Slot"
              value={visualMode}
              onChange={(val) => setVisualMode(val as "icon" | "media" | "none")}
              options={[
                { value: "icon", label: "Icon Container" },
                { value: "media", label: "Media / Code Slot" },
                { value: "none", label: "None (Minimal)" },
              ]}
            />

            <StageControlSelect
              label="Intensity"
              value={intensity}
              onChange={(val) => setIntensity(val as CardIntensity)}
              options={[
                { value: "subtle", label: "Subtle (2px blur)" },
                { value: "balanced", label: "Balanced (8px blur)" },
                { value: "rich", label: "Rich (16px blur)" },
              ]}
            />
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="feature-toggle-action"
                checked={showAction}
                onCheckedChange={(checked) => setShowAction(Boolean(checked))}
              />
              <Label
                htmlFor="feature-toggle-action"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Action Slot
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="feature-toggle-content"
                checked={showContent}
                onCheckedChange={(checked) => setShowContent(Boolean(checked))}
              />
              <Label
                htmlFor="feature-toggle-content"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Highlight Slot
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="feature-toggle-interactive"
                checked={isInteractive}
                onCheckedChange={(checked) => setIsInteractive(Boolean(checked))}
              />
              <Label
                htmlFor="feature-toggle-interactive"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Interactive
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-4">
        <FeatureCard
          orientation={orientation}
          size={size}
          intensity={intensity}
          variant={variant}
          interactive={isInteractive}
          className={
            orientation === "horizontal"
              ? "w-full max-w-xl"
              : "w-full max-w-sm"
          }
        >
          {visualMode === "icon" && (
            <FeatureCardVisual>
              <HaloIcon icon={CpuIcon} size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
            </FeatureCardVisual>
          )}

          {visualMode === "media" && (
            <FeatureCardVisual variant="media" className="p-3 bg-muted/40 font-mono text-[11px]">
              <div className="flex items-center justify-between text-muted-foreground pb-2 border-b border-border/40">
                <span className="font-semibold">edge-worker.ts</span>
                <span className="text-emerald-500 font-medium">99.99% uptime</span>
              </div>
              <div className="pt-2 text-foreground font-normal">
                export default async () =&gt; Response.json(&#123; status: &quot;ready&quot; &#125;);
              </div>
            </FeatureCardVisual>
          )}

          <div className="space-y-1.5 min-w-0">
            <FeatureCardTitle>Edge Compute & Routing</FeatureCardTitle>
            <FeatureCardDescription>
              Execute low-latency request interception and localized cache invalidation across 320 points of presence.
            </FeatureCardDescription>
          </div>

          {showContent && (
            <FeatureCardContent>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HaloIcon icon={CheckmarkCircle01Icon} size={14} className="text-emerald-500 shrink-0" />
                <span>Sub-15ms cold start p99 latency SLA</span>
              </div>
            </FeatureCardContent>
          )}

          {showAction && (
            <FeatureCardAction>
              <Button size="sm" variant="outline" className="gap-1.5">
                <span>Explore architecture</span>
                <HaloIcon icon={ArrowRight01Icon} size={14} />
              </Button>
            </FeatureCardAction>
          )}
        </FeatureCard>
      </div>
    </PreviewStageShell>
  );
}
