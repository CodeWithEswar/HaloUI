import { Metadata } from "next";
import { TooltipPreviewStage } from "./tooltip-preview-stage";
import { TooltipDemonstrations } from "./tooltip-demonstrations";
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
  title: "Tooltip — Overlays & Menus — HaloUI",
  description:
    "Brief contextual label and supplemental help associated with an interface element, engineered with HaloUI Liquid Glass optics, skip-delay provider orchestration, and non-modal focus isolation.",
};

const TOOLTIP_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'top'",
    required: false,
    description: "Preferred placement relative to the trigger. Automatically flips or shifts to avoid collision with viewport edges.",
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
    default: "6",
    required: false,
    description: "Distance in pixels between the anchor element and the floating tooltip content.",
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
    type: "'subtle' | 'balanced'",
    default: "'subtle'",
    required: false,
    description: "Physical liquid glass optical intensity governing specular highlight catch and transmission depth.",
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
    description: "Element or bounding rectangle delimiting the collision avoidance boundary.",
  },
  {
    name: "collisionPadding",
    type: "number | Padding",
    default: "8",
    required: false,
    description: "Minimum clearance to maintain from viewport and boundary edges.",
  },
];

const TOOLTIP_PROVIDER_PROPS: PropRow[] = [
  {
    name: "delay",
    type: "number",
    default: "150",
    required: false,
    description: "Delay in milliseconds before opening tooltips across children when hovered.",
  },
  {
    name: "skipDelayDuration",
    type: "number",
    default: "300",
    required: false,
    description: "Time window in milliseconds during which moving between adjacent tooltips skips delay.",
  },
];

const KEYBOARD_SHORTCUTS = [
  {
    keys: ["Tab"],
    action: "Moves focus to the trigger element. The tooltip appears automatically while focus remains on the trigger.",
  },
  {
    keys: ["Shift", "Tab"],
    action: "Moves focus to the previous focusable element, smoothly dismissing the tooltip.",
  },
  {
    keys: ["Escape"],
    action: "Dismisses the active tooltip without moving focus away from the trigger element.",
  },
];

const TOOLTIP_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "tooltip.tsx",
            type: "file",
            description: "Main Tooltip component with Liquid Glass optics, Provider coordination, and Base UI primitive.",
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
        description: "Shared optical intensity tokens and focus indicator infrastructure.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Canonical 10-layer physical liquid glass optical engine.",
      },
    ],
  },
];

