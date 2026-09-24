"use client";

import * as React from "react";
import {
  SparklesIcon,
  Copy01Icon,
  CheckmarkCircle01Icon,
  Sun01Icon,
  Moon02Icon,
  Tv01Icon,
  SmartPhone01Icon,
  Tablet01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { HaloHighlight } from "@/components/haloui/foundations/halo-highlight";
import {
  HaloEdge,
  type HaloEdgeStrength,
  type HaloEdgePlacement,
} from "@/components/haloui/foundations/halo-edge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BackdropType = "dark-void" | "gradient" | "mesh" | "sunset" | "cards" | "light-minimal";
type ViewportType = "desktop" | "tablet" | "mobile";

export function EdgePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<BackdropType>("dark-void");
  const [viewport, setViewport] = React.useState<ViewportType>("desktop");
  const [strength, setStrength] = React.useState<HaloEdgeStrength>("balanced");
  const [placement, setPlacement] = React.useState<HaloEdgePlacement>("both");
  const [showEdge, setShowEdge] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

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

  return (
    <div className="w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-stone-50/50 dark:bg-stone-950/40 backdrop-blur-sm overflow-hidden flex flex-col">
      {/* Stage Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border-b border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-stone-900/60">
        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex items-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06] p-0.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "px-3 py-1.5 rounded-md transition-all",
                activeTab === "preview"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 dark:hover:text-white"
              )}
            >
              Interactive Stage
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "px-3 py-1.5 rounded-md transition-all",
                activeTab === "code"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 dark:hover:text-white"
              )}
            >
              Code
            </button>
          </div>

          <div className="h-4 w-px bg-black/[0.08] dark:bg-white/[0.08] hidden sm:block" />

          {/* Viewport controls */}
          <div className="hidden sm:flex items-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06] p-0.5 text-xs">
            <button
              onClick={() => setViewport("desktop")}
              aria-label="Desktop viewport"
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewport === "desktop"
                  ? "bg-white dark:bg-stone-800 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <HaloIcon icon={Tv01Icon} size={15} />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              aria-label="Tablet viewport"
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewport === "tablet"
                  ? "bg-white dark:bg-stone-800 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <HaloIcon icon={Tablet01Icon} size={15} />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              aria-label="Mobile viewport"
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewport === "mobile"
                  ? "bg-white dark:bg-stone-800 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <HaloIcon icon={SmartPhone01Icon} size={15} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Backdrop Picker */}
          <select
            value={backdrop}
            onChange={(e) => setBackdrop(e.target.value as BackdropType)}
            className="text-xs bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-2.5 py-1.5 text-stone-700 dark:text-stone-300 focus:outline-none"
          >
            <option value="dark-void">Dark Void (Maximum Contrast)</option>
            <option value="gradient">Deep Gradient</option>
            <option value="mesh">Liquid Mesh</option>
            <option value="sunset">Warm Twilight</option>
            <option value="cards">High-Contrast Cards</option>
            <option value="light-minimal">Light Minimal</option>
          </select>

          {/* Theme switcher */}
          <button
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.04] dark:bg-white/[0.06] text-stone-700 dark:text-stone-300 hover:text-foreground"
            title="Toggle Preview Theme"
          >
            <HaloIcon icon={mode === "dark" ? Sun01Icon : Moon02Icon} size={15} />
          </button>
        </div>
      </div>

      {/* Main Preview Arena (Spacious full-bleed canvas, zero nested miniature border hugging) */}
      {activeTab === "preview" ? (
        <div
          className={cn(
            "p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center transition-colors min-h-[460px] relative overflow-hidden",
            mode === "dark" ? "dark bg-stone-950" : "bg-stone-100"
          )}
        >
          {/* Dynamic Background Field */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {backdrop === "dark-void" && <div className="w-full h-full bg-[#0a0b0d]" />}
            {backdrop === "gradient" && (
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-black opacity-90" />
            )}
            {backdrop === "mesh" && (
              <div className="w-full h-full bg-gradient-to-tr from-cyan-600/30 via-violet-600/30 to-amber-600/30 blur-2xl" />
            )}
            {backdrop === "sunset" && (
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-rose-600/20 to-stone-950" />
            )}
            {backdrop === "cards" && (
              <div className="grid grid-cols-4 gap-4 p-8 opacity-25">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-xl border border-white/20 bg-white/5" />
                ))}
              </div>
            )}
            {backdrop === "light-minimal" && <div className="w-full h-full bg-stone-100" />}
          </div>

          {/* Test Stage Container with Dynamic Viewport */}
          <div
            className={cn(
              "relative z-10 transition-all duration-300 w-full flex flex-col items-center justify-center gap-6",
              viewport === "desktop" && "max-w-xl",
              viewport === "tablet" && "max-w-md",
              viewport === "mobile" && "max-w-xs"
            )}
          >
            {/* The Halo Material Assembly with HaloEdge */}
            <HaloSurface
              elevation="raised"
              intensity="balanced"
              className="relative w-full rounded-3xl p-7 sm:p-9 text-left overflow-hidden transition-all duration-200"
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
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white/10 dark:bg-white/10 border border-white/20 flex items-center justify-center text-white">
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
                    className="text-[10px] font-mono border-white/20 bg-white/5"
                  >
                    {showEdge ? `${strength} · ${placement}` : "Edge OFF"}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  Halo Edge establishes material boundary and perceived physical thickness using outer separation hairlines and inset 135° directional specular catches.
                </p>

                {/* Substrate Status Bar */}
                <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-black/[0.06] dark:border-white/[0.08]">
                  <span className="font-mono text-[11px]">Boundary Substrate</span>
                  <span className="font-mono text-[11px] text-foreground font-medium">
                    {showEdge ? "Non-Uniform Hairline" : "Flat Uniform Border"}
                  </span>
                </div>
              </div>
            </HaloSurface>

            {/* Quick Toggle Controls */}
            <div className="flex items-center gap-2 bg-black/40 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-white">
              <label className="flex items-center gap-1.5 cursor-pointer font-medium select-none">
                <input
                  type="checkbox"
                  checked={showEdge}
                  onChange={(e) => setShowEdge(e.target.checked)}
                  className="rounded border-white/30 text-indigo-500 focus:ring-0"
                />
                <span>Active Optical Edge</span>
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative p-5 bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto min-h-[460px]">
          <button
            onClick={copyCode}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
          >
            <HaloIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} size={14} />
            <span>{copied ? "Copied" : "Copy TSX"}</span>
          </button>
          <pre className="leading-relaxed">{generatedCode}</pre>
        </div>
      )}

      {/* Interactive Control Panel */}
      <div className="p-4 sm:p-5 border-t border-black/[0.08] dark:border-white/[0.08] bg-white/40 dark:bg-stone-900/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        {/* Strength Selector */}
        <div className="space-y-1.5">
          <label className="font-medium text-stone-700 dark:text-stone-300">
            Boundary Strength
          </label>
          <div className="flex gap-1">
            {(["subtle", "balanced", "strong"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStrength(s)}
                className={cn(
                  "flex-1 py-1.5 px-2 rounded-lg border text-center font-medium capitalize transition-all",
                  strength === s
                    ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm"
                    : "border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Placement Selector */}
        <div className="space-y-1.5">
          <label className="font-medium text-stone-700 dark:text-stone-300">
            Hairline Placement
          </label>
          <div className="flex gap-1">
            {(["outer", "inner", "both"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlacement(p)}
                className={cn(
                  "flex-1 py-1.5 px-2 rounded-lg border text-center font-medium capitalize transition-all",
                  placement === p
                    ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm"
                    : "border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Optical Stack Context */}
        <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
          <label className="font-medium text-stone-700 dark:text-stone-300">
            Optical Stack Context
          </label>
          <div className="p-2.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Placement</span>
              <span className="font-mono text-foreground">Inner Inset + Outer Hairline</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Accessibility</span>
              <span className="font-mono text-foreground">aria-hidden=&quot;true&quot;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
