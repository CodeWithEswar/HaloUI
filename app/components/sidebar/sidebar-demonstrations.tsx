"use client";

import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Folder01Icon,
  Analytics01Icon,
  UserGroupIcon,
  Settings01Icon,
  Add01Icon,
  MoreHorizontalIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SparklesIcon,
  BookOpen01Icon,
  DocumentCodeIcon,
  CloudIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function SidebarDemonstrations() {
  const [activeItem, setActiveItem] = React.useState<string>("Projects");
  const [nestedOpen, setNestedOpen] = React.useState<boolean>(true);

  return (
    <div className="space-y-12">
      {/* 1. Grouped Navigation with Semantic Real Links */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          1. Grouped Navigation with Semantic Links
        </h3>
        <p className="text-sm text-muted-foreground">
          Sidebar destinations are real navigation links (<code className="font-mono text-xs">&lt;a&gt;</code> or router <code className="font-mono text-xs">&lt;Link&gt;</code>), not ARIA menu items. Users navigate through them using standard document Tab progression rather than arrow-key roving focus.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <SidebarProvider defaultOpen={true} className="w-full max-w-xs flex justify-center">
            <div className="w-full max-w-xs rounded-xl border border-border/80 bg-background p-2 shadow-xs">
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeItem === "Overview"}
                        onClick={() => setActiveItem("Overview")}
                      >
                        <HaloIcon icon={Home01Icon} size={16} />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeItem === "Projects"}
                        onClick={() => setActiveItem("Projects")}
                      >
                        <HaloIcon icon={Folder01Icon} size={16} />
                        <span>Projects</span>
                        <SidebarMenuBadge>8</SidebarMenuBadge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeItem === "Analytics"}
                        onClick={() => setActiveItem("Analytics")}
                      >
                        <HaloIcon icon={Analytics01Icon} size={16} />
                        <span>Analytics</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          </SidebarProvider>
        </div>
      </section>

      {/* 2. Collapsible Nested Groups (Disclosure) */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          2. Collapsible Nested Groups (Disclosure Semantics)
        </h3>
        <p className="text-sm text-muted-foreground">
          Nested destination groups use explicit disclosure controls (<code className="font-mono text-xs">&lt;Collapsible&gt;</code>). The disclosure trigger is a button, while child destinations remain semantic links. Collapsing a group removes child links from the tab order.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <SidebarProvider defaultOpen={true} className="w-full max-w-xs flex justify-center">
            <div className="w-full max-w-xs rounded-xl border border-border/80 bg-background p-2 shadow-xs">
              <SidebarMenu>
                <Collapsible open={nestedOpen} onOpenChange={setNestedOpen} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton>
                          <HaloIcon icon={DocumentCodeIcon} size={16} />
                          <span>Documentation</span>
                          <HaloIcon
                            icon={ChevronRightIcon}
                            size={14}
                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                          />
                        </SidebarMenuButton>
                      }
                    />
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#getting-started" isActive={true}>
                            <span>Getting Started</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#components">
                            <span>Components Guide</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#optical-engine">
                            <span>Optical Physics</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </div>
          </SidebarProvider>
        </div>
      </section>

      {/* 3. Current Destination vs Keyboard Focus Contrast */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          3. Current Destination vs Keyboard Focus Contrast
        </h3>
        <p className="text-sm text-muted-foreground">
          <strong>Permanent QA State:</strong> Current route state and keyboard focus are entirely distinct visual layers. An active link renders <code className="font-mono text-xs">aria-current="page"</code> with background tint, but when focused with Tab, a prominent 2px focus ring appears around the perimeter.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <div className="w-full max-w-xs rounded-xl border border-border/80 bg-background p-3 shadow-xs space-y-2">
            <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              Simulated Focus Demonstration
            </div>
            {/* Focused non-current link */}
            <div className="p-2 rounded-lg border border-border/60 bg-muted/40 text-xs font-medium text-foreground flex items-center gap-2">
              <HaloIcon icon={Home01Icon} size={16} />
              <span>Overview (Standard Unfocused)</span>
            </div>
            {/* Current destination with simulated focus ring */}
            <div className="p-2 rounded-lg bg-sidebar-accent font-medium text-sidebar-accent-foreground text-xs flex items-center gap-2 ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-background">
              <HaloIcon icon={Folder01Icon} size={16} />
              <span>Projects (Active Destination + Keyboard Focused)</span>
              <span className="ml-auto text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                aria-current
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-sm">
            Tab into the items above to observe the independent <code className="font-mono text-xs">halo-focus-ring</code> outline without material glare.
          </p>
        </div>
      </section>

      {/* 4. Secondary Item Actions & Badges */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          4. Secondary Actions &amp; Count Badges
        </h3>
        <p className="text-sm text-muted-foreground">
          Secondary operations (such as "Add project" or "Item options") are rendered as sibling interactive elements, never nested inside the destination link.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <SidebarProvider defaultOpen={true} className="w-full max-w-xs flex justify-center">
            <div className="w-full max-w-xs rounded-xl border border-border/80 bg-background p-2 shadow-xs">
              <SidebarGroup>
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Workspaces
                  </span>
                  <button
                    type="button"
                    aria-label="Create workspace"
                    className="flex size-5 items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <HaloIcon icon={Add01Icon} size={14} />
                  </button>
                </div>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive={true}>
                        <HaloIcon icon={CloudIcon} size={16} />
                        <span>Production Cloud</span>
                      </SidebarMenuButton>
                      <SidebarMenuAction aria-label="Workspace options">
                        <HaloIcon icon={MoreHorizontalIcon} size={14} />
                      </SidebarMenuAction>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HaloIcon icon={CloudIcon} size={16} />
                        <span>Staging Sandbox</span>
                      </SidebarMenuButton>
                      <SidebarMenuAction aria-label="Workspace options">
                        <HaloIcon icon={MoreHorizontalIcon} size={14} />
                      </SidebarMenuAction>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          </SidebarProvider>
        </div>
      </section>

      {/* 5. Independent Content Scrolling */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          5. Anchored Header &amp; Footer with Scrollable Content
        </h3>
        <p className="text-sm text-muted-foreground">
          In large hierarchies, <code className="font-mono text-xs">SidebarContent</code> scrolls independently while <code className="font-mono text-xs">SidebarHeader</code> and <code className="font-mono text-xs">SidebarFooter</code> remain anchored to prevent navigational disorientation.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-xs h-64 rounded-xl border border-border/80 bg-background shadow-xs flex flex-col overflow-hidden">
            <div className="p-2 border-b border-border/70 bg-muted/30 text-xs font-semibold text-foreground shrink-0">
              Anchored Header
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground cursor-pointer">
                  Navigation Destination {i + 1}
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border/70 bg-muted/30 text-xs font-semibold text-foreground shrink-0">
              Anchored Footer (User Profile)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
