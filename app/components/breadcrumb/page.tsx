import { Metadata } from "next";
import { BreadcrumbPreviewStage } from "./breadcrumb-preview-stage";
import { BreadcrumbDemonstrations } from "./breadcrumb-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Breadcrumb — Navigation — HaloUI",
  description:
    "A semantic navigation trail that communicates the current page's position within a hierarchical structure.",
};

const BREADCRUMB_ROOT_PROPS: PropRow[] = [
  {
    name: "aria-label",
    type: "string",
    default: "'breadcrumb'",
    required: false,
    description: "Accessible label identifying the navigation landmark for screen readers.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional CSS classes applied to the root nav element.",
  },
];

const BREADCRUMB_LINK_PROPS: PropRow[] = [
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: false,
    description: "URL destination for navigable ancestor links.",
  },
  {
    name: "render",
    type: "React.ReactElement | ((props: any) => React.ReactNode)",
    default: "undefined",
    required: false,
    description: "Custom render prop enabling composition with Next.js Link or routing libraries.",
  },
];

const BREADCRUMB_PAGE_PROPS: PropRow[] = [
  {
    name: "aria-current",
    type: "'page'",
    default: "'page'",
    required: false,
    description: "Identifies the current page within the hierarchical trail for assistive technologies.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: true,
    description: "Title or label for the active page.",
  },
];

const BREADCRUMB_SEPARATOR_PROPS: PropRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: "<ChevronRightIcon />",
    required: false,
    description: "Custom visual separator node (e.g. slash, arrow). Rendered with presentation semantics.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/breadcrumb.tsx",
    type: "file",
    description: "Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis",
  },
  {
    name: "lib/utils.ts",
    type: "file",
    description: "Class name merging utility (cn)",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "HaloUI typography and design system tokens",
  },
];

export default function BreadcrumbDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigation · 02
          </span>
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Hierarchical Navigation
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Breadcrumb
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg max-w-3xl leading-relaxed">
          A semantic navigation trail that communicates the current page&apos;s position within a hierarchical structure.
          Provides accessible landmark semantics, real ancestor links, and clear distinction for the current document.
        </p>
      </header>

      {/* Critical Callouts */}
      <div className="space-y-4">
        <Callout type="note" title="Hierarchy vs History">
          <strong className="font-semibold">Breadcrumb represents hierarchy, not navigation history.</strong> Its ancestors describe where the current page exists in the application&apos;s information structure.
        </Callout>
        <Callout type="warning" title="Current Page Semantics">
          <strong className="font-semibold">The current breadcrumb item is normally not a link to itself.</strong> Use current-page semantics (<code className="font-mono text-xs">aria-current=&quot;page&quot;</code>) and keep it visually distinct from navigable ancestors.
        </Callout>
        <Callout type="tip" title="Collapsing Deep Hierarchies">
          Collapsing a breadcrumb should preserve meaningful hierarchy. Do not hide ancestors arbitrarily merely to fit available width.
        </Callout>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Interactive Stage</h2>
        <BreadcrumbPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Breadcrumb into your repository via the shadcn registry CLI:
        </p>
        <InstallCommand registry="breadcrumb" />
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <CodeBlock
          code={`import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`}
          language="tsx"
        />
      </section>

      {/* Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Variations & Compositions</h2>
        <BreadcrumbDemonstrations />
      </section>

      {/* Architectural Distinctions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Architectural Distinctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-2">
            <h4 className="text-sm font-semibold text-primary">Breadcrumb</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Exposes document hierarchy and ancestry. Ancestors are real links; current page is identified by <code className="font-mono text-[11px]">aria-current=&quot;page&quot;</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Back Button</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Returns the user to the previous browsing context or history state, which may differ completely from information hierarchy.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Tabs</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Switches between peer content views within the same level and context. Not hierarchical.
            </p>
          </div>
        </div>
      </section>

      {/* Keyboard Behavior */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Keyboard Behavior</h2>
        <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-3 text-sm">
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Tab / Shift+Tab:</strong> Focus moves sequentially through interactive ancestor links. The noninteractive current page is excluded from keyboard tab stops.
            </li>
            <li>
              <strong className="text-foreground">Enter:</strong> Activates the focused ancestor link and navigates to that destination.
            </li>
            <li>
              <strong className="text-foreground">Halo Focus Ring:</strong> A visible, high-contrast offset focus ring appears around focused links, remaining distinct from hover states.
            </li>
          </ul>
        </div>
      </section>

      {/* Props Tables */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Breadcrumb (Root)</h3>
          <PropsTable rows={BREADCRUMB_ROOT_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">BreadcrumbLink</h3>
          <PropsTable rows={BREADCRUMB_LINK_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">BreadcrumbPage</h3>
          <PropsTable rows={BREADCRUMB_PAGE_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">BreadcrumbSeparator</h3>
          <PropsTable rows={BREADCRUMB_SEPARATOR_PROPS} />
        </div>
      </section>

      {/* File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installed Files</h2>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
