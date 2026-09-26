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
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  MoreHorizontalIcon,
  Edit01Icon,
  Copy01Icon,
  Share01Icon,
  Archive02Icon,
  Delete02Icon,
  UserIcon,
  Settings02Icon,
  CreditCardIcon,
  Logout01Icon,
  Folder01Icon,
  Download01Icon,
  Notification01Icon,
  ViewIcon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";

export function DropdownMenuDemonstrations() {
  const [showRulers, setShowRulers] = React.useState(true);
  const [showOutlines, setShowOutlines] = React.useState(false);
  const [viewMode, setViewMode] = React.useState("canvas");
  const [actionLog, setActionLog] = React.useState<string>("No action activated yet");

  return (
    <div className="space-y-16">
      {/* 1. Basic Actions with Keyboard Shortcuts & Destructive Variant */}
      <section id="basic-actions" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Action Commands, Shortcuts &amp; Destructive Styling
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Standard action menu with icon support, right-aligned presentational keyboard shortcut hints, and a semantic destructive variant for permanent operations.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 shadow-xs">
                  <span>Document Actions</span>
                  <HaloIcon icon={MoreHorizontalIcon} size={15} className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setActionLog("Renamed document")}>
                  <HaloIcon icon={Edit01Icon} size={15} />
                  <span>Rename</span>
                  <DropdownMenuShortcut>↵</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setActionLog("Duplicated document")}>
                  <HaloIcon icon={Copy01Icon} size={15} />
                  <span>Duplicate</span>
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setActionLog("Archived document")}>
                  <HaloIcon icon={Archive02Icon} size={15} />
                  <span>Archive</span>
                  <DropdownMenuShortcut>⌥A</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setActionLog("Deleted document")}
                >
                  <HaloIcon icon={Delete02Icon} size={15} />
                  <span>Delete permanently</span>
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="text-muted-foreground font-mono">
              Last event: <span className="text-foreground font-semibold">{actionLog}</span>
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Notice that shortcut labels are purely presentational hints. Activating any item updates focus cleanly according to WAI-ARIA menu guidelines.
          </p>
        </div>
      </section>

      {/* 2. Grouped Actions with Inset Labels & Separators */}
      <section id="grouped-actions" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Grouped Actions with Labels &amp; Separators
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Organize complex menus into logical semantic clusters with <code className="font-mono text-xs">&lt;DropdownMenuGroup&gt;</code>, accessible labels, and non-focusable divider lines.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2.5 shadow-xs">
                <HaloIcon icon={UserIcon} size={15} />
                <span>Account &amp; Workspace</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel>Personal Profile</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <HaloIcon icon={UserIcon} size={15} />
                  <span>Public profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HaloIcon icon={CreditCardIcon} size={15} />
                  <span>Billing &amp; invoices</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HaloIcon icon={Notification01Icon} size={15} />
                  <span>Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Organization</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <HaloIcon icon={Folder01Icon} size={15} />
                  <span>Team repositories</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HaloIcon icon={Settings02Icon} size={15} />
                  <span>Workspace settings</span>
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive">
                <HaloIcon icon={Logout01Icon} size={15} />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* 3. Checkbox Items & Radio Groups */}
      <section id="checkbox-radio" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Stateful Checkbox Items &amp; Radio Groups
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Support toggles and mutually exclusive selections directly within menu options. Indicator checkmarks and radio dots provide clear visual feedback without relying on color alone.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 shadow-xs">
                  <HaloIcon icon={ViewIcon} size={15} />
                  <span>View Configuration</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Canvas Features</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showRulers}
                  onCheckedChange={(checked) => setShowRulers(!!checked)}
                >
                  Show Smart Rulers
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showOutlines}
                  onCheckedChange={(checked) => setShowOutlines(!!checked)}
                >
                  Optical Meniscus Outlines
                </DropdownMenuCheckboxItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Perspective Mode</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
                  <DropdownMenuRadioItem value="canvas">2D Flat Canvas</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="isometric">Isometric Depth</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="optical">10-Layer Refraction</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-3 text-muted-foreground">
              <span>Rulers: <strong className="text-foreground">{showRulers ? "On" : "Off"}</strong></span>
              <span>Outlines: <strong className="text-foreground">{showOutlines ? "On" : "Off"}</strong></span>
              <span>Mode: <strong className="text-foreground capitalize">{viewMode}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Cascading Multi-tier Submenus */}
      <section id="submenus" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Cascading Multi-Tier Submenus
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Expand nested menus through keyboard navigation (Right Arrow to open, Left Arrow to close) or pointer hover without exponential glass blur stacking.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 shadow-xs">
                <HaloIcon icon={Download01Icon} size={15} />
                <span>Export &amp; Share</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HaloIcon icon={Download01Icon} size={15} />
                  <span>Export asset as</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Vector SVG (.svg)</DropdownMenuItem>
                  <DropdownMenuItem>Raster PNG (.png @ 2x)</DropdownMenuItem>
                  <DropdownMenuItem>WebP Optimized (.webp)</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Figma Component (.fig)</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HaloIcon icon={Share01Icon} size={15} />
                  <span>Share link</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Copy public link</DropdownMenuItem>
                  <DropdownMenuItem>Invite team members</DropdownMenuItem>
                  <DropdownMenuItem>Generate embed token</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <HaloIcon icon={Archive02Icon} size={15} />
                <span>Download full project bundle</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* 5. Disabled Item Behavior */}
      <section id="disabled-items" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Disabled Items &amp; Roving Focus Bypass
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Disabled items receive <code className="font-mono text-xs">aria-disabled=&quot;true&quot;</code>, muted opacity, and are automatically skipped by roving keyboard focus navigation.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 shadow-xs">
                <span>Manage Permissions</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>View collaborators</DropdownMenuItem>
              <DropdownMenuItem disabled>
                <span>Edit permissions (Admin only)</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <span>Transfer billing (Owner only)</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Request elevated role</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* 6. Nested Overlay Regression (Inside Sheet & Inside Dialog) */}
      <section id="nested-overlays" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Nested Overlay Regression Testing (Inside Sheet &amp; Inside Dialog)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verify that portalled dropdown menus render above parent modal surfaces (Sheet and Dialog) with correct z-index layering, keyboard focus restoration, and without triggering parent dismissal on Escape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Menu inside Sheet */}
          <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
            <h4 className="text-xs font-semibold text-foreground">Menu inside Side Sheet</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Open an inspector sheet containing an embedded dropdown menu. Interacting with the menu does not dismiss the sheet.
            </p>

            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" size="sm">
                    Open Inspector Sheet
                  </Button>
                }
              />
              <SheetContent side="right" className="w-96">
                <SheetHeader>
                  <SheetTitle>Asset Inspector</SheetTitle>
                  <SheetDescription>
                    Configure asset properties. Trigger the menu below to test nested portalled layering.
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-4 py-6 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-background/60">
                    <span className="font-medium text-foreground">Target Operations</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <span>Actions</span>
                          <HaloIcon icon={MoreHorizontalIcon} size={13} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="end" className="w-48">
                        <DropdownMenuItem>Generate WebP</DropdownMenuItem>
                        <DropdownMenuItem>Compress asset</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Remove asset</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <SheetFooter>
                  <SheetClose
                    render={
                      <Button variant="outline" size="sm">
                        Close Sheet
                      </Button>
                    }
                  />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          {/* Menu inside Dialog */}
          <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 space-y-3">
            <h4 className="text-xs font-semibold text-foreground">Menu inside Modal Dialog</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Open a task dialog containing an action menu. Ensure focus returns cleanly to the menu trigger inside the dialog upon dismissal.
            </p>

            <Dialog>
              <DialogTrigger
                render={
                  <Button variant="outline" size="sm">
                    Open Settings Dialog
                  </Button>
                }
              />
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Repository Settings</DialogTitle>
                  <DialogDescription>
                    Manage default branch and deployment rules.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-background/60">
                    <div>
                      <span className="font-semibold text-foreground block">Production Branch</span>
                      <span className="text-[11px] text-muted-foreground font-mono">main (protected)</span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <span>Branch Rules</span>
                          <HaloIcon icon={MoreHorizontalIcon} size={13} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="end" className="w-52">
                        <DropdownMenuItem>Require PR review</DropdownMenuItem>
                        <DropdownMenuItem>Require status checks</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Unlock branch</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose
                    render={
                      <Button variant="outline" size="sm">
                        Done
                      </Button>
                    }
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
}
