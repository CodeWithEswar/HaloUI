"use client";

import * as React from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CheckmarkCircle01Icon,
  Alert02Icon,
  CancelCircleIcon,
  HourglassIcon,
  HelpCircleIcon,
  Shield01Icon,
  Server01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";

export function StatusBadgeDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. All Five Semantic Treatments */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Standard Semantic Tones
          </h3>
          <p className="text-sm text-muted-foreground">
            Status Badge decouples the visible text from the semantic tone. The consumer supplies the content and selects the appropriate tone (<code className="text-xs font-mono">neutral</code>, <code className="text-xs font-mono">positive</code>, <code className="text-xs font-mono">warning</code>, <code className="text-xs font-mono">critical</code>, or <code className="text-xs font-mono">info</code>).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/70 bg-card/60">
          <StatusBadge tone="positive">Operational</StatusBadge>
          <StatusBadge tone="warning">Degraded</StatusBadge>
          <StatusBadge tone="critical">Outage</StatusBadge>
          <StatusBadge tone="info">Processing</StatusBadge>
          <StatusBadge tone="neutral">Offline</StatusBadge>
        </div>
      </section>

      {/* 2. Indicators: Dot vs Icon vs Text-Only */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Visual Indicators: Dot, Icon, and Text-Only
          </h3>
          <p className="text-sm text-muted-foreground">
            Indicators are supplementary visual reinforcements. The accessible meaning is always conveyed through visible text.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Dot Indicator */}
          <div className="p-5 rounded-xl border border-border/60 bg-card/50 space-y-3">
            <div className="text-xs font-mono text-muted-foreground">Default: Dot Indicator</div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="positive" dot={true}>Healthy</StatusBadge>
              <StatusBadge tone="warning" dot={true}>Pending</StatusBadge>
              <StatusBadge tone="critical" dot={true}>Failed</StatusBadge>
            </div>
          </div>

          {/* Icon Indicator */}
          <div className="p-5 rounded-xl border border-border/60 bg-card/50 space-y-3">
            <div className="text-xs font-mono text-muted-foreground">Custom Icon Slot</div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge
                tone="positive"
                icon={<HaloIcon icon={CheckmarkCircle01Icon} size={12} />}
              >
                Verified
              </StatusBadge>
              <StatusBadge
                tone="warning"
                icon={<HaloIcon icon={Alert02Icon} size={12} />}
              >
                Expiring
              </StatusBadge>
              <StatusBadge
                tone="critical"
                icon={<HaloIcon icon={CancelCircleIcon} size={12} />}
              >
                Blocked
              </StatusBadge>
            </div>
          </div>

          {/* Text Only */}
          <div className="p-5 rounded-xl border border-border/60 bg-card/50 space-y-3">
            <div className="text-xs font-mono text-muted-foreground">Text-Only (dot=&#123;false&#125;)</div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="positive" dot={false}>Active</StatusBadge>
              <StatusBadge tone="warning" dot={false}>Review</StatusBadge>
              <StatusBadge tone="neutral" dot={false}>Draft</StatusBadge>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sizing Scale */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Compact Sizing Hierarchy
          </h3>
          <p className="text-sm text-muted-foreground">
            Three compact scales designed for high-density tables, default cards, and prominent summary badges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl border border-border/70 bg-card/60">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">sm (18px):</span>
            <StatusBadge size="sm" tone="positive">Active</StatusBadge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">default (20px):</span>
            <StatusBadge size="default" tone="positive">Active</StatusBadge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">lg (24px):</span>
            <StatusBadge size="lg" tone="positive">Active</StatusBadge>
          </div>
        </div>
      </section>

      {/* 4. Table Context (Dense UI Test) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. High-Density Table Context
          </h3>
          <p className="text-sm text-muted-foreground">
            Status Badge is frequently rendered across hundreds of table records. Its lightweight, flatter material ensures scannability without glass-on-glass noise.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card/40">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 text-foreground font-medium border-b border-border">
              <tr>
                <th className="p-3">Service</th>
                <th className="p-3">Region</th>
                <th className="p-3">Status</th>
                <th className="p-3">Latency</th>
                <th className="p-3">Uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Auth API Gateway</td>
                <td className="p-3 font-mono">us-east-1</td>
                <td className="p-3"><StatusBadge size="sm" tone="positive">Operational</StatusBadge></td>
                <td className="p-3 font-mono">14ms</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">99.99%</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Telemetry Pipeline</td>
                <td className="p-3 font-mono">eu-central-1</td>
                <td className="p-3"><StatusBadge size="sm" tone="warning">Degraded</StatusBadge></td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">142ms</td>
                <td className="p-3 font-mono">99.85%</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Vector Search Index</td>
                <td className="p-3 font-mono">ap-southeast-1</td>
                <td className="p-3"><StatusBadge size="sm" tone="critical">Outage</StatusBadge></td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400">Timeout</td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400">96.12%</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Global CDN Edge</td>
                <td className="p-3 font-mono">anycast</td>
                <td className="p-3"><StatusBadge size="sm" tone="positive">Operational</StatusBadge></td>
                <td className="p-3 font-mono">4ms</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">100.0%</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Audit Log Ingestion</td>
                <td className="p-3 font-mono">us-west-2</td>
                <td className="p-3"><StatusBadge size="sm" tone="info">Processing</StatusBadge></td>
                <td className="p-3 font-mono">28ms</td>
                <td className="p-3 font-mono">99.95%</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Staging Replicas</td>
                <td className="p-3 font-mono">sa-east-1</td>
                <td className="p-3"><StatusBadge size="sm" tone="neutral">Offline</StatusBadge></td>
                <td className="p-3 font-mono">—</td>
                <td className="p-3 font-mono">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Nested in Card Surface */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Nested Inside Card Surfaces
          </h3>
          <p className="text-sm text-muted-foreground">
            Demonstrating the nested material rule: Status Badge remains flatter and restrained so the outer Card carries environmental material.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-heading text-sm font-semibold text-foreground">Production Cluster</div>
              <StatusBadge tone="positive">Healthy</StatusBadge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              32 Kubernetes worker nodes distributed across 3 availability zones with automated pod rescheduling enabled.
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-heading text-sm font-semibold text-foreground">Disaster Recovery Shard</div>
              <StatusBadge tone="warning">Sync in progress</StatusBadge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Incremental snapshot replication is 84% complete. Expected parity within 6 minutes.
            </p>
          </Card>
        </div>
      </section>

      {/* 6. Long Labels & Localization */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            6. Long Labels &amp; Localization Stress Test
          </h3>
          <p className="text-sm text-muted-foreground">
            Ensuring status labels do not hardcode widths and tolerate extended translated copy.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 p-6 rounded-2xl border border-border/70 bg-card/60">
          <StatusBadge tone="warning">
            Requires immediate security patch
          </StatusBadge>
          <StatusBadge tone="info">
            Scheduled multi-region database maintenance
          </StatusBadge>
          <StatusBadge tone="critical">
            Downstream payment gateway connection timeout
          </StatusBadge>
        </div>
      </section>
    </div>
  );
}
