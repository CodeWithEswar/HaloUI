"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  CommandPalette,
  CommandPaletteDialog,
  CommandPaletteTrigger,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteSeparator,
  type CommandPaletteIntensity,
} from "@/components/ui/command-palette";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  DashboardSquare01Icon,
  Folder01Icon,
  Analytics01Icon,
  SparklesIcon,
  UserAdd01Icon,
  Settings02Icon,
  CommandIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export function CommandPalettePreviewStage() {
  const stageContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [intensity, setIntensity] = React.useState<CommandPaletteIntensity>("balanced");
  const [mode, setMode] = React.useState<"modal" | "embedded">("embedded");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [lastExecuted, setLastExecuted] = React.useState<string | null>(null);

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("desktop");
    setIntensity("balanced");
    setMode("embedded");
    setIsModalOpen(false);
    setLastExecuted(null);
  }, []);

  const handleExecute = React.useCallback((commandName: string) => {
    setLastExecuted(commandName);
  }, []);

  const generatedCode = React.useMemo(() => {
    if (mode === "modal") {
      return `import * as React from "react";
import {
  CommandPaletteDialog,
  CommandPaletteTrigger,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteSeparator,
} from "@/components/ui/command-palette";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  DashboardSquare01Icon,
  Folder01Icon,
  Analytics01Icon,
  SparklesIcon,
  UserAdd01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";

export function AppLauncher() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CommandPaletteTrigger
        label="Search commands or destinations..."
        shortcut="⌘K"
        onClick={() => setOpen(true)}
      />

      <CommandPaletteDialog
        open={open}
        onOpenChange={setOpen}
        intensity="${intensity}"
      >
        <CommandPaletteInput placeholder="Search commands or destinations..." />
        <CommandPaletteList>
          <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>

          <CommandPaletteGroup heading="Navigation">
            <CommandPaletteItem
              icon={<HaloIcon icon={DashboardSquare01Icon} size={16} />}
              shortcut="⌘D"
              onSelect={() => console.log("Navigate: Dashboard")}
            >
              Go to Dashboard
            </CommandPaletteItem>
            <CommandPaletteItem
              icon={<HaloIcon icon={Folder01Icon} size={16} />}
              shortcut="⌘P"
              onSelect={() => console.log("Navigate: Projects")}
            >
              Open Projects
            </CommandPaletteItem>
            <CommandPaletteItem
              icon={<HaloIcon icon={Analytics01Icon} size={16} />}
              shortcut="⌘A"
              onSelect={() => console.log("Navigate: Analytics")}
            >
              View Analytics
            </CommandPaletteItem>
          </CommandPaletteGroup>

          <CommandPaletteSeparator />

          <CommandPaletteGroup heading="Actions">
            <CommandPaletteItem
              icon={<HaloIcon icon={SparklesIcon} size={16} />}
              shortcut="⌘N"
              onSelect={() => console.log("Action: Create Project")}
            >
              Create project
            </CommandPaletteItem>
            <CommandPaletteItem
              icon={<HaloIcon icon={UserAdd01Icon} size={16} />}
              shortcut="⌘I"
              onSelect={() => console.log("Action: Invite Member")}
            >
              Invite member
            </CommandPaletteItem>
          </CommandPaletteGroup>

          <CommandPaletteSeparator />

          <CommandPaletteGroup heading="Settings">
            <CommandPaletteItem
              icon={<HaloIcon icon={Settings02Icon} size={16} />}
              shortcut="⌘,"
              onSelect={() => console.log("Settings: Preferences")}
            >
              Open Preferences
            </CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPaletteDialog>
    </>
  );
}`;
    }

    return `import {
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteSeparator,
} from "@/components/ui/command-palette";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  DashboardSquare01Icon,
  Folder01Icon,
  Analytics01Icon,
  SparklesIcon,
  UserAdd01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";

export function InlineCommandPalette() {
  return (
    <CommandPalette intensity="${intensity}" className="max-w-xl mx-auto">
      <CommandPaletteInput placeholder="Search commands or destinations..." />
      <CommandPaletteList>
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>

        <CommandPaletteGroup heading="Navigation">
          <CommandPaletteItem
            icon={<HaloIcon icon={DashboardSquare01Icon} size={16} />}
            shortcut="⌘D"
            onSelect={() => console.log("Go to Dashboard")}
          >
            Go to Dashboard
          </CommandPaletteItem>
          <CommandPaletteItem
            icon={<HaloIcon icon={Folder01Icon} size={16} />}
            shortcut="⌘P"
            onSelect={() => console.log("Open Projects")}
          >
            Open Projects
          </CommandPaletteItem>
          <CommandPaletteItem
            icon={<HaloIcon icon={Analytics01Icon} size={16} />}
            shortcut="⌘A"
            onSelect={() => console.log("View Analytics")}
          >
            View Analytics
          </CommandPaletteItem>
        </CommandPaletteGroup>

        <CommandPaletteSeparator />

        <CommandPaletteGroup heading="Actions">
          <CommandPaletteItem
            icon={<HaloIcon icon={SparklesIcon} size={16} />}
            shortcut="⌘N"
            onSelect={() => console.log("Create project")}
          >
            Create project
          </CommandPaletteItem>
          <CommandPaletteItem
            icon={<HaloIcon icon={UserAdd01Icon} size={16} />}
            shortcut="⌘I"
            onSelect={() => console.log("Invite member")}
          >
            Invite member
          </CommandPaletteItem>
        </CommandPaletteGroup>

        <CommandPaletteSeparator />

        <CommandPaletteGroup heading="Settings">
          <CommandPaletteItem
            icon={<HaloIcon icon={Settings02Icon} size={16} />}
            shortcut="⌘,"
            onSelect={() => console.log("Open Preferences")}
          >
            Open Preferences
          </CommandPaletteItem>
        </CommandPaletteGroup>
      </CommandPaletteList>
    </CommandPalette>
  );
}`;
  }, [mode, intensity]);

  const renderCommandItems = (isModal: boolean) => (
    <>
      <CommandPaletteGroup heading="Navigation">
        <CommandPaletteItem
          value="Go to Dashboard"
          icon={<HaloIcon icon={DashboardSquare01Icon} size={16} />}
          description="Main metrics overview"
          shortcut="⌘D"
          onSelect={() => handleExecute("Go to Dashboard")}
        >
          Go to Dashboard
        </CommandPaletteItem>
        <CommandPaletteItem
          value="Open Projects"
          icon={<HaloIcon icon={Folder01Icon} size={16} />}
          description="Workspace repositories & deployments"
          shortcut="⌘P"
          onSelect={() => handleExecute("Open Projects")}
        >
          Open Projects
        </CommandPaletteItem>
        <CommandPaletteItem
          value="View Analytics"
          icon={<HaloIcon icon={Analytics01Icon} size={16} />}
          description="Traffic, telemetry, and uptime stats"
          shortcut="⌘A"
          onSelect={() => handleExecute("View Analytics")}
        >
          View Analytics
        </CommandPaletteItem>
      </CommandPaletteGroup>

      <CommandPaletteSeparator />

      <CommandPaletteGroup heading="Actions">
        <CommandPaletteItem
          value="Create project"
          icon={<HaloIcon icon={SparklesIcon} size={16} />}
          description="Initialize a new repository or service"
          shortcut="⌘N"
          onSelect={() => handleExecute("Create project")}
        >
          Create project
        </CommandPaletteItem>
        <CommandPaletteItem
          value="Invite member"
          icon={<HaloIcon icon={UserAdd01Icon} size={16} />}
          description="Send workspace collaboration link"
          shortcut="⌘I"
          onSelect={() => handleExecute("Invite member")}
        >
          Invite member
        </CommandPaletteItem>
      </CommandPaletteGroup>

      <CommandPaletteSeparator />

      <CommandPaletteGroup heading="Settings">
        <CommandPaletteItem
          value="Open Preferences"
          icon={<HaloIcon icon={Settings02Icon} size={16} />}
          description="User account, shortcuts & appearances"
          shortcut="⌘,"
          onSelect={() => handleExecute("Open Preferences")}
        >
          Open Preferences
        </CommandPaletteItem>
      </CommandPaletteGroup>
    </>
  );

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      code={generatedCode}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Mode"
            value={mode}
            onChange={(val) => setMode(val as "modal" | "embedded")}
            options={[
              { value: "embedded", label: "Embedded (In-Page)" },
              { value: "modal", label: "Modal Dialog (⌘K)" },
            ]}
          />
          <StageControlSelect
            label="Intensity"
            value={intensity}
            onChange={(val) => setIntensity(val as CommandPaletteIntensity)}
            options={[
              { value: "subtle", label: "Subtle" },
              { value: "balanced", label: "Balanced" },
              { value: "rich", label: "Rich" },
            ]}
          />
        </div>
      }
    >
      <div ref={stageContainerRef} className="relative flex flex-col items-center justify-center p-4 sm:p-8 w-full min-h-[460px] overflow-hidden">
        {mode === "embedded" ? (
          <div className="relative z-10 w-full max-w-xl space-y-4">
            <CommandPalette intensity={intensity}>
              <CommandPaletteInput placeholder="Search commands or destinations..." />
              <CommandPaletteList>
                <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
                {renderCommandItems(false)}
              </CommandPaletteList>
            </CommandPalette>

            {lastExecuted && (
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                <span>Executed command: <strong>{lastExecuted}</strong></span>
                <button
                  type="button"
                  onClick={() => setLastExecuted(null)}
                  className="text-emerald-600/70 hover:text-emerald-600 dark:text-emerald-400/70 dark:hover:text-emerald-400"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 max-w-md w-full text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl shadow-lg">
              <HaloIcon icon={CommandIcon} size={28} className="text-primary" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-foreground">Modal Launcher Mode</h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                Click the discoverable trigger button below or press{" "}
                <kbd className="rounded border border-border/80 bg-muted/80 px-1 py-0.5 font-mono text-[10px] font-semibold text-foreground">
                  ⌘K
                </kbd>{" "}
                to open the liquid modal overlay.
              </p>
            </div>

            <CommandPaletteTrigger
              onClick={() => setIsModalOpen(true)}
              label="Search commands or destinations..."
              shortcut="⌘K"
              className="max-w-xs"
            />

            <CommandPaletteDialog
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              intensity={intensity}
              container={stageContainerRef}
            >
              <CommandPaletteInput placeholder="Search commands or destinations..." />
              <CommandPaletteList>
                <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
                {renderCommandItems(true)}
              </CommandPaletteList>
            </CommandPaletteDialog>

            {lastExecuted && (
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in w-full">
                <span>Executed: <strong>{lastExecuted}</strong></span>
                <button
                  type="button"
                  onClick={() => setLastExecuted(null)}
                  className="text-emerald-600/70 hover:text-emerald-600 dark:text-emerald-400/70 dark:hover:text-emerald-400"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </PreviewStageShell>
  );
}
