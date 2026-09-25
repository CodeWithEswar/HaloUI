"use client";

import * as React from "react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  LockKeyIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

const DEMO_CARD_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Default Field (Standard Vertical Email Composition)                     */
/* -------------------------------------------------------------------------- */

export function DefaultFieldDemo() {
  const [value, setValue] = React.useState("alex.morgan@company.com");

  return (
    <div className={cn("w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl", DEMO_CARD_GLASS)}>
      <Field id="default-email">
        <FieldLabel>Email address</FieldLabel>
        <Input
          id="default-email"
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="name@example.com"
          aria-describedby="default-email-description"
        />
        <FieldDescription>
          We will use this address for critical workspace security notifications.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Flagship Regression: Invalid + Focused State                            */
/* -------------------------------------------------------------------------- */

export function InvalidFocusedDemo() {
  const [value, setValue] = React.useState("invalid-email-address");

  return (
    <div className={cn("w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl space-y-4", DEMO_CARD_GLASS)}>
      <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border/60">
        <strong className="text-foreground font-semibold">Crucial Accessibility Check:</strong>{" "}
        Click into the field below to verify that the high-contrast keyboard focus ring
        and the red invalid outline remain independently visible without collision.
      </div>

      <Field id="invalid-email" invalid>
        <FieldLabel>Email address</FieldLabel>
        <Input
          id="invalid-email"
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={true}
          aria-describedby="invalid-email-error"
        />
        <FieldError>
          Please enter a valid email address with a domain (e.g. user@domain.com).
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Description + Error Coexistence                                         */
/* -------------------------------------------------------------------------- */

export function DescriptionAndErrorDemo() {
  const [password, setPassword] = React.useState("short");

  return (
    <div className={cn("w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl", DEMO_CARD_GLASS)}>
      <Field id="coexist-password" invalid>
        <FieldLabel>Master password</FieldLabel>
        <Input
          id="coexist-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={true}
          aria-describedby="coexist-password-description coexist-password-error"
        />
        <FieldDescription>
          Must contain at least 12 characters, including uppercase and lowercase letters.
        </FieldDescription>
        <FieldError>
          Password is too short (current length: {password.length} / 12 required).
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Required & Optional Guidance                                            */
/* -------------------------------------------------------------------------- */

export function RequiredOptionalDemo() {
  return (
    <div className={cn("w-full max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 rounded-2xl", DEMO_CARD_GLASS)}>
      {/* Required Field */}
      <Field id="legal-name" required>
        <FieldLabel required>Full legal name</FieldLabel>
        <Input
          id="legal-name"
          placeholder="Jane Doe"
          required
          aria-required="true"
          aria-describedby="legal-name-description"
        />
        <FieldDescription>As shown on government ID.</FieldDescription>
      </Field>

      {/* Optional Field */}
      <Field id="preferred-pronouns">
        <FieldLabel optional>Pronouns</FieldLabel>
        <Input
          id="preferred-pronouns"
          placeholder="they / them"
          aria-describedby="preferred-pronouns-description"
        />
        <FieldDescription>Displayed on your public profile.</FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Horizontal Layout (Settings Row)                                        */
/* -------------------------------------------------------------------------- */

export function HorizontalFieldDemo() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className={cn("w-full max-w-lg mx-auto p-4 sm:p-6 rounded-2xl space-y-4", DEMO_CARD_GLASS)}>
      <Field orientation="horizontal" id="security-alerts">
        <FieldContent>
          <FieldLabel htmlFor="security-alerts">Security event alerts</FieldLabel>
          <FieldDescription id="security-alerts-desc">
            Receive instant emails when a new login or API key rotation occurs.
          </FieldDescription>
        </FieldContent>
        <Switch
          id="security-alerts"
          checked={enabled}
          onCheckedChange={setEnabled}
          aria-describedby="security-alerts-desc"
        />
      </Field>

      <div className="h-px bg-border/60" />

      <Field orientation="horizontal" id="audit-logging">
        <FieldContent>
          <FieldLabel htmlFor="audit-logging">Continuous audit streaming</FieldLabel>
          <FieldDescription id="audit-logging-desc">
            Export all workspace administrative actions to your webhook collector.
          </FieldDescription>
        </FieldContent>
        <Switch
          id="audit-logging"
          defaultChecked={false}
          aria-describedby="audit-logging-desc"
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Disabled vs. Read-Only Comparison                                       */
/* -------------------------------------------------------------------------- */

export function DisabledVsReadOnlyDemo() {
  return (
    <div className={cn("w-full max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 rounded-2xl", DEMO_CARD_GLASS)}>
      {/* Truly Disabled Field */}
      <Field id="disabled-field" disabled>
        <FieldLabel>API Environment</FieldLabel>
        <Input
          id="disabled-field"
          value="Production (Locked)"
          disabled
          aria-describedby="disabled-field-desc"
        />
        <FieldDescription>
          Disabled: not focusable, not editable, omitted from submission.
        </FieldDescription>
      </Field>

      {/* Read-Only Field */}
      <Field id="readonly-field">
        <FieldLabel>Client Key ID</FieldLabel>
        <Input
          id="readonly-field"
          value="pk_live_8912491b4c"
          readOnly
          aria-describedby="readonly-field-desc"
        />
        <FieldDescription>
          Read-only: focusable, selectable, copyable, normal contrast.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Control Versatility Spectrum (Textarea, Select, FieldSet)               */
/* -------------------------------------------------------------------------- */

export function ControlVersatilityDemo() {
  const [role, setRole] = React.useState("developer");

  return (
    <div className={cn("w-full max-w-lg mx-auto p-4 sm:p-6 rounded-2xl space-y-6", DEMO_CARD_GLASS)}>
      <FieldGroup>
        {/* With Select */}
        <Field id="member-role">
          <FieldLabel htmlFor="member-role">Workspace role</FieldLabel>
          <Select value={role} onValueChange={(val) => { if (val) setRole(val); }}>
            <SelectTrigger id="member-role" className="w-full bg-white/50 dark:bg-white/[0.04] backdrop-blur-xl border-black/[0.12] dark:border-white/[0.16] rounded-xl shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.04),0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.5),0_1px_1px_0_rgba(255,255,255,0.05)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner">Workspace Owner</SelectItem>
              <SelectItem value="developer">Lead Developer</SelectItem>
              <SelectItem value="designer">Design Architect</SelectItem>
              <SelectItem value="viewer">Read-Only Viewer</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>
            Determines deployment credentials and billing administrative access.
          </FieldDescription>
        </Field>
        {/* With Textarea */}
        <Field id="member-bio">
          <FieldLabel htmlFor="member-bio">Profile biography</FieldLabel>
          <Textarea
            id="member-bio"
            placeholder="Briefly describe your design engineering background..."
            rows={3}
            aria-describedby="member-bio-desc"
          />
          <FieldDescription id="member-bio-desc">
            Plain text or Markdown. Max 280 characters.
          </FieldDescription>
        </Field>

        {/* Semantic FieldSet with FieldLegend & Checkboxes */}
        <FieldSet>
          <FieldLegend>Notification preferences</FieldLegend>
          <div className="space-y-2 pt-1">
            <Field orientation="horizontal" id="pref-deploy">
              <FieldLabel htmlFor="pref-deploy" className="text-xs font-normal">
                Deploy preview ready
              </FieldLabel>
              <Checkbox id="pref-deploy" defaultChecked />
            </Field>

            <Field orientation="horizontal" id="pref-review">
              <FieldLabel htmlFor="pref-review" className="text-xs font-normal">
                Design review requests
              </FieldLabel>
              <Checkbox id="pref-review" defaultChecked />
            </Field>

            <Field orientation="horizontal" id="pref-weekly">
              <FieldLabel htmlFor="pref-weekly" className="text-xs font-normal">
                Weekly digest summary
              </FieldLabel>
              <Checkbox id="pref-weekly" />
            </Field>
          </div>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
