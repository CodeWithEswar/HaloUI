import { Metadata } from "next";
import { CalendarPreviewStage } from "./calendar-preview-stage";
import { CalendarDemonstrations } from "./calendar-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Calendar — Forms & Fields — HaloUI",
  description:
    "An accessible standalone calendar surface for navigating and selecting calendar dates.",
};

const CALENDAR_PROPS: PropRow[] = [
  {
    name: "mode",
    type: "'single' | 'range' | 'default'",
    default: "'single'",
    required: false,
    description: "Calendar date selection mode.",
  },
  {
    name: "selected",
    type: "Date | DateRange | undefined",
    default: "undefined",
    required: false,
    description: "Controlled selection value.",
  },
  {
    name: "onSelect",
    type: "(date: any) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when a date or contiguous date range is selected.",
  },
  {
    name: "defaultMonth",
    type: "Date",
    default: "current month",
    required: false,
    description: "Initial visible calendar month.",
  },
  {
    name: "numberOfMonths",
    type: "number",
    default: "1",
    required: false,
    description: "Number of contiguous months to display simultaneously.",
  },
  {
    name: "disabled",
    type: "Matcher | Matcher[]",
    default: "undefined",
    required: false,
    description: "Matcher or array of matchers for disabling dates from interaction.",
  },
  {
    name: "showOutsideDays",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render adjacent days from previous/next months in edge rows.",
  },
  {
    name: "locale",
    type: "Locale",
    default: "undefined",
    required: false,
    description: "date-fns Locale object for month names, weekday abbreviations, and first day of week.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/calendar.tsx",
    type: "file",
    description: "Standalone calendar surface and DayButton component",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "HaloUI liquid material tokens and surface engine",
  },
];

export default function CalendarDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Forms & Fields · 33
          </span>
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Foundational Primitive
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Calendar
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg max-w-3xl leading-relaxed">
          An accessible standalone calendar surface for navigating and selecting calendar dates.
          Acts as the reusable temporal grid foundation consumed by Date Picker, Date Range Picker, and Date Time Picker.
        </p>
      </header>

      {/* Critical Callout */}
      <Callout type="note">
        <strong className="font-semibold">Architectural Foundation:</strong> Calendar is the standalone temporal interaction surface.
        Higher-level pickers (Date Picker, Date Range Picker, Date Time Picker) add field wrappers, input triggers, and popover overlays
        around this component rather than implementing redundant calendar engines.
      </Callout>

      {/* Interactive Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Interactive Stage</h2>
        <CalendarPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Calendar directly via the shadcn registry CLI:
        </p>
        <InstallCommand registry="calendar" />
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <CodeBlock
          code={`import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export function BasicCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-2xl border p-3"
    />
  );
}`}
          language="tsx"
        />
      </section>

      {/* Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Selection Modes & Dual Horizons</h2>
        <CalendarDemonstrations />
      </section>

      {/* Distinct States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">State Distinction: Today vs Focused vs Selected</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI strictly maintains visual and semantic separation between informational temporal state, roving keyboard focus, and committed selection:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Today</h4>
            <p className="text-xs text-muted-foreground">
              Informational indicator showing the user&apos;s current calendar date. Never implies selection.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Focused</h4>
            <p className="text-xs text-muted-foreground">
              Active roving keyboard cursor. Allows exploring grid cells prior to pressing Space or Enter.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-1">
            <h4 className="text-sm font-semibold text-primary">Selected</h4>
            <p className="text-xs text-muted-foreground">
              Committed date or date range. Styled with radiant Halo optical pill depth.
            </p>
          </div>
        </div>
      </section>

      {/* Keyboard Navigation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Keyboard Behavior</h2>
        <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-3 text-sm">
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Arrow Left / Right:</strong> Moves focus to the previous or next day. Crosses week and month boundaries seamlessly.
            </li>
            <li>
              <strong className="text-foreground">Arrow Up / Down:</strong> Moves focus to the same day in the previous or next week.
            </li>
            <li>
              <strong className="text-foreground">Page Up / Down:</strong> Navigates between consecutive months.
            </li>
            <li>
              <strong className="text-foreground">Home / End:</strong> Jumps to the first or last day of the current month.
            </li>
            <li>
              <strong className="text-foreground">Space / Enter:</strong> Selects the currently focused enabled date.
            </li>
          </ul>
        </div>
      </section>

      {/* Props Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <PropsTable rows={CALENDAR_PROPS} />
      </section>

      {/* File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installed Files</h2>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
