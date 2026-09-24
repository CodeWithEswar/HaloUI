"use client";

import * as React from "react";
import {
  SparklesIcon,
  Sun01Icon,
  Moon02Icon,
  Layers01Icon,
  EyeIcon,
  Settings01Icon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  Motion01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { cn } from "@/lib/utils";

type EnvironmentType = "neutral" | "paper" | "spectral" | "image" | "dense-ui" | "dark";
type IntensityType = "subtle" | "balanced" | "rich";
type ElevationType = "inset" | "base" | "raised" | "floating" | "overlay";

export function MaterialLab() {
  const [environment, setEnvironment] = React.useState<EnvironmentType>("neutral");
  const [intensity, setIntensity] = React.useState<IntensityType>("balanced");
  const [elevation, setElevation] = React.useState<ElevationType>("raised");
  const [interactive, setInteractive] = React.useState(true);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Advanced sliders state
  const [customBlur, setCustomBlur] = React.useState<number | null>(null);
  const [customOpacity, setCustomOpacity] = React.useState<number | null>(null);
  const [customHighlight, setCustomHighlight] = React.useState<number | null>(null);
  const [customNoise, setCustomNoise] = React.useState<number | null>(null);

  const blurValue = customBlur ?? (intensity === "subtle" ? 8 : intensity === "balanced" ? 16 : 28);
  const opacityValue = customOpacity ?? (intensity === "subtle" ? 0.45 : intensity === "balanced" ? 0.72 : 0.88);
  const highlightValue = customHighlight ?? (intensity === "subtle" ? 0.4 : intensity === "balanced" ? 0.85 : 1.2);
  const noiseValue = customNoise ?? (intensity === "rich" ? 0.035 : 0.025);

  const resetCustom = () => {
    setCustomBlur(null);
    setCustomOpacity(null);
    setCustomHighlight(null);
    setCustomNoise(null);
  };

  return (
    <div className="my-8 rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
      {/* Lab Header & Status Rail */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-foreground">Material Lab</span>
          <span className="text-muted-foreground font-mono">v1.0 &middot; 10-Layer Optical Core</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground">
          <span>Diffusion: {blurValue}px</span>
          <span>Body: {Math.round(opacityValue * 100)}%</span>
          <span>Specular: {highlightValue}x</span>
        </div>
      </div>

      {/* Main Inspection Canvas */}
      <div className="relative min-h-[380px] p-6 sm:p-10 flex items-center justify-center overflow-hidden isolate select-none">
        {/* Background Environment Layers */}
        {environment === "neutral" && (
          <div className="absolute inset-0 bg-muted/30 dark:bg-muted/10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        )}

        {environment === "paper" && (
          <div className="absolute inset-0 bg-[#f7f5f0] dark:bg-[#181716] opacity-90">
            <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] dark:bg-[radial-gradient(#2d2a27_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
            <div className="absolute top-8 left-8 text-xs font-serif italic text-stone-500/70">
              Typography & Editorial Layout Test Canvas
            </div>
          </div>
        )}

        {environment === "spectral" && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-amber-500/20 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-stone-900">
            <div className="absolute top-1/4 left-1/4 size-72 rounded-full bg-blue-500/25 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 size-64 rounded-full bg-rose-500/20 blur-3xl" />
          </div>
        )}

        {environment === "image" && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80")`,
            }}
          >
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
          </div>
        )}

        {environment === "dense-ui" && (
          <div className="absolute inset-0 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground/60 overflow-hidden opacity-75">
            <div className="grid grid-cols-4 gap-2 border-b border-border/40 pb-2 font-semibold text-foreground/70">
              <span>COMPONENT</span>
              <span>TOKEN</span>
              <span>DIFFUSION</span>
              <span>STATUS</span>
            </div>
            {Array.from({ length: 9 }).map((_, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-2 py-1.5 border-b border-border/20">
                <span className="text-foreground/80">halo-surface-{idx + 1}</span>
                <span>--halo-edge-inner</span>
                <span>{16 + idx * 2}px</span>
                <span className="text-emerald-600 dark:text-emerald-400">calibrated</span>
              </div>
            ))}
          </div>
        )}

        {environment === "dark" && (
          <div className="absolute inset-0 bg-[#090a0c] dark:bg-[#070709]">
            <div className="absolute inset-0 bg-[radial-gradient(#1f2228_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
          </div>
        )}

        {/* Centered HaloUI Surface under Inspection */}
        <HaloSurface
          intensity={intensity}
          elevation={elevation === "inset" ? "recessed" : elevation === "base" ? "flat" : elevation === "floating" ? "floating" : "raised"}
          interactive={interactive}
          className={cn(
            "relative z-10 w-full max-w-sm rounded-2xl p-6 transition-all duration-200",
            reducedMotion && "!transition-none !transform-none",
            elevation === "overlay" && "shadow-[0_24px_64px_-12px_rgba(0,0,0,0.3)] ring-1 ring-border/80"
          )}
          style={{
            backdropFilter: `blur(${blurValue}px)`,
            backgroundColor: `rgba(255, 255, 255, ${opacityValue})`,
          }}
        >
          {/* Surface Content Demonstration */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
                <HaloIcon icon={Layers01Icon} size={15} />
              </span>
              <div>
                <h4 className="text-xs font-semibold text-foreground leading-tight">HaloSurface</h4>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {intensity} &middot; {elevation}
                </span>
              </div>
            </div>
            <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-mono font-medium text-foreground">
              WCAG 2.1 AA
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Translucent optical body maintaining razor-sharp typography and high contrast boundaries over dynamic substrates.
          </p>

          <div className="mt-5 flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
              <HaloIcon icon={CheckmarkCircle01Icon} size={14} className="text-emerald-500" />
              <span>Isolated Content</span>
            </div>
            <HaloButton variant="primary" size="sm" leftIcon={SparklesIcon}>
              Interactive
            </HaloButton>
          </div>
        </HaloSurface>
      </div>

      {/* Control Surface Dock (Strictly neutral shadcn styling, zero glass) */}
      <div className="border-t border-border bg-card p-5 space-y-4">
        {/* Preset Controls */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          {/* 1. Environment */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Environment
            </label>
            <div className="flex flex-wrap gap-1">
              {(["neutral", "paper", "spectral", "image", "dense-ui", "dark"] as EnvironmentType[]).map((env) => (
                <button
                  key={env}
                  type="button"
                  onClick={() => setEnvironment(env)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-[11px] font-medium transition-colors",
                    environment === env
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  {env === "dense-ui" ? "Dense UI" : env.charAt(0).toUpperCase() + env.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Material Intensity */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Intensity
            </label>
            <div className="flex gap-1">
              {(["subtle", "balanced", "rich"] as IntensityType[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setIntensity(lvl);
                    resetCustom();
                  }}
                  className={cn(
                    "flex-1 rounded-md border py-1 text-center text-[11px] font-medium transition-colors",
                    intensity === lvl
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Elevation Tier */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Elevation
            </label>
            <div className="flex flex-wrap gap-1">
              {(["inset", "base", "raised", "floating", "overlay"] as ElevationType[]).map((elv) => (
                <button
                  key={elv}
                  type="button"
                  onClick={() => setElevation(elv)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-[11px] font-medium transition-colors",
                    elevation === elv
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  {elv.charAt(0).toUpperCase() + elv.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Modes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Behavior
            </label>
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-[11px] font-medium text-foreground">
                <Switch checked={interactive} onCheckedChange={setInteractive} />
                <span>Tactile Physics</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[11px] font-medium text-foreground">
                <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                <span>Reduced Motion</span>
              </label>
            </div>
          </div>
        </div>

        {/* Collapsible Advanced Property Inspector */}
        <div className="pt-2 border-t border-border/60">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <HaloIcon icon={Settings01Icon} size={14} />
            <span>{showAdvanced ? "Hide Advanced Inspector" : "Advanced Optical Inspector"}</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4 rounded-xl border border-border bg-muted/20 p-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Diffusion (Blur)</span>
                  <span>{blurValue}px</span>
                </div>
                <Slider
                  min={0}
                  max={44}
                  step={2}
                  value={[blurValue]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : (val as number);
                    setCustomBlur(v);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Surface Tint Opacity</span>
                  <span>{Math.round(opacityValue * 100)}%</span>
                </div>
                <Slider
                  min={0.1}
                  max={0.98}
                  step={0.02}
                  value={[opacityValue]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : (val as number);
                    setCustomOpacity(v);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Specular Strength</span>
                  <span>{highlightValue.toFixed(2)}x</span>
                </div>
                <Slider
                  min={0}
                  max={1.5}
                  step={0.05}
                  value={[highlightValue]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : (val as number);
                    setCustomHighlight(v);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Noise Grain Mask</span>
                  <span>{(noiseValue * 100).toFixed(1)}%</span>
                </div>
                <Slider
                  min={0}
                  max={0.08}
                  step={0.005}
                  value={[noiseValue]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : (val as number);
                    setCustomNoise(v);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
