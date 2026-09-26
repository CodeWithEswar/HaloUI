import { Metadata } from "next";
import { DropdownMenuPreviewStage } from "./dropdown-menu-preview-stage";
import { DropdownMenuDemonstrations } from "./dropdown-menu-demonstrations";
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
  title: "Dropdown Menu — Overlays & Menus — HaloUI",
  description:
    "Button-triggered temporary action menu engineered with HaloUI Balanced Liquid Glass optics, roving keyboard navigation, submenus, and composite menu semantics.",
};

const DROPDOWN_MENU_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    required: false,
    description: "Preferred placement relative to the trigger. Automatically shifts or flips to avoid boundary collisions.",
  },
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    required: false,
    description: "Alignment along the anchor's cross-axis.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "6",
    required: false,
    description: "Distance in pixels between the anchor button and the floating menu container.",
  },
  {
    name: "alignOffset",
    type: "number",
    default: "0",
    required: false,
    description: "Additional offset in pixels along the alignment axis.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Physical liquid glass optical intensity governing specular highlight catch and internal reflection depth.",
  },
  {
    name: "collisionBoundary",
    type: "Boundary",
    default: "'clipping-ancestors'",
    required: false,
    description: "Element or bounding rectangle delimiting the area that the menu is confined to.",
  },
  {
    name: "collisionPadding",
    type: "number | Padding",
    default: "8",
    required: false,
    description: "Minimum clearance to maintain from viewport and boundary edges.",
  },
];

const DROPDOWN_MENU_ITEM_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'destructive'",
    default: "'default'",
    required: false,
    description: "Visual variant. Destructive applies muted danger styling for permanent actions.",
  },
  {
    name: "inset",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies left padding to align with items containing icons or checkboxes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction and automatically skips the item during roving keyboard navigation.",
  },
  {
    name: "onClick",
    type: "(event: MouseEvent) => void",
    default: "undefined",
    required: false,
    description: "Event handler executed when the item is activated via pointer click or Enter/Space keys.",
  },
];

const KEYBOARD_SHORTCUTS = [
  {
    keys: ["Enter", "Space"],
    action: "When focused on the trigger, opens the menu and focuses the first item. When focused on an item, executes its action.",
  },
  {
    keys: ["Down Arrow"],
    action: "Moves focus to the next item using roving tabindex, skipping disabled items.",
  },
  {
    keys: ["Up Arrow"],
    action: "Moves focus to the previous item, wrapping around to the bottom.",
  },
  {
    keys: ["Right Arrow"],
    action: "When focused on a SubTrigger, opens the cascading submenu and focuses its first child item.",
  },
  {
    keys: ["Left Arrow"],
    action: "When inside a submenu, closes the submenu and returns focus cleanly to its parent SubTrigger.",
  },
  {
    keys: ["Escape"],
    action: "Dismisses the active menu or submenu and restores keyboard focus to the trigger button.",
  },
  {
    keys: ["Home", "End"],
    action: "Jumps focus directly to the first or last available item in the active menu tier.",
  },
];

const DROPDOWN_MENU_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "dropdown-menu.tsx",
            type: "file",
            description: "Main Dropdown Menu component with Balanced Liquid Glass optics, submenus, checkboxes, and Base UI engine.",
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
        description: "Shared optical intensity tokens and focus indicator infrastructure.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Canonical 10-layer physical liquid glass optical engine.",
      },
    ],
  },
];

