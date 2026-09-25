import * as React from "react";
import type { Metadata } from "next";
import { CheckboxGroupPreviewStage } from "./checkbox-group-preview-stage";
import {
  PrimaryCheckboxGroupDemo,
  HorizontalCheckboxGroupDemo,
  InvalidCheckboxGroupDemo,
  SelectAllCompositionDemo,
  DisabledCheckboxGroupDemo,
} from "./checkbox-group-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Checkbox Group — Forms & Fields — HaloUI",
  description:
    "A related set of independent checkbox options for selecting zero, one, or multiple values.",
};

const CHECKBOX_GROUP_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string[]",
    default: "undefined",
    required: false,
    description: "Controlled array of selected option values.",
  },
  {
    name: "defaultValue",
    type: "string[]",
    default: "[]",
    required: false,
    description: "Initial selected option values for uncontrolled usage.",
  },
  {
    name: "onValueChange",
    type: "(value: string[]) => void",
    default: "undefined",
    required: false,
    description: "Event handler called whenever any checkbox in the group is toggled.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    required: false,
    description: "Arrangement rhythm: vertical stacks options; horizontal wraps inline with responsive spacing.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables all child checkboxes within the group simultaneously.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Sets aria-invalid on the group container for semantic validation coordination.",
  },
];

const CHECKBOX_GROUP_LABEL_PROPS: PropRow[] = [
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Appends a visual asterisk to the legend indicating required group selection.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "CheckboxGroup (Root)",
    description: "Semantic <fieldset> container providing programmatic group naming and collection coordination.",
  },
  {
    name: "CheckboxGroupLabel",
    description: "Semantic <legend> heading presenting the group-level question to sighted users and screen readers.",
  },
  {
    name: "CheckboxGroupDescription",
    description: "Supporting text providing guidance for the entire option set.",
  },
  {
    name: "CheckboxGroupItem",
    description: "Structural wrapper pairing an individual Checkbox with its Label and optional supporting description.",
  },
  {
    name: "Checkbox",
    description: "The canonical independent boolean selection control with optical liquid glass.",
  },
  {
    name: "Label",
    description: "Accessible text label associated with the checkbox via htmlFor.",
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
            name: "checkbox-group.tsx",
            type: "file",
            description: "Semantic collection primitive coordinating independent checkbox selections.",
          },
          {
            name: "checkbox.tsx",
            type: "file",
            description: "Canonical boolean selection control (reused, not duplicated).",
          },
          {
            name: "label.tsx",
            type: "file",
            description: "Accessible form label primitive.",
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
    items: ["checkbox"],
  },
];

