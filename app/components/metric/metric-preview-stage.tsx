"use client";

import * as React from "react";
import {
  Metric,
  MetricLabel,
  MetricValue,
  MetricUnit,
  MetricDescription,
  MetricDelta,
  type MetricVariant,
  type MetricSize,
  type MetricLayout,
  type MetricAlignment,
} from "@/components/ui/metric";
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
  { value: "480", label: "Mobile Wide (480px)" },
  { value: "390", label: "iPhone 15 Pro (390px)" },
  { value: "320", label: "Small Device (320px)" },
  { value: "280", label: "Compact Rail (280px)" },
  { value: "240", label: "Strict QA Min (240px)" },
];

const SCENARIO_OPTIONS = [
  { value: "standard", label: "Integer (12,480)" },
  { value: "zero", label: "Zero (0) Valid Metric" },
  { value: "negative", label: "Negative Offset (-45 ms)" },
  { value: "percent", label: "Decimal Percentage (99.98%)" },
  { value: "currency", label: "Currency Formatted (₹84,320)" },
  { value: "precision", label: "High Precision (99.9999%)" },
  { value: "large", label: "Large Value (1,234,567,890)" },
];

export function MetricPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Metric configuration states
  const [variant, setVariant] = React.useState<MetricVariant>("glass");
  const [size, setSize] = React.useState<MetricSize>("lg");
  const [layout, setLayout] = React.useState<MetricLayout>("stacked");
  const [alignment, setAlignment] = React.useState<MetricAlignment>("left");
  const [scenario, setScenario] = React.useState("standard");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [showUnit, setShowUnit] = React.useState(true);
  const [showDescription, setShowDescription] = React.useState(true);
  const [showDelta, setShowDelta] = React.useState(true);

  const handleReset = () => {
    setVariant("glass");
    setSize("lg");
    setLayout("stacked");
    setAlignment("left");
    setScenario("standard");
    setContainerWidth("full");
    setShowUnit(true);
    setShowDescription(true);
    setShowDelta(true);
    setBackdrop("mesh");
    setViewport("desktop");
  };

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
        return "max-w-md";
    }
  };

  // Scenario data resolution
  const scenarioData = React.useMemo(() => {
    switch (scenario) {
      case "zero":
        return {
          label: "Active Error Rate",
          value: 0,
          unit: "%",
          description: "Zero errors detected in current 15-minute window",
          deltaText: "0.0% vs baseline",
          deltaDir: "neutral" as const,
          deltaSentiment: "positive" as const,
        };
      case "negative":
        return {
          label: "Latency Shift",
          value: -45,
          unit: "ms",
          description: "Faster than rolling 7-day average response time",
          deltaText: "-12.4% faster",
          deltaDir: "down" as const,
          deltaSentiment: "positive" as const, // decoupled: down latency is positive
        };
      case "percent":
        return {
          label: "API Reliability SLA",
          value: "99.98",
          unit: "%",
          description: "Continuous availability measured over 30 days",
          deltaText: "+0.04% vs last mo",
          deltaDir: "up" as const,
          deltaSentiment: "positive" as const,
        };
      case "currency":
        return {
          label: "Monthly Cloud Run Rate",
          value: "₹84,320",
          unit: "",
          description: "Projected monthly infrastructure expenditure",
          deltaText: "+₹4,120 vs budget",
          deltaDir: "up" as const,
          deltaSentiment: "negative" as const, // decoupled: increased expenditure is negative
        };
      case "precision":
        return {
          label: "Cache Hit Ratio",
          value: "99.9999",
          unit: "%",
          description: "Multi-region edge cluster memory hit probability",
          deltaText: "+0.0012% drift",
          deltaDir: "up" as const,
          deltaSentiment: "positive" as const,
        };
      case "large":
        return {
          label: "Processed Telemetry Events",
          value: "1,234,567,890",
          unit: "events",
          description: "Total stream events ingested into warehouse",
          deltaText: "+18.2M today",
          deltaDir: "up" as const,
          deltaSentiment: "neutral" as const,
        };
      default:
        return {
          label: "Active Concurrent Sessions",
          value: "12,480",
          unit: "users",
          description: "Verified authenticated client sessions across all regions",
          deltaText: "+8.4% vs peak hour",
          deltaDir: "up" as const,
          deltaSentiment: "positive" as const,
        };
    }
  }, [scenario]);

  const telemetry: TelemetryItem[] = [
    {
      label: "Variant",
      value: variant.toUpperCase(),
      variant: "default",
    },
    {
      label: "Size",
      value: size.toUpperCase(),
      variant: "default",
    },
    {
      label: "Layout",
      value: layout.toUpperCase(),
      variant: "default",
    },
    {
      label: "Scenario",
      value: scenario.toUpperCase(),
      variant: scenario === "zero" ? "success" : "default",
    },
    {
      label: "Tabular Nums",
      value: "CSS ENABLED",
      variant: "default",
    },
    {
      label: "Optics",
      value: variant === "glass" ? "SUBTLE GLASS" : "FLAT BASE",
      variant: "default",
    },
  ];

  const codeSnippet = `<Metric
  variant="${variant}"
  size="${size}"
  layout="${layout}"
  alignment="${alignment}"
>
  <MetricLabel>${scenarioData.label}</MetricLabel>
  <div className="flex items-baseline gap-1.5 min-w-0">
    <MetricValue>${scenarioData.value}</MetricValue>${
    showUnit && scenarioData.unit ? `\n    <MetricUnit>${scenarioData.unit}</MetricUnit>` : ""
  }
  </div>${
    showDelta
      ? `\n  <MetricDelta direction="${scenarioData.deltaDir}" sentiment="${scenarioData.deltaSentiment}">
    ${scenarioData.deltaText}
  </MetricDelta>`
      : ""
  }${
    showDescription
      ? `\n  <MetricDescription>${scenarioData.description}</MetricDescription>`
      : ""
  }
</Metric>`;

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
      code={codeSnippet}
      controls={
        <div className="w-full flex flex-col gap-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Variant"
              value={variant}
              options={[
                { value: "glass", label: "Glass (Standalone)" },
                { value: "default", label: "Default (Flat / Nested)" },
                { value: "muted", label: "Muted Surface" },
              ]}
              onChange={(val) => setVariant(val as MetricVariant)}
            />

            <StageControlSelect
              label="Size"
              value={size}
              options={[
                { value: "sm", label: "Small (SM)" },
                { value: "default", label: "Default (MD)" },
                { value: "lg", label: "Large (LG)" },
                { value: "xl", label: "Hero (XL)" },
                { value: "2xl", label: "Showcase (2XL)" },
              ]}
              onChange={(val) => setSize(val as MetricSize)}
            />

            <StageControlSelect
              label="Layout"
              value={layout}
              options={[
                { value: "stacked", label: "Stacked" },
                { value: "inline", label: "Inline" },
                { value: "auto", label: "Auto (Reflow)" },
              ]}
              onChange={(val) => setLayout(val as MetricLayout)}
            />

            <StageControlSelect
              label="Align"
              value={alignment}
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
              onChange={(val) => setAlignment(val as MetricAlignment)}
            />

            <StageControlSelect
              label="Scenario"
              value={scenario}
              options={SCENARIO_OPTIONS}
              onChange={setScenario}
            />

            <StageControlSelect
              label="Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="metric-unit-toggle"
                  checked={showUnit}
                  onCheckedChange={(checked) => setShowUnit(Boolean(checked))}
                />
                <Label htmlFor="metric-unit-toggle" className="text-xs cursor-pointer select-none">
                  Unit
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="metric-delta-toggle"
                  checked={showDelta}
                  onCheckedChange={(checked) => setShowDelta(Boolean(checked))}
                />
                <Label htmlFor="metric-delta-toggle" className="text-xs cursor-pointer select-none">
                  Delta
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="metric-desc-toggle"
                  checked={showDescription}
                  onCheckedChange={(checked) => setShowDescription(Boolean(checked))}
                />
                <Label htmlFor="metric-desc-toggle" className="text-xs cursor-pointer select-none">
                  Desc
                </Label>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-4">
        <div
          className={cn(
            "w-full transition-all duration-200",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          <Metric
            variant={variant}
            size={size}
            layout={layout}
            alignment={alignment}
            className="w-full"
          >
            <MetricLabel>{scenarioData.label}</MetricLabel>
            <div className="flex items-baseline gap-1.5 min-w-0">
              <MetricValue>{scenarioData.value}</MetricValue>
              {showUnit && scenarioData.unit && (
                <MetricUnit>{scenarioData.unit}</MetricUnit>
              )}
            </div>
            {showDelta && (
              <MetricDelta
                direction={scenarioData.deltaDir}
                sentiment={scenarioData.deltaSentiment}
              >
                {scenarioData.deltaText}
              </MetricDelta>
            )}
            {showDescription && (
              <MetricDescription>{scenarioData.description}</MetricDescription>
            )}
          </Metric>
        </div>
      </div>
    </PreviewStageShell>
  );
}
