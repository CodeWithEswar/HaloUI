"use client";

import * as React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineRail,
  TimelineMarker,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTimestamp,
  TimelineDescription,
  type TimelineVariant,
  type TimelineDensity,
} from "@/components/ui/timeline";
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
  CloudSavingDone02Icon,
  CpuIcon,
  Shield01Icon,
  CheckmarkCircle02Icon,
  GitBranchIcon,
  Alert02Icon,
  DatabaseIcon,
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

export function TimelinePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Timeline configuration states
  const [variant, setVariant] = React.useState<TimelineVariant>("glass");
  const [density, setDensity] = React.useState<TimelineDensity>("default");
  const [markerStyle, setMarkerStyle] = React.useState<"icons" | "dots">("icons");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [hasLongText, setHasLongText] = React.useState(false);
  const [showBadges, setShowBadges] = React.useState(true);

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setMarkerStyle("icons");
    setContainerWidth("full");
    setHasLongText(false);
    setShowBadges(true);
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
      label: "Density",
      value: density.toUpperCase(),
      variant: "default",
    },
    {
      label: "Markers",
      value: markerStyle.toUpperCase(),
      variant: "default",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Semantics",
      value: "<ol> / <li>",
      variant: "success",
    },
  ];

  const codeSnippet = `<Timeline variant="${variant}" density="${density}">
  <TimelineItem tone="positive">
    <TimelineRail>
      <TimelineMarker tone="positive"${
        markerStyle === "icons"
          ? ' icon={<HaloIcon icon={CheckmarkCircle02Icon} size={14} />}'
          : ""
      } />
      <TimelineConnector tone="positive" />
    </TimelineRail>
    <TimelineContent>
      <TimelineHeader>
        <TimelineTitle>Production Release v2.4.0</TimelineTitle>
        <TimelineTimestamp>12 minutes ago</TimelineTimestamp>
      </TimelineHeader>
      <TimelineDescription>
        Automated Canary deployment passed health checks across all global edge regions.
      </TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem tone="primary">
    <TimelineRail>
      <TimelineMarker tone="primary"${
        markerStyle === "icons"
          ? ' icon={<HaloIcon icon={CloudSavingDone02Icon} size={14} />}'
          : ""
      } />
      <TimelineConnector tone="primary" />
    </TimelineRail>
    <TimelineContent>
      <TimelineHeader>
        <TimelineTitle>Database Schema Migration</TimelineTitle>
        <TimelineTimestamp>2 hours ago</TimelineTimestamp>
      </TimelineHeader>
      <TimelineDescription>
        Zero-downtime column index replication completed in primary US-East cluster.
      </TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem tone="default" isLast>
    <TimelineRail>
      <TimelineMarker tone="default"${
        markerStyle === "icons"
          ? ' icon={<HaloIcon icon={Shield01Icon} size={14} />}'
          : ""
      } />
    </TimelineRail>
    <TimelineContent>
      <TimelineHeader>
        <TimelineTitle>KMS Keyring Rotation</TimelineTitle>
        <TimelineTimestamp>Yesterday</TimelineTimestamp>
      </TimelineHeader>
      <TimelineDescription>
        Automated annual cryptographic key rotation verified and sealed.
      </TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;

  return (
    <PreviewStageShell
      title="Timeline"
      description="Chronological event stream engineered with semantic ordered lists, container-aware responsive reflow, and restrained HaloUI Liquid Glass optics."
      badge="Data Display 17"
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
              onValueChange={(val) => setVariant(val as TimelineVariant)}
              options={[
                { value: "glass", label: "Glass (Liquid)" },
                { value: "default", label: "Default" },
                { value: "outline", label: "Outline" },
                { value: "ghost", label: "Ghost" },
              ]}
            />
            <StageControlSelect
              label="Spatial Density"
              value={density}
              onValueChange={(val) => setDensity(val as TimelineDensity)}
              options={[
                { value: "compact", label: "Compact" },
                { value: "default", label: "Default" },
                { value: "relaxed", label: "Relaxed" },
              ]}
            />
            <StageControlSelect
              label="Marker Style"
              value={markerStyle}
              onValueChange={(val) => setMarkerStyle(val as any)}
              options={[
                { value: "icons", label: "Icon Badges" },
                { value: "dots", label: "Minimal Dots" },
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
                id="timeline-toggle-long"
                checked={hasLongText}
                onCheckedChange={(checked) => setHasLongText(Boolean(checked))}
              />
              <Label
                htmlFor="timeline-toggle-long"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Simulate Long Event Title &amp; Text
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]">
              <Checkbox
                id="timeline-toggle-badges"
                checked={showBadges}
                onCheckedChange={(checked) => setShowBadges(Boolean(checked))}
              />
              <Label
                htmlFor="timeline-toggle-badges"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Milestone Status Badges
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
          <Timeline variant={variant} density={density}>
            <TimelineItem tone="positive">
              <TimelineRail>
                <TimelineMarker
                  tone="positive"
                  icon={
                    markerStyle === "icons" ? (
                      <HaloIcon icon={CheckmarkCircle02Icon} size={14} />
                    ) : undefined
                  }
                />
                <TimelineConnector tone="positive" />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>
                      {hasLongText
                        ? "Global Infrastructure Orchestration and High-Availability Multi-Region Failover Verification"
                        : "Production Release v2.4.0"}
                    </TimelineTitle>
                    {showBadges && <StatusBadge tone="positive">Deployed</StatusBadge>}
                  </div>
                  <TimelineTimestamp>12 min ago</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  {hasLongText
                    ? "Automated Canary deployment passed real-time traffic evaluation across 14 sovereign cloud edge locations with 0% dropped transactions and sub-5ms p99 latency guarantees."
                    : "Automated Canary deployment passed health checks across all global edge regions."}
                </TimelineDescription>
                <div className="flex flex-wrap items-center gap-2 pt-1.5">
                  <Button variant="outline" size="xs">
                    View Release Notes
                  </Button>
                  <Button variant="ghost" size="xs">
                    Deploy Metrics
                  </Button>
                </div>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem tone="primary">
              <TimelineRail>
                <TimelineMarker
                  tone="primary"
                  icon={
                    markerStyle === "icons" ? (
                      <HaloIcon icon={CloudSavingDone02Icon} size={14} />
                    ) : undefined
                  }
                />
                <TimelineConnector tone="primary" />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Database Schema Migration</TimelineTitle>
                    {showBadges && <Badge variant="secondary">Zero Downtime</Badge>}
                  </div>
                  <TimelineTimestamp>2h ago</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  Zero-downtime column index replication completed in primary US-East cluster.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem tone="default" isLast>
              <TimelineRail>
                <TimelineMarker
                  tone="default"
                  icon={
                    markerStyle === "icons" ? (
                      <HaloIcon icon={Shield01Icon} size={14} />
                    ) : undefined
                  }
                />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Hardware Security KMS Keyring Rotation</TimelineTitle>
                    {showBadges && <StatusBadge tone="neutral">Audited</StatusBadge>}
                  </div>
                  <TimelineTimestamp>Yesterday</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  Automated annual cryptographic key rotation verified and sealed across HSM vaults.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </PreviewStageShell>
  );
}
