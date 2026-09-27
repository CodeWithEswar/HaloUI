"use client";

import * as React from "react";
import {
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
  DescriptionListDetails,
  DescriptionListHeader,
  DescriptionListSeparator,
} from "@/components/ui/description-list";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ServerIcon,
  Globe02Icon,
  Shield01Icon,
  CpuIcon,
  Clock01Icon,
  Tag01Icon,
  UserCheck01Icon,
  LockPasswordIcon,
  Copy01Icon,
  CheckmarkCircle01Icon,
  Database01Icon,
  CloudSavingDone01Icon,
  Layers01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

export function DescriptionListDemonstrations() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-16">
      {/* 1. Core Presentations: Default & Divided */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Core Presentations: Default & Divided
          </h3>
          <p className="text-sm text-muted-foreground">
            Description List structures label/value metadata. The default presentation provides clean spacing, while divided mode adds hairline row separators for high-density reading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default (Clean Spacing) */}
          <div className="p-5 rounded-2xl border border-border/70 bg-card/40 space-y-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Default Mode
            </span>
            <DescriptionList>
              <DescriptionListItem>
                <DescriptionListTerm>Subscription Tier</DescriptionListTerm>
                <DescriptionListDetails>Enterprise Growth</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Billing Cycle</DescriptionListTerm>
                <DescriptionListDetails>Annual Prepaid</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Allocated Seats</DescriptionListTerm>
                <DescriptionListDetails>64 of 100 active</DescriptionListDetails>
              </DescriptionListItem>
            </DescriptionList>
          </div>

          {/* Divided Mode */}
          <div className="p-5 rounded-2xl border border-border/70 bg-card/40 space-y-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Divided Mode (divided)
            </span>
            <DescriptionList divided>
              <DescriptionListItem>
                <DescriptionListTerm>Subscription Tier</DescriptionListTerm>
                <DescriptionListDetails>Enterprise Growth</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Billing Cycle</DescriptionListTerm>
                <DescriptionListDetails>Annual Prepaid</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Allocated Seats</DescriptionListTerm>
                <DescriptionListDetails>64 of 100 active</DescriptionListDetails>
              </DescriptionListItem>
            </DescriptionList>
          </div>
        </div>
      </section>

      {/* 2. Density Scales */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Density Scales: Compact, Default, Relaxed
          </h3>
          <p className="text-sm text-muted-foreground">
            Three ergonomic density options adjust vertical row rhythm and typography scale to balance information density across sidebars, dialogs, and primary detail views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Compact */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/30 space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Compact (8px)
            </span>
            <DescriptionList density="compact" divided>
              <DescriptionListItem>
                <DescriptionListTerm>VPC ID</DescriptionListTerm>
                <DescriptionListDetails className="font-mono text-xs">vpc-08f921</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>CIDR Block</DescriptionListTerm>
                <DescriptionListDetails className="font-mono text-xs">10.0.0.0/16</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>NAT Gateways</DescriptionListTerm>
                <DescriptionListDetails>3 redundant</DescriptionListDetails>
              </DescriptionListItem>
            </DescriptionList>
          </div>

          {/* Default */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/30 space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Default (12px)
            </span>
            <DescriptionList density="default" divided>
              <DescriptionListItem>
                <DescriptionListTerm>VPC ID</DescriptionListTerm>
                <DescriptionListDetails className="font-mono text-xs">vpc-08f921</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>CIDR Block</DescriptionListTerm>
                <DescriptionListDetails className="font-mono text-xs">10.0.0.0/16</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>NAT Gateways</DescriptionListTerm>
                <DescriptionListDetails>3 redundant</DescriptionListDetails>
              </DescriptionListItem>
            </DescriptionList>
          </div>

          {/* Relaxed */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/30 space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Relaxed (16px)
            </span>
            <DescriptionList density="relaxed" divided>
              <DescriptionListItem>
                <DescriptionListTerm>VPC ID</DescriptionListTerm>
                <DescriptionListDetails className="font-mono text-xs">vpc-08f921</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>CIDR Block</DescriptionListTerm>
                <DescriptionListDetails className="font-mono text-xs">10.0.0.0/16</DescriptionListDetails>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>NAT Gateways</DescriptionListTerm>
                <DescriptionListDetails>3 redundant</DescriptionListDetails>
              </DescriptionListItem>
            </DescriptionList>
          </div>
        </div>
      </section>

      {/* 3. Automatic Container-Aware Reflow */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Automatic Container-Aware Reflow (@container)
          </h3>
          <p className="text-sm text-muted-foreground">
            In wide containers (≥ 480px), Description List automatically pairs term and value horizontally. Inside narrow parents (such as a 280px sidebar, drawer, or mobile viewport), it reflows vertically without requiring JavaScript resize listeners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Narrow Container Simulation */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Narrow Container Context (&lt; 480px Sidebar)
            </span>
            <div className="max-w-[280px] p-4 rounded-xl border border-border/80 bg-muted/20">
              <DescriptionList divided>
                <DescriptionListItem>
                  <DescriptionListTerm>Target Cluster</DescriptionListTerm>
                  <DescriptionListDetails>eu-central-staging</DescriptionListDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListTerm>Canary Allocation</DescriptionListTerm>
                  <DescriptionListDetails>15% traffic split</DescriptionListDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListTerm>Failover Strategy</DescriptionListTerm>
                  <DescriptionListDetails>Instant zero-drop DNS reroute</DescriptionListDetails>
                </DescriptionListItem>
              </DescriptionList>
            </div>
          </div>

          {/* Wide Container Simulation */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Wide Container Context (≥ 480px Main View)
            </span>
            <div className="w-full p-4 rounded-xl border border-border/80 bg-muted/20">
              <DescriptionList divided>
                <DescriptionListItem>
                  <DescriptionListTerm>Target Cluster</DescriptionListTerm>
                  <DescriptionListDetails>eu-central-staging</DescriptionListDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListTerm>Canary Allocation</DescriptionListTerm>
                  <DescriptionListDetails>15% traffic split</DescriptionListDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListTerm>Failover Strategy</DescriptionListTerm>
                  <DescriptionListDetails>Instant zero-drop DNS reroute</DescriptionListDetails>
                </DescriptionListItem>
              </DescriptionList>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Long Terms & Values with Zero Horizontal Page Overflow */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Long Terms & Complex Identifiers
          </h3>
          <p className="text-sm text-muted-foreground">
            Unbroken cryptographic hashes, deep webhook URLs, and verbose audit descriptions wrap cleanly using semantic line breaks and monospace code blocks without blowing out page layout.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border/70 bg-card/40">
          <DescriptionList divided>
            <DescriptionListItem>
              <DescriptionListTerm>
                <span>Maximum Allowed Cold Start Latency SLA</span>
              </DescriptionListTerm>
              <DescriptionListDetails>
                <span className="font-mono text-xs">25.0 milliseconds across 99.9th percentile</span>
              </DescriptionListDetails>
            </DescriptionListItem>

            <DescriptionListItem>
              <DescriptionListTerm>
                <span>TLS Ingress Webhook Endpoint</span>
              </DescriptionListTerm>
              <DescriptionListDetails className="flex items-center justify-between gap-2">
                <code className="text-xs font-mono bg-muted/60 px-2 py-1 rounded border border-border/60 break-all">
                  https://ingress.edge.haloui.io/v2/events/telemetry/hook_90fbc28a01cd48e9
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="shrink-0 gap-1.5 h-7 px-2 text-xs"
                >
                  <HaloIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} size={13} className={copied ? "text-emerald-500" : ""} />
                  <span>{copied ? "Copied" : "Copy"}</span>
                </Button>
              </DescriptionListDetails>
            </DescriptionListItem>

            <DescriptionListItem>
              <DescriptionListTerm>
                <span>Immutable Build Commit Hash</span>
              </DescriptionListTerm>
              <DescriptionListDetails>
                <code className="text-xs font-mono text-muted-foreground break-all">
                  sha256:d8e8fca201490bdceb5879a81cd2786a3b2b8c9d1a3e5f6e709a8b1c2d3e4f5a
                </code>
              </DescriptionListDetails>
            </DescriptionListItem>
          </DescriptionList>
        </div>
      </section>

      {/* 5. Rich Compositions: Badges, Avatars, Actions */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Rich Compositions: Badges, Avatars, and Groups
          </h3>
          <p className="text-sm text-muted-foreground">
            Description List pairs effortlessly with existing HaloUI primitives such as StatusBadge, Badge, Avatar, and AvatarGroup.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border/70 bg-card/40">
          <DescriptionList divided>
            <DescriptionListItem>
              <DescriptionListTerm>
                <HaloIcon icon={Shield01Icon} size={14} className="text-muted-foreground" />
                <span>Runtime Security Status</span>
              </DescriptionListTerm>
              <DescriptionListDetails>
                <StatusBadge tone="positive">Hardened Enclave Active</StatusBadge>
              </DescriptionListDetails>
            </DescriptionListItem>

            <DescriptionListItem>
              <DescriptionListTerm>
                <HaloIcon icon={CpuIcon} size={14} className="text-muted-foreground" />
                <span>Compute Architecture</span>
              </DescriptionListTerm>
              <DescriptionListDetails>
                <Badge variant="outline">ARM64 Neoverse-N2</Badge>
                <Badge variant="secondary">AVX-512 VNNI</Badge>
              </DescriptionListDetails>
            </DescriptionListItem>

            <DescriptionListItem>
              <DescriptionListTerm>
                <HaloIcon icon={UserCheck01Icon} size={14} className="text-muted-foreground" />
                <span>Deployment Reviewers</span>
              </DescriptionListTerm>
              <DescriptionListDetails>
                <AvatarGroup size="sm" max={3}>
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Elena" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Marcus" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" alt="Sarah" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>+4</AvatarFallback>
                  </Avatar>
                </AvatarGroup>
                <span className="text-xs text-muted-foreground font-medium">Elena, Marcus, and 4 others</span>
              </DescriptionListDetails>
            </DescriptionListItem>
          </DescriptionList>
        </div>
      </section>

      {/* 6. Restrained HaloUI Liquid Glass Surface */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            6. Restrained HaloUI Liquid Glass Surface
          </h3>
          <p className="text-sm text-muted-foreground">
            Standalone metadata tables utilize <code className="text-xs font-mono">variant=&quot;glass&quot;</code> on the collection boundary. Rows remain transparent and flat, preventing expensive and distracting &quot;glass-on-glass&quot; clutter.
          </p>
        </div>

        <DescriptionList variant="glass" divided className="max-w-xl">
          <DescriptionListHeader>Physical Cluster Telemetry</DescriptionListHeader>

          <DescriptionListItem>
            <DescriptionListTerm>Data Center Hall</DescriptionListTerm>
            <DescriptionListDetails>Equinix MB2 — Pod 4B</DescriptionListDetails>
          </DescriptionListItem>

          <DescriptionListItem>
            <DescriptionListTerm>Rack Coordinates</DescriptionListTerm>
            <DescriptionListDetails className="font-mono text-xs">RACK-42 / UNIT-18-22</DescriptionListDetails>
          </DescriptionListItem>

          <DescriptionListItem>
            <DescriptionListTerm>Power Phase Efficiency</DescriptionListTerm>
            <DescriptionListDetails>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">1.12 PUE (Optimal)</span>
            </DescriptionListDetails>
          </DescriptionListItem>

          <DescriptionListItem>
            <DescriptionListTerm>Zero-Trust Peer Enclave</DescriptionListTerm>
            <DescriptionListDetails>
              <StatusBadge tone="positive">mTLS v1.3 Verified</StatusBadge>
            </DescriptionListDetails>
          </DescriptionListItem>
        </DescriptionList>
      </section>

      {/* 7. Inside Card Architecture */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            7. Nested Inside Card Architecture
          </h3>
          <p className="text-sm text-muted-foreground">
            When nested inside Card, Description List renders in <code className="text-xs font-mono">variant=&quot;default&quot;</code> to preserve clean visual hierarchy without duplicate background blur or competing specular borders.
          </p>
        </div>

        <Card className="max-w-xl p-6 sm:p-7 space-y-4">
          <div className="space-y-1">
            <h4 className="font-semibold text-base tracking-tight text-foreground">
              Production Gateway Configuration
            </h4>
            <p className="text-xs text-muted-foreground">
              Managed TLS termination and edge proxy parameters.
            </p>
          </div>

          <DescriptionList divided>
            <DescriptionListItem>
              <DescriptionListTerm>Active Routing Mode</DescriptionListTerm>
              <DescriptionListDetails>Path-Based Dynamic Reverse Proxy</DescriptionListDetails>
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>Upstream Pool</DescriptionListTerm>
              <DescriptionListDetails className="font-mono text-xs">pool-gateway-primary (8 nodes)</DescriptionListDetails>
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>Max Request Timeout</DescriptionListTerm>
              <DescriptionListDetails className="font-mono text-xs">15,000 ms</DescriptionListDetails>
            </DescriptionListItem>
          </DescriptionList>

          <div className="pt-2 flex justify-end">
            <Button size="sm" variant="outline" className="gap-1.5">
              <span>Edit Configuration</span>
              <HaloIcon icon={ArrowRight01Icon} size={14} />
            </Button>
          </div>
        </Card>
      </section>

      {/* 8. Section Grouping with Headers & Separators */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            8. Section Grouping with Headers & Separators
          </h3>
          <p className="text-sm text-muted-foreground">
            Multi-group metadata surfaces organize related parameters into distinct sections with <code className="text-xs font-mono">DescriptionListHeader</code> and <code className="text-xs font-mono">DescriptionListSeparator</code>.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border/70 bg-card/40 max-w-xl">
          <DescriptionList>
            <DescriptionListHeader>Hardware Specifications</DescriptionListHeader>
            <DescriptionListItem>
              <DescriptionListTerm>Physical CPU</DescriptionListTerm>
              <DescriptionListDetails>AMD EPYC 9654 (96 Cores, 192 Threads)</DescriptionListDetails>
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>System RAM</DescriptionListTerm>
              <DescriptionListDetails>768 GB DDR5 ECC Registered</DescriptionListDetails>
            </DescriptionListItem>

            <DescriptionListSeparator />

            <DescriptionListHeader>Network Configuration</DescriptionListHeader>
            <DescriptionListItem>
              <DescriptionListTerm>Bandwidth Port</DescriptionListTerm>
              <DescriptionListDetails>Dual 100GbE Bonded (LACP)</DescriptionListDetails>
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>BGP ASN</DescriptionListTerm>
              <DescriptionListDetails className="font-mono text-xs">AS13335 (Anycast Routed)</DescriptionListDetails>
            </DescriptionListItem>
          </DescriptionList>
        </div>
      </section>
    </div>
  );
}
