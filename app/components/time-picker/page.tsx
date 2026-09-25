import * as React from "react";
import type { Metadata } from "next";
import { TimePickerPreviewStage } from "./time-picker-preview-stage";
import {
  PrimaryTimePickerExample,
  TwentyFourHourExample,
  BoundariesExample,
  MinuteStepExample,
  ClearableTimePickerExample,
  StatesTimePickerExample,
  FormCompositionExample,
} from "./time-picker-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Time Picker — Forms & Fields — HaloUI",
  description:
    "An accessible time-only control for selecting a local clock time without introducing a calendar date or timezone.",
};

const TIME_PICKER_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string | null",
    default: "undefined",
    required: false,
    description: "Controlled time value in canonical 24-hour 'HH:mm' format (e.g. '14:30').",
  },
  {
    name: "defaultValue",
    type: "string | null",
    default: "null",
    required: false,
    description: "Initial uncontrolled time string. Defaults to null (empty). Does not default to current time.",
  },
  {
    name: "onValueChange",
    type: "(time: string | null) => void",
    default: "undefined",
    required: false,
    description: "Callback fired when a complete valid time is committed or cleared.",
  },
  {
    name: "hourCycle",
    type: "12 | 24",
    default: "12",
    required: false,
    description: "Presentation hour cycle. 12-hour displays 1-12 with AM/PM; 24-hour displays 00-23.",
  },
  {
    name: "minuteStep",
    type: "number",
    default: "1",
    required: false,
    description: "Stepping interval for minute adjustment via keyboard arrows (e.g. 1, 5, 10, 15).",
  },
  {
    name: "clearable",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders an accessible clear icon button to reset the selection back to null.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction across all numeric segments and period controls.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies error perimeter styling and coordinates aria-invalid with surrounding form Field.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether entering a complete time is required before form submission.",
  },
];

const TIME_PICKER_ANATOMY: AnatomyPart[] = [
  {
    name: "TimePicker",
    description: "Root container coordinating structured numeric segments, period toggle, and Field integration.",
  },
  {
    name: "TimePickerHourSegment",
    description: "Focusable numeric input segment displaying 1-12 or 00-23 hours with Arrow-key stepping.",
  },
  {
    name: "TimePickerMinuteSegment",
    description: "Focusable numeric input segment displaying 00-59 minutes with configurable step increments.",
  },
  {
    name: "TimePickerPeriodSegment",
    description: "Accessible toggle button for switching between AM and PM periods in 12-hour mode.",
  },
];

const TIME_PICKER_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "time-picker.tsx", type: "file" },
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

const TIME_PICKER_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "Core Dependencies",
    items: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Registry Dependencies",
    items: ["field"],
  },
];

