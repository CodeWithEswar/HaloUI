"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  DashboardSquare01Icon,
  Activity02Icon,
  Settings02Icon,
  UserGroupIcon,
  CheckmarkCircle02Icon,
  Shield02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function TabsPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component Controls
  const [variant, setVariant] = React.useState<"default" | "line">("default");
  const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">("horizontal");
  const [activationMode, setActivationMode] = React.useState<"automatic" | "manual">("automatic");
  const [showIcons, setShowIcons] = React.useState(true);
  const [showBadges, setShowBadges] = React.useState(true);
  const [disableSettings, setDisableSettings] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("overview");
  const [changeCount, setChangeCount] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleValueChange = (val: any) => {
    setSelectedValue(String(val));
    setChangeCount((c) => c + 1);
  };

  const generatedCode = React.useMemo(() => {
    const listProps = [];
    if (variant !== "default") listProps.push(`variant="${variant}"`);
    if (activationMode === "automatic") listProps.push(`activateOnFocus`);

    const listPropsStr = listProps.length > 0 ? " " + listProps.join(" ") : "";
    const orientProp = orientation !== "horizontal" ? ` orientation="${orientation}"` : "";

    return `import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
${showIcons ? `import { DashboardSquare01Icon, Activity02Icon, Settings02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";` : ""}

export function PeerWorkspaceTabs() {
  const [tab, setTab] = React.useState("${selectedValue}");

  return (
    <Tabs value={tab} onValueChange={setTab}${orientProp}>
      <TabsList${listPropsStr}>
        <TabsTrigger value="overview">
          ${showIcons ? `<HaloIcon icon={DashboardSquare01Icon} size={16} />\n          ` : ""}Overview
        </TabsTrigger>
        <TabsTrigger value="activity">
          ${showIcons ? `<HaloIcon icon={Activity02Icon} size={16} />\n          ` : ""}Activity${showBadges ? `\n          <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">3</span>` : ""}
        </TabsTrigger>
        <TabsTrigger value="settings"${disableSettings ? " disabled" : ""}>
          ${showIcons ? `<HaloIcon icon={Settings02Icon} size={16} />\n          ` : ""}Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        {/* Overview Panel Content */}
      </TabsContent>
      <TabsContent value="activity" className="mt-4">
        {/* Activity Panel Content */}
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        {/* Settings Panel Content */}
      </TabsContent>
    </Tabs>
  );
}`;
  }, [variant, orientation, activationMode, showIcons, showBadges, disableSettings, selectedValue]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      copied={copiedCode}
      onCopy={copyCode}
      controls={
        <div className="w-full flex flex-col gap-2 sm:gap-2.5">
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Variant"
              value={variant}
              onChange={(val) => setVariant(val as any)}
              options={[
                { value: "default", label: "Pills (Liquid Glass)" },
                { value: "line", label: "Line Indicator" },
              ]}
            />
            <StageControlSelect
              label="Orientation"
              value={orientation}
              onChange={(val) => setOrientation(val as any)}
              options={[
                { value: "horizontal", label: "Horizontal" },
                { value: "vertical", label: "Vertical" },
              ]}
            />
            <StageControlSelect
              label="Activation"
              value={activationMode}
              onChange={(val) => setActivationMode(val as any)}
              options={[
                { value: "automatic", label: "Automatic (Focus)" },
                { value: "manual", label: "Manual (Enter/Space)" },
              ]}
            />
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[40px]">
              <Checkbox
                id="tabs-toggle-icons"
                checked={showIcons}
                onCheckedChange={(checked) => setShowIcons(Boolean(checked))}
              />
              <Label
                htmlFor="tabs-toggle-icons"
                className="text-xs sm:text-[13px] text-muted-foreground cursor-pointer font-medium select-none"
              >
                Hugeicons
              </Label>
            </div>
            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[40px]">
              <Checkbox
                id="tabs-toggle-badges"
                checked={showBadges}
                onCheckedChange={(checked) => setShowBadges(Boolean(checked))}
              />
              <Label
                htmlFor="tabs-toggle-badges"
                className="text-xs sm:text-[13px] text-muted-foreground cursor-pointer font-medium select-none"
              >
                Notification Badges
              </Label>
            </div>
            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[40px]">
              <Checkbox
                id="tabs-toggle-disabled"
                checked={disableSettings}
                onCheckedChange={(checked) => setDisableSettings(Boolean(checked))}
              />
              <Label
                htmlFor="tabs-toggle-disabled"
                className="text-xs sm:text-[13px] text-muted-foreground cursor-pointer font-medium select-none"
              >
                Disable Settings Tab
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Tabs
          value={selectedValue}
          onValueChange={handleValueChange}
          orientation={orientation}
          className="w-full"
        >
          <TabsList
            variant={variant}
            activateOnFocus={activationMode === "automatic"}
          >
            <TabsTrigger value="overview">
              {showIcons && <HaloIcon icon={DashboardSquare01Icon} size={15} />}
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity">
              {showIcons && <HaloIcon icon={Activity02Icon} size={15} />}
              Activity
              {showBadges && (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                  3
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="team">
              {showIcons && <HaloIcon icon={UserGroupIcon} size={15} />}
              Team
            </TabsTrigger>
            <TabsTrigger value="settings" disabled={disableSettings}>
              {showIcons && <HaloIcon icon={Settings02Icon} size={15} />}
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="flex-1">
            <TabsContent value="overview">
              <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] p-5 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.08)] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Workspace Overview</h4>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <HaloIcon icon={CheckmarkCircle02Icon} size={14} /> Synced
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Real-time peer summary of active design tokens, verified registries, and runtime optical surfaces.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg border border-border/60 bg-muted/30">
                    <div className="text-[11px] text-muted-foreground">Active Components</div>
                    <div className="text-lg font-bold text-foreground">45 Installed</div>
                  </div>
                  <div className="p-3 rounded-lg border border-border/60 bg-muted/30">
                    <div className="text-[11px] text-muted-foreground">Optical Passes</div>
                    <div className="text-lg font-bold text-foreground">10 Layers</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] p-5 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.08)] space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Recent Event Log</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span>Navigation Tabs physical liquid glass lens calibrated</span>
                    <span className="text-[11px] font-mono text-muted-foreground">Just now</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span>Registry item `calendar` verified and stabilized</span>
                    <span className="text-[11px] font-mono text-muted-foreground">12m ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Local ISO 8601 parser verified for `date-time-picker`</span>
                    <span className="text-[11px] font-mono text-muted-foreground">24m ago</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] p-5 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.08)] space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Active Collaborators</h4>
                <p className="text-xs text-muted-foreground">
                  3 engineers currently modifying design system foundations and optical presets.
                </p>
                <div className="flex -space-x-2 pt-1">
                  <div className="size-8 rounded-full bg-sky-500/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-sky-700 dark:text-sky-300">
                    AE
                  </div>
                  <div className="size-8 rounded-full bg-violet-500/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-violet-700 dark:text-violet-300">
                    JL
                  </div>
                  <div className="size-8 rounded-full bg-amber-500/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-amber-700 dark:text-amber-300">
                    MK
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] p-5 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.08)] space-y-3">
                <div className="flex items-center gap-2">
                  <HaloIcon icon={Shield02Icon} size={16} className="text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">Security & Scope</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Configure repository synchronization hooks, access tokens, and consumer registry distribution endpoints.
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Diagnostics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/60 text-xs font-mono">
          <div className="text-muted-foreground">
            Active: <span className="text-foreground font-semibold">&quot;{selectedValue}&quot;</span>
          </div>
          <div className="text-muted-foreground">
            Orientation: <span className="text-foreground">{orientation}</span>
          </div>
          <div className="text-muted-foreground">
            Activation: <span className="text-foreground">{activationMode}</span>
          </div>
          <div className="text-muted-foreground">
            Changes: <span className="text-foreground font-semibold">{changeCount}</span>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
