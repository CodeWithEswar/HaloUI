import { Metadata } from "next";
import { AvatarGroupPreviewStage } from "./avatar-group-preview-stage";
import { AvatarGroupDemonstrations } from "./avatar-group-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Avatar Group — Data Display — HaloUI",
  description:
    "Composition primitive arranging multiple Avatar components into a compact, overlapping identity cluster with automatic overflow truncation.",
};

const AVATAR_GROUP_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'default' | 'sm' | 'lg' | 'xl'",
    default: "'default'",
    required: false,
    description: "Sizing scale controlling avatar geometry and negative overlap margins: 'sm' (-6px), 'default' (-8px), 'lg' (-10px), and 'xl' (-12px).",
  },
  {
    name: "max",
    type: "number",
    default: "undefined",
    required: false,
    description: "Maximum number of visible identity avatars rendered before truncating into an overflow indicator.",
  },
  {
    name: "totalCount",
    type: "number",
    default: "undefined",
    required: false,
    description: "Total count of pool members. When provided with max, computes the remainder relative to totalCount (e.g. +97).",
  },
  {
    name: "stacking",
    type: "'last-on-top' | 'first-on-top'",
    default: "'last-on-top'",
    required: false,
    description: "Visual layering model. 'last-on-top' follows natural DOM sequence; 'first-on-top' gives lead avatars top stacking precedence.",
  },
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
    required: false,
    description: "Accessible group label describing the cluster membership context to screen readers.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged onto the flex container.",
  },
];

const AVATAR_GROUP_COUNT_PROPS: PropRow[] = [
  {
    name: "size",
    type: "'default' | 'sm' | 'lg' | 'xl'",
    default: "'default'",
    required: false,
    description: "Dimensions matching the avatar size scale.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged onto the overflow element.",
  },
];

const AVATAR_GROUP_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "avatar-group.tsx",
            type: "file",
            description: "Server Component-compatible grouping container and overflow count indicator.",
          },
          {
            name: "avatar.tsx",
            type: "file",
            description: "Canonical Avatar primitive dependency.",
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
        description: "Shared typography, spacing, and optical focus ring tokens.",
      },
    ],
  },
];

export default function AvatarGroupDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 09
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Preview
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Avatar Group
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Composition primitive arranging multiple Avatar components into a compact, overlapping identity cluster with tokenized negative margins, deterministic stacking, and automatic overflow truncation.
        </p>
      </div>

      {/* Interactive Live Preview Stage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Live Interactive Stage
          </h2>
          <p className="text-sm text-muted-foreground">
            Test size scales, maximum visible thresholds, natural vs reverse stacking, and keyboard focus unclipped ring elevation.
          </p>
        </div>
        <AvatarGroupPreviewStage />
      </section>

      {/* Architectural Principles */}
      <div className="space-y-4">
        <Callout type="note" title="Composition-First: Avatar Group Owns Geometry, Not Identity Data">
          Avatar Group does not fetch users, parse profiles, or manage presence websockets. It is a lightweight structural primitive that composes canonical <code className="text-xs font-mono">Avatar</code> components, manages overlap, handles stacking, and accurately computes overflow counts.
        </Callout>

        <Callout type="important" title="Unclipped Keyboard Focus Architecture">
          When an interactive child receives keyboard focus (e.g. Next.js <code className="text-xs font-mono">&lt;Link&gt;</code> or <code className="text-xs font-mono">&lt;button&gt;</code>), Avatar Group elevates the focused node with <code className="text-xs font-mono">z-index: 20</code>. This guarantees the 2px Halo Focus Ring is 100% visible and never sliced by adjacent sibling avatars.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Install the Avatar Group component directly into your workspace. It automatically registers its dependency on Avatar.
          </p>
        </div>
        <InstallCommand registry="avatar-group" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Compose Avatar components inside AvatarGroup. Truncation and overflow badges are handled automatically when specifying <code className="text-xs font-mono">max</code>.
          </p>
        </div>
        <CodeBlock
          language="tsx"
          filename="team-roster.tsx"
          code={`import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

export function TeamRoster() {
  return (
    <AvatarGroup max={3} aria-label="Project assignees">
      <Avatar>
        <AvatarImage src="/avatars/elena.jpg" alt="Elena Rostova" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/avatars/marcus.jpg" alt="Marcus Vance" />
        <AvatarFallback>MV</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/avatars/aria.jpg" alt="Aria Chen" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/avatars/devon.jpg" alt="Devon Thorne" />
        <AvatarFallback>DT</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}`}
        />
      </section>

      {/* Demonstrations & Patterns */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Demonstrations &amp; Patterns
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive production recipes covering sizes, truncation mathematics, stacking directions, and card integrations.
          </p>
        </div>
        <AvatarGroupDemonstrations />
      </section>

      {/* API Reference & Props */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Configurable properties for AvatarGroup and AvatarGroupCount.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">AvatarGroup</h3>
          <PropsTable props={AVATAR_GROUP_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">AvatarGroupCount</h3>
          <PropsTable props={AVATAR_GROUP_COUNT_PROPS} />
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Accessibility &amp; WCAG 2.1 AA
          </h2>
          <p className="text-sm text-muted-foreground">
            Assuring semantic correctness across grouped visual elements.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-4 rounded-xl border border-border bg-card/50 space-y-1.5">
            <h4 className="text-sm font-semibold text-foreground">Group Semantics (`role="group"`)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AvatarGroup sets <code className="text-xs font-mono">role=&quot;group&quot;</code> and accepts <code className="text-xs font-mono">aria-label</code> (e.g. <code className="text-xs font-mono">aria-label=&quot;3 reviewers&quot;</code>), granting assistive tech structured context without announcing redundant individual names.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/50 space-y-1.5">
            <h4 className="text-sm font-semibold text-foreground">Informational Overflow Badge</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The static overflow indicator (<code className="text-xs font-mono">+3</code>) is marked <code className="text-xs font-mono">aria-hidden=&quot;true&quot;</code> so screen readers rely on the parent group description rather than interpreting &quot;+3&quot; as a member name. If made interactive, compose with a real <code className="text-xs font-mono">&lt;button&gt;</code> trigger.
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
        <FileTree items={AVATAR_GROUP_FILE_TREE} />
      </section>
    </div>
  );
}
