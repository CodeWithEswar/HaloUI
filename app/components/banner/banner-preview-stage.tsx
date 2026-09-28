"use client";

import * as React from "react";
import {
  Banner,
  BannerTitle,
  BannerDescription,
  BannerContent,
  BannerAction,
  type BannerVariant,
  type BannerIntensity,
  type BannerLayout,
} from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  ArrowRight01Icon,
  Rocket01Icon,
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
  { value: "standard", label: "Product Announcement" },
  { value: "maintenance", label: "Scheduled Maintenance" },
  { value: "long-url", label: "Diagnostics & Link" },
  { value: "compact", label: "Compact Headline" },
];

export function BannerPreviewStage() {
  const [variant, setVariant] = React.useState<BannerVariant>("default");
  const [intensity, setIntensity] = React.useState<BannerIntensity>("subtle");
  const [layout, setLayout] = React.useState<BannerLayout>("contained");
  const [scenario, setScenario] = React.useState("standard");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [dismissible, setDismissible] = React.useState(true);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const [withAction, setWithAction] = React.useState(true);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setVariant("default");
    setIntensity("subtle");
    setLayout("contained");
    setScenario("standard");
    setContainerWidth("full");
    setDismissible(true);
    setIsDismissed(false);
    setWithAction(true);
  };

  const resolvedRole =
    variant === "destructive"
      ? "alert"
      : variant === "warning" || variant === "success"
      ? "status"
      : "region";

  const telemetryItems: TelemetryItem[] = [
    { label: "Semantic Role", value: resolvedRole },
    { label: "Material Mode", value: intensity },
    { label: "Layout Framing", value: layout === "contained" ? "Contained Card" : "Full-Width Strip" },
    { label: "Container Mode", value: containerWidth === "full" ? "Fluid 100%" : `${containerWidth}px` },
  ];

  const codeSnippet = `<Banner
  variant="${variant}"
  intensity="${intensity}"
  layout="${layout}"${dismissible ? '\n  dismissible\n  onDismiss={() => console.log("Dismissed")}' : ''}
>
  <BannerContent>
    <BannerTitle>${
      variant === "destructive"
        ? "Global API Gateway Latency Spike Detected"
        : variant === "warning"
        ? "Scheduled Database Maintenance Window Approaching"
        : variant === "success"
        ? "Major Release v3.0 Is Now Available"
        : "Introducing HaloUI Liquid Glass Design System"
    }</BannerTitle>
    <BannerDescription>
      ${
        scenario === "long-url"
          ? "Cluster diagnostics available at https://status.haloui.dev/incidents/cluster-maintenance-phase-2."
          : "Explore the new physical 10-layer optical engine with container-aware responsive reflow."
      }
    </BannerDescription>
  </BannerContent>${
    withAction
      ? `\n  <BannerAction>
    <Button size="sm" variant="default" className="text-xs h-7 px-3">
      Learn More
    </Button>
  </BannerAction>`
      : ""
  }
</Banner>`;

  return (
    <PreviewStageShell
      title="Banner"
      description="Persistent page and section announcement primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and full-width or contained layout modes."
      badge="Feedback & Status 03"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Semantic Tone"
              value={variant}
              options={[
                { value: "default", label: "Default / Announcement" },
                { value: "info", label: "Informational" },
                { value: "success", label: "Success (Positive)" },
                { value: "warning", label: "Warning (Caution)" },
                { value: "destructive", label: "Destructive (Critical)" },
              ]}
              onChange={(val) => setVariant(val as BannerVariant)}
            />

            <StageControlSelect
              label="Optical Intensity"
              value={intensity}
              options={[
                { value: "subtle", label: "Subtle (Canonical Glass)" },
                { value: "balanced", label: "Balanced (High Diffusion)" },
                { value: "plain", label: "Plain (Zero Transparency)" },
              ]}
              onChange={(val) => setIntensity(val as BannerIntensity)}
            />

            <StageControlSelect
              label="Layout Framing"
              value={layout}
              options={[
                { value: "contained", label: "Contained Card" },
                { value: "full-width", label: "Full-Width Ribbon" },
              ]}
              onChange={(val) => setLayout(val as BannerLayout)}
            />

            <StageControlSelect
              label="Content Scenario"
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

          {/* Toggle Flags Row: Neatly Aligned in Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="banner-dismiss-toggle"
                  checked={dismissible}
                  onCheckedChange={(checked) => {
                    setDismissible(Boolean(checked));
                    setIsDismissed(false);
                  }}
                />
                <Label htmlFor="banner-dismiss-toggle" className="text-xs cursor-pointer select-none">
                  Dismissible Button
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="banner-action-toggle"
                  checked={withAction}
                  onCheckedChange={(checked) => setWithAction(Boolean(checked))}
                />
                <Label htmlFor="banner-action-toggle" className="text-xs cursor-pointer select-none">
                  With Action Button
                </Label>
              </div>
            </div>

            {isDismissed && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsDismissed(false)}
                className="text-xs h-7 px-2"
              >
                Restore Dismissed Banner
              </Button>
            )}
          </div>
        </div>
      }
    >
      {/* Live Presentation Stage inside Canvas */}
      <div className="w-full flex items-center justify-center p-2 sm:p-6 transition-all duration-300">
        <div
          className={cn(
            "w-full transition-all duration-300 mx-auto",
            containerWidth !== "full" && "border border-dashed border-sky-500/30 rounded-2xl p-2 sm:p-4 bg-black/[0.02] dark:bg-white/[0.02]"
          )}
          style={{
            maxWidth: containerWidth === "full" ? "100%" : `${containerWidth}px`,
          }}
        >
          {containerWidth !== "full" && (
            <div className="mb-2 text-[10px] uppercase font-mono tracking-wider text-muted-foreground/80 flex items-center justify-between">
              <span>Boundary: {containerWidth}px Container Simulation</span>
              <span>Reflow Active</span>
            </div>
          )}

          {isDismissed ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-border/60 bg-muted/20 text-muted-foreground text-xs">
              Banner dismissed by user. Click &ldquo;Restore Dismissed Banner&rdquo; in the controls below to re-render.
            </div>
          ) : (
            <Banner
              variant={variant}
              intensity={intensity}
              layout={layout}
              dismissible={dismissible}
              onDismiss={() => setIsDismissed(true)}
            >
              <BannerContent>
                <BannerTitle>
                  {scenario === "compact"
                    ? "Security posture audit scheduled for 02:00 UTC."
                    : variant === "destructive"
                    ? "Production Cluster Degraded: Ingress Failover Active"
                    : variant === "warning"
                    ? "Scheduled Maintenance Window: Saturday 01:00–04:00 UTC"
                    : variant === "success"
                    ? "Universal Schema Migration Completed Successfully"
                    : "HaloUI v3.0 Architecture Preview Is Live"}
                </BannerTitle>

                {scenario !== "compact" && (
                  <BannerDescription>
                    {scenario === "long-url" ? (
                      <>
                        Telemetry ingestion pipeline is operating at 99.98% SLA. Review incident logs or subscribe to notifications at{" "}
                        <a href="#docs" onClick={(e) => e.preventDefault()}>
                          https://status.haloui.dev/incidents/cluster-phase-9
                        </a>
                        .
                      </>
                    ) : scenario === "maintenance" ? (
                      <>
                        Database writes will be momentarily paused for 120 seconds during read-replica synchronization.
                      </>
                    ) : (
                      <>
                        Discover 10-layer physical liquid optics, accessible WAI-ARIA role patterns, and container-aware reflow.
                      </>
                    )}
                  </BannerDescription>
                )}
              </BannerContent>

              {withAction && (
                <BannerAction>
                  <Button
                    size="sm"
                    variant="default"
                    className="text-xs h-7.5 px-3"
                  >
                    <span>{variant === "destructive" ? "Review Incident" : "Learn More"}</span>
                    <HaloIcon icon={ArrowRight01Icon} size={13} className="ml-1" />
                  </Button>
                </BannerAction>
              )}
            </Banner>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
