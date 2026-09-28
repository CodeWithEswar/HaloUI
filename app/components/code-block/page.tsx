import { Metadata } from "next";
import { CodeBlockPreviewStage } from "./code-block-preview-stage";
import { CodeBlockDemonstrations } from "./code-block-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Code Block — Data Display 22 — HaloUI",
  description:
    "Source-accurate code presentation primitive engineered with container-aware layout, unselectable tabular line numbers, line highlighting, and restrained HaloUI Liquid Glass optics.",
};

const CODE_BLOCK_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "CodeBlock",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for source code presentation. Preserves exact whitespace fidelity, renders unselectable tabular line numbers, provides fast synchronous syntax highlighting, and provides container query boundaries (@container/code-block).",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties including id, className, aria-*, and DOM events.",
    },
    props: [
      {
        name: "code",
        type: "string",
        required: true,
        description: "The raw source code string to format and highlight.",
      },
      {
        name: "language",
        type: "string",
        default: "'typescript'",
        required: false,
        description:
          "Language identifier for syntax parsing and header display (e.g. 'typescript', 'tsx', 'css', 'json', 'bash', 'sql').",
      },
      {
        name: "filename",
        type: "string",
        required: false,
        description: "Optional file name displayed in the toolbar header (e.g. 'Button.tsx', 'schema.prisma').",
      },
      {
        name: "variant",
        type: "'default' | 'glass' | 'plain'",
        default: "'default'",
        required: false,
        description:
          "Framing variant: 'default' (clean bordered container for dense layouts), 'glass' (restrained HaloUI liquid glass outer shell when standalone), or 'plain' (borderless unpadded view for nesting inside Cards or Tabs).",
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
          "Whether to render tabular, unselectable line numbers in the gutter. Line numbers are excluded from cursor text selection.",
      },
      {
        name: "highlightLines",
        type: "number[]",
        default: "[]",
        required: false,
        description: "Array of 1-indexed line numbers to highlight with accent background tint and left edge bar.",
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
        name: "showToolbar",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render the header toolbar with filename, language label, wrap toggle, and copy button.",
      },
      {
        name: "showCopy",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render the canonical CopyButton in the toolbar.",
      },
      {
        name: "copyText",
        type: "string",
        required: false,
        description: "Custom string copied to the clipboard if different from the displayed code.",
      },
      {
        name: "maxHeight",
        type: "string | number",
        required: false,
        description: "Optional maximum height with internal vertical scrolling.",
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

const CODE_BLOCK_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "code-block.tsx",
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

export default function CodeBlockDocsPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Code Block
          </h1>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            Data Display 22
          </Badge>
          <Badge variant="secondary">Stable</Badge>
        </div>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Source-accurate code presentation primitive engineered with container-aware layout, unselectable tabular line numbers, line highlighting, and restrained HaloUI Liquid Glass optics.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Interactive Preview
          </h2>
        </div>
        <CodeBlockPreviewStage />
      </section>

      {/* 3. Source-Owned Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Code Block directly into your repository through the shadcn registry.
        </p>
        <InstallCommand registry="code-block" />
      </section>

      {/* 4. Architectural File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Structure & Dependencies
        </h2>
        <p className="text-sm text-muted-foreground">
          Source-owned architecture placed directly in your components directory with standard peer dependencies.
        </p>
        <FileTree items={CODE_BLOCK_FILE_TREE} />
      </section>

      {/* 5. Production Demonstrations */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Production Demonstrations
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-world developer scenarios demonstrating wrapping, multi-language highlighting, line callouts, and narrow container behavior.
          </p>
        </div>
        <CodeBlockDemonstrations />
      </section>

      {/* 6. Props Explorer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component API
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore all configurable properties, types, default values, and behaviors for the CodeBlock primitive.
        </p>
        <PropsExplorer components={CODE_BLOCK_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
