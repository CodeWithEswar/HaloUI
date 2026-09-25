import * as React from "react";
import type { Metadata } from "next";
import { InputPreviewStage } from "./input-preview-stage";
import {
  PrimaryInputFieldDemo,
  InputTypesDemo,
  InputStatesDemo,
  ControlledVsUncontrolledDemo,
} from "./input-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Input — Forms & Fields — HaloUI",
  description:
    "A single-line native text-entry control with HaloUI material states, accessible focus treatment, validation support, and consistent form behavior.",
};

const INPUT_PROPS: PropRow[] = [
  {
    name: "type",
    type: "string",
    default: '"text"',
    required: false,
    description:
      "Native HTML input type: 'text', 'email', 'password', 'search', 'tel', 'url', 'number', etc.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes to append to the input element.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native disabled attribute. Prevents editing and interaction.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native readOnly attribute. Prevents editing while preserving keyboard focus and text selection.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native required constraint for form validation.",
  },
  {
    name: "aria-invalid",
    type: 'boolean | "true" | "false"',
    default: "undefined",
    required: false,
    description: "Communicates invalid error state to assistive technologies and activates the dual-indicator error styling.",
  },
  {
    name: "...props",
    type: 'React.ComponentProps<"input">',
    default: "—",
    required: false,
    description: "All standard HTML <input> attributes (placeholder, value, defaultValue, onChange, autoComplete, etc.).",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Input Root",
    description:
      "Native HTML <input> element. Houses browser text selection, password managers, IME input, and native validation.",
  },
  {
    name: "Optical Substrate",
    description:
      "Restrained 10-layer liquid glass surface with subtle backdrop diffusion, bottom edge light, and inner depth.",
  },
  {
    name: "Editable Edge",
    description:
      "Calibrated 1px boundary that defines the active input territory across dark and light optical backgrounds.",
  },
  {
    name: "Halo Focus Ring",
    description:
      "Double-contrast 2px focus outline rendered via focus-visible, distinct from invalid error tinting.",
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
            name: "input.tsx",
            type: "file",
            description: "Native text-entry control primitive.",
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

export default function InputDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms & Fields</span>
          <span>·</span>
          <span>04</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Input
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A single-line native text-entry control with HaloUI material states, accessible
          focus treatment, validation support, and consistent form behavior.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <InputPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="input" />
      </section>

      {/* Callout 1: Responsibility Boundary */}
      <Callout type="note" title="Input owns text entry, not field context">
        Input owns single-line text entry, not label or validation context. Compose Input with{" "}
        <code className="text-foreground">&lt;Field&gt;</code> for persistent labels, descriptions,
        validation messages, and required/optional semantics.
      </Callout>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The canonical implementation pairs <code className="text-foreground">Input</code> with{" "}
          <code className="text-foreground">Field</code> and <code className="text-foreground">FieldLabel</code>:
        </p>
        <CodeBlock
          code={`import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function UserEmailField() {
  return (
    <Field id="user-email">
      <FieldLabel htmlFor="user-email">Email address</FieldLabel>
      <Input
        id="user-email"
        type="email"
        placeholder="name@company.com"
        autoComplete="email"
      />
      <FieldDescription>
        Used for verification and critical account security alerts.
      </FieldDescription>
    </Field>
  );
}`}
          language="tsx"
          filename="email-field.tsx"
        />
        <PrimaryInputFieldDemo />
      </section>

      {/* Input Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Supported Native Input Types
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Input applies unified optical styling to standard native HTML input types without
          overriding their built-in browser input modes or mobile keyboard layouts:
        </p>
        <InputTypesDemo />
      </section>

      {/* Callout 2: Placeholder Warning */}
      <Callout type="warning" title="Placeholder text is supplemental">
        Do not use placeholder text as the only label for a form control. Placeholders disappear
        as soon as a user begins typing, create cognitive friction, and have poor contrast.
      </Callout>

      {/* States Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Interaction States &amp; Dual-Indicator Focus
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The most critical state combination is <strong>Invalid + Focused</strong>. HaloUI ensures
          that invalid error borders and the 2px double-contrast Halo Focus Ring remain
          independently distinct. Error indication never suppresses the active keyboard focus outline:
        </p>
        <InputStatesDemo />
      </section>

      {/* Controlled vs Uncontrolled */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Controlled vs. Uncontrolled
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Input is a native HTML component. It supports both standard React controlled state{" "}
          (<code className="text-foreground">value</code> + <code className="text-foreground">onChange</code>)
          and uncontrolled form libraries (<code className="text-foreground">defaultValue</code>,{" "}
          <code className="text-foreground">name</code>, <code className="text-foreground">ref</code>):
        </p>
        <ControlledVsUncontrolledDemo />
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props
        </h2>
        <PropsTable rows={INPUT_PROPS} />
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
            <strong>Native HTML Semantics:</strong> Implemented as a genuine{" "}
            <code className="text-foreground">&lt;input&gt;</code> element, preserving native text
            selection, IME composition for international input, password manager autofill, and browser form submission.
          </p>
          <p>
            <strong>Focus Visibility:</strong> Styled with the Halo Focus Ring, featuring a 2px offset
            and double-contrast outline visible across all Light, Dark, Spectral, and image backgrounds.
          </p>
          <p>
            <strong>Dual-Indicator Invalid States:</strong> Error state is indicated both by a red border
            and by association with an explicit <code className="text-foreground">FieldError</code> via{" "}
            <code className="text-foreground">aria-describedby</code> and <code className="text-foreground">aria-invalid=&quot;true&quot;</code>.
          </p>
          <p>
            <strong>Disabled vs. Read-Only:</strong> Disabled inputs are removed from tab order with{" "}
            <code className="text-foreground">disabled</code>; read-only inputs remain focusable and
            selectable with <code className="text-foreground">readOnly</code>, allowing users to copy existing keys and identifiers.
          </p>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Input is optimized for dense enterprise applications where hundreds of inputs may appear on a single page:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>100% Server Component compatible without <code className="text-foreground">&quot;use client&quot;</code>.</li>
          <li>0 React hooks, 0 effects, 0 event listeners in the primitive.</li>
          <li>No SVG filters, no blur animations, no rAF loops.</li>
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
              Semantic composition connecting label, input, description, and validation error.
            </div>
          </a>
          <a
            href="/components/input-group"
            className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors block space-y-1"
          >
            <div className="font-semibold text-foreground text-sm">Input Group</div>
            <div className="text-xs text-muted-foreground">
              Composes Input with prefixes, suffixes, icons, and interactive actions.
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
            Initial release of Input as Forms &amp; Fields 04. Native single-line text entry with
            restrained liquid glass optical substrate, independent focus ring, and dual-indicator invalid state.
          </p>
        </div>
      </section>
    </div>
  );
}