export default function CheckboxGroupDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>14</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Checkbox Group
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A related set of independent checkbox options for selecting zero, one, or multiple values.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <CheckboxGroupPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="checkbox-group" />
      </section>

      {/* Callout 1: Independent Choices */}
      <Callout type="note" title="Checkbox Group is for related independent choices">
        Selecting one option does not deselect another. Use <strong>Radio Group</strong> when the choices are mutually exclusive.
      </Callout>

      {/* Callout 2: Comparison vs Multi Select */}
      <Callout type="note" title="Checkbox Group vs Multi Select">
        Use <strong>Checkbox Group</strong> when a small set of choices should remain visible and directly comparable. Use <strong>Multi Select</strong> when users need to search or manage a larger option collection behind a picker.
      </Callout>

      {/* Callout 3: Select All Pattern */}
      <Callout type="note" title="Select All is an application composition pattern">
        Select All is a composition pattern rather than hidden Checkbox Group behavior. Application logic determines whether the parent Checkbox is unchecked, checked, or indeterminate based on child selection state.
      </Callout>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage &amp; Composition
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="text-foreground">CheckboxGroup</code> composes the canonical{" "}
          <code className="text-foreground">Checkbox</code> and <code className="text-foreground">Label</code> primitives. Each option specifies a unique <code className="text-foreground">value</code> string:
        </p>
        <CodeBlock
          code={`import {
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupItem,
} from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function NotificationsExample() {
  const [channels, setChannels] = React.useState<string[]>(["email", "push"]);

  return (
    <CheckboxGroup value={channels} onValueChange={setChannels}>
      <CheckboxGroupLabel>Notification channels</CheckboxGroupLabel>
      <CheckboxGroupDescription>
        Select where critical updates should be delivered.
      </CheckboxGroupDescription>

      <CheckboxGroupItem>
        <Checkbox value="email" id="opt-email" />
        <Label htmlFor="opt-email">Email</Label>
      </CheckboxGroupItem>

      <CheckboxGroupItem>
        <Checkbox value="sms" id="opt-sms" />
        <Label htmlFor="opt-sms">SMS</Label>
      </CheckboxGroupItem>

      <CheckboxGroupItem>
        <Checkbox value="push" id="opt-push" />
        <Label htmlFor="opt-push">Push notifications</Label>
      </CheckboxGroupItem>
    </CheckboxGroup>
  );
}`}
          language="tsx"
        />
        <div className="pt-2">
          <PrimaryCheckboxGroupDemo />
        </div>
      </section>

      {/* Orientation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Layout Orientation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Set <code className="text-foreground">orientation=&quot;horizontal&quot;</code> for compact sets of short options such as days, tags, or compact filters. Options wrap cleanly on smaller viewports without overflowing:
        </p>
        <HorizontalCheckboxGroupDemo />
      </section>

      {/* Select All Composition */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Select All Composition Pattern
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A parent Checkbox can be composed above the group. Surrounding state logic calculates whether zero, some, or all items are selected and provides the appropriate unchecked, indeterminate, or checked state:
        </p>
        <SelectAllCompositionDemo />
      </section>

      {/* Validation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Group-Level Validation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Validation errors belong to the group question rather than individual choices. HaloUI renders group-level feedback via <code className="text-foreground">FieldError</code> while preserving independent focus visibility on whichever option receives focus:
        </p>
        <InvalidCheckboxGroupDemo />
      </section>

      {/* Disabled Group */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Disabled State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Passing <code className="text-foreground">disabled</code> to <code className="text-foreground">CheckboxGroup</code> automatically cascades down to all child checkboxes through shared context, locking user interaction while maintaining state readability:
        </p>
        <DisabledCheckboxGroupDemo />
      </section>

      {/* Comparison Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Selection Control Responsibility Model
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 font-medium text-foreground">
              <tr>
                <th className="p-3">Control</th>
                <th className="p-3">Selection Model</th>
                <th className="p-3">Options Visible</th>
                <th className="p-3">Keyboard Pattern</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Checkbox Group</td>
                <td className="p-3">Zero, one, or multiple independent choices</td>
                <td className="p-3 font-medium text-foreground">Always visible</td>
                <td className="p-3">Normal Tab-through; Space toggles</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Radio Group</td>
                <td className="p-3">Exactly one mutually exclusive choice</td>
                <td className="p-3 font-medium text-foreground">Always visible</td>
                <td className="p-3">Tab enters/exits; Arrows move/select</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Multi Select</td>
                <td className="p-3">Multiple committed values with tokens</td>
                <td className="p-3">Behind searchable popup</td>
                <td className="p-3">Query input + roving listbox focus</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Select</td>
                <td className="p-3">Single committed value</td>
                <td className="p-3">Behind popup</td>
                <td className="p-3">Trigger button + roving listbox focus</td>
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
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Tab</kbd>: Moves focus sequentially to each enabled Checkbox inside the group.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Shift + Tab</kbd>: Moves focus backward to the previous Checkbox or exits the group.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Space</kbd>: Toggles the checked status of the currently focused Checkbox without affecting any other options.
          </p>
          <p>
            <strong>Strictly No Arrow Navigation:</strong> Checkbox Group does not implement Radio-style arrow roving focus, honoring standard W3C checkbox accessibility conventions.
          </p>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">CheckboxGroup</h3>
          <PropsTable rows={CHECKBOX_GROUP_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">CheckboxGroupLabel</h3>
          <PropsTable rows={CHECKBOX_GROUP_LABEL_PROPS} />
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
            <strong>Semantic Native Grouping:</strong> Renders as an HTML <code className="text-foreground">&lt;fieldset&gt;</code> element paired with a <code className="text-foreground">&lt;legend&gt;</code>, ensuring screen readers announce the group question whenever any child checkbox receives focus.
          </p>
          <p>
            <strong>Independent Control Focus:</strong> Each checkbox acts as an independent focusable control. Tab navigation passes through all enabled items without trapped or roving tabindex.
          </p>
          <p>
            <strong>Group-Level Error Association:</strong> When invalid, the group carries <code className="text-foreground">aria-invalid=&quot;true&quot;</code> and associates with explanatory <code className="text-foreground">FieldError</code> messages via <code className="text-foreground">aria-describedby</code>.
          </p>
        </div>
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
            <li>Initial production release of Checkbox Group (Forms &amp; Fields 14).</li>
            <li>Native &lt;fieldset&gt; and &lt;legend&gt; semantic grouping.</li>
            <li>Independent collection state coordination and group-level validation.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
