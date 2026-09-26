"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
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
  type AlertDialogIntensity,
  type AlertDialogScrimBlur,
  type AlertDialogScrimTint,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Delete02Icon,
  Key01Icon,
  Alert02Icon,
  FileCodeIcon,
  CheckmarkCircle02Icon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";

type AlertDemoKind = "destructive" | "revoke" | "discard" | "long";

export function AlertDialogPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [intensity, setIntensity] = React.useState<AlertDialogIntensity>("balanced");
  const [size, setSize] = React.useState<AlertDialogSize>("default");
  const [scrimBlur, setScrimBlur] = React.useState<AlertDialogScrimBlur>("deep");
  const [scrimTint, setScrimTint] = React.useState<AlertDialogScrimTint>("deep");
  const [demoKind, setDemoKind] = React.useState<AlertDemoKind>("destructive");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [confirmedAction, setConfirmedAction] = React.useState<string | null>(null);

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("desktop");
    setIntensity("balanced");
    setSize("default");
    setScrimBlur("deep");
    setScrimTint("deep");
    setDemoKind("destructive");
    setIsOpen(false);
    setConfirmedAction(null);
  }, []);

  const generatedCode = React.useMemo(() => {
    const sizeProp = size !== "default" ? ` size="${size}"` : "";
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const blurProp = scrimBlur !== "deep" ? ` scrimBlur="${scrimBlur}"` : "";
    const tintProp = scrimTint !== "deep" ? ` scrimTint="${scrimTint}"` : "";

    if (demoKind === "revoke") {
      return `import * as React from "react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Key01Icon } from "@hugeicons/core-free-icons";

export function RevokeTokenAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Revoke API Token
      </AlertDialogTrigger>
      <AlertDialogContent${sizeProp}${intensityProp}${blurProp}${tintProp}>
        <AlertDialogHeader>
          <AlertDialogMedia className="text-amber-500 bg-amber-500/10 border-amber-500/20">
            <HaloIcon icon={Key01Icon} size={20} />
          </AlertDialogMedia>
          <AlertDialogTitle>Revoke Production Key?</AlertDialogTitle>
          <AlertDialogDescription>
            Active applications and CI/CD pipelines utilizing token <span className="font-mono font-medium text-foreground">halo_live_7x92</span> will immediately fail authentication.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Revoke Key
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;
    }

    if (demoKind === "discard") {
      return `import * as React from "react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Alert02Icon } from "@hugeicons/core-free-icons";

export function DiscardChangesAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="ghost" />}>
        Discard Edits
      </AlertDialogTrigger>
      <AlertDialogContent size="sm"${intensityProp}${blurProp}${tintProp}>
        <AlertDialogHeader>
          <AlertDialogMedia className="text-amber-500 bg-amber-500/10 border-amber-500/20">
            <HaloIcon icon={Alert02Icon} size={20} />
          </AlertDialogMedia>
          <AlertDialogTitle>Discard Unsaved Changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have 14 unsaved form modifications. Navigating away will lose all changes permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Continue Editing</AlertDialogCancel>
          <AlertDialogAction variant="default">
            Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;
    }

    if (demoKind === "long") {
      return `import * as React from "react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Delete02Icon } from "@hugeicons/core-free-icons";

export function DatabaseRollbackAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Rollback Production DB
      </AlertDialogTrigger>
      <AlertDialogContent size="lg"${intensityProp}${blurProp}${tintProp}>
        <AlertDialogHeader>
          <AlertDialogMedia className="text-destructive bg-destructive/10 border-destructive/20">
            <HaloIcon icon={Delete02Icon} size={20} />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-destructive">
            Revert Database to Snapshot 2026-09-24?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This operation irrevocably reverts schema tables and purges all live write queries processed in the last 48 hours.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive/90 leading-relaxed space-y-1">
          <p className="font-semibold">Consequential side effects:</p>
          <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
            <li>4,192 payment intents will require offline reconciliation</li>
            <li>All read replica synchronization will halt for approximately 12 minutes</li>
            <li>Active websocket connections will disconnect</li>
          </ul>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel Operation</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Confirm Full Rollback
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;
    }

    return `import * as React from "react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Delete02Icon } from "@hugeicons/core-free-icons";

export function DeleteClusterAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete Cluster
      </AlertDialogTrigger>
      <AlertDialogContent${sizeProp}${intensityProp}${blurProp}${tintProp}>
        <AlertDialogHeader>
          <AlertDialogMedia className="text-destructive bg-destructive/10 border-destructive/20">
            <HaloIcon icon={Delete02Icon} size={20} />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-destructive">
            Permanently Delete Cluster?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the <span className="font-semibold text-foreground">prod-analytics-db</span> cluster and purge all associated replica volumes.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete Cluster
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;
  }, [demoKind, size, intensity, scrimBlur, scrimTint]);

  const telemetry = [
    { label: "Semantic Role", value: "alertdialog" },
    { label: "Intensity", value: intensity },
    { label: "Scrim Blur", value: scrimBlur },
    { label: "Modal Focus", value: isOpen ? "Trapped" : "Standby" },
    { label: "WCAG 2.1", value: "AA Compliant", variant: "success" as const },
  ];

  const controls = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full">
      <StageControlSelect
        label="Scenario"
        value={demoKind}
        onValueChange={(v) => setDemoKind(v as AlertDemoKind)}
        options={[
          { label: "Permanent Deletion", value: "destructive" },
          { label: "Token Revocation", value: "revoke" },
          { label: "Discard Unsaved Work", value: "discard" },
          { label: "Detailed Consequence", value: "long" },
        ]}
      />
      <StageControlSelect
        label="Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as AlertDialogIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Specular Sheen)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Size"
        value={size}
        onValueChange={(v) => setSize(v as AlertDialogSize)}
        options={[
          { label: "Small (sm — 384px)", value: "sm" },
          { label: "Default (md — 448px)", value: "default" },
          { label: "Large (lg — 512px)", value: "lg" },
        ]}
      />
      <StageControlSelect
        label="Scrim Blur"
        value={scrimBlur}
        onValueChange={(v) => setScrimBlur(v as AlertDialogScrimBlur)}
        options={[
          { label: "Deep (16px — Recommended)", value: "deep" },
          { label: "Balanced (8px)", value: "balanced" },
          { label: "Subtle (4px)", value: "subtle" },
          { label: "None (0px)", value: "none" },
        ]}
      />
      <StageControlSelect
        label="Scrim Tint"
        value={scrimTint}
        onValueChange={(v) => setScrimTint(v as AlertDialogScrimTint)}
        options={[
          { label: "Deep Occlusion", value: "deep" },
          { label: "Neutral Graphite", value: "neutral" },
          { label: "Soft Wash", value: "soft" },
          { label: "Vibrant Saturation", value: "vibrant" },
        ]}
      />
      <StageControlSelect
        label="Backdrop"
        value={backdrop}
        onValueChange={setBackdrop}
        options={[
          { label: "Neutral Studio", value: "neutral" },
          { label: "Chromatic Mesh", value: "mesh" },
          { label: "Sunset Horizon", value: "sunset" },
          { label: "Spectral Glow", value: "spectral" },
          { label: "Dense Grid", value: "dense" },
          { label: "Dark Void", value: "dark-void" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      title="Alert Dialog Live Preview Stage"
      description="High-consequence modal confirmation surface demonstrating neutral liquid glass optics, deep scrim isolation, and explicit consequence actions."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      controls={controls}
      telemetry={telemetry}
      code={generatedCode}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center justify-center min-h-[360px] p-6 text-center">
        <div className="max-w-md space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-xs">
            <HaloIcon
              icon={
                demoKind === "destructive" || demoKind === "long"
                  ? Delete02Icon
                  : demoKind === "revoke"
                  ? Key01Icon
                  : Alert02Icon
              }
              size={24}
              className={
                demoKind === "destructive" || demoKind === "long"
                  ? "text-destructive"
                  : "text-amber-500"
              }
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {demoKind === "destructive"
                ? "Irreversible Cluster Deletion"
                : demoKind === "revoke"
                ? "API Credential Invalidation"
                : demoKind === "discard"
                ? "Discard Unsaved Modifications"
                : "Multi-Service Impact Verification"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Alert Dialog isolates critical decisions with deep optical scrim diffusion. Consequence is communicated through explicit typography and actions—never giant glowing red glass.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger
                render={
                  <Button
                    variant={
                      demoKind === "destructive" || demoKind === "long"
                        ? "destructive"
                        : "outline"
                    }
                    className="shadow-sm"
                  />
                }
              >
                <HaloIcon
                  icon={
                    demoKind === "destructive" || demoKind === "long"
                      ? Delete02Icon
                      : demoKind === "revoke"
                      ? Key01Icon
                      : Alert02Icon
                  }
                  size={16}
                />
                <span>
                  {demoKind === "destructive"
                    ? "Delete Production Cluster"
                    : demoKind === "revoke"
                    ? "Revoke Token"
                    : demoKind === "discard"
                    ? "Discard Changes"
                    : "Review Rollback"}
                </span>
              </AlertDialogTrigger>

              <AlertDialogContent
                size={size}
                intensity={intensity}
                scrimBlur={scrimBlur}
                scrimTint={scrimTint}
              >
                {demoKind === "revoke" ? (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogMedia className="text-amber-500 bg-amber-500/10 border-amber-500/20">
                        <HaloIcon icon={Key01Icon} size={20} />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Revoke Production Key?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Active applications and background CI/CD pipelines utilizing token <span className="font-mono font-medium text-foreground">halo_live_7x92</span> will immediately fail authentication with HTTP 401.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => {
                          setConfirmedAction("Production token 'halo_live_7x92' revoked.");
                          setIsOpen(false);
                        }}
                      >
                        Revoke Access Key
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </>
                ) : demoKind === "discard" ? (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogMedia className="text-amber-500 bg-amber-500/10 border-amber-500/20">
                        <HaloIcon icon={Alert02Icon} size={20} />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Discard Unsaved Changes?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You have 14 unsaved form modifications in this session. Navigating away will lose all unsaved inputs permanently.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                      <AlertDialogAction
                        variant="default"
                        onClick={() => {
                          setConfirmedAction("Unsaved changes discarded.");
                          setIsOpen(false);
                        }}
                      >
                        Discard Changes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </>
                ) : demoKind === "long" ? (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogMedia className="text-destructive bg-destructive/10 border-destructive/20">
                        <HaloIcon icon={Delete02Icon} size={20} />
                      </AlertDialogMedia>
                      <AlertDialogTitle className="text-destructive">
                        Revert Database to Snapshot 2026-09-24?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This operation irrevocably rolls back schema changes and purges all live write queries processed during the last 48 hours.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-left text-xs leading-relaxed space-y-1 text-destructive/90">
                      <p className="font-semibold text-destructive">Downstream consequences:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                        <li>4,192 payment transactions require offline reconciliation</li>
                        <li>Read replica synchronization pauses for ~12 minutes</li>
                        <li>Active websocket subscriptions will terminate immediately</li>
                      </ul>
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel Operation</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => {
                          setConfirmedAction("Snapshot rollback initiated.");
                          setIsOpen(false);
                        }}
                      >
                        Confirm Full Rollback
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </>
                ) : (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogMedia className="text-destructive bg-destructive/10 border-destructive/20">
                        <HaloIcon icon={Delete02Icon} size={20} />
                      </AlertDialogMedia>
                      <AlertDialogTitle className="text-destructive">
                        Permanently Delete Cluster?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the <span className="font-semibold text-foreground">prod-analytics-db</span> cluster and purge all associated replica volumes.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => {
                          setConfirmedAction("Cluster 'prod-analytics-db' deleted.");
                          setIsOpen(false);
                        }}
                      >
                        Delete Cluster
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </>
                )}
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {confirmedAction && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <HaloIcon icon={CheckmarkCircle02Icon} size={14} />
              <span>{confirmedAction}</span>
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
