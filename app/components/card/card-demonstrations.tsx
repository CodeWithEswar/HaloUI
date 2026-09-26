"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Settings02Icon,
  MoreHorizontalIcon,
  ArrowRight01Icon,
  Download01Icon,
  Share01Icon,
  Folder01Icon,
  CpuIcon,
  CloudServerIcon,
  Globe02Icon,
  Database01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

export function CardDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Default Card & Card with Footer */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Structural Sections & Footer
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Card organizes content hierarchically into optional Header, Title, Description, Action, Content, and Footer regions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card with Footer Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Storage Volume</CardTitle>
              <CardDescription>Persistent NVMe block storage allocation in ap-south-1.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-xs py-1">
                <span className="text-muted-foreground">Capacity Used</span>
                <span className="font-semibold text-foreground">342 GB / 512 GB (66%)</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full w-[66%] rounded-full" />
              </div>
            </CardContent>
            <CardFooter divided className="justify-between">
              <Button variant="ghost" size="sm">Manage Volumes</Button>
              <Button variant="default" size="sm">Add Storage</Button>
            </CardFooter>
          </Card>

          {/* Card with Header Action Slot */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>API Key: Production</CardTitle>
                <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400">
                  Active
                </Badge>
              </div>
              <CardDescription>Created on Sep 14, 2026 by admin@company.internal</CardDescription>
              <CardAction>
                <IconButton variant="ghost" size="sm" aria-label="API key actions">
                  <HaloIcon icon={MoreHorizontalIcon} size={15} />
                </IconButton>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5 font-mono text-xs text-foreground flex items-center justify-between">
                <span>halo_live_9482938472918471...</span>
                <Badge variant="secondary" className="text-[10px]">Copied</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-muted-foreground">Last used 2 minutes ago from 192.0.2.1</span>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* 2. Content-Only Card (Zero Wrapper Bloat) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Content-Only Composition
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every subcomponent is optional. A Card can render arbitrary children directly without empty wrappers or mandatory headers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <HaloIcon icon={CpuIcon} size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-muted-foreground">Compute Cluster</div>
              <div className="text-sm font-semibold text-foreground truncate">16 vCPUs · 64 GB RAM</div>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <HaloIcon icon={CloudServerIcon} size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-muted-foreground">Active Microservices</div>
              <div className="text-sm font-semibold text-foreground truncate">28 Running / 0 Degraded</div>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <HaloIcon icon={Globe02Icon} size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-muted-foreground">Global Ingress</div>
              <div className="text-sm font-semibold text-foreground truncate">420k Req/min (Global)</div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Dense Content Dashboard Grid */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Dense Dashboard Multi-Card Scanning
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Unlike floating overlays, Data Display cards use restrained optical intensity so that multiple adjacent surfaces remain visually calm and readable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card size="sm">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Global routing nodes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tight text-foreground">99.99%</div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">Zero downtime in 90 days</p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Average Latency</CardTitle>
              <CardDescription>Edge-to-client roundtrip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tight text-foreground">14.2 ms</div>
              <p className="text-[11px] text-muted-foreground mt-1">-3.1ms from last deployment</p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Cache Hit Rate</CardTitle>
              <CardDescription>Cloudflare Edge CDN</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tight text-foreground">94.8%</div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">1.2 TB bandwidth saved</p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Error Budget</CardTitle>
              <CardDescription>SLO consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tight text-foreground">98.2%</div>
              <p className="text-[11px] text-muted-foreground mt-1">1.8% spent this billing cycle</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Semantic Interactive Cards */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Semantic Interactive Cards
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When a card needs to navigate, use <code className="text-foreground">asChild</code> with an anchor or Next.js Link. Static cards must never receive interactive focus or hover lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card asChild interactive>
            <a href="#interactive-demo" className="block focus-visible:outline-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Guide</Badge>
                  <HaloIcon icon={ArrowRight01Icon} size={14} className="text-muted-foreground group-hover/card:text-foreground transition-colors" />
                </div>
                <CardTitle className="mt-2">Liquid Material Foundations</CardTitle>
                <CardDescription>
                  Deep dive into the 10-layer physical optical engine and specular lighting.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <span className="text-xs font-medium text-primary">Read guide →</span>
              </CardFooter>
            </a>
          </Card>

          <Card asChild interactive>
            <a href="#interactive-demo" className="block focus-visible:outline-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Reference</Badge>
                  <HaloIcon icon={ArrowRight01Icon} size={14} className="text-muted-foreground group-hover/card:text-foreground transition-colors" />
                </div>
                <CardTitle className="mt-2">Accessible Roving Focus</CardTitle>
                <CardDescription>
                  WAI-ARIA composite navigation patterns for toolbars and menus.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <span className="text-xs font-medium text-primary">Read reference →</span>
              </CardFooter>
            </a>
          </Card>

          <Card asChild interactive>
            <a href="#interactive-demo" className="block focus-visible:outline-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Registry</Badge>
                  <HaloIcon icon={ArrowRight01Icon} size={14} className="text-muted-foreground group-hover/card:text-foreground transition-colors" />
                </div>
                <CardTitle className="mt-2">Shadcn Source Distribution</CardTitle>
                <CardDescription>
                  Direct repository ownership of raw TypeScript primitives without vendor lock-in.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <span className="text-xs font-medium text-primary">Explore registry →</span>
              </CardFooter>
            </a>
          </Card>
        </div>
      </section>

      {/* 5. Material Intensity Scale */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Material Intensity Levels
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Card supports Subtle (default for dense dashboards), Balanced (for feature surfaces), and Rich (for isolated focal points).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card intensity="subtle">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Subtle (Default)</CardTitle>
                <Badge variant="outline" className="text-[10px]">Minimal Blur</Badge>
              </div>
              <CardDescription>
                High information density. 2px diffusion layer ensures zero frame drops in 24+ card grids.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Ideal for tabular summaries, logs, and dense analytical dashboards.
            </CardContent>
          </Card>

          <Card intensity="balanced">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Balanced</CardTitle>
                <Badge variant="outline" className="text-[10px]">Medium Blur</Badge>
              </div>
              <CardDescription>
                Calibrated optical transmission with soft shadow anchoring and 135° specular edge.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Ideal for section summaries and primary workflow landing areas.
            </CardContent>
          </Card>

          <Card intensity="rich">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Rich</CardTitle>
                <Badge variant="outline" className="text-[10px]">Deep Glass</Badge>
              </div>
              <CardDescription>
                Full liquid optical physics with deep blur and enhanced transmission.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Reserved for standalone hero cards and prominent featured callouts.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. Long Content & Overflow Resilience */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Overflow & Long String Resilience
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Card tolerates long unbroken strings, long descriptions, and narrow viewports without breaking layout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="break-words">
                ExtremelyLongDeploymentPipelineIdentifierThatExceedsNormalHorizontalLimitsWithoutSpaces_v4.9.2
              </CardTitle>
              <CardDescription className="break-words">
                https://edge.production.infrastructure.internal/pipelines/0ea83cac-0ec9-457f-8ceb-08981d1d0a0f/builds/9481928471928471928471
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Text content wraps smoothly without horizontal clipping or container deformation even inside constrained responsive grid columns.
              </p>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline Variant</CardTitle>
              <CardDescription>Pure structural border with transparent background.</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Zero backdrop-filter cost. Recommended for wireframing, secondary dialog sections, or deeply nested content regions.
            </CardContent>
            <CardFooter divided>
              <span className="text-xs text-muted-foreground">Zero GPU overhead</span>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
