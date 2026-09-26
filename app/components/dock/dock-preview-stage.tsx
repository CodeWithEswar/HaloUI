"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Dock,
  DockItem,
  DockSeparator,
} from "@/components/ui/dock";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Search01Icon,
  Add01Icon,
  Notification01Icon,
  UserIcon,
  Settings01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function DockPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [intensity, setIntensity] = React.useState<"subtle" | "balanced" | "rich">("balanced");
  const [magnification, setMagnification] = React.useState<boolean>(true);
  const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">("horizontal");
  const [activeItem, setActiveItem] = React.useState<string>("Home");
  const [lastAction, setLastAction] = React.useState<string>("Initial Mount");

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("desktop");
    setIntensity("balanced");
    setMagnification(true);
    setOrientation("horizontal");
    setActiveItem("Home");
    setLastAction("Reset to Default");
  }, []);

  const generatedCode = React.useMemo(() => {
    return `import { Dock, DockItem, DockSeparator } from "@/components/ui/dock";
import {
  Home01Icon,
  Search01Icon,
  Add01Icon,
  Notification01Icon,
  UserIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";

export function AppDock() {
  return (
    <Dock
      orientation="${orientation}"
      intensity="${intensity}"
      magnification={${magnification}}
      className="shadow-2xl"
    >
      <DockItem
        href="#home"
        label="Home"
        icon={Home01Icon}
        isActive={${activeItem === "Home"}}
      />
      <DockItem
        label="Search"
        icon={Search01Icon}
        onClick={() => openSearch()}
      />
      <DockItem
        label="Create"
        icon={Add01Icon}
        onClick={() => createItem()}
      />
      <DockItem
        label="Notifications"
        icon={Notification01Icon}
        badge="4"
        onClick={() => openNotifications()}
      />
      <DockItem
        href="#profile"
        label="Profile"
        icon={UserIcon}
        isActive={${activeItem === "Profile"}}
      />
      <DockSeparator />
      <DockItem
        href="#settings"
        label="Settings"
        icon={Settings01Icon}
        isActive={${activeItem === "Settings"}}
      />
    </Dock>
  );
}`;
  }, [orientation, intensity, magnification, activeItem]);

  return (
    <PreviewStageShell
      title="Dock Live Stage"
      description="An interactive floating surface for a small set of high-value destinations and actions with optional optical magnification."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={generatedCode}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={[
        { label: "Active Destination", value: activeItem, variant: "success" },
        { label: "Magnification", value: magnification ? "Active (Proximity)" : "Disabled" },
        { label: "Material", value: intensity },
        { label: "Last Dispatched", value: lastAction },
      ]}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Material Intensity"
            value={intensity}
            onChange={(v) => setIntensity(v as "subtle" | "balanced" | "rich")}
            options={[
              { value: "subtle", label: "Subtle (12px blur)" },
              { value: "balanced", label: "Balanced (18px blur)" },
              { value: "rich", label: "Rich (28px blur)" },
            ]}
          />
          <StageControlSelect
            label="Magnification"
            value={magnification ? "enabled" : "disabled"}
            onChange={(v) => setMagnification(v === "enabled")}
            options={[
              { value: "enabled", label: "Magnification On" },
              { value: "disabled", label: "Magnification Off" },
            ]}
          />
          <StageControlSelect
            label="Orientation"
            value={orientation}
            onChange={(v) => setOrientation(v as "horizontal" | "vertical")}
            options={[
              { value: "horizontal", label: "Horizontal (Bottom/Top)" },
              { value: "vertical", label: "Vertical (Sidebar/Edge)" },
            ]}
          />
        </div>
      }
    >
      <div className="relative w-full min-h-[440px] rounded-2xl border border-white/60 dark:border-white/[0.12] bg-white/30 dark:bg-neutral-950/40 backdrop-blur-xl shadow-lg overflow-hidden flex flex-col justify-between p-4 sm:p-6">
        {/* Workspace Canvas Top Navigation & Metrics */}
        <div className="w-full flex flex-col gap-4 relative z-10">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="size-3 rounded-full bg-rose-500/80" />
              <div className="size-3 rounded-full bg-amber-500/80" />
              <div className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono font-medium text-muted-foreground">
                Creative Studio OS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Liquid Glass Active
              </span>
            </div>
          </div>

          {/* Background Content That Glints Through Liquid Glass */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-white/50 dark:border-white/[0.08] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent">
              <span className="text-[11px] font-mono text-muted-foreground uppercase">Optical Diffusion</span>
              <p className="text-sm font-semibold text-foreground mt-0.5">24px Gaussian Saturation</p>
            </div>
            <div className="p-3.5 rounded-xl border border-white/50 dark:border-white/[0.08] bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent">
              <span className="text-[11px] font-mono text-muted-foreground uppercase">Layer 03 Refraction</span>
              <p className="text-sm font-semibold text-foreground mt-0.5">135° Specular Edge</p>
            </div>
            <div className="p-3.5 rounded-xl border border-white/50 dark:border-white/[0.08] bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-transparent hidden sm:block">
              <span className="text-[11px] font-mono text-muted-foreground uppercase">Tactile Proximity</span>
              <p className="text-sm font-semibold text-foreground mt-0.5">Dynamic Radial Magnification</p>
            </div>
          </div>
        </div>

        {/* Floating Dock Surface with True Liquid Glass Optics */}
        <div
          className={cn(
            "transition-all duration-300 z-20 flex justify-center py-4",
            orientation === "vertical"
              ? "absolute left-4 top-1/2 -translate-y-1/2"
              : "w-full mt-auto"
          )}
        >
          <Dock
            orientation={orientation}
            intensity={intensity}
            magnification={magnification}
            className="shadow-2xl"
          >
            <DockItem
              href="#home"
              label="Home"
              icon={Home01Icon}
              isActive={activeItem === "Home"}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem("Home");
                setLastAction("Navigate → Home");
              }}
            />
            <DockItem
              label="Search Workspace"
              icon={Search01Icon}
              onClick={() => {
                setLastAction("Action → Global Search Modal");
              }}
            />
            <DockItem
              label="Create Project"
              icon={Add01Icon}
              onClick={() => {
                setLastAction("Action → New Project Created");
              }}
            />
            <DockItem
              label="Notifications"
              icon={Notification01Icon}
              badge="4"
              onClick={() => {
                setLastAction("Action → Notifications Drawer");
              }}
            />
            <DockItem
              href="#profile"
              label="User Profile"
              icon={UserIcon}
              isActive={activeItem === "Profile"}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem("Profile");
                setLastAction("Navigate → Profile");
              }}
            />

            <DockSeparator />

            <DockItem
              href="#settings"
              label="Preferences"
              icon={Settings01Icon}
              isActive={activeItem === "Settings"}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem("Settings");
                setLastAction("Navigate → Preferences");
              }}
            />
          </Dock>
        </div>
      </div>
    </PreviewStageShell>
  );
}
