import { Metadata } from "next";
import { StatusIndicatorPreviewStage } from "./status-indicator-preview-stage";
import { StatusIndicatorDemonstrations } from "./status-indicator-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Status Indicator — Feedback & Status 10 — HaloUI",
  description:
    "Dot/icon + text state representation engineered for high-density tables, lists, and cards with minimal near-flat Liquid Glass optics and zero layout overhead.",
};

const STATUS_INDICATOR_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "StatusIndicator",
    kind: "Component",
    maturity: "stable",
    description:
      "Concise state presentation primitive combining a supplementary geometric dot or icon with explicit semantic text. Server-Component compatible with zero client-side JavaScript overhead.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits standard HTML span attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "intent",
        type: "'neutral' | 'positive' | 'warning' | 'destructive' | 'info'",
        default: "'neutral'",
        required: false,
        description:
          "Semantic intent: 'positive' (Operational, Active), 'warning' (Degraded, Pending), 'destructive' (Outage, Failed), 'info' (Syncing, Deploying), or 'neutral' (Maintenance, Offline).",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description:
          "Sizing scale controlling dot/icon dimensions and text typography.",
      },
      {
        name: "dot",
        type: "boolean",
        default: "true",
        required: false,
        description:
          "Whether to display the supplementary geometric optical dot indicator.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        default: "undefined",
        required: false,
        description:
          "Optional custom semantic Hugeicon. When provided, replaces the geometric optical dot.",
      },
      {
        name: "label",
        type: "React.ReactNode",
        default: "undefined",
        required: false,
        description:
          "Primary semantic state label. Can also be provided as children.",
      },
      {
        name: "supportingText",
        type: "React.ReactNode",
        default: "undefined",
        required: false,
        description:
          "Optional secondary text displayed alongside the primary label.",
      },
      {
        name: "pulse",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Optional subtle pulse animation. Defaults to false for vestibular accessibility and CPU efficiency.",
      },
    ],
  },
];

const STATUS_INDICATOR_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "status-indicator.tsx",
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

export default function StatusIndicatorDocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Feedback &amp; Status 10
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Not Color-Only (WCAG 1.4.1)
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Zero Glass Clutter
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Server Component Ready
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Status Indicator</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Dot/icon + text state representation engineered for high-density tables, lists, and cards with minimal near-flat Liquid Glass optics and zero layout overhead.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <StatusIndicatorPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Status Indicator directly into your project via the HaloUI shadcn-compatible CLI registry.
        </p>
        <InstallCommand registry="status-indicator" />
      </section>

      {/* Anatomy & File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Anatomy &amp; File Tree</h2>
        <p className="text-sm text-muted-foreground">
          Source files required to compose Status Indicator within your design system:
        </p>
        <FileTree files={STATUS_INDICATOR_FILE_TREE} />
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Demonstrations &amp; Usage Scenarios</h2>
        <StatusIndicatorDemonstrations />
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Props Reference</h2>
        <PropsExplorer components={STATUS_INDICATOR_SUBCOMPONENTS} />
      </section>

      {/* Accessibility & Design Contracts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Accessibility &amp; Design Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Meaning Never Relies Solely on Color</h4>
            <p className="text-muted-foreground leading-relaxed">
              In strict accordance with WCAG 2.1 AA (Guideline 1.4.1 Use of Color), the indicator dot is strictly supplementary. State information is always reinforced through visible text or explicit icons with accessible names.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Restrained Near-Flat Liquid Glass</h4>
            <p className="text-muted-foreground leading-relaxed">
              Status Indicator avoids heavy glass pills or glowing neon halos. The dot features a subtle 1px optical edge and crisp top-down specular highlight while keeping background layers completely clear for maximum table performance.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Static by Default (Vestibular Safety)</h4>
            <p className="text-muted-foreground leading-relaxed">
              Unlike common SaaS anti-patterns that pulse continuously, Status Indicator is completely static by default. When pulse is explicitly enabled, it respects <code className="font-mono text-xs">prefers-reduced-motion: reduce</code> and disables animations automatically.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">High-Frequency Data Table Efficiency</h4>
            <p className="text-muted-foreground leading-relaxed">
              Designed to be rendered hundreds of times in large data grids without GPU compositor thrashing or React client-hydration overhead.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
