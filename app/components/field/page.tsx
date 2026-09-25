import * as React from "react";
import type { Metadata } from "next";
import { FieldPreviewStage } from "./field-preview-stage";
import {
  DefaultFieldDemo,
  InvalidFocusedDemo,
  DescriptionAndErrorDemo,
  RequiredOptionalDemo,
  HorizontalFieldDemo,
  DisabledVsReadOnlyDemo,
  ControlVersatilityDemo,
} from "./field-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Field — Forms & Fields — HaloUI",
  description:
    "A semantic composition primitive connecting a form control with its label, description, validation message, and related field context.",
};

const FIELD_PROPS = [
  {
    name: "id",
    type: "string",
    default: "React.useId()",
    required: false,
    description:
      "Explicit control ID. When provided, automatically coordinates htmlFor on FieldLabel, and derived IDs on FieldDescription and FieldError.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal" | "responsive"',
    default: '"vertical"',
    required: false,
    description:
      "Layout arrangement: 'vertical' stacks label over control; 'horizontal' places label and control side-by-side; 'responsive' stacks on mobile viewports.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Whether the field is in an invalid state. Sets data-invalid on the container and propagates through FieldContext to control and error primitives.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Visually marks the field group as disabled. The underlying form control must still carry native disabled semantics.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Coordinates required state across the context, automatically rendering a supplemental visual asterisk indicator on child FieldLabel.",
  },
];

const LABEL_PROPS = [
  {
    name: "htmlFor",
    type: "string",
    default: "context.id",
    required: false,
    description:
      "Targets the ID of the form control. Defaults automatically to the coordinated Field context ID.",
  },
  {
    name: "required",
    type: "boolean",
    default: "context.required",
    required: false,
    description:
      "Renders a supplemental red asterisk indicator marked with aria-hidden='true' so screen readers do not announce duplicate characters.",
  },
  {
    name: "optional",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Renders a supplemental '(Optional)' badge styled with muted text.",
  },
];

const ERROR_PROPS = [
  {
    name: "errors",
    type: "Array<{ message?: string } | string>",
    default: "undefined",
    required: false,
    description:
      "Optional array of validation error messages or schema issue objects. Renders unique messages in an accessible bulleted list if multiple.",
  },
  {
    name: "role",
    type: "string",
    default: '"alert"',
    required: false,
    description:
      "Assistive technology announcement role. Defaults to 'alert' with aria-live='polite' for immediate non-intrusive error announcement.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Field",
    description:
      "Context provider and structural container coordinating layout orientation, invalid state, and accessibility identifiers.",
  },
  {
    name: "FieldLabel",
    description:
      "Persistent visible label automatically bound to the control via htmlFor. Renders optional or required indicators.",
  },
  {
    name: "Form Control (Consumer)",
    description:
      "The interactive input element (Input, Textarea, Select, Combobox, Switch, Checkbox) receiving user input.",
  },
  {
    name: "FieldDescription",
    description:
      "Supporting guidance text connected to the control via aria-describedby for assistive technology.",
  },
  {
    name: "FieldError",
    description:
      "Validation feedback element connected to the control via aria-describedby and announced with role='alert'.",
  },
  {
    name: "FieldContent",
    description:
      "Grouping container for label and description in horizontal and responsive setting row layouts.",
  },
  {
    name: "FieldSet & FieldLegend",
    description:
      "Semantic HTML fieldset and legend wrappers for related multi-control sets such as Radio Groups and Checkbox sets.",
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
            name: "field.tsx",
            type: "file",
            description: "Field primitive and compound components",
          },
          {
            name: "label.tsx",
            type: "file",
            description: "Accessible text label primitive",
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
        description: "Shared semantic color and typography tokens",
      },
    ],
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Registry Dependencies",
    items: ["label"],
  },
  {
    title: "Direct Dependencies",
    items: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
];

