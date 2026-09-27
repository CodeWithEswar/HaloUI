import { Metadata } from "next";
import { TablePreviewStage } from "./table-preview-stage";
import { TableDemonstrations } from "./table-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Table — Data Display 13 — HaloUI",
  description:
    "Semantic tabular data display primitive with container-aware horizontal scroll containment, density scales, and restrained HaloUI Liquid Glass outer boundary.",
};

const TABLE_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Table",
    kind: "Component",
    maturity: "stable",
    description:
      "Root semantic tabular primitive wrapping a responsive scroll containment container (role='region', tabIndex=0).",
    inheritedProps: {
      element: "React.ComponentProps<'table'>",
      description:
        "Inherits all native HTML <table> attributes, ARIA roles, data attributes, event handlers, and ref forwarding.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'outline' | 'muted' | 'glass' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Visual framing variant for outer container: 'default' (subtle border/card tint), 'outline' (hairline border), 'muted' (tinted background), 'glass' (restrained HaloUI liquid glass outer shell with specular reflection), or 'ghost' (borderless).",
      },
      {
        name: "density",
        type: "'default' | 'compact' | 'comfortable'",
        default: "'default'",
        required: false,
        description:
          "Spatial density scale controlling padding across header and cells via pure CSS: 'default' (12px vertical spacing), 'compact' (6-8px tight padding for high-density tables), or 'comfortable' (16px generous rhythm).",
      },
      {
        name: "striped",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Applies alternating zebra row backgrounds to improve scanability across wide datasets.",
      },
      {
        name: "stickyHeader",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Pins the TableHeader to the top of the scrolling container during vertical scroll with backdrop blur and border shadow.",
      },
      {
        name: "containerLabel",
        type: "string",
        default: "'Tabular data'",
        required: false,
        description:
          "Accessible description (aria-label) assigned to the scrollable container region for screen readers.",
      },
      {
        name: "containerClassName",
        type: "string",
        required: false,
        description:
          "Optional custom class names applied directly to the outer scrolling container <div>.",
      },
      {
        name: "containerProps",
        type: "Omit<React.ComponentProps<'div'>, 'children' | 'className'>",
        required: false,
        description:
          "Additional props forwarded directly to the outer scrolling container <div>.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names forwarded directly to the underlying <table> element.",
      },
    ],
  },
  {
    name: "TableHeader",
    kind: "Subcomponent",
    maturity: "stable",
    description: "Semantic <thead> header wrapper with optical background distinction.",
    inheritedProps: {
      element: "React.ComponentProps<'thead'>",
      description: "Inherits all native HTML <thead> attributes.",
    },
    props: [
      {
        name: "sticky",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Enables position: sticky at the top of the scrolling viewport with backdrop blur.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the default header styles.",
      },
    ],
  },
  {
    name: "TableBody",
    kind: "Subcomponent",
    maturity: "stable",
    description: "Semantic <tbody> container with subtle dividing borders between rows.",
    inheritedProps: {
      element: "React.ComponentProps<'tbody'>",
      description: "Inherits all native HTML <tbody> attributes.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the tbody element.",
      },
    ],
  },
  {
    name: "TableFooter",
    kind: "Subcomponent",
    maturity: "stable",
    description: "Semantic <tfoot> wrapper for totals, aggregates, and summary rows.",
    inheritedProps: {
      element: "React.ComponentProps<'tfoot'>",
      description: "Inherits all native HTML <tfoot> attributes.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the tfoot element.",
      },
    ],
  },
  {
    name: "TableRow",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Semantic <tr> row primitive with scan-assistance hover and semantic selected-state tinting.",
    inheritedProps: {
      element: "React.ComponentProps<'tr'>",
      description: "Inherits all native HTML <tr> attributes and data-[state] attributes.",
    },
    props: [
      {
        name: "selected",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Visually marks the row as selected or active with a subtle semantic tint. (Table does NOT own selection logic).",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the tr element.",
      },
    ],
  },
  {
    name: "TableHead",
    kind: "Subcomponent",
    maturity: "stable",
    description: "Semantic <th> column or row header with scope attribute support.",
    inheritedProps: {
      element: "React.ComponentProps<'th'>",
      description: "Inherits all native HTML <th> attributes.",
    },
    props: [
      {
        name: "scope",
        type: "'col' | 'row' | 'colgroup' | 'rowgroup'",
        default: "'col'",
        required: false,
        description: "Header cell scope establishing relationship with row or column cells.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the th element.",
      },
    ],
  },
  {
    name: "TableCell",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Semantic <td> data cell supporting diverse content (text, numeric badges, status badges, avatars). Strictly zero optical blur per cell.",
    inheritedProps: {
      element: "React.ComponentProps<'td'>",
      description: "Inherits all native HTML <td> attributes.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the td element.",
      },
    ],
  },
  {
    name: "TableCaption",
    kind: "Subcomponent",
    maturity: "stable",
    description: "Semantic <caption> providing accessible context and table summary metadata.",
    inheritedProps: {
      element: "React.ComponentProps<'caption'>",
      description: "Inherits all native HTML <caption> attributes.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the caption element.",
      },
    ],
  },
];

