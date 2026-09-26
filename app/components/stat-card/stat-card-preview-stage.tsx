"use client";

import * as React from "react";
import {
  StatCard,
  StatCardHeader,
  StatCardLabel,
  StatCardIcon,
  StatCardAction,
  StatCardValue,
  StatCardFooter,
  StatCardTrend,
  StatCardDescription,
  type StatTrendDirection,
  type StatTrendSentiment,
} from "@/components/ui/stat-card";
import { type CardIntensity, type CardSize, type CardVariant } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import {
  Activity01Icon,
  Clock01Icon,
  Coins01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";

export function StatCardPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // StatCard state controls
  const [size, setSize] = React.useState<CardSize>("default");
  const [intensity, setIntensity] = React.useState<CardIntensity>("subtle");
  const [variant, setVariant] = React.useState<CardVariant>("default");
  const [direction, setDirection] = React.useState<StatTrendDirection>("down");
  const [sentiment, setSentiment] = React.useState<StatTrendSentiment>("positive");
  const [showIcon, setShowIcon] = React.useState(true);
  const [metricType, setMetricType] = React.useState<"latency" | "revenue" | "requests">("latency");

  const handleReset = () => {
    setSize("default");
    setIntensity("subtle");
    setVariant("default");
    setDirection("down");
    setSentiment("positive");
    setShowIcon(true);
    setMetricType("latency");
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const metricConfigs = {
    latency: {
      label: "Round-trip Latency",
      value: "14.2 ms",
      icon: Clock01Icon,
      iconName: "Clock01Icon",
      delta: "-18.4%",
      description: "vs. 24h baseline",
    },
    revenue: {
      label: "Monthly Recurring",
      value: "₹84,320",
      icon: Coins01Icon,
      iconName: "Coins01Icon",
      delta: "+12.8%",
      description: "vs. last month",
    },
    requests: {
      label: "Active Ingress",
      value: "1,248,500",
      icon: Activity01Icon,
      iconName: "Activity01Icon",
      delta: "+4.2%",
      description: "requests / sec",
    },
  };

  const currentConfig = metricConfigs[metricType];

  const telemetry: TelemetryItem[] = [
    {
      label: "Primary Metric",
      value: currentConfig.value,
      variant: "success",
    },
    {
      label: "Direction",
      value: direction.toUpperCase(),
    },
    {
      label: "Sentiment",
      value: sentiment.toUpperCase(),
      variant: sentiment === "positive" ? "success" : sentiment === "negative" ? "warning" : "default",
    },
    {
      label: "Material",
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
  StatCard,
  StatCardHeader,
  StatCardLabel,
  StatCardIcon,
  StatCardValue,
  StatCardFooter,
  StatCardTrend,
  StatCardDescription,
} from "@/components/ui/stat-card";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ${currentConfig.iconName} } from "@hugeicons/core-free-icons";

export function SingleMetricCard() {
  return (
    <StatCard${propsStr} className="w-full max-w-xs">
      <StatCardHeader>
        <StatCardLabel>${currentConfig.label}</StatCardLabel>
        ${showIcon ? `<StatCardIcon>
          <HaloIcon icon={${currentConfig.iconName}} size={16} />
        </StatCardIcon>` : ""}
      </StatCardHeader>

      <StatCardValue>${currentConfig.value}</StatCardValue>

      <StatCardFooter>
        <StatCardTrend direction="${direction}" sentiment="${sentiment}">
          ${currentConfig.delta}
        </StatCardTrend>
        <StatCardDescription>${currentConfig.description}</StatCardDescription>
      </StatCardFooter>
    </StatCard>
  );
}`;
  }, [size, intensity, variant, direction, sentiment, showIcon, currentConfig]);

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={handleReset}
      telemetry={telemetry}
      code={generatedCode}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Metric Example"
            value={metricType}
            onValueChange={(val) => setMetricType(val as "latency" | "revenue" | "requests")}
            options={[
              { label: "Latency (Down = Good)", value: "latency" },
              { label: "Revenue (Currency)", value: "revenue" },
              { label: "Ingress (Large Integer)", value: "requests" },
            ]}
          />

          <StageControlSelect
            label="Trend Direction"
            value={direction}
            onValueChange={(val) => setDirection(val as StatTrendDirection)}
            options={[
              { label: "Down (↓ arrow)", value: "down" },
              { label: "Up (↑ arrow)", value: "up" },
              { label: "Neutral (− line)", value: "neutral" },
            ]}
          />

          <StageControlSelect
            label="Trend Sentiment"
            value={sentiment}
            onValueChange={(val) => setSentiment(val as StatTrendSentiment)}
            options={[
              { label: "Positive (Green)", value: "positive" },
              { label: "Negative (Red)", value: "negative" },
              { label: "Neutral (Muted)", value: "neutral" },
            ]}
          />

          <StageControlSelect
            label="Material Intensity"
            value={intensity}
            onValueChange={(val) => setIntensity(val as CardIntensity)}
            options={[
              { label: "Subtle (Calm Default)", value: "subtle" },
              { label: "Balanced (Feature)", value: "balanced" },
              { label: "Rich (Focal)", value: "rich" },
            ]}
          />

          <div className="flex flex-col justify-between gap-1.5 p-2 sm:p-2.5 rounded-xl border border-border/80 bg-card/75 shadow-2xs w-full min-w-0 transition-colors">
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium select-none truncate">
              Category Icon
            </span>
            <Button
              variant={showIcon ? "default" : "outline"}
              size="sm"
              className="h-8 sm:h-8.5 w-full text-xs font-normal justify-center rounded-lg"
              onClick={() => setShowIcon(!showIcon)}
            >
              {showIcon ? "Icon Visible" : "Icon Hidden"}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-2 sm:p-6">
        <StatCard
          size={size}
          intensity={intensity}
          variant={variant}
          className="w-full max-w-xs"
        >
          <StatCardHeader>
            <StatCardLabel>{currentConfig.label}</StatCardLabel>
            {showIcon && (
              <StatCardIcon>
                <HaloIcon icon={currentConfig.icon} size={16} />
              </StatCardIcon>
            )}
          </StatCardHeader>

          <StatCardValue>{currentConfig.value}</StatCardValue>

          <StatCardFooter>
            <StatCardTrend direction={direction} sentiment={sentiment}>
              {currentConfig.delta}
            </StatCardTrend>
            <StatCardDescription>{currentConfig.description}</StatCardDescription>
          </StatCardFooter>
        </StatCard>
      </div>
    </PreviewStageShell>
  );
}
