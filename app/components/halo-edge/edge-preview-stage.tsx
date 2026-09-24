"use client";

import * as React from "react";
import {
  SparklesIcon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import {
  HaloEdge,
  type HaloEdgeStrength,
  type HaloEdgePlacement,
} from "@/components/haloui/foundations/halo-edge";
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

export function EdgePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [stageTheme, setStageTheme] = React.useState<StageTheme>("dark");
  const [strength, setStrength] = React.useState<HaloEdgeStrength>("balanced");
  const [placement, setPlacement] = React.useState<HaloEdgePlacement>("both");
  const [showEdge, setShowEdge] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);

  const generatedCode = React.useMemo(() => {
    return `<HaloSurface
  elevation="raised"
  intensity="balanced"
  className="relative p-8 rounded-2xl overflow-hidden"
>
  {/* Layer 03: Optical Boundary Edge */}
  ${showEdge ? `<HaloEdge strength="${strength}" placement="${placement}" />` : "<!-- Edge Disabled (Flat Boundary) -->"}

  {/* Layer 04: Directional Highlight */}
  <HaloHighlight kind="broad" strength="balanced" />

  {/* Consumer Content Layer */}
  <div className="relative z-10 space-y-3">
    <h3 className="text-lg font-semibold tracking-tight text-foreground">
      Sub-Pixel Optical Edge
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Non-uniform hairline boundary and 135° directional specular catches establish physical material thickness.
    </p>
  </div>
</HaloSurface>`;
  }, [strength, placement, showEdge]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setStrength("balanced");
    setPlacement("both");
    setShowEdge(true);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate optical edge hairlines across viewports, environments, strength tiers, and structural placement modes."
      badge="Boundary & Thickness"
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

          {/* Placement Selector */}
          <StageControlGroup label="Placement">
            {(["outer", "inner", "both"] as const).map((p) => (
              <StageControlButton
                key={p}
                active={placement === p}
                onClick={() => setPlacement(p)}
              >
                {p}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Hairline Active Toggle */}
          <div className="flex items-center gap-2 pt-1 sm:pt-0">
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="edge-toggle"
                checked={showEdge}
                onCheckedChange={(checked) => setShowEdge(checked === true)}
              />
              <label
                htmlFor="edge-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Active Optical Edge
              </label>
            </div>
          </div>
        </>
      }
      telemetry={[
        { label: "Vector", value: "135° Specular" },
        { label: "A11y", value: "aria-hidden", variant: "success" },
        {
          label: "Substrate",
          value: showEdge ? "Non-Uniform Hairline" : "Flat Uniform",
          variant: showEdge ? "default" : "warning",
        },
      ]}
    >
      {/* The Halo Material Assembly with HaloEdge */}
      <HaloSurface
        elevation="raised"
        intensity="balanced"
        className="relative w-full rounded-3xl p-7 sm:p-9 text-left overflow-hidden transition-all duration-300"
      >
        {/* Layer 03: The Halo Edge Primitive Under Test */}
        {showEdge && (
          <HaloEdge strength={strength} placement={placement} />
        )}

        {/* Layer 04: Directional Light Highlight */}
        <HaloHighlight kind="broad" strength="balanced" />

        {/* Surface Content */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-foreground/10 border border-border flex items-center justify-center text-foreground">
                <HaloIcon icon={SparklesIcon} size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-foreground">
                  Sub-Pixel Optical Edge
                </h4>
                <p className="text-xs text-muted-foreground">
                  HaloUI Physical Layer 03 · Boundary & Thickness
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="text-[10px] font-mono border-border bg-background/60 text-foreground"
            >
              {showEdge ? `${strength} · ${placement}` : "Edge OFF"}
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            Halo Edge establishes material boundary and perceived physical thickness using outer separation hairlines and inset 135° directional specular catches.
          </p>

          {/* Substrate Status Bar */}
          <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
            <span className="font-mono text-[11px]">Boundary Substrate</span>
            <span className="font-mono text-[11px] text-foreground font-medium">
              {showEdge ? "Non-Uniform Hairline (135° illumination)" : "Flat Uniform Border"}
            </span>
          </div>
        </div>
      </HaloSurface>
    </PreviewStageShell>
  );
}
