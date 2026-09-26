import { Metadata } from "next";
import { TreeNavigationPreviewStage } from "./tree-navigation-preview-stage";
import { TreeNavigationDemonstrations } from "./tree-navigation-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Tree Navigation — Navigation — HaloUI",
  description:
    "A hierarchical expandable navigation component for navigating deeply nested destinations while preserving parent-child structure.",
};

const TREE_NAVIGATION_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "The unique value or URL path of the current active destination leaf.",
  },
  {
    name: "expandedValues",
    type: "string[]",
    default: "undefined",
    required: false,
    description: "Controlled array of unique identifiers representing currently expanded branches.",
  },
  {
    name: "defaultExpandedValues",
    type: "string[]",
    default: "[]",
    required: false,
    description: "Uncontrolled default array of expanded branch identifiers upon initial render.",
  },
  {
    name: "onExpandedValuesChange",
    type: "(values: string[]) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when branch expansion state changes via user interaction.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'subtle'",
    required: false,
    description: "HaloUI liquid optical glass material intensity level.",
  },
  {
    name: "showConnectors",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to render subtle decorative vertical tree connector guide lines.",
  },
  {
    name: "indentation",
    type: "number",
    default: "16",
    required: false,
    description: "Horizontal indentation in pixels applied per nesting depth level.",
  },
];

const TREE_NAVIGATION_BRANCH_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: true,
    description: "Unique stable identifier for this branch. Used for expansion and focus management.",
  },
  {
    name: "label",
    type: "ReactNode",
    default: "undefined",
    required: true,
    description: "Primary visible text label for the branch heading.",
  },
  {
    name: "icon",
    type: "IconSvgElement",
    default: "undefined",
    required: false,
    description: "Leading Hugeicon symbol visually representing the branch category.",
  },
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional destination link URL if the branch is both navigable and expandable.",
  },
  {
    name: "badge",
    type: "ReactNode",
    default: "undefined",
    required: false,
    description: "Optional compact metadata or counter badge on the trailing side.",
  },
  {
    name: "containsCurrent",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether this branch contains the current destination. Renders subtle indicator without aria-current.",
  },
];

const TREE_NAVIGATION_LINK_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: true,
    description: "Unique stable identifier matching the destination path or route.",
  },
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: false,
    description: "Destination URL route. Renders as a semantic anchor <a> element.",
  },
  {
    name: "icon",
    type: "IconSvgElement",
    default: "undefined",
    required: false,
    description: "Leading Hugeicon symbol identifying the destination type.",
  },
  {
    name: "badge",
    type: "ReactNode",
    default: "undefined",
    required: false,
    description: "Optional trailing status indicator or count badge.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/tree-navigation.tsx",
    type: "file",
    description: "TreeNavigation, TreeNavigationList, TreeNavigationBranch, TreeNavigationLink, TreeNavigationGroup, TreeNavigationItem",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Standardized Hugeicon wrapper ensuring currentColor inheritance and optical clarity",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "Physical liquid glass tokens for optical edge, depth glow, and tactile compression",
  },
];

