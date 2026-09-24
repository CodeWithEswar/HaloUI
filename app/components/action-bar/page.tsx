import * as React from "react";
import type { Metadata } from "next";
import { ActionBarPreviewStage } from "./action-bar-preview-stage";
import {
  ActionBarDefaultPreview,
  ActionBarFloatingPreview,
  ActionBarCompactPreview,
  ActionBarFocusStressPreview,
  ActionBarResponsivePreview,
} from "./action-bar-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Action Bar — Actions",
  description:
    "A contextual container for organizing actions related to the user's current selection or task.",
};

const PROPS_DATA = [
  {
    name: "density",
    type: '"compact" | "default" | "spacious"',
    default: '"default"',
    required: false,
    description:
      "Padding and gap density: 'compact' (p-1.5, gap-1.5), 'default' (p-2.5, gap-2.5), or 'spacious' (p-3.5, gap-3.5).",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "When true, expands the action bar to 100% of the parent width and spaces internal groups.",
  },
  {
    name: "role",
    type: "string",
    default: '"toolbar"',
    required: false,
    description:
      "ARIA role assigned to the container (defaults to 'toolbar' for accessible batch controls).",
  },
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "Mandatory accessible description identifying the purpose of the action bar.",
  },
];

const GROUP_PROPS_DATA = [
  {
    name: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    required: false,
    description:
      "Alignment orientation of child action controls within this specific group cluster.",
  },
];

const LABEL_PROPS_DATA = [
  {
    name: "count",
    type: "number | string",
    default: "undefined",
    required: false,
    description:
      "Optional numeric selection count rendered inside a high-contrast badge.",
  },
];

const SEPARATOR_PROPS_DATA = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"vertical"',
    required: false,
    description:
      "Spatial orientation of the optical divider line.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "ActionBar (Root)",
    description:
      "Contextual liquid glass container providing unified optical boundary, backdrop diffusion, and unclipped focus overflow context.",
  },
  {
    name: "ActionBarLabel",
    description:
      "Selection context readout (e.g. '3 selected') informing the user of the active scope.",
  },
  {
    name: "ActionBarSeparator",
    description:
      "Subtle 1px hairline optical divider organizing independent action clusters.",
  },
  {
    name: "ActionBarGroup",
    description:
      "Semantic grouping wrapper orchestrating Button, Icon Button, and Button Group controls.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Runtime Dependencies",
    items: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Composition Actions",
    items: ["button", "icon-button", "button-group"],
  },
  {
    title: "HaloUI Foundation Tokens",
    items: [
      "halo-focus-ring",
      "--halo-surface",
      "--halo-edge",
    ],
  },
];

const INSTALLED_FILES_DATA: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "action-bar.tsx",
            type: "file",
            description: "Contextual batch action container primitive.",
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
        description: "10-layer liquid optical physics and halo-focus-ring.",
      },
    ],
  },
];

