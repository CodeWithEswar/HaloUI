"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  File01Icon,
  FolderOpenIcon,
  FloppyDiskIcon,
  Share01Icon,
  Logout01Icon,
  UndoIcon,
  RedoIcon,
  ScissorIcon,
  Copy01Icon,
  ClipboardIcon,
  ViewIcon,
  Settings01Icon,
  HelpCircleIcon,
  BookOpen01Icon,
  CommandIcon,
  Delete02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function MenubarPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Application Command States
  const [lastAction, setLastAction] = React.useState<string>("None (Ready)");
  const [showToolbar, setShowToolbar] = React.useState<boolean>(true);
  const [showStatusBar, setShowStatusBar] = React.useState<boolean>(true);
  const [showMinimap, setShowMinimap] = React.useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = React.useState<string>("100");
  const [variant, setVariant] = React.useState<"default" | "dense">("default");

  const handleCommand = (name: string) => {
    setLastAction(name);
  };

  const handleReset = () => {
    setLastAction("Reset to initial state");
    setShowToolbar(true);
    setShowStatusBar(true);
    setShowMinimap(false);
    setZoomLevel("100");
  };

  const generatedCode = React.useMemo(() => {
    return `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";

export function ApplicationMenubar() {
  const [showToolbar, setShowToolbar] = React.useState(${showToolbar});
  const [showStatusBar, setShowStatusBar] = React.useState(${showStatusBar});
  const [zoom, setZoom] = React.useState("${zoomLevel}");

  return (
    <Menubar>
      {/* File Category */}
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => alert("New File")}>
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => alert("Open File")}>
            Open File...
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => alert("Save")}>
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Export As</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>PDF Document (.pdf)</MenubarItem>
              <MenubarItem>PNG Image (.png)</MenubarItem>
              <MenubarItem>SVG Vector (.svg)</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive">
            Exit
            <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Edit Category */}
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut
            <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy
            <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Paste
            <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* View Category */}
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={showToolbar}
            onCheckedChange={(checked) => setShowToolbar(!!checked)}
          >
            Show Toolbar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={showStatusBar}
            onCheckedChange={(checked) => setShowStatusBar(!!checked)}
          >
            Show Status Bar
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Zoom Level</MenubarLabel>
          <MenubarRadioGroup value={zoom} onValueChange={setZoom}>
            <MenubarRadioItem value="50">50%</MenubarRadioItem>
            <MenubarRadioItem value="100">100% (Default)</MenubarRadioItem>
            <MenubarRadioItem value="150">150%</MenubarRadioItem>
            <MenubarRadioItem value="200">200%</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>

      {/* Help Category */}
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Documentation</MenubarItem>
          <MenubarItem>
            Keyboard Shortcuts
            <MenubarShortcut>⌘/</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>About HaloUI</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`;
  }, [showToolbar, showStatusBar, zoomLevel]);

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
        { label: "Last Action", value: lastAction, variant: "success" },
        { label: "Zoom Scale", value: `${zoomLevel}%` },
        { label: "Toolbar", value: showToolbar ? "Shown" : "Hidden" },
        { label: "Status Bar", value: showStatusBar ? "Shown" : "Hidden" },
      ]}
      controls={
        <div className="flex flex-wrap items-center gap-3">
          <StageControlSelect
            label="Layout Density"
            value={variant}
            onChange={(v) => setVariant(v as "default" | "dense")}
            options={[
              { value: "default", label: "Default (h-9)" },
              { value: "dense", label: "Compact (h-8)" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/60 dark:border-white/[0.12] bg-white/20 dark:bg-neutral-950/40 backdrop-blur-xl p-3 sm:p-4 shadow-sm flex flex-col gap-4">
        {/* Application Command Menubar */}
        <div className="w-full flex items-center justify-between gap-3">
          <Menubar className={cn(variant === "dense" && "h-8 text-xs")}>
            {/* File Menu */}
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onSelect={() => handleCommand("File → New Project")}>
                  <HaloIcon icon={File01Icon} size={15} className="mr-1 text-muted-foreground" />
                  New Project
                  <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onSelect={() => handleCommand("File → Open Workspace")}>
                  <HaloIcon icon={FolderOpenIcon} size={15} className="mr-1 text-muted-foreground" />
                  Open Workspace...
                  <MenubarShortcut>⌘O</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onSelect={() => handleCommand("File → Save Canvas")}>
                  <HaloIcon icon={FloppyDiskIcon} size={15} className="mr-1 text-muted-foreground" />
                  Save
                  <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>
                    <HaloIcon icon={Share01Icon} size={15} className="mr-1 text-muted-foreground" />
                    Export
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onSelect={() => handleCommand("Export → PDF Document")}>
                      Export as PDF (.pdf)
                    </MenubarItem>
                    <MenubarItem onSelect={() => handleCommand("Export → PNG Canvas")}>
                      Export as PNG (.png)
                    </MenubarItem>
                    <MenubarItem onSelect={() => handleCommand("Export → Vector SVG")}>
                      Export as SVG (.svg)
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem
                  variant="destructive"
                  onSelect={() => handleCommand("File → Exit Application")}
                >
                  <HaloIcon icon={Logout01Icon} size={15} className="mr-1" />
                  Exit
                  <MenubarShortcut>⌘Q</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Edit Menu */}
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onSelect={() => handleCommand("Edit → Undo")}>
                  <HaloIcon icon={UndoIcon} size={15} className="mr-1 text-muted-foreground" />
                  Undo
                  <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onSelect={() => handleCommand("Edit → Redo")}>
                  <HaloIcon icon={RedoIcon} size={15} className="mr-1 text-muted-foreground" />
                  Redo
                  <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onSelect={() => handleCommand("Edit → Cut")}>
                  <HaloIcon icon={ScissorIcon} size={15} className="mr-1 text-muted-foreground" />
                  Cut
                  <MenubarShortcut>⌘X</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onSelect={() => handleCommand("Edit → Copy")}>
                  <HaloIcon icon={Copy01Icon} size={15} className="mr-1 text-muted-foreground" />
                  Copy
                  <MenubarShortcut>⌘C</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>
                  <HaloIcon icon={ClipboardIcon} size={15} className="mr-1 text-muted-foreground" />
                  Paste (Clipboard empty)
                  <MenubarShortcut>⌘V</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onSelect={() => handleCommand("Edit → Select All")}>
                  Select All
                  <MenubarShortcut>⌘A</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* View Menu */}
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarLabel>Panels & Overlays</MenubarLabel>
                  <MenubarCheckboxItem
                    checked={showToolbar}
                    onCheckedChange={(checked) => {
                      setShowToolbar(!!checked);
                      handleCommand(`View → Toolbar ${!showToolbar ? "Shown" : "Hidden"}`);
                    }}
                  >
                    Show Action Toolbar
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={(checked) => {
                      setShowStatusBar(!!checked);
                      handleCommand(`View → Status Bar ${!showStatusBar ? "Shown" : "Hidden"}`);
                    }}
                  >
                    Show Status Bar
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem
                    checked={showMinimap}
                    onCheckedChange={(checked) => {
                      setShowMinimap(!!checked);
                      handleCommand(`View → Minimap ${!showMinimap ? "Shown" : "Hidden"}`);
                    }}
                  >
                    Show Canvas Minimap
                  </MenubarCheckboxItem>
                </MenubarGroup>
                <MenubarSeparator />
                <MenubarGroup>
                  <MenubarLabel>Zoom Level</MenubarLabel>
                  <MenubarRadioGroup
                    value={zoomLevel}
                    onValueChange={(val) => {
                      setZoomLevel(val);
                      handleCommand(`View → Zoom ${val}%`);
                    }}
                  >
                    <MenubarRadioItem value="50">50%</MenubarRadioItem>
                    <MenubarRadioItem value="100">100% (Actual Size)</MenubarRadioItem>
                    <MenubarRadioItem value="150">150%</MenubarRadioItem>
                    <MenubarRadioItem value="200">200%</MenubarRadioItem>
                  </MenubarRadioGroup>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>

            {/* Help Menu */}
            <MenubarMenu>
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onSelect={() => handleCommand("Help → Documentation")}>
                  <HaloIcon icon={BookOpen01Icon} size={15} className="mr-1 text-muted-foreground" />
                  Documentation
                </MenubarItem>
                <MenubarItem onSelect={() => handleCommand("Help → Keyboard Shortcuts")}>
                  <HaloIcon icon={CommandIcon} size={15} className="mr-1 text-muted-foreground" />
                  Keyboard Shortcuts
                  <MenubarShortcut>⌘/</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onSelect={() => handleCommand("Help → Check for Updates")}>
                  Check for Updates...
                </MenubarItem>
                <MenubarItem onSelect={() => handleCommand("Help → About HaloUI")}>
                  About HaloUI Optical Engine
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {/* Contextual App Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground px-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ready</span>
          </div>
        </div>

        {/* Live Simulated Application Window Affected by Commands */}
        <div className="w-full rounded-2xl relative isolate overflow-hidden flex flex-col transition-all bg-white/40 dark:bg-neutral-950/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/[0.12] shadow-xl before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8)] dark:before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
          {/* Optional Action Toolbar toggled by View menu */}
          {showToolbar && (
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/40 dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.03] backdrop-blur-sm text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="font-semibold text-foreground">Workspace:</span>
                <span className="font-mono text-[11px]">optical-engine.halo</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                <span>Scale: {zoomLevel}%</span>
              </div>
            </div>
          )}

          {/* Interactive Workspace Canvas */}
          <div className="relative p-8 min-h-[160px] flex flex-col items-center justify-center gap-2 text-center">
            <div
              className="p-6 rounded-2xl border border-white/40 dark:border-white/[0.1] bg-white/30 dark:bg-white/[0.04] backdrop-blur-md shadow-sm flex flex-col items-center gap-2 transition-transform duration-200"
              style={{ transform: `scale(${Number(zoomLevel) / 100})` }}
            >
              <HaloIcon icon={SparklesIcon} size={24} className="text-sky-500 drop-shadow-[0_0_12px_rgba(14,165,233,0.5)]" />
              <div className="text-xs sm:text-sm font-medium text-foreground">
                Simulated Canvas Surface
              </div>
              <p className="text-[11px] text-muted-foreground max-w-xs">
                Activate commands from the Menubar above to test coordination, keyboard roving, and binary toggles.
              </p>
            </div>

            {/* Optional Minimap */}
            {showMinimap && (
              <div className="absolute bottom-2 right-2 p-2 rounded-lg border border-border/80 bg-background/80 text-[10px] text-muted-foreground font-mono shadow-xs">
                Minimap Active
              </div>
            )}
          </div>

          {/* Optional Status Bar toggled by View menu */}
          {showStatusBar && (
            <div className="flex items-center justify-between px-3 py-1 border-t border-border/70 bg-muted/20 text-[11px] text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <span>UTF-8</span>
                <span>•</span>
                <span>TypeScript</span>
              </div>
              <div>
                <span>Last Dispatched: <strong className="text-foreground">{lastAction}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
