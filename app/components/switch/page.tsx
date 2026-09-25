import * as React from "react";
import type { Metadata } from "next";
import { SwitchPreviewStage } from "./switch-preview-stage";
import {
  PrimarySwitchDemo,
  SettingsListDemo,
  SwitchStatesDemo,
  SwitchSizesDemo,
  ControlledSwitchDemo,
  LabelActivationDemo,
} from "./switch-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Switch — Forms & Fields — HaloUI",
  description:
    "An accessible binary control for immediately turning a setting on or off.",
};

const SWITCH_PROPS: PropRow[] = [
  {
    name: "checked",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "The controlled checked state of the switch, representing whether the setting is On (true) or Off (false).",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    required: false,
    description: "The initial checked state for uncontrolled usage.",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    default: "undefined",
    required: false,
    description: "Event handler called when the checked state changes via pointer tap or keyboard Space activation.",
  },
  {
    name: "size",
    type: '"default" | "sm"',
    default: '"default"',
    required: false,
    description: "Size preset for the switch control. Default is 44×24px with 20px thumb; Small is 32×18px with 14px thumb.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables user interaction and dims the control while keeping both On and Off states visually distinct.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Indicates that the switch must be toggled on prior to form submission.",
  },
  {
    name: "name",
    type: "string",
    default: "undefined",
    required: false,
    description: "Form submission field name for standard HTML form synchronization.",
  },
  {
    name: "value",
    type: "string",
    default: '"on"',
    required: false,
    description: "The value submitted with the form when the switch is active.",
  },
];

const SWITCH_ANATOMY: AnatomyPart[] = [
  {
    name: "Root / Track",
    description: "The interactive pill-shaped channel container (button role='switch') that communicates On/Off state.",
  },
  {
    name: "Thumb",
    description: "The optical glass bead indicator that physically translates from left to right when activated.",
  },
  {
    name: "Focus Ring",
    description: "The independent double-contrast Halo Focus Ring that surrounds the track upon keyboard focus.",
  },
];

const SWITCH_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "switch.tsx",
            type: "file",
            description: "Main Switch component with Base UI primitive, Halo optical track, and RTL translation.",
          },
          {
            name: "field.tsx",
            type: "file",
            description: "Composition primitive for associating label, description, and accessibility attributes.",
          },
          {
            name: "label.tsx",
            type: "file",
            description: "Accessible text label with htmlFor association.",
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
        description: "Optical depth, focus ring, surface tints, and motion preset definitions.",
      },
    ],
  },
];

const SWITCH_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "Required Packages",
    items: [
      "@base-ui/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Registry Dependencies",
    items: ["field"],
  },
];

