"use client";

import * as React from "react";
import {
  Dock,
  DockItem,
  DockSeparator,
} from "@/components/ui/dock";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Home01Icon,
  Search01Icon,
  Add01Icon,
  Notification01Icon,
  UserIcon,
  Settings01Icon,
  SparklesIcon,
  Folder01Icon,
  Analytics01Icon,
  CloudIcon,
  Share01Icon,
  Bookmark01Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function DockDemonstrations() {
  const [activeItem, setActiveItem] = React.useState<string>("Dashboard");
  const [actionCount, setActionCount] = React.useState<number>(0);

  return (
    <div className="space-y-12">
      {/* 1. Mixed Semantics: Real Links vs Action Buttons */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          1. Mixed Item Semantics: Real Links vs Action Buttons
        </h3>
        <p className="text-sm text-muted-foreground">
          A Dock represents an intentionally limited set of persistent destinations and commands. Passing an <code className="font-mono text-xs">href</code> renders a semantic anchor (<code className="font-mono text-xs">&lt;a&gt;</code>) with router navigation and <code className="font-mono text-xs">aria-current=&quot;page&quot;</code>, while omitting it renders an accessible button (<code className="font-mono text-xs">&lt;button&gt;</code>) for actions like quick creation or modal triggers.
        </p>
        <div className="p-8 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-6">
          <Dock intensity="balanced">
            <DockItem
              href="#dashboard"
              label="Dashboard"
              icon={Home01Icon}
              isActive={activeItem === "Dashboard"}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem("Dashboard");
              }}
            />
            <DockItem
              href="#projects"
              label="Projects"
              icon={Folder01Icon}
              isActive={activeItem === "Projects"}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem("Projects");
              }}
            />
            <DockSeparator />
            <DockItem
              label="Create Project"
              icon={Add01Icon}
              onClick={() => setActionCount((c) => c + 1)}
            />
            <DockItem
              label="Search Files"
              icon={Search01Icon}
              onClick={() => alert("Search modal triggered")}
            />
          </Dock>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>Active Destination: <strong className="text-foreground">{activeItem}</strong></span>
            <span>•</span>
            <span>Actions Dispatched: <strong className="text-primary">{actionCount}</strong></span>
          </div>
        </div>
      </section>

      {/* 2. Current State vs Keyboard Focus Independence */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          2. Permanent Independence: Current State vs Focus Ring
        </h3>
        <p className="text-sm text-muted-foreground">
          Keyboard navigation is a first-class requirement. A current destination item renders an active optical surface and a subtle status indicator dot, while keyboard focus applies Halo&apos;s distinct focus ring (<code className="font-mono text-xs">var(--halo-focus-color)</code>). The active state never swallows the focus indicator.
        </p>
        <div className="p-8 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <Dock intensity="balanced">
            <DockItem
              href="#1"
              label="Analytics"
              icon={Analytics01Icon}
              isActive={true}
            />
            <DockItem
              href="#2"
              label="Cloud Resources"
              icon={CloudIcon}
            />
            <DockItem
              href="#3"
              label="Messages"
              icon={Message01Icon}
            />
            <DockItem
              href="#4"
              label="Bookmarks"
              icon={Bookmark01Icon}
            />
          </Dock>
          <p className="text-xs text-muted-foreground text-center max-w-sm">
            Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[11px] font-mono">Tab</kbd> to focus through items. Notice that focusing the active Analytics link preserves both the active indicator dot and the high-contrast focus outline.
          </p>
        </div>
      </section>

      {/* 3. Magnification with Hit-Target Stability */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          3. Optical Proximity Magnification (Transform Only)
        </h3>
        <p className="text-sm text-muted-foreground">
          When <code className="font-mono text-xs">magnification</code> is enabled, items smoothly scale up to 1.35x based on pointer proximity. Magnification uses CSS transforms (<code className="font-mono text-xs">transform: scale(...)</code>) rather than width or height alterations, ensuring hit-target boundaries remain completely stable and preventing disruptive layout reflows.
        </p>
        <div className="p-8 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <Dock magnification={true} distance={130} maxScale={1.4} intensity="rich">
            <DockItem href="#home" label="Home" icon={Home01Icon} isActive={true} />
            <DockItem label="Search" icon={Search01Icon} />
            <DockItem label="Add Content" icon={Add01Icon} />
            <DockItem label="Alerts" icon={Notification01Icon} badge="3" />
            <DockItem href="#profile" label="Profile" icon={UserIcon} />
            <DockSeparator />
            <DockItem href="#settings" label="Settings" icon={Settings01Icon} />
          </Dock>
          <span className="text-xs text-muted-foreground">
            Move your cursor across the dock to observe continuous radial proximity scaling.
          </span>
        </div>
      </section>

      {/* 4. Badges and Status Notifications */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          4. Compact Notification Badges
        </h3>
        <p className="text-sm text-muted-foreground">
          High-value persistent actions frequently expose notifications (e.g. unread messages, review requests). Badges are positioned on the upper-right quadrant of the hit area and scale harmoniously with the icon during magnification.
        </p>
        <div className="p-8 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <Dock intensity="balanced">
            <DockItem href="#home" label="Home" icon={Home01Icon} />
            <DockItem label="Messages" icon={Message01Icon} badge="12" />
            <DockItem label="Notifications" icon={Notification01Icon} badge="99+" />
            <DockItem href="#bookmarks" label="Bookmarks" icon={Bookmark01Icon} badge="•" />
          </Dock>
        </div>
      </section>

      {/* 5. Fixed Bottom Placement Composition */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          5. Viewport Fixed Placement Composition
        </h3>
        <p className="text-sm text-muted-foreground">
          The Dock component does not enforce <code className="font-mono text-xs">position: fixed</code> by default, giving consumers complete layout flexibility. To anchor the dock permanently to the bottom of the viewport with safe-area protection, wrap it in a fixed positioning container:
        </p>
        <div className="relative h-64 w-full rounded-xl border border-border/80 bg-muted/15 overflow-hidden flex flex-col justify-between p-4">
          <div className="text-xs font-mono text-muted-foreground">Viewport Top / Content Surface</div>
          <div className="p-4 text-center text-xs text-muted-foreground">
            Scrollable workspace content area
          </div>

          {/* Fixed bottom container example */}
          <div className="w-full flex justify-center pb-2">
            <Dock intensity="balanced" className="shadow-2xl">
              <DockItem href="#feed" label="Feed" icon={Home01Icon} isActive={true} />
              <DockItem label="Search" icon={Search01Icon} />
              <DockItem label="Share" icon={Share01Icon} />
              <DockItem href="#profile" label="Profile" icon={UserIcon} />
            </Dock>
          </div>
        </div>
      </section>

      {/* 6. Vertical Tool Palette Dock */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          6. Vertical Floating Tool Palette
        </h3>
        <p className="text-sm text-muted-foreground">
          In vertical orientation, the Dock adapts its geometry and tooltip side placement to anchor along canvas boundaries, serving as an accessible floating utility palette for creative workflows.
        </p>
        <div className="p-8 rounded-xl border border-border/80 bg-background/50 flex items-center justify-center min-h-[300px]">
          <div className="relative w-full max-w-md h-64 rounded-xl border border-border/70 bg-gradient-to-tr from-sky-500/10 via-purple-500/10 to-amber-500/10 p-4 flex items-center">
            <Dock orientation="vertical" intensity="rich" magnification={true} className="shadow-2xl">
              <DockItem label="Select" icon={Search01Icon} isActive={true} />
              <DockItem label="Create Element" icon={Add01Icon} />
              <DockItem label="Cloud Assets" icon={CloudIcon} />
              <DockSeparator />
              <DockItem label="Share Canvas" icon={Share01Icon} />
              <DockItem label="Settings" icon={Settings01Icon} />
            </Dock>
            <div className="flex-1 ml-6 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Interactive Canvas</span>
              <p className="mt-1">Notice how tooltips project to the right when docked vertically, avoiding visual occlusion with cursor movement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Liquid Optical Glass Material Intensity */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          7. Liquid Optical Glass Material Intensities
        </h3>
        <p className="text-sm text-muted-foreground">
          Dock surfaces leverage HaloUI&apos;s 10-layer physical optical engine with three calibrated intensities: Subtle (12px blur), Balanced (18px blur, 180% saturation), and Rich (28px blur, 200% saturation, enhanced specular highlights).
        </p>
        <div className="p-8 rounded-xl border border-border/80 bg-gradient-to-br from-indigo-500/15 via-rose-500/10 to-amber-500/15 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground font-semibold">Subtle Material</span>
            <Dock intensity="subtle">
              <DockItem href="#home" label="Home" icon={Home01Icon} isActive={true} />
              <DockItem label="Search" icon={Search01Icon} />
              <DockItem label="Notifications" icon={Notification01Icon} />
            </Dock>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground font-semibold">Balanced Material (Default)</span>
            <Dock intensity="balanced">
              <DockItem href="#home" label="Home" icon={Home01Icon} isActive={true} />
              <DockItem label="Search" icon={Search01Icon} />
              <DockItem label="Notifications" icon={Notification01Icon} />
            </Dock>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground font-semibold">Rich Material</span>
            <Dock intensity="rich">
              <DockItem href="#home" label="Home" icon={Home01Icon} isActive={true} />
              <DockItem label="Search" icon={Search01Icon} />
              <DockItem label="Notifications" icon={Notification01Icon} />
            </Dock>
          </div>
        </div>
      </section>

      {/* 8. Active Destination vs Keyboard Focus Ring */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          8. Active Destination Pip vs Keyboard Focus Ring
        </h3>
        <p className="text-sm text-muted-foreground">
          WCAG 2.1 AA mandates that keyboard focus rings (<code className="font-mono text-xs">var(--halo-focus-color)</code>) remain completely distinguishable from the active destination bottom illumination dot.
        </p>
        <div className="p-8 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center gap-4">
          <Dock intensity="balanced">
            <DockItem href="#home" label="Home (Active + Focused)" icon={Home01Icon} isActive={true} className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2" />
            <DockItem href="#projects" label="Projects" icon={Folder01Icon} />
            <DockItem href="#settings" label="Settings" icon={Settings01Icon} />
          </Dock>
          <span className="text-xs text-muted-foreground">
            The active dot sits under the item icon while the focus ring illuminates the outer boundary.
          </span>
        </div>
      </section>
    </div>
  );
}
