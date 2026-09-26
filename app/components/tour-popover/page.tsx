import { Metadata } from "next";
import { TourPopoverPreviewStage } from "./tour-popover-preview-stage";
import { TourPopoverDemonstrations } from "./tour-popover-demonstrations";
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
  title: "Tour Popover — Overlays & Menus — HaloUI",
  description:
    "An anchored instructional onboarding surface engineered with a controlled tour state machine, dynamic target resolution, collision-aware positioning, missing-target recovery, and HaloUI liquid glass physical optics.",
};

const TOUR_POPOVER_ROOT_PROPS: PropRow[] = [
  {
    name: "steps",
    type: "TourStep[]",
    required: true,
    description: "Ordered array of tour step objects defining instructional content, targets, and placement preferences.",
  },
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled open state of the onboarding tour.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    required: false,
    description: "Initial open state for uncontrolled tour lifecycle.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    required: false,
    description: "Callback invoked whenever the open state changes through user action or completion.",
  },
  {
    name: "currentStep",
    type: "number",
    default: "undefined",
    required: false,
    description: "Controlled zero-based index of the currently active tour step.",
  },
  {
    name: "defaultStep",
    type: "number",
    default: "0",
    required: false,
    description: "Uncontrolled initial step index.",
  },
  {
    name: "onStepChange",
    type: "(index: number, step: TourStep) => void",
    required: false,
    description: "Callback invoked whenever the user advances, goes back, or jumps to a different step.",
  },
  {
    name: "onComplete",
    type: "() => void",
    required: false,
    description: "Callback fired when the user completes the final step of the tour.",
  },
  {
    name: "onSkip",
    type: "() => void",
    required: false,
    description: "Callback fired when the user explicitly dismisses or skips the tour.",
  },
  {
    name: "onMissingTarget",
    type: "(step: TourStep) => void",
    required: false,
    description: "Callback fired when the target element for an active step cannot be resolved in the DOM.",
  },
  {
    name: "missingTargetPolicy",
    type: "'fallback' | 'skip' | 'stop'",
    default: "'fallback'",
    required: false,
    description:
      "Strategy for handling missing target elements: 'fallback' centers popover in viewport with notice, 'skip' auto-advances to next step, and 'stop' gracefully ends tour.",
  },
  {
    name: "scrollToTarget",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to smoothly scroll targets into view when activating a step (respects prefers-reduced-motion).",
  },
  {
    name: "scrollPadding",
    type: "number",
    default: "40",
    required: false,
    description: "Viewport boundary padding in pixels used when evaluating target visibility.",
  },
  {
    name: "modal",
    type: "boolean",
    default: "false",
    required: false,
    description: "When true, applies a subtle Halo Scrim backdrop attenuation to focus attention on the tour.",
  },
  {
    name: "highlightTarget",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to draw an optical accent halo around the active target element (distinct from keyboard focus).",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Liquid glass optical recipe applied to the anchored instructional surface.",
  },
];

