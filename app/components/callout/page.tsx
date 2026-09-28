import { Metadata } from "next";
import { CalloutPreviewStage } from "./callout-preview-stage";
import { CalloutDemonstrations } from "./callout-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Callout — Feedback & Status 04 — HaloUI",
  description:
    "Contextual documentation and technical guidance callout primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and 5 semantic tones.",
};

const CALLOUT_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Callout",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for contextual documentation and technical guidance callouts. Features container query boundaries (@container/callout), subtle 10-layer liquid optical treatment, semantic tone spectrum, and Hugeicons integration.",
    inheritedProps: {
      element: "React.ComponentProps<'aside'>",
      description: "Inherits standard HTML aside attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "tone",
        type: "'note' | 'tip' | 'important' | 'warning' | 'caution'",
        default: "'note'",
        required: false,
        description:
          "Semantic tone intent: 'note' (informational guidance), 'tip' (best practice / optimization), 'important' (architectural priority), 'warning' (caveat or deprecation), or 'caution' (destructive / data loss).",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'plain'",
        default: "'subtle'",
        required: false,
        description:
          "Optical material depth: 'subtle' (reading-first liquid glass), 'balanced' (heightened contrast for standalone callouts), or 'plain' (solid, reduced transparency fallback).",
      },
      {
        name: "title",
        type: "React.ReactNode",
        required: false,
        description: "Optional heading title text. Can alternatively be passed as a <CalloutTitle> child subcomponent.",
      },
      {
        name: "icon",
        type: "React.ReactNode | false",
        required: false,
        description:
          "Custom leading icon element. If omitted, automatically renders the canonical Hugeicons icon matching the tone. Pass false to suppress.",
      },
    ],
  },
  {
    name: "CalloutTitle",
    kind: "Component",
    maturity: "stable",
    description:
      "Semantic heading element (<h5>) communicating the callout subject. Features high-contrast typography, text-balance wrapping, and zero-overflow clipping.",
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
    name: "CalloutContent",
    kind: "Component",
    maturity: "stable",
    description:
      "Body wrapper for callout text and formatted content. Features built-in styling for paragraphs, bulleted/numbered lists, inline code blocks, and hyperlinks.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Body content including paragraphs, code snippets, lists, and links.",
      },
    ],
  },
  {
    name: "CalloutIcon",
    kind: "Component",
    maturity: "stable",
    description:
      "Optional explicit leading icon primitive for fine-grained custom icon layouts.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits standard HTML span attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Icon node or glyph.",
      },
    ],
  },
];

const CALLOUT_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "callout.tsx",
            type: "file",
          },
        ],
      },
      {
        name: "icons",
        type: "directory",
        children: [
          {
            name: "halo-icon.tsx",
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

export default function CalloutDocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Feedback &amp; Status 04
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            WAI-ARIA &lt;aside&gt;
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            @container/callout
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Callout</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Contextual documentation and technical guidance callout primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and 5 semantic tones.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <CalloutPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Callout directly into your project via the HaloUI shadcn-compatible CLI registry.
        </p>
        <InstallCommand registry="callout" />
      </section>

      {/* Anatomy & File Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Anatomy &amp; File Tree</h2>
        <p className="text-sm text-muted-foreground">
          Source files required to compose Callout within your design system:
        </p>
        <FileTree files={CALLOUT_FILE_TREE} />
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Demonstrations &amp; Usage Scenarios</h2>
        <CalloutDemonstrations />
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Props Reference</h2>
        <PropsExplorer components={CALLOUT_SUBCOMPONENTS} />
      </section>

      {/* Accessibility & Design Contracts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Accessibility &amp; Design Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Semantic HTML &amp; Landmarks</h4>
            <p className="text-muted-foreground leading-relaxed">
              Renders as a semantic <code className="font-mono text-xs">&lt;aside&gt;</code> element to properly represent contextual, tangentially related notes without disrupting the main page landmark sequence.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Automatic Container Reflow</h4>
            <p className="text-muted-foreground leading-relaxed">
              Powered by pure CSS container queries (<code className="font-mono text-xs">@container/callout</code>) with zero JS event listeners. Adapts gracefully down to 240px micro-panels with zero horizontal overflow.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Reading-First Liquid Glass</h4>
            <p className="text-muted-foreground leading-relaxed">
              Defaults to Subtle Liquid Glass intensity (<code className="font-mono text-xs">backdrop-blur-md</code> with restrained specular rim) prioritizing text legibility over heavy refraction or glow.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Strict Hugeicons Only</h4>
            <p className="text-muted-foreground leading-relaxed">
              Uses exclusively <code className="font-mono text-xs">@hugeicons/core-free-icons</code> via HaloIcon. Zero dependencies on Lucide, Heroicons, or generic icon sets.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
