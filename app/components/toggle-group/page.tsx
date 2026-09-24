import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ToggleGroupPreviewStage } from "./toggle-group-preview-stage";
import {
  ToggleGroupSinglePreview,
  ToggleGroupMultiPreview,
  ToggleGroupGeometryPreview,
  ToggleGroupVariantsPreview,
  ToggleGroupSizesPreview,
  ToggleGroupOrientationPreview,
  ToggleGroupControlledPreview,
  ToggleGroupKeyboardPreview,
} from "./toggle-group-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Toggle Group — Actions",
  description: "Single- or multi-selection set of toggles.",
};

const PROPS_DATA = [
  {
    name: "type",
    type: '"single" | "multiple"',
    default: '"single"',
    required: false,
    description: "Determines selection mode: 'single' allows exactly one pressed item, 'multiple' allows any number.",
  },
  {
    name: "value",
    type: "string | string[]",
    default: "undefined",
    required: false,
    description: "Controlled selection value. String for single mode, array of strings for multiple mode.",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    default: "undefined",
    required: false,
    description: "Initial selection value for uncontrolled usage.",
  },
  {
    name: "onValueChange",
    type: "(value: any) => void",
    default: "undefined",
    required: false,
    description: "Event handler called when the pressed items change. Passes string or array depending on type.",
  },
  {
    name: "spacing",
    type: '"connected" | "separated"',
    default: '"connected"',
    required: false,
    description: "Geometry style: 'connected' collapses inner radii and overlaps 1px seams; 'separated' introduces discrete pill gaps.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    required: false,
    description: "Layout direction. Vertical coordinates vertical arrow navigation and border collapse.",
  },
  {
    name: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    required: false,
    description: "Material visual style propagated to all child items unless overridden individually.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Dimension tier propagated to all child items (sm: 32px, default: 40px, lg: 48px).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction for all items in the group while preserving active state visibility.",
  },
];

const ITEM_PROPS_DATA = [
  {
    name: "value",
    type: "string",
    default: "—",
    required: true,
    description: "Unique string value identifying this item within the ToggleGroup.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents interaction on this specific item.",
  },
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
    required: false,
    description: "Mandatory accessible name when rendering icon-only toggles without visible text.",
  },
  {
    name: "variant",
    type: '"default" | "outline"',
    default: "inherited",
    required: false,
    description: "Overrides parent group's visual variant for this item.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: "inherited",
    required: false,
    description: "Overrides parent group's dimension tier for this item.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Toggle Group Root",
    selector: "div[data-slot='toggle-group']",
    description: "Base UI ToggleGroup container providing role='group', roving tabindex context, and orientation coordinates.",
  },
  {
    name: "Toggle Group Item",
    selector: "button[data-slot='toggle-group-item']",
    description: "Individual two-state button equipped with HaloUI 10-layer liquid optical material and persistent aria-pressed state.",
  },
  {
    name: "Connected Seam",
    selector: "[&>[data-slot=toggle]:not(:first-child)]:-ms-px",
    description: "1px overlapping border seam that prevents thick double borders between adjoining connected items.",
  },
  {
    name: "Halo Focus Perimeter",
    selector: ".halo-focus-ring:focus-visible",
    description: "Dual-contrast focus ring elevated to z-20 above neighboring items so the perimeter is never clipped.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Registry Dependencies",
    items: ["toggle"],
  },
  {
    title: "npm Dependencies",
    items: [
      "@base-ui/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
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
            name: "toggle-group.tsx",
            type: "file",
            description: "ToggleGroup container and ToggleGroupItem composite components.",
          },
          {
            name: "toggle.tsx",
            type: "file",
            description: "Core two-state Toggle primitive, variants, and accessible state engine.",
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
        description: "10-layer liquid optical physics, halo-focus-ring, and halo-tactile-press.",
      },
    ],
  },
];

