"use client";

import * as React from "react";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  Layers01Icon,
  CheckmarkCircle02Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import { HaloButton } from "@/components/haloui/button/halo-button";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import type { HaloMaterialIntensity } from "@/components/haloui/foundations/halo-theme-provider";

export function ThemePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [simulatedIntensity, setSimulatedIntensity] =
    React.useState<HaloMaterialIntensity>("balanced");
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    return `import { HaloThemeProvider, useHaloTheme } from "@/components/ui/halo-theme-provider";
import { HaloSurface } from "@/components/ui/halo-surface";
import { HaloButton } from "@/components/ui/halo-button";

// 1. Root Layout Wrap
export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HaloThemeProvider
      defaultMaterialIntensity="${simulatedIntensity}"
      enableSystem
    >
      {children}
    </HaloThemeProvider>
  );
}

// 2. Child Consumer Component
export function SettingsWidget() {
  const { materialIntensity, setMaterialIntensity } = useHaloTheme();

  return (
    <HaloSurface elevation="raised" intensity={materialIntensity} className="p-6 rounded-2xl max-w-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold">Material Intensity</h4>
          <p className="text-xs text-muted-foreground">{materialIntensity}</p>
        </div>
        <HaloButton
          size="sm"
          variant="secondary"
          onClick={() => setMaterialIntensity("${
            simulatedIntensity === "rich" ? "subtle" : "rich"
          }")}
        >
          Cycle Preset
        </HaloButton>
      </div>
    </HaloSurface>
  );
}`;
  }, [simulatedIntensity]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("neutral");
    setViewport("desktop");
    setSimulatedIntensity("balanced");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate application-wide material intensity defaults and responsive theme propagation."
      badge="Theme Orchestration"
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
          {/* Material Intensity Selector */}
          <StageControlGroup label="Intensity">
            {(["subtle", "balanced", "rich"] as const).map((inte) => (
              <StageControlButton
                key={inte}
                active={simulatedIntensity === inte}
                onClick={() => setSimulatedIntensity(inte)}
              >
                {inte}
              </StageControlButton>
            ))}
          </StageControlGroup>
        </div>
      }
      telemetry={[
        { label: "Storage", value: "localStorage / SSR Safe" },
        { label: "A11y", value: "WCAG Dual-Contrast", variant: "success" },
        {
          label: "Active Preset",
          value: simulatedIntensity,
          variant: "default",
        },
      ]}
    >
      <div
        className="w-full max-w-md transition-all duration-300"
        data-material-intensity={simulatedIntensity}
      >
        <HaloSurface
          elevation="raised"
          intensity={simulatedIntensity}
          className="relative p-6 sm:p-8 rounded-3xl space-y-6 text-left border border-border/80 shadow-xl transition-all duration-300"
        >
          <HaloHighlight
            kind="specular"
            strength={simulatedIntensity === "rich" ? "strong" : simulatedIntensity === "subtle" ? "subtle" : "balanced"}
          />
          <HaloEdge
            placement="both"
            strength={simulatedIntensity === "rich" ? "strong" : "balanced"}
          />

          {/* Surface Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono border border-border bg-muted/40 text-foreground">
                <HaloIcon icon={Settings01Icon} size={12} />
                <span>HaloThemeProvider Scope</span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Theme Orchestration
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {simulatedIntensity}
              </span>
            </div>
          </div>

          {/* Status Indicator Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl border border-border bg-muted/20 space-y-1">
              <div className="text-muted-foreground text-[11px] flex items-center gap-1">
                <HaloIcon icon={SparklesIcon} size={12} />
                <span>Material Intensity</span>
              </div>
              <div className="font-semibold capitalize text-foreground">
                {simulatedIntensity}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                {simulatedIntensity === "subtle"
                  ? "8px blur · 0.40 highlight"
                  : simulatedIntensity === "balanced"
                  ? "16px blur · 0.85 highlight"
                  : "28px blur · 1.20 highlight"}
              </div>
            </div>

            <div className="p-3 rounded-2xl border border-border bg-muted/20 space-y-1">
              <div className="text-muted-foreground text-[11px] flex items-center gap-1">
                <HaloIcon icon={Layers01Icon} size={12} />
                <span>Synchronized Sync</span>
              </div>
              <div className="font-semibold capitalize text-foreground">
                Main Site Theme
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                Auto-tracks navbar
              </div>
            </div>
          </div>

          {/* Interactive Controls inside Provider */}
          <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <HaloIcon icon={CheckmarkCircle02Icon} size={14} className="text-emerald-500" />
              <span>Hydration safe</span>
            </div>
            <div className="flex items-center gap-2">
              <HaloButton
                size="sm"
                variant="neutral"
                onClick={() =>
                  setSimulatedIntensity(
                    simulatedIntensity === "subtle"
                      ? "balanced"
                      : simulatedIntensity === "balanced"
                      ? "rich"
                      : "subtle"
                  )
                }
              >
                Cycle Intensity
              </HaloButton>
            </div>
          </div>
        </HaloSurface>
      </div>
    </PreviewStageShell>
  );
}
