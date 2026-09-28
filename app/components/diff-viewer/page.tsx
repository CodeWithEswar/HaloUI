import { Metadata } from "next";
import { DiffViewerPreviewStage } from "./diff-viewer-preview-stage";
import { DiffViewerDemonstrations } from "./diff-viewer-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Diff Viewer — Data Display 24 — HaloUI",
  description:
    "Accessible code and text comparison primitive engineered with Unified and Split view modes, zero-dependency line diff computation, and restrained HaloUI Liquid Glass optics.",
};

const DIFF_VIEWER_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "DiffViewer",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for source code and text comparison. Computes line-by-line additions and deletions, supports Unified and Split view modes, preserves line number alignment, and provides container query boundaries (@container/diff-viewer).",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties including id, className, aria-*, and DOM events.",
    },
    props: [
      {
        name: "oldCode",
        type: "string",
        required: true,
        description: "The original / before source code or text string to compare.",
      },
      {
        name: "newCode",
        type: "string",
        required: true,
        description: "The modified / after source code or text string to compare.",
      },
      {
        name: "filename",
        type: "string",
        required: false,
        description: "Optional filename displayed in the toolbar header (e.g. 'button.tsx').",
      },
      {
        name: "oldFilename",
        type: "string",
        required: false,
        description: "Optional label for original side in Split view mode (e.g. 'v1.0' or 'HEAD~1').",
      },
      {
        name: "newFilename",
        type: "string",
        required: false,
        description: "Optional label for modified side in Split view mode (e.g. 'v2.0' or 'HEAD').",
      },
      {
        name: "viewMode",
        type: "'unified' | 'split'",
        default: "'unified'",
        required: false,
        description:
          "Layout presentation mode: 'unified' (single inline column with additions and deletions) or 'split' (two-column side-by-side comparison).",
      },
      {
        name: "variant",
        type: "'default' | 'glass' | 'plain'",
        default: "'default'",
        required: false,
        description:
          "Framing variant: 'default' (clean bordered container for dense dashboards), 'glass' (restrained HaloUI liquid glass outer shell when standalone), or 'plain' (borderless unpadded view for nesting inside Cards or Tabs).",
      },
      {
        name: "size",
        type: "'sm' | 'default' | 'lg'",
        default: "'default'",
        required: false,
        description:
          "Typography scale: 'sm' (12px monospaced typography for dense views), 'default' (13px standard), or 'lg' (14px).",
      },
      {
        name: "showLineNumbers",
        type: "boolean",
        default: "true",
        required: false,
        description:
          "Whether to display tabular, unselectable line numbers in the gutter. Line numbers are excluded from cursor text selection.",
      },
      {
        name: "showStats",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render addition (+N) and deletion (-M) badge indicators in the toolbar header.",
      },
      {
        name: "showToolbar",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render the header toolbar with filename, statistics, view mode toggle, and copy action.",
      },
      {
        name: "showCopy",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render the canonical CopyButton in the toolbar.",
      },
      {
        name: "wrap",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Whether long lines wrap onto subsequent lines (true) or scroll horizontally inside the container (false).",
      },
      {
        name: "maxHeight",
        type: "string | number",
        required: false,
        description: "Optional maximum height with internal overscroll-contained vertical scrolling.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the outer container element.",
      },
    ],
  },
];

const DIFF_VIEWER_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "diff-viewer.tsx",
            type: "file",
          },
          {
            name: "copy-button.tsx",
            type: "file",
          },
        ],
      },
    ],
  },
];

export default function DiffViewerDocsPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Diff Viewer
          </h1>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            Data Display 24
          </Badge>
          <Badge variant="secondary">Stable</Badge>
        </div>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Accessible code and text comparison primitive engineered with Unified and Split view modes, zero-dependency line diff computation, and restrained HaloUI Liquid Glass optics.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Interactive Preview
          </h2>
        </div>
        <DiffViewerPreviewStage />
      </section>

      {/* 3. Source-Owned Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Diff Viewer directly into your repository through the shadcn registry.
        </p>
        <InstallCommand registry="diff-viewer" />
      </section>

      {/* 4. Architectural File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Structure & Dependencies
        </h2>
        <p className="text-sm text-muted-foreground">
          Source-owned architecture placed directly in your components directory with standard peer dependencies.
        </p>
        <FileTree items={DIFF_VIEWER_FILE_TREE} />
      </section>

      {/* 5. Production Demonstrations */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Production Demonstrations
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-world developer scenarios demonstrating split views, unified inline mode, database migrations, configuration patches, and micro-container reflow.
          </p>
        </div>
        <DiffViewerDemonstrations />
      </section>

      {/* 6. Props Explorer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component API
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore all configurable properties, types, default values, and behaviors for the DiffViewer primitive.
        </p>
        <PropsExplorer components={DIFF_VIEWER_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
