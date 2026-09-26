"use client";

import * as React from "react";
import {
  CommandPalette,
  CommandPaletteDialog,
  CommandPaletteTrigger,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteSeparator,
  CommandPaletteShortcut,
} from "@/components/ui/command-palette";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  DashboardSquare01Icon,
  Folder01Icon,
  Analytics01Icon,
  SparklesIcon,
  UserAdd01Icon,
  Settings02Icon,
  Search01Icon,
  SecurityLockIcon,
  Mail01Icon,
  Notification01Icon,
  HelpCircleIcon,
  Download01Icon,
} from "@hugeicons/core-free-icons";
import { Callout } from "@/components/mdx/callout";

export function CommandPaletteDemonstrations() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [filterQuery, setFilterQuery] = React.useState("");
  const [executedAction, setExecutedAction] = React.useState<string | null>(null);

  return (
    <div className="space-y-16">
      {/* 1. Modal Launcher with Trigger */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Modal Launcher with Trigger &amp; ⌘K
          </h3>
          <p className="text-sm text-muted-foreground">
            A discoverable pointer trigger paired with a deterministic keyboard shortcut. Activating a command executes its callback and automatically closes the dialog.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-border/60 bg-muted/20">
          <div className="flex flex-col items-center gap-4 text-center max-w-sm">
            <CommandPaletteTrigger
              onClick={() => setModalOpen(true)}
              label="Search commands or destinations..."
              shortcut="⌘K"
            />
            <span className="text-xs text-muted-foreground">
              Try pressing <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">⌘K</kbd> or clicking the launcher above.
            </span>
          </div>

          <CommandPaletteDialog
            open={modalOpen}
            onOpenChange={setModalOpen}
            intensity="balanced"
          >
            <CommandPaletteInput placeholder="Search commands or destinations..." />
            <CommandPaletteList>
              <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
              <CommandPaletteGroup heading="Navigation">
                <CommandPaletteItem
                  icon={<HaloIcon icon={DashboardSquare01Icon} size={16} />}
                  shortcut="⌘D"
                  onSelect={() => setExecutedAction("Navigated: Dashboard")}
                >
                  Go to Dashboard
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={Folder01Icon} size={16} />}
                  shortcut="⌘P"
                  onSelect={() => setExecutedAction("Navigated: Projects")}
                >
                  Open Projects
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={Analytics01Icon} size={16} />}
                  shortcut="⌘A"
                  onSelect={() => setExecutedAction("Navigated: Analytics")}
                >
                  View Analytics
                </CommandPaletteItem>
              </CommandPaletteGroup>
              <CommandPaletteSeparator />
              <CommandPaletteGroup heading="Actions">
                <CommandPaletteItem
                  icon={<HaloIcon icon={SparklesIcon} size={16} />}
                  shortcut="⌘N"
                  onSelect={() => setExecutedAction("Action: Create project")}
                >
                  Create project
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={UserAdd01Icon} size={16} />}
                  shortcut="⌘I"
                  onSelect={() => setExecutedAction("Action: Invite member")}
                >
                  Invite member
                </CommandPaletteItem>
              </CommandPaletteGroup>
            </CommandPaletteList>
          </CommandPaletteDialog>
        </div>

        {executedAction && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400">
            Fired single execution: <strong>{executedAction}</strong>
          </div>
        )}
      </section>

      {/* 2. Embedded In-Page Surface */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Embedded In-Page Surface
          </h3>
          <p className="text-sm text-muted-foreground">
            Command Palette also functions as an inline launcher embedded directly into dashboards, documentation portals, or contextual tools without a modal portal.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20">
          <CommandPalette intensity="subtle" className="max-w-xl mx-auto shadow-lg">
            <CommandPaletteInput placeholder="Search preferences &amp; tools..." />
            <CommandPaletteList>
              <CommandPaletteEmpty>No matching preferences.</CommandPaletteEmpty>
              <CommandPaletteGroup heading="Preferences">
                <CommandPaletteItem
                  icon={<HaloIcon icon={Settings02Icon} size={16} />}
                  description="Theme, language, and regional formats"
                  shortcut="⌘,"
                >
                  System Preferences
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={SecurityLockIcon} size={16} />}
                  description="API tokens, SSH keys, and 2FA settings"
                >
                  Security &amp; Credentials
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={Notification01Icon} size={16} />}
                  description="Email, desktop notifications, and webhooks"
                >
                  Notification Channels
                </CommandPaletteItem>
              </CommandPaletteGroup>
            </CommandPaletteList>
          </CommandPalette>
        </div>
      </section>

      {/* 3. Deterministic Query Filtering & Empty State */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Query Filtering &amp; Empty State
          </h3>
          <p className="text-sm text-muted-foreground">
            Instant local filtering powered by the underlying cmdk engine. When no commands match the current query, a semantic empty state renders without treating it as an error.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20">
          <CommandPalette intensity="balanced" className="max-w-xl mx-auto">
            <CommandPaletteInput
              placeholder="Try typing 'xyz' or 'project'..."
              value={filterQuery}
              onValueChange={setFilterQuery}
            />
            <CommandPaletteList>
              <CommandPaletteEmpty>
                No commands matching &ldquo;{filterQuery}&rdquo;. Try another term.
              </CommandPaletteEmpty>

              <CommandPaletteGroup heading="Navigation">
                <CommandPaletteItem
                  value="Dashboard"
                  icon={<HaloIcon icon={DashboardSquare01Icon} size={16} />}
                >
                  Go to Dashboard
                </CommandPaletteItem>
                <CommandPaletteItem
                  value="Projects"
                  icon={<HaloIcon icon={Folder01Icon} size={16} />}
                >
                  Open Projects
                </CommandPaletteItem>
                <CommandPaletteItem
                  value="Analytics"
                  icon={<HaloIcon icon={Analytics01Icon} size={16} />}
                >
                  View Analytics
                </CommandPaletteItem>
              </CommandPaletteGroup>

              <CommandPaletteSeparator />

              <CommandPaletteGroup heading="Actions">
                <CommandPaletteItem
                  value="Create project"
                  icon={<HaloIcon icon={SparklesIcon} size={16} />}
                >
                  Create project
                </CommandPaletteItem>
                <CommandPaletteItem
                  value="Invite member"
                  icon={<HaloIcon icon={UserAdd01Icon} size={16} />}
                >
                  Invite member
                </CommandPaletteItem>
              </CommandPaletteGroup>
            </CommandPaletteList>
          </CommandPalette>
        </div>
      </section>

      {/* 4. Active Command vs Focus State */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Active Command vs Input Focus
          </h3>
          <p className="text-sm text-muted-foreground">
            Command Palette maintains visual clarity between keyboard input focus and the active command. Navigating with <kbd className="font-mono text-xs">↓</kbd> / <kbd className="font-mono text-xs">↑</kbd> updates the active item using the accessible active-descendant model while DOM focus stays in the search field. Hovering over items updates active state but never triggers execution.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20">
          <CommandPalette intensity="balanced" className="max-w-xl mx-auto">
            <CommandPaletteInput placeholder="Use arrow keys to navigate..." />
            <CommandPaletteList>
              <CommandPaletteGroup heading="Active State Demonstration">
                <CommandPaletteItem
                  icon={<HaloIcon icon={DashboardSquare01Icon} size={16} />}
                  description="Use Arrow Down to select"
                >
                  Item 1: Go to Dashboard
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={Folder01Icon} size={16} />}
                  description="Liquid subtle hover/active highlight"
                >
                  Item 2: Open Projects
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={Analytics01Icon} size={16} />}
                  description="Distinguishable from input focus ring"
                >
                  Item 3: View Analytics
                </CommandPaletteItem>
              </CommandPaletteGroup>
            </CommandPaletteList>
          </CommandPalette>
        </div>
      </section>

      {/* 5. Disabled Commands */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Disabled Commands
          </h3>
          <p className="text-sm text-muted-foreground">
            Disabled commands communicate unavailable options (e.g. insufficient permissions or unsupported context). They cannot be activated via Enter or click and are skipped during keyboard navigation.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20">
          <CommandPalette intensity="subtle" className="max-w-xl mx-auto">
            <CommandPaletteInput placeholder="Search commands..." />
            <CommandPaletteList>
              <CommandPaletteGroup heading="Permissions &amp; Roles">
                <CommandPaletteItem
                  icon={<HaloIcon icon={Mail01Icon} size={16} />}
                  description="Available to all workspace roles"
                >
                  Send Team Message
                </CommandPaletteItem>
                <CommandPaletteItem
                  disabled
                  icon={<HaloIcon icon={SecurityLockIcon} size={16} />}
                  description="Requires Owner or Admin role"
                  shortcut="Admin"
                >
                  Purge Workspace Audit Logs
                </CommandPaletteItem>
                <CommandPaletteItem
                  disabled
                  icon={<HaloIcon icon={Download01Icon} size={16} />}
                  description="Export limit reached for current billing tier"
                >
                  Export Complete Database Backup
                </CommandPaletteItem>
              </CommandPaletteGroup>
            </CommandPaletteList>
          </CommandPalette>
        </div>
      </section>

      {/* 6. Shortcut Presentation vs Registration */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            6. Shortcut Presentation vs Registration
          </h3>
          <p className="text-sm text-muted-foreground">
            <code className="text-xs font-mono">CommandPaletteShortcut</code> is strictly a presentation primitive. It displays keyboard notation to the user but does not register global window event listeners.
          </p>
        </div>

        <Callout type="important">
          <strong>Displaying a shortcut does not register it.</strong> Shortcut labels communicate an existing keyboard command to the user. Global shortcut registration must be managed by the application or a dedicated shortcut orchestration hook.
        </Callout>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20">
          <CommandPalette intensity="subtle" className="max-w-xl mx-auto">
            <CommandPaletteInput placeholder="Search shortcuts..." />
            <CommandPaletteList>
              <CommandPaletteGroup heading="Standard Notation">
                <CommandPaletteItem
                  icon={<HaloIcon icon={SparklesIcon} size={16} />}
                  shortcut="⌘N"
                >
                  Create New File
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={Folder01Icon} size={16} />}
                  shortcut="⇧⌘O"
                >
                  Quick Open File
                </CommandPaletteItem>
                <CommandPaletteItem
                  icon={<HaloIcon icon={HelpCircleIcon} size={16} />}
                  shortcut="F1"
                >
                  Show Documentation
                </CommandPaletteItem>
              </CommandPaletteGroup>
            </CommandPaletteList>
          </CommandPalette>
        </div>
      </section>

      {/* 7. Mobile Viewport Composition */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            7. Mobile Viewport &amp; Virtual Keyboard Safety
          </h3>
          <p className="text-sm text-muted-foreground">
            On compact mobile screens, Command Palette constraints its max height to <code className="text-xs font-mono">max-h-80 sm:max-h-96</code> with internal scrolling, ensuring virtual software keyboards do not obscure search results or cause document overflow.
          </p>
        </div>

        <div className="flex justify-center p-6 rounded-2xl border border-border/60 bg-muted/20">
          <div className="w-[320px] rounded-3xl border border-border/80 bg-background/80 p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
              <span>Mobile Phone Viewport (320px)</span>
              <span>Safe-Area OK</span>
            </div>
            <CommandPalette intensity="balanced">
              <CommandPaletteInput placeholder="Search..." className="text-xs h-7" />
              <CommandPaletteList className="max-h-56">
                <CommandPaletteEmpty>No matches.</CommandPaletteEmpty>
                <CommandPaletteGroup heading="Destinations">
                  <CommandPaletteItem
                    icon={<HaloIcon icon={DashboardSquare01Icon} size={14} />}
                    className="py-1.5 text-xs"
                  >
                    Dashboard
                  </CommandPaletteItem>
                  <CommandPaletteItem
                    icon={<HaloIcon icon={Folder01Icon} size={14} />}
                    className="py-1.5 text-xs"
                  >
                    Projects
                  </CommandPaletteItem>
                  <CommandPaletteItem
                    icon={<HaloIcon icon={Settings02Icon} size={14} />}
                    className="py-1.5 text-xs"
                  >
                    Settings
                  </CommandPaletteItem>
                </CommandPaletteGroup>
              </CommandPaletteList>
            </CommandPalette>
          </div>
        </div>
      </section>
    </div>
  );
}
