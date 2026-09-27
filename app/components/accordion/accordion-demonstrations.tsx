"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ServerIcon,
  Shield01Icon,
  Globe02Icon,
  CpuIcon,
  Key01Icon,
  CheckmarkCircle02Icon,
  Notification01Icon,
  DatabaseIcon,
  FileCodeIcon,
  Alert02Icon,
} from "@hugeicons/core-free-icons";

export function AccordionDemonstrations() {
  return (
    <div className="space-y-16">
      {/* DEMO 1: Production Infrastructure FAQ & Long Trigger Text Wrapping */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            1. Cloud Architecture &amp; Physical Optics FAQs
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Demonstrates automatic wrapping for long technical headings, restrained Liquid Glass
            outer framing, and rich expanded content with markdown links and badge indicators.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <Accordion variant="glass" defaultValue="faq-1" className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger
                icon={<HaloIcon icon={Shield01Icon} size={16} />}
                badge={<Badge variant="outline">Optics</Badge>}
              >
                How does HaloUI handle accessibility and reduced transparency across nested Liquid
                Glass surfaces?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  HaloUI strictly avoids glass-on-glass nesting. Rather than cascading multiple
                  backdrop-filter layers, the outer Accordion establishes a single calibrated
                  optical boundary with balanced environmental transmission.
                </p>
                <p>
                  When the operating system or browser requests{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                    prefers-reduced-transparency: reduce
                  </code>
                  , the liquid engine gracefully falls back to opaque high-contrast neutral fills
                  while preserving 100% of spatial hierarchy and focus visible rings.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button size="xs" variant="outline">
                    Explore Optical Tokens
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    WCAG 2.1 AA Compliant &bull; 4.5:1 Minimum Contrast
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2">
              <AccordionTrigger
                icon={<HaloIcon icon={Globe02Icon} size={16} />}
                badge={<StatusBadge tone="positive">99.999% SLA</StatusBadge>}
              >
                What failover mechanisms preserve database consistency during cross-region network
                partition events?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Distributed Raft consensus groups establish synchronous leases across odd-numbered
                  quorum nodes. In the event of a trans-oceanic cable sever, minority partitions
                  step down into read-only transaction modes within 250 milliseconds.
                </p>
                <p>
                  Incoming mutations queue locally in encrypted NVMe append-only journals until
                  network symmetry is cryptographically re-verified.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3">
              <AccordionTrigger
                icon={<HaloIcon icon={ServerIcon} size={16} />}
                badge={<Badge variant="secondary">Zero-Egress</Badge>}
              >
                Can Accordion triggers contain complex interactive metadata without triggering
                accidental panel expansion?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes. By delegating accessibility semantics directly to Base UI&apos;s WAI-ARIA
                  disclosure model, the trigger element operates as a standard semantic HTML{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                    &lt;button&gt;
                  </code>
                  .
                </p>
                <p>
                  Interactive controls located inside the expanded panel remain completely
                  independent from disclosure toggle events.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* DEMO 2: High-Density Diagnostic Telemetry (Compact Scale) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            2. High-Density Cluster Diagnostics (Compact Density)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Utilizes <code className="font-mono text-xs">density=&quot;compact&quot;</code> with 8-10px
            vertical padding, outline surface styling, and embedded diagnostic logs.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <Accordion variant="outline" density="compact" defaultValue="node-1" className="w-full">
            <AccordionItem value="node-1">
              <AccordionTrigger
                icon={<HaloIcon icon={CpuIcon} size={15} />}
                badge={<StatusBadge tone="positive">Healthy</StatusBadge>}
              >
                us-east-cluster-alpha &bull; AMD EPYC 9654 (96 Cores / 192 Threads)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="rounded bg-muted/40 p-2">
                      <span className="text-muted-foreground block text-[10px]">CPU Load</span>
                      <span className="font-semibold text-foreground">24.2%</span>
                    </div>
                    <div className="rounded bg-muted/40 p-2">
                      <span className="text-muted-foreground block text-[10px]">Memory Used</span>
                      <span className="font-semibold text-foreground">38.4 / 128 GB</span>
                    </div>
                    <div className="rounded bg-muted/40 p-2">
                      <span className="text-muted-foreground block text-[10px]">p99 Latency</span>
                      <span className="font-semibold text-foreground">1.8 ms</span>
                    </div>
                    <div className="rounded bg-muted/40 p-2">
                      <span className="text-muted-foreground block text-[10px]">Active Sockets</span>
                      <span className="font-semibold text-foreground">14,892</span>
                    </div>
                  </div>
                  <pre className="font-mono text-[11px] leading-relaxed bg-muted/60 p-2.5 rounded border border-border/50 overflow-x-auto text-muted-foreground">
                    <code>
                      [2026-09-28 02:40:12 UTC] [KERNEL] TLS session cache hit ratio: 98.4%
                      {"\n"}
                      [2026-09-28 02:41:04 UTC] [NET] WireGuard tunnel wg0 keepalive acknowledged
                    </code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="node-2">
              <AccordionTrigger
                icon={<HaloIcon icon={DatabaseIcon} size={15} />}
                badge={<StatusBadge tone="positive">Synchronized</StatusBadge>}
              >
                eu-central-storage-omega &bull; NVMe-oF Distributed Block Volume
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xs">
                  Replication pipeline synchronized across 4 NVMe targets with 0 degraded sectors.
                  Total write volume in past 24 hours: 14.8 TB.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="node-3">
              <AccordionTrigger
                icon={<HaloIcon icon={Globe02Icon} size={15} />}
                badge={<StatusBadge tone="warning">Degraded</StatusBadge>}
              >
                ap-southeast-edge-04 &bull; Singapore Anycast Border Gateway
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-start gap-2.5 text-xs text-amber-600 dark:text-amber-400">
                  <HaloIcon icon={Alert02Icon} size={15} className="shrink-0 mt-0.5" />
                  <p>
                    Upstream transit provider BGP flapping detected on AS13335. Traffic automatically
                    rerouted via Tokyo trans-pacific link.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* DEMO 3: Settings & Interactive Form Controls (Multiple Expansion) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            3. Notification Preferences &amp; Access Controls (Multiple Mode)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Enables multiple concurrent open items with{" "}
            <code className="font-mono text-xs">multiple=&#123;true&#125;</code> and interactive form
            toggles inside panels without triggering accordion collapse.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <Accordion
            variant="default"
            multiple={true}
            defaultValue={["security", "telemetry"]}
            className="w-full"
          >
            <AccordionItem value="security">
              <AccordionTrigger
                icon={<HaloIcon icon={Key01Icon} size={16} />}
                badge={<Badge variant="outline">Required</Badge>}
              >
                Security &amp; Hardware Key Authentication
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Label className="text-xs font-medium text-foreground">
                        Require WebAuthn / FIDO2 Hardware Key
                      </Label>
                      <p className="text-[11px] text-muted-foreground">
                        Enforces physical security token verification for all administrative mutations.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Label className="text-xs font-medium text-foreground">
                        Session IP Affinity Locking
                      </Label>
                      <p className="text-[11px] text-muted-foreground">
                        Immediately invalidate authentication tokens if client ASN changes during active session.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="telemetry">
              <AccordionTrigger icon={<HaloIcon icon={Notification01Icon} size={16} />}>
                Real-Time Incident Dispatch Notifications
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Label className="text-xs font-medium text-foreground">
                        PagerDuty Critical Escalation
                      </Label>
                      <p className="text-[11px] text-muted-foreground">
                        Trigger automated high-urgency voice and SMS notifications for P0 outages.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Label className="text-xs font-medium text-foreground">
                        Slack Incident Bridge Webhook
                      </Label>
                      <p className="text-[11px] text-muted-foreground">
                        Create dedicated incident channels automatically upon severity threshold breach.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* DEMO 4: Strict 240px Narrow Container Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            4. Strict 240px Narrow Container Reflow Test
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Validates automatic wrapping and alignment in an explicit 240px container without
            horizontal overflow, text clipping, or broken disclosure indicators.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 flex items-center justify-center overflow-hidden">
          <div className="w-[240px] border-2 border-dashed border-primary/40 rounded-xl p-2 bg-background">
            <div className="text-[10px] font-mono text-muted-foreground text-center pb-2 border-b border-border/50 mb-2">
              CONTAINER: 240px WIDTH
            </div>
            <Accordion variant="outline" density="compact" defaultValue="narrow-1" className="w-full">
              <AccordionItem value="narrow-1">
                <AccordionTrigger>
                  Very Long Wrapped Section Heading On Mobile
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs">
                    Content wraps naturally inside the 240px bounded width with zero document overflow.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="narrow-2">
                <AccordionTrigger>
                  Optical Boundaries
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs">
                    Chevron indicator remains pinned on the right while the label occupies the
                    remaining flexible track.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
