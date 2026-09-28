"use client";

import * as React from "react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Spinner } from "@/components/ui/spinner";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LoadingOverlayDemonstrations() {
  const [cardLoading, setCardLoading] = React.useState(true);
  const [progressVal, setProgressVal] = React.useState(68);

  return (
    <div className="space-y-16">
      {/* 1. Scoped Card Loading */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">1. Scoped Container Wrapping</h3>
          <p className="text-sm text-muted-foreground">
            Wrapping component around children establishes an automatic isolated relative container and sets keyboard <code className="font-mono text-xs">inert</code>.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCardLoading(!cardLoading)}
            >
              Toggle Loading State ({cardLoading ? "Active" : "Idle"})
            </Button>
          </div>

          <LoadingOverlay
            visible={cardLoading}
            message="Provisioning virtual cluster..."
            intensity="balanced"
            className="max-w-md rounded-2xl border border-border/60 bg-background/50 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">Kubernetes Node 04</h4>
                <Badge variant="outline">us-west-2</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Handles real-time streaming ingestion and WebSocket subscriber channels.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button size="sm" variant="outline">Logs</Button>
                <Button size="sm">Restart Pod</Button>
              </div>
            </div>
          </LoadingOverlay>
        </div>
      </section>

      {/* 2. Custom Loader Composition */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">2. Custom Indicator &amp; Progress Composition</h3>
          <p className="text-sm text-muted-foreground">
            Compose deterministic progress indicators like <code className="font-mono text-xs">CircularProgress</code> or custom themed spinners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Circular Progress Composition */}
          <LoadingOverlay
            visible={true}
            spinner={<CircularProgress value={progressVal} size="md" variant="default" />}
            message={`Uploading bundle (${progressVal}%)...`}
            className="rounded-2xl border border-border/60 bg-background/50 p-6 h-48 flex items-center justify-center"
          >
            <div className="space-y-2 text-center opacity-40">
              <h5 className="font-medium text-sm">Release Asset: v2.4.1.tar.gz</h5>
              <p className="text-xs text-muted-foreground">SHA256: 7f8a9e...bc24</p>
            </div>
          </LoadingOverlay>

          {/* Warning Spinner */}
          <LoadingOverlay
            visible={true}
            spinner={<Spinner size="md" variant="warning" />}
            message="Reconnecting socket stream..."
            intensity="subtle"
            className="rounded-2xl border border-border/60 bg-background/50 p-6 h-48 flex items-center justify-center"
          >
            <div className="space-y-2 text-center opacity-40">
              <h5 className="font-medium text-sm">Live Edge Broker</h5>
              <p className="text-xs text-muted-foreground">Heartbeat timeout detected</p>
            </div>
          </LoadingOverlay>
        </div>
      </section>

      {/* 3. Automatic 240px Container Reflow */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">3. Automatic 240px Container Reflow</h3>
          <p className="text-sm text-muted-foreground">
            Pure container query reflow ensures loading cards, messages, and spinners wrap cleanly down to 240px micro-panels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-[240px]">
            <div className="text-[11px] font-mono text-muted-foreground mb-1.5">Container: 240px</div>
            <LoadingOverlay
              visible={true}
              message="Processing transaction..."
              className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 h-40"
            >
              <div className="space-y-1 text-xs opacity-30">
                <p className="font-semibold">Mini Panel</p>
                <p>Telemetry sync</p>
              </div>
            </LoadingOverlay>
          </div>

          <div className="w-[280px]">
            <div className="text-[11px] font-mono text-muted-foreground mb-1.5">Container: 280px</div>
            <LoadingOverlay
              visible={true}
              message="Syncing encrypted credentials..."
              className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 h-40"
            >
              <div className="space-y-1 text-xs opacity-30">
                <p className="font-semibold">Compact Sidebar Card</p>
                <p>Security vault handshake</p>
              </div>
            </LoadingOverlay>
          </div>

          <div className="w-[320px]">
            <div className="text-[11px] font-mono text-muted-foreground mb-1.5">Container: 320px</div>
            <LoadingOverlay
              visible={true}
              message="Applying firewall access rules..."
              className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 h-40"
            >
              <div className="space-y-1 text-xs opacity-30">
                <p className="font-semibold">Mobile Card</p>
                <p>Gateway policy sync</p>
              </div>
            </LoadingOverlay>
          </div>
        </div>
      </section>

      {/* 4. Standalone Mode (Direct Positioning) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">4. Standalone Mode (Existing Relative Container)</h3>
          <p className="text-sm text-muted-foreground">
            Place <code className="font-mono text-xs">&lt;LoadingOverlay /&gt;</code> directly inside any existing <code className="font-mono text-xs">relative</code> parent without wrapping children.
          </p>
        </div>

        <Card className="max-w-md relative overflow-hidden">
          <CardHeader>
            <CardTitle>Continuous Integration Pipeline</CardTitle>
            <CardDescription>Automated test matrix across 6 browser targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Running: Jest unit suite (48/48 passed)</p>
            <p>Running: Playwright E2E browser matrix</p>
          </CardContent>

          {/* Standalone overlay inserted inside Card */}
          <LoadingOverlay
            visible={true}
            message="Executing browser tests..."
            intensity="balanced"
          />
        </Card>
      </section>
    </div>
  );
}
