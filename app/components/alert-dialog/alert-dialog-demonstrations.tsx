"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  type AlertDialogSize,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Delete02Icon,
  Key01Icon,
  Alert02Icon,
  ShieldAlertIcon,
  FileCodeIcon,
  Maximize02Icon,
  Layers01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

export function AlertDialogDemonstrations() {
  const [statusLog, setStatusLog] = React.useState<string | null>(null);

  return (
    <div className="space-y-12">
      {/* 1. Permanent Deletion Confirmation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">1. Permanent Resource Deletion</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Alert Dialog requires explicit, unambiguous confirmation before permanently destroying customer infrastructure or data.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-destructive">PostgreSQL Production Cluster</h4>
            <p className="text-xs text-muted-foreground">Contains 14 databases, 2 read replicas, and 1.8 TB of storage volumes.</p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              <HaloIcon icon={Delete02Icon} size={15} />
              <span>Delete Production DB</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="default" intensity="balanced">
              <AlertDialogHeader>
                <AlertDialogMedia className="text-destructive bg-destructive/10 border-destructive/20">
                  <HaloIcon icon={Delete02Icon} size={20} />
                </AlertDialogMedia>
                <AlertDialogTitle className="text-destructive">
                  Permanently Delete PostgreSQL Cluster?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action is irreversible. All table data, backups, and point-in-time recovery points will be destroyed immediately.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-xs leading-relaxed text-destructive/90 space-y-1">
                <span className="font-semibold">Target resource:</span> <code className="font-mono text-[11px]">pg-prod-us-east-1.aws.internal</code>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => setStatusLog("Cluster 'pg-prod-us-east-1' deletion initiated.")}
                >
                  Permanently Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* 2. Credential & Access Revocation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">2. High-Impact Credential Revocation</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Revoking production API tokens immediately interrupts automated systems. Consequence wording is specific and contextual.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Production Master Secret Key</h4>
            <p className="text-xs text-muted-foreground">Used by 8 Kubernetes pods and GitHub Actions automated deployments.</p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              <HaloIcon icon={Key01Icon} size={15} />
              <span>Revoke Secret Key</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="default" intensity="balanced">
              <AlertDialogHeader>
                <AlertDialogMedia className="text-amber-500 bg-amber-500/10 border-amber-500/20">
                  <HaloIcon icon={Key01Icon} size={20} />
                </AlertDialogMedia>
                <AlertDialogTitle>Revoke Master Secret Key?</AlertDialogTitle>
                <AlertDialogDescription>
                  Any automated runner or deployment pipeline authenticating with <span className="font-mono font-medium text-foreground">sk_live_9941a</span> will immediately fail with HTTP 401 Unauthorized.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Keep Key</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => setStatusLog("Secret key 'sk_live_9941a' revoked.")}
                >
                  Revoke Secret Key
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* 3. Discard Unsaved Modifications */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">3. Discard Unsaved Session Edits</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Protects users from accidental navigation away from an active document or configuration wizard with unsaved changes.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Unsaved Form State</h4>
            <p className="text-xs text-muted-foreground">18 field changes pending commit in the routing configuration.</p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="ghost" />}>
              <HaloIcon icon={Alert02Icon} size={15} />
              <span>Leave Page</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm" intensity="balanced">
              <AlertDialogHeader>
                <AlertDialogMedia className="text-amber-500 bg-amber-500/10 border-amber-500/20">
                  <HaloIcon icon={Alert02Icon} size={20} />
                </AlertDialogMedia>
                <AlertDialogTitle>Discard Unsaved Changes?</AlertDialogTitle>
                <AlertDialogDescription>
                  You have pending routing rule modifications. If you exit now, all changes in this session will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                <AlertDialogAction
                  variant="default"
                  onClick={() => setStatusLog("Session modifications discarded.")}
                >
                  Discard Changes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* 4. Multi-Consequence Impact Verification */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">4. Structured Downstream Consequence Explainer</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When an operation cascades across multiple systems, structured consequence lists ensure operators understand the blast radius.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Org-Wide Deprecation Warning</h4>
            <p className="text-xs text-muted-foreground">Decommissioning v1 REST API gateway across 4,200 downstream enterprise tenants.</p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              <HaloIcon icon={ShieldAlertIcon} size={15} />
              <span>Decommission Gateway</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="lg" intensity="balanced" scrimBlur="deep">
              <AlertDialogHeader>
                <AlertDialogMedia className="text-destructive bg-destructive/10 border-destructive/20">
                  <HaloIcon icon={ShieldAlertIcon} size={20} />
                </AlertDialogMedia>
                <AlertDialogTitle className="text-destructive">
                  Decommission API Gateway v1.4?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Permanently shut down legacy edge routing. All incoming traffic on endpoint <code className="font-mono text-[11px]">/api/v1/*</code> will receive 410 Gone responses.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-xs text-destructive/90 leading-relaxed space-y-2">
                <span className="font-semibold text-destructive">Cascading side effects:</span>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>24 enterprise tenants with active traffic will be immediately severed</li>
                  <li>Historical telemetry logging queues will drain and terminate</li>
                  <li>TLS certificates for <code className="font-mono text-[10px]">api-v1.acme.com</code> will be revoked</li>
                </ul>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Abort Decommission</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => setStatusLog("Gateway v1.4 decommission order submitted.")}
                >
                  Proceed with Decommission
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* 5. Size Matrix Showcase */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">5. Alert Dialog Size Variants</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Alert Dialog supports three bounded sizes to match consequence complexity: <code className="font-mono text-xs">sm</code>, <code className="font-mono text-xs">default</code>, and <code className="font-mono text-xs">lg</code>.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { size: "sm" as AlertDialogSize, label: "Small (384px)", desc: "Quick binary choices ('Discard?')" },
            { size: "default" as AlertDialogSize, label: "Default (448px)", desc: "Standard confirmations ('Delete Cluster?')" },
            { size: "lg" as AlertDialogSize, label: "Large (512px)", desc: "Multi-consequence blast radius explainers" },
          ].map((item) => (
            <div key={item.size} className="rounded-xl border border-border/80 bg-card/50 p-4 text-center space-y-2">
              <span className="font-mono text-xs font-bold uppercase text-foreground">{item.size}</span>
              <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" size="sm" className="w-full" />}>
                  Open {item.size}
                </AlertDialogTrigger>
                <AlertDialogContent size={item.size}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Size Tier: {item.size.toUpperCase()}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Rendered with <code className="font-mono text-xs">size="{item.size}"</code> with concentric liquid glass geometry.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="default">Acknowledge</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      </section>

      {statusLog && (
        <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs text-emerald-600 dark:text-emerald-400">
          <HaloIcon icon={CheckmarkCircle02Icon} size={15} />
          <span>{statusLog}</span>
        </div>
      )}
    </div>
  );
}
