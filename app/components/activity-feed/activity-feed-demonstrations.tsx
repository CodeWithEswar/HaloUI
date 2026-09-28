"use client";

import * as React from "react";
import {
  ActivityFeed,
  ActivityFeedItem,
  ActivityFeedIndicator,
  ActivityFeedContent,
  ActivityFeedHeader,
  ActivityFeedTitle,
  ActivityFeedTimestamp,
  ActivityFeedMetadata,
  ActivityFeedActions,
  ActivityFeedSeparator,
} from "@/components/ui/activity-feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  GitPullRequestIcon,
  GitCommitIcon,
  Shield01Icon,
  Alert02Icon,
  DatabaseIcon,
  ServerIcon,
  CheckmarkCircle02Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons";

export function ActivityFeedDemonstrations() {
  return (
    <div className="space-y-16">
      {/* SCENARIO 1: Engineering Collaboration Feed */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            1. Team Collaboration &amp; Code Review Stream
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Demonstrates human actor identity preservation using Avatars, natural event sentences,
            code tags, and contextual action buttons.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <ActivityFeed variant="glass" className="w-full">
            <ActivityFeedItem>
              <ActivityFeedIndicator>
                <Avatar className="size-8 sm:size-9">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
                    alt="Elena"
                  />
                  <AvatarFallback>EL</AvatarFallback>
                </Avatar>
              </ActivityFeedIndicator>
              <ActivityFeedContent>
                <ActivityFeedHeader>
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <ActivityFeedTitle>
                      <strong>Elena Rostova</strong> requested review on Pull Request{" "}
                      <strong>#512</strong>
                    </ActivityFeedTitle>
                    <Badge variant="outline">Design Tokens</Badge>
                  </div>
                  <ActivityFeedTimestamp>10m ago</ActivityFeedTimestamp>
                </ActivityFeedHeader>
                <ActivityFeedMetadata>
                  &ldquo;Refactored chromatic dispersion shaders for High-DPI screens.&rdquo;
                </ActivityFeedMetadata>
                <ActivityFeedActions>
                  <Button variant="outline" size="xs">
                    Start Review
                  </Button>
                  <Button variant="ghost" size="xs">
                    View Diff
                  </Button>
                </ActivityFeedActions>
              </ActivityFeedContent>
            </ActivityFeedItem>

            <ActivityFeedSeparator />

            <ActivityFeedItem>
              <ActivityFeedIndicator>
                <Avatar className="size-8 sm:size-9">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces"
                    alt="Marcus"
                  />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
              </ActivityFeedIndicator>
              <ActivityFeedContent>
                <ActivityFeedHeader>
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <ActivityFeedTitle>
                      <strong>Marcus Chen</strong> approved Pull Request <strong>#509</strong>
                    </ActivityFeedTitle>
                    <StatusBadge tone="positive">Approved</StatusBadge>
                  </div>
                  <ActivityFeedTimestamp>42m ago</ActivityFeedTimestamp>
                </ActivityFeedHeader>
                <ActivityFeedMetadata>
                  All 18 regression test suites passed with 100% assertion coverage.
                </ActivityFeedMetadata>
              </ActivityFeedContent>
            </ActivityFeedItem>
          </ActivityFeed>
        </div>
      </section>

      {/* SCENARIO 2: Multi-Actor System & Security Feed */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            2. Multi-Actor System &amp; Security Audit Feed
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Combines non-human bot and infrastructure actors using semantic icon indicators and status
            badges without damaging image fidelity.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <ActivityFeed variant="default" className="w-full">
            <ActivityFeedItem>
              <ActivityFeedIndicator icon={<HaloIcon icon={Shield01Icon} size={16} />} />
              <ActivityFeedContent>
                <ActivityFeedHeader>
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <ActivityFeedTitle>
                      <strong>ZeroTrust Gateway</strong> blocked unauthorized token exchange from ASN{" "}
                      <code>AS14061</code>
                    </ActivityFeedTitle>
                    <StatusBadge tone="critical">Blocked</StatusBadge>
                  </div>
                  <ActivityFeedTimestamp>14:22 UTC</ActivityFeedTimestamp>
                </ActivityFeedHeader>
                <ActivityFeedMetadata>
                  Enforced mutual TLS signature verification at edge ingress proxy.
                </ActivityFeedMetadata>
              </ActivityFeedContent>
            </ActivityFeedItem>

            <ActivityFeedSeparator />

            <ActivityFeedItem>
              <ActivityFeedIndicator icon={<HaloIcon icon={DatabaseIcon} size={16} />} />
              <ActivityFeedContent>
                <ActivityFeedHeader>
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <ActivityFeedTitle>
                      <strong>PostgreSQL WAL Stream</strong> finalized snapshot replication across read
                      pool
                    </ActivityFeedTitle>
                    <StatusBadge tone="positive">Synced</StatusBadge>
                  </div>
                  <ActivityFeedTimestamp>14:05 UTC</ActivityFeedTimestamp>
                </ActivityFeedHeader>
                <ActivityFeedMetadata>
                  All 6 read-replicas caught up to LSN <code>0/18B4491</code> with sub-second replication
                  lag.
                </ActivityFeedMetadata>
              </ActivityFeedContent>
            </ActivityFeedItem>
          </ActivityFeed>
        </div>
      </section>

      {/* SCENARIO 3: Strict 240px Container-Aware Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            3. Strict 240px Sidebar Container Reflow
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Simulates tight sidebar or panel constraints at exactly 240px. The avatar, event text,
            and timestamp wrap naturally without clipping or page-level horizontal overflow.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-xs flex flex-col items-center">
          <div className="w-[240px] border-2 border-dashed border-amber-500/50 p-2.5 rounded-lg bg-background/50">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block mb-2 font-medium">
              Boundary: 240px Container
            </span>
            <ActivityFeed variant="glass" density="compact" className="w-full">
              <ActivityFeedItem>
                <ActivityFeedIndicator>
                  <Avatar className="size-7">
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                </ActivityFeedIndicator>
                <ActivityFeedContent>
                  <ActivityFeedHeader>
                    <ActivityFeedTitle className="text-xs">
                      <strong>Sarah Ross</strong> published release <code>v2.4.1</code>
                    </ActivityFeedTitle>
                    <ActivityFeedTimestamp className="text-[10px]">Just now</ActivityFeedTimestamp>
                  </ActivityFeedHeader>
                  <ActivityFeedMetadata className="text-[11px]">
                    Automatic reflow preserves scanability in compact sidebars.
                  </ActivityFeedMetadata>
                </ActivityFeedContent>
              </ActivityFeedItem>

              <ActivityFeedSeparator />

              <ActivityFeedItem>
                <ActivityFeedIndicator icon={<HaloIcon icon={CheckmarkCircle02Icon} size={14} />} />
                <ActivityFeedContent>
                  <ActivityFeedHeader>
                    <ActivityFeedTitle className="text-xs">
                      <strong>CI Runner</strong> sealed build artifact
                    </ActivityFeedTitle>
                    <ActivityFeedTimestamp className="text-[10px]">1h ago</ActivityFeedTimestamp>
                  </ActivityFeedHeader>
                </ActivityFeedContent>
              </ActivityFeedItem>
            </ActivityFeed>
          </div>
        </div>
      </section>

      {/* SCENARIO 4: Nested Inside Card (Material Hierarchy) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            4. Nested Inside Card (Material Hierarchy)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            When nested inside a Card or Dialog, Activity Feed uses the clean unbordered variant
            (default) to prevent competing backdrop blur layers.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <HaloIcon icon={ServerIcon} size={16} className="text-primary" />
              Workspace Activity
            </CardTitle>
            <CardDescription className="text-xs">
              Live updates across projects and members in your organization.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ActivityFeed variant="default" density="compact" className="w-full">
              <ActivityFeedItem>
                <ActivityFeedIndicator>
                  <Avatar className="size-7 sm:size-8">
                    <AvatarFallback>EK</AvatarFallback>
                  </Avatar>
                </ActivityFeedIndicator>
                <ActivityFeedContent>
                  <ActivityFeedHeader>
                    <ActivityFeedTitle className="text-xs sm:text-sm">
                      <strong>Eswar K.</strong> created project <strong>HaloUI Optical Engine</strong>
                    </ActivityFeedTitle>
                    <ActivityFeedTimestamp className="text-[11px]">2m ago</ActivityFeedTimestamp>
                  </ActivityFeedHeader>
                </ActivityFeedContent>
              </ActivityFeedItem>

              <ActivityFeedSeparator />

              <ActivityFeedItem>
                <ActivityFeedIndicator>
                  <Avatar className="size-7 sm:size-8">
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                </ActivityFeedIndicator>
                <ActivityFeedContent>
                  <ActivityFeedHeader>
                    <ActivityFeedTitle className="text-xs sm:text-sm">
                      <strong>Alex Lin</strong> added 4 team members
                    </ActivityFeedTitle>
                    <ActivityFeedTimestamp className="text-[11px]">15m ago</ActivityFeedTimestamp>
                  </ActivityFeedHeader>
                </ActivityFeedContent>
              </ActivityFeedItem>
            </ActivityFeed>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
