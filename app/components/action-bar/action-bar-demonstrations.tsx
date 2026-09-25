"use client";

import * as React from "react";
import {
  Archive02Icon,
  Delete02Icon,
  Folder01Icon,
  MoreHorizontalIcon,
  Share01Icon,
  Download01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  EyeIcon,
  Tv01Icon,
  Tablet01Icon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ActionBar,
  ActionBarGroup,
  ActionBarLabel,
  ActionBarSeparator,
  type ActionBarDensity,
} from "@/components/ui/action-bar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

/**
 * 1. Default Realistic Contextual Action Bar
 * The flagship demonstration: "3 selected" with ButtonGroup, separate destructive button, and overflow.
 * Labels collapse gracefully on compact viewports to preserve touch ergonomics.
 */
export function ActionBarDefaultPreview() {
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const handleAction = (name: string) => {
    setFeedback(`Executed: ${name}`);
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
      <ActionBar aria-label="Contextual batch actions" className="transition-all duration-200">
        {/* Selection Context Area */}
        <ActionBarLabel count={3}>
          <span className="hidden sm:inline">selected</span>
        </ActionBarLabel>

        <ActionBarSeparator />

        {/* Primary Action Group: Coordinated Button Group */}
        <ActionBarGroup>
          <ButtonGroup>
            <Button
              variant="outline"
              size="sm"
              aria-label="Archive selected items"
              onClick={() => handleAction("Archive")}
              className="touch-manipulation"
            >
              <HaloIcon icon={Archive02Icon} size={15} />
              <span className="hidden min-[480px]:inline">Archive</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              aria-label="Move selected items to folder"
              onClick={() => handleAction("Move to Folder")}
              className="touch-manipulation"
            >
              <HaloIcon icon={Folder01Icon} size={15} />
              <span className="hidden min-[480px]:inline">Move</span>
            </Button>
          </ButtonGroup>
        </ActionBarGroup>

        <ActionBarSeparator />

        {/* Secondary / Destructive Group */}
        <ActionBarGroup>
          <Button
            variant="destructive"
            size="sm"
            aria-label="Delete 3 selected items"
            onClick={() => handleAction("Delete 3 items")}
            className="touch-manipulation"
          >
            <HaloIcon icon={Delete02Icon} size={15} />
            <span className="hidden min-[540px]:inline">Delete</span>
          </Button>
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="More contextual actions"
            onClick={() => handleAction("Open Overflow Menu")}
            className="touch-manipulation shrink-0"
          >
            <HaloIcon icon={MoreHorizontalIcon} size={16} />
          </IconButton>
        </ActionBarGroup>
      </ActionBar>

      {/* Local Feedback Readout */}
      <div className="h-6 flex items-center justify-center">
        {feedback ? (
          <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
            {feedback}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            Responsive design: labels collapse to icons on compact viewports without breaking touch targets.
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * 2. Floating Placement Composition Preview
 * Demonstrates the Action Bar positioned as a floating dock above content.
 * The positioning (fixed/absolute) is owned by the container layout, not hardcoded into ActionBar.
 */
export function ActionBarFloatingPreview() {
  const [selectedItems, setSelectedItems] = React.useState<number[]>([1, 2, 4]);

  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedItems([]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-border/80 bg-card/60 p-4 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
      {/* Mock Content List */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Assets Library
        </span>
        {[1, 2, 3, 4, 5].map((id) => {
          const isSelected = selectedItems.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggleItem(id)}
              className={cn(
                "w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer",
                isSelected
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-border/60 bg-background/50 hover:bg-muted text-muted-foreground"
              )}
            >
              <span>Asset_Render_Scene_0{id}.glb</span>
              <span className="font-mono text-[11px]">
                {isSelected ? "✓ Selected" : "Select"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Action Bar Overlay (Owned by layout) */}
      {selectedItems.length > 0 && (
        <div className="sticky bottom-2 left-0 right-0 flex justify-center pt-4 z-20">
          <ActionBar
            density="default"
            className="shadow-2xl ring-1 ring-black/10 dark:ring-white/15 transition-all duration-200"
            aria-label="Selection batch bar"
          >
            <ActionBarLabel count={selectedItems.length}>
              <span className="hidden sm:inline">selected</span>
            </ActionBarLabel>
            <ActionBarSeparator />
            <ActionBarGroup>
              <Button
                size="sm"
                variant="default"
                aria-label="Export selected assets"
                className="touch-manipulation"
              >
                <HaloIcon icon={Download01Icon} size={14} />
                <span className="hidden min-[480px]:inline">Export</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                aria-label="Share selected assets"
                className="touch-manipulation"
              >
                <HaloIcon icon={Share01Icon} size={14} />
                <span className="hidden min-[480px]:inline">Share</span>
              </Button>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Clear selection"
                onClick={clearSelection}
                className="touch-manipulation shrink-0"
              >
                <HaloIcon icon={Cancel01Icon} size={15} />
              </IconButton>
            </ActionBarGroup>
          </ActionBar>
        </div>
      )}
    </div>
  );
}

/**
 * 3. Compact Icon-Only Presentation
 * High-density tool bar with complete keyboard accessibility and mandatory aria-labels.
 */
export function ActionBarCompactPreview() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3">
      <ActionBar density="compact" aria-label="Quick format actions">
        <ActionBarLabel>
          <span className="text-xs font-medium text-muted-foreground">Tools</span>
        </ActionBarLabel>
        <ActionBarSeparator />
        <ActionBarGroup>
          <IconButton size="sm" variant="ghost" aria-label="Archive selected file">
            <HaloIcon icon={Archive02Icon} size={15} />
          </IconButton>
          <IconButton size="sm" variant="ghost" aria-label="Move selected file">
            <HaloIcon icon={Folder01Icon} size={15} />
          </IconButton>
          <IconButton size="sm" variant="ghost" aria-label="Share selected file">
            <HaloIcon icon={Share01Icon} size={15} />
          </IconButton>
          <ActionBarSeparator />
          <IconButton size="sm" variant="destructive" aria-label="Delete selected file">
            <HaloIcon icon={Delete02Icon} size={15} />
          </IconButton>
        </ActionBarGroup>
      </ActionBar>
      <span className="text-xs text-muted-foreground">density=&quot;compact&quot; with 32px touch targets</span>
    </div>
  );
}

/**
 * 4. Focus Stress Test Preview
 * Proves that child focus rings on edge items, middle items, and button groups are never clipped.
 */
export function ActionBarFocusStressPreview() {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-3.5 sm:p-6 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center gap-1 mb-2">
        <span className="text-xs font-semibold text-foreground">Focus Visibility Verification</span>
        <span className="text-xs text-muted-foreground text-balance max-w-md">
          Tab sequentially through the bar below. Notice how the double-contrast Halo Focus Ring extends cleanly outside without being clipped by the material container.
        </span>
      </div>

      <div className="w-full flex justify-center overflow-x-auto no-scrollbar py-2 px-1">
        <ActionBar aria-label="Focus verification bar" className="transition-all duration-200">
          <Button size="sm" variant="outline" className="touch-manipulation">
            <span className="hidden sm:inline">First Child</span>
            <span className="sm:hidden">Edge 1</span>
          </Button>
          <ActionBarSeparator />
          <ButtonGroup>
            <Button size="sm" variant="outline" className="touch-manipulation">
              <span className="hidden sm:inline">Group Start</span>
              <span className="sm:hidden">Start</span>
            </Button>
            <Button size="sm" variant="outline" className="touch-manipulation">
              <span className="hidden sm:inline">Group Middle</span>
              <span className="sm:hidden">Middle</span>
            </Button>
            <Button size="sm" variant="outline" className="touch-manipulation">
              <span className="hidden sm:inline">Group End</span>
              <span className="sm:hidden">End</span>
            </Button>
          </ButtonGroup>
          <ActionBarSeparator />
          <Button size="sm" variant="destructive" className="touch-manipulation">
            <span className="hidden sm:inline">Destructive Edge</span>
            <span className="sm:hidden">Edge 2</span>
          </Button>
        </ActionBar>
      </div>
    </div>
  );
}

/**
 * 5. Interactive Responsive Simulator Workbench
 * Shows single Action Bar fluidly adapting progressive disclosure across viewports.
 */
export function ActionBarResponsivePreview() {
  const [simWidth, setSimWidth] = React.useState<number>(320);
  const [feedback, setFeedback] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 640) {
      setSimWidth(560);
    }
  }, []);

  const handleAction = (name: string) => {
    setFeedback(`Triggered: ${name}`);
    setTimeout(() => setFeedback(null), 2000);
  };

  const isCompactFrame = simWidth <= 380;
  const isMidFrame = simWidth > 380 && simWidth <= 500;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5">
      {/* Simulation Controls Dock */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-muted/20">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-foreground">Container Width:</span>
          <span className="font-mono text-xs text-muted-foreground font-semibold px-2 py-0.5 rounded-md bg-background border border-border">
            {simWidth}px
          </span>
        </div>

        {/* Viewport Presets */}
        <div className="inline-flex items-center rounded-lg border border-border bg-background p-0.5 gap-0.5">
          <button
            type="button"
            onClick={() => setSimWidth(320)}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer",
              simWidth === 320
                ? "bg-foreground text-background shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <HaloIcon icon={SmartPhone01Icon} size={13} />
            <span>Mobile (320px)</span>
          </button>
          <button
            type="button"
            onClick={() => setSimWidth(440)}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer",
              simWidth === 440
                ? "bg-foreground text-background shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <HaloIcon icon={Tablet01Icon} size={13} />
            <span>Phablet (440px)</span>
          </button>
          <button
            type="button"
            onClick={() => setSimWidth(560)}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer",
              simWidth === 560
                ? "bg-foreground text-background shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <HaloIcon icon={Tv01Icon} size={13} />
            <span>Desktop (560px)</span>
          </button>
        </div>
      </div>

      {/* Simulated Container Frame with Zero-Negative-Clipping Scroll Architecture */}
      <div className="w-full overflow-x-auto no-scrollbar py-2">
        <div className="w-max min-w-full flex flex-col items-center justify-center px-2">
          <div
            style={{ width: `${simWidth}px` }}
            className="transition-all duration-300 ease-out border border-dashed border-border/80 rounded-2xl p-3 sm:p-4 bg-background/50 flex flex-col items-center justify-center min-h-[140px] relative overflow-visible shrink-0"
          >
            {/* Dimension Marker */}
            <div className="absolute top-2 left-3 text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider">
              {isCompactFrame ? "Mobile Viewport Mode" : isMidFrame ? "Phablet Viewport Mode" : "Desktop Viewport Mode"}
            </div>

            <div className="pt-3">
              <ActionBar
                density={isCompactFrame ? "compact" : "default"}
                aria-label="Responsive simulated toolbar"
                className="transition-all duration-200"
              >
                {/* Context Label */}
                <ActionBarLabel count={12}>
                  {!isCompactFrame && <span>selected</span>}
                </ActionBarLabel>

                <ActionBarSeparator />

                {/* Primary Action ButtonGroup */}
                <ActionBarGroup>
                  <ButtonGroup>
                    <Button
                      size={isCompactFrame ? "sm" : "default"}
                      variant="outline"
                      aria-label="Archive 12 items"
                      onClick={() => handleAction("Archive")}
                      className="touch-manipulation"
                    >
                      <HaloIcon icon={Archive02Icon} size={15} />
                      {!isCompactFrame && <span>Archive</span>}
                    </Button>
                    <Button
                      size={isCompactFrame ? "sm" : "default"}
                      variant="outline"
                      aria-label="Move 12 items to folder"
                      onClick={() => handleAction("Move to Folder")}
                      className="touch-manipulation"
                    >
                      <HaloIcon icon={Folder01Icon} size={15} />
                      {!isCompactFrame && <span>Move</span>}
                    </Button>
                  </ButtonGroup>
                </ActionBarGroup>

                <ActionBarSeparator />

                {/* Destructive & Overflow Action */}
                <ActionBarGroup align="end">
                  <Button
                    size={isCompactFrame ? "sm" : "default"}
                    variant="destructive"
                    aria-label="Delete 12 items"
                    onClick={() => handleAction("Delete 12 items")}
                    className="touch-manipulation"
                  >
                    <HaloIcon icon={Delete02Icon} size={15} />
                    {!isCompactFrame && !isMidFrame && <span>Delete</span>}
                  </Button>
                  <IconButton
                    size={isCompactFrame ? "sm" : "default"}
                    variant="ghost"
                    aria-label="More actions"
                    onClick={() => handleAction("More Actions")}
                    className="touch-manipulation shrink-0"
                  >
                    <HaloIcon icon={MoreHorizontalIcon} size={16} />
                  </IconButton>
                </ActionBarGroup>
              </ActionBar>
            </div>
          </div>

          {/* Swipe indicator when target simulation exceeds mobile screen */}
          {simWidth > 380 && (
            <span className="sm:hidden text-[10px] font-mono text-muted-foreground/75 text-center mt-2 select-none">
              ← Swipe horizontally to preview full {simWidth}px desktop width →
            </span>
          )}
        </div>
      </div>

      {/* Simulator HUD Feedback */}
      <div className="h-6 flex items-center justify-center">
        {feedback ? (
          <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full animate-in fade-in duration-150">
            {feedback}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            Click preset buttons above to test fluid progressive disclosure in real-time.
          </span>
        )}
      </div>
    </div>
  );
}