const TOUR_STEP_PROPS: PropRow[] = [
  {
    name: "id",
    type: "string",
    required: true,
    description: "Stable unique identifier for the step (used in analytics, debugging, and controlled routing).",
  },
  {
    name: "target",
    type: "string | RefObject<HTMLElement> | HTMLElement",
    required: true,
    description: "Target element identifier (mapped via <TourTarget id='...'>), DOM ID, React ref, or HTMLElement.",
  },
  {
    name: "title",
    type: "ReactNode",
    required: true,
    description: "Primary heading communicating the step's instructional concept.",
  },
  {
    name: "description",
    type: "ReactNode",
    required: true,
    description: "Concise body copy explaining what the feature does and how to interact with it.",
  },
  {
    name: "content",
    type: "ReactNode",
    required: false,
    description: "Optional custom supplemental content rendered between body copy and footer actions.",
  },
  {
    name: "side",
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    required: false,
    description: "Preferred anchor placement relative to the target element.",
  },
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    required: false,
    description: "Alignment along the target's cross-axis.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "12",
    required: false,
    description: "Distance in pixels between the target boundary and the popover surface.",
  },
  {
    name: "nextLabel",
    type: "string",
    default: "'Next'",
    required: false,
    description: "Custom label for the next action button.",
  },
  {
    name: "backLabel",
    type: "string",
    default: "'Back'",
    required: false,
    description: "Custom label for the back action button.",
  },
  {
    name: "finishLabel",
    type: "string",
    default: "'Finish'",
    required: false,
    description: "Custom label for the action button on the final step.",
  },
  {
    name: "hideBack",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to hide the Back button on this specific step.",
  },
  {
    name: "hideSkip",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to hide the Skip button on this specific step.",
  },
  {
    name: "hideClose",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to hide the top-right close icon button on this specific step.",
  },
  {
    name: "badge",
    type: "ReactNode",
    required: false,
    description: "Optional eyebrow badge rendered alongside progress counter.",
  },
];

const TOUR_CONTENT_PROPS: PropRow[] = [
  {
    name: "showCloseButton",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render an integrated accessible top-right icon close button.",
  },
  {
    name: "showProgress",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render the progress indicator ('Step 2 of 4').",
  },
  {
    name: "showNavigation",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render the footer with Back, Next / Finish, and Skip controls.",
  },
  {
    name: "sideOffset",
    type: "number",
    required: false,
    description: "Global override for anchor distance across all steps.",
  },
];

const TOUR_POPOVER_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "tour-popover.tsx",
            type: "file",
            description: "Canonical Tour Popover state machine, target resolution engine, and compound components.",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
        description: "Surface, border, optical highlight, and motion tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Physical liquid glass optical recipes for light and dark environments.",
      },
    ],
  },
];

const TOUR_POPOVER_KEYBOARD_SHORTCUTS = [
  {
    keys: ["Tab"],
    action: "Cycles keyboard focus cleanly between instructional controls (Skip, Back, Next / Finish).",
  },
  {
    keys: ["Shift", "Tab"],
    action: "Cycles keyboard focus backwards between instructional controls.",
  },
  {
    keys: ["Enter", "Space"],
    action: "Activates the focused action button to advance to the next step or complete the tour.",
  },
  {
    keys: ["Escape"],
    action: "Dismisses or skips the active onboarding tour and safely restores focus to the invoking trigger.",
  },
];

