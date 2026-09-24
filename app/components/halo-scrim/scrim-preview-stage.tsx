"use client";

import * as React from "react";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  EyeIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HaloScrim, type ScrimBlur, type ScrimTint } from "@/components/haloui/foundations/halo-scrim";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import { HaloEdge } from "@/components/haloui/foundations/halo-edge";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { cn } from "@/lib/utils";

export function ScrimPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("dense");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [blur, setBlur] = React.useState<ScrimBlur>("balanced");
  const [tint, setTint] = React.useState<ScrimTint>("neutral");
  const [isScrimActive, setIsScrimActive] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    return `import { HaloScrim } from "@/components/ui/halo-scrim";
import { HaloPortalSurface } from "@/components/ui/halo-portal-surface";
import { HaloButton } from "@/components/ui/halo-button";
import * as Dialog from "@radix-ui/react-dialog";

export function ModalWithScrim() {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Portal>
        {/* 1. Halo Scrim with calibrated diffusion blur and ambient tint */}
        ${isScrimActive ? `<HaloScrim
          blur="${blur}"
          tint="${tint}"
          className="fixed inset-0 z-40"
        />` : "<!-- Scrim Disabled -->"}

        {/* 2. Elevated Liquid Dialog Surface */}
        <Dialog.Content asChild>
          <HaloPortalSurface
            elevation="overlay"
            intensity="balanced"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 rounded-2xl z-50 border shadow-2xl"
          >
            <Dialog.Title className="text-base font-semibold">Modal Title</Dialog.Title>
            <Dialog.Description className="text-xs text-muted-foreground mt-2">
              Optical blur (${blur}) and tint (${tint}) preserve spatial context while focusing user attention.
            </Dialog.Description>
            <div className="mt-4 flex justify-end gap-2">
              <HaloButton size="sm" variant="outline">Dismiss</HaloButton>
              <HaloButton size="sm" variant="primary">Proceed</HaloButton>
            </div>
          </HaloPortalSurface>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`;
  }, [blur, tint, isScrimActive]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("dense");
    setViewport("desktop");
    setBlur("balanced");
    setTint("neutral");
    setIsScrimActive(true);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate background diffusion blur, ambient tint tiers, and modal focus isolation."
      badge="Background Diffusion"
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
        <>
          {/* Blur Selector */}
          <StageControlGroup label="Blur">
            {(["none", "subtle", "balanced", "deep"] as const).map((b) => (
              <StageControlButton
                key={b}
                active={blur === b}
                onClick={() => setBlur(b)}
              >
                {b}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Tint Selector */}
          <StageControlGroup label="Tint">
            {(["soft", "neutral", "deep", "vibrant"] as const).map((t) => (
              <StageControlButton
                key={t}
                active={tint === t}
                onClick={() => setTint(t)}
              >
                {t}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Scrim Active Toggle */}
          <div className="flex items-center gap-2 pt-1 sm:pt-0">
            <div className="h-9 px-3 rounded-lg border border-border bg-background inline-flex items-center gap-2 shadow-2xs">
              <Checkbox
                id="scrim-active-toggle"
                checked={isScrimActive}
                onCheckedChange={(checked) => setIsScrimActive(checked === true)}
              />
              <label
                htmlFor="scrim-active-toggle"
                className="cursor-pointer font-medium select-none text-foreground text-xs"
              >
                Active Scrim Occlusion
              </label>
            </div>
          </div>
        </>
      }
      telemetry={[
        { label: "Blur", value: blur },
        { label: "Tint", value: tint },
        {
          label: "Occlusion",
          value: isScrimActive ? "Active" : "Bypassed",
          variant: isScrimActive ? "success" : "warning",
        },
      ]}
    >
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[380px] flex items-center justify-center p-6 sm:p-10 border border-border/80">
        {/* Underlying Complex Dashboard Context */}
        <div className="absolute inset-0 p-6 opacity-60 pointer-events-none select-none font-mono text-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 border border-border/60 rounded-xl bg-card/60">
              <div className="font-bold text-sky-500 mb-1">METRIC #9401</div>
              <div className="text-foreground">CPU: 42.1% · MEM: 3.2GB</div>
              <div className="text-[10px] text-muted-foreground mt-2">THREAD POOL: RUNNING</div>
            </div>
            <div className="p-3 border border-border/60 rounded-xl bg-card/60">
              <div className="font-bold text-emerald-500 mb-1">STATUS NODE</div>
              <div className="text-foreground">UPTIME: 99.98% · OK</div>
              <div className="text-[10px] text-muted-foreground mt-2">REGION: US-EAST-HALO</div>
            </div>
            <div className="p-3 border border-border/60 rounded-xl bg-card/60">
              <div className="font-bold text-amber-500 mb-1">LATENCY GRAPH</div>
              <div className="text-foreground">AVG: 14ms · P99: 28ms</div>
              <div className="text-[10px] text-muted-foreground mt-2">OPTICAL QUEUE: 0</div>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-[11px] text-muted-foreground">
            <p>const cluster = await initHaloSystem(&#123; mode: &apos;optical&apos;, layers: 10 &#125;);</p>
            <p>console.log(&apos;[halo-scrim] Backdrop optical diffusion engaged&apos;);</p>
            <p>export function verifyOcclusion() &#123; return true; &#125;</p>
          </div>
        </div>

        {/* The Scrim Layer Under Test */}
        {isScrimActive && (
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300 z-10",
              blur === "none" && "backdrop-blur-none",
              blur === "subtle" && "backdrop-blur-xs md:backdrop-blur-sm",
              blur === "balanced" && "backdrop-blur-sm md:backdrop-blur-md",
              blur === "deep" && "backdrop-blur-md md:backdrop-blur-lg",
              tint === "soft" && "bg-black/20 dark:bg-black/35",
              tint === "neutral" && "bg-black/35 dark:bg-black/55",
              tint === "deep" && "bg-black/60 dark:bg-black/80",
              tint === "vibrant" && "bg-[#07090e]/50 backdrop-saturate-150"
            )}
          />
        )}

        {/* Elevated Surface Resting Above Scrim */}
        <div className="relative z-20 w-full max-w-md">
          <HaloSurface
            elevation="overlay"
            intensity="rich"
            className="p-6 md:p-8 rounded-3xl border border-border/80 space-y-4 shadow-2xl text-left"
          >
            <HaloHighlight kind="specular" strength="strong" />
            <HaloEdge placement="both" strength="strong" />

            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono border border-border bg-muted/40 text-foreground">
                  <HaloIcon icon={EyeIcon} size={12} />
                  <span>Active Modal Session</span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  Optical Focus Isolation
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {blur} blur
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Observe how the underlying metrics and telemetry code are softened and occluded, elevating the foreground surface without jarring visual separation.
            </p>

            <div className="pt-2 border-t border-border/50 flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <HaloIcon icon={CheckmarkCircle02Icon} size={14} className="text-emerald-500" />
                <span>Dismissible</span>
              </span>
              <HaloButton
                size="sm"
                variant="primary"
                onClick={() => setIsScrimActive(!isScrimActive)}
              >
                {isScrimActive ? "Hide Scrim" : "Show Scrim"}
              </HaloButton>
            </div>
          </HaloSurface>
        </div>
      </div>
    </PreviewStageShell>
  );
}
