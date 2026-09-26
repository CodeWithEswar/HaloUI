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
  type SpotlightIntensity,
} from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Search01Icon,
  Folder01Icon,
  File01Icon,
  UserIcon,
  UserGroupIcon,
  Settings02Icon,
  CodeCircleIcon,
  SparklesIcon,
  SecurityIcon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
  CommandIcon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type PresentationMode = "embedded" | "modal";
type ScopeCategory = "all" | "files" | "people" | "commands";

export function SpotlightPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Spotlight configuration
  const [presentation, setPresentation] = React.useState<PresentationMode>("embedded");
  const [scope, setScope] = React.useState<ScopeCategory>("all");
  const [intensity, setIntensity] = React.useState<SpotlightIntensity>("balanced");
  const [density, setDensity] = React.useState<"standard" | "extended">("standard");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  const handleReset = () => {
    setPresentation("embedded");
    setScope("all");
    setIntensity("balanced");
    setDensity("standard");
    setModalOpen(false);
    setBackdrop("mesh");
    setViewport("desktop");
    setLastAction(null);
  };

  const handleSelect = (title: string, category: string) => {
    setLastAction(`Selected ${category}: "${title}" at ${new Date().toLocaleTimeString()}`);
    if (presentation === "modal") {
      setModalOpen(false);
    }
  };

  const filterTabs = [
    { id: "all", label: "All Items", count: density === "extended" ? 12 : 7 },
    { id: "files", label: "Files & Docs", count: density === "extended" ? 4 : 2 },
    { id: "people", label: "Team Members", count: density === "extended" ? 4 : 2 },
    { id: "commands", label: "Actions", count: density === "extended" ? 4 : 3 },
  ];

  const generatedCode = React.useMemo(() => {
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";

    if (presentation === "modal") {
      return `import * as React from "react";
import {
  SpotlightDialog,
  SpotlightSearch,
  SpotlightFilterTabs,
  SpotlightList,
  SpotlightEmpty,
  SpotlightGroup,
  SpotlightItem,
  SpotlightFooter,
} from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";

export function ModalSpotlightExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Global Spotlight
      </Button>

      <SpotlightDialog
        open={open}
        onOpenChange={setOpen}
        title="Global Discovery"
        description="Search across files, people, and commands."${intensityProp}
      >
        <SpotlightSearch placeholder="Search across files, team members, and actions..." />
        <SpotlightFilterTabs
          tabs={[
            { id: "all", label: "All Items" },
            { id: "files", label: "Files & Docs" },
            { id: "people", label: "People" },
            { id: "commands", label: "Actions" },
          ]}
        />
        <SpotlightList>
          <SpotlightEmpty>No matching results found.</SpotlightEmpty>
          
          <SpotlightGroup heading="Recent Files">
            <SpotlightItem
              category="FILE"
              description="Design Systems / 2026-Roadmap.pdf"
              metadata="Updated 2h ago • 4.2 MB"
              onSelect={() => console.log("Open roadmap")}
            >
              2026 Optical Design Roadmap
            </SpotlightItem>
          </SpotlightGroup>
        </SpotlightList>
        <SpotlightFooter />
      </SpotlightDialog>
    </>
  );
}`;
    }

    return `import {
  Spotlight,
  SpotlightSearch,
  SpotlightFilterTabs,
  SpotlightList,
  SpotlightEmpty,
  SpotlightGroup,
  SpotlightItem,
  SpotlightFooter,
} from "@/components/ui/spotlight";

export function EmbeddedSpotlightExample() {
  return (
    <Spotlight${intensityProp} className="w-full max-w-3xl">
      <SpotlightSearch placeholder="Search across files, team members, and actions..." />
      <SpotlightFilterTabs
        tabs={[
          { id: "all", label: "All Items" },
          { id: "files", label: "Files & Docs" },
          { id: "people", label: "People" },
          { id: "commands", label: "Actions" },
        ]}
      />
      <SpotlightList>
        <SpotlightEmpty>No matching results found.</SpotlightEmpty>

        <SpotlightGroup heading="Documents & Projects">
          <SpotlightItem
            category="DOC"
            description="Documentation / Optical Liquid Glass Spec.md"
            metadata="Edited yesterday • 12 KB"
            onSelect={() => console.log("Open doc")}
          >
            Liquid Glass Optical Specification
          </SpotlightItem>
        </SpotlightGroup>
      </SpotlightList>
      <SpotlightFooter />
    </Spotlight>
  );
}`;
  }, [presentation, intensity]);

  const telemetry = [
    { label: "Component Role", value: "Global Discovery Surface (cmdk)" },
    { label: "Presentation", value: presentation === "modal" ? "Modal Dialog Overlay" : "Embedded Card" },
    { label: "Active Scope", value: scope.toUpperCase() },
    { label: "Backdrop Scrim", value: presentation === "modal" ? "Halo Scrim (Balanced Blur)" : "None (Non-Modal)" },
    { label: "Material Engine", value: `${intensity} Liquid Glass` },
    { label: "Last Action", value: lastAction ?? "Awaiting user selection..." },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StageControlSelect
        label="Presentation Mode"
        value={presentation}
        onValueChange={(v) => {
          setPresentation(v as PresentationMode);
          setLastAction(null);
        }}
        options={[
          { label: "Embedded (In-Page)", value: "embedded" },
          { label: "Modal (Halo Scrim)", value: "modal" },
        ]}
      />
      <StageControlSelect
        label="Filter Scope Tab"
        value={scope}
        onValueChange={(v) => {
          setScope(v as ScopeCategory);
          setLastAction(null);
        }}
        options={[
          { label: "All Items", value: "all" },
          { label: "Files & Documents", value: "files" },
          { label: "Team Members", value: "people" },
          { label: "Actions & Tools", value: "commands" },
        ]}
      />
      <StageControlSelect
        label="Material Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as SpotlightIntensity)}
        options={[
          { label: "Balanced (Default)", value: "balanced" },
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Rich (Deep Specular)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Result Density"
        value={density}
        onValueChange={(v) => setDensity(v as "standard" | "extended")}
        options={[
          { label: "Standard (7 Items)", value: "standard" },
          { label: "Extended (12 Items)", value: "extended" },
        ]}
      />
    </div>
  );

  const renderSpotlightContent = (isModal: boolean) => (
    <>
      <SpotlightSearch placeholder="Search files, documents, team members, or actions..." />
      <SpotlightFilterTabs
        tabs={filterTabs}
        activeTab={scope}
        onTabChange={(tabId) => setScope(tabId as ScopeCategory)}
      />
      <SpotlightList className={isModal ? "max-h-84 sm:max-h-96" : "max-h-72 sm:max-h-80"}>
        <SpotlightEmpty>No matching results in this category.</SpotlightEmpty>

        {(scope === "all" || scope === "files") && (
          <SpotlightGroup heading="Documents & Media">
            <SpotlightItem
              icon={<HaloIcon icon={File01Icon} size={16} className="text-blue-500" />}
              category="PDF"
              description="Engineering / HaloUI-Liquid-Glass-V2-Spec.pdf"
              metadata="Updated 2h ago • 4.8 MB"
              onSelect={() => handleSelect("HaloUI Liquid Glass V2 Spec", "Document")}
            >
              HaloUI Liquid Glass Physical Optical Specification
            </SpotlightItem>
            <SpotlightItem
              icon={<HaloIcon icon={Folder01Icon} size={16} className="text-amber-500" />}
              category="PROJECT"
              description="Design Systems / 2026 Core Component Library"
              metadata="48 components • Active"
              onSelect={() => handleSelect("Core Component Library", "Project")}
            >
              Overlays &amp; Menus Architecture Project
            </SpotlightItem>
            {density === "extended" && (
              <>
                <SpotlightItem
                  icon={<HaloIcon icon={File01Icon} size={16} className="text-emerald-500" />}
                  category="MDX"
                  description="Documentation / Liquid-Material-Guidelines.mdx"
                  metadata="Edited yesterday • 34 KB"
                  onSelect={() => handleSelect("Liquid Material Guidelines", "Document")}
                >
                  Liquid Material Implementation Guidelines
                </SpotlightItem>
                <SpotlightItem
                  icon={<HaloIcon icon={File01Icon} size={16} className="text-purple-500" />}
                  category="ASSET"
                  description="Assets / Branding / HaloUI-Lockup-Vector.svg"
                  metadata="Vector Asset • 120 KB"
                  onSelect={() => handleSelect("HaloUI Brand Vector Lockup", "Asset")}
                >
                  Official HaloUI Brand Vector Lockup
                </SpotlightItem>
              </>
            )}
          </SpotlightGroup>
        )}

        {(scope === "all" || scope === "people") && (
          <>
            {scope === "all" && <SpotlightSeparator />}
            <SpotlightGroup heading="People & Team">
              <SpotlightItem
                icon={<HaloIcon icon={UserIcon} size={16} className="text-indigo-500" />}
                category="DESIGNER"
                description="Senior Interaction Designer • Core System"
                metadata="eswar@haloui.dev • Online"
                onSelect={() => handleSelect("Eswar Prasad", "Person")}
              >
                Eswar Prasad (Design Lead)
              </SpotlightItem>
              <SpotlightItem
                icon={<HaloIcon icon={UserGroupIcon} size={16} className="text-cyan-500" />}
                category="TEAM"
                description="Frontend Architecture &amp; Accessibility Guild"
                metadata="8 contributors • Active"
                onSelect={() => handleSelect("Design System Architecture Guild", "Team")}
              >
                Design System Architecture Guild
              </SpotlightItem>
              {density === "extended" && (
                <>
                  <SpotlightItem
                    icon={<HaloIcon icon={UserIcon} size={16} className="text-rose-500" />}
                    category="ENGINEER"
                    description="Accessibility &amp; WCAG Specialist"
                    metadata="a11y@haloui.dev • Offline"
                    onSelect={() => handleSelect("Elena Rostova", "Person")}
                  >
                    Elena Rostova (A11y Guild)
                  </SpotlightItem>
                  <SpotlightItem
                    icon={<HaloIcon icon={UserIcon} size={16} className="text-amber-500" />}
                    category="ENGINEER"
                    description="Performance &amp; Virtualization Engineer"
                    metadata="perf@haloui.dev • Online"
                    onSelect={() => handleSelect("Marcus Vance", "Person")}
                  >
                    Marcus Vance (Perf Lead)
                  </SpotlightItem>
                </>
              )}
            </SpotlightGroup>
          </>
        )}

        {(scope === "all" || scope === "commands") && (
          <>
            {scope === "all" && <SpotlightSeparator />}
            <SpotlightGroup heading="Actions & System Preferences">
              <SpotlightItem
                icon={<HaloIcon icon={Settings02Icon} size={16} className="text-neutral-500" />}
                category="ACTION"
                description="Open global system tokens and theme manager"
                shortcut="⌘,"
                onSelect={() => handleSelect("Open Theme Preferences", "Action")}
              >
                Configure Liquid Glass Theme Tokens
              </SpotlightItem>
              <SpotlightItem
                icon={<HaloIcon icon={CodeCircleIcon} size={16} className="text-emerald-500" />}
                category="TOOL"
                description="Inspect physical refraction layers and specular edges"
                shortcut="⌥⌘I"
                onSelect={() => handleSelect("Inspect Liquid DOM Layers", "Tool")}
              >
                Launch Optical Refraction Inspector
              </SpotlightItem>
              <SpotlightItem
                icon={<HaloIcon icon={SecurityIcon} size={16} className="text-red-500" />}
                category="SECURITY"
                description="Manage team API credentials and session keys"
                onSelect={() => handleSelect("Rotate API Credentials", "Security")}
              >
                Rotate Workspace Security Credentials
              </SpotlightItem>
              {density === "extended" && (
                <SpotlightItem
                  icon={<HaloIcon icon={SparklesIcon} size={16} className="text-amber-500" />}
                  category="PROFILER"
                  description="Record 60fps frame rate during scroll and hover"
                  shortcut="⌥⌘P"
                  onSelect={() => handleSelect("Record 60fps Profiler", "Tool")}
                >
                  Record Fluid Motion Benchmark
                </SpotlightItem>
              )}
            </SpotlightGroup>
          </>
        )}
      </SpotlightList>
      <SpotlightFooter />
    </>
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
      <div className="flex w-full items-center justify-center p-3 sm:p-6">
        {presentation === "embedded" ? (
          <div className="w-full max-w-3xl">
            <Spotlight intensity={intensity} className="w-full">
              {renderSpotlightContent(false)}
            </Spotlight>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <Button
              variant="outline"
              onClick={() => setModalOpen(true)}
              className="gap-2.5 h-11 px-6 rounded-xl bg-background/80 backdrop-blur-md shadow-xs text-sm font-medium"
            >
              <HaloIcon icon={Search01Icon} size={18} className="text-primary" />
              <span>Launch Spotlight Discovery</span>
              <kbd className="rounded border border-border/60 bg-muted/60 px-2 py-0.5 text-xs font-mono text-muted-foreground">
                ⌘ Space
              </kbd>
            </Button>
            <p className="text-xs text-muted-foreground max-w-sm">
              Click the button to preview Spotlight mounted within a modal Dialog featuring Halo Scrim background attenuation.
            </p>

            <SpotlightDialog
              open={modalOpen}
              onOpenChange={setModalOpen}
              intensity={intensity}
              title="Global Spotlight Search"
              description="Search across files, projects, people, navigation destinations, and application commands."
            >
              {renderSpotlightContent(true)}
            </SpotlightDialog>
          </div>
        )}
      </div>

      {lastAction && (
        <div className="mx-4 mb-4 flex items-center justify-between rounded-xl border border-border/50 bg-background/70 backdrop-blur-md px-4 py-2.5 text-xs text-muted-foreground animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-2">
            <HaloIcon icon={CheckmarkCircle01Icon} size={15} className="text-emerald-500 shrink-0" />
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
    </PreviewStageShell>
  );
}
