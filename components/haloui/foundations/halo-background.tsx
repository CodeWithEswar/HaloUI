"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type PreviewEnvironment =
  | "neutral"
  | "paper"
  | "spectral"
  | "image"
  | "dense"
  | "dark";

export interface HaloBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  environment?: PreviewEnvironment;
  children?: React.ReactNode;
}

/**
 * HaloUI Official Preview Background Environments
 * Allows evaluating liquid glass materials against distinct physical contexts:
 * - Neutral: Pure minimal workspace
 * - Paper: Creamy tactile surface with organic warmth
 * - Spectral: Prismatic chromatic refraction
 * - Image: Architectural optical depth
 * - Dense: Real data/code environment to stress-test legibility
 * - Dark: Deep graphite night canvas
 */
export function HaloBackground({
  environment = "neutral",
  className,
  children,
  ...props
}: HaloBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[360px] overflow-hidden transition-all duration-300 rounded-[inherit]",
        // 1. Neutral Environment
        environment === "neutral" &&
          "bg-stone-100/60 dark:bg-[#101114] text-foreground",
        // 2. Warm Paper Environment
        environment === "paper" &&
          "bg-[#f6f2ea] text-[#1c1917] border border-[#e8dfd1]",
        // 3. Spectral Environment
        environment === "spectral" &&
          "bg-[#0e1017] text-white",
        // 4. Photographic Image Environment
        environment === "image" &&
          "bg-slate-900 text-white",
        // 5. Dense UI Environment
        environment === "dense" &&
          "bg-[#f3f4f6] dark:bg-[#0b0c0e] text-foreground font-mono text-xs",
        // 6. Deep Dark Environment
        environment === "dark" &&
          "bg-[#07080a] text-stone-100 border border-white/5",
        className
      )}
      {...props}
    >
      {/* Background Atmosphere Layers */}
      {environment === "paper" && (
        <>
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)' opacity='0.15'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ebe3d5]/50 via-transparent to-[#fefcf8]/80 pointer-events-none" />
        </>
      )}

      {environment === "spectral" && (
        <>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-pink-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-cyan-500/20 via-blue-500/15 to-emerald-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-black/60 pointer-events-none" />
        </>
      )}

      {environment === "image" && (
        <>
          {/* Optical Geometric Architectural Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-slate-950 pointer-events-none" />
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-sky-500/15 blur-[120px] pointer-events-none" />
        </>
      )}

      {environment === "dense" && (
        <div className="absolute inset-0 p-6 opacity-35 dark:opacity-25 pointer-events-none overflow-hidden select-none">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 border border-current/15 rounded bg-white/40 dark:bg-black/30">
              <div className="font-bold mb-1">DATASTREAM #0821</div>
              <div>LATENCY: 12ms | JITTER: 0.2ms</div>
              <div className="mt-2 text-[10px] text-stone-500 truncate">SHA256: 4e9c7a10f83d9e2b</div>
            </div>
            <div className="p-3 border border-current/15 rounded bg-white/40 dark:bg-black/30">
              <div className="font-bold mb-1">NODE CLUSTER</div>
              <div>NODES: 64 ACTIVE | LOAD: 34.2%</div>
              <div className="mt-2 text-[10px] text-stone-500 truncate">ENDPOINT: us-east-halo-01</div>
            </div>
            <div className="p-3 border border-current/15 rounded bg-white/40 dark:bg-black/30">
              <div className="font-bold mb-1">OPTICAL REFRACTION</div>
              <div>ETA: NOMINAL | INDEX: 1.52</div>
              <div className="mt-2 text-[10px] text-stone-500 truncate">VIRTUAL LIGHT VECTOR: 135°</div>
            </div>
          </div>
          <div className="mt-4 space-y-1 text-[11px] text-stone-500">
            <div>// Testing material legibility over high-frequency underlying interface structures.</div>
            <div>const observer = new IntersectionObserver((entries) =&gt; entries.forEach(applyOptics));</div>
            <div>export default function RenderPipeline() &#123; return &lt;Surface /&gt;; &#125;</div>
          </div>
        </div>
      )}

      {environment === "dark" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      )}

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-12">
        {children}
      </div>
    </div>
  );
}
