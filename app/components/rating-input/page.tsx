import * as React from "react";
import type { Metadata } from "next";
import { RatingInputPreviewStage } from "./rating-input-preview-stage";
import {
  PrimaryRatingInputExample,
  ControlledRatingInputExample,
  DescriptiveLabelsExample,
  CustomScaleExample,
  SizesRatingInputExample,
  StatesRatingInputExample,
  FormCompositionExample,
} from "./rating-input-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Rating Input — Forms & Fields — HaloUI",
  description:
    "An accessible single-value rating control for choosing a score from an ordered icon-based scale.",
};

const RATING_INPUT_PROPS: PropRow[] = [
  {
    name: "value",
    type: "number | null",
    default: "undefined",
    required: false,
    description: "The controlled rating value (1 to max, or null for empty).",
  },
  {
    name: "defaultValue",
    type: "number | null",
    default: "null",
    required: false,
    description: "The initial uncontrolled rating value. Defaults to empty (null).",
  },
  {
    name: "onValueChange",
    type: "(value: number) => void",
    default: "undefined",
    required: false,
    description: "Callback fired when an individual rating score is committed via pointer or keyboard.",
  },
  {
    name: "max",
    type: "number",
    default: "5",
    required: false,
    description: "Maximum score on the ordered scale (e.g. 5, 7, 10).",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    required: false,
    description: "Size scale adjusting both visual icon dimension and mobile touch target hit area.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the rating input is disabled and non-interactive.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders the rating non-interactive without disabled contrast muting. For pure display, use RatingDisplay.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies validation error state coordinated with surrounding Form Field.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether a rating selection is required before form submission.",
  },
  {
    name: "labels",
    type: "string[]",
    default: "undefined",
    required: false,
    description: "Optional array of descriptive text labels for each score index (e.g. ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']).",
  },
];

const RATING_INPUT_ANATOMY: AnatomyPart[] = [
  {
    name: "RatingInput",
    description: "Root radiogroup container coordinating roving tabindex focus, temporary hover preview, and Field context.",
  },
  {
    name: "RatingInputItem",
    description: "Individual accessible radio button representing a single discrete score with dedicated touch hit area.",
  },
  {
    name: "HaloIcon (StarIcon)",
    description: "Optically tuned vector icon inheriting cumulative fill state and optical specular glow without layout shift.",
  },
];

const RATING_INPUT_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "rating-input.tsx", type: "file" },
          { name: "field.tsx", type: "file" },
        ],
      },
      {
        name: "icons",
        type: "folder",
        children: [{ name: "halo-icon.tsx", type: "file" }],
      },
    ],
  },
];

const RATING_INPUT_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "Core Dependencies",
    items: ["@hugeicons/core-free-icons", "@hugeicons/react", "clsx", "tailwind-merge"],
  },
  {
    title: "Registry Dependencies",
    items: ["field"],
  },
];

