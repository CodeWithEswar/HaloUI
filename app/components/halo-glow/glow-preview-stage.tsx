"use client";

import * as React from "react";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import {
  HaloGlow,
  type HaloGlowVariant,
  type HaloGlowStrength,
  type HaloGlowColor,
} from "@/components/haloui/foundations/halo-glow";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
  type StageTheme,
} from "@/components/docs/preview-stage-shell";

export function GlowPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [stageTheme, setStageTheme] = React.useState<StageTheme>("dark");
  const [variant, setVariant] = React.useState<HaloGlowVariant>("ambient");
  const [strength, setStrength] = React.useState<HaloGlowStrength>("balanced");
  const [color, setColor] = React.useState<HaloGlowColor>("neutral");
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [showGlow, setShowGlow] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);

  const effectiveVariant = isHovered ? "active" : variant;

  const generatedCode = React.useMemo(() => {
    return `<div className="relative">
  {/* Layer 07: Ambient Luminous Glow (Non-clipping outer diffusion) */}
  ${showGlow ? `<HaloGlow
    variant="${effectiveVariant}"
    strength="${strength}"
    color="${color}"
  />` : "<!-- Glow Disabled -->"}

  {/* Host Surface */}
  <HaloSurface
    elevation="floating"
    intensity="balanced"
    className="relative p-8 rounded-2xl"
  >
    <HaloHighlight kind="broad" strength="balanced" />
    <HaloEdge strength="balanced" placement="both" />

    <div className="relative z-10 space-y-2">
      <h3 className="text-lg font-semibold text-foreground">
        Ambient Emphasis
      </h3>
      <p className="text-sm text-muted-foreground">
        Luminous aura diffuses outside the material boundary without clipping.
      </p>
    </div>
  </HaloSurface>
</div>`;
  }, [effectiveVariant, strength, color, showGlow]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setVariant("ambient");
    setStrength("balanced");
    setColor("neutral");
    setIsHovered(false);
    setShowGlow(true);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate ambient diffusion glow across viewports, environments, chromatic palettes, and luminance strength."
      badge="Ambient Glow"
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
        <>
          {/* Profile Selector */}
          <StageControlGroup label="Profile">
            {(["ambient", "emphasis", "active"] as const).map((v) => (
              <StageControlButton
                key={v}
                active={variant === v}
                onClick={() => setVariant(v)}
              >
                {v}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Color Selector */}
          <StageControlGroup label="Color">
            {(["neutral", "primary", "accent"] as const).map((c) => (
              <StageControlButton
                key={c}
                active={color === c}
                onClick={() => setColor(c)}
              >
                {c}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Strength Selector */}
          <StageControlGroup label="Strength">
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

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="glow-toggle"
                checked={showGlow}
                onCheckedChange={(checked) => setShowGlow(checked === true)}
              />
              <label
                htmlFor="glow-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Active Luminous Glow
              </label>
            </div>
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="glow-hover-toggle"
                checked={isHovered}
                onCheckedChange={(checked) => setIsHovered(checked === true)}
              />
              <label
                htmlFor="glow-hover-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Simulate Hover
              </label>
            </div>
          </div>
        </>
      }
      telemetry={[
        { label: "Diffusion", value: "-inset-3 / blur-2xl" },
        { label: "A11y", value: "aria-hidden", variant: "success" },
        {
          label: "State",
          value: effectiveVariant,
          variant: effectiveVariant === "active" ? "warning" : "default",
        },
      ]}
    >
      {/* Component Under Test */}
      <div
        className="relative w-full transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Layer 07: Ambient Luminous Glow */}
        {showGlow && (
          <HaloGlow
            variant={effectiveVariant}
            strength={strength}
            color={color}
          />
        )}

        {/* Host Surface */}
        <HaloSurface
          elevation="floating"
          intensity="balanced"
          className="relative w-full rounded-3xl p-7 sm:p-9 text-left overflow-hidden transition-all duration-300"
        >
          <HaloHighlight kind="broad" strength="balanced" />
          <HaloEdge strength="balanced" placement="both" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Ambient Emphasis
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded border border-border bg-muted/40">
                {effectiveVariant} · {color}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Luminous aura diffuses outside the material boundary without clipping or compromising text legibility.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-muted-foreground border-t border-border/50">
              <span>Diffusion: non-clipping</span>
              <span>Strength: {strength}</span>
            </div>
          </div>
        </HaloSurface>
      </div>
    </PreviewStageShell>
  );
}
