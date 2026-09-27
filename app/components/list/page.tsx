import { Metadata } from "next";
import { ListPreviewStage } from "./list-preview-stage";
import { ListDemonstrations } from "./list-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "List — Data Display — HaloUI",
  description:
    "Structured collection primitive organizing repeated related items with automatic container-aware responsiveness, semantic HTML, and restrained HaloUI Liquid Glass materials.",
};

const LIST_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'outline' | 'muted' | 'glass'",
    default: "'default'",
    required: false,
    description:
      "Visual framing variant: 'default' (transparent container for clean embedding), 'outline' (hairline border), 'muted' (tinted background), or 'glass' (luminous liquid glass outer boundary with 135° specular reflection and backdrop blur).",
  },
  {
    name: "density",
    type: "'default' | 'compact' | 'relaxed'",
    default: "'default'",
    required: false,
    description:
      "Spatial rhythm scale: 'default' (standard spacing), 'compact' (tight row gap for sidebars), or 'relaxed' (spacious item gap for reading flows).",
  },
  {
    name: "divided",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Whether to automatically render hairline divider borders between consecutive child items.",
  },
  {
    name: "ordered",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Whether the list represents an ordered sequence. Automatically renders a semantic <ol> element to preserve screen reader sequence announcements.",
  },
  {
    name: "marker",
    type: "'none' | 'disc' | 'decimal'",
    default: "'none'",
    required: false,
    description:
      "Bullet marker presentation: 'none' (unbulleted application rows), 'disc' (bulleted prose), or 'decimal' (numbered sequence).",
  },
  {
    name: "as",
    type: "'ul' | 'ol' | 'div'",
    default: "undefined",
    required: false,
    description: "Explicit HTML element override.",
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
    description: "Additional CSS classes merged onto the list container.",
  },
];

const LIST_ITEM_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Render as a Radix Slot child element to compose directly onto consumer semantic nodes (e.g. Item or Link).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged onto the <li> element.",
  },
];

const LIST_HEADER_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as a Radix Slot child element.",
  },
];

const LIST_FOOTER_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as a Radix Slot child element.",
  },
];

const LIST_EMPTY_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as a Radix Slot child element.",
  },
];

const LIST_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "list.tsx",
            type: "file",
            description: "Server Component-compatible collection primitive with @container responsiveness.",
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

export default function ListDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 11
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
            Stable
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          List
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Structured collection primitive organizing repeated related items with automatic container-aware responsiveness, semantic HTML structure, and restrained HaloUI Liquid Glass materials.
        </p>
      </div>

      {/* Interactive Live Preview Stage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Live Interactive Stage
          </h2>
          <p className="text-sm text-muted-foreground">
            Test List across 6 optical environments, simulated container widths (280px to fluid), material variants, and density configurations.
          </p>
        </div>
        <ListPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Add the List primitive to your project via the HaloUI shadcn-compatible registry CLI.
          </p>
        </div>
        <InstallCommand registry="list" />
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Quick Start
          </h2>
          <p className="text-sm text-muted-foreground">
            Compose List directly with HaloUI Item to organize repeatable rows with leading media and actions.
          </p>
        </div>

        <CodeBlock
          filename="list-example.tsx"
          language="tsx"
          code={`import { List, ListItem, ListHeader } from "@/components/ui/list";
import { Item, ItemMedia, ItemContent, ItemTitle, ItemActions } from "@/components/ui/item";
import { StatusBadge } from "@/components/ui/status-badge";

export function ResourceList() {
  return (
    <List variant="glass" divided>
      <ListHeader>Active Deployments</ListHeader>
      <ListItem asChild>
        <Item variant="default">
          <ItemContent>
            <ItemTitle>production-cluster-01</ItemTitle>
          </ItemContent>
          <ItemActions>
            <StatusBadge tone="positive">Operational</StatusBadge>
          </ItemActions>
        </Item>
      </ListItem>
    </List>
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
            Understanding the structural separation between List and other data display primitives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">List vs Item</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Item defines the layout and content organization for a single row. List owns the collection: item gap, dividers, outer material boundary, and semantic list wrapping.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">List vs Table</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Table belongs to tabular datasets requiring aligned column headers and relational sorting. List represents an organic, responsive collection of peer items.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">List vs Menu</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Menu Item owns composite menu semantics, arrow navigation, and roving focus. List is general structural content and does not capture keyboard focus or command selection.
            </p>
          </div>
        </div>
      </section>

      {/* Automatic Responsive Behavior */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Automatic Responsive Behavior
          </h2>
          <p className="text-sm text-muted-foreground">
            How List adapts to the actual parent container width rather than fixed viewport breakpoints.
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            HaloUI List implements a <strong>container-first responsive contract</strong>. Using CSS container queries (<code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">@container/list</code>), List and its nested children adapt dynamically whether placed inside a 240px narrow sidebar, a 400px card, or a full-width desktop page:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ps-2">
            <li><strong>Zero JavaScript Width Detection:</strong> Responsiveness is handled entirely by intrinsic CSS layout primitives, eliminating expensive <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">window.innerWidth</code> listeners and runtime ResizeObservers.</li>
            <li><strong>No Horizontal Page Overflow:</strong> Strict <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">min-w-0</code> and <code className="text-xs font-mono bg-muted/60 px-1 py-0.5 rounded">max-w-full</code> handling ensure that long content wraps naturally without causing horizontal page scrolling.</li>
            <li><strong>200% Browser Zoom Compatibility:</strong> The layout seamlessly contracts into single-column reflow when the user zooms in, preserving all interactive targets.</li>
          </ul>
        </div>
      </section>

      {/* Liquid Glass Material */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Liquid Glass Material
          </h2>
          <p className="text-sm text-muted-foreground">
            How HaloUI avoids &quot;glass-on-glass&quot; clutter across repeated collection rows.
          </p>
        </div>

        <Callout type="note">
          When rendered as a standalone collection, <code className="text-xs font-mono font-medium">variant=&quot;glass&quot;</code> applies the 10-layer physical optical engine to the <strong>outer container</strong> surface. Individual rows inside the list remain transparent and flat. When a List is placed inside a Card or Sheet, use <code className="text-xs font-mono font-medium">variant=&quot;default&quot;</code> so the containing surface carries the environmental material without nested optical noise.
        </Callout>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Production Demonstrations
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-world compositions showing standalone liquid glass surfaces, card nesting, narrow sidebar reflow, and ordered sequences.
          </p>
        </div>
        <ListDemonstrations />
      </section>

      {/* Props Specifications */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete TypeScript prop definitions for List and all compound subcomponents.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">List</h3>
            <PropsTable props={LIST_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ListItem</h3>
            <PropsTable props={LIST_ITEM_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ListHeader</h3>
            <PropsTable props={LIST_HEADER_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ListFooter</h3>
            <PropsTable props={LIST_FOOTER_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ListEmpty</h3>
            <PropsTable props={LIST_EMPTY_PROPS} />
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installed Files
          </h2>
          <p className="text-sm text-muted-foreground">
            Directory layout when installed directly into consumer repositories.
          </p>
        </div>
        <FileTree data={LIST_FILE_TREE} />
      </section>
    </div>
  );
}
