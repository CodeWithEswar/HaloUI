import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  Layers01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ButtonGroupPreviewStage } from "./button-group-preview-stage";
import {
  ButtonGroupOrientationPreview,
  ButtonGroupTextPreview,
  ButtonGroupIconPreview,
  ButtonGroupMixedPreview,
  ButtonGroupDisabledPreview,
  ButtonGroupFocusStressPreview,
  ButtonGroupKeyboardPreview,
} from "./button-group-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Button Group — Actions",
  description:
    "Visually connects related independent actions while preserving the semantics, focus behavior, and activation model of each control.",
};

const PROPS_DATA = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    required: false,
    description: "Defines the connected layout axis and corner-collapse geometry.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Transfers button group layout styling and geometry behavior directly onto a composed container using Radix Slot.",
  },
  {
    name: "role",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional ARIA role. Set to 'group' when paired with aria-label to create a semantically announced group for screen readers.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional Tailwind CSS classes merged via cn() utility.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Group Layout Root",
    selector: "div[data-slot='button-group']",
    description: "Inline flex container coordinating collapsed adjoining corners, single-pixel overlapping borders, and relative stacking contexts.",
  },
  {
    name: "Start Action Boundary",
    selector: "[&>:first-child:not(:last-child)]",
    description: "First child retains outer start-side border-radius while collapsing end-side radius to flat 90° seam.",
  },
  {
    name: "Interior Seam Overlap",
    selector: "[&>:not(:first-child)]:-ms-px",
    description: "Subtle 1px horizontal negative margin (or vertical -mt-px) overlapping adjacent borders to prevent unsightly 2px double seams.",
  },
  {
    name: "End Action Boundary",
    selector: "[&>:last-child:not(:first-child)]",
    description: "Last child retains outer end-side border-radius while collapsing start-side radius to flat 90° seam.",
  },
  {
    name: "Focus Stacking Context",
    selector: "[&>*]:focus-visible:z-20",
    description: "Elevates any focused child above adjacent sibling borders, ensuring complete dual-contrast Halo Focus Ring visibility.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Registry Dependencies",
    items: [],
  },
  {
    title: "npm Dependencies",
    items: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
];

const INSTALLED_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "button-group.tsx",
            type: "file",
            description: "Main ButtonGroup component, horizontal/vertical CVA variants, and unclipped focus ring layering",
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
        description: "Physical optical tokens and focus variables",
      },
    ],
  },
];

const RELATED_COMPONENTS = [
  {
    name: "Button",
    href: "/components/button",
    role: "Actions",
    description: "The primary textual action control designed to compose inside ButtonGroup.",
  },
  {
    name: "Icon Button",
    href: "/components/icon-button",
    role: "Actions",
    description: "Compact icon-only control with mandatory accessible naming, ideal for grouped toolbar actions.",
  },
  {
    name: "Halo Focus Ring",
    href: "/components/halo-focus-ring",
    role: "Accessibility",
    description: "Shared dual-contrast focus perimeter preserved across all button group children.",
  },
  {
    name: "Halo Surface",
    href: "/components/halo-surface",
    role: "Material Substrate",
    description: "Foundational liquid glass optical container.",
  },
];

