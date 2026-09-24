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
 */
export function ActionBarDefaultPreview() {
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const handleAction = (name: string) => {
    setFeedback(`Executed: ${name}`);
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
      <ActionBar aria-label="Contextual batch actions">
        {/* Selection Context Area */}
        <ActionBarLabel count={3}>selected</ActionBarLabel>

        <ActionBarSeparator />

        {/* Primary Action Group: Coordinated Button Group */}
        <ActionBarGroup>
          <ButtonGroup>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction("Archive")}
            >
              <HaloIcon icon={Archive02Icon} size={15} />
              Archive
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction("Move to Folder")}
            >
              <HaloIcon icon={Folder01Icon} size={15} />
              Move
            </Button>
          </ButtonGroup>
        </ActionBarGroup>

        <ActionBarSeparator />

        {/* Secondary / Destructive Group */}
        <ActionBarGroup>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleAction("Delete 3 items")}
          >
            <HaloIcon icon={Delete02Icon} size={15} />
            Delete
          </Button>
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="More contextual actions"
            onClick={() => handleAction("Open Overflow Menu")}
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
            Click any contextual action to test composition and focus behavior.
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
            className="shadow-2xl ring-1 ring-black/10 dark:ring-white/15"
            aria-label="Selection batch bar"
          >
            <ActionBarLabel count={selectedItems.length}>selected</ActionBarLabel>
            <ActionBarSeparator />
            <ActionBarGroup>
              <Button size="sm" variant="default">
                <HaloIcon icon={Download01Icon} size={14} />
                Export
              </Button>
              <Button size="sm" variant="outline">
                <HaloIcon icon={Share01Icon} size={14} />
                Share
              </Button>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Clear selection"
                onClick={clearSelection}
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
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-6 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center gap-1 mb-2">
        <span className="text-xs font-semibold text-foreground">Focus Visibility Verification</span>
        <span className="text-xs text-muted-foreground">
          Tab sequentially through the bar below. Notice how the double-contrast Halo Focus Ring extends cleanly outside without being clipped by the material container.
        </span>
      </div>

      <ActionBar aria-label="Focus verification bar">
        <Button size="sm" variant="outline">
          First Child
        </Button>
        <ActionBarSeparator />
        <ButtonGroup>
          <Button size="sm" variant="outline">
            Group Start
          </Button>
          <Button size="sm" variant="outline">
            Group Middle
          </Button>
          <Button size="sm" variant="outline">
            Group End
          </Button>
        </ButtonGroup>
        <ActionBarSeparator />
        <Button size="sm" variant="destructive">
          Destructive Edge
        </Button>
      </ActionBar>
    </div>
  );
}

/**
 * 5. Responsive Mobile Composition
 * Shows deliberate mobile composition (critical action + overflow) vs desktop rich composition.
 */
export function ActionBarResponsivePreview() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Desktop Composition */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-muted-foreground">Desktop Composition (Full Actions)</span>
        <ActionBar fullWidth aria-label="Desktop bar">
          <ActionBarLabel count={12}>assets selected</ActionBarLabel>
          <ActionBarGroup align="end">
            <ButtonGroup>
              <Button size="sm" variant="outline">Archive</Button>
              <Button size="sm" variant="outline">Move</Button>
              <Button size="sm" variant="outline">Export</Button>
            </ButtonGroup>
            <ActionBarSeparator />
            <Button size="sm" variant="destructive">Delete</Button>
          </ActionBarGroup>
        </ActionBar>
      </div>

      {/* Mobile Deliberate Composition */}
      <div className="flex flex-col gap-2 max-w-xs mx-auto w-full">
        <span className="text-xs font-mono text-muted-foreground">Mobile Composition (Compact + Overflow)</span>
        <ActionBar fullWidth density="compact" aria-label="Mobile bar">
          <ActionBarLabel count={12} className="px-1 text-xs" />
          <ActionBarGroup align="end">
            <Button size="sm" variant="default" className="h-7 text-xs px-2.5">
              Export
            </Button>
            <IconButton size="sm" variant="ghost" className="size-7" aria-label="More actions">
              <HaloIcon icon={MoreHorizontalIcon} size={14} />
            </IconButton>
          </ActionBarGroup>
        </ActionBar>
      </div>
    </div>
  );
}
