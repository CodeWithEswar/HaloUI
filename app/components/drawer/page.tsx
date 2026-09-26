import { Metadata } from "next";
import { DrawerPreviewStage } from "./drawer-preview-stage";
import { DrawerDemonstrations } from "./drawer-demonstrations";
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
  title: "Drawer — Overlays & Menus — HaloUI",
  description:
    "A gesture-driven contextual surface engineered with Base UI Drawer physics, velocity swipe dismissal, multi-step snap points, mobile safe area padding, and 10-layer Liquid Glass optical physics.",
};

const DRAWER_ROOT_PROPS: PropRow[] = [
  {
    name: "swipeDirection",
    type: "'down' | 'up' | 'left' | 'right'",
    default: "'down'",
    required: false,
    description: "Primary swipe axis and boundary towards which the drawer dismisses (default: bottom sheet swipe-down).",
  },
  {
    name: "snapPoints",
    type: "(number | string)[]",
    default: "undefined",
    required: false,
    description: "Array of resting snap point heights or fractions (e.g. ['280px', '540px', 1] or [0.4, 0.9]).",
  },
  {
    name: "defaultSnapPoint",
    type: "number | string",
    default: "undefined",
    required: false,
    description: "Initial resting snap point when the drawer mounts.",
  },
  {
    name: "showSwipeHandle",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to display the accessible optical capsule pill indicator at the edge of the drawer.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Physical liquid glass optical intensity governing refraction edge luminance and specular highlight catch.",
  },
  {
    name: "modal",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether the drawer intercepts interactions behind it with an optical backdrop scrim and locks body scrolling.",
  },
];

const DRAWER_CONTENT_PROPS: PropRow[] = [
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Overrides root material intensity for the drawer popup surface.",
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
  {
    name: "showCloseButton",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to render an accessible top-right icon close button in addition to touch drag dismissal.",
  },
];

