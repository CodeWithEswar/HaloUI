"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  Shield01Icon,
  FileCodeIcon,
  SlidersHorizontalIcon,
  CheckmarkCircle02Icon,
  DatabaseIcon,
  Key01Icon,
  ArrowRight01Icon,
  Settings01Icon,
  CodeCircleIcon,
} from "@hugeicons/core-free-icons";

export function CollapsibleDemonstrations() {
  const [isControlledOpen, setIsControlledOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(true);

  return (
    <div className="space-y-16">
      {/* DEMO 1: Production Workspace & Technical Disclosure */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            1. Cloud Architecture &amp; Physical Optics File Tree
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Demonstrates automatic wrapping for long technical headings, restrained Liquid Glass
            outer framing, and rich expanded content with metadata and contextual actions.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs">
          <Collapsible variant="glass" defaultOpen className="w-full">
            <CollapsibleTrigger
              icon={<HaloIcon icon={Shield01Icon} size={16} />}
              badge={<Badge variant="outline">Optics Core</Badge>}
            >
              How does HaloUI handle accessibility and reduced transparency across nested Liquid
              Glass surfaces?
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-3">
                <p>
                  HaloUI strictly avoids glass-on-glass nesting. Rather than cascading multiple
                  backdrop-filter layers, the outer Collapsible establishes a single calibrated
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
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button size="xs" variant="outline">
                    Explore Optical Tokens
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    WCAG 2.1 AA Compliant &bull; 4.5:1 Minimum Contrast
                  </span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* DEMO 2: Controlled State Synchronization */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            2. Programmatic &amp; External Controlled State
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Collapsible synchronizes seamlessly with external switches, buttons, and state stores.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-xs space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/30">
            <div className="space-y-0.5">
              <Label htmlFor="external-toggle" className="text-xs font-medium cursor-pointer">
                Sync Disclosure State Externally
              </Label>
              <p className="text-[11px] text-muted-foreground">
                Current state: {isControlledOpen ? "Expanded (true)" : "Collapsed (false)"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => setIsControlledOpen((prev) => !prev)}
              >
                {isControlledOpen ? "Collapse Panel" : "Expand Panel"}
              </Button>
            </div>
          </div>

          <Collapsible
            variant="default"
            open={isControlledOpen}
            onOpenChange={setIsControlledOpen}
            className="w-full"
          >
            <CollapsibleTrigger
              icon={<HaloIcon icon={Key01Icon} size={16} />}
              badge={
                <StatusBadge tone={isControlledOpen ? "positive" : "neutral"}>
                  {isControlledOpen ? "Synchronized" : "Hidden"}
                </StatusBadge>
              }
            >
              Hardware Security Modules &amp; KMS Keyring Policy
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p>
                Cryptographic operations utilize FIPS 140-3 Level 4 certified hardware security
                modules. Private key fragments are distributed across physical air-gapped vaults
                using Shamir's secret sharing threshold scheme.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* DEMO 3: Inside Card (Material Hierarchy - Flatter treatment) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            3. Nested Inside Card (Material Hierarchy)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            When nested inside a Card or Dialog, Collapsible uses a flatter, unbordered outline
            variant to avoid heavy glass-on-glass noise.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <HaloIcon icon={Settings01Icon} size={16} className="text-primary" />
              Project Settings &amp; Build Pipeline
            </CardTitle>
            <CardDescription className="text-xs">
              Configure deployment triggers and automated integration test workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <Collapsible variant="outline" defaultOpen className="w-full">
              <CollapsibleTrigger
                icon={<HaloIcon icon={CodeCircleIcon} size={16} />}
                badge={<Badge variant="secondary">CI/CD</Badge>}
              >
                Advanced Build Options &amp; Turbopack Flags
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Turbopack Persistent Cache</span>
                    <span className="font-mono text-foreground">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Source Map Upload</span>
                    <span className="font-mono text-foreground">Production Only</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </section>

      {/* DEMO 4: Strict 240px Container Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            4. Strict 240px Container-Aware Reflow
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Simulates tight sidebar or mobile dock constraints at exactly 240px. The label wraps
            fluidly with zero overflow, while the chevron indicator remains anchored.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-xs flex flex-col items-center">
          <div className="w-[240px] border-2 border-dashed border-amber-500/50 p-2 rounded-lg bg-background/50">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block mb-2 font-medium">
              Boundary: 240px Container
            </span>
            <Collapsible variant="glass" density="compact" defaultOpen className="w-full">
              <CollapsibleTrigger
                icon={<HaloIcon icon={DatabaseIcon} size={14} />}
                className="text-xs"
              >
                Ultra Narrow Sidebar Item With Exceptionally Long Label
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-[11px] leading-relaxed">
                  Reflows gracefully without clipping, preserving accessible touch and keyboard
                  interaction.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* DEMO 5: Spatial Density Scale */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            5. Spatial Density Scale (Compact, Default, Relaxed)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Compare compact (high-density tables), default (standard interfaces), and relaxed
            (spacious marketing &amp; FAQ views).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Compact Density
            </span>
            <Collapsible variant="outline" density="compact" defaultOpen className="w-full">
              <CollapsibleTrigger>Compact Trigger (10px)</CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-xs">Optimized for dense inspector panels and sidebars.</p>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Default Density
            </span>
            <Collapsible variant="outline" density="default" defaultOpen className="w-full">
              <CollapsibleTrigger>Default Trigger (14px)</CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm">Standard 14px spatial rhythm for general interfaces.</p>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Relaxed Density
            </span>
            <Collapsible variant="outline" density="relaxed" defaultOpen className="w-full">
              <CollapsibleTrigger>Relaxed Trigger (18px)</CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm">Spacious layout for prominent feature disclosures.</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>
    </div>
  );
}
