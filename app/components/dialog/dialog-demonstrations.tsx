"use client";

import * as React from "react";
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
  type DialogScrimBlur,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  Shield02Icon,
  Delete02Icon,
  BookOpen01Icon,
  Maximize02Icon,
  Layers01Icon,
  Key01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

export function DialogDemonstrations() {
  const [selectedFolder, setSelectedFolder] = React.useState("production-assets");
  const [accessRole, setAccessRole] = React.useState("Editor");
  const [twoFactorConfirmed, setTwoFactorConfirmed] = React.useState(false);

  return (
    <div className="space-y-12">
      {/* 1. Standard Task Modal */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">1. Standard Task Modal</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The canonical modal pattern for discrete user tasks requiring immediate attention without leaving the current screen context.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Project Workspace Settings</h4>
            <p className="text-xs text-muted-foreground">Adjust slug, default deployment branch, and environment variables.</p>
          </div>

          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              <HaloIcon icon={Folder01Icon} size={15} />
              <span>Configure Workspace</span>
            </DialogTrigger>
            <DialogContent size="md" intensity="balanced">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                    <HaloIcon icon={Folder01Icon} size={16} />
                  </span>
                  <DialogTitle>Configure Workspace</DialogTitle>
                </div>
                <DialogDescription>
                  Update repository connections and active environment branches.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Repository Branch</label>
                  <input
                    type="text"
                    defaultValue="main"
                    className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Build Output Directory</label>
                  <input
                    type="text"
                    defaultValue=".next"
                    className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <DialogClose render={<Button variant="default" />}>Save Workspace</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* 2. Form Dialog with Contrast Isolation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">2. Form Dialog with Content Isolation</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Form controls inside HaloUI dialogs remain clean, solid, and high-contrast. Nested elements must not introduce compounding glass layers.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Invite Collaborator</h4>
            <p className="text-xs text-muted-foreground">Grant fine-grained RBAC permissions to engineering team members.</p>
          </div>

          <Dialog>
            <DialogTrigger render={<Button variant="default" />}>
              <HaloIcon icon={Shield02Icon} size={15} />
              <span>Invite Member</span>
            </DialogTrigger>
            <DialogContent size="md" intensity="balanced">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                    <HaloIcon icon={Shield02Icon} size={16} />
                  </span>
                  <DialogTitle>Invite Team Member</DialogTitle>
                </div>
                <DialogDescription>
                  Send an email invitation with tailored cryptographic access rights.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3.5 py-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Email Address</label>
                  <input
                    type="email"
                    placeholder="teammate@company.com"
                    className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Access Role</label>
                  <select
                    value={accessRole}
                    onChange={(e) => setAccessRole(e.target.value)}
                    className="h-9 w-full rounded-xl border border-border/80 bg-background/80 px-3 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Viewer">Viewer (Read-Only Telemetry)</option>
                    <option value="Editor">Editor (Deploy & Manage Services)</option>
                    <option value="Admin">Administrator (Full Cluster Ownership)</option>
                  </select>
                </div>
              </div>

              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <DialogClose render={<Button variant="default" />}>Send Invitation</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* 3. Destructive Action Confirmation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">3. High-Consequence Confirmation Dialog</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For critical actions requiring explicit human confirmation. The close button and backdrop dismissal provide safe exits.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-destructive">Delete Database Cluster</h4>
            <p className="text-xs text-muted-foreground">Irrevocably drop all PostgreSQL tables and read replicas.</p>
          </div>

          <Dialog>
            <DialogTrigger render={<Button variant="destructive" />}>
              <HaloIcon icon={Delete02Icon} size={15} />
              <span>Delete Cluster</span>
            </DialogTrigger>
            <DialogContent size="sm" intensity="balanced">
              <DialogHeader>
                <div className="flex items-center gap-2 text-destructive">
                  <HaloIcon icon={Delete02Icon} size={20} />
                  <DialogTitle className="text-destructive font-semibold">
                    Delete Production Cluster?
                  </DialogTitle>
                </div>
                <DialogDescription>
                  This action is permanent and cannot be reversed. All active transactions and backups will be purged immediately.
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive/90 leading-relaxed">
                Type <span className="font-mono font-bold">DELETE</span> to confirm termination of instance <span className="font-mono">db-prod-east-1</span>.
              </div>

              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <DialogClose render={<Button variant="destructive" />}>Permanently Delete</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* 4. Long Scrollable Document Dialog */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">4. Long Scrollable Document Dialog</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When content exceeds the viewport height, DialogContent bounds itself to <code className="font-mono text-xs">calc(100dvh - 2rem)</code> with internal vertical scrolling.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Privacy Policy & Security Architecture</h4>
            <p className="text-xs text-muted-foreground">Detailed legal disclosures and end-to-end encryption guarantees.</p>
          </div>

          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              <HaloIcon icon={BookOpen01Icon} size={15} />
              <span>Read Agreement</span>
            </DialogTrigger>
            <DialogContent size="lg" intensity="balanced">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/30">
                    <HaloIcon icon={BookOpen01Icon} size={16} />
                  </span>
                  <DialogTitle>HaloUI Data Residency & Privacy</DialogTitle>
                </div>
                <DialogDescription>
                  Updated September 2026. Please read our comprehensive compliance standards.
                </DialogDescription>
              </DialogHeader>

              <div className="max-h-64 overflow-y-auto space-y-4 pr-3 text-xs leading-relaxed text-muted-foreground border-y border-border/40 py-3">
                <section className="space-y-1">
                  <h5 className="font-semibold text-foreground">1. Zero Telemetry in Registry Primitives</h5>
                  <p>When you install HaloUI registry components via shadcn, the code runs 100% on your infrastructure. No external network requests or third-party tracking scripts are injected.</p>
                </section>
                <section className="space-y-1">
                  <h5 className="font-semibold text-foreground">2. Optical Material Performance Bounds</h5>
                  <p>Backdrop-filters and layered specular highlights are GPU-accelerated. In constrained environments, prefers-reduced-transparency automatically swaps to opaque fallbacks.</p>
                </section>
                <section className="space-y-1">
                  <h5 className="font-semibold text-foreground">3. Focus Trap and Accessibility Guarantees</h5>
                  <p>In accordance with WCAG 2.1 AA criteria, every modal dialog strictly traps keyboard tab order and restores focus to the trigger on dismissal.</p>
                </section>
                <section className="space-y-1">
                  <h5 className="font-semibold text-foreground">4. Source Ownership Rights</h5>
                  <p>You hold perpetual, unrestricted rights to modify, re-theme, or refactor all component code written to your repository.</p>
                </section>
              </div>

              <DialogFooter>
                <DialogClose render={<Button variant="default" />}>I Acknowledge</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* 5. Sizing Matrix Showcase */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">5. Sizing Matrix (sm to full)</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Standard size tokens provide consistent width bounds across diverse viewport sizes.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(["sm", "md", "lg", "xl", "full"] as DialogSize[]).map((sz) => (
            <div key={sz} className="rounded-xl border border-border/80 bg-card/50 p-4 text-center space-y-2">
              <span className="font-mono text-xs font-bold uppercase text-foreground">{sz}</span>
              <p className="text-[11px] text-muted-foreground">
                {sz === "sm" && "384px max"}
                {sz === "md" && "448px max (default)"}
                {sz === "lg" && "512px max"}
                {sz === "xl" && "576px max"}
                {sz === "full" && "768px max"}
              </p>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" className="w-full" />}>
                  Open {sz}
                </DialogTrigger>
                <DialogContent size={sz}>
                  <DialogHeader>
                    <DialogTitle>Dialog Size: {sz.toUpperCase()}</DialogTitle>
                    <DialogDescription>
                      This dialog is rendered with <code className="font-mono text-xs">size="{sz}"</code>.
                    </DialogDescription>
                  </DialogHeader>
                  <p className="text-xs text-muted-foreground py-2">
                    Size variants automatically maintain horizontal padding, concentric radii, and responsive shrinking on mobile screens.
                  </p>
                  <DialogFooter>
                    <DialogClose render={<Button variant="default" size="sm" />}>Close</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Scrim Blur Optical Calibration */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">6. Optical Scrim Calibration</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The overlay backdrop scrim can be calibrated from pure occlusion to deep diffusion depending on the context.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(["none", "subtle", "balanced", "deep"] as DialogScrimBlur[]).map((blurTier) => (
            <div key={blurTier} className="rounded-xl border border-border/80 bg-card/50 p-4 text-center space-y-2">
              <span className="font-mono text-xs font-semibold text-foreground capitalize">{blurTier} Blur</span>
              <p className="text-[11px] text-muted-foreground">
                {blurTier === "none" && "0px blur"}
                {blurTier === "subtle" && "4px blur"}
                {blurTier === "balanced" && "8px blur (default)"}
                {blurTier === "deep" && "16px blur"}
              </p>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" className="w-full" />}>
                  Test {blurTier}
                </DialogTrigger>
                <DialogContent scrimBlur={blurTier}>
                  <DialogHeader>
                    <DialogTitle>Scrim Calibration: {blurTier}</DialogTitle>
                    <DialogDescription>
                      Observe background content diffusion behind the scrim with <code className="font-mono text-xs">scrimBlur="{blurTier}"</code>.
                    </DialogDescription>
                  </DialogHeader>
                  <p className="text-xs text-muted-foreground py-2">
                    Balanced (8px) preserves environmental light cues while focusing visual attention directly onto the dialog surface.
                  </p>
                  <DialogFooter>
                    <DialogClose render={<Button variant="default" size="sm" />}>Close</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
