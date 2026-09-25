import * as React from "react";
import type { Metadata } from "next";
import { LabelPreviewStage } from "./label-preview-stage";
import {
  LabelInputAssociationDemo,
  LabelCheckboxAssociationDemo,
  LabelDisabledPeerDemo,
  LabelLongWrappingDemo,
  LabelVsFieldLabelVsLegendDemo,
} from "./label-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Label — Forms & Fields — HaloUI",
  description:
    "An accessible text label for associating a visible name with a form control.",
};

const LABEL_PROPS: PropRow[] = [
  {
    name: "htmlFor",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "The ID of the form control this label names. Clicking the label shifts focus to the corresponding control according to native HTML behavior.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes to append to the label element.",
  },
  {
    name: "...props",
    type: 'React.ComponentProps<"label">',
    default: "—",
    required: false,
    description: "Standard HTML <label> attributes supported without restriction.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Label root",
    description:
      "Semantic HTML <label> element providing programmatic accessibility tree naming.",
  },
  {
    name: "Label content",
    description:
      "Visible accessible text identifying the specific purpose of the associated control.",
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
            name: "label.tsx",
            type: "file",
            description: "Accessible text label primitive component.",
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
        description: "Shared HaloUI design system tokens.",
      },
    ],
  },
];

const DEPENDENCIES_DATA: DependencyGroup[] = [
  {
    title: "Direct Dependencies",
    items: ["clsx", "tailwind-merge"],
  },
];

export default function LabelDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms & Fields</span>
          <span>·</span>
          <span>03</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Label
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible text label for associating a visible name with a form control.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <LabelPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="label" />
      </section>

      {/* Callout 1: Role of Label */}
      <Callout type="note" title="Label identifies a form control">
        Label identifies a form control. Use Description for supporting guidance and Legend
        for the shared name of a semantic control group inside a fieldset.
      </Callout>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Associate <code className="text-foreground">Label</code> with any focusable or labelable
          control via the <code className="text-foreground">htmlFor</code> attribute matching the
          control&apos;s <code className="text-foreground">id</code>:
        </p>
        <CodeBlock
          code={`import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function EmailField() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="name@company.com" />
    </div>
  );
}`}
          language="tsx"
          filename="email-field.tsx"
        />
      </section>

      {/* Association */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Association &amp; Click Delegation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Clicking or tapping an associated label automatically delegates focus to the target
          input. This enlarges the practical touch hit-target significantly, which is critical
          for mobile usability and motor accessibility.
        </p>
        <LabelInputAssociationDemo />
      </section>

      {/* With Checkbox */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          With Checkbox &amp; Compact Controls
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For small targets like checkboxes and radio buttons, binding a label allows users to
          toggle the control by clicking either the indicator or the adjacent label text.
        </p>
        <LabelCheckboxAssociationDemo />
      </section>

      {/* Callout 2: Placeholder Warning */}
      <Callout type="warning" title="Placeholder is not a label">
        A placeholder is not a replacement for an accessible, persistent label. Placeholders
        disappear when users start typing, have poor default contrast, and are omitted or
        unreliably announced by many screen readers. Always provide a persistent visible Label.
      </Callout>

      {/* Disabled Controls */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Disabled Controls
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI&apos;s <code className="text-foreground">Label</code> uses Tailwind&apos;s{" "}
          <code className="text-foreground">peer-disabled:</code> styling to automatically adjust its
          visual appearance when placed alongside a disabled sibling input, while maintaining
          sufficient contrast for readability.
        </p>
        <LabelDisabledPeerDemo />
      </section>

      {/* Long Wrapping Labels */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Long Wrapping Labels
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Essential form labels must never be arbitrarily truncated with ellipses. Label uses
          fluid line wrapping to ensure multi-sentence legal disclosures and technical requirements
          remain completely legible across all device viewports.
        </p>
        <LabelLongWrappingDemo />
      </section>

      {/* Semantic Hierarchy Comparison */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Hierarchy: Label vs FieldLabel vs Legend
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Understanding the three naming layers in HaloUI:
        </p>
        <LabelVsFieldLabelVsLegendDemo />
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props
        </h2>
        <PropsTable rows={LABEL_PROPS} />
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
          Accessibility
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Native HTML Semantics:</strong> Rendered as an authentic{" "}
            <code className="text-foreground">&lt;label&gt;</code> element, rather than a{" "}
            <code className="text-foreground">&lt;span&gt;</code> or <code className="text-foreground">&lt;div&gt;</code> with click handlers.
          </p>
          <p>
            <strong>Keyboard Navigation:</strong> Label is not an extra Tab stop (<code className="text-foreground">tabIndex</code> is omitted). Focus moves directly to interactive controls.
          </p>
          <p>
            <strong>No Trapped Pointer Events:</strong> Pointer events remain enabled on the label so
            clicks reach the control according to native browser mechanics.
          </p>
          <p>
            <strong>Required Indicators:</strong> Required semantics belong to the input (<code className="text-foreground">required</code> attribute) and Field context. Label renders cleanly as text without spoofing aria attributes.
          </p>
        </div>
      </section>

      {/* Motion & Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Label is a zero-runtime primitive:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>100% Server Component compatible without <code className="text-foreground">&quot;use client&quot;</code>.</li>
          <li>0 React hooks, 0 side effects, 0 event listeners.</li>
          <li>0 layout recalculations or DOM observers.</li>
        </ul>
      </section>

      {/* Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </section>

      {/* Installed Files */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installed Files
        </h2>
        <FileTree items={FILE_TREE} />
      </section>

      {/* Related Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/components/field"
            className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors block space-y-1"
          >
            <div className="font-semibold text-foreground text-sm">Field</div>
            <div className="text-xs text-muted-foreground">
              Composes Label with description, error messages, and context coordination.
            </div>
          </a>
          <a
            href="/components/field-group"
            className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors block space-y-1"
          >
            <div className="font-semibold text-foreground text-sm">Field Group</div>
            <div className="text-xs text-muted-foreground">
              Structural grouping primitive for organizing multiple related fields.
            </div>
          </a>
        </div>
      </section>

      {/* Changelog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Changelog
        </h2>
        <div className="border border-border rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>v1.0.0</span>
            <span className="text-xs text-muted-foreground font-normal">· September 25, 2026</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Initial release of Label as Forms &amp; Fields 03. Low-level accessible labeling
            primitive with native htmlFor association and zero runtime overhead.
          </p>
        </div>
      </section>
    </div>
  );
}
