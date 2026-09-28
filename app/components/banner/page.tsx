import { Metadata } from "next";
import { BannerPreviewStage } from "./banner-preview-stage";
import { BannerDemonstrations } from "./banner-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Banner — Feedback & Status 03 — HaloUI",
  description:
    "Persistent page and section announcement primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and full-width or contained layout modes.",
};

const BANNER_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Banner",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for persistent page-level or section-level announcements. Encapsulates container query boundaries (@container/banner), subtle 10-layer liquid optical effects, semantic tone spectrum, and optional dismissal triggers.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'info' | 'success' | 'warning' | 'destructive'",
        default: "'default'",
        required: false,
        description:
          "Semantic tone intent: 'default' (general product announcement), 'info' (informational), 'success' (positive confirmation), 'warning' (maintenance or quota notice), or 'destructive' (critical outage notice).",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'plain'",
        default: "'subtle'",
        required: false,
        description:
          "Optical material depth: 'subtle' (canonical 10-layer liquid glass), 'balanced' (heightened diffusion for prominent ribbons), or 'plain' (solid, reduced transparency fallback).",
      },
      {
        name: "layout",
        type: "'contained' | 'full-width'",
        default: "'contained'",
        required: false,
        description:
          "Framing layout: 'contained' (rounded card with full perimeter border) or 'full-width' (edge-to-edge section ribbon with top and bottom borders only).",
      },
      {
        name: "dismissible",
        type: "boolean",
        default: "false",
        required: false,
        description: "Whether to render an accessible top-right close/dismiss button.",
      },
      {
        name: "onDismiss",
        type: "() => void",
        required: false,
        description: "Callback invoked when the user clicks the dismiss button.",
      },
      {
        name: "icon",
        type: "React.ReactNode | false",
        required: false,
        description:
          "Custom leading icon element. If omitted, automatically renders the canonical Hugeicons icon matching the variant tone. Pass false to suppress.",
      },
      {
        name: "role",
        type: "string",
        default: "'region' | 'status' | 'alert'",
        required: false,
        description:
          "WAI-ARIA landmark/live role. Defaults to 'region' with aria-label='Announcement' for persistent announcements, 'status' for warning/success, and 'alert' for destructive errors.",
      },
    ],
  },
  {
    name: "BannerTitle",
    kind: "Component",
    maturity: "stable",
    description:
      "Semantic heading element (<h5>) communicating the primary announcement subject. Features high-contrast typography, text-balance wrapping, and zero-overflow clipping.",
    inheritedProps: {
      element: "React.ComponentProps<'h5'>",
      description: "Inherits standard HTML h5 heading attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Title heading text or formatted inline elements.",
      },
    ],
  },
  {
    name: "BannerDescription",
    kind: "Component",
    maturity: "stable",
    description:
      "Body container for supporting explanatory copy, diagnostic details, and inline contextual hyperlinks.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Descriptive message body text, paragraphs, or links.",
      },
    ],
  },
  {
    name: "BannerContent",
    kind: "Component",
    maturity: "stable",
    description:
      "Coordinated title and description wrapper with responsive inline flow on wide screens and stacked flow on mobile.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "BannerTitle and BannerDescription subcomponents.",
      },
    ],
  },
  {
    name: "BannerAction",
    kind: "Component",
    maturity: "stable",
    description:
      "Container-aware action slot for contextual CTA buttons or links. Automatically reflows below text on viewports under 560px via CSS container queries.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Action controls such as HaloUI Button, outline links, or retry triggers.",
      },
    ],
  },
  {
    name: "BannerIcon",
    kind: "Component",
    maturity: "stable",
    description:
      "Optional explicit primitive wrapper for custom leading decorative iconography.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits standard HTML span attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Custom icon element (e.g. HaloIcon wrapper).",
      },
    ],
  },
];

const BANNER_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "banner.tsx",
            type: "file",
            highlight: true,
            comment: "Core Banner primitive with Subtle/Balanced Liquid Glass & reflow",
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
            comment: "Standardized Hugeicons wrapper",
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
        comment: "Semantic color, radius, and focus-ring tokens",
      },
      {
        name: "halo-material.css",
        type: "file",
        comment: "10-layer physical liquid optical foundations",
      },
    ],
  },
];

export default function BannerPage() {
  return (
    <div className="space-y-14">
      {/* HEADER SECTION */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            Feedback &amp; Status 03
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Banner
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Persistent page and section announcement primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and full-width or contained layout modes.
        </p>
      </div>

      {/* PREVIEW STAGE */}
      <BannerPreviewStage />

      {/* INSTALLATION */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="banner" />
      </section>

      {/* WHEN TO USE / WHEN NOT TO USE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border/70 bg-card/50 p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-emerald-500" />
            When to Use
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Prominent, page-level product releases or major architectural updates.</li>
            <li>Scheduled system maintenance notices spanning an entire dashboard section.</li>
            <li>Critical fleet degradation banners requiring global administrative awareness.</li>
            <li>Full-width ribbons pinned to the top of an application layout.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border/70 bg-card/50 p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-rose-500" />
            When Not to Use
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Localized inline messages next to a specific form field (use <strong>Alert</strong>).</li>
            <li>Temporary transient notifications that auto-dismiss after seconds (use <strong>Toast</strong>).</li>
            <li>Contextual explanatory notes embedded inside editorial prose (use <strong>Callout</strong>).</li>
            <li>Modal confirmation dialogs that block page execution (use <strong>Alert Dialog</strong>).</li>
          </ul>
        </div>
      </section>

      {/* ARCHITECTURAL BOUNDARIES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Architectural Boundaries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border/60 p-4 space-y-2 bg-muted/20">
            <h4 className="font-medium text-sm text-foreground">Banner vs Alert</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Banner</strong> communicates persistent notices tied to a whole page or macroscopic section. <strong>Alert</strong> communicates contextual inline feedback directly beside the specific component or form flow that produced it.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 p-4 space-y-2 bg-muted/20">
            <h4 className="font-medium text-sm text-foreground">Banner vs Toast</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Banner</strong> is part of the layout flow and remains visible until the condition changes or user dismisses it. <strong>Toast</strong> is a floating transient popup that auto-dismisses after a timer expires.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 p-4 space-y-2 bg-muted/20">
            <h4 className="font-medium text-sm text-foreground">Banner vs Callout</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Banner</strong> represents high-hierarchy announcements (maintenance, feature release, outage). <strong>Callout</strong> represents highlighted editorial notes (tips, warnings, implementation guidance) within documentation or article prose.
            </p>
          </div>
        </div>
      </section>

      {/* DEMONSTRATIONS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Production Demonstrations
        </h2>
        <BannerDemonstrations />
      </section>

      {/* PROPS EXPLORER */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            API &amp; Props Explorer
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete TypeScript interface specifications for all Banner subcomponents.
          </p>
        </div>
        <PropsExplorer components={BANNER_SUBCOMPONENTS} />
      </section>

      {/* FILE STRUCTURE */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Component Structure
        </h2>
        <FileTree items={BANNER_FILE_TREE} />
      </section>
    </div>
  );
}
