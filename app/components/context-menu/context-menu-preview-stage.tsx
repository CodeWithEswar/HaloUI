"use client";

import * as React from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  type ContextMenuIntensity,
} from "@/components/ui/context-menu";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  Edit01Icon,
  Copy01Icon,
  Share01Icon,
  Archive02Icon,
  Delete02Icon,
  UserIcon,
  CreditCardIcon,
  Settings02Icon,
  ViewIcon,
  Layers01Icon,
  Mouse01Icon,
  CursorMagicSelection02Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type ContextScenario = "file" | "record" | "editor";

export function ContextMenuPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Configuration
  const [scenario, setScenario] = React.useState<ContextScenario>("file");
  const [intensity, setIntensity] = React.useState<ContextMenuIntensity>("balanced");
  const [align, setAlign] = React.useState<"start" | "center" | "end">("start");
  const [sideOffset, setSideOffset] = React.useState(4);

  // Stateful toggles for editor scenario
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [wordWrap, setWordWrap] = React.useState(false);
  const [lineNumbers, setLineNumbers] = React.useState("absolute");

  const handleReset = () => {
    setScenario("file");
    setIntensity("balanced");
    setAlign("start");
    setSideOffset(4);
    setShowMinimap(true);
    setWordWrap(false);
    setLineNumbers("absolute");
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const generatedCode = React.useMemo(() => {
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const offsetProp = sideOffset !== 4 ? ` sideOffset={${sideOffset}}` : "";
    const alignProp = align !== "start" ? ` align="${align}"` : "";

    if (scenario === "record") {
      return `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { HaloIcon } from "@/components/icons/halo-icon";
import { UserIcon, CreditCardIcon, Settings02Icon, Delete02Icon } from "@hugeicons/core-free-icons";

export function RecordContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-background/60">
        <div>
          <p className="text-sm font-semibold text-foreground">Sophia Chen</p>
          <p className="text-xs text-muted-foreground">sophia.chen@example.com · Admin</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono">Right-click row</span>
      </ContextMenuTrigger>

      <ContextMenuContent${intensityProp}${offsetProp}${alignProp} className="w-56">
        <ContextMenuLabel>User Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            <HaloIcon icon={UserIcon} size={15} />
            <span>View User Profile</span>
            <ContextMenuShortcut>⌘P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <HaloIcon icon={CreditCardIcon} size={15} />
            <span>Manage Billing</span>
          </ContextMenuItem>
          <ContextMenuItem>
            <HaloIcon icon={Settings02Icon} size={15} />
            <span>Role Permissions</span>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <HaloIcon icon={Delete02Icon} size={15} />
          <span>Revoke Access</span>
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`;
    }

    if (scenario === "editor") {
      return `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

export function EditorContextMenu() {
  const [minimap, setMinimap] = React.useState(true);
  const [wrap, setWrap] = React.useState(false);
  const [lines, setLines] = React.useState("absolute");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="p-8 rounded-xl border border-dashed border-border/80 bg-background/50 font-mono text-xs">
        <div>// Right-click anywhere inside the editor viewport to configure displays</div>
      </ContextMenuTrigger>

      <ContextMenuContent${intensityProp}${offsetProp}${alignProp} className="w-56">
        <ContextMenuLabel>Editor Displays</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={minimap} onCheckedChange={setMinimap}>
          Show Code Minimap
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={wrap} onCheckedChange={setWrap}>
          Soft Word Wrap
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Line Numbering</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={lines} onValueChange={setLines}>
          <ContextMenuRadioItem value="absolute">Absolute Numbers</ContextMenuRadioItem>
          <ContextMenuRadioItem value="relative">Relative Offset</ContextMenuRadioItem>
          <ContextMenuRadioItem value="none">Hidden</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}`;
    }

    return `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  Edit01Icon,
  Copy01Icon,
  Share01Icon,
  Archive02Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";

export function FileContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="p-8 rounded-2xl border border-border/60 bg-background/60 text-center">
        <HaloIcon icon={Folder01Icon} size={28} className="mx-auto text-primary" />
        <p className="mt-2 text-sm font-semibold">Project-Artifacts-2026.pdf</p>
        <p className="text-xs text-muted-foreground">Right-click or secondary tap to inspect options</p>
      </ContextMenuTrigger>

      <ContextMenuContent${intensityProp}${offsetProp}${alignProp} className="w-56">
        <ContextMenuItem>
          <HaloIcon icon={Edit01Icon} size={15} />
          <span>Rename</span>
          <ContextMenuShortcut>↵</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <HaloIcon icon={Copy01Icon} size={15} />
          <span>Duplicate</span>
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <HaloIcon icon={Share01Icon} size={15} />
            <span>Share</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Copy Link</ContextMenuItem>
            <ContextMenuItem>Send via Email</ContextMenuItem>
            <ContextMenuItem>Export as Archive</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>
          <HaloIcon icon={Archive02Icon} size={15} />
          <span>Move to Archive</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <HaloIcon icon={Delete02Icon} size={15} />
          <span>Delete Permanently</span>
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`;
  }, [scenario, intensity, sideOffset, align]);

  const telemetry = [
    { label: "Semantic Role", value: "menu / menuitem" },
    { label: "Material Engine", value: `${intensity} Liquid Glass` },
    { label: "Backdrop Scrim", value: "None (Non-Modal)" },
    { label: "Activation Model", value: "Secondary Click / Long Press" },
    { label: "Collision System", value: "Boundary Auto-Flip" },
    { label: "Offset Spacing", value: `${sideOffset}px` },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => setScenario(v as ContextScenario)}
        options={[
          { label: "File Object", value: "file" },
          { label: "Data Table Row", value: "record" },
          { label: "Code Viewport", value: "editor" },
        ]}
      />
      <StageControlSelect
        label="Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as ContextMenuIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Deep Specular)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Alignment"
        value={align}
        onValueChange={(v) => setAlign(v as "start" | "center" | "end")}
        options={[
          { label: "Start (Default)", value: "start" },
          { label: "Center", value: "center" },
          { label: "End", value: "end" },
        ]}
      />
      <StageControlSelect
        label="Pointer Offset"
        value={String(sideOffset)}
        onValueChange={(v) => setSideOffset(Number(v))}
        options={[
          { label: "2px (Tight)", value: "2" },
          { label: "4px (Standard)", value: "4" },
          { label: "8px (Relaxed)", value: "8" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      title="Context Menu Live Preview Stage"
      description="Pointer and context-triggered floating action surface engineered with HaloUI Balanced Liquid Glass optics, zero backdrop dimming, boundary collision handling, and WAI-ARIA roving keyboard navigation."
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
                scenario === "file"
                  ? Folder01Icon
                  : scenario === "record"
                  ? UserIcon
                  : CursorMagicSelection02Icon
              }
              size={22}
              className="text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {scenario === "file"
                ? "File & Document Object Target"
                : scenario === "record"
                ? "Data Table User Row Target"
                : "Workspace Viewport Target"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Right-click</strong> (or long-press on touch devices) inside the target card below to reveal the context menu. You can navigate the menu items using Arrow keys, activate with Enter/Space, or dismiss with Escape.
            </p>
          </div>

          {/* Interactive Trigger Area */}
          <div className="w-full">
            {scenario === "file" && (
              <ContextMenu>
                <ContextMenuTrigger className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-border/60 bg-background/50 hover:bg-background/80 transition-all cursor-context-menu shadow-xs">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-transform group-hover:scale-105">
                    <HaloIcon icon={Folder01Icon} size={28} />
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-foreground">
                    Release-Artifacts-v2.0.pdf
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    14.2 MB · Modified today at 11:42 AM
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/60 bg-muted/30 text-[11px] font-medium text-muted-foreground">
                    <HaloIcon icon={Mouse01Icon} size={12} />
                    <span>Right-click anywhere in this card</span>
                  </div>
                </ContextMenuTrigger>

                <ContextMenuContent
                  align={align}
                  intensity={intensity}
                  sideOffset={sideOffset}
                  className="w-56"
                >
                  <ContextMenuItem>
                    <HaloIcon icon={Edit01Icon} size={15} />
                    <span>Rename file</span>
                    <ContextMenuShortcut>↵</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <HaloIcon icon={Copy01Icon} size={15} />
                    <span>Duplicate</span>
                    <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                  </ContextMenuItem>

                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      <HaloIcon icon={Share01Icon} size={15} />
                      <span>Share</span>
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                      <ContextMenuItem>Copy Link</ContextMenuItem>
                      <ContextMenuItem>Invite Teammates</ContextMenuItem>
                      <ContextMenuItem>Manage Access</ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>

                  <ContextMenuItem>
                    <HaloIcon icon={Archive02Icon} size={15} />
                    <span>Archive</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    <HaloIcon icon={Delete02Icon} size={15} />
                    <span>Delete</span>
                    <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            )}

            {scenario === "record" && (
              <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-background/50 hover:bg-background/80 transition-all cursor-context-menu shadow-xs text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      SC
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Sophia Chen</p>
                      <p className="text-xs text-muted-foreground">sophia.chen@example.com · Team Lead</p>
                    </div>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-border/60 bg-muted/30 text-[11px] font-mono text-muted-foreground">
                    <span>Right-click row</span>
                  </div>
                </ContextMenuTrigger>

                <ContextMenuContent
                  align={align}
                  intensity={intensity}
                  sideOffset={sideOffset}
                  className="w-56"
                >
                  <ContextMenuLabel>User Operations</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <ContextMenuGroup>
                    <ContextMenuItem>
                      <HaloIcon icon={UserIcon} size={15} />
                      <span>View Profile</span>
                      <ContextMenuShortcut>⌘P</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <HaloIcon icon={CreditCardIcon} size={15} />
                      <span>Billing Account</span>
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <HaloIcon icon={Settings02Icon} size={15} />
                      <span>Role Permissions</span>
                    </ContextMenuItem>
                  </ContextMenuGroup>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    <HaloIcon icon={Delete02Icon} size={15} />
                    <span>Revoke Access</span>
                    <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            )}

            {scenario === "editor" && (
              <ContextMenu>
                <ContextMenuTrigger className="p-6 rounded-2xl border border-dashed border-border/80 bg-background/40 hover:bg-background/60 transition-all cursor-context-menu font-mono text-xs text-left space-y-2">
                  <div className="text-muted-foreground leading-relaxed">
                    <p><span className="text-primary font-bold">1</span>  import &#123; HaloSurface &#125; from &quot;@/components/haloui&quot;;</p>
                    <p><span className="text-primary font-bold">2</span>  </p>
                    <p><span className="text-primary font-bold">3</span>  // Right-click inside this code window to configure</p>
                    <p><span className="text-primary font-bold">4</span>  // editor preferences (Minimap: {showMinimap ? "ON" : "OFF"}, Wrap: {wordWrap ? "ON" : "OFF"}, Mode: {lineNumbers})</p>
                  </div>
                  <div className="pt-2 border-t border-border/40 text-[11px] text-muted-foreground flex items-center justify-between">
                    <span>TypeScript · UTF-8</span>
                    <span className="font-semibold text-foreground">Right-click to configure</span>
                  </div>
                </ContextMenuTrigger>

                <ContextMenuContent
                  align={align}
                  intensity={intensity}
                  sideOffset={sideOffset}
                  className="w-56"
                >
                  <ContextMenuLabel>Editor Displays</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <ContextMenuCheckboxItem
                    checked={showMinimap}
                    onCheckedChange={(c) => setShowMinimap(!!c)}
                  >
                    Show Code Minimap
                  </ContextMenuCheckboxItem>
                  <ContextMenuCheckboxItem
                    checked={wordWrap}
                    onCheckedChange={(c) => setWordWrap(!!c)}
                  >
                    Soft Word Wrap
                  </ContextMenuCheckboxItem>
                  <ContextMenuSeparator />
                  <ContextMenuLabel>Line Numbering</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <ContextMenuRadioGroup value={lineNumbers} onValueChange={setLineNumbers}>
                    <ContextMenuRadioItem value="absolute">Absolute Numbers</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="relative">Relative Offset</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="none">Hidden</ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuContent>
              </ContextMenu>
            )}
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
