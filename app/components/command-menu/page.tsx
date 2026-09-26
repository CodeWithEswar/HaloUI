import { Metadata } from "next";
import { CommandMenuPreviewStage } from "./command-menu-preview-stage";
import { CommandMenuDemonstrations } from "./command-menu-demonstrations";
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
  title: "Command Menu — Overlays & Menus — HaloUI",
  description:
    "Search-driven command collection surface engineered with cmdk filtering, roving keyboard navigation, HaloUI Liquid Glass optics, and zero competing engine duplication.",
};

const COMMAND_MENU_PROPS: PropRow[] = [
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "HaloUI liquid optical glass material intensity level applied to the outer container.",
  },
  {
    name: "variant",
    type: "'floating' | 'embedded'",
    default: "'floating'",
    required: false,
    description: "Visual presentation mode: floating elevated liquid glass card or embedded flat panel for sidebars and settings.",
  },
  {
    name: "value",
    type: "string",
    required: false,
    description: "Controlled search query string or selected value.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    required: false,
    description: "Callback invoked when the search query string changes.",
  },
  {
    name: "shouldFilter",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether cmdk should automatically filter items based on the search query. Set to false for server-side or custom filtering.",
  },
  {
    name: "filter",
    type: "(value: string, search: string, keywords?: string[]) => number",
    required: false,
    description: "Custom scoring function to rank matching command items. Returns a score greater than 0 for matches.",
  },
];

const COMMAND_MENU_ITEM_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    required: false,
    description: "Unique string value used for cmdk filtering and search scoring. Defaults to the item's text content.",
  },
  {
    name: "icon",
    type: "ReactNode",
    required: false,
    description: "Leading Hugeicon or icon element rendered beside the command label.",
  },
  {
    name: "description",
    type: "ReactNode",
    required: false,
    description: "Secondary supporting description displayed underneath the command title.",
  },
  {
    name: "shortcut",
    type: "string",
    required: false,
    description: "Visual keyboard shortcut badge (e.g., '⌘N', '⌥C') rendered on the trailing edge. Does not register global hotkeys.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction, dims the row, prevents Enter activation, and excludes the item from keyboard navigation.",
  },
  {
    name: "onSelect",
    type: "(value: string) => void",
    required: false,
    description: "Callback fired when the user selects this command via Enter key or mouse click.",
  },
];

const COMMAND_MENU_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "command-menu.tsx",
            type: "file",
            description: "Canonical Command Menu compound components built on cmdk with Liquid Glass optics.",
          },
          {
            name: "command.tsx",
            type: "file",
            description: "Backwards-compatible export bridge re-exporting canonical primitives.",
          },
          {
            name: "dialog.tsx",
            type: "file",
            description: "Modal dialog primitives used when composing CommandMenuDialog.",
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
        description: "Surface, border, optical highlight, and motion design tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Liquid glass optical recipes for light and dark environments.",
      },
    ],
  },
];

const COMMAND_MENU_KEYBOARD_SHORTCUTS = [
  {
    keys: ["ArrowDown"],
    action: "Moves active selection to the next enabled command item in the list.",
  },
  {
    keys: ["ArrowUp"],
    action: "Moves active selection to the previous enabled command item in the list.",
  },
  {
    keys: ["Enter"],
    action: "Executes the onSelect callback on the actively highlighted command item.",
  },
  {
    keys: ["Escape"],
    action: "Clears current search query text, or dismisses parent dialog if mounted modally.",
  },
  {
    keys: ["Home"],
    action: "Jumps active selection to the first enabled item in the list.",
  },
  {
    keys: ["End"],
    action: "Jumps active selection to the last enabled item in the list.",
  },
];

