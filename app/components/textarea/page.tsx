import * as React from "react";
import type { Metadata } from "next";
import { TextareaPreviewStage } from "./textarea-preview-stage";
import {
  PrimaryFeedbackFieldDemo,
  TextareaStatesDemo,
  TextareaResizeDemo,
  TextareaLongContentDemo,
  TextareaControlledDemo,
} from "./textarea-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Textarea — Forms & Fields — HaloUI",
  description:
    "A native multiline text-entry control with HaloUI form states, accessible focus treatment, and configurable resizing.",
};

const TEXTAREA_PROPS: PropRow[] = [
  {
    name: "resize",
    type: '"none" | "vertical" | "horizontal" | "both"',
    default: '"vertical"',
    required: false,
    description: "Controls the CSS resize policy. Vertical resizing is the accessible default to avoid breaking layout width.",
  },
  {
    name: "rows",
    type: "number",
    default: "undefined",
    required: false,
    description: "Native HTML rows attribute controlling the initial visible line count without hardcoded pixel heights.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes to append to the textarea element.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native disabled attribute. Prevents editing, interaction, and participation in form submission.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native readOnly attribute. Prevents editing while preserving keyboard focus, scrolling, and text selection.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native HTML validation constraint for mandatory multiline entries.",
  },
  {
    name: "aria-invalid",
    type: 'boolean | "true" | "false"',
    default: "undefined",
    required: false,
    description: "Communicates validation errors to assistive technology and activates dual-indicator styling.",
  },
  {
    name: "...props",
    type: 'React.ComponentProps<"textarea">',
    default: "—",
    required: false,
    description: "All standard HTML <textarea> attributes (value, defaultValue, onChange, placeholder, maxLength, spellCheck, etc.).",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Textarea Root",
    description: "Native HTML <textarea> element. Houses browser text selection, multiline IME input, and native scrolling.",
  },
  {
    name: "Optical Substrate",
    description: "Restrained 10-layer liquid glass surface with subtle backdrop diffusion and inner depth.",
  },
  {
    name: "Editable Edge",
    description: "Calibrated 1px boundary that defines the active multiline territory across dark and light optical backgrounds.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast 2px focus outline rendered via focus-visible, distinct from invalid error tinting.",
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
            name: "textarea.tsx",
            type: "file",
            description: "Native multiline text-entry control primitive.",
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
    items: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
];

export default function TextareaDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>08</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Textarea
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A native multiline text-entry control with HaloUI form states, accessible focus treatment, and configurable resizing.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <TextareaPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="textarea" />
      </section>

      {/* Callout 1: Responsibility Boundary */}
      <Callout type="note" title="Textarea is for plain multiline text entry">
        Use a dedicated editor architecture when users need rich formatting, structured content,
        mentions, slash commands, or embedded media. Textarea focuses purely on accessible, lightweight,
        plain-text form inputs.
      </Callout>

      {/* Usage / With Field */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage with Field
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The canonical implementation pairs <code className="text-foreground">Textarea</code> with{" "}
          <code className="text-foreground">Field</code> and <code className="text-foreground">FieldLabel</code>:
        </p>
        <CodeBlock
          code={`import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export function FeedbackForm() {
  return (
    <Field id="feedback-field">
      <FieldLabel htmlFor="feedback-field">Product feedback</FieldLabel>
      <Textarea
        id="feedback-field"
        placeholder="Tell us what worked well and what could be improved..."
        rows={4}
        aria-describedby="feedback-desc"
      />
      <FieldDescription id="feedback-desc">
        Feedback is shared directly with the product engineering group.
      </FieldDescription>
    </Field>
  );
}`}
          language="tsx"
          filename="feedback-form.tsx"
        />
        <PrimaryFeedbackFieldDemo />
      </section>

      {/* Interaction States Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Interaction States &amp; Dual-Indicator Focus
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The most critical state combination is <strong>Invalid + Focused</strong>. HaloUI ensures
          that invalid error borders and the 2px double-contrast Halo Focus Ring remain
          independently distinct. Error indication never suppresses the active keyboard focus outline:
        </p>
        <TextareaStatesDemo />
      </section>

      {/* Resizing Modes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Resizing Configurations
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Textarea defaults to vertical resizing (<code className="text-foreground">resize=&quot;vertical&quot;</code>),
          which provides users with flexible writing space while guaranteeing that responsive form columns
          do not suffer from horizontal overflow:
        </p>
        <TextareaResizeDemo />
      </section>

      {/* Callout 2: Native Resizing vs Auto-Grow */}
      <Callout type="warning" title="Base Textarea does not auto-grow by default">
        Textarea does not automatically measure and expand to fit its content. This keeps the base
        primitive predictable and inexpensive without JavaScript height measurements or layout
        thrashing. Auto-growing behavior should be implemented as a deliberate higher-level pattern when required.
      </Callout>

      {/* Controlled vs Uncontrolled */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Controlled State &amp; Character Counters
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Textarea supports standard React controlled state (<code className="text-foreground">value</code> +{" "}
          <code className="text-foreground">onChange</code>). Character counters are owned by the
          consumer composition rather than bundled inside the primitive:
        </p>
        <TextareaControlledDemo />
      </section>

      {/* Long Content & Scroll Behavior */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Long Content &amp; Scroll Boundary
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When multiline content exceeds the available vertical height, native browser scrollbars
          operate reliably within the rounded corner radius without clipping or visual artifacts:
        </p>
        <TextareaLongContentDemo />
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>
        <PropsTable rows={TEXTAREA_PROPS} />
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
            <strong>Native Multiline Semantics:</strong> Implemented as a genuine{" "}
            <code className="text-foreground">&lt;textarea&gt;</code> element, preserving multiline
            keyboard navigation, text selection, IME composition, and browser form submission.
          </p>
          <p>
            <strong>Double-Contrast Focus Ring:</strong> Uses the Halo Focus Ring with a 2px offset,
            rendering clearly on both light, dark, and complex optical glass backdrops.
          </p>
          <p>
            <strong>Dual-Indicator Invalid States:</strong> Errors are communicated through both
            high-contrast boundary color and association with an explicit{" "}
            <code className="text-foreground">FieldError</code> via{" "}
            <code className="text-foreground">aria-describedby</code> and{" "}
            <code className="text-foreground">aria-invalid=&quot;true&quot;</code>.
          </p>
          <p>
            <strong>Disabled vs. Read-Only:</strong> Disabled textareas are removed from tab order with{" "}
            <code className="text-foreground">disabled</code>; read-only textareas remain focusable,
            scrollable, and selectable with <code className="text-foreground">readOnly</code>, allowing
            users to inspect and copy existing logs, code, and notes.
          </p>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Textarea is optimized for high-density applications and complex dashboard views:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>100% Server Component compatible without <code className="text-foreground">&quot;use client&quot;</code>.</li>
          <li>0 React hooks, 0 layout effects, 0 ResizeObservers in the base primitive.</li>
          <li>Pure native CSS resizing (<code className="text-foreground">resize: vertical</code>) with 0ms script overhead.</li>
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
