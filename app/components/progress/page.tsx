import { Metadata } from "next";
import { ProgressPreviewStage } from "./progress-preview-stage";
import { ProgressDemonstrations } from "./progress-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Progress — Feedback & Status 05 — HaloUI",
  description:
    "Linear task completion indicator engineered with Subtle Liquid Glass channels, accessible WAI-ARIA progressbar semantics, and automatic container-aware reflow down to 240px.",
};

const PROGRESS_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Progress",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for linear progress indicators. Encapsulates WAI-ARIA progressbar role semantics, value bounds validation, container query boundaries (@container/progress), and optical context orchestration.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits Base UI Progress Root attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "value",
        type: "number | null",
        default: "undefined",
        required: false,
        description:
          "Current completion value between 0 and max. Pass null or undefined to render in indeterminate mode with continuous kinetic motion.",
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
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: "Track thickness: 'sm' (h-1.5, 6px), 'md' (h-2.5, 10px), or 'lg' (h-4, 16px).",
      },
      {
        name: "variant",
        type: "'default' | 'success' | 'warning' | 'destructive' | 'info' | 'neutral'",
        default: "'default'",
        required: false,
        description:
          "Semantic color tone of the indicator fill: 'default' (brand primary), 'success' (emerald), 'warning' (amber), 'destructive' (rose), 'info' (sky), or 'neutral' (zinc).",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'plain'",
        default: "'subtle'",
        required: false,
        description:
          "Optical material depth of the track channel: 'subtle' (reading-first liquid glass), 'balanced' (heightened optical contrast), or 'plain' (solid, reduced transparency fallback).",
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
    name: "ProgressTrack",
    kind: "Component",
    maturity: "stable",
    description:
      "Translucent optical channel surface representing the total available completion range.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits Base UI Progress Track attributes.",
    },
    props: [
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        description: "Overrides the track height defined on the root Progress container.",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'plain'",
        required: false,
        description: "Overrides the optical material intensity for the track channel.",
      },
    ],
  },
  {
    name: "ProgressIndicator",
    kind: "Component",
    maturity: "stable",
    description:
      "Kinetic completion fill indicating current progress percentage or indeterminate translation pulse.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits Base UI Progress Indicator attributes.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'success' | 'warning' | 'destructive' | 'info' | 'neutral'",
        required: false,
        description: "Overrides the semantic color variant defined on the root Progress container.",
      },
    ],
  },
  {
    name: "ProgressLabel",
    kind: "Component",
    maturity: "stable",
    description:
      "Accessible visible label describing the task or process being measured.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits Base UI Progress Label attributes.",
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
  {
    name: "ProgressValue",
    kind: "Component",
    maturity: "stable",
    description:
      "Formatted numerical percentage readout with monospace tabular numbers.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits Base UI Progress Value attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: false,
        description: "Optional custom value formatting node.",
      },
    ],
  },
  {
    name: "ProgressHeader",
    kind: "Component",
    maturity: "stable",
    description:
      "Convenience flex container coordinating ProgressLabel and ProgressValue with responsive wrapping on narrow containers.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Header elements (typically ProgressLabel and ProgressValue).",
      },
    ],
  },
];

const PROGRESS_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "progress.tsx",
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

export default function ProgressDocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Feedback &amp; Status 05
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            WAI-ARIA role=&quot;progressbar&quot;
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            @container/progress
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Progress</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Linear task completion indicator engineered with Subtle Liquid Glass channels, accessible WAI-ARIA progressbar semantics, and automatic container-aware reflow down to 240px.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <ProgressPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Progress directly into your project via the HaloUI shadcn-compatible CLI registry.
        </p>
        <InstallCommand registry="progress" />
      </section>

      {/* Anatomy & File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Anatomy &amp; File Tree</h2>
        <p className="text-sm text-muted-foreground">
          Source files required to compose Progress within your design system:
        </p>
        <FileTree files={PROGRESS_FILE_TREE} />
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Demonstrations &amp; Usage Scenarios</h2>
        <ProgressDemonstrations />
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Props Reference</h2>
        <PropsExplorer components={PROGRESS_SUBCOMPONENTS} />
      </section>

      {/* Accessibility & Design Contracts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Accessibility &amp; Design Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">WAI-ARIA Progressbar Semantics</h4>
            <p className="text-muted-foreground leading-relaxed">
              Exposes standard <code className="font-mono text-xs">role=&quot;progressbar&quot;</code> with dynamic <code className="font-mono text-xs">aria-valuenow</code>, <code className="font-mono text-xs">aria-valuemin=&quot;0&quot;</code>, and <code className="font-mono text-xs">aria-valuemax</code>. Indeterminate progress omits <code className="font-mono text-xs">aria-valuenow</code> per the ARIA 1.2 specification.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Defensive Value Clamping</h4>
            <p className="text-muted-foreground leading-relaxed">
              Zero is strictly handled as a valid completion state (<code className="font-mono text-xs">0 !== undefined</code>). Out-of-bounds numbers, negative values, and NaN inputs are clamped defensively between 0 and max.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Subtle Liquid Glass Channel</h4>
            <p className="text-muted-foreground leading-relaxed">
              Employs a restrained translucent track with an inner physical optical edge and subtle specular highlight, avoiding heavy blur or neon glow.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Automatic 240px Container Reflow</h4>
            <p className="text-muted-foreground leading-relaxed">
              Uses pure CSS container queries (<code className="font-mono text-xs">@container/progress</code>) and intrinsic widths. ProgressHeader wraps label and value seamlessly on micro panels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
