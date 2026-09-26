"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
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
  SidebarMenuBadge,
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
  SparklesIcon,
  Search01Icon,
  Add01Icon,
  Notification01Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

function RailWorkbench({
  activeItem,
  onSelectItem,
  standalone,
}: {
  activeItem: string;
  onSelectItem: (item: string) => void;
  standalone: boolean;
}) {
  const { state, toggleSidebar } = useSidebar();
  const isExpanded = state === "expanded" && !standalone;

  return (
    <div className="relative flex w-full h-[500px] rounded-2xl border border-white/60 dark:border-white/[0.12] bg-white/40 dark:bg-neutral-950/45 backdrop-blur-xl backdrop-saturate-150 shadow-xl overflow-hidden">
      {/* If expanded and not standalone, show full Sidebar */}
      {isExpanded ? (
        <Sidebar contained={true} collapsible="icon" className="border-r border-border/70">
          <SidebarHeader className="border-b border-border/60 p-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <HaloIcon icon={SparklesIcon} size={16} />
              </div>
              <span className="text-xs font-semibold text-foreground">Acme Cloud</span>
            </div>
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
                      onClick={() => onSelectItem("Overview")}
                      tooltip="Overview"
                    >
                      <HaloIcon icon={Home01Icon} size={16} />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "Projects"}
                      onClick={() => onSelectItem("Projects")}
                      tooltip="Projects"
                    >
                      <HaloIcon icon={Folder01Icon} size={16} />
                      <span>Projects</span>
                      <SidebarMenuBadge>12</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "Analytics"}
                      onClick={() => onSelectItem("Analytics")}
                      tooltip="Analytics"
                    >
                      <HaloIcon icon={Analytics01Icon} size={16} />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "Team"}
                      onClick={() => onSelectItem("Team")}
                      tooltip="Team"
                    >
                      <HaloIcon icon={UserGroupIcon} size={16} />
                      <span>Team</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeItem === "Settings"}
                      onClick={() => onSelectItem("Settings")}
                      tooltip="Settings"
                    >
                      <HaloIcon icon={Settings01Icon} size={16} />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/60 p-2 text-xs text-muted-foreground">
            Jane Doe (Admin)
          </SidebarFooter>
        </Sidebar>
      ) : (
        /* Compact SidebarRail */
        <SidebarRail standalone={true}>
          <SidebarRailHeader>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <HaloIcon icon={SparklesIcon} size={18} />
            </div>
            {!standalone && <SidebarRailExpand />}
          </SidebarRailHeader>

          <SidebarRailContent>
            <SidebarRailLink
              href="#overview"
              label="Overview"
              icon={Home01Icon}
              isActive={activeItem === "Overview"}
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("Overview");
              }}
            />
            <SidebarRailLink
              href="#projects"
              label="Projects"
              icon={Folder01Icon}
              isActive={activeItem === "Projects"}
              badge="12"
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("Projects");
              }}
            />
            <SidebarRailLink
              href="#analytics"
              label="Analytics"
              icon={Analytics01Icon}
              isActive={activeItem === "Analytics"}
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("Analytics");
              }}
            />
            <SidebarRailLink
              href="#team"
              label="Team"
              icon={UserGroupIcon}
              isActive={activeItem === "Team"}
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("Team");
              }}
            />

            <div className="my-1.5 h-px w-6 bg-sidebar-border" />

            <SidebarRailAction
              label="Search Workspace"
              icon={Search01Icon}
              onClick={() => onSelectItem("Search (Action)")}
            />
            <SidebarRailAction
              label="Create Project"
              icon={Add01Icon}
              onClick={() => onSelectItem("Create (Action)")}
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
                onSelectItem("Settings");
              }}
            />
          </SidebarRailFooter>
        </SidebarRail>
      )}

      {/* Main Inset Workspace */}
      <SidebarInset className="flex flex-col min-w-0 bg-transparent overflow-auto">
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/40 dark:border-white/[0.08] px-4 bg-white/20 dark:bg-white/[0.03] backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {!isExpanded && !standalone && (
              <button
                type="button"
                onClick={toggleSidebar}
                className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline mr-1"
              >
                Expand Sidebar
              </button>
            )}
            <span className="text-xs text-muted-foreground">Workspace</span>
            <span className="text-xs text-muted-foreground/60">/</span>
            <span className="text-xs font-semibold text-foreground">{activeItem}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded border border-border/80 bg-background/80">
              Rail Mode: {isExpanded ? "Expanded (16rem)" : "Compact (3.5rem)"}
            </span>
          </div>
        </header>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {activeItem} View
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Sidebar Rail preserves essential destinations while minimizing footprint. Every icon link retains its complete accessible name and visible keyboard focus ring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div className="p-4 rounded-xl border border-border/80 bg-background/70 shadow-xs space-y-1.5">
              <span className="text-xs font-semibold text-foreground">Accessible Names Intact</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Even though visible text labels are hidden in compact mode, screen readers announce the full label via <code className="font-mono text-xs">aria-label</code> and <code className="font-mono text-xs">.sr-only</code> elements.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/80 bg-background/70 shadow-xs space-y-1.5">
              <span className="text-xs font-semibold text-foreground">Active + Focus Contrast</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The current route indicator displays a primary left optical rim and accent tint, allowing the 2px focus ring to remain visibly sharp on keyboard focus.
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}