export default function TourPopoverPage() {
  return (
    <div className="space-y-12">
      {/* Title & Description */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Overlays &amp; Menus
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Component 15
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            State Machine
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Missing-Target Recovery
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tour Popover
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Guide users through an interface with contextual instructional steps anchored to meaningful UI targets.
          Features a robust tour state machine, dynamic target resolution, collision-aware positioning,
          missing-target recovery, and HaloUI liquid glass physical optics.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <TourPopoverPreviewStage />

      {/* Architectural Distinction Callout */}
      <Callout type="note" title="Architectural Distinction: Tour Popover vs Ordinary Popover">
        <strong>Tour Popover is not merely a generic Popover with Next and Back buttons.</strong> A production onboarding
        system coordinates target element discovery, dynamic lifecycle tracking, viewport collision handling, missing-target
        recovery, focus restoration, and accessible step announcements. It sits cleanly above established Base UI positioning
        primitives without duplicating floating coordinate math.
      </Callout>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Tour Popover directly into your project via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="tour-popover" />
      </div>

      {/* Source Ownership */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Source Ownership &amp; Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tour Popover distributes directly into your codebase as transparent TypeScript source code, giving you full
          ownership over tour state transitions, analytics instrumentation, and persistence strategies.
        </p>
        <SourceOwnershipComparison />
      </div>

      {/* Usage Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Define your step sequence with stable string IDs, register interface targets with <code className="text-xs bg-muted px-1.5 py-0.5 rounded">&lt;TourTarget id="..."&gt;</code>,
          and mount <code className="text-xs bg-muted px-1.5 py-0.5 rounded">&lt;TourPopoverContent /&gt;</code>:
        </p>
        <CodeBlock
          language="tsx"
          filename="tour-demo.tsx"
          code={`import * as React from "react";
import {
  TourPopover,
  TourTarget,
  TourPopoverContent,
  type TourStep,
} from "@/components/ui/tour-popover";
import { Button } from "@/components/ui/button";

const STEPS: TourStep[] = [
  {
    id: "nav-workspace",
    target: "workspace-switcher",
    title: "Workspace Switcher",
    description: "Switch between multiple client accounts and team workspaces from here.",
    side: "bottom",
    align: "start",
  },
  {
    id: "nav-search",
    target: "search-input",
    title: "Instant Search",
    description: "Press ⌘K to open omnisearch across all databases, users, and tokens.",
    side: "bottom",
    align: "center",
  },
  {
    id: "nav-publish",
    target: "publish-btn",
    title: "Deploy Production",
    description: "Publish your changes directly to global edge networks with zero downtime.",
    side: "bottom",
    align: "end",
    finishLabel: "Start Building",
  },
];

export function OnboardingExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <TourPopover
      steps={STEPS}
      open={open}
      onOpenChange={setOpen}
      onComplete={() => console.log("Tour completed")}
    >
      <div className="flex items-center gap-4">
        <TourTarget id="workspace-switcher">
          <Button variant="outline">Acme Corp ▾</Button>
        </TourTarget>

        <TourTarget id="search-input">
          <Button variant="ghost">Search... (⌘K)</Button>
        </TourTarget>

        <TourTarget id="publish-btn">
          <Button variant="default">Publish</Button>
        </TourTarget>
      </div>

      <Button onClick={() => setOpen(true)} className="mt-4">
        Start Tour
      </Button>

      {/* Anchored Liquid Glass Tour Surface */}
      <TourPopoverContent />
    </TourPopover>
  );
}`}
        />
      </div>

      {/* Semantic Comparison Tables */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          When to Use Tour Popover
        </h2>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="p-3 font-semibold text-foreground">Component</th>
                <th className="p-3 font-semibold text-foreground">Primary Purpose</th>
                <th className="p-3 font-semibold text-foreground">Trigger Model</th>
                <th className="p-3 font-semibold text-foreground">Progression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-medium text-foreground">Tour Popover</td>
                <td className="p-3 text-muted-foreground">Anchored step-by-step product walkthroughs</td>
                <td className="p-3 text-muted-foreground">Automated or explicit "Take a tour" CTA</td>
                <td className="p-3 text-muted-foreground">Ordered flow (Next, Back, Finish, Skip)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Popover</td>
                <td className="p-3 text-muted-foreground">Contextual transient interactive controls (filters, settings)</td>
                <td className="p-3 text-muted-foreground">Explicit user click on anchor trigger</td>
                <td className="p-3 text-muted-foreground">None (independent single surface)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Tooltip</td>
                <td className="p-3 text-muted-foreground">Brief supplemental label or keyboard hint</td>
                <td className="p-3 text-muted-foreground">Hover or keyboard focus</td>
                <td className="p-3 text-muted-foreground">None (transient label)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Dialog</td>
                <td className="p-3 text-muted-foreground">Substantial workflow, forms, or high-focus modal tasks</td>
                <td className="p-3 text-muted-foreground">Explicit user invocation</td>
                <td className="p-3 text-muted-foreground">Internal form or wizard state</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Architecture & Lifecycle */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Tour Lifecycle Architecture
        </h2>
        <p className="text-sm text-muted-foreground">
          Tour Popover executes a four-phase lifecycle for every step transition:
        </p>

        <ProcessSteps
          steps={[
            {
              title: "1. Target Registration & Discovery",
              description:
                "Targets register via <TourTarget id='...'> without introducing wrapping DOM nodes. Resolution supports semantic IDs, direct React refs, and DOM queries.",
            },
            {
              title: "2. Lifecycle & Missing-Target Resolution",
              description:
                "The engine validates whether the target is mounted and visible. If missing, it applies the chosen policy ('fallback', 'skip', or 'stop') rather than throwing.",
            },
            {
              title: "3. Collision-Aware Anchored Positioning",
              description:
                "Base UI Positioner computes coordinates with Floating UI autoUpdate. The popover automatically flips along boundaries to prevent viewport clipping.",
            },
            {
              title: "4. Progression & Focus Restoration",
              description:
                "Focus shifts to the Next action for screen reader announcement. Upon completion or dismissal, focus cleanly restores to the invoking trigger.",
            },
          ]}
        />
      </div>

      {/* Deep Demonstrations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Interactive Demonstrations
        </h2>
        <TourPopoverDemonstrations />
      </div>

      {/* Liquid Material */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Liquid Glass Optical Physics
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tour Popover surfaces implement HaloUI's 10-layer physical optical engine:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Specular Meniscus Edge:</strong> Directional optical hairline boundary
            isolating floating text from arbitrary dense application content.
          </li>
          <li>
            <strong className="text-foreground">135° Directional Reflection:</strong> Calibrated top-down specular highlight catch
            creating physical curvature depth.
          </li>
          <li>
            <strong className="text-foreground">Contact &amp; Ambient Shadows:</strong> Multi-stop ambient drop shadows preventing
            visual muddying against dark or colorful backgrounds.
          </li>
          <li>
            <strong className="text-foreground">Target Halo Separation:</strong> The optical accent halo around the target is purely
            decorative (<code className="text-xs bg-muted px-1.5 py-0.5 rounded">pointer-events-none</code>) and never competes with or mimics keyboard focus.
          </li>
        </ul>
      </div>

      {/* Keyboard Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation &amp; Accessibility
        </h2>
        <p className="text-sm text-muted-foreground">
          Tour Popover satisfies WCAG 2.1 AA requirements with accessible dialog semantics, roving focus isolation, and automatic reduced-motion detection:
        </p>
        <KeyboardTable rows={TOUR_POPOVER_KEYBOARD_SHORTCUTS} />
      </div>

      {/* Component Props */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">TourPopover (Root) Props</h3>
          <PropsTable rows={TOUR_POPOVER_ROOT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">TourStep Object Model</h3>
          <PropsTable rows={TOUR_STEP_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">TourPopoverContent Props</h3>
          <PropsTable rows={TOUR_CONTENT_PROPS} />
        </div>
      </div>

      {/* Installed Files */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <p className="text-sm text-muted-foreground">
          Files installed into consumer repositories when adding the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">tour-popover</code> component:
        </p>
        <FileTree items={TOUR_POPOVER_FILES} />
      </div>

      {/* Related Components */}
      <div className="space-y-4 border-t border-border/40 pt-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/components/popover"
            className="group rounded-xl border border-border/60 bg-muted/20 p-4 transition-all hover:bg-muted/40 hover:border-border"
          >
            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Popover →
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              General transient floating surface for filters, menus, and controls.
            </div>
          </Link>

          <Link
            href="/components/tooltip"
            className="group rounded-xl border border-border/60 bg-muted/20 p-4 transition-all hover:bg-muted/40 hover:border-border"
          >
            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Tooltip →
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Brief supplemental label or keyboard shortcut hint on hover/focus.
            </div>
          </Link>

          <Link
            href="/components/stepper"
            className="group rounded-xl border border-border/60 bg-muted/20 p-4 transition-all hover:bg-muted/40 hover:border-border"
          >
            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Stepper →
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Structured linear progress and navigation for multi-step tasks.
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
