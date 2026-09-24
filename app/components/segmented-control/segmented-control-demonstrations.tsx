"use client";

import * as React from "react";
import {
  LayoutListIcon,
  LayoutGridIcon,
  GridViewIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  ChartBarLineIcon,
  PieChartIcon,
  AlignLeftIcon,
  FilterIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SegmentedControl,
  SegmentedControlItem,
  type SegmentedControlSize,
} from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";

/**
 * 1. Default Interactive Viewport Switch Preview
 * Demonstrates controlled mutual exclusivity and non-empty selection.
 */
export function SegmentedControlDefaultPreview() {
  const [view, setView] = React.useState("grid");

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
      <SegmentedControl
        value={view}
        onValueChange={setView}
        aria-label="Content layout view"
      >
        <SegmentedControlItem value="list">List</SegmentedControlItem>
        <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
        <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
      </SegmentedControl>

      <div className="text-xs text-muted-foreground text-center">
        Selected mode: <span className="font-mono text-foreground font-semibold uppercase">{view}</span>
        <p className="mt-1 text-[11px] text-muted-foreground/75">
          Clicking the active segment keeps it selected. Selection is strictly mutually exclusive.
        </p>
      </div>
    </div>
  );
}

/**
 * 2. Icon-Only Segmented Control Preview
 * Demonstrates icon-only segments with mandatory aria-label for accessibility.
 */
export function SegmentedControlIconOnlyPreview() {
  const [displayMode, setDisplayMode] = React.useState("grid");

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      <SegmentedControl
        value={displayMode}
        onValueChange={setDisplayMode}
        aria-label="Display mode"
      >
        <SegmentedControlItem value="list" aria-label="List view">
          <HaloIcon icon={LayoutListIcon} size={16} />
        </SegmentedControlItem>
        <SegmentedControlItem value="grid" aria-label="Grid view">
          <HaloIcon icon={GridViewIcon} size={16} />
        </SegmentedControlItem>
        <SegmentedControlItem value="chart" aria-label="Chart analytics view">
          <HaloIcon icon={ChartBarLineIcon} size={16} />
        </SegmentedControlItem>
      </SegmentedControl>
      <span className="text-xs font-mono text-muted-foreground">Mode: {displayMode}</span>
    </div>
  );
}

/**
 * 3. Icon + Text Composition
 * Standard composition combining an icon glyph and descriptive label.
 */
export function SegmentedControlIconTextPreview() {
  const [metricType, setMetricType] = React.useState("bar");

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-3">
      <SegmentedControl
        value={metricType}
        onValueChange={setMetricType}
        aria-label="Chart representation"
      >
        <SegmentedControlItem value="bar">
          <HaloIcon icon={ChartBarLineIcon} size={16} />
          Bar
        </SegmentedControlItem>
        <SegmentedControlItem value="pie">
          <HaloIcon icon={PieChartIcon} size={16} />
          Pie
        </SegmentedControlItem>
        <SegmentedControlItem value="list">
          <HaloIcon icon={LayoutListIcon} size={16} />
          Table
        </SegmentedControlItem>
      </SegmentedControl>
      <span className="text-xs font-mono text-muted-foreground">Chart: {metricType}</span>
    </div>
  );
}

/**
 * 4. Sizes Demonstration
 * Shows sm (28px item), default (34px item), and lg (40px item).
 */
export function SegmentedControlSizesPreview() {
  const [smVal, setSmVal] = React.useState("day");
  const [defVal, setDefVal] = React.useState("month");
  const [lgVal, setLgVal] = React.useState("year");

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6 p-6 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <SegmentedControl size="sm" value={smVal} onValueChange={setSmVal} aria-label="Small range filter">
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </SegmentedControl>
        <span className="text-xs font-mono text-muted-foreground">size=&quot;sm&quot; (28px height)</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <SegmentedControl size="default" value={defVal} onValueChange={setDefVal} aria-label="Default range filter">
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </SegmentedControl>
        <span className="text-xs font-mono text-muted-foreground">size=&quot;default&quot; (34px height)</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <SegmentedControl size="lg" value={lgVal} onValueChange={setLgVal} aria-label="Large range filter">
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="year">Year</SegmentedControlItem>
        </SegmentedControl>
        <span className="text-xs font-mono text-muted-foreground">size=&quot;lg&quot; (40px height)</span>
      </div>
    </div>
  );
}

/**
 * 5. Full Width Mode
 * Segments expand equally across the full container boundary.
 */
export function SegmentedControlFullWidthPreview() {
  const [tab, setTab] = React.useState("overview");

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-3">
      <SegmentedControl
        fullWidth
        value={tab}
        onValueChange={setTab}
        aria-label="Section tabs"
      >
        <SegmentedControlItem value="overview">Overview</SegmentedControlItem>
        <SegmentedControlItem value="activity">Activity</SegmentedControlItem>
        <SegmentedControlItem value="settings">Settings</SegmentedControlItem>
      </SegmentedControl>
      <span className="text-xs font-mono text-muted-foreground text-center">Active: {tab}</span>
    </div>
  );
}

/**
 * 6. Disabled States
 * Group disabled vs single item disabled while preserving current selection clarity.
 */
export function SegmentedControlDisabledPreview() {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <SegmentedControl defaultValue="grid" disabled aria-label="Entire group disabled">
          <SegmentedControlItem value="list">List</SegmentedControlItem>
          <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
          <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
        </SegmentedControl>
        <span className="text-xs text-muted-foreground">Entire control disabled</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <SegmentedControl defaultValue="list" aria-label="Individual item disabled">
          <SegmentedControlItem value="list">List</SegmentedControlItem>
          <SegmentedControlItem value="grid" disabled>Grid (Locked)</SegmentedControlItem>
          <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
        </SegmentedControl>
        <span className="text-xs text-muted-foreground">Item &quot;Grid&quot; disabled</span>
      </div>
    </div>
  );
}

/**
 * 7. State Spectrum
 * Verifies unselected rest, selected rest, hover, focus, and selected+focus.
 */
export function SegmentedControlStatesPreview() {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 p-6 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-foreground">Interactive State Spectrum</span>
          <span className="text-xs text-muted-foreground">Focus ring operates independently outside selected boundary</span>
        </div>
        <SegmentedControl defaultValue="published" aria-label="Status filter">
          <SegmentedControlItem value="draft">Draft</SegmentedControlItem>
          <SegmentedControlItem value="published">Published</SegmentedControlItem>
          <SegmentedControlItem value="archived">Archived</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <p className="text-xs text-muted-foreground">
        Use <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border">Tab</kbd> to enter, and <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border">Arrow Left</kbd> / <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border">Arrow Right</kbd> to navigate between segments.
      </p>
    </div>
  );
}
