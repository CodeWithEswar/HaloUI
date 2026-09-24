"use client";

import * as React from "react";
import {
  SparklesIcon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import {
  HaloHighlight,
  type HaloHighlightKind,
  type HaloHighlightStrength,
} from "@/components/haloui/foundations/halo-highlight";
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

export function HighlightPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [stageTheme, setStageTheme] = React.useState<StageTheme>("dark");
  const [kind, setKind] = React.useState<HaloHighlightKind>("broad");
  const [strength, setStrength] = React.useState<HaloHighlightStrength>("balanced");
  const [showHighlight, setShowHighlight] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);

  const generatedCode = React.useMemo(() => {
    return `<HaloSurface
  elevation="raised"
  intensity="balanced"
  className="relative p-8 rounded-2xl overflow-hidden"
>
  {/* Layer 04: Directional Light Vector (135°) */}
  ${showHighlight ? `<HaloHighlight kind="${kind}" strength="${strength}" />` : "<!-- Highlight Disabled -->"}

  {/* Layer 03: Optical Boundary Edge */}
  <HaloEdge strength="balanced" placement="both" />

  {/* Consumer Content Layer */}
  <div className="relative z-10 space-y-3">
    <h3 className="text-lg font-semibold tracking-tight text-foreground">
      Directional Reflected Light
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Received illumination along the 135° virtual light vector establishes surface orientation.
    </p>
  </div>
</HaloSurface>`;
  }, [kind, strength, showHighlight]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setKind("broad");
    setStrength("balanced");
    setShowHighlight(true);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate directional light highlights across viewports, environments, angles, and luminous intensity tiers."
      badge="Specular Lighting"
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
          {/* Kind Selector */}
          <StageControlGroup label="Profile">
            {(["edge", "broad", "specular"] as const).map((k) => (
              <StageControlButton
                key={k}
                active={kind === k}
                onClick={() => setKind(k)}
              >
                {k}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Strength Selector */}
          <StageControlGroup label="Intensity">
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

          {/* Highlight Active Toggle */}
          <div className="flex items-center gap-2 pt-1 sm:pt-0">
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="highlight-toggle"
                checked={showHighlight}
                onCheckedChange={(checked) => setShowHighlight(checked === true)}
              />
              <label
                htmlFor="highlight-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Active Specular Light
              </label>
            </div>
          </div>
        </>
      }
      telemetry={[
        { label: "Vector", value: "135° Fixed" },
        { label: "Falloff", value: kind === "broad" ? "Linear (100px)" : "Exponential" },
        {
          label: "Status",
          value: showHighlight ? "Active Luminous" : "Diffused Substrate",
          variant: showHighlight ? "default" : "warning",
        },
      ]}
    >
      {/* The Halo Material Assembly with HaloHighlight */}
      <HaloSurface
        elevation="raised"
        intensity="balanced"
        className="relative w-full rounded-3xl p-7 sm:p-9 text-left overflow-hidden transition-all duration-300"
      >
        {/* Layer 04: Directional Light Highlight */}
        {showHighlight && (
          <HaloHighlight kind={kind} strength={strength} />
        )}

        {/* Layer 03: Optical Boundary Edge */}
        <HaloEdge strength="balanced" placement="both" />

        {/* Surface Content */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-foreground/10 border border-border flex items-center justify-center text-foreground">
                <HaloIcon icon={SparklesIcon} size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-foreground">
                  Directional Reflected Light
                </h4>
                <p className="text-xs text-muted-foreground">
                  HaloUI Physical Layer 04 · Specular 135° Illumination
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="text-[10px] font-mono border-border bg-background/60 text-foreground"
            >
              {showHighlight ? `${kind} · ${strength}` : "Highlight OFF"}
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            Received illumination along the 135° virtual light vector establishes surface orientation and creates crisp optical contrast across dark and light substrates.
          </p>

          {/* Substrate Status Bar */}
          <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
            <span className="font-mono text-[11px]">Specular Vector</span>
            <span className="font-mono text-[11px] text-foreground font-medium">
              135° (Top-Left to Bottom-Right)
            </span>
          </div>
        </div>
      </HaloSurface>
    </PreviewStageShell>
  );
}
