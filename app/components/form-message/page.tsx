import { Metadata } from "next";
import { FormMessagePreviewStage } from "./form-message-preview-stage";
import { FormMessageDemonstrations } from "./form-message-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Form Message — Forms & Fields — HaloUI",
  description:
    "A semantic field-level message for communicating validation errors, success, warnings, or concise supporting feedback.",
};

const FORM_MESSAGE_PROPS: PropRow[] = [
  {
    name: "type",
    type: "'error' | 'success' | 'warning' | 'info'",
    default: "fieldContext?.invalid ? 'error' : 'info'",
    required: false,
    description: "Semantic message tone. Inferred automatically from parent Field context if omitted.",
  },
  {
    name: "showIcon",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render the matching Hugeicons status glyph alongside the text.",
  },
  {
    name: "icon",
    type: "React.ComponentType",
    default: "undefined",
    required: false,
    description: "Custom Hugeicons icon component override.",
  },
  {
    name: "id",
    type: "string",
    default: "field messageId",
    required: false,
    description: "Explicit DOM ID for aria-describedby or aria-errormessage linkage. Auto-assigned from Field context if omitted.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: false,
    description: "Message content or validation status description.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/form-message.tsx",
    type: "file",
    description: "Semantic field-level messaging primitive",
  },
  {
    name: "components/ui/field.tsx",
    type: "file",
    description: "Field accessibility context and layout infrastructure",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "HaloUI typography and design system tokens",
  },
];

export default function FormMessageDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Forms & Fields · 34
          </span>
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Semantic Messaging
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Form Message
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg max-w-3xl leading-relaxed">
          A semantic field-level message for communicating validation errors, success, warnings, or concise supporting feedback.
          Coordinates directly with Field accessibility contexts without acting as a heavy validation engine.
        </p>
      </header>

      {/* Critical Callouts */}
      <div className="space-y-4">
        <Callout type="note" title="Responsibility Boundary">
          Form Message communicates validation or field-level status. It does not perform validation or manage form schema state.
          The field owns structure, the application owns validation, and Form Message presents the status.
        </Callout>
        <Callout type="warning" title="Accessibility & Live Announcements">
          Do not make every field message an assertive live region.
          Form Message applies polite announcements (<code className="font-mono text-xs">aria-live=&quot;polite&quot;</code>) to prevent screen-reader interruption.
        </Callout>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Interactive Stage</h2>
        <FormMessagePreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Form Message into your repository via the shadcn registry CLI:
        </p>
        <InstallCommand registry="form-message" />
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <CodeBlock
          code={`import * as React from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form-message";

export function EmailField() {
  const [email, setEmail] = React.useState("");
  const isInvalid = email.length > 0 && !email.includes("@");

  return (
    <Field id="email-field" invalid={isInvalid}>
      <FieldLabel className="font-semibold">Email Address</FieldLabel>
      <FieldDescription>Your primary notification email.</FieldDescription>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="alex@domain.com"
      />
      {isInvalid && (
        <FormMessage type="error">
          Please enter a valid email address with an &apos;@&apos; domain.
        </FormMessage>
      )}
    </Field>
  );
}`}
          language="tsx"
        />
      </section>

      {/* Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Semantic Tone Taxonomy & Compositions</h2>
        <FormMessageDemonstrations />
      </section>

      {/* Architectural Distinctions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Architectural Distinctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Field Description</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Provides neutral persistent guidance before user interaction occurs. Remains static.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-2">
            <h4 className="text-sm font-semibold text-primary">Form Message</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Communicates dynamic status (error, success, warning, info) resulting from validation or user input.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Alert / Toast</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Communicates global or page-level system notifications rather than field-scoped validation state.
            </p>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <PropsTable rows={FORM_MESSAGE_PROPS} />
      </section>

      {/* File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installed Files</h2>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
