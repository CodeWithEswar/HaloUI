"use client";

import * as React from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CheckmarkCircle02Icon,
  Alert02Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  ArrowRight01Icon,
  SecurityCheckIcon,
  RefreshIcon,
  LinkSquare02Icon,
} from "@hugeicons/core-free-icons";

export function AlertDemonstrations() {
  const [dismissedDemo, setDismissedDemo] = React.useState(false);

  return (
    <div className="space-y-16">
      {/* 1. SEMANTIC TONES MATRIX */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Semantic Tone Matrix
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Decoupled semantic states combining restrained tint, high-contrast typography, and dedicated Hugeicons indicators. Status is never communicated by color alone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Informational */}
          <Alert variant="info">
            <AlertTitle>Informational Note</AlertTitle>
            <AlertDescription>
              New optical calibration tokens are now loaded. Ambient diffusion automatically adapts to high-contrast mode.
            </AlertDescription>
          </Alert>

          {/* Success */}
          <Alert variant="success">
            <AlertTitle>Operation Verified</AlertTitle>
            <AlertDescription>
              All 14 cryptographic signatures match production registry checksums. Deployed to edge node network.
            </AlertDescription>
          </Alert>

          {/* Warning */}
          <Alert variant="warning">
            <AlertTitle>Attention Required</AlertTitle>
            <AlertDescription>
              Legacy API tokens will expire in 3 days. Migrate downstream consumers to granular scoped credentials.
            </AlertDescription>
          </Alert>

          {/* Destructive */}
          <Alert variant="destructive">
            <AlertTitle>Cluster Connection Failed</AlertTitle>
            <AlertDescription>
              Could not establish TLS handshake with primary telemetry collector. Retrying with exponential backoff.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* 2. OPTICAL INTENSITY RECIPES */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Optical Material Intensity
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Choose between canonical Subtle Liquid Glass for general in-flow feedback, Balanced for heightened emphasis, or Plain for reduced-transparency environments.
          </p>
        </div>

        <div className="space-y-3.5">
          {/* Subtle */}
          <Alert variant="info" intensity="subtle">
            <AlertTitle>Subtle Liquid Glass (Default)</AlertTitle>
            <AlertDescription>
              Subtle backdrop diffusion (`backdrop-blur-md`), 135° specular hairline highlight, and ambient contact shadow.
            </AlertDescription>
          </Alert>

          {/* Balanced */}
          <Alert variant="warning" intensity="balanced">
            <AlertTitle>Balanced Liquid Glass</AlertTitle>
            <AlertDescription>
              Heightened optical diffusion (`backdrop-blur-xl`), reinforced border reflection, and deeper elevation depth.
            </AlertDescription>
          </Alert>

          {/* Plain */}
          <Alert variant="success" intensity="plain">
            <AlertTitle>Plain (Solid / Reduced Transparency)</AlertTitle>
            <AlertDescription>
              Zero backdrop filters, solid high-contrast tinted surface, and maximum rendering performance on resource-constrained devices.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* 3. CONTAINER-AWARE RESPONSIVE REFLOW */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Container-Aware Automatic Reflow
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            The same Alert instance dynamically reorganizes its anatomy based on available parent width via container queries (`@container/alert`). Notice horizontal alignment at 640px vs vertical reflow at 280px and 240px.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wide Container: 640px+ */}
          <div className="lg:col-span-7 space-y-2">
            <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider flex items-center justify-between">
              <span>Wide Container (Desktop / Phablet)</span>
              <span>Horizontal Flow</span>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/10">
              <Alert variant="info">
                <AlertTitle>Automated Backup Completed</AlertTitle>
                <AlertDescription>
                  Snapshot id `snap-09881` stored across 3 global availability zones.
                </AlertDescription>
                <AlertAction>
                  <Button size="sm" variant="outline" className="h-7 text-xs px-2.5">
                    View Snapshot
                  </Button>
                </AlertAction>
              </Alert>
            </div>
          </div>

          {/* Narrow Container: 280px */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider flex items-center justify-between">
              <span>Micro Container (280px Sidebar)</span>
              <span>Vertical Reflow</span>
            </div>
            <div className="max-w-[280px] p-2.5 rounded-xl border border-dashed border-border/80 bg-muted/10">
              <Alert variant="warning" dismissible>
                <AlertTitle>Sync Delayed</AlertTitle>
                <AlertDescription>
                  3 pending mutation payloads queued in offline storage buffer.
                </AlertDescription>
                <AlertAction>
                  <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                    <HaloIcon icon={RefreshIcon} size={12} className="mr-1" />
                    Retry Now
                  </Button>
                </AlertAction>
              </Alert>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NESTED MATERIAL SHOWCASE */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Nested Material in Liquid Glass Card
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            HaloUI prevents &ldquo;glass-on-glass&rdquo; visual clutter. When embedded inside an existing Liquid Glass Card, the Alert maintains crisp optical harmony without competing blur layers.
          </p>
        </div>

        <Card intensity="subtle" className="max-w-2xl">
          <CardHeader>
            <CardTitle>Cluster Security Governance</CardTitle>
            <CardDescription>
              Autonomous policy enforcement engine for multi-tenant Kubernetes clusters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive" dismissible>
              <AlertTitle>Strict Isolation Violation Detected</AlertTitle>
              <AlertDescription>
                Pod `ingress-gateway-77` attempted to bind non-whitelisted port 8443 on internal bridge adapter `br-0`. Network traffic is isolated.
              </AlertDescription>
              <AlertAction>
                <Button size="sm" variant="destructive" className="h-7 text-xs">
                  Review Audit Log
                </Button>
              </AlertAction>
            </Alert>

            <div className="text-xs text-muted-foreground leading-normal">
              Rule evaluation cycle: 15 seconds. Active policies: 142. Nodes monitored: 28.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 5. INTERACTIVE ACTIONS & DISMISSAL */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Interactive Actions &amp; Dismissal
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Alerts support contextual call-to-action buttons and accessible dismissal controls with tactile micro-press feedback.
          </p>
        </div>

        <div className="max-w-3xl">
          {dismissedDemo ? (
            <div className="p-4 text-center rounded-xl border border-dashed border-border/80 bg-muted/20 text-xs text-muted-foreground">
              Alert was dismissed.{" "}
              <button
                type="button"
                onClick={() => setDismissedDemo(false)}
                className="underline font-medium text-foreground hover:opacity-80"
              >
                Click here to reset.
              </button>
            </div>
          ) : (
            <Alert
              variant="info"
              dismissible
              onDismiss={() => setDismissedDemo(true)}
            >
              <AlertTitle>Software Update Available (v2.4.0)</AlertTitle>
              <AlertDescription>
                Includes container query optimizations, enhanced touch target ergonomics, and reduced-transparency fallbacks.
              </AlertDescription>
              <AlertAction>
                <Button size="sm" variant="default" className="h-7.5 text-xs px-3">
                  Install Update
                </Button>
                <Button size="sm" variant="ghost" className="h-7.5 text-xs px-2.5">
                  Changelog
                </Button>
              </AlertAction>
            </Alert>
          )}
        </div>
      </section>
    </div>
  );
}