export default function TimePickerDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-primary">
            Forms &amp; Fields · 31
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Clock Time Selection
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Time Picker
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl sm:text-lg">
          An accessible time-only control for selecting a local clock time without introducing a calendar date or timezone. Features structured segment keyboard navigation, 12/24 hour display modes, and Field integration.
        </p>
      </header>

      {/* Interactive Preview Stage */}
      <section id="interactive-stage" className="space-y-4">
        <TimePickerPreviewStage />
      </section>

      {/* Time-Only Callout */}
      <Callout type="note" title="Time-Only Semantics">
        <strong>A Time Picker selects a clock time, not an instant.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          A value such as <code>14:30</code> does not inherently contain a calendar date, timezone, or UTC offset. Time Picker strictly enforces date-free temporal isolation.
        </p>
      </Callout>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-muted-foreground text-sm">
          Install Time Picker into your project using the HaloUI registry CLI.
        </p>
        <InstallCommand registry="time-picker" />
      </section>

      {/* Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-muted-foreground text-sm">
          Import and compose <code>TimePicker</code> with surrounding form field primitives:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { TimePicker } from "@/components/ui/time-picker";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function TimeDemo() {
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <Field id="meeting-time-field">
      <FieldLabel>Start time</FieldLabel>
      <FieldDescription>Choose a local clock time for the meeting.</FieldDescription>
      <TimePicker
        value={time}
        onValueChange={setTime}
        aria-label="Start time"
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
          Composed inside a HaloUI <code>Field</code>, Time Picker automatically coordinates <code>aria-labelledby</code>, <code>aria-describedby</code>, and invalid states without manual prop plumbing.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <PrimaryTimePickerExample />
        </div>
      </section>

      {/* 24-Hour Format */}
      <section id="24-hour" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          24-Hour Cycle Format
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Set <code>hourCycle=&#123;24&#125;</code> to format hours from <code>00</code> through <code>23</code>, removing the AM/PM period segment.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <TwentyFourHourExample />
        </div>
      </section>

      {/* Boundary Callout */}
      <Callout type="note" title="Midnight and Noon Translation">
        <strong>Deterministic 12h/24h boundaries.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Midnight is canonical <code>00:00</code> (translated to <code>12:00 AM</code>). Noon is canonical <code>12:00</code> (translated to <code>12:00 PM</code>). Values never map ambiguously across cycles.
        </p>
      </Callout>

      {/* Critical Boundaries */}
      <section id="boundaries" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Boundary Testing: Midnight, Noon &amp; Day End
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Verify deterministic translation across midnight, noon, and 23:59:
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <BoundariesExample />
        </div>
      </section>

      {/* Minute Stepping */}
      <section id="minute-stepping" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Minute Stepping Increments
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Set <code>minuteStep=&#123;15&#125;</code> for quarter-hour scheduling intervals. Arrow keys step by 15 minutes while direct typing remains available.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <MinuteStepExample />
        </div>
      </section>

      {/* Timezone Callout */}
      <Callout type="important" title="Timezone Isolation Boundary">
        <strong>Apply timezone rules only after a time is combined with a calendar date and location.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Time Picker does not ask for timezone or attempt UTC conversion. Time-of-day selection remains localized until scheduling logic binds it to an instant.
        </p>
      </Callout>

      {/* Clearable */}
      <section id="clearable" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Clearable Time Selection
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Enable <code>clearable</code> to render an accessible inline clear action that resets time to <code>null</code>.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <ClearableTimePickerExample />
        </div>
      </section>

      {/* Duration Callout */}
      <Callout type="warning" title="Time vs Duration Distinction">
        <strong>Time Picker is not a duration field.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          <code>14:30</code> represents a clock time of day; it does not mean fourteen hours and thirty minutes of elapsed duration.
        </p>
      </Callout>

      {/* States */}
      <section id="states" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Interaction States Matrix
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Review visual treatments across Empty, Complete, Invalid, and Disabled states.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <StatesTimePickerExample />
        </div>
      </section>

      {/* Form Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Form Composition &amp; Required Validation
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Time Picker coordinates with native form submission and HaloUI Field validation error display:
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <FormCompositionExample />
        </div>
      </section>

      {/* Keyboard Behavior */}
      <section id="keyboard-behavior" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Keyboard Navigation &amp; Digit Entry
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
                <td className="p-3 font-mono text-xs font-semibold text-primary">ArrowUp / ArrowDown</td>
                <td className="p-3 text-muted-foreground">Increments or decrements the active segment (hour wraps 12&rarr;1 or 23&rarr;0; minute steps by minuteStep; period toggles AM/PM).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">ArrowLeft / ArrowRight</td>
                <td className="p-3 text-muted-foreground">Moves focus between hour, minute, and period segments.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">0 &ndash; 9 (Digits)</td>
                <td className="p-3 text-muted-foreground">Directly types hour or minute digits, automatically advancing focus when a segment is complete.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">A / P</td>
                <td className="p-3 text-muted-foreground">In period segment, pressing &lsquo;A&rsquo; sets AM; pressing &lsquo;P&rsquo; sets PM.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Tab / Shift + Tab</td>
                <td className="p-3 text-muted-foreground">Moves between segments and exits the control cleanly.</td>
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
        <PropsTable rows={TIME_PICKER_PROPS} />
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={TIME_PICKER_ANATOMY} />
      </section>

      {/* Architecture Comparisons */}
      <section id="comparisons" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Architectural Responsibility Comparisons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Time Picker vs Native Input</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Native <code>&lt;input type=&quot;time&quot;&gt;</code> lacks unified theme tokens, accessible custom stepping, and coordinated HaloUI Focus Ring styling.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Time Picker vs Date Time Picker</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Time Picker isolates time-of-day without introducing a calendar date. Date Time Picker deliberately combines a date and time into an instant with timezone context.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Time Picker vs Duration Input</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Time Picker selects a position on a 24-hour clock. Duration Input selects an amount of elapsed time (e.g. 2 hours 30 minutes).
            </p>
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={TIME_PICKER_DEPENDENCIES} />
      </section>

      {/* Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={TIME_PICKER_FILES} />
      </section>
    </div>
  );
}