export default function CommandMenuPage() {
  return (
    <div className="space-y-12">
      {/* Title & Description */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Overlays &amp; Menus
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Component 12
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Zero Competing Engine
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Zero Scrim Non-Modal
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Command Menu
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          A search-driven command discovery and execution surface powered by{" "}
          <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">cmdk</code>,
          engineered with HaloUI Liquid Glass physical optics, roving keyboard navigation,
          logical command grouping, and zero competing engine duplication.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <CommandMenuPreviewStage />

      {/* Architectural Role Notice */}
      <Callout type="note" title="Architectural Distinction: Surface vs Launcher">
        <strong>Command Menu is the command-search interaction surface itself.</strong> It owns query input,
        local fuzzy filtering via cmdk, active row navigation, and command execution callbacks. It can be used
        standalone embedded in sidebars or floating cards. <strong>Command Palette</strong>, by contrast, is a
        higher-level application launcher pattern that mounts Command Menu inside a modal Dialog with backdrop
        scrim and binds global hotkeys (Cmd/Ctrl + K).
      </Callout>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Command Menu directly into your project via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="command-menu" />
      </div>

      {/* Source Ownership Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Source Ownership Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Command Menu installs directly into your repository as clean TypeScript and Tailwind CSS source code,
          allowing complete customization without upstream package locks.
        </p>

        <SourceOwnershipComparison />
      </div>

      {/* Visual Comparison Table */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          When to Use Command Menu vs Other Components
        </h3>
        <div className="overflow-x-auto rounded-xl border border-border/50">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/50 bg-muted/30 text-muted-foreground">
              <tr>
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Primary Purpose</th>
                <th className="p-3 font-semibold">Interaction Trigger</th>
                <th className="p-3 font-semibold">Data &amp; Semantics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              <tr>
                <td className="p-3 font-medium">Command Menu</td>
                <td className="p-3 text-muted-foreground">Search, filter, and execute executable actions</td>
                <td className="p-3 text-muted-foreground">Keyboard search input or embedded tool list</td>
                <td className="p-3 text-muted-foreground">Executable commands &amp; callbacks</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Dropdown Menu</td>
                <td className="p-3 text-muted-foreground">Small structured action menu from a button</td>
                <td className="p-3 text-muted-foreground">Trigger button click or hover</td>
                <td className="p-3 text-muted-foreground">Fixed list of contextual actions</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Select / Native Select</td>
                <td className="p-3 text-muted-foreground">Choose a single value from options</td>
                <td className="p-3 text-muted-foreground">Form select control</td>
                <td className="p-3 text-muted-foreground">Form state (string / enum)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Combobox</td>
                <td className="p-3 text-muted-foreground">Filter and pick a specific data option</td>
                <td className="p-3 text-muted-foreground">Searchable input field</td>
                <td className="p-3 text-muted-foreground">Selected entity or form data value</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Command Pipeline Workflow */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Command Interaction Pipeline
        </h2>
        <p className="text-sm text-muted-foreground">
          HaloUI reuses <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">cmdk</code> to
          power the command pipeline without introducing duplicate algorithms:
        </p>

        <ProcessSteps
          steps={[
            {
              title: "1. Query Input & State",
              description: "The user enters characters into CommandMenuInput. Query state updates smoothly without causing layout shifts or full tree re-renders.",
            },
            {
              title: "2. cmdk Scoring & Ranking",
              description: "Underlying cmdk engine performs character-level fuzzy substring matching and scoring, hiding non-matching items and empty groups automatically.",
            },
            {
              title: "3. Roving Keyboard Focus",
              description: "ArrowUp and ArrowDown navigate composite focus through visible items, synchronizing data-selected without triggering browser scroll jumps.",
            },
            {
              title: "4. Execution Callback",
              description: "Pressing Enter or clicking executes onSelect. If embedded, the surface remains; if inside a dialog, the consumer handles dismissal.",
            },
          ]}
        />
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage Examples
        </h2>
        <p className="text-sm text-muted-foreground">
          Basic floating implementation with grouped commands, icons, and keyboard shortcuts:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  CommandMenu,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuSeparator,
} from "@/components/ui/command-menu";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Folder01Icon, UserAdd01Icon, Settings02Icon } from "@hugeicons/core-free-icons";

export function QuickCommandMenu() {
  return (
    <CommandMenu intensity="balanced" className="w-full max-w-lg">
      <CommandMenuInput placeholder="Type a command or search..." />
      <CommandMenuList>
        <CommandMenuEmpty>No matching commands found.</CommandMenuEmpty>

        <CommandMenuGroup heading="Workspace">
          <CommandMenuItem
            icon={<HaloIcon icon={Folder01Icon} size={15} />}
            shortcut="⌘N"
            onSelect={() => console.log("New project")}
          >
            Create New Project
          </CommandMenuItem>
          <CommandMenuItem
            icon={<HaloIcon icon={UserAdd01Icon} size={15} />}
            shortcut="⌘I"
            onSelect={() => console.log("Invite")}
          >
            Invite Members
          </CommandMenuItem>
        </CommandMenuGroup>

        <CommandMenuSeparator />

        <CommandMenuGroup heading="Preferences">
          <CommandMenuItem
            icon={<HaloIcon icon={Settings02Icon} size={15} />}
            shortcut="⌘,"
            onSelect={() => console.log("Settings")}
          >
            Workspace Settings
          </CommandMenuItem>
        </CommandMenuGroup>
      </CommandMenuList>
    </CommandMenu>
  );
}`}
        />
      </div>

      {/* Demonstrations Suite */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Capabilities &amp; Demonstrations
        </h2>
        <CommandMenuDemonstrations />
      </div>

      {/* Liquid Material Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Liquid Glass Optical Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In strict compliance with HaloUI master design guidelines, Liquid Glass is applied at the outer container level only:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs text-muted-foreground leading-relaxed pl-2">
          <li>
            <strong className="text-foreground">Single Coherent Surface:</strong> The outer container carries the frosted
            diffusion, specular edge highlight, and ambient contact shadow.
          </li>
          <li>
            <strong className="text-foreground">Restrained Command Rows:</strong> Command items do NOT render separate glass cards.
            Active items use a lightweight state highlight layer (<code className="font-mono text-foreground">data-selected:bg-muted</code>)
            to preserve 60fps rendering and optical restraint.
          </li>
          <li>
            <strong className="text-foreground">No Scrim on Non-Modal Menus:</strong> When used as a standalone or floating menu,
            Command Menu owns strictly zero backdrop scrim or page dimming.
          </li>
          <li>
            <strong className="text-foreground">No Global Hotkey Registration:</strong> Displaying a shortcut badge (e.g., <code className="font-mono text-foreground">⌘N</code>)
            is presentational. The component does not intercept global window keydown events.
          </li>
        </ul>
      </div>

      {/* Keyboard Interaction */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <p className="text-sm text-muted-foreground">
          Command Menu provides robust, accessible keyboard navigation adhering to WAI-ARIA combobox patterns:
        </p>
        <KeyboardTable rows={COMMAND_MENU_KEYBOARD_SHORTCUTS} />
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Command Menu satisfies modern accessibility criteria without requiring application-level overrides:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">ARIA Combobox &amp; Listbox</h4>
            <p className="text-muted-foreground leading-relaxed">
              cmdk manages <code className="font-mono text-foreground">role="combobox"</code>, <code className="font-mono text-foreground">aria-expanded</code>,
              and <code className="font-mono text-foreground">aria-activedescendant</code> automatically, announcing active command labels to screen readers.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Disabled Safety</h4>
            <p className="text-muted-foreground leading-relaxed">
              Disabled commands apply <code className="font-mono text-foreground">data-disabled="true"</code>, are skipped by keyboard arrow roving,
              and ignore Enter or click triggers.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Color Contrast</h4>
            <p className="text-muted-foreground leading-relaxed">
              Text labels maintain 7:1 (Light) and 8.5:1 (Dark) contrast against container glass backgrounds, comfortably surpassing WCAG AAA.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Focus Visibility</h4>
            <p className="text-muted-foreground leading-relaxed">
              Active command rows render clear visual selection backgrounds without requiring high-contrast focus rings that disrupt scrolling.
            </p>
          </div>
        </div>
      </div>

      {/* Component Props */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Essential configuration options for CommandMenu and its compound children:
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">CommandMenu Props</h3>
          <PropsTable rows={COMMAND_MENU_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">CommandMenuItem Props</h3>
          <PropsTable rows={COMMAND_MENU_ITEM_PROPS} />
        </div>
      </div>

      {/* File Structure */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <p className="text-sm text-muted-foreground">
          Files installed into consumer repositories when adding the command-menu component:
        </p>
        <FileTree items={COMMAND_MENU_FILES} />
      </div>

      {/* Related Components */}
      <div className="space-y-4 border-t border-border/40 pt-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/components/dropdown-menu"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Dropdown Menu
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Button-triggered contextual action lists and menus.
            </p>
          </Link>
          <Link
            href="/components/submenu"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Submenu
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Shared nested menu branches with hover grace corridors.
            </p>
          </Link>
          <Link
            href="/components/command-palette"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Command Palette
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Modal application launcher with ⌘K hotkey orchestration.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
