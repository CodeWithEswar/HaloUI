"use client";

import * as React from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SpinnerDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Size Hierarchy */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">1. Scale Hierarchy</h3>
          <p className="text-sm text-muted-foreground">
            Five calibrated geometric scales designed for inline glyphs, button actions, and high-visibility section loading.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-8 p-6 rounded-xl border border-border/50 bg-background/50">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xs" variant="primary" />
            <span className="text-[10px] text-muted-foreground font-mono">xs (12px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" variant="primary" />
            <span className="text-[10px] text-muted-foreground font-mono">sm (16px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" variant="primary" />
            <span className="text-[10px] text-muted-foreground font-mono">md (20px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" variant="primary" />
            <span className="text-[10px] text-muted-foreground font-mono">lg (24px)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" variant="primary" />
            <span className="text-[10px] text-muted-foreground font-mono">xl (32px)</span>
          </div>
        </div>
      </section>

      {/* 2. Color Spectrum */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">2. Semantic Color Spectrum</h3>
          <p className="text-sm text-muted-foreground">
            Spinner automatically inherits <code>currentColor</code> by default, or accepts explicit semantic variant tokens.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <Spinner size="md" variant="default" className="text-foreground" />
            <span className="text-[11px] font-medium text-foreground">currentColor</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <Spinner size="md" variant="primary" />
            <span className="text-[11px] font-medium text-primary">Primary</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <Spinner size="md" variant="success" />
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Success</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <Spinner size="md" variant="warning" />
            <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">Warning</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <Spinner size="md" variant="destructive" />
            <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400">Destructive</span>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-2">
            <Spinner size="md" variant="muted" />
            <span className="text-[11px] font-medium text-muted-foreground">Muted</span>
          </div>
        </div>
      </section>

      {/* 3. Button Composition */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">3. Button Composition Integration</h3>
          <p className="text-sm text-muted-foreground">
            Spinner inherits button typography, maintains baseline alignment, and never shifts button dimensions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl border border-border/50 bg-background/50">
          <Button disabled size="sm" className="gap-2">
            <Spinner size="sm" />
            <span>Deploying Cluster...</span>
          </Button>

          <Button disabled variant="outline" size="sm" className="gap-2">
            <Spinner size="sm" />
            <span>Verifying Hash</span>
          </Button>

          <Button disabled variant="secondary" size="sm" className="gap-2">
            <Spinner size="sm" />
            <span>Exporting JSON</span>
          </Button>

          <Button disabled variant="destructive" size="sm" className="gap-2">
            <Spinner size="sm" />
            <span>Terminating Session</span>
          </Button>

          <Button disabled size="icon" className="size-9" aria-label="Loading task">
            <Spinner size="sm" />
          </Button>
        </div>
      </section>

      {/* 4. Inline Text Alignment */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">4. Inline Content Alignment</h3>
          <p className="text-sm text-muted-foreground">
            Seamlessly embeds inside paragraphs, alerts, and descriptive list rows without vertical layout jumping.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border/50 bg-background/50 space-y-3">
          <div className="flex items-center gap-2.5 text-sm text-foreground">
            <Spinner size="sm" variant="primary" />
            <span>Re-synchronizing 18 microservices with cluster us-east-1...</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <Spinner size="xs" variant="muted" />
            <span>Telemetry buffer: 1,420 events queued for batch aggregation</span>
          </div>
        </div>
      </section>

      {/* 5. Region Loading Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">5. Card Region Loading State</h3>
          <p className="text-sm text-muted-foreground">
            Indeterminate activity representation for dashboard sections awaiting network responses.
          </p>
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Physical Optical Transmission Map</CardTitle>
            <CardDescription>Streaming GPU refraction vectors from shader compilation cache.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border/70 bg-muted/20 gap-3 text-center">
              <Spinner size="lg" variant="primary" />
              <div className="space-y-0.5">
                <span className="text-xs font-semibold">Computing Optical Meniscus</span>
                <p className="text-[11px] text-muted-foreground">Calculating 10-layer physical transmission values...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
