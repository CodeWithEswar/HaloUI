import { Metadata } from "next";
import { AlertDialogPreviewStage } from "./alert-dialog-preview-stage";
import { AlertDialogDemonstrations } from "./alert-dialog-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";
import { KeyboardTable } from "@/components/mdx/keyboard-table";
import { ProcessSteps } from "@/components/mdx/process-steps";
import { SourceOwnershipComparison } from "@/components/mdx/docs-visuals";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alert Dialog — Overlays & Menus — HaloUI",
  description:
    "A high-consequence modal confirmation surface engineered with HaloUI liquid glass physical optics, deep optical scrim isolation, and explicit consequence verification.",
};

const ALERT_DIALOG_CONTENT_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'sm' | 'default' | 'md' | 'lg'",
    default: "'default'",
    required: false,
    description: "Maximum width bounding tier (sm: 384px, default/md: 448px, lg: 512px).",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "HaloUI liquid glass material intensity level governing specular catch and reflection depth.",
  },
  {
    name: "scrimBlur",
    type: "'none' | 'subtle' | 'balanced' | 'deep'",
    default: "'deep'",
    required: false,
    description: "Optical background diffusion tier applied to the backdrop scrim. Alerts default to 'deep' for maximum consequence isolation.",
  },
  {
    name: "scrimTint",
    type: "'neutral' | 'soft' | 'deep' | 'vibrant'",
    default: "'deep'",
    required: false,
    description: "Environmental ambient darkness wash. Alerts default to 'deep' for strong visual occlusion.",
  },
];

const ALERT_DIALOG_OVERLAY_PROPS: PropRow[] = [
  {
    name: "blur",
    type: "'none' | 'subtle' | 'balanced' | 'deep'",
    default: "'deep'",
    required: false,
    description: "Backdrop blur diffusion level for the standalone AlertDialogOverlay component.",
  },
  {
    name: "tint",
    type: "'neutral' | 'soft' | 'deep' | 'vibrant'",
    default: "'deep'",
    required: false,
    description: "Environmental darkness tint level for the standalone AlertDialogOverlay component.",
  },
];

const ALERT_DIALOG_ACTION_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'",
    default: "'destructive'",
    required: false,
    description: "Tactile button styling. Defaults to 'destructive' for high-impact actions.",
  },
  {
    name: "size",
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    required: false,
    description: "Action button size variant.",
  },
];

const ALERT_DIALOG_CANCEL_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'",
    default: "'outline'",
    required: false,
    description: "Tactile button styling for the safe exit action. Defaults to 'outline'.",
  },
  {
    name: "size",
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    required: false,
    description: "Cancel button size variant.",
  },
];

const KEYBOARD_SHORTCUTS = [
  { keys: ["Escape"], action: "Dismisses the active alert dialog without executing the action and restores focus to trigger." },
  { keys: ["Tab"], action: "Cycles focus strictly between Cancel, Action, and interactive elements inside the alert." },
  { keys: ["Shift", "Tab"], action: "Cycles focus backward within the alert dialog focus trap." },
  { keys: ["Enter", "Space"], action: "Activates the currently focused action button (Cancel or Confirm)." },
];

const CONFIRMATION_WORKFLOW_STEPS = [
  {
    title: "1. Consequential Trigger",
    description: "User initiates a destructive or high-impact action (e.g., 'Delete Database'). Open state activates.",
  },
  {
    title: "2. Deep Scrim Isolation",
    description: "Deep optical scrim mounts with 16px diffusion and heavy ambient occlusion, focusing user attention on the decision.",
  },
  {
    title: "3. Safe Initial Focus",
    description: "Focus is moved into the dialog, safely prioritizing the Cancel action to prevent accidental confirmation.",
  },
  {
    title: "4. Explicit Consequence",
    description: "User evaluates the specific consequence and commits with an explicit action ('Delete Cluster') or safely aborts.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/alert-dialog.tsx",
    type: "file",
    description: "AlertDialog, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel",
  },
  {
    name: "components/haloui/foundations/halo-scrim.tsx",
    type: "file",
    description: "Shared optical backdrop scrim diffusion and ambient darkness occlusion foundation",
  },
  {
    name: "components/ui/button.tsx",
    type: "file",
    description: "Tactile solid button system powering AlertDialogAction and AlertDialogCancel",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Standardized Hugeicon wrapper ensuring optical stroke fidelity and currentColor inheritance",
  },
];

