"use client";

import * as React from "react";
import { CurrencyField } from "@/components/ui/currency-field";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* 1. Primary Currency Field Demo (USD / en-US)                              */
/* -------------------------------------------------------------------------- */
export function PrimaryCurrencyFieldDemo() {
  const [budget, setBudget] = React.useState<number | null>(2500);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="primary-currency-field">
        <FieldLabel htmlFor="primary-currency-input" className="text-sm font-semibold">
          Project Budget
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Enter total allocation in USD.
        </FieldDescription>
        <CurrencyField
          id="primary-currency-input"
          currency="USD"
          locale="en-US"
          value={budget}
          onValueChange={setBudget}
        />
        <div className="mt-3 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Semantic Value: {budget === null ? "null" : budget}
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Locale & Currency Matrix Demo (Section 121: 1234.5)                     */
/* -------------------------------------------------------------------------- */
export function LocaleMatrixDemo() {
  const fixedAmount = 1234.5;

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="p-3.5 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground block">USD / en-US</span>
          <span className="text-[11px] text-muted-foreground">Standard American formatting ($1,234.50)</span>
        </div>
        <div className="w-48">
          <CurrencyField
            currency="USD"
            locale="en-US"
            defaultValue={fixedAmount}
            readOnly
            size="sm"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground block">EUR / de-DE</span>
          <span className="text-[11px] text-muted-foreground">German formatting (1.234,50 €)</span>
        </div>
        <div className="w-48">
          <CurrencyField
            currency="EUR"
            locale="de-DE"
            defaultValue={fixedAmount}
            readOnly
            size="sm"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground block">INR / en-IN</span>
          <span className="text-[11px] text-muted-foreground">Indian Rupee formatting (₹1,234.50)</span>
        </div>
        <div className="w-48">
          <CurrencyField
            currency="INR"
            locale="en-IN"
            defaultValue={fixedAmount}
            readOnly
            size="sm"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground block">JPY / ja-JP</span>
          <span className="text-[11px] text-muted-foreground">Japanese Yen zero-fraction (￥1,235)</span>
        </div>
        <div className="w-48">
          <CurrencyField
            currency="JPY"
            locale="ja-JP"
            defaultValue={fixedAmount}
            readOnly
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Currency Change Demo (Formatting != Conversion)                         */
/* -------------------------------------------------------------------------- */
export function CurrencyChangeDemo() {
  const [curr, setCurr] = React.useState<"USD" | "EUR" | "GBP">("USD");
  const [val, setVal] = React.useState<number | null>(1500);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">Select Display Currency</span>
        <div className="flex rounded-lg border border-border p-0.5 bg-muted/30">
          {(["USD", "EUR", "GBP"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurr(c)}
              className={`px-2 py-0.5 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                curr === c ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Field id="currency-change-field">
        <FieldLabel htmlFor="currency-change-input" className="text-sm font-semibold">
          Denomination Context
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Changing currency updates presentation only without altering the semantic amount.
        </FieldDescription>
        <CurrencyField
          id="currency-change-input"
          currency={curr}
          value={val}
          onValueChange={setVal}
          showCurrencyCode
        />
        <div className="mt-3 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Semantic Value: {val} (No exchange rate applied)
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. With Steppers Demo (Auction Bid Stepper)                                 */
/* -------------------------------------------------------------------------- */
export function WithSteppersDemo() {
  const [bid, setBid] = React.useState<number | null>(250);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="bid-field">
        <FieldLabel htmlFor="bid-input" className="text-sm font-semibold">
          Auction Bid Amount
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Configured with stepper buttons for increments of $25.00.
        </FieldDescription>
        <CurrencyField
          id="bid-input"
          currency="USD"
          step={25}
          min={50}
          max={1000}
          stepperPlacement="right"
          value={bid}
          onValueChange={setBid}
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Invalid Currency Field Demo                                             */
/* -------------------------------------------------------------------------- */
export function InvalidCurrencyFieldDemo() {
  const [amount, setAmount] = React.useState<number | null>(75000);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-destructive/30 bg-destructive/5 backdrop-blur-md shadow-sm">
      <Field id="invalid-currency-field" invalid>
        <FieldLabel htmlFor="invalid-currency-input" className="text-sm font-semibold text-destructive">
          Wire Transfer Authorization
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Exceeds daily electronic transfer cap ($50,000.00).
        </FieldDescription>
        <CurrencyField
          id="invalid-currency-input"
          currency="USD"
          value={amount}
          onValueChange={setAmount}
          invalid
        />
        <FieldError className="mt-2.5 text-xs text-destructive">
          Amount exceeds the daily electronic funds transfer limit.
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Disabled State Demo                                                     */
/* -------------------------------------------------------------------------- */
export function DisabledCurrencyFieldDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="disabled-currency-field" disabled>
        <FieldLabel htmlFor="disabled-currency-input" className="text-sm font-semibold text-muted-foreground">
          Settled Transaction
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Locked monetary amount preserves contrast and currency symbols.
        </FieldDescription>
        <CurrencyField
          id="disabled-currency-input"
          currency="USD"
          defaultValue={4892.5}
          disabled
        />
      </Field>
    </div>
  );
}
