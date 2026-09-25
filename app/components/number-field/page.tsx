import * as React from "react";
import type { Metadata } from "next";
import { NumberFieldPreviewStage } from "./number-field-preview-stage";
import {
  PrimaryNumberFieldDemo,
  DecimalNumberFieldDemo,
  NegativeNumberFieldDemo,
  SplitStepperDemo,
  ControlledNumberFieldDemo,
  InvalidNumberFieldDemo,
  DisabledAndReadOnlyDemo,
} from "./number-field-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Number Field — Forms & Fields — HaloUI",
  description:
    "An accessible numeric-entry control with keyboard editing and optional increment and decrement actions.",
};

const NUMBER_FIELD_PROPS: PropRow[] = [
  {
    name: "value",
    type: "number | null",
    default: "undefined",
    required: false,
    description: "The controlled numeric value of the field. Can be null when empty.",
  },
  {
    name: "defaultValue",
    type: "number",
    default: "undefined",
    required: false,
    description: "Initial numeric value when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(value: number | null) => void",
    default: "undefined",
    required: false,
    description: "Callback fired continuously as the value changes via typing, steppers, or arrow keys.",
  },
  {
    name: "onValueCommit",
    type: "(value: number | null) => void",
    default: "undefined",
    required: false,
    description: "Callback fired when the change is committed on blur or pointer release.",
  },
  {
    name: "min",
    type: "number",
    default: "undefined",
    required: false,
    description: "Minimum allowable numeric value.",
  },
  {
    name: "max",
    type: "number",
    default: "undefined",
    required: false,
    description: "Maximum allowable numeric value.",
  },
  {
    name: "step",
    type: "number",
    default: "1",
    required: false,
    description: "Stepping granularity. Supports integers or floating-point decimals (e.g. 0.1).",
  },
  {
    name: "stepperPlacement",
    type: '"right" | "split" | "none"',
    default: '"right"',
    required: false,
    description: "Layout positioning of the increment and decrement buttons.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Height and typography scale of the control assembly.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Marks the field with a destructive error border and coordinated focus ring.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Locks interaction and dims visual presentation.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents stepping and editing while keeping text selectable and focusable.",
  },
];

const NUMBER_FIELD_ANATOMY: AnatomyPart[] = [
  {
    name: "NumberField (Root)",
    description: "Coordinates numeric state, transient typing parsing, bounds, and keyboard spinbutton semantics.",
  },
  {
    name: "NumberFieldGroup",
    description: "The optical liquid glass container establishing the shared visual boundary and focus-within treatment.",
  },
  {
    name: "NumberFieldInput",
    description: "The underlying accessible text input receiving typing, selection, and keyboard arrow keys.",
  },
  {
    name: "NumberFieldDecrement",
    description: "Interactive button control stepping down toward the minimum bound.",
  },
  {
    name: "NumberFieldIncrement",
    description: "Interactive button control stepping up toward the maximum bound.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast accessibility perimeter around the focused control.",
  },
];

const NUMBER_FIELD_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "number-field.tsx",
            type: "file",
            description: "NumberField component with decimal precision, bounds clamping, and stepper layout.",
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
        description: "Shared optical liquid tokens, tactile press, and focus ring system.",
      },
    ],
  },
];

const NUMBER_FIELD_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "External Package Dependencies",
    name: "External Package Dependencies",
    items: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
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

