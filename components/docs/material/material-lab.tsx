"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  SparklesIcon,
  Sun01Icon,
  Moon02Icon,
  Layers01Icon,
  Settings01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { cn } from "@/lib/utils";

type EnvironmentType = "neutral" | "paper" | "spectral" | "image" | "dense-ui" | "dark";
type IntensityType = "subtle" | "balanced" | "rich";
type ElevationType = "inset" | "base" | "raised" | "floating" | "overlay";
type ThemeMode = "light" | "dark";

export function MaterialLab() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Theme control: allow explicit toggle, fallback to resolved theme
  const [surfaceTheme, setSurfaceTheme] = React.useState<ThemeMode | "auto">("auto");
  const isDark = surfaceTheme === "auto" ? (mounted ? resolvedTheme === "dark" : false) : surfaceTheme === "dark";

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
  const opacityValue =
    customOpacity ??
    (intensity === "subtle" ? (isDark ? 0.55 : 0.45) : intensity === "balanced" ? (isDark ? 0.75 : 0.72) : (isDark ? 0.9 : 0.88));
  const highlightValue = customHighlight ?? (intensity === "subtle" ? 0.4 : intensity === "balanced" ? 0.85 : 1.2);
  const noiseValue = customNoise ?? (intensity === "rich" ? 0.035 : 0.025);

  const isCustomized =
    customBlur !== null || customOpacity !== null || customHighlight !== null || customNoise !== null;

  const resetCustom = () => {
    setCustomBlur(null);
    setCustomOpacity(null);
    setCustomHighlight(null);
    setCustomNoise(null);
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      {/* Lab Header & Live Status Rail */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3 sm:px-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-foreground">Material Lab</span>
          <span className="font-mono text-muted-foreground">v1.0 &middot; 10-Layer Optical Core</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px] text-muted-foreground">
          <span>Mode: <strong className="font-semibold text-foreground capitalize">{isDark ? "Dark" : "Light"}</strong></span>
          <span>Diffusion: <strong className="font-semibold text-foreground">{blurValue}px</strong></span>
          <span>Body: <strong className="font-semibold text-foreground">{Math.round(opacityValue * 100)}%</strong></span>
          <span>Specular: <strong className="font-semibold text-foreground">{highlightValue}x</strong></span>
        </div>
      </div>

      {/* Main Inspection Canvas */}
      <div
        className={cn(
          "relative min-h-[380px] p-6 sm:p-10 flex items-center justify-center overflow-hidden isolate select-none transition-colors duration-200",
          isDark ? "dark bg-[#0a0b0e]" : "bg-[#f8f9fa]"
        )}
      >
        {/* Background Environment Layers */}
        {environment === "neutral" && (
          <div className="absolute inset-0 bg-muted/30 dark:bg-muted/10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        )}

        {environment === "paper" && (
          <div className={cn("absolute inset-0 transition-colors duration-200", isDark ? "bg-[#181716]" : "bg-[#f7f5f0]")}>
            <div
              className={cn(
                "absolute inset-0 [background-size:16px_16px] opacity-70",
                isDark
                  ? "bg-[radial-gradient(#2d2a27_1px,transparent_1px)]"
                  : "bg-[radial-gradient(#d6cfc4_1px,transparent_1px)]"
              )}
            />
            <div className="absolute top-6 left-6 text-xs font-serif italic text-muted-foreground/70 hidden sm:block">
              Typography &amp; Editorial Layout Test Canvas
            </div>
          </div>
        )}

        {environment === "spectral" && (
          <div className={cn(
            "absolute inset-0 transition-colors duration-300",
            isDark
              ? "bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-stone-950"
              : "bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-amber-500/15"
          )}>
            <div className="absolute top-1/4 left-1/4 size-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 size-64 rounded-full bg-rose-500/15 blur-3xl" />
          </div>
        )}

        {environment === "image" && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80")`,
            }}
          >
            <div className={cn("absolute inset-0 transition-colors", isDark ? "bg-black/50" : "bg-black/20")} />
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
          <div className="absolute inset-0 bg-[#07080a]">
            <div className="absolute inset-0 bg-[radial-gradient(#1e2229_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
          </div>
        )}

        {/* Centered HaloUI Surface under Inspection */}
        <HaloSurface
          intensity={intensity}
          elevation={
            elevation === "inset"
              ? "recessed"
              : elevation === "base"
              ? "flat"
              : elevation === "floating"
              ? "floating"
              : "raised"
          }
          interactive={interactive}
          className={cn(
            "relative z-10 w-full max-w-sm rounded-2xl p-5 sm:p-6 transition-all duration-200",
            reducedMotion && "!transition-none !transform-none",
            isDark
              ? "text-stone-100 border-white/[0.14] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
              : "text-stone-900 border-white/[0.85] shadow-[0_16px_36px_-8px_rgba(0,0,0,0.08)]",
            elevation === "overlay" &&
              (isDark
                ? "shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/20"
                : "shadow-[0_24px_64px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/10")
          )}
          style={{
            backdropFilter: `blur(${blurValue}px)`,
            WebkitBackdropFilter: `blur(${blurValue}px)`,
            backgroundColor: isDark
              ? `rgba(22, 23, 26, ${opacityValue})`
              : `rgba(255, 255, 255, ${opacityValue})`,
          }}
        >
          {/* Surface Content Demonstration */}
          <div className="flex items-center justify-between border-b border-current/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-lg",
                  isDark ? "bg-white/10 text-white" : "bg-black/5 text-stone-900"
                )}
              >
                <HaloIcon icon={Layers01Icon} size={15} />
              </span>
              <div>
                <h4 className={cn("text-xs font-semibold leading-tight", isDark ? "text-white" : "text-stone-950")}>
                  HaloSurface
                </h4>
                <span
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-wider",
                    isDark ? "text-stone-400" : "text-stone-500"
                  )}
                >
                  {intensity} &middot; {elevation}
                </span>
              </div>
            </div>
            <span
              className={cn(
                "rounded-md border px-2 py-0.5 text-[10px] font-mono font-medium",
                isDark ? "border-white/15 bg-white/10 text-stone-200" : "border-black/10 bg-black/5 text-stone-800"
              )}
            >
              WCAG 2.1 AA
            </span>
          </div>

          <p className={cn("text-xs leading-relaxed", isDark ? "text-stone-300" : "text-stone-600")}>
            Translucent optical body maintaining razor-sharp typography and high contrast boundaries over dynamic substrates.
          </p>

          <div className="mt-5 flex items-center justify-between pt-2">
            <div
              className={cn(
                "flex items-center gap-1.5 text-[11px] font-mono",
                isDark ? "text-stone-400" : "text-stone-500"
              )}
            >
              <HaloIcon icon={CheckmarkCircle01Icon} size={14} className="text-emerald-500" />
              <span>Isolated Content</span>
            </div>
            <HaloButton variant="primary" size="sm" leftIcon={SparklesIcon}>
              Interactive
            </HaloButton>
          </div>
        </HaloSurface>
      </div>

      {/* Control Surface Dock: Fully Responsive, Cleanly Structured */}
      <div className="border-t border-border bg-card p-4 sm:p-6 space-y-5">
        {/* Row 1: Environment Substrates (Responsive 3x2 on mobile, 6x1 on desktop) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Environment Substrate
            </label>
            <span className="text-[10px] font-mono text-muted-foreground">6 Test Substrates</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 w-full">
            {(["neutral", "paper", "spectral", "image", "dense-ui", "dark"] as EnvironmentType[]).map((env) => (
              <button
                key={env}
                type="button"
                onClick={() => setEnvironment(env)}
                className={cn(
                  "rounded-lg border py-2 px-2 text-center text-xs font-medium transition-all select-none",
                  environment === env
                    ? "border-foreground bg-foreground text-background shadow-xs font-semibold"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {env === "dense-ui" ? "Dense UI" : env.charAt(0).toUpperCase() + env.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Optical Parameters & Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 text-xs">
          {/* 1. Surface Theme Mode (lg:col-span-3) */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Theme Mode
              </label>
              <span className="text-[10px] font-mono text-muted-foreground">
                {isDark ? "Dark Canvas" : "Light Canvas"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 w-full">
              <button
                type="button"
                onClick={() => setSurfaceTheme("light")}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-lg border py-1.5 px-2.5 text-xs font-medium transition-colors select-none",
                  !isDark
                    ? "border-foreground bg-foreground text-background shadow-xs font-semibold"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <HaloIcon icon={Sun01Icon} size={13} />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setSurfaceTheme("dark")}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-lg border py-1.5 px-2.5 text-xs font-medium transition-colors select-none",
                  isDark
                    ? "border-foreground bg-foreground text-background shadow-xs font-semibold"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <HaloIcon icon={Moon02Icon} size={13} />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* 2. Intensity Tier (lg:col-span-3) */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Intensity
            </label>
            <div className="grid grid-cols-3 gap-1 w-full">
              {(["subtle", "balanced", "rich"] as IntensityType[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setIntensity(lvl);
                    resetCustom();
                  }}
                  className={cn(
                    "rounded-lg border py-1.5 px-1.5 text-center text-xs font-medium transition-colors select-none",
                    intensity === lvl
                      ? "border-foreground bg-foreground text-background shadow-xs font-semibold"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Elevation Tier (lg:col-span-4, 5-column clean grid without awkward wrap) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Elevation Tier
            </label>
            <div className="grid grid-cols-5 gap-1 w-full">
              {(["inset", "base", "raised", "floating", "overlay"] as ElevationType[]).map((elv) => (
                <button
                  key={elv}
                  type="button"
                  onClick={() => setElevation(elv)}
                  className={cn(
                    "rounded-lg border py-1.5 px-1 text-center text-[11px] sm:text-xs font-medium transition-colors select-none truncate",
                    elevation === elv
                      ? "border-foreground bg-foreground text-background shadow-xs font-semibold"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {elv.charAt(0).toUpperCase() + elv.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Behavior Controls (lg:col-span-2) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Behavior
            </label>
            <div className="flex sm:flex-col lg:flex-col justify-between sm:justify-center gap-2 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground select-none">
                <Switch checked={interactive} onCheckedChange={setInteractive} />
                <span>Tactile</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground select-none">
                <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                <span>Reduced</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 3: Collapsible Advanced Property Inspector */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs font-medium text-foreground hover:text-foreground/80 transition-colors"
            >
              <HaloIcon icon={Settings01Icon} size={15} />
              <span>{showAdvanced ? "Hide Advanced Optical Inspector" : "Show Advanced Optical Inspector"}</span>
            </button>
            {isCustomized && (
              <button
                type="button"
                onClick={resetCustom}
                className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Reset to Calibrated Defaults
              </button>
            )}
          </div>

          {showAdvanced && (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 rounded-xl border border-border bg-muted/20 p-4 sm:p-5 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-foreground font-medium font-mono">
                  <span>Diffusion (Blur)</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[11px]">{blurValue}px</span>
                </div>
                <Slider
                  min={0}
                  max={44}
                  step={2}
                  value={blurValue}
                  onValueChange={(val) => {
                    setCustomBlur(val);
                  }}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">GPU-optimized background blur filter.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-foreground font-medium font-mono">
                  <span>Surface Tint Opacity</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[11px]">{Math.round(opacityValue * 100)}%</span>
                </div>
                <Slider
                  min={0.1}
                  max={0.98}
                  step={0.02}
                  value={opacityValue}
                  onValueChange={(val) => {
                    setCustomOpacity(val);
                  }}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">Base body volume preventing substrate bleed.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-foreground font-medium font-mono">
                  <span>Specular Strength</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[11px]">{highlightValue.toFixed(2)}x</span>
                </div>
                <Slider
                  min={0}
                  max={1.5}
                  step={0.05}
                  value={highlightValue}
                  onValueChange={(val) => {
                    setCustomHighlight(val);
                  }}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">135&deg; directional virtual lighting catch.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-foreground font-medium font-mono">
                  <span>Noise Grain Mask</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[11px]">{(noiseValue * 100).toFixed(1)}%</span>
                </div>
                <Slider
                  min={0}
                  max={0.08}
                  step={0.005}
                  value={noiseValue}
                  onValueChange={(val) => {
                    setCustomNoise(val);
                  }}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">Micro-texture removing digital banding.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
