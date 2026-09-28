"use client";

import * as React from "react";
import {
  Spinner,
  type SpinnerSize,
  type SpinnerVariant,
} from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
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
  { value: "480", label: "Mobile Large (480px)" },
  { value: "390", label: "iPhone Pro (390px)" },
  { value: "320", label: "Mobile Min (320px)" },
  { value: "280", label: "Micro Panel (280px)" },
  { value: "240", label: "Extreme 240px (240px)" },
];

const SCENARIOS = [
  { value: "standalone", label: "Standalone Activity" },
  { value: "button", label: "Button Saving State" },
  { value: "inline", label: "Inline With Text" },
  { value: "card", label: "Region Loading Panel" },
];

export function SpinnerPreviewStage() {
  const [size, setSize] = React.useState<SpinnerSize>("md");
  const [variant, setVariant] = React.useState<SpinnerVariant>("primary");
  const [scenario, setScenario] = React.useState("standalone");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setSize("md");
    setVariant("primary");
    setScenario("standalone");
    setContainerWidth("full");
  };

  const telemetryItems: TelemetryItem[] = [
    { label: "Indicator Role", value: "role=\"status\"" },
    { label: "Geometric Scale", value: size.toUpperCase() },
    { label: "Color Inheritance", value: variant === "default" ? "currentColor" : variant },
    { label: "Scenario", value: scenario },
  ];

  const codeSnippet =
    scenario === "button"
      ? `<Button disabled size="sm" className="gap-2">
  <Spinner size="sm" />
  <span>Saving Changes...</span>
</Button>`
      : scenario === "inline"
      ? `<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Spinner size="sm" variant="${variant}" />
  <span>Processing cluster ingress telemetry...</span>
</div>`
      : scenario === "card"
      ? `<div className="flex flex-col items-center justify-center p-8 gap-3">
  <Spinner size="${size}" variant="${variant}" />
  <span className="text-xs text-muted-foreground">Querying registry metadata...</span>
</div>`
      : `<Spinner size="${size}" variant="${variant}" />`;

  return (
    <PreviewStageShell
      title="Spinner"
      description="Indeterminate activity indicator engineered with pure SVG stroke geometry, currentColor inheritance, zero-cost CSS rotation, and reduced-motion fallbacks."
      badge="Feedback & Status 07"
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
              label="Indicator Size"
              value={size}
              options={[
                { value: "xs", label: "Extra Small (12px)" },
                { value: "sm", label: "Small (16px, Button)" },
                { value: "md", label: "Medium (20px)" },
                { value: "lg", label: "Large (24px)" },
                { value: "xl", label: "Extra Large (32px)" },
              ]}
              onChange={(val) => setSize(val as SpinnerSize)}
            />

            <StageControlSelect
              label="Color Variant"
              value={variant}
              options={[
                { value: "default", label: "Default (currentColor)" },
                { value: "primary", label: "Primary (Brand Blue)" },
                { value: "secondary", label: "Secondary" },
                { value: "success", label: "Success (Emerald)" },
                { value: "warning", label: "Warning (Amber)" },
                { value: "destructive", label: "Destructive (Rose)" },
                { value: "muted", label: "Muted Foreground" },
              ]}
              onChange={(val) => setVariant(val as SpinnerVariant)}
            />

            <StageControlSelect
              label="Composition Scenario"
              value={scenario}
              options={SCENARIOS}
              onChange={setScenario}
            />

            <StageControlSelect
              label="Container Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />
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
        <div className="p-8 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-sm flex items-center justify-center min-w-[200px]">
          {scenario === "button" ? (
            <Button disabled size="sm" className="gap-2">
              <Spinner size="sm" />
              <span>Saving Changes...</span>
            </Button>
          ) : scenario === "inline" ? (
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground break-words min-w-0">
              <Spinner size="sm" variant={variant} />
              <span>Ingesting optical shader telemetry...</span>
            </div>
          ) : scenario === "card" ? (
            <div className="flex flex-col items-center justify-center p-4 gap-3 text-center">
              <Spinner size={size} variant={variant} />
              <div className="space-y-1">
                <div className="text-xs font-semibold">Synchronizing Pipeline</div>
                <div className="text-[11px] text-muted-foreground">Compiling liquid glass shaders...</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Spinner size={size} variant={variant} />
              <span className="text-[11px] text-muted-foreground font-mono">Indeterminate Busy</span>
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
