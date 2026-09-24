"use client";

import * as React from "react";
import {
  Layers01Icon,
  ComputerIcon,
  LaptopIcon,
  SmartPhone01Icon,
  Tablet01Icon,
  Copy01Icon,
  CheckmarkCircle01Icon,
  ReloadIcon,
  SparklesIcon,
  Clock01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  HaloSurface,
  type MaterialIntensity,
  type MaterialElevation,
} from "@/components/haloui/foundations/halo-surface";
import {
  HaloBackground,
  type PreviewEnvironment,
} from "@/components/haloui/foundations/halo-background";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const ENVIRONMENTS: { id: PreviewEnvironment; label: string }[] = [
  { id: "neutral", label: "Neutral" },
  { id: "paper", label: "Warm Paper" },
  { id: "spectral", label: "Spectral" },
  { id: "image", label: "Image" },
  { id: "dense", label: "Dense UI" },
  { id: "dark", label: "Dark" },
];

export function SurfacePreviewStage() {
  const [environment, setEnvironment] = React.useState<PreviewEnvironment>("neutral");
  const [viewport, setViewport] = React.useState<"fluid" | "desktop" | "laptop" | "tablet" | "phone">("fluid");
  const [intensity, setIntensity] = React.useState<MaterialIntensity>("balanced");
  const [elevation, setElevation] = React.useState<MaterialElevation>("base");
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const viewportWidths = {
    fluid: "w-full",
    desktop: "max-w-[1040px]",
    laptop: "max-w-[840px]",
    tablet: "max-w-[620px]",
    phone: "max-w-[360px]",
  };

  const cardWidths = {
    fluid: "w-full max-w-lg",
    desktop: "w-full max-w-xl",
    laptop: "w-full max-w-lg",
    tablet: "w-full max-w-md",
    phone: "w-full max-w-[320px]",
  };

  const copyInstallCommand = () => {
    navigator.clipboard.writeText("pnpm dlx shadcn@latest add http://localhost:3000/r/halo-surface.json");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetStage = () => {
    setEnvironment("neutral");
    setViewport("fluid");
    setIntensity("balanced");
    setElevation("base");
    setReducedMotion(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* Neutral documentation toolbar (Strictly zero glass in docs shell, all containers h-9, inner items h-7) */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 p-2.5 rounded-xl border border-border bg-muted/30">
        {/* Backdrop Switcher */}
        <div className="flex items-center gap-2 min-w-0 max-w-full">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 shrink-0 h-9 flex items-center select-none">
            Backdrop:
          </span>
          <div
            role="tablist"
            aria-label="Preview background environment"
            className="h-9 p-1 rounded-lg border border-border bg-background inline-flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full"
          >
            {ENVIRONMENTS.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={environment === item.id}
                type="button"
                onClick={() => setEnvironment(item.id)}
                className={cn(
                  "h-7 px-2.5 sm:px-3 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center justify-center",
                  environment === item.id
                    ? "bg-muted text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Viewport and Action Controls */}
        <div className="flex items-center justify-between xl:justify-end gap-2.5 sm:gap-3 shrink-0 w-full xl:w-auto">
          {/* Viewport Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 shrink-0 h-9 flex items-center select-none hidden sm:inline-flex">
              Viewport:
            </span>
            <div
              role="tablist"
              aria-label="Preview viewport"
              className="h-9 p-1 rounded-lg border border-border bg-background inline-flex items-center gap-1"
            >
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setViewport("fluid")}
                  className={cn(
                    "h-7 px-2.5 sm:px-3 rounded-md text-xs font-medium flex items-center justify-center transition-colors cursor-pointer",
                    viewport === "fluid"
                      ? "bg-muted text-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Fluid viewport"
                >
                  Fluid
                </TooltipTrigger>
                <TooltipContent side="top">Fluid Width (100%)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  onClick={() => setViewport("desktop")}
                  className={cn(
                    "h-7 w-7 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                    viewport === "desktop"
                      ? "bg-muted text-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Desktop viewport"
                >
                  <HaloIcon icon={ComputerIcon} size={15} />
                </TooltipTrigger>
                <TooltipContent side="top">Desktop (1040px)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  onClick={() => setViewport("laptop")}
                  className={cn(
                    "h-7 w-7 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                    viewport === "laptop"
                      ? "bg-muted text-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Laptop viewport"
                >
                  <HaloIcon icon={LaptopIcon} size={15} />
                </TooltipTrigger>
                <TooltipContent side="top">Laptop (840px)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  onClick={() => setViewport("tablet")}
                  className={cn(
                    "h-7 w-7 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                    viewport === "tablet"
                      ? "bg-muted text-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Tablet viewport"
                >
                  <HaloIcon icon={Tablet01Icon} size={15} />
                </TooltipTrigger>
                <TooltipContent side="top">Tablet (620px)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  onClick={() => setViewport("phone")}
                  className={cn(
                    "h-7 w-7 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                    viewport === "phone"
                      ? "bg-muted text-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Phone viewport"
                >
                  <HaloIcon icon={SmartPhone01Icon} size={15} />
                </TooltipTrigger>
                <TooltipContent side="top">Phone (360px)</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Tooltip>
              <TooltipTrigger
                onClick={() => setReducedMotion(!reducedMotion)}
                className={cn(
                  "h-9 w-9 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0",
                  reducedMotion
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                aria-label="Toggle reduced motion"
              >
                <HaloIcon icon={Clock01Icon} size={16} />
              </TooltipTrigger>
              <TooltipContent side="top">
                {reducedMotion ? "Reduced Motion: Enabled" : "Reduced Motion: System Default"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={resetStage}
                className="h-9 w-9 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Reset stage parameters"
              >
                <HaloIcon icon={ReloadIcon} size={16} />
              </TooltipTrigger>
              <TooltipContent side="top">Reset Controls</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={copyInstallCommand}
                className="h-9 w-9 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Copy install command"
              >
                <HaloIcon
                  icon={copied ? CheckmarkCircle01Icon : Copy01Icon}
                  size={16}
                  className={copied ? "text-emerald-500" : ""}
                />
              </TooltipTrigger>
              <TooltipContent side="top">
                {copied ? "Copied command to clipboard!" : "Copy Installation Command"}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Primary Stage Environment Frame */}
      <div className="w-full flex justify-center items-center overflow-hidden rounded-2xl border border-border bg-background p-2 sm:p-6 lg:p-10 transition-all">
        <div className={cn("transition-all duration-300 w-full flex justify-center", viewportWidths[viewport])}>
          <HaloBackground
            environment={environment}
            className="flex items-center justify-center min-h-[360px] sm:min-h-[420px] rounded-xl border border-border/40 shadow-inner w-full"
            contentClassName="p-4 sm:p-8 md:p-12 w-full h-full flex items-center justify-center"
          >
            {/* The Canonical Foundation Being Evaluated: HaloSurface */}
            <HaloSurface
              intensity={intensity}
              elevation={elevation}
              className={cn(
                "w-full p-5 sm:p-7 space-y-4 transition-all duration-300",
                cardWidths[viewport]
              )}
            >
              {/* Restrained, Real-world Content (per Section 50: label, heading, short paragraph, metadata row) */}
              <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Liquid Substrate
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-foreground/80">
                  {intensity} · {elevation}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  Refractive Material Engine
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Halo Surface coordinates base tint, background diffusion, and 135° directional specular illumination without clipping focus rings.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-black/[0.04] dark:border-white/[0.06]">
                <span className="font-mono text-[11px]">Layer 01–06 Physical Substrate</span>
                <span className="font-mono text-[11px] text-foreground font-medium">WCAG 2.1 AA</span>
              </div>
            </HaloSurface>
          </HaloBackground>
        </div>
      </div>

      {/* Interactive Controls Bar for Intensity & Elevation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl border border-border bg-muted/20 text-xs">
        {/* Intensity */}
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
          <span className="font-mono text-muted-foreground/80 uppercase tracking-wider text-[11px] shrink-0 h-9 flex items-center select-none">
            Intensity:
          </span>
          <div
            role="tablist"
            aria-label="Material intensity"
            className="h-9 p-1 rounded-lg border border-border bg-background inline-flex items-center gap-1"
          >
            {(["subtle", "balanced", "rich"] as const).map((level) => (
              <button
                key={level}
                role="tab"
                aria-selected={intensity === level}
                type="button"
                onClick={() => setIntensity(level)}
                className={cn(
                  "h-7 px-3 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer flex items-center justify-center",
                  intensity === level
                    ? "bg-muted text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Elevation */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
          <span className="font-mono text-muted-foreground/80 uppercase tracking-wider text-[11px] shrink-0 h-9 flex items-center select-none">
            Elevation:
          </span>
          <div
            role="tablist"
            aria-label="Material elevation"
            className="h-9 p-1 rounded-lg border border-border bg-background inline-flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full"
          >
            {(["inset", "base", "raised", "floating", "overlay"] as const).map((level) => (
              <button
                key={level}
                role="tab"
                aria-selected={elevation === level}
                type="button"
                onClick={() => setElevation(level)}
                className={cn(
                  "h-7 px-2.5 sm:px-3 rounded-md text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center",
                  elevation === level
                    ? "bg-muted text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