export default function SwitchDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-border bg-muted/30 text-muted-foreground">
            Forms &amp; Fields · 16
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            WAI-ARIA Switch Pattern
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Switch
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          An accessible binary control for immediately turning a setting on or off,
          elevated with HaloUI&apos;s physical liquid glass track and tactile bead thumb.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <SwitchPreviewStage />
      </section>

      {/* 3. Core Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Callout type="note" title="Switch represents an immediate on/off setting">
          Use Checkbox for selection, inclusion, or agreement, and use Toggle for persistent pressed/unpressed action state.
        </Callout>
        <Callout type="note" title="Immediate does not mean network-owned">
          Switch owns the setting state interaction, not persistence. API requests, optimistic updates, error recovery, and saved-setting behavior remain application responsibilities.
        </Callout>
      </div>

      {/* 4. Installation */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="switch" />
      </section>

      {/* 5. Usage */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          code={`import { Switch } from "@/components/ui/switch";

export function Example() {
  return <Switch aria-label="Toggle notifications" />;
}`}
        />
      </section>

      {/* 6. With Label & Description */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            With Label and Description
          </h2>
          <p className="text-sm text-muted-foreground">
            Composing Switch with Field provides automatic ID coordination, description linkage, and label click activation.
          </p>
        </div>
        <PrimarySwitchDemo />
        <CodeBlock
          language="tsx"
          code={`import { Switch } from "@/components/ui/switch";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function AutoSaveSetting() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <Field id="autosave-field">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <FieldLabel htmlFor="autosave-control" className="text-sm font-semibold cursor-pointer">
            Auto-save
          </FieldLabel>
          <FieldDescription className="text-xs text-muted-foreground">
            Save changes automatically while editing documents.
          </FieldDescription>
        </div>
        <Switch
          id="autosave-control"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>
    </Field>
  );
}`}
        />
      </section>

      {/* 7. Settings Row List */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Settings Row
          </h2>
          <p className="text-sm text-muted-foreground">
            A realistic preferences list showcasing multiple independent binary settings.
          </p>
        </div>
        <SettingsListDemo />
      </section>

      {/* 8. Controlled vs Uncontrolled */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Controlled State
          </h2>
          <p className="text-sm text-muted-foreground">
            Use <code>checked</code> and <code>onCheckedChange</code> when application state owns the truth.
          </p>
        </div>
        <ControlledSwitchDemo />
      </section>

      {/* 9. Sizes */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Sizes
          </h2>
          <p className="text-sm text-muted-foreground">
            HaloUI Switch provides two standard sizes: <strong>Default</strong> (44×24px track, 20px thumb) and <strong>Small</strong> (32×18px track, 14px thumb).
          </p>
        </div>
        <SwitchSizesDemo />
      </section>

      {/* 10. States Matrix */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            States
          </h2>
          <p className="text-sm text-muted-foreground">
            Evaluation of Off, On, and Disabled permutations over optical liquid glass backdrops.
          </p>
        </div>
        <SwitchStatesDemo />
      </section>

      {/* 11. Label Activation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Label Activation
          </h2>
          <p className="text-sm text-muted-foreground">
            Clicking or tapping the associated Label toggles the Switch exactly once without accidental double toggling.
          </p>
        </div>
        <LabelActivationDemo />
      </section>

      {/* 12. Switch vs Checkbox vs Toggle */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Semantic Distinctions
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/40 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Role</th>
                <th className="p-3">Mental Model</th>
                <th className="p-3">Canonical Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-foreground">Switch</td>
                <td className="p-3 font-mono">role=&quot;switch&quot;</td>
                <td className="p-3">Immediate binary on/off setting</td>
                <td className="p-3">Dark mode, Auto-save, Airplane mode</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Checkbox</td>
                <td className="p-3 font-mono">role=&quot;checkbox&quot;</td>
                <td className="p-3">Selection, inclusion, or agreement in a form/set</td>
                <td className="p-3">Terms agreement, Select table items</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Toggle</td>
                <td className="p-3 font-mono">role=&quot;button&quot; aria-pressed</td>
                <td className="p-3">Persistent active/pressed command state</td>
                <td className="p-3">Bold formatting, Mute microphone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 13. Keyboard Interaction */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Keyboard Interaction
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/40 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="p-3">Key</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-mono text-foreground">Tab</td>
                <td className="p-3">Moves focus to the switch control.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground">Space</td>
                <td className="p-3">Toggles the switch between On and Off states.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground">Shift + Tab</td>
                <td className="p-3">Moves focus back to the preceding focusable element.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 14. Props */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>
        <PropsTable rows={SWITCH_PROPS} />
      </section>

      {/* 15. Anatomy */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Component Anatomy
        </h2>
        <Anatomy parts={SWITCH_ANATOMY} />
      </section>

      {/* 16. Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li><strong>WAI-ARIA Pattern:</strong> Implements <code>role=&quot;switch&quot;</code> with coordinated <code>aria-checked=&quot;true|false&quot;</code>.</li>
          <li><strong>Accessible Naming:</strong> Always supply a visible <code>&lt;FieldLabel&gt;</code>, <code>&lt;Label&gt;</code>, or <code>aria-label</code>.</li>
          <li><strong>Independent Focus Ring:</strong> Double-contrast Halo Focus Ring remains clearly visible in both Off and On states.</li>
          <li><strong>Geometry &amp; Color:</strong> On and Off states are distinguished by thumb translation, not color alone.</li>
          <li><strong>Reduced Motion:</strong> Supports <code>prefers-reduced-motion: reduce</code> via instant state transitions without thumb lag.</li>
        </ul>
      </section>

      {/* 17. Dependencies & Files */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Dependencies
          </h2>
          <DependencyList groups={SWITCH_DEPENDENCIES} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Installed Files
          </h2>
          <FileTree items={SWITCH_FILES} />
        </div>
      </section>
    </div>
  );
}
