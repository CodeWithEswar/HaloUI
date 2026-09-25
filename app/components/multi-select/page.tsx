import * as React from "react";
import type { Metadata } from "next";
import { MultiSelectPreviewStage } from "./multi-select-preview-stage";
import {
  PrimaryMultiSelectDemo,
  GroupedMultiSelectDemo,
  TokenOverflowDemo,
  InvalidMultiSelectDemo,
  DisabledMultiSelectDemo,
} from "./multi-select-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Multi Select — Forms & Fields — HaloUI",
  description:
    "A searchable multi-value picker for selecting and managing multiple options as removable tokens.",
};

const MULTI_SELECT_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string[]",
    default: "undefined",
    required: false,
    description: "The controlled committed collection of selected option values.",
  },
  {
    name: "defaultValue",
    type: "string[]",
    default: "[]",
    required: false,
    description: "The initial selected option values for uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(value: string[]) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked whenever values are added or removed from the committed collection.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables text search, token removal actions, and popup discovery across the component tree.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Explicitly forces the invalid dual-indicator border and shadow state on the trigger container.",
  },
  {
    name: "labels",
    type: "Record<string, string>",
    default: "undefined",
    required: false,
    description: "Optional map of raw value keys to human-friendly display labels for automated token rendering.",
  },
];

const MULTI_SELECT_TOKEN_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "The unique committed value associated with this token.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    required: false,
    description: "The semantic text label used for accessible removal naming (e.g. 'Remove React').",
  },
];

