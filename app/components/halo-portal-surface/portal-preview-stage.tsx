"use client";

import * as React from "react";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Layers01Icon,
  CheckmarkCircle02Icon,
  Notification01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { HaloPortalSurface } from "@/components/haloui/foundations/halo-portal-surface";
import { HaloButton } from "@/components/haloui/button/halo-button";
import {
  PreviewStageShell,
  StageControlGroup,
  StageControlButton,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import type { SurfaceElevation, SurfaceIntensity } from "@/components/haloui/foundations/halo-surface";

type OverlayType = "modal" | "popover" | "menu";

export function PortalPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("spectral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [overlayType, setOverlayType] = React.useState<OverlayType>("modal");
  const [elevation, setElevation] = React.useState<SurfaceElevation>("overlay");
  const [intensity, setIntensity] = React.useState<SurfaceIntensity>("balanced");
  const [copied, setCopied] = React.useState(false);

  const generatedCode = React.useMemo(() => {
    return `import { HaloPortalSurface } from "@/components/ui/halo-portal-surface";
import { HaloButton } from "@/components/ui/halo-button";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export function PortalledModal() {
  return (
    <DialogPrimitive.Portal>
      {/* 1. Underlying Scrim */}
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

      {/* 2. Canonical Liquid Portal Surface */}
      <DialogPrimitive.Content asChild>
        <HaloPortalSurface
          elevation="${elevation}"
          intensity="${intensity}"
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 rounded-2xl z-50 border shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-semibold text-foreground">Portalled Confirmation</h3>
            <span className="text-[11px] font-mono text-muted-foreground">${elevation}</span>
          </div>
          <p className="py-4 text-xs text-muted-foreground leading-relaxed">
            Consistently retains the 10-layer physical liquid optical model, specular highlight catch, and edge boundary even when portalled to document.body.
          </p>
          <div className="flex justify-end gap-2">
            <HaloButton variant="outline" size="sm">Cancel</HaloButton>
            <HaloButton variant="primary" size="sm">Confirm Action</HaloButton>
          </div>
        </HaloPortalSurface>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}`;
  }, [elevation, intensity]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setBackdrop("spectral");
    setViewport("desktop");
    setOverlayType("modal");
    setElevation("overlay");
    setIntensity("balanced");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Evaluate optical persistence across portalled modal dialogs, popovers, and floating dropdown menus."
      badge="Portalled Overlays"
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
          {/* Overlay Archetype Selector */}
          <StageControlGroup label="Archetype">
            {(["modal", "popover", "menu"] as const).map((type) => (
              <StageControlButton
                key={type}
                active={overlayType === type}
                onClick={() => setOverlayType(type)}
              >
                {type}
              </StageControlButton>
            ))}
          </StageControlGroup>

          {/* Elevation Selector */}
          <StageControlGroup label="Elevation">
            {(["floating", "overlay"] as const).map((elev) => (
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
        </>
      }
      telemetry={[
        { label: "Target", value: "document.body / Slot" },
        { label: "A11y", value: "Focus Trap Ready", variant: "success" },
        {
          label: "Hierarchy",
          value: `${overlayType} · ${elevation}`,
          variant: "default",
        },
      ]}
    >
      <div className="relative w-full flex items-center justify-center min-h-[360px]">
        {/* Simulated underlying page content */}
        <div className="absolute inset-4 opacity-25 pointer-events-none select-none flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-bold text-xs tracking-wider uppercase">Underlying Page Header</span>
            <span className="text-[11px] font-mono text-muted-foreground">z-index: 0</span>
          </div>
          <div className="space-y-2 py-4">
            <div className="h-3 w-3/4 rounded bg-current/20" />
            <div className="h-3 w-1/2 rounded bg-current/20" />
            <div className="h-3 w-5/6 rounded bg-current/20" />
          </div>
          <div className="text-[11px] font-mono text-muted-foreground">
            Portal root mounts to target container (e.g. document.body)
          </div>
        </div>

        {/* Portalled Floating Surface Presentation */}
        <div className="relative z-20 w-full max-w-md">
          {overlayType === "modal" && (
            <HaloPortalSurface
              elevation={elevation}
              intensity={intensity}
              className="p-6 md:p-8 rounded-3xl space-y-5 border border-border/80 shadow-2xl text-left"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono border border-border bg-muted/40 text-foreground">
                    <HaloIcon icon={Layers01Icon} size={12} />
                    <span>Portalled Modal Surface</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    Security Verification
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {elevation}
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Notice how specular refraction and edge thickness remain intact despite DOM relocation outside the page flow.
              </p>

              <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <HaloIcon icon={CheckmarkCircle02Icon} size={14} className="text-emerald-500" />
                  <span>Focus Trap Ready</span>
                </span>
                <div className="flex items-center gap-2">
                  <HaloButton size="sm" variant="neutral">
                    Dismiss
                  </HaloButton>
                  <HaloButton size="sm" variant="primary">
                    Authorize
                  </HaloButton>
                </div>
              </div>
            </HaloPortalSurface>
          )}

          {overlayType === "popover" && (
            <HaloPortalSurface
              elevation={elevation}
              intensity={intensity}
              className="p-5 rounded-3xl space-y-4 border border-border/80 max-w-xs mx-auto shadow-2xl text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <HaloIcon icon={Notification01Icon} size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Telemetry Alert</h4>
                  <p className="text-[11px] text-muted-foreground">Floating Popover Surface</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Retains full physical transmission against dynamic parent backdrops.
              </p>
              <div className="flex justify-end gap-2 pt-1 border-t border-border/50">
                <HaloButton size="sm" variant="primary">Acknowledge</HaloButton>
              </div>
            </HaloPortalSurface>
          )}

          {overlayType === "menu" && (
            <HaloPortalSurface
              elevation={elevation}
              intensity={intensity}
              className="p-2 rounded-2xl border border-border/80 max-w-[220px] mx-auto shadow-2xl text-left space-y-1"
            >
              <div className="px-2.5 py-1.5 text-[11px] font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/50">
                <HaloIcon icon={Menu01Icon} size={12} />
                <span>Command Menu</span>
              </div>
              <div className="px-2 py-1.5 rounded-lg hover:bg-muted/60 text-xs font-medium text-foreground cursor-pointer transition-colors">
                Profile Settings
              </div>
              <div className="px-2 py-1.5 rounded-lg hover:bg-muted/60 text-xs font-medium text-foreground cursor-pointer transition-colors">
                Substrate Audit
              </div>
              <div className="px-2 py-1.5 rounded-lg hover:bg-muted/60 text-xs font-medium text-foreground cursor-pointer transition-colors">
                Export Assets
              </div>
            </HaloPortalSurface>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
