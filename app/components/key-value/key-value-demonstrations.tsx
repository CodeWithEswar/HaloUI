"use client";

import * as React from "react";
import {
  KeyValue,
  KeyValueLabel,
  KeyValueValue,
  KeyValueGroup,
} from "@/components/ui/key-value";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Globe02Icon,
  ServerIcon,
  Shield01Icon,
  DatabaseIcon,
  CpuIcon,
  Clock01Icon,
  Key01Icon,
  CodeCircleIcon,
} from "@hugeicons/core-free-icons";

export function KeyValueDemonstrations() {
  return (
    <div className="space-y-16">
      {/* SCENARIO 1: Cloud Resource Inspector */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            1. Cloud Resource Inspector Panel
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Standard label/value pairs communicating technical properties of a production database cluster.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <KeyValueGroup columns={1} className="divide-y divide-border/40">
            <KeyValue variant="default" layout="auto">
              <KeyValueLabel icon={<HaloIcon icon={ServerIcon} />}>Instance Hostname</KeyValueLabel>
              <KeyValueValue>
                <code>cluster-node-04.ord.internal</code>
              </KeyValueValue>
            </KeyValue>

            <KeyValue variant="default" layout="auto">
              <KeyValueLabel icon={<HaloIcon icon={Globe02Icon} />}>Primary Region</KeyValueLabel>
              <KeyValueValue>us-east-1 (N. Virginia)</KeyValueValue>
            </KeyValue>

            <KeyValue variant="default" layout="auto">
              <KeyValueLabel icon={<HaloIcon icon={Shield01Icon} />}>TLS Encryption</KeyValueLabel>
              <KeyValueValue>
                <StatusBadge tone="positive">mTLS 1.3 Active</StatusBadge>
              </KeyValueValue>
            </KeyValue>

            <KeyValue variant="default" layout="auto">
              <KeyValueLabel icon={<HaloIcon icon={CpuIcon} />}>Compute vCPUs</KeyValueLabel>
              <KeyValueValue>32 Cores &bull; 128 GB RAM</KeyValueValue>
            </KeyValue>
          </KeyValueGroup>
        </div>
      </section>

      {/* SCENARIO 2: Rich Semantic Values & Zero Handling */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            2. Rich Semantic Values &amp; Valid Zero Preservation
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Demonstrates links, copy triggers, badges, and strict preservation of valid zero (0) values without false fallback to empty dashes.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <KeyValueGroup columns={1} className="gap-2">
            <KeyValue variant="muted" layout="auto">
              <KeyValueLabel icon={<HaloIcon icon={Key01Icon} />}>Public Key Fingerprint</KeyValueLabel>
              <KeyValueValue className="justify-between w-full sm:w-auto">
                <code>SHA256:4vK9L...xQ1p</code>
                <CopyButton value="SHA256:4vK9LxQ1pZ89wTlm" size="sm" variant="ghost" />
              </KeyValueValue>
            </KeyValue>

            <KeyValue variant="muted" layout="auto">
              <KeyValueLabel icon={<HaloIcon icon={DatabaseIcon} />}>Uncommitted Transactions</KeyValueLabel>
              {/* Proves that 0 is treated as a valid value and not replaced with N/A */}
              <KeyValueValue>
                <Badge variant="outline">0 pending</Badge>
              </KeyValueValue>
            </KeyValue>

            <KeyValue variant="muted" layout="auto">
              <KeyValueLabel icon={<HaloIcon icon={Clock01Icon} />}>Telemetry Health Endpoint</KeyValueLabel>
              <KeyValueValue>
                <a
                  href="#endpoint"
                  className="text-primary hover:underline underline-offset-4 text-xs font-mono"
                >
                  https://health.ord.internal/livez
                </a>
              </KeyValueValue>
            </KeyValue>
          </KeyValueGroup>
        </div>
      </section>

      {/* SCENARIO 3: Multi-Column Grid Distribution */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            3. Multi-Column Grid Layout (2 &amp; 3 Columns)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            KeyValueGroup supports responsive multi-column compositions that automatically adapt from stacked columns on mobile to multi-column grids on desktop.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <KeyValueGroup columns={3}>
            <KeyValue variant="glass" layout="stacked">
              <KeyValueLabel>Runtime Version</KeyValueLabel>
              <KeyValueValue>Node.js v22.14.0</KeyValueValue>
            </KeyValue>

            <KeyValue variant="glass" layout="stacked">
              <KeyValueLabel>Environment</KeyValueLabel>
              <KeyValueValue>
                <StatusBadge tone="positive">Production</StatusBadge>
              </KeyValueValue>
            </KeyValue>

            <KeyValue variant="glass" layout="stacked">
              <KeyValueLabel>Edge Pods</KeyValueLabel>
              <KeyValueValue>14 / 14 Healthy</KeyValueValue>
            </KeyValue>

            <KeyValue variant="glass" layout="stacked">
              <KeyValueLabel>Memory Allocated</KeyValueLabel>
              <KeyValueValue>4.2 GB / 8.0 GB</KeyValueValue>
            </KeyValue>

            <KeyValue variant="glass" layout="stacked">
              <KeyValueLabel>Cache Hit Ratio</KeyValueLabel>
              <KeyValueValue>99.4%</KeyValueValue>
            </KeyValue>

            <KeyValue variant="glass" layout="stacked">
              <KeyValueLabel>Cold Restarts</KeyValueLabel>
              <KeyValueValue>0 (Past 30 days)</KeyValueValue>
            </KeyValue>
          </KeyValueGroup>
        </div>
      </section>

      {/* SCENARIO 4: Strict 240px Container-Aware Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            4. Strict 240px Container-Aware Reflow
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Simulates tight sidebar or inspector constraints at exactly 240px. The label and value wrap fluidly without causing page horizontal overflow.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-xs flex flex-col items-center">
          <div className="w-[240px] border-2 border-dashed border-amber-500/50 p-2.5 rounded-lg bg-background/50">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block mb-2 font-medium">
              Boundary: 240px Container
            </span>
            <KeyValueGroup columns={1} className="gap-1">
              <KeyValue variant="default" layout="auto" density="compact">
                <KeyValueLabel className="text-[11px]">Primary Ingress</KeyValueLabel>
                <KeyValueValue className="text-xs font-mono break-all">
                  https://gateway-01.ap-south-1.internal.cloud
                </KeyValueValue>
              </KeyValue>

              <KeyValue variant="default" layout="auto" density="compact">
                <KeyValueLabel className="text-[11px]">Health</KeyValueLabel>
                <KeyValueValue className="text-xs">
                  <StatusBadge tone="positive">Passing</StatusBadge>
                </KeyValueValue>
              </KeyValue>

              <KeyValue variant="default" layout="auto" density="compact">
                <KeyValueLabel className="text-[11px]">Errors</KeyValueLabel>
                <KeyValueValue className="text-xs font-mono">0</KeyValueValue>
              </KeyValue>
            </KeyValueGroup>
          </div>
        </div>
      </section>

      {/* SCENARIO 5: Nested Inside Card (Material Hierarchy) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            5. Nested Inside Card (Material Hierarchy)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            When nested inside a Card or Sheet, Key Value remains flat (default variant) to preserve clean visual hierarchy.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Service Details</CardTitle>
            <CardDescription className="text-xs">
              Microservice configuration and operational boundaries.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <KeyValueGroup columns={1} className="divide-y divide-border/30">
              <KeyValue variant="default" layout="inline" density="compact">
                <KeyValueLabel>Service Name</KeyValueLabel>
                <KeyValueValue>halo-optical-engine</KeyValueValue>
              </KeyValue>

              <KeyValue variant="default" layout="inline" density="compact">
                <KeyValueLabel>Git Branch</KeyValueLabel>
                <KeyValueValue>
                  <code>main@06c7d04</code>
                </KeyValueValue>
              </KeyValue>

              <KeyValue variant="default" layout="inline" density="compact">
                <KeyValueLabel>Active Shards</KeyValueLabel>
                <KeyValueValue>3</KeyValueValue>
              </KeyValue>
            </KeyValueGroup>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
