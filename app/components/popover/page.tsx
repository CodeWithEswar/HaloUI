import { Metadata } from "next";
import { PopoverPreviewStage } from "./popover-preview-stage";
import { PopoverDemonstrations } from "./popover-demonstrations";
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
  title: "Popover — Overlays & Menus — HaloUI",
  description:
    "An anchored transient floating surface engineered with HaloUI liquid glass physical optics, collision-aware boundary positioning, origin-anchored reveal kinematics, and zero backdrop dimming.",
};

const POPOVER_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    required: false,
    description: "Preferred placement relative to the trigger element. Automatically shifts or flips to prevent viewport collision.",
  },
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    required: false,
    description: "Alignment along the anchor's cross-axis.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "8",
    required: false,
    description: "Distance in pixels between the anchor trigger and the floating surface.",
  },
  {
    name: "alignOffset",
    type: "number",
    default: "0",
    required: false,
    description: "Additional offset in pixels along the alignment axis.",
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
    default: "false",
    required: false,
    description: "Whether to render an integrated accessible top-right icon close button with aria-label.",
  },
  {
    name: "collisionBoundary",
    type: "Boundary",
    default: "'clipping-ancestors'",
    required: false,
    description: "Element or bounding rectangle delimiting the area that the popover is confined to.",
  },
  {
    name: "collisionPadding",
    type: "number | Padding",
    default: "8",
    required: false,
    description: "Minimum clearance to maintain from viewport and boundary edges.",
  },
  {
    name: "sticky",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to maintain the popup in the viewport after the anchor is scrolled out of view.",
  },
];

const POPOVER_ROOT_PROPS: PropRow[] = [
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled open state of the popover.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    required: false,
    description: "Uncontrolled initial open state.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean, eventDetails: any) => void",
    default: "undefined",
    required: false,
    description: "Event handler called when the popover is opened or closed.",
  },
  {
    name: "modal",
    type: "boolean | 'trap-focus'",
    default: "false",
    required: false,
    description: "Determines if outside interactions are blocked. Defaults to false (non-modal) in HaloUI.",
  },
];

const KEYBOARD_SHORTCUTS = [
  { keys: ["Escape"], action: "Dismisses the active Popover and restores focus to the trigger element." },
  { keys: ["Tab"], action: "Cycles keyboard focus forward through interactive controls within the Popover." },
  { keys: ["Shift", "Tab"], action: "Cycles keyboard focus backward through interactive controls within the Popover." },
  { keys: ["Enter", "Space"], action: "Activates the PopoverTrigger to toggle the floating surface." },
];

const LIFECYCLE_STEPS = [
  {
    title: "1. Intentional Trigger Activation",
    description:
      "The user explicitly clicks or keyboard-activates the PopoverTrigger. The trigger's DOM bounding rect is registered for anchor calculation.",
  },
  {
    title: "2. Non-Modal Floating Portal Mounting",
    description:
      "PopoverContent mounts to the top-level portal without a blocking scrim backdrop. Surrounding page elements remain contextually visible and interactable.",
  },
  {
    title: "3. Collision Avoidance & Transform Origin",
    description:
      "Anchor positioning computes preferred side and alignment. If boundary collision is detected, the surface flips to the opposing axis and sets --transform-origin.",
  },
  {
    title: "4. Origin-Anchored Kinematic Reveal",
    description:
      "10-layer Liquid Glass optical physics scale and fade in along the calculated transform origin, providing a tactile, anchored entrance transition.",
  },
  {
    title: "5. Contextual Dismissal & Focus Restoration",
    description:
      "Clicking outside, pressing Escape, or completing a form action dismisses the surface. Focus is cleanly restored to the original trigger without scroll jumping.",
  },
];

const FILE_TREE_DATA: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "popover.tsx", type: "file" },
          { name: "button.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      { name: "halo-tokens.css", type: "file" },
      { name: "halo-material.css", type: "file" },
    ],
  },
];

