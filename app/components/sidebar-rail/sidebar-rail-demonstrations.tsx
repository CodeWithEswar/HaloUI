"use client";

import * as React from "react";
import {
  SidebarRail,
  SidebarRailHeader,
  SidebarRailContent,
  SidebarRailFooter,
  SidebarRailLink,
  SidebarRailAction,
  SidebarRailExpand,
} from "@/components/ui/sidebar-rail";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Folder01Icon,
  Analytics01Icon,
  UserGroupIcon,
  Settings01Icon,
  Add01Icon,
  SparklesIcon,
  Search01Icon,
  Notification01Icon,
  InboxIcon,
  DocumentCodeIcon,
  CloudIcon,
  HelpCircleIcon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function SidebarRailDemonstrations() {
  const [activeItem, setActiveItem] = React.useState<string>("Projects");
  const [actionCount, setActionCount] = React.useState<number>(0);

  return (
    <div className="space-y-12">
      {/* 1. Real Semantic Links & Current State */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          1. Semantic Real Links with Distinct Current State
        </h3>
        <p className="text-sm text-muted-foreground">
          Every navigation item in the rail is a real anchor (<code className="font-mono text-xs">&lt;a&gt;</code>) linking to a destination, not a generic button or menuitem. When an item represents the active page, it receives <code className="font-mono text-xs">aria-current=&quot;page&quot;</code>, a subtle background surface, and an optical edge indicator that remains visibly distinct from keyboard focus rings.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="h-80 rounded-xl border border-border/80 bg-background shadow-xs overflow-hidden flex">
            <SidebarRail standalone className="h-full">
              <SidebarRailHeader>
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                  <HaloIcon icon={SparklesIcon} size={18} />
                </div>
              </SidebarRailHeader>
              <SidebarRailContent>
                <SidebarRailLink
                  href="#overview"
                  label="Overview"
                  icon={Home01Icon}
                  isActive={activeItem === "Overview"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem("Overview");
                  }}
                />
                <SidebarRailLink
                  href="#projects"
                  label="Projects"
                  icon={Folder01Icon}
                  isActive={activeItem === "Projects"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem("Projects");
                  }}
                />
                <SidebarRailLink
                  href="#analytics"
                  label="Analytics"
                  icon={Analytics01Icon}
                  isActive={activeItem === "Analytics"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem("Analytics");
                  }}
                />
                <SidebarRailLink
                  href="#team"
                  label="Team"
                  icon={UserGroupIcon}
                  isActive={activeItem === "Team"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem("Team");
                  }}
                />
              </SidebarRailContent>
              <SidebarRailFooter>
                <SidebarRailLink
                  href="#settings"
                  label="Settings"
                  icon={Settings01Icon}
                  isActive={activeItem === "Settings"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem("Settings");
                  }}
                />
              </SidebarRailFooter>
            </SidebarRail>
            <div className="flex-1 p-6 flex flex-col justify-center items-start min-w-[240px] bg-muted/10">
              <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider">Active Route</span>
              <p className="text-lg font-semibold text-foreground mt-1">{activeItem}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Clicking destinations navigates while keeping aria-current=&quot;page&quot; synchronized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tooltip Label Discovery on Hover & Keyboard Focus */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          2. Tooltip Label Discovery Without Loss of Accessible Names
        </h3>
        <p className="text-sm text-muted-foreground">
          Compact icon rails remove visible text labels to conserve horizontal real estate. A floating Tooltip provides visual label discovery on pointer hover and keyboard focus. However, an accessible name (<code className="font-mono text-xs">aria-label</code> and hidden <code className="font-mono text-xs">.sr-only</code> text) is permanently embedded directly on the anchor element, so screen readers never depend on tooltip appearance.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="h-72 rounded-xl border border-border/80 bg-background shadow-xs overflow-hidden flex">
            <SidebarRail standalone className="h-full">
              <SidebarRailContent>
                <SidebarRailLink
                  href="#inbox"
                  label="Inbox"
                  icon={InboxIcon}
                  badge="3"
                />
                <SidebarRailLink
                  href="#search"
                  label="Global Search"
                  icon={Search01Icon}
                />
                <SidebarRailLink
                  href="#cloud"
                  label="Cloud Deployments"
                  icon={CloudIcon}
                />
                <SidebarRailLink
                  href="#code"
                  label="API Schema Editor"
                  icon={DocumentCodeIcon}
                />
              </SidebarRailContent>
              <SidebarRailFooter>
                <SidebarRailLink
                  href="#help"
                  label="Documentation & Support"
                  icon={HelpCircleIcon}
                />
              </SidebarRailFooter>
            </SidebarRail>
            <div className="flex-1 p-6 flex flex-col justify-center items-start min-w-[260px] bg-muted/10">
              <span className="text-xs font-medium text-foreground">Tab through the rail icons:</span>
              <p className="text-xs text-muted-foreground mt-1">
                Notice that pressing <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[11px] font-mono">Tab</kbd> focuses each item with Halo&apos;s optical focus ring, immediately revealing the tooltip to keyboard users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Action Buttons vs Destination Links */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          3. Mixed Actions and Destinations
        </h3>
        <p className="text-sm text-muted-foreground">
          Essential app actions (such as <code className="font-mono text-xs">Create Resource</code> or <code className="font-mono text-xs">Notifications</code>) use <code className="font-mono text-xs">SidebarRailAction</code> (<code className="font-mono text-xs">&lt;button&gt;</code>) semantics. They trigger event callbacks without possessing router paths or current-page indicators.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="h-72 rounded-xl border border-border/80 bg-background shadow-xs overflow-hidden flex">
            <SidebarRail standalone className="h-full">
              <SidebarRailContent>
                <SidebarRailAction
                  label="Create New Project"
                  icon={Add01Icon}
                  onClick={() => setActionCount((c) => c + 1)}
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                />
                <SidebarRailAction
                  label="Notifications"
                  icon={Notification01Icon}
                  badge="9+"
                  onClick={() => alert("Notifications drawer opened")}
                />
                <div className="my-2 h-px w-6 bg-border/60" />
                <SidebarRailLink
                  href="#projects"
                  label="Projects"
                  icon={Folder01Icon}
                  isActive={true}
                />
                <SidebarRailLink
                  href="#team"
                  label="Team"
                  icon={UserGroupIcon}
                />
              </SidebarRailContent>
            </SidebarRail>
            <div className="flex-1 p-6 flex flex-col justify-center items-start min-w-[260px] bg-muted/10">
              <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider">Button Actions</span>
              <p className="text-sm font-medium text-foreground mt-1">
                New projects created: <span className="font-mono font-semibold text-primary">{actionCount}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Clicking the plus icon triggers an action callback rather than navigating to a route.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Synchronization with SidebarProvider */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          4. Seamless Synchronization with SidebarProvider
        </h3>
        <p className="text-sm text-muted-foreground">
          When mounted inside a standard <code className="font-mono text-xs">SidebarProvider</code>, <code className="font-mono text-xs">SidebarRail</code> automatically hides while the main Sidebar is expanded, and seamlessly emerges when collapsed. The <code className="font-mono text-xs">SidebarRailExpand</code> button triggers the shared <code className="font-mono text-xs">toggleSidebar()</code> method with accessible naming.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-lg h-80 rounded-xl border border-border/80 bg-background shadow-xs overflow-hidden">
            <SidebarProvider defaultOpen={false}>
              <div className="flex h-full w-full">
                {/* Collapsed Compact Rail */}
                <SidebarRail>
                  <SidebarRailHeader>
                    <SidebarRailExpand />
                  </SidebarRailHeader>
                  <SidebarRailContent>
                    <SidebarRailLink
                      href="#home"
                      label="Home"
                      icon={Home01Icon}
                      isActive={activeItem === "Overview"}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveItem("Overview");
                      }}
                    />
                    <SidebarRailLink
                      href="#projects"
                      label="Projects"
                      icon={Folder01Icon}
                      isActive={activeItem === "Projects"}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveItem("Projects");
                      }}
                    />
                    <SidebarRailLink
                      href="#analytics"
                      label="Analytics"
                      icon={Analytics01Icon}
                      isActive={activeItem === "Analytics"}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveItem("Analytics");
                      }}
                    />
                  </SidebarRailContent>
                  <SidebarRailFooter>
                    <SidebarRailLink
                      href="#settings"
                      label="Settings"
                      icon={Settings01Icon}
                    />
                  </SidebarRailFooter>
                </SidebarRail>

                {/* Expanded Full Sidebar */}
                <Sidebar contained={true} collapsible="icon" className="border-r border-border/70">
                  <SidebarHeader className="p-3 border-b border-border/60 flex flex-row items-center justify-between">
                    <span className="text-xs font-semibold">Acme Workspace</span>
                    <SidebarTrigger />
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
                  </SidebarContent>
                </Sidebar>

                <SidebarInset className="p-6 flex flex-col justify-center items-center bg-muted/10 flex-1">
                  <p className="text-sm font-semibold text-foreground">Application Content Area</p>
                  <p className="text-xs text-muted-foreground mt-1 text-center max-w-xs">
                    Click the expand/collapse triggers in the sidebar rail or header to toggle between compact icon-rail navigation and the full expanded navigation drawer.
                  </p>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
        </div>
      </section>

      {/* 5. Overflow and Vertical Scrolling */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          5. Vertical Overflow and Scrolling
        </h3>
        <p className="text-sm text-muted-foreground">
          When an application has more destinations than can fit in the vertical viewport, <code className="font-mono text-xs">SidebarRailContent</code> provides smooth, accessible vertical scrolling without shrinking touch targets or compromising keyboard navigation reachability.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="h-64 rounded-xl border border-border/80 bg-background shadow-xs overflow-hidden flex">
            <SidebarRail standalone className="h-full">
              <SidebarRailContent>
                <SidebarRailLink href="#1" label="Dashboard" icon={Home01Icon} isActive={true} />
                <SidebarRailLink href="#2" label="Projects" icon={Folder01Icon} />
                <SidebarRailLink href="#3" label="Analytics" icon={Analytics01Icon} />
                <SidebarRailLink href="#4" label="Team Members" icon={UserGroupIcon} />
                <SidebarRailLink href="#5" label="Cloud Infrastructure" icon={CloudIcon} />
                <SidebarRailLink href="#6" label="API Documentation" icon={DocumentCodeIcon} />
                <SidebarRailLink href="#7" label="Support Tickets" icon={HelpCircleIcon} />
                <SidebarRailLink href="#8" label="Activity Inbox" icon={InboxIcon} />
                <SidebarRailLink href="#9" label="Notifications" icon={Notification01Icon} />
              </SidebarRailContent>
              <SidebarRailFooter>
                <SidebarRailLink href="#settings" label="System Settings" icon={Settings01Icon} />
              </SidebarRailFooter>
            </SidebarRail>
            <div className="flex-1 p-6 flex flex-col justify-center items-start min-w-[260px] bg-muted/10">
              <span className="text-xs font-semibold text-foreground">9 Items in 256px Height</span>
              <p className="text-xs text-muted-foreground mt-1">
                Scroll the rail using mouse wheel, trackpad, or keyboard Tab. Touch targets remain standard 40px hit areas, and focus outlines are never clipped by overflow boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
