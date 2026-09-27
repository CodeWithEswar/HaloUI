import { Metadata } from "next";
import { DataTablePreviewStage } from "./data-table-preview-stage";
import { DataTableDemonstrations } from "./data-table-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Data Table — Data Display 14 — HaloUI",
  description:
    "Interactive data-management composition built on Table and TanStack Table with sorting, filtering, selection, pagination, and restrained HaloUI Liquid Glass materials.",
};

const DATA_TABLE_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "DataTable",
    kind: "Component",
    maturity: "stable",
    description:
      "Root interactive data-management surface coordinating sorting, filtering, selection, and pagination while reusing Table for all visual presentation.",
    typeGenerics: "<TData, TValue>",
    props: [
      {
        name: "columns",
        type: "ColumnDef<TData, TValue>[]",
        required: true,
        description:
          "Column definitions specifying headers, accessor keys, cell renderers, and sort/filter capabilities.",
      },
      {
        name: "data",
        type: "TData[]",
        required: true,
        description:
          "Array of row data records supplied to the table model. HaloUI does not mutate this collection.",
      },
      {
        name: "searchKey",
        type: "string",
        required: false,
        description:
          "Accessor key for the column targeted by the built-in search filter input.",
      },
      {
        name: "searchPlaceholder",
        type: "string",
        default: "'Filter records...'",
        required: false,
        description: "Placeholder text displayed inside the search filter input.",
      },
      {
        name: "enableSorting",
        type: "boolean",
        default: "true",
        required: false,
        description: "Enables interactive multi-state column sorting.",
      },
      {
        name: "enableFiltering",
        type: "boolean",
        default: "true",
        required: false,
        description: "Renders the search filter toolbar above the table.",
      },
      {
        name: "enableSelection",
        type: "boolean",
        default: "true",
        required: false,
        description: "Enables row selection checkboxes and floating bulk action triggers.",
      },
      {
        name: "enableColumnVisibility",
        type: "boolean",
        default: "true",
        required: false,
        description: "Renders the column visibility configuration dropdown menu.",
      },
      {
        name: "enablePagination",
        type: "boolean",
        default: "true",
        required: false,
        description: "Renders the page navigation controls and rows-per-page selector.",
      },
      {
        name: "pageSize",
        type: "number",
        default: "10",
        required: false,
        description: "Initial number of rows displayed per page.",
      },
      {
        name: "pageSizeOptions",
        type: "number[]",
        default: "[5, 10, 20, 50]",
        required: false,
        description: "List of page size options available in the rows-per-page select menu.",
      },
      {
        name: "sorting",
        type: "SortingState",
        controlledPair: "onSortingChange",
        required: false,
        description: "Controlled column sorting state for server-driven datasets.",
      },
      {
        name: "onSortingChange",
        type: "(sorting: SortingState) => void",
        controlledPair: "sorting",
        required: false,
        description: "Callback triggered when column sorting changes.",
      },
      {
        name: "columnFilters",
        type: "ColumnFiltersState",
        controlledPair: "onColumnFiltersChange",
        required: false,
        description: "Controlled column filters state for server-driven search.",
      },
      {
        name: "onColumnFiltersChange",
        type: "(filters: ColumnFiltersState) => void",
        controlledPair: "columnFilters",
        required: false,
        description: "Callback triggered when filter values change.",
      },
      {
        name: "rowSelection",
        type: "RowSelectionState",
        controlledPair: "onRowSelectionChange",
        required: false,
        description: "Controlled row selection state map ({ [rowId]: boolean }).",
      },
      {
        name: "onRowSelectionChange",
        type: "(selection: RowSelectionState) => void",
        controlledPair: "rowSelection",
        required: false,
        description: "Callback triggered when row selection changes.",
      },
      {
        name: "variant",
        type: "'default' | 'outline' | 'muted' | 'glass' | 'ghost'",
        default: "'default'",
        required: false,
        description: "Visual framing variant forwarded directly to underlying Table.",
      },
      {
        name: "density",
        type: "'default' | 'compact' | 'comfortable'",
        default: "'default'",
        required: false,
        description: "Spatial density scale forwarded directly to underlying Table.",
      },
      {
        name: "striped",
        type: "boolean",
        default: "false",
        required: false,
        description: "Displays alternating zebra row backgrounds.",
      },
      {
        name: "floatingActions",
        type: "(table: Table<TData>) => React.ReactNode",
        required: false,
        description:
          "Custom render function for actions displayed in the floating bulk action bar when rows are selected.",
      },
      {
        name: "emptyTitle",
        type: "string",
        default: "'No records found'",
        required: false,
        description: "Heading text displayed when table contains no visible rows.",
      },
      {
        name: "emptyDescription",
        type: "string",
        required: false,
        description: "Detailed description displayed in empty state.",
      },
      {
        name: "emptyAction",
        type: "React.ReactNode",
        required: false,
        description: "Optional action slot rendered in empty state (e.g. 'Create item' button).",
      },
    ],
  },
  {
    name: "DataTableColumnHeader",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Accessible sortable column header button communicating ascending, descending, or unsorted state with proper aria-sort.",
    typeGenerics: "<TData, TValue>",
    props: [
      {
        name: "column",
        type: "Column<TData, TValue>",
        required: true,
        description: "TanStack column instance received in column header render function.",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Visible label for the column header.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names forwarded to the header container.",
      },
    ],
  },
  {
    name: "DataTablePagination",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Coordinated pagination toolbar with explicit page indices, rows-per-page selector, and selection count.",
    typeGenerics: "<TData>",
    props: [
      {
        name: "table",
        type: "Table<TData>",
        required: true,
        description: "Active TanStack table instance.",
      },
      {
        name: "pageSizeOptions",
        type: "number[]",
        default: "[5, 10, 20, 50]",
        required: false,
        description: "Configurable page sizes shown in the selector dropdown.",
      },
    ],
  },
  {
    name: "DataTableViewOptions",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Accessible dropdown menu allowing users to toggle column visibility dynamically.",
    typeGenerics: "<TData>",
    props: [
      {
        name: "table",
        type: "Table<TData>",
        required: true,
        description: "Active TanStack table instance.",
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
            name: "data-table.tsx",
            type: "file",
          },
          {
            name: "table.tsx",
            type: "file",
          },
        ],
      },
    ],
  },
];

