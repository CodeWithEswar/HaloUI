"use client";

import * as React from "react";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { StatusBadge } from "@/components/ui/status-badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  CancelCircleIcon,
  InformationCircleIcon,
  MinusSignCircleIcon,
} from "@hugeicons/core-free-icons";

export function StatusIndicatorDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. All Semantic Intents */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">1. Semantic Intents</h3>
          <p className="text-sm text-muted-foreground">
            Clear, accessible status communication using decoupled semantic intents and explicit text reinforcement.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center justify-center gap-2 text-center">
            <StatusIndicator intent="positive" label="Operational" />
            <span className="text-[10px] font-mono text-muted-foreground">positive</span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center justify-center gap-2 text-center">
            <StatusIndicator intent="warning" label="Degraded" />
            <span className="text-[10px] font-mono text-muted-foreground">warning</span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center justify-center gap-2 text-center">
            <StatusIndicator intent="destructive" label="Outage" />
            <span className="text-[10px] font-mono text-muted-foreground">destructive</span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center justify-center gap-2 text-center">
            <StatusIndicator intent="info" label="Deploying" />
            <span className="text-[10px] font-mono text-muted-foreground">info</span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center justify-center gap-2 text-center">
            <StatusIndicator intent="neutral" label="Offline" />
            <span className="text-[10px] font-mono text-muted-foreground">neutral</span>
          </div>
        </div>
      </section>

      {/* 2. Sizing Scale */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">2. Sizing Scale</h3>
          <p className="text-sm text-muted-foreground">
            Three proportional scales engineered to integrate cleanly into dense table rows, cards, or page headers.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/50 bg-background/50 flex flex-wrap items-center gap-8">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-muted-foreground">size=&quot;sm&quot; (6px dot / 12px text)</div>
            <StatusIndicator size="sm" intent="positive" label="Active Pipeline" />
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono text-muted-foreground">size=&quot;md&quot; (8px dot / 14px text)</div>
            <StatusIndicator size="md" intent="positive" label="Active Pipeline" />
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono text-muted-foreground">size=&quot;lg&quot; (10px dot / 16px text)</div>
            <StatusIndicator size="lg" intent="positive" label="Active Pipeline" />
          </div>
        </div>
      </section>

      {/* 3. Dot vs Hugeicons Icon Mode */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">3. Dot vs Semantic Hugeicons Mode</h3>
          <p className="text-sm text-muted-foreground">
            When enhanced accessibility or explicit glyph recognition is desired, substitute the geometric dot with a Hugeicon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border/50 bg-background/50 space-y-3">
            <div className="text-xs font-semibold">Geometric Optical Dot (Default)</div>
            <div className="space-y-2">
              <StatusIndicator intent="positive" label="Cluster 01 — Healthy" />
              <br />
              <StatusIndicator intent="warning" label="Cluster 02 — High Memory Pressure" />
              <br />
              <StatusIndicator intent="destructive" label="Cluster 03 — Node Unreachable" />
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-background/50 space-y-3">
            <div className="text-xs font-semibold">Hugeicons Icon Mode</div>
            <div className="space-y-2">
              <StatusIndicator
                intent="positive"
                icon={<HaloIcon icon={CheckmarkCircle01Icon} size={16} />}
                label="Cluster 01 — Healthy"
              />
              <br />
              <StatusIndicator
                intent="warning"
                icon={<HaloIcon icon={AlertCircleIcon} size={16} />}
                label="Cluster 02 — High Memory Pressure"
              />
              <br />
              <StatusIndicator
                intent="destructive"
                icon={<HaloIcon icon={CancelCircleIcon} size={16} />}
                label="Cluster 03 — Node Unreachable"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. High-Density Data Table Integration */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">4. High-Density Data Table Integration</h3>
          <p className="text-sm text-muted-foreground">
            Status Indicator generates zero GPU backdrop-filter overhead, rendering cleanly across hundreds of table cells.
          </p>
        </div>

        <div className="rounded-xl border border-border/60 bg-background/50 overflow-hidden">
          <div className="grid grid-cols-12 gap-3 p-3 bg-muted/30 border-b border-border/40 text-xs font-semibold">
            <div className="col-span-5">Microservice</div>
            <div className="col-span-3">Region</div>
            <div className="col-span-4">Health State</div>
          </div>
          <div className="divide-y divide-border/20 text-xs sm:text-sm">
            {[
              { name: "auth-session-manager", region: "us-east-1", intent: "positive" as const, label: "Operational" },
              { name: "billing-invoice-worker", region: "eu-central-1", intent: "positive" as const, label: "Operational" },
              { name: "search-indexer-shard-02", region: "us-west-2", intent: "warning" as const, label: "Degraded (High I/O)" },
              { name: "telemetry-pipeline-ingress", region: "ap-southeast-1", intent: "positive" as const, label: "Operational" },
              { name: "backup-snapshot-daemon", region: "sa-east-1", intent: "destructive" as const, label: "Storage Exceeded" },
              { name: "analytics-rollup-cron", region: "us-east-2", intent: "neutral" as const, label: "Scheduled (Idle)" },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-3 p-3 items-center">
                <div className="col-span-5 font-mono text-xs truncate">{row.name}</div>
                <div className="col-span-3 text-muted-foreground text-xs">{row.region}</div>
                <div className="col-span-4">
                  <StatusIndicator size="sm" intent={row.intent} label={row.label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Automatic 240px Container Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">5. Automatic 240px Container Reflow</h3>
          <p className="text-sm text-muted-foreground">
            Natural inline layout with <code className="font-mono text-xs">min-w-0</code> ensures long status strings truncate or wrap gracefully without blowing out parent widths.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-[240px] p-3.5 rounded-xl border border-dashed border-border/80 bg-muted/20 space-y-2">
            <div className="text-[11px] font-mono text-muted-foreground">Container: 240px</div>
            <StatusIndicator
              size="sm"
              intent="warning"
              label="Awaiting organization security approval"
            />
          </div>

          <div className="w-[280px] p-3.5 rounded-xl border border-dashed border-border/80 bg-muted/20 space-y-2">
            <div className="text-[11px] font-mono text-muted-foreground">Container: 280px</div>
            <StatusIndicator
              size="sm"
              intent="destructive"
              label="Temporarily unavailable due to hardware upgrade"
            />
          </div>

          <div className="w-[320px] p-3.5 rounded-xl border border-dashed border-border/80 bg-muted/20 space-y-2">
            <div className="text-[11px] font-mono text-muted-foreground">Container: 320px</div>
            <StatusIndicator
              size="md"
              intent="positive"
              label="Fully operational with 99.99% monthly availability"
            />
          </div>
        </div>
      </section>

      {/* 6. Status Indicator vs Status Badge Comparison */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">6. Status Indicator vs Status Badge Comparison</h3>
          <p className="text-sm text-muted-foreground">
            HaloUI intentionally separates lightweight text+dot indicators from pill-shaped chip badges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Status Indicator</span>
              <span className="text-[10px] font-mono text-muted-foreground">Dot/Icon + Text</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Zero-padding inline presentation intended for tables, lists, inline headers, and metadata lines where visual container chrome would add clutter.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <StatusIndicator intent="positive" label="Operational" />
              <StatusIndicator intent="warning" label="Degraded" />
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Status Badge</span>
              <span className="text-[10px] font-mono text-muted-foreground">Pill Chip</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Self-contained chip with background tint, border, and physical optical pill geometry for standalone metric cards, profile headers, and filter bars.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <StatusBadge tone="positive">Operational</StatusBadge>
              <StatusBadge tone="warning">Degraded</StatusBadge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
