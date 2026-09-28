import { Metadata } from "next";
import { MetricPreviewStage } from "./metric-preview-stage";
import { MetricDemonstrations } from "./metric-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Metric — Data Display 21 — HaloUI",
  description:
    "Standalone quantitative metric presentation primitive engineered with tabular numeric typography, container-aware responsive reflow, and restrained HaloUI Liquid Glass optics.",
};

const METRIC_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Metric",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for a standalone quantitative metric. Manages scale tiers, visual framing, alignment, layout reflow, and container query boundaries (@container/metric).",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties including id, className, aria-*, and DOM events.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'muted' | 'glass'",
        default: "'default'",
        required: false,
        description:
          "Visual framing variant: 'default' (unbordered transparent base for embedding inside Cards, tables, or dashboards), 'muted' (soft low-contrast tinted background), or 'glass' (restrained subtle HaloUI liquid glass outer boundary when rendered standalone).",
      },
      {
        name: "size",
        type: "'sm' | 'default' | 'lg' | 'xl' | '2xl'",
        default: "'default'",
        required: false,
        description:
          "Scale tier: 'sm' (20-24px for dense tables/inspectors), 'default' (24-30px for standard sections), 'lg' (30-36px for highlights), 'xl' (36-48px for dashboard heroes), or '2xl' (48-60px for showcase analytics).",
      },
      {
        name: "layout",
        type: "'stacked' | 'inline' | 'auto'",
        default: "'stacked'",
        required: false,
        description:
          "Arrangement mode: 'stacked' (vertical column), 'inline' (horizontal baseline alignment), or 'auto' (container-aware reflow from inline on wide to stacked on narrow containers).",
      },
      {
        name: "alignment",
        type: "'left' | 'center' | 'right'",
        default: "'left'",
        required: false,
        description:
          "Horizontal text alignment: 'left' (default start alignment), 'center' (centered for hero cards/badges), or 'right' (end alignment for financial columns).",
      },
      {
        name: "value",
        type: "React.ReactNode",
        required: false,
        description:
          "Optional shorthand numeric or formatted string value. Strictly preserves 0 and negative values without coercion.",
      },
      {
        name: "label",
        type: "React.ReactNode",
        required: false,
        description: "Optional shorthand metric label text.",
      },
      {
        name: "unit",
        type: "React.ReactNode",
        required: false,
        description: "Optional shorthand unit notation (e.g. 'ms', '%', 'GB').",
      },
      {
        name: "description",
        type: "React.ReactNode",
        required: false,
        description: "Optional shorthand secondary descriptor text.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the outer metric container.",
      },
    ],
  },
  {
    name: "MetricValue",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "The dominant quantitative numeric element. Renders with tabular numbers (tabular-nums), heading font weight, and container query responsive clamps.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "value",
        type: "React.ReactNode",
        required: false,
        description: "Raw or formatted numeric value. Zero (0) is explicitly preserved as a valid quantity.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the value element.",
      },
    ],
  },
  {
    name: "MetricLabel",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Descriptive context title explaining what is being measured with size-proportional typography.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the label element.",
      },
    ],
  },
  {
    name: "MetricUnit",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Unit notation rendered alongside the numeric value while preserving tabular-number alignment.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits all standard HTML span properties.",
    },
    props: [
      {
        name: "position",
        type: "'prefix' | 'suffix'",
        default: "'suffix'",
        required: false,
        description: "Placement relative to numeric value: 'suffix' (e.g. '342 ms') or 'prefix' (e.g. '$', '₹').",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the unit element.",
      },
    ],
  },
  {
    name: "MetricDescription",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Tertiary baseline context or timeframe explanation positioned below the metric value.",
    inheritedProps: {
      element: "React.ComponentProps<'p'>",
      description: "Inherits all standard HTML paragraph properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the description element.",
      },
    ],
  },
  {
    name: "MetricDelta",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Contextual change and trend indicator featuring decoupled geometric direction and business sentiment.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits all standard HTML span properties.",
    },
    props: [
      {
        name: "direction",
        type: "'up' | 'down' | 'neutral'",
        default: "'neutral'",
        required: false,
        description: "Arrow geometry: 'up', 'down', or 'neutral'. Does not automatically force green or red coloring.",
      },
      {
        name: "sentiment",
        type: "'positive' | 'negative' | 'neutral'",
        default: "'neutral'",
        required: false,
        description:
          "Independent business sentiment: 'positive' (green), 'negative' (red), or 'neutral' (muted).",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the delta element.",
      },
    ],
  },
  {
    name: "MetricGroup",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Responsive ribbon or grid container for organizing multiple Metric instances into balanced multi-column rows.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "columns",
        type: "1 | 2 | 3 | 4 | 5 | 6",
        default: "3",
        required: false,
        description: "Number of columns to distribute on wide viewport sizes with automatic responsive collapse.",
      },
      {
        name: "density",
        type: "'compact' | 'default' | 'relaxed'",
        default: "'default'",
        required: false,
        description: "Spacing gap between metric cells: 'compact' (16px), 'default' (24px), or 'relaxed' (32px).",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the group container.",
      },
    ],
  },
];

