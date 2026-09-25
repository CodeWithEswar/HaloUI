"use client";

import * as React from "react";
import {
  PhoneField,
  type PhoneValueDetails,
  type CountryCode,
} from "@/components/ui/phone-field";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* 1. Primary Phone Field Demo                                                */
/* -------------------------------------------------------------------------- */
export function PrimaryPhoneFieldDemo() {
  const [phone, setPhone] = React.useState<string>("(415) 555-2671");
  const [details, setDetails] = React.useState<PhoneValueDetails | null>(null);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="primary-phone-field">
        <FieldLabel htmlFor="primary-phone-input" className="text-sm font-semibold">
          Phone number
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Include a number where you can receive account-related calls or messages.
        </FieldDescription>
        <PhoneField
          id="primary-phone-input"
          defaultCountry="US"
          value={phone}
          onValueChange={(val, d) => {
            setPhone(val);
            setDetails(d);
          }}
        />
        <div className="mt-3 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Normalized E.164: {details?.e164 ?? "+14155552671"}
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. International Context Demo                                              */
/* -------------------------------------------------------------------------- */
export function InternationalContextDemo() {
  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="p-3.5 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground block">United States (US)</span>
          <span className="text-[11px] text-muted-foreground">National format: (415) 555-2671</span>
        </div>
        <div className="w-52">
          <PhoneField defaultCountry="US" defaultValue="(415) 555-2671" readOnly size="sm" />
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground block">United Kingdom (GB)</span>
          <span className="text-[11px] text-muted-foreground">National format: 020 7946 0919</span>
        </div>
        <div className="w-52">
          <PhoneField defaultCountry="GB" defaultValue="020 7946 0919" readOnly size="sm" />
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground block">Germany (DE)</span>
          <span className="text-[11px] text-muted-foreground">National format: 030 123456</span>
        </div>
        <div className="w-52">
          <PhoneField defaultCountry="DE" defaultValue="030 123456" readOnly size="sm" />
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground block">India (IN)</span>
          <span className="text-[11px] text-muted-foreground">National format: 98765 43210</span>
        </div>
        <div className="w-52">
          <PhoneField defaultCountry="IN" defaultValue="98765 43210" readOnly size="sm" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Country Change with Existing Value Demo                                 */
/* -------------------------------------------------------------------------- */
export function CountryChangeDemo() {
  const [country, setCountry] = React.useState<CountryCode>("US");
  const [val, setVal] = React.useState<string>("4155552671");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">Select Country</span>
        <div className="flex rounded-lg border border-border p-0.5 bg-muted/30">
          {(["US", "CA", "GB"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCountry(c)}
              className={`px-2 py-0.5 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                country === c ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Field id="country-change-phone-field">
        <FieldLabel htmlFor="country-change-phone-input" className="text-sm font-semibold">
          Preserved Digits
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Changing country context preserves entered digits without silent number corruption.
        </FieldDescription>
        <PhoneField
          id="country-change-phone-input"
          country={country}
          onCountryChange={setCountry}
          value={val}
          onValueChange={(newVal) => setVal(newVal)}
        />
        <div className="mt-3 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Current text: "{val}"
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Pasted International Number Demo                                        */
/* -------------------------------------------------------------------------- */
export function PastedInternationalDemo() {
  const [val, setVal] = React.useState<string>("");
  const [details, setDetails] = React.useState<PhoneValueDetails | null>(null);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">Paste Simulation</span>
        <button
          type="button"
          onClick={() => {
            setVal("+44 20 7946 0919");
            setDetails({
              raw: "+44 20 7946 0919",
              formatted: "+44 20 7946 0919",
              e164: "+442079460919",
              country: "GB",
              countryCallingCode: "44",
              isPossible: true,
              isValid: true,
            });
          }}
          className="text-[11px] font-medium text-primary hover:underline cursor-pointer"
        >
          Paste UK Number
        </button>
      </div>

      <Field id="paste-phone-field">
        <PhoneField
          id="paste-phone-input"
          defaultCountry="US"
          value={val}
          onValueChange={(v, d) => {
            setVal(v);
            setDetails(d);
          }}
          placeholder="Paste +44 20 7946 0919..."
        />
        <div className="mt-2 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Detected Country: {details?.country ?? "none"} • E.164: {details?.e164 ?? "none"}
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Invalid Phone Field Demo                                                */
/* -------------------------------------------------------------------------- */
export function InvalidPhoneFieldDemo() {
  const [phone, setPhone] = React.useState<string>("12345");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-destructive/30 bg-destructive/5 backdrop-blur-md shadow-sm">
      <Field id="invalid-phone-field" invalid>
        <FieldLabel htmlFor="invalid-phone-input" className="text-sm font-semibold text-destructive">
          Emergency Contact
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Number is incomplete according to the active numbering plan.
        </FieldDescription>
        <PhoneField
          id="invalid-phone-input"
          defaultCountry="US"
          value={phone}
          onValueChange={setPhone}
          invalid
        />
        <FieldError className="mt-2.5 text-xs text-destructive">
          Please enter a complete 10-digit telephone number.
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Disabled Phone Field Demo                                               */
/* -------------------------------------------------------------------------- */
export function DisabledPhoneFieldDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="disabled-phone-field" disabled>
        <FieldLabel htmlFor="disabled-phone-input" className="text-sm font-semibold text-muted-foreground">
          Verified Primary Number
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          This number is locked and cannot be edited.
        </FieldDescription>
        <PhoneField
          id="disabled-phone-input"
          defaultCountry="US"
          defaultValue="(415) 555-2671"
          disabled
        />
      </Field>
    </div>
  );
}
