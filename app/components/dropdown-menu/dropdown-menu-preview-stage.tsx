"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  type DropdownMenuIntensity,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  MoreHorizontalIcon,
  Edit01Icon,
  Copy01Icon,
  Archive02Icon,
  Delete02Icon,
  UserIcon,
  Settings02Icon,
  CreditCardIcon,
  Logout01Icon,
  Share01Icon,
  Folder01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";

type MenuScenario = "actions" | "user" | "preferences";

export function DropdownMenuPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Menu configuration
  const [scenario, setScenario] = React.useState<MenuScenario>("actions");
  const [side, setSide] = React.useState<"bottom" | "top" | "left" | "right">("bottom");
  const [align, setAlign] = React.useState<"start" | "center" | "end">("start");
  const [intensity, setIntensity] = React.useState<DropdownMenuIntensity>("balanced");
  const [sideOffset, setSideOffset] = React.useState(6);

  // Stateful items for preferences scenario
  const [showGrid, setShowGrid] = React.useState(true);
  const [snapGuides, setSnapGuides] = React.useState(false);
  const [density, setDensity] = React.useState("normal");

  const handleReset = () => {
    setScenario("actions");
    setSide("bottom");
    setAlign("start");
    setIntensity("balanced");
    setSideOffset(6);
    setShowGrid(true);
    setSnapGuides(false);
    setDensity("normal");
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const generatedCode = React.useMemo(() => {
    const sideProp = side !== "bottom" ? ` side="${side}"` : "";
    const alignProp = align !== "start" ? ` align="${align}"` : "";
    const intensityProp = intensity !== "balanced" ? ` intensity="${intensity}"` : "";
    const offsetProp = sideOffset !== 6 ? ` sideOffset={${sideOffset}}` : "";

    if (scenario === "user") {
      return `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  UserIcon,
  CreditCardIcon,
  Settings02Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";

export function UserDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <div className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-semibold">
            ES
          </div>
          <span>Eswar Krishna</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent${sideProp}${alignProp}${intensityProp}${offsetProp} className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HaloIcon icon={UserIcon} size={15} />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HaloIcon icon={CreditCardIcon} size={15} />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HaloIcon icon={Settings02Icon} size={15} />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HaloIcon icon={Logout01Icon} size={15} />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;
    }

    if (scenario === "preferences") {
      return `import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ViewIcon } from "@hugeicons/core-free-icons";

export function ViewPreferencesMenu() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [snapGuides, setSnapGuides] = React.useState(false);
  const [density, setDensity] = React.useState("normal");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <HaloIcon icon={ViewIcon} size={15} />
          <span>View Options</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent${sideProp}${alignProp}${intensityProp}${offsetProp} className="w-56">
        <DropdownMenuLabel>Layout Overlays</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show Canvas Grid
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={snapGuides} onCheckedChange={setSnapGuides}>
          Snap to Smart Guides
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Display Density</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  MoreHorizontalIcon,
  Edit01Icon,
  Copy01Icon,
  Share01Icon,
  Archive02Icon,
  Delete02Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";

export function DocumentActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="More document actions">
          <HaloIcon icon={MoreHorizontalIcon} size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent${sideProp}${alignProp}${intensityProp}${offsetProp} className="w-52">
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

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <HaloIcon icon={Share01Icon} size={15} />
            <span>Share</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Invite members</DropdownMenuItem>
            <DropdownMenuItem>Export JSON</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem>
          <HaloIcon icon={Archive02Icon} size={15} />
          <span>Archive</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HaloIcon icon={Delete02Icon} size={15} />
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;
  }, [scenario, side, align, intensity, sideOffset]);

  const telemetry = [
    { label: "Semantic Role", value: "menu / menuitem" },
    { label: "Material Engine", value: `${intensity} Liquid Glass` },
    { label: "Backdrop Scrim", value: "None (Non-Modal)" },
    { label: "Navigation Model", value: "Roving Tabindex + Typeahead" },
    { label: "Placement", value: `${side} / ${align}` },
    { label: "Offset Spacing", value: `${sideOffset}px` },
  ];

  const controls = (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <StageControlSelect
        label="Scenario"
        value={scenario}
        onValueChange={(v) => setScenario(v as MenuScenario)}
        options={[
          { label: "Document Actions", value: "actions" },
          { label: "User Account", value: "user" },
          { label: "View Preferences", value: "preferences" },
        ]}
      />
      <StageControlSelect
        label="Side"
        value={side}
        onValueChange={(v) => setSide(v as "bottom" | "top" | "left" | "right")}
        options={[
          { label: "Bottom (Standard)", value: "bottom" },
          { label: "Top (Inverted)", value: "top" },
          { label: "Left (Leading)", value: "left" },
          { label: "Right (Trailing)", value: "right" },
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
        label="Intensity"
        value={intensity}
        onValueChange={(v) => setIntensity(v as DropdownMenuIntensity)}
        options={[
          { label: "Subtle (Restrained)", value: "subtle" },
          { label: "Balanced (Canonical)", value: "balanced" },
          { label: "Rich (Deep Specular)", value: "rich" },
        ]}
      />
      <StageControlSelect
        label="Side Offset"
        value={String(sideOffset)}
        onValueChange={(v) => setSideOffset(Number(v))}
        options={[
          { label: "4px (Compact)", value: "4" },
          { label: "6px (Standard)", value: "6" },
          { label: "8px (Relaxed)", value: "8" },
          { label: "12px (Detached)", value: "12" },
        ]}
      />
    </div>
  );

  return (
    <PreviewStageShell
      title="Dropdown Menu Live Preview Stage"
      description="Button-triggered temporary action menu engineered with Balanced Liquid Glass optics, roving keyboard navigation, submenus, and composite menu semantics."
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
        <div className="max-w-md space-y-6">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-xs">
            <HaloIcon
              icon={
                scenario === "actions"
                  ? MoreHorizontalIcon
                  : scenario === "user"
                  ? UserIcon
                  : ViewIcon
              }
              size={22}
              className="text-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              {scenario === "actions"
                ? "Document & Object Actions Menu"
                : scenario === "user"
                ? "User Account & Organization Switcher"
                : "Interactive View Preferences Menu"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click the button trigger below or press <code className="font-mono text-[11px] font-semibold">Enter / Space</code> to open the menu. Navigate with arrow keys, type to filter, or press Escape to dismiss.
            </p>
          </div>

          {/* Interactive Trigger Demo Area */}
          <div className="p-8 rounded-2xl border border-border/60 bg-background/40 backdrop-blur-xs flex items-center justify-center">
            {scenario === "actions" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 shadow-xs">
                    <HaloIcon icon={Folder01Icon} size={15} />
                    <span>Project File Actions</span>
                    <HaloIcon icon={MoreHorizontalIcon} size={15} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side={side}
                  align={align}
                  intensity={intensity}
                  sideOffset={sideOffset}
                  className="w-56"
                >
                  <DropdownMenuItem>
                    <HaloIcon icon={Edit01Icon} size={15} />
                    <span>Rename file</span>
                    <DropdownMenuShortcut>↵</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HaloIcon icon={Copy01Icon} size={15} />
                    <span>Duplicate</span>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <HaloIcon icon={Share01Icon} size={15} />
                      <span>Share</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Copy link</DropdownMenuItem>
                      <DropdownMenuItem>Invite teammates</DropdownMenuItem>
                      <DropdownMenuItem>Manage access</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuItem>
                    <HaloIcon icon={Archive02Icon} size={15} />
                    <span>Archive file</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <HaloIcon icon={Delete02Icon} size={15} />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {scenario === "user" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2.5 shadow-xs">
                    <div className="flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] text-background font-bold">
                      EK
                    </div>
                    <span>Eswar Krishna</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side={side}
                  align={align}
                  intensity={intensity}
                  sideOffset={sideOffset}
                  className="w-56"
                >
                  <DropdownMenuLabel>Account &amp; Workspace</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HaloIcon icon={UserIcon} size={15} />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HaloIcon icon={CreditCardIcon} size={15} />
                      <span>Billing &amp; Usage</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HaloIcon icon={Settings02Icon} size={15} />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <HaloIcon icon={Logout01Icon} size={15} />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {scenario === "preferences" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 shadow-xs">
                    <HaloIcon icon={ViewIcon} size={15} />
                    <span>View Options</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side={side}
                  align={align}
                  intensity={intensity}
                  sideOffset={sideOffset}
                  className="w-56"
                >
                  <DropdownMenuLabel>Canvas Overlays</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showGrid}
                    onCheckedChange={(checked) => setShowGrid(!!checked)}
                  >
                    Show Gridlines
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={snapGuides}
                    onCheckedChange={(checked) => setSnapGuides(!!checked)}
                  >
                    Snap to Guides
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>List Density</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
                    <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
