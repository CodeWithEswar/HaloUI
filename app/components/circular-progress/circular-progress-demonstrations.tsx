"use client";

import * as React from "react";
import {
  CircularProgress,
  CircularProgressLabel,
} from "@/components/ui/circular-progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import { SparklesIcon, CheckmarkCircle02Icon, Rocket01Icon } from "@hugeicons/core-free-icons";

export function CircularProgressDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Value Progression Matrix */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">1. Radial Completion Spectrum</h3>
          <p className="text-sm text-muted-foreground">
            Radial progress indicators communicate measurable completion in a compact circular form factor.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={0} size="lg" showValue />
            <span className="text-[11px] text-muted-foreground font-medium">0% (Init)</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={25} size="lg" showValue />
            <span className="text-[11px] text-muted-foreground font-medium">25% (Queue)</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={50} size="lg" showValue />
            <span className="text-[11px] text-muted-foreground font-medium">50% (Processing)</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={75} size="lg" showValue />
            <span className="text-[11px] text-muted-foreground font-medium">75% (Validating)</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={100} size="lg" variant="success" showValue />
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">100% (Complete)</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={null} size="lg" variant="info" />
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">Indeterminate</span>
          </div>
        </div>
      </section>

      {/* 2. Semantic Variants */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">2. Semantic Color Spectrum</h3>
          <p className="text-sm text-muted-foreground">
            Six calibrated semantic tones engineered for application telemetry, task success, and quota boundaries.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={70} size="lg" variant="default" showValue />
            <span className="text-[11px] font-medium text-foreground">Default</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={94} size="lg" variant="success" showValue />
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Success</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={82} size="lg" variant="warning" showValue />
            <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">Warning</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={16} size="lg" variant="destructive" showValue />
            <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400">Destructive</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={48} size="lg" variant="info" showValue />
            <span className="text-[11px] font-medium text-sky-600 dark:text-sky-400">Info</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <CircularProgress value={60} size="lg" variant="neutral" showValue />
            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Neutral</span>
          </div>
        </div>
      </section>

      {/* 3. Sizing Scale Hierarchy */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">3. Scale Hierarchy</h3>
          <p className="text-sm text-muted-foreground">
            Five calibrated geometric scales from compact 32px indicators to prominent 128px hero statistics.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-6 p-6 rounded-xl border border-border/50 bg-background/50">
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={65} size="sm" />
            <span className="text-[10px] text-muted-foreground font-mono">sm (32px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={65} size="md" showValue />
            <span className="text-[10px] text-muted-foreground font-mono">md (48px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={65} size="lg" showValue />
            <span className="text-[10px] text-muted-foreground font-mono">lg (64px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={65} size="xl" showValue />
            <span className="text-[10px] text-muted-foreground font-mono">xl (96px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={65} size="2xl" showValue />
            <span className="text-[10px] text-muted-foreground font-mono">2xl (128px)</span>
          </div>
        </div>
      </section>

      {/* 4. Custom Center Content */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">4. Custom Center Content</h3>
          <p className="text-sm text-muted-foreground">
            Pass custom React children to render icons, formatted metrics, or status badges within the radial center.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2 text-center">
            <CircularProgress value={100} size="xl" variant="success">
              <HaloIcon icon={CheckmarkCircle02Icon} size={28} className="text-emerald-500" />
            </CircularProgress>
            <span className="text-xs font-semibold">Integrity Verified</span>
            <span className="text-[11px] text-muted-foreground">All SHA-256 sums match</span>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2 text-center">
            <CircularProgress value={88} size="xl" variant="warning">
              <span className="text-sm font-bold font-mono">88GB</span>
            </CircularProgress>
            <span className="text-xs font-semibold">NVMe Storage</span>
            <span className="text-[11px] text-muted-foreground">12GB available</span>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2 text-center">
            <CircularProgress value={95} size="xl" variant="default">
              <HaloIcon icon={Rocket01Icon} size={26} className="text-primary" />
            </CircularProgress>
            <span className="text-xs font-semibold">Optical Shaders</span>
            <span className="text-[11px] text-muted-foreground">Compilation ready</span>
          </div>
        </div>
      </section>

      {/* 5. KPI & Dashboard Card Integration */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">5. Dashboard KPI Integration</h3>
          <p className="text-sm text-muted-foreground">
            Compact radial progress seamlessly integrates into metric cards and dashboard tiles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <Card className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Cluster Health</span>
              <div className="text-2xl font-bold tracking-tight">99.4%</div>
              <p className="text-xs text-muted-foreground">32 / 32 nodes operational</p>
            </div>
            <CircularProgress value={99.4} size="lg" variant="success" strokeWidth={10} />
          </Card>

          <Card className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Memory Consumption</span>
              <div className="text-2xl font-bold tracking-tight">84.2%</div>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Near threshold</p>
            </div>
            <CircularProgress value={84.2} size="lg" variant="warning" strokeWidth={10} />
          </Card>
        </div>
      </section>
    </div>
  );
}
