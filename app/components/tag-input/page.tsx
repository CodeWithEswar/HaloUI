import * as React from "react";
import type { Metadata } from "next";
import { TagInputPreviewStage } from "./tag-input-preview-stage";
import {
  PrimaryTagInputDemo,
  EmptyTagInputDemo,
  WrappingTagInputDemo,
  LongTagInputDemo,
  SizeVariantsTagInputDemo,
  MaxTagsAndValidationDemo,
  DelimiterAndPasteDemo,
  InvalidTagInputDemo,
  DisabledAndReadOnlyDemo,
} from "./tag-input-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Tag Input — Forms & Fields — HaloUI",
  description:
    "A freeform token-entry control for creating, editing, and removing multiple short text values.",
};

const TAG_INPUT_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string[]",
    default: "undefined",
    required: false,
    description: "The controlled array of committed tag strings.",
  },
  {
    name: "defaultValue",
    type: "string[]",
    default: "[]",
    required: false,
    description: "Initial tags when used in uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(tags: string[]) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked whenever the committed tag collection changes.",
  },
  {
    name: "inputValue",
    type: "string",
    default: "undefined",
    required: false,
    description: "Controlled transient editing string in the inline text input.",
  },
  {
    name: "defaultInputValue",
    type: "string",
    default: '""',
    required: false,
    description: "Initial transient editing string when uncontrolled.",
  },
  {
    name: "onInputChange",
    type: "(text: string) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked whenever the transient editing text changes.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Add tag..."',
    required: false,
    description: "Placeholder text displayed when no tags exist or space permits.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Physical dimensions and typography scale of container and tokens.",
  },
  {
    name: "maxTags",
    type: "number",
    default: "undefined",
    required: false,
    description: "Maximum allowable tags. Inhibits adding additional tokens once reached.",
  },
  {
    name: "maxLength",
    type: "number",
    default: "undefined",
    required: false,
    description: "Maximum character length forwarded to the inline editing input.",
  },
  {
    name: "allowDuplicates",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether identical case-insensitive strings can be added more than once.",
  },
  {
    name: "onDuplicate",
    type: "(duplicateTag: string) => void",
    default: "undefined",
    required: false,
    description: "Callback triggered when the user attempts to add an existing tag.",
  },
  {
    name: "delimiters",
    type: "string[]",
    default: '[","]',
    required: false,
    description: "Keys or characters that trigger commit in addition to Enter.",
  },
  {
    name: "addOnBlur",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether non-empty editing text commits into a tag when the input blurs.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables typing, committing, and token removal with dimmed visual styling.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents editing and removing tags while keeping contents readable and selectable.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies error state optics and aria-invalid attribute.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "TagInput (Root)",
    description: "Container element providing physical optical glass substrate, focus management, and token wrapping.",
  },
  {
    name: "TagInputItem",
    description: "Individual token pill wrapping value context, deletion staging state, and optical border.",
  },
  {
    name: "TagInputItemText",
    description: "Truncated label span rendering tag string with overflow protection and tooltip title.",
  },
  {
    name: "TagInputItemRemove",
    description: "Accessible dismiss button firing contextual removal with Hugeicons Cancel01Icon.",
  },
  {
    name: "TagInputInput",
    description: "Inline text input managing keystrokes, delimiter triggers, paste, and two-stage backspace.",
  },
  {
    name: "TagInputClear",
    description: "Optional action button to dismiss all committed tags with a single click.",
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
          { name: "tag-input.tsx", type: "file" },
          { name: "field.tsx", type: "file" },
        ],
      },
      {
        name: "icons",
        type: "folder",
        children: [
          { name: "halo-icon.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      { name: "halo-tokens.css", type: "file" },
    ],
  },
];

const DEPENDENCIES: DependencyGroup[] = [
  {
    title: "External Package Dependencies",
    name: "External Package Dependencies",
    items: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "HaloUI Registry Dependencies",
    name: "HaloUI Registry Dependencies",
    items: ["field", "halo-icon"],
  },
];

