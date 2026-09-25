import * as React from "react";
import type { Metadata } from "next";
import { RadioGroupPreviewStage } from "./radio-group-preview-stage";
import {
  PrimaryRadioGroupDemo,
  HorizontalRadioGroupDemo,
  DisabledOptionRadioGroupDemo,
  InvalidRadioGroupDemo,
} from "./radio-group-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Radio Group — Forms & Fields — HaloUI",
  description:
    "An accessible mutually exclusive option set for selecting one value from a related group.",
};

const RADIO_GROUP_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "The controlled single value of the currently selected radio option.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    required: false,
    description: "The initial selected radio option value for uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "undefined",
    required: false,
    description: "Event handler called whenever a different radio option in the group is chosen.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    required: false,
    description: "Visual layout orientation: vertical stacks options; horizontal wraps inline.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction across the entire group of radio items.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Marks the group as invalid for form validation integration.",
  },
  {
    name: "name",
    type: "string",
    default: "undefined",
    required: false,
    description: "Form submission field name for standard HTML form integration.",
  },
];

const RADIO_GROUP_ITEM_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "—",
    required: true,
    description: "The unique identifying value committed when this radio button is selected.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction for this specific radio option. Arrow navigation skips disabled items.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies dual-indicator destructive boundary ring to the item.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "RadioGroup (Root)",
    description: "Semantic <fieldset> container managing roving tabindex, single value selection, and arrow-key navigation.",
  },
  {
    name: "RadioGroupLabel",
    description: "Semantic <legend> heading identifying the group question to assistive technologies.",
  },
  {
    name: "RadioGroupDescription",
    description: "Explanatory text positioned beneath the legend providing context for the choice set.",
  },
  {
    name: "RadioGroupOption",
    description: "Structural container aligning a RadioGroupItem with its associated Label and option description.",
  },
  {
    name: "RadioGroupItem",
    description: "Circular selection button with 10-layer physical liquid glass and Halo Focus Ring.",
  },
  {
    name: "Label",
    description: "Accessible text label connected to the radio item via htmlFor, expanding the interactive hit area.",
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
            name: "radio-group.tsx",
            type: "file",
            description: "Mutually exclusive option set with roving focus, liquid glass, and Base UI coordination.",
          },
          {
            name: "label.tsx",
            type: "file",
            description: "Accessible form label primitive.",
          },
          {
            name: "field.tsx",
            type: "file",
            description: "Semantic field wrapper with validation messaging.",
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

export default function RadioGroupDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>15</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Radio Group
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible mutually exclusive option set for selecting one value from a related group.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <RadioGroupPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="radio-group" />
      </section>

      {/* Callout 1: Mutually Exclusive */}
      <Callout type="note" title="Radio Group represents mutually exclusive choices">
        Selecting one option replaces the previous selection. Use <strong>Checkbox Group</strong> when users may select multiple independent options.
      </Callout>

      {/* Callout 2: Comparison vs Select */}
      <Callout type="note" title="Radio Group vs Select">
        Use <strong>Radio Group</strong> when a small set of choices should remain visible and directly comparable. Use <strong>Select</strong> when displaying every option would consume unnecessary vertical space.
      </Callout>

      {/* Callout 3: Keyboard Navigation */}
      <Callout type="note" title="Coordinated keyboard navigation">
        Radio Group uses coordinated roving-focus keyboard navigation rather than treating every option as an independent tab stop. Pressing arrow keys moves focus and updates selection while skipping disabled options.
      </Callout>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage &amp; Composition
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The canonical implementation pairs <code className="text-foreground">RadioGroup</code> with{" "}
          <code className="text-foreground">RadioGroupItem</code> and <code className="text-foreground">Label</code>. Each option specifies a unique <code className="text-foreground">value</code>:
        </p>
        <CodeBlock
          code={`import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function BillingPlan() {
  const [plan, setPlan] = React.useState<string>("yearly");

  return (
    <RadioGroup value={plan} onValueChange={setPlan}>
      <RadioGroupLabel>Subscription billing cycle</RadioGroupLabel>
      <RadioGroupDescription>
        Choose how frequently your team should be invoiced.
      </RadioGroupDescription>

      <RadioGroupOption>
        <RadioGroupItem value="monthly" id="plan-monthly" />
        <Label htmlFor="plan-monthly">Monthly billing ($24/mo)</Label>
      </RadioGroupOption>

      <RadioGroupOption>
        <RadioGroupItem value="yearly" id="plan-yearly" />
        <Label htmlFor="plan-yearly">Annual billing ($192/yr · Save 20%)</Label>
      </RadioGroupOption>
    </RadioGroup>
  );
}`}
          language="tsx"
        />
        <div className="pt-2">
          <PrimaryRadioGroupDemo />
        </div>
      </section>

      {/* Horizontal Orientation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Horizontal Orientation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use <code className="text-foreground">orientation=&quot;horizontal&quot;</code> for compact sets of short options such as priority tiers, sizes, or short numbers:
        </p>
        <HorizontalRadioGroupDemo />
      </section>

      {/* Disabled Option Navigation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Disabled Options &amp; Keyboard Skipping
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When an individual radio item is disabled, Base UI&apos;s roving focus engine automatically skips it during arrow key navigation, landing securely on the next enabled option:
        </p>
        <DisabledOptionRadioGroupDemo />
      </section>

      {/* Group Validation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Group-Level Validation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Validation errors represent a failure of the group question rather than an individual option. When invalid, the group renders with an explanatory <code className="text-foreground">FieldError</code> while preserving focused halo rings on interactive items:
        </p>
        <InvalidRadioGroupDemo />
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
                <td className="p-3 font-medium text-foreground">Radio Group</td>
                <td className="p-3">Single mutually exclusive choice</td>
                <td className="p-3 font-medium text-foreground">Always visible</td>
                <td className="p-3">Roving tabindex; Arrow keys navigate/select</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Checkbox Group</td>
                <td className="p-3">Zero, one, or multiple independent choices</td>
                <td className="p-3 font-medium text-foreground">Always visible</td>
                <td className="p-3">Sequential Tab-through; Space toggles</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Select</td>
                <td className="p-3">Single committed value</td>
                <td className="p-3">Behind popup</td>
                <td className="p-3">Trigger button + listbox focus</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Segmented Control</td>
                <td className="p-3">Single active mode / view switch</td>
                <td className="p-3 font-medium text-foreground">Inline pill track</td>
                <td className="p-3">Roving tab track</td>
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
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Tab</kbd>: Focuses into the selected radio item (or the first enabled item if none is selected).
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">ArrowDown</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">ArrowRight</kbd>: Moves focus and selection forward to the next enabled radio option, skipping any disabled items.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">ArrowUp</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">ArrowLeft</kbd>: Moves focus and selection backward to the previous enabled radio option.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Shift + Tab</kbd>: Exits the radio group backward to the preceding interactive control.
          </p>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">RadioGroup</h3>
          <PropsTable rows={RADIO_GROUP_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">RadioGroupItem</h3>
          <PropsTable rows={RADIO_GROUP_ITEM_PROPS} />
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
            <strong>WAI-ARIA Radio Group Pattern:</strong> Base UI implements complete W3C radio group semantics (<code className="text-foreground">role=&quot;radiogroup&quot;</code> and <code className="text-foreground">role=&quot;radio&quot;</code>). Roving tabindex ensures only one tab stop exists for the entire group.
          </p>
          <p>
            <strong>Semantic Native Grouping:</strong> Enclosed in an HTML <code className="text-foreground">&lt;fieldset&gt;</code> element paired with a <code className="text-foreground">&lt;legend&gt;</code>, ensuring screen readers announce the group question upon focus entry.
          </p>
          <p>
            <strong>Independent Focus Ring:</strong> Focus-visible displays HaloUI&apos;s double-contrast halo focus ring directly on the focused radio item, clearly differentiating unselected, selected, and invalid conditions.
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
            <li>Initial production release of Radio Group (Forms &amp; Fields 15).</li>
            <li>Full Base UI roving-focus keyboard navigation and mutual exclusion.</li>
            <li>10-layer physical liquid glass engine and circular form geometry.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
