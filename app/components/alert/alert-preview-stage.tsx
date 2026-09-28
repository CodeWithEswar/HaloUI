"use client";

import * as React from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  type AlertVariant,
  type AlertIntensity,
} from "@/components/ui/alert";
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
  InformationCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  AlertCircleIcon,
  SparklesIcon,
  ArrowRight01Icon,
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
  { value: "standard", label: "Standard Feedback" },
  { value: "long-content", label: "Multi-paragraph & URLs" },
  { value: "with-action", label: "Inline Action Button" },
  { value: "title-only", label: "Compact Title Only" },
];

export function AlertPreviewStage() {
  const [variant, setVariant] = React.useState<AlertVariant>("info");
  const [intensity, setIntensity] = React.useState<AlertIntensity>("subtle");
  const [scenario, setScenario] = React.useState("standard");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [dismissible, setDismissible] = React.useState(true);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const [withAction, setWithAction] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setVariant("info");
    setIntensity("subtle");
    setScenario("standard");
    setContainerWidth("full");
    setDismissible(true);
    setIsDismissed(false);
    setWithAction(false);
  };

  const resolvedRole =
    variant === "destructive"
      ? "alert"
      : variant === "warning" || variant === "success"
      ? "status"
      : "region";

  const telemetryItems: TelemetryItem[] = [
    { label: "Semantic Role", value: resolvedRole },
    { label: "Material Recipe", value: intensity },
    { label: "Container Mode", value: containerWidth === "full" ? "Fluid 100%" : `${containerWidth}px` },
    { label: "Tone Variant", value: variant },
  ];

  const codeSnippet = `<Alert
  variant="${variant}"
  intensity="${intensity}"${dismissible ? '\n  dismissible\n  onDismiss={() => console.log("Dismissed")}' : ''}
>
  <AlertTitle>${
    variant === "destructive"
      ? "Deployment Pipeline Failed"
      : variant === "warning"
      ? "API Rate Limit Approaching Threshold"
      : variant === "success"
      ? "Production Migration Succeeded"
      : "New Optical Engine Update Available"
  }</AlertTitle>
  <AlertDescription>
    ${
      scenario === "long-content"
        ? "Our edge cluster detected an anomalous spike in payload volume across cluster region us-east-1. Refer to the diagnostic telemetry dashboard at https://telemetry.haloui.dev/status/cluster-98 for active node traces."
        : "HaloUI Liquid Glass utilizes 10 physical optical layers including specular reflection and ambient diffusion."
    }
  </AlertDescription>${
    withAction || scenario === "with-action"
      ? `\n  <AlertAction>
    <Button size="sm" variant="outline">
      Inspect Trace
    </Button>
  </AlertAction>`
      : ""
  }
</Alert>`;

  return (
    <PreviewStageShell
      title="Alert"
      description="Contextual inline semantic feedback surface engineered with Subtle Liquid Glass, automatic container-aware reflow, Hugeicons iconography, and accessible WAI-ARIA role semantics."
      badge="Feedback & Status 01"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      telemetry={telemetryItems}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={handleReset}
      code={codeSnippet}
    >
      <div className="w-full space-y-4">
        {/* Controls Bar: Aligned in responsive grid row */}
        <div className="rounded-xl border border-border/60 bg-background/70 backdrop-blur-md p-3.5 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StageControlSelect
              label="Semantic Tone"
              value={variant}
              options={[
                { value: "default", label: "Default / Info" },
                { value: "info", label: "Informational" },
                { value: "success", label: "Success (Positive)" },
                { value: "warning", label: "Warning (Caution)" },
                { value: "destructive", label: "Destructive (Critical)" },
              ]}
              onChange={(val) => setVariant(val as AlertVariant)}
            />

            <StageControlSelect
              label="Optical Intensity"
              value={intensity}
              options={[
                { value: "subtle", label: "Subtle (Canonical Glass)" },
                { value: "balanced", label: "Balanced (High Diffusion)" },
                { value: "plain", label: "Plain (Zero Transparency)" },
              ]}
              onChange={(val) => setIntensity(val as AlertIntensity)}
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
                  id="alert-dismiss-toggle"
                  checked={dismissible}
                  onCheckedChange={(checked) => {
                    setDismissible(Boolean(checked));
                    setIsDismissed(false);
                  }}
                />
                <Label htmlFor="alert-dismiss-toggle" className="text-xs cursor-pointer select-none">
                  Dismissible Button
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="alert-action-toggle"
                  checked={withAction}
                  onCheckedChange={(checked) => setWithAction(Boolean(checked))}
                />
                <Label htmlFor="alert-action-toggle" className="text-xs cursor-pointer select-none">
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
                Restore Dismissed Alert
              </Button>
            )}
          </div>
        </div>

        {/* Live Presentation Stage */}
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
                Alert dismissed by user. Click &ldquo;Restore Dismissed Alert&rdquo; above to re-render.
              </div>
            ) : (
              <Alert
                variant={variant}
                intensity={intensity}
                dismissible={dismissible}
                onDismiss={() => setIsDismissed(true)}
              >
                <AlertTitle>
                  {scenario === "title-only"
                    ? "Security posture synchronized across all nodes."
                    : variant === "destructive"
                    ? "System Outage Detected on Cluster Core"
                    : variant === "warning"
                    ? "Storage Quota Exceeds 85% Capacity"
                    : variant === "success"
                    ? "Cryptographic Verification Succeeded"
                    : "Universal Optical Foundation Loaded"}
                </AlertTitle>

                {scenario !== "title-only" && (
                  <AlertDescription>
                    {scenario === "long-content" ? (
                      <>
                        Automated diagnostics completed across 14 edge microservices. Memory consumption is stable at 42.1%, but cache invalidation latencies have increased by 18ms. Review the complete deployment telemetry report or verify your DNS ingress records at{" "}
                        <a href="#docs" onClick={(e) => e.preventDefault()}>
                          https://status.haloui.dev/diagnostics/node-88
                        </a>
                        .
                      </>
                    ) : (
                      <>
                        Subtle Liquid Glass combines 10 physical optical layers including directional highlights along 135° and adaptive environmental diffusion.
                      </>
                    )}
                  </AlertDescription>
                )}

                {(withAction || scenario === "with-action") && (
                  <AlertAction>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7.5 px-3 bg-background/80 hover:bg-background"
                    >
                      <span>Take Action</span>
                      <HaloIcon icon={ArrowRight01Icon} size={13} className="ml-1" />
                    </Button>
                  </AlertAction>
                )}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
