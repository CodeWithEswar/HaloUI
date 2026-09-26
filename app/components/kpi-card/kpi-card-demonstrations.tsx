"use client";

import * as React from "react";
import {
  KpiCard,
  KpiCardHeader,
  KpiCardLabel,
  KpiCardAction,
  KpiCardValue,
  KpiCardTrend,
  KpiCardComparison,
  KpiCardTarget,
  KpiCardTargetLabel,
  KpiCardTargetValue,
  KpiCardTargetStatus,
  KpiCardProgress,
  KpiCardChart,
  KpiCardFooter,
} from "@/components/ui/kpi-card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  InformationCircleIcon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";

export function KpiCardDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Critical Architecture: Direction vs Sentiment Decoupling */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Direction vs. Sentiment Decoupling
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Geometric direction (<span className="text-foreground font-mono">↑ up</span>, <span className="text-foreground font-mono">↓ down</span>) does not dictate desirability. Decreased latency is favorable (positive), whereas increased error rate is unfavorable (negative). Direction and sentiment are strictly decoupled.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Latency: Down = Positive */}
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>P99 Round-trip Latency</KpiCardLabel>
              <KpiCardAction>
                <button type="button" className="text-muted-foreground hover:text-foreground p-1" aria-label="More details">
                  <HaloIcon icon={InformationCircleIcon} size={14} />
                </button>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>14.2 ms</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="down" sentiment="positive">
                -18.4%
              </KpiCardTrend>
              <KpiCardComparison>vs 24h baseline</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardTarget>
              <KpiCardTargetLabel>Target: <KpiCardTargetValue>&lt; 25 ms</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="positive">Within SLA</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          {/* Error Rate: Up = Negative */}
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Unhandled Error Rate</KpiCardLabel>
              <KpiCardAction>
                <button type="button" className="text-muted-foreground hover:text-foreground p-1" aria-label="More details">
                  <HaloIcon icon={InformationCircleIcon} size={14} />
                </button>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>0.048%</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="up" sentiment="negative">
                +1.2 bps
              </KpiCardTrend>
              <KpiCardComparison>since deployment</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardTarget>
              <KpiCardTargetLabel>Target: <KpiCardTargetValue>&lt; 0.010%</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="negative">Degraded</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          {/* Revenue: Up = Positive */}
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Monthly Net Revenue</KpiCardLabel>
              <KpiCardAction>
                <button type="button" className="text-muted-foreground hover:text-foreground p-1" aria-label="More details">
                  <HaloIcon icon={InformationCircleIcon} size={14} />
                </button>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>₹1,48,200</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="up" sentiment="positive">
                +14.6%
              </KpiCardTrend>
              <KpiCardComparison>vs previous month</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardTarget>
              <KpiCardTargetLabel>Target: <KpiCardTargetValue>₹1,50,000</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="positive">98.8%</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          {/* Cache Hit Ratio: Neutral */}
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Edge Cache Hit Ratio</KpiCardLabel>
              <KpiCardAction>
                <button type="button" className="text-muted-foreground hover:text-foreground p-1" aria-label="More details">
                  <HaloIcon icon={InformationCircleIcon} size={14} />
                </button>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>94.8%</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="neutral" sentiment="neutral">
                0.0%
              </KpiCardTrend>
              <KpiCardComparison>vs 7-day average</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardTarget>
              <KpiCardTargetLabel>Target: <KpiCardTargetValue>&gt; 90.0%</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="positive">Nominal</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>
        </div>
      </section>

      {/* 2. Target Context & Progress Bars */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Target Context & Mathematically Bounded Progress
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            KPIs with clear business quotas or SLA thresholds communicate goal progress visually. HaloUI does not assume higher is better; consumers provide explicit sentiment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Cloud Storage Quota</KpiCardLabel>
              <KpiCardAction>
                <span className="text-[11px] text-muted-foreground font-mono">1.82 TB / 2.0 TB</span>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>91.0%</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="up" sentiment="negative">
                +4.2%
              </KpiCardTrend>
              <KpiCardComparison>this billing cycle</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardProgress value={91} sentiment="warning" aria-label="Storage quota progress" />
            <KpiCardTarget>
              <KpiCardTargetLabel>Threshold: <KpiCardTargetValue>85% Warning</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="warning">Near Limit</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Annual Contract Value</KpiCardLabel>
              <KpiCardAction>
                <span className="text-[11px] text-muted-foreground font-mono">Q3 Quota</span>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>$840,000</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="up" sentiment="positive">
                +22.5%
              </KpiCardTrend>
              <KpiCardComparison>YoY growth</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardProgress value={105} sentiment="positive" aria-label="ACV quota achievement" />
            <KpiCardTarget>
              <KpiCardTargetLabel>Target: <KpiCardTargetValue>$800,000</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="positive">105% Achieved</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Sprint Velocity</KpiCardLabel>
              <KpiCardAction>
                <span className="text-[11px] text-muted-foreground font-mono">Sprint 42</span>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>38 pts</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="down" sentiment="negative">
                -6 pts
              </KpiCardTrend>
              <KpiCardComparison>vs last sprint</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardProgress value={76} sentiment="negative" aria-label="Sprint points completed" />
            <KpiCardTarget>
              <KpiCardTargetLabel>Commitment: <KpiCardTargetValue>50 pts</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="negative">Behind Plan</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>
        </div>
      </section>

      {/* 3. Compact Visualizations & Sparklines */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Compact Sparklines & Trendlines
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            KPI Cards offer an unopinionated slot for lightweight SVG sparklines without requiring heavy client-side chart engines. The metric remains fully interpretable without the visual.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Ingress Bandwidth</KpiCardLabel>
              <KpiCardAction>
                <button type="button" className="text-muted-foreground hover:text-foreground p-1">
                  <HaloIcon icon={MoreHorizontalIcon} size={14} />
                </button>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>842 Mbps</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="up" sentiment="positive">
                +8.4%
              </KpiCardTrend>
              <KpiCardComparison>past 60 minutes</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardChart>
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 40">
                <path
                  d="M 0,35 Q 30,32 60,25 T 120,18 T 160,22 T 200,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-emerald-500/80 dark:text-emerald-400/80"
                />
              </svg>
            </KpiCardChart>
            <KpiCardTarget>
              <KpiCardTargetLabel>Capacity: <KpiCardTargetValue>1.0 Gbps</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="positive">Optimal</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Memory Usage (Node)</KpiCardLabel>
              <KpiCardAction>
                <button type="button" className="text-muted-foreground hover:text-foreground p-1">
                  <HaloIcon icon={MoreHorizontalIcon} size={14} />
                </button>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>3.42 GB</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="up" sentiment="negative">
                +18.2%
              </KpiCardTrend>
              <KpiCardComparison>since restart</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardChart>
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 40">
                <path
                  d="M 0,32 Q 40,30 80,24 T 140,15 T 180,10 T 200,6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-rose-500/80 dark:text-rose-400/80"
                />
              </svg>
            </KpiCardChart>
            <KpiCardTarget>
              <KpiCardTargetLabel>Limit: <KpiCardTargetValue>4.00 GB</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="warning">Leak Suspected</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Active Connections</KpiCardLabel>
              <KpiCardAction>
                <button type="button" className="text-muted-foreground hover:text-foreground p-1">
                  <HaloIcon icon={MoreHorizontalIcon} size={14} />
                </button>
              </KpiCardAction>
            </KpiCardHeader>
            <KpiCardValue>14,280</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="neutral" sentiment="neutral">
                +0.2%
              </KpiCardTrend>
              <KpiCardComparison>vs 1h baseline</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardChart>
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 40">
                <path
                  d="M 0,20 Q 30,18 60,22 T 120,19 T 160,21 T 200,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground/60"
                />
              </svg>
            </KpiCardChart>
            <KpiCardTarget>
              <KpiCardTargetLabel>Pool Max: <KpiCardTargetValue>25,000</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="positive">57% Utilized</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>
        </div>
      </section>

      {/* 4. Defensive Design: Zero vs Unavailable */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Defensive Data Integrity: Zero vs. Unavailable
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Zero is valid numeric telemetry and must never be masked as missing data via falsy fallback. Unavailable values are explicitly communicated with explanatory context.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Zero Value: Valid */}
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Unhandled Production Panics</KpiCardLabel>
            </KpiCardHeader>
            <KpiCardValue>0</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="neutral" sentiment="positive">
                0
              </KpiCardTrend>
              <KpiCardComparison>past 30 days</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardTarget>
              <KpiCardTargetLabel>Objective: <KpiCardTargetValue>0</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="positive">Zero Incident Record</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          {/* Zero Currency: Valid */}
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Overage Incurred Fees</KpiCardLabel>
            </KpiCardHeader>
            <KpiCardValue>$0.00</KpiCardValue>
            <KpiCardFooter>
              <KpiCardTrend direction="down" sentiment="positive">
                -$42.50
              </KpiCardTrend>
              <KpiCardComparison>vs last billing cycle</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardTarget>
              <KpiCardTargetLabel>Budget: <KpiCardTargetValue>$100.00</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="positive">Under Budget</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>

          {/* Unavailable State */}
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Global CDN TTFB</KpiCardLabel>
            </KpiCardHeader>
            <KpiCardValue className="text-muted-foreground/60">—</KpiCardValue>
            <KpiCardFooter>
              <KpiCardComparison>Awaiting probe telemetry from 14 regions</KpiCardComparison>
            </KpiCardFooter>
            <KpiCardTarget>
              <KpiCardTargetLabel>SLA Target: <KpiCardTargetValue>&lt; 40 ms</KpiCardTargetValue></KpiCardTargetLabel>
              <KpiCardTargetStatus sentiment="neutral">Collecting Data</KpiCardTargetStatus>
            </KpiCardTarget>
          </KpiCard>
        </div>
      </section>

      {/* 5. 12-Card High-Density Dashboard Grid Stress Test */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            High-Density 12-Card Dashboard Grid
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Evaluation of restrained <span className="font-mono text-xs">subtle</span> liquid glass in dense dashboard arrangements. The grid maintains high contrast, calm boundaries, and zero GPU fill-rate degradation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "API Requests", val: "142.8M", delta: "+12%", dir: "up" as const, sent: "positive" as const, tgt: "150M", stat: "On Track" },
            { label: "Error Rate", val: "0.012%", delta: "-4 bps", dir: "down" as const, sent: "positive" as const, tgt: "< 0.05%", stat: "Nominal" },
            { label: "p95 Latency", val: "16.4 ms", delta: "-8.1%", dir: "down" as const, sent: "positive" as const, tgt: "< 25 ms", stat: "Fast" },
            { label: "Active Subscriptions", val: "8,421", delta: "+140", dir: "up" as const, sent: "positive" as const, tgt: "8,500", stat: "99%" },
            { label: "CPU Headroom", val: "68.2%", delta: "-2.4%", dir: "down" as const, sent: "neutral" as const, tgt: "> 30%", stat: "Healthy" },
            { label: "Queue Depth", val: "14 msg", delta: "-184", dir: "down" as const, sent: "positive" as const, tgt: "< 50", stat: "Cleared" },
            { label: "DNS Resolution", val: "4.2 ms", delta: "+0.1 ms", dir: "up" as const, sent: "neutral" as const, tgt: "< 10 ms", stat: "Fast" },
            { label: "Database IOPS", val: "4,120", delta: "+6.8%", dir: "up" as const, sent: "positive" as const, tgt: "10,000", stat: "41% Max" },
            { label: "SSL Expiry", val: "84 days", delta: "-1 day", dir: "down" as const, sent: "neutral" as const, tgt: "> 30 days", stat: "Valid" },
            { label: "Ingress Dropped", val: "0 pkts", delta: "0", dir: "neutral" as const, sent: "positive" as const, tgt: "0", stat: "Perfect" },
            { label: "Worker Restarts", val: "2", delta: "-4", dir: "down" as const, sent: "positive" as const, tgt: "< 5/day", stat: "Stable" },
            { label: "Monthly Cloud Spend", val: "₹94,200", delta: "-11.2%", dir: "down" as const, sent: "positive" as const, tgt: "₹1,10,000", stat: "14% Below" },
          ].map((item, idx) => (
            <KpiCard key={idx} size="sm">
              <KpiCardHeader>
                <KpiCardLabel>{item.label}</KpiCardLabel>
              </KpiCardHeader>
              <KpiCardValue>{item.val}</KpiCardValue>
              <KpiCardFooter>
                <KpiCardTrend direction={item.dir} sentiment={item.sent}>
                  {item.delta}
                </KpiCardTrend>
              </KpiCardFooter>
              <KpiCardTarget>
                <KpiCardTargetLabel>Target: <KpiCardTargetValue>{item.tgt}</KpiCardTargetValue></KpiCardTargetLabel>
                <KpiCardTargetStatus sentiment={item.sent}>{item.stat}</KpiCardTargetStatus>
              </KpiCardTarget>
            </KpiCard>
          ))}
        </div>
      </section>
    </div>
  );
}