export default function TooltipPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Overlays &amp; Menus · Component 07
          </span>
          <span className="inline-flex items-center rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
            Stable
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tooltip
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Brief contextual label and supplemental help associated with an interface element. Engineered with HaloUI Liquid Glass optics, skip-delay provider orchestration, collision avoidance, and non-modal focus isolation.
        </p>
      </div>

      {/* Interactive Live Preview Stage */}
      <TooltipPreviewStage />

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install the Tooltip primitive via the HaloUI shadcn-compatible registry. Source ownership distributes directly into your repository.
        </p>
        <InstallCommand registry="tooltip" />
      </section>

      {/* Source Ownership Architecture */}
      <section id="source-ownership" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Source Ownership Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI treats your codebase as the permanent owner of component source code rather than locking you into closed node_modules dependencies.
        </p>
        <SourceOwnershipComparison />
      </section>

      {/* Basic Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Import the components and wrap any interactive trigger. When wrapping custom elements or buttons, use <code className="font-mono text-xs">asChild</code> to merge trigger props directly onto your element.
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Copy01Icon } from "@hugeicons/core-free-icons";

export function Example() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Copy to clipboard">
          <HaloIcon icon={Copy01Icon} size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        Copy to clipboard
      </TooltipContent>
    </Tooltip>
  );
}`}
        />
      </section>

      {/* Guidance: When to Use & When Not to Use */}
      <section id="guidance" className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Design Guidance &amp; Semantics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              When to Use Tooltip
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
              <li>Labeling an icon-only button that already has an accessible name (<code className="font-mono text-[11px]">aria-label</code>).</li>
              <li>Explaining an unfamiliar or abbreviated toolbar icon.</li>
              <li>Providing a concise keyboard shortcut hint (<code className="font-mono text-[11px]">⌘C</code>, <code className="font-mono text-[11px]">⌘S</code>).</li>
              <li>Clarifying truncated navigation labels or compact chart indicators.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-500" />
              When Not to Use Tooltip
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
              <li>Essential information required to complete a task (never hide critical instructions in hover).</li>
              <li>Rich previews with avatars, metadata rows, or links (use <Link href="/components/hover-card" className="text-foreground underline">Hover Card</Link>).</li>
              <li>Interactive content with inputs, buttons, or form controls (use <Link href="/components/popover" className="text-foreground underline">Popover</Link>).</li>
              <li>Action lists, commands, or menus (use <Link href="/components/dropdown-menu" className="text-foreground underline">Dropdown Menu</Link>).</li>
            </ul>
          </div>
        </div>

        <Callout type="note">
          <strong>Tooltip is strictly supplemental:</strong> The application must remain completely understandable and operable without the tooltip. Touch-first mobile devices and screen readers must receive equivalent information through native text labels and ARIA attributes.
        </Callout>
      </section>

      {/* Architecture Comparison: Tooltip vs Hover Card vs Popover */}
      <section id="comparisons" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Tooltip vs. Hover Card vs. Popover
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI provides three distinct floating surface primitives. Selecting the correct component preserves semantic fidelity and accessibility:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/60 bg-muted/40 font-semibold text-foreground">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Primary Purpose</th>
                <th className="p-3">Interaction Model</th>
                <th className="p-3">Interactive Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-foreground">Tooltip</td>
                <td className="p-3">Brief label or short contextual hint</td>
                <td className="p-3">Hover and keyboard focus; pointer-events-none</td>
                <td className="p-3 text-destructive font-mono">None (Forbidden)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">
                  <Link href="/components/hover-card" className="hover:underline">Hover Card</Link>
                </td>
                <td className="p-3">Rich supplemental destination or entity preview</td>
                <td className="p-3">Hover and focus; pointer grace corridor</td>
                <td className="p-3 font-mono">Read-only links/badges</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">
                  <Link href="/components/popover" className="hover:underline">Popover</Link>
                </td>
                <td className="p-3">Rich contextual controls, forms, and pickers</td>
                <td className="p-3">Click activation, focus trapping, Escape dismiss</td>
                <td className="p-3 text-emerald-500 font-mono">Full (Inputs, Buttons, Pickers)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sequential Interaction Flow */}
      <section id="interaction-lifecycle" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interaction Lifecycle &amp; Skip-Delay Orchestration
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How HaloUI coordinates delay timers and pointer transitions between adjacent controls:
        </p>

        <ProcessSteps
          steps={[
            {
              title: "Trigger Focus or Hover",
              description: "User tabs to or hovers over the trigger element. The Provider delay timer (150ms) initiates.",
            },
            {
              title: "Optic Reveal Transition",
              description: "Tooltip mounts portalled to body with 10-layer Liquid Glass optics, translating 4px along anchor axis.",
            },
            {
              title: "Skip-Delay Active Window",
              description: "Moving pointer directly to an adjacent trigger displays its tooltip immediately without repeating delay.",
            },
            {
              title: "Graceful Dismissal",
              description: "Blurring the trigger or pressing Escape dismisses the tooltip cleanly without moving DOM focus.",
            },
          ]}
        />
      </section>

      {/* Demonstrations */}
      <section id="demonstrations" className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Component Demonstrations
        </h2>
        <TooltipDemonstrations />
      </section>

      {/* Keyboard Navigation */}
      <section id="keyboard" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Keyboard focus remains strictly on the trigger element. The tooltip is a non-focusable supplemental display:
        </p>
        <KeyboardTable rows={KEYBOARD_SHORTCUTS} />
      </section>

      {/* Component Props */}
      <section id="props" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Component API
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            API reference for TooltipContent and TooltipProvider.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            TooltipContent Props
          </h3>
          <PropsTable rows={TOOLTIP_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            TooltipProvider Props
          </h3>
          <PropsTable rows={TOOLTIP_PROVIDER_PROPS} />
        </div>
      </section>

      {/* File Structure */}
      <section id="file-structure" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Registry File Structure
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Files distributed to consumer codebases during clean registry installation:
        </p>
        <FileTree items={TOOLTIP_FILE_TREE} />
      </section>

      {/* Related Components */}
      <section id="related-components" className="space-y-4 pt-6 border-t border-border/60">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/components/hover-card"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h4 className="text-xs font-semibold text-foreground">Hover Card</h4>
            <p className="text-xs text-muted-foreground">
              Rich supplemental destination preview for entities and links.
            </p>
          </Link>
          <Link
            href="/components/popover"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h4 className="text-xs font-semibold text-foreground">Popover</h4>
            <p className="text-xs text-muted-foreground">
              Anchored floating container for interactive controls and forms.
            </p>
          </Link>
          <Link
            href="/components/button"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h4 className="text-xs font-semibold text-foreground">Button</h4>
            <p className="text-xs text-muted-foreground">
              Action trigger paired with Tooltip for icon-only controls.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
