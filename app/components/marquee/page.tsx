import { Metadata } from "next";
import { MarqueePreviewStage } from "./marquee-preview-stage";
import { MarqueeDemonstrations } from "./marquee-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Marquee — Data Display 27 — HaloUI",
  description:
    "Continuous content presentation strip primitive engineered with pure CSS transforms, reduced-motion-first fallback, accessible clone isolation, and restrained HaloUI Liquid Glass optics.",
};

const MARQUEE_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Marquee",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for continuous sequential content presentation. Features pure CSS transform-based motion, automatic reduced-motion static fallback, accessible clone isolation (aria-hidden and inert), and container query boundaries (@container/marquee).",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Sequential content items to scroll continuously (logos, brand cards, badges, text).",
      },
      {
        name: "direction",
        type: "'forward' | 'reverse'",
        default: "'forward'",
        required: false,
        description: "Flow direction: 'forward' (right-to-left) or 'reverse' (left-to-right).",
      },
      {
        name: "duration",
        type: "number",
        default: "30",
        required: false,
        description: "Duration in seconds for one complete cycle.",
      },
      {
        name: "gap",
        type: "string",
        default: "'1.5rem'",
        required: false,
        description: "Spacing between track items (e.g. '1rem', '1.5rem', '24px').",
      },
      {
        name: "variant",
        type: "'plain' | 'glass' | 'default'",
        default: "'plain'",
        required: false,
        description:
          "Framing variant: 'plain' (frameless unbordered display for embedding), 'glass' (restrained HaloUI liquid glass outer shell), or 'default' (bordered card container).",
      },
      {
        name: "size",
        type: "'sm' | 'default' | 'lg'",
        default: "'default'",
        required: false,
        description:
          "Vertical density scale: 'sm' (compact scale for dense tickers), 'default' (standard), or 'lg' (spacious for hero logos).",
      },
      {
        name: "pauseOnHover",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to pause continuous movement when pointer hovers over the marquee.",
      },
      {
        name: "pauseOnFocus",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to pause continuous movement when keyboard focus moves into the marquee.",
      },
      {
        name: "fadeEdges",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to apply subtle optical gradient fade masks on the left and right boundaries.",
      },
      {
        name: "repeat",
        type: "number",
        default: "2",
        required: false,
        description:
          "Number of visual clone repetitions for seamless ultra-wide coverage. Clones are strictly hidden from screen readers and keyboard focus.",
      },
    ],
  },
];

const MARQUEE_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "marquee.tsx",
            type: "file",
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
      },
    ],
  },
];

export default function MarqueeDocsPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Marquee
          </h1>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            Data Display 27
          </Badge>
          <Badge variant="secondary">Stable</Badge>
        </div>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Continuous content presentation strip primitive engineered with pure CSS transforms, reduced-motion-first fallback, accessible clone isolation, and restrained HaloUI Liquid Glass optics.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Interactive Preview
          </h2>
        </div>
        <MarqueePreviewStage />
      </section>

      {/* 3. Source-Owned Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Marquee directly into your repository through the shadcn registry.
        </p>
        <InstallCommand registry="marquee" />
      </section>

      {/* 4. Architectural File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Structure & Dependencies
        </h2>
        <p className="text-sm text-muted-foreground">
          Zero external runtime animation dependencies. Powered by pure CSS composited transforms and container queries.
        </p>
        <FileTree items={MARQUEE_FILE_TREE} />
      </section>

      {/* 5. Production Demonstrations */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Production Demonstrations
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-world developer scenarios demonstrating liquid glass framing, dual counter-flow, interactive focus pause, editorial news tickers, and micro-container reflow.
          </p>
        </div>
        <MarqueeDemonstrations />
      </section>

      {/* 6. Props Explorer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component API
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore all configurable properties, types, default values, and behaviors for the Marquee primitive.
        </p>
        <PropsExplorer components={MARQUEE_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
