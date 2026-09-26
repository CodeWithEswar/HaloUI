"use client";

import * as React from "react";
import {
  CommandMenu,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuSeparator,
  CommandMenuDialog,
} from "@/components/ui/command-menu";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  UserAdd01Icon,
  Settings02Icon,
  SecurityIcon,
  CreditCardIcon,
  CodeCircleIcon,
  TerminalIcon,
  Moon02Icon,
  Delete02Icon,
  GlobalIcon,
  Book02Icon,
  Layers01Icon,
  Search01Icon,
  SparklesIcon,
  CommandIcon,
} from "@hugeicons/core-free-icons";

export function CommandMenuDemonstrations() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [lastExecuted, setLastExecuted] = React.useState<string | null>(null);

  return (
    <div className="space-y-16">
      {/* 1. Grouped Commands & Visual Hierarchy */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">1. Grouped Commands & Structured Sections</h3>
          <p className="text-sm text-muted-foreground">
            Command Menu organizes related actions into semantic groups with subtle uppercase headers,
            leading icons, and trailing keyboard shortcut hints.
          </p>
        </div>

        <div className="flex justify-center rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-10">
          <div className="w-full max-w-md">
            <CommandMenu intensity="balanced" className="w-full">
              <CommandMenuInput placeholder="Type to search actions..." />
              <CommandMenuList>
                <CommandMenuEmpty>No actions match your query.</CommandMenuEmpty>
                <CommandMenuGroup heading="Workspace Actions">
                  <CommandMenuItem
                    icon={<HaloIcon icon={Folder01Icon} size={15} />}
                    shortcut="⌘N"
                    onSelect={() => setLastExecuted("New Project")}
                  >
                    Create New Project
                  </CommandMenuItem>
                  <CommandMenuItem
                    icon={<HaloIcon icon={UserAdd01Icon} size={15} />}
                    shortcut="⌘I"
                    onSelect={() => setLastExecuted("Invite Teammates")}
                  >
                    Invite Teammates
                  </CommandMenuItem>
                </CommandMenuGroup>

                <CommandMenuSeparator />

                <CommandMenuGroup heading="Settings & Security">
                  <CommandMenuItem
                    icon={<HaloIcon icon={Settings02Icon} size={15} />}
                    shortcut="⌘,"
                    onSelect={() => setLastExecuted("Workspace Settings")}
                  >
                    Workspace Settings
                  </CommandMenuItem>
                  <CommandMenuItem
                    icon={<HaloIcon icon={SecurityIcon} size={15} />}
                    onSelect={() => setLastExecuted("Manage Access Keys")}
                  >
                    Access Keys & 2FA
                  </CommandMenuItem>
                </CommandMenuGroup>
              </CommandMenuList>
            </CommandMenu>
          </div>
        </div>
      </section>

      {/* 2. Embedded Panel Mode (Non-Floating) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">2. Embedded Panel Mode (In-Page Navigation)</h3>
          <p className="text-sm text-muted-foreground">
            Set <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">variant="embedded"</code> for
            flat card integration inside sidebars, inspector sheets, or settings views without floating optical elevation or scrim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-10">
          <div className="md:col-span-1 space-y-3 border-b md:border-b-0 md:border-r border-border/50 pb-6 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2">
              <HaloIcon icon={Layers01Icon} size={18} className="text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Command Sidebar</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In embedded mode, Command Menu serves as a live in-page filter list. It does not mount to a portal,
              does not create a backdrop, and respects surrounding container boundaries.
            </p>
          </div>

          <div className="md:col-span-2">
            <CommandMenu variant="embedded" className="w-full">
              <CommandMenuInput placeholder="Filter sidebar tools..." />
              <CommandMenuList className="max-h-56">
                <CommandMenuEmpty>No tools found.</CommandMenuEmpty>
                <CommandMenuGroup heading="Developer Tools">
                  <CommandMenuItem
                    icon={<HaloIcon icon={TerminalIcon} size={15} />}
                    shortcut="⌥⌘C"
                    onSelect={() => setLastExecuted("Console Tool")}
                  >
                    Interactive Console
                  </CommandMenuItem>
                  <CommandMenuItem
                    icon={<HaloIcon icon={CodeCircleIcon} size={15} />}
                    onSelect={() => setLastExecuted("DOM Inspector")}
                  >
                    Element Inspector
                  </CommandMenuItem>
                  <CommandMenuItem
                    icon={<HaloIcon icon={GlobalIcon} size={15} />}
                    onSelect={() => setLastExecuted("Network Monitor")}
                  >
                    Network Traffic Log
                  </CommandMenuItem>
                </CommandMenuGroup>
              </CommandMenuList>
            </CommandMenu>
          </div>
        </div>
      </section>

      {/* 3. Empty State with Clear Query */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">3. Semantic Empty State & Query Clearing</h3>
          <p className="text-sm text-muted-foreground">
            When no items match the active query, Command Menu displays a centered empty state with Hugeicons
            Search icon. Typing in the search field exposes a dedicated clear button that resets the query without closing the surface.
          </p>
        </div>

        <div className="flex justify-center rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-10">
          <div className="w-full max-w-md">
            <CommandMenu intensity="subtle" className="w-full">
              <CommandMenuInput
                placeholder="Try typing 'xyz' to see the empty state..."
                defaultValue="nonexistent query"
              />
              <CommandMenuList>
                <CommandMenuEmpty>
                  No commands match your query. Try searching for different keywords.
                </CommandMenuEmpty>
                <CommandMenuGroup heading="Common Commands">
                  <CommandMenuItem
                    icon={<HaloIcon icon={Book02Icon} size={15} />}
                    onSelect={() => setLastExecuted("Read Docs")}
                  >
                    Documentation
                  </CommandMenuItem>
                  <CommandMenuItem
                    icon={<HaloIcon icon={SparklesIcon} size={15} />}
                    onSelect={() => setLastExecuted("View Showcase")}
                  >
                    Liquid Glass Showcase
                  </CommandMenuItem>
                </CommandMenuGroup>
              </CommandMenuList>
            </CommandMenu>
          </div>
        </div>
      </section>

      {/* 4. Disabled State & Layout Safety */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">4. Disabled Commands & Layout Stress Testing</h3>
          <p className="text-sm text-muted-foreground">
            Items with <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">disabled</code> are
            visually muted, ignored by keyboard arrow roving, and cannot be activated via Enter or click.
          </p>
        </div>

        <div className="flex justify-center rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-10">
          <div className="w-full max-w-md">
            <CommandMenu intensity="balanced" className="w-full">
              <CommandMenuInput placeholder="Search commands..." />
              <CommandMenuList>
                <CommandMenuGroup heading="Permissions & Plan Tier">
                  <CommandMenuItem
                    icon={<HaloIcon icon={SparklesIcon} size={15} />}
                    shortcut="PRO"
                    onSelect={() => setLastExecuted("AI Vector Search")}
                  >
                    AI Optical Vector Search
                  </CommandMenuItem>
                  <CommandMenuItem
                    disabled
                    icon={<HaloIcon icon={Delete02Icon} size={15} />}
                    description="Requires Organization Admin privileges"
                    shortcut="ADMIN"
                    onSelect={() => setLastExecuted("Purge Database (Disabled)")}
                  >
                    Purge Production Data
                  </CommandMenuItem>
                  <CommandMenuItem
                    disabled
                    icon={<HaloIcon icon={CreditCardIcon} size={15} />}
                    description="Enterprise plan subscription required"
                    shortcut="ENT"
                    onSelect={() => setLastExecuted("Custom Invoicing")}
                  >
                    Custom Invoicing & SLAs
                  </CommandMenuItem>
                </CommandMenuGroup>
              </CommandMenuList>
            </CommandMenu>
          </div>
        </div>
      </section>

      {/* 5. Modal Launcher Composition */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">5. Modal Dialog Composition</h3>
          <p className="text-sm text-muted-foreground">
            For modal application launchers, compose Command Menu inside <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">&lt;CommandMenuDialog&gt;</code>.
            The dialog owns the accessible modal dialog semantics, backdrop scrim, and escape dismissal.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-10 text-center">
          <Button
            variant="outline"
            onClick={() => setModalOpen(true)}
            className="gap-2.5 h-10 px-5 rounded-xl bg-background/70 backdrop-blur-md shadow-xs"
          >
            <HaloIcon icon={CommandIcon} size={16} className="text-primary" />
            <span>Open Command Menu Modal</span>
            <kbd className="rounded border border-border/60 bg-muted/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </Button>
          <p className="text-xs text-muted-foreground">
            Click the button to preview Command Menu mounted within a Dialog overlay.
          </p>

          <CommandMenuDialog
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="Application Command Menu"
            description="Search commands, documentation pages, or recent actions."
          >
            <CommandMenuInput placeholder="Type a command or search..." />
            <CommandMenuList>
              <CommandMenuEmpty>No commands found.</CommandMenuEmpty>
              <CommandMenuGroup heading="Quick Actions">
                <CommandMenuItem
                  icon={<HaloIcon icon={Folder01Icon} size={15} />}
                  shortcut="⌘N"
                  onSelect={() => {
                    setLastExecuted("Modal: New Project");
                    setModalOpen(false);
                  }}
                >
                  Create New Project
                </CommandMenuItem>
                <CommandMenuItem
                  icon={<HaloIcon icon={Moon02Icon} size={15} />}
                  shortcut="⌘D"
                  onSelect={() => {
                    setLastExecuted("Modal: Toggle Dark Mode");
                    setModalOpen(false);
                  }}
                >
                  Toggle Color Scheme
                </CommandMenuItem>
                <CommandMenuItem
                  icon={<HaloIcon icon={Settings02Icon} size={15} />}
                  shortcut="⌘,"
                  onSelect={() => {
                    setLastExecuted("Modal: Open Settings");
                    setModalOpen(false);
                  }}
                >
                  Open Preferences
                </CommandMenuItem>
              </CommandMenuGroup>
            </CommandMenuList>
          </CommandMenuDialog>
        </div>
      </section>

      {/* Execution Telemetry Feedback */}
      {lastExecuted && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl px-4 py-2.5 shadow-xl animate-in slide-in-from-bottom-2 duration-200">
          <HaloIcon icon={SparklesIcon} size={16} className="text-primary shrink-0" />
          <span className="text-xs font-medium text-foreground">Executed: {lastExecuted}</span>
          <button
            type="button"
            onClick={() => setLastExecuted(null)}
            className="text-[11px] text-muted-foreground hover:text-foreground underline ml-2 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
