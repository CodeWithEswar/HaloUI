import * as React from "react";
import type { Metadata } from "next";
import { CheckboxPreviewStage } from "./checkbox-preview-stage";
import {
  PrimaryCheckboxDemo,
  IndeterminateCheckboxDemo,
  InvalidCheckboxDemo,
  DisabledCheckboxDemo,
} from "./checkbox-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Checkbox — Forms & Fields — HaloUI",
  description:
    "An accessible boolean selection control supporting unchecked, checked, and indeterminate states.",
};

const CHECKBOX_PROPS: PropRow[] = [
  {
    name: "checked",
    type: 'boolean | "indeterminate"',
    default: "undefined",
    required: false,
    description: "The controlled checked state of the checkbox, accepting true, false, or 'indeterminate'.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    required: false,
    description: "The initial checked state for uncontrolled usage.",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the checkbox renders in an indeterminate (mixed parent) state.",
  },
  {
    name: "onCheckedChange",
    type: '(checked: boolean | "indeterminate") => void',
    default: "undefined",
    required: false,
    description: "Event handler called when the checked state changes via pointer click or keyboard Space activation.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables user interaction and dims the control while preserving state legibility.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Indicates that the checkbox must be checked prior to form submission.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Forces the dual-indicator destructive boundary ring for form validation feedback.",
  },
  {
    name: "name",
    type: "string",
    default: "undefined",
    required: false,
    description: "Form submission field name for standard HTML form integration.",
  },
  {
    name: "value",
    type: "string",
    default: '"on"',
    required: false,
    description: "Form submission value submitted when the checkbox is checked.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Checkbox (Root)",
    description: "Interactive button-role element rendering a 10-layer physical liquid glass boundary and hosting the hidden native input.",
  },
  {
    name: "CheckboxIndicator",
    description: "Dynamic icon container rendering Tick02Icon for checked state or MinusSignIcon for indeterminate state.",
  },
  {
    name: "Label",
    description: "Accessible text label associated with the checkbox via htmlFor, extending the interactive hit area.",
  },
];

const FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "checkbox.tsx",
            type: "file",
            description: "Accessible boolean selection control with optical liquid glass and indeterminate support.",
          },
          {
            name: "label.tsx",
            type: "file",
            description: "Accessible text label primitive (reused, not duplicated).",
          },
          {
            name: "field.tsx",
            type: "file",
            description: "Semantic field composition container (reused, not duplicated).",
          },
        ],
      },
    ],
  },
];

const DEPENDENCIES_DATA: DependencyGroup[] = [
  {
    title: "Direct Dependencies",
    items: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Registry Dependencies",
    items: ["field"],
  },
];

