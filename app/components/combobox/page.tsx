import * as React from "react";
import type { Metadata } from "next";
import { ComboboxPreviewStage } from "./combobox-preview-stage";
import {
  PrimaryFrameworkComboboxDemo,
  GroupedComboboxDemo,
  ComboboxStatesDemo,
  ControlledComboboxDemo,
} from "./combobox-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Combobox — Forms & Fields — HaloUI",
  description:
    "An accessible searchable option picker for selecting one value from a filterable collection.",
};

const COMBOBOX_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string | null",
    default: "undefined",
    required: false,
    description: "The controlled committed value of the selected option.",
  },
  {
    name: "defaultValue",
    type: "string | null",
    default: "undefined",
    required: false,
    description: "The default committed option value for uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(value: string | null) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when a new option value is selected and committed.",
  },
  {
    name: "inputValue",
    type: "string",
    default: "undefined",
    required: false,
    description: "The controlled search query string entered into the input field.",
  },
  {
    name: "onInputValueChange",
    type: "(query: string) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when the query text changes through typing or clearing.",
  },
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled open state of the portalled suggestions popup.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    required: false,
    description: "Event handler called when the suggestions popup opens or closes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables text entry, trigger button, and popup interaction.",
  },
];

const COMBOBOX_INPUT_PROPS: PropRow[] = [
  {
    name: "showTrigger",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render the trailing dropdown chevron button inside the input addon.",
  },
  {
    name: "showClear",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to render a trailing clear button when a query or value exists.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "undefined",
    required: false,
    description: "Supplemental placeholder hint shown when the input query is empty.",
  },
  {
    name: "aria-invalid",
    type: 'boolean | "true" | "false"',
    default: "undefined",
    required: false,
    description: "Activates dual-indicator error borders on the enclosing input group.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Combobox (Root)",
    description: "State container coordinating active query, committed option value, and keyboard focus.",
  },
  {
    name: "ComboboxInput",
    description: "Composite text entry control combining a native Input with trigger and clear addons in a shared 10-layer optical glass boundary.",
  },
  {
    name: "ComboboxContent",
    description: "Portalled floating surface with high-diffusion liquid glass backdrop and collision-aware positioning.",
  },
  {
    name: "ComboboxList",
    description: "Scrollable option list container managing roving active-descendant index.",
  },
  {
    name: "ComboboxItem",
    description: "Selectable option entry supporting independent highlighted (active) and selected states.",
  },
  {
    name: "ComboboxEmpty",
    description: "Accessible no-results container rendered when no options match the current query.",
  },
  {
    name: "ComboboxGroup & ComboboxLabel",
    description: "Semantic category organization with non-selectable section headings.",
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
            name: "combobox.tsx",
            type: "file",
            description: "Accessible searchable option picker primitive with query/value separation.",
          },
          {
            name: "input-group.tsx",
            type: "file",
            description: "Composite input group primitive providing optical liquid glass boundary.",
          },
          {
            name: "input.tsx",
            type: "file",
            description: "Canonical single-line text control (reused, not duplicated).",
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
    items: ["input-group", "input", "button"],
  },
];

