"use client";

import * as React from "react";
import {
  Spotlight,
  SpotlightDialog,
  SpotlightSearch,
  SpotlightFilterTabs,
  SpotlightList,
  SpotlightEmpty,
  SpotlightGroup,
  SpotlightItem,
  SpotlightSeparator,
  SpotlightFooter,
} from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Search01Icon,
  File01Icon,
  Folder01Icon,
  UserIcon,
  Settings02Icon,
  SecurityIcon,
  SparklesIcon,
  Layers01Icon,
  Book02Icon,
  CommandIcon,
} from "@hugeicons/core-free-icons";

export function SpotlightDemonstrations() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [lastExecuted, setLastExecuted] = React.useState<string | null>(null);

  const demoTabs = [
    { id: "all", label: "All Items", count: 6 },
    { id: "docs", label: "Documentation", count: 2 },
    { id: "team", label: "Team", count: 2 },
    { id: "settings", label: "Settings", count: 2 },
  ];

  return (
    <div className="space-y-16">
      {/* 1. Multi-Entity Global Search */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            1. Multi-Entity Global Search (Heterogeneous Results)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Unlike command-only menus, Spotlight indexes diverse entity models including documents, project workspaces,
            team members, and configuration items with specialized category tags.
          </p>
        </div>

        <div className="flex justify-center rounded-2xl border border-border/50 bg-background/50 p-4 sm:p-8">
          <div className="w-full max-w-2xl">
            <Spotlight intensity="balanced" className="w-full">
              <SpotlightSearch placeholder="Search across documents, team, and projects..." />
              <SpotlightList>
                <SpotlightEmpty>No matching resources found.</SpotlightEmpty>
                <SpotlightGroup heading="Documents &amp; Specifications">
                  <SpotlightItem
                    icon={<HaloIcon icon={File01Icon} size={16} className="text-blue-500" />}
                    category="PDF"
                    description="Documentation / Physical Liquid Glass Mechanics.pdf"
                    metadata="Updated 3h ago • 3.4 MB"
                    onSelect={() => setLastExecuted("Opened Liquid Glass Mechanics PDF")}
                  >
                    HaloUI Physical Liquid Glass Mechanics Specification
                  </SpotlightItem>
                  <SpotlightItem
                    icon={<HaloIcon icon={Folder01Icon} size={16} className="text-amber-500" />}
                    category="FOLDER"
                    description="Workspaces / Overlays &amp; Menus Architecture"
                    metadata="14 components • Active"
                    onSelect={() => setLastExecuted("Opened Overlays Architecture folder")}
                  >
                    Overlays &amp; Menus Engineering Directory
                  </SpotlightItem>
                </SpotlightGroup>

                <SpotlightSeparator />

                <SpotlightGroup heading="Team Members">
                  <SpotlightItem
                    icon={<HaloIcon icon={UserIcon} size={16} className="text-indigo-500" />}
                    category="LEAD"
                    description="Eswar Prasad • Design Systems Architect"
                    metadata="Online • 14 contributions today"
                    onSelect={() => setLastExecuted("Selected Eswar Prasad")}
                  >
                    Eswar Prasad (Design Lead)
                  </SpotlightItem>
                </SpotlightGroup>
              </SpotlightList>
              <SpotlightFooter />
            </Spotlight>
          </div>
        </div>
      </section>

      {/* 2. Category Scoped Filtering Tabs */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            2. Category Scoped Filtering Tabs
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Users can rapidly narrow down thousands of application entities using <code className="font-mono text-foreground text-xs">&lt;SpotlightFilterTabs&gt;</code> without losing their search query.
          </p>
        </div>

        <div className="flex justify-center rounded-2xl border border-border/50 bg-background/50 p-4 sm:p-8">
          <div className="w-full max-w-2xl">
            <Spotlight
              intensity="balanced"
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              className="w-full"
            >
              <SpotlightSearch placeholder="Filter resources by category..." />
              <SpotlightFilterTabs tabs={demoTabs} />
              <SpotlightList className="max-h-64">
                <SpotlightEmpty>No results in this category.</SpotlightEmpty>

                {(activeCategory === "all" || activeCategory === "docs") && (
                  <SpotlightGroup heading="Documentation">
                    <SpotlightItem
                      icon={<HaloIcon icon={Book02Icon} size={16} className="text-emerald-500" />}
                      category="GUIDE"
                      description="Docs / Foundations / Ten Layer Optical Model.mdx"
                      metadata="Updated 1d ago • 22 KB"
                      onSelect={() => setLastExecuted("Opened Ten Layer Optical Model")}
                    >
                      Ten-Layer Physical Optical Engine Architecture
                    </SpotlightItem>
                  </SpotlightGroup>
                )}

                {(activeCategory === "all" || activeCategory === "team") && (
                  <SpotlightGroup heading="Team">
                    <SpotlightItem
                      icon={<HaloIcon icon={UserIcon} size={16} className="text-rose-500" />}
                      category="A11Y"
                      description="Elena Rostova • Senior Accessibility Specialist"
                      metadata="Online"
                      onSelect={() => setLastExecuted("Selected Elena Rostova")}
                    >
                      Elena Rostova (A11y Lead)
                    </SpotlightItem>
                  </SpotlightGroup>
                )}

                {(activeCategory === "all" || activeCategory === "settings") && (
                  <SpotlightGroup heading="Settings">
                    <SpotlightItem
                      icon={<HaloIcon icon={Settings02Icon} size={16} className="text-neutral-500" />}
                      category="CONFIG"
                      description="App / Settings / Optical Specular Illumination Angle"
                      metadata="Global Token"
                      shortcut="⌘,"
                      onSelect={() => setLastExecuted("Configured Specular Illumination Angle")}
                    >
                      Specular Highlight Angle &amp; Refraction Strength
                    </SpotlightItem>
                  </SpotlightGroup>
                )}
              </SpotlightList>
              <SpotlightFooter />
            </Spotlight>
          </div>
        </div>
      </section>

      {/* 3. Empty State with Clear Recovery */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            3. Semantic Empty State &amp; Query Recovery
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When queries yield no results, Spotlight presents a centered empty graphic. The query clear button enables instantaneous recovery to the full discovery index.
          </p>
        </div>

        <div className="flex justify-center rounded-2xl border border-border/50 bg-background/50 p-4 sm:p-8">
          <div className="w-full max-w-2xl">
            <Spotlight intensity="subtle" className="w-full">
              <SpotlightSearch
                placeholder="Try searching..."
                defaultValue="nonexistent-search-term-xyz"
              />
              <SpotlightList>
                <SpotlightEmpty>
                  No matching files, people, or commands found for &ldquo;nonexistent-search-term-xyz&rdquo;.
                  Check your spelling or reset your query.
                </SpotlightEmpty>
              </SpotlightList>
              <SpotlightFooter />
            </Spotlight>
          </div>
        </div>
      </section>

      {/* 4. Modal Overlay with Halo Scrim */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            4. Modal Presentation with Halo Scrim
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When invoked as a global launcher, <code className="font-mono text-foreground text-xs">&lt;SpotlightDialog&gt;</code> coordinates
            with Halo Scrim to optically attenuate background distractions with 8px Gaussian blur while preserving readability.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/50 bg-background/50 p-6 sm:p-10 text-center">
          <Button
            variant="outline"
            onClick={() => setModalOpen(true)}
            className="gap-2.5 h-11 px-6 rounded-xl bg-background/80 backdrop-blur-md shadow-xs text-sm font-medium"
          >
            <HaloIcon icon={Search01Icon} size={18} className="text-primary" />
            <span>Launch Modal Spotlight Search</span>
            <kbd className="rounded border border-border/60 bg-muted/60 px-2 py-0.5 text-xs font-mono text-muted-foreground">
              ⌘ Space
            </kbd>
          </Button>

          <SpotlightDialog
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="Global Discovery"
            description="Find files, projects, people, and commands across the application."
          >
            <SpotlightSearch placeholder="Search across all application resources..." />
            <SpotlightFilterTabs tabs={demoTabs} />
            <SpotlightList className="max-h-84">
              <SpotlightEmpty>No matching resources found.</SpotlightEmpty>
              <SpotlightGroup heading="Quick Destinations">
                <SpotlightItem
                  icon={<HaloIcon icon={File01Icon} size={16} className="text-blue-500" />}
                  category="SPEC"
                  description="HaloUI Architecture / Liquid Glass Specification"
                  metadata="Active document"
                  onSelect={() => {
                    setLastExecuted("Modal: Opened Liquid Glass Spec");
                    setModalOpen(false);
                  }}
                >
                  Liquid Glass Physical Optical Specification
                </SpotlightItem>
                <SpotlightItem
                  icon={<HaloIcon icon={Settings02Icon} size={16} className="text-neutral-500" />}
                  category="SETTINGS"
                  description="System Settings / Theming &amp; Optical Tokens"
                  shortcut="⌘,"
                  onSelect={() => {
                    setLastExecuted("Modal: Opened Theming Settings");
                    setModalOpen(false);
                  }}
                >
                  Configure System Tokens &amp; Theme
                </SpotlightItem>
              </SpotlightGroup>
            </SpotlightList>
            <SpotlightFooter />
          </SpotlightDialog>
        </div>
      </section>

      {/* Execution Feedback Notification */}
      {lastExecuted && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl px-4 py-2.5 shadow-xl animate-in slide-in-from-bottom-2 duration-200">
          <HaloIcon icon={SparklesIcon} size={16} className="text-primary shrink-0" />
          <span className="text-xs font-medium text-foreground">{lastExecuted}</span>
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
