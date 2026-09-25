"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* 1. Primary Verification Code Demo (6 Digits Grouped)                        */
/* -------------------------------------------------------------------------- */
export function PrimaryInputOTPDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="primary-otp-field">
        <FieldLabel htmlFor="primary-otp-input" className="text-sm font-semibold">
          Verification Code
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Enter the 6-digit code sent to your authenticator app.
        </FieldDescription>
        <div className="flex justify-center">
          <InputOTP
            id="primary-otp-input"
            maxLength={6}
            value={value}
            onChange={setValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="mt-3 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Current Value: {value ? `"${value}"` : '""'}
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Grouped Layout (3 - 3 with Separator)                                   */
/* -------------------------------------------------------------------------- */
export function GroupedInputOTPDemo() {
  const [value, setValue] = React.useState("582194");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="grouped-otp-field">
        <FieldLabel htmlFor="grouped-otp-input" className="text-sm font-semibold">
          SMS Security Code
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          The separator visually splits the 6-digit code without altering the underlying value.
        </FieldDescription>
        <div className="flex justify-center">
          <InputOTP
            id="grouped-otp-input"
            maxLength={6}
            value={value}
            onChange={setValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <p className="text-[11px] text-muted-foreground text-center mt-2">
          Logical value has length {value.length} (no separator character is stored)
        </p>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Continuous 4-Digit PIN Demo                                            */
/* -------------------------------------------------------------------------- */
export function ContinuousPinDemo() {
  const [pin, setPin] = React.useState("2048");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="continuous-pin-field">
        <FieldLabel htmlFor="continuous-pin-input" className="text-sm font-semibold">
          Passcode PIN
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          A continuous 4-slot group for compact security PIN entry.
        </FieldDescription>
        <div className="flex justify-center">
          <InputOTP
            id="continuous-pin-input"
            maxLength={4}
            value={pin}
            onChange={setPin}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Controlled State Demo with Quick Actions                                */
/* -------------------------------------------------------------------------- */
export function ControlledInputOTPDemo() {
  const [code, setCode] = React.useState("381");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm space-y-4">
      <Field id="controlled-otp-field">
        <FieldLabel htmlFor="controlled-otp-input" className="text-sm font-semibold">
          Controlled OTP Input
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          State is strictly owned by the consumer React state.
        </FieldDescription>
        <div className="flex justify-center">
          <InputOTP
            id="controlled-otp-input"
            maxLength={6}
            value={code}
            onChange={setCode}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Field>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-border/40">
        <button
          type="button"
          onClick={() => setCode("381942")}
          className="text-xs px-2.5 py-1 rounded-md border border-border bg-muted/50 hover:bg-muted font-medium transition-colors"
        >
          Fill "381942"
        </button>
        <button
          type="button"
          onClick={() => setCode("999")}
          className="text-xs px-2.5 py-1 rounded-md border border-border bg-muted/50 hover:bg-muted font-medium transition-colors"
        >
          Partial "999"
        </button>
        <button
          type="button"
          onClick={() => setCode("")}
          className="text-xs px-2.5 py-1 rounded-md border border-border bg-muted/50 hover:bg-muted font-medium transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Invalid State + Focus Coexistence Demo                                 */
/* -------------------------------------------------------------------------- */
export function InvalidInputOTPDemo() {
  const [code, setCode] = React.useState("999999");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-destructive/30 bg-destructive/5 backdrop-blur-md shadow-sm">
      <Field id="invalid-otp-field" invalid>
        <FieldLabel htmlFor="invalid-otp-input" className="text-sm font-semibold text-destructive">
          Two-Factor Authentication
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          When marked invalid, both the error ring and active focused slot remain distinct.
        </FieldDescription>
        <div className="flex justify-center">
          <InputOTP
            id="invalid-otp-input"
            maxLength={6}
            value={code}
            onChange={setCode}
            invalid
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <FieldError className="mt-3 text-xs text-destructive text-center">
          The code you entered has expired. Please request a new code.
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Disabled State Demo                                                     */
/* -------------------------------------------------------------------------- */
export function DisabledInputOTPDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="disabled-otp-field" disabled>
        <FieldLabel htmlFor="disabled-otp-input" className="text-sm font-semibold text-muted-foreground">
          Archived Verification Code
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Disabled input preserves entered value while blocking editing and focus.
        </FieldDescription>
        <div className="flex justify-center">
          <InputOTP
            id="disabled-otp-input"
            maxLength={6}
            value="847291"
            disabled
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Slot Sizing Comparison                                                  */
/* -------------------------------------------------------------------------- */
export function SlotSizesDemo() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="p-4 rounded-xl border border-border/60 bg-card/40 flex flex-col items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Small (`size="sm"`, 32–36px)</span>
        <InputOTP maxLength={6} defaultValue="123456" size="sm">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="p-4 rounded-xl border border-border/60 bg-card/40 flex flex-col items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Default (`size="default"`, 38–42px)</span>
        <InputOTP maxLength={6} defaultValue="123456" size="default">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="p-4 rounded-xl border border-border/60 bg-card/40 flex flex-col items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Large (`size="lg"`, 44–48px)</span>
        <InputOTP maxLength={6} defaultValue="123456" size="lg">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}
