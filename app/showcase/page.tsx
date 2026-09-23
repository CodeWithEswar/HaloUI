"use client";

import * as React from "react";
import Link from "next/link";
import {
  SparklesIcon,
  ArrowRight01Icon,
  PlayIcon,
  PauseIcon,
  ReloadIcon,
  CheckmarkCircle01Icon,
  Settings01Icon,
  CpuIcon,
  FolderIcon,
  SecurityCheckIcon,
  AlertCircleIcon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ShowcasePage() {
  const [running, setRunning] = React.useState(true);
  const [telemetry, setTelemetry] = React.useState({
    latency: 14,
    refractionIndex: 1.52,
    nodes: 48,
    streamActive: true,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-black/[0.06] dark:border-white/[0.06] pb-8">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs uppercase tracking-widest">
            Mini Product Experience
          </Badge>
          <span className="text-stone-400 font-mono text-xs">/ Real Production Components</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-white">
          Halo Control Room
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400 max-w-2xl font-normal leading-relaxed">
          An authentic editorial workspace experience built exclusively with the public HaloUI liquid component library. Every surface shares the same optical lighting engine.
        </p>
      </div>

      {/* Control Room Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Telemetry & Canvas Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Visual Display Surface */}
          <HaloSurface elevation="floating" className="p-8 rounded-3xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-stone-400">Optical Lab Node #01</span>
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                  Refractive Stream Monitor
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-stone-500">
                  {running ? "SYSTEM NOMINAL" : "SYSTEM PAUSED"}
                </span>
              </div>
            </div>

            {/* Simulated Optical Waveform Display */}
            <div className="h-48 w-full rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>WAVELENGTH: 540nm</span>
                <span>SPECTRAL TILT: +0.04°</span>
              </div>

              {/* Dynamic Waveform Bars */}
              <div className="flex items-end justify-between gap-1 h-24 px-2">
                {[40, 65, 30, 85, 92, 45, 60, 75, 35, 90, 82, 55, 70, 95, 48, 62, 78, 38, 88, 64].map(
                  (val, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-full rounded-t transition-all duration-300",
                        running
                          ? "bg-stone-900 dark:bg-white/80"
                          : "bg-stone-400 dark:bg-white/20"
                      )}
                      style={{
                        height: running ? `${(val * (i % 2 === 0 ? 1 : 0.8)).toFixed(0)}%` : "20%",
                      }}
                    />
                  )
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>LATENCY: {telemetry.latency}ms</span>
                <span>OPTICAL PURITY: 99.8%</span>
              </div>
            </div>

            {/* Action Bar for Stream */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <HaloButton
                  variant="primary"
                  size="md"
                  magnetic
                  onClick={() => setRunning(!running)}
                  leftIcon={running ? PauseIcon : PlayIcon}
                >
                  {running ? "Pause Cluster" : "Resume Cluster"}
                </HaloButton>
                <HaloButton
                  variant="subtle"
                  size="md"
                  onClick={() => setTelemetry((prev) => ({ ...prev, latency: Math.floor(Math.random() * 10) + 10 }))}
                  leftIcon={ReloadIcon}
                >
                  Calibrate Optics
                </HaloButton>
              </div>

              <div className="flex items-center gap-2">
                <HaloButton variant="ghost" size="sm">
                  Logs
                </HaloButton>
                <HaloButton variant="ghost" size="sm">
                  Metrics
                </HaloButton>
              </div>
            </div>
          </HaloSurface>

          {/* Secondary Compound Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HaloSurface elevation="raised" className="p-6 rounded-2xl space-y-3">
              <span className="text-xs font-mono text-stone-400 uppercase">Hardware Accelerators</span>
              <div className="text-2xl font-bold text-stone-900 dark:text-white">
                {telemetry.nodes} Active Units
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Optical surfaces coordinate through shared CSS tokens to ensure light reflection vectors remain synchronized.
              </p>
              <div className="pt-2">
                <HaloButton variant="subtle" size="sm" leftIcon={CpuIcon}>
                  Manage Cores
                </HaloButton>
              </div>
            </HaloSurface>

            <HaloSurface elevation="raised" className="p-6 rounded-2xl space-y-3">
              <span className="text-xs font-mono text-stone-400 uppercase">Security Boundaries</span>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                100% Enforced
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                WCAG 2.1 AA contrast guarantees ensure high-stress mission-critical consoles remain accessible at all times.
              </p>
              <div className="pt-2">
                <HaloButton variant="subtle" size="sm" leftIcon={SecurityCheckIcon}>
                  Verify Compliance
                </HaloButton>
              </div>
            </HaloSurface>
          </div>
        </div>

        {/* Right Sidebar: Quick Inspector & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <HaloSurface elevation="raised" className="p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <HaloIcon icon={Settings01Icon} size={16} />
              <span>Inspector & Parameters</span>
            </h3>

            <div className="space-y-3 text-xs divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              <div className="flex items-center justify-between pt-2">
                <span className="text-stone-500">Refraction Index</span>
                <span className="font-mono text-stone-800 dark:text-stone-200">1.52 (Crown Glass)</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-stone-500">Specular Angle</span>
                <span className="font-mono text-stone-800 dark:text-stone-200">135° Top-Left</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-stone-500">Motion Discipline</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">Strict (No wander)</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-stone-500">Registry Source</span>
                <span className="font-mono text-stone-800 dark:text-stone-200">haloui.dev/r/button</span>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] space-y-2">
              <Link href="/components/button" className="block w-full">
                <HaloButton variant="rich" size="md" className="w-full" rightIcon={ArrowRight01Icon}>
                  Open Button Specification
                </HaloButton>
              </Link>
            </div>
          </HaloSurface>
        </div>
      </div>
    </div>
  );
}
