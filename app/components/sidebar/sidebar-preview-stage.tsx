"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
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
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Folder01Icon,
  Analytics01Icon,
  UserGroupIcon,
  PuzzleIcon,
  Settings01Icon,
  SparklesIcon,
  Notification01Icon,
  Search01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

function SidebarPreviewInner({
  activeItem,
  onSelectItem,
  collapsible,
  variant,
}: {
  activeItem: string;
  onSelectItem: (item: string) => void;
  collapsible: "icon" | "offcanvas" | "none";
  variant: "sidebar" | "floating" | "inset";
}) {
  const { state } = useSidebar();

  return (
    <div className="relative flex w-full h-[520px] rounded-2xl border border-white/60 dark:border-white/[0.12] bg-white/40 dark:bg-neutral-950/45 backdrop-blur-xl shadow-xl overflow-hidden">
      <Sidebar contained={true} collapsible={collapsible} variant={variant} className="border-r border-border/70">
        {/* Sidebar Header */}
        <SidebarHeader className="border-b border-border/60 p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <HaloIcon icon={SparklesIcon} size={18} />
            </div>
            <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
              <span className="text-xs font-semibold text-foreground truncate">Acme Platform</span>
              <span className="text-[11px] text-muted-foreground truncate">Cloud Workspace</span>
            </div>
          </div>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
          {/* Workspace Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
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
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-1" />

          {/* Manage Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeItem === "Team"}
                    onClick={() => onSelectItem("Team")}
                    tooltip="Team Members"
                  >
                    <HaloIcon icon={UserGroupIcon} size={16} />
                    <span>Team</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeItem === "Integrations"}
                    onClick={() => onSelectItem("Integrations")}
                    tooltip="Connected Integrations"
                  >
                    <HaloIcon icon={PuzzleIcon} size={16} />
                    <span>Integrations</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeItem === "Settings"}
                    onClick={() => onSelectItem("Settings")}
                    tooltip="Account Settings"
                  >
                    <HaloIcon icon={Settings01Icon} size={16} />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="border-t border-border/60 p-2">
          <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-foreground">
              JD
            </div>
            <div className="flex flex-col min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <span className="text-xs font-medium text-foreground truncate">Jane Doe</span>
              <span className="text-[10px] text-muted-foreground truncate">jane@acme.dev</span>
            </div>
            <HaloIcon
              icon={MoreHorizontalIcon}
              size={14}
              className="text-muted-foreground group-data-[collapsible=icon]:hidden"
            />
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Main Inset Application Shell Area */}
      <SidebarInset className="flex flex-col min-w-0 overflow-auto bg-muted/10">
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border/70 px-4 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border/70" />
            <span className="text-xs font-medium text-muted-foreground">Workspace</span>
            <span className="text-xs text-muted-foreground/60">/</span>
            <span className="text-xs font-semibold text-foreground">{activeItem}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
              <HaloIcon icon={Search01Icon} size={14} />
            </div>
            <div className="flex size-7 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
              <HaloIcon icon={Notification01Icon} size={14} />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{activeItem} View</h3>
            <p className="text-xs text-muted-foreground">
              Navigation destinations use standard link semantics and normal Tab keyboard progression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-border/80 bg-background/70 shadow-xs flex flex-col gap-2">
              <span className="text-xs font-semibold text-foreground">Destination State</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Active destination link renders <code className="font-mono text-xs">aria-current="page"</code> with distinct accent highlight, leaving keyboard focus rings fully distinguishable.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/80 bg-background/70 shadow-xs flex flex-col gap-2">
              <span className="text-xs font-semibold text-foreground">Responsive Collapse</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Toggle the sidebar using the trigger icon button or the interactive rail edge to observe icon-collapsed behavior with accessible tooltips.
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}

export function SidebarPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  const [activeDestination, setActiveDestination] = React.useState<string>("Overview");
  const [collapsible, setCollapsible] = React.useState<"icon" | "offcanvas" | "none">("icon");
  const [variant, setVariant] = React.useState<"sidebar" | "floating" | "inset">("sidebar");

  const handleReset = () => {
    setActiveDestination("Overview");
    setCollapsible("icon");
    setVariant("sidebar");
  };

  const generatedCode = React.useMemo(() => {
    return `import {
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
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
} from "@/components/ui/sidebar";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Folder01Icon,
  Analytics01Icon,
  UserGroupIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";

export function ApplicationLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="${collapsible}" variant="${variant}">
        <SidebarHeader className="border-b border-border/60 p-3">
          <div className="font-semibold text-sm">Acme Platform</div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={${activeDestination === "Overview"}} tooltip="Overview">
                    <HaloIcon icon={Home01Icon} size={16} />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={${activeDestination === "Projects"}} tooltip="Projects">
                    <HaloIcon icon={Folder01Icon} size={16} />
                    <span>Projects</span>
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={${activeDestination === "Analytics"}} tooltip="Analytics">
                    <HaloIcon icon={Analytics01Icon} size={16} />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border/60 p-2">
          <div className="text-xs text-muted-foreground">Jane Doe (jane@acme.dev)</div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="font-medium text-sm">${activeDestination}</div>
        </header>
        <main className="p-6">
          {/* Main Destination Content */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}`;
  }, [collapsible, variant, activeDestination]);

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
        { label: "Collapsible", value: collapsible },
        { label: "Variant", value: variant },
        { label: "Keyboard", value: "Standard Tab/Link" },
      ]}
      controls={
        <div className="flex flex-wrap items-center gap-3">
          <StageControlSelect
            label="Collapse Mode"
            value={collapsible}
            onChange={(v) => setCollapsible(v as "icon" | "offcanvas" | "none")}
            options={[
              { value: "icon", label: "Icon Rail (3rem)" },
              { value: "offcanvas", label: "Offcanvas (Hidden)" },
              { value: "none", label: "Static (None)" },
            ]}
          />
          <StageControlSelect
            label="Layout Variant"
            value={variant}
            onChange={(v) => setVariant(v as "sidebar" | "floating" | "inset")}
            options={[
              { value: "sidebar", label: "Standard Sidebar" },
              { value: "floating", label: "Floating Panel" },
              { value: "inset", label: "Inset Shell" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-4xl">
        <SidebarProvider defaultOpen={true}>
          <SidebarPreviewInner
            activeItem={activeDestination}
            onSelectItem={setActiveDestination}
            collapsible={collapsible}
            variant={variant}
          />
        </SidebarProvider>
      </div>
    </PreviewStageShell>
  );
}