export default function FieldDocsPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Forms &amp; Fields · 01
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Field
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A semantic composition primitive that connects a form control with its label,
          description, validation message, and related accessibility context without
          enforcing form-state management.
        </p>
      </div>

      {/* 2. Primary Callout */}
      <Callout type="note" title="Composition vs. Form State">
        <strong className="text-foreground">Field connects form context; it does not manage form state.</strong>{" "}
        Validation rules, values, submission, persistence, and form-library integration
        remain application concerns. Field provides the semantic and accessible adhesive.
      </Callout>

      {/* 3. Interactive Workbench */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Live Preview
        </h2>
        <FieldPreviewStage />
      </section>

      {/* 4. Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="field" />
      </section>

      {/* 5. Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compose <code>Field</code> around a label, an interactive control, and optional
          supporting description or error elements. The components automatically coordinate
          accessibility relationships through React context:
        </p>
        <CodeBlock
          code={`import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function Example() {
  return (
    <Field id="email">
      <FieldLabel>Email address</FieldLabel>
      <Input
        id="email"
        type="email"
        placeholder="alex@company.com"
        aria-describedby="email-description"
      />
      <FieldDescription>
        We'll use this address for billing receipts and account updates.
      </FieldDescription>
    </Field>
  );
}`}
          language="tsx"
        />
      </section>

      {/* 6. Demonstrations & State Contracts */}
      <section className="space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Demonstrations &amp; State Spectrum
          </h2>
          <p className="text-sm text-muted-foreground">
            Evaluate canonical composition patterns across validation, orientation,
            accessibility, and multi-control architectures.
          </p>
        </div>

        {/* Demo 1: Default Vertical */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            01. Canonical Vertical Composition
          </h3>
          <p className="text-sm text-muted-foreground">
            The foundational form pattern: persistent label on top, interactive control in
            the center, and contextual description below.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/10">
            <DefaultFieldDemo />
          </div>
        </div>

        {/* Demo 2: Flagship Invalid + Focused */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            02. Flagship Regression: Invalid + Keyboard Focused State
          </h3>
          <p className="text-sm text-muted-foreground">
            A frequent form-system error is replacing the double-contrast focus indicator
            with an error red border. HaloUI guarantees that the keyboard focus ring and the
            red invalid outline remain simultaneously and unmistakably visible.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/10">
            <InvalidFocusedDemo />
          </div>
        </div>

        {/* Demo 3: Description + Error Coexistence */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            03. Description and Validation Error Coexistence
          </h3>
          <p className="text-sm text-muted-foreground">
            Form controls frequently require both guidance text (e.g. password format
            rules) and active validation feedback. Assistive technology reads both IDs via a
            space-delimited <code>aria-describedby</code> string.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/10">
            <DescriptionAndErrorDemo />
          </div>
        </div>

        {/* Demo 4: Required & Optional */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            04. Required &amp; Optional Guidance
          </h3>
          <p className="text-sm text-muted-foreground">
            Required status must exist semantically on the native control via{" "}
            <code>required</code> or <code>aria-required="true"</code>. The visual red
            asterisk is rendered with <code>aria-hidden="true"</code> so screen readers do
            not announce confusing punctuation.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/10">
            <RequiredOptionalDemo />
          </div>
        </div>

        {/* Demo 5: Horizontal Orientation */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            05. Horizontal Layout (Settings Rows)
          </h3>
          <p className="text-sm text-muted-foreground">
            When composing switches, checkboxes, or compact preferences,{" "}
            <code>orientation="horizontal"</code> pairs with <code>FieldContent</code> to
            align text and control on opposing sides with automatic responsive stacking.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/10">
            <HorizontalFieldDemo />
          </div>
        </div>

        {/* Demo 6: Disabled vs Read-Only */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            06. Disabled vs. Read-Only State Distinction
          </h3>
          <p className="text-sm text-muted-foreground">
            Disabled controls cannot receive focus, cannot be edited, and are omitted from
            submission. Read-only controls can receive keyboard focus, permit text
            selection and clipboard copying, and preserve normal contrast.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/10">
            <DisabledVsReadOnlyDemo />
          </div>
        </div>

        {/* Demo 7: Control Versatility */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            07. Control Versatility: Select, Textarea &amp; FieldSet
          </h3>
          <p className="text-sm text-muted-foreground">
            Field establishes relationships for any interactive form control. Use{" "}
            <code>FieldSet</code> and <code>FieldLegend</code> when grouping related controls
            like multi-option checkbox sets.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/10">
            <ControlVersatilityDemo />
          </div>
        </div>
      </section>

      {/* 7. Key Architecture Callouts */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Core Architectural Principles
        </h2>

        <Callout type="warning" title="Persistent Label Mandatory">
          <strong className="text-foreground">Placeholder text is not a label.</strong>{" "}
          Placeholders disappear upon user input, cause cognitive strain for users with
          memory impairments, and fail contrast requirements. A persistent visible{" "}
          <code>FieldLabel</code> is mandatory for every canonical form field.
        </Callout>

        <Callout type="note" title="Material Architecture Separation">
          <strong className="text-foreground">Field itself is material-neutral.</strong>{" "}
          Field does not apply <code>HaloSurface</code>, glass blurs, or glow effects. The
          interactive controls composed within it (Input, Select, Textarea, Button) own
          interactive material, while Field owns geometry, spacing, and accessibility.
        </Callout>
      </section>

      {/* 8. Anatomy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 9. Props Reference */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Props Reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Component attributes and API contract across the Field primitive set.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold font-mono text-foreground">
            &lt;Field /&gt;
          </h3>
          <PropsTable rows={FIELD_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold font-mono text-foreground">
            &lt;FieldLabel /&gt;
          </h3>
          <PropsTable rows={LABEL_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold font-mono text-foreground">
            &lt;FieldError /&gt;
          </h3>
          <PropsTable rows={ERROR_PROPS} />
        </div>
      </section>

      {/* 10. Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
          <li>
            <strong className="text-foreground">Programmatic Label Association:</strong> Clicking
            the <code>FieldLabel</code> automatically shifts focus to the underlying control via{" "}
            <code>htmlFor ↔ id</code> binding.
          </li>
          <li>
            <strong className="text-foreground">Accessible Descriptions:</strong> Supporting
            instructions in <code>FieldDescription</code> are referenced by the control's{" "}
            <code>aria-describedby</code> attribute, ensuring screen readers announce them on
            focus.
          </li>
          <li>
            <strong className="text-foreground">Accessible Error Announcements:</strong> When an
            error occurs, <code>FieldError</code> renders with <code>role="alert"</code> and{" "}
            <code>aria-live="polite"</code>, immediately notifying assistive technology.
          </li>
          <li>
            <strong className="text-foreground">Independent Focus Indicators:</strong> Invalid
            error states tint the border but never suppress, overwrite, or clip the{" "}
            <code>halo-focus-ring</code> double-contrast outline.
          </li>
          <li>
            <strong className="text-foreground">Semantic Grouping:</strong> Multi-control sets use{" "}
            <code>FieldSet</code> (<code>&lt;fieldset&gt;</code>) and <code>FieldLegend</code> (
            <code>&lt;legend&gt;</code>) to announce group context properly.
          </li>
        </ul>
      </section>

      {/* 11. Dependencies */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </section>

      {/* 12. Installed Files */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={FILE_TREE} />
      </section>
    </div>
  );
}
