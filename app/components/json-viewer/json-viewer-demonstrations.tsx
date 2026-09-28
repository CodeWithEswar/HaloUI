"use client";

import * as React from "react";
import { JsonViewer } from "@/components/ui/json-viewer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function JsonViewerDemonstrations() {
  return (
    <div className="space-y-10">
      {/* 1. Real-World API Response Inspection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              1. Real-World API Response Inspection
            </h3>
            <p className="text-xs text-muted-foreground">
              Interactive tree inspection with expandable objects, item count badges, and built-in clipboard copying.
            </p>
          </div>
          <Badge variant="outline">Interactive Inspection</Badge>
        </div>

        <JsonViewer
          title="GET /api/v1/workspaces/ws_01/telemetry"
          variant="glass"
          defaultExpandedDepth={2}
          data={{
            status: "success",
            httpCode: 200,
            elapsedTimeMs: 12.4,
            cached: true,
            cluster: "aws-eu-central-1",
            data: {
              activeServices: ["ingress-gateway", "auth-v2", "queue-worker"],
              memoryUtilizationPercent: 48.2,
              metrics: {
                totalRequests: 842091,
                errorCount: 0,
                activeReplicas: 16,
              },
            },
          }}
        />
      </div>

      {/* 2. Deeply Nested Infrastructure Tree */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              2. Deep Multi-Tier Nesting (6 Levels Deep)
            </h3>
            <p className="text-xs text-muted-foreground">
              Tokenized hairline guidelines (<code className="font-mono">pl-3.5 border-l</code>) preserve visual hierarchy without pushing content off the right margin.
            </p>
          </div>
          <Badge variant="outline">Deep Nesting Safe</Badge>
        </div>

        <JsonViewer
          title="datacenter-topology.json"
          variant="default"
          defaultExpandedDepth={4}
          data={{
            datacenter: "DC-Frankfurt-01",
            network: {
              fabric: "leaf-spine",
              spine: {
                spineId: "spine-switch-01",
                rack: {
                  rackNumber: 42,
                  enclosure: {
                    model: "BladeCenter-X8",
                    blade: {
                      slotId: 4,
                      ipAddress: "10.240.18.94",
                      mac: "00:1A:2B:3C:4D:5E",
                      status: "online",
                    },
                  },
                },
              },
            },
          }}
        />
      </div>

      {/* 3. Primitive Type System & Null Fidelity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              3. Primitive Types &amp; Null Value Integrity
            </h3>
            <p className="text-xs text-muted-foreground">
              Numbers, booleans, strings, and explicit <code className="font-mono">null</code> receive distinct semantic syntax coloring.
            </p>
          </div>
          <Badge variant="outline">Type Differentiation</Badge>
        </div>

        <JsonViewer
          title="types-reference.json"
          variant="glass"
          defaultExpandedDepth={2}
          data={{
            stringSample: "HaloUI Liquid Optical System",
            integerNumber: 42,
            floatingPointNumber: 3.14159,
            negativeNumber: -128,
            zeroValue: 0,
            booleanActive: true,
            booleanDisabled: false,
            explicitNullField: null,
            emptyArraySample: [],
            emptyObjectSample: {},
          }}
        />
      </div>

      {/* 4. Long Keys, URLs & Unbroken Hashes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              4. Long Keys, Endpoints &amp; Continuous Hashes
            </h3>
            <p className="text-xs text-muted-foreground">
              Values use <code className="font-mono">break-words min-w-0</code> so lengthy URLs and bearer tokens never blow out container bounds.
            </p>
          </div>
          <Badge variant="outline">Break-Words Safe</Badge>
        </div>

        <JsonViewer
          title="oauth-token-exchange.json"
          variant="default"
          defaultExpandedDepth={2}
          data={{
            issuerUrl: "https://auth.haloui.dev/oauth2/v2.0/token/realms/production-enterprise-cluster",
            tokenType: "Bearer",
            expiresInSeconds: 3600,
            refreshTokenSignature:
              "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQ1Njc4OTAifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0",
            scopes: ["openid", "profile", "email", "telemetry:write", "cluster:admin"],
          }}
        />
      </div>

      {/* 5. Nested Inside Card (Zero Glass-on-Glass Noise) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              5. Nested Inside Card (Flat Base &bull; Zero Glass-on-Glass)
            </h3>
            <p className="text-xs text-muted-foreground">
              When embedded within a Card or Dialog, JsonViewer uses <code className="font-mono">variant=&quot;plain&quot;</code> or <code className="font-mono">variant=&quot;default&quot;</code> to eliminate competing glass reflections.
            </p>
          </div>
          <Badge variant="outline">Optically Calm</Badge>
        </div>

        <Card size="default" intensity="subtle">
          <CardHeader>
            <CardTitle>Deployment Configuration Manifest</CardTitle>
          </CardHeader>
          <CardContent>
            <JsonViewer
              title="deployment-manifest.json"
              variant="plain"
              defaultExpandedDepth={2}
              data={{
                apiVersion: "apps/v1",
                kind: "Deployment",
                metadata: {
                  name: "haloui-edge-gateway",
                  labels: { app: "edge-gateway", tier: "ingress" },
                },
                spec: {
                  replicas: 4,
                  strategy: { type: "RollingUpdate" },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* 6. Strict 240px & 280px Narrow Container Test */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              6. Strict 240px and 280px Narrow Container Reflow
            </h3>
            <p className="text-xs text-muted-foreground">
              Tested inside narrow sidebars and split-panes. Horizontal overflow is contained internally with zero document-level horizontal scrolling.
            </p>
          </div>
          <Badge variant="outline">240px Minimum QA</Badge>
        </div>

        <div className="flex flex-wrap gap-4 items-start">
          {/* 240px strict */}
          <div className="w-[240px] shrink-0 rounded-xl border border-destructive/30 bg-card p-2 space-y-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block border-b border-border/40 pb-1">
              Width: 240px (Strict Min)
            </span>
            <JsonViewer
              title="payload.json"
              variant="plain"
              size="sm"
              defaultExpandedDepth={2}
              showToolbar={false}
              data={{
                id: "tx_904",
                amount: 1420.5,
                currency: "USD",
                verified: true,
                meta: {
                  tags: ["urgent", "api"],
                },
              }}
            />
          </div>

          {/* 280px rail */}
          <div className="w-[280px] shrink-0 rounded-xl border border-primary/30 bg-card p-2.5 space-y-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block border-b border-border/40 pb-1">
              Width: 280px (Compact Rail)
            </span>
            <JsonViewer
              title="auth.json"
              variant="plain"
              size="sm"
              defaultExpandedDepth={2}
              data={{
                user: "eswar",
                role: "admin",
                permissions: ["read", "write"],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