export default function AlertDialogDocsPage() {
  return (
    <article className="space-y-12">
      {/* 1. Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Overlays & Menus 02
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Alert Dialog
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A high-consequence modal confirmation surface engineered with HaloUI liquid glass physical optics, deep optical scrim isolation, and explicit consequence verification.
        </p>
      </header>

      {/* 2. Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Live Preview
        </h2>
        <AlertDialogPreviewStage />
      </section>

      {/* 3. Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="alert-dialog" />
      </section>

      {/* 4. Source Ownership */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Source Ownership & Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Alert Dialog builds directly upon HaloUI's shared overlay infrastructure. Installing via shadcn writes the complete component source and token bindings into your repository.
        </p>
        <SourceOwnershipComparison />
        <div className="pt-2">
          <FileTree items={FILE_TREE_ITEMS} />
        </div>
      </section>

      {/* 5. Critical Distinction: Dialog vs. Alert Dialog */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Dialog vs. Alert Dialog: Architectural Distinction
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Alert Dialog is <strong className="text-foreground">not merely Dialog with a red button</strong>. Its behavioral, semantic, and cognitive contract is completely different:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/60 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold text-foreground">Dimension</th>
                <th className="px-4 py-3 font-semibold text-foreground">Dialog (01)</th>
                <th className="px-4 py-3 font-semibold text-foreground">Alert Dialog (02)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Primary Responsibility</td>
                <td className="px-4 py-3 text-muted-foreground">Focused task, multi-field form, entity creation, contextual settings.</td>
                <td className="px-4 py-3 text-muted-foreground">High-consequence binary confirmation before irreversible action.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Semantic ARIA Role</td>
                <td className="px-4 py-3 font-mono text-[11px] text-primary">role="dialog"</td>
                <td className="px-4 py-3 font-mono text-[11px] text-destructive">role="alertdialog"</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Default Scrim Diffusion</td>
                <td className="px-4 py-3 text-muted-foreground">Balanced (8px blur, preserves subtle environmental cues).</td>
                <td className="px-4 py-3 text-muted-foreground">Deep (16px blur, heavy ambient occlusion for isolation).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Close Affordance</td>
                <td className="px-4 py-3 text-muted-foreground">Top-right icon button + Cancel + click-outside.</td>
                <td className="px-4 py-3 text-muted-foreground">Explicit Cancel action button; no casual dismiss icon.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Interior Elements</td>
                <td className="px-4 py-3 text-muted-foreground">Inputs, selects, textareas, tabs, scrollable containers.</td>
                <td className="px-4 py-3 text-muted-foreground">Strictly constrained to title, description, and binary actions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Confirmation Lifecycle */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Consequence Confirmation Lifecycle
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The four distinct operational phases governing an Alert Dialog interaction:
        </p>
        <ProcessSteps steps={CONFIRMATION_WORKFLOW_STEPS} />
      </section>

      {/* 7. Liquid Glass Material Rules */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Liquid Glass Material Rules for Alerts
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A core HaloUI design system directive: <strong className="text-foreground">Do NOT create a red glass implementation for destructive alerts</strong>.
        </p>

        <Callout type="warning">
          <strong>Keep the glass body neutral:</strong> Consequence belongs to typography, iconography, and tactile button styling—not giant glowing red liquid surfaces. The optical substrate of <code className="text-xs">AlertDialogContent</code> remains authentic balanced liquid glass.
        </Callout>

        <div className="grid gap-4 sm:grid-cols-2 text-xs pt-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Approved Alert Design</span>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Neutral liquid glass surface (<code className="font-mono">halo-liquid-glass-surface</code>)</li>
              <li>Status media badge in <code className="font-mono">AlertDialogMedia</code> (e.g., Delete, Key, Alert icon)</li>
              <li>Explicit action wording: <strong className="text-foreground">"Delete Cluster"</strong>, <strong className="text-foreground">"Revoke Key"</strong></li>
              <li>Clearly visible Cancel action (<code className="font-mono">variant="outline"</code>)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-2">
            <span className="font-semibold text-destructive">✗ Prohibited Anti-Patterns</span>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Tinting the entire glass body crimson red or neon amber</li>
              <li>Generic vague action buttons: "Yes", "OK", "Continue"</li>
              <li>Hiding or downplaying the Cancel escape route</li>
              <li>Embedding multi-tab forms or complex wizards inside an Alert Dialog</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Functional Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Functional Demonstrations
        </h2>
        <AlertDialogDemonstrations />
      </section>

      {/* 9. Action & Cancel Design Rules */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Action & Cancel Design Guidelines
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">Explicit Action Labels</h4>
            <p className="text-muted-foreground leading-relaxed">
              Always state the verb and the target noun clearly. The user should be able to understand the exact consequence by reading the button alone.
            </p>
            <div className="space-y-1 pt-1">
              <div className="text-muted-foreground">Avoid: <span className="line-through text-destructive">"Yes", "OK", "Proceed"</span></div>
              <div className="text-foreground font-semibold">Prefer: "Delete Cluster", "Revoke Token", "Discard Changes"</div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">Safe Cancellation Route</h4>
            <p className="text-muted-foreground leading-relaxed">
              The cancellation action must remain immediately visible, high-contrast, and easy to activate via keyboard or touch. Never make destructive confirmation easier than cancellation.
            </p>
            <div className="space-y-1 pt-1">
              <div className="text-muted-foreground">Default: <span className="font-mono text-foreground">AlertDialogCancel (variant="outline")</span></div>
              <div className="text-muted-foreground">Keyboard: <span className="font-mono text-foreground">Escape key cancels safely</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Accessibility & Screen Reader Semantics */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility & Screen Reader Semantics (WCAG 2.1 AA)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Alert Dialog implements the WAI-ARIA Alert and Message Dialog Pattern specifications:
        </p>

        <ul className="space-y-2 text-xs text-muted-foreground list-disc list-inside leading-relaxed">
          <li><strong className="text-foreground">Role Announcement:</strong> Renders with <code className="font-mono">role="alertdialog"</code> and <code className="font-mono">aria-modal="true"</code>, causing assistive technologies to announce the title immediately upon interruption.</li>
          <li><strong className="text-foreground">Labelling:</strong> Automatically bound to <code className="font-mono">AlertDialogTitle</code> via <code className="font-mono">aria-labelledby</code> and <code className="font-mono">AlertDialogDescription</code> via <code className="font-mono">aria-describedby</code>.</li>
          <li><strong className="text-foreground">Safe Focus Containment:</strong> Focus is trapped within the alert dialog until dismissed or committed. Focus returns to the trigger upon exit.</li>
          <li><strong className="text-foreground">Scroll Locking:</strong> Background document scrolling is locked to maintain spatial orientation.</li>
        </ul>

        <div className="pt-2">
          <KeyboardTable rows={KEYBOARD_SHORTCUTS} />
        </div>
      </section>

      {/* 11. Environmental Accommodations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Environmental Accommodations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">prefers-reduced-motion</h4>
            <p className="text-muted-foreground leading-relaxed">
              When enabled, scale zoom transitions (<code className="font-mono text-[11px]">zoom-in-95</code>) and translation animations are disabled. The alert dialog appears with instantaneous alpha reveals to prevent motion disorientation.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">prefers-reduced-transparency</h4>
            <p className="text-muted-foreground leading-relaxed">
              Section 19 rules in <code className="font-mono text-[11px]">halo-material.css</code> substitute translucent liquid blurs with high-contrast 96% opaque slate/graphite fills, ensuring text legibility remains uncompromising.
            </p>
          </div>
        </div>
      </section>

      {/* 12. API Reference / Props Tables */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Detailed property documentation for Alert Dialog components.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">AlertDialogContent</h3>
          <PropsTable rows={ALERT_DIALOG_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">AlertDialogOverlay</h3>
          <PropsTable rows={ALERT_DIALOG_OVERLAY_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">AlertDialogAction</h3>
          <PropsTable rows={ALERT_DIALOG_ACTION_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">AlertDialogCancel</h3>
          <PropsTable rows={ALERT_DIALOG_CANCEL_PROPS} />
        </div>
      </section>

      {/* 13. Related Overlays */}
      <footer className="pt-8 border-t border-border/80">
        <h3 className="text-sm font-semibold text-foreground mb-4">Related Overlays & Surfaces</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <Link
            href="/components/dialog"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Dialog →</div>
            <div className="text-muted-foreground mt-1">General modal task and content surface.</div>
          </Link>
          <Link
            href="/components/drawer"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Drawer →</div>
            <div className="text-muted-foreground mt-1">Edge-entering contextual task surface.</div>
          </Link>
          <Link
            href="/components/sheet"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Sheet →</div>
            <div className="text-muted-foreground mt-1">Side-oriented supplementary workspace panel.</div>
          </Link>
          <Link
            href="/components/popover"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Popover →</div>
            <div className="text-muted-foreground mt-1">Non-modal floating contextual overlay.</div>
          </Link>
        </div>
      </footer>
    </article>
  );
}
