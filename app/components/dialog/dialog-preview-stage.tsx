"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  type DialogSize,
  type DialogIntensity,
  type DialogScrimBlur,
  type DialogScrimTint,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  UserEdit01Icon,
  CloudUploadIcon,
  Alert02Icon,
  FileCodeIcon,
  Settings02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";

type DemoKind = "task" | "form" | "destructive" | "scroll";

export function DialogPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [intensity, setIntensity] = React.useState<DialogIntensity>("balanced");
  const [size, setSize] = React.useState<DialogSize>("md");
  const [scrimBlur, setScrimBlur] = React.useState<DialogScrimBlur>("balanced");
  const [scrimTint, setScrimTint] = React.useState<DialogScrimTint>("neutral");
  const [demoKind, setDemoKind] = React.useState<DemoKind>("task");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [submittedStatus, setSubmittedStatus] = React.useState<string | null>(null);

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("desktop");
    setIntensity("balanced");
    setSize("md");
    setScrimBlur("balanced");
    setScrimTint("neutral");
    setDemoKind("task");
    setIsOpen(false);
    setSubmittedStatus(null);
  }, []);

  const generatedCode = React.useMemo(() => {
    const sizeProp = size !== "md" ? ` size="${size}"` : "";
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const blurProp = scrimBlur !== "balanced" ? ` scrimBlur="${scrimBlur}"` : "";
    const tintProp = scrimTint !== "neutral" ? ` scrimTint="${scrimTint}"` : "";

    if (demoKind === "form") {
      return `import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { CloudUploadIcon } from "@hugeicons/core-free-icons";

export function CreateServiceDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="default" />}>
        Deploy Service
      </DialogTrigger>
      <DialogContent${sizeProp}${intensityProp}${blurProp}${tintProp}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
              <HaloIcon icon={CloudUploadIcon} size={16} />
            </span>
            <DialogTitle>Deploy New Microservice</DialogTitle>
          </div>
          <DialogDescription>
            Configure compute specifications and routing parameters for your workload.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Service Name</label>
            <input
              type="text"
              defaultValue="auth-gateway-edge"
              className="h-9 w-full rounded-lg border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Subnet Target</label>
            <input
              type="text"
              defaultValue="vpc-09b431a (us-east-1a)"
              className="h-9 w-full rounded-lg border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="default">Deploy Cluster</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;
    }

    if (demoKind === "destructive") {
      return `import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Alert02Icon } from "@hugeicons/core-free-icons";

export function TerminateClusterDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        Terminate Instance
      </DialogTrigger>
      <DialogContent size="sm"${intensityProp}${blurProp}${tintProp}>
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <HaloIcon icon={Alert02Icon} size={18} />
            <DialogTitle className="text-destructive">Revoke API Key</DialogTitle>
          </div>
          <DialogDescription>
            This action immediately terminates all active webhooks and bearer authentications. This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="destructive">Revoke Access</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;
    }

    if (demoKind === "scroll") {
      return `import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TermsDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        View Terms of Service
      </DialogTrigger>
      <DialogContent size="lg"${intensityProp}${blurProp}${tintProp}>
        <DialogHeader>
          <DialogTitle>Enterprise Service Level Agreement</DialogTitle>
          <DialogDescription>
            Review uptime guarantees, redundancy architecture, and data residency commitments.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-64 overflow-y-auto space-y-3 pr-2 text-xs leading-relaxed text-muted-foreground">
          <p>Section 1: Data Encryption and Transmission Protocol...</p>
          <p>Section 2: Optical Substrate Verification and Registry Specifications...</p>
          <p>Section 3: Uptime Guarantees and Incident Escalation Framework...</p>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="default" />}>Acknowledge & Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;
    }

    return `import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { UserEdit01Icon } from "@hugeicons/core-free-icons";

export function EditProfileModal() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="default" />}>
        Edit Profile
      </DialogTrigger>
      <DialogContent${sizeProp}${intensityProp}${blurProp}${tintProp}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
              <HaloIcon icon={UserEdit01Icon} size={16} />
            </span>
            <DialogTitle>Update Profile Details</DialogTitle>
          </div>
          <DialogDescription>
            Modify your display name, primary email address, and notification preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Full Name</label>
            <input
              type="text"
              defaultValue="Sophia Lin"
              className="h-9 w-full rounded-lg border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Work Email</label>
            <input
              type="email"
              defaultValue="sophia.lin@acme.dev"
              className="h-9 w-full rounded-lg border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="default">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;
  }, [demoKind, size, intensity, scrimBlur, scrimTint]);

  const telemetry = [
    { label: "Intensity", value: intensity },
    { label: "Size Tier", value: size },
    { label: "Scrim Blur", value: scrimBlur },
    { label: "Focus Trap", value: isOpen ? "Active (Trapped)" : "Standby" },
    { label: "WCAG 2.1", value: "AA Compliant", variant: "success" as const },
  ];

  const controls = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full">
      <StageControlSelect
        label="Demo Type"
        value={demoKind}
        onValueChange={(v) => setDemoKind(v as DemoKind)}
        options={[
          { label: "Task Modal", value: "task" },
          { label: "Form Dialog", value: "form" },
          { label: "Destructive Action", value: "destructive" },
          { label: "Scrollable Content", value: "scroll" },
        ]}
      />
      <StageControlSelect
        label="Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as DialogIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Specular Glow)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Size"
        value={size}
        onValueChange={(v) => setSize(v as DialogSize)}
        options={[
          { label: "Small (sm — 384px)", value: "sm" },
          { label: "Medium (md — 448px)", value: "md" },
          { label: "Large (lg — 512px)", value: "lg" },
          { label: "X-Large (xl — 576px)", value: "xl" },
          { label: "Full Container", value: "full" },
        ]}
      />
      <StageControlSelect
        label="Scrim Blur"
        value={scrimBlur}
        onValueChange={(v) => setScrimBlur(v as DialogScrimBlur)}
        options={[
          { label: "None (0px)", value: "none" },
          { label: "Subtle (4px)", value: "subtle" },
          { label: "Balanced (8px)", value: "balanced" },
          { label: "Deep (16px)", value: "deep" },
        ]}
      />
      <StageControlSelect
        label="Scrim Tint"
        value={scrimTint}
        onValueChange={(v) => setScrimTint(v as DialogScrimTint)}
        options={[
          { label: "Neutral Graphite", value: "neutral" },
          { label: "Soft Wash", value: "soft" },
          { label: "Deep Ambient", value: "deep" },
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
      title="Dialog Live Preview Stage"
      description="Interactive modal task surface demonstrating authentic Apple Liquid Glass physical optics, scrim calibration, and focus trapping."
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
                demoKind === "form"
                  ? CloudUploadIcon
                  : demoKind === "destructive"
                  ? Alert02Icon
                  : demoKind === "scroll"
                  ? FileCodeIcon
                  : UserEdit01Icon
              }
              size={24}
              className="text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {demoKind === "form"
                ? "Microservice Deployment"
                : demoKind === "destructive"
                ? "High-Impact Action Verification"
                : demoKind === "scroll"
                ? "Long Scrollable Document"
                : "User Profile Configuration"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Open the modal overlay to experience the 135° directional specular reflection, inner meniscus edge, and calibrated scrim diffusion.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger
                render={
                  <Button
                    variant={demoKind === "destructive" ? "destructive" : "default"}
                    className="shadow-sm"
                  />
                }
              >
                <HaloIcon
                  icon={
                    demoKind === "form"
                      ? CloudUploadIcon
                      : demoKind === "destructive"
                      ? Alert02Icon
                      : demoKind === "scroll"
                      ? FileCodeIcon
                      : UserEdit01Icon
                  }
                  size={16}
                />
                <span>
                  {demoKind === "form"
                    ? "Configure Deployment"
                    : demoKind === "destructive"
                    ? "Revoke Token"
                    : demoKind === "scroll"
                    ? "Read Enterprise SLA"
                    : "Edit Profile"}
                </span>
              </DialogTrigger>

              <DialogContent
                size={size}
                intensity={intensity}
                scrimBlur={scrimBlur}
                scrimTint={scrimTint}
              >
                {demoKind === "form" ? (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                          <HaloIcon icon={CloudUploadIcon} size={16} />
                        </span>
                        <DialogTitle>Deploy New Microservice</DialogTitle>
                      </div>
                      <DialogDescription>
                        Configure compute specifications and ingress routing parameters for your isolated workload.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3.5 py-2">
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-semibold text-foreground">
                          Service Identifier
                        </label>
                        <input
                          type="text"
                          defaultValue="auth-gateway-edge"
                          className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground">
                            CPU Cores
                          </label>
                          <select className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                            <option>2 vCPU (Standard)</option>
                            <option>4 vCPU (High Compute)</option>
                            <option>8 vCPU (Dedicated)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground">
                            Memory Limit
                          </label>
                          <select className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                            <option>4 GB Memory</option>
                            <option>8 GB Memory</option>
                            <option>16 GB Memory</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>
                        Cancel
                      </DialogClose>
                      <Button
                        variant="default"
                        onClick={() => {
                          setSubmittedStatus("Service 'auth-gateway-edge' deployed successfully.");
                          setIsOpen(false);
                        }}
                      >
                        Launch Deployment
                      </Button>
                    </DialogFooter>
                  </>
                ) : demoKind === "destructive" ? (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-2 text-destructive">
                        <HaloIcon icon={Alert02Icon} size={20} />
                        <DialogTitle className="text-destructive font-semibold">
                          Revoke Production Key
                        </DialogTitle>
                      </div>
                      <DialogDescription>
                        Revoking <span className="font-mono text-xs font-semibold text-foreground">live_pk_8892f</span> will terminate all continuous deployment integrations across 14 clusters.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-left text-xs leading-relaxed text-destructive/90">
                      Warning: Active API callers will receive immediate 401 Unauthorized responses.
                    </div>

                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>
                        Cancel
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setSubmittedStatus("API Key revoked.");
                          setIsOpen(false);
                        }}
                      >
                        Revoke Access Token
                      </Button>
                    </DialogFooter>
                  </>
                ) : demoKind === "scroll" ? (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                          <HaloIcon icon={FileCodeIcon} size={16} />
                        </span>
                        <DialogTitle>Enterprise SLA Agreement</DialogTitle>
                      </div>
                      <DialogDescription>
                        Review operational availability tiers, latency bounds, and compliance architecture.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="max-h-56 overflow-y-auto space-y-3.5 pr-2 text-left text-xs leading-relaxed text-muted-foreground divide-y divide-border/30">
                      <div className="pt-1">
                        <h5 className="font-semibold text-foreground mb-1">1. Optical Diffusion Guarantee</h5>
                        <p>HaloUI commits to uninterrupted 60fps compositor-driven liquid glass rendering across all compliant WebKit, Blink, and Gecko engines without CPU degradation.</p>
                      </div>
                      <div className="pt-3">
                        <h5 className="font-semibold text-foreground mb-1">2. Data Isolation & Focus Containment</h5>
                        <p>All modal interactions enforce strict WCAG 2.1 AA focus containment. Outside focus listeners are intercepted at the root portal barrier and redirected inward.</p>
                      </div>
                      <div className="pt-3">
                        <h5 className="font-semibold text-foreground mb-1">3. Incident Response Protocol</h5>
                        <p>Priority 1 outages receive automated failover within 180 seconds. Audit logs are preserved with cryptographic hashing across dual availability zones.</p>
                      </div>
                      <div className="pt-3">
                        <h5 className="font-semibold text-foreground mb-1">4. Deprecation Guarantees</h5>
                        <p>Source ownership ensures consumer repositories operate independently. Breaking upstream changes will never force downstream refactoring.</p>
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose render={<Button variant="default" />}>
                        Acknowledge & Close
                      </DialogClose>
                    </DialogFooter>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                          <HaloIcon icon={UserEdit01Icon} size={16} />
                        </span>
                        <DialogTitle>Edit User Profile</DialogTitle>
                      </div>
                      <DialogDescription>
                        Update your professional bio, public alias, and notification channels.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3.5 py-2 text-left">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Display Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Sophia Lin"
                          className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Primary Email
                        </label>
                        <input
                          type="email"
                          defaultValue="sophia.lin@acme.dev"
                          className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>
                        Cancel
                      </DialogClose>
                      <Button
                        variant="default"
                        onClick={() => {
                          setSubmittedStatus("Profile updated for Sophia Lin.");
                          setIsOpen(false);
                        }}
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {submittedStatus && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <HaloIcon icon={CheckmarkCircle02Icon} size={14} />
              <span>{submittedStatus}</span>
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
