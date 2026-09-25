"use client";

import * as React from "react";
import { FieldGroup } from "@/components/ui/field-group";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Canonical Vertical Field Group                                          */
/* -------------------------------------------------------------------------- */

export function VerticalGroupDemo() {
  const [firstName, setFirstName] = React.useState("Alex");
  const [lastName, setLastName] = React.useState("Morgan");
  const [email, setEmail] = React.useState("alex.morgan@company.com");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <FieldGroup orientation="vertical">
        <Field id="vg-first-name">
          <FieldLabel htmlFor="vg-first-name">First name</FieldLabel>
          <Input
            id="vg-first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
        </Field>

        <Field id="vg-last-name">
          <FieldLabel htmlFor="vg-last-name">Last name</FieldLabel>
          <Input
            id="vg-last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
        </Field>

        <Field id="vg-email">
          <FieldLabel htmlFor="vg-email">Email address</FieldLabel>
          <Input
            id="vg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            aria-describedby="vg-email-description"
          />
          <FieldDescription id="vg-email-description">
            Your primary email for notifications and account recovery.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Responsive Horizontal Field Group                                       */
/* -------------------------------------------------------------------------- */

export function HorizontalGroupDemo() {
  const [firstName, setFirstName] = React.useState("Elena");
  const [lastName, setLastName] = React.useState("Rostova");
  const [role, setRole] = React.useState("Systems Architect");

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Responsive horizontal sub-group */}
        <FieldGroup orientation="horizontal">
          <Field id="hg-first-name">
            <FieldLabel htmlFor="hg-first-name">First name</FieldLabel>
            <Input
              id="hg-first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </Field>

          <Field id="hg-last-name">
            <FieldLabel htmlFor="hg-last-name">Last name</FieldLabel>
            <Input
              id="hg-last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </Field>
        </FieldGroup>

        {/* Full-width vertical field below */}
        <Field id="hg-role">
          <FieldLabel htmlFor="hg-role">Job title / Role</FieldLabel>
          <Input
            id="hg-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Frontend Engineer"
            aria-describedby="hg-role-description"
          />
          <FieldDescription id="hg-role-description">
            Displayed on your workspace profile and public author cards.
          </FieldDescription>
        </Field>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Middle Field Invalid & Focused (Flagship Regression Showcase)           */
/* -------------------------------------------------------------------------- */

export function MiddleFieldInvalidFocusedDemo() {
  const [firstName, setFirstName] = React.useState("Marcus");
  const [email, setEmail] = React.useState("marcus.invalid-email");
  const [department, setDepartment] = React.useState("Design Systems");
  const [isInvalid, setIsInvalid] = React.useState(true);

  const middleInputRef = React.useRef<HTMLInputElement>(null);

  const focusMiddleField = () => {
    middleInputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
      {/* Control bar */}
      <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-muted/40 border border-border text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <HaloIcon
            icon={isInvalid ? AlertCircleIcon : CheckmarkCircle02Icon}
            size={14}
            className={isInvalid ? "text-destructive" : "text-emerald-500"}
          />
          <span>
            {isInvalid
              ? "Middle field is invalid (group stays neutral)"
              : "All fields valid"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={focusMiddleField}
            className="h-7 text-xs px-2.5"
          >
            Focus Middle Field
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsInvalid(!isInvalid)}
            className="h-7 text-xs px-2.5"
          >
            Toggle Invalid
          </Button>
        </div>
      </div>

      {/* Form Group Container */}
      <div className={cn("p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <FieldGroup orientation="vertical">
          {/* Field 1: Valid & Calm */}
          <Field id="reg-name" invalid={false}>
            <FieldLabel htmlFor="reg-name">Full name</FieldLabel>
            <Input
              id="reg-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Full name"
            />
          </Field>

          {/* Field 2: Invalid + Focused (Middle Field) */}
          <Field id="reg-email" invalid={isInvalid}>
            <FieldLabel htmlFor="reg-email" required>
              Work email
            </FieldLabel>
            <Input
              ref={middleInputRef}
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.includes("@") && e.target.value.includes(".")) {
                  setIsInvalid(false);
                } else {
                  setIsInvalid(true);
                }
              }}
              aria-invalid={isInvalid ? "true" : undefined}
              aria-describedby={isInvalid ? "reg-email-error" : "reg-email-desc"}
              className={cn(
                isInvalid &&
                  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
              )}
            />
            {isInvalid ? (
              <FieldError id="reg-email-error">
                Please enter a valid work email containing an &apos;@&apos; domain.
              </FieldError>
            ) : (
              <FieldDescription id="reg-email-desc">
                Verified enterprise email address.
              </FieldDescription>
            )}
          </Field>

          {/* Field 3: Valid & Calm */}
          <Field id="reg-dept" invalid={false}>
            <FieldLabel htmlFor="reg-dept">Department</FieldLabel>
            <Input
              id="reg-dept"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Infrastructure"
            />
          </Field>
        </FieldGroup>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/30 border border-border text-xs text-muted-foreground">
        <HaloIcon icon={InformationCircleIcon} size={15} className="mt-0.5 shrink-0 text-foreground" />
        <p className="leading-relaxed">
          <strong>Architectural Verification:</strong> Notice that{" "}
          <code className="text-foreground">FieldGroup</code> does not wrap itself in an error border
          or apply group-level <code className="text-foreground">data-invalid</code> styling.
          Validation and focus ring semantics remain strictly isolated to the middle field.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. FieldSet vs FieldGroup Semantic Separation                              */
/* -------------------------------------------------------------------------- */

export function FieldSetVsFieldGroupDemo() {
  const [selectedPlan, setSelectedPlan] = React.useState("standard");

  return (
    <div className="w-full max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Structural FieldGroup (div) */}
      <div className={cn("p-4 sm:p-5 rounded-2xl flex flex-col gap-3", DEMO_CONTAINER_GLASS)}>
        <div className="flex items-center justify-between border-b border-border/50 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Structural Group
          </span>
          <code className="text-[11px] px-1.5 py-0.5 rounded bg-muted/60 text-foreground font-mono">
            &lt;FieldGroup&gt;
          </code>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Uses neutral <code className="text-foreground">&lt;div&gt;</code> spacing.
          Independent fields without shared semantic option grouping.
        </p>

        <FieldGroup orientation="vertical" className="mt-1">
          <Field id="st-city">
            <FieldLabel htmlFor="st-city">City</FieldLabel>
            <Input id="st-city" defaultValue="San Francisco" />
          </Field>
          <Field id="st-zip">
            <FieldLabel htmlFor="st-zip">Postal code</FieldLabel>
            <Input id="st-zip" defaultValue="94107" />
          </Field>
        </FieldGroup>
      </div>

      {/* Semantic FieldSet (fieldset + legend) */}
      <div className={cn("p-4 sm:p-5 rounded-2xl flex flex-col gap-3", DEMO_CONTAINER_GLASS)}>
        <div className="flex items-center justify-between border-b border-border/50 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Semantic Group
          </span>
          <code className="text-[11px] px-1.5 py-0.5 rounded bg-muted/60 text-foreground font-mono">
            &lt;FieldSet&gt;
          </code>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Uses accessible <code className="text-foreground">&lt;fieldset&gt;</code> and{" "}
          <code className="text-foreground">&lt;legend&gt;</code> for mutually exclusive options.
        </p>

        <FieldSet className="mt-1">
          <FieldLegend variant="label">Notification frequency</FieldLegend>
          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            className="gap-2.5 pt-1"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="realtime" id="opt-realtime" />
              <Label htmlFor="opt-realtime" className="text-xs font-normal cursor-pointer">
                Real-time alerts
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="standard" id="opt-daily" />
              <Label htmlFor="opt-daily" className="text-xs font-normal cursor-pointer">
                Daily digest
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="weekly" id="opt-weekly" />
              <Label htmlFor="opt-weekly" className="text-xs font-normal cursor-pointer">
                Weekly summary
              </Label>
            </div>
          </RadioGroup>
        </FieldSet>
      </div>
    </div>
  );
}
