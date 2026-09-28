"use client";

import * as React from "react";
import {
  Banner,
  BannerTitle,
  BannerDescription,
  BannerContent,
  BannerAction,
} from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  ArrowRight01Icon,
  Rocket01Icon,
  RefreshIcon,
  Shield01Icon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";

export function BannerDemonstrations() {
  const [dismissedDemo, setDismissedDemo] = React.useState(false);

  return (
    <div className="space-y-16">
      {/* 1. SEMANTIC TONES SPECTRUM */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Semantic Tone Spectrum
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Banners support clear contextual tones with dedicated Hugeicons glyphs and high-contrast typography calibrated for both Light and Dark themes.
          </p>
        </div>

        <div className="space-y-3.5">
          {/* Default Announcement */}
          <Banner variant="default" dismissible>
            <BannerContent>
              <BannerTitle>HaloUI 3.0 Public Beta Available</BannerTitle>
              <BannerDescription>
                Experience the 10-layer physical liquid optical engine with zero-dependency CSS container queries.
              </BannerDescription>
            </BannerContent>
            <BannerAction>
              <Button size="sm" variant="default" className="text-xs h-7 px-3">
                Explore Beta
              </Button>
            </BannerAction>
          </Banner>

          {/* Success */}
          <Banner variant="success">
            <BannerContent>
              <BannerTitle>Database Cluster Migration Verified</BannerTitle>
              <BannerDescription>
                All 28 shard replicas successfully synced. Global read latencies dropped by 34ms.
              </BannerDescription>
            </BannerContent>
            <BannerAction>
              <Button size="sm" variant="outline" className="text-xs h-7 px-2.5">
                View Metrics
              </Button>
            </BannerAction>
          </Banner>

          {/* Warning */}
          <Banner variant="warning" dismissible>
            <BannerContent>
              <BannerTitle>Scheduled Maintenance Notice</BannerTitle>
              <BannerDescription>
                Read-only maintenance window planned for Saturday between 02:00 and 04:00 UTC.
              </BannerDescription>
            </BannerContent>
            <BannerAction>
              <Button size="sm" variant="outline" className="text-xs h-7 px-2.5">
                Subscribe to Status
              </Button>
            </BannerAction>
          </Banner>

          {/* Destructive */}
          <Banner variant="destructive">
            <BannerContent>
              <BannerTitle>Primary Edge Ingress Degraded</BannerTitle>
              <BannerDescription>
                Automated traffic re-routing is active. Some requests to us-east-1 may experience intermittent 504 errors.
              </BannerDescription>
            </BannerContent>
            <BannerAction>
              <Button size="sm" variant="destructive" className="text-xs h-7 px-2.5">
                Incident Details
              </Button>
            </BannerAction>
          </Banner>
        </div>
      </section>

      {/* 2. LAYOUT MODES: FULL-WIDTH RIBBON VS CONTAINED */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Layout Modes: Full-Width Ribbon vs. Contained Card
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Choose between `contained` (rounded corners, inset shadow, suited for page headers and dashboards) or `full-width` (edge-to-edge ribbon with zero horizontal border).
          </p>
        </div>

        <div className="space-y-6">
          {/* Full-Width Ribbon Simulation */}
          <div className="rounded-xl border border-border/70 overflow-hidden bg-muted/10">
            <div className="px-4 py-2 text-xs font-mono uppercase text-muted-foreground bg-muted/30 border-b border-border/50">
              Full-Width Banner Ribbon (Layout=&quot;full-width&quot;)
            </div>
            <Banner variant="default" layout="full-width" dismissible>
              <BannerContent>
                <BannerTitle>Global Security Policy Update</BannerTitle>
                <BannerDescription>
                  Enforcing multi-factor authentication for all administrative service accounts starting next Monday.
                </BannerDescription>
              </BannerContent>
              <BannerAction>
                <Button size="sm" variant="default" className="text-xs h-7 px-3">
                  Configure MFA
                </Button>
              </BannerAction>
            </Banner>
            <div className="p-6 text-sm text-muted-foreground text-center">
              Page content follows immediately beneath full-width announcements without visual friction.
            </div>
          </div>

          {/* Contained Card */}
          <div className="rounded-xl border border-border/70 p-4 bg-muted/10">
            <div className="mb-3 text-xs font-mono uppercase text-muted-foreground">
              Contained Card Banner (Layout=&quot;contained&quot;)
            </div>
            <Banner variant="info" layout="contained" dismissible>
              <BannerContent>
                <BannerTitle>New Optical Tokens Available</BannerTitle>
                <BannerDescription>
                  Integrate refined 135° directional specular highlights into your consumer components.
                </BannerDescription>
              </BannerContent>
              <BannerAction>
                <Button size="sm" variant="outline" className="text-xs h-7 px-3">
                  Read Guide
                </Button>
              </BannerAction>
            </Banner>
          </div>
        </div>
      </section>

      {/* 3. CONTAINER-AWARE RESPONSIVE REFLOW */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Container-Aware Automatic Reflow
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Via `@container/banner` queries, the Banner automatically transitions between horizontal flow on wide viewports and vertical reflow in narrow panels and 240px sidebars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wide Container */}
          <div className="lg:col-span-7 space-y-2">
            <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider flex items-center justify-between">
              <span>Wide Container (Desktop / 680px+)</span>
              <span>Horizontal Flow</span>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/10">
              <Banner variant="default">
                <BannerContent>
                  <BannerTitle>Automated Deployment Succeeded</BannerTitle>
                  <BannerDescription>
                    Version 3.4.1 deployed across 18 edge compute regions.
                  </BannerDescription>
                </BannerContent>
                <BannerAction>
                  <Button size="sm" variant="default" className="text-xs h-7 px-3">
                    View Release
                  </Button>
                </BannerAction>
              </Banner>
            </div>
          </div>

          {/* Narrow Container: 280px */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider flex items-center justify-between">
              <span>Micro Container (280px Sidebar)</span>
              <span>Vertical Reflow</span>
            </div>
            <div className="max-w-[280px] p-2.5 rounded-xl border border-dashed border-border/80 bg-muted/10">
              <Banner variant="warning" dismissible>
                <BannerContent>
                  <BannerTitle>Sync Pending</BannerTitle>
                  <BannerDescription>
                    4 updates awaiting cellular network re-connection.
                  </BannerDescription>
                </BannerContent>
                <BannerAction>
                  <Button size="sm" variant="outline" className="w-full text-xs h-7">
                    <HaloIcon icon={RefreshIcon} size={12} className="mr-1" />
                    Retry Now
                  </Button>
                </BannerAction>
              </Banner>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NESTED MATERIAL IN DASHBOARD CARD */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Nested Material in Dashboard Section
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Banners embedded inside existing Liquid Glass Cards maintain optical restraint, avoiding competing blur filters and muddied highlights.
          </p>
        </div>

        <Card intensity="subtle" className="max-w-2xl">
          <CardHeader>
            <CardTitle>Autonomous Cluster Governance</CardTitle>
            <CardDescription>
              Fleet health metrics and real-time security posture across production nodes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Banner variant="info" intensity="subtle" dismissible>
              <BannerContent>
                <BannerTitle>New Security Patches Ready for Rollout</BannerTitle>
                <BannerDescription>
                  Kernel update 6.1.42 addresses CVE-2026-9081 across node pool `us-central-a`.
                </BannerDescription>
              </BannerContent>
              <BannerAction>
                <Button size="sm" variant="default" className="text-xs h-7 px-2.5">
                  Schedule Rollout
                </Button>
              </BannerAction>
            </Banner>

            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground pt-1">
              <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
                <span className="block text-[11px] uppercase tracking-wider">Active Nodes</span>
                <strong className="text-base text-foreground font-mono">148 / 148</strong>
              </div>
              <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
                <span className="block text-[11px] uppercase tracking-wider">Fleet Health</span>
                <strong className="text-base text-emerald-500 font-mono">100% OK</strong>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 5. INTERACTIVE MULTI-ACTION WORKFLOW */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Multi-Action Announcement Workflow
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Banners can compose both primary action triggers and secondary outline/ghost controls, with tactile press response and keyboard focus navigation.
          </p>
        </div>

        <div className="max-w-3xl">
          {dismissedDemo ? (
            <div className="p-4 text-center rounded-xl border border-dashed border-border/80 bg-muted/20 text-xs text-muted-foreground">
              Announcement dismissed.{" "}
              <button
                type="button"
                onClick={() => setDismissedDemo(false)}
                className="underline font-medium text-foreground hover:opacity-80"
              >
                Click here to reset.
              </button>
            </div>
          ) : (
            <Banner
              variant="default"
              dismissible
              onDismiss={() => setDismissedDemo(true)}
            >
              <BannerContent>
                <BannerTitle>Ready for Production Cloud Migration?</BannerTitle>
                <BannerDescription>
                  Verify your tenant configuration, check DNS ingress baselines, and review pre-flight checklists.
                </BannerDescription>
              </BannerContent>
              <BannerAction>
                <Button size="sm" variant="default" className="text-xs h-7.5 px-3">
                  Start Checklist
                </Button>
                <Button size="sm" variant="ghost" className="text-xs h-7.5 px-2.5">
                  Documentation
                </Button>
              </BannerAction>
            </Banner>
          )}
        </div>
      </section>
    </div>
  );
}
