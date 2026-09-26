import { Metadata } from "next";
import { SubmenuPreviewStage } from "./submenu-preview-stage";
import { SubmenuDemonstrations } from "./submenu-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";
import { KeyboardTable } from "@/components/mdx/keyboard-table";
import { ProcessSteps } from "@/components/mdx/process-steps";
import { SourceOwnershipComparison } from "@/components/mdx/docs-visuals";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submenu — Overlays & Menus — HaloUI",
  description:
    "Shared nested menu branch infrastructure engineered with HaloUI Balanced Liquid Glass optics, triangular hover grace corridors, boundary collision flipping, and WAI-ARIA arrow navigation.",
};

const SUBMENU_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'right' | 'left' | 'top' | 'bottom' | 'inline-end' | 'inline-start'",
    default: "'right'",
    required: false,
    description: "Preferred expansion side relative to the SubmenuTrigger. Flips automatically upon approaching viewport edges.",
  },
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    required: false,
    description: "Alignment along the secondary axis relative to the trigger menu item.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "4",
    required: false,
    description: "Distance in pixels between the trigger item and the nested submenu container.",
  },
  {
    name: "alignOffset",
    type: "number",
    default: "-4",
    required: false,
    description: "Pixel offset along the alignment axis to ensure seamless optical row continuity.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Physical liquid glass optical intensity matching the parent menu container.",
  },
];

const SUBMENU_TRIGGER_PROPS: PropRow[] = [
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables expansion, suppresses hover triggers, and skips the item during keyboard navigation.",
  },
  {
    name: "inset",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies left padding to align with items containing icons or checkboxes.",
  },
];

const SUBMENU_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "submenu.tsx",
            type: "file",
            description: "Shared Submenu compound components aliasing parent menu sub-primitives.",
          },
          {
            name: "dropdown-menu.tsx",
            type: "file",
            description: "Hosts DropdownMenuSub, DropdownMenuSubTrigger, and DropdownMenuSubContent.",
          },
          {
            name: "context-menu.tsx",
            type: "file",
            description: "Hosts ContextMenuSub, ContextMenuSubTrigger, and ContextMenuSubContent.",
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
        name: "halo-material.css",
        type: "file",
        description: "Shared 10-layer physical optical engine tokens and intensity classes.",
      },
    ],
  },
];

const SUBMENU_KEYBOARD_SHORTCUTS = [
  {
    keys: ["ArrowRight"],
    action: "Expands the focused SubmenuTrigger and moves composite focus to the first child item.",
  },
  {
    keys: ["ArrowLeft"],
    action: "Collapses the active submenu and returns composite focus to the parent SubmenuTrigger.",
  },
  {
    keys: ["ArrowDown", "ArrowUp"],
    action: "Navigates between sibling items within the active submenu branch with roving tabindex.",
  },
  {
    keys: ["Escape"],
    action: "Closes the current nested submenu branch without destroying the entire parent menu tree.",
  },
  {
    keys: ["Enter", "Space"],
    action: "When focused on a SubmenuTrigger, opens the submenu; when focused on a child item, activates the command.",
  },
];