export default function ComboboxDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>11</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Combobox
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible searchable option picker for selecting one value from a filterable collection.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <ComboboxPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="combobox" />
      </section>

      {/* Callout 1: Combobox vs Search Input */}
      <Callout type="note" title="Combobox combines text entry with option selection">
        Use <strong>Search Input</strong> when users are querying site-wide content or driving a
        results list rather than selecting one value from an associated option collection. Use{" "}
        <strong>Select</strong> when the list of options is small enough that searching is unnecessary.
      </Callout>

      {/* Callout 2: Query vs Value Contract */}
      <Callout type="note" title="Query and committed value are separate pieces of state">
        The search query (what the user is currently typing) and the committed option value (what has
        been selected) are distinct. Typing filters the collection and updates the query; selecting an
        option commits the value.
      </Callout>

      {/* Usage / With Field */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage with Field
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The canonical implementation pairs <code className="text-foreground">Combobox</code> with{" "}
          <code className="text-foreground">Field</code> and <code className="text-foreground">FieldLabel</code>.
          The input control shares geometry and visual language with <code className="text-foreground">Input</code>:
        </p>
        <CodeBlock
          code={`import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

export function TemplateSelector() {
  return (
    <Field id="template-field">
      <FieldLabel htmlFor="template-input">Starter template</FieldLabel>
      <Combobox defaultValue="React">
        <ComboboxInput
          id="template-input"
          placeholder="Search templates..."
          showClear
          aria-describedby="template-desc"
        />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="React">React</ComboboxItem>
            <ComboboxItem value="Next.js">Next.js</ComboboxItem>
            <ComboboxItem value="Remix">Remix</ComboboxItem>
            <ComboboxItem value="Astro">Astro</ComboboxItem>
            <ComboboxEmpty>No templates found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription id="template-desc">
        Type to filter through verified open-source starters.
      </FieldDescription>
    </Field>
  );
}`}
          language="tsx"
          filename="template-selector.tsx"
        />
        <PrimaryFrameworkComboboxDemo />
      </section>

      {/* Grouped Options */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Categorized Groups
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Group related options using <code className="text-foreground">&lt;ComboboxGroup&gt;</code> and{" "}
          <code className="text-foreground">&lt;ComboboxLabel&gt;</code>. Group headers remain non-selectable
          and are preserved while query filtering is active:
        </p>
        <GroupedComboboxDemo />
      </section>

      {/* Interaction States Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Interaction States &amp; Dual-Indicator Focus
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The critical state combination is <strong>Invalid + Focused</strong>. HaloUI ensures that
          error borders on the enclosing <code className="text-foreground">InputGroup</code> and the
          Halo Focus Ring remain independently distinct:
        </p>
        <ComboboxStatesDemo />
      </section>

      {/* Controlled Query & Value Separation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Controlled Query &amp; Value Separation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Manage <code className="text-foreground">value</code> and{" "}
          <code className="text-foreground">inputValue</code> independently to achieve advanced search,
          suggestion prefetching, or custom submit validation:
        </p>
        <ControlledComboboxDemo />
      </section>

      {/* Empty State vs Invalid State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Empty Results are Not Validation Errors
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When a query yields zero matches, Combobox renders <code className="text-foreground">&lt;ComboboxEmpty&gt;</code>.
          HaloUI strictly distinguishes between empty filter results and invalid form state. An empty
          search is an informational collection state and does <em>not</em> tint the input border red or trigger
          an error message.
        </p>
      </section>

      {/* Callout 3: Async Search Boundary */}
      <Callout type="warning" title="Combobox does not perform network fetching">
        Combobox is a client-side interaction primitive; it does not bake in fetch requests or network debounce.
        To search remote APIs, attach an <code className="text-foreground">onInputValueChange</code> listener in
        your application code, debounce with standard React patterns, and pass the resulting collection as children.
      </Callout>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Combobox (Root)</h3>
          <PropsTable rows={COMBOBOX_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">ComboboxInput</h3>
          <PropsTable rows={COMBOBOX_INPUT_PROPS} />
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
            <strong>WAI-ARIA 1.2 Combobox Pattern:</strong> Follows standard W3C Combobox specifications.
            The input carries <code className="text-foreground">role=&quot;combobox&quot;</code> and manages{" "}
            <code className="text-foreground">aria-expanded</code>, <code className="text-foreground">aria-controls</code>,
            and <code className="text-foreground">aria-autocomplete=&quot;list&quot;</code>.
          </p>
          <p>
            <strong>Focus Stability:</strong> Physical browser DOM focus remains securely anchored on the
            text input while arrow keys navigate through matching options, allowing continuous typing without
            unintended focus jumps.
          </p>
          <p>
            <strong>Active vs. Selected:</strong> Roving keyboard highlight indicates the currently previewed
            item without prematurely committing the value. Pressing <kbd>Enter</kbd> commits the selection.
          </p>
          <p>
            <strong>Escape Behavior:</strong> Pressing <kbd>Escape</kbd> closes the portalled popup while
            preserving the committed selection.
          </p>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Combobox is engineered for low latency on desktop and mobile:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Hardware-accelerated CSS transforms on popup reveal.</li>
          <li>Zero DOM measurements or forced layout recalculations during query typing.</li>
          <li>No global document event listeners; cleanup is fully automated by Base UI dismissable layers.</li>
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
    </div>
  );
}
