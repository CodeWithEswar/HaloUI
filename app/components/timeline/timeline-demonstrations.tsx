"use client";

import * as React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineRail,
  TimelineMarker,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTimestamp,
  TimelineDescription,
} from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CheckmarkCircle02Icon,
  GitCommitIcon,
  GitBranchIcon,
  ServerIcon,
  Shield01Icon,
  Alert02Icon,
  CodeCircleIcon,
  DatabaseIcon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";

export function TimelineDemonstrations() {
  return (
    <div className="space-y-16">
      {/* SCENARIO 1: Automated Production CI/CD Pipeline */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            1. Automated CI/CD Deployment Pipeline
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Demonstrates milestone markers, status badges, git commit metadata, and contextual
            actions within an interactive chronological pipeline.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <Timeline variant="glass" className="w-full">
            <TimelineItem tone="positive">
              <TimelineRail>
                <TimelineMarker
                  tone="positive"
                  icon={<HaloIcon icon={CheckmarkCircle02Icon} size={14} />}
                />
                <TimelineConnector tone="positive" />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Production Traffic Cutover Succeeded</TimelineTitle>
                    <StatusBadge tone="positive">Active Live</StatusBadge>
                  </div>
                  <TimelineTimestamp>10:42 AM</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  100% of global ingress routed to cluster node pool <code>ord-edge-04</code>.
                </TimelineDescription>
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <HaloIcon icon={GitCommitIcon} size={14} /> <code>8221c40</code>
                  </span>
                  <span>&bull;</span>
                  <span>Canary Duration: 4m 12s</span>
                </div>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem tone="primary">
              <TimelineRail>
                <TimelineMarker
                  tone="primary"
                  icon={<HaloIcon icon={ServerIcon} size={14} />}
                />
                <TimelineConnector tone="primary" />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Container Image Verification &amp; Attestation</TimelineTitle>
                    <Badge variant="outline">Cosign Validated</Badge>
                  </div>
                  <TimelineTimestamp>10:37 AM</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  Cryptographic signatures verified against keyless Fulcio certificate authority.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem tone="default" isLast>
              <TimelineRail>
                <TimelineMarker
                  tone="default"
                  icon={<HaloIcon icon={GitBranchIcon} size={14} />}
                />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Pipeline Triggered via Pull Request #482</TimelineTitle>
                    <Badge variant="secondary">Merged</Badge>
                  </div>
                  <TimelineTimestamp>10:28 AM</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  Merged branch <code>release/2.4.0</code> into <code>main</code> by @antigravity.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </section>

      {/* SCENARIO 2: Incident Response & Security Audit Trail */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            2. Incident Response &amp; Security Audit Trail
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Chronological audit records utilizing semantic tone variants (critical, warning, positive)
            for high-visibility security and compliance reviews.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <Timeline variant="default" className="w-full">
            <TimelineItem tone="positive">
              <TimelineRail>
                <TimelineMarker
                  tone="positive"
                  icon={<HaloIcon icon={Shield01Icon} size={14} />}
                />
                <TimelineConnector tone="positive" />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Incident Mitigated &amp; Firewalls Reconfigured</TimelineTitle>
                    <StatusBadge tone="positive">Resolved</StatusBadge>
                  </div>
                  <TimelineTimestamp>14:15 UTC</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  WAF rules pushed to block anomalous request patterns. Edge latency returned to baseline.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem tone="warning">
              <TimelineRail>
                <TimelineMarker
                  tone="warning"
                  icon={<HaloIcon icon={Alert02Icon} size={14} />}
                />
                <TimelineConnector tone="warning" />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Traffic Anomaly Detected on EU Edge Gateway</TimelineTitle>
                    <StatusBadge tone="warning">Under Review</StatusBadge>
                  </div>
                  <TimelineTimestamp>13:58 UTC</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  Sudden 180% surge in rate-limited SYN requests originating from distributed ASNs.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem tone="critical" isLast>
              <TimelineRail>
                <TimelineMarker
                  tone="critical"
                  icon={<HaloIcon icon={Alert02Icon} size={14} />}
                />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Automated PagerDuty Severity-1 Alert Paged</TimelineTitle>
                    <StatusBadge tone="critical">Triggered</StatusBadge>
                  </div>
                  <TimelineTimestamp>13:50 UTC</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  Ingress error rate exceeded 0.05% threshold across multi-region edge gateways.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </section>

      {/* SCENARIO 3: User Milestones with Avatars */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            3. User Milestones with Avatar Integration
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Combines team member avatars directly inside markers to convey human authorship without
            damaging image fidelity.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <Timeline variant="outline" className="w-full">
            <TimelineItem tone="default">
              <TimelineRail>
                <TimelineMarker
                  tone="default"
                  icon={
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="Elena" />
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                  }
                />
                <TimelineConnector tone="default" />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Elena Rostova approved design specs</TimelineTitle>
                    <Badge variant="outline">Design Systems</Badge>
                  </div>
                  <TimelineTimestamp>1 hour ago</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  Verified optical token calibration across Light and Dark mode preview backdrops.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem tone="default" isLast>
              <TimelineRail>
                <TimelineMarker
                  tone="default"
                  icon={
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" alt="Marcus" />
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                  }
                />
              </TimelineRail>
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <TimelineTitle>Marcus Chen opened RFC #19</TimelineTitle>
                    <Badge variant="secondary">Architecture</Badge>
                  </div>
                  <TimelineTimestamp>3 hours ago</TimelineTimestamp>
                </TimelineHeader>
                <TimelineDescription>
                  Proposed unified multi-tenant database connection pooling strategies.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </section>

      {/* SCENARIO 4: Strict 240px Container-Aware Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            4. Strict 240px Container-Aware Reflow
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Simulates tight sidebar or mobile dock constraints at exactly 240px. The header wraps
            fluidly with zero overflow, while the connector and markers stay aligned.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-xs flex flex-col items-center">
          <div className="w-[240px] border-2 border-dashed border-amber-500/50 p-2.5 rounded-lg bg-background/50">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block mb-2 font-medium">
              Boundary: 240px Container
            </span>
            <Timeline variant="glass" density="compact" className="w-full">
              <TimelineItem tone="positive">
                <TimelineRail>
                  <TimelineMarker tone="positive" />
                  <TimelineConnector tone="positive" />
                </TimelineRail>
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle className="text-xs">
                      Exceptionally Long Event Title in Compact Sidebar
                    </TimelineTitle>
                    <TimelineTimestamp className="text-[10px]">Just now</TimelineTimestamp>
                  </TimelineHeader>
                  <TimelineDescription className="text-[11px]">
                    Automatic reflow preserves readability without clipping.
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem tone="default" isLast>
                <TimelineRail>
                  <TimelineMarker tone="default" />
                </TimelineRail>
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle className="text-xs">Milestone Sealed</TimelineTitle>
                    <TimelineTimestamp className="text-[10px]">2h ago</TimelineTimestamp>
                  </TimelineHeader>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </section>

      {/* SCENARIO 5: Nested Inside Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            5. Nested Inside Card (Material Hierarchy)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            When nested inside a Card or Sheet, Timeline uses a clean transparent variant (default)
            to prevent competing backdrop blur layers.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <HaloIcon icon={DatabaseIcon} size={16} className="text-primary" />
              Database Replication Stream
            </CardTitle>
            <CardDescription className="text-xs">
              Live event synchronization across read-replica nodes.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Timeline variant="default" density="compact" className="w-full">
              <TimelineItem tone="positive">
                <TimelineRail>
                  <TimelineMarker tone="positive" />
                  <TimelineConnector tone="positive" />
                </TimelineRail>
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle className="text-xs">Checkpoint synchronized</TimelineTitle>
                    <TimelineTimestamp className="text-[11px]">10s ago</TimelineTimestamp>
                  </TimelineHeader>
                  <TimelineDescription className="text-xs">
                    LSN <code>0/18A3290</code> confirmed on all replicas.
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem tone="default" isLast>
                <TimelineRail>
                  <TimelineMarker tone="default" />
                </TimelineRail>
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle className="text-xs">Snapshot created</TimelineTitle>
                    <TimelineTimestamp className="text-[11px]">5m ago</TimelineTimestamp>
                  </TimelineHeader>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
