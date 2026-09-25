"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Primary Switch Demo with Label & Description                            */
/* -------------------------------------------------------------------------- */

export function PrimarySwitchDemo() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-6 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-primary-switch-field">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1 min-w-0 pr-2">
            <FieldLabel
              htmlFor="demo-primary-switch"
              className="text-sm font-semibold tracking-tight text-foreground cursor-pointer select-none"
            >
              Auto-save
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground select-none leading-relaxed">
              Save changes automatically while editing documents.
            </FieldDescription>
          </div>
          <Switch
            id="demo-primary-switch"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Realistic Settings List Demo                                            */
/* -------------------------------------------------------------------------- */

interface SettingItem {
  id: string;
  title: string;
  description: string;
  defaultChecked: boolean;
}

const SETTINGS_DATA: SettingItem[] = [
  {
    id: "setting-dark-mode",
    title: "Dark mode appearance",
    description: "Use low-glare dark palette across interfaces.",
    defaultChecked: true,
  },
  {
    id: "setting-backups",
    title: "Automatic cloud backups",
    description: "Create incremental restore snapshots daily at 02:00 UTC.",
    defaultChecked: true,
  },
  {
    id: "setting-sync",
    title: "Background synchronization",
    description: "Keep project tokens synchronized across active sessions.",
    defaultChecked: false,
  },
  {
    id: "setting-diagnostics",
    title: "Anonymous telemetry",
    description: "Transmit anonymized crash reports to assist stability.",
    defaultChecked: false,
  },
];

export function SettingsListDemo() {
  const [settings, setSettings] = React.useState<Record<string, boolean>>(() =>
    SETTINGS_DATA.reduce((acc, item) => {
      acc[item.id] = item.defaultChecked;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleToggle = (id: string, nextChecked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: nextChecked }));
  };

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <div className="space-y-1 mb-5">
        <h4 className="text-sm font-semibold text-foreground tracking-tight">System Preferences</h4>
        <p className="text-xs text-muted-foreground">Manage your workspace synchronization and background services.</p>
      </div>

      <div className="divide-y divide-border/60">
        {SETTINGS_DATA.map((item) => (
          <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
            <div className="grid gap-1 min-w-0 pr-2">
              <Label htmlFor={item.id} className="text-sm font-medium text-foreground cursor-pointer select-none">
                {item.title}
              </Label>
              <p className="text-xs text-muted-foreground leading-relaxed select-none">
                {item.description}
              </p>
            </div>
            <Switch
              id={item.id}
              checked={settings[item.id]}
              onCheckedChange={(checked) => handleToggle(item.id, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Switch States Matrix Demo                                               */
/* -------------------------------------------------------------------------- */

export function SwitchStatesDemo() {
  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Off State */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/70 bg-card/50">
          <span className="text-xs font-medium text-foreground">Off (Unchecked)</span>
          <Switch checked={false} aria-label="Off demo" />
        </div>

        {/* On State */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/70 bg-card/50">
          <span className="text-xs font-medium text-foreground">On (Checked)</span>
          <Switch checked={true} aria-label="On demo" />
        </div>

        {/* Disabled Off State */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/70 bg-card/50 opacity-75">
          <span className="text-xs font-medium text-muted-foreground">Disabled (Off)</span>
          <Switch checked={false} disabled aria-label="Disabled off demo" />
        </div>

        {/* Disabled On State */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/70 bg-card/50 opacity-75">
          <span className="text-xs font-medium text-muted-foreground">Disabled (On)</span>
          <Switch checked={true} disabled aria-label="Disabled on demo" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Switch Sizes Demo (Default 24px vs Small 18px)                          */
/* -------------------------------------------------------------------------- */

export function SwitchSizesDemo() {
  const [defaultChecked, setDefaultChecked] = React.useState(true);
  const [smChecked, setSmChecked] = React.useState(true);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-6 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <div className="space-y-4">
        {/* Default Size */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/70 bg-card/40">
          <div>
            <p className="text-sm font-medium text-foreground">Default Size</p>
            <p className="text-xs text-muted-foreground">44×24px track with 20px thumb</p>
          </div>
          <Switch
            size="default"
            checked={defaultChecked}
            onCheckedChange={setDefaultChecked}
            aria-label="Default size switch"
          />
        </div>

        {/* Small Size */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/70 bg-card/40">
          <div>
            <p className="text-sm font-medium text-foreground">Small Size</p>
            <p className="text-xs text-muted-foreground">32×18px track with 14px thumb</p>
          </div>
          <Switch
            size="sm"
            checked={smChecked}
            onCheckedChange={setSmChecked}
            aria-label="Small size switch"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Controlled Switch Demo with External Toggle                             */
/* -------------------------------------------------------------------------- */

export function ControlledSwitchDemo() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-6 rounded-2xl space-y-4", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <Label htmlFor="controlled-switch" className="text-sm font-medium cursor-pointer">
            Airplane Mode
          </Label>
          <span className="text-xs text-muted-foreground">
            Current status: <strong className="text-foreground">{enabled ? "Active" : "Inactive"}</strong>
          </span>
        </div>
        <Switch
          id="controlled-switch"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>

      <div className="pt-2 border-t border-border/60 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setEnabled((prev) => !prev)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background/80 hover:bg-muted text-foreground transition-colors cursor-pointer shadow-2xs"
        >
          Toggle Programmatically
        </button>
        <span className="text-[11px] font-mono text-muted-foreground">
          state: {String(enabled)}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Label Activation Demo                                                   */
/* -------------------------------------------------------------------------- */

export function LabelActivationDemo() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-6 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="label-activation-field">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1 min-w-0 pr-2">
            <FieldLabel
              htmlFor="label-activation-switch"
              className="text-sm font-semibold text-foreground cursor-pointer hover:underline select-none"
            >
              Click this text label to toggle
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground select-none leading-relaxed">
              Accessible Label association propagates native click semantics directly to the switch.
            </FieldDescription>
          </div>
          <Switch
            id="label-activation-switch"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>
      </Field>
    </div>
  );
}
