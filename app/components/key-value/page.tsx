import { Metadata } from "next";
import { KeyValuePreviewStage } from "./key-value-preview-stage";
import { KeyValueDemonstrations } from "./key-value-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Key Value — Data Display 20 — HaloUI",
  description:
    "Compact metadata and label/value display primitive engineered with container-aware responsive reflow, zero glass-on-glass noise, and restrained HaloUI Liquid Glass optics.",
};

const KEY_VALUE_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "KeyValue",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for a single label/value pair. Manages density scales, layout alignment, container query boundaries (@container/key-value), and restrained optical framing.",
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
          "Visual framing variant: 'default' (unbordered transparent base for nested cards/tables), 'muted' (soft tinted background), or 'glass' (restrained subtle HaloUI liquid glass outer shell when standalone).",
      },
      {
        name: "layout",
        type: "'auto' | 'stacked' | 'inline'",
        default: "'auto'",
        required: false,
        description:
          "Alignment mode: 'auto' (fluid container-aware reflow: inline on wide containers, wraps cleanly to stacked on narrow), 'stacked' (label above value), or 'inline' (horizontal space-between alignment).",
      },
      {
        name: "density",
        type: "'default' | 'compact' | 'relaxed'",
        default: "'default'",
        required: false,
        description:
          "Spatial density scale controlling vertical and horizontal padding: 'default' (8px padding), 'compact' (4px padding for tight sidebars), or 'relaxed' (12px padding for prominent summary panels).",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the outer container element.",
      },
    ],
  },
  {
    name: "KeyValueLabel",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Visually secondary label element (<span>) describing the associated property or metric.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits all standard HTML span properties.",
    },
    props: [
      {
        name: "icon",
        type: "React.ReactNode",
        required: false,
        description: "Optional small icon element displayed before the label text.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the label element.",
      },
    ],
  },
  {
    name: "KeyValueValue",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Primary data value element (<span>) with automatic break-words and min-w-0 containment.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits all standard HTML span properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the value element.",
      },
    ],
  },
  {
    name: "KeyValueGroup",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Layout container for organizing multiple KeyValue pairs into responsive 1, 2, 3, or 4 column grids.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "columns",
        type: "1 | 2 | 3 | 4",
        default: "1",
        required: false,
        description: "Number of columns to distribute on medium-to-wide viewport sizes.",
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

const KEY_VALUE_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "key-value.tsx",
            type: "file",
            description: "Production KeyValue primitive and compound subcomponents.",
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
        description: "Focus ring, density, and spatial tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Liquid glass 10-layer physical optical engine recipes.",
      },
    ],
  },
];

export default function KeyValueDocsPage() {
  return (
    <div className="space-y-12">
      {/* Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Data Display 20
          </Badge>
          <Badge variant="secondary">Stable</Badge>
          <Badge variant="outline">Label/Value Metadata</Badge>
          <Badge variant="outline">Restrained Liquid Glass</Badge>
          <Badge variant="outline">All-Device Responsive</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Key Value
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Compact label and value metadata display primitive engineered with container-aware responsive
          reflow, zero glass-on-glass noise, and restrained HaloUI Liquid Glass optics.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Interactive Stage</h2>
          <span className="text-xs text-muted-foreground font-mono">
            6 Backdrops &bull; 9 Widths &bull; 3 Layout Modes
          </span>
        </div>
        <KeyValuePreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Installation</h2>
        <InstallCommand registry="key-value" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomy &amp; File Structure</h2>
        <p className="text-sm text-muted-foreground">
          Key Value distributes as an unopinionated composition-first primitive with compound subcomponents.
        </p>
        <FileTree data={KEY_VALUE_FILE_TREE} />
      </section>

      {/* Component Boundaries & Comparisons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Component Boundaries &amp; Semantic Roles
        </h2>
        <p className="text-sm text-muted-foreground">
          Choosing between Key Value, Description List, and Stat Card guarantees proper semantic hierarchy
          and prevents visual clutter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Key Value (Data Display 20)</span>
              <Badge variant="outline">Compact Pair</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>compact, lightweight label/value pairs</strong> across detail screens,
              inspector panels, and table cells (e.g. &ldquo;Region: Mumbai&rdquo; or &ldquo;Latency: 14ms&rdquo;).
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Description List (Data Display 12)</span>
              <Badge variant="outline">Semantic &lt;dl&gt;</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>formal multi-term technical specifications</strong> requiring native HTML
              semantic <code className="font-mono text-xs">&lt;dl&gt;</code>, <code className="font-mono text-xs">&lt;dt&gt;</code>,
              and <code className="font-mono text-xs">&lt;dd&gt;</code> structure.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Stat Card (Data Display 2)</span>
              <Badge variant="outline">Primary Metric</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when communicating a <strong>prominent primary quantitative metric with trend delta</strong>.
              Stat Card is an opinionated summary card, not a lightweight metadata pair.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Item (Data Display 10)</span>
              <Badge variant="outline">Content Row</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>structural list rows</strong> featuring leading media (avatar/icon), title,
              subtitle description, and trailing interactive controls.
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
          HaloUI Key Value features <strong>zero JavaScript resize listeners</strong> or viewport
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
                Marked with <code className="font-mono">@container/key-value</code> to automatically
                switch from inline layout to stacked layout when container width drops below 260px.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Unbroken Value Protection</span>
              <p className="text-muted-foreground">
                Values utilize <code className="font-mono">break-words min-w-0</code> so long URLs,
                hashes, and endpoints wrap cleanly without blowing out parent bounds.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Strict Zero Value Validity</span>
              <p className="text-muted-foreground">
                Zero (<code className="font-mono">0</code>) is explicitly preserved as a valid numeric
                value and is never replaced by a missing-value placeholder dash.
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
          Because Key Value may be repeated dozens of times on detail views, material must remain
          <strong>extremely restrained</strong>:
        </p>

        <div className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-4">
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Strictly No Glass Card per Field:</strong> Never turn
                every individual label/value pair into a heavy blurred glass card. When nested in a Card,
                Key Value uses <code className="font-mono">variant=&quot;default&quot;</code> (flat/transparent).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Quiet Standalone Surface:</strong> When rendered standalone,
                <code className="font-mono">variant=&quot;glass&quot;</code> applies subtle transmission
                and hairline optical boundaries without loud glow or excessive blur.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Zero Content Refraction:</strong> Values, codes, links,
                and copy triggers are never refracted or distorted.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Semantic Independence:</strong> Badges and Status Badges
                inside Key Value retain their own semantic contrast and independent focus treatment.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Production Demonstrations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Production Demonstrations</h2>
          <span className="text-xs text-muted-foreground font-mono">5 Scenarios</span>
        </div>
        <KeyValueDemonstrations />
      </section>

      {/* Props & API Explorer */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API Reference &amp; Props Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Explore complete typed properties, defaults, and inherited semantic HTML attributes across all
          Key Value components.
        </p>
        <PropsExplorer subcomponents={KEY_VALUE_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
