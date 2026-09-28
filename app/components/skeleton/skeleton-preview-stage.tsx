"use client";

import * as React from "react";
import {
  Skeleton,
  type SkeletonAnimation,
  type SkeletonIntensity,
} from "@/components/ui/skeleton";
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
  { value: "profile-card", label: "Profile Card" },
  { value: "article-feed", label: "Article Card" },
  { value: "data-row", label: "Data Table Row" },
  { value: "media-panel", label: "Media Player Tile" },
];

export function SkeletonPreviewStage() {
  const [animation, setAnimation] = React.useState<SkeletonAnimation>("pulse");
  const [intensity, setIntensity] = React.useState<SkeletonIntensity>("subtle");
  const [scenario, setScenario] = React.useState("profile-card");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setAnimation("pulse");
    setIntensity("subtle");
    setScenario("profile-card");
    setContainerWidth("full");
  };

  const telemetryItems: TelemetryItem[] = [
    { label: "Semantic State", value: "aria-hidden=\"true\"" },
    { label: "Animation Mode", value: animation },
    { label: "Material Mode", value: intensity },
    { label: "Scenario", value: scenario },
  ];

  const codeSnippet =
    scenario === "profile-card"
      ? `<div className="flex items-center gap-3">
  <Skeleton animation="${animation}" intensity="${intensity}" className="size-12 rounded-full shrink-0" />
  <div className="space-y-2 flex-1 min-w-0">
    <Skeleton animation="${animation}" intensity="${intensity}" className="h-4 w-3/4 rounded" />
    <Skeleton animation="${animation}" intensity="${intensity}" className="h-3 w-1/2 rounded" />
  </div>
</div>`
      : scenario === "article-feed"
      ? `<div className="space-y-3">
  <Skeleton animation="${animation}" intensity="${intensity}" className="h-32 w-full rounded-xl" />
  <Skeleton animation="${animation}" intensity="${intensity}" className="h-5 w-4/5 rounded" />
  <div className="space-y-1.5">
    <Skeleton animation="${animation}" intensity="${intensity}" className="h-3.5 w-full rounded" />
    <Skeleton animation="${animation}" intensity="${intensity}" className="h-3.5 w-3/5 rounded" />
  </div>
</div>`
      : scenario === "data-row"
      ? `<div className="flex items-center justify-between gap-4 p-3 border rounded-lg">
  <div className="flex items-center gap-3 flex-1 min-w-0">
    <Skeleton animation="${animation}" intensity="${intensity}" className="size-8 rounded-md shrink-0" />
    <Skeleton animation="${animation}" intensity="${intensity}" className="h-4 w-1/3 rounded" />
  </div>
  <Skeleton animation="${animation}" intensity="${intensity}" className="h-4 w-16 rounded shrink-0" />
  <Skeleton animation="${animation}" intensity="${intensity}" className="h-6 w-14 rounded-full shrink-0" />
</div>`
      : `<div className="space-y-3">
  <Skeleton animation="${animation}" intensity="${intensity}" className="h-40 w-full rounded-xl" />
  <div className="flex items-center justify-between">
    <Skeleton animation="${animation}" intensity="${intensity}" className="h-4 w-28 rounded" />
    <Skeleton animation="${animation}" intensity="${intensity}" className="h-4 w-12 rounded" />
  </div>
</div>`;

  return (
    <PreviewStageShell
      title="Skeleton"
      description="Content loading placeholder engineered with Subtle Liquid Glass channels, zero per-fragment backdrop filters, and vestibular reduced-motion safety."
      badge="Feedback & Status 08"
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
              label="Animation Mode"
              value={animation}
              options={[
                { value: "pulse", label: "Pulse (Opacity Modulation)" },
                { value: "shimmer", label: "Shimmer (Sweeping Arc)" },
                { value: "none", label: "None (Static Placeholder)" },
              ]}
              onChange={(val) => setAnimation(val as SkeletonAnimation)}
            />

            <StageControlSelect
              label="Material Intensity"
              value={intensity}
              options={[
                { value: "subtle", label: "Subtle (Reading Channel)" },
                { value: "balanced", label: "Balanced (Heightened)" },
                { value: "plain", label: "Plain (Solid Base)" },
              ]}
              onChange={(val) => setIntensity(val as SkeletonIntensity)}
            />

            <StageControlSelect
              label="Layout Scenario"
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
        <div className="w-full max-w-sm p-5 sm:p-6 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-sm">
          {scenario === "profile-card" ? (
            <div className="flex items-center gap-3.5">
              <Skeleton animation={animation} intensity={intensity} className="size-12 rounded-full shrink-0" />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton animation={animation} intensity={intensity} className="h-4 w-3/4 rounded" />
                <Skeleton animation={animation} intensity={intensity} className="h-3 w-1/2 rounded" />
              </div>
            </div>
          ) : scenario === "article-feed" ? (
            <div className="space-y-3.5">
              <Skeleton animation={animation} intensity={intensity} className="h-32 w-full rounded-xl" />
              <Skeleton animation={animation} intensity={intensity} className="h-5 w-4/5 rounded" />
              <div className="space-y-2">
                <Skeleton animation={animation} intensity={intensity} className="h-3.5 w-full rounded" />
                <Skeleton animation={animation} intensity={intensity} className="h-3.5 w-3/5 rounded" />
              </div>
            </div>
          ) : scenario === "data-row" ? (
            <div className="flex items-center justify-between gap-3 p-2 rounded-lg border border-border/40">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Skeleton animation={animation} intensity={intensity} className="size-8 rounded-md shrink-0" />
                <Skeleton animation={animation} intensity={intensity} className="h-4 w-1/2 rounded" />
              </div>
              <Skeleton animation={animation} intensity={intensity} className="h-4 w-14 rounded shrink-0" />
              <Skeleton animation={animation} intensity={intensity} className="h-6 w-12 rounded-full shrink-0" />
            </div>
          ) : (
            <div className="space-y-3">
              <Skeleton animation={animation} intensity={intensity} className="h-36 w-full rounded-xl" />
              <div className="flex items-center justify-between pt-1">
                <Skeleton animation={animation} intensity={intensity} className="h-4 w-28 rounded" />
                <Skeleton animation={animation} intensity={intensity} className="h-4 w-12 rounded" />
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
