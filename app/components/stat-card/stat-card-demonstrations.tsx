"use client";

import * as React from "react";
import {
  StatCard,
  StatCardHeader,
  StatCardLabel,
  StatCardIcon,
  StatCardAction,
  StatCardValue,
  StatCardFooter,
  StatCardTrend,
  StatCardDescription,
} from "@/components/ui/stat-card";
import { IconButton } from "@/components/ui/icon-button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Activity01Icon,
  Clock01Icon,
  Coins01Icon,
  UserGroupIcon,
  ChartLineData01Icon,
  ServerIcon,
  MoreHorizontalIcon,
  Alert02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

export function StatCardDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Critical Concept: Direction vs Sentiment */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Direction vs. Sentiment Decoupling
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Geometric direction (↑ up, ↓ down) does not dictate desirability. Decreased latency is favorable (positive), whereas increased error rate is unfavorable (negative). Direction and sentiment are strictly decoupled.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Latency: Down = Positive */}
          <StatCard>
            <StatCardHeader>
              <StatCardLabel>p99 Latency</StatCardLabel>
              <StatCardIcon>
                <HaloIcon icon={Clock01Icon} size={15} />
              </StatCardIcon>
            </StatCardHeader>
            <StatCardValue>12.4 ms</StatCardValue>
            <StatCardFooter>
              <StatCardTrend direction="down" sentiment="positive">
                -24%
              </StatCardTrend>
              <StatCardDescription>Faster than baseline</StatCardDescription>
            </StatCardFooter>
          </StatCard>

          {/* Revenue: Up = Positive */}
          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Monthly Revenue</StatCardLabel>
              <StatCardIcon>
                <HaloIcon icon={Coins01Icon} size={15} />
              </StatCardIcon>
            </StatCardHeader>
            <StatCardValue>₹84,320</StatCardValue>
            <StatCardFooter>
              <StatCardTrend direction="up" sentiment="positive">
                +14.2%
              </StatCardTrend>
              <StatCardDescription>vs. previous month</StatCardDescription>
            </StatCardFooter>
          </StatCard>

          {/* Error Rate: Up = Negative */}
          <StatCard>
            <StatCardHeader>
              <StatCardLabel>5xx HTTP Errors</StatCardLabel>
              <StatCardIcon>
                <HaloIcon icon={Alert02Icon} size={15} className="text-rose-500" />
              </StatCardIcon>
            </StatCardHeader>
            <StatCardValue>0.48%</StatCardValue>
            <StatCardFooter>
              <StatCardTrend direction="up" sentiment="negative">
                +0.18%
              </StatCardTrend>
              <StatCardDescription>Spike in us-east-1</StatCardDescription>
            </StatCardFooter>
          </StatCard>

          {/* Completion Rate: Neutral */}
          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Batch Job Progress</StatCardLabel>
              <StatCardIcon>
                <HaloIcon icon={Activity01Icon} size={15} />
              </StatCardIcon>
            </StatCardHeader>
            <StatCardValue>68.4%</StatCardValue>
            <StatCardFooter>
              <StatCardTrend direction="neutral" sentiment="neutral">
                0.0%
              </StatCardTrend>
              <StatCardDescription>No delta in 5m</StatCardDescription>
            </StatCardFooter>
          </StatCard>
        </div>
      </section>

      {/* 2. Zero Value vs Unavailable */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Zero is Real Data vs. Unavailable State
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Zero is a legitimate quantitative value (e.g. 0 active incidents) and must never be coerced to falsy or rendered as empty. Unavailable metrics render clear non-numeric placeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Active Incidents</StatCardLabel>
              <StatCardIcon>
                <HaloIcon icon={CheckmarkCircle02Icon} size={15} className="text-emerald-500" />
              </StatCardIcon>
            </StatCardHeader>
            <StatCardValue>0</StatCardValue>
            <StatCardFooter>
              <StatCardTrend direction="neutral" sentiment="positive">
                Clean
              </StatCardTrend>
              <StatCardDescription>All systems operational</StatCardDescription>
            </StatCardFooter>
          </StatCard>

          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Failed Login Attempts</StatCardLabel>
              <StatCardIcon>
                <HaloIcon icon={UserGroupIcon} size={15} />
              </StatCardIcon>
            </StatCardHeader>
            <StatCardValue>0</StatCardValue>
            <StatCardFooter>
              <StatCardDescription>No anomalous attempts logged</StatCardDescription>
            </StatCardFooter>
          </StatCard>

          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Edge Cache Warmup</StatCardLabel>
              <StatCardIcon>
                <HaloIcon icon={ServerIcon} size={15} />
              </StatCardIcon>
            </StatCardHeader>
            <StatCardValue className="text-muted-foreground font-normal">
              —
            </StatCardValue>
            <StatCardFooter>
              <StatCardDescription>Metric not yet reporting</StatCardDescription>
            </StatCardFooter>
          </StatCard>
        </div>
      </section>

      {/* 3. Number Formatting & Large Values */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Consumer Formatting & Large Values
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Formatting belongs strictly to the consumer (via <code className="text-foreground">Intl.NumberFormat</code> or app localization). StatCard renders formatted strings faithfully without hardcoding currencies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Total Ingress Requests</StatCardLabel>
            </StatCardHeader>
            <StatCardValue>1,234,567,890</StatCardValue>
            <StatCardFooter>
              <StatCardDescription>Trailing 30-day cumulative</StatCardDescription>
            </StatCardFooter>
          </StatCard>

          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Annual Contract Value</StatCardLabel>
            </StatCardHeader>
            <StatCardValue>$2.4M ARR</StatCardValue>
            <StatCardFooter>
              <StatCardTrend direction="up" sentiment="positive">
                +32% YoY
              </StatCardTrend>
              <StatCardDescription>Enterprise tier</StatCardDescription>
            </StatCardFooter>
          </StatCard>

          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Network Availability</StatCardLabel>
            </StatCardHeader>
            <StatCardValue>99.999%</StatCardValue>
            <StatCardFooter>
              <StatCardTrend direction="up" sentiment="positive">
                Five 9s
              </StatCardTrend>
              <StatCardDescription>High availability target met</StatCardDescription>
            </StatCardFooter>
          </StatCard>
        </div>
      </section>

      {/* 4. With Action Slot */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Card Header Action Slot
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Header action slots allow contextual menus or info tooltips without cluttering the metric value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Active Worker Nodes</StatCardLabel>
              <StatCardAction>
                <IconButton variant="ghost" size="sm" aria-label="Node options">
                  <HaloIcon icon={MoreHorizontalIcon} size={15} />
                </IconButton>
              </StatCardAction>
            </StatCardHeader>
            <StatCardValue>148 Nodes</StatCardValue>
            <StatCardFooter>
              <StatCardTrend direction="up" sentiment="neutral">
                +4 added
              </StatCardTrend>
              <StatCardDescription>Auto-scaled 10m ago</StatCardDescription>
            </StatCardFooter>
          </StatCard>

          <StatCard>
            <StatCardHeader>
              <StatCardLabel>Database Memory Pool</StatCardLabel>
              <StatCardAction>
                <IconButton variant="ghost" size="sm" aria-label="Pool metrics">
                  <HaloIcon icon={MoreHorizontalIcon} size={15} />
                </IconButton>
              </StatCardAction>
            </StatCardHeader>
            <StatCardValue>48.2 GB</StatCardValue>
            <StatCardFooter>
              <StatCardDescription>64 GB maximum threshold</StatCardDescription>
            </StatCardFooter>
          </StatCard>
        </div>
      </section>

      {/* 5. Dense 12-Card Grid Stress Test */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Mass-Render Dashboard Density (12 Stat Cards)
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Proves visual calm, zero frame stutter, and instant scannability when rendered in high quantities across real dashboard grids.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Req / sec", value: "48.2k", delta: "+3%", dir: "up", sent: "positive" },
            { label: "p95 Latency", value: "12ms", delta: "-2ms", dir: "down", sent: "positive" },
            { label: "CPU Load", value: "34%", delta: "+1%", dir: "up", sent: "neutral" },
            { label: "RAM Usage", value: "18.4G", delta: "0%", dir: "neutral", sent: "neutral" },
            { label: "Disk I/O", value: "4.2 MB", delta: "+8%", dir: "up", sent: "neutral" },
            { label: "Errors (5xx)", value: "0.01%", delta: "0%", dir: "neutral", sent: "positive" },
            { label: "Edge Hits", value: "98.8%", delta: "+0.4%", dir: "up", sent: "positive" },
            { label: "Bandwidth", value: "1.4 TB", delta: "+12%", dir: "up", sent: "neutral" },
            { label: "SSL Uptime", value: "100%", delta: "Clean", dir: "neutral", sent: "positive" },
            { label: "Cold Starts", value: "0", delta: "0", dir: "neutral", sent: "positive" },
            { label: "Active Conns", value: "8,940", delta: "+240", dir: "up", sent: "neutral" },
            { label: "Queue Depth", value: "14", delta: "-8", dir: "down", sent: "positive" },
          ].map((item, idx) => (
            <StatCard key={idx} size="sm">
              <StatCardHeader>
                <StatCardLabel className="text-[11px]">{item.label}</StatCardLabel>
              </StatCardHeader>
              <StatCardValue className="text-lg sm:text-xl py-0.5">{item.value}</StatCardValue>
              <StatCardFooter className="pt-0.5">
                <StatCardTrend
                  direction={item.dir as any}
                  sentiment={item.sent as any}
                  className="text-[10px] px-1 py-0"
                >
                  {item.delta}
                </StatCardTrend>
              </StatCardFooter>
            </StatCard>
          ))}
        </div>
      </section>
    </div>
  );
}
