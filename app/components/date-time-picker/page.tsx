import { Metadata } from "next";
import { DateTimePickerPreviewStage } from "./date-time-picker-preview-stage";
import { DateTimePickerDemonstrations } from "./date-time-picker-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { ProcessSteps } from "@/components/mdx/process-steps";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Date Time Picker — Forms & Fields — HaloUI",
  description:
    "An accessible control for selecting one calendar date and one local clock time as a combined date-time value.",
};

const DATE_TIME_PICKER_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string | null",
    default: "undefined",
    required: false,
    description: "Controlled combined date-time string in canonical 'YYYY-MM-DDTHH:mm' format.",
  },
  {
    name: "defaultValue",
    type: "string | null",
    default: "null",
    required: false,
    description: "Initial uncontrolled date-time string in canonical 'YYYY-MM-DDTHH:mm' format.",
  },
  {
    name: "onValueChange",
    type: "(value: string | null, parts: LocalDateTimeParts) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when date or time changes, supplying both string and decomposed parts.",
  },
  {
    name: "hourCycle",
    type: "12 | 24",
    default: "12",
    required: false,
    description: "Display hour cycle: 12-hour (with AM/PM) or 24-hour military format.",
  },
  {
    name: "minuteStep",
    type: "number",
    default: "1",
    required: false,
    description: "Minutes adjustment interval for keyboard arrow stepping.",
  },
  {
    name: "clearable",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render an inline clear action on the trigger capsule.",
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
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the picker and all interactive segments are disabled.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Marks control as invalid and coordinates with FieldError.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/date-time-picker.tsx",
    type: "file",
    description: "Composite Date Time Picker primitive",
  },
  {
    name: "components/ui/calendar.tsx",
    type: "file",
    description: "Shared standalone Calendar surface",
  },
  {
    name: "components/ui/time-picker.tsx",
    type: "file",
    description: "Time-only math and segment control",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "HaloUI liquid material tokens and surface engine",
  },
];

export default function DateTimePickerDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Forms & Fields · 32
          </span>
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Stable API
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Date Time Picker
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg max-w-3xl leading-relaxed">
          An accessible control for selecting one calendar date and one local clock time as a combined date-time value.
          Composes the proven Calendar and Time Picker models without introducing premature timezone assumptions or UTC offset shifts.
        </p>
      </header>

      {/* Critical Callouts */}
      <div className="space-y-4">
        <Callout type="warning">
          <strong className="font-semibold">A local date plus a local time is not automatically a universal instant.</strong>{" "}
          Timezone or offset context is strictly required before converting a local date-time into UTC.
        </Callout>
        <Callout type="note">
          <strong className="font-semibold">Composition Guarantee:</strong> Date Time Picker reuses HaloUI&apos;s
          Calendar and Time Picker models. It does not introduce duplicate date parsers, calendars, or time stepping engines.
        </Callout>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Interactive Stage</h2>
        <DateTimePickerPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Date Time Picker into your repository via the shadcn registry CLI:
        </p>
        <InstallCommand registry="date-time-picker" />
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <CodeBlock
          code={`import * as React from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";

export function BasicDateTimePicker() {
  const [dateTime, setDateTime] = React.useState<string | null>(null);

  return (
    <DateTimePicker
      value={dateTime}
      onValueChange={(val, parts) => {
        setDateTime(val);
        console.log("Canonical 24h ISO string:", val);
        console.log("Decomposed parts:", parts); // { date: Date | null, time: string | null }
      }}
      placeholder="Pick date and time"
    />
  );
}`}
          language="tsx"
        />
      </section>

      {/* Value Model & Partial States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Value Model & Completeness States</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A local date and local time represent distinct temporal dimensions. The canonical emitted value is formatted
          as an ISO 8601 local date-time string: <code className="font-mono text-xs">YYYY-MM-DDTHH:mm</code> (e.g. <code className="font-mono text-xs">2026-09-25T14:30</code>),
          mirroring the standard <code className="font-mono text-xs">&lt;input type=&quot;datetime-local&quot; /&gt;</code> without any trailing <code className="font-mono text-xs">&quot;Z&quot;</code>.
        </p>

        <ProcessSteps
          steps={[
            {
              title: "1. Empty State",
              description: "Both date and time are null. Trigger displays configurable placeholder.",
            },
            {
              title: "2. Partial State",
              description: "User selects either date or time. Trigger shows partial formatting (e.g. 'Sep 25, 2026 at --:--') indicating additional input is required.",
            },
            {
              title: "3. Complete State",
              description: "Both date and time are populated. Emits canonical string '2026-09-25T14:30' and enables valid submission.",
            },
          ]}
        />
      </section>

      {/* Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Demonstrations & Variants</h2>
        <DateTimePickerDemonstrations />
      </section>

      {/* Keyboard Behavior */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Keyboard Behavior</h2>
        <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-3 text-sm">
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Trigger (Space / Enter):</strong> Opens or closes the popover dialog.
            </li>
            <li>
              <strong className="text-foreground">Calendar Navigation (Arrows):</strong> Navigates between days, weeks, and month boundaries.
            </li>
            <li>
              <strong className="text-foreground">Tab:</strong> Moves focus smoothly between calendar grid and time entry segment inputs.
            </li>
            <li>
              <strong className="text-foreground">Hour/Minute Steppers (Up / Down):</strong> Increments or decrements hours and minutes by configured step.
            </li>
            <li>
              <strong className="text-foreground">Escape:</strong> Closes the popover without clearing entered draft values and restores focus to trigger.
            </li>
          </ul>
        </div>
      </section>

      {/* Props Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <PropsTable rows={DATE_TIME_PICKER_PROPS} />
      </section>

      {/* File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installed Files</h2>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
