"use client";

import * as React from "react";
import {
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
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  File01Icon,
  FloppyDiskIcon,
  Share01Icon,
  Delete02Icon,
  Settings01Icon,
  Tick01Icon,
  InformationCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function MenubarDemonstrations() {
  // Demo states
  const [autoSave, setAutoSave] = React.useState<boolean>(true);
  const [showRulers, setShowRulers] = React.useState<boolean>(false);
  const [colorMode, setColorMode] = React.useState<string>("srgb");
  const [checkedFocusDemo, setCheckedFocusDemo] = React.useState<boolean>(true);
  const [demoActionLog, setDemoActionLog] = React.useState<string>("None");

  return (
    <div className="space-y-12">
      {/* 1. Command Categories with Presentation Shortcuts */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          1. Command Categories &amp; Presentation Shortcuts
        </h3>
        <p className="text-sm text-muted-foreground">
          Top-level triggers organize related commands into logical categories. The{" "}
          <code className="font-mono text-xs">MenubarShortcut</code> component renders shortcut hints
          purely as presentation; keyboard shortcut registration remains application responsibility.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Project</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onSelect={() => setDemoActionLog("New File")}>
                  <HaloIcon icon={File01Icon} size={15} className="mr-1 text-muted-foreground" />
                  New Project
                  <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onSelect={() => setDemoActionLog("Save Project")}>
                  <HaloIcon icon={FloppyDiskIcon} size={15} className="mr-1 text-muted-foreground" />
                  Save
                  <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onSelect={() => setDemoActionLog("Project Settings")}>
                  <HaloIcon icon={Settings01Icon} size={15} className="mr-1 text-muted-foreground" />
                  Settings
                  <MenubarShortcut>⌘,</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Publish</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onSelect={() => setDemoActionLog("Build Production")}>
                  Build Distribution
                  <MenubarShortcut>⌘B</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onSelect={() => setDemoActionLog("Deploy to Cloud")}>
                  Deploy to Edge...
                  <MenubarShortcut>⇧⌘D</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <div className="text-xs font-mono text-muted-foreground">
            Dispatched action: <strong className="text-foreground">{demoActionLog}</strong>
          </div>
        </div>
      </section>

      {/* 2. Checkbox & Radio Command Settings */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          2. Checkbox &amp; Radio Settings
        </h3>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono text-xs">MenubarCheckboxItem</code> handles persistent binary options,
          while <code className="font-mono text-xs">MenubarRadioGroup</code> manages mutually exclusive settings.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Preferences</MenubarTrigger>
              <MenubarContent className="w-56">
                <MenubarLabel>Behavior</MenubarLabel>
                <MenubarCheckboxItem
                  checked={autoSave}
                  onCheckedChange={(c) => setAutoSave(!!c)}
                >
                  Auto-Save Changes
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                  checked={showRulers}
                  onCheckedChange={(c) => setShowRulers(!!c)}
                >
                  Show Canvas Rulers
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarLabel>Color Profile</MenubarLabel>
                <MenubarRadioGroup value={colorMode} onValueChange={setColorMode}>
                  <MenubarRadioItem value="srgb">sRGB Standard</MenubarRadioItem>
                  <MenubarRadioItem value="p3">Display P3 Wide</MenubarRadioItem>
                  <MenubarRadioItem value="rec2020">Rec. 2020</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>Auto-Save: <strong className="text-foreground">{autoSave ? "Enabled" : "Disabled"}</strong></span>
            <span>•</span>
            <span>Rulers: <strong className="text-foreground">{showRulers ? "Visible" : "Hidden"}</strong></span>
            <span>•</span>
            <span>Profile: <strong className="text-foreground uppercase">{colorMode}</strong></span>
          </div>
        </div>
      </section>

      {/* 3. Submenus (Shallow Depth) */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          3. Submenus (Shallow Hierarchy)
        </h3>
        <p className="text-sm text-muted-foreground">
          Submenus partition secondary command variants without cluttering the primary surface.
          Base documentation intentionally demonstrates shallow nesting (1 level depth) to maintain rapid keyboard flow.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Share</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Copy Share Link</MenubarItem>
                <MenubarItem>Invite Collaborators...</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>
                    <HaloIcon icon={Share01Icon} size={15} className="mr-1 text-muted-foreground" />
                    Export Assets
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Vector PDF (.pdf)</MenubarItem>
                    <MenubarItem>High-Res PNG (.png)</MenubarItem>
                    <MenubarItem>Lossless SVG (.svg)</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Compressed Archive (.zip)</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </section>

      {/* 4. Destructive & Disabled Commands */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          4. Destructive &amp; Disabled Commands
        </h3>
        <p className="text-sm text-muted-foreground">
          Destructive commands use distinct semantic red highlighting, while disabled items maintain true
          disabled behavior (non-focusable and non-clickable). Destructive commands do not own confirmation;
          the consuming application coordinates confirmation modals.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Manage</MenubarTrigger>
              <MenubarContent className="w-52">
                <MenubarItem>Duplicate Workspace</MenubarItem>
                <MenubarItem disabled>
                  Revert to Checkpoint (None)
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem variant="destructive">
                  <HaloIcon icon={Delete02Icon} size={15} className="mr-1" />
                  Purge Cache &amp; Reset
                  <MenubarShortcut>⌥⌘⌫</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </section>

      {/* 5. Checked + Focus State QA Verification */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          5. Checked + Keyboard Focus Contrast
        </h3>
        <p className="text-sm text-muted-foreground">
          A checked menu item must never be visually conflated with keyboard focus. When focused with the
          keyboard, the item displays the accent background while retaining its indicator badge.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Accessibility QA</MenubarTrigger>
              <MenubarContent className="w-60">
                <MenubarLabel>Permanent QA State</MenubarLabel>
                <MenubarCheckboxItem
                  checked={checkedFocusDemo}
                  onCheckedChange={(c) => setCheckedFocusDemo(!!c)}
                >
                  High-Contrast Rims
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked={true}>
                  Reduce Motion Physics
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked={false}>
                  Simulate Monochrome
                </MenubarCheckboxItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <p className="text-xs text-muted-foreground text-center max-w-md">
            Open the menu with <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Enter</kbd> or click, then use <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">↓</kbd> / <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">↑</kbd> to inspect the distinct checked and focused states.
          </p>
        </div>
      </section>
    </div>
  );
}
