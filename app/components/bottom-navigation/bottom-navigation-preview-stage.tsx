"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  BottomNavigation,
  BottomNavigationItem,
} from "@/components/ui/bottom-navigation";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Search01Icon,
  Bookmark01Icon,
  UserIcon,
  SparklesIcon,
  Notification01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function BottomNavigationPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("mobile");
  const [intensity, setIntensity] = React.useState<"subtle" | "balanced" | "rich">("balanced");
  const [activeRoute, setActiveRoute] = React.useState<string>("Home");
  const [showBadges, setShowBadges] = React.useState<boolean>(true);
  const [fixedMode, setFixedMode] = React.useState<boolean>(false);

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("mobile");
    setIntensity("balanced");
    setActiveRoute("Home");
    setShowBadges(true);
    setFixedMode(false);
  }, []);

  const generatedCode = React.useMemo(() => {
    return `import {
  BottomNavigation,
  BottomNavigationItem,
} from "@/components/ui/bottom-navigation";
import {
  Home01Icon,
  Search01Icon,
  Bookmark01Icon,
  Notification01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

export function MobileAppNavigation({ currentRoute }: { currentRoute: string }) {
  return (
    <BottomNavigation intensity="${intensity}" fixed={${fixedMode}}>
      <BottomNavigationItem
        href="#home"
        label="Home"
        icon={Home01Icon}
        isActive={currentRoute === "Home"}
      />
      <BottomNavigationItem
        href="#search"
        label="Search"
        icon={Search01Icon}
        isActive={currentRoute === "Search"}
      />
      <BottomNavigationItem
        href="#activity"
        label="Activity"
        icon={Notification01Icon}
        isActive={currentRoute === "Activity"}
        ${showBadges ? 'badge="3"' : ""}
      />
      <BottomNavigationItem
        href="#saved"
        label="Saved"
        icon={Bookmark01Icon}
        isActive={currentRoute === "Saved"}
      />
      <BottomNavigationItem
        href="#profile"
        label="Profile"
        icon={UserIcon}
        isActive={currentRoute === "Profile"}
      />
    </BottomNavigation>
  );
}`;
  }, [intensity, fixedMode, showBadges]);

  return (
    <PreviewStageShell
      title="Bottom Navigation Live Stage"
      description="A mobile-first persistent navigation surface for primary application destinations with safe-area protection and optical liquid glass."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={generatedCode}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={[
        { label: "Active Destination", value: activeRoute, variant: "success" },
        { label: "Safe Area Inset", value: "env(safe-area-inset-bottom)" },
        { label: "Hit Target", value: "56px (Touch-optimized)" },
        { label: "Material", value: intensity },
      ]}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Intensity"
            value={intensity}
            onChange={(v) => setIntensity(v as "subtle" | "balanced" | "rich")}
            options={[
              { value: "subtle", label: "Subtle" },
              { value: "balanced", label: "Balanced" },
              { value: "rich", label: "Rich" },
            ]}
          />
          <StageControlSelect
            label="Badges"
            value={showBadges ? "visible" : "hidden"}
            onChange={(v) => setShowBadges(v === "visible")}
            options={[
              { value: "visible", label: "Visible" },
              { value: "hidden", label: "Hidden" },
            ]}
          />
          <StageControlSelect
            label="Layout"
            value={fixedMode ? "fixed" : "inline"}
            onChange={(v) => setFixedMode(v === "fixed")}
            options={[
              { value: "inline", label: "Simulated Shell" },
              { value: "fixed", label: "Fixed Viewport" },
            ]}
          />
        </div>
      }
    >
      <div className="relative w-full flex justify-center py-4 overflow-hidden">
        {/* Realistic Mobile Viewport Phone Frame with True Liquid Glass Surface */}
        <div className="relative z-10 w-full max-w-sm h-[520px] rounded-3xl border border-white/80 dark:border-white/[0.16] bg-white/70 dark:bg-[#121418]/75 backdrop-blur-2xl backdrop-saturate-180 shadow-2xl overflow-hidden flex flex-col justify-between">
          {/* Mobile Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-mono text-muted-foreground border-b border-white/40 dark:border-white/[0.06] bg-white/20 dark:bg-white/[0.02]">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 rounded-xs border border-muted-foreground/60 p-0.5 flex items-center">
                <div className="w-full h-full bg-muted-foreground rounded-xs" />
              </div>
            </div>
          </div>

          {/* Scrollable Mobile Content Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Discover</h3>
                <p className="text-xs text-muted-foreground">Active: {activeRoute} Feed</p>
              </div>
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HaloIcon icon={SparklesIcon} size={16} />
              </div>
            </div>

            {/* Simulated Feed Cards with rich translucency */}
            <div className="p-3.5 rounded-2xl border border-white/60 dark:border-white/[0.08] bg-white/30 dark:bg-white/[0.03] backdrop-blur-md space-y-1.5 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-primary font-semibold">Primary Navigation</span>
              <p className="text-xs font-medium text-foreground">
                Mobile-first primary destinations remain permanently reachable with standard touch targets.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl border border-white/60 dark:border-white/[0.08] bg-white/30 dark:bg-white/[0.03] backdrop-blur-md space-y-1.5 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">Optical Engine</span>
              <p className="text-xs text-muted-foreground">
                Notice how scrolling content is diffused beneath the navigation bar, maintaining pristine contrast and clear active pill indicators.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl border border-white/60 dark:border-white/[0.08] bg-white/30 dark:bg-white/[0.03] backdrop-blur-md space-y-1.5 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">Accessibility</span>
              <p className="text-xs text-muted-foreground">
                Every destination is a real link with <code className="font-mono text-[10px]">aria-current=&quot;page&quot;</code> and generous 56px touch target.
              </p>
            </div>
          </div>

          {/* Bottom Navigation Component */}
          <BottomNavigation
            intensity={intensity}
            fixed={fixedMode}
            className={cn(!fixedMode && "rounded-b-[22px]")}
          >
            <BottomNavigationItem
              href="#home"
              label="Home"
              icon={Home01Icon}
              isActive={activeRoute === "Home"}
              onClick={(e) => {
                e.preventDefault();
                setActiveRoute("Home");
              }}
            />
            <BottomNavigationItem
              href="#search"
              label="Search"
              icon={Search01Icon}
              isActive={activeRoute === "Search"}
              onClick={(e) => {
                e.preventDefault();
                setActiveRoute("Search");
              }}
            />
            <BottomNavigationItem
              href="#activity"
              label="Activity"
              icon={Notification01Icon}
              isActive={activeRoute === "Activity"}
              badge={showBadges ? "3" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setActiveRoute("Activity");
              }}
            />
            <BottomNavigationItem
              href="#saved"
              label="Saved"
              icon={Bookmark01Icon}
              isActive={activeRoute === "Saved"}
              onClick={(e) => {
                e.preventDefault();
                setActiveRoute("Saved");
              }}
            />
            <BottomNavigationItem
              href="#profile"
              label="Profile"
              icon={UserIcon}
              isActive={activeRoute === "Profile"}
              onClick={(e) => {
                e.preventDefault();
                setActiveRoute("Profile");
              }}
            />
          </BottomNavigation>
        </div>
      </div>
    </PreviewStageShell>
  );
}
