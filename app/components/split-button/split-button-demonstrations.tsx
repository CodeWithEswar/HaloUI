"use client";

import * as React from "react";
import {
  FileAttachmentIcon,
  Link01Icon,
  Copy01Icon,
  Delete02Icon,
  Archive01Icon,
  Download01Icon,
  Tick01Icon,
  FloppyDiskIcon,
  Add01Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonContent,
  SplitButtonItem,
  SplitButtonSeparator,
  SplitButtonLabel,
} from "@/components/ui/split-button";

/**
 * Variants Demonstration: Default (Liquid Glass), Secondary, Outline, Ghost, Destructive
 */
export function SplitButtonVariantsPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* 1. Default (Liquid Glass) */}
      <SplitButton variant="default">
        <SplitButtonAction onClick={() => console.log("Default export")}>
          <HaloIcon icon={Share01Icon} size={16} />
          Export
        </SplitButtonAction>
        <SplitButtonTrigger aria-label="More export options" />
        <SplitButtonContent align="end">
          <SplitButtonItem>Export as PDF</SplitButtonItem>
          <SplitButtonItem>Export as CSV</SplitButtonItem>
        </SplitButtonContent>
      </SplitButton>

      {/* 2. Secondary */}
      <SplitButton variant="secondary">
        <SplitButtonAction onClick={() => console.log("Secondary export")}>
          <HaloIcon icon={Share01Icon} size={16} />
          Export
        </SplitButtonAction>
        <SplitButtonTrigger aria-label="More export options" />
        <SplitButtonContent align="end">
          <SplitButtonItem>Export as PDF</SplitButtonItem>
          <SplitButtonItem>Export as CSV</SplitButtonItem>
        </SplitButtonContent>
      </SplitButton>

      {/* 3. Outline */}
      <SplitButton variant="outline">
        <SplitButtonAction onClick={() => console.log("Outline export")}>
          <HaloIcon icon={Share01Icon} size={16} />
          Export
        </SplitButtonAction>
        <SplitButtonTrigger aria-label="More export options" />
        <SplitButtonContent align="end">
          <SplitButtonItem>Export as PDF</SplitButtonItem>
          <SplitButtonItem>Export as CSV</SplitButtonItem>
        </SplitButtonContent>
      </SplitButton>

      {/* 4. Ghost */}
      <SplitButton variant="ghost">
        <SplitButtonAction onClick={() => console.log("Ghost export")}>
          <HaloIcon icon={Share01Icon} size={16} />
          Export
        </SplitButtonAction>
        <SplitButtonTrigger aria-label="More export options" />
        <SplitButtonContent align="end">
          <SplitButtonItem>Export as PDF</SplitButtonItem>
          <SplitButtonItem>Export as CSV</SplitButtonItem>
        </SplitButtonContent>
      </SplitButton>

      {/* 5. Destructive */}
      <SplitButton variant="destructive">
        <SplitButtonAction onClick={() => console.log("Delete file")}>
          <HaloIcon icon={Delete02Icon} size={16} />
          Delete
        </SplitButtonAction>
        <SplitButtonTrigger aria-label="More deletion options" />
        <SplitButtonContent align="end">
          <SplitButtonItem variant="destructive">Delete permanently</SplitButtonItem>
          <SplitButtonItem variant="destructive">Delete and notify team</SplitButtonItem>
        </SplitButtonContent>
      </SplitButton>
    </div>
  );
}

/**
 * Sizes Demonstration: sm (32px), default (40px), lg (48px)
 */
export function SplitButtonSizesPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* Small (32px) */}
      <div className="flex flex-col items-center gap-2">
        <SplitButton size="sm">
          <SplitButtonAction onClick={() => console.log("Save sm")}>
            <HaloIcon icon={FloppyDiskIcon} size={14} />
            Save
          </SplitButtonAction>
          <SplitButtonTrigger aria-label="More save options" />
          <SplitButtonContent align="end">
            <SplitButtonItem>Save as template</SplitButtonItem>
            <SplitButtonItem>Save & close</SplitButtonItem>
          </SplitButtonContent>
        </SplitButton>
        <span className="text-[11px] font-mono text-muted-foreground">size="sm" (32px)</span>
      </div>

      {/* Default (40px) */}
      <div className="flex flex-col items-center gap-2">
        <SplitButton size="default">
          <SplitButtonAction onClick={() => console.log("Save default")}>
            <HaloIcon icon={FloppyDiskIcon} size={16} />
            Save
          </SplitButtonAction>
          <SplitButtonTrigger aria-label="More save options" />
          <SplitButtonContent align="end">
            <SplitButtonItem>Save as template</SplitButtonItem>
            <SplitButtonItem>Save & close</SplitButtonItem>
          </SplitButtonContent>
        </SplitButton>
        <span className="text-[11px] font-mono text-muted-foreground">size="default" (40px)</span>
      </div>

      {/* Large (48px) */}
      <div className="flex flex-col items-center gap-2">
        <SplitButton size="lg">
          <SplitButtonAction onClick={() => console.log("Save lg")}>
            <HaloIcon icon={FloppyDiskIcon} size={18} />
            Save
          </SplitButtonAction>
          <SplitButtonTrigger aria-label="More save options" />
          <SplitButtonContent align="end">
            <SplitButtonItem>Save as template</SplitButtonItem>
            <SplitButtonItem>Save & close</SplitButtonItem>
          </SplitButtonContent>
        </SplitButton>
        <span className="text-[11px] font-mono text-muted-foreground">size="lg" (48px)</span>
      </div>
    </div>
  );
}

/**
 * Disabled Primary Demonstration:
 * Demonstrates the critical pattern where the primary action is temporarily unavailable
 * (e.g. document already saved), but secondary alternative actions remain accessible.
 */