const MULTI_SELECT_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"bottom"',
    required: false,
    description: "Preferred floating placement side relative to the input container trigger.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "6",
    required: false,
    description: "Distance in pixels between the trigger boundary and the floating popup surface.",
  },
  {
    name: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    required: false,
    description: "Alignment of the floating popup surface along the horizontal axis.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "MultiSelect (Root)",
    description: "Single-source-of-truth state container coordinating search query, committed collection values, and portalled popup visibility.",
  },
  {
    name: "MultiSelectTrigger",
    description: "Fluid wrapping container housing committed tokens and the active search input in a unified 10-layer physical liquid glass boundary.",
  },
  {
    name: "MultiSelectValue",
    description: "Dynamic projection component that maps committed array values into accessible, removable tokens.",
  },
  {
    name: "MultiSelectToken",
    description: "Interactive chip element communicating selection status, label, and contextual focus states.",
  },
  {
    name: "MultiSelectTokenRemove",
    description: "Accessible native button element with dedicated aria-label for removing a single committed token.",
  },
  {
    name: "MultiSelectInput",
    description: "WAI-ARIA combobox input element allowing keyboard query entry and option filtering.",
  },
  {
    name: "MultiSelectContent",
    description: "Portalled floating listbox surface with high-diffusion backdrop filter and directional light reflection.",
  },
  {
    name: "MultiSelectList",
    description: "Scrollable option list container managing roving active-descendant index.",
  },
  {
    name: "MultiSelectItem",
    description: "Selectable option entry supporting independent highlighted (active) and selected states with checkmark indicator.",
  },
  {
    name: "MultiSelectGroup & MultiSelectLabel",
    description: "Semantic category organization with non-selectable section headings.",
  },
  {
    name: "MultiSelectEmpty",
    description: "Informational container displayed when no options match the current search query.",
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
            name: "multi-select.tsx",
            type: "file",
            description: "Searchable multi-value option picker with token collection management and optical liquid glass.",
          },
          {
            name: "field.tsx",
            type: "file",
            description: "Semantic form field composition wrapper (reused, not duplicated).",
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

export default function MultiSelectDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>12</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Multi Select
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A searchable multi-value picker for selecting and managing multiple options as removable tokens.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <MultiSelectPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="multi-select" />
      </section>

      {/* Callout 1: Architectural Identity */}
      <Callout type="note" title="Multi Select chooses multiple values from a known option collection">
        Use <strong>Tag Input</strong> when users can create arbitrary unconstrained values, and use{" "}
        <strong>Checkbox Group</strong> when a small set of important choices should remain visible without opening a popup.
      </Callout>

      {/* Callout 2: Query vs Selection Separation */}
      <Callout type="note" title="Search query and selected values are separate state">
        Search query and selected values are separate dimensions. Typing filters available options; selecting or removing an option modifies the committed value collection.
      </Callout>

      {/* Callout 3: Token Responsibility */}
      <Callout type="note" title="Tokens represent committed selections, not decorative badges">
        Tokens represent committed selections. Their remove actions modify the selected collection; they are not decorative badges.
      </Callout>

      {/* Usage with Field */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage with Field
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The canonical implementation pairs <code className="text-foreground">MultiSelect</code> with{" "}
          <code className="text-foreground">Field</code>, <code className="text-foreground">FieldLabel</code>, and{" "}
          <code className="text-foreground">FieldDescription</code>:
        </p>
        <CodeBlock
          code={`import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectInput,
  MultiSelectContent,
  MultiSelectList,
  MultiSelectItem,
  MultiSelectEmpty,
  MultiSelectChevron,
} from "@/components/ui/multi-select";

export function FrameworkMultiSelect() {
  return (
    <Field id="frameworks">
      <FieldLabel htmlFor="frameworks-input">Required frameworks</FieldLabel>
      <MultiSelect defaultValue={["React", "TypeScript"]}>
        <MultiSelectTrigger>
          <MultiSelectValue />
          <MultiSelectInput
            id="frameworks-input"
            placeholder="Select frameworks..."
          />
          <MultiSelectChevron />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectList>
            <MultiSelectItem value="React">React</MultiSelectItem>
            <MultiSelectItem value="TypeScript">TypeScript</MultiSelectItem>
            <MultiSelectItem value="Next.js">Next.js</MultiSelectItem>
            <MultiSelectItem value="Vue">Vue</MultiSelectItem>
            <MultiSelectEmpty>No frameworks found.</MultiSelectEmpty>
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
      <FieldDescription>Choose the primary technologies for your repository.</FieldDescription>
    </Field>
  );
}`}
          language="tsx"
        />
        <div className="pt-2">
          <PrimaryMultiSelectDemo />
        </div>
      </section>

      {/* Controlled Selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Controlled Selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pass <code className="text-foreground">value</code> as an array of strings and listen to updates via{" "}
          <code className="text-foreground">onValueChange</code>. The committed array serves as the absolute single source of truth; tokens are never maintained in a detached secondary array.
        </p>
        <CodeBlock
          code={`const [selected, setSelected] = React.useState<string[]>(["React", "TypeScript"]);

<MultiSelect
  value={selected}
  onValueChange={(nextValues) => setSelected(nextValues)}
>
  ...
</MultiSelect>`}
          language="tsx"
        />
      </section>

      {/* Groups & Categorization */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Grouped Option Categories
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use <code className="text-foreground">&lt;MultiSelectGroup&gt;</code> and{" "}
          <code className="text-foreground">&lt;MultiSelectLabel&gt;</code> to separate options into semantic categories. Non-selectable headings guide keyboard users through extensive collections:
        </p>
        <GroupedMultiSelectDemo />
      </section>

      {/* Responsive Token Overflow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Responsive Token Overflow &amp; Wrapping
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unlike single-line text inputs, <code className="text-foreground">MultiSelect</code> controls expand vertically as tokens wrap. Default layout rules avoid brittle JavaScript resize calculations in favor of native CSS flex-wrap, keeping token removal buttons accessible on both desktop and mobile screens:
        </p>
        <TokenOverflowDemo />
      </section>

      {/* Validation & Invalid State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Form Validation &amp; Dual-Indicator Error State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When form validation fails, <code className="text-foreground">MultiSelect</code> renders with dual-indicator destructive boundaries. Even when the field is invalid, focused token removal buttons preserve their independent high-contrast focus rings:
        </p>
        <InvalidMultiSelectDemo />
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Disabled Control &amp; Token Inactivity
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When the root is disabled, token removal actions become non-interactive, the search input is locked, and the popup cannot be expanded:
        </p>
        <DisabledMultiSelectDemo />
      </section>

      {/* Empty State vs Invalid State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Empty Results are Not Validation Errors
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When an active query matches zero options, Multi Select displays <code className="text-foreground">&lt;MultiSelectEmpty&gt;</code>. HaloUI strictly distinguishes between empty filter results and invalid form state. An empty search is an informational collection state and does <em>not</em> tint the container border red or trigger validation errors.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Component Responsibility Comparison
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 font-medium text-foreground">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Selection Model</th>
                <th className="p-3">Primary Use Case</th>
                <th className="p-3">Arbitrary Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Multi Select</td>
                <td className="p-3">Multiple committed values</td>
                <td className="p-3">Searchable picker from known collection</td>
                <td className="p-3 text-destructive font-mono">No</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Combobox</td>
                <td className="p-3">Single committed value</td>
                <td className="p-3">Searchable picker for 1-of-N choices</td>
                <td className="p-3 text-destructive font-mono">No</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Checkbox Group</td>
                <td className="p-3">Multiple boolean values</td>
                <td className="p-3">Small set of always-visible choices</td>
                <td className="p-3 text-destructive font-mono">No</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Tag Input</td>
                <td className="p-3">Arbitrary token list</td>
                <td className="p-3">Freeform user-created tags and keywords</td>
                <td className="p-3 text-emerald-500 font-mono">Yes</td>
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
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Tab</kbd>: Moves focus into the search input.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">ArrowDown</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">ArrowUp</kbd>: Navigates through the matching option items without prematurely committing them.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Enter</kbd>: Commits the currently active option to the selected values collection and resets the search query. The popup remains open for rapid consecutive selections.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Escape</kbd>: Closes the portalled popup while preserving all committed tokens.
          </p>
          <p>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">Enter</kbd> on Token Remove: Removes the associated token from the committed collection.
          </p>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">MultiSelect (Root)</h3>
          <PropsTable rows={MULTI_SELECT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">MultiSelectToken</h3>
          <PropsTable rows={MULTI_SELECT_TOKEN_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">MultiSelectContent</h3>
          <PropsTable rows={MULTI_SELECT_CONTENT_PROPS} />
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
            <strong>WAI-ARIA Combobox (Multiple Selection):</strong> Follows Base UI chips and combobox composite patterns. The input carries <code className="text-foreground">role=&quot;combobox&quot;</code>, manages <code className="text-foreground">aria-expanded</code> and <code className="text-foreground">aria-controls</code>, while the token container acts as a collection toolbar.
          </p>
          <p>
            <strong>Meaningful Removal Names:</strong> Each token removal button renders with an explicit, screen-reader-audible name (e.g. <code className="text-foreground">aria-label=&quot;Remove React&quot;</code>) rather than ambiguous symbols like &quot;X&quot; or &quot;Delete&quot;.
          </p>
          <p>
            <strong>Focus Visibility:</strong> The 10-layer physical liquid glass container receives an elevated double-contrast Halo Focus Ring when the search input or any token removal action receives focus.
          </p>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Multi Select is engineered for high performance:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Zero JavaScript DOM measurements or ResizeObservers per token; wrapping is powered entirely by native CSS flexbox.</li>
          <li>Hardware-accelerated transforms for popup open/close transitions.</li>
          <li>No global window event listeners; cleanup is managed automatically by Base UI dismissable layers.</li>
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
            <li>Initial production release of Multi Select (Forms &amp; Fields 12).</li>
            <li>Full Base UI chips integration with removable token collection.</li>
            <li>10-layer physical optical liquid glass engine and dual-indicator invalid state.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
