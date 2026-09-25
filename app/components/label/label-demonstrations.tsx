"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tick02Icon,
  InformationCircleIcon,
  CursorPointer01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Click-to-Focus Association (Primary Regression Test)                    */
/* -------------------------------------------------------------------------- */

export function LabelInputAssociationDemo() {
  const [value, setValue] = React.useState("alex.morgan@company.com");
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl flex flex-col gap-4", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-border/50 pb-2 border-b">
        <span className="flex items-center gap-1.5 font-medium text-foreground">
          <HaloIcon icon={CursorPointer01Icon} size={14} className="text-primary" />
          Click Test
        </span>
        <span className="font-mono text-[11px]">
          Label clicks: {clickCount}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="input-association-email"
          onClick={() => setClickCount((c) => c + 1)}
          className="cursor-pointer"
        >
          Email address
        </Label>
        <Input
          id="input-association-email"
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="name@company.com"
        />
        <p className="text-xs text-muted-foreground leading-normal">
          Clicking the &quot;Email address&quot; label shifts cursor focus directly to the text input.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Checkbox Association (Enlarged Hit Area)                                */
/* -------------------------------------------------------------------------- */

export function LabelCheckboxAssociationDemo() {
  const [agreed, setAgreed] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl flex flex-col gap-3", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-start gap-3">
        <Checkbox
          id="agree-terms"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(!!checked)}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="agree-terms"
            className="cursor-pointer text-sm font-medium leading-snug"
          >
            I accept the terms and conditions
          </Label>
          <p className="text-xs text-muted-foreground leading-normal">
            Clicking this text toggles the checkbox without having to hit the 16px square.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Disabled Peer State                                                     */
/* -------------------------------------------------------------------------- */

export function LabelDisabledPeerDemo() {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl flex flex-col gap-4", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-center justify-between border-b border-border/50 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Peer Disabled State
        </span>
        <button
          type="button"
          onClick={() => setDisabled(!disabled)}
          className="text-xs text-primary underline underline-offset-2 hover:opacity-80"
        >
          {disabled ? "Enable Control" : "Disable Control"}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <Input
          id="peer-disabled-input"
          disabled={disabled}
          defaultValue="Read-only system identifier"
          className="order-2"
        />
        <Label
          htmlFor="peer-disabled-input"
          className="order-1 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
        >
          System Identifier (Managed)
        </Label>
        <p className="order-3 text-xs text-muted-foreground">
          When the paired control is disabled, the label reflects muted opacity while remaining fully legible.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Long Wrapping Label (No Truncation)                                     */
/* -------------------------------------------------------------------------- */

export function LabelLongWrappingDemo() {
  const [consent, setConsent] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl flex flex-col gap-3", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-start gap-3">
        <Checkbox
          id="compliance-consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(!!checked)}
          className="mt-0.5"
        />
        <Label
          htmlFor="compliance-consent"
          className="cursor-pointer text-xs sm:text-sm font-normal leading-relaxed text-foreground"
        >
          I acknowledge that I have read and agree to the Automated Diagnostic Data Collection
          and Cloud Monitoring Protocol governed by ISO 27001 data residency specifications.
        </Label>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Label vs FieldLabel vs Legend                                           */
/* -------------------------------------------------------------------------- */

export function LabelVsFieldLabelVsLegendDemo() {
  return (
    <div className="w-full max-w-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* 1. Label */}
      <div className={cn("p-4 rounded-xl flex flex-col gap-2", DEMO_CONTAINER_GLASS)}>
        <span className="text-xs font-mono font-bold text-primary">&lt;Label&gt;</span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Low-level accessible name for <strong>one specific control</strong> via{" "}
          <code className="text-foreground">htmlFor</code>.
        </p>
        <div className="mt-auto pt-2 border-t border-border/40">
          <Label htmlFor="demo-stand-inp" className="text-xs cursor-pointer">
            Username
          </Label>
          <Input id="demo-stand-inp" placeholder="Username" className="mt-1 h-8 text-xs" />
        </div>
      </div>

      {/* 2. FieldLabel */}
      <div className={cn("p-4 rounded-xl flex flex-col gap-2", DEMO_CONTAINER_GLASS)}>
        <span className="text-xs font-mono font-bold text-primary">&lt;FieldLabel&gt;</span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Field-aware composition built on Label with automatic context ID, required asterisk, and optional badge.
        </p>
        <div className="mt-auto pt-2 border-t border-border/40">
          <Field id="demo-field-inp" required>
            <FieldLabel className="text-xs">Password</FieldLabel>
            <Input id="demo-field-inp" type="password" placeholder="••••••••" className="mt-1 h-8 text-xs" />
          </Field>
        </div>
      </div>

      {/* 3. FieldLegend */}
      <div className={cn("p-4 rounded-xl flex flex-col gap-2", DEMO_CONTAINER_GLASS)}>
        <span className="text-xs font-mono font-bold text-primary">&lt;FieldLegend&gt;</span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Shared group name inside a <code className="text-foreground">&lt;FieldSet&gt;</code> for
          mutually exclusive options.
        </p>
        <div className="mt-auto pt-2 border-t border-border/40">
          <FieldSet>
            <FieldLegend variant="label" className="text-xs">
              Delivery speed
            </FieldLegend>
            <div className="flex items-center gap-2 mt-1">
              <input type="radio" id="spd-exp" name="spd" defaultChecked className="accent-primary" />
              <Label htmlFor="spd-exp" className="text-xs font-normal">Express (1d)</Label>
            </div>
          </FieldSet>
        </div>
      </div>
    </div>
  );
}
