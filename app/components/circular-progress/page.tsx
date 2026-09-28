import { Metadata } from "next";
import { CircularProgressPreviewStage } from "./circular-progress-preview-stage";
import { CircularProgressDemonstrations } from "./circular-progress-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Circular Progress — Feedback & Status 06 — HaloUI",
  description:
    "Compact radial completion indicator engineered with scalable SVG coordinate geometry, Subtle Liquid Glass track channels, and WAI-ARIA progressbar semantics.",
};

const CIRCULAR_PROGRESS_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "CircularProgress",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for radial completion indicators. Encapsulates SVG coordinate geometry, WAI-ARIA progressbar role semantics, value bounds validation, and Subtle Liquid Glass track styling.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "value",
        type: "number | null",
        default: "undefined",
        required: false,
        description:
          "Current completion value between 0 and max. Pass null or undefined to render in indeterminate rotating mode.",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        required: false,
        description: "Maximum completion value corresponding to 100% completion. Defaults to 100.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        default: "'md'",
        required: false,
        description:
          "Radial scale: 'sm' (32px), 'md' (48px), 'lg' (64px), 'xl' (96px), or '2xl' (128px).",
      },
      {
        name: "variant",
        type: "'default' | 'success' | 'warning' | 'destructive' | 'info' | 'neutral'",
        default: "'default'",
        required: false,
        description:
          "Semantic color tone of the progress arc: 'default' (brand primary), 'success' (emerald), 'warning' (amber), 'destructive' (rose), 'info' (sky), or 'neutral' (zinc).",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'plain'",
        default: "'subtle'",
        required: false,
        description:
          "Optical material depth of the track ring: 'subtle' (translucent channel), 'balanced' (heightened optical contrast), or 'plain' (solid base).",
      },
      {
        name: "strokeWidth",
        type: "number",
        default: "8",
        required: false,
        description: "Thickness of the SVG stroke in the 100x100 viewBox coordinate space.",
      },
      {
        name: "showValue",
        type: "boolean",
        default: "false",
        required: false,
        description: "Whether to automatically display the percentage in the center slot.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: false,
        description: "Optional custom center content (icons, metric text, badges) overriding automatic percentage text.",
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        description: "Accessible name identifying what process is progressing for assistive technologies.",
      },
    ],
  },
  {
    name: "CircularProgressLabel",
    kind: "Component",
    maturity: "stable",
    description:
      "Accessible external visible label coordinating with the radial progress indicator.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits standard HTML span attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Label text or formatted inline elements.",
      },
    ],
  },
];

const CIRCULAR_PROGRESS_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "circular-progress.tsx",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "directory",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
      },
      {
        name: "halo-material.css",
        type: "file",
      },
    ],
  },
];

export default function CircularProgressDocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Feedback &amp; Status 06
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            WAI-ARIA role=&quot;progressbar&quot;
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            SVG Coordinate Geometry
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Circular Progress</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Compact radial completion indicator engineered with scalable SVG coordinate geometry, Subtle Liquid Glass track channels, and WAI-ARIA progressbar semantics.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <CircularProgressPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Circular Progress directly into your project via the HaloUI shadcn-compatible CLI registry.
        </p>
        <InstallCommand registry="circular-progress" />
      </section>

      {/* Anatomy & File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Anatomy &amp; File Tree</h2>
        <p className="text-sm text-muted-foreground">
          Source files required to compose Circular Progress within your design system:
        </p>
        <FileTree files={CIRCULAR_PROGRESS_FILE_TREE} />
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Demonstrations &amp; Usage Scenarios</h2>
        <CircularProgressDemonstrations />
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Props Reference</h2>
        <PropsExplorer components={CIRCULAR_PROGRESS_SUBCOMPONENTS} />
      </section>

      {/* Accessibility & Design Contracts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Accessibility &amp; Design Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">SVG Coordinate Precision</h4>
            <p className="text-muted-foreground leading-relaxed">
              Derived from scalable <code className="font-mono text-xs">viewBox=&quot;0 0 100 100&quot;</code> with radius <code className="font-mono text-xs">r = (100 - strokeWidth) / 2</code>. Renders razor-sharp on retina and high-DPI displays without raster pixelation.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">WAI-ARIA Accessibility</h4>
            <p className="text-muted-foreground leading-relaxed">
              Implements <code className="font-mono text-xs">role=&quot;progressbar&quot;</code> with <code className="font-mono text-xs">aria-valuenow</code>, <code className="font-mono text-xs">aria-valuemin=&quot;0&quot;</code>, and <code className="font-mono text-xs">aria-valuemax</code>. Center text is marked <code className="font-mono text-xs">aria-hidden=&quot;true&quot;</code> to prevent duplicate screen reader announcements.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Subtle Optical Channel</h4>
            <p className="text-muted-foreground leading-relaxed">
              Features a restrained translucent track ring with zero default neon bloom or glass orb wrappers, allowing seamless embedding into cards, tables, and sidebars.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Container &amp; Zoom Resilience</h4>
            <p className="text-muted-foreground leading-relaxed">
              Tested across 240px micro-panels and 200% browser zoom with zero clipping, zero layout shift, and zero JavaScript breakpoint listeners.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