export default function DropdownMenuPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Overlays &amp; Menus · Component 08
          </span>
          <span className="inline-flex items-center rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
            Stable
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Dropdown Menu
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Button-triggered temporary action menu presenting contextual commands and choices. Engineered with HaloUI Balanced Liquid Glass optical physics, composite WAI-ARIA menu semantics, roving focus, cascading submenus, and zero backdrop dimming.
        </p>
      </div>

      {/* Interactive Live Preview Stage */}
      <DropdownMenuPreviewStage />

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install Dropdown Menu via the HaloUI shadcn-compatible registry. Source ownership distributes directly into your repository.
        </p>
        <InstallCommand registry="dropdown-menu" />
      </section>

      {/* Source Ownership Architecture */}
      <section id="source-ownership" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Source Ownership Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI treats your codebase as the permanent owner of component source code rather than locking you into closed node_modules dependencies.
        </p>
        <SourceOwnershipComparison />
      </section>

      {/* Basic Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Wrap your trigger button inside <code className="font-mono text-xs">&lt;DropdownMenu&gt;</code> and declare your action items inside <code className="font-mono text-xs">&lt;DropdownMenuContent&gt;</code>.
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52">
        <DropdownMenuItem>
          <span>Rename</span>
          <DropdownMenuShortcut>↵</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Duplicate</span>
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`}
        />
      </section>

      {/* Guidance: When to Use & When Not to Use */}
      <section id="guidance" className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Design Guidance &amp; Semantics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              When to Use Dropdown Menu
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
              <li>Table row operations, object actions, and overflow menus (More actions &middot;&middot;&middot;).</li>
              <li>User account switcher with navigation and sign-out commands.</li>
              <li>Contextual choice lists that immediately trigger operations upon selection.</li>
              <li>Cascading options with secondary submenus.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-500" />
              When Not to Use Dropdown Menu
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
              <li>Form field value selection (use <Link href="/components/select" className="text-foreground underline">Select</Link> instead).</li>
              <li>Rich contextual form editing or complex inputs (use <Link href="/components/popover" className="text-foreground underline">Popover</Link> instead).</li>
              <li>Primary application site header navigation (use <Link href="/components/navigation-menu" className="text-foreground underline">Navigation Menu</Link> instead).</li>
              <li>High-consequence modal confirmation workflows (use <Link href="/components/alert-dialog" className="text-foreground underline">Alert Dialog</Link> instead).</li>
            </ul>
          </div>
        </div>

        <Callout type="note">
          <strong>Dropdown Menu vs. Select:</strong> Dropdown Menu is designed for executing actions or commands. Select is designed for choosing a form value within a data model. Do not use Dropdown Menu as a replacement for form Select controls.
        </Callout>
      </section>

      {/* Comparisons */}
      <section id="comparisons" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dropdown Menu vs. Select vs. Popover
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          While all three components render floating overlays, each serves an entirely distinct semantic contract:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/60 bg-muted/40 font-semibold text-foreground">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Semantic Role</th>
                <th className="p-3">Keyboard Model</th>
                <th className="p-3">Primary Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-foreground">Dropdown Menu</td>
                <td className="p-3 font-mono">menu / menuitem</td>
                <td className="p-3">Roving tabindex + typeahead</td>
                <td className="p-3">Executing immediate commands or choices</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">
                  <Link href="/components/select" className="hover:underline">Select</Link>
                </td>
                <td className="p-3 font-mono">listbox / option</td>
                <td className="p-3">Arrow selection + commit value</td>
                <td className="p-3">Picking a single form field value</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">
                  <Link href="/components/popover" className="hover:underline">Popover</Link>
                </td>
                <td className="p-3 font-mono">dialog</td>
                <td className="p-3">Focus trap across inputs/buttons</td>
                <td className="p-3">Rich contextual editing and forms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sequential Interaction Flow */}
      <section id="menu-lifecycle" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Menu Composite Keyboard Lifecycle
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How HaloUI manages focus, typeahead, submenus, and dismissal:
        </p>

        <ProcessSteps
          steps={[
            {
              title: "Trigger Activation",
              description: "Pressing Space, Enter, or Down Arrow on the trigger opens the menu and positions focus on the first available item.",
            },
            {
              title: "Roving Tabindex Navigation",
              description: "Arrow keys move roving focus across items. Disabled items are bypassed automatically without breaking the focus chain.",
            },
            {
              title: "Typeahead Character Filtering",
              description: "Typing alphanumeric characters immediately jumps focus to matching item labels within the active menu tier.",
            },
            {
              title: "Item Activation & Focus Return",
              description: "Activating an action closes the menu and smoothly restores keyboard focus to the original trigger button.",
            },
          ]}
        />
      </section>

      {/* Demonstrations */}
      <section id="demonstrations" className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Component Demonstrations
        </h2>
        <DropdownMenuDemonstrations />
      </section>

      {/* Keyboard Navigation */}
      <section id="keyboard" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Dropdown Menu adheres strictly to the composite widget WAI-ARIA Menu pattern:
        </p>
        <KeyboardTable rows={KEYBOARD_SHORTCUTS} />
      </section>

      {/* Component Props */}
      <section id="props" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Component API
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            API reference for DropdownMenuContent and DropdownMenuItem.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            DropdownMenuContent Props
          </h3>
          <PropsTable rows={DROPDOWN_MENU_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            DropdownMenuItem Props
          </h3>
          <PropsTable rows={DROPDOWN_MENU_ITEM_PROPS} />
        </div>
      </section>

      {/* File Structure */}
      <section id="file-structure" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Registry File Structure
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Files distributed to consumer codebases during clean registry installation:
        </p>
        <FileTree items={DROPDOWN_MENU_FILE_TREE} />
      </section>

      {/* Related Components */}
      <section id="related-components" className="space-y-4 pt-6 border-t border-border/60">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/components/tooltip"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h4 className="text-xs font-semibold text-foreground">Tooltip</h4>
            <p className="text-xs text-muted-foreground">
              Brief contextual label and supplemental help for controls.
            </p>
          </Link>
          <Link
            href="/components/popover"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h4 className="text-xs font-semibold text-foreground">Popover</h4>
            <p className="text-xs text-muted-foreground">
              Anchored floating container for rich interactive forms.
            </p>
          </Link>
          <Link
            href="/components/select"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h4 className="text-xs font-semibold text-foreground">Select</h4>
            <p className="text-xs text-muted-foreground">
              Form control for committing a selected value from a list.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
