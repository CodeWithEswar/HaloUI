"use client";

import * as React from "react";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Primary Country Selection Demo                                          */
/* -------------------------------------------------------------------------- */

export function PrimaryCountrySelectDemo() {
  const [country, setCountry] = React.useState("");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-country">
        <FieldLabel htmlFor="demo-country">Billing region</FieldLabel>
        <NativeSelect
          id="demo-country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          aria-describedby="demo-country-desc"
        >
          <option value="" disabled>
            Select a country or territory
          </option>
          <option value="in">India</option>
          <option value="jp">Japan</option>
          <option value="de">Germany</option>
          <option value="br">Brazil</option>
          <option value="us">United States</option>
        </NativeSelect>
        <FieldDescription id="demo-country-desc">
          Used for regional tax calculations and localized compliance invoicing.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Grouped Options Demo (<optgroup>)                                        */
/* -------------------------------------------------------------------------- */

export function GroupedOptionsSelectDemo() {
  const [cluster, setCluster] = React.useState("eu-central-1");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-grouped">
        <FieldLabel htmlFor="demo-grouped">Compute node availability zone</FieldLabel>
        <NativeSelect
          id="demo-grouped"
          value={cluster}
          onChange={(e) => setCluster(e.target.value)}
          aria-describedby="demo-grouped-desc"
        >
          <optgroup label="Asia Pacific">
            <option value="ap-south-1">Mumbai (ap-south-1)</option>
            <option value="ap-northeast-1">Tokyo (ap-northeast-1)</option>
            <option value="ap-southeast-1">Singapore (ap-southeast-1)</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="eu-central-1">Frankfurt (eu-central-1)</option>
            <option value="eu-west-1">Ireland (eu-west-1)</option>
            <option value="eu-west-3">Paris (eu-west-3)</option>
          </optgroup>
          <optgroup label="Americas">
            <option value="us-east-1">N. Virginia (us-east-1)</option>
            <option value="us-west-2">Oregon (us-west-2)</option>
            <option value="sa-east-1">São Paulo (sa-east-1)</option>
          </optgroup>
        </NativeSelect>
        <FieldDescription id="demo-grouped-desc">
          Native &lt;optgroup&gt; organizes options into semantic categories across desktop and mobile pickers.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Interaction States (Prompt, Selected, Invalid, Disabled)                */
/* -------------------------------------------------------------------------- */

export function NativeSelectStatesDemo() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. Prompt / Empty Selection */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-prompt">
          <FieldLabel htmlFor="state-prompt">Default Prompt</FieldLabel>
          <NativeSelect id="state-prompt" defaultValue="">
            <option value="" disabled>
              Select currency...
            </option>
            <option value="usd">USD — United States Dollar</option>
            <option value="eur">EUR — Euro</option>
            <option value="gbp">GBP — British Pound</option>
          </NativeSelect>
          <FieldDescription>Disabled empty option serves as accessible prompt.</FieldDescription>
        </Field>
      </div>

      {/* 2. Pre-selected Value */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-selected">
          <FieldLabel htmlFor="state-selected">Pre-selected</FieldLabel>
          <NativeSelect id="state-selected" defaultValue="production">
            <option value="development">Development Sandbox</option>
            <option value="staging">Staging Pipeline</option>
            <option value="production">Production Cluster</option>
          </NativeSelect>
          <FieldDescription>Initial selection populated via standard defaultValue.</FieldDescription>
        </Field>
      </div>

      {/* 3. Invalid + Focused (Dual Indicator) */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-invalid" invalid>
          <FieldLabel htmlFor="state-invalid" required>
            Security clearance (Invalid)
          </FieldLabel>
          <NativeSelect
            id="state-invalid"
            aria-invalid="true"
            defaultValue=""
            aria-describedby="state-invalid-err"
          >
            <option value="" disabled>
              Choose mandatory clearance tier...
            </option>
            <option value="tier-1">Tier 1 — Read Only</option>
            <option value="tier-2">Tier 2 — Operational Admin</option>
          </NativeSelect>
          <FieldError id="state-invalid-err">
            You must choose an authorized access clearance tier.
          </FieldError>
        </Field>
      </div>

      {/* 4. Disabled State */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-disabled" disabled>
          <FieldLabel htmlFor="state-disabled">Subscription plan (Disabled)</FieldLabel>
          <NativeSelect id="state-disabled" disabled defaultValue="enterprise">
            <option value="starter">Starter Plan</option>
            <option value="pro">Pro Plan</option>
            <option value="enterprise">Enterprise Tier (Locked by Admin)</option>
          </NativeSelect>
          <FieldDescription>Native disabled attribute prevents interaction and submission.</FieldDescription>
        </Field>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Controlled State Demo                                                   */
/* -------------------------------------------------------------------------- */

export function ControlledNativeSelectDemo() {
  const [role, setRole] = React.useState("editor");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl space-y-3", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-controlled">
        <FieldLabel htmlFor="demo-controlled">Assigned team role</FieldLabel>
        <NativeSelect
          id="demo-controlled"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer (Read-only access)</option>
          <option value="editor">Editor (Can create &amp; publish)</option>
          <option value="admin">Administrator (Full cluster management)</option>
        </NativeSelect>
      </Field>

      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 border border-border text-xs">
        <span className="text-muted-foreground">Current state value:</span>
        <code className="font-mono text-foreground font-semibold">&quot;{role}&quot;</code>
      </div>
    </div>
  );
}