export default function ToggleGroupPage() {
  return (
    <div className="space-y-12">
      {/* Title + Subtitle Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Toggle Group
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Single- or multi-selection set of toggles.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <ToggleGroupPreviewStage />

      {/* Important Callout */}
      <Callout type="important" title="When to use Toggle Group vs related components">
        <div className="space-y-2 text-xs leading-relaxed">
          <p>
            • <strong>Toggle Group vs Button Group:</strong> Button Group clusters independent actions that execute immediately and return to rest. Toggle Group coordinates persistent pressed states (<code className="font-mono text-[11px]">aria-pressed</code>).
          </p>
          <p>
            • <strong>Toggle Group vs Radio Group:</strong> Radio Group is designed for form data submission where one option is selected. Toggle Group is tailored for immediate toolbars, view switchers, and layout controls.
          </p>
          <p>
            • <strong>Toggle Group vs Tabs:</strong> Tabs navigate between distinct panels of content (<code className="font-mono text-[11px]">role="tablist"</code>). Toggle Group modifies options, modes, or attributes within the same view.
          </p>
        </div>
      </Callout>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="http://localhost:3000/r/toggle-group.json" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Import <code className="text-foreground font-mono text-xs">ToggleGroup</code> and <code className="text-foreground font-mono text-xs">ToggleGroupItem</code> to create accessible tool clusters.
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <HaloIcon icon={TextAlignLeftIcon} size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <HaloIcon icon={TextAlignCenterIcon} size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <HaloIcon icon={TextAlignRightIcon} size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}`}
        />
      </div>

      {/* Single Selection */}
      <div className="space-y-4">
        <h2 id="single-selection" className="text-xl font-semibold tracking-tight text-foreground">
          Single selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In single selection mode (<code className="text-foreground font-mono text-xs">type="single"</code>), only one item can be active at a time. Pressing another item unpresses the previous selection.
        </p>
        <ToggleGroupSinglePreview />
      </div>

      {/* Multi Selection */}
      <div className="space-y-4">
        <h2 id="multi-selection" className="text-xl font-semibold tracking-tight text-foreground">
          Multi selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In multiple selection mode (<code className="text-foreground font-mono text-xs">type="multiple"</code>), any combination of items can be pressed simultaneously. Ideal for text formatting toolbars.
        </p>
        <ToggleGroupMultiPreview />
      </div>

      {/* Spacing & Geometry */}
      <div className="space-y-4">
        <h2 id="spacing" className="text-xl font-semibold tracking-tight text-foreground">
          Spacing & geometry
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI provides two geometry treatments: <code className="text-foreground font-mono text-xs">connected</code> (default, collapsed inner radii and seamless 1px overlapping seam) and <code className="text-foreground font-mono text-xs">separated</code> (independent optical pills with calibrated inter-item gaps).
        </p>
        <ToggleGroupGeometryPreview />
      </div>

      {/* Orientation */}
      <div className="space-y-4">
        <h2 id="orientation" className="text-xl font-semibold tracking-tight text-foreground">
          Spatial orientation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toggle Group supports both horizontal toolbars and vertical floating toolboxes (<code className="text-foreground font-mono text-xs">orientation="vertical"</code>). Arrow key navigation automatically maps to Up/Down in vertical orientation.
        </p>
        <ToggleGroupOrientationPreview />
      </div>

      {/* Controlled State */}
      <div className="space-y-4">
        <h2 id="controlled" className="text-xl font-semibold tracking-tight text-foreground">
          Controlled state
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Drive the group selection externally via <code className="text-foreground font-mono text-xs">value</code> and <code className="text-foreground font-mono text-xs">onValueChange</code>.
        </p>
        <ToggleGroupControlledPreview />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="text-xl font-semibold tracking-tight text-foreground">
          Variants
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose between <code className="text-foreground font-mono text-xs">default</code> (HaloUI 10-layer physical liquid optical glass) and <code className="text-foreground font-mono text-xs">outline</code>.
        </p>
        <ToggleGroupVariantsPreview />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="text-xl font-semibold tracking-tight text-foreground">
          Sizes
        </h2>
        <p className="text-sm text-muted-foreground">
          Available across three unified action dimension tiers: <code className="text-foreground font-mono text-xs">sm</code> (32px), <code className="text-foreground font-mono text-xs">default</code> (40px), and <code className="text-foreground font-mono text-xs">lg</code> (48px).
        </p>
        <ToggleGroupSizesPreview />
      </div>

      {/* Keyboard & Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard & accessibility
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toggle Group implements WAI-ARIA group semantics with a built-in roving tabindex. When entering the group via <kbd className="px-1.5 py-0.5 rounded bg-muted text-[11px] font-mono">Tab</kbd>, focus lands on the selected item. Use arrow keys to navigate between items, and <kbd className="px-1.5 py-0.5 rounded bg-muted text-[11px] font-mono">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted text-[11px] font-mono">Enter</kbd> to activate.
        </p>
        <ToggleGroupKeyboardPreview />
      </div>

      {/* Props */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
            ToggleGroup Props
          </h2>
          <PropsTable rows={PROPS_DATA} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium tracking-tight text-foreground">
            ToggleGroupItem Props
          </h3>
          <PropsTable rows={ITEM_PROPS_DATA} />
        </div>
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
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
          Installed files
        </h2>
        <FileTree items={INSTALLED_FILES_DATA} />
      </div>

      {/* Related Components */}
      <div className="space-y-4">
        <h2 id="related" className="text-xl font-semibold tracking-tight text-foreground">
          Related components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/components/toggle"
            className="group block rounded-xl border border-border/60 bg-muted/20 p-4 transition-all duration-200 hover:border-foreground/30 hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Toggle</span>
              <HaloIcon
                icon={ArrowRight01Icon}
                size={16}
                className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              A standalone two-state action control with persistent pressed state.
            </p>
          </Link>

          <Link
            href="/components/button-group"
            className="group block rounded-xl border border-border/60 bg-muted/20 p-4 transition-all duration-200 hover:border-foreground/30 hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Button Group</span>
              <HaloIcon
                icon={ArrowRight01Icon}
                size={16}
                className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Visually clusters independent action buttons without persistent selection.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
