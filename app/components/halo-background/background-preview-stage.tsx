"use client";

import * as React from "react";
import { HaloIcon } from "@/components/icons/halo-icon";
import { EyeIcon } from "@hugeicons/core-free-icons";
import { HaloBackground, type PreviewEnvironment } from "@/components/haloui/foundations/halo-background";
import { HaloSurface, type SurfaceElevation, type SurfaceIntensity } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import { HaloButton } from "@/components/haloui/button/halo-button";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

export function BackgroundPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [elevation, setElevation] = React.useState<SurfaceElevation>("raised");
  const [intensity, setIntensity] = React.useState<SurfaceIntensity>("balanced");
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    return `import { HaloBackground } from "@/components/ui/halo-background";
import { HaloSurface } from "@/components/ui/halo-surface";
import { HaloHighlight } from "@/components/ui/halo-highlight";
import { HaloEdge } from "@/components/ui/halo-edge";
import { HaloButton } from "@/components/ui/halo-button";

export function EnvironmentAudit() {
  return (
    // Deterministic testing environment
    <HaloBackground environment="${backdrop}">
      <HaloSurface
        elevation="${elevation}"
        intensity="${intensity}"
        className="p-6 md:p-8 rounded-2xl max-w-sm w-full space-y-4 shadow-xl"
      >
        <HaloHighlight kind="specular" strength="${intensity === "rich" ? "strong" : "balanced"}" />
        <HaloEdge placement="both" />
        <h4 className="font-semibold text-foreground">Substrate Evaluation</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Testing optical transmission, edge separation, and typography contrast
          against the "${backdrop}" environment.
        </p>
        <div className="pt-2 flex justify-end">
          <HaloButton size="sm">Inspect Layer</HaloButton>
        </div>
      </HaloSurface>
    </HaloBackground>
  );
}`;
  }, [backdrop, elevation, intensity]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setElevation("raised");
    setIntensity("balanced");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate optical transmission, edge separation, and typography contrast across reference environments."
      badge="Optical Environments"
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
        { label: "Substrate", value: backdrop },
        { label: "Contrast", value: "WCAG 2.1 AA", variant: "success" },
        { label: "Stack", value: `${elevation} · ${intensity}` },
      ]}
    >
      <HaloSurface
        elevation={elevation}
        intensity={intensity}
        className="relative p-6 md:p-8 rounded-3xl max-w-md w-full space-y-5 text-left border border-border/80 shadow-2xl transition-all duration-300"
      >
        <HaloHighlight
          kind="specular"
          strength={intensity === "rich" ? "strong" : intensity === "subtle" ? "subtle" : "balanced"}
        />
        <HaloEdge
          placement="both"
          strength={intensity === "rich" ? "strong" : "balanced"}
        />

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono border border-border bg-muted/40 text-foreground">
              <HaloIcon icon={EyeIcon} size={12} />
              <span>Stress Test Sandbox</span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Optical Readability
            </h3>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            {backdrop}
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Evaluating physical backdrop diffusion blur, specular catch reflection, and edge contrast directly over the high-frequency <strong>{backdrop}</strong> background layer.
        </p>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 font-mono">
          <div className="p-2.5 rounded-xl border border-border bg-muted/30">
            <span className="text-muted-foreground block text-[10px]">ELEVATION</span>
            <span className="font-semibold text-foreground uppercase">{elevation}</span>
          </div>
          <div className="p-2.5 rounded-xl border border-border bg-muted/30">
            <span className="text-muted-foreground block text-[10px]">INTENSITY</span>
            <span className="font-semibold text-foreground uppercase">{intensity}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/50 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            WCAG 2.1 AA Compliant
          </span>
          <HaloButton size="sm" variant="primary">
            Verify Contrast
          </HaloButton>
        </div>
      </HaloSurface>
    </PreviewStageShell>
  );
}