export default function SubmenuDocsPage() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Overlays &amp; Menus · Component 11
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Shared Menu Infrastructure
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Zero Scrim Non-Modal
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Submenu
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Shared nested menu branch infrastructure engineered with HaloUI Balanced Liquid Glass optics, triangular hover grace corridors, boundary collision flipping, and WAI-ARIA arrow navigation.
        </p>
      </div>

      {/* Live Preview Stage */}
      <SubmenuPreviewStage />

      {/* Architectural Role Notice */}
      <Callout type="note" title="Shared Menu Infrastructure Architecture">
        <strong>Submenu is not an independent floating menu engine.</strong> It exists as a nested extension within established parent menus (<Link href="/components/dropdown-menu" className="underline underline-offset-4">Dropdown Menu</Link>, <Link href="/components/context-menu" className="underline underline-offset-4">Context Menu</Link>, and <Link href="/components/menubar" className="underline underline-offset-4">Menubar</Link>). All submenus share identical Liquid Glass optical tokens, triangular pointer grace, and roving keyboard navigation.
      </Callout>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install Submenu directly via the HaloUI registry. It provides the shared compound primitives and integrates with your installed parent menus.
        </p>

        <InstallCommand registry="submenu" />
      </section>

      {/* Source Ownership Architecture */}
      <section id="source-ownership" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Source Ownership Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Submenu installs directly into your project as pure TypeScript and Tailwind CSS source code, allowing complete customization of animations and spacing.
        </p>

        <SourceOwnershipComparison />
      </section>

      {/* Invocation Lifecycle */}
      <section id="lifecycle" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interaction &amp; Pointer Grace Lifecycle
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How Submenu coordinates triangular hover corridors, collision boundary detection, and keyboard transitions between parent and child menus.
        </p>

        <ProcessSteps
          steps={[
            {
              title: "Trigger Focus & Hover Detection",
              description:
                "Hovering over or focusing on a SubmenuTrigger activates the branch timer without triggering sudden UI layout shifts.",
            },
            {
              title: "Triangular Pointer Grace Corridor",
              description:
                "Base UI calculates an invisible dynamic polygon corridor between the cursor and the child menu, preventing accidental dismissal while crossing adjacent rows.",
            },
            {
              title: "Collision & Boundary Flipping",
              description:
                "If the nested flyout approaches the right viewport boundary, the positioner automatically flips expansion to the left (inline-start) axis.",
            },
            {
              title: "Composite Focus Transfer & Escape Handling",
              description:
                "Pressing ArrowRight or clicking transfers focus to child items. Pressing Escape or ArrowLeft closes the child branch and safely returns focus to the parent trigger.",
            },
          ]}
        />
      </section>

      {/* Usage Guidelines */}
      <section id="guidelines" className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage Guidelines: When to Use Submenus
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
            <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              Appropriate Submenu Patterns
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                <strong className="text-foreground">Related secondary choices:</strong> Grouping file export options (e.g., Export &gt; PNG, SVG, PDF) or sharing destinations.
              </li>
              <li>
                <strong className="text-foreground">Shallow nesting (1–2 levels):</strong> Keeping command hierarchies clear and scannable without requiring high mouse precision.
              </li>
              <li>
                <strong className="text-foreground">Desktop productivity tools:</strong> Menubars, IDE context menus, and vector editor inspectors.
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
            <h3 className="text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <span className="size-2 rounded-full bg-rose-500" />
              Patterns to Avoid
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                <strong className="text-foreground">Deeply nested trees (3+ levels):</strong> Cascading cascades require extreme fine-motor dexterity and easily trigger accidental dismissals.
              </li>
              <li>
                <strong className="text-foreground">Mobile touch interfaces:</strong> Submenus are difficult to navigate on narrow touchscreens. Prefer a flat list or mobile <Link href="/components/drawer" className="underline underline-offset-4">Drawer</Link>.
              </li>
              <li>
                <strong className="text-foreground">Complex forms:</strong> Do not place form inputs inside nested submenus. Use <Link href="/components/popover" className="underline underline-offset-4">Popover</Link> instead.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Demonstrations */}
      <SubmenuDemonstrations />

      {/* Optical Consistency */}
      <section id="optics" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Optical Consistency: Balanced Liquid Glass
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Submenu containers reuse the same Balanced Liquid Glass optical recipe as parent menus. Optical depth remains uniform across nesting levels to prevent visual clutter and illegibility.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-semibold text-foreground">Equal Material Intensity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Nested menus maintain the identical Balanced recipe without progressively amplifying blur, brightness, or specular reflection.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-semibold text-foreground">Zero Scrim Mandate</h3>
            <p className="text-muted-foreground leading-relaxed">
              Submenus strictly avoid background scrims or dimming layers. The underlying document and parent menus remain crisp and visible.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-semibold text-foreground">Triangular Pointer Corridor</h3>
            <p className="text-muted-foreground leading-relaxed">
              Diagonal cursor transit across neighboring parent rows is protected by Base UI&apos;s pointer grace calculation, eliminating premature closes.
            </p>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section id="files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed File Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The Submenu component connects shared aliases directly to your existing menu primitives.
        </p>

        <FileTree items={SUBMENU_FILES} />
      </section>

      {/* Keyboard Navigation */}
      <section id="keyboard" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keyboard Navigation Specification
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Complies with WAI-ARIA Menu specifications for nested submenus with full arrow-key traversal and non-destructive Escape behavior.
        </p>

        <KeyboardTable rows={SUBMENU_KEYBOARD_SHORTCUTS} />
      </section>

      {/* Props Reference */}
      <section id="props" className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Component API Reference
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Essential configuration options for SubmenuContent and SubmenuTrigger.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            SubmenuContent Props
          </h3>
          <PropsTable rows={SUBMENU_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            SubmenuTrigger Props
          </h3>
          <PropsTable rows={SUBMENU_TRIGGER_PROPS} />
        </div>
      </section>

      {/* Related Components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <Link
            href="/components/dropdown-menu"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h3 className="font-semibold text-foreground">Dropdown Menu</h3>
            <p className="text-muted-foreground">Button-triggered contextual action menu with visible affordance.</p>
          </Link>
          <Link
            href="/components/context-menu"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h3 className="font-semibold text-foreground">Context Menu</h3>
            <p className="text-muted-foreground">Secondary-click and long-press contextual action surface.</p>
          </Link>
          <Link
            href="/components/menubar"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h3 className="font-semibold text-foreground">Menubar</h3>
            <p className="text-muted-foreground">Persistent desktop application command bar.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
