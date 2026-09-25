import { Metadata } from "next";
import { PaginationPreviewStage } from "./pagination-preview-stage";
import { PaginationDemonstrations } from "./pagination-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Pagination — Navigation — HaloUI",
  description:
    "An accessible navigation control for moving between discrete pages of a larger collection.",
};

const PAGINATION_ROOT_PROPS: PropRow[] = [
  {
    name: "aria-label",
    type: "string",
    default: "'pagination'",
    required: false,
    description: "Accessible label identifying the pagination navigation landmark for assistive devices.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional CSS classes applied to the root nav element.",
  },
];

const PAGINATION_LINK_PROPS: PropRow[] = [
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: false,
    description: "Target URL destination for the page link (e.g. '?page=4' or '/items/page/4').",
  },
  {
    name: "isActive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether this page item represents the current page. Applies aria-current='page' and optical liquid active finish.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Semantic unavailable state for boundary navigation (aria-disabled='true', tabIndex=-1, prevents click).",
  },
  {
    name: "size",
    type: "'default' | 'sm' | 'lg' | 'icon'",
    default: "'icon'",
    required: false,
    description: "Geometry size preset. Default 'icon' provides a square 36x36px target.",
  },
];

const PAGINATION_PREVIOUS_PROPS: PropRow[] = [
  {
    name: "text",
    type: "string",
    default: "'Previous'",
    required: false,
    description: "Text label displayed alongside the directional Hugeicon on desktop screens.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Mark true when positioned on Page 1 to safely disable reverse navigation.",
  },
];

const PAGINATION_NEXT_PROPS: PropRow[] = [
  {
    name: "text",
    type: "string",
    default: "'Next'",
    required: false,
    description: "Text label displayed alongside the directional Hugeicon on desktop screens.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Mark true when positioned on the terminal page to safely disable forward navigation.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/pagination.tsx",
    type: "file",
    description: "Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis",
  },
  {
    name: "lib/utils.ts",
    type: "file",
    description: "Class name merging utility (cn)",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "HaloUI typography, focus ring, and liquid optical design tokens",
  },
];

export default function PaginationDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 03
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Pagination
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible navigation control for moving between discrete pages of a larger collection with semantic landmarks, real link anchors, and optical liquid active states.
        </p>
      </header>

      {/* 1. Interactive Preview Stage */}
      <section className="space-y-4">
        <PaginationPreviewStage />
      </section>

      {/* Core Architectural Callouts */}
      <div className="space-y-3">
        <Callout type="note">
          <strong>Pagination navigates between discrete result pages.</strong> It does not fetch data, manage database offsets, or decide how the backend divides the collection.
        </Callout>
        <Callout type="tip">
          <strong>When page destinations have URLs, prefer real links.</strong> Anchor semantics ensure standard browser navigation, open-in-new-tab actions, copy-link utilities, and progressive enhancement continue to work seamlessly.
        </Callout>
        <Callout type="warning">
          <strong>Cursor-based APIs do not always have meaningful page numbers.</strong> Do not invent fake numbered pages when the backend only exposes opaque previous and next cursors; use previous/next navigation instead.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the pagination primitive into your repository using the shadcn registry CLI:
        </p>
        <InstallCommand registry="pagination" />
      </section>

      {/* 3. Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Assemble pagination using semantic compound primitives:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export function StandardPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="?page=1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="?page=3" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`}
        />
      </section>

      {/* 4. Complete Demonstrations */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Demonstrations & Variants
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore first-page boundaries, bilateral middle-page ellipses, terminal page states, icon-only mobile patterns, and table composition.
          </p>
        </div>
        <PaginationDemonstrations />
      </section>

      {/* 5. Architectural Comparison */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Pagination vs Load More vs Infinite Scroll
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-border/80">
            <thead className="bg-muted/40 font-mono text-muted-foreground">
              <tr>
                <th className="p-3 border-b border-border">Characteristic</th>
                <th className="p-3 border-b border-border text-foreground font-semibold">Pagination</th>
                <th className="p-3 border-b border-border">Load More</th>
                <th className="p-3 border-b border-border">Infinite Scroll</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-medium">Navigation Boundary</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Discrete pages replacing content</td>
                <td className="p-3 text-muted-foreground">Appends items to current list</td>
                <td className="p-3 text-muted-foreground">Continuously streams items</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">URL & History State</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Direct ?page=X bookmarkable URLs</td>
                <td className="p-3 text-muted-foreground">Usually ephemeral session state</td>
                <td className="p-3 text-muted-foreground">Complex history synchronization</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Footer Accessibility</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Always reachable via Tab</td>
                <td className="p-3 text-muted-foreground">Reachable before trigger click</td>
                <td className="p-3 text-muted-foreground">Frequently unreachable (pushed down)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Cognitive Model</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Finite, predictable chunks</td>
                <td className="p-3 text-muted-foreground">User-controlled extension</td>
                <td className="p-3 text-muted-foreground">Passive browsing / feed model</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Props & API Reference */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Properties supported by HaloUI Pagination compound primitives.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Pagination</h3>
          <PropsTable rows={PAGINATION_ROOT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">PaginationLink</h3>
          <PropsTable rows={PAGINATION_LINK_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">PaginationPrevious</h3>
          <PropsTable rows={PAGINATION_PREVIOUS_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">PaginationNext</h3>
          <PropsTable rows={PAGINATION_NEXT_PROPS} />
        </div>
      </section>

      {/* 7. Accessibility Specifications */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
            <h4 className="font-semibold text-foreground">Navigation Landmark</h4>
            <p className="text-muted-foreground">
              Wrapped in an explicit <code className="font-mono text-xs">&lt;nav aria-label=&quot;pagination&quot;&gt;</code> container, announcing dedicated page navigation when jumping between landmarks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
            <h4 className="font-semibold text-foreground">Current Page Semantics</h4>
            <p className="text-muted-foreground">
              The active destination exposes <code className="font-mono text-xs">aria-current=&quot;page&quot;</code> and <code className="font-mono text-xs">data-active=&quot;true&quot;</code>, allowing screen readers to distinguish current location from neighbors.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
            <h4 className="font-semibold text-foreground">Unavailable Boundary Protection</h4>
            <p className="text-muted-foreground">
              Disabled links receive <code className="font-mono text-xs">aria-disabled=&quot;true&quot;</code>, <code className="font-mono text-xs">tabIndex=-1</code>, and pointer interception, preventing anchors from triggering fake routes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
            <h4 className="font-semibold text-foreground">Keyboard Traversal</h4>
            <p className="text-muted-foreground">
              Standard Tab sequence traverses each interactive destination in logical DOM order. Ellipsis markers are marked <code className="font-mono text-xs">aria-hidden=&quot;true&quot;</code> and excluded from tab order.
            </p>
          </div>
        </div>
      </section>

      {/* 8. File Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Registry File Structure
        </h2>
        <p className="text-sm text-muted-foreground">
          Files installed into consumer repositories via the shadcn registry:
        </p>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