export function SidebarRailPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  const [activeDestination, setActiveDestination] = React.useState<string>("Projects");
  const [standalone, setStandalone] = React.useState<boolean>(false);

  const handleReset = () => {
    setActiveDestination("Projects");
    setStandalone(false);
  };

  const generatedCode = React.useMemo(() => {
    return `import {
  SidebarRail,
  SidebarRailHeader,
  SidebarRailContent,
  SidebarRailFooter,
  SidebarRailLink,
  SidebarRailAction,
  SidebarRailExpand,
} from "@/components/ui/sidebar-rail";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Folder01Icon,
  Analytics01Icon,
  UserGroupIcon,
  Settings01Icon,
  SparklesIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

export function CompactNavigationRail() {
  const [active, setActive] = React.useState("${activeDestination}");

  return (
    <SidebarRail standalone={${standalone}}>
      <SidebarRailHeader>
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <HaloIcon icon={SparklesIcon} size={18} />
        </div>
        <SidebarRailExpand />
      </SidebarRailHeader>

      <SidebarRailContent>
        <SidebarRailLink
          href="#overview"
          label="Overview"
          icon={Home01Icon}
          isActive={active === "Overview"}
          onClick={() => setActive("Overview")}
        />
        <SidebarRailLink
          href="#projects"
          label="Projects"
          icon={Folder01Icon}
          isActive={active === "Projects"}
          badge="12"
          onClick={() => setActive("Projects")}
        />
        <SidebarRailLink
          href="#analytics"
          label="Analytics"
          icon={Analytics01Icon}
          isActive={active === "Analytics"}
          onClick={() => setActive("Analytics")}
        />
        <SidebarRailLink
          href="#team"
          label="Team"
          icon={UserGroupIcon}
          isActive={active === "Team"}
          onClick={() => setActive("Team")}
        />

        <div className="my-1.5 h-px w-6 bg-sidebar-border" />

        <SidebarRailAction
          label="Search"
          icon={Search01Icon}
          onClick={() => console.log("Search")}
        />
      </SidebarRailContent>

      <SidebarRailFooter>
        <SidebarRailLink
          href="#settings"
          label="Settings"
          icon={Settings01Icon}
          isActive={active === "Settings"}
          onClick={() => setActive("Settings")}
        />
      </SidebarRailFooter>
    </SidebarRail>
  );
}`;
  }, [standalone, activeDestination]);

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={generatedCode}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={[
        { label: "Destination", value: activeDestination, variant: "success" },
        { label: "Width", value: standalone ? "Fixed (3.5rem)" : "Sync with Sidebar" },
        { label: "Hit Target", value: "40px (Accessible)" },
        { label: "Keyboard", value: "Document Tab / Link" },
      ]}
      controls={
        <div className="flex flex-wrap items-center gap-3">
          <StageControlSelect
            label="Integration Mode"
            value={standalone ? "standalone" : "sync"}
            onChange={(v) => setStandalone(v === "standalone")}
            options={[
              { value: "sync", label: "Synchronized with Sidebar (Toggleable)" },
              { value: "standalone", label: "Permanent Standalone Rail (Fixed)" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-4xl">
        <SidebarProvider defaultOpen={false}>
          <RailWorkbench
            activeItem={activeDestination}
            onSelectItem={setActiveDestination}
            standalone={standalone}
          />
        </SidebarProvider>
      </div>
    </PreviewStageShell>
  );
}
