import { Metadata } from "next";
import { HoverCardPreviewStage } from "./hover-card-preview-stage";
import { HoverCardDemonstrations } from "./hover-card-demonstrations";
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
  title: "Hover Card — Overlays & Menus — HaloUI",
  description:
    "Supplemental destination or entity preview opened through accessible hover and focus behavior, engineered with HaloUI liquid glass physical optics and uncompromised link navigation semantics.",
};

const HOVER_CARD_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    required: false,
    description: "Preferred placement relative to the trigger element. Automatically shifts or flips to prevent boundary collision.",
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
    description: "Distance in pixels between the anchor trigger and the floating preview card.",
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
    name: "showArrow",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to render a subtle pointing arrow anchored to the trigger.",
  },
  {
    name: "collisionBoundary",
    type: "Boundary",
    default: "'clipping-ancestors'",
    required: false,
    description: "Element or bounding rectangle delimiting the area that the hover card is confined to.",
  },
  {
    name: "collisionPadding",
    type: "number | Padding",
    default: "8",
    required: false,
    description: "Minimum clearance to maintain from viewport and boundary edges.",
  },
];

const HOVER_CARD_ROOT_PROPS: PropRow[] = [
  {
    name: "openDelay",
    type: "number",
    default: "300",
    required: false,
    description: "Delay in milliseconds before opening the card on pointer hover or keyboard focus.",
  },
  {
    name: "closeDelay",
    type: "number",
    default: "200",
    required: false,
    description: "Delay in milliseconds before closing the card when pointer leaves the trigger and content corridor.",
  },
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled open state of the hover card.",
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
    description: "Event handler called when the hover card opens or closes.",
  },
];

const KEYBOARD_SHORTCUTS = [
  { keys: ["Tab"], action: "Moves focus to the trigger anchor, opening the Hover Card after openDelay." },
  { keys: ["Escape"], action: "Immediately dismisses the open Hover Card without blurring the trigger." },
  { keys: ["Enter"], action: "Executes native hyperlink navigation on the anchor trigger." },
  { keys: ["Cmd", "Click"], action: "Opens the destination link in a new tab without interference from hover preview state." },
];

