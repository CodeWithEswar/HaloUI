import { Metadata } from "next";
import { SkeletonPreviewStage } from "./skeleton-preview-stage";
import { SkeletonDemonstrations } from "./skeleton-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Skeleton — Feedback & Status 08 — HaloUI",
  description:
    "Content loading placeholder engineered with Subtle Liquid Glass channels, zero per-fragment backdrop filters, and vestibular reduced-motion safety.",
};

const SKELETON_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Skeleton",
    kind: "Component",
    maturity: "stable",
    description:
      "Content loading placeholder primitive representing approximate layout geometry. Engineered with subtle translucent material tones, zero per-fragment backdrop filters for high-frequency repetition, and vestibular reduced-motion safety.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "animation",
        type: "'pulse' | 'shimmer' | 'none'",
        default: "'pulse'",
        required: false,
        description:
          "Animation mode: 'pulse' (subtle opacity modulation), 'shimmer' (sweeping directional highlight), or 'none' (static placeholder).",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'plain'",
        default: "'subtle'",
        required: false,
        description:
          "Optical material depth: 'subtle' (lightweight reading channel), 'balanced' (heightened optical contrast), or 'plain' (solid base).",
      },
      {
        name: "aria-hidden",
        type: "boolean",
        default: "true",
        required: false,
        description:
          "Whether the placeholder is hidden from assistive technologies. Defaults to true to avoid announcing individual decorative layout fragments.",
      },
    ],
  },
];

const SKELETON_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "skeleton.tsx",
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

export default function SkeletonDocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Feedback &amp; Status 08
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            aria-hidden=&quot;true&quot;
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Zero Backdrop Filter
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Skeleton</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Content loading placeholder engineered with Subtle Liquid Glass channels, zero per-fragment backdrop filters, and vestibular reduced-motion safety.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <SkeletonPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Skeleton directly into your project via the HaloUI shadcn-compatible CLI registry.
        </p>
        <InstallCommand registry="skeleton" />
      </section>

      {/* Anatomy & File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Anatomy &amp; File Tree</h2>
        <p className="text-sm text-muted-foreground">
          Source files required to compose Skeleton within your design system:
        </p>
        <FileTree files={SKELETON_FILE_TREE} />
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Demonstrations &amp; Usage Scenarios</h2>
        <SkeletonDemonstrations />
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Props Reference</h2>
        <PropsExplorer components={SKELETON_SUBCOMPONENTS} />
      </section>

      {/* Accessibility & Design Contracts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Accessibility &amp; Design Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Zero Per-Fragment Backdrop Filters</h4>
            <p className="text-muted-foreground leading-relaxed">
              Engineered for high-frequency repetition across feeds, cards, and tables containing 50+ fragments. Uses translucent color channels without GPU compositor thrashing or expensive blur shaders.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Vestibular Reduced-Motion Safety</h4>
            <p className="text-muted-foreground leading-relaxed">
              Under <code className="font-mono text-xs">prefers-reduced-motion: reduce</code>, all animations (pulse and shimmer) halt immediately via <code className="font-mono text-xs">motion-reduce:animate-none</code>, providing a stable, non-distracting placeholder.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Screen Reader Isolation</h4>
            <p className="text-muted-foreground leading-relaxed">
              Defaults to <code className="font-mono text-xs">aria-hidden=&quot;true&quot;</code> to prevent assistive technologies from reading hundreds of empty visual placeholders. High-level loading regions should manage <code className="font-mono text-xs">aria-busy=&quot;true&quot;</code> at the container boundary.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Automatic Container Reflow</h4>
            <p className="text-muted-foreground leading-relaxed">
              Naturally adapts to available container width down to 240px micro-panels. Pure CSS layout with zero JavaScript window listeners or breakpoint flags.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
