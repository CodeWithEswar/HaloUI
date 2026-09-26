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
  type CommandMenuIntensity,
  type CommandMenuVariant,
} from "@/components/ui/command-menu";
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
  StarIcon,
  SparklesIcon,
  GitBranchIcon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type CommandScenario = "workspace" | "devtools" | "navigation";
type ListDensity = "standard" | "extended";

export function CommandMenuPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Command Menu configuration
  const [scenario, setScenario] = React.useState<CommandScenario>("workspace");
  const [variant, setVariant] = React.useState<CommandMenuVariant>("floating");
  const [intensity, setIntensity] = React.useState<CommandMenuIntensity>("balanced");
  const [density, setDensity] = React.useState<ListDensity>("standard");
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  const handleReset = () => {
    setScenario("workspace");
    setVariant("floating");
    setIntensity("balanced");
    setDensity("standard");
    setBackdrop("mesh");
    setViewport("desktop");
    setLastAction(null);
  };

  const handleSelect = (commandName: string) => {
    setLastAction(`Executed "${commandName}" at ${new Date().toLocaleTimeString()}`);
  };

  const generatedCode = React.useMemo(() => {
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const variantProp = variant !== "floating" ? ` variant="${variant}"` : "";

    return `import {
  CommandMenu,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuSeparator,
} from "@/components/ui/command-menu";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  UserAdd01Icon,
  Settings02Icon,
  SecurityIcon,
} from "@hugeicons/core-free-icons";

export function SearchableCommandMenuExample() {
  return (
    <CommandMenu${intensityProp}${variantProp} className="w-full max-w-lg">
      <CommandMenuInput placeholder="Type a command or search..." />
      <CommandMenuList>
        <CommandMenuEmpty>No matching commands found.</CommandMenuEmpty>
        
        <CommandMenuGroup heading="Workspace Actions">
          <CommandMenuItem
            icon={<HaloIcon icon={Folder01Icon} size={15} />}
            shortcut="⌘N"
            onSelect={() => console.log("New Project")}
          >
            Create New Project
          </CommandMenuItem>
          <CommandMenuItem
            icon={<HaloIcon icon={UserAdd01Icon} size={15} />}
            shortcut="⌘I"
            onSelect={() => console.log("Invite Members")}
          >
            Invite Team Members
          </CommandMenuItem>
        </CommandMenuGroup>

        <CommandMenuSeparator />

        <CommandMenuGroup heading="Preferences">
          <CommandMenuItem
            icon={<HaloIcon icon={Settings02Icon} size={15} />}
            shortcut="⌘,"
            onSelect={() => console.log("Settings")}
          >
            Workspace Settings
          </CommandMenuItem>
        </CommandMenuGroup>
      </CommandMenuList>
    </CommandMenu>
  );
}`;
  }, [scenario, variant, intensity, density]);

  const telemetry = [
    { label: "Component Role", value: "cmdk / combobox (Search Menu)" },
    { label: "Surface Variant", value: variant === "floating" ? "Floating Card" : "Embedded Panel" },
    { label: "Material Engine", value: `${intensity} Liquid Glass` },
    { label: "Backdrop Scrim", value: "None (Non-Modal)" },
    { label: "Global Shortcut", value: "External (Not registered in Menu)" },
    { label: "Last Action", value: lastAction ?? "Awaiting user selection..." },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => {
          setScenario(v as CommandScenario);
          setLastAction(null);
        }}
        options={[
          { label: "Workspace Actions", value: "workspace" },
          { label: "Developer Tools", value: "devtools" },
          { label: "Quick Navigation", value: "navigation" },
        ]}
      />
      <StageControlSelect
        label="Surface Variant"
        value={variant}
        onValueChange={(v) => setVariant(v as CommandMenuVariant)}
        options={[
          { label: "Floating (Elevated Glass)", value: "floating" },
          { label: "Embedded (Flat Panel)", value: "embedded" },
        ]}
      />
      <StageControlSelect
        label="Material Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as CommandMenuIntensity)}
        options={[
          { label: "Balanced (Default)", value: "balanced" },
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Rich (Deep Blur)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="List Density"
        value={density}
        onValueChange={(v) => setDensity(v as ListDensity)}
        options={[
          { label: "Standard (Compact)", value: "standard" },
          { label: "Extended (Scrollable)", value: "extended" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      controls={controls}
      telemetry={telemetry}
      code={generatedCode}
    >
      <div className="flex w-full items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg">
          <CommandMenu
            intensity={intensity}
            variant={variant}
            className="w-full"
          >
            <CommandMenuInput
              placeholder={
                scenario === "workspace"
                  ? "Search workspace commands..."
                  : scenario === "devtools"
                  ? "Search developer tools..."
                  : "Jump to documentation or components..."
              }
            />
            <CommandMenuList className={density === "extended" ? "max-h-84" : "max-h-64"}>
              <CommandMenuEmpty>No matching commands found.</CommandMenuEmpty>

              {scenario === "workspace" && (
                <>
                  <CommandMenuGroup heading="Workspace Actions">
                    <CommandMenuItem
                      icon={<HaloIcon icon={Folder01Icon} size={15} />}
                      shortcut="⌘N"
                      onSelect={() => handleSelect("Create New Project")}
                    >
                      Create New Project
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={UserAdd01Icon} size={15} />}
                      shortcut="⌘I"
                      onSelect={() => handleSelect("Invite Team Members")}
                    >
                      Invite Team Members
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={GitBranchIcon} size={15} />}
                      shortcut="⌘B"
                      onSelect={() => handleSelect("Switch Git Branch")}
                    >
                      Switch Branch
                    </CommandMenuItem>
                  </CommandMenuGroup>

                  <CommandMenuSeparator />

                  <CommandMenuGroup heading="Security & Access">
                    <CommandMenuItem
                      icon={<HaloIcon icon={SecurityIcon} size={15} />}
                      onSelect={() => handleSelect("Rotate API Keys")}
                    >
                      Rotate API Keys
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={CreditCardIcon} size={15} />}
                      onSelect={() => handleSelect("Manage Billing")}
                    >
                      Manage Subscriptions
                    </CommandMenuItem>
                  </CommandMenuGroup>

                  {density === "extended" && (
                    <>
                      <CommandMenuSeparator />
                      <CommandMenuGroup heading="Workspace Settings">
                        <CommandMenuItem
                          icon={<HaloIcon icon={Settings02Icon} size={15} />}
                          shortcut="⌘,"
                          onSelect={() => handleSelect("Workspace Settings")}
                        >
                          Workspace Configuration
                        </CommandMenuItem>
                        <CommandMenuItem
                          icon={<HaloIcon icon={Delete02Icon} size={15} />}
                          onSelect={() => handleSelect("Archive Project")}
                        >
                          Archive Workspace
                        </CommandMenuItem>
                      </CommandMenuGroup>
                    </>
                  )}
                </>
              )}

              {scenario === "devtools" && (
                <>
                  <CommandMenuGroup heading="Diagnostics">
                    <CommandMenuItem
                      icon={<HaloIcon icon={TerminalIcon} size={15} />}
                      shortcut="⌥⌘C"
                      onSelect={() => handleSelect("Open Web Console")}
                    >
                      Open Debugger Console
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={CodeCircleIcon} size={15} />}
                      shortcut="⌥⌘I"
                      onSelect={() => handleSelect("Inspect Liquid DOM")}
                    >
                      Inspect Optical Layers
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={GlobalIcon} size={15} />}
                      onSelect={() => handleSelect("Clear Network Cache")}
                    >
                      Clear Service Worker Cache
                    </CommandMenuItem>
                  </CommandMenuGroup>

                  <CommandMenuSeparator />

                  <CommandMenuGroup heading="Environment">
                    <CommandMenuItem
                      icon={<HaloIcon icon={Moon02Icon} size={15} />}
                      shortcut="⌘D"
                      onSelect={() => handleSelect("Toggle Color Scheme")}
                    >
                      Toggle Dark Mode
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={SparklesIcon} size={15} />}
                      onSelect={() => handleSelect("Benchmark FPS")}
                    >
                      Run 60fps Performance Profiler
                    </CommandMenuItem>
                  </CommandMenuGroup>

                  {density === "extended" && (
                    <>
                      <CommandMenuSeparator />
                      <CommandMenuGroup heading="Audit & Storage">
                        <CommandMenuItem
                          icon={<HaloIcon icon={CheckmarkCircle01Icon} size={15} />}
                          onSelect={() => handleSelect("WCAG Color Audit")}
                        >
                          Validate WCAG 2.1 AA Contrast
                        </CommandMenuItem>
                        <CommandMenuItem
                          icon={<HaloIcon icon={Delete02Icon} size={15} />}
                          onSelect={() => handleSelect("Flush Local Storage")}
                        >
                          Flush Local Storage
                        </CommandMenuItem>
                      </CommandMenuGroup>
                    </>
                  )}
                </>
              )}

              {scenario === "navigation" && (
                <>
                  <CommandMenuGroup heading="Core Documentation">
                    <CommandMenuItem
                      icon={<HaloIcon icon={Book02Icon} size={15} />}
                      shortcut="G D"
                      onSelect={() => handleSelect("Navigate to Introduction")}
                    >
                      Introduction & Principles
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={Layers01Icon} size={15} />}
                      shortcut="G L"
                      onSelect={() => handleSelect("Navigate to Liquid Material")}
                    >
                      Liquid Optical Physics
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={SparklesIcon} size={15} />}
                      shortcut="G R"
                      onSelect={() => handleSelect("Navigate to Registry")}
                    >
                      Component Registry Schema
                    </CommandMenuItem>
                  </CommandMenuGroup>

                  <CommandMenuSeparator />

                  <CommandMenuGroup heading="Popular Overlays">
                    <CommandMenuItem
                      icon={<HaloIcon icon={StarIcon} size={15} />}
                      onSelect={() => handleSelect("Navigate to Dropdown Menu")}
                    >
                      Dropdown Menu Component
                    </CommandMenuItem>
                    <CommandMenuItem
                      icon={<HaloIcon icon={StarIcon} size={15} />}
                      onSelect={() => handleSelect("Navigate to Submenu")}
                    >
                      Submenu Component
                    </CommandMenuItem>
                  </CommandMenuGroup>

                  {density === "extended" && (
                    <>
                      <CommandMenuSeparator />
                      <CommandMenuGroup heading="Developer Resources">
                        <CommandMenuItem
                          icon={<HaloIcon icon={GlobalIcon} size={15} />}
                          onSelect={() => handleSelect("View Showcase")}
                        >
                          Halo Control Room Showcase
                        </CommandMenuItem>
                        <CommandMenuItem
                          icon={<HaloIcon icon={GitBranchIcon} size={15} />}
                          onSelect={() => handleSelect("View GitHub")}
                        >
                          GitHub Source Repository
                        </CommandMenuItem>
                      </CommandMenuGroup>
                    </>
                  )}
                </>
              )}
            </CommandMenuList>
          </CommandMenu>

          {lastAction && (
            <div className="mt-3 flex items-center justify-between rounded-xl border border-border/50 bg-background/60 backdrop-blur-md px-3.5 py-2 text-xs text-muted-foreground animate-in fade-in-50 duration-200">
              <div className="flex items-center gap-2">
                <HaloIcon icon={CheckmarkCircle01Icon} size={14} className="text-emerald-500 shrink-0" />
                <span className="font-medium text-foreground">{lastAction}</span>
              </div>
              <button
                type="button"
                onClick={() => setLastAction(null)}
                className="text-[11px] underline hover:text-foreground cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