export default function ActionBarDocsPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest">
            Actions · 12
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Production Ready
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Action Bar
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A contextual container for organizing actions related to the user&apos;s current selection or task.
          Operates as a flexible composition primitive that hosts Buttons, Button Groups, Icon Buttons, and overflow
          menus while maintaining unclipped focus rings and HaloUI&apos;s balanced liquid glass optics.
        </p>
      </div>

      {/* Critical Principle Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Callout type="note" title="Composition Primitive & Selection Boundary">
          <strong>Action Bar organizes contextual actions; it does not own selection or action behavior.</strong>{" "}
          The surrounding application decides when the bar appears, what is selected, and what each action performs.
        </Callout>

        <Callout type="warning" title="Explicit Responsive Composition">
          <strong>No fragile auto-measurement overflow algorithms.</strong> Action Bar does not silently measure
          DOM widths and shove actions into a menu at runtime. Compose the highest-priority actions explicitly and place
          secondary actions into an overflow menu when the product requires it.
        </Callout>
      </div>

      {/* Interactive Preview Stage */}
      <div className="space-y-4">
        <h2 id="preview" className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Stage
        </h2>
        <ActionBarPreviewStage />
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="action-bar" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compose <code className="text-foreground font-mono text-xs">ActionBar</code> with{" "}
          <code className="text-foreground font-mono text-xs">ActionBarLabel</code>,{" "}
          <code className="text-foreground font-mono text-xs">ActionBarGroup</code>, and standard HaloUI actions.
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  ActionBar,
  ActionBarGroup,
  ActionBarLabel,
  ActionBarSeparator,
} from "@/components/ui/action-bar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { IconButton } from "@/components/ui/icon-button";
import { Archive02Icon, Delete02Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function BatchToolbar() {
  return (
    <ActionBar aria-label="Selected items actions">
      <ActionBarLabel count={3}>selected</ActionBarLabel>
      <ActionBarSeparator />
      <ActionBarGroup>
        <ButtonGroup>
          <Button variant="outline" size="sm">
            <HaloIcon icon={Archive02Icon} size={15} />
            Archive
          </Button>
        </ButtonGroup>
      </ActionBarGroup>
      <ActionBarSeparator />
      <ActionBarGroup>
        <Button variant="destructive" size="sm">
          <HaloIcon icon={Delete02Icon} size={15} />
          Delete
        </Button>
        <IconButton variant="ghost" size="sm" aria-label="More actions">
          <HaloIcon icon={MoreHorizontalIcon} size={16} />
        </IconButton>
      </ActionBarGroup>
    </ActionBar>
  );
}`}
        />
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </div>

      {/* Demonstrations */}
      <div className="space-y-10">
        <h2 id="examples" className="text-2xl font-bold tracking-tight text-foreground">
          Examples
        </h2>

        {/* 1. Realistic Contextual Bar */}
        <div className="space-y-3">
          <h3 id="contextual-batch" className="text-lg font-semibold tracking-tight text-foreground">
            1. Realistic Contextual Batch Selection
          </h3>
          <p className="text-sm text-muted-foreground">
            The flagship composition: &ldquo;3 selected&rdquo; context label, primary Button Group (Archive / Move),
            dedicated destructive Button (Delete), and overflow trigger.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <ActionBarDefaultPreview />
          </div>
        </div>

        {/* 2. Floating Placement */}
        <div className="space-y-3">
          <h3 id="floating-composition" className="text-lg font-semibold tracking-tight text-foreground">
            2. Floating Placement Composition
          </h3>
          <p className="text-sm text-muted-foreground">
            Demonstrating floating contextual placement above a selection grid. The positioning layout is owned by
            the application container, leaving the Action Bar pure and portable.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <ActionBarFloatingPreview />
          </div>
        </div>

        {/* 3. Compact Icon-Only */}
        <div className="space-y-3">
          <h3 id="compact-density" className="text-lg font-semibold tracking-tight text-foreground">
            3. Compact Density with Icon Buttons
          </h3>
          <p className="text-sm text-muted-foreground">
            High-density formatting bar with <code className="text-foreground font-mono text-xs">density=&quot;compact&quot;</code>{" "}
            and icon-only buttons with mandatory accessible names.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <ActionBarCompactPreview />
          </div>
        </div>

        {/* 4. Focus Stress Test */}
        <div className="space-y-3">
          <h3 id="focus-stress" className="text-lg font-semibold tracking-tight text-foreground">
            4. Unclipped Focus Stress Test
          </h3>
          <p className="text-sm text-muted-foreground">
            Proving that double-contrast Halo Focus Rings on edge items, middle items, and ButtonGroup children are
            never clipped by the material container.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <ActionBarFocusStressPreview />
          </div>
        </div>

        {/* 5. Responsive Strategy */}
        <div className="space-y-3">
          <h3 id="responsive-strategy" className="text-lg font-semibold tracking-tight text-foreground">
            5. Responsive Composition Strategy
          </h3>
          <p className="text-sm text-muted-foreground">
            Desktop composition featuring full contextual labels and multiple action groups versus deliberate mobile
            composition featuring critical actions and an overflow trigger.
          </p>
          <div className="p-6 rounded-2xl border border-border bg-muted/20">
            <ActionBarResponsivePreview />
          </div>
        </div>
      </div>

      {/* Focus & Keyboard Behavior */}
      <div className="space-y-4">
        <h2 id="focus-and-keyboard" className="text-xl font-semibold tracking-tight text-foreground">
          Focus &amp; Keyboard Model
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Action Bar organizes controls under a standard{" "}
            <code className="text-foreground font-mono text-xs">role=&quot;toolbar&quot;</code> container:
          </p>
          <ul className="list-disc list-inside space-y-1.5">
            <li>
              <strong>Preserved Child Semantics:</strong> Child controls (<code className="text-foreground font-mono text-xs">Button</code>,{" "}
              <code className="text-foreground font-mono text-xs">ButtonGroup</code>,{" "}
              <code className="text-foreground font-mono text-xs">IconButton</code>) preserve their native interactive and
              accessible properties.
            </li>
            <li>
              <strong>Unclipped Focus Rings:</strong> The Action Bar container uses{" "}
              <code className="text-foreground font-mono text-xs">overflow-visible</code> so child{" "}
              <code className="text-foreground font-mono text-xs">halo-focus-ring</code> perimeters are never clipped or
              obscured.
            </li>
            <li>
              <strong>Sequential Keyboard Activation:</strong> Users navigate between independent controls via{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border text-foreground">Tab</kbd>{" "}
              and activate actions via{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border text-foreground">Enter</kbd>{" "}
              or{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border text-foreground">Space</kbd>.
            </li>
          </ul>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-6">
        <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">ActionBar</h3>
          <PropsTable rows={PROPS_DATA} />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">ActionBarGroup</h3>
          <PropsTable rows={GROUP_PROPS_DATA} />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">ActionBarLabel</h3>
          <PropsTable rows={LABEL_PROPS_DATA} />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">ActionBarSeparator</h3>
          <PropsTable rows={SEPARATOR_PROPS_DATA} />
        </div>
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 id="dependencies" className="text-xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </div>

      {/* Installed Files */}
      <div className="space-y-4">
        <h2 id="installed-files" className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={INSTALLED_FILES_DATA} />
      </div>
    </div>
  );
}
