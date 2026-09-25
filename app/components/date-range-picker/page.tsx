import * as React from "react";
import type { Metadata } from "next";
import { DateRangePickerPreviewStage } from "./date-range-picker-preview-stage";
import {
  PrimaryDateRangePickerExample,
  IncompleteRangeExample,
  ControlledDateRangePickerExample,
  SameDayRangeExample,
  DisabledDatesExample,
  StatesDateRangePickerExample,
  FormCompositionExample,
} from "./date-range-picker-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Date Range Picker — Forms & Fields — HaloUI",
  description:
    "An accessible calendar-backed control for selecting a start and end date as one ordered date interval.",
};

const DATE_RANGE_PICKER_PROPS: PropRow[] = [
  {
    name: "value",
    type: "DateRange | null",
    default: "undefined",
    required: false,
    description: "Controlled date range object containing 'from' and 'to' endpoints.",
  },
  {
    name: "defaultValue",
    type: "DateRange | null",
    default: "{ from: null, to: null }",
    required: false,
    description: "Initial uncontrolled date range. Defaults to an empty interval.",
  },
  {
    name: "onValueChange",
    type: "(range: DateRange, rangeString: DateRangeString) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when start or end date changes, returning both Date objects and canonical 'YYYY-MM-DD' strings.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Select date range"',
    required: false,
    description: "Placeholder text rendered in the trigger button when no interval has been selected.",
  },
  {
    name: "formatString",
    type: "string",
    default: '"LLL dd, y"',
    required: false,
    description: "date-fns format string for rendering start and end date labels.",
  },
  {
    name: "numberOfMonths",
    type: "1 | 2",
    default: "2",
    required: false,
    description: "Number of calendar months displayed side-by-side in the popover grid.",
  },
  {
    name: "closeOnComplete",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to automatically dismiss the popover after both start and end dates have been selected.",
  },
  {
    name: "disabledDates",
    type: "((date: Date) => boolean) | Date[]",
    default: "undefined",
    required: false,
    description: "Predicate function or array specifying calendar dates that cannot be chosen as endpoints.",
  },
  {
    name: "minDate",
    type: "Date",
    default: "undefined",
    required: false,
    description: "Earliest selectable calendar date.",
  },
  {
    name: "maxDate",
    type: "Date",
    default: "undefined",
    required: false,
    description: "Latest selectable calendar date.",
  },
  {
    name: "clearable",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders an accessible clear icon button to reset the selection back to empty.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction across trigger and calendar surfaces.",
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
    description: "Whether choosing a complete start and end date range is required before form submission.",
  },
];

const DATE_RANGE_PICKER_ANATOMY: AnatomyPart[] = [
  {
    name: "DateRangePicker",
    description: "Root compound provider managing interval normalization, chronological ordering, and popover state.",
  },
  {
    name: "DateRangePickerTrigger",
    description: "Interactive button styled with HaloUI liquid glass displaying the calendar icon and formatted interval.",
  },
  {
    name: "DateRangePickerContent",
    description: "Floating popover surface housing the dual-month or single-month calendar grid.",
  },
  {
    name: "Calendar",
    description: "Shared accessible calendar grid rendering range start, range middle continuity, and range end cells.",
  },
];

const DATE_RANGE_PICKER_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "date-range-picker.tsx", type: "file" },
          { name: "date-picker.tsx", type: "file" },
          { name: "calendar.tsx", type: "file" },
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

const DATE_RANGE_PICKER_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "Core Dependencies",
    items: [
      "@radix-ui/react-popover",
      "react-day-picker",
      "date-fns",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Registry Dependencies",
    items: ["date-picker", "calendar", "field"],
  },
];

