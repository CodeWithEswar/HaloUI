import { Metadata } from "next";
import { ItemPreviewStage } from "./item-preview-stage";
import { ItemDemonstrations } from "./item-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Item — Data Display — HaloUI",
  description:
    "Reusable list-row and content-item primitive organizing visual, textual, metadata, and action elements into a responsive, repeatable row.",
};

const ITEM_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'outline' | 'muted' | 'glass'",
    default: "'default'",
    required: false,
    description:
      "Visual framing variant: 'default' (transparent base for clean list rhythm), 'outline' (hairline border), 'muted' (tinted background), or 'glass' (luminous liquid glass surface with specular reflection and backdrop blur).",
  },
  {
    name: "size",
    type: "'default' | 'compact'",
    default: "'default'",
    required: false,
    description:
      "Density scale: 'default' (12px vertical / 14px horizontal padding) or 'compact' (8px vertical / 10px horizontal padding).",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Whether the row provides interactive hover, active, and focus-visible affordances.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "Render as a Radix Slot child element to compose directly onto consumer semantic nodes (e.g. Next.js Link or semantic <li>).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged onto the root element.",
  },
];

const ITEM_MEDIA_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'icon' | 'image'",
    default: "'default'",
    required: false,
    description:
      "Framing variant for leading media: 'default' (unframed slot for Avatar, AvatarGroup, or Checkbox), 'icon' (glyphic container with subtle background), or 'image' (framed thumbnail container).",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as Radix Slot child element.",
  },
];

const ITEM_CONTENT_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as Radix Slot child element.",
  },
];

const ITEM_TITLE_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as Radix Slot child element (e.g. <h3> or <Link>).",
  },
];

const ITEM_DESCRIPTION_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as Radix Slot child element.",
  },
];

const ITEM_ACTIONS_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as Radix Slot child element.",
  },
];

const ITEM_GROUP_PROPS: PropRow[] = [
  {
    name: "role",
    type: "string",
    default: "'list'",
    required: false,
    description: "ARIA role for the grouping container.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Render as Radix Slot child element (e.g. <ul> or <ol>).",
  },
];

const ITEM_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "item.tsx",
            type: "file",
            description: "Server Component-compatible row primitive and compound subcomponents.",
          },
        ],
      },
    ],
  },
  {
    name: "lib",
    type: "folder",
    children: [
      {
        name: "utils.ts",
        type: "file",
        description: "Shared class merging utility function (cn).",
      },
    ],
  },
];

export default function ItemDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 10
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
            Stable
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Item
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Reusable list-row and content-item primitive organizing visual, textual, metadata, and action elements into a responsive, repeatable row with liquid glass materials and strict reflow guarantees.
        </p>
      </div>

      {/* Interactive Live Preview Stage */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Live Interactive Stage
          </h2>
          <p className="text-sm text-muted-foreground">
            Test Item across 6 optical environments, responsive viewports, material variants, leading media, and trailing actions.
          </p>
        </div>
        <ItemPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Add the Item primitive to your project via the HaloUI shadcn-compatible registry CLI.
          </p>
        </div>
        <InstallCommand registry="item" />
      </section>

      {/* Anatomy & Subcomponents */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Anatomy & Subcomponents
          </h2>
          <p className="text-sm text-muted-foreground">
            Item is composed of modular, Server Component-compatible subcomponents that preserve native HTML semantics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">1. Item (Root)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Flex container organizing leading media, primary content, and trailing actions with responsive wrapping and fluid density.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">2. ItemMedia</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Leading visual slot for Avatar, AvatarGroup, glyphic icon, or image thumbnail with automatic baseline alignment.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">3. ItemContent</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Flex-column text slot enforcing strict <code className="text-[11px] font-mono bg-muted/60 px-1 py-0.5 rounded">min-w-0</code> to allow long titles and descriptions to reflow naturally.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">4. ItemActions</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Trailing action slot holding genuine interactive controls (Buttons, Switches, StatusBadges, Chevrons) without nesting invalid button-in-button events.
            </p>
          </div>
        </div>
      </section>

      {/* Architectural Boundaries */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Architectural Boundaries
          </h2>
          <p className="text-sm text-muted-foreground">
            Understanding the distinction between Item and other structural primitives in HaloUI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">Item vs Card</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Card is a standalone surface designed for self-contained content units with generous padding. Item is optimized for repeated, compact horizontal rows inside lists, feeds, and configuration panels.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">Item vs Menu Item</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Menu Item participates in composite dropdown menu semantics with roving keyboard focus. Item is pure general content structure and does not own menu state or cursor navigation.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">Item vs Table Row</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Table Row belongs to tabular, column-aligned relational data models. Item provides an organic, responsive flex reflow for entity summaries, activity feeds, and settings.
            </p>
          </div>
        </div>
      </section>

      {/* Optical Engine & Liquid Glass */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Optical Engine & Restrained Materials
          </h2>
          <p className="text-sm text-muted-foreground">
            How HaloUI avoids &quot;glass-on-glass&quot; clutter while supporting luminous row surfaces.
          </p>
        </div>

        <Callout type="note">
          By default, Item uses <code className="text-xs font-mono font-medium">variant=&quot;default&quot;</code> with a transparent base and no borders. When repeatedly rendered inside Cards or Dialogs, this preserves visual calm. To create standalone floating rows, use <code className="text-xs font-mono font-medium">variant=&quot;glass&quot;</code> for a luminous physical liquid glass surface with specular highlight and backdrop blur.
        </Callout>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Production Demonstrations
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-world compositions showing settings panels, member lists, activity feeds, and responsive reflow.
          </p>
        </div>
        <ItemDemonstrations />
      </section>

      {/* Props Specifications */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete TypeScript prop definitions for Item and all compound subcomponents.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">Item</h3>
            <PropsTable props={ITEM_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ItemMedia</h3>
            <PropsTable props={ITEM_MEDIA_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ItemContent</h3>
            <PropsTable props={ITEM_CONTENT_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ItemTitle</h3>
            <PropsTable props={ITEM_TITLE_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ItemDescription</h3>
            <PropsTable props={ITEM_DESCRIPTION_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ItemActions</h3>
            <PropsTable props={ITEM_ACTIONS_PROPS} />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">ItemGroup</h3>
            <PropsTable props={ITEM_GROUP_PROPS} />
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Installed Files
          </h2>
          <p className="text-sm text-muted-foreground">
            Directory layout when installed directly into consumer repositories.
          </p>
        </div>
        <FileTree data={ITEM_FILE_TREE} />
      </section>
    </div>
  );
}
