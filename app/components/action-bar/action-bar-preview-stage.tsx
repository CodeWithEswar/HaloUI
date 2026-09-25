"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
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
import {
  Archive02Icon,
  Delete02Icon,
  Folder01Icon,
  MoreHorizontalIcon,
  Download01Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

export function ActionBarPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls
  const [density, setDensity] = React.useState<ActionBarDensity>("default");
  const [composition, setComposition] = React.useState<"full" | "compact" | "simple">("full");
  const [fullWidth, setFullWidth] = React.useState(false);
  const [count, setCount] = React.useState(3);
  const [actionLog, setActionLog] = React.useState<string>("None");
  const [actionCount, setActionCount] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const feedbackTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const triggerAction = (name: string) => {
    setActionLog(name);
    setActionCount((c) => c + 1);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setActionLog("None");
    }, 2500);
  };

  React.useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const isMobileView = viewport === "mobile";

  const generatedCode = React.useMemo(() => {
    const props = [];
    if (density !== "default") props.push(`density="${density}"`);
    if (fullWidth) props.push("fullWidth");
    const propsStr = props.length > 0 ? " " + props.join(" ") : "";

    if (composition === "compact") {
      return `import { ActionBar, ActionBarGroup, ActionBarLabel, ActionBarSeparator } from "@/components/ui/action-bar";
import { IconButton } from "@/components/ui/icon-button";
import { Archive02Icon, Folder01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function SelectionToolbar() {
  return (
    <ActionBar${propsStr} aria-label="Selection toolbar">
      <ActionBarLabel count={${count}}>
        <span className="hidden sm:inline">items</span>
      </ActionBarLabel>
      <ActionBarSeparator />
      <ActionBarGroup>
        <IconButton size="sm" variant="ghost" aria-label="Archive items">
          <HaloIcon icon={Archive02Icon} size={15} />
        </IconButton>
        <IconButton size="sm" variant="ghost" aria-label="Move items">
          <HaloIcon icon={Folder01Icon} size={15} />
        </IconButton>
        <IconButton size="sm" variant="destructive" aria-label="Delete items">
          <HaloIcon icon={Delete02Icon} size={15} />
        </IconButton>
      </ActionBarGroup>
    </ActionBar>
  );
}`;
    }

    if (composition === "simple") {
      return `import { ActionBar, ActionBarGroup, ActionBarLabel, ActionBarSeparator } from "@/components/ui/action-bar";
import { Button } from "@/components/ui/button";
import { Archive02Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function SelectionToolbar() {
  return (
    <ActionBar${propsStr} aria-label="Selection toolbar">
      <ActionBarLabel count={${count}}>
        <span className="hidden sm:inline">selected</span>
      </ActionBarLabel>
      <ActionBarSeparator />
      <ActionBarGroup>
        <Button size="sm" variant="outline" aria-label="Archive items">
          <HaloIcon icon={Archive02Icon} size={15} />
          <span className="hidden sm:inline">Archive</span>
        </Button>
        <Button size="sm" variant="destructive" aria-label="Delete items">
          <HaloIcon icon={Delete02Icon} size={15} />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </ActionBarGroup>
    </ActionBar>
  );
}`;
    }

    return `import { ActionBar, ActionBarGroup, ActionBarLabel, ActionBarSeparator } from "@/components/ui/action-bar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Archive02Icon, Folder01Icon, Delete02Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function SelectionToolbar() {
  return (
    <ActionBar${propsStr} aria-label="Selection toolbar">
      {/* Contextual selection readout */}
      <ActionBarLabel count={${count}}>
        <span className="hidden sm:inline">selected</span>
      </ActionBarLabel>

      <ActionBarSeparator />

      {/* Primary coordinated actions */}
      <ActionBarGroup>
        <ButtonGroup>
          <Button size="sm" variant="outline" aria-label="Archive items">
            <HaloIcon icon={Archive02Icon} size={15} />
            <span className="hidden sm:inline">Archive</span>
          </Button>
          <Button size="sm" variant="outline" aria-label="Move items">
            <HaloIcon icon={Folder01Icon} size={15} />
            <span className="hidden sm:inline">Move</span>
          </Button>
        </ButtonGroup>
      </ActionBarGroup>

      <ActionBarSeparator />

      {/* Critical & overflow actions */}
      <ActionBarGroup align="end">
        <Button size="sm" variant="destructive" aria-label="Delete items">
          <HaloIcon icon={Delete02Icon} size={15} />
          <span className="hidden sm:inline">Delete</span>
        </Button>
        <IconButton size="sm" variant="ghost" aria-label="More actions">
          <HaloIcon icon={MoreHorizontalIcon} size={16} />
        </IconButton>
      </ActionBarGroup>
    </ActionBar>
  );
}`;
  }, [density, composition, fullWidth, count]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      onCopy={copyCodeToClipboard}
      copied={copiedCode}
      telemetry={[
        {
          label: "Density",
          value: density.toUpperCase(),
        },
        {
          label: "Composition",
          value: composition === "full" ? "Rich + ButtonGroup" : composition === "compact" ? "Icon-Only" : "Simple",
        },
        {
          label: "Width",
          value: fullWidth ? "Full Width (100%)" : "Content Width",
        },
        {
          label: "Selected Context",
          value: `${count} items`,
        },
        {
          label: "Last Action",
          value: actionLog,
          variant: actionLog !== "None" ? "success" : undefined,
        },
        {
          label: "Invocations",
          value: String(actionCount),
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Density"
            value={density}
            onValueChange={(val) => setDensity(val as ActionBarDensity)}
            options={[
              { label: "Compact", value: "compact" },
              { label: "Default", value: "default" },
              { label: "Spacious", value: "spacious" },
            ]}
          />

          <StageControlSelect
            label="Composition"
            value={composition}
            onValueChange={(val) => setComposition(val as any)}
            options={[
              { label: "Full (ButtonGroup + Destructive)", value: "full" },
              { label: "Compact (Icons)", value: "compact" },
              { label: "Simple (Buttons)", value: "simple" },
            ]}
          />

          <StageControlSelect
            label="Width Mode"
            value={fullWidth ? "full" : "content"}
            onValueChange={(val) => setFullWidth(val === "full")}
            options={[
              { label: "Content Width", value: "content" },
              { label: "Full Width (100%)", value: "full" },
            ]}
          />

          <StageControlSelect
            label="Selected Count"
            value={String(count)}
            onValueChange={(val) => setCount(Number(val))}
            options={[
              { label: "1 Selected", value: "1" },
              { label: "3 Selected", value: "3" },
              { label: "12 Selected", value: "12" },
            ]}
          />
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-4 py-8 w-full px-2 sm:px-4 overflow-visible">
        <ActionBar
          density={density}
          fullWidth={fullWidth}
          aria-label="Interactive action bar preview"
          className="transition-all duration-200"
        >
          {composition === "compact" ? (
            <>
              <ActionBarLabel count={count}>
                <span className={cn(isMobileView ? "hidden" : "hidden min-[480px]:inline")}>items</span>
              </ActionBarLabel>
              <ActionBarSeparator />
              <ActionBarGroup>
                <IconButton
                  size={density === "compact" ? "sm" : "default"}
                  variant="ghost"
                  aria-label="Archive items"
                  onClick={() => triggerAction("Archive")}
                  className="touch-manipulation"
                >
                  <HaloIcon icon={Archive02Icon} size={15} />
                </IconButton>
                <IconButton
                  size={density === "compact" ? "sm" : "default"}
                  variant="ghost"
                  aria-label="Move items"
                  onClick={() => triggerAction("Move")}
                  className="touch-manipulation"
                >
                  <HaloIcon icon={Folder01Icon} size={15} />
                </IconButton>
                <IconButton
                  size={density === "compact" ? "sm" : "default"}
                  variant="destructive"
                  aria-label="Delete items"
                  onClick={() => triggerAction("Delete")}
                  className="touch-manipulation"
                >
                  <HaloIcon icon={Delete02Icon} size={15} />
                </IconButton>
              </ActionBarGroup>
            </>
          ) : composition === "simple" ? (
            <>
              <ActionBarLabel count={count}>
                <span className={cn(isMobileView ? "hidden" : "hidden min-[480px]:inline")}>selected</span>
              </ActionBarLabel>
              <ActionBarSeparator />
              <ActionBarGroup>
                <Button
                  size={density === "compact" ? "sm" : "default"}
                  variant="outline"
                  aria-label="Archive selected items"
                  onClick={() => triggerAction("Archive")}
                  className="touch-manipulation"
                >
                  <HaloIcon icon={Archive02Icon} size={15} />
                  <span className={cn(isMobileView ? "hidden" : "hidden min-[480px]:inline")}>Archive</span>
                </Button>
                <Button
                  size={density === "compact" ? "sm" : "default"}
                  variant="destructive"
                  aria-label="Delete selected items"
                  onClick={() => triggerAction("Delete")}
                  className="touch-manipulation"
                >
                  <HaloIcon icon={Delete02Icon} size={15} />
                  <span className={cn(isMobileView ? "hidden" : "hidden min-[480px]:inline")}>Delete</span>
                </Button>
              </ActionBarGroup>
            </>
          ) : (
            <>
              <ActionBarLabel count={count}>
                <span className={cn(isMobileView ? "hidden" : "hidden min-[540px]:inline")}>selected</span>
              </ActionBarLabel>
              <ActionBarSeparator />
              <ActionBarGroup>
                <ButtonGroup>
                  <Button
                    size={density === "compact" ? "sm" : "default"}
                    variant="outline"
                    aria-label="Archive selected items"
                    onClick={() => triggerAction("Archive")}
                    className="touch-manipulation"
                  >
                    <HaloIcon icon={Archive02Icon} size={15} />
                    <span className={cn(isMobileView ? "hidden" : "hidden min-[540px]:inline")}>Archive</span>
                  </Button>
                  <Button
                    size={density === "compact" ? "sm" : "default"}
                    variant="outline"
                    aria-label="Move selected items"
                    onClick={() => triggerAction("Move")}
                    className="touch-manipulation"
                  >
                    <HaloIcon icon={Folder01Icon} size={15} />
                    <span className={cn(isMobileView ? "hidden" : "hidden min-[540px]:inline")}>Move</span>
                  </Button>
                </ButtonGroup>
              </ActionBarGroup>
              <ActionBarSeparator />
              <ActionBarGroup align="end">
                <Button
                  size={density === "compact" ? "sm" : "default"}
                  variant="destructive"
                  aria-label="Delete selected items"
                  onClick={() => triggerAction("Delete")}
                  className="touch-manipulation"
                >
                  <HaloIcon icon={Delete02Icon} size={15} />
                  <span className={cn(isMobileView ? "hidden" : "hidden min-[540px]:inline")}>Delete</span>
                </Button>
                <IconButton
                  size={density === "compact" ? "sm" : "default"}
                  variant="ghost"
                  aria-label="More contextual actions"
                  onClick={() => triggerAction("Overflow Menu")}
                  className="touch-manipulation shrink-0"
                >
                  <HaloIcon icon={MoreHorizontalIcon} size={16} />
                </IconButton>
              </ActionBarGroup>
            </>
          )}
        </ActionBar>

        {/* Live Interaction Feedback HUD */}
        <div className="h-6 flex items-center justify-center pointer-events-none transition-opacity duration-200">
          {actionLog !== "None" ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full shadow-2xs animate-in fade-in zoom-in-95 duration-150">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Action triggered: <strong>{actionLog}</strong> ({count} items)
            </span>
          ) : (
            <span className="text-[11px] text-muted-foreground/70 select-none">
              Interactive preview: click any action or change viewport mode
            </span>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
