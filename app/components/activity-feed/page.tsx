import { Metadata } from "next";
import { ActivityFeedPreviewStage } from "./activity-feed-preview-stage";
import { ActivityFeedDemonstrations } from "./activity-feed-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Activity Feed — Data Display 18 — HaloUI",
  description:
    "Scannable recent activity stream engineered with semantic articles, actor identity preservation, container-aware responsive reflow, and restrained HaloUI Liquid Glass optics.",
};

const ACTIVITY_FEED_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "ActivityFeed",
    kind: "Component",
    maturity: "stable",
    description:
      "Root activity stream container rendered with role='feed'. Manages density scales, container query boundaries (@container/activity-feed), and outer liquid glass framing.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties including id, className, aria-*, and DOM events.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'outline' | 'glass' | 'ghost'",
        default: "'default'",
        required: false,
        description:
          "Visual framing variant for the outer activity feed container: 'default' (unbordered clean container), 'outline' (hairline border), 'glass' (restrained HaloUI liquid glass outer shell with specular reflection), or 'ghost' (borderless layout).",
      },
      {
        name: "density",
        type: "'default' | 'compact' | 'relaxed'",
        default: "'default'",
        required: false,
        description:
          "Spatial density scale controlling vertical gap between activity items: 'default' (16px gap), 'compact' (10px gap for dense sidebars), or 'relaxed' (24px gap for spacious changelogs).",
      },
      {
        name: "role",
        type: "string",
        default: "'feed'",
        required: false,
        description: "Assistive technology role for the container.",
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
    name: "ActivityFeedItem",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Individual recent activity event entry rendered as a semantic <article>. Static by default to preserve native link and button accessibility.",
    inheritedProps: {
      element: "React.ComponentProps<'article'>",
      description: "Inherits all standard HTML article element properties.",
    },
    props: [
      {
        name: "interactive",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Whether the entire row has an intentional interactive link or action. Static items must NOT receive hover lifting or focus rings.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the article element.",
      },
    ],
  },
  {
    name: "ActivityFeedIndicator",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Leading slot for Avatar, Service Icon, or State Indicator. Preserves 100% media fidelity with zero refraction or distortion.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "icon",
        type: "React.ReactNode",
        required: false,
        description:
          "Optional custom icon element placed inside the indicator container.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the indicator element.",
      },
    ],
  },
  {
    name: "ActivityFeedContent",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Event body container organizing header, title sentence, metadata, and actions with min-w-0.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the content container.",
      },
    ],
  },
  {
    name: "ActivityFeedHeader",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Responsive header row separating event sentence from timestamp with automatic mobile wrapping.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the header container.",
      },
    ],
  },
  {
    name: "ActivityFeedTitle",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Natural language event sentence (<p>) supporting actor emphasis (<strong>), inline tags, and code elements.",
    inheritedProps: {
      element: "React.ComponentProps<'p'>",
      description: "Inherits all standard HTML paragraph properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the title element.",
      },
    ],
  },
  {
    name: "ActivityFeedTimestamp",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Semantic timestamp (<time>) with mono formatting and automatic positioning.",
    inheritedProps: {
      element: "React.ComponentProps<'time'>",
      description: "Inherits all standard HTML time element properties including dateTime.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the time element.",
      },
    ],
  },
  {
    name: "ActivityFeedMetadata",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Supporting metadata container for commit hashes, quotes, diff summaries, or tags.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the metadata container.",
      },
    ],
  },
  {
    name: "ActivityFeedActions",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Trailing or embedded action button cluster for interactive responses.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the actions container.",
      },
    ],
  },
  {
    name: "ActivityFeedSeparator",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Hairline divider separating stacked rows in dense list configurations.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div properties.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the separator element.",
      },
    ],
  },
];

const ACTIVITY_FEED_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "activity-feed.tsx",
            type: "file",
            description: "Production ActivityFeed primitive and compound subcomponents.",
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