export default function DataTablePage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            Data Display 14
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Built on Table + TanStack Table
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Data Table
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground leading-relaxed sm:text-lg">
          Interactive, feature-complete data table composition coordinating sorting,
          filtering, multi-row selection, column visibility, and pagination while delegating
          all semantic presentation to HaloUI Table.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <DataTablePreviewStage />

      {/* 3. Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Installation
        </h2>
        <InstallCommand
          registry="http://localhost:3000/r/data-table.json"
        />
        <p className="text-xs text-muted-foreground">
          Installs <code className="font-mono text-xs">components/ui/data-table.tsx</code> along with its peer dependency{" "}
          <code className="font-mono text-xs">table</code>.
        </p>
      </section>

      {/* 4. Architecture & Table Relationship */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Architectural Separation: Data Table vs Table
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">Table (Presentation Primitive)</h3>
              <Badge variant="outline" className="text-[10px]">Server Component</Badge>
            </div>
            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>Owns native semantic <code className="font-mono text-[11px]">&lt;table&gt;</code>, <code className="font-mono text-[11px]">&lt;thead&gt;</code>, etc.</li>
              <li>Owns density scales (<code className="font-mono text-[11px]">compact</code>, <code className="font-mono text-[11px]">comfortable</code>).</li>
              <li>Owns responsive horizontal scroll containment (<code className="font-mono text-[11px]">overflow-x-auto</code>).</li>
              <li>Owns restrained Liquid Glass outer shell styling.</li>
              <li>Zero sorting, filtering, selection, or pagination state.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">Data Table (Interaction Engine)</h3>
              <Badge variant="secondary" className="text-[10px]">Client Component</Badge>
            </div>
            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>Reuses <strong>Table</strong> for all rendered visual elements.</li>
              <li>Coordinates TanStack Table state machine (sort, filter, select, paginate).</li>
              <li>Provides accessible sortable header triggers (<code className="font-mono text-[11px]">aria-sort</code>).</li>
              <li>Provides floating bulk-action bar with Balanced Liquid Glass pill.</li>
              <li>Supports both uncontrolled client datasets and controlled server APIs.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Restrained Liquid Glass Hierarchy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Restrained Liquid Glass in Data Environments
        </h2>
        <Callout type="note" title="Optical Restraint Contract">
          Data Table concentrates optical depth where it provides genuine hierarchy:
          the <strong>outer table shell</strong> and the <strong>floating bulk action bar</strong>.
          Individual rows and cells remain optically flat to ensure high-speed readability and zero GPU layer overhead.
        </Callout>

        <div className="rounded-xl border border-border bg-card p-5 space-y-3 text-xs text-muted-foreground leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Floating Bulk Bar:</strong> Uses Balanced Liquid Glass
              (<code className="font-mono text-[11px]">backdrop-blur-xl bg-card/85 border border-white/20</code>)
              to float prominently above table content when rows are selected.
            </li>
            <li>
              <strong className="text-foreground">Selected Rows:</strong> Styled with a clean semantic tint
              (<code className="font-mono text-[11px]">data-[state=selected]:bg-muted/80</code>), distinctly decoupled from keyboard focus rings.
            </li>
            <li>
              <strong className="text-foreground">Portalled Menus:</strong> Column visibility and row action popovers reuse
              standard Halo portal surfaces rather than custom nested canvas shaders.
            </li>
          </ul>
        </div>
      </section>

      {/* 6. Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Production Demonstrations
        </h2>
        <DataTableDemonstrations />
      </section>

      {/* 7. Props / API Explorer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Props &amp; API Explorer
        </h2>
        <PropsExplorer
          title="Data Table API Reference"
          description="Interactive, source-accurate explorer covering DataTable generic parameters, controlled state pairs, and subcomponents."
          subcomponents={DATA_TABLE_SUBCOMPONENTS}
        />
      </section>

      {/* 8. Source Files */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Source Files
        </h2>
        <FileTree data={FILE_TREE_DATA} />
      </section>

      {/* 9. Related Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Related Components
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            href="/components/table"
            className="group rounded-xl border border-border p-4 transition-colors hover:border-foreground/30 hover:bg-muted/20"
          >
            <h4 className="font-semibold text-xs text-foreground group-hover:text-primary">
              Table →
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Semantic tabular presentation primitive for structured multi-column data.
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
