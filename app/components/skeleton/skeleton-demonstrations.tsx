"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SkeletonDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Geometric Shapes */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">1. Basic Geometric Shapes</h3>
          <p className="text-sm text-muted-foreground">
            Skeletons adapt cleanly into circles, text blocks, and full containers via utility classes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-3 text-center">
            <Skeleton className="size-16 rounded-full" />
            <span className="text-xs font-mono text-muted-foreground">rounded-full (Avatar)</span>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-3 text-center">
            <Skeleton className="h-16 w-32 rounded-xl" />
            <span className="text-xs font-mono text-muted-foreground">rounded-xl (Button / Card)</span>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center gap-3 text-center">
            <div className="w-full space-y-2">
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-4/5 rounded" />
              <Skeleton className="h-3.5 w-2/3 rounded" />
            </div>
            <span className="text-xs font-mono text-muted-foreground">rounded (Paragraph Lines)</span>
          </div>
        </div>
      </section>

      {/* 2. Animation Modes */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">2. Animation Modes</h3>
          <p className="text-sm text-muted-foreground">
            Three operational modes: subtle opacity pulse (default), sweeping directional shimmer, or static placeholder.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-border/50 bg-background/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Pulse Animation</span>
              <Badge variant="outline" className="text-[10px]">Default</Badge>
            </div>
            <div className="space-y-2">
              <Skeleton animation="pulse" className="h-4 w-full rounded" />
              <Skeleton animation="pulse" className="h-4 w-3/4 rounded" />
            </div>
            <p className="text-[11px] text-muted-foreground">Gentle opacity modulation, zero CPU overhead.</p>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-background/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Shimmer Animation</span>
              <Badge variant="outline" className="text-[10px]">Active</Badge>
            </div>
            <div className="space-y-2">
              <Skeleton animation="shimmer" className="h-4 w-full rounded" />
              <Skeleton animation="shimmer" className="h-4 w-3/4 rounded" />
            </div>
            <p className="text-[11px] text-muted-foreground">Sweeping GPU transform highlight across the channel.</p>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-background/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Static Placeholder</span>
              <Badge variant="outline" className="text-[10px]">Reduced Motion</Badge>
            </div>
            <div className="space-y-2">
              <Skeleton animation="none" className="h-4 w-full rounded" />
              <Skeleton animation="none" className="h-4 w-3/4 rounded" />
            </div>
            <p className="text-[11px] text-muted-foreground">Zero motion, automatic fallback for vestibular safety.</p>
          </div>
        </div>
      </section>

      {/* 3. Composing Real UI Layouts */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">3. Realistic UI Layout Composition</h3>
          <p className="text-sm text-muted-foreground">
            Skeletons compose into complex application interfaces mirroring the eventual loaded component dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Skeleton */}
          <div className="p-5 rounded-2xl border border-border/60 bg-background/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
              </div>
              <Skeleton className="h-7 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-36 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-5/6 rounded" />
            </div>
          </div>

          {/* Table Rows Skeleton */}
          <div className="p-5 rounded-2xl border border-border/60 bg-background/50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-1.5">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <Skeleton className="size-7 rounded-md shrink-0" />
                  <Skeleton className="h-3.5 w-1/2 rounded" />
                </div>
                <Skeleton className="h-3.5 w-12 rounded shrink-0" />
                <Skeleton className="h-5 w-14 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Extreme 240px Container Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">4. Automatic 240px Container Reflow</h3>
          <p className="text-sm text-muted-foreground">
            Skeletons adapt intrinsically to parent container boundaries without horizontal overflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-[240px] p-3.5 rounded-xl border border-dashed border-border/80 bg-muted/20 space-y-3">
            <div className="text-[11px] font-mono text-muted-foreground">Container: 240px</div>
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-8 rounded-full shrink-0" />
              <div className="space-y-1 flex-1 min-w-0">
                <Skeleton className="h-3.5 w-3/4 rounded" />
                <Skeleton className="h-2.5 w-1/2 rounded" />
              </div>
            </div>
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>

          <div className="w-[280px] p-3.5 rounded-xl border border-dashed border-border/80 bg-muted/20 space-y-3">
            <div className="text-[11px] font-mono text-muted-foreground">Container: 280px</div>
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-9 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton className="h-3.5 w-4/5 rounded" />
                <Skeleton className="h-2.5 w-3/5 rounded" />
              </div>
            </div>
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>

          <div className="w-[320px] p-3.5 rounded-xl border border-dashed border-border/80 bg-muted/20 space-y-3">
            <div className="text-[11px] font-mono text-muted-foreground">Container: 320px</div>
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-10 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton className="h-4 w-4/5 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            </div>
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* 5. Nested Inside Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">5. Nested Within UI Surfaces</h3>
          <p className="text-sm text-muted-foreground">
            Skeletons maintain lightweight optical boundaries without creating glass-on-glass layering conflicts.
          </p>
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Telemetry Stream Ingestion</CardTitle>
            <CardDescription>Awaiting pipeline handshake from ingress node...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-24 w-full rounded-xl" />
            <div className="flex items-center justify-between pt-1">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