const LIFECYCLE_STEPS = [
  {
    title: "1. Pointer Hover / Keyboard Focus Intent",
    description:
      "Pointer enters the HoverCardTrigger or keyboard Tab focuses the anchor. A 300ms delay timer starts to filter out transient pointer crossing.",
  },
  {
    title: "2. Non-Modal Floating Surface Mounting",
    description:
      "HoverCardContent mounts directly to the document portal without mounting a background scrim. Application content remains 100% visible.",
  },
  {
    title: "3. Pointer Grace Corridor Activation",
    description:
      "A geometric safe corridor connects the trigger and popup. The pointer can cross the gap to read card content without triggering an abrupt close.",
  },
  {
    title: "4. Origin-Anchored Kinematic Reveal",
    description:
      "10-layer Liquid Glass optical physics scale and fade in along the calculated transform origin, providing a tactile, anchored entrance transition.",
  },
  {
    title: "5. Contextual Dismissal & Graceful Departure",
    description:
      "Pointer leaves the corridor or trigger is blurred. A 200ms close delay ensures smooth departure without UI jitter.",
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
          { name: "hover-card.tsx", type: "file" },
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

export default function HoverCardDocsPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Overlays & Menus · Component 06
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Hover Card
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Supplemental destination or entity preview opened through accessible hover and focus behavior, engineered with HaloUI liquid glass physical optics and uncompromised link navigation semantics.
        </p>
      </header>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <HoverCardPreviewStage />
      </section>

      {/* 3. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install Hover Card directly into your repository through the HaloUI shadcn-compatible source registry.
        </p>
        <InstallCommand registry="hover-card" />
      </section>

      {/* 4. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Wrap your semantic anchor link in <code className="text-xs font-mono">HoverCardTrigger</code>. The preview card renders conditionally in the top-level portal while keeping native link activation intact.
        </p>
        <CodeBlock
          language="tsx"
          filename="components/example-hover-card.tsx"
          code={`import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

export function ExampleHoverCard() {
  return (
    <HoverCard openDelay={300} closeDelay={200}>
      <HoverCardTrigger
        href="/authors/ada"
        className="font-medium text-foreground underline decoration-border hover:decoration-foreground"
      >
        @ada_lovelace
      </HoverCardTrigger>
      <HoverCardContent side="bottom" align="center" className="w-80">
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-foreground">Ada Lovelace</h4>
          <p className="text-[11px] text-muted-foreground">Chief Optical Architect</p>
          <p className="text-xs text-muted-foreground pt-1 leading-relaxed">
            Formulating physical liquid optical shaders and accessible UI foundations.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}`}
        />
      </section>

      {/* 5. Core Architectural Principle: Uncompromised Trigger Semantics */}
      <section id="core-principle" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Core Principle: The Trigger Must Remain Self-Sufficient
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hover Cards provide <strong>supplemental context</strong>. They must never be required to understand or operate the interface. If a user cannot access hover (touchscreens, screen readers in linear reading mode, or high-speed cursor gestures), the base trigger text must communicate complete destination meaning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-2">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Good Architecture
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Clearly labeled link: <strong className="text-foreground">&ldquo;View Ada Lovelace&rsquo;s Profile&rdquo;</strong>. Hovering provides supplemental bio details and join date, but clicking immediately navigates to the profile page.
            </p>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-2">
            <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
              Prohibited Anti-Pattern
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mysterious link labeled &ldquo;Click here&rdquo; or a vague icon where the user must open the Hover Card to learn what the link does, or requiring a first click to preview and second click to navigate.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Comparison: Hover Card vs Link Preview vs Tooltip vs Popover */}
      <section id="comparison" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component Matrix: Hover Card vs Link Preview vs Popover vs Tooltip
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Understanding where Hover Card fits across the HaloUI design system:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/40 border-b border-border font-medium text-foreground">
              <tr>
                <th className="p-3.5">Component</th>
                <th className="p-3.5">Primary Role</th>
                <th className="p-3.5">Trigger Semantic</th>
                <th className="p-3.5">Activation</th>
                <th className="p-3.5">Content Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3.5 font-semibold text-foreground">Hover Card</td>
                <td className="p-3.5">General supplemental entity preview</td>
                <td className="p-3.5">Anchor or inline target</td>
                <td className="p-3.5">Hover & Keyboard Focus</td>
                <td className="p-3.5">Profiles, repositories, citations</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-foreground">Link Preview</td>
                <td className="p-3.5">Navigation link with live URL context</td>
                <td className="p-3.5">Hyperlink (<code className="font-mono text-[11px]">&lt;a&gt;</code>)</td>
                <td className="p-3.5">Hover & Keyboard Focus</td>
                <td className="p-3.5">Page title, favicon, OpenGraph card</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-foreground">Popover</td>
                <td className="p-3.5">Intentional interactive surface</td>
                <td className="p-3.5">Button (<code className="font-mono text-[11px]">&lt;button&gt;</code>)</td>
                <td className="p-3.5">Explicit Click / Enter</td>
                <td className="p-3.5">Forms, settings, color pickers</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-foreground">Tooltip</td>
                <td className="p-3.5">Concise icon / control description</td>
                <td className="p-3.5">Interactive control</td>
                <td className="p-3.5">Hover & Keyboard Focus</td>
                <td className="p-3.5">Single-line explanatory label</td>
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
          Hover Card shares the same 10-layer physical optical engine as Popover, Dialog, and Sheet (<code className="text-xs font-mono">halo-liquid-glass-surface</code>). It features a restrained backdrop blur, directional 135° specular catch, and tactile contact shadow with zero application scrim dimming.
        </p>

        <Callout type="note" title="No Scrim Backdrop">
          Hover Card is strictly non-modal and informational. It never renders a scrim overlay or locks document scrolling.
        </Callout>
      </section>

      {/* 8. Touch Devices & Accessibility Warning */}
      <section id="touch-devices" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Touch Device Independence
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hover is not a reliable interaction model on touchscreens. HaloUI adheres to accessible touch principles:
        </p>

        <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside bg-muted/20 p-5 rounded-2xl border border-border/60">
          <li><strong>Zero Tap Hijacking:</strong> Tapping a link trigger on mobile immediately executes navigation. It never requires a first tap to preview and second tap to follow.</li>
          <li><strong>No Critical Data in Previews:</strong> All essential context must be present in the trigger text or on the destination page itself.</li>
          <li><strong>Pointer Grace Corridor:</strong> On desktop, mouse movement between the trigger and the card is safeguarded by an active pointer corridor so the card doesn&apos;t flicker closed.</li>
        </ul>
      </section>

      {/* 9. Sequential Lifecycle Rail */}
      <section id="lifecycle" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Runtime Hover Corridor & Lifecycle
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How Hover Card choreographs hover intent, safe corridor traversal, and dismissal.
        </p>
        <ProcessSteps steps={LIFECYCLE_STEPS} />
      </section>

      {/* 10. Demonstrations */}
      <section id="demonstrations" className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations & Variants
        </h2>
        <HoverCardDemonstrations />
      </section>

      {/* 11. Keyboard Navigation */}
      <section id="keyboard" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation & Focus Restoration
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hover Card supports keyboard accessibility according to WCAG 2.1 AA guidelines without focus hijacking.
        </p>
        <KeyboardTable rows={KEYBOARD_SHORTCUTS} />
      </section>

      {/* 12. Props Reference */}
      <section id="props" className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            HoverCardContent
          </h3>
          <PropsTable rows={HOVER_CARD_CONTENT_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            HoverCard (Root)
          </h3>
          <PropsTable rows={HOVER_CARD_ROOT_PROPS} />
        </div>
      </section>

      {/* 13. Registry & File Manifest */}
      <section id="registry" className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Registry Structure & File Manifest
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hover Card distributes directly to your codebase as standalone TypeScript source code compatible with the shadcn CLI.
        </p>
        <FileTree items={FILE_TREE_DATA} />
        <SourceOwnershipComparison />
      </section>

      {/* 14. Related Components */}
      <section id="related" className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-base font-semibold text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/components/popover"
            className="group p-4 rounded-xl border border-border/60 hover:border-foreground/30 hover:bg-muted/20 transition-all space-y-1"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-primary">
              Popover →
            </span>
            <p className="text-xs text-muted-foreground">
              Anchored interactive floating surface for compact forms and configuration.
            </p>
          </Link>

          <Link
            href="/components/link-preview"
            className="group p-4 rounded-xl border border-border/60 hover:border-foreground/30 hover:bg-muted/20 transition-all space-y-1"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-primary">
              Link Preview →
            </span>
            <p className="text-xs text-muted-foreground">
              Navigation link that reveals concise supplemental destination context.
            </p>
          </Link>

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
        </div>
      </section>
    </div>
  );
}