export function SplitButtonDisabledPrimaryPreview() {
  const [saved, setSaved] = React.useState(true);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/10">
      <div className="flex items-center gap-3">
        <SplitButton>
          <SplitButtonAction disabled={saved} onClick={() => setSaved(true)}>
            <HaloIcon icon={saved ? Tick01Icon : FloppyDiskIcon} size={16} />
            {saved ? "Saved" : "Save changes"}
          </SplitButtonAction>
          <SplitButtonTrigger aria-label="More document options" />
          <SplitButtonContent align="end">
            <SplitButtonItem onClick={() => console.log("Duplicate")}>
              <HaloIcon icon={Copy01Icon} size={15} />
              Save as template
            </SplitButtonItem>
            <SplitButtonItem onClick={() => console.log("Save and close")}>
              <HaloIcon icon={FloppyDiskIcon} size={15} />
              Save and close
            </SplitButtonItem>
            <SplitButtonSeparator />
            <SplitButtonItem onClick={() => console.log("Download")}>
              <HaloIcon icon={Download01Icon} size={15} />
              Download backup
            </SplitButtonItem>
          </SplitButtonContent>
        </SplitButton>

        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className="text-xs text-primary underline underline-offset-4 hover:opacity-80"
        >
          {saved ? "Simulate unsaved changes" : "Simulate saved state"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center max-w-md">
        When the document is already saved, the primary action is muted (<code>disabled=&#123;true&#125;</code>), but the secondary trigger remains fully interactive to let users duplicate, export, or back up.
      </p>
    </div>
  );
}

/**
 * States Demonstration:
 * Rest, Primary Disabled, Entire Disabled, Controlled Open
 */
export function SplitButtonStatesPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-2xl border border-border/40 bg-muted/10">
      {/* 1. Rest State */}
      <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/30 bg-background/50">
        <span className="text-xs font-medium text-foreground">Rest State</span>
        <SplitButton>
          <SplitButtonAction>Publish</SplitButtonAction>
          <SplitButtonTrigger aria-label="More publishing options" />
          <SplitButtonContent align="end">
            <SplitButtonItem>Schedule</SplitButtonItem>
            <SplitButtonItem>Save draft</SplitButtonItem>
          </SplitButtonContent>
        </SplitButton>
        <span className="text-[11px] font-mono text-muted-foreground">Default dual targets</span>
      </div>

      {/* 2. Disabled Primary Only */}
      <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/30 bg-background/50">
        <span className="text-xs font-medium text-foreground">Disabled Primary Only</span>
        <SplitButton>
          <SplitButtonAction disabled>Published</SplitButtonAction>
          <SplitButtonTrigger aria-label="More publishing options" />
          <SplitButtonContent align="end">
            <SplitButtonItem>Unpublish</SplitButtonItem>
            <SplitButtonItem>View history</SplitButtonItem>
          </SplitButtonContent>
        </SplitButton>
        <span className="text-[11px] font-mono text-muted-foreground">Menu remains available</span>
      </div>

      {/* 3. Entire Split Button Disabled */}
      <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/30 bg-background/50">
        <span className="text-xs font-medium text-foreground">Entire Control Disabled</span>
        <SplitButton disabled>
          <SplitButtonAction>Publish</SplitButtonAction>
          <SplitButtonTrigger aria-label="More publishing options" />
          <SplitButtonContent align="end">
            <SplitButtonItem>Schedule</SplitButtonItem>
          </SplitButtonContent>
        </SplitButton>
        <span className="text-[11px] font-mono text-muted-foreground">Both segments muted</span>
      </div>
    </div>
  );
}

/**
 * Dedicated Interactive Keyboard Testing Primitive
 */
export function SplitButtonKeyboardPreview() {
  const [eventLog, setEventLog] = React.useState<string[]>([]);

  const pushLog = (msg: string) => {
    setEventLog((prev) => [msg, ...prev].slice(0, 5));
  };

  return (
    <div className="flex flex-col items-center gap-5 p-6 rounded-2xl border border-border/40 bg-muted/10 w-full">
      <SplitButton>
        <SplitButtonAction
          onClick={() => pushLog("Primary Action activated via mouse or Enter/Space")}
        >
          Create document
        </SplitButtonAction>
        <SplitButtonTrigger aria-label="More creation options" />
        <SplitButtonContent align="end">
          <SplitButtonItem onClick={() => pushLog("Selected: Create from template")}>
            Create from template
          </SplitButtonItem>
          <SplitButtonItem onClick={() => pushLog("Selected: Import markdown")}>
            Import markdown
          </SplitButtonItem>
          <SplitButtonItem onClick={() => pushLog("Selected: Import from Google Docs")}>
            Import from Google Docs
          </SplitButtonItem>
        </SplitButtonContent>
      </SplitButton>

      {/* Event Log Output */}
      <div className="w-full max-w-lg rounded-xl border border-border/60 bg-muted/30 p-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground border-b border-border/40 pb-1.5 mb-2">
          <span>Interaction Event Monitor</span>
          <button
            type="button"
            onClick={() => setEventLog([])}
            className="hover:text-foreground text-[10px]"
          >
            Clear log
          </button>
        </div>
        {eventLog.length === 0 ? (
          <div className="text-xs text-muted-foreground/60 italic py-1 text-center">
            Press Tab to focus Primary Action, Tab again for Trigger, Space/Enter to activate.
          </div>
        ) : (
          <div className="space-y-1">
            {eventLog.map((log, i) => (
              <div
                key={i}
                className="text-xs font-mono text-foreground/90 flex items-center gap-2"
              >
                <span className="text-[10px] text-muted-foreground">[{i + 1}]</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