export default function ButtonGroupDocsPage() {
  return (
    <div className="w-full space-y-12 pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Actions
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Button Group
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Visually connects related independent actions while preserving the semantics, focus behavior, and activation model of each control.
          </p>
        </div>

        {/* Core Architectural Callout */}
        <Callout type="note" title="Visual Grouping vs Selection Model">
          <strong>Button Group groups actions visually; it does not create a selection model.</strong> Use Toggle Group, Radio Group, Tabs, or another semantic control when actions represent persistent selected states.
        </Callout>
      </div>

      {/* 2. Primary Live Preview Stage */}
      <section className="space-y-4">
        <ButtonGroupPreviewStage />
      </section>

      {/* 3. Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Install Button Group directly into your project through the shadcn registry CLI.
          </p>
        </div>

        <InstallCommand registry="http://localhost:3000/r/button-group.json" />
      </section>

      {/* 4. Usage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Wrap adjacent <code className="text-foreground font-mono text-xs">Button</code> or <code className="text-foreground font-mono text-xs">IconButton</code> controls in a <code className="text-foreground font-mono text-xs">ButtonGroup</code> container.
          </p>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button>Previous</Button>
      <Button>Next</Button>
    </ButtonGroup>
  );
}`}
        />
      </section>

      {/* 5. Orientation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Orientation
          </h2>
          <p className="text-sm text-muted-foreground">
            Supports both <code className="text-foreground font-mono text-xs">horizontal</code> (default) and <code className="text-foreground font-mono text-xs">vertical</code> axes with automatic border collapse and corner radius adjustment.
          </p>
        </div>

        <ButtonGroupOrientationPreview />

        <CodeBlock
          language="tsx"
          code={`{/* Horizontal Group (Liquid Glass) */}
<ButtonGroup orientation="horizontal">
  <Button>Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
</ButtonGroup>

{/* Vertical Group (Liquid Glass) */}
<ButtonGroup orientation="vertical">
  <Button>Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
</ButtonGroup>`}
        />
      </section>

      {/* 6. With Button */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            With Button
          </h2>
          <p className="text-sm text-muted-foreground">
            Group related text actions such as pagination steps or multi-action confirmation workflows.
          </p>
        </div>

        <ButtonGroupTextPreview />
      </section>

      {/* 7. With Icon Button */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            With Icon Button
          </h2>
          <p className="text-sm text-muted-foreground">
            Cluster compact icon controls for document toolbars, canvas manipulation, or history navigation. Every child <code className="text-foreground font-mono text-xs">IconButton</code> retains its mandatory accessible name.
          </p>
        </div>

        <ButtonGroupIconPreview />

        <CodeBlock
          language="tsx"
          code={`import { UndoIcon, RedoIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";

export function HistoryActions() {
  return (
    <ButtonGroup>
      <IconButton aria-label="Undo action">
        <HaloIcon icon={UndoIcon} size={18} />
      </IconButton>
      <IconButton aria-label="Redo action">
        <HaloIcon icon={RedoIcon} size={18} />
      </IconButton>
    </ButtonGroup>
  );
}`}
        />
      </section>

      {/* 8. Mixed actions */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Mixed actions
          </h2>
          <p className="text-sm text-muted-foreground">
            Compose a primary action text button alongside a secondary options icon button to create split-action workflows.
          </p>
        </div>

        <ButtonGroupMixedPreview />

        <CodeBlock
          language="tsx"
          code={`import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";

export function SplitActionDemo() {
  return (
    <ButtonGroup>
      <Button variant="default">
        Publish document
      </Button>
      <IconButton variant="default" aria-label="More publishing options">
        <HaloIcon icon={MoreHorizontalIcon} size={16} />
      </IconButton>
    </ButtonGroup>
  );
}`}
        />
      </section>

      {/* 9. Disabled child */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Disabled child
          </h2>
          <p className="text-sm text-muted-foreground">
            Because each control inside ButtonGroup remains an independent native button, children can be disabled individually without disabling the entire cluster.
          </p>
        </div>

        <ButtonGroupDisabledPreview />
      </section>

      {/* 10. Middle-child focus stress test */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Middle-child focus stress test
          </h2>
          <p className="text-sm text-muted-foreground">
            A common bug in button group implementations occurs when the middle button's focus indicator is clipped or hidden behind adjacent siblings. HaloUI solves this with strict local z-index layering and zero overflow clipping.
          </p>
        </div>

        <ButtonGroupFocusStressPreview />
      </section>

      {/* 11. Keyboard interaction */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Keyboard interaction
          </h2>
          <p className="text-sm text-muted-foreground">
            Button Group preserves standard native sequential focus navigation. Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Tab</kbd> to move focus sequentially through all actions.
          </p>
        </div>

        <ButtonGroupKeyboardPreview />
      </section>

      {/* 12. Composition */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Composition
          </h2>
          <p className="text-sm text-muted-foreground">
            Use the <code className="text-foreground font-mono text-xs">asChild</code> prop to transfer ButtonGroup layout styling and collapsed geometry directly onto a parent wrapper element.
          </p>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export function CustomContainerDemo() {
  return (
    <ButtonGroup asChild>
      <nav aria-label="Pagination">
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next</Button>
      </nav>
    </ButtonGroup>
  );
}`}
        />
      </section>

      {/* 13. Props */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <p className="text-sm text-muted-foreground">
            Explicit ButtonGroup API definition. All standard HTML <code className="text-foreground font-mono text-xs">&lt;div&gt;</code> attributes are natively supported.
          </p>
        </div>

        <PropsTable rows={PROPS_DATA} />
      </section>

      {/* 14. Anatomy */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Anatomy
          </h2>
          <p className="text-sm text-muted-foreground">
            Lightweight CSS layout coordinate architecture without redundant wrapper nodes.
          </p>
        </div>

        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 15. Accessibility */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Accessibility
          </h2>
          <p className="text-sm text-muted-foreground">
            Engineered to strictly satisfy WCAG 2.1 AA requirements across contrast, keyboard navigation, and assistive technologies.
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Independent Native Semantics:</strong> ButtonGroup does not alter the underlying semantics of child buttons. Each button remains a native <code className="text-foreground font-mono text-xs">&lt;button type="button"&gt;</code> with independent event handling.
          </p>
          <p>
            <strong>No Roving Tabindex:</strong> Because actions are independent, standard sequential document tab order is preserved. Users navigate with <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Tab</kbd> and <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">Shift+Tab</kbd>.
          </p>
          <p>
            <strong>Unclipped Focus Perimeter:</strong> Halo Focus Ring tokens (<code className="text-foreground font-mono text-xs">--halo-focus-color</code>) project a dual-contrast focus boundary that remains fully visible over adjacent buttons due to dynamic z-index stacking.
          </p>
          <p>
            <strong>Icon Button Accessibility:</strong> When composing icon-only controls within a button group, each child <code className="text-foreground font-mono text-xs">IconButton</code> must independently provide an <code className="text-foreground font-mono text-xs">aria-label</code>.
          </p>
        </div>
      </section>

      {/* 16. Responsive behavior */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Responsive behavior
          </h2>
          <p className="text-sm text-muted-foreground">
            ButtonGroup is intrinsically flexible and does not force artificial stacking on mobile viewports.
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Connected button clusters are designed to prevent accidental mid-cluster wrapping. In constrained mobile viewports, prefer short labels, icon buttons, or vertical orientation where semantically appropriate.
          </p>
        </div>
      </section>

      {/* 17. Motion */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Motion
          </h2>
          <p className="text-sm text-muted-foreground">
            ButtonGroup defines zero independent animation; all tactile compression and hover feedback is executed by the individual child controls using Halo Motion Presets.
          </p>
        </div>
      </section>

      {/* 18. Performance */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Performance
          </h2>
          <p className="text-sm text-muted-foreground">
            Zero per-instance JavaScript runtime overhead.
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            ButtonGroup is fully Server Component compatible. It performs zero DOM measurements, requires no ResizeObserver, and executes connected geometry entirely through CSS flexbox and child pseudo selectors.
          </p>
        </div>
      </section>

      {/* 19. Dependencies */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Dependencies
          </h2>
          <p className="text-sm text-muted-foreground">
            External package and registry dependencies required by this component.
          </p>
        </div>

        <DependencyList groups={DEPENDENCIES_DATA} />
      </section>

      {/* 20. Installed files */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installed files
          </h2>
          <p className="text-sm text-muted-foreground">
            Exact file locations written to your repository upon installation.
          </p>
        </div>

        <FileTree items={INSTALLED_FILES} />
      </section>

      {/* 21. Related components */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Related components
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore actions and foundations that participate in ButtonGroup's architecture.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_COMPONENTS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group rounded-xl border border-border bg-card/40 p-4 transition-all hover:border-foreground/30 hover:bg-card"
            >
              <div className="text-[11px] font-mono text-muted-foreground uppercase">{item.role}</div>
              <div className="mt-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                <span>{item.name}</span>
                <HaloIcon icon={ArrowRight01Icon} size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 22. Changelog */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Changelog
          </h2>
          <p className="text-sm text-muted-foreground">
            Release progression and version history.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">v1.0.0 — Production Actions 03 Release</span>
            <span className="text-muted-foreground">2026-09-24</span>
          </div>
          <p className="text-muted-foreground font-sans">
            Third production Actions component. Implements connected geometry clustering across horizontal and vertical orientations, collapsing radii, 1px overlapping seam boundary coordination, unclipped middle-child focus layering, and clean shadcn registry distribution.
          </p>
        </div>
      </section>
    </div>
  );
}
