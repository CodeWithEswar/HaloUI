import { Metadata } from "next";
import { DescriptionListPreviewStage } from "./description-list-preview-stage";
import { DescriptionListDemonstrations } from "./description-list-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Description List — Data Display — HaloUI",
  description:
    "Label/value metadata display primitive with automatic container-aware reflow, native semantic dl/dt/dd elements, and restrained HaloUI Liquid Glass materials.",
};

const DESCRIPTION_LIST_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'outline' | 'muted' | 'glass' | 'ghost'",
    default: "'default'",
    required: false,
    description:
      "Visual framing variant: 'default' (transparent container for clean embedding), 'outline' (hairline border), 'muted' (tinted background), 'glass' (luminous liquid glass outer boundary with specular reflection and backdrop blur), or 'ghost' (borderless).",
  },
  {
    name: "density",
    type: "'default' | 'compact' | 'relaxed'",
    default: "'default'",
    required: false,
    description:
      "Spatial rhythm scale: 'default' (12px row spacing), 'compact' (8px tight gap for sidebars), or 'relaxed' (16px generous gap for detail pages).",
  },
  {
    name: "layout",
    type: "'auto' | 'horizontal' | 'vertical'",
    default: "'auto'",
    required: false,
    description:
      "Layout strategy: 'auto' (intrinsic @container reflow: side-by-side above 480px, stacked below 480px), 'horizontal' (always 2 columns), or 'vertical' (always stacked).",
  },
  {
    name: "divided",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Whether to render subtle divider borders between consecutive child metadata pairs.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as a Radix Slot child element.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged onto the <dl> container.",
  },
];

const DESCRIPTION_LIST_ITEM_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Render as a Radix Slot child element to compose directly onto custom semantic nodes.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged onto the row wrapper.",
  },
];

const DESCRIPTION_LIST_TERM_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as a Radix Slot child element.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged onto the <dt> element.",
  },
];

const DESCRIPTION_LIST_DETAILS_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as a Radix Slot child element.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged onto the <dd> element.",
  },
];

const DESCRIPTION_LIST_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "description-list.tsx",
            type: "file",
            description: "Server Component-compatible metadata primitive with @container auto-reflow.",
          },
        ],
      },
    ],
  },
  {
    name: "lib",
    type: "folder",
    children: [
      {
        name: "utils.ts",
        type: "file",
        description: "Shared class merging utility function (cn).",
      },
    ],
  },
];

export default function DescriptionListDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 12
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
            Stable
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Description List
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Label/value metadata display primitive built on semantic HTML dl/dt/dd elements with automatic container-aware reflow, density scales, and restrained HaloUI Liquid Glass materials.
        </p>
      </div>

      {/* Interactive Live Preview Stage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Live Interactive Stage
          </h2>
          <p className="text-sm text-muted-foreground">
            Inspect Description List across 6 optical environments, simulated parent container widths (280px to fluid), material variants, and density configurations.
          </p>
        </div>
        <DescriptionListPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Add the Description List primitive to your project via the HaloUI shadcn-compatible registry CLI.
          </p>
        </div>
        <InstallCommand registry="description-list" />
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Quick Start
          </h2>
          <p className="text-sm text-muted-foreground">
            Compose DescriptionList with semantic DescriptionListItem, DescriptionListTerm, and DescriptionListDetails elements.
          </p>
        </div>

        <CodeBlock
          filename="description-list-example.tsx"
          language="tsx"
          code={`import {
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
  DescriptionListDetails,
} from "@/components/ui/description-list";
import { StatusBadge } from "@/components/ui/status-badge";

export function ServerMetadata() {
  return (
    <DescriptionList variant="glass" divided>
      <DescriptionListItem>
        <DescriptionListTerm>Cluster ID</DescriptionListTerm>
        <DescriptionListDetails>
          <code className="text-xs font-mono">ap-south-01</code>
        </DescriptionListDetails>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListTerm>Deployment Region</DescriptionListTerm>
        <DescriptionListDetails>Mumbai Central</DescriptionListDetails>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListTerm>Health Status</DescriptionListTerm>
        <DescriptionListDetails>
          <StatusBadge tone="positive">Operational · 99.99%</StatusBadge>
        </DescriptionListDetails>
      </DescriptionListItem>
    </DescriptionList>
  );
}`}
        />
      </section>

      {/* Architectural Boundaries */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Architectural Boundaries
          </h2>
          <p className="text-sm text-muted-foreground">
            Distinguishing Description List from peer collection primitives:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">Description List vs List</h4>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Description List</strong> structures paired term/value relationships (metadata, configuration parameters, system attributes). <strong className="text-foreground">List</strong> represents a collection of peer repeated items (files, users, events).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">Description List vs Table</h4>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Table</strong> organizes multi-row, multi-column datasets with aligned headers and sortable columns. <strong className="text-foreground">Description List</strong> presents 1:1 or 1:N property relationships that reflow gracefully into stacked key-value blocks.
            </p>
          </div>
        </div>
      </section>

      {/* Automatic Container-First Responsiveness */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Automatic Container-Aware Reflow
          </h2>
          <p className="text-sm text-muted-foreground">
            Description List implements a <strong className="text-foreground">container-first responsive contract</strong>. Using CSS container queries (<code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">@container/description-list</code>), it adapts dynamically based on its parent container&apos;s available inline width:
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2 text-xs">
          <p className="text-muted-foreground leading-relaxed">
            • <strong className="text-foreground">Wide Containers (≥ 480px)</strong>: Displays a side-by-side two-column grid (<code className="font-mono">grid-cols-[minmax(130px,200px)_1fr]</code>). Terms sit on the left, values on the right.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            • <strong className="text-foreground">Narrow Containers (&lt; 480px)</strong>: Automatically reflows into a single stacked column (<code className="font-mono">flex flex-col gap-1</code>) where the term sits on top of the value.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            • <strong className="text-foreground">Zero JavaScript</strong>: Requires no resize listeners, breakpoint calculators, or ResizeObserver subscriptions.
          </p>
        </div>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Component Demonstrations
          </h2>
          <p className="text-sm text-muted-foreground">
            Practical usage patterns across layouts, density scales, long content, and rich compositions.
          </p>
        </div>
        <DescriptionListDemonstrations />
      </section>

      {/* Props Specifications */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Component API Specifications
          </h2>
          <p className="text-sm text-muted-foreground">
            TypeScript interfaces and prop contracts for DescriptionList and its subcomponents.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">DescriptionList (Root)</h3>
            <PropsTable rows={DESCRIPTION_LIST_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">DescriptionListItem</h3>
            <PropsTable rows={DESCRIPTION_LIST_ITEM_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">DescriptionListTerm</h3>
            <PropsTable rows={DESCRIPTION_LIST_TERM_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">DescriptionListDetails</h3>
            <PropsTable rows={DESCRIPTION_LIST_DETAILS_PROPS} />
          </div>
        </div>
      </section>

      {/* Source & Files */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Source & Registry Distribution
          </h2>
          <p className="text-sm text-muted-foreground">
            Files installed into your project when pulling the Description List registry component.
          </p>
        </div>
        <FileTree data={DESCRIPTION_LIST_FILE_TREE} />
      </section>
    </div>
  );
}
