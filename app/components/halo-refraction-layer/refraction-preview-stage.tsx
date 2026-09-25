"use client";

import * as React from "react";
import { SparklesIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import {
  HaloRefractionLayer,
  type HaloRefractionIntensity,
} from "@/components/haloui/foundations/halo-refraction-layer";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
  type StageTheme,
} from "@/components/docs/preview-stage-shell";
import { cn } from "@/lib/utils";

export function RefractionPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("spectral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [stageTheme, setStageTheme] = React.useState<StageTheme>("dark");
  const [intensity, setIntensity] = React.useState<HaloRefractionIntensity>("subtle");
  const [showRefraction, setShowRefraction] = React.useState<boolean>(true);
  const [compareFallback, setCompareFallback] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const generatedCode = React.useMemo(() => {
    return `<HaloSurface
  elevation="raised"
  intensity="rich"
  className="relative p-8 rounded-3xl overflow-hidden"
>
  {/* Layer 07: Progressive-Enhancement Refraction */}
  ${showRefraction && !compareFallback ? `<HaloRefractionLayer intensity="${intensity}" />` : "<!-- Refraction Disabled (Baseline Fallback) -->"}

  {/* Coordinated Material Stack */}
  <HaloEdge strength="balanced" placement="both" />
  <HaloHighlight kind="broad" strength="balanced" />

  {/* Content Plane (100% distortion-free) */}
  <div className="relative z-10 space-y-3">
    <h3 className="text-lg font-semibold tracking-tight text-foreground">
      Liquid Optical Refraction
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Perimeter meniscus curvature displaces environmental transmission while preserving razor-sharp content legibility.
    </p>
  </div>
</HaloSurface>`;
  }, [intensity, showRefraction, compareFallback]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("spectral");
    setViewport("desktop");
    setIntensity("subtle");
    setShowRefraction(true);
    setCompareFallback(false);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate perimeter meniscus curvature and environmental light displacement across intensity tiers."
      badge="Meniscus Curvature"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={generatedCode}
      viewport={viewport}
      onViewportChange={setViewport}
      stageTheme={stageTheme}
      onStageThemeChange={setStageTheme}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={resetStage}
      onCopy={copyCode}
      copied={copied}
      controls={
        <div className="w-full flex flex-col sm:flex-row sm:items-center flex-wrap gap-2.5 sm:gap-4">
          {/* Intensity Selector */}
          <StageControlGroup label="Intensity">
            {(["subtle", "balanced"] as const).map((i) => (
              <StageControlButton
                key={i}
                active={intensity === i && !compareFallback}
                onClick={() => {
                  setIntensity(i);
                  setCompareFallback(false);
                  setShowRefraction(true);
                }}
              >
                {i}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="refraction-toggle"
                checked={showRefraction && !compareFallback}
                onCheckedChange={(checked) => {
                  setShowRefraction(checked === true);
                  if (checked) setCompareFallback(false);
                }}
              />
              <label
                htmlFor="refraction-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Active Refraction
              </label>
            </div>

            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="fallback-toggle"
                checked={compareFallback}
                onCheckedChange={(checked) => {
                  setCompareFallback(checked === true);
                  if (checked) setShowRefraction(false);
                }}
              />
              <label
                htmlFor="fallback-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Compare Baseline Fallback
              </label>
            </div>
          </div>
        </div>
      }
      telemetry={[
        { label: "Pipeline", value: "Progressive SVG Displacement" },
        { label: "A11y", value: "Zero Content Distortion", variant: "success" },
        {
          label: "State",
          value: showRefraction && !compareFallback ? `${intensity} Meniscus` : "Flat Fallback",
          variant: showRefraction && !compareFallback ? "default" : "warning",
        },
      ]}
    >
      <HaloSurface
        elevation="raised"
        intensity="rich"
        className="relative w-full rounded-3xl p-7 sm:p-9 text-left overflow-hidden transition-all duration-300"
      >
        {/* Layer 07: Refraction Layer Under Test */}
        {showRefraction && !compareFallback && (
          <HaloRefractionLayer intensity={intensity} />
        )}

        {/* Supporting Optical Assembly */}
        <HaloEdge strength="balanced" placement="both" />
        <HaloHighlight kind="broad" strength="balanced" />

        {/* Surface Content */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <HaloIcon icon={SparklesIcon} size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-foreground">
                  Optical Refraction Layer
                </h4>
                <p className="text-xs text-muted-foreground">
                  HaloUI Physical Layer 07 · Meniscus Boundary Distortion
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="text-[11px] font-mono border-border bg-muted/40"
            >
              {showRefraction && !compareFallback
                ? `${intensity} · Active`
                : "Fallback Baseline"}
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            Halo Refraction Layer introduces progressive-enhancement optical displacement along material boundaries. Content planes remain 100% crisp and readable without visual distortion.
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50">
            <span className="font-mono text-[11px]">A11y Safety</span>
            <strong className="font-mono text-[11px] text-foreground font-medium">
              Zero Text Distortion Enforced
            </strong>
          </div>
        </div>
      </HaloSurface>
    </PreviewStageShell>
  );
}
