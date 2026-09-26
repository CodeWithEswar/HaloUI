"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  type DropdownMenuIntensity,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Submenu,
  SubmenuTrigger,
  SubmenuContent,
} from "@/components/ui/submenu";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  Download01Icon,
  Share01Icon,
  Edit01Icon,
  Copy01Icon,
  Delete02Icon,
  Layers01Icon,
  ViewIcon,
  UserIcon,
  LockIcon,
  Mouse01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type SubmenuScenario = "export" | "share" | "modes";
type HostType = "dropdown" | "context";

export function SubmenuPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Submenu configuration
  const [scenario, setScenario] = React.useState<SubmenuScenario>("export");
  const [host, setHost] = React.useState<HostType>("dropdown");
  const [side, setSide] = React.useState<"right" | "left">("right");
  const [intensity, setIntensity] = React.useState<DropdownMenuIntensity>("balanced");

  const handleReset = () => {
    setScenario("export");
    setHost("dropdown");
    setSide("right");
    setIntensity("balanced");
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const generatedCode = React.useMemo(() => {
    const sideProp = side !== "right" ? ` side="${side}"` : "";
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";

    if (host === "context") {
      return `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Submenu,
  SubmenuTrigger,
  SubmenuContent,
} from "@/components/ui/submenu";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Download01Icon, Share01Icon, Delete02Icon } from "@hugeicons/core-free-icons";

export function ContextSubmenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="p-8 rounded-2xl border border-border/60 bg-background/50 text-center">
        Right-click this surface
      </ContextMenuTrigger>

      <ContextMenuContent${intensityProp} className="w-56">
        <ContextMenuItem>Quick Preview</ContextMenuItem>
        
        {/* Nested Submenu Branch */}
        <Submenu>
          <SubmenuTrigger>
            <HaloIcon icon={Share01Icon} size={15} />
            <span>Share Document</span>
          </SubmenuTrigger>
          <SubmenuContent${sideProp} className="w-48">
            <ContextMenuItem>Copy Link</ContextMenuItem>
            <ContextMenuItem>Email Invite</ContextMenuItem>
            <ContextMenuItem>Manage Permissions</ContextMenuItem>
          </SubmenuContent>
        </Submenu>

        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <HaloIcon icon={Delete02Icon} size={15} />
          <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`;
    }

    return `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Submenu,
  SubmenuTrigger,
  SubmenuContent,
} from "@/components/ui/submenu";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Download01Icon, Share01Icon, Layers01Icon } from "@hugeicons/core-free-icons";

export function DropdownSubmenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>Project Actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent${intensityProp} className="w-56">
        <DropdownMenuItem>
          <span>Open File</span>
          <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Nested Submenu Branch */}
        <Submenu>
          <SubmenuTrigger>
            <HaloIcon icon={Download01Icon} size={15} />
            <span>Export Asset</span>
          </SubmenuTrigger>
          <SubmenuContent${sideProp} className="w-48">
            <DropdownMenuItem>WebP Optimized</DropdownMenuItem>
            <DropdownMenuItem>SVG Vector</DropdownMenuItem>
            <DropdownMenuItem>PDF Archive</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lossless PNG</DropdownMenuItem>
          </SubmenuContent>
        </Submenu>

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <span>Delete Asset</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;
  }, [host, scenario, side, intensity]);

  const telemetry = [
    { label: "Component Role", value: "menu / menuitem (Nested)" },
    { label: "Host Hierarchy", value: host === "dropdown" ? "DropdownMenu" : "ContextMenu" },
    { label: "Hover Grace", value: "Pointer Triangle Geometry" },
    { label: "Keyboard Nav", value: "ArrowRight (Open) / ArrowLeft (Close)" },
    { label: "Material Engine", value: `${intensity} Liquid Glass` },
    { label: "Backdrop Scrim", value: "None (Non-Modal)" },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => setScenario(v as SubmenuScenario)}
        options={[
          { label: "Export Formats", value: "export" },
          { label: "Sharing Permissions", value: "share" },
          { label: "Display Modes", value: "modes" },
        ]}
      />
      <StageControlSelect
        label="Parent Menu Host"
        value={host}
        onValueChange={(v) => setHost(v as HostType)}
        options={[
          { label: "Dropdown Menu (Click)", value: "dropdown" },
          { label: "Context Menu (Secondary)", value: "context" },
        ]}
      />
      <StageControlSelect
        label="Expansion Side"
        value={side}
        onValueChange={(v) => setSide(v as "right" | "left")}
        options={[
          { label: "Right (Trailing)", value: "right" },
          { label: "Left (Leading)", value: "left" },
        ]}
      />
      <StageControlSelect
        label="Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as DropdownMenuIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Deep Specular)", value: "rich" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      title="Submenu Live Preview Stage"
      description="Nested menu branch exposing hierarchical command trees with triangular pointer grace, collision boundary flipping, and composite WAI-ARIA arrow navigation."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      controls={controls}
      telemetry={telemetry}
      code={generatedCode}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center justify-center min-h-[380px] p-6 text-center">
        <div className="max-w-md w-full space-y-6">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-xs">
            <HaloIcon
              icon={
                scenario === "export"
                  ? Download01Icon
                  : scenario === "share"
                  ? Share01Icon
                  : Layers01Icon
              }
              size={22}
              className="text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {host === "dropdown" ? "Button-Triggered Submenu Branch" : "Context-Triggered Submenu Branch"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {host === "dropdown" ? (
                <>Click the trigger button below, then hover or press <code className="font-mono text-[11px] font-semibold">ArrowRight</code> on the submenu item to reveal nested options.</>
              ) : (
                <>Right-click inside the trigger card below to open the context menu, then hover over the nested item to inspect child commands.</>
              )}
            </p>
          </div>

          {/* Interactive Trigger Demo Area */}
          <div className="p-8 rounded-2xl border border-border/60 bg-background/50 backdrop-blur-md flex items-center justify-center shadow-xs">
            {host === "dropdown" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 shadow-xs bg-background text-foreground border-border hover:bg-muted hover:text-foreground">
                    <HaloIcon icon={Folder01Icon} size={15} />
                    <span>Project Actions</span>
                    <HaloIcon icon={ArrowRight01Icon} size={13} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent intensity={intensity} className="w-56">
                  <DropdownMenuItem>
                    <HaloIcon icon={Edit01Icon} size={15} />
                    <span>Rename</span>
                    <DropdownMenuShortcut>↵</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HaloIcon icon={Copy01Icon} size={15} />
                    <span>Duplicate</span>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>

                  {/* Nested Submenu */}
                  <Submenu>
                    <SubmenuTrigger>
                      <HaloIcon
                        icon={
                          scenario === "export"
                            ? Download01Icon
                            : scenario === "share"
                            ? Share01Icon
                            : Layers01Icon
                        }
                        size={15}
                      />
                      <span>
                        {scenario === "export"
                          ? "Export As"
                          : scenario === "share"
                          ? "Share Access"
                          : "Display Modes"}
                      </span>
                    </SubmenuTrigger>
                    <SubmenuContent side={side} intensity={intensity} className="w-48">
                      {scenario === "export" && (
                        <>
                          <DropdownMenuItem>WebP Image</DropdownMenuItem>
                          <DropdownMenuItem>AVIF High-DPI</DropdownMenuItem>
                          <DropdownMenuItem>SVG Vector</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>PDF Archive</DropdownMenuItem>
                        </>
                      )}
                      {scenario === "share" && (
                        <>
                          <DropdownMenuItem>Anyone with link</DropdownMenuItem>
                          <DropdownMenuItem>Organization only</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Invite teammates...</DropdownMenuItem>
                        </>
                      )}
                      {scenario === "modes" && (
                        <>
                          <DropdownMenuItem>Standard Canvas</DropdownMenuItem>
                          <DropdownMenuItem>High-Contrast Wireframe</DropdownMenuItem>
                          <DropdownMenuItem>Presentation Fullscreen</DropdownMenuItem>
                        </>
                      )}
                    </SubmenuContent>
                  </Submenu>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <HaloIcon icon={Delete02Icon} size={15} />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <ContextMenu>
                <ContextMenuTrigger className="group p-8 rounded-2xl border border-border/60 bg-background/50 hover:bg-background/80 transition-all cursor-context-menu shadow-xs text-center w-full">
                  <HaloIcon icon={Folder01Icon} size={28} className="mx-auto text-primary" />
                  <p className="mt-2 text-sm font-semibold text-foreground">Project-Specification.pdf</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/60 bg-muted/30 text-[11px] font-medium text-muted-foreground">
                    <HaloIcon icon={Mouse01Icon} size={12} />
                    <span>Right-click anywhere in this card</span>
                  </div>
                </ContextMenuTrigger>

                <ContextMenuContent intensity={intensity} className="w-56">
                  <ContextMenuItem>Preview</ContextMenuItem>
                  <ContextMenuItem>Duplicate</ContextMenuItem>

                  {/* Nested Submenu */}
                  <Submenu>
                    <SubmenuTrigger>
                      <HaloIcon
                        icon={
                          scenario === "export"
                            ? Download01Icon
                            : scenario === "share"
                            ? Share01Icon
                            : Layers01Icon
                        }
                        size={15}
                      />
                      <span>
                        {scenario === "export"
                          ? "Export As"
                          : scenario === "share"
                          ? "Share Access"
                          : "Display Modes"}
                      </span>
                    </SubmenuTrigger>
                    <SubmenuContent side={side} intensity={intensity} className="w-48">
                      {scenario === "export" && (
                        <>
                          <ContextMenuItem>WebP Image</ContextMenuItem>
                          <ContextMenuItem>SVG Vector</ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem>PDF Archive</ContextMenuItem>
                        </>
                      )}
                      {scenario === "share" && (
                        <>
                          <ContextMenuItem>Copy Direct Link</ContextMenuItem>
                          <ContextMenuItem>Team Permissions</ContextMenuItem>
                        </>
                      )}
                      {scenario === "modes" && (
                        <>
                          <ContextMenuItem>Standard</ContextMenuItem>
                          <ContextMenuItem>High Contrast</ContextMenuItem>
                        </>
                      )}
                    </SubmenuContent>
                  </Submenu>

                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    <HaloIcon icon={Delete02Icon} size={15} />
                    <span>Delete File</span>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            )}
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
