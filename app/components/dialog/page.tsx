import { Metadata } from "next";
import { DialogPreviewStage } from "./dialog-preview-stage";
import { DialogDemonstrations } from "./dialog-demonstrations";
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
  title: "Dialog — Overlays & Menus — HaloUI",
  description:
    "An accessible modal task surface engineered with HaloUI liquid glass physical optics, calibrated optical scrim diffusion, and strict focus trapping.",
};

const DIALOG_CONTENT_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
    default: "'md'",
    required: false,
    description: "Maximum width bounding tier for the dialog popup container.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Physical liquid glass optical intensity governing specular highlight catch and transmission depth.",
  },
  {
    name: "showCloseButton",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render the accessible top-right icon close button with aria-label.",
  },
  {
    name: "scrimBlur",
    type: "'none' | 'subtle' | 'balanced' | 'deep'",
    default: "'balanced'",
    required: false,
    description: "Optical background diffusion blur tier applied to the backdrop scrim overlay.",
  },
  {
    name: "scrimTint",
    type: "'neutral' | 'soft' | 'deep' | 'vibrant'",
    default: "'neutral'",
    required: false,
    description: "Ambient darkness and environmental color wash of the backdrop scrim.",
  },
];

const DIALOG_OVERLAY_PROPS: PropRow[] = [
  {
    name: "blur",
    type: "'none' | 'subtle' | 'balanced' | 'deep'",
    default: "'balanced'",
    required: false,
    description: "Backdrop blur diffusion level for the standalone DialogOverlay component.",
  },
  {
    name: "tint",
    type: "'neutral' | 'soft' | 'deep' | 'vibrant'",
    default: "'neutral'",
    required: false,
    description: "Environmental occlusion tint level for the standalone DialogOverlay component.",
  },
];

const KEYBOARD_SHORTCUTS = [
  { keys: ["Escape"], action: "Dismisses the active dialog and restores focus to the trigger." },
  { keys: ["Tab"], action: "Cycles focus forward to the next focusable element trapped within the dialog." },
  { keys: ["Shift", "Tab"], action: "Cycles focus backward to the previous focusable element trapped within the dialog." },
  { keys: ["Enter", "Space"], action: "Activates the focused button or close action." },
];

const LIFECYCLE_STEPS = [
  {
    title: "1. Trigger Activation",
    description: "User activates DialogTrigger via pointer click or Enter/Space key. Open state transitions to true.",
  },
  {
    title: "2. Scrim & Portal Mounting",
    description: "Base UI mounts DialogOverlay and DialogContent into the document portal. Background scroll locking engages.",
  },
  {
    title: "3. Focus Containment",
    description: "Focus moves automatically to the first interactive child or initialFocus target. Document focus is strictly trapped.",
  },
  {
    title: "4. Dismiss & Restore",
    description: "Escape key, close button, or scrim tap triggers dismissal. Focus cleanly restores to the original trigger element.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/dialog.tsx",
    type: "file",
    description: "Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose",
  },
  {
    name: "components/haloui/foundations/halo-scrim.tsx",
    type: "file",
    description: "Shared optical backdrop scrim diffusion and ambient tint occlusion foundation",
  },
  {
    name: "components/haloui/foundations/halo-portal-surface.tsx",
    type: "file",
    description: "Liquid glass material container for floating portalled overlays",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Hugeicons icon wrapper ensuring optical stroke fidelity and currentColor inheritance",
  },
];

