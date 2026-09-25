"use client";

import * as React from "react";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ReloadIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import {
  HaloMotion,
  haloMotionTokens,
  type HaloMotionPreset,
} from "@/components/haloui/foundations/halo-motion-presets";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { cn } from "@/lib/utils";

export function MotionPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activePreset, setActivePreset] = React.useState<HaloMotionPreset>("press");
  const [simulateReduced, setSimulateReduced] = React.useState(false);
  const [revealKey, setRevealKey] = React.useState(0);
  const [settleActive, setSettleActive] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const triggerReveal = () => setRevealKey((prev) => prev + 1);
  const triggerSettle = () => {
    setSettleActive(true);
    setTimeout(() => setSettleActive(false), 350);
  };

  const generatedCode = React.useMemo(() => {
    return `import { HaloMotion, haloMotionTokens } from "@/components/ui/halo-motion-presets";
import { HaloSurface } from "@/components/ui/halo-surface";

export function KineticExample() {
  return (
    // 1. Polymorphic Slot composition
    <HaloMotion asChild preset="${activePreset}">
      <HaloSurface elevation="raised" className="p-8 rounded-2xl cursor-pointer">
        <h4 className="font-semibold text-foreground">Interactive Card</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Preset: ${activePreset} · Timing: ${
      activePreset === "press"
        ? haloMotionTokens.duration.micro
        : activePreset === "lift"
        ? haloMotionTokens.duration.state
        : activePreset === "reveal"
        ? haloMotionTokens.duration.reveal
        : haloMotionTokens.duration.settle
    }
        </p>
      </HaloSurface>
    </HaloMotion>
  );
}`;
  }, [activePreset]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setActivePreset("press");
    setSimulateReduced(false);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate tactile physical compression, spring ascension, and entry reveals across kinetic presets."
      badge="Kinetic Physics"
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
          {/* Preset Selector */}
          <StageControlGroup label="Preset">
            {(["press", "lift", "reveal", "settle"] as const).map((p) => (
              <StageControlButton
                key={p}
                active={activePreset === p}
                onClick={() => setActivePreset(p)}
              >
                {p}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center gap-2 pt-1 sm:pt-0">
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="reduced-motion-toggle"
                checked={simulateReduced}
                onCheckedChange={(checked) => setSimulateReduced(checked === true)}
              />
              <label
                htmlFor="reduced-motion-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Simulate prefers-reduced-motion
              </label>
            </div>
          </div>
        </div>
      }
      telemetry={[
        {
          label: "Curve",
          value:
            activePreset === "press"
              ? "Tactile cubic-bezier(0.2, 0.8, 0.3, 1)"
              : "Spring cubic-bezier(0.16, 1, 0.3, 1)",
        },
        {
          label: "Duration",
          value:
            activePreset === "press"
              ? haloMotionTokens.duration.micro
              : activePreset === "lift"
              ? haloMotionTokens.duration.state
              : activePreset === "reveal"
              ? haloMotionTokens.duration.reveal
              : haloMotionTokens.duration.settle,
        },
        {
          label: "A11y",
          value: simulateReduced ? "Motion Bypassed" : "Full Kinetic",
          variant: simulateReduced ? "warning" : "success",
        },
      ]}
    >
      <div
        className={cn(
          "w-full flex flex-col items-center justify-center transition-all",
          simulateReduced && "[&_*]:!transition-none [&_*]:!animation-none [&_*]:!transform-none"
        )}
      >
        {activePreset === "press" && (
          <div className="space-y-4 w-full text-center">
            <HaloMotion asChild preset="press">
              <HaloSurface
                elevation="raised"
                className="p-8 sm:p-9 rounded-3xl cursor-pointer select-none border border-border/70 hover:border-primary/40 text-left relative shadow-sm"
              >
                <HaloEdge strength="balanced" />
                <HaloHighlight kind="broad" strength="balanced" />
                <div className="relative z-10 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-primary font-semibold">
                    Preset: Press · {haloMotionTokens.duration.micro}
                  </span>
                  <h4 className="text-base font-semibold text-foreground">
                    Direct Tactile Compression
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Click or press down to experience the <code>scale(0.98) translateY(1px)</code> physical compression.
                  </p>
                </div>
              </HaloSurface>
            </HaloMotion>
            <p className="text-[11px] text-muted-foreground">
              Applied to buttons, segmented controls, and compact tactile toggles.
            </p>
          </div>
        )}

        {activePreset === "lift" && (
          <div className="space-y-4 w-full text-center">
            <HaloMotion asChild preset="lift">
              <HaloSurface
                elevation="raised"
                className="p-8 sm:p-9 rounded-3xl cursor-pointer select-none border border-border/70 hover:border-primary/40 text-left relative transition-all shadow-sm"
              >
                <HaloEdge strength="balanced" />
                <HaloHighlight kind="broad" strength="balanced" />
                <div className="relative z-10 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-primary font-semibold">
                    Preset: Lift · {haloMotionTokens.duration.state}
                  </span>
                  <h4 className="text-base font-semibold text-foreground">
                    Elevation Ascension
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Hover over this surface to inspect the restrained <code>translateY(-2px)</code> elevation increase.
                  </p>
                </div>
              </HaloSurface>
            </HaloMotion>
            <p className="text-[11px] text-muted-foreground">
              Applied to interactive cards, grid tiles, and selectable items.
            </p>
          </div>
        )}

        {activePreset === "reveal" && (
          <div className="space-y-4 w-full text-center">
            <div key={revealKey} className="halo-motion-reveal">
              <HaloSurface
                elevation="raised"
                className="p-8 sm:p-9 rounded-3xl text-left relative border border-border/70 shadow-sm"
              >
                <HaloEdge strength="balanced" />
                <HaloHighlight kind="broad" strength="balanced" />
                <div className="relative z-10 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-primary font-semibold">
                    Preset: Reveal · {haloMotionTokens.duration.reveal}
                  </span>
                  <h4 className="text-base font-semibold text-foreground">
                    Spring Entrance
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Calibrated opacity fade and subtle scale expansion for entering popovers, menus, and sheets.
                  </p>
                </div>
              </HaloSurface>
            </div>
            <button
              type="button"
              onClick={triggerReveal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium cursor-pointer transition-colors shadow-2xs"
            >
              <HaloIcon icon={ReloadIcon} size={13} />
              <span>Replay Reveal Entrance</span>
            </button>
          </div>
        )}

        {activePreset === "settle" && (
          <div className="space-y-4 w-full text-center">
            <HaloSurface
              elevation="raised"
              className={cn(
                "p-8 sm:p-9 rounded-3xl text-left relative border border-border/70 transition-transform duration-300 shadow-sm",
                settleActive && "scale-95 translate-y-1"
              )}
            >
              <HaloEdge strength="balanced" />
              <HaloHighlight kind="broad" strength="balanced" />
              <div className="relative z-10 space-y-2">
                <span className="text-[11px] font-mono uppercase text-primary font-semibold">
                  Preset: Settle · {haloMotionTokens.duration.settle}
                </span>
                <h4 className="text-base font-semibold text-foreground">
                  Post-Action Damping
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Decelerating restitution spring curve communicating release grounding without jarring bounces.
                </p>
              </div>
            </HaloSurface>
            <button
              type="button"
              onClick={triggerSettle}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium cursor-pointer transition-colors shadow-2xs"
            >
              <HaloIcon icon={PlayIcon} size={13} />
              <span>Simulate Drop Settle</span>
            </button>
          </div>
        )}
      </div>
    </PreviewStageShell>
  );
}