export default function TagInputPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            Forms & Fields 24
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            registry: tag-input
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Tag Input
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          A freeform token-entry control for creating, editing, and removing multiple short text values.
        </p>
      </div>

      {/* Section 63 Callout */}
      <Callout type="warning">
        <strong>Tag Input creates freeform values.</strong> Use Multi Select when users must choose from a known collection of options.
      </Callout>

      {/* Section 64 Callout */}
      <Callout type="note">
        <strong>Committed tokens and the current editing text are separate state.</strong> Text becomes a tag only after the component's documented commit interaction succeeds.
      </Callout>

      {/* 1. Preview */}
      <section id="preview" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interactive Preview Stage
        </h2>
        <p className="text-sm text-muted-foreground">
          Experiment with sizes, state presets, tag limits, and duplicate rules across multiple physical backdrops and responsive viewports.
        </p>
        <TagInputPreviewStage />
      </section>

      {/* 2. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Tag Input into your project via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="tag-input" />
      </section>

      {/* 3. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import * as React from "react";
import { TagInput } from "@/components/ui/tag-input";

export function SkillsTagExample() {
  const [skills, setSkills] = React.useState<string[]>(["React", "TypeScript"]);

  return (
    <TagInput
      value={skills}
      onValueChange={setSkills}
      placeholder="Add skill..."
    />
  );
}`}
          language="tsx"
        />
      </section>

      {/* 4. With Field */}
      <section id="with-field" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          With Field
        </h2>
        <p className="text-sm text-muted-foreground">
          Compose with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">Field</code> for accessible label, description, and error messaging:
        </p>
        <PrimaryTagInputDemo />
      </section>

      {/* 5. Controlled */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Controlled
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Provide <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">value</code> as <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">string[]</code> and <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">onValueChange</code> to control the committed tag collection. Optionally, control the inline editing query with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">inputValue</code> and <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">onInputChange</code>.
        </p>
      </section>

      {/* 6. Uncontrolled */}
      <section id="uncontrolled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Uncontrolled
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Supply <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">defaultValue</code> with an array of initial strings for uncontrolled state management:
        </p>
        <CodeBlock
          code={`<TagInput defaultValue={["Frontend", "Performance"]} />`}
          language="tsx"
        />
      </section>

      {/* 7. Creating tags */}
      <section id="creating-tags" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Creating Tags
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tags are committed by default when pressing <kbd className="px-1.5 py-0.5 rounded bg-muted/60 text-xs font-mono border">Enter</kbd> or configured delimiters (e.g. comma). Pressing Enter on an empty input does not create an empty token and does not submit any enclosing HTML form.
        </p>
        <EmptyTagInputDemo />
      </section>

      {/* 8. Removing tags */}
      <section id="removing-tags" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Removing Tags
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tags can be dismissed via their contextual remove button or using keyboard interactions. When the inline text input is empty, pressing <kbd className="px-1.5 py-0.5 rounded bg-muted/60 text-xs font-mono border">Backspace</kbd> invokes a two-stage deletion protocol: the first press stages the trailing tag for removal, and a second press deletes it.
        </p>
      </section>

      {/* 9. Duplicate values */}
      <section id="duplicate-values" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Duplicate Values
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By default, duplicate tags are rejected case-insensitively (<code className="font-mono text-xs">allowDuplicates={false}</code>). When a duplicate is rejected, the <code className="font-mono text-xs">onDuplicate</code> callback fires without disturbing the existing collection.
        </p>
        <MaxTagsAndValidationDemo />
      </section>

      {/* 10. Whitespace and normalization */}
      <section id="whitespace-and-normalization" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Whitespace and Normalization
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Leading and trailing whitespace is automatically trimmed upon committing a tag. Legitimate internal spaces (e.g. <code className="font-mono text-xs">"Design Systems"</code>) are preserved. Inputs containing whitespace exclusively are rejected without generating empty tags.
        </p>
      </section>

      {/* 11. Limits */}
      <section id="limits" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Limits & Long Values
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use <code className="font-mono text-xs">maxTags</code> to limit the maximum collection count. Long tokens are truncated with ellipsis to avoid layout disruption while preserving full text in the native <code className="font-mono text-xs">title</code> attribute:
        </p>
        <LongTagInputDemo />
      </section>

      {/* 12. Paste */}
      <section id="paste" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Multi-Tag Paste
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pasting strings containing commas, semicolons, or newlines automatically splits the clipboard text into discrete tokens, discarding whitespace and duplicates:
        </p>
        <DelimiterAndPasteDemo />
      </section>

      {/* 13. Disabled */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Disabled
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Completely locks typing, committing, and token removal while dimming visual presentation:
        </p>
        <DisabledAndReadOnlyDemo />
      </section>

      {/* 14. Read-only */}
      <section id="read-only" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Read-Only
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Displays existing tokens without remove buttons. The inline text input is hidden or marked read-only, allowing text inspection without modification.
        </p>
      </section>

      {/* 15. States */}
      <section id="states" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          States Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Empty</span>
            <span className="text-[11px] text-muted-foreground">Useful placeholder with inline input ready.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Tokens Active</span>
            <span className="text-[11px] text-muted-foreground">Tokens wrap naturally into subsequent rows.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Invalid</span>
            <span className="text-[11px] text-muted-foreground">Destructive border tone and error focus ring.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Staged Deletion</span>
            <span className="text-[11px] text-muted-foreground">Backspace highlights token before deletion.</span>
          </div>
        </div>
      </section>

      {/* 16. Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Composition & Sizing
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tag Input scales across <code className="font-mono text-xs">size="sm"</code> (32px min-height), <code className="font-mono text-xs">size="default"</code> (40px min-height), and <code className="font-mono text-xs">size="lg"</code> (48px min-height):
        </p>
        <SizeVariantsTagInputDemo />
      </section>

      {/* 17. Keyboard behavior */}
      <section id="keyboard-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-foreground">
              <tr>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Enter</td>
                <td className="px-4 py-2.5">Commits non-empty trimmed text as a new tag token.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Delimiter (,)</td>
                <td className="px-4 py-2.5">Commits current text into a tag token.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Backspace (1st)</td>
                <td className="px-4 py-2.5">When input is empty, stages the last token for removal.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Backspace (2nd)</td>
                <td className="px-4 py-2.5">Deletes the staged tag and clears staging state.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Tab</td>
                <td className="px-4 py-2.5">Focuses inline input or individual token remove buttons.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 18. Props */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Props
        </h2>
        <PropsTable rows={TAG_INPUT_PROPS} />
      </section>

      {/* 19. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 20. Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 leading-relaxed">
          <li><strong>Contextual Remove Names:</strong> Dismiss buttons declare <code className="font-mono text-xs">aria-label="Remove [tag name]"</code> for clear assistive technology announcements.</li>
          <li><strong>Live Region:</strong> An internal <code className="font-mono text-xs">aria-live="polite"</code> region announces additions and removals concisely.</li>
          <li><strong>Dual Indicator Visibility:</strong> Invalid state provides border and focus contrast without relying on color alone.</li>
          <li><strong>No Accidental Form Submit:</strong> Pressing Enter on empty inputs stops event propagation to prevent submitting enclosing forms.</li>
        </ul>
      </section>

      {/* 21. Responsive behavior */}
      <section id="responsive-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Responsive Behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tokens wrap naturally into multiple lines. The inline input retains a minimum width of 100px so typing remains comfortable without causing horizontal page overflow:
        </p>
        <WrappingTagInputDemo />
      </section>

      {/* 22. Motion */}
      <section id="motion" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Motion & Transitions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Restrained 150ms opacity and background transitions. No bouncing chips, flying tags, or particle animations. Fully immediate in reduced motion environments.
        </p>
      </section>

      {/* 23. Performance */}
      <section id="performance" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Zero ResizeObserver loops, zero MutationObservers, and zero layout thrashing. Rendering dozens of tokens remains cheap and lightweight.
        </p>
      </section>

      {/* 24. Tag Input vs Multi Select */}
      <section id="tag-input-vs-multi-select" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Tag Input vs Multi Select
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Tag Input</strong> creates freeform values that do not need to exist in any predefined list (e.g. new user-entered skills or keywords). <strong>Multi Select</strong> allows selecting multiple known options from a predefined dataset.
        </p>
      </section>

      {/* 25. Tag Input vs Combobox */}
      <section id="tag-input-vs-combobox" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Tag Input vs Combobox
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Combobox</strong> searches and selects one item from an existing option list. <strong>Tag Input</strong> allows generating and collecting multiple freeform strings.
        </p>
      </section>

      {/* 26. Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES} />
      </section>

      {/* 27. Installed files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={FILE_TREE} />
      </section>

      {/* 28. Related components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/components/multi-select"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Multi Select</span>
            <span className="text-xs text-muted-foreground">Select multiple items from a predefined list of options.</span>
          </a>
          <a
            href="/components/input"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Input</span>
            <span className="text-xs text-muted-foreground">Standard single-line text input control.</span>
          </a>
        </div>
      </section>

      {/* 29. Changelog */}
      <section id="changelog" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Changelog
        </h2>
        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-foreground">v1.0.0</span>
            <span className="text-xs text-muted-foreground">• September 25, 2026</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Initial release of Tag Input featuring freeform token creation, two-stage backspace deletion, multi-tag paste, and liquid optical glass styling.
          </p>
        </div>
      </section>
    </div>
  );
}