export default function RatingInputDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-primary">
            Forms &amp; Fields · 28
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Single Choice Scale
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Rating Input
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl sm:text-lg">
          An accessible single-value rating control for choosing a score from an ordered icon-based scale. Built with W3C radio-group semantics, roving focus management, cumulative visual star fill, and temporary hover previews.
        </p>
      </header>

      {/* Interactive Preview Stage */}
      <section id="interactive-stage" className="space-y-4">
        <RatingInputPreviewStage />
      </section>

      {/* Architectural Callout */}
      <Callout type="note" title="Single Committed Value">
        <strong>Rating Input represents one value, even when multiple icons appear filled.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          A rating of four is one committed value of <code>4</code>, not four independently selected stars. The cumulative visual fill is purely an optical representation of scale magnitude.
        </p>
      </Callout>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-muted-foreground text-sm">
          Install Rating Input into your project using the HaloUI registry CLI.
        </p>
        <InstallCommand registry="rating-input" />
      </section>

      {/* Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-muted-foreground text-sm">
          Import and compose <code>RatingInput</code> with surrounding form field primitives:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { RatingInput } from "@/components/ui/rating-input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function RatingDemo() {
  const [rating, setRating] = React.useState<number | null>(null);

  return (
    <Field id="experience-rating">
      <FieldLabel>Overall experience</FieldLabel>
      <FieldDescription>Rate your experience from 1 to 5.</FieldDescription>
      <RatingInput
        value={rating}
        onValueChange={setRating}
        aria-label="Overall experience"
      />
    </Field>
  );
}`}
        />
      </section>

      {/* With Field */}
      <section id="with-field" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          With Field
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          When composed inside a HaloUI <code>Field</code>, Rating Input automatically consumes coordinated <code>aria-labelledby</code>, <code>aria-describedby</code>, and error states without manual prop plumbing.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <PrimaryRatingInputExample />
        </div>
      </section>

      {/* Controlled & Reset */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Controlled State &amp; Clearing
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Pass <code>value</code> and <code>onValueChange</code> to control the rating externally. An empty state is explicitly represented by <code>null</code>.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <ControlledRatingInputExample />
        </div>
      </section>

      {/* Hover Preview Callout */}
      <Callout type="warning" title="Hover Preview Lifecycle">
        <strong>Hover preview is temporary visual feedback.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Hovering over a rating item temporarily previews the prospective score without mutating the committed state. Upon pointer leave, the visual display immediately restores the committed value.
        </p>
      </Callout>

      {/* Descriptive Labels */}
      <section id="descriptive-labels" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Descriptive Labels &amp; Screen Reader Semantics
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Supply the <code>labels</code> prop to provide contextual terminology (e.g. &ldquo;Poor&rdquo; to &ldquo;Excellent&rdquo;). Assistive technologies announce both the numeric scale and the semantic term.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <DescriptiveLabelsExample />
        </div>
      </section>

      {/* Maximum Rating & Custom Scale */}
      <section id="maximum-rating" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Maximum Rating &amp; Custom Scale
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Configure the <code>max</code> prop to support 7-point Likert scales or 10-point Net Promoter Score (NPS) evaluations while preserving roving keyboard navigation.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <CustomScaleExample />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Sizes &amp; Mobile Touch Targets
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Rating Input scales optical icon dimensions while maintaining comfortable touch targets (32px to 48px hit areas), preventing misclicks on touchscreens without enlarging icons excessively.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <SizesRatingInputExample />
        </div>
      </section>

      {/* States */}
      <section id="states" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Interaction States Matrix
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Verify visual distinctiveness across Empty, Committed, Invalid (Error), and Disabled states.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <StatesRatingInputExample />
        </div>
      </section>

      {/* Form Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Form Composition &amp; Required Validation
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Rating Input integrates seamlessly with native form submission and HaloUI Field validation:
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <FormCompositionExample />
        </div>
      </section>

      {/* Keyboard Behavior */}
      <section id="keyboard-behavior" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Keyboard Navigation (W3C Radio Group)
        </h2>
        <div className="rounded-xl border border-border/80 overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-xs font-semibold uppercase text-muted-foreground border-b border-border/80">
              <tr>
                <th className="p-3">Key</th>
                <th className="p-3">Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Tab</td>
                <td className="p-3 text-muted-foreground">Enters the rating group, focusing the currently selected item or the first item (1) if unselected.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">ArrowRight / ArrowUp</td>
                <td className="p-3 text-muted-foreground">Moves focus to the next rating score (incrementing value) and commits selection. Clamps at max.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">ArrowLeft / ArrowDown</td>
                <td className="p-3 text-muted-foreground">Moves focus to the previous rating score (decrementing value) and commits selection. Clamps at 1.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Home / End</td>
                <td className="p-3 text-muted-foreground">Jumps focus and selection to the first item (1) or last item (max).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Space / Enter</td>
                <td className="p-3 text-muted-foreground">Commits the currently focused item as the selected rating score.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Shift + Tab</td>
                <td className="p-3 text-muted-foreground">Exits the rating group cleanly to the previous interactive element.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section id="props" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Props
        </h2>
        <PropsTable rows={RATING_INPUT_PROPS} />
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={RATING_INPUT_ANATOMY} />
      </section>

      {/* Architecture Comparisons */}
      <section id="comparisons" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Architectural Responsibility Comparisons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Rating Input vs Radio Group</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Rating Input reuses coordinated roving focus semantics from Radio Group, but presents an ordered numeric scale where items cumulatively fill rather than rendering disjointed radio circles.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Rating Input vs Slider</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Slider is designed for continuous spatial adjustment along a continuous track. Rating Input is specifically tailored for discrete visual scoring where discrete star symbols are the semantic affordance.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Rating Input vs Rating Display</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Rating Input is an interactive form input. Read-only ratings (such as review averages and fractional stars) should be rendered with <code>RatingDisplay</code> rather than a disabled Rating Input.
            </p>
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={RATING_INPUT_DEPENDENCIES} />
      </section>

      {/* Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={RATING_INPUT_FILES} />
      </section>
    </div>
  );
}
