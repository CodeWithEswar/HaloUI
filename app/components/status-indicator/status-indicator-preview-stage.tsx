"use client";

import * as React from "react";
import {
  StatusIndicator,
  type StatusIndicatorIntent,
  type StatusIndicatorSize,
} from "@/components/ui/status-indicator";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  CancelCircleIcon,
  InformationCircleIcon,
  MinusSignCircleIcon,
} from "@hugeicons/core-free-icons";
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
  { value: "standalone", label: "Standalone Indicator" },
  { value: "table-cell", label: "Data Table Row" },
  { value: "card", label: "Service Health Card" },
  { value: "long-label", label: "Long Status Text" },
];

export function StatusIndicatorPreviewStage() {
  const [intent, setIntent] = React.useState<StatusIndicatorIntent>("positive");
  const [size, setSize] = React.useState<StatusIndicatorSize>("md");
  const [mode, setMode] = React.useState<"dot" | "icon" | "pulse">("dot");
  const [scenario, setScenario] = React.useState("standalone");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setIntent("positive");
    setSize("md");
    setMode("dot");
    setScenario("standalone");
    setContainerWidth("full");
  };

  const getLabelForIntent = (i: StatusIndicatorIntent) => {
    switch (i) {
      case "positive": return "Operational";
      case "warning": return "Degraded Performance";
      case "destructive": return "Critical Outage";
      case "info": return "Synchronizing";
      case "neutral": return "Maintenance Mode";
    }
  };

  const getIconForIntent = (i: StatusIndicatorIntent, sz: StatusIndicatorSize) => {
    const pxSize = sz === "sm" ? 14 : sz === "lg" ? 18 : 16;
    switch (i) {
      case "positive": return <HaloIcon icon={CheckmarkCircle01Icon} size={pxSize} />;
      case "warning": return <HaloIcon icon={AlertCircleIcon} size={pxSize} />;
      case "destructive": return <HaloIcon icon={CancelCircleIcon} size={pxSize} />;
      case "info": return <HaloIcon icon={InformationCircleIcon} size={pxSize} />;
      case "neutral": return <HaloIcon icon={MinusSignCircleIcon} size={pxSize} />;
    }
  };

  const telemetryItems: TelemetryItem[] = [
    { label: "Semantic Intent", value: intent },
    { label: "Size Scale", value: size },
    { label: "Indicator Mode", value: mode },
    { label: "Scenario", value: scenario },
  ];

  const codeSnippet = mode === "icon"
    ? `<StatusIndicator
  intent="${intent}"
  size="${size}"
  icon={<HaloIcon icon={${intent === "positive" ? "CheckmarkCircle01Icon" : intent === "warning" ? "AlertCircleIcon" : intent === "destructive" ? "CancelCircleIcon" : intent === "info" ? "InformationCircleIcon" : "MinusSignCircleIcon"}} />}
  label="${getLabelForIntent(intent)}"
/>`
    : `<StatusIndicator
  intent="${intent}"
  size="${size}"
  ${mode === "pulse" ? 'pulse={true}\n  ' : ''}label="${getLabelForIntent(intent)}"
/>`;

  return (
    <PreviewStageShell
      title="Status Indicator"
      description="Dot/icon + text state representation engineered for high-density tables, lists, and cards with minimal near-flat Liquid Glass optics and zero layout overhead."
      badge="Feedback & Status 10"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Semantic Intent"
              value={intent}
              options={[
                { value: "positive", label: "Positive (Operational)" },
                { value: "warning", label: "Warning (Degraded)" },
                { value: "destructive", label: "Destructive (Outage)" },
                { value: "info", label: "Info (Synchronizing)" },
                { value: "neutral", label: "Neutral (Maintenance)" },
              ]}
              onChange={(val) => setIntent(val as StatusIndicatorIntent)}
            />

            <StageControlSelect
              label="Size Scale"
              value={size}
              options={[
                { value: "sm", label: "Small (xs text, 6px dot)" },
                { value: "md", label: "Medium (sm text, 8px dot)" },
                { value: "lg", label: "Large (base text, 10px dot)" },
              ]}
              onChange={(val) => setSize(val as StatusIndicatorSize)}
            />

            <StageControlSelect
              label="Visual Style"
              value={mode}
              options={[
                { value: "dot", label: "Optical Dot (Default)" },
                { value: "icon", label: "Hugeicons Icon" },
                { value: "pulse", label: "Pulse Dot (Optional)" },
              ]}
              onChange={(val) => setMode(val as "dot" | "icon" | "pulse")}
            />

            <StageControlSelect
              label="Scenario"
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
          "w-full transition-all duration-300 ease-out flex justify-center py-8 px-4",
          containerWidth !== "full" && "mx-auto"
        )}
        style={{
          maxWidth: containerWidth === "full" ? "100%" : `${containerWidth}px`,
        }}
      >
        {scenario === "standalone" && (
          <div className="p-6 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-md flex items-center justify-center">
            <StatusIndicator
              intent={intent}
              size={size}
              pulse={mode === "pulse"}
              icon={mode === "icon" ? getIconForIntent(intent, size) : undefined}
              label={getLabelForIntent(intent)}
            />
          </div>
        )}

        {scenario === "table-cell" && (
          <div className="w-full max-w-md rounded-xl border border-border/60 bg-background/60 backdrop-blur-md overflow-hidden">
            <div className="p-3 bg-muted/30 border-b border-border/40 text-xs font-semibold flex justify-between">
              <span>Service Name</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-border/20 text-xs sm:text-sm">
              <div className="p-3 flex items-center justify-between">
                <span className="font-mono">api-gateway-us-east</span>
                <StatusIndicator
                  intent={intent}
                  size={size}
                  pulse={mode === "pulse"}
                  icon={mode === "icon" ? getIconForIntent(intent, size) : undefined}
                  label={getLabelForIntent(intent)}
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="font-mono">cache-redis-replica</span>
                <StatusIndicator intent="positive" size={size} label="Operational" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="font-mono">auth-vault-primary</span>
                <StatusIndicator intent="positive" size={size} label="Operational" />
              </div>
            </div>
          </div>
        )}

        {scenario === "card" && (
          <div className="w-full max-w-sm p-5 rounded-2xl border border-border/60 bg-background/60 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Edge Computing CDN</h4>
              <StatusIndicator
                intent={intent}
                size={size}
                pulse={mode === "pulse"}
                icon={mode === "icon" ? getIconForIntent(intent, size) : undefined}
                label={getLabelForIntent(intent)}
              />
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Active Points of Presence: 240+ global cities</p>
              <p>Edge Cache Hit Ratio: 98.4%</p>
            </div>
          </div>
        )}

        {scenario === "long-label" && (
          <div className="w-full max-w-xs p-4 rounded-xl border border-border/60 bg-background/60 backdrop-blur-md">
            <StatusIndicator
              intent={intent}
              size={size}
              pulse={mode === "pulse"}
              icon={mode === "icon" ? getIconForIntent(intent, size) : undefined}
              label="Awaiting organization administrator security validation"
            />
          </div>
        )}
      </div>
    </PreviewStageShell>
  );
}
