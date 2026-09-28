"use client";

import * as React from "react";
import {
  CircularProgress,
  type CircularProgressSize,
  type CircularProgressVariant,
  type CircularProgressIntensity,
} from "@/components/ui/circular-progress";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const CONTAINER_WIDTH_OPTIONS = [
  { value: "full", label: "Full Container (100%)" },
  { value: "1024", label: "Desktop (1024px)" },
  { value: "768", label: "Tablet (768px)" },
  { value: "640", label: "Phablet (640px)" },
  { value: "480", label: "Mobile Large (480px)" },
  { value: "390", label: "iPhone Pro (390px)" },
  { value: "320", label: "Mobile Min (320px)" },
  { value: "280", label: "Micro Panel (280px)" },
  { value: "240", label: "Extreme 240px (240px)" },
];

export function CircularProgressPreviewStage() {
  const [value, setValue] = React.useState<number | null>(72);
  const [size, setSize] = React.useState<CircularProgressSize>("xl");
  const [variant, setVariant] = React.useState<CircularProgressVariant>("default");
  const [intensity, setIntensity] = React.useState<CircularProgressIntensity>("subtle");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [showValue, setShowValue] = React.useState(true);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setValue(72);
    setSize("xl");
    setVariant("default");
    setIntensity("subtle");
    setContainerWidth("full");
    setShowValue(true);
  };

  const isIndeterminate = value === null;

  const telemetryItems: TelemetryItem[] = [
    { label: "Completion", value: isIndeterminate ? "Indeterminate" : `${value}%` },
    { label: "Scale Size", value: size.toUpperCase() },
    { label: "Semantic Tone", value: variant },
    { label: "Material Mode", value: intensity },
  ];

  const codeSnippet = `<CircularProgress
  value={${isIndeterminate ? "null" : value}}
  size="${size}"
  variant="${variant}"
  intensity="${intensity}"${showValue ? '\n  showValue' : ''}
/>`;

  return (
    <PreviewStageShell
      title="Circular Progress"
      description="Compact radial completion indicator engineered with scalable SVG coordinate geometry, Subtle Liquid Glass track channels, and WAI-ARIA progressbar semantics."
      badge="Feedback & Status 06"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      telemetry={telemetryItems}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={handleReset}
      code={codeSnippet}
      controls={
        <div className="w-full flex flex-col gap-2.5">
          {/* Main Controls Row: Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Radial Size"
              value={size}
              options={[
                { value: "sm", label: "Small (32px)" },
                { value: "md", label: "Medium (48px)" },
                { value: "lg", label: "Large (64px)" },
                { value: "xl", label: "Extra Large (96px)" },
                { value: "2xl", label: "Hero 2XL (128px)" },
              ]}
              onChange={(val) => setSize(val as CircularProgressSize)}
            />

            <StageControlSelect
              label="Semantic Tone"
              value={variant}
              options={[
                { value: "default", label: "Default (Brand Primary)" },
                { value: "success", label: "Success (Emerald)" },
                { value: "warning", label: "Warning (Amber)" },
                { value: "destructive", label: "Destructive (Rose)" },
                { value: "info", label: "Info (Sky)" },
                { value: "neutral", label: "Neutral (Zinc)" },
              ]}
              onChange={(val) => setVariant(val as CircularProgressVariant)}
            />

            <StageControlSelect
              label="Material Intensity"
              value={intensity}
              options={[
                { value: "subtle", label: "Subtle (Reading Channel)" },
                { value: "balanced", label: "Balanced (High Contrast)" },
                { value: "plain", label: "Plain (Solid Base)" },
              ]}
              onChange={(val) => setIntensity(val as CircularProgressIntensity)}
            />

            <StageControlSelect
              label="Container Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />
          </div>

          {/* Quick Value Presets & Interactive Flags */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-border/40 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-medium mr-1 text-foreground/80">Value:</span>
              {[0, 25, 50, 75, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setValue(preset)}
                  className={cn(
                    "px-2 py-0.5 rounded text-[11px] font-mono border transition-all",
                    value === preset
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background/80 hover:bg-muted border-border/70"
                  )}
                >
                  {preset}%
                </button>
              ))}
              <button
                type="button"
                onClick={() => setValue(isIndeterminate ? 72 : null)}
                className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-mono border transition-all",
                  isIndeterminate
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background/80 hover:bg-muted border-border/70"
                )}
              >
                Indeterminate
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <Checkbox
                id="circular-show-value"
                checked={showValue}
                onCheckedChange={(checked) => setShowValue(Boolean(checked))}
              />
              <Label htmlFor="circular-show-value" className="text-xs cursor-pointer select-none">
                Show Center %
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div
        className={cn(
          "w-full transition-all duration-300 ease-out flex justify-center py-10 px-4",
          containerWidth !== "full" && "mx-auto"
        )}
        style={{
          maxWidth: containerWidth === "full" ? "100%" : `${containerWidth}px`,
        }}
      >
        <div className="p-8 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-sm flex flex-col items-center justify-center gap-3">
          <CircularProgress
            value={value}
            size={size}
            variant={variant}
            intensity={intensity}
            showValue={showValue}
          />
          <span className="text-xs font-medium text-muted-foreground">
            {isIndeterminate ? "Synchronizing Asset Pipeline..." : "GPU Buffer Utilization"}
          </span>
        </div>
      </div>
    </PreviewStageShell>
  );
}
