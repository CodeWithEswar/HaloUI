import * as React from "react";
import type { Metadata } from "next";
import { SegmentedControlPreviewStage } from "./segmented-control-preview-stage";
import {
  SegmentedControlDefaultPreview,
  SegmentedControlIconOnlyPreview,
  SegmentedControlIconTextPreview,
  SegmentedControlSizesPreview,
  SegmentedControlFullWidthPreview,
  SegmentedControlDisabledPreview,
  SegmentedControlStatesPreview,
} from "./segmented-control-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Segmented Control — Actions",
  description:
    "A compact control for switching between a small set of mutually exclusive modes or values.",
};

const PROPS_DATA = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Controlled value of the currently selected segment. Component operates in controlled mode when supplied.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Initial selected segment value for uncontrolled usage.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "undefined",
    required: false,
    description:
      "Event handler invoked whenever the user selects a different segment.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description:
      "Shared segment geometry: 'sm' (28px item), 'default' (34px item), or 'lg' (40px item).",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "When true, stretches the segmented control to fill the container and distributes segments equally.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    required: false,
    description:
      "Spatial orientation of the segmented control. Horizontal is the canonical presentation.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Disables all segments within the control while preserving current selection visibility.",
  },
];

const ITEM_PROPS_DATA = [
  {
    name: "value",
    type: "string",
    default: "—",
    required: true,
    description:
      "Stable semantic value identifying the segment (e.g. 'list', 'grid', 'compact').",
  },
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Mandatory accessible label when the segment contains only an icon glyph without visible text.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Disables this individual segment from pointer and keyboard interaction.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: "inherited",
    required: false,
    description:
      "Optional override for individual item size geometry.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "SegmentedControl (Root)",
    description:
      "The outer track container with role='radiogroup', providing a recessed optical background and managing roving keyboard tabindex.",
  },
  {
    name: "SegmentedControlItem",
    description:
      "Interactive option button with role='radio' and aria-checked, representing a mutually exclusive mode or value.",
  },
  {
    name: "Selected Substrate",
    description:
      "High-contrast elevated material body with subtle specular hairline and shadow anchoring, distinguishing the active choice without relying on color alone.",
  },
  {
    name: "Halo Focus Ring",
    description:
      "Dual-contrast focus perimeter pinned strictly to the keyboard-focused item, operating independently from the selected state.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Runtime Dependencies",
    items: [
      "@base-ui/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Registry Dependencies",
    items: ["halo-icon"],
  },
  {
    title: "HaloUI Foundation Tokens",
    items: [
      "halo-focus-ring",
      "halo-tactile-press",
      "--halo-focus-color",
      "--halo-focus-offset",
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
            name: "segmented-control.tsx",
            type: "file",
            description: "Mutually exclusive mode/value selection primitive.",
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
        description: "Focus ring and optical physics foundation tokens.",
      },
    ],
  },
];

