import * as React from "react";
import type { Metadata } from "next";
import { FieldGroupPreviewStage } from "./field-group-preview-stage";
import {
  VerticalGroupDemo,
  HorizontalGroupDemo,
  MiddleFieldInvalidFocusedDemo,
  FieldSetVsFieldGroupDemo,
} from "./field-group-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Field Group — Forms & Fields — HaloUI",
  description:
    "Organizes multiple related fields into a consistent structural group while preserving each field's individual semantics.",
};

const FIELD_GROUP_PROPS: PropRow[] = [
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    required: false,
    description:
      "Controls layout flow. 'vertical' stacks fields with consistent inter-field spacing rhythm. 'horizontal' forms a 2-column grid on wider screens, stacking automatically on mobile viewports.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes to append to the container.",
  },
  {
    name: "...props",
    type: 'React.ComponentProps<"div">',
    default: "—",
    required: false,
    description: "Standard HTML <div> attributes supported without restriction.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "FieldGroup",
    description:
      "Structural layout wrapper (neutral <div>). Provides responsive arrangement and consistent spacing between sibling fields.",
  },
  {
    name: "Field",
    description:
      "Individual semantic field composition. Owns ID coordination, control state, and accessible associations.",
  },
  {
    name: "Control",
    description:
      "Actual interactive form element (Input, Select, Textarea) within each Field receiving user focus and inputs.",
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
            name: "field-group.tsx",
            type: "file",
            description: "FieldGroup structural layout primitive component.",
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

export default function FieldGroupDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms & Fields</span>
          <span>·</span>
          <span>02</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Field Group
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Organizes multiple related fields into a consistent structural group while
          preserving each field&apos;s individual semantics.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <FieldGroupPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="field-group" />
      </section>

      {/* Callout 1: Structural Boundary */}
      <Callout type="note" title="Field Group is a structural layout primitive">
        Field Group does not replace Field, Form, or semantic fieldset/legend grouping.
        It manages only the inter-field spacing rhythm and responsive arrangement of sibling
        fields without taking ownership of their values, validation, or individual accessibility contracts.
      </Callout>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compose <code className="text-foreground">FieldGroup</code> around multiple{" "}
          <code className="text-foreground">&lt;Field&gt;</code> compositions to enforce uniform
          spacing throughout a form section.
        </p>
        <CodeBlock
          code={`import { FieldGroup } from "@/components/ui/field-group";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ProfileForm() {
  return (
    <FieldGroup>
      <Field id="first-name">
        <FieldLabel htmlFor="first-name">First name</FieldLabel>
        <Input id="first-name" placeholder="First name" />
      </Field>

      <Field id="last-name">
        <FieldLabel htmlFor="last-name">Last name</FieldLabel>
        <Input id="last-name" placeholder="Last name" />
      </Field>

      <Field id="email">
        <FieldLabel htmlFor="email">Email address</FieldLabel>
        <Input id="email" type="email" placeholder="name@company.com" />
        <FieldDescription>
          Primary address for account communication.
        </FieldDescription>
      </Field>
    </FieldGroup>
  );
}`}
          language="tsx"
          filename="profile-form.tsx"
        />
      </section>

      {/* Vertical Groups */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Vertical Groups
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The default vertical orientation provides a consistent inter-field spacing rhythm
          (<code className="text-foreground">gap-4 sm:gap-5</code>) that pairs naturally with
          individual field internal spacing without overriding it.
        </p>
        <VerticalGroupDemo />
      </section>

      {/* Horizontal Groups */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Horizontal Groups
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Set <code className="text-foreground">orientation=&quot;horizontal&quot;</code> to arrange
          closely related short controls (such as first/last name or city/postal code) in a
          two-column grid on desktop screens. On mobile viewports, CSS automatically stacks
          them vertically to prevent text truncation and awkward touch targets.
        </p>
        <HorizontalGroupDemo />
      </section>

      {/* With Validation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          With Validation (Isolated Child State)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A critical architectural principle of HaloUI is that{" "}
          <strong>Field Group does NOT derive an invalid state from its descendants</strong>.
          When a child field is in an invalid error state, only that specific field displays an
          error message and applies error-focused styling. The parent Field Group container
          remains materially and semantically neutral.
        </p>
        <MiddleFieldInvalidFocusedDemo />
      </section>

      {/* FieldSet vs FieldGroup Callout & Comparison */}
      <Callout type="warning" title="Field Group is NOT automatically a FieldSet">
        Use fieldset and legend semantics when several controls represent one semantic choice group
        (such as a group of radio buttons or related checkboxes). Do not use Field Group alone as a
        substitute for those semantics.
      </Callout>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Semantic Boundary: FieldGroup vs FieldSet
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A visual group of text fields (like First Name, Last Name, and Email) does not require a{" "}
          <code className="text-foreground">&lt;fieldset&gt;</code>. Screen readers announce fieldsets
          by reading their legend whenever any child control receives focus, which causes redundant
          announcements in standard visual groups.
        </p>
        <FieldSetVsFieldGroupDemo />
      </section>

      {/* Composition */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Composition
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Field Group is designed to nest cleanly inside surfaces, dialogs, drawers, and form cards.
          Because it has zero background or border styling, it remains completely transparent and
          inherits the optical depth of its container.
        </p>
        <CodeBlock
          code={`<Card className="p-6">
  <form onSubmit={handleSubmit}>
    <FieldGroup orientation="vertical">
      <FieldGroup orientation="horizontal">
        <Field id="first-name">
          <FieldLabel htmlFor="first-name">First name</FieldLabel>
          <Input id="first-name" />
        </Field>
        <Field id="last-name">
          <FieldLabel htmlFor="last-name">Last name</FieldLabel>
          <Input id="last-name" />
        </Field>
      </FieldGroup>

      <Field id="email">
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" />
      </Field>
    </FieldGroup>
  </form>
</Card>`}
          language="tsx"
        />
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props
        </h2>
        <PropsTable rows={FIELD_GROUP_PROPS} />
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
            <strong>Semantic HTML:</strong> Field Group renders a neutral{" "}
            <code className="text-foreground">&lt;div&gt;</code> without gratuitous{" "}
            <code className="text-foreground">role=&quot;group&quot;</code> or{" "}
            <code className="text-foreground">aria-label</code> attributes. This ensures screen readers
            do not introduce confusing extra virtual navigation levels.
          </p>
          <p>
            <strong>Keyboard Navigation &amp; Tab Order:</strong> Field Group is not focusable and does
            not add <code className="text-foreground">tabIndex</code>. Tab order follows the logical
            DOM reading order naturally.
          </p>
          <p>
            <strong>Focus Visibility:</strong> Container layout uses sufficient overflow margins so that
            child controls&apos; 2px Halo Focus Rings are never clipped by boundaries or adjacent sibling
            borders.
          </p>
          <p>
            <strong>Responsive DOM Order:</strong> The horizontal two-column grid uses standard CSS Grid
            without visual reordering (<code className="text-foreground">order</code>), guaranteeing that
            the visual reading order and the accessibility tree reading order remain 100% synchronized.
          </p>
        </div>
      </section>

      {/* Responsive Behavior */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Responsive Behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When <code className="text-foreground">orientation=&quot;horizontal&quot;</code> is active:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>
            <strong>Mobile (&lt;640px):</strong> Stacks fields vertically in a single column with full width.
          </li>
          <li>
            <strong>Tablet &amp; Desktop (&ge;640px):</strong> Arranges fields in a 2-column equal grid
            with consistent inter-column and inter-row gaps.
          </li>
          <li>
            <strong>No JavaScript layout shifts:</strong> Responsive adjustments use pure CSS Media Queries
            rather than window resize listeners or ResizeObservers.
          </li>
        </ul>
      </section>

      {/* Motion */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Motion
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Field Group is a structural layout primitive and performs no animations or transitions of its
          own. It fully honors <code className="text-foreground">prefers-reduced-motion</code> with zero
          extra overhead.
        </p>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Field Group has zero runtime overhead:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Server Component compatible (does not require <code className="text-foreground">&quot;use client&quot;</code>).</li>
          <li>0 React state hooks, 0 effects, 0 event listeners.</li>
          <li>0 DOM mutations, 0 ResizeObservers, 0 MutationObservers.</li>
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
              Semantic composition connecting label, control, description, and validation error.
            </div>
          </a>
          <a
            href="/components/input"
            className="p-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors block space-y-1"
          >
            <div className="font-semibold text-foreground text-sm">Input</div>
            <div className="text-xs text-muted-foreground">
              Text input control with optical liquid glass focus ring and states.
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
            Initial release of Field Group as Forms &amp; Fields 02. Structural layout primitive
            supporting vertical rhythm, responsive horizontal grid, and strictly isolated child validation.
          </p>
        </div>
      </section>
    </div>
  );
}