const FILE_TREE_DATA: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "table.tsx",
            type: "file",
          },
        ],
      },
    ],
  },
];

export default function TablePage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            Data Display 13
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Server Component Compatible
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Table
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground leading-relaxed sm:text-lg">
          Semantic tabular data presentation primitive engineered for container-aware
          horizontal scroll containment, high-density telemetry scales, and restrained
          HaloUI Liquid Glass materials.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <TablePreviewStage />

      {/* 3. Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Installation
        </h2>
        <InstallCommand
          registry="http://localhost:3000/r/table.json"
        />
        <p className="text-xs text-muted-foreground">
          Source is distributed directly into your repository with full source ownership.
        </p>
      </section>

      {/* 4. Architectural Purpose & Semantic Comparison */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          When to Use vs Alternatives
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Table</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Multi-column relational data where comparing fields across rows is essential.
              Preserves native <code className="font-mono text-[11px]">&lt;table&gt;</code> semantics
              and contained horizontal overflow.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Data Table</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Interactive data-management composition built on Table. Adds client/server sorting,
              filtering, pagination, selection, and column visibility.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">List</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Single-column collections of homogeneous items (feeds, notifications, settings, navigation lists)
              using <code className="font-mono text-[11px]">&lt;ul&gt;</code> / <code className="font-mono text-[11px]">&lt;ol&gt;</code>.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">Description List</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Key-value metadata pairs and attribute summaries using native{" "}
              <code className="font-mono text-[11px]">&lt;dl&gt;</code>,{" "}
              <code className="font-mono text-[11px]">&lt;dt&gt;</code>, and{" "}
              <code className="font-mono text-[11px]">&lt;dd&gt;</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Automatic Responsiveness & Containment */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Automatic Responsive Architecture
        </h2>
        <div className="rounded-xl border border-border bg-card p-5 space-y-4 text-xs text-muted-foreground leading-relaxed">
          <p>
            Tabular data inherently communicates <strong>column relationships</strong>. Converting multi-column tables
            into arbitrary vertical card stacks on mobile devices frequently destroys comparability and increases
            vertical scroll fatigue.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4 space-y-1.5">
              <h4 className="font-semibold text-foreground text-xs">Contained Horizontal Overflow</h4>
              <p>
                The outer wrapper (<code className="font-mono text-[11px]">data-slot=&quot;table-container&quot;</code>)
                enforces <code className="font-mono text-[11px]">overflow-x-auto</code>. If 8 columns cannot fit in a 320px
                screen, the table container scrolls horizontally—<strong>the browser page document never gains horizontal scroll</strong>.
              </p>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4 space-y-1.5">
              <h4 className="font-semibold text-foreground text-xs">200% Zoom &amp; Narrow Viewports</h4>
              <p>
                Tested and verified at 240px, 320px, 390px, and under 200% browser zoom. Interactive controls inside cells
                remain reachable, keyboard focus indicators remain visible, and header alignment is preserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Restrained Liquid Glass Architecture */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Restrained Liquid Glass Material Hierarchy
        </h2>
        <Callout type="note" title="Optical Performance Contract">
          HaloUI Liquid Glass is applied strictly to the <strong>outer table shell</strong> when{" "}
          <code className="font-mono text-xs">variant=&quot;glass&quot;</code> is enabled.
          Backdrop filters and refraction layers are <strong>strictly forbidden per cell and per row</strong>.
          In a 100 × 10 table, rendering individual glass cells would instantiate 1,000 GPU compositing layers,
          causing severe frame drops. HaloUI creates exactly 1 coherent optical surface for the entire table.
        </Callout>

        <div className="rounded-xl border border-border bg-card p-5 space-y-3 text-xs text-muted-foreground leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Outer Shell:</strong> Hosts the 10-layer physical optical engine
              (specular highlight, subtle noise grain, 135° edge illumination, and ambient blur).
            </li>
            <li>
              <strong className="text-foreground">Table Header:</strong> Receives restrained optical separation
              (<code className="font-mono text-[11px]">bg-muted/40</code>) without stacked blurs.
            </li>
            <li>
              <strong className="text-foreground">Table Body:</strong> Optically calm and quiet to maximize text readability
              and numeric scanability over any backdrop.
            </li>
            <li>
              <strong className="text-foreground">Row Hover &amp; Selection:</strong> Employs flat semantic tinting
              (<code className="font-mono text-[11px]">hover:bg-muted/50</code> and{" "}
              <code className="font-mono text-[11px]">data-[state=selected]:bg-muted/80</code>), avoiding competing refraction effects.
            </li>
          </ul>
        </div>
      </section>

      {/* 7. Usage & Code Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Usage Example
        </h2>
        <CodeBlock
          language="tsx"
          code={`import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function SystemInventory() {
  return (
    <Table variant="glass" density="default">
      <TableCaption>Active cloud distribution nodes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Node</TableHead>
          <TableHead>Zone</TableHead>
          <TableHead className="text-right">Load</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono font-medium">us-east-1a</TableCell>
          <TableCell>Virginia</TableCell>
          <TableCell className="text-right font-mono">14.2%</TableCell>
        </TableRow>
        <TableRow selected>
          <TableCell className="font-mono font-medium">eu-central-1</TableCell>
          <TableCell>Frankfurt</TableCell>
          <TableCell className="text-right font-mono">82.5%</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Aggregate Capacity</TableCell>
          <TableCell className="text-right font-mono font-bold">96.7%</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}`}
        />
      </section>

      {/* 8. Production Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Production Demonstrations
        </h2>
        <TableDemonstrations />
      </section>

      {/* 9. Professional Props / API Explorer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Props &amp; API Explorer
        </h2>
        <PropsExplorer
          title="Table API Reference"
          description="Interactive, source-accurate explorer covering all Table compound subcomponents, density scales, and inherited HTML attributes."
          subcomponents={TABLE_SUBCOMPONENTS}
        />
      </section>

      {/* 10. File Structure */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Source Files
        </h2>
        <FileTree data={FILE_TREE_DATA} />
      </section>

      {/* 11. Related Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Related Components
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            href="/components/item"
            className="group rounded-xl border border-border p-4 transition-colors hover:border-foreground/30 hover:bg-muted/20"
          >
            <h4 className="font-semibold text-xs text-foreground group-hover:text-primary">
              Item →
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Atomic list-row primitive for non-tabular content items.
            </p>
          </a>
          <a
            href="/components/list"
            className="group rounded-xl border border-border p-4 transition-colors hover:border-foreground/30 hover:bg-muted/20"
          >
            <h4 className="font-semibold text-xs text-foreground group-hover:text-primary">
              List →
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Semantic collection primitive for feeds, settings, and navigation.
            </p>
          </a>
          <a
            href="/components/description-list"
            className="group rounded-xl border border-border p-4 transition-colors hover:border-foreground/30 hover:bg-muted/20"
          >
            <h4 className="font-semibold text-xs text-foreground group-hover:text-primary">
              Description List →
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Label/value metadata display primitive with automatic container reflow.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
