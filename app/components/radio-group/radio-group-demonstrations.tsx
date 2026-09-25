"use client";

import * as React from "react";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Primary Billing Cycle Demo with Descriptions                            */
/* -------------------------------------------------------------------------- */

export function PrimaryRadioGroupDemo() {
  const [cycle, setCycle] = React.useState<string>("yearly");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <RadioGroup value={cycle} onValueChange={setCycle}>
        <RadioGroupLabel>Subscription billing cycle</RadioGroupLabel>
        <RadioGroupDescription>
          Choose how frequently your team should be invoiced for cloud seats.
        </RadioGroupDescription>

        <RadioGroupOption>
          <RadioGroupItem value="monthly" id="plan-monthly" className="mt-0.5" />
          <div className="grid gap-1 leading-none">
            <Label htmlFor="plan-monthly" className="text-sm font-medium text-foreground cursor-pointer">
              Monthly billing
            </Label>
            <span className="text-xs text-muted-foreground leading-relaxed">
              $24 per seat per month. Billed automatically at the start of each period.
            </span>
          </div>
        </RadioGroupOption>

        <RadioGroupOption>
          <RadioGroupItem value="quarterly" id="plan-quarterly" className="mt-0.5" />
          <div className="grid gap-1 leading-none">
            <Label htmlFor="plan-quarterly" className="text-sm font-medium text-foreground cursor-pointer">
              Quarterly billing
            </Label>
            <span className="text-xs text-muted-foreground leading-relaxed">
              $60 per seat billed every 3 months. Includes priority support queue.
            </span>
          </div>
        </RadioGroupOption>

        <RadioGroupOption>
          <RadioGroupItem value="yearly" id="plan-yearly" className="mt-0.5" />
          <div className="grid gap-1 leading-none">
            <div className="flex items-center gap-2">
              <Label htmlFor="plan-yearly" className="text-sm font-medium text-foreground cursor-pointer">
                Annual billing
              </Label>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Save 20%
              </span>
            </div>
            <span className="text-xs text-muted-foreground leading-relaxed">
              $192 per seat per year. Ideal for growing teams with stable workloads.
            </span>
          </div>
        </RadioGroupOption>
      </RadioGroup>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Horizontal Orientation Demo                                             */
/* -------------------------------------------------------------------------- */

export function HorizontalRadioGroupDemo() {
  const [priority, setPriority] = React.useState<string>("high");

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <RadioGroup
        orientation="horizontal"
        value={priority}
        onValueChange={setPriority}
      >
        <RadioGroupLabel>Incident severity level</RadioGroupLabel>
        <RadioGroupDescription>
          Sets dispatch priority and notification routing tier for on-call engineers.
        </RadioGroupDescription>

        {[
          { id: "low", label: "Low (P3)" },
          { id: "medium", label: "Medium (P2)" },
          { id: "high", label: "High (P1)" },
          { id: "critical", label: "Critical (P0)" },
        ].map((item) => (
          <RadioGroupOption key={item.id} className="items-center">
            <RadioGroupItem value={item.id} id={`sev-${item.id}`} />
            <Label htmlFor={`sev-${item.id}`} className="text-xs font-mono font-medium text-foreground cursor-pointer">
              {item.label}
            </Label>
          </RadioGroupOption>
        ))}
      </RadioGroup>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Skipping Disabled Item in Navigation Demo                               */
/* -------------------------------------------------------------------------- */

export function DisabledOptionRadioGroupDemo() {
  const [region, setRegion] = React.useState<string>("us-east");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <RadioGroup value={region} onValueChange={setRegion}>
        <RadioGroupLabel>Compute deployment region</RadioGroupLabel>
        <RadioGroupDescription>
          Select an available cluster. Keyboard arrows automatically skip maintenance regions.
        </RadioGroupDescription>

        <RadioGroupOption>
          <RadioGroupItem value="us-east" id="reg-useast" />
          <Label htmlFor="reg-useast" className="text-sm font-medium text-foreground cursor-pointer">
            US East (N. Virginia)
          </Label>
        </RadioGroupOption>

        <RadioGroupOption>
          <RadioGroupItem value="eu-central" id="reg-eucentral" disabled />
          <div className="grid gap-0.5 leading-none opacity-40">
            <Label htmlFor="reg-eucentral" className="text-sm font-medium text-foreground cursor-not-allowed">
              EU Central (Frankfurt) — Capacity full
            </Label>
            <span className="text-xs text-muted-foreground">Temporarily unavailable for new clusters.</span>
          </div>
        </RadioGroupOption>

        <RadioGroupOption>
          <RadioGroupItem value="ap-southeast" id="reg-apsoutheast" />
          <Label htmlFor="reg-apsoutheast" className="text-sm font-medium text-foreground cursor-pointer">
            AP Southeast (Singapore)
          </Label>
        </RadioGroupOption>
      </RadioGroup>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Group-Level Validation Error Demo                                       */
/* -------------------------------------------------------------------------- */

export function InvalidRadioGroupDemo() {
  const [role, setRole] = React.useState<string>("");
  const isInvalid = !role;

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="developer-role-field" invalid={isInvalid}>
        <RadioGroup
          value={role}
          onValueChange={setRole}
          invalid={isInvalid}
        >
          <RadioGroupLabel required>Primary developer role</RadioGroupLabel>
          <RadioGroupDescription>
            Tailors the initial dashboard template and SDK dependencies.
          </RadioGroupDescription>

          <RadioGroupOption>
            <RadioGroupItem value="frontend" id="role-fe" />
            <Label htmlFor="role-fe" className="text-sm font-medium text-foreground cursor-pointer">
              Frontend Engineer (React / Next.js)
            </Label>
          </RadioGroupOption>

          <RadioGroupOption>
            <RadioGroupItem value="backend" id="role-be" />
            <Label htmlFor="role-be" className="text-sm font-medium text-foreground cursor-pointer">
              Backend Systems (Rust / Go / Node)
            </Label>
          </RadioGroupOption>

          <RadioGroupOption>
            <RadioGroupItem value="fullstack" id="role-fs" />
            <Label htmlFor="role-fs" className="text-sm font-medium text-foreground cursor-pointer">
              Full Stack Product Engineer
            </Label>
          </RadioGroupOption>
        </RadioGroup>

        {isInvalid && (
          <FieldError className="mt-3">
            Please choose your primary engineering focus to continue workspace onboarding.
          </FieldError>
        )}
      </Field>
    </div>
  );
}