export default function DateRangePickerDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-primary">
            Forms &amp; Fields · 30
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Interval Selection
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Date Range Picker
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl sm:text-lg">
          An accessible calendar-backed control for selecting a start and end date as one ordered date interval. Reuses DatePicker calendar infrastructure while cleanly representing empty, incomplete, and complete interval states.
        </p>
      </header>

      {/* Interactive Preview Stage */}
      <section id="interactive-stage" className="space-y-4">
        <DateRangePickerPreviewStage />
      </section>

      {/* Range Callout */}
      <Callout type="note" title="Coherent Interval State">
        <strong>A Date Range Picker selects one interval, not two unrelated dates.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Start, end, incomplete range, and complete range share one unified state model. An incomplete selection communicates that the end date remains required.
        </p>
      </Callout>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-muted-foreground text-sm">
          Install Date Range Picker into your project using the HaloUI registry CLI.
        </p>
        <InstallCommand registry="date-range-picker" />
      </section>

      {/* Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-muted-foreground text-sm">
          Import and compose <code>DateRangePicker</code> with surrounding form field primitives:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function RangeDemo() {
  const [range, setRange] = React.useState<DateRange>({ from: null, to: null });

  return (
    <Field id="project-period-field">
      <FieldLabel>Project period</FieldLabel>
      <FieldDescription>Choose a start and end date.</FieldDescription>
      <DateRangePicker
        value={range}
        onValueChange={setRange}
        placeholder="Select project period"
        aria-label="Project period"
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
          Composed inside a HaloUI <code>Field</code>, Date Range Picker automatically coordinates <code>aria-labelledby</code>, <code>aria-describedby</code>, and invalid states without manual prop forwarding.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <PrimaryDateRangePickerExample />
        </div>
      </section>

      {/* Incomplete Range State */}
      <section id="incomplete-range" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Incomplete Range State
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          When a user selects the first date, the component transitions to an incomplete state (<code>to: null</code>). The trigger clearly communicates that the end date remains required.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <IncompleteRangeExample />
        </div>
      </section>

      {/* Controlled & Presets */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Controlled Selection &amp; Interval Synchronization
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The public callback <code>onValueChange</code> provides both the local <code>DateRange</code> object and canonical date-only strings (<code>YYYY-MM-DD</code>).
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <ControlledDateRangePickerExample />
        </div>
      </section>

      {/* Date-Only Callout */}
      <Callout type="note" title="Date-Only Value Invariant">
        <strong>A date range represents calendar dates unless the application explicitly adds times and a timezone.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Do not silently convert a date-only range into UTC timestamps or compute durations by subtracting timestamps without calendar-day awareness.
        </p>
      </Callout>

      {/* Same-Day Range */}
      <section id="same-day" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Same-Day Range Selection
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          When the start date equals the end date, the day cell renders cleanly with both start and end visual indicators without visual overlap or broken geometry.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <SameDayRangeExample />
        </div>
      </section>

      {/* Business Rule Callout */}
      <Callout type="important" title="Business Rule Responsibilities">
        <strong>Minimum stays, booking availability, pricing, holidays, delivery windows, and similar policies belong to application logic.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Date Range Picker provides calendar selection and supplied date constraints. Availability, hotel night counts, and reservation logic remain application responsibilities.
        </p>
      </Callout>

      {/* Disabled Dates */}
      <section id="disabled-dates" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Disabled Dates &amp; Endpoint Constraints
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Supply a function to <code>disabledDates</code> to prevent weekends or unavailable dates from being chosen as range endpoints.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <DisabledDatesExample />
        </div>
      </section>

      {/* States */}
      <section id="states" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Interaction States Matrix
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Review visual treatments across Empty, Incomplete, Complete, and Invalid states.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <StatesDateRangePickerExample />
        </div>
      </section>

      {/* Form Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Form Composition &amp; Required Validation
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Date Range Picker validates that both endpoints are selected before satisfying a required Field:
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <FormCompositionExample />
        </div>
      </section>

      {/* Keyboard Behavior */}
      <section id="keyboard-behavior" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Keyboard Navigation &amp; Focus Restoration
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
                <td className="p-3 font-mono text-xs font-semibold text-primary">Enter / Space (Trigger)</td>
                <td className="p-3 text-muted-foreground">Opens the calendar popup and places focus on the start date or current day.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">ArrowLeft / ArrowRight</td>
                <td className="p-3 text-muted-foreground">Navigates day by day across calendar grids, crossing month boundaries.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">ArrowUp / ArrowDown</td>
                <td className="p-3 text-muted-foreground">Navigates by week (&plusmn;7 days).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Enter / Space (Calendar)</td>
                <td className="p-3 text-muted-foreground">First press commits the start date; second press commits the end date, completing the range.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Escape</td>
                <td className="p-3 text-muted-foreground">Closes the calendar popup without committing an incomplete range, restoring focus to the trigger.</td>
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
        <PropsTable rows={DATE_RANGE_PICKER_PROPS} />
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={DATE_RANGE_PICKER_ANATOMY} />
      </section>

      {/* Architecture Comparisons */}
      <section id="comparisons" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Architectural Responsibility Comparisons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Date Range Picker vs Date Picker</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Date Picker selects exactly one calendar day. Date Range Picker manages an ordered pair of dates representing an interval, with range start, middle continuity, and end styling.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Date Range Picker vs Date Time Picker</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Date Range Picker selects calendar days without clock times or timezone offsets. Date Time Picker manages exact moments in time with clock precision.
            </p>
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DATE_RANGE_PICKER_DEPENDENCIES} />
      </section>

      {/* Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={DATE_RANGE_PICKER_FILES} />
      </section>
    </div>
  );
}
