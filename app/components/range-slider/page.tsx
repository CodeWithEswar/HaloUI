import * as React from "react";
import type { Metadata } from "next";
import { RangeSliderPreviewStage } from "./range-slider-preview-stage";
import {
  PrimaryRangeSliderDemo,
  AgeIntervalDemo,
  NarrowAndOverlappingDemo,
  CollisionModesDemo,
  DisabledRangeSliderDemo,
} from "./range-slider-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Range Slider — Forms & Fields — HaloUI",
  description:
    "An accessible two-thumb range control for selecting a bounded numeric interval.",
};

const RANGE_SLIDER_PROPS: PropRow[] = [
  {
    name: "value",
    type: "[number, number]",
    default: "undefined",
    required: false,
    description: "The controlled tuple value representing [lowerBound, upperBound].",
  },
  {
    name: "defaultValue",
    type: "[number, number]",
    default: "[20, 80]",
    required: false,
    description: "The initial tuple value of the range slider when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(value: [number, number]) => void",
    default: "undefined",
    required: false,
    description: "Event handler fired continuously as either thumb is dragged or stepped via keyboard.",
  },
  {
    name: "onValueCommit",
    type: "(value: [number, number]) => void",
    default: "undefined",
    required: false,
    description: "Event handler fired when pointer interaction is released or keyboard navigation pauses.",
  },
  {
    name: "min",
    type: "number",
    default: "0",
    required: false,
    description: "The absolute minimum allowable value of the range track.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    required: false,
    description: "The absolute maximum allowable value of the range track.",
  },
  {
    name: "step",
    type: "number",
    default: "1",
    required: false,
    description: "The numeric stepping increment. Supports integers or precise decimals.",
  },
  {
    name: "minLabel",
    type: "string",
    default: '"Minimum value"',
    required: false,
    description: "Accessible name announced for the lower boundary thumb.",
  },
  {
    name: "maxLabel",
    type: "string",
    default: '"Maximum value"',
    required: false,
    description: "Accessible name announced for the upper boundary thumb.",
  },
  {
    name: "thumbCollisionBehavior",
    type: '"none" | "push" | "swap"',
    default: '"none"',
    required: false,
    description: "Determines behavior when thumbs meet: 'none' stops at boundary, 'push' shifts the neighbor, and 'swap' allows crossover.",
  },
  {
    name: "minStepsBetweenThumbs",
    type: "number",
    default: "0",
    required: false,
    description: "Enforces a minimum numeric step distance maintained between the two thumbs.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Locks interaction and dims visual presentation while preserving value readability.",
  },
];

const RANGE_SLIDER_ANATOMY: AnatomyPart[] = [
  {
    name: "Root",
    description: "Coordinates the two-thumb tuple value state and manages keyboard focus arbitration.",
  },
  {
    name: "Track",
    description: "The horizontal optical liquid glass boundary representing the complete numeric domain [min, max].",
  },
  {
    name: "Range Indicator",
    description: "The highlighted fill element positioned precisely between thumb 0 and thumb 1 representing the selected interval.",
  },
  {
    name: "Lower Thumb (Index 0)",
    description: "Independently focusable and draggable bead representing the lower interval bound.",
  },
  {
    name: "Upper Thumb (Index 1)",
    description: "Independently focusable and draggable bead representing the upper interval bound.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast accessibility boundary surrounding whichever thumb currently holds keyboard focus.",
  },
];

const RANGE_SLIDER_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "range-slider.tsx",
            type: "file",
            description: "Main two-thumb Range Slider component composing Base UI Slider primitive.",
          },
          {
            name: "slider.tsx",
            type: "file",
            description: "Single-value slider primitive sharing foundational optical material tokens.",
          },
          {
            name: "field.tsx",
            type: "file",
            description: "Field context coordinator providing automatic ID and description linkage.",
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
        description: "Focus ring parameters, optical depth tokens, and surface substrate definitions.",
      },
    ],
  },
];

