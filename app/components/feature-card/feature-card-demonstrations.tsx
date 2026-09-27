"use client";

import * as React from "react";
import {
  FeatureCard,
  FeatureCardVisual,
  FeatureCardTitle,
  FeatureCardDescription,
  FeatureCardContent,
  FeatureCardAction,
} from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Shield01Icon,
  Database01Icon,
  FlashIcon,
  Globe02Icon,
  LockPasswordIcon,
  CloudSavingDone01Icon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  Layers01Icon,
  SourceCodeIcon,
  Analytics01Icon,
  WorkflowSquare01Icon,
  CpuIcon,
} from "@hugeicons/core-free-icons";

export function FeatureCardDemonstrations() {
  return (
    <div className="space-y-16">
      {/* 1. Default & Minimal */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Core Presentations: Default & Minimal
          </h3>
          <p className="text-sm text-muted-foreground">
            Feature Card pairs a concise capability title with an explanation. Icons serve as optional visual identifiers, while minimal mode prioritizes unadorned typographic hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Default: With Icon */}
          <FeatureCard>
            <FeatureCardVisual>
              <HaloIcon icon={Shield01Icon} size={20} />
            </FeatureCardVisual>
            <div className="space-y-1.5">
              <FeatureCardTitle>Hardware-Enforced Enclaves</FeatureCardTitle>
              <FeatureCardDescription>
                Cryptographic memory isolation shields sensitive execution states even from host privileged kernel inspection.
              </FeatureCardDescription>
            </div>
          </FeatureCard>

          {/* Minimal: Pure Typography */}
          <FeatureCard>
            <div className="space-y-1.5">
              <FeatureCardTitle>Instant Point-in-Time Restore</FeatureCardTitle>
              <FeatureCardDescription>
                Continuous write-ahead transaction logs permit millisecond-precision rollback across multi-region tenant shards with zero storage bloat.
              </FeatureCardDescription>
            </div>
          </FeatureCard>
        </div>
      </section>

      {/* 2. With Action & Supporting Highlights */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Actions & Supporting Highlights
          </h3>
          <p className="text-sm text-muted-foreground">
            Feature Card supports explicit supplementary actions (such as documentation links or configuration buttons) and supporting highlight rows without hijacking whole-card focus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard>
            <FeatureCardVisual>
              <HaloIcon icon={Database01Icon} size={20} />
            </FeatureCardVisual>
            <div className="space-y-1.5">
              <FeatureCardTitle>Distributed Columnar Indexing</FeatureCardTitle>
              <FeatureCardDescription>
                Parallel vector projections accelerate high-cardinality analytical queries across petabyte telemetry datasets.
              </FeatureCardDescription>
            </div>
            <FeatureCardContent>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HaloIcon icon={CheckmarkCircle01Icon} size={14} className="text-emerald-500 shrink-0" />
                <span>Apache Arrow native memory representation</span>
              </div>
            </FeatureCardContent>
            <FeatureCardAction>
              <Button size="sm" variant="outline" className="gap-1.5">
                <span>View benchmark data</span>
                <HaloIcon icon={ArrowRight01Icon} size={14} />
              </Button>
            </FeatureCardAction>
          </FeatureCard>

          <FeatureCard>
            <FeatureCardVisual>
              <HaloIcon icon={FlashIcon} size={20} />
            </FeatureCardVisual>
            <div className="space-y-1.5">
              <FeatureCardTitle>Deterministic Cache Busting</FeatureCardTitle>
              <FeatureCardDescription>
                Automatic surrogate-key indexing flushes stale edge copies globally within 80 milliseconds of database commit.
              </FeatureCardDescription>
            </div>
            <FeatureCardContent>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HaloIcon icon={CheckmarkCircle01Icon} size={14} className="text-emerald-500 shrink-0" />
                <span>Global edge purge latency: 45ms median</span>
              </div>
            </FeatureCardContent>
            <FeatureCardAction>
              <Button size="sm" variant="ghost" className="gap-1.5 px-0 text-primary hover:bg-transparent">
                <span>Read cache specification</span>
                <HaloIcon icon={ArrowRight01Icon} size={14} />
              </Button>
            </FeatureCardAction>
          </FeatureCard>
        </div>
      </section>

      {/* 3. Media Slot & Fidelity Preservation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Media Slots & Preserved Optical Fidelity
          </h3>
          <p className="text-sm text-muted-foreground">
            When displaying screenshot fragments, architectural diagrams, or code previews, <code className="text-xs font-mono">FeatureCardVisual variant=&quot;media&quot;</code> isolates internal graphics from parent translucent glass blurs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard>
            <FeatureCardVisual variant="media" className="p-3.5 bg-muted/40 font-mono text-[11px] space-y-2">
              <div className="flex items-center justify-between text-muted-foreground border-b border-border/40 pb-1.5">
                <span className="font-semibold text-foreground">api/telemetry/route.ts</span>
                <span className="text-emerald-500 font-medium">HTTP 200 OK</span>
              </div>
              <div className="text-muted-foreground space-y-0.5 leading-relaxed">
                <div><span className="text-rose-500">export const</span> runtime = <span className="text-amber-500">&apos;edge&apos;</span>;</div>
                <div><span className="text-sky-500">export async function</span> GET() &#123;</div>
                <div className="pl-3">return Response.json(&#123; status: &apos;stream&apos; &#125;);</div>
                <div>&#125;</div>
              </div>
            </FeatureCardVisual>
            <div className="space-y-1.5 pt-1">
              <FeatureCardTitle>Zero-Cold-Start Edge Handlers</FeatureCardTitle>
              <FeatureCardDescription>
                V8 isolate snapshots boot in under 5 milliseconds with native Web Standard streaming response buffers.
              </FeatureCardDescription>
            </div>
          </FeatureCard>

          <FeatureCard>
            <FeatureCardVisual variant="media" className="p-3.5 bg-muted/40 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/40 pb-2">
                <span className="font-medium text-foreground">Regional Topology</span>
                <span className="text-xs font-mono text-muted-foreground">iad1 / sfo1 / fra1</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 rounded-lg bg-background/80 border border-border/60">
                  <div className="font-bold text-foreground">12ms</div>
                  <div className="text-[10px] text-muted-foreground">US East</div>
                </div>
                <div className="p-2 rounded-lg bg-background/80 border border-border/60">
                  <div className="font-bold text-foreground">38ms</div>
                  <div className="text-[10px] text-muted-foreground">US West</div>
                </div>
                <div className="p-2 rounded-lg bg-background/80 border border-border/60">
                  <div className="font-bold text-foreground">78ms</div>
                  <div className="text-[10px] text-muted-foreground">EU Central</div>
                </div>
              </div>
            </FeatureCardVisual>
            <div className="space-y-1.5 pt-1">
              <FeatureCardTitle>Anycast Routing Fabric</FeatureCardTitle>
              <FeatureCardDescription>
                BGP route optimization steers incoming client traffic to the topologically closest healthy data plane automatically.
              </FeatureCardDescription>
            </div>
          </FeatureCard>
        </div>
      </section>

      {/* 4. Horizontal Orientation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Horizontal Orientation
          </h3>
          <p className="text-sm text-muted-foreground">
            For sidebars, full-width feature lists, or comparison panels, <code className="text-xs font-mono">orientation=&quot;horizontal&quot;</code> reflows the visual, text, and action into a responsive inline row.
          </p>
        </div>

        <div className="space-y-3">
          <FeatureCard orientation="horizontal">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <FeatureCardVisual>
                <HaloIcon icon={Globe02Icon} size={20} />
              </FeatureCardVisual>
              <div className="space-y-1 min-w-0">
                <FeatureCardTitle>Automated Custom Domains & SSL</FeatureCardTitle>
                <FeatureCardDescription>
                  Instant wildcard ACME certificate issuance with automatic DNS CAA validation and 0-downtime renewal cycles.
                </FeatureCardDescription>
              </div>
            </div>
            <FeatureCardAction>
              <Button size="sm" variant="outline">
                Configure DNS
              </Button>
            </FeatureCardAction>
          </FeatureCard>

          <FeatureCard orientation="horizontal">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <FeatureCardVisual>
                <HaloIcon icon={LockPasswordIcon} size={20} />
              </FeatureCardVisual>
              <div className="space-y-1 min-w-0">
                <FeatureCardTitle>Granular Role-Based Access Control</FeatureCardTitle>
                <FeatureCardDescription>
                  Define scoped permission matrices with cryptographic audit logging and single sign-on SAML v2 enforcement.
                </FeatureCardDescription>
              </div>
            </div>
            <FeatureCardAction>
              <Button size="sm" variant="outline">
                Manage roles
              </Button>
            </FeatureCardAction>
          </FeatureCard>
        </div>
      </section>

      {/* 5. Whole-Card Interactive Link */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Whole-Card Interactive Target
          </h3>
          <p className="text-sm text-muted-foreground">
            When the entire card acts as a navigation target, use <code className="text-xs font-mono">asChild</code> with an anchor element and set <code className="text-xs font-mono">interactive=&#123;true&#125;</code>. Internal nodes must never nest buttons or secondary anchors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard asChild interactive>
            <a
              href="#interactive-demo"
              className="group/card flex flex-col justify-between"
              onClick={(e) => e.preventDefault()}
            >
              <FeatureCardVisual>
                <HaloIcon icon={Layers01Icon} size={20} />
              </FeatureCardVisual>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <FeatureCardTitle>Schema Migration Engine</FeatureCardTitle>
                  <HaloIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    className="text-muted-foreground group-hover/feature-card:translate-x-1 group-hover/feature-card:text-foreground transition-transform"
                  />
                </div>
                <FeatureCardDescription>
                  Zero-locking schema transitions generate non-blocking shadow tables with background replication validation.
                </FeatureCardDescription>
              </div>
            </a>
          </FeatureCard>

          <FeatureCard asChild interactive>
            <a
              href="#interactive-demo"
              className="group/card flex flex-col justify-between"
              onClick={(e) => e.preventDefault()}
            >
              <FeatureCardVisual>
                <HaloIcon icon={SourceCodeIcon} size={20} />
              </FeatureCardVisual>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <FeatureCardTitle>Type-Safe API Code Generation</FeatureCardTitle>
                  <HaloIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    className="text-muted-foreground group-hover/feature-card:translate-x-1 group-hover/feature-card:text-foreground transition-transform"
                  />
                </div>
                <FeatureCardDescription>
                  Extract end-to-end TypeScript interfaces directly from live OpenAPI specifications on every Git pull request.
                </FeatureCardDescription>
              </div>
            </a>
          </FeatureCard>
        </div>
      </section>

      {/* 6. Feature Grid Stress Test (12 Cards) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            6. Feature Grid Stress Test (12 Representative Cards)
          </h3>
          <p className="text-sm text-muted-foreground">
            Permanent performance and visual hierarchy QA: evaluating 12 cards in a dense 3-column / 4-column responsive grid. Note the calm visual rhythm, hairline optical edges, and complete absence of noisy glowing orbs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Shield01Icon,
              title: "Edge Encryption",
              desc: "TLS 1.3 session resumption with ChaCha20-Poly1305 hardware acceleration.",
            },
            {
              icon: Database01Icon,
              title: "Read Replicas",
              desc: "Replication lag under 20ms across 8 geographical regions.",
            },
            {
              icon: FlashIcon,
              title: "Sub-Second Cold Starts",
              desc: "Lightweight V8 isolate initialization in less than 5 milliseconds.",
            },
            {
              icon: Globe02Icon,
              title: "Global CDN Mesh",
              desc: "320 points of presence with tier-1 transit interconnection.",
            },
            {
              icon: LockPasswordIcon,
              title: "SOC 2 Type II Certified",
              desc: "Continuous automated compliance monitoring with immutable audit logs.",
            },
            {
              icon: CloudSavingDone01Icon,
              title: "Automated Snapshots",
              desc: "Hourly differential backups retained for 90 days across S3 buckets.",
            },
            {
              icon: Layers01Icon,
              title: "Multi-Tenant Isolation",
              desc: "Hardware-enforced tenant boundaries preventing cross-talk.",
            },
            {
              icon: SourceCodeIcon,
              title: "TypeScript First",
              desc: "Full type inference for database schemas and edge query builders.",
            },
            {
              icon: Analytics01Icon,
              title: "Real-Time Telemetry",
              desc: "Stream trace spans and log metrics directly to ClickHouse clusters.",
            },
            {
              icon: WorkflowSquare01Icon,
              title: "Distributed Workflows",
              desc: "Durable execution graphs with automatic retry logic and step compensation.",
            },
            {
              icon: CpuIcon,
              title: "GPU Acceleration",
              desc: "Serverless inference runtimes leveraging NVIDIA H100 GPU clusters.",
            },
            {
              icon: CheckmarkCircle01Icon,
              title: "99.999% Availability",
              desc: "Financial-grade SLA backed by multi-cloud failover orchestration.",
            },
          ].map((item, idx) => (
            <FeatureCard key={idx} size="sm">
              <FeatureCardVisual>
                <HaloIcon icon={item.icon} size={18} />
              </FeatureCardVisual>
              <div className="space-y-1">
                <FeatureCardTitle as="h4">{item.title}</FeatureCardTitle>
                <FeatureCardDescription>{item.desc}</FeatureCardDescription>
              </div>
            </FeatureCard>
          ))}
        </div>
      </section>

      {/* 7. Long Content / Stress Test */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            7. Long Content & Localization Stress Test
          </h3>
          <p className="text-sm text-muted-foreground">
            Verifying typographic reflow with extended multi-paragraph descriptions and localized capability titles. Height adapts naturally without text clipping.
          </p>
        </div>

        <FeatureCard className="max-w-2xl">
          <FeatureCardVisual>
            <HaloIcon icon={Globe02Icon} size={20} />
          </FeatureCardVisual>
          <div className="space-y-2">
            <FeatureCardTitle>
              Cryptographically Attested Cross-Datacenter Replication Protocol with Adaptive Consensus and Zero-Downtime Split-Brain Resolution
            </FeatureCardTitle>
            <FeatureCardDescription>
              This enterprise-grade synchronization protocol continuously computes merkle DAG checksums across distributed state machines located in North America, Europe, and Asia-Pacific. In the event of catastrophic submarine cable severances or trans-oceanic route flap storms, the consensus engine dynamically adjusts quorum thresholds without discarding uncommitted transactions.
            </FeatureCardDescription>
            <FeatureCardDescription>
              Local tenant write operations continue unabated within the isolated partition, while deterministic timestamp vector clocks reconcile eventual consistency once network partitions heal. All synchronization operations are cryptographically signed using hardware security module (HSM) keys.
            </FeatureCardDescription>
          </div>
          <FeatureCardContent>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="font-semibold text-foreground">Protocol Version:</span> v4.8-enterprise
              <span className="font-semibold text-foreground">Attestation:</span> FIPS 140-3 Level 4
            </div>
          </FeatureCardContent>
          <FeatureCardAction>
            <Button size="sm" variant="outline">
              Review RFC 8940 Whitepaper
            </Button>
          </FeatureCardAction>
        </FeatureCard>
      </section>
    </div>
  );
}
