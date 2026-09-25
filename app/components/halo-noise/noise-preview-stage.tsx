"use client";

import * as React from "react";
import { SparklesIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import {
  HaloNoise,
  type HaloNoiseStrength,
  type HaloNoiseBlendMode,
} from "@/components/haloui/foundations/halo-noise";
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

export function NoisePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [stageTheme, setStageTheme] = React.useState<StageTheme>("dark");
  const [strength, setStrength] = React.useState<HaloNoiseStrength>("balanced");
  const [blendMode, setBlendMode] = React.useState<HaloNoiseBlendMode>("overlay");
  const [showNoise, setShowNoise] = React.useState<boolean>(true);
  const [zoomInspection, setZoomInspection] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const generatedCode = React.useMemo(() => {
    return `<HaloSurface
  elevation="raised"
  intensity="balanced"
  className="relative p-8 rounded-2xl overflow-hidden"
>
  {/* Layer 04: Directional Highlight */}
  <HaloHighlight kind="broad" strength="balanced" />

  {/* Layer 08: Micro-Grain Noise (Banding Mitigation) */}
  ${showNoise ? `<HaloNoise strength="${strength}" blendMode="${blendMode}" />` : "<!-- Noise Disabled -->"}

  {/* Layer 03: Optical Boundary Edge */}
  <HaloEdge strength="balanced" placement="both" />

  {/* Consumer Content Layer */}
  <div className="relative z-10 space-y-3">
    <h3 className="text-lg font-semibold tracking-tight text-foreground">
      Organic Material Tooth
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Continuous fractal noise breaks sterile 8-bit banding across translucent gradients.
    </p>
  </div>
</HaloSurface>`;
  }, [strength, blendMode, showNoise]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setStrength("balanced");
    setBlendMode("overlay");
    setShowNoise(true);
    setZoomInspection(false);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate micro-grain noise density, blend modes, and anti-banding dispersion across optical environments."
      badge="Micro-Texture Tooth"
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
          {/* Strength Selector */}
          <StageControlGroup label="Density">
            {(["subtle", "balanced", "strong"] as const).map((s) => (
              <StageControlButton
                key={s}
                active={strength === s}
                onClick={() => setStrength(s)}
              >
                {s}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Blend Mode Selector */}
          <StageControlGroup label="Blend">
            {(["overlay", "soft-light", "screen"] as const).map((m) => (
              <StageControlButton
                key={m}
                active={blendMode === m}
                onClick={() => setBlendMode(m)}
              >
                {m}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="noise-toggle"
                checked={showNoise}
                onCheckedChange={(checked) => setShowNoise(checked === true)}
              />
              <label
                htmlFor="noise-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Active Noise Tooth
              </label>
            </div>

            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="zoom-toggle"
                checked={zoomInspection}
                onCheckedChange={(checked) => setZoomInspection(checked === true)}
              />
              <label
                htmlFor="zoom-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                400% Zoom Inspector
              </label>
            </div>
          </div>
        </div>
      }
      telemetry={[
        { label: "Algorithm", value: "Fractal Turbulence" },
        { label: "A11y", value: "aria-hidden", variant: "success" },
        {
          label: "Tooth",
          value: showNoise ? `${strength} · ${blendMode}` : "Disabled",
          variant: showNoise ? "default" : "warning",
        },
      ]}
    >
      <HaloSurface
        elevation="raised"
        intensity="balanced"
        className={cn(
          "relative w-full rounded-3xl p-7 sm:p-9 text-left overflow-hidden transition-all duration-300",
          zoomInspection && "scale-105 ring-2 ring-primary/40 shadow-2xl"
        )}
      >
        {/* Layer 04: Directional Highlight */}
        <HaloHighlight kind="broad" strength="balanced" />

        {/* Layer 08: Micro-Grain Noise */}
        {showNoise && (
          <HaloNoise
            strength={strength}
            blendMode={blendMode}
            className={cn(
              zoomInspection && "[background-size:400px_400px] !opacity-30"
            )}
          />
        )}

        {/* Layer 03: Optical Boundary Edge */}
        <HaloEdge strength="balanced" placement="both" />

        {/* Surface Content */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <HaloIcon icon={SparklesIcon} size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-foreground">
                  Organic Material Tooth
                </h4>
                <p className="text-xs text-muted-foreground">
                  HaloUI Physical Layer 08 · Anti-Banding Tooth
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="text-[11px] font-mono border-border bg-muted/40"
            >
              {showNoise ? `${strength} · ${blendMode}` : "Noise OFF"}
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            Smooth gradients across translucent materials suffer from quantization artifacts on 8-bit displays. HaloNoise injects high-frequency procedural micro-grain to continuously disperse illumination.
          </p>

          {/* Substrate Test Bar */}
          <div className="h-10 w-full rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-border flex items-center justify-between px-3 text-[11px] font-mono text-muted-foreground">
            <span>8-Bit Dither Test</span>
            <strong className="text-foreground font-medium">
              {zoomInspection ? "Zoomed 400% Inspector Mode" : "Native 1:1 Rendering"}
            </strong>
          </div>
        </div>
      </HaloSurface>
    </PreviewStageShell>
  );
}