const DRAWER_OVERLAY_PROPS: PropRow[] = [
  {
    name: "blur",
    type: "'none' | 'subtle' | 'balanced' | 'deep'",
    default: "'balanced'",
    required: false,
    description: "Backdrop optical blur level applied behind the drawer container.",
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
  { keys: ["Escape"], action: "Dismisses the active Drawer and returns focus to the initiating trigger." },
  { keys: ["Tab"], action: "Cycles focus forward through interactive controls trapped inside the drawer." },
  { keys: ["Shift", "Tab"], action: "Cycles focus backward through interactive controls trapped inside the drawer." },
  { keys: ["Enter", "Space"], action: "Activates the focused button, handle action, or close control." },
];

const GESTURE_CONTROLS = [
  {
    gesture: "Downward Drag (Bottom Drawer)",
    action: "Tracks finger or pointer movement with real-time translation and backdrop scrim opacity scaling.",
  },
  {
    gesture: "Velocity Flick",
    action: "Fast downward flicks trigger immediate dismissal regardless of distance traveled.",
  },
  {
    gesture: "Snap Point Drag",
    action: "Dragging past a snap threshold causes the drawer to smoothly glide into the nearest snap position.",
  },
  {
    gesture: "Boundary Rubber-Banding",
    action: "Dragging upward past maximum height applies physical logarithmic resistance.",
  },
];

const LIFECYCLE_STEPS = [
  {
    title: "1. Trigger Activation",
    description:
      "User taps DrawerTrigger. Focus is saved and the drawer container mounts via DrawerPortal with zero layout shift.",
  },
  {
    title: "2. Scrim & Geometry Entry",
    description:
      "The 10-layer liquid glass surface slides upward from the viewport bottom while the optical backdrop scrim smoothly fades in.",
  },
  {
    title: "3. Gesture Tracking & Snapping",
    description:
      "Pointer and touch events bind to the velocity tracking engine. Content scrolling is isolated until the list hits top boundary.",
  },
  {
    title: "4. Dismissal & Focus Restoration",
    description:
      "Velocity flick, scrim tap, or Escape dismisses the popup and restores focus to the trigger element.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/drawer.tsx",
    type: "file",
    description: "Drawer, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, DrawerSwipeHandle",
  },
  {
    name: "components/ui/button.tsx",
    type: "file",
    description: "Tactile action surface for triggers, footer actions, and dismissal controls",
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

export default function DrawerDocsPage() {
  return (
    <article className="space-y-12">
      {/* 1. Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Overlays &amp; Menus 04
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Drawer
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A touch-friendly contextual surface powered by Base UI Drawer, engineered with velocity swipe dismissal, multi-step snap points, mobile safe area padding, and 10-layer Liquid Glass optical physics.
        </p>
      </header>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <DrawerPreviewStage />
      </section>

      {/* 3. Source Distribution & Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install directly into your repository through the shadcn CLI. The component is distributed as source code into your <code className="font-mono text-xs">components/ui</code> directory with full ownership.
        </p>
        <InstallCommand registry="drawer" />
      </section>

      {/* 4. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Anatomy &amp; File Structure
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Drawer combines <code className="font-mono text-xs">@base-ui/react/drawer</code> with HaloUI&apos;s 10-layer liquid optical engine, swipe indicator affordances, and viewport bleed mechanics.
        </p>

        <FileTree items={FILE_TREE_ITEMS} />

        <div className="pt-2">
          <CodeBlock
            language="tsx"
            code={`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Drawer snapPoints={["320px", 1]} defaultSnapPoint="320px">
      <DrawerTrigger render={<Button>Open Player</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Audio Synthesizer</DrawerTitle>
          <DrawerDescription>Spatial stereo stream node</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 sm:p-6 space-y-4">
          {/* Main content body */}
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Dismiss</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`}
          />
        </div>
      </section>

      {/* 5. Mobile Safe Area & Meniscus Geometry */}
      <section id="mobile-safe-area" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Mobile Safe Area &amp; Meniscus Geometry
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          On modern mobile devices with edge home indicators (iPhone notch/pill), bottom sheets must safeguard interactive controls:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl border border-border/70 bg-card/50 space-y-2">
            <span className="font-semibold text-foreground font-mono">Safe Area Insets</span>
            <p className="text-muted-foreground leading-relaxed">
              The bottom drawer automatically applies <code className="font-mono">pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))]</code>, preventing home indicator collisions with primary action buttons.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-card/50 space-y-2">
            <span className="font-semibold text-foreground font-mono">Bleed Underlay</span>
            <p className="text-muted-foreground leading-relaxed">
              When users pull the sheet past top bounds or during elastic rubber-banding, a 3rem bleed underlay prevents visual clipping or blank gaps behind the drawer frame.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-card/50 space-y-2">
            <span className="font-semibold text-foreground font-mono">Concentric Meniscus Top</span>
            <p className="text-muted-foreground leading-relaxed">
              The top edge features <code className="font-mono">rounded-t-3xl border-t border-x border-border/60</code> with 135° specular highlights that catch environmental light across the curve.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-border/70 bg-card/50 space-y-2">
            <span className="font-semibold text-foreground font-mono">Swipe Capsule Pill</span>
            <p className="text-muted-foreground leading-relaxed">
              An accessible <code className="font-mono">DrawerSwipeHandle</code> renders a 48px wide, 6px high capsule pill with subtle contrast that responds visually to active drag states.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Demonstrations */}
      <section id="demonstrations" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Functional Demonstrations
        </h2>
        <DrawerDemonstrations />
      </section>

      {/* 7. Glass Isolation Contract */}
      <section id="glass-isolation" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Glass Isolation Contract
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI enforces a strict Glass Isolation Contract on gesture-driven surfaces:
        </p>

        <Callout type="warning">
          <strong>Content Isolation Mandate:</strong> Do NOT nest glass-on-glass surfaces within a Drawer. Inner action cards, option lists, and text inputs must use semi-opaque or solid surfaces (<code className="font-mono text-xs">bg-background/80</code>). Double liquid filtering creates heavy compositor lag during touch gestures and impairs text legibility.
        </Callout>
      </section>

      {/* 8. Drawer vs Sheet vs Dialog */}
      <section id="drawer-vs-others" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Overlay Taxonomy: Drawer vs. Sheet vs. Dialog
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Selecting the appropriate overlay surface for your application workflow:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-semibold text-foreground">
                <th className="p-3">Property</th>
                <th className="p-3">Drawer</th>
                <th className="p-3">Sheet</th>
                <th className="p-3">Dialog</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Form Factor</td>
                <td className="p-3">Bottom-up tray or edge drawer</td>
                <td className="p-3">Side-docked vertical panel</td>
                <td className="p-3">Centered floating modal card</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Gesture Model</td>
                <td className="p-3">Continuous touch drag &amp; velocity snap</td>
                <td className="p-3">Keyboard, click, outside dismissal</td>
                <td className="p-3">Keyboard, click, outside dismissal</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Primary Platform</td>
                <td className="p-3">Mobile &amp; touch-first interfaces</td>
                <td className="p-3">Desktop &amp; tablet productivity suites</td>
                <td className="p-3">Universal cross-platform modals</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Snap Points</td>
                <td className="p-3">Supported (multi-tier heights)</td>
                <td className="p-3">Fixed width tiers (sm to full)</td>
                <td className="p-3">Auto / content-determined size</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. Lifecycle Workflow */}
      <section id="workflow" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Gesture &amp; Lifecycle Workflow
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The four-stage operational sequence orchestrated by Base UI gesture physics:
        </p>

        <ProcessSteps steps={LIFECYCLE_STEPS} />
      </section>

      {/* 10. Source Ownership */}
      <section id="source-ownership" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Source Ownership &amp; Registry Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI follows source-owned distribution. The Drawer primitive and its liquid optical styling are copied directly into your repository.
        </p>
        <SourceOwnershipComparison />
      </section>

      {/* 11. Accessibility & Touch Gestures */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
          Accessibility &amp; Touch Gesture Specifications
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Drawer complies with WAI-ARIA Dialog (Modal) design patterns and mobile touch accessibility standards:
        </p>

        <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
          <ul className="list-disc list-inside space-y-1.5">
            <li>
              <strong className="text-foreground">Touch Target Size:</strong> The swipe handle area occupies a full-width touch zone (<code className="font-mono">h-6 py-2.5</code>) meeting the 44×44px WCAG touch criteria.
            </li>
            <li>
              <strong className="text-foreground">Scroll Isolation:</strong> When swiping inside scrollable body content, native scrolling takes precedence until the element reaches its top-most scroll offset.
            </li>
            <li>
              <strong className="text-foreground">Focus Containment:</strong> Focus is trapped inside the active popup while modal is true.
            </li>
            <li>
              <strong className="text-foreground">Escape &amp; Scrim Dismissal:</strong> Pressing Esc or tapping outside dismisses the drawer smoothly and returns focus to the initiating element.
            </li>
          </ul>
        </div>

        <div className="pt-2">
          <KeyboardTable rows={KEYBOARD_SHORTCUTS} />
        </div>

        <div className="pt-4 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Touch &amp; Pointer Gesture Mechanics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {GESTURE_CONTROLS.map((g) => (
              <div key={g.gesture} className="p-3 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                <span className="font-medium text-foreground">{g.gesture}</span>
                <p className="text-muted-foreground leading-relaxed">{g.action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Props Specifications */}
      <section id="props" className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
            Props Reference
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            API specifications for <code className="font-mono text-xs">Drawer</code>, <code className="font-mono text-xs">DrawerContent</code>, and supporting compound primitives.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground font-mono">Drawer (Root)</h3>
          <PropsTable rows={DRAWER_ROOT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground font-mono">DrawerContent</h3>
          <PropsTable rows={DRAWER_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground font-mono">DrawerOverlay</h3>
          <PropsTable rows={DRAWER_OVERLAY_PROPS} />
        </div>
      </section>

      {/* 13. Related Components */}
      <footer className="pt-8 border-t border-border/80">
        <h3 className="text-sm font-semibold text-foreground mb-4">Related Overlays &amp; Surfaces</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <Link
            href="/components/sheet"
            className="group rounded-xl border border-border/80 bg-card/50 p-3.5 hover:border-primary/50 transition-colors"
          >
            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Sheet →</div>
            <div className="text-muted-foreground mt-1">Side-docked vertical panel for complex forms and inspectors.</div>
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