export default function ActivityFeedDocsPage() {
  return (
    <div className="space-y-12">
      {/* Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Data Display 18
          </Badge>
          <Badge variant="secondary">Stable</Badge>
          <Badge variant="outline">role=&quot;feed&quot;</Badge>
          <Badge variant="outline">HaloUI Liquid Glass</Badge>
          <Badge variant="outline">All-Device Responsive</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Activity Feed
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Scannable recent activity stream engineered with semantic articles, actor identity
          preservation, natural event sentences, container-aware responsive reflow across all devices,
          and a unified HaloUI Liquid Glass outer boundary.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Interactive Stage</h2>
          <span className="text-xs text-muted-foreground font-mono">
            6 Backdrops &bull; 9 Widths &bull; Density Scales
          </span>
        </div>
        <ActivityFeedPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Installation</h2>
        <InstallCommand registry="activity-feed" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomy &amp; File Structure</h2>
        <p className="text-sm text-muted-foreground">
          Activity Feed distributes as an unopinionated composition-first primitive with compound subcomponents.
        </p>
        <FileTree data={ACTIVITY_FEED_FILE_TREE} />
      </section>

      {/* Component Boundaries & Comparisons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Component Boundaries &amp; Semantic Roles
        </h2>
        <p className="text-sm text-muted-foreground">
          Selecting the proper component for event presentation guarantees natural scanning and
          accessible assistive technology traversal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Activity Feed (Data Display 18)</span>
              <Badge variant="outline">Recent Action Stream</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>scanning recent actions, team contributions, and notifications</strong>.
              Emphasizes actor identity, avatar presence, natural language sentences, and metadata
              over rigid connector lines.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Timeline (Data Display 17)</span>
              <Badge variant="outline">Chronological Sequence</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when <strong>chronological sequence, progression, and milestone points</strong> are
              visually prominent (e.g. CI/CD pipelines, package tracking, or security audit trails)
              with formal vertical rail connectors.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">List (Data Display 11)</span>
              <Badge variant="outline">Generic Collection</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>generic collections of rows</strong> (e.g. files, settings, users)
              without specialized actor/action/target event sentences or time-series semantics.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Audit Log (Data Table)</span>
              <Badge variant="outline">Structured Enterprise Log</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>tabular enterprise records</strong> requiring column sorting, multi-attribute
              filtering, IP address tracking, and tabular pagination across thousands of immutable events.
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
          HaloUI Activity Feed contains <strong>strictly zero JavaScript resize listeners</strong> or
          viewport window polling hacks. It reflows automatically across all device and container sizes:
        </p>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Responsive Engineering Principles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Container Queries</span>
              <p className="text-muted-foreground">
                Marked with <code className="font-mono">@container/activity-feed</code> to ensure feed
                items respond to their immediate container width—even when placed in 280px sidebars on
                a 4K monitor.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Fluid Header Wrapping</span>
              <p className="text-muted-foreground">
                Headers automatically position the event sentence and timestamp side-by-side on wide
                screens, wrapping cleanly on mobile without squishing the avatar.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Zero Horizontal Overflow</span>
              <p className="text-muted-foreground">
                All event sentences and metadata use <code className="font-mono">break-words min-w-0</code> to
                prevent long strings, usernames, or URLs from creating page-level horizontal overflow.
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
          HaloUI Activity Feed honors the system-wide material contract:
        </p>

        <div className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-4">
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Outer Boundary Consolidation:</strong> When using{" "}
                <code className="font-mono">variant=&quot;glass&quot;</code>, a single calibrated optical
                boundary is established with balanced transmission, 135° specular highlight, and contact depth.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Strictly Zero Glass Per Row:</strong> Individual feed
                items are flat and transparent. A feed with 100 activities will never generate 100 heavy
                backdrop-filter surfaces.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">100% Media &amp; Avatar Fidelity:</strong> Avatars,
                badges, and icons are never refracted, blurred, or distorted by material shaders.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Independent Focus Indicators:</strong> Interactive buttons
                and links maintain high-contrast focus rings that remain distinctly visible against translucent
                backgrounds.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Production Demonstrations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Production Demonstrations</h2>
          <span className="text-xs text-muted-foreground font-mono">4 Scenarios</span>
        </div>
        <ActivityFeedDemonstrations />
      </section>

      {/* Props & API Explorer */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API Reference &amp; Props Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Explore complete typed properties, defaults, and inherited semantic HTML attributes across all
          Activity Feed components.
        </p>
        <PropsExplorer subcomponents={ACTIVITY_FEED_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
