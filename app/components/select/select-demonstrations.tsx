"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
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
/* 1. Primary Framework Selection Demo                                        */
/* -------------------------------------------------------------------------- */

export function PrimaryFrameworkSelectDemo() {
  const [framework, setFramework] = React.useState<string | null>("react");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-framework">
        <FieldLabel htmlFor="demo-framework">Application framework</FieldLabel>
        <Select value={framework} onValueChange={(val) => setFramework(val)}>
          <SelectTrigger id="demo-framework" aria-describedby="demo-framework-desc">
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
            <SelectItem value="nextjs">Next.js</SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription id="demo-framework-desc">
          Determines compiler toolchain, SSR runtime, and scaffolding presets.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Grouped Options Demo (<SelectGroup>)                                    */
/* -------------------------------------------------------------------------- */

export function GroupedOptionsSelectDemo() {
  const [tech, setTech] = React.useState<string | null>("rust");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-grouped-select">
        <FieldLabel htmlFor="demo-grouped-select">Infrastructure runtime</FieldLabel>
        <Select value={tech} onValueChange={(val) => setTech(val)}>
          <SelectTrigger id="demo-grouped-select" aria-describedby="demo-grouped-desc">
            <SelectValue placeholder="Choose runtime..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frontend Engine</SelectLabel>
              <SelectItem value="react">React 19</SelectItem>
              <SelectItem value="vue">Vue 3.5</SelectItem>
              <SelectItem value="svelte">Svelte 5</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Backend Systems</SelectLabel>
              <SelectItem value="rust">Rust (Axum)</SelectItem>
              <SelectItem value="go">Go (Echo)</SelectItem>
              <SelectItem value="node">Node.js (Fastify)</SelectItem>
              <SelectItem value="python" disabled>
                Python 3.8 (Deprecated)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription id="demo-grouped-desc">
          Structured groups with non-selectable section headers and disabled option handling.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Interaction States (Placeholder, Selected, Invalid, Disabled)           */
/* -------------------------------------------------------------------------- */

export function SelectStatesDemo() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. Empty / Placeholder State */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-placeholder">
          <FieldLabel htmlFor="state-placeholder">Default Placeholder</FieldLabel>
          <Select>
            <SelectTrigger id="state-placeholder">
              <SelectValue placeholder="Select region tier..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
              <SelectItem value="eu-west">EU West (Frankfurt)</SelectItem>
              <SelectItem value="ap-south">AP South (Mumbai)</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>Displays muted placeholder until a choice is committed.</FieldDescription>
        </Field>
      </div>

      {/* 2. Pre-selected Value */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-selected">
          <FieldLabel htmlFor="state-selected">Pre-selected</FieldLabel>
          <Select defaultValue="edge">
            <SelectTrigger id="state-selected">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="central">Centralized Cloud</SelectItem>
              <SelectItem value="edge">Global Edge Mesh</SelectItem>
              <SelectItem value="hybrid">Hybrid On-Premises</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>Initial selection populated through standard defaultValue.</FieldDescription>
        </Field>
      </div>

      {/* 3. Invalid + Focused (Dual Indicator) */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-invalid" invalid>
          <FieldLabel htmlFor="state-invalid" required>
            Security protocol (Invalid)
          </FieldLabel>
          <Select>
            <SelectTrigger
              id="state-invalid"
              aria-invalid="true"
              aria-describedby="state-invalid-err"
            >
              <SelectValue placeholder="Choose required encryption..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tls-1.2">TLS 1.2 (Legacy)</SelectItem>
              <SelectItem value="tls-1.3">TLS 1.3 (Strict AES-GCM)</SelectItem>
              <SelectItem value="mTLS">Mutual TLS (Zero Trust)</SelectItem>
            </SelectContent>
          </Select>
          <FieldError id="state-invalid-err">
            You must commit a compliant cryptographic transport tier.
          </FieldError>
        </Field>
      </div>

      {/* 4. Disabled State */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-disabled" disabled>
          <FieldLabel htmlFor="state-disabled">Organization tier (Disabled)</FieldLabel>
          <Select disabled defaultValue="enterprise">
            <SelectTrigger id="state-disabled">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise (Locked)</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>Disabled trigger is inaccessible to click and keyboard focus.</FieldDescription>
        </Field>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Controlled State Demo                                                   */
/* -------------------------------------------------------------------------- */

export function ControlledSelectDemo() {
  const [role, setRole] = React.useState<string | null>("maintainer");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl space-y-3", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-controlled-select">
        <FieldLabel htmlFor="demo-controlled-select">Assigned workspace role</FieldLabel>
        <Select value={role} onValueChange={(val) => setRole(val)}>
          <SelectTrigger id="demo-controlled-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewer">Viewer (Read-only)</SelectItem>
            <SelectItem value="contributor">Contributor (Draft &amp; Branch)</SelectItem>
            <SelectItem value="maintainer">Maintainer (Review &amp; Merge)</SelectItem>
            <SelectItem value="owner">Owner (Full Admin Access)</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 border border-border text-xs">
        <span className="text-muted-foreground">Current state value:</span>
        <code className="font-mono text-foreground font-semibold">&quot;{role}&quot;</code>
      </div>
    </div>
  );
}