export default function NumberFieldDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            Forms & Fields 20
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            registry: number-field
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Number Field
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          An accessible numeric-entry control with keyboard editing and optional increment and decrement actions.
        </p>
      </div>

      {/* Section 50 Callout */}
      <Callout type="note">
        <strong>Number Field owns numeric entry, not numeric business meaning.</strong> Units, currency, percentages, calculations, persistence, and domain validation remain separate concerns unless a specialized field explicitly adds them.
      </Callout>

      {/* 1. Preview */}
      <section id="preview" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interactive Preview
        </h2>
        <NumberFieldPreviewStage />
      </section>

      {/* 2. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Number Field via the HaloUI shadcn registry CLI:
        </p>
        <InstallCommand registry="number-field" />
      </section>

      {/* 3. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { NumberField } from "@/components/ui/number-field";

export function CounterExample() {
  const [count, setCount] = React.useState<number | null>(1);

  return (
    <NumberField
      min={1}
      max={20}
      step={1}
      value={count}
      onValueChange={setCount}
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
          Compose with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">Field</code> for accessible label and description associations.
        </p>
        <PrimaryNumberFieldDemo />
      </section>

      {/* 5. Controlled */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Controlled Model
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage numeric state cleanly with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">value</code> and <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">onValueChange</code>:
        </p>
        <ControlledNumberFieldDemo />
      </section>

      {/* 6. Uncontrolled */}
      <section id="uncontrolled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Uncontrolled
        </h2>
        <p className="text-sm text-muted-foreground">
          Supply <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">defaultValue</code> for self-managed uncontrolled forms:
        </p>
        <CodeBlock
          code={`<NumberField defaultValue={10} min={0} max={100} step={5} />`}
          language="tsx"
        />
      </section>

      {/* 7. Empty Values */}
      <section id="empty-values" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Empty vs Zero
        </h2>
        {/* Section 51 Callout */}
        <Callout type="warning">
          <strong>Numeric editing can temporarily contain incomplete text.</strong> Avoid aggressively rewriting the value on every keystroke in ways that prevent users from entering negative or decimal values naturally. Furthermore, an empty field represents <code className="font-mono text-xs">null</code>, never confusing zero with an empty input.
        </Callout>
      </section>

      {/* 8. Minimum and Maximum */}
      <section id="minimum-and-maximum" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Minimum and Maximum Bounds
        </h2>
        <p className="text-sm text-muted-foreground">
          Define permitted range limits via <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">min</code> and <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">max</code>. Steppers automatically disable when the boundary is reached, preventing wraparound.
        </p>
      </section>

      {/* 9. Step */}
      <section id="step" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Step Granularity
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure step size with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">step={5}</code> or fractional increments like <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">step={0.1}</code>. Holding <kbd className="font-mono text-xs px-1 py-0.5 rounded border border-border bg-muted/60">Shift</kbd> uses the large step multiplier (10x).
        </p>
      </section>

      {/* 10. Decimal Values */}
      <section id="decimal-values" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Decimal Precision
        </h2>
        <p className="text-sm text-muted-foreground">
          Decimal math is computed without floating-point artifacts (e.g. <code className="font-mono text-xs">0.30000000000000004</code>), allowing smooth stepping on values like opacity and scale.
        </p>
        <DecimalNumberFieldDemo />
      </section>

      {/* 11. Negative Values */}
      <section id="negative-values" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Negative Values
        </h2>
        <p className="text-sm text-muted-foreground">
          When <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">min &lt; 0</code>, users can naturally type a leading minus sign <code className="font-mono text-xs">-</code> without premature validation cancellation.
        </p>
        <NegativeNumberFieldDemo />
      </section>

      {/* 12. Increment and Decrement */}
      <section id="increment-and-decrement" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Increment & Decrement Steppers
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose between three ergonomic layouts:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li><strong>Right Cluster (<code className="font-mono text-xs">stepperPlacement="right"</code>):</strong> Compact horizontal pair on the right side.</li>
          <li><strong>Split (<code className="font-mono text-xs">stepperPlacement="split"</code>):</strong> Decrement on left, centered input, increment on right.</li>
          <li><strong>None (<code className="font-mono text-xs">stepperPlacement="none"</code>):</strong> Text input only without visible steppers.</li>
        </ul>
        <SplitStepperDemo />
      </section>

      {/* 13. Disabled */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Disabled State
        </h2>
        <p className="text-sm text-muted-foreground">
          Completely locks keyboard interaction, steppers, and focus while dimming the control assembly.
        </p>
      </section>

      {/* 14. Read-only */}
      <section id="read-only" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Read-Only State
        </h2>
        <p className="text-sm text-muted-foreground">
          Keeps text selectable and focusable for copying, but prevents typing and disables steppers.
        </p>
        <DisabledAndReadOnlyDemo />
      </section>

      {/* 15. Validation */}
      <section id="validation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Validation & Error States
        </h2>
        <p className="text-sm text-muted-foreground">
          When marked invalid, a destructive optical border and inner tone render while preserving the active focus indicator independently.
        </p>
        <InvalidNumberFieldDemo />
      </section>

      {/* 16. States */}
      <section id="states" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          States Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Empty (null)</span>
            <span className="text-[11px] text-muted-foreground">Clean placeholder state without forced zero.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Active / Focused</span>
            <span className="text-[11px] text-muted-foreground">Double-contrast Halo Focus Ring on container.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Boundary Clamped</span>
            <span className="text-[11px] text-muted-foreground">Steppers disable at min/max bounds.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Invalid + Focus</span>
            <span className="text-[11px] text-muted-foreground">Destructive indicator coexists with focus ring.</span>
          </div>
        </div>
      </section>

      {/* 17. Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Modular Composition
        </h2>
        <p className="text-sm text-muted-foreground">
          For custom layouts, compose using the modular primitives:
        </p>
        <CodeBlock
          code={`import {
  NumberFieldRoot,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from "@/components/ui/number-field";

export function CustomComposedField() {
  return (
    <NumberFieldRoot min={0} max={100} defaultValue={50}>
      <NumberFieldGroup size="lg">
        <NumberFieldInput />
        <NumberFieldDecrement />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberFieldRoot>
  );
}`}
          language="tsx"
        />
      </section>

      {/* 18. Keyboard Behavior */}
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
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">↑ (Arrow Up)</td>
                <td className="px-4 py-2.5">Increments the value by step.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">↓ (Arrow Down)</td>
                <td className="px-4 py-2.5">Decrements the value by step.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Shift + ↑ / ↓</td>
                <td className="px-4 py-2.5">Large step (10x increment).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Home / End</td>
                <td className="px-4 py-2.5">Jumps directly to minimum or maximum bound.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Standard text keys</td>
                <td className="px-4 py-2.5">Caret movement, text selection, copy, paste, and deletion.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 19. Props */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Props
        </h2>
        <PropsTable rows={NUMBER_FIELD_PROPS} />
      </section>

      {/* 20. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={NUMBER_FIELD_ANATOMY} />
      </section>

      {/* 21. Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 leading-relaxed">
          <li><strong>Accessible Spinbutton Role:</strong> Announces current value, min, max, and stepping increments to screen readers.</li>
          <li><strong>Independent Stepper Naming:</strong> Stepper buttons carry explicit <code className="font-mono text-xs">aria-label="Increase value"</code> and <code className="font-mono text-xs">aria-label="Decrease value"</code>.</li>
          <li><strong>Wheel Scrub Disabled:</strong> Mouse wheel scrolling does not accidentally alter form values during page scrolling.</li>
          <li><strong>Double-Contrast Focus Rings:</strong> High contrast ring renders around the focused input or stepper control.</li>
        </ul>
      </section>

      {/* 22. Responsive Behavior */}
      <section id="responsive-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Responsive Behavior & Touch
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Stepper buttons maintain comfortable touch targets (at least 28–32px), allowing reliable repeated tapping without accidental zooming or misclicks on touchscreens.
        </p>
      </section>

      {/* 23. Motion */}
      <section id="motion" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Motion
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Restrained micro-transitions (120ms) for hover and active button states. Zero rolling numbers or digit animations ensure rapid, flicker-free data entry.
        </p>
      </section>

      {/* 24. Performance */}
      <section id="performance" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Zero ResizeObservers, global scroll listeners, or timer loops. Reuses Base UI’s lightweight synchronous event handling.
        </p>
      </section>

      {/* 25. Number Field vs Input */}
      <section id="number-field-vs-input" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Number Field vs Input
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-foreground">
              <tr>
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3">Number Field</th>
                <th className="px-4 py-3">Input</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Value Semantic</td>
                <td className="px-4 py-2.5">Numeric (<code className="font-mono text-xs">number | null</code>)</td>
                <td className="px-4 py-2.5">Text (<code className="font-mono text-xs">string</code>)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Stepping</td>
                <td className="px-4 py-2.5">Increment/decrement buttons and arrow keys</td>
                <td className="px-4 py-2.5">None</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Bounds</td>
                <td className="px-4 py-2.5">Native min/max clamping and boundary disabling</td>
                <td className="px-4 py-2.5">None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 26. Number Field vs Slider */}
      <section id="number-field-vs-slider" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Number Field vs Slider
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-foreground">
              <tr>
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3">Number Field</th>
                <th className="px-4 py-3">Slider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Interaction Model</td>
                <td className="px-4 py-2.5">Direct numeric text typing + stepper buttons</td>
                <td className="px-4 py-2.5">Spatial dragging along a track</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Best Used For</td>
                <td className="px-4 py-2.5">Exact quantities, license counts, precise offsets</td>
                <td className="px-4 py-2.5">Volume, brightness, coarse approximate ranges</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 27. Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={NUMBER_FIELD_DEPENDENCIES} />
      </section>

      {/* 28. Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={NUMBER_FIELD_FILES} />
      </section>

      {/* 29. Related Components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/components/slider"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Slider</span>
            <span className="text-xs text-muted-foreground">Spatial single-value range selection along an optical track.</span>
          </a>
          <a
            href="/components/field"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Field</span>
            <span className="text-xs text-muted-foreground">Coordinated label, description, and validation wrapper.</span>
          </a>
        </div>
      </section>

      {/* 30. Changelog */}
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
            Initial production release of Number Field with accessible spinbutton semantics, decimal precision, negative number editing, stepper layout options, and optical liquid glass styling.
          </p>
        </div>
      </section>
    </div>
  );
}
