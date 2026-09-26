import { Metadata } from "next";
import { SheetPreviewStage } from "./sheet-preview-stage";
import { SheetDemonstrations } from "./sheet-demonstrations";
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
  title: "Sheet — Overlays & Menus — HaloUI",
  description:
    "An edge-anchored overlay panel engineered with HaloUI liquid glass physical optics, directional slide kinematics, concentric meniscus border curvature, and calibrated scrim diffusion.",
};

const SHEET_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'right'",
    required: false,
    description: "Viewport edge boundary to which the sheet panel anchors and animates from.",
  },
  {
    name: "size",
    type: "'sm' | 'default' | 'md' | 'lg' | 'xl' | 'full'",
    default: "'default'",
    required: false,
    description: "Width bounding tier for horizontal sheets (sm: 384px, default/md: 448px, lg: 512px, xl: 576px, full: 768px).",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Physical liquid glass optical intensity governing specular highlight catch and internal reflection depth.",
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

const SHEET_OVERLAY_PROPS: PropRow[] = [
  {
    name: "blur",
    type: "'none' | 'subtle' | 'balanced' | 'deep'",
    default: "'balanced'",
    required: false,
    description: "Backdrop optical blur level applied behind the sheet container.",
  },
  {
    name: "tint",
    type: "'neutral' | 'soft' | 'deep' | 'vibrant'",
    default: "'neutral'",
    required: false,
    description: "Ambient light occlusion wash for environmental separation.",
  },
];

const KEYBOARD_SHORTCUTS = [
  { keys: ["Escape"], action: "Dismisses the active Sheet and returns focus to the trigger." },
  { keys: ["Tab"], action: "Cycles focus forward to the next focusable element trapped within the sheet." },
  { keys: ["Shift", "Tab"], action: "Cycles focus backward to the previous focusable element trapped within the sheet." },
  { keys: ["Enter", "Space"], action: "Activates the focused button or close action." },
];

const LIFECYCLE_STEPS = [
  {
    title: "1. Trigger Activation",
    description:
      "User activates SheetTrigger via click or Enter/Space. Previous active element reference is retained for accessible restoration.",
  },
  {
    title: "2. Scrim & Portal Mounting",
    description:
      "SheetContent mounts to document body inside SheetPortal. Halo Scrim fades in with calibrated backdrop diffusion.",
  },
  {
    title: "3. Directional Translation",
    description:
      "Surface slides into view along its edge vector with 135° directional specular highlight catching environmental light.",
  },
  {
    title: "4. Dismiss & Restore",
    description:
      "User presses Escape, activates SheetClose, or taps outside. Scrim fades out and focus restores to trigger.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/sheet.tsx",
    type: "file",
    description: "Sheet, SheetTrigger, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose",
  },
  {
    name: "components/ui/button.tsx",
    type: "file",
    description: "Tactile action surface for trigger, footer, and close buttons",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Hugeicons icon wrapper ensuring optical stroke fidelity and currentColor inheritance",
  },
  {
    name: "lib/utils.ts",
    type: "file",
    description: "Class variance authority and tailwind-merge helper",
  },
];

export default function SheetDocsPage() {
  return (
    <article className="space-y-12">
      {/* 1. Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Overlays &amp; Menus 03
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Sheet
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An edge-anchored overlay panel engineered with HaloUI liquid glass physical optics, directional slide kinematics, concentric meniscus border curvature, and calibrated optical scrim diffusion.
        </p>
      </header>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <SheetPreviewStage />
      </section>

      {/* 3. Source Distribution & Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install directly into your repository through the shadcn CLI. The component is distributed as source code into your <code className="font-mono text-xs">components/ui</code> directory with full ownership.
        </p>
        <InstallCommand registry="sheet" />
      </section>

      {/* 4. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Anatomy &amp; File Structure
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Sheet composes the accessible dialog primitives from <code className="font-mono text-xs">@base-ui/react/dialog</code> with HaloUI&apos;s 10-layer physical liquid material engine.
        </p>

        <FileTree items={FILE_TREE_ITEMS} />

        <div className="pt-2">
          <CodeBlock
            language="tsx"
            code={`import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button>Open Settings</Button>} />
      <SheetContent side="right" size="default">
        <SheetHeader>
          <SheetTitle>Project Settings</SheetTitle>
          <SheetDescription>Configure workspace options.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Main scrollable body */}
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
          <Button variant="default">Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}`}
          />
        </div>
      </section>

      {/* 5. Edge Attachment & Geometry */}
      <section id="edge-attachment" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Edge Attachment &amp; Concentric Geometry
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unlike floating dialog cards that float uniformly in space, a Sheet is physically anchored to a viewport boundary. Its geometry directly communicates edge origin:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl border border-border/70 bg-card/50 space-y-2">
            <span className="font-semibold text-foreground font-mono">side=&quot;right&quot; (Default)</span>
            <p className="text-muted-foreground leading-relaxed">
              Anchors flush to the right viewport frame with a 1px optical separator border (<code className="font-mono">border-l</code>). The exposed left edge carries a prominent concentric meniscus radius (<code className="font-mono">rounded-l-2xl sm:rounded-l-3xl</code>).
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-card/50 space-y-2">
            <span className="font-semibold text-foreground font-mono">side=&quot;left&quot; (Navigation)</span>
            <p className="text-muted-foreground leading-relaxed">
              Anchors flush to the left viewport frame (<code className="font-mono">border-r</code>), exposing right-side concentric curvature (<code className="font-mono">rounded-r-2xl sm:rounded-r-3xl</code>) tailored for application sidebars and directory trees.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-card/50 space-y-2">
            <span className="font-semibold text-foreground font-mono">side=&quot;bottom&quot; (Action Tray)</span>
            <p className="text-muted-foreground leading-relaxed">
              Spans the horizontal viewport bottom (<code className="font-mono">border-t</code>) with top-exposed rounded geometry (<code className="font-mono">rounded-t-2xl sm:rounded-t-3xl</code>) capped at <code className="font-mono">85dvh</code> to prevent content overflow.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-card/50 space-y-2">
            <span className="font-semibold text-foreground font-mono">side=&quot;top&quot; (Alert Banner)</span>
            <p className="text-muted-foreground leading-relaxed">
              Descends from the top viewport boundary (<code className="font-mono">border-b</code>) with bottom-exposed curvature (<code className="font-mono">rounded-b-2xl sm:rounded-b-3xl</code>), suitable for system-wide notices or command utilities.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Demonstrations */}
      <section id="demonstrations" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Functional Demonstrations
        </h2>
        <SheetDemonstrations />
      </section>

      {/* 7. Glass Isolation Contract */}
      <section id="glass-isolation" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Glass Isolation Contract
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI strictly enforces the Glass Isolation Contract across large overlays. Because a Sheet already renders multiple backdrop diffusion and specular layers, interior form controls must remain restrained:
        </p>

        <Callout type="warning">
          <strong>Anti-Nesting Rule:</strong> Never nest liquid glass buttons, glass fields, or glass inputs inside a Sheet. Excessive overlapping filters cause compositor cache invalidations, color banding, and visual fatigue. Interior controls must use solid or semi-opaque surfaces (<code className="font-mono text-xs">bg-background/80</code>).
        </Callout>
      </section>

      {/* 8. Sheet vs Drawer Architectural Comparison */}
      <section id="sheet-vs-drawer" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Sheet vs. Drawer Architectural Comparison
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          While both surfaces provide edge-adjacent supplementary tasks, they serve distinct interaction paradigms:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-semibold text-foreground">
                <th className="p-3">Characteristic</th>
                <th className="p-3">Sheet</th>
                <th className="p-3">Drawer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Primary Platform</td>
                <td className="p-3">Desktop, Laptop, Tablet, Responsive Web</td>
                <td className="p-3">Mobile-first, Touch Devices, Small Tablets</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Interaction Model</td>
                <td className="p-3">Click, keyboard, programmatic state transition</td>
                <td className="p-3">Touch gestures, velocity dragging, snap points</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Default Edge</td>
                <td className="p-3">Right side (vertical panel)</td>
                <td className="p-3">Bottom edge (vertical tray)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Content Complexity</td>
                <td className="p-3">Multi-field forms, inspector tabs, deep trees</td>
                <td className="p-3">Concise options, single-task forms, filter chips</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Drag Handle</td>
                <td className="p-3">None (edge-flush panel)</td>
                <td className="p-3">Optional visual drag affordance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. Lifecycle Workflow */}
      <section id="workflow" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Overlay Lifecycle Workflow
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The four-phase lifecycle managed by Base UI and HaloUI optical orchestration:
        </p>

        <ProcessSteps steps={LIFECYCLE_STEPS} />
      </section>

      {/* 10. Source Ownership */}
      <section id="source-ownership" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Source Ownership &amp; Registry Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI follows source-owned distribution. The sheet primitive, its optical scrim foundation, and physical token rules are copied directly into your repository.
        </p>
        <SourceOwnershipComparison />
      </section>

      {/* 11. Accessibility & Keyboard */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Accessibility Specifications
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Sheet strictly complies with WAI-ARIA Dialog (Modal) design patterns and WCAG 2.1 AA requirements:
        </p>

        <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
          <ul className="list-disc list-inside space-y-1.5">
            <li>
              <strong className="text-foreground">Role &amp; Labelling:</strong> The container renders <code className="font-mono">role=&quot;dialog&quot;</code> and <code className="font-mono">aria-modal=&quot;true&quot;</code>, linked automatically to <code className="font-mono">SheetTitle</code> and <code className="font-mono">SheetDescription</code>.
            </li>
            <li>
              <strong className="text-foreground">Focus Containment:</strong> Focus is trapped within the active sheet panel. Pressing Tab at the bottom cycles back to the top-most actionable control.
            </li>
            <li>
              <strong className="text-foreground">Escape Dismissal:</strong> Pressing the <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Esc</kbd> key dismisses the panel and returns focus to the initiating trigger.
            </li>
            <li>
              <strong className="text-foreground">Outside Pointer Interception:</strong> Clicking the backdrop scrim immediately dismisses the modal without triggering underlying page actions.
            </li>
            <li>
              <strong className="text-foreground">Scroll Locking:</strong> Background body scrolling is safely locked without introducing scrollbar jitter.
            </li>
          </ul>
        </div>

        <div className="pt-2">
          <KeyboardTable rows={KEYBOARD_SHORTCUTS} />
        </div>
      </section>

      {/* 12. Props Specifications */}
      <section id="props" className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
            Props Reference
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            API specifications for <code className="font-mono text-xs">SheetContent</code> and supporting compound primitives.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground font-mono">SheetContent</h3>
          <PropsTable rows={SHEET_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground font-mono">SheetOverlay</h3>
          <PropsTable rows={SHEET_OVERLAY_PROPS} />
        </div>
      </section>

      {/* 13. Related Components */}
      <footer className="pt-8 border-t border-border/80">
        <h3 className="text-sm font-semibold text-foreground mb-4">Related Overlays &amp; Surfaces</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <Link
            href="/components/drawer"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Drawer →</div>
            <div className="text-muted-foreground mt-1">Touch-friendly gesture drawer optimized for mobile task workflows.</div>
          </Link>
          <Link
            href="/components/dialog"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Dialog →</div>
            <div className="text-muted-foreground mt-1">Centered modal task surface with calibrated optical scrim isolation.</div>
          </Link>
          <Link
            href="/components/alert-dialog"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Alert Dialog →</div>
            <div className="text-muted-foreground mt-1">High-consequence modal confirmation interrupting critical workflows.</div>
          </Link>
          <Link
            href="/components/popover"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Popover →</div>
            <div className="text-muted-foreground mt-1">Non-modal floating contextual overlay surface.</div>
          </Link>
        </div>
      </footer>
    </article>
  );
}
