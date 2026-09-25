import * as React from "react";
import type { Metadata } from "next";
import { DatePickerPreviewStage } from "./date-picker-preview-stage";
import {
  PrimaryDatePickerExample,
  ControlledDatePickerExample,
  DisabledDatesExample,
  MinMaxBoundsExample,
  ClearableDatePickerExample,
  StatesDatePickerExample,
  FormCompositionExample,
} from "./date-picker-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Date Picker — Forms & Fields — HaloUI",
  description:
    "An accessible calendar-backed control for selecting a single calendar date.",
};

const DATE_PICKER_PROPS: PropRow[] = [
  {
    name: "value",
    type: "Date | string | null",
    default: "undefined",
    required: false,
    description: "Controlled calendar date value. Accepts a JavaScript Date, an ISO 'YYYY-MM-DD' string, or null for empty.",
  },
  {
    name: "defaultValue",
    type: "Date | string | null",
    default: "null",
    required: false,
    description: "Initial uncontrolled date value. Defaults to empty (null). Does not automatically select today.",
  },
  {
    name: "onValueChange",
    type: "(date: Date | null, dateString: string | null) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when a date is selected or cleared, passing both the Date instance and canonical 'YYYY-MM-DD' string.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Select a date"',
    required: false,
    description: "Placeholder text rendered in the trigger button when no date has been selected.",
  },
  {
    name: "formatString",
    type: "string",
    default: '"PPP"',
    required: false,
    description: "date-fns format string for rendering the selected date label (e.g. 'PPP' yields 'September 25th, 2026').",
  },
  {
    name: "disabledDates",
    type: "((date: Date) => boolean) | Date[]",
    default: "undefined",
    required: false,
    description: "Predicate function or array specifying calendar dates that cannot be selected.",
  },
  {
    name: "minDate",
    type: "Date",
    default: "undefined",
    required: false,
    description: "Earliest selectable calendar date. Days before this threshold are disabled.",
  },
  {
    name: "maxDate",
    type: "Date",
    default: "undefined",
    required: false,
    description: "Latest selectable calendar date. Days after this threshold are disabled.",
  },
  {
    name: "clearable",
    type: "boolean",
    default: "false",
    required: false,
    description: "Displays an integrated clear action icon to reset selection back to null.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction across the trigger button and calendar popup.",
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
    description: "Whether choosing a date is required before form submission.",
  },
];

const DATE_PICKER_ANATOMY: AnatomyPart[] = [
  {
    name: "DatePicker",
    description: "Root provider managing date normalization, popover visibility, focus return, and field context.",
  },
  {
    name: "DatePickerTrigger",
    description: "Interactive button styled with HaloUI liquid glass displaying the calendar icon and formatted date.",
  },
  {
    name: "DatePickerContent",
    description: "Floating popover surface rendered in a portal with restrained optical elevation and collision detection.",
  },
  {
    name: "Calendar",
    description: "Accessible month grid powered by react-day-picker providing full keyboard navigation and locale awareness.",
  },
];

const DATE_PICKER_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
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

const DATE_PICKER_DEPENDENCIES: DependencyGroup[] = [
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
    items: ["calendar", "field"],
  },
];

