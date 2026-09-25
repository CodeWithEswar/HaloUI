import * as React from "react";
import type { Metadata } from "next";
import { SelectPreviewStage } from "./select-preview-stage";
import {
  PrimaryFrameworkSelectDemo,
  GroupedOptionsSelectDemo,
  SelectStatesDemo,
  ControlledSelectDemo,
} from "./select-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Select — Forms & Fields — HaloUI",
  description:
    "An accessible custom option picker for selecting one value from a structured list of choices.",
};

const SELECT_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string | null",
    default: "undefined",
    required: false,
    description: "The controlled value of the selected item in the select list.",
  },
  {
    name: "defaultValue",
    type: "string | null",
    default: "undefined",
    required: false,
    description: "The default value of the selected item for uncontrolled usage.",
  },
  {
    name: "onValueChange",
    type: "(value: string | null) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when a new option value is committed by the user.",
  },
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled open state of the portalled selection popup.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    required: false,
    description: "Initial open state of the popup for uncontrolled implementations.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    required: false,
    description: "Event handler called when the open state of the popup changes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents opening the popup, keyboard interaction, and selection changes.",
  },
  {
    name: "name",
    type: "string",
    default: "undefined",
    required: false,
    description: "Form name attribute for native form submission via hidden input synchronization.",
  },
];

