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
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
import {
  Submenu,
  SubmenuTrigger,
  SubmenuContent,
} from "@/components/ui/submenu";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  Share01Icon,
  Download01Icon,
  Settings02Icon,
  ViewIcon,
  Copy01Icon,
  Edit01Icon,
  Delete02Icon,
  LockIcon,
  Layers01Icon,
  File01Icon,
  Mouse01Icon,
} from "@hugeicons/core-free-icons";

export function SubmenuDemonstrations() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [showRulers, setShowRulers] = React.useState(false);
  const [resolution, setResolution] = React.useState("2x");
  const [actionLog, setActionLog] = React.useState<string>("No action activated yet");

  return (
    <div className="space-y-16">
      {/* 1. Multi-Level Cascading Submenus */}
      <section id="multi-level" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Multi-Level Cascading Submenus
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cascading nested levels open with automatic pointer triangular grace, keyboard right-arrow expansion, and left-arrow collapse back to the parent trigger.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 shadow-xs">
                <span>Multi-Level Actions</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => setActionLog("Active Document")}>
                <span>Document Root</span>
              </DropdownMenuItem>

              {/* Level 1 Submenu */}
              <Submenu>
                <SubmenuTrigger>
                  <HaloIcon icon={Share01Icon} size={15} />
                  <span>Share Access</span>
                </SubmenuTrigger>
                <SubmenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setActionLog("Shared with Everyone")}>
                    Public Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActionLog("Shared with Org")}>
                    Organization
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Level 2 Submenu */}
                  <Submenu>
                    <SubmenuTrigger>
                      <HaloIcon icon={Settings02Icon} size={15} />
                      <span>Custom Teams</span>
                    </SubmenuTrigger>
                    <SubmenuContent className="w-44">
                      <DropdownMenuItem onClick={() => setActionLog("Shared with Engineering")}>
                        Engineering
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActionLog("Shared with Design")}>
                        Design System
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActionLog("Shared with Security")}>
                        Security Audits
                      </DropdownMenuItem>
                    </SubmenuContent>
                  </Submenu>
                </SubmenuContent>
              </Submenu>

              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => setActionLog("Archived")}>
                <span>Archive Document</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="pt-2 text-[11px] text-muted-foreground font-mono flex items-center justify-between border-t border-border/50">
            <span>Last action dispatched:</span>
            <span className="text-foreground font-medium">{actionLog}</span>
          </div>
        </div>
      </section>

      {/* 2. Submenus with Checkbox and Radio Choices */}
      <section id="nested-controls" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Nested Checkbox Toggles &amp; Radio Groups
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Submenus can organize secondary configuration choices, holding persistent boolean toggles and mutually exclusive option sets within the nested flyout.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 shadow-xs">
                <HaloIcon icon={ViewIcon} size={15} />
                <span>View Configuration</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <span>Reset Viewport</span>
                <DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
              </DropdownMenuItem>

              {/* Nested Viewport Submenu */}
              <Submenu>
                <SubmenuTrigger>
                  <HaloIcon icon={Layers01Icon} size={15} />
                  <span>Canvas Overlays</span>
                </SubmenuTrigger>
                <SubmenuContent className="w-52">
                  <DropdownMenuLabel>Visual Guides</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showGrid}
                    onCheckedChange={(c) => setShowGrid(!!c)}
                  >
                    Display Gridlines
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showRulers}
                    onCheckedChange={(c) => setShowRulers(!!c)}
                  >
                    Measurement Rulers
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Export Pixel Density</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={resolution} onValueChange={setResolution}>
                    <DropdownMenuRadioItem value="1x">Standard 1x</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="2x">Retina @2x</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="3x">Super @3x</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </SubmenuContent>
              </Submenu>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* 3. Disabled Submenu Trigger */}
      <section id="disabled-trigger" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Disabled Submenu Trigger
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When a SubmenuTrigger is disabled, it is skipped by arrow navigation, will not expand on hover or right-arrow, and renders with restrained opacity.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 shadow-xs">
                <span>Account Permissions</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <span>Profile Settings</span>
              </DropdownMenuItem>

              {/* Disabled Submenu */}
              <Submenu>
                <SubmenuTrigger disabled>
                  <HaloIcon icon={LockIcon} size={15} />
                  <span>Billing Management</span>
                </SubmenuTrigger>
                <SubmenuContent className="w-48">
                  <DropdownMenuItem>Invoices</DropdownMenuItem>
                  <DropdownMenuItem>Payment Methods</DropdownMenuItem>
                </SubmenuContent>
              </Submenu>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Audit Logs</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* 4. Menubar Submenu Integration */}
      <section id="menubar-submenus" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Menubar Submenu Integration
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Menubars employ the same shared Submenu infrastructure for desktop application menus, preserving persistent horizontal menubar keyboard switching.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent className="w-52">
                <MenubarItem>New File</MenubarItem>
                <MenubarItem>Open Recent...</MenubarItem>

                <MenubarSub>
                  <MenubarSubTrigger>
                    <HaloIcon icon={Download01Icon} size={15} />
                    <span>Export</span>
                  </MenubarSubTrigger>
                  <MenubarSubContent className="w-44">
                    <MenubarItem>PDF Archive</MenubarItem>
                    <MenubarItem>HTML Document</MenubarItem>
                    <MenubarItem>Markdown</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSeparator />
                <MenubarItem>Close Window</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent className="w-52">
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </section>
    </div>
  );
}
