"use client";

import * as React from "react";
import {
  Metric,
  MetricLabel,
  MetricValue,
  MetricUnit,
  MetricDescription,
  MetricDelta,
  MetricGroup,
} from "@/components/ui/metric";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MetricDemonstrations() {
  return (
    <div className="space-y-10">
      {/* 1. Scale & Typography Spectrum */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              1. Typography &amp; Scale Spectrum (SM to 2XL)
            </h3>
            <p className="text-xs text-muted-foreground">
              Tabular numbers (<code className="font-mono">tabular-nums</code>) maintain vertical alignment across dense table cells to prominent hero banners.
            </p>
          </div>
          <Badge variant="outline">5 Scale Tiers</Badge>
        </div>

        <div className="rounded-xl border border-border/70 bg-card/40 p-5 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-end">
            <Metric size="sm" variant="muted" className="p-3">
              <MetricLabel>SM &bull; Dense Row</MetricLabel>
              <div className="flex items-baseline gap-1">
                <MetricValue>1,420</MetricValue>
                <MetricUnit>req/s</MetricUnit>
              </div>
              <MetricDelta direction="up" sentiment="positive">+4.2%</MetricDelta>
            </Metric>

            <Metric size="default" variant="muted" className="p-3">
              <MetricLabel>Default &bull; Section</MetricLabel>
              <div className="flex items-baseline gap-1">
                <MetricValue>99.95</MetricValue>
                <MetricUnit>%</MetricUnit>
              </div>
              <MetricDelta direction="up" sentiment="positive">+0.01%</MetricDelta>
            </Metric>

            <Metric size="lg" variant="muted" className="p-3">
              <MetricLabel>LG &bull; Highlight</MetricLabel>
              <div className="flex items-baseline gap-1">
                <MetricValue>342</MetricValue>
                <MetricUnit>ms</MetricUnit>
              </div>
              <MetricDelta direction="down" sentiment="positive">-18 ms</MetricDelta>
            </Metric>

            <Metric size="xl" variant="muted" className="p-3">
              <MetricLabel>XL &bull; Dashboard Hero</MetricLabel>
              <div className="flex items-baseline gap-1">
                <MetricValue>12.8</MetricValue>
                <MetricUnit>M</MetricUnit>
              </div>
              <MetricDelta direction="up" sentiment="positive">+1.2M</MetricDelta>
            </Metric>

            <Metric size="2xl" variant="muted" className="p-3">
              <MetricLabel>2XL &bull; Showcase</MetricLabel>
              <div className="flex items-baseline gap-1">
                <MetricValue>840</MetricValue>
                <MetricUnit>k</MetricUnit>
              </div>
              <MetricDelta direction="up" sentiment="neutral">0%</MetricDelta>
            </Metric>
          </div>
        </div>
      </div>

      {/* 2. Zero & Negative Values Verification */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              2. Zero (0) and Negative Numbers Representation
            </h3>
            <p className="text-xs text-muted-foreground">
              Zero is explicitly verified as a legitimate quantity and is never replaced with empty dashes or falsy fallbacks.
            </p>
          </div>
          <Badge variant="outline">Strict Zero Fidelity</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Metric variant="glass" size="default">
            <MetricLabel>Unresolved Incidents</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>0</MetricValue>
              <MetricUnit>open</MetricUnit>
            </div>
            <MetricDelta direction="neutral" sentiment="positive">Zero active defects</MetricDelta>
            <MetricDescription>Clean state across all critical microservices</MetricDescription>
          </Metric>

          <Metric variant="glass" size="default">
            <MetricLabel>Latency Delta vs Baseline</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>-58</MetricValue>
              <MetricUnit>ms</MetricUnit>
            </div>
            <MetricDelta direction="down" sentiment="positive">Faster (-24%)</MetricDelta>
            <MetricDescription>Optimized query caching in ap-south-1</MetricDescription>
          </Metric>

          <Metric variant="glass" size="default">
            <MetricLabel>Temperature Offset</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>-3.5</MetricValue>
              <MetricUnit>&deg;C</MetricUnit>
            </div>
            <MetricDelta direction="down" sentiment="neutral">-1.2&deg;C drift</MetricDelta>
            <MetricDescription>Sub-zero datacenter cooling delta</MetricDescription>
          </Metric>

          <Metric variant="glass" size="default">
            <MetricLabel>Database Dropped Packets</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>0</MetricValue>
              <MetricUnit>pkts</MetricUnit>
            </div>
            <MetricDelta direction="neutral" sentiment="positive">100% Delivery</MetricDelta>
            <MetricDescription>Zero drop events in past 24 hours</MetricDescription>
          </Metric>
        </div>
      </div>

      {/* 3. Decoupled Trend Direction vs Business Sentiment */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              3. Decoupled Trend Direction vs Business Sentiment
            </h3>
            <p className="text-xs text-muted-foreground">
              Metric strictly decouples geometric arrow direction from semantic coloring. Up is not always good, and down is not always bad.
            </p>
          </div>
          <Badge variant="outline">Decoupled Semantics</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Metric variant="muted" size="default">
            <MetricLabel>Memory Consumption</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>14.8</MetricValue>
              <MetricUnit>GB</MetricUnit>
            </div>
            {/* UP trend + NEGATIVE sentiment (higher memory leak is bad) */}
            <MetricDelta direction="up" sentiment="negative">+2.4 GB leak</MetricDelta>
            <MetricDescription>Upward growth is unfavorable</MetricDescription>
          </Metric>

          <Metric variant="muted" size="default">
            <MetricLabel>Query Duration</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>18</MetricValue>
              <MetricUnit>ms</MetricUnit>
            </div>
            {/* DOWN trend + POSITIVE sentiment (lower latency is good) */}
            <MetricDelta direction="down" sentiment="positive">-42 ms faster</MetricDelta>
            <MetricDescription>Downward drop is favorable</MetricDescription>
          </Metric>

          <Metric variant="muted" size="default">
            <MetricLabel>Monthly Recurring Revenue</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>₹18,40,000</MetricValue>
            </div>
            {/* UP trend + POSITIVE sentiment (higher revenue is good) */}
            <MetricDelta direction="up" sentiment="positive">+12.4% MoM</MetricDelta>
            <MetricDescription>Upward growth is favorable</MetricDescription>
          </Metric>

          <Metric variant="muted" size="default">
            <MetricLabel>Active Customer Churn</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>0.82</MetricValue>
              <MetricUnit>%</MetricUnit>
            </div>
            {/* DOWN trend + POSITIVE sentiment (lower churn is good) */}
            <MetricDelta direction="down" sentiment="positive">-0.14% reduction</MetricDelta>
            <MetricDescription>Downward drop is favorable</MetricDescription>
          </Metric>
        </div>
      </div>

      {/* 4. High Precision, Currency & Large Quantities */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              4. High Precision, Currency &amp; Large Formatted Quantities
            </h3>
            <p className="text-xs text-muted-foreground">
              Precision is never artificially truncated; numbers with many decimals or national currencies preserve complete fidelity.
            </p>
          </div>
          <Badge variant="outline">Fidelity Preserved</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Metric variant="glass" size="lg">
            <MetricLabel>Ultra-High Precision Availability</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>99.9999</MetricValue>
              <MetricUnit>%</MetricUnit>
            </div>
            <MetricDelta direction="up" sentiment="positive">Six Nines SLA</MetricDelta>
            <MetricDescription>Exact unrounded carrier-grade telecommunications uptime</MetricDescription>
          </Metric>

          <Metric variant="glass" size="lg">
            <MetricLabel>Formatted Indian Rupee (INR)</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>₹12,45,67,890</MetricValue>
            </div>
            <MetricDelta direction="up" sentiment="positive">+18.5% YoY</MetricDelta>
            <MetricDescription>Formatted with regional grouping separators intact</MetricDescription>
          </Metric>

          <Metric variant="glass" size="lg">
            <MetricLabel>Large Ingested Events</MetricLabel>
            <div className="flex items-baseline gap-1">
              <MetricValue>1,234,567,890</MetricValue>
              <MetricUnit>events</MetricUnit>
            </div>
            <MetricDelta direction="up" sentiment="neutral">+450k/min</MetricDelta>
            <MetricDescription>Large scalar without premature lossy metric truncation</MetricDescription>
          </Metric>
        </div>
      </div>

      {/* 5. Nested in Card (Zero Glass-on-Glass Noise) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              5. Nested Inside Card (Flat Base &bull; Zero Glass-on-Glass)
            </h3>
            <p className="text-xs text-muted-foreground">
              When nested inside a Card or Dialog, Metric uses <code className="font-mono">variant=&quot;default&quot;</code> to eliminate competing glass reflections.
            </p>
          </div>
          <Badge variant="outline">Optically Flat Base</Badge>
        </div>

        <Card size="default" intensity="subtle">
          <CardHeader>
            <CardTitle>Cluster Real-Time Health Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricGroup columns={3} density="default">
              <Metric variant="default" size="default">
                <MetricLabel>Active Pods</MetricLabel>
                <div className="flex items-baseline gap-1">
                  <MetricValue>64</MetricValue>
                  <MetricUnit>/ 64</MetricUnit>
                </div>
                <MetricDelta direction="neutral" sentiment="positive">100% Healthy</MetricDelta>
                <MetricDescription>Zero restarts in 48 hours</MetricDescription>
              </Metric>

              <Metric variant="default" size="default">
                <MetricLabel>Edge Egress Traffic</MetricLabel>
                <div className="flex items-baseline gap-1">
                  <MetricValue>2.84</MetricValue>
                  <MetricUnit>TB</MetricUnit>
                </div>
                <MetricDelta direction="up" sentiment="neutral">+12% vs yesterday</MetricDelta>
                <MetricDescription>Peak bandwidth utilization</MetricDescription>
              </Metric>

              <Metric variant="default" size="default">
                <MetricLabel>Median Compute Cost</MetricLabel>
                <div className="flex items-baseline gap-1">
                  <MetricValue>$0.0042</MetricValue>
                  <MetricUnit>/ req</MetricUnit>
                </div>
                <MetricDelta direction="down" sentiment="positive">-8% efficiency</MetricDelta>
                <MetricDescription>Normalized cloud compute spend</MetricDescription>
              </Metric>
            </MetricGroup>
          </CardContent>
        </Card>
      </div>

      {/* 6. Strict 240px & 280px Container Test */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              6. Strict 240px and 280px Narrow Container Reflow
            </h3>
            <p className="text-xs text-muted-foreground">
              Verified inside constrained containers (sidebars, split-views) with zero document-level horizontal scroll blowout.
            </p>
          </div>
          <Badge variant="outline">240px Minimum QA</Badge>
        </div>

        <div className="flex flex-wrap gap-4 items-start">
          {/* 240px strict */}
          <div className="w-[240px] shrink-0 rounded-xl border border-destructive/30 bg-card p-3 space-y-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block border-b border-border/40 pb-1">
              Width: 240px (Strict Min)
            </span>
            <Metric variant="default" size="lg">
              <MetricLabel>Throughput</MetricLabel>
              <div className="flex items-baseline gap-1 min-w-0">
                <MetricValue>94,200</MetricValue>
                <MetricUnit>rps</MetricUnit>
              </div>
              <MetricDelta direction="up" sentiment="positive">+6.4%</MetricDelta>
              <MetricDescription>Auto-scaled without overflow</MetricDescription>
            </Metric>
          </div>

          {/* 280px rail */}
          <div className="w-[280px] shrink-0 rounded-xl border border-primary/30 bg-card p-3.5 space-y-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block border-b border-border/40 pb-1">
              Width: 280px (Compact Rail)
            </span>
            <Metric variant="default" size="xl">
              <MetricLabel>Active Fleet Nodes</MetricLabel>
              <div className="flex items-baseline gap-1 min-w-0">
                <MetricValue>1,024</MetricValue>
                <MetricUnit>nodes</MetricUnit>
              </div>
              <MetricDelta direction="up" sentiment="positive">+32 nodes</MetricDelta>
              <MetricDescription>Auto-scaling pool</MetricDescription>
            </Metric>
          </div>
        </div>
      </div>
    </div>
  );
}
