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
} from "@/components/ui/context-menu";
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
  Folder01Icon,
  Edit01Icon,
  Copy01Icon,
  Share01Icon,
  Archive02Icon,
  Delete02Icon,
  UserIcon,
  Settings02Icon,
  CreditCardIcon,
  Download01Icon,
  ViewIcon,
  Layers01Icon,
  File01Icon,
  Image01Icon,
  CodeIcon,
  LockIcon,
  Mouse01Icon,
} from "@hugeicons/core-free-icons";

// Context Menu interactive demonstrations

export function ContextMenuDemonstrations() {
  const [showRulers, setShowRulers] = React.useState(true);
  const [showOutlines, setShowOutlines] = React.useState(false);
  const [colorMode, setColorMode] = React.useState("p3");
  const [actionLog, setActionLog] = React.useState<string>("No action triggered yet");

  return (
    <div className="space-y-16">
      {/* 1. File & Asset Actions with Submenus & Destructive Variant */}
      <section id="file-actions" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            File &amp; Document Object Context Menu
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Standard desktop contextual action menu on a document card. Includes nested export and share submenus, keyboard shortcut hints, and a semantic destructive item.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ContextMenu>
              <ContextMenuTrigger className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/60 bg-background/60 hover:bg-background/90 transition-all cursor-context-menu text-center shadow-xs">
                <HaloIcon icon={Image01Icon} size={28} className="text-primary" />
                <span className="mt-2 text-xs font-semibold text-foreground">Hero-Banner.png</span>
                <span className="text-[11px] text-muted-foreground">3.4 MB · PNG Image</span>
                <span className="mt-2 text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                  Right-click
                </span>
              </ContextMenuTrigger>

              <ContextMenuContent className="w-56">
                <ContextMenuItem onClick={() => setActionLog("Opened Hero-Banner.png")}>
                  <HaloIcon icon={ViewIcon} size={15} />
                  <span>Preview</span>
                  <ContextMenuShortcut>Space</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => setActionLog("Renamed Hero-Banner.png")}>
                  <HaloIcon icon={Edit01Icon} size={15} />
                  <span>Rename</span>
                  <ContextMenuShortcut>↵</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => setActionLog("Duplicated Hero-Banner.png")}>
                  <HaloIcon icon={Copy01Icon} size={15} />
                  <span>Duplicate</span>
                  <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                </ContextMenuItem>

                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <HaloIcon icon={Download01Icon} size={15} />
                    <span>Export As</span>
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-44">
                    <ContextMenuItem onClick={() => setActionLog("Exported WebP")}>WebP Image</ContextMenuItem>
                    <ContextMenuItem onClick={() => setActionLog("Exported AVIF")}>AVIF High-DPI</ContextMenuItem>
                    <ContextMenuItem onClick={() => setActionLog("Exported SVG")}>SVG Vector</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>

                <ContextMenuSeparator />
                <ContextMenuItem
                  variant="destructive"
                  onClick={() => setActionLog("Deleted Hero-Banner.png")}
                >
                  <HaloIcon icon={Delete02Icon} size={15} />
                  <span>Delete File</span>
                  <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <ContextMenu>
              <ContextMenuTrigger className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/60 bg-background/60 hover:bg-background/90 transition-all cursor-context-menu text-center shadow-xs">
                <HaloIcon icon={CodeIcon} size={28} className="text-primary" />
                <span className="mt-2 text-xs font-semibold text-foreground">schema.prisma</span>
                <span className="text-[11px] text-muted-foreground">8.2 KB · Database Model</span>
                <span className="mt-2 text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                  Right-click
                </span>
              </ContextMenuTrigger>

              <ContextMenuContent className="w-56">
                <ContextMenuItem onClick={() => setActionLog("Opened schema.prisma")}>
                  <HaloIcon icon={Edit01Icon} size={15} />
                  <span>Open in Editor</span>
                  <ContextMenuShortcut>⌘O</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => setActionLog("Generated Prisma Client")}>
                  <HaloIcon icon={Layers01Icon} size={15} />
                  <span>Run Generate</span>
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  variant="destructive"
                  onClick={() => setActionLog("Archived schema.prisma")}
                >
                  <HaloIcon icon={Archive02Icon} size={15} />
                  <span>Move to Trash</span>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <ContextMenu>
              <ContextMenuTrigger className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/60 bg-background/60 hover:bg-background/90 transition-all cursor-context-menu text-center shadow-xs">
                <HaloIcon icon={Folder01Icon} size={28} className="text-primary" />
                <span className="mt-2 text-xs font-semibold text-foreground">Design-Tokens</span>
                <span className="text-[11px] text-muted-foreground">12 items · Directory</span>
                <span className="mt-2 text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                  Right-click
                </span>
              </ContextMenuTrigger>

              <ContextMenuContent className="w-56">
                <ContextMenuItem onClick={() => setActionLog("Opened Folder")}>
                  <HaloIcon icon={Folder01Icon} size={15} />
                  <span>Browse Directory</span>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => setActionLog("Compressed Folder")}>
                  <HaloIcon icon={Archive02Icon} size={15} />
                  <span>Compress to ZIP</span>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  variant="destructive"
                  onClick={() => setActionLog("Deleted Folder")}
                >
                  <HaloIcon icon={Delete02Icon} size={15} />
                  <span>Delete Directory</span>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>

          <div className="pt-2 text-[11px] text-muted-foreground font-mono flex items-center justify-between border-t border-border/50">
            <span>Last action dispatched:</span>
            <span className="text-foreground font-medium">{actionLog}</span>
          </div>
        </div>
      </section>

      {/* 2. Data Table Row Context Menu */}
      <section id="table-row" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Data Table Row Context Menu
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Secondary-clicking a row executes operations directly on that specific contextual entity without disrupting text selection or table semantic hierarchy.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <div className="overflow-hidden rounded-xl border border-border/60 bg-background/70 divide-y divide-border/60">
            {[
              { id: "usr_01", name: "Marcus Vance", email: "marcus@domain.io", role: "Owner", status: "Active" },
              { id: "usr_02", name: "Elena Rostova", email: "elena@domain.io", role: "Engineer", status: "Active" },
              { id: "usr_03", name: "Liam Gallagher", email: "liam@domain.io", role: "Designer", status: "Pending" },
            ].map((user) => (
              <ContextMenu key={user.id}>
                <ContextMenuTrigger className="flex items-center justify-between px-4 py-3 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors cursor-context-menu select-none">
                  <div className="flex items-center gap-3">
                    <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{user.name}</p>
                      <p className="text-[11px] text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-muted-foreground font-medium">{user.role}</span>
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {user.status}
                    </span>
                  </div>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-56">
                  <ContextMenuLabel>{user.name}</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={() => setActionLog(`Viewed ${user.name}`)}>
                    <HaloIcon icon={UserIcon} size={15} />
                    <span>View Profile</span>
                    <ContextMenuShortcut>⌘P</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => setActionLog(`Edited ${user.name} Role`)}>
                    <HaloIcon icon={Settings02Icon} size={15} />
                    <span>Change Role</span>
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => setActionLog(`Copied ${user.email}`)}>
                    <HaloIcon icon={Copy01Icon} size={15} />
                    <span>Copy Email Address</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem
                    variant="destructive"
                    onClick={() => setActionLog(`Suspended ${user.name}`)}
                  >
                    <HaloIcon icon={LockIcon} size={15} />
                    <span>Suspend User</span>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Checkbox & Radio Selection Options */}
      <section id="selection-items" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Checkbox Toggles &amp; Radio Choice Groups
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Preserve stateful choices in the context menu with dedicated tick indicators for multi-select booleans and bullet discs for single-choice radio groups.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <ContextMenu>
            <ContextMenuTrigger className="p-8 rounded-2xl border border-border/60 bg-background/50 hover:bg-background/80 transition-all cursor-context-menu text-center shadow-xs flex flex-col items-center justify-center">
              <HaloIcon icon={ViewIcon} size={28} className="text-primary" />
              <p className="mt-2 text-sm font-semibold text-foreground">Canvas Viewport Options</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Active Settings: Rulers ({showRulers ? "ON" : "OFF"}), Outlines ({showOutlines ? "ON" : "OFF"}), Profile ({colorMode.toUpperCase()})
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/60 bg-muted/30 text-[11px] font-medium text-muted-foreground">
                <HaloIcon icon={Mouse01Icon} size={12} />
                <span>Right-click to toggle view options</span>
              </div>
            </ContextMenuTrigger>

            <ContextMenuContent className="w-56">
              <ContextMenuLabel>Canvas Overlays</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem
                checked={showRulers}
                onCheckedChange={(c) => setShowRulers(!!c)}
              >
                Show Measurement Rulers
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem
                checked={showOutlines}
                onCheckedChange={(c) => setShowOutlines(!!c)}
              >
                Show Element Outlines
              </ContextMenuCheckboxItem>

              <ContextMenuSeparator />
              <ContextMenuLabel>Color Profile</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value={colorMode} onValueChange={setColorMode}>
                <ContextMenuRadioItem value="srgb">Standard sRGB</ContextMenuRadioItem>
                <ContextMenuRadioItem value="p3">Display P3 Wide Gamut</ContextMenuRadioItem>
                <ContextMenuRadioItem value="rec2020">Rec. 2020 HDR</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </section>

      {/* 4. Disabled Items & Inset Alignment */}
      <section id="disabled-and-inset" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Disabled Items &amp; Inset Visual Alignment
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Disabled actions are non-interactive, skipped by keyboard focus navigation, and rendered with reduced contrast. Inset items align cleanly with icon-prefixed actions.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <ContextMenu>
            <ContextMenuTrigger className="p-6 rounded-xl border border-border/60 bg-background/50 hover:bg-background/80 transition-all cursor-context-menu text-center shadow-xs">
              <p className="text-xs font-semibold text-foreground">Read-Only Document Zone</p>
              <p className="text-[11px] text-muted-foreground">Right-click to view enabled vs. disabled operations</p>
            </ContextMenuTrigger>

            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <HaloIcon icon={Copy01Icon} size={15} />
                <span>Copy Content</span>
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                <HaloIcon icon={Edit01Icon} size={15} />
                <span>Edit Document (Locked)</span>
                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                <HaloIcon icon={Delete02Icon} size={15} />
                <span>Delete (Permission Denied)</span>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuLabel inset>Quick Jump</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem inset>Go to Section 1</ContextMenuItem>
              <ContextMenuItem inset>Go to Appendix</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </section>

      {/* 5. Cascading Submenus */}
      <section id="cascading-submenus" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Cascading Submenus with Hover Grace
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nested menus open on hover with pointer triangular grace or right-arrow key press, and close on left-arrow key or outside pointer interaction.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <ContextMenu>
            <ContextMenuTrigger className="p-6 rounded-xl border border-border/60 bg-background/50 hover:bg-background/80 transition-all cursor-context-menu text-center shadow-xs">
              <p className="text-xs font-semibold text-foreground">Hierarchical Command Region</p>
              <p className="text-[11px] text-muted-foreground">Right-click to test multi-level submenus</p>
            </ContextMenuTrigger>

            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <HaloIcon icon={Folder01Icon} size={15} />
                <span>New Folder</span>
              </ContextMenuItem>

              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <HaloIcon icon={Share01Icon} size={15} />
                  <span>Share Access</span>
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>Anyone with Link</ContextMenuItem>
                  <ContextMenuItem>Organization Only</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>Custom Teams</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-44">
                      <ContextMenuItem>Engineering</ContextMenuItem>
                      <ContextMenuItem>Design System</ContextMenuItem>
                      <ContextMenuItem>Product Leads</ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                </ContextMenuSubContent>
              </ContextMenuSub>

              <ContextMenuSeparator />
              <ContextMenuItem>
                <HaloIcon icon={Archive02Icon} size={15} />
                <span>Archive</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </section>

      {/* 6. Nested Overlay Regression (Context Menu inside Dialog & Sheet) */}
      <section id="nested-overlays" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Nested Overlay Regression: Dialog &amp; Sheet Containment
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verifies that Context Menu portalling, collision detection, and focus restoration function correctly when activated inside modal Dialog and Sheet panels.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 space-y-4 text-xs">
          <div className="flex flex-wrap gap-4">
            {/* Context Menu inside Dialog */}
            <Dialog>
              <DialogTrigger render={<Button variant="outline">Open Test Dialog</Button>} />
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Modal Dialog Surface</DialogTitle>
                  <DialogDescription>
                    Right-click inside the card below to test Context Menu portalling within an active modal dialog.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <ContextMenu>
                    <ContextMenuTrigger className="p-6 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted/70 transition-all cursor-context-menu text-center">
                      <p className="text-xs font-semibold text-foreground">Dialog Internal Card</p>
                      <p className="text-[11px] text-muted-foreground">Right-click here</p>
                    </ContextMenuTrigger>

                    <ContextMenuContent className="w-52">
                      <ContextMenuItem onClick={() => setActionLog("Dialog Item 1")}>Action One</ContextMenuItem>
                      <ContextMenuItem onClick={() => setActionLog("Dialog Item 2")}>Action Two</ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem variant="destructive" onClick={() => setActionLog("Dialog Destructive")}>
                        Destructive Item
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>

                <DialogFooter>
                  <DialogClose render={<Button variant="outline">Close Dialog</Button>} />
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Context Menu inside Sheet */}
            <Sheet>
              <SheetTrigger render={<Button variant="outline">Open Test Sheet</Button>} />
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Slide-over Sheet Surface</SheetTitle>
                  <SheetDescription>
                    Right-click the card below to verify Context Menu rendering over a lateral sheet overlay.
                  </SheetDescription>
                </SheetHeader>

                <div className="py-6">
                  <ContextMenu>
                    <ContextMenuTrigger className="p-6 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted/70 transition-all cursor-context-menu text-center">
                      <p className="text-xs font-semibold text-foreground">Sheet Content Target</p>
                      <p className="text-[11px] text-muted-foreground">Right-click here</p>
                    </ContextMenuTrigger>

                    <ContextMenuContent className="w-52">
                      <ContextMenuItem onClick={() => setActionLog("Sheet Item 1")}>Sheet Action 1</ContextMenuItem>
                      <ContextMenuItem onClick={() => setActionLog("Sheet Item 2")}>Sheet Action 2</ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem variant="destructive" onClick={() => setActionLog("Sheet Destructive")}>
                        Dismiss Option
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>

                <SheetFooter>
                  <SheetClose render={<Button variant="outline">Close Sheet</Button>} />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>
    </div>
  );
}
