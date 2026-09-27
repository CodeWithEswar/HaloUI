import { Metadata } from "next";
import { AvatarPreviewStage } from "./avatar-preview-stage";
import { AvatarDemonstrations } from "./avatar-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Avatar — Data Display — HaloUI",
  description:
    "Small identity primitive presenting an entity image with graceful initials or glyph fallback, accessible badge indicators, and overlapping group stacks.",
};

const AVATAR_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'default' | 'sm' | 'lg' | 'xl'",
    default: "'default'",
    required: false,
    description: "Dimensions scale. 'sm' is 24px (size-6), 'default' is 32px (size-8), 'lg' is 40px (size-10), and 'xl' is 48px (size-12).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged with the avatar outer boundary.",
  },
];

const AVATAR_BADGE_PROPS: PropRow[] = [
  {
    name: "status",
    type: "'online' | 'away' | 'busy' | 'offline'",
    default: "undefined",
    required: false,
    description: "Semantic presence state indicator applying color token and glowing status highlight.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged with the badge element.",
  },
];

const AVATAR_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "avatar.tsx",
            type: "file",
            description: "High-fidelity identity primitive with image, fallback, badge, and group exports.",
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
        description: "Optical reflection borders and focus ring infrastructure.",
      },
    ],
  },
];

export default function AvatarDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 08
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Avatar
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Small, focused identity primitive presenting an entity image with graceful uppercase initials or glyph fallback, accessible badge indicators, and overlapping group stacks.
        </p>
      </div>

      {/* Interactive Live Preview Stage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Live Interactive Stage
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore avatar sizes, image loads, initials fallbacks, presence badges, and stacked groups across luminous backdrops.
          </p>
        </div>
        <AvatarPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Add the Avatar component directly to your repository via the shadcn CLI registry.
          </p>
        </div>
        <InstallCommand registry="avatar" />
      </section>

      {/* Media Fidelity & Optical Engine Principle */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Identity Media Fidelity
          </h2>
          <p className="text-sm text-muted-foreground">
            HaloUI design system architecture strictly protects user photographic media.
          </p>
        </div>

        <Callout title="Zero Image Distortion Guarantee">
          Unlike decorative cards and buttons, an Avatar presents human faces and entity brand marks. The optical engine never places blur, saturation distortion, or synthetic grain over user photos. Liquid glass optical effects are strictly isolated to the outer circular refraction rim (`ring-1 ring-black/10 dark:ring-white/15`) and luminous presence dots.
        </Callout>
      </section>

      {/* Demonstrations & Patterns */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Demonstrations &amp; Patterns
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive production recipes covering sizes, fallbacks, presence statuses, and stacks.
          </p>
        </div>
        <AvatarDemonstrations />
      </section>

      {/* API Reference & Props */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Configurable properties for the Avatar root and AvatarBadge subcomponents.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Avatar Root</h3>
          <PropsTable props={AVATAR_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">AvatarBadge</h3>
          <PropsTable props={AVATAR_BADGE_PROPS} />
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Accessibility &amp; WCAG 2.1 AA
          </h2>
          <p className="text-sm text-muted-foreground">
            Screen reader semantics and context-aware alternative text handling.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-4 rounded-xl border border-border bg-card/50 space-y-1.5">
            <h4 className="text-sm font-semibold text-foreground">Alternative Text (`alt`)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When the avatar stands alone or is an interactive trigger, supply an informative `alt` tag (e.g. `alt="Elena Rostova"`). When accompanied by adjacent visible text, provide decorative handling to avoid redundant speech synthesis announcements.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/50 space-y-1.5">
            <h4 className="text-sm font-semibold text-foreground">Knockout Ring Contrast</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AvatarBadge and AvatarGroup apply `ring-2 ring-background` knockouts, preventing color blending collision between overlapping images and status dots across both light and dark themes.
            </p>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Source Structure
          </h2>
          <p className="text-sm text-muted-foreground">
            Files added to your project when installing the component.
          </p>
        </div>
        <FileTree items={AVATAR_FILE_TREE} />
      </section>
    </div>
  );
}
