import { Metadata } from "next";
import { FeatureCardPreviewStage } from "./feature-card-preview-stage";
import { FeatureCardDemonstrations } from "./feature-card-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Feature Card — Data Display — HaloUI",
  description:
    "Opinionated feature and capability communication surface presenting a visual identifier, title, concise description, supporting highlights, and optional actions.",
};

const FEATURE_CARD_PROPS: PropRow[] = [
  {
    name: "orientation",
    type: "'vertical' | 'horizontal'",
    default: "'vertical'",
    required: false,
    description: "Layout arrangement of the feature presentation. 'horizontal' aligns visual, description, and action into a responsive inline row.",
  },
  {
    name: "size",
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    required: false,
    description: "Sizing scale controlling internal card padding, visual container scale, and typography hierarchy.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'subtle'",
    required: false,
    description: "Optical material intensity inherited from Card. Defaults to 'subtle' for peak rendering speed in dense 12+ card feature grids.",
  },
  {
    name: "variant",
    type: "'default' | 'subtle' | 'outline' | 'elevated' | 'ghost'",
    default: "'default'",
    required: false,
    description: "Surface boundary styling. 'outline' provides a clean structural 1px border with zero blur overhead.",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Enables hover lifting, cursor pointer, and keyboard focus states when the card serves as a whole-card navigation target.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Passes props directly to a Radix Slot child element (e.g. Next.js Link or anchor element) for semantic navigation.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged with the Card tokens.",
  },
];

const FEATURE_CARD_VISUAL_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'muted' | 'media'",
    default: "'default'",
    required: false,
    description: "Visual container styling. 'media' isolates screenshots and code previews from parent glass filters.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders visual slot onto a child node via Radix Slot.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes applied to the container.",
  },
];

const FEATURE_CARD_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "feature-card.tsx",
            type: "file",
            description: "Server Component-compatible FeatureCard surface built directly on Card architecture.",
          },
          {
            name: "card.tsx",
            type: "file",
            description: "Base content surface defining boundary, geometry, and material tokens.",
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
            description: "Hugeicons icon wrapper standardizing stroke and sizing scales.",
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
        description: "Shared typography, spacing, and optical border tokens.",
      },
    ],
  },
];