const RANGE_SLIDER_DEPENDENCIES: DependencyGroup[] = [
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

export default function RangeSliderDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-border bg-muted/30 text-muted-foreground">
            Forms &amp; Fields · 18
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Two-Thumb Interval Primitive
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Range Slider
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          An accessible two-thumb range control for selecting a bounded numeric interval
          with independent keyboard focus, thumb collision handling, and optical liquid styling.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <RangeSliderPreviewStage />
      </section>

      {/* 3. Core Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Callout type="note" title="Range Slider selects an interval, not two unrelated numbers">
          The lower and upper values share one bounded range and must remain synchronized with the two-thumb interaction model.
        </Callout>
        <Callout type="note" title="Range Slider vs Two Number Inputs">
          Use two Number Inputs when users primarily need exact typed endpoint entry. Range Slider is most useful when users benefit from spatially adjusting an interval within known bounds.
        </Callout>
      </div>

      {/* 4. Installation */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="range-slider" />
      </section>

      {/* 5. Usage */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          code={`import { RangeSlider } from "@/components/ui/range-slider";

export function Example() {
  const [range, setRange] = React.useState<[number, number]>([20, 80]);

  return (
    <RangeSlider
      min={0}
      max={100}
      step={5}
      value={range}
      onValueChange={setRange}
      minLabel="Minimum threshold"
      maxLabel="Maximum threshold"
    />
  );
}`}
        />
      </section>

      {/* 6. With Field */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            With Field
          </h2>
          <p className="text-sm text-muted-foreground">
            Pairing with <code>Field</code> provides clean label hierarchy, live numeric badge readouts, and accessible description linkage.
          </p>
        </div>
        <PrimaryRangeSliderDemo />
      </section>

      {/* 7. Step Configuration */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Step Granularity
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure custom step increments for integer intervals (e.g. age demographic filtering) or decimal precision.
          </p>
        </div>
        <AgeIntervalDemo />
      </section>

      {/* 8. Near-Overlapping Thumbs QA */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Near-Overlapping Thumbs &amp; Recovery
          </h2>
          <p className="text-sm text-muted-foreground">
            Critical QA verification: when lower and upper values meet or sit adjacent, each thumb retains independent focus ring visibility, pointer operability, and z-index ordering.
          </p>
        </div>
        <NarrowAndOverlappingDemo />
      </section>

      {/* 9. Collision Models */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Collision Models
          </h2>
          <p className="text-sm text-muted-foreground">
            Control how thumbs behave upon meeting: <code>none</code> (stops at collision bound), <code>push</code> (pushes adjacent thumb along), or <code>swap</code> (allows thumbs to cross over).
          </p>
        </div>
        <CollisionModesDemo />
      </section>

      {/* 10. Disabled State */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Disabled State
          </h2>
          <p className="text-sm text-muted-foreground">
            Both endpoint values and the selected interval remain completely legible while pointer dragging and keyboard adjustments are disabled.
          </p>
        </div>
        <DisabledRangeSliderDemo />
      </section>

      {/* 11. Range Slider vs Slider */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Range Slider vs Slider
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/40 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Value Model</th>
                <th className="p-3">Thumbs</th>
                <th className="p-3">Primary Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-foreground">Slider</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3">1 thumb</td>
                <td className="p-3">Single bounded value (e.g. Volume, Brightness)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Range Slider</td>
                <td className="p-3 font-mono">[number, number]</td>
                <td className="p-3">2 thumbs</td>
                <td className="p-3">Bounded interval selection (e.g. Price Range, Age Filter)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. Keyboard Interaction */}
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
                <td className="p-3">Focuses the lower thumb; pressing Tab again focuses the upper thumb.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground">ArrowRight / ArrowUp</td>
                <td className="p-3">Increments the focused thumb by one step.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground">ArrowLeft / ArrowDown</td>
                <td className="p-3">Decrements the focused thumb by one step.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground">PageUp / PageDown</td>
                <td className="p-3">Steps the focused thumb by large increments (typically 10 steps).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-foreground">Home / End</td>
                <td className="p-3">Snaps the focused thumb to the allowable minimum or maximum bound.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 13. Props Reference */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>
        <PropsTable rows={RANGE_SLIDER_PROPS} />
      </section>

      {/* 14. Anatomy */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Component Anatomy
        </h2>
        <Anatomy parts={RANGE_SLIDER_ANATOMY} />
      </section>

      {/* 15. Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li><strong>Distinct Thumb Naming:</strong> Each thumb receives distinct accessible names via <code>minLabel</code> and <code>maxLabel</code> (e.g. &quot;Minimum price&quot; and &quot;Maximum price&quot;).</li>
          <li><strong>Independent Focus Rings:</strong> The active thumb renders HaloUI&apos;s double-contrast focus ring with elevated z-index, ensuring visibility when thumbs sit adjacent.</li>
          <li><strong>Zero Synthetic Values:</strong> Screen readers announce actual native range values rather than raw DOM percentages.</li>
          <li><strong>Reduced Motion:</strong> Instant thumb snapping without artificial animation latency during pointer dragging.</li>
        </ul>
      </section>

      {/* 16. Dependencies & Files */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Dependencies
          </h2>
          <DependencyList groups={RANGE_SLIDER_DEPENDENCIES} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-heading">
            Installed Files
          </h2>
          <FileTree items={RANGE_SLIDER_FILES} />
        </div>
      </section>
    </div>
  );
}
