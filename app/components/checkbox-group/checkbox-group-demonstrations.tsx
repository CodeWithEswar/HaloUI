"use client";

import * as React from "react";
import {
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupItem,
} from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Primary Notification Methods Demo with Descriptions                     */
/* -------------------------------------------------------------------------- */

export function PrimaryCheckboxGroupDemo() {
  const [channels, setChannels] = React.useState<string[]>(["email", "push"]);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <CheckboxGroup
        value={channels}
        onValueChange={setChannels}
      >
        <CheckboxGroupLabel>Notification channels</CheckboxGroupLabel>
        <CheckboxGroupDescription>
          Choose where you want to receive critical activity and security notices.
        </CheckboxGroupDescription>

        <CheckboxGroupItem>
          <Checkbox value="email" id="primary-email" className="mt-0.5" />
          <div className="grid gap-1 leading-none">
            <Label htmlFor="primary-email" className="text-sm font-medium text-foreground cursor-pointer">
              Email delivery
            </Label>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Consolidated digests and deployment notifications sent to your primary address.
            </span>
          </div>
        </CheckboxGroupItem>

        <CheckboxGroupItem>
          <Checkbox value="sms" id="primary-sms" className="mt-0.5" />
          <div className="grid gap-1 leading-none">
            <Label htmlFor="primary-sms" className="text-sm font-medium text-foreground cursor-pointer">
              SMS alerts
            </Label>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Urgent two-factor authentication and security escalation pings.
            </span>
          </div>
        </CheckboxGroupItem>

        <CheckboxGroupItem>
          <Checkbox value="push" id="primary-push" className="mt-0.5" />
          <div className="grid gap-1 leading-none">
            <Label htmlFor="primary-push" className="text-sm font-medium text-foreground cursor-pointer">
              Push notifications
            </Label>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Instant mobile and desktop app banners for real-time collaborator activity.
            </span>
          </div>
        </CheckboxGroupItem>
      </CheckboxGroup>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Horizontal Orientation Demo                                             */
/* -------------------------------------------------------------------------- */

export function HorizontalCheckboxGroupDemo() {
  const [days, setDays] = React.useState<string[]>(["mon", "wed", "fri"]);

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <CheckboxGroup
        orientation="horizontal"
        value={days}
        onValueChange={setDays}
      >
        <CheckboxGroupLabel>Automated backup schedule</CheckboxGroupLabel>
        <CheckboxGroupDescription>
          Select which days the continuous snapshot runner should capture offsite archives.
        </CheckboxGroupDescription>

        {[
          { id: "mon", label: "Mon" },
          { id: "tue", label: "Tue" },
          { id: "wed", label: "Wed" },
          { id: "thu", label: "Thu" },
          { id: "fri", label: "Fri" },
          { id: "sat", label: "Sat" },
          { id: "sun", label: "Sun" },
        ].map((day) => (
          <CheckboxGroupItem key={day.id} className="items-center">
            <Checkbox value={day.id} id={`day-${day.id}`} />
            <Label htmlFor={`day-${day.id}`} className="text-xs font-mono font-medium text-foreground cursor-pointer">
              {day.label}
            </Label>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroup>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Group Validation Error Demo                                             */
/* -------------------------------------------------------------------------- */

export function InvalidCheckboxGroupDemo() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const isInvalid = selected.length === 0;

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="delivery-methods-field" invalid={isInvalid}>
        <CheckboxGroup
          value={selected}
          onValueChange={setSelected}
          invalid={isInvalid}
        >
          <CheckboxGroupLabel required>Deployment environments</CheckboxGroupLabel>
          <CheckboxGroupDescription>
            At least one target environment must be provisioned for your pipeline.
          </CheckboxGroupDescription>

          <CheckboxGroupItem>
            <Checkbox value="staging" id="inv-staging" />
            <Label htmlFor="inv-staging" className="text-sm font-medium text-foreground cursor-pointer">
              Staging (Preview cluster)
            </Label>
          </CheckboxGroupItem>

          <CheckboxGroupItem>
            <Checkbox value="production" id="inv-prod" />
            <Label htmlFor="inv-prod" className="text-sm font-medium text-foreground cursor-pointer">
              Production (Global CDN)
            </Label>
          </CheckboxGroupItem>

          <CheckboxGroupItem>
            <Checkbox value="canary" id="inv-canary" />
            <Label htmlFor="inv-canary" className="text-sm font-medium text-foreground cursor-pointer">
              Canary (10% traffic branch)
            </Label>
          </CheckboxGroupItem>
        </CheckboxGroup>

        {isInvalid && (
          <FieldError className="mt-3">
            Please choose at least one deployment target to continue.
          </FieldError>
        )}
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Select All Parent Composition Demo                                      */
/* -------------------------------------------------------------------------- */

const ALL_ROLES = ["admin", "editor", "viewer", "billing"];

export function SelectAllCompositionDemo() {
  const [roles, setRoles] = React.useState<string[]>(["editor", "viewer"]);

  const allSelected = roles.length === ALL_ROLES.length;
  const someSelected = roles.length > 0 && !allSelected;
  const parentState: boolean | "indeterminate" = allSelected
    ? true
    : someSelected
    ? "indeterminate"
    : false;

  const handleParentToggle = () => {
    if (allSelected) {
      setRoles([]);
    } else {
      setRoles([...ALL_ROLES]);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <div className="space-y-4">
        {/* Parent Checkbox */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Checkbox
              id="select-all-roles"
              checked={parentState}
              onCheckedChange={handleParentToggle}
            />
            <Label
              htmlFor="select-all-roles"
              className="text-sm font-semibold text-foreground cursor-pointer"
            >
              Grant all workspace permissions
            </Label>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {roles.length}/{ALL_ROLES.length}
          </span>
        </div>

        {/* Coordinated Checkbox Group */}
        <CheckboxGroup value={roles} onValueChange={setRoles}>
          <CheckboxGroupItem>
            <Checkbox value="admin" id="role-admin" />
            <Label htmlFor="role-admin" className="text-sm font-medium text-foreground cursor-pointer">
              Administrator (Full root access)
            </Label>
          </CheckboxGroupItem>

          <CheckboxGroupItem>
            <Checkbox value="editor" id="role-editor" />
            <Label htmlFor="role-editor" className="text-sm font-medium text-foreground cursor-pointer">
              Editor (Create &amp; edit repositories)
            </Label>
          </CheckboxGroupItem>

          <CheckboxGroupItem>
            <Checkbox value="viewer" id="role-viewer" />
            <Label htmlFor="role-viewer" className="text-sm font-medium text-foreground cursor-pointer">
              Viewer (Read-only access)
            </Label>
          </CheckboxGroupItem>

          <CheckboxGroupItem>
            <Checkbox value="billing" id="role-billing" />
            <Label htmlFor="role-billing" className="text-sm font-medium text-foreground cursor-pointer">
              Billing manager (Invoices &amp; subscriptions)
            </Label>
          </CheckboxGroupItem>
        </CheckboxGroup>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Disabled Group & Item Matrix                                            */
/* -------------------------------------------------------------------------- */

export function DisabledCheckboxGroupDemo() {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <CheckboxGroup defaultValue={["audit"]} disabled>
        <CheckboxGroupLabel>Security policies (Organization locked)</CheckboxGroupLabel>
        <CheckboxGroupDescription>
          These policies are enforced globally by your team&apos;s identity provider.
        </CheckboxGroupDescription>

        <CheckboxGroupItem>
          <Checkbox value="mfa" id="dis-mfa" />
          <Label htmlFor="dis-mfa" className="text-sm font-medium text-foreground cursor-not-allowed">
            Mandatory hardware MFA
          </Label>
        </CheckboxGroupItem>

        <CheckboxGroupItem>
          <Checkbox value="audit" id="dis-audit" />
          <Label htmlFor="dis-audit" className="text-sm font-medium text-foreground cursor-not-allowed">
            Immutable audit trail export
          </Label>
        </CheckboxGroupItem>
      </CheckboxGroup>
    </div>
  );
}