export default function CheckboxDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>13</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Checkbox
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible boolean selection control supporting unchecked, checked, and indeterminate states.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <CheckboxPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="checkbox" />
      </section>

      {/* Callout 1: Responsibility Boundary */}
      <Callout type="note" title="Checkbox represents selection, not an immediate system setting">
        Use <strong>Switch</strong> when changing the control should immediately turn an active system setting on or off. Use{" "}
        <strong>Radio Group</strong> when exactly one mutually exclusive option should be selected from a set.
      </Callout>

      {/* Callout 2: Indeterminate State */}
      <Callout type="note" title="Indeterminate represents a derived partial-selection state">
        Indeterminate usually represents a derived partial-selection state (e.g. some, but not all, child files are selected). The Checkbox renders that state; application or group logic determines when it applies.
      </Callout>

      {/* Usage with Label */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage with Label
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Always pair <code className="text-foreground">Checkbox</code> with a visible{" "}
          <code className="text-foreground">Label</code> via <code className="text-foreground">htmlFor</code> to ensure accessible naming and practical touch target areas:
        </p>
        <CodeBlock
          code={`import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function BasicCheckbox() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="cursor-pointer">
        Accept terms and conditions
      </Label>
    </div>
  );
}`}
          language="tsx"
        />
        <div className="pt-2">
          <PrimaryCheckboxDemo />
        </div>
      </section>

      {/* Indeterminate & Select All */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Indeterminate State (Select All Pattern)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Indeterminate checkboxes represent mixed states where some, but not all, child items in a set are selected. The Checkbox displays a high-visibility horizontal minus indicator rather than a checkmark:
        </p>
        <IndeterminateCheckboxDemo />
      </section>

      {/* Form Validation & Error State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Form Validation &amp; Dual-Indicator Error State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When integrated with <code className="text-foreground">Field</code>, required consent agreements reflect validation errors through both a descriptive message and dual-indicator error borders:
        </p>
        <InvalidCheckboxDemo />
      </section>

      {/* Disabled States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Disabled States
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Disabled checkboxes maintain visual contrast and state legibility across unchecked, checked, and indeterminate conditions:
        </p>
        <DisabledCheckboxDemo />
      </section>

      {/* Comparison Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Selection Control Comparison
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 font-medium text-foreground">
              <tr>
                <th className="p-3">Control</th>
                <th className="p-3">State Model</th>
                <th className="p-3">Semantics</th>
                <th className="p-3">Commit Timing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Checkbox</td>
                <td className="p-3">Unchecked / Checked / Indeterminate</td>
                <td className="p-3 font-mono text-xs">role=&quot;checkbox&quot;</td>
                <td className="p-3">Committed on form submission</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Switch</td>
                <td className="p-3">Off / On</td>
                <td className="p-3 font-mono text-xs">role=&quot;switch&quot;</td>
                <td className="p-3">Immediate effect on activation</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Toggle</td>
                <td className="p-3">Unpressed / Pressed</td>
                <td className="p-3 font-mono text-xs">aria-pressed</td>
                <td className="p-3">Immediate visual state change</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Radio</td>
                <td className="p-3">Mutually exclusive 1-of-N</td>
                <td className="p-3 font-mono text-xs">role=&quot;radio&quot;</td>
                <td className="p-3">Committed on form submission</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Keyboard Behavior */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Keyboard Interaction Contract
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Tab</kbd>: Moves focus to the Checkbox control.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Space</kbd>: Toggles the checked state between checked and unchecked (or resolves indeterminate state).
          </p>
          <p>
            <strong>Pointer Click on Label:</strong> Clicks on an associated <code className="text-foreground">&lt;Label htmlFor=&quot;...&quot;&gt;</code> automatically transfer focus and toggle the checkbox state.
          </p>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Checkbox</h3>
          <PropsTable rows={CHECKBOX_PROPS} />
        </div>
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Native Checkbox Semantics:</strong> Base UI exposes an underlying native <code className="text-foreground">&lt;input type=&quot;checkbox&quot;&gt;</code> paired with ARIA checked attributes, ensuring complete compatibility with assistive screen readers.
          </p>
          <p>
            <strong>Indeterminate ARIA Communication:</strong> When indeterminate, <code className="text-foreground">aria-checked=&quot;mixed&quot;</code> is announced by assistive technologies, distinguishing partial selection from unchecked.
          </p>
          <p>
            <strong>Independent Focus Ring:</strong> Focus-visible receives HaloUI&apos;s double-contrast halo focus ring, which remains distinctly visible across light/dark themes, invalid error borders, and checked fills.
          </p>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Checkbox is engineered for negligible overhead in high-density tables and forms:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Zero DOM observers, measurements, or global listeners.</li>
          <li>Hardware-accelerated micro transitions for tactile feedback.</li>
          <li>Can be rendered hundreds of times in large data grids without performance degradation.</li>
        </ul>
      </section>

      {/* File Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          File Structure
        </h2>
        <FileTree items={FILE_TREE} />
      </section>

      {/* Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </section>

      {/* Changelog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Changelog
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">v1.0.0 — 2026-09-25</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Initial production release of Checkbox (Forms &amp; Fields 13).</li>
            <li>Full support for unchecked, checked, and indeterminate states.</li>
            <li>10-layer physical liquid glass engine with tactile compression and Halo Focus Ring.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
