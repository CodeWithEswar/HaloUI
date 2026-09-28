"use client";

import * as React from "react";
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
  ProgressHeader,
} from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProgressDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Value Progression Matrix */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">1. Value Progression Spectrum</h3>
          <p className="text-sm text-muted-foreground">
            Progress indicators communicate measurable completion from 0% through 100%, plus indeterminate continuous activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <Progress value={0}>
              <ProgressHeader>
                <ProgressLabel>Initialized (0%)</ProgressLabel>
                <ProgressValue />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <Progress value={25}>
              <ProgressHeader>
                <ProgressLabel>Downloading Packages</ProgressLabel>
                <ProgressValue />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <Progress value={50}>
              <ProgressHeader>
                <ProgressLabel>Compiling Shaders</ProgressLabel>
                <ProgressValue />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <Progress value={75}>
              <ProgressHeader>
                <ProgressLabel>Validating Manifest</ProgressLabel>
                <ProgressValue />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <Progress value={100} variant="success">
              <ProgressHeader>
                <ProgressLabel>Deployment Ready</ProgressLabel>
                <ProgressValue />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <Progress value={null}>
              <ProgressHeader>
                <ProgressLabel>Connecting to Ingress...</ProgressLabel>
                <span className="text-xs font-mono text-muted-foreground">Syncing</span>
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
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

        <div className="space-y-4 max-w-xl">
          <Progress value={65} variant="default">
            <ProgressHeader>
              <ProgressLabel>Default / Primary Brand</ProgressLabel>
              <ProgressValue />
            </ProgressHeader>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>

          <Progress value={92} variant="success">
            <ProgressHeader>
              <ProgressLabel>Success / Operational Compliance</ProgressLabel>
              <ProgressValue />
            </ProgressHeader>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>

          <Progress value={84} variant="warning">
            <ProgressHeader>
              <ProgressLabel>Warning / Memory Quota Limit (84%)</ProgressLabel>
              <ProgressValue />
            </ProgressHeader>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>

          <Progress value={18} variant="destructive">
            <ProgressHeader>
              <ProgressLabel>Destructive / SLA Depletion Margin</ProgressLabel>
              <ProgressValue />
            </ProgressHeader>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>

          <Progress value={45} variant="info">
            <ProgressHeader>
              <ProgressLabel>Info / Telemetry Stream Ingestion</ProgressLabel>
              <ProgressValue />
            </ProgressHeader>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>

          <Progress value={60} variant="neutral">
            <ProgressHeader>
              <ProgressLabel>Neutral / Background Task Sync</ProgressLabel>
              <ProgressValue />
            </ProgressHeader>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>
      </section>

      {/* 3. Track Size Hierarchy */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">3. Track Sizing Scale</h3>
          <p className="text-sm text-muted-foreground">
            Three purpose-calibrated heights for compact toolbars, standard forms, and high-visibility dashboards.
          </p>
        </div>

        <div className="space-y-6 max-w-xl">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Small (6px) — Compact Lists &amp; Toolbars</span>
              <Badge variant="outline" className="text-[10px]">sm</Badge>
            </div>
            <Progress value={40} size="sm" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Medium (10px) — Standard Forms &amp; Modals (Default)</span>
              <Badge variant="outline" className="text-[10px]">md</Badge>
            </div>
            <Progress value={65} size="md" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Large (16px) — High-Visibility Dashboard Status</span>
              <Badge variant="outline" className="text-[10px]">lg</Badge>
            </div>
            <Progress value={85} size="lg" />
          </div>
        </div>
      </section>

      {/* 4. Extreme 240px Container Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">4. Automatic 240px Container Reflow</h3>
          <p className="text-sm text-muted-foreground">
            Linear progress naturally consumes available container width down to 240px micro-panels with zero horizontal overflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-[240px] p-3 rounded-lg border border-dashed border-border/80 bg-muted/20 space-y-2">
            <div className="text-[11px] font-mono text-muted-foreground mb-1">Container: 240px</div>
            <Progress value={62} size="sm">
              <ProgressHeader>
                <ProgressLabel className="text-xs">Storage Limit</ProgressLabel>
                <ProgressValue className="text-xs" />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>

          <div className="w-[280px] p-3 rounded-lg border border-dashed border-border/80 bg-muted/20 space-y-2">
            <div className="text-[11px] font-mono text-muted-foreground mb-1">Container: 280px</div>
            <Progress value={88} size="md" variant="warning">
              <ProgressHeader>
                <ProgressLabel className="text-xs">Cluster RAM</ProgressLabel>
                <ProgressValue className="text-xs" />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>

          <div className="w-[320px] p-3 rounded-lg border border-dashed border-border/80 bg-muted/20 space-y-2">
            <div className="text-[11px] font-mono text-muted-foreground mb-1">Container: 320px</div>
            <Progress value={100} size="md" variant="success">
              <ProgressHeader>
                <ProgressLabel className="text-xs">Bundle Certified</ProgressLabel>
                <ProgressValue className="text-xs" />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>
        </div>
      </section>

      {/* 5. Nested Inside Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">5. Nested Within UI Surfaces</h3>
          <p className="text-sm text-muted-foreground">
            Progress operates within neutral shadcn cards without creating material clashes or glass-on-glass noise.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Optical Shader Pre-compilation</CardTitle>
            <CardDescription>Synthesizing 10-layer physical transmission maps across client GPUs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={78} variant="default" intensity="subtle">
              <ProgressHeader>
                <ProgressLabel>Compiling Metal &amp; WebGL Shaders</ProgressLabel>
                <ProgressValue />
              </ProgressHeader>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span>Step 3 of 4: Pipeline Cache Validation</span>
              <span className="font-mono">1.2s remaining</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
