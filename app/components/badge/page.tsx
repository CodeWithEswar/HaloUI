import { Metadata } from "next";
import { BadgePreviewStage } from "./badge-preview-stage";
import { BadgeDemonstrations } from "./badge-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Badge — Data Display — HaloUI",
  description:
    "Compact inline label primitive communicating category, count, or classification.",
};

const BADGE_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
    default: "'default'",
    required: false,
    description: "Visual surface style variant.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged with badge tokens.",
  },
  {
    name: "render",
    type: "ReactElement",
    default: "undefined",
    required: false,
    description: "Polymorphic element override via Base UI useRender.",
  },
];

const BADGE_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "badge.tsx",
            type: "file",
            description: "Lightweight, accessible inline badge primitive.",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
        description: "Shared typography and spacing tokens.",
      },
    ],
  },
];

export default function BadgeDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 06
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Badge
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Compact inline label primitive communicating category, count, or classification.
        </p>
      </div>

      {/* Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <BadgePreviewStage />
      </section>

      {/* Guidance */}
      <div className="space-y-4">
        <Callout type="note" title="Information Primitive — Not A Button">
          Badge is an inline data display primitive. It does not possess button semantics, pressed states, or keyboard handlers by default. For actionable controls, use Button.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="badge" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="badge-example.tsx"
          code={`import { Badge } from "@/components/ui/badge";

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="outline">v2.4.0</Badge>
    </div>
  );
}`}
        />
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations
        </h2>
        <BadgeDemonstrations />
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <PropsTable props={BADGE_PROPS} />
      </section>

      {/* Installed Files */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree data={BADGE_FILE_TREE} />
      </section>
    </div>
  );
}