export default function TreeNavigationDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 12
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Tree Navigation
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A hierarchical expandable navigation component for navigating deeply nested destinations while preserving parent-child structure.
        </p>
      </header>

      {/* 1. Preview Stage */}
      <section className="space-y-4">
        <TreeNavigationPreviewStage />
      </section>

      {/* Mandatory Architectural Callouts #173-#176 */}
      <div className="space-y-3">
        <Callout type="important">
          <strong>Tree Navigation preserves hierarchy.</strong> Use it when parent-child relationships are meaningful to navigation. Do not use it merely to indent a flat list of links.
        </Callout>
        <Callout type="warning">
          <strong>Current destination and expansion are separate states.</strong> A branch may be expanded without being current, and an ancestor containing the current destination must not itself be marked as the current page with <code className="font-mono text-xs">aria-current</code>.
        </Callout>
        <Callout type="tip">
          <strong>If HaloUI exposes true ARIA tree semantics, it must also implement the corresponding tree keyboard model.</strong> Do not apply <code className="font-mono text-xs">role=&quot;tree&quot;</code> to ordinary nested links without reconciling focus and Arrow-key behavior. Tree Navigation implements single Tab stop entry with internal roving focus across visible nodes.
        </Callout>
        <Callout type="note">
          <strong>A branch that both navigates and expands represents two distinct actions.</strong> Keep those actions explicit rather than making a single ambiguous click unpredictably perform both. Provide distinct semantic targets: an expansion chevron and a destination link.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the tree navigation primitive and its registry dependencies via the shadcn CLI:
        </p>
        <InstallCommand registry="tree-navigation" />
      </section>

      {/* 3. Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose structured hierarchical destinations with stable identifiers:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  TreeNavigation,
  TreeNavigationList,
  TreeNavigationBranch,
  TreeNavigationLink,
} from "@/components/ui/tree-navigation";
import { Folder01Icon, File01Icon } from "@hugeicons/core-free-icons";

export function DocsTree() {
  return (
    <TreeNavigation value="/docs/components/tree-navigation">
      <TreeNavigationList>
        <TreeNavigationBranch value="docs" label="Documentation" icon={Folder01Icon}>
          <TreeNavigationLink value="/docs/introduction" href="/docs/introduction" icon={File01Icon}>
            Introduction
          </TreeNavigationLink>
          <TreeNavigationLink
            value="/docs/components/tree-navigation"
            href="/docs/components/tree-navigation"
            icon={File01Icon}
          >
            Tree Navigation
          </TreeNavigationLink>
        </TreeNavigationBranch>
      </TreeNavigationList>
    </TreeNavigation>
  );
}`}
        />
      </section>

      {/* 4. Branches and Leaves */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Branches and Leaves</h2>
        <p className="text-sm text-muted-foreground">
          Tree Navigation distinguishes between two node types:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Branches</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Parent nodes that contain child descendants. Branches expose expansion controls (<code className="font-mono text-xs">aria-expanded</code>) and rotate an optical chevron indicator upon toggle.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Leaves</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Terminal endpoints representing navigable destinations. Render as semantic anchor (<code className="font-mono text-xs">&lt;a&gt;</code>) links that expose <code className="font-mono text-xs">aria-current=&quot;page&quot;</code> when active.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Expansion State vs Current Destination */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Expansion &amp; Current Destination</h2>
        <p className="text-sm text-muted-foreground">
          Expansion and current destination are completely independent states. A branch can be expanded without being current, and an ancestor branch containing the current destination must never receive <code className="text-xs font-mono">aria-current</code>. Instead, ancestors receive a subtle structural tint via <code className="text-xs font-mono">containsCurrent={'{true}'}</code>.
        </p>
      </section>

      {/* 6. Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Demonstrations</h2>
        <TreeNavigationDemonstrations />
      </section>

      {/* 7. Keyboard Navigation Pattern */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Keyboard Behavior</h2>
        <div className="rounded-xl border border-border/60 overflow-hidden text-sm">
          <div className="grid grid-cols-3 bg-muted/40 p-3 font-semibold text-foreground border-b border-border/40">
            <div>Key</div>
            <div>Context</div>
            <div>Action</div>
          </div>
          <div className="divide-y divide-border/30">
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Tab</kbd></div>
              <div>Outside Tree</div>
              <div>Enters the tree navigation at the currently active item (single tab stop).</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">↓</kbd> (Down Arrow)</div>
              <div>Any Tree Item</div>
              <div>Moves focus to the next visible tree item in document order.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">↑</kbd> (Up Arrow)</div>
              <div>Any Tree Item</div>
              <div>Moves focus to the previous visible tree item.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">→</kbd> (Right Arrow)</div>
              <div>Collapsed Branch</div>
              <div>Expands the branch without moving focus.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">→</kbd> (Right Arrow)</div>
              <div>Expanded Branch</div>
              <div>Moves focus to the first child item within the branch.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">←</kbd> (Left Arrow)</div>
              <div>Expanded Branch</div>
              <div>Collapses the branch without moving focus.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">←</kbd> (Left Arrow)</div>
              <div>Leaf or Collapsed Branch</div>
              <div>Moves focus up to the parent branch.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Home</kbd></div>
              <div>Any Tree Item</div>
              <div>Moves focus to the first visible item in the tree.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">End</kbd></div>
              <div>Any Tree Item</div>
              <div>Moves focus to the last visible item in the tree.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Enter</kbd></div>
              <div>Leaf Link</div>
              <div>Follows the destination anchor link.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Component Comparison Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Semantic Comparison</h2>
        <div className="rounded-xl border border-border/60 overflow-hidden text-sm">
          <div className="grid grid-cols-3 bg-muted/40 p-3 font-semibold text-foreground border-b border-border/40">
            <div>Component</div>
            <div>Primary Purpose</div>
            <div>Distinction</div>
          </div>
          <div className="divide-y divide-border/30">
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Tree Navigation</div>
              <div>Hierarchical expandable navigation structure</div>
              <div>Preserves persistent parent-child structure; leaf destinations are real links.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Sidebar</div>
              <div>Primary application shell container</div>
              <div>Navigation container for broad application sections; can compose Tree Navigation inside.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Accordion</div>
              <div>Collapsible content disclosure panels</div>
              <div>Content disclosure primitive; expanding a panel is not hierarchical navigation.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Navigation Menu</div>
              <div>Site or product flyout navigation</div>
              <div>Header landmark with horizontal trigger bars and rich dropdown viewports.</div>
            </div>
            <div className="grid grid-cols-3 p-3 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Generic Tree View</div>
              <div>Data-centric hierarchical structure</div>
              <div>General data viewer with checkboxes, drag-and-drop, and multiselect (not navigation).</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Props Tables */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props Reference</h2>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">TreeNavigation</h3>
          <PropsTable rows={TREE_NAVIGATION_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">TreeNavigationBranch</h3>
          <PropsTable rows={TREE_NAVIGATION_BRANCH_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">TreeNavigationLink</h3>
          <PropsTable rows={TREE_NAVIGATION_LINK_PROPS} />
        </div>
      </section>

      {/* 10. Installed Files */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installed Files</h2>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>

      {/* 11. Changelog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Changelog</h2>
        <div className="rounded-xl border border-border/60 p-4 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">v1.0.0</span>
            <span>&bull;</span>
            <span>2026-09-26</span>
            <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-medium">Initial Release</span>
          </div>
          <p className="leading-relaxed">
            Initial implementation of HaloUI Tree Navigation component with W3C ARIA tree semantics, roving focus, stable node identifiers, separate expansion vs current state, and restrained liquid optical glass styling.
          </p>
        </div>
      </section>
    </article>
  );
}
