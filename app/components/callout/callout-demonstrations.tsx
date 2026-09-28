"use client";

import * as React from "react";
import {
  Callout,
  CalloutTitle,
  CalloutContent,
  type CalloutTone,
  type CalloutIntensity,
} from "@/components/ui/callout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import { SparklesIcon, Shield01Icon, Rocket01Icon } from "@hugeicons/core-free-icons";

export function CalloutDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Tone Spectrum Matrix */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">1. Semantic Tone Spectrum</h3>
          <p className="text-sm text-muted-foreground">
            Five calibrated contextual tones engineered for technical documentation and application guidance.
            Each tone balances hue contrast with subtle 10-layer physical optical diffusion.
          </p>
        </div>

        <div className="space-y-3">
          <Callout tone="note">
            <CalloutTitle>Note: Optical Transmission Model</CalloutTitle>
            <CalloutContent>
              HaloUI surfaces compute transmission dynamically across 10 discrete physical optical layers
              rather than flat opacity blurs.
            </CalloutContent>
          </Callout>

          <Callout tone="tip">
            <CalloutTitle>Tip: Component Composition</CalloutTitle>
            <CalloutContent>
              Wrap callouts inside your markdown MDX components mapping directly to standard GitHub-style
              alerts: <code>&gt; [!TIP]</code>, <code>&gt; [!NOTE]</code>, and <code>&gt; [!WARNING]</code>.
            </CalloutContent>
          </Callout>

          <Callout tone="important">
            <CalloutTitle>Important: Architectural Hierarchy</CalloutTitle>
            <CalloutContent>
              Never nest high-intensity glass cards within other high-intensity glass containers. Always preserve
              the material hierarchy of the interface.
            </CalloutContent>
          </Callout>

          <Callout tone="warning">
            <CalloutTitle>Warning: Mobile GPU Constraints</CalloutTitle>
            <CalloutContent>
              Avoid rendering more than 3 simultaneous backdrop-filter surfaces on lower-tier mobile hardware
              to maintain 60fps scrolling performance.
            </CalloutContent>
          </Callout>

          <Callout tone="caution">
            <CalloutTitle>Caution: Irreversible Mutation</CalloutTitle>
            <CalloutContent>
              Purging the registry cache will permanently remove all uncommitted local component modifications.
              Ensure your working directory is clean before proceeding.
            </CalloutContent>
          </Callout>
        </div>
      </section>

      {/* 2. Material Intensity Matrix */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">2. Material Intensity Modes</h3>
          <p className="text-sm text-muted-foreground">
            Adjust the optical depth from reading-optimized subtle diffusion to prominent balanced glass or solid plain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subtle</span>
              <Badge variant="outline" className="text-[10px]">Default</Badge>
            </div>
            <Callout tone="note" intensity="subtle">
              <CalloutTitle>Subtle Glass</CalloutTitle>
              <CalloutContent>
                Optimized for dense documentation prose with maximum text contrast and minimal backdrop blur.
              </CalloutContent>
            </Callout>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Balanced</span>
              <Badge variant="outline" className="text-[10px]">High Contrast</Badge>
            </div>
            <Callout tone="tip" intensity="balanced">
              <CalloutTitle>Balanced Glass</CalloutTitle>
              <CalloutContent>
                Heightened optical boundary and specular highlight for standalone callouts requiring emphasis.
              </CalloutContent>
            </Callout>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plain</span>
              <Badge variant="outline" className="text-[10px]">High Accessibility</Badge>
            </div>
            <Callout tone="warning" intensity="plain">
              <CalloutTitle>Plain Surface</CalloutTitle>
              <CalloutContent>
                Zero-blur solid container for high-contrast accessibility or reduced-transparency operating modes.
              </CalloutContent>
            </Callout>
          </div>
        </div>
      </section>

      {/* 3. Rich Formatting & Lists */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">3. Rich Content Formatting</h3>
          <p className="text-sm text-muted-foreground">
            CalloutContent natively styles paragraphs, unordered and ordered lists, inline code blocks, and hyperlinks.
          </p>
        </div>

        <Callout tone="tip">
          <CalloutTitle>Best Practices for Registry Distribution</CalloutTitle>
          <CalloutContent>
            <p>
              When distributing HaloUI components to consumer applications, verify the following configuration items:
            </p>
            <ul>
              <li>Ensure <code>@hugeicons/core-free-icons</code> is installed as a production dependency.</li>
              <li>Include <code>styles/halo-tokens.css</code> and <code>styles/halo-material.css</code> in your global stylesheet.</li>
              <li>Configure Tailwind CSS container queries plugin (<code>@tailwindcss/container-queries</code>) in your tailwind config.</li>
            </ul>
            <p>
              Review the <a href="/docs/installation">full installation guide</a> for step-by-step instructions.
            </p>
          </CalloutContent>
        </Callout>
      </section>

      {/* 4. Extreme 240px Container Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">4. Automatic 240px Container Reflow</h3>
          <p className="text-sm text-muted-foreground">
            Demonstrating container-aware layout resilience when rendered inside micro sidebars, split panes, and 240px narrow containers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-[240px] p-3 rounded-lg border border-dashed border-border/80 bg-muted/20">
            <div className="text-[11px] font-mono text-muted-foreground mb-1">Container: 240px</div>
            <Callout tone="caution">
              <CalloutTitle>Data Loss Alert</CalloutTitle>
              <CalloutContent>
                Unsaved changes will be discarded upon session timeout.
              </CalloutContent>
            </Callout>
          </div>

          <div className="w-[280px] p-3 rounded-lg border border-dashed border-border/80 bg-muted/20">
            <div className="text-[11px] font-mono text-muted-foreground mb-1">Container: 280px</div>
            <Callout tone="important">
              <CalloutTitle>API Rate Limit</CalloutTitle>
              <CalloutContent>
                90% of your hourly quota has been consumed.
              </CalloutContent>
            </Callout>
          </div>

          <div className="w-[320px] p-3 rounded-lg border border-dashed border-border/80 bg-muted/20">
            <div className="text-[11px] font-mono text-muted-foreground mb-1">Container: 320px</div>
            <Callout tone="note">
              <CalloutTitle>Telemetry Note</CalloutTitle>
              <CalloutContent>
                Anonymous usage data helps us optimize optical shader pipelines.
              </CalloutContent>
            </Callout>
          </div>
        </div>
      </section>

      {/* 5. Nested Inside Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">5. Nested Within UI Surfaces</h3>
          <p className="text-sm text-muted-foreground">
            Callout operates smoothly inside neutral shadcn cards without creating visual noise or nested blur halos.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Storage Volume Configuration</CardTitle>
            <CardDescription>Configure persistent NVMe volumes for high-throughput computing workloads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Callout tone="warning" intensity="subtle">
              <CalloutTitle>Ephemeral Storage Provisioning</CalloutTitle>
              <CalloutContent>
                Volumes attached via the temporary tier are automatically deallocated when the instance stops.
                Use persistent block storage for critical database volumes.
              </CalloutContent>
            </Callout>
            <p className="text-xs text-muted-foreground">
              Volume mount point: <code className="font-mono">/mnt/data/nvme-01</code>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
