import { Metadata } from "next";
import { TreeViewPreviewStage } from "./tree-view-preview-stage";
import { TreeViewDemonstrations } from "./tree-view-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Tree View — Data Display 25 — HaloUI",
  description:
    "Hierarchical data display primitive with WAI-ARIA Tree View semantics, roving tabindex keyboard navigation, container-aware deep nesting reflow, and restrained HaloUI Liquid Glass framing.",
};

const TREE_VIEW_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "TreeView",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for hierarchical data presentation. Coordinates WAI-ARIA role='tree' semantics, roving tabindex keyboard navigation, selection states, expansion sets, and container query boundaries (@container/tree-view).",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties including id, className, aria-*, and DOM events.",
    },
    props: [
      {
        name: "nodes",
        type: "TreeNode[]",
        required: false,
        description:
          "Optional data-driven array of hierarchical nodes. When omitted, children compound components (<TreeBranch>, <TreeLeaf>) can be composed declaratively.",
      },
      {
        name: "expandedIds",
        type: "string[]",
        required: false,
        description: "Controlled array of expanded node branch IDs.",
      },
      {
        name: "defaultExpandedIds",
        type: "string[]",
        default: "[]",
        required: false,
        description: "Initial array of expanded branch IDs for uncontrolled usage.",
      },
      {
        name: "onExpandedIdsChange",
        type: "(ids: string[]) => void",
        required: false,
        description: "Callback fired when expanded branch IDs change.",
      },
      {
        name: "selectedIds",
        type: "string[]",
        required: false,
        description: "Controlled array of selected node IDs.",
      },
      {
        name: "defaultSelectedIds",
        type: "string[]",
        default: "[]",
        required: false,
        description: "Initial array of selected node IDs for uncontrolled usage.",
      },
      {
        name: "onSelectedIdsChange",
        type: "(ids: string[]) => void",
        required: false,
        description: "Callback fired when selected node IDs change.",
      },
      {
        name: "selectionMode",
        type: "'none' | 'single' | 'multiple'",
        default: "'none'",
        required: false,
        description:
          "Selection strategy: 'none' (pure display hierarchy), 'single' (radio-like single node active selection), or 'multiple' (multi-item selection).",
      },
      {
        name: "showCheckboxes",
        type: "boolean",
        default: "false",
        required: false,
        description: "Whether to render accessible HaloUI Checkbox controls alongside each node label in selection modes.",
      },
      {
        name: "variant",
        type: "'default' | 'glass' | 'plain'",
        default: "'default'",
        required: false,
        description:
          "Visual framing variant: 'glass' (restrained HaloUI liquid glass outer shell when standalone), 'default' (subtle border and card surface), or 'plain' (frameless unpadded view for tight nesting inside sidebars or cards).",
      },
      {
        name: "size",
        type: "'sm' | 'default' | 'lg'",
        default: "'default'",
        required: false,
        description:
          "Density and typography scale: 'sm' (compact 12px rows), 'default' (13px standard rows), or 'lg' (14px spacious rows).",
      },
      {
        name: "showConnectors",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to display subtle hairline vertical tree connector guide lines for nested groups.",
      },
      {
        name: "indentation",
        type: "number",
        default: "16",
        required: false,
        description: "Horizontal indentation in pixels per depth tier.",
      },
    ],
  },
  {
    name: "TreeBranch",
    kind: "Component",
    maturity: "stable",
    description:
      "Expandable parent node with accessible disclosure button, dynamic folder/open icons, badge metadata, and nested child group container.",
    props: [
      {
        name: "id",
        type: "string",
        required: true,
        description: "Unique identifier for this branch node.",
      },
      {
        name: "label",
        type: "string",
        required: true,
        description: "Text label displayed in the branch row.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        required: false,
        description: "Custom icon displayed when the branch is collapsed. Defaults to Folder01Icon.",
      },
      {
        name: "expandedIcon",
        type: "React.ReactNode",
        required: false,
        description: "Custom icon displayed when the branch is expanded. Defaults to FolderOpenIcon.",
      },
      {
        name: "badge",
        type: "React.ReactNode",
        required: false,
        description: "Optional metadata badge, count, or status indicator (e.g. '12 files').",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description: "Whether this branch is disabled from selection and interaction.",
      },
      {
        name: "actions",
        type: "React.ReactNode",
        required: false,
        description: "Optional trailing action buttons with stopPropagation event isolation.",
      },
    ],
  },
  {
    name: "TreeLeaf",
    kind: "Component",
    maturity: "stable",
    description:
      "Terminal leaf node with alignment spacer, custom file/item icon, metadata badge, and optional trailing quick actions. Strictly renders no fake disclosure controls.",
    props: [
      {
        name: "id",
        type: "string",
        required: true,
        description: "Unique identifier for this leaf node.",
      },
      {
        name: "label",
        type: "string",
        required: true,
        description: "Text label displayed in the leaf row.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        required: false,
        description: "Custom icon displayed in the leaf row. Defaults to File01Icon.",
      },
      {
        name: "badge",
        type: "React.ReactNode",
        required: false,
        description: "Optional metadata badge, file size, or status tag (e.g. '4.2 KB').",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description: "Whether this leaf is disabled from selection and interaction.",
      },
      {
        name: "actions",
        type: "React.ReactNode",
        required: false,
        description: "Optional trailing action buttons with stopPropagation event isolation.",
      },
    ],
  },
];

