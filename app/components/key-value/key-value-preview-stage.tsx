"use client";

import * as React from "react";
import {
  KeyValue,
  KeyValueLabel,
  KeyValueValue,
  KeyValueGroup,
  type KeyValueVariant,
  type KeyValueLayout,
  type KeyValueDensity,
} from "@/components/ui/key-value";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Globe02Icon,
  CpuIcon,
  Shield01Icon,
  DatabaseIcon,
  Clock01Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons";
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

export function KeyValuePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Key Value configuration states
  const [variant, setVariant] = React.useState<KeyValueVariant>("glass");
  const [layout, setLayout] = React.useState<KeyValueLayout>("auto");
  const [density, setDensity] = React.useState<KeyValueDensity>("default");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [hasLongText, setHasLongText] = React.useState(false);
  const [richValues, setRichValues] = React.useState(true);

  const handleReset = () => {
    setVariant("glass");
    setLayout("auto");
    setDensity("default");
    setContainerWidth("full");
    setHasLongText(false);
    setRichValues(true);
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
        return "max-w-xl";
    }
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Variant",
      value: variant.toUpperCase(),
      variant: "default",
    },
    {
      label: "Layout",
      value: layout.toUpperCase(),
      variant: "default",
    },
    {
      label: "Density",
      value: density.toUpperCase(),
      variant: "default",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Material",
      value: "Restrained",
      variant: "success",
    },
  ];

  const codeSnippet = `<KeyValueGroup columns={1}>
  <KeyValue variant="${variant}" layout="${layout}" density="${density}">
    <KeyValueLabel icon={<HaloIcon icon={Globe02Icon} />}>Edge Region</KeyValueLabel>
    <KeyValueValue>ap-south-1 (Mumbai)</KeyValueValue>
  </KeyValue>

  <KeyValue variant="${variant}" layout="${layout}" density="${density}">
    <KeyValueLabel icon={<HaloIcon icon={Shield01Icon} />}>Security Status</KeyValueLabel>
    <KeyValueValue>
      <StatusBadge tone="positive">Compliant</StatusBadge>
    </KeyValueValue>
  </KeyValue>

  <KeyValue variant="${variant}" layout="${layout}" density="${density}">
    <KeyValueLabel icon={<HaloIcon icon={Clock01Icon} />}>Round-Trip Latency</KeyValueLabel>
    <KeyValueValue>14.2 ms</KeyValueValue>
  </KeyValue>

  <KeyValue variant="${variant}" layout="${layout}" density="${density}">
    <KeyValueLabel icon={<HaloIcon icon={DatabaseIcon} />}>Cluster Endpoint</KeyValueLabel>
    <KeyValueValue>
      <code>db.ord.internal.infra:5432</code>
    </KeyValueValue>
  </KeyValue>
</KeyValueGroup>`;

  return (
    <PreviewStageShell
      title="Key Value"
      description="Compact metadata and label/value display primitive engineered with container-aware responsive reflow, zero glass-on-glass noise, and restrained HaloUI Liquid Glass optics."
      badge="Data Display 20"
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
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Material Variant"
              value={variant}
              onValueChange={(val) => setVariant(val as KeyValueVariant)}
              options={[
                { value: "glass", label: "Glass (Liquid)" },
                { value: "default", label: "Default (Flat)" },
                { value: "muted", label: "Muted" },
              ]}
            />
            <StageControlSelect
              label="Alignment Mode"
              value={layout}
              onValueChange={(val) => setLayout(val as KeyValueLayout)}
              options={[
                { value: "auto", label: "Auto (Responsive)" },
                { value: "inline", label: "Inline" },
                { value: "stacked", label: "Stacked" },
              ]}
            />
            <StageControlSelect
              label="Spatial Density"
              value={density}
              onValueChange={(val) => setDensity(val as KeyValueDensity)}
              options={[
                { value: "compact", label: "Compact" },
                { value: "default", label: "Default" },
                { value: "relaxed", label: "Relaxed" },
              ]}
            />
            <StageControlSelect
              label="Simulated Width"
              value={containerWidth}
              onValueChange={setContainerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-2 border-t border-border/40">
            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="kv-toggle-long"
                checked={hasLongText}
                onCheckedChange={(checked) => setHasLongText(Boolean(checked))}
              />
              <Label
                htmlFor="kv-toggle-long"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Long Labels &amp; Unbroken Values
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="kv-toggle-rich"
                checked={richValues}
                onCheckedChange={(checked) => setRichValues(Boolean(checked))}
              />
              <Label
                htmlFor="kv-toggle-rich"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Semantic Badges &amp; Code Tags
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-6 px-2 sm:px-4 min-h-[320px]">
        <div
          className={cn(
            "w-full transition-all duration-300 ease-out mx-auto",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-xs">
            <KeyValueGroup columns={1}>
              <KeyValue variant={variant} layout={layout} density={density}>
                <KeyValueLabel icon={<HaloIcon icon={Globe02Icon} />}>
                  {hasLongText ? "Geographic Sovereign Edge Delivery Region" : "Edge Region"}
                </KeyValueLabel>
                <KeyValueValue>
                  {hasLongText
                    ? "https://telemetry-gateway.primary.internal.ap-south-1.sovereign.cloud/v2/metrics"
                    : "ap-south-1 (Mumbai)"}
                </KeyValueValue>
              </KeyValue>

              <KeyValue variant={variant} layout={layout} density={density}>
                <KeyValueLabel icon={<HaloIcon icon={Shield01Icon} />}>
                  Security Compliance
                </KeyValueLabel>
                <KeyValueValue>
                  {richValues ? (
                    <StatusBadge tone="positive">SOC2 Type II</StatusBadge>
                  ) : (
                    "Verified"
                  )}
                </KeyValueValue>
              </KeyValue>

              <KeyValue variant={variant} layout={layout} density={density}>
                <KeyValueLabel icon={<HaloIcon icon={Clock01Icon} />}>
                  Round-Trip Latency
                </KeyValueLabel>
                <KeyValueValue>
                  {richValues ? <Badge variant="outline">14.2 ms (p99)</Badge> : "14.2 ms"}
                </KeyValueValue>
              </KeyValue>

              <KeyValue variant={variant} layout={layout} density={density}>
                <KeyValueLabel icon={<HaloIcon icon={DatabaseIcon} />}>
                  Replication Endpoint
                </KeyValueLabel>
                <KeyValueValue>
                  <code>db.ord.internal.infra:5432</code>
                </KeyValueValue>
              </KeyValue>

              <KeyValue variant={variant} layout={layout} density={density}>
                <KeyValueLabel icon={<HaloIcon icon={CpuIcon} />}>
                  Active Replicas
                </KeyValueLabel>
                {/* Zero is a valid numeric value */}
                <KeyValueValue>0 nodes in cold standby</KeyValueValue>
              </KeyValue>
            </KeyValueGroup>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
