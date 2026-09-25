"use client";

import * as React from "react";
import {
  HaloSurface,
  type MaterialIntensity,
  type MaterialElevation,
} from "@/components/haloui/foundations/halo-surface";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { cn } from "@/lib/utils";

export function SurfacePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [intensity, setIntensity] = React.useState<MaterialIntensity>("balanced");
  const [elevation, setElevation] = React.useState<MaterialElevation>("base");
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    return `<HaloSurface
  elevation="${elevation}"
  intensity="${intensity}"
  className="relative p-7 sm:p-9 rounded-3xl"
>
  {/* Layer 03: Optical Boundary Edge */}
  <HaloEdge strength="${intensity === "rich" ? "strong" : "balanced"}" placement="both" />

  {/* Layer 04: Directional Light Highlight */}
  <HaloHighlight kind="broad" strength="${intensity === "rich" ? "strong" : "balanced"}" />

  {/* Real-world consumer content */}
  <div className="relative z-10 space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Optical Substrate
      </span>
      <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-muted/40">
        ${intensity} · ${elevation}
      </span>
    </div>
    <h3 className="text-lg font-semibold tracking-tight text-foreground">
      Physical Liquid Glass Body
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Coordinates 10 optical layers: base tint, diffusion, outer separation, 135° specular catch, and contact shadow.
    </p>
  </div>
</HaloSurface>`;
  }, [intensity, elevation]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setIntensity("balanced");
    setElevation("base");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate foundational liquid glass substrate, diffusion tiers, elevation anchors, and responsive scaling."
      badge="Optical Substrate"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={generatedCode}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={resetStage}
      onCopy={copyCode}
      copied={copied}
      controls={
        <div className="w-full flex flex-col sm:flex-row sm:items-center flex-wrap gap-2.5 sm:gap-4">
          {/* Elevation Selector */}
          <StageControlGroup label="Elevation">
            {(["base", "raised", "floating", "overlay"] as const).map((elev) => (
              <StageControlButton
                key={elev}
                active={elevation === elev}
                onClick={() => setElevation(elev)}
              >
                {elev}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Intensity Selector */}
          <StageControlGroup label="Intensity">
            {(["subtle", "balanced", "rich"] as const).map((inte) => (
              <StageControlButton
                key={inte}
                active={intensity === inte}
                onClick={() => setIntensity(inte)}
              >
                {inte}
              </StageControlButton>
            ))}
          </StageControlGroup>
        </div>
      }
      telemetry={[
        { label: "Engine", value: "10-Layer Optical Physics" },
        { label: "A11y", value: "WCAG 2.1 AA", variant: "success" },
        { label: "Stack", value: `${elevation} · ${intensity}` },
      ]}
    >
      <HaloSurface
        elevation={elevation}
        intensity={intensity}
        className="w-full relative p-7 sm:p-9 rounded-3xl text-left transition-all duration-300 shadow-xl"
      >
        <HaloEdge strength={intensity === "rich" ? "strong" : "balanced"} placement="both" />
        <HaloHighlight kind="broad" strength={intensity === "rich" ? "strong" : "balanced"} />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Liquid Substrate
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-border bg-muted/40 text-foreground">
              {intensity} · {elevation}
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Physical Liquid Glass Body
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              HaloSurface establishes calibrated diffusion depth, neoskeuomorphic rim catch, and contact shadow anchoring without clip path distortion.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-muted-foreground border-t border-border/50">
            <span>Diffusion: {intensity === "subtle" ? "8px" : intensity === "balanced" ? "16px" : "28px"} blur</span>
            <span>Anchor: {elevation}</span>
          </div>
        </div>
      </HaloSurface>
    </PreviewStageShell>
  );
}