export default function PopoverDocsPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Overlays & Menus · Component 05
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Popover
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          An anchored transient floating surface engineered with HaloUI liquid glass physical optics, collision-aware boundary positioning, origin-anchored reveal kinematics, and zero backdrop dimming.
        </p>
      </header>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <PopoverPreviewStage />
      </section>

      {/* 3. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install Popover directly into your repository through the HaloUI shadcn-compatible source registry.
        </p>
        <InstallCommand registry="popover" />
      </section>

      {/* 4. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Import and compose Popover with standard declarative markup. The trigger wraps your interactive button, and the content anchors automatically.
        </p>
        <CodeBlock
          language="tsx"
          filename="components/example-popover.tsx"
          code={`import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function ExamplePopover() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open Settings</Button>} />
      <PopoverContent side="bottom" align="center" className="w-80">
        <PopoverHeader>
          <PopoverTitle>Contextual Controls</PopoverTitle>
          <PopoverDescription>
            Adjust runtime configuration for the active workspace.
          </PopoverDescription>
        </PopoverHeader>
        {/* Interactive content */}
      </PopoverContent>
    </Popover>
  );
}`}
        />
      </section>

      {/* 5. When to Use vs When Not to Use */}
      <section id="usage-guidance" className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage Guidance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-500" />
              When to use Popover
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
              <li>Contextual settings, small configuration panels, and parameter tuning.</li>
              <li>Compact forms such as URL editing, webhook tokens, and dimensions.</li>
              <li>Color swatch pickers, date selections, and nested filter criteria.</li>
              <li>Interactive secondary actions requiring more structure than a menu item.</li>
              <li>Surfaces where the surrounding interface must remain visible and accessible.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-rose-500" />
              When NOT to use Popover
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
              <li>High-consequence destructive actions (use <Link href="/components/alert-dialog" className="text-foreground underline">Alert Dialog</Link>).</li>
              <li>Substantial modal forms or multi-step workflows (use <Link href="/components/dialog" className="text-foreground underline">Dialog</Link>).</li>
              <li>Touch-oriented slide-overs and mobile drawers (use <Link href="/components/drawer" className="text-foreground underline">Drawer</Link>).</li>
              <li>Short passive labels with no interactive content (use Tooltip).</li>
              <li>Passive entity previews triggered solely on hover (use <Link href="/components/hover-card" className="text-foreground underline">Hover Card</Link>).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Comparison: Popover vs Tooltip vs Hover Card */}
      <section id="overlay-comparison" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component Matrix: Popover vs Tooltip vs Hover Card
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Floating transient overlays differ fundamentally in activation mechanism, accessibility requirements, and internal interactivity.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/40 border-b border-border font-medium text-foreground">
              <tr>
                <th className="p-3.5">Trait</th>
                <th className="p-3.5">Tooltip</th>
                <th className="p-3.5">Popover</th>
                <th className="p-3.5">Hover Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3.5 font-medium text-foreground">Activation Model</td>
                <td className="p-3.5">Hover & keyboard focus</td>
                <td className="p-3.5 font-semibold text-foreground">Deliberate click or Enter/Space</td>
                <td className="p-3.5">Hover & keyboard focus</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-foreground">Content Complexity</td>
                <td className="p-3.5">Short plain text label</td>
                <td className="p-3.5 font-semibold text-foreground">Rich structured content & controls</td>
                <td className="p-3.5">Rich supplemental destination preview</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-foreground">Internal Interactivity</td>
                <td className="p-3.5">None (passive read-only)</td>
                <td className="p-3.5 font-semibold text-foreground">Full (Inputs, Buttons, Sliders)</td>
                <td className="p-3.5">Passive / informational preview</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-foreground">Focus Trapping</td>
                <td className="p-3.5">No</td>
                <td className="p-3.5 font-semibold text-foreground">Contextual tab sequence</td>
                <td className="p-3.5">No focus hijacking</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-foreground">Task Completion Dependency</td>
                <td className="p-3.5">Non-essential clarification</td>
                <td className="p-3.5 font-semibold text-foreground">Can contain active task controls</td>
                <td className="p-3.5">Strictly supplemental; trigger must be self-sufficient</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Liquid Glass Material Architecture */}
      <section id="liquid-material" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Liquid Glass Optical Foundation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI Popover does not invent ad-hoc glass CSS or generic semi-transparent rectangles. It directly reuses the canonical 10-layer physical optical material engine (<code className="text-xs font-mono">halo-liquid-glass-surface</code>), ensuring uniform refractive consistency across Light and Dark themes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1.5">
            <span className="text-xs font-mono font-medium text-foreground">Subtle Intensity</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Restrained 8px blur with 40% specular reflection multiplier. Tailored for calm, high-density interfaces.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1.5">
            <span className="text-xs font-mono font-medium text-foreground">Balanced (Default)</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Canonical 16px blur with 85% specular highlight and opposing inner darkness for high-detail contrast.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1.5">
            <span className="text-xs font-mono font-medium text-foreground">Rich Intensity</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Deep 28px blur with 120% specular gleam, designed for focal presentation cards and high-contrast showcases.
            </p>
          </div>
        </div>

        <Callout type="note" title="Zero Scrim Architecture">
          Unlike modal Dialogs and Sheets, ordinary Popovers do not mount a background scrim (<code className="text-xs font-mono">HaloScrim</code>) and do not darken the surrounding application. The surface floats contextually above content with tactile contact shadows.
        </Callout>
      </section>

      {/* 8. Sequential Lifecycle Rail */}
      <section id="lifecycle" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Runtime Positioning & Lifecycle Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How Popover coordinates trigger metrics, collision avoidance, portal mounting, and keyboard dismissal.
        </p>
        <ProcessSteps steps={LIFECYCLE_STEPS} />
      </section>

      {/* 9. Comprehensive Demonstrations */}
      <section id="demonstrations" className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations & Variants
        </h2>
        <PopoverDemonstrations />
      </section>

      {/* 10. Keyboard Accessibility */}
      <section id="keyboard" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation & Focus Ring Separation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Popover complies with WCAG 2.1 AA keyboard operation. Interactive form inputs within Popover receive high-contrast focus rings (<code className="text-xs font-mono">halo-focus-ring</code>) that remain visually distinct from the Liquid Glass specular boundary.
        </p>
        <KeyboardTable rows={KEYBOARD_SHORTCUTS} />
      </section>

      {/* 11. Props Reference */}
      <section id="props" className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            PopoverContent
          </h3>
          <PropsTable rows={POPOVER_CONTENT_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            Popover (Root)
          </h3>
          <PropsTable rows={POPOVER_ROOT_PROPS} />
        </div>
      </section>

      {/* 12. Registry & Source Distribution */}
      <section id="registry" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Registry Structure & File Manifest
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Popover distributes directly to your codebase as standalone TypeScript source code without external black-box runtime dependencies.
        </p>
        <FileTree items={FILE_TREE_DATA} />
        <SourceOwnershipComparison />
      </section>

      {/* 13. Related Components */}
      <section id="related" className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-base font-semibold text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/components/dialog"
            className="group p-4 rounded-xl border border-border/60 hover:border-foreground/30 hover:bg-muted/20 transition-all space-y-1"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-primary">
              Dialog →
            </span>
            <p className="text-xs text-muted-foreground">
              Accessible modal task surface with calibrated optical scrim diffusion.
            </p>
          </Link>

          <Link
            href="/components/sheet"
            className="group p-4 rounded-xl border border-border/60 hover:border-foreground/30 hover:bg-muted/20 transition-all space-y-1"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-primary">
              Sheet →
            </span>
            <p className="text-xs text-muted-foreground">
              Edge-anchored overlay panel with directional slide kinetics and concentric meniscus curvature.
            </p>
          </Link>

          <Link
            href="/components/drawer"
            className="group p-4 rounded-xl border border-border/60 hover:border-foreground/30 hover:bg-muted/20 transition-all space-y-1"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-primary">
              Drawer →
            </span>
            <p className="text-xs text-muted-foreground">
              Touch-friendly bottom sheet engineered with gesture swipe dismissal and snap points.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