export default function SegmentedControlDocsPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest">
            Actions · 11
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Production Ready
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Segmented Control
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A compact control for switching between a small set of mutually exclusive modes or values.
          Powered by Base UI&apos;s accessible radiogroup primitives with roving tabindex arrow key navigation,
          strict single selection (no empty selection), and HaloUI&apos;s restrained optical materials.
        </p>
      </div>

      {/* Critical Principle Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Callout type="note" title="Mutually Exclusive Mode Selection">
          <strong>Segmented Control represents one selected mode from a compact set of peers.</strong>{" "}
          Use <em>Toggle Group</em> when multiple options may remain selected simultaneously, <em>Tabs</em> for
          content-panel navigation, and <em>Radio Group</em> for explicit form-style field choices.
        </Callout>

        <Callout type="warning" title="Non-Empty Selection Contract">
          <strong>A mode cannot be &ldquo;nothing.&rdquo;</strong> Unlike single-select Toggle Groups which can
          deselect the active option on click, Segmented Control guarantees that exactly one option remains selected
          at all times. Clicking the currently active segment maintains its selected state.
        </Callout>
      </div>

      {/* Interactive Preview Stage */}
      <div className="space-y-4">
        <h2 id="preview" className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Stage
        </h2>
        <SegmentedControlPreviewStage />
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="segmented-control" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Import <code className="text-foreground font-mono text-xs">SegmentedControl</code> and{" "}
          <code className="text-foreground font-mono text-xs">SegmentedControlItem</code>. Pass a controlled{" "}
          <code className="text-foreground font-mono text-xs">value</code> and{" "}
          <code className="text-foreground font-mono text-xs">onValueChange</code>, or use{" "}
          <code className="text-foreground font-mono text-xs">defaultValue</code> for uncontrolled mode.
        </p>
        <CodeBlock
          language="tsx"
          code={`import * as React from "react";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";

export function ViewSelector() {
  const [view, setView] = React.useState("grid");

  return (
    <SegmentedControl
      value={view}
      onValueChange={setView}
      aria-label="View display mode"
    >
      <SegmentedControlItem value="list">List</SegmentedControlItem>
      <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
      <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
    </SegmentedControl>
  );
}`}
        />
      </div>

      {/* Selection Model */}
      <div className="space-y-4">
        <h2 id="selection-model" className="text-xl font-semibold tracking-tight text-foreground">
          Selection Model
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Segmented Control enforces strict <strong>mutual exclusivity</strong>. Only one segment can be active at a time.
          Selecting option B immediately deselects option A. Furthermore, the selection contract is non-empty: activating
          the current segment will never toggle it off.
        </p>
        <div className="p-4 rounded-xl border border-border bg-muted/20">
          <SegmentedControlDefaultPreview />
        </div>
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </div>

      {/* Demonstrations */}
      <div className="space-y-10">
        <h2 id="examples" className="text-2xl font-bold tracking-tight text-foreground">
          Examples
        </h2>

        {/* 1. Icon-Only */}
        <div className="space-y-3">
          <h3 id="icon-only" className="text-lg font-semibold tracking-tight text-foreground">
            1. Icon-Only Presentation
          </h3>
          <p className="text-sm text-muted-foreground">
            Compact icon-only segments. For accessibility compliance, every icon-only segment must provide an{" "}
            <code className="text-foreground font-mono text-xs">aria-label</code> describing its function.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <SegmentedControlIconOnlyPreview />
          </div>
        </div>

        {/* 2. Icon + Text */}
        <div className="space-y-3">
          <h3 id="icon-text" className="text-lg font-semibold tracking-tight text-foreground">
            2. Icon + Text Composition
          </h3>
          <p className="text-sm text-muted-foreground">
            Segments composed with both an icon glyph and descriptive text label for high visual clarity.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <SegmentedControlIconTextPreview />
          </div>
        </div>

        {/* 3. Sizes */}
        <div className="space-y-3">
          <h3 id="sizes" className="text-lg font-semibold tracking-tight text-foreground">
            3. Standard Sizes
          </h3>
          <p className="text-sm text-muted-foreground">
            Three standardized size scales matching the HaloUI Actions ergonomics:{" "}
            <code className="text-foreground font-mono text-xs">sm</code> (28px),{" "}
            <code className="text-foreground font-mono text-xs">default</code> (34px), and{" "}
            <code className="text-foreground font-mono text-xs">lg</code> (40px).
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <SegmentedControlSizesPreview />
          </div>
        </div>

        {/* 4. Full Width */}
        <div className="space-y-3">
          <h3 id="full-width" className="text-lg font-semibold tracking-tight text-foreground">
            4. Full Width Layout
          </h3>
          <p className="text-sm text-muted-foreground">
            With <code className="text-foreground font-mono text-xs">fullWidth</code>, the track expands to 100% of the
            parent container width and distributes all segments equally.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <SegmentedControlFullWidthPreview />
          </div>
        </div>

        {/* 5. Disabled States */}
        <div className="space-y-3">
          <h3 id="disabled-states" className="text-lg font-semibold tracking-tight text-foreground">
            5. Disabled States
          </h3>
          <p className="text-sm text-muted-foreground">
            Disabling the entire control versus disabling individual locked segments. In both cases, the active selection
            remains clear and readable while interaction is suppressed.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <SegmentedControlDisabledPreview />
          </div>
        </div>

        {/* 6. State Spectrum */}
        <div className="space-y-3">
          <h3 id="states" className="text-lg font-semibold tracking-tight text-foreground">
            6. Interactive State Spectrum
          </h3>
          <p className="text-sm text-muted-foreground">
            Focus is strictly separated from selection. A focused unselected segment receives a high-contrast focus ring
            without faking selection, and a focused selected segment retains both its selected body and focus ring.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <SegmentedControlStatesPreview />
          </div>
        </div>
      </div>

      {/* Keyboard Behavior */}
      <div className="space-y-4">
        <h2 id="keyboard-behavior" className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard Behavior
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-foreground">
                <th className="py-2.5 px-3 font-semibold">Key</th>
                <th className="py-2.5 px-3 font-semibold">Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="py-2.5 px-3 font-mono text-xs text-foreground">Tab</td>
                <td className="py-2.5 px-3">Enters or exits the Segmented Control. Focus lands on the currently selected segment.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-xs text-foreground">ArrowRight / ArrowDown</td>
                <td className="py-2.5 px-3">Moves focus to the next segment and selects it. Skips disabled segments. Wraps to first segment.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-xs text-foreground">ArrowLeft / ArrowUp</td>
                <td className="py-2.5 px-3">Moves focus to the previous segment and selects it. Skips disabled segments. Wraps to last segment.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-xs text-foreground">Home / End</td>
                <td className="py-2.5 px-3">Moves focus and selection directly to the first or last enabled segment.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-xs text-foreground">Space</td>
                <td className="py-2.5 px-3">Activates the focused segment if manual selection is enabled.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed">
          <li>
            <strong>Semantic RadioGroup Roles:</strong> The outer track exposes{" "}
            <code className="text-foreground font-mono text-xs">role=&quot;radiogroup&quot;</code> and segments expose{" "}
            <code className="text-foreground font-mono text-xs">role=&quot;radio&quot;</code> with{" "}
            <code className="text-foreground font-mono text-xs">aria-checked=&quot;true&quot;</code> or{" "}
            <code className="text-foreground font-mono text-xs">&quot;false&quot;</code>.
          </li>
          <li>
            <strong>Roving Tabindex:</strong> The entire segmented control is a single Tab stop. Arrow keys move focus
            between options so keyboard users do not have to tab through every segment.
          </li>
          <li>
            <strong>Selection Distinction:</strong> Selected state uses both elevated background opacity, 1px specular highlight,
            and font-weight emphasis, ensuring state change is perceivable without relying on color alone (WCAG 1.4.1).
          </li>
          <li>
            <strong>Independent Focus Ring:</strong> The double-contrast Halo Focus Ring is positioned outside the item
            perimeter and operates independently from the selected substrate, guaranteeing clear focus visibility on both
            selected and unselected options.
          </li>
        </ul>
      </div>

      {/* Props */}
      <div className="space-y-6">
        <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">SegmentedControl</h3>
          <PropsTable rows={PROPS_DATA} />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">SegmentedControlItem</h3>
          <PropsTable rows={ITEM_PROPS_DATA} />
        </div>
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
          Installed Files
        </h2>
        <FileTree items={INSTALLED_FILES_DATA} />
      </div>
    </div>
  );
}
