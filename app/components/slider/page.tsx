import type { Metadata } from "next";
import { SliderPreviewStage } from "./slider-preview-stage";
import {
  PrimarySliderDemo,
  DiscreteStepsSliderDemo,
  VerticalSliderDemo,
  ControlledSliderDemo,
  DisabledSliderDemo,
} from "./slider-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable } from "@/components/mdx/props-table";
import { Callout } from "@/components/mdx/callout";
import { InstallCommand } from "@/components/mdx/install-command";
import { DependencyList } from "@/components/mdx/dependency-list";
import { FileTree } from "@/components/mdx/file-tree";

export const metadata: Metadata = {
  title: "Slider — Forms & Fields — HaloUI",
  description:
    "An accessible single-value range control for choosing a numeric value within defined minimum and maximum bounds, built with HaloUI's 10-layer physical liquid glass engine.",
  keywords: [
    "slider",
    "range",
    "numeric slider",
    "accessible slider",
    "base-ui",
    "liquid glass",
    "haloui",
  ],
  authors: [{ name: "HaloUI Team" }],
};

export default function SliderDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-primary">
            Forms &amp; Fields · 17
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Base UI Primitive
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Slider
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl sm:text-lg">
          An accessible single-value range control selecting a numeric value along a continuous or stepped physical liquid optical channel. Built on Base UI&apos;s Slider primitive with independent double-contrast Halo Focus Ring and tactile bead feedback.
        </p>
      </header>

      {/* Interactive Preview Stage */}
      <section id="interactive-stage" className="space-y-4">
        <SliderPreviewStage />
      </section>

      {/* Source Ownership Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Distribute directly into your repository via the shadcn registry CLI:
        </p>
        <InstallCommand registry="slider" />
      </section>

      {/* Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Slider is built on Base UI&apos;s unstyled slider foundation with zero runtime lock-in:
        </p>
        <DependencyList
          groups={[
            {
              title: "External Dependencies",
              items: ["@base-ui/react", "clsx", "tailwind-merge"],
            },
            {
              title: "Registry Dependencies",
              items: ["field"],
            },
          ]}
        />
      </section>

      {/* Architectural Callout */}
      <section className="space-y-4">
        <Callout type="note" title="Single-Value Slider vs. Range Slider">
          Slider is engineered specifically for selecting a single continuous or stepped numeric point. For selecting a bounded interval between two values, use the distinct <strong>Range Slider</strong> primitive.
        </Callout>
      </section>

      {/* Anatomy & Structure */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Component Anatomy &amp; Files
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Slider integrates with your local UI directory as a standalone source-owned component:
        </p>
        <FileTree
          items={[
            {
              name: "components",
              type: "folder",
              children: [
                {
                  name: "ui",
                  type: "folder",
                  children: [
                    { name: "slider.tsx", type: "file" },
                    { name: "field.tsx", type: "file" },
                  ],
                },
              ],
            },
          ]}
        />
      </section>

      {/* Primary Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Basic Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Integrate Slider with Field, FieldLabel, and FieldDescription for standard form composition:
        </p>
        <PrimarySliderDemo />
        <CodeBlock
          language="tsx"
          filename="volume-control.tsx"
          code={`import { Slider } from "@/components/ui/slider";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function VolumeSlider() {
  const [volume, setVolume] = React.useState(65);

  return (
    <Field id="volume-field">
      <FieldLabel htmlFor="volume-slider">Output volume</FieldLabel>
      <FieldDescription>Adjust the master playback amplitude.</FieldDescription>
      <Slider
        id="volume-slider"
        value={volume}
        onValueChange={setVolume}
        min={0}
        max={100}
        aria-label="Output volume"
      />
    </Field>
  );
}`}
        />
      </section>

      {/* Discrete Steps */}
      <section id="discrete-steps" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Discrete Step Resolution
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use the <code className="font-mono text-xs">step</code> prop to restrict slider motion to predefined increments:
        </p>
        <DiscreteStepsSliderDemo />
      </section>

      {/* Vertical Orientation */}
      <section id="vertical" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Vertical Orientation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Configure <code className="font-mono text-xs">orientation=&quot;vertical&quot;</code> for audio mixers, equalizer bands, and spatial controls:
        </p>
        <VerticalSliderDemo />
      </section>

      {/* Controlled & Reset */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Controlled Value &amp; Programmatic Reset
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Bind state to <code className="font-mono text-xs">value</code> and update via <code className="font-mono text-xs">onValueChange</code>:
        </p>
        <ControlledSliderDemo />
      </section>

      {/* Disabled State */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Disabled State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When disabled, the slider suppresses pointer events, greys out the optical channel, and locks thumb interaction:
        </p>
        <DisabledSliderDemo />
      </section>

      {/* Props Table */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Props Reference
        </h2>
        <PropsTable
          rows={[
            {
              name: "value",
              type: "number",
              default: "undefined",
              description: "Controlled numeric value of the slider.",
            },
            {
              name: "defaultValue",
              type: "number",
              default: "0",
              description: "Initial numeric value when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(value: number) => void",
              default: "undefined",
              description: "Event handler called during continuous dragging or stepping.",
            },
            {
              name: "onValueCommit",
              type: "(value: number) => void",
              default: "undefined",
              description: "Event handler called when interaction ends (pointer up or key release).",
            },
            {
              name: "min",
              type: "number",
              default: "0",
              description: "Minimum allowable numeric bound.",
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: "Maximum allowable numeric bound.",
            },
            {
              name: "step",
              type: "number",
              default: "1",
              description: "Granularity that the value must adhere to.",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Axis orientation of the slider channel.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Locks the slider and prevents pointer/keyboard interactions.",
            },
          ]}
        />
      </section>
    </div>
  );
}
