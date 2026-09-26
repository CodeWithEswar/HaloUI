"use client";

import * as React from "react";
import {
  KpiCard,
  KpiCardHeader,
  KpiCardLabel,
  KpiCardAction,
  KpiCardValue,
  KpiCardTrend,
  KpiCardComparison,
  KpiCardTarget,
  KpiCardTargetLabel,
  KpiCardTargetValue,
  KpiCardTargetStatus,
  KpiCardProgress,
  KpiCardChart,
  KpiCardFooter,
  type KpiTrendDirection,
  type KpiTrendSentiment,
  type KpiTargetSentiment,
} from "@/components/ui/kpi-card";
import { type CardIntensity, type CardSize, type CardVariant } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import {
  InformationCircleIcon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";

export function KpiCardPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // KPI Card state controls
  const [size, setSize] = React.useState<CardSize>("default");
  const [intensity, setIntensity] = React.useState<CardIntensity>("subtle");
  const [variant, setVariant] = React.useState<CardVariant>("default");
  const [direction, setDirection] = React.useState<KpiTrendDirection>("up");
  const [sentiment, setSentiment] = React.useState<KpiTrendSentiment>("positive");
  const [showTarget, setShowTarget] = React.useState(true);
  const [showProgress, setShowProgress] = React.useState(true);
  const [showChart, setShowChart] = React.useState(true);
  const [metricType, setMetricType] = React.useState<"availability" | "latency" | "errors" | "mrr">("availability");

  const handleReset = () => {
    setSize("default");
    setIntensity("subtle");
    setVariant("default");
    setDirection("up");
    setSentiment("positive");
    setShowTarget(true);
    setShowProgress(true);
    setShowChart(true);
    setMetricType("availability");
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const metricConfigs = {
    availability: {
      label: "API Service Availability",
      value: "99.982%",
      delta: "+0.021%",
      comparison: "vs previous 30 days",
      target: "99.95%",
      targetStatus: "Above SLA",
      targetSentiment: "positive" as KpiTargetSentiment,
      progress: 99.98,
      defaultDirection: "up" as KpiTrendDirection,
      defaultSentiment: "positive" as KpiTrendSentiment,
      sparklinePoints: "M 0,28 Q 20,25 40,26 T 80,18 T 120,15 T 160,12 T 200,8",
    },
    latency: {
      label: "Round-trip P95 Latency",
      value: "14.2 ms",
      delta: "-18.4%",
      comparison: "vs 24h baseline",
      target: "< 25.0 ms",
      targetStatus: "Within SLA",
      targetSentiment: "positive" as KpiTargetSentiment,
      progress: 85,
      defaultDirection: "down" as KpiTrendDirection,
      defaultSentiment: "positive" as KpiTrendSentiment,
      sparklinePoints: "M 0,10 Q 30,12 60,18 T 120,24 T 160,26 T 200,32",
    },
    errors: {
      label: "Unhandled Error Rate",
      value: "0.018%",
      delta: "+0.006%",
      comparison: "since last deployment",
      target: "< 0.050%",
      targetStatus: "Elevated",
      targetSentiment: "warning" as KpiTargetSentiment,
      progress: 36,
      defaultDirection: "up" as KpiTrendDirection,
      defaultSentiment: "negative" as KpiTrendSentiment,
      sparklinePoints: "M 0,30 Q 30,30 60,28 T 120,22 T 160,14 T 200,8",
    },
    mrr: {
      label: "Monthly Recurring Revenue",
      value: "₹1,48,200",
      delta: "+14.6%",
      comparison: "vs previous month",
      target: "₹1,50,000",
      targetStatus: "98.8% of goal",
      targetSentiment: "positive" as KpiTargetSentiment,
      progress: 98.8,
      defaultDirection: "up" as KpiTrendDirection,
      defaultSentiment: "positive" as KpiTrendSentiment,
      sparklinePoints: "M 0,32 Q 25,29 50,26 T 100,20 T 150,14 T 200,6",
    },
  };

  const currentConfig = metricConfigs[metricType];

  const telemetry: TelemetryItem[] = [
    {
      label: "KPI Value",
      value: currentConfig.value,
      variant: "success",
    },
    {
      label: "Direction / Sentiment",
      value: `${direction.toUpperCase()} / ${sentiment.toUpperCase()}`,
      variant: sentiment === "positive" ? "success" : sentiment === "negative" ? "warning" : "default",
    },
    {
      label: "Target Standing",
      value: currentConfig.targetStatus,
      variant: currentConfig.targetSentiment === "positive" ? "success" : "warning",
    },
    {
      label: "Optical Material",
      value: `Liquid ${intensity.charAt(0).toUpperCase() + intensity.slice(1)}`,
      variant: intensity === "subtle" ? "default" : "warning",
    },
  ];

  const generatedCode = React.useMemo(() => {
    const propsList = [];
    if (size !== "default") propsList.push(`size="${size}"`);
    if (intensity !== "subtle") propsList.push(`intensity="${intensity}"`);
    if (variant !== "default") propsList.push(`variant="${variant}"`);

    const propsStr = propsList.length > 0 ? ` ${propsList.join(" ")}` : "";

    return `import * as React from "react";
import {
  KpiCard,
  KpiCardHeader,
  KpiCardLabel,
  KpiCardAction,
  KpiCardValue,
  KpiCardTrend,
  KpiCardComparison,
  KpiCardTarget,
  KpiCardTargetLabel,
  KpiCardTargetValue,
  KpiCardTargetStatus,
  KpiCardProgress,
  KpiCardChart,
  KpiCardFooter,
} from "@/components/ui/kpi-card";
import { HaloIcon } from "@/components/icons/halo-icon";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

export function SingleKpiCard() {
  return (
    <KpiCard${propsStr} className="w-full max-w-sm">
      <KpiCardHeader>
        <KpiCardLabel>${currentConfig.label}</KpiCardLabel>
        <KpiCardAction>
          <button className="text-muted-foreground hover:text-foreground">
            <HaloIcon icon={InformationCircleIcon} size={15} />
          </button>
        </KpiCardAction>
      </KpiCardHeader>

      <KpiCardValue>${currentConfig.value}</KpiCardValue>

      <KpiCardFooter>
        <KpiCardTrend direction="${direction}" sentiment="${sentiment}">
          ${currentConfig.delta}
        </KpiCardTrend>
        <KpiCardComparison>${currentConfig.comparison}</KpiCardComparison>
      </KpiCardFooter>
${showChart ? `
      <KpiCardChart>
        <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 40">
          <path
            d="${currentConfig.sparklinePoints}"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/70"
          />
        </svg>
      </KpiCardChart>` : ""}${showProgress ? `
      <KpiCardProgress value={${currentConfig.progress}} sentiment="${currentConfig.targetSentiment}" />` : ""}${showTarget ? `
      <KpiCardTarget>
        <KpiCardTargetLabel>Target: <KpiCardTargetValue>${currentConfig.target}</KpiCardTargetValue></KpiCardTargetLabel>
        <KpiCardTargetStatus sentiment="${currentConfig.targetSentiment}">${currentConfig.targetStatus}</KpiCardTargetStatus>
      </KpiCardTarget>` : ""}
    </KpiCard>
  );
}`;
  }, [size, intensity, variant, direction, sentiment, showTarget, showProgress, showChart, currentConfig]);

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
              label="Metric Example"
              value={metricType}
              onChange={(val) => {
                const key = val as keyof typeof metricConfigs;
                setMetricType(key);
                setDirection(metricConfigs[key].defaultDirection);
                setSentiment(metricConfigs[key].defaultSentiment);
              }}
              options={[
                { value: "availability", label: "Availability" },
                { value: "latency", label: "Latency (P95)" },
                { value: "errors", label: "Error Rate" },
                { value: "mrr", label: "Revenue (MRR)" },
              ]}
            />

            <StageControlSelect
              label="Trend Direction"
              value={direction}
              onChange={(val) => setDirection(val as KpiTrendDirection)}
              options={[
                { value: "up", label: "Up (↑)" },
                { value: "down", label: "Down (↓)" },
                { value: "neutral", label: "Flat (—)" },
              ]}
            />

            <StageControlSelect
              label="Trend Sentiment"
              value={sentiment}
              onChange={(val) => setSentiment(val as KpiTrendSentiment)}
              options={[
                { value: "positive", label: "Positive (Green)" },
                { value: "negative", label: "Negative (Red)" },
                { value: "neutral", label: "Neutral (Muted)" },
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

          <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-border/40 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={showTarget}
                onChange={(e) => setShowTarget(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20"
              />
              Target Row
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={showProgress}
                onChange={(e) => setShowProgress(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20"
              />
              Target Progress
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={showChart}
                onChange={(e) => setShowChart(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20"
              />
              Sparkline
            </label>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-4">
        <KpiCard
          size={size}
          intensity={intensity}
          variant={variant}
          className="w-full max-w-sm"
        >
          <KpiCardHeader>
            <KpiCardLabel>{currentConfig.label}</KpiCardLabel>
            <KpiCardAction>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md"
                aria-label="More information"
              >
                <HaloIcon icon={InformationCircleIcon} size={15} />
              </button>
            </KpiCardAction>
          </KpiCardHeader>

          <KpiCardValue>{currentConfig.value}</KpiCardValue>

          <KpiCardFooter>
            <KpiCardTrend direction={direction} sentiment={sentiment}>
              {currentConfig.delta}
            </KpiCardTrend>
            <KpiCardComparison>{currentConfig.comparison}</KpiCardComparison>
          </KpiCardFooter>

          {showChart && (
            <KpiCardChart>
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 40">
                <path
                  d={currentConfig.sparklinePoints}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={
                    sentiment === "positive"
                      ? "text-emerald-500/80 dark:text-emerald-400/80"
                      : sentiment === "negative"
                      ? "text-rose-500/80 dark:text-rose-400/80"
                      : "text-muted-foreground/60"
                  }
                />
              </svg>
            </KpiCardChart>
          )}

          {showProgress && (
            <KpiCardProgress
              value={currentConfig.progress}
              sentiment={currentConfig.targetSentiment}
            />
          )}

          {showTarget && (
            <KpiCardTarget>
              <KpiCardTargetLabel>
                Target: <KpiCardTargetValue>{currentConfig.target}</KpiCardTargetValue>
              </KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment={currentConfig.targetSentiment}>
                {currentConfig.targetStatus}
              </KpiCardTargetStatus>
            </KpiCardTarget>
          )}
        </KpiCard>
      </div>
    </PreviewStageShell>
  );
}
