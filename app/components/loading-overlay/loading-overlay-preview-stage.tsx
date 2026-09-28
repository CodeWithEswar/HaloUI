"use client";

import * as React from "react";
import {
  LoadingOverlay,
  type LoadingOverlayIntensity,
  type LoadingOverlayBlur,
} from "@/components/ui/loading-overlay";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const SCENARIOS = [
  { value: "card", label: "Analytics Card" },
  { value: "form", label: "Checkout Form" },
  { value: "table", label: "Cluster Data Table" },
];

export function LoadingOverlayPreviewStage() {
  const [visibility, setVisibility] = React.useState<"visible" | "hidden">("visible");
  const [intensity, setIntensity] = React.useState<LoadingOverlayIntensity>("balanced");
  const [blur, setBlur] = React.useState<LoadingOverlayBlur>("md");
  const [blockingMode, setBlockingMode] = React.useState<"blocking" | "nonblocking">("blocking");
  const [scenario, setScenario] = React.useState("card");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const isVisible = visibility === "visible";
  const isBlocking = blockingMode === "blocking";

  const handleReset = () => {
    setVisibility("visible");
    setIntensity("balanced");
    setBlur("md");
    setBlockingMode("blocking");
    setScenario("card");
    setContainerWidth("full");
  };

  const telemetryItems: TelemetryItem[] = [
    { label: "Visible State", value: isVisible ? "true" : "false" },
    { label: "Interaction Blocking", value: isBlocking ? "pointer + inert" : "non-blocking" },
    { label: "Material Mode", value: intensity },
    { label: "Blur Level", value: blur },
  ];

  const codeSnippet = `<LoadingOverlay
  visible={${isVisible}}
  intensity="${intensity}"
  blur="${blur}"
  blocking={${isBlocking}}
  message="Synchronizing cloud state..."
>
  <Card className="p-6">
    {/* Scoped content region */}
  </Card>
</LoadingOverlay>`;

  return (
    <PreviewStageShell
      title="Loading Overlay"
      description="Scoped blocking/loading surface engineered with Balanced Liquid Glass optics, pointer and keyboard interaction blocking, and automatic container reflow."
      badge="Feedback & Status 09"
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
          {/* Main Controls Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Overlay State"
              value={visibility}
              options={[
                { value: "visible", label: "Visible (Active)" },
                { value: "hidden", label: "Hidden (Idle)" },
              ]}
              onChange={(val) => setVisibility(val as "visible" | "hidden")}
            />

            <StageControlSelect
              label="Interaction Mode"
              value={blockingMode}
              options={[
                { value: "blocking", label: "Blocking (inert)" },
                { value: "nonblocking", label: "Non-blocking" },
              ]}
              onChange={(val) => setBlockingMode(val as "blocking" | "nonblocking")}
            />

            <StageControlSelect
              label="Material Intensity"
              value={intensity}
              options={[
                { value: "subtle", label: "Subtle (Light)" },
                { value: "balanced", label: "Balanced (Liquid)" },
                { value: "opaque", label: "Opaque (Contrast)" },
              ]}
              onChange={(val) => setIntensity(val as LoadingOverlayIntensity)}
            />

            <StageControlSelect
              label="Backdrop Blur"
              value={blur}
              options={[
                { value: "none", label: "None (Zero)" },
                { value: "sm", label: "Small (Subtle)" },
                { value: "md", label: "Medium (Standard)" },
                { value: "lg", label: "Large (High)" },
              ]}
              onChange={(val) => setBlur(val as LoadingOverlayBlur)}
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
          "w-full transition-all duration-300 ease-out flex justify-center py-6 px-4",
          containerWidth !== "full" && "mx-auto"
        )}
        style={{
          maxWidth: containerWidth === "full" ? "100%" : `${containerWidth}px`,
        }}
      >
        <LoadingOverlay
          visible={isVisible}
          intensity={intensity}
          blur={blur}
          blocking={isBlocking}
          message="Synchronizing cloud state..."
          className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg border border-border/60 bg-background/60 backdrop-blur-md"
        >
          {scenario === "card" && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold">Cluster Telemetry</h4>
                  <p className="text-xs text-muted-foreground">US-East Primary Datacenter</p>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Healthy
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
                  <span className="text-[11px] text-muted-foreground">Throughput</span>
                  <div className="text-lg font-bold">14.8 GB/s</div>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
                  <span className="text-[11px] text-muted-foreground">Latency</span>
                  <div className="text-lg font-bold">1.2 ms</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button size="sm" variant="outline">Inspect</Button>
                <Button size="sm">Deploy Patch</Button>
              </div>
            </div>
          )}

          {scenario === "form" && (
            <div className="p-6 space-y-4">
              <h4 className="text-base font-semibold">Billing Details</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="preview-email" className="text-xs">Email Address</Label>
                  <Input id="preview-email" defaultValue="alex.chen@haloui.dev" className="h-8 text-xs" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="preview-card" className="text-xs">Cardholder Name</Label>
                  <Input id="preview-card" defaultValue="Alex Chen" className="h-8 text-xs" />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button size="sm" variant="outline">Cancel</Button>
                <Button size="sm">Confirm Payment</Button>
              </div>
            </div>
          )}

          {scenario === "table" && (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <span className="text-xs font-semibold">Instance Name</span>
                <span className="text-xs font-semibold">Status</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-border/20">
                  <span className="font-mono">edge-node-01</span>
                  <span className="text-muted-foreground">Online</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/20">
                  <span className="font-mono">edge-node-02</span>
                  <span className="text-muted-foreground">Online</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-mono">edge-node-03</span>
                  <span className="text-muted-foreground">Syncing</span>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <Button size="sm" variant="outline" className="text-xs h-7">Refresh Cluster</Button>
              </div>
            </div>
          )}
        </LoadingOverlay>
      </div>
    </PreviewStageShell>
  );
}