const TREE_VIEW_FILES: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "tree-view.tsx",
            type: "file",
            description: "Core TreeView primitive: TreeView, TreeBranch, TreeLeaf, and roving tabindex handler",
          },
        ],
      },
    ],
  },
];

export default function TreeViewDocumentationPage() {
  return (
    <div className="space-y-12">
      {/* Header section with category badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Data Display 25
          </Badge>
          <Badge variant="secondary" className="text-xs">
            WAI-ARIA Treeview 1.2
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Container-Aware Reflow
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Roving TabIndex
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Tree View
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Hierarchical data display primitive engineered with WAI-ARIA Tree View semantics, keyboard roving tabindex navigation, tokenized hairline guide connectors, and restrained HaloUI Liquid Glass optics.
        </p>
      </div>

      {/* Interactive Workbench Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Stage
        </h2>
        <TreeViewPreviewStage />
      </section>

      {/* CLI Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="tree-view" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy & Source Files
        </h2>
        <p className="text-sm text-muted-foreground">
          Copy-paste distribution into your repository via the HaloUI shadcn registry.
        </p>
        <FileTree files={TREE_VIEW_FILES} />
      </section>

      {/* Semantic Distinction Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          When to Use & Architectural Distinctions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Tree View vs. Tree Navigation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Tree Navigation</strong> is designed for application routing and site navigation with destination links, <code>aria-current="page"</code>, and URL push state. <strong>Tree View</strong> is a pure hierarchical data display primitive for files, taxonomies, cloud topologies, and categories without page routing side-effects.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Tree View vs. JSON Viewer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>JSON Viewer</strong> is specialized for JSON AST structures with syntax highlighting for primitives (<code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>). <strong>Tree View</strong> presents generic business domain data (nodes, folders, files, custom icons, badges, and trailing actions).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Tree View vs. Accordion</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Accordion</strong> manages coordinated flat sections with collapsible content panels (e.g. FAQs). <strong>Tree View</strong> models arbitrary multi-tier recursive parent-child hierarchies with depth indentation and hairline guides.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Expansion != Selection</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In Tree View, expanded state and selected state are strictly independent. A branch node can be expanded without being selected, or selected without being expanded. Visual indicators and keyboard handlers treat these as distinct dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* Production Demonstrations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Production Demonstrations
        </h2>
        <TreeViewDemonstrations />
      </section>

      {/* API Reference & Props Explorer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props & API Explorer
        </h2>
        <PropsExplorer subcomponents={TREE_VIEW_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