export default function DialogDocsPage() {
  return (
    <article className="space-y-12">
      {/* 1. Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Overlays & Menus 01
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Dialog
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible modal task surface engineered with HaloUI liquid glass physical optics, calibrated optical scrim diffusion, and strict focus trapping.
        </p>
      </header>

      {/* 2. Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Live Preview
        </h2>
        <DialogPreviewStage />
      </section>

      {/* 3. Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="dialog" />
      </section>

      {/* 4. Source Ownership */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Source Ownership & Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI follows source-owned distribution. The dialog primitive, its optical scrim foundation, and physical token rules are copied directly into your repository.
        </p>
        <SourceOwnershipComparison />
        <div className="pt-2">
          <FileTree items={FILE_TREE_ITEMS} />
        </div>
      </section>

      {/* 5. Component Anatomy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component Anatomy & Hierarchy
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The dialog architecture strictly decouples modal state coordination from physical material presentation. Base UI manages accessibility, portal mounting, and keyboard trapping, while HaloUI foundations supply optical transmission and scrim diffusion.
        </p>

        <div className="rounded-xl border border-border bg-card/60 p-5 space-y-3">
          <div className="grid gap-2 text-xs">
            <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border/80 bg-background/80">
              <span className="font-mono font-semibold text-primary">Dialog</span>
              <span className="text-muted-foreground">State coordinator (<code className="text-[11px]">DialogPrimitive.Root</code>) managing open state and focus trap context.</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border/80 bg-background/80">
              <span className="font-mono font-semibold text-primary">DialogTrigger</span>
              <span className="text-muted-foreground">Accessible action button that toggles open state and receives restored focus on dismiss.</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border/80 bg-background/80">
              <span className="font-mono font-semibold text-primary">DialogPortal</span>
              <span className="text-muted-foreground">React portal rendering overlays into <code className="text-[11px]">document.body</code> outside parent clipping trees.</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border/80 bg-background/80">
              <span className="font-mono font-semibold text-primary">DialogOverlay</span>
              <span className="text-muted-foreground">Optical scrim (<code className="text-[11px]">HaloScrim</code>) applying calibrated backdrop blur and ambient darkness.</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border/80 bg-background/80">
              <span className="font-mono font-semibold text-primary">DialogContent</span>
              <span className="text-muted-foreground">Liquid glass modal surface (<code className="text-[11px]">halo-liquid-glass-surface</code>) with 135° specular catch and inner meniscus edge.</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border/80 bg-background/80">
              <span className="font-mono font-semibold text-primary">DialogHeader / Title / Description</span>
              <span className="text-muted-foreground">Semantic typography with automatic ARIA labelling (<code className="text-[11px]">aria-labelledby</code> & <code className="text-[11px]">aria-describedby</code>).</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border/80 bg-background/80">
              <span className="font-mono font-semibold text-primary">DialogFooter</span>
              <span className="text-muted-foreground">Concentric action cluster with responsive column-reverse to horizontal layout and border separation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Lifecycle Workflow */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Modal Interaction Lifecycle
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every dialog interaction executes through four synchronized phases to guarantee zero focus leaks and seamless optical transitions.
        </p>
        <ProcessSteps steps={LIFECYCLE_STEPS} />
      </section>

      {/* 7. Glass Isolation Contract */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          The Glass Isolation Contract (Zero Glass-on-Glass)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A fundamental law of the HaloUI liquid optical engine: <strong className="text-foreground">DialogContent owns the liquid glass surface</strong>.
        </p>

        <Callout type="warning">
          <strong>Never nest liquid glass inside liquid glass:</strong> Do not place rich glass cards, glass buttons, or translucent inputs inside DialogContent. Compounding <code className="text-xs">backdrop-filter</code> layers destroys compositor framerates, introduces blurry fringes, and compromises text contrast. Inputs inside DialogContent must use subtle or solid backgrounds (<code className="text-xs">bg-background/80</code>).
        </Callout>

        <div className="grid gap-4 sm:grid-cols-2 text-xs pt-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Approved Hierarchy</span>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>DialogContent carries <code className="font-mono">halo-liquid-glass-surface</code></li>
              <li>Inner form inputs use clean solid fills (<code className="font-mono">bg-background/80</code>)</li>
              <li>Buttons use tactile solid or default variants</li>
              <li>DialogFooter uses clean top border with flex gap</li>
            </ul>
          </div>
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-2">
            <span className="font-semibold text-destructive">✗ Prohibited Anti-Pattern</span>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Wrapping inner sections in extra glass cards</li>
              <li>Negative margin footer cuts (<code className="font-mono">-mx-4 -mb-4 bg-muted/50</code>)</li>
              <li>Transparent form inputs with double blurs</li>
              <li>Gradient blobs floating behind interior dialog text</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Scrim Diffusion Calibration */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Optical Scrim Calibration & Depth Separation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The scrim layer (<code className="font-mono text-xs">DialogOverlay</code>) is calibrated to preserve spatial context while occluding distracting background details.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-xl border border-border bg-card/60 p-3.5 space-y-1.5">
            <div className="font-semibold text-foreground">None (0px)</div>
            <p className="text-muted-foreground leading-relaxed">
              Pure tint occlusion without diffusion. Ideal for low-powered embedded devices or maximum CPU preservation.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3.5 space-y-1.5">
            <div className="font-semibold text-foreground">Subtle (4px)</div>
            <p className="text-muted-foreground leading-relaxed">
              Gentle background softening. Keeps background metrics and chart shapes legible while signaling modal focus.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3.5 space-y-1.5">
            <div className="font-semibold text-foreground">Balanced (8px — Default)</div>
            <p className="text-muted-foreground leading-relaxed">
              The canonical HaloUI standard. Provides optimal optical separation and contrast for reading and data entry.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3.5 space-y-1.5">
            <div className="font-semibold text-foreground">Deep (16px)</div>
            <p className="text-muted-foreground leading-relaxed">
              Heavy optical diffusion. Isolates critical workflows, multi-step wizards, and security-sensitive confirmations.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Interactive Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Functional Demonstrations
        </h2>
        <DialogDemonstrations />
      </section>

      {/* 10. Guidelines */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage Guidelines
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">When to Use Dialog</h4>
            <ul className="space-y-1.5 text-muted-foreground list-disc list-inside">
              <li>Discrete self-contained tasks (profile editing, inviting members, configuring service parameters).</li>
              <li>High-consequence user actions requiring explicit verification before proceeding.</li>
              <li>Content requiring focused user attention without leaving the current URL.</li>
              <li>Mobile-responsive forms that benefit from full viewport centering.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">When NOT to Use Dialog</h4>
            <ul className="space-y-1.5 text-muted-foreground list-disc list-inside">
              <li>Transient dropdown choices or contextual options (use <Link href="/components/popover" className="underline hover:text-foreground">Popover</Link> instead).</li>
              <li>Non-modal edge-docked inspection panels (use <Link href="/components/sheet" className="underline hover:text-foreground">Sheet</Link> or <Link href="/components/drawer" className="underline hover:text-foreground">Drawer</Link> instead).</li>
              <li>Lightweight feedback messages or transient alerts (use <Link href="/components/toast" className="underline hover:text-foreground">Toast</Link> instead).</li>
              <li>Extensive multi-page wizards that require browser history (use dedicated routing pages instead).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 11. Accessibility & Keyboard Trapping */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility & Focus Management (WCAG 2.1 AA)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI dialogs adhere strictly to the WAI-ARIA Dialog (Modal) Pattern specifications:
        </p>

        <ul className="space-y-2 text-xs text-muted-foreground list-disc list-inside leading-relaxed">
          <li><strong className="text-foreground">ARIA Roles:</strong> DialogContent renders with <code className="font-mono">role="dialog"</code> and <code className="font-mono">aria-modal="true"</code>.</li>
          <li><strong className="text-foreground">Labelling:</strong> DialogTitle and DialogDescription automatically supply <code className="font-mono">aria-labelledby</code> and <code className="font-mono">aria-describedby</code> to the container.</li>
          <li><strong className="text-foreground">Focus Restoration:</strong> When closed, focus returns directly to the triggering element.</li>
          <li><strong className="text-foreground">Scroll Locking:</strong> Background document scrolling is locked while the dialog is active to prevent scroll-jacking.</li>
        </ul>

        <div className="pt-2">
          <KeyboardTable rows={KEYBOARD_SHORTCUTS} />
        </div>
      </section>

      {/* 12. Reduced Motion & Reduced Transparency */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Environmental & Accessibility Accommodations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">prefers-reduced-motion</h4>
            <p className="text-muted-foreground leading-relaxed">
              When the user has configured reduced motion in their OS, scale-in zoom animations (<code className="font-mono text-[11px]">zoom-in-95</code>) and translation animations are disabled. The dialog appears with instantaneous alpha transitions.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">prefers-reduced-transparency</h4>
            <p className="text-muted-foreground leading-relaxed">
              HaloUI material rules in <code className="font-mono text-[11px]">halo-material.css</code> Section 19 automatically replace translucent backgrounds and backdrop-filters with 94% opaque neutral fills to guarantee maximum contrast.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Mobile Viewport & Bounded Height */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Mobile Viewport Safety & Internal Scrolling
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          On small screens, modal containers must never clip outside the viewport. DialogContent enforces <code className="font-mono text-xs">max-h-[calc(100dvh-2rem)] overflow-y-auto</code> with a responsive 1rem inset buffer. On touch devices, focus moves to the popup itself to prevent premature virtual keyboard triggering.
        </p>
      </section>

      {/* 14. API Reference / Props Tables */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Detailed property documentation for Dialog components.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">DialogContent</h3>
          <PropsTable rows={DIALOG_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">DialogOverlay</h3>
          <PropsTable rows={DIALOG_OVERLAY_PROPS} />
        </div>
      </section>

      {/* 15. Related Components */}
      <footer className="pt-8 border-t border-border/80">
        <h3 className="text-sm font-semibold text-foreground mb-4">Related Overlays & Surfaces</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <Link
            href="/components/alert-dialog"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Alert Dialog →</div>
            <div className="text-muted-foreground mt-1">High-consequence interruptive confirmation.</div>
          </Link>
          <Link
            href="/components/drawer"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Drawer →</div>
            <div className="text-muted-foreground mt-1">Edge-entering tactile sliding surface.</div>
          </Link>
          <Link
            href="/components/sheet"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Sheet →</div>
            <div className="text-muted-foreground mt-1">Side-anchored supplementary task panel.</div>
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