export default function DatePickerDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-primary">
            Forms &amp; Fields · 29
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Calendar Selection
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Date Picker
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl sm:text-lg">
          An accessible calendar-backed control for selecting a single calendar date. Built with date-only timezone protection, accessible month navigation, focus restoration, and high optical clarity without material contamination.
        </p>
      </header>

      {/* Interactive Preview Stage */}
      <section id="interactive-stage" className="space-y-4">
        <DatePickerPreviewStage />
      </section>

      {/* Date-Only Callout */}
      <Callout type="note" title="Date-Only Value Invariant">
        <strong>A calendar date is not inherently a timestamp.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Selecting a date such as <code>2026-09-25</code> should not silently convert it into midnight UTC or another timezone-specific instant unless the application explicitly requires that conversion. Date Picker enforces strict date-only normalization.
        </p>
      </Callout>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-muted-foreground text-sm">
          Install Date Picker into your project using the HaloUI registry CLI.
        </p>
        <InstallCommand registry="date-picker" />
      </section>

      {/* Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-muted-foreground text-sm">
          Import and compose <code>DatePicker</code> with surrounding form field primitives:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <Field id="start-date-field">
      <FieldLabel>Start date</FieldLabel>
      <FieldDescription>Choose a calendar date for the milestone.</FieldDescription>
      <DatePicker
        value={date}
        onValueChange={setDate}
        placeholder="Pick a date"
        aria-label="Start date"
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
          Composed inside a HaloUI <code>Field</code>, Date Picker automatically coordinates <code>aria-labelledby</code>, <code>aria-describedby</code>, and invalid states across trigger and portalled overlay.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <PrimaryDatePickerExample />
        </div>
      </section>

      {/* Today Callout */}
      <Callout type="warning" title="Today vs Selected State">
        <strong>Today, focused, and selected are separate states.</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Highlighting today&apos;s date visually provides spatial orientation, but it must not imply that today is selected. Date Picker starts unselected (<code>null</code>) by default.
        </p>
      </Callout>

      {/* Controlled & Reset */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Controlled Selection &amp; Date Synchronization
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          <code>onValueChange</code> provides both the local <code>Date</code> instance and the canonical <code>YYYY-MM-DD</code> string, preventing UTC day-shifting errors.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <ControlledDatePickerExample />
        </div>
      </section>

      {/* Business Rule Callout */}
      <Callout type="important" title="Business Rule Constraints">
        <strong>Business Rule Constraints</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Date Picker provides calendar selection and supplied date constraints. Availability, holidays, booking capacity, delivery schedules, and other business policies remain application responsibilities.
        </p>
      </Callout>

      {/* Disabled Dates */}
      <section id="disabled-dates" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Disabled Dates &amp; Predicates
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Supply a function to <code>disabledDates</code> to disable weekends, past dates, or specific unavailable calendar days.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <DisabledDatesExample />
        </div>
      </section>

      {/* Min & Max Bounds */}
      <section id="min-max" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Minimum and Maximum Bounds
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Use <code>minDate</code> and <code>maxDate</code> to restrict selection to a bounded date window. Month navigation controls automatically respect bounds.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <MinMaxBoundsExample />
        </div>
      </section>

      {/* Locale Callout */}
      <Callout type="note" title="Locale Formatting & Conventions">
        <strong>Locale Formatting &amp; First Day of Week</strong>
        <p className="mt-1 text-sm leading-relaxed">
          Locale affects display formatting, month names, weekday labels, and calendar start-of-week conventions. Do not assume one global <code>MM/DD/YYYY</code> presentation.
        </p>
      </Callout>

      {/* Clearable */}
      <section id="clearable" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Clearable Date Selection
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Enable <code>clearable</code> to render an accessible inline clear action that resets selection to <code>null</code> without needing external button wiring.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <ClearableDatePickerExample />
        </div>
      </section>

      {/* States */}
      <section id="states" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Interaction States Matrix
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Review visual treatments across Empty, Selected, Invalid (Error), and Disabled states.
        </p>
        <div className="p-6 rounded-2xl border border-border/80 bg-background/50">
          <StatesDatePickerExample />
        </div>
      </section>

      {/* Form Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Form Composition &amp; Required Validation
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Date Picker coordinates with native form submission and HaloUI Field validation error display:
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
                <td className="p-3 text-muted-foreground">Opens the calendar popup and moves focus to the selected date or current day.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">ArrowLeft / ArrowRight</td>
                <td className="p-3 text-muted-foreground">Navigates focus day by day across the calendar grid, crossing week and month boundaries.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">ArrowUp / ArrowDown</td>
                <td className="p-3 text-muted-foreground">Navigates focus by week (same weekday, &plusmn;7 days).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Enter / Space (Calendar)</td>
                <td className="p-3 text-muted-foreground">Selects the focused enabled date, closes the popup, and returns focus to the trigger.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs font-semibold text-primary">Escape</td>
                <td className="p-3 text-muted-foreground">Closes the calendar popup without mutating selection and restores focus to the trigger button.</td>
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
        <PropsTable rows={DATE_PICKER_PROPS} />
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={DATE_PICKER_ANATOMY} />
      </section>

      {/* Architecture Comparisons */}
      <section id="comparisons" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Architectural Responsibility Comparisons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Date Picker vs Native Input</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Native <code>&lt;input type=&quot;date&quot;&gt;</code> relies on operating-system chrome and does not support custom disabled date predicates, controlled popover surfaces, or unified HaloUI theme tokens.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Date Picker vs Date Field</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A Date Field specializes in structured textual numeric entry (e.g. typing day/month/year). Date Picker is calendar-backed spatial selection. Both can compose when complex textual input is required.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Date Picker vs Date Range Picker</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Date Picker selects exactly one calendar day. Date Range Picker manages start/end intervals and date hover ranges. These responsibilities are strictly separated to maintain clean state models.
            </p>
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DATE_PICKER_DEPENDENCIES} />
      </section>

      {/* Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={DATE_PICKER_FILES} />
      </section>
    </div>
  );
}