const METRIC_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "metric.tsx",
            type: "file",
            description: "Production Metric primitive and compound subcomponents.",
          },
        ],
      },
      {
        name: "icons",
        type: "folder",
        children: [
          {
            name: "halo-icon.tsx",
            type: "file",
            description: "HaloUI icon bridge for Hugeicons rendering.",
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
        description: "Focus ring, typography, and density tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Liquid glass 10-layer physical optical engine recipes.",
      },
    ],
  },
];

export default function MetricDocsPage() {
  return (
    <div className="space-y-12">
      {/* Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Data Display 21
          </Badge>
          <Badge variant="secondary">Stable</Badge>
          <Badge variant="outline">Tabular Numbers</Badge>
          <Badge variant="outline">Strict Zero Fidelity</Badge>
          <Badge variant="outline">All-Device Responsive</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Metric
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Standalone quantitative metric presentation primitive engineered with tabular numeric
          typography, container-aware responsive reflow, and restrained HaloUI Liquid Glass optics.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Interactive Stage</h2>
          <span className="text-xs text-muted-foreground font-mono">
            6 Backdrops &bull; 9 Widths &bull; 5 Scales &bull; 7 Scenarios
          </span>
        </div>
        <MetricPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Installation</h2>
        <InstallCommand registry="metric" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomy &amp; File Structure</h2>
        <p className="text-sm text-muted-foreground">
          Metric distributes as an unopinionated, lightweight Server-Component compatible primitive.
        </p>
        <FileTree data={METRIC_FILE_TREE} />
      </section>

      {/* Component Boundaries & Comparisons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Component Boundaries &amp; Semantic Roles
        </h2>
        <p className="text-sm text-muted-foreground">
          Understanding the explicit boundaries between Metric and related data-display components
          guarantees correct hierarchy and avoids unnecessary card-in-card wrapping.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Metric (Data Display 21)</span>
              <Badge variant="outline">Standalone Number</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>standalone numeric and quantitative values</strong> (e.g. &ldquo;99.98%&rdquo;,
              &ldquo;342 ms&rdquo;, &ldquo;₹84,320&rdquo;) usable inside Cards, dashboard ribbons,
              table cells, or detail sheets without introducing another heavy Card wrapper.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Stat Card (Data Display 2)</span>
              <Badge variant="outline">Opinionated Card</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when communicating a <strong>single-metric summary card</strong> that requires its own
              independent Card container, header with category icon, actions, and delta footer.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">KPI Card (Data Display 3)</span>
              <Badge variant="outline">Performance Engine</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>rich performance tracking</strong> with target/SLA baselines, progress
              indicators, and multi-period comparisons. Metric does not interpret business sentiment.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Key Value (Data Display 20)</span>
              <Badge variant="outline">Metadata Pair</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>label/value metadata relationships</strong> where the key and value have
              balanced visual hierarchy (e.g. &ldquo;Region: ap-south-1&rdquo;). In Metric, the quantitative
              value is the dominant visual focus.
            </p>
          </div>
        </div>
      </section>

      {/* Automatic Responsiveness & Container Queries */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Strict Automatic Container-Aware Responsiveness for ALL Devices
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI Metric features <strong>zero JavaScript resize listeners</strong> or viewport
          polling hacks. It adapts automatically to any parent width:
        </p>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Responsive Engineering Principles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Container Queries</span>
              <p className="text-muted-foreground">
                Marked with <code className="font-mono">@container/metric</code> to fluidly scale font sizes
                and reflow from inline to stacked when available width is constrained below 280px.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Strict Zero Value Validity</span>
              <p className="text-muted-foreground">
                Zero (<code className="font-mono">0</code>) is explicitly rendered as a legitimate
                quantity and is never suppressed by falsy checks like <code className="font-mono">val || &quot;—&quot;</code>.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Decoupled Sentiment</span>
              <p className="text-muted-foreground">
                Metric never assumes up means positive or down means negative. Increased memory usage
                or higher latency can be unfavorable (red) while moving up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid Glass Architecture */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          HaloUI Liquid Glass Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Because Metric is a data-density component that may appear dozens of times on dashboard screens,
          material must remain <strong>strictly restrained</strong>:
        </p>

        <div className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-4">
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Flat Base for Nested Surfaces:</strong> When nested inside
                a Card, Sheet, or Dialog, Metric uses <code className="font-mono">variant=&quot;default&quot;</code> (flat/transparent)
                to prevent distracting glass-on-glass noise.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Quiet Standalone Surface:</strong> When rendered standalone
                as a detached hero badge or tile, <code className="font-mono">variant=&quot;glass&quot;</code> applies
                restrained subtle transmission and hairline optical boundaries without loud glowing orbs.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Zero Text Refraction:</strong> Numeric values and units
                are never refracted, blurred, or distorted. Readability is always paramount.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Zero Runtime Overhead:</strong> Metric renders completely
                static on the server with zero client JavaScript, zero animations on mount, and zero observer listeners.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Production Demonstrations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Production Demonstrations</h2>
          <span className="text-xs text-muted-foreground font-mono">6 Scenarios</span>
        </div>
        <MetricDemonstrations />
      </section>

      {/* Props & API Explorer */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API Reference &amp; Props Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Explore complete typed properties, defaults, and inherited semantic HTML attributes across all
          Metric components.
        </p>
        <PropsExplorer subcomponents={METRIC_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