export default function FeatureCardDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 05
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Feature Card
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Opinionated feature and capability communication surface presenting a visual identifier, title, concise description, supporting highlights, and optional actions.
        </p>
      </div>

      {/* Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <FeatureCardPreviewStage />
      </section>

      {/* Architecture Guidance */}
      <div className="space-y-4">
        <Callout type="note" title="Capability Communication — Not Marketing Clutter">
          Feature Card specializes Card specifically for communicating what a product or system does and why it matters. It does NOT own section layouts, hero banners, pricing toggles, CMS fetching, or analytics tracking.
        </Callout>

        <Callout type="important" title="Media Fidelity & Isolated Glass Material">
          HaloUI liquid optical effects belong exclusively to the surrounding Card boundary. The <code className="text-xs font-mono">FeatureCardVisual variant=&quot;media&quot;</code> slot isolates screenshots, diagrams, and code snippets with zero parent blur or specular refraction distortion.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="feature-card" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="feature-card-example.tsx"
          code={`import {
  FeatureCard,
  FeatureCardVisual,
  FeatureCardTitle,
  FeatureCardDescription,
  FeatureCardContent,
  FeatureCardAction,
} from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Shield01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function SecurityFeature() {
  return (
    <FeatureCard className="max-w-sm">
      <FeatureCardVisual>
        <HaloIcon icon={Shield01Icon} size={20} />
      </FeatureCardVisual>

      <div className="space-y-1.5">
        <FeatureCardTitle>Hardware-Enforced Enclaves</FeatureCardTitle>
        <FeatureCardDescription>
          Cryptographic memory isolation shields sensitive execution states even from privileged host kernel inspection.
        </FeatureCardDescription>
      </div>

      <FeatureCardAction>
        <Button size="sm" variant="outline" className="gap-1.5">
          <span>Read whitepaper</span>
          <HaloIcon icon={ArrowRight01Icon} size={14} />
        </Button>
      </FeatureCardAction>
    </FeatureCard>
  );
}`}
        />
      </section>

      {/* Component Boundaries & Scope */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component Boundaries & Scope
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-foreground font-medium border-b border-border">
              <tr>
                <th className="p-3">Component / Pattern</th>
                <th className="p-3">Primary Responsibility</th>
                <th className="p-3">Scope Boundary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Card</td>
                <td className="p-3">General content surface establishing boundary and material</td>
                <td className="p-3">No feature-specific hierarchy or visual slots</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Feature Card</td>
                <td className="p-3">Capability &amp; benefit communication (Visual, Title, Description, Action)</td>
                <td className="p-3">No grid spanning logic, page headers, or pricing states</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Bento Grid</td>
                <td className="p-3">Layout pattern coordinating multiple cards across asymmetrical columns</td>
                <td className="p-3">Parent grid owns placement; FeatureCard owns internal card content</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Marketing Section</td>
                <td className="p-3">Page-level section with headings, CTAs, and background treatments</td>
                <td className="p-3">FeatureCard is one child component inside the section</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Anatomy & Information Hierarchy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy &amp; Information Hierarchy
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-foreground font-medium border-b border-border">
              <tr>
                <th className="p-3">Subcomponent</th>
                <th className="p-3">Role &amp; Semantic Element</th>
                <th className="p-3">Guidance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-mono text-xs text-foreground">FeatureCardVisual</td>
                <td className="p-3">Slot for iconography or preview fragment</td>
                <td className="p-3">Restrained container. Avoids distracting glowing orbs or neon blurs.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs text-foreground">FeatureCardTitle</td>
                <td className="p-3">Heading tag (<code className="text-xs font-mono">h3</code> default)</td>
                <td className="p-3">Concise capability title. Consumer owns copy; component enforces no marketing jargon.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs text-foreground">FeatureCardDescription</td>
                <td className="p-3">Paragraph (<code className="text-xs font-mono">p</code> or <code className="text-xs font-mono">div</code>)</td>
                <td className="p-3">Explains why the feature matters. Supports natural multi-line wrapping.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs text-foreground">FeatureCardContent</td>
                <td className="p-3">Supplementary highlight container</td>
                <td className="p-3">Optional bullet points, SLA tags, or badges. Never forces artificial height.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs text-foreground">FeatureCardAction</td>
                <td className="p-3">Action slot (<code className="text-xs font-mono">Button</code> or <code className="text-xs font-mono">Link</code>)</td>
                <td className="p-3">Real interactive semantics. Never creates clickable <code className="text-xs font-mono">div</code> elements.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations &amp; QA Scenarios
        </h2>
        <FeatureCardDemonstrations />
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            FeatureCard
          </h3>
          <PropsTable props={FEATURE_CARD_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">
            FeatureCardVisual
          </h3>
          <PropsTable props={FEATURE_CARD_VISUAL_PROPS} />
        </div>
      </section>

      {/* Installed Files */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree data={FEATURE_CARD_FILE_TREE} />
      </section>

      {/* Accessibility & Performance */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility &amp; Performance
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Zero Client JavaScript:</strong> <code className="text-xs font-mono">components/ui/feature-card.tsx</code> is a 100% Server Component with zero React state, effect, or event hooks.
            </li>
            <li>
              <strong className="text-foreground">Static Card Restraint:</strong> Static cards have <code className="text-xs font-mono">interactive=&#123;false&#125;</code> and will not receive keyboard focus, pointer cursors, or hover lifting.
            </li>
            <li>
              <strong className="text-foreground">Whole-Card Navigation:</strong> When marked interactive, the card composes genuine semantic anchor tags via Radix <code className="text-xs font-mono">asChild</code>, ensuring native keyboard activation and screen reader link roles.
            </li>
            <li>
              <strong className="text-foreground">Calm Grid Rendering:</strong> Defaulting to <code className="text-xs font-mono">intensity=&quot;subtle&quot;</code> ensures high framerates and clean layout stability across large 12–24 card grids.
            </li>
            <li>
              <strong className="text-foreground">WCAG 2.1 AA Compliance:</strong> Contrast ratios for titles, descriptions, and icon containers meet or exceed AA standards across Light and Dark themes.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
