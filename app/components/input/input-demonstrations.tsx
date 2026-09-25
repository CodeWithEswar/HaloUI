"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Canonical Field Composition                                             */
/* -------------------------------------------------------------------------- */

export function PrimaryInputFieldDemo() {
  const [email, setEmail] = React.useState("alex.morgan@company.com");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="primary-demo-email">
        <FieldLabel htmlFor="primary-demo-email">Email address</FieldLabel>
        <Input
          id="primary-demo-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          aria-describedby="primary-demo-email-desc"
        />
        <FieldDescription id="primary-demo-email-desc">
          We use this address for critical workspace notifications.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Native Input Types Showcase                                             */
/* -------------------------------------------------------------------------- */

export function InputTypesDemo() {
  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4", DEMO_CONTAINER_GLASS)}>
      <Field id="type-text">
        <FieldLabel htmlFor="type-text">Full name</FieldLabel>
        <Input id="type-text" type="text" defaultValue="Elena Rostova" placeholder="Full name" />
      </Field>

      <Field id="type-email">
        <FieldLabel htmlFor="type-email">Email</FieldLabel>
        <Input id="type-email" type="email" defaultValue="elena@company.com" placeholder="name@company.com" />
      </Field>

      <Field id="type-password">
        <FieldLabel htmlFor="type-password">Password</FieldLabel>
        <Input id="type-password" type="password" defaultValue="secret_token_123" placeholder="••••••••" />
      </Field>

      <Field id="type-search">
        <FieldLabel htmlFor="type-search">Search query</FieldLabel>
        <Input id="type-search" type="search" placeholder="Search documentation..." />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Comprehensive State Grid (Flagship Engineering Preview)                 */
/* -------------------------------------------------------------------------- */

export function InputStatesDemo() {
  const invalidRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground px-3 py-2 rounded-xl bg-muted/40 border border-border">
        <span>Interactive State Inspection</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => invalidRef.current?.focus()}
          className="h-7 text-xs px-2.5"
        >
          Focus Invalid Input
        </Button>
      </div>

      <div className={cn("p-5 sm:p-7 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4.5", DEMO_CONTAINER_GLASS)}>
        {/* 1. Empty */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">1. Empty (Placeholder)</span>
          <Input placeholder="Enter title..." />
        </div>

        {/* 2. Filled */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">2. Filled (Rest)</span>
          <Input defaultValue="Autonomous Agent Config" />
        </div>

        {/* 3. Invalid (Unfocused) */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-destructive">3. Invalid (Dual Indicator)</span>
          <Input
            defaultValue="invalid-format-string"
            aria-invalid="true"
            aria-describedby="state-err-1"
          />
          <span id="state-err-1" className="text-xs text-destructive">
            Invalid format.
          </span>
        </div>

        {/* 4. Invalid + Focused */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-destructive">4. Invalid + Focused (Authoritative)</span>
          <Input
            ref={invalidRef}
            defaultValue="user@invalid-tld"
            aria-invalid="true"
            aria-describedby="state-err-2"
          />
          <span id="state-err-2" className="text-xs text-destructive">
            Both error border and Halo Focus Ring active.
          </span>
        </div>

        {/* 5. Disabled */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">5. Disabled (Non-Interactive)</span>
          <Input defaultValue="System-generated hardware UID" disabled />
        </div>

        {/* 6. Read-Only */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">6. Read-Only (Focusable &amp; Selectable)</span>
          <Input defaultValue="hl_live_89f02c4b71e98d" readOnly />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Controlled vs Uncontrolled                                              */
/* -------------------------------------------------------------------------- */

export function ControlledVsUncontrolledDemo() {
  const [controlledVal, setControlledVal] = React.useState("Controlled input state");

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4", DEMO_CONTAINER_GLASS)}>
      {/* Controlled */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Controlled
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            {controlledVal.length} chars
          </span>
        </div>
        <Input
          value={controlledVal}
          onChange={(e) => setControlledVal(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Synchronized via React <code className="text-foreground">value</code> and <code className="text-foreground">onChange</code>.
        </p>
      </div>

      {/* Uncontrolled */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Uncontrolled
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            Native DOM
          </span>
        </div>
        <Input defaultValue="Initial default string" />
        <p className="text-xs text-muted-foreground">
          Managed internally by browser with native <code className="text-foreground">defaultValue</code>.
        </p>
      </div>
    </div>
  );
}
