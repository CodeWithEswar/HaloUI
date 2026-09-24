import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ToggleGroupPreviewStage } from "./toggle-group-preview-stage";
import {
  ToggleGroupSinglePreview,
  ToggleGroupMultiPreview,
  ToggleGroupMiddleFocusPreview,
  ToggleGroupStateMatrixPreview,
  ToggleGroupGeometryPreview,
  ToggleGroupVariantsPreview,
  ToggleGroupSizesPreview,
  ToggleGroupOrientationPreview,
  ToggleGroupControlledPreview,
  ToggleGroupKeyboardPreview,
} from "./toggle-group-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Toggle Group — Actions",
  description: "A coordinated set of toggle controls for selecting one or multiple related options.",
};

const PROPS_DATA = [
  {
    name: "type",
    type: '"single" | "multiple"',
    default: '"single"',
    required: false,
    description: "Determines selection mode: 'single' coordinates one-of-many selection; 'multiple' permits independent combinations.",
  },
  {
    name: "value",
    type: "string | string[]",
    default: "undefined",
    required: false,
    description: "Controlled selection value. String for single mode, array of strings for multiple mode.",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    default: "undefined",
    required: false,
    description: "Initial selection value for uncontrolled usage.",
  },
  {
    name: "onValueChange",
    type: "(value: any) => void",
    default: "undefined",
    required: false,
    description: "Event callback fired when selection changes. Passes string in single mode, array of strings in multiple mode.",
  },
  {
    name: "spacing",
    type: '"connected" | "separated"',
    default: '"connected"',
    required: false,
    description: "Geometry style: 'connected' collapses inner radii and overlaps 1px seams; 'separated' introduces discrete gaps.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    required: false,
    description: "Spatial direction. Automatically aligns arrow keys and collapse vectors.",
  },
  {
    name: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    required: false,
    description: "Material visual style propagated to all child items unless overridden individually.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Dimension tier propagated to all child items (sm: 32px, default: 40px, lg: 48px).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction across the entire group while preserving active state visibility.",
  },
];

const ITEM_PROPS_DATA = [
  {
    name: "value",
    type: "string",
    default: "—",
    required: true,
    description: "Stable semantic string value identifying this item within the group. Mandatory.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents user interaction on this specific item.",
  },
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
    required: false,
    description: "Mandatory accessible name when rendering icon-only toggles without visible text.",
  },
  {
    name: "variant",
    type: '"default" | "outline"',
    default: "inherited",
    required: false,
    description: "Overrides parent group's visual variant for this item.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: "inherited",
    required: false,
    description: "Overrides parent group's dimension tier for this item.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Group Root",
    selector: "div[data-slot='toggle-group']",
    description: "Base UI ToggleGroup container providing role='group', roving tabindex management, and orientation coordinates.",
  },
  {
    name: "Group Item",
    selector: "button[data-slot='toggle-group-item']",
    description: "Selectable action button equipped with HaloUI 10-layer physical liquid optical material and persistent aria-pressed state.",
  },
  {
    name: "Connected Seam",
    selector: "[&>[data-slot=toggle]:not(:first-child)]:-ms-px",
    description: "1px overlapping border seam that eliminates thick double boundaries between adjoining items.",
  },
  {
    name: "Halo Focus Perimeter",
    selector: ".halo-focus-ring:focus-visible",
    description: "Dual-contrast focus ring elevated to z-20 above neighboring items so the perimeter is never clipped.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Registry Dependencies",
    items: ["toggle"],
  },
  {
    title: "npm Dependencies",
    items: [
      "@base-ui/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
];

const INSTALLED_FILES_DATA: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "toggle-group.tsx",
            type: "file",
            description: "ToggleGroup container and ToggleGroupItem composite components.",
          },
          {
            name: "toggle.tsx",
            type: "file",
            description: "Core two-state Toggle primitive, variants, and accessible state engine.",
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
        description: "10-layer liquid optical physics, halo-focus-ring, and halo-tactile-press.",
      },
    ],
  },
];

