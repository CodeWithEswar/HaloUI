"use client";

import * as React from "react";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { cn } from "@/lib/utils";

type LayerId =
  | "tint"
  | "edge"
  | "highlight"
  | "diffusion"
  | "refraction"
  | "content"
  | "contact"
  | "ambient"
  | "noise"
  | "environment";

type LayerItem = {
  id: LayerId;
  num: string;
  name: string;
  description: string;
  token: string;
};

const LAYERS: LayerItem[] = [
  {
    id: "highlight",
    num: "01",
    name: "Directional Specular Highlight",
    description: "135° virtual light vector reflection revealing surface geometry.",
    token: "var(--halo-highlight)",
  },
  {
    id: "refraction",
    num: "02",
    name: "Refraction Rim",
    description: "1px edge displacement expressing physical material thickness.",
    token: "var(--halo-refraction-strength)",
  },
  {
    id: "edge",
    num: "03",
    name: "Dual Optical Edge",
    description: "Luminous inner chamfer catch plus crisp 1px perimeter boundary.",
    token: "var(--halo-edge), var(--halo-edge-inner)",
  },
  {
    id: "tint",
    num: "04",
    name: "Surface Tint Body",
    description: "Translucent optical volume anchoring visual content ownership.",
    token: "var(--halo-surface)",
  },
  {
    id: "diffusion",
    num: "05",
    name: "Background Diffusion",
    description: "GPU-accelerated backdrop blur softening high-frequency substrate noise.",
    token: "var(--halo-blur-md)",
  },
  {
    id: "noise",
    num: "06",
    name: "Micro-Grain Noise",
    description: "0.025 opacity fractal turbulence mask eliminating digital banding.",
    token: "var(--halo-noise-opacity)",
  },
  {
    id: "content",
    num: "07",
    name: "Content Plane",
    description: "High-contrast isolated foreground typography and vector icons.",
    token: "var(--halo-text-primary)",
  },
  {
    id: "contact",
    num: "08",
    name: "Contact Shadow",
    description: "Immediate tight substrate drop shadow anchoring the surface in space.",
    token: "var(--halo-shadow-contact)",
  },
  {
    id: "ambient",
    num: "09",
    name: "Ambient Shadow",
    description: "Soft environmental occlusion communicating vertical elevation tier.",
    token: "var(--halo-shadow-ambient)",
  },
  {
    id: "environment",
    num: "10",
    name: "Surrounding Environment",
    description: "The underlying substrate, themes, and application layers.",
    token: "var(--halo-canvas)",
  },
];

export function MaterialAnatomyVisual() {
  const [activeLayer, setActiveLayer] = React.useState<LayerId | null>(null);

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">Interactive Layer Anatomy</div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Hover or select any optical layer below to isolate its physical manifestation on the surface.
          </p>
        </div>
        {activeLayer && (
          <button
            type="button"
            onClick={() => setActiveLayer(null)}
            className="text-[11px] font-mono text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Reset view
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-center">
        {/* Visual Surface Canvas (7 cols) */}
        <div className="lg:col-span-7 relative h-72 sm:h-80 rounded-xl border border-border bg-muted/30 p-6 flex items-center justify-center overflow-hidden select-none isolate">
          {/* Substrate Grid Pattern */}
          <div
            className={cn(
              "absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity duration-300",
              activeLayer === "environment" ? "opacity-100 ring-2 ring-foreground" : "opacity-40"
            )}
          />

          {/* Virtual Light Indicator */}
          <div className="absolute top-3 left-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Virtual Light 135&deg; &rarr;</span>
          </div>

          {/* HaloUI Isolated Sample Surface */}
          <div
            className={cn(
              "relative w-full max-w-xs rounded-2xl p-6 transition-all duration-300",
              // Contact shadow isolation
              activeLayer === "contact"
                ? "shadow-[0_2px_4px_rgba(0,0,0,0.5),0_0_0_2px_var(--foreground)]"
                : activeLayer === "ambient"
                  ? "shadow-[0_24px_48px_-8px_rgba(0,0,0,0.6),0_0_0_2px_var(--foreground)]"
                  : "shadow-[var(--halo-shadow-elevated)]",
              // Edge isolation
              activeLayer === "edge" && "ring-2 ring-foreground border-white",
              // Tint isolation
              activeLayer === "tint" && "bg-white/90 dark:bg-stone-900/95 ring-2 ring-foreground",
              // Diffusion isolation
              activeLayer === "diffusion" && "backdrop-blur-2xl ring-2 ring-foreground",
              // Content isolation
              activeLayer === "content" && "ring-2 ring-foreground"
            )}
            style={{
              backdropFilter: activeLayer === "diffusion" ? "blur(32px)" : "blur(16px)",
              backgroundColor:
                activeLayer === "tint"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "var(--halo-surface-elevated)",
              border: "1px solid var(--halo-edge)",
            }}
          >
            {/* Highlight Indicator */}
            {activeLayer === "highlight" && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none ring-2 ring-foreground" />
            )}

            {/* Refraction Rim Indicator */}
            {activeLayer === "refraction" && (
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none ring-2 ring-cyan-500 rounded-t-2xl" />
            )}

            {/* Noise Mask Indicator */}
            {activeLayer === "noise" && (
              <div
                className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none mix-blend-overlay ring-2 ring-foreground"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
            )}

            {/* Card Mock Content */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">HaloUI Core Substrate</span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">10 Layers</span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Physical glass architecture balancing translucent diffusion with guaranteed content contrast.
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-border/50 text-[10px] font-mono text-muted-foreground">
                <span>Active: {activeLayer ? activeLayer.toUpperCase() : "BALANCED STACK"}</span>
                <span className="text-emerald-500 font-semibold">&bull; Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Layer List (5 cols) */}
        <div className="lg:col-span-5 space-y-1.5 max-h-[340px] overflow-y-auto pr-1 no-scrollbar">
          {LAYERS.map((item) => {
            const isSelected = activeLayer === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveLayer(item.id)}
                onFocus={() => setActiveLayer(item.id)}
                onClick={() => setActiveLayer(isSelected ? null : item.id)}
                className={cn(
                  "w-full text-left rounded-lg border p-2.5 transition-all text-xs flex items-start gap-2.5",
                  isSelected
                    ? "border-foreground bg-muted text-foreground shadow-xs"
                    : "border-border/60 bg-background hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded font-mono text-[10px] font-semibold",
                    isSelected ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                  )}
                >
                  {item.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground truncate">{item.name}</span>
                    <span className="text-[9px] font-mono text-muted-foreground hidden sm:inline truncate">
                      {item.token.split(",")[0]}
                    </span>
                  </div>
                  <p className="text-[11px] leading-tight text-muted-foreground mt-0.5">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