const SELECT_TRIGGER_PROPS: PropRow[] = [
  {
    name: "size",
    type: '"default" | "sm"',
    default: '"default"',
    required: false,
    description: "Visual height and density tier (default: 40px, sm: 32px).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes to append to the trigger button.",
  },
  {
    name: "aria-invalid",
    type: 'boolean | "true" | "false"',
    default: "undefined",
    required: false,
    description: "Activates dual-indicator error borders and connects with Field validation.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Select (Root)",
    description: "State orchestration container managing selection value, open state, and keyboard roving tabindex.",
  },
  {
    name: "SelectTrigger",
    description: "Interactive button triggering popup reveal, styled with 10-layer optical liquid glass and Halo Focus Ring.",
  },
  {
    name: "SelectValue",
    description: "Displays current committed selection text or configurable placeholder label.",
  },
  {
    name: "SelectContent",
    description: "Portalled floating surface with high-diffusion liquid glass backdrop, collision handling, and scroll boundaries.",
  },
  {
    name: "SelectItem",
    description: "Selectable option row maintaining distinct highlighted (roving focus) and selected (check indicator) states.",
  },
  {
    name: "SelectGroup & SelectLabel",
    description: "Structural semantic grouping with non-selectable category headings.",
  },
  {
    name: "SelectSeparator",
    description: "1px hairline divider between categorical option groups.",
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
            name: "select.tsx",
            type: "file",
            description: "Custom accessible option picker primitive with HaloUI liquid glass overlay.",
          },
          {
            name: "field.tsx",
            type: "file",
            description: "Accessible Field, Label, Description, and Error primitives.",
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
];

export default function SelectDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>10</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Select
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible custom option picker for selecting one value from a structured list of choices.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <SelectPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="select" />
      </section>

      {/* Callout 1: Responsibility Boundary */}
      <Callout type="note" title="Select is a custom single-value option picker">
        Use <strong>Native Select</strong> when native browser/OS picker behavior and minimal runtime
        are preferred. Use <strong>Combobox</strong> when users need to search, filter, or query
        available choices.
      </Callout>

      {/* Usage / With Field */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage with Field
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The canonical implementation pairs <code className="text-foreground">Select</code> with{" "}
          <code className="text-foreground">Field</code> and <code className="text-foreground">FieldLabel</code>.
          The trigger shares geometry and visual language with <code className="text-foreground">Input</code>:
        </p>
        <CodeBlock
          code={`import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function FrameworkField() {
  return (
    <Field id="framework-field">
      <FieldLabel htmlFor="framework-select">Application framework</FieldLabel>
      <Select defaultValue="react">
        <SelectTrigger id="framework-select" aria-describedby="framework-desc">
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
        </SelectContent>
      </Select>
      <FieldDescription id="framework-desc">
        Determines compiler toolchain, SSR runtime, and scaffolding presets.
      </FieldDescription>
    </Field>
  );
}`}
          language="tsx"
          filename="framework-field.tsx"
        />
        <PrimaryFrameworkSelectDemo />
      </section>

      {/* Grouped Options */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Option Groups &amp; Categories
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Structure extensive option catalogs into semantic groups using{" "}
          <code className="text-foreground">&lt;SelectGroup&gt;</code>, non-selectable{" "}
          <code className="text-foreground">&lt;SelectLabel&gt;</code> headings, and subtle hairline{" "}
          <code className="text-foreground">&lt;SelectSeparator&gt;</code> dividers:
        </p>
        <GroupedOptionsSelectDemo />
      </section>

      {/* Interaction States Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Interaction States &amp; Dual-Indicator Focus
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The critical state combination is <strong>Invalid + Focused</strong>. HaloUI ensures that
          error borders and the 2px double-contrast Halo Focus Ring remain independently distinct.
          Validation error styling never suppresses the active keyboard focus outline:
        </p>
        <SelectStatesDemo />
      </section>

      {/* Controlled Selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Controlled Selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Select uses <code className="text-foreground">value</code> and{" "}
          <code className="text-foreground">onValueChange</code> for standard controlled state:
        </p>
        <ControlledSelectDemo />
      </section>

      {/* Highlighting vs Selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Highlighted vs. Selected State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A fundamental requirement of accessible select systems is that <strong>Highlighted ≠ Selected</strong>:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
          <li>
            <strong>Highlighted (Roving Focus):</strong> Indicates the item currently under the keyboard
            or mouse cursor. Styled with subtle translucent background tint.
          </li>
          <li>
            <strong>Selected:</strong> Represents the committed choice. Indicated by a dedicated checkmark
            icon (<code className="text-foreground">Tick02Icon</code>) and font weight accentuation.
          </li>
          <li>
            <strong>Selected + Highlighted:</strong> When arrowing back to the currently committed choice,
            both the checkmark and the highlight background remain simultaneously visible without contrast clash.
          </li>
        </ul>
      </section>

      {/* Portalled Overlay Architecture */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Portalled Liquid Glass Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="text-foreground">SelectContent</code> renders inside a React Portal attached
          to the document body. It inherits theme variables (<code className="text-foreground">light</code> /{" "}
          <code className="text-foreground">dark</code>) automatically, detects viewport edge collisions,
          and calculates flip/slide offsets without introducing layout shifts.
        </p>
        <Callout type="note" title="No Scrim for Dropdown Overlays">
          Select overlays do not employ modal attenuation scrims. The portalled surface floats directly
          over page content with elevation shadow and 24px backdrop blur, allowing users to reference
          surrounding form fields while making choices.
        </Callout>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Select (Root)</h3>
          <PropsTable rows={SELECT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">SelectTrigger</h3>
          <PropsTable rows={SELECT_TRIGGER_PROPS} />
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
            <strong>WAI-ARIA Combobox/Listbox Pattern:</strong> Built upon Base UI headless primitives,
            providing complete ARIA 1.2 compliance, screen reader announcement of selected state, and
            proper <code className="text-foreground">aria-expanded</code> toggling.
          </p>
          <p>
            <strong>Keyboard Navigation:</strong> Pressing <kbd>Enter</kbd>, <kbd>Space</kbd>, or{" "}
            <kbd>ArrowDown</kbd> opens the menu. Arrow keys navigate items via roving tabindex, and typing
            triggers typeahead jumping to matching items.
          </p>
          <p>
            <strong>Focus Restoration:</strong> Dismissing the popup with <kbd>Escape</kbd> or making a
            selection reliably restores focus to the <code className="text-foreground">SelectTrigger</code>.
          </p>
          <p>
            <strong>Outside Dismissal:</strong> Pointer interaction outside the popup closes the overlay
            without intercepting unrelated page clicks.
          </p>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Select balances visual polish with tight runtime boundaries:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Portal positioning relies on optimized ResizeObserver and CSS transform translations.</li>
          <li>Zero full-screen backdrop filters; optical blur is strictly scoped to the popup boundary.</li>
          <li>Hardware-accelerated micro-transitions on entry and dismissal.</li>
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