export default function ToggleGroupPage() {
  return (
    <div className="space-y-12">
      {/* Title + Subtitle Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Toggle Group
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          A coordinated set of toggle controls for selecting one or multiple related options.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <ToggleGroupPreviewStage />

      {/* Important Callout */}
      <Callout type="important" title="Toggle Group coordinates persistent selection across related toggle items">
        <div className="space-y-2 text-xs leading-relaxed">
          <p>
            • <strong>Toggle Group vs Button Group:</strong> Button Group clusters independent actions that execute immediately and return to rest. Toggle Group coordinates persistent pressed states (<code className="font-mono text-[11px]">aria-pressed</code>).
          </p>
          <p>
            • <strong>Toggle Group vs Radio Group:</strong> Radio Group is designed for form data submission where one option is selected. Toggle Group is tailored for immediate toolbars, view switchers, and layout controls.
          </p>
          <p>
            • <strong>Toggle Group vs Tabs:</strong> Tabs navigate between distinct panels of content (<code className="font-mono text-[11px]">role="tablist"</code>). Toggle Group modifies options, modes, or attributes within the same view.
          </p>
        </div>
      </Callout>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="http://localhost:3000/r/toggle-group.json" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Import <code className="text-foreground font-mono text-xs">ToggleGroup</code> and <code className="text-foreground font-mono text-xs">ToggleGroupItem</code> to create accessible tool clusters.
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <HaloIcon icon={TextAlignLeftIcon} size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <HaloIcon icon={TextAlignCenterIcon} size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <HaloIcon icon={TextAlignRightIcon} size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}`}
        />
      </div>

      {/* Single Selection */}
      <div className="space-y-4">
        <h2 id="single-selection" className="text-xl font-semibold tracking-tight text-foreground">
          Single selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In single selection mode (<code className="text-foreground font-mono text-xs">type="single"</code>), selecting an item unpresses any previously selected item. Crucially, clicking the active item again deselects it, resulting in an empty selection (<code className="text-foreground font-mono text-xs">""</code>). This preserves genuine toggle ergonomics rather than forcing a selection.
        </p>
        <ToggleGroupSinglePreview />
      </div>

      {/* Multiple Selection */}
      <div className="space-y-4">
        <h2 id="multiple-selection" className="text-xl font-semibold tracking-tight text-foreground">
          Multiple selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In multiple selection mode (<code className="text-foreground font-mono text-xs">type="multiple"</code>), any combination of items can be pressed simultaneously. State is represented as an array of string values.
        </p>
        <ToggleGroupMultiPreview />
      </div>

      {/* Controlled */}
      <div className="space-y-4">
        <h2 id="controlled" className="text-xl font-semibold tracking-tight text-foreground">
          Controlled
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pass <code className="text-foreground font-mono text-xs">value</code> and <code className="text-foreground font-mono text-xs">onValueChange</code> to synchronize selection with external state.
        </p>
        <ToggleGroupControlledPreview />
      </div>

      {/* Uncontrolled */}
      <div className="space-y-4">
        <h2 id="uncontrolled" className="text-xl font-semibold tracking-tight text-foreground">
          Uncontrolled
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For self-managed selection, pass <code className="text-foreground font-mono text-xs">defaultValue</code>. Toggle Group internally manages selection state through the underlying accessible primitive.
        </p>
        <CodeBlock
          language="tsx"
          code={`<ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
</ToggleGroup>`}
        />
      </div>

      {/* Orientation */}
      <div className="space-y-4">
        <h2 id="orientation" className="text-xl font-semibold tracking-tight text-foreground">
          Orientation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toggle Group supports both horizontal toolbars and vertical toolboxes (<code className="text-foreground font-mono text-xs">orientation="vertical"</code>). Vertical orientation automatically configures vertical border collapsing and reorients arrow key navigation to Up/Down.
        </p>
        <ToggleGroupOrientationPreview />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="text-xl font-semibold tracking-tight text-foreground">
          Variants
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose between <code className="text-foreground font-mono text-xs">default</code> (HaloUI 10-layer physical liquid optical glass) and <code className="text-foreground font-mono text-xs">outline</code>.
        </p>
        <ToggleGroupVariantsPreview />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="text-xl font-semibold tracking-tight text-foreground">
          Sizes
        </h2>
        <p className="text-sm text-muted-foreground">
          Available across three unified action dimension tiers: <code className="text-foreground font-mono text-xs">sm</code> (32px), <code className="text-foreground font-mono text-xs">default</code> (40px), and <code className="text-foreground font-mono text-xs">lg</code> (48px).
        </p>
        <ToggleGroupSizesPreview />
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h2 id="with-icons" className="text-xl font-semibold tracking-tight text-foreground">
          With icons
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toggle Group Items support icon-only, text-only, and composite icon + text layouts. When rendering icon-only items without visible text, providing an <code className="text-foreground font-mono text-xs">aria-label</code> is mandatory.
        </p>
        <ToggleGroupGeometryPreview />
      </div>

      {/* States & Centerpiece Focus */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 id="states" className="text-xl font-semibold tracking-tight text-foreground">
            States & middle-item focus
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The centerpiece engineering challenge in connected groups is middle-item focus: the dual-contrast <strong>Halo Focus Ring</strong> must elevate to <code className="text-foreground font-mono text-xs">z-20</code> outside the physical boundary without being clipped by adjoining Left or Right siblings. Simultaneously, the active selected item sits at <code className="text-foreground font-mono text-xs">z-[5]</code> with optical inset displacement.
          </p>
        </div>

        {/* Centerpiece Middle Focus Preview */}
        <ToggleGroupMiddleFocusPreview />

        {/* State Matrix Table */}
        <ToggleGroupStateMatrixPreview />
      </div>

      {/* Composition */}
      <div className="space-y-4">
        <h2 id="composition" className="text-xl font-semibold tracking-tight text-foreground">
          Composition
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Items can be composed with text labels and secondary indicators. Group-level props (<code className="text-foreground font-mono text-xs">variant</code>, <code className="text-foreground font-mono text-xs">size</code>, <code className="text-foreground font-mono text-xs">disabled</code>) automatically cascade to all children via Context, while individual items can override them when needed.
        </p>
        <CodeBlock
          language="tsx"
          code={`<ToggleGroup type="single" defaultValue="list" size="sm" variant="outline">
  <ToggleGroupItem value="list">
    <span>List view</span>
  </ToggleGroupItem>
  <ToggleGroupItem value="grid">
    <span>Grid view</span>
  </ToggleGroupItem>
</ToggleGroup>`}
        />
      </div>

      {/* Keyboard Behavior */}
      <div className="space-y-4">
        <h2 id="keyboard-behavior" className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toggle Group implements WAI-ARIA group semantics with built-in roving tabindex. When tabbing into the group, focus lands on the selected item (or the first item if none is selected). Arrow keys navigate seamlessly between items without leaving the group.
        </p>
        <ToggleGroupKeyboardPreview />
      </div>

      {/* Props */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
            ToggleGroup Props
          </h2>
          <PropsTable rows={PROPS_DATA} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium tracking-tight text-foreground">
            ToggleGroupItem Props
          </h3>
          <PropsTable rows={ITEM_PROPS_DATA} />
        </div>
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <div className="rounded-xl border border-border/50 bg-muted/20 p-5 space-y-3 text-sm leading-relaxed">
          <p className="text-foreground font-medium">Built-in Accessibility Features:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-xs">
            <li>
              <strong>WAI-ARIA Roving Tabindex:</strong> The group acts as a single tab stop (<code className="text-foreground font-mono text-[11px]">tabindex="0"</code> on the active item, <code className="text-foreground font-mono text-[11px]">tabindex="-1"</code> on others), preventing excessive tab navigation across large toolbars.
            </li>
            <li>
              <strong>Directional Arrow Navigation:</strong> Horizontal groups navigate with <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">Left</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">Right</kbd> arrow keys. Vertical groups navigate with <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">Up</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">Down</kbd>.
            </li>
            <li>
              <strong>Home and End Keys:</strong> Pressing <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">Home</kbd> jumps directly to the first enabled item; <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">End</kbd> jumps to the last.
            </li>
            <li>
              <strong>Persistent Programmatic State:</strong> Items accurately reflect active selections via <code className="text-foreground font-mono text-[11px]">aria-pressed="true"</code> and <code className="text-foreground font-mono text-[11px]">data-pressed</code>.
            </li>
          </ul>
        </div>
      </div>

      {/* Responsive Behavior */}
      <div className="space-y-4">
        <h2 id="responsive-behavior" className="text-xl font-semibold tracking-tight text-foreground">
          Responsive behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toggle Group preserves its orientation and connected geometry without unexpected wrapping breaks. On mobile viewports, touch targets remain generous (min 32px height) and state matrices stack cleanly into mobile cards.
        </p>
      </div>

      {/* Motion */}
      <div className="space-y-4">
        <h2 id="motion" className="text-xl font-semibold tracking-tight text-foreground">
          Motion
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tactile press uses <code className="text-foreground font-mono text-xs">halo-tactile-press</code> for pointer-down feedback. Selection transitions occur over a smooth 200ms ease-out curve, simplifying instantly under <code className="text-foreground font-mono text-xs">prefers-reduced-motion: reduce</code> while keeping all optical state distinctions intact.
        </p>
      </div>

      {/* Performance */}
      <div className="space-y-4">
        <h2 id="performance" className="text-xl font-semibold tracking-tight text-foreground">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Zero JavaScript layout measurement, no resize observers, and no per-instance animation loops. Roving focus and keyboard events are handled through the lightweight Base UI composite engine.
        </p>
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 id="dependencies" className="text-xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </div>

      {/* Installed Files */}
      <div className="space-y-4">
        <h2 id="installed-files" className="text-xl font-semibold tracking-tight text-foreground">
          Installed files
        </h2>
        <FileTree items={INSTALLED_FILES_DATA} />
      </div>

      {/* Related Components */}
      <div className="space-y-4">
        <h2 id="related" className="text-xl font-semibold tracking-tight text-foreground">
          Related components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/components/toggle"
            className="group block rounded-xl border border-border/60 bg-muted/20 p-4 transition-all duration-200 hover:border-foreground/30 hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Toggle</span>
              <HaloIcon
                icon={ArrowRight01Icon}
                size={16}
                className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              A standalone two-state action control with persistent pressed state.
            </p>
          </Link>

          <Link
            href="/components/button-group"
            className="group block rounded-xl border border-border/60 bg-muted/20 p-4 transition-all duration-200 hover:border-foreground/30 hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Button Group</span>
              <HaloIcon
                icon={ArrowRight01Icon}
                size={16}
                className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Visually clusters independent action buttons without persistent selection.
            </p>
          </Link>
        </div>
      </div>

      {/* Changelog */}
      <div className="space-y-4">
        <h2 id="changelog" className="text-xl font-semibold tracking-tight text-foreground">
          Changelog
        </h2>
        <div className="rounded-xl border border-border/40 bg-muted/10 p-4 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">v1.0.0 — Actions 06 Release</span>
            <span className="text-muted-foreground">2026-09-24</span>
          </div>
          <p className="text-muted-foreground">
            Initial release of ToggleGroup and ToggleGroupItem. Features single and multiple selection modes, Base UI roving tabindex keyboard navigation, connected and separated geometry, and unclipped z-20 Halo Focus Ring layering.
          </p>
        </div>
      </div>
    </div>
  );
}
