"use client";

import * as React from "react";
import { NumberField } from "@/components/ui/number-field";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* 1. Primary Number Field Demo (Seats: 1–20)                                 */
/* -------------------------------------------------------------------------- */
export function PrimaryNumberFieldDemo() {
  const [seats, setSeats] = React.useState<number | null>(4);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="seats-field">
        <FieldLabel htmlFor="seats-input" className="text-sm font-semibold">
          Workspace Seats
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Choose the number of active team seats for this workspace (1–20).
        </FieldDescription>
        <NumberField
          id="seats-input"
          min={1}
          max={20}
          step={1}
          value={seats}
          onValueChange={setSeats}
        />
        <div className="mt-3 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Committed Value: {seats === null ? "null" : seats}
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Decimal Number Field Demo (Opacity: 0.0 – 1.0, step=0.1)                */
/* -------------------------------------------------------------------------- */
export function DecimalNumberFieldDemo() {
  const [opacity, setOpacity] = React.useState<number | null>(0.8);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="opacity-field">
        <FieldLabel htmlFor="opacity-input" className="text-sm font-semibold">
          Layer Opacity
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Precise decimal alpha channel (0.0 to 1.0 with step=0.1).
        </FieldDescription>
        <NumberField
          id="opacity-input"
          min={0}
          max={1}
          step={0.1}
          value={opacity}
          onValueChange={setOpacity}
        />
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Active Value: {opacity === null ? "null" : opacity}</span>
          <span>No floating-point garbage</span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Negative Number Field Demo (Offset: -10 to +10, step=1)                 */
/* -------------------------------------------------------------------------- */
export function NegativeNumberFieldDemo() {
  const [offset, setOffset] = React.useState<number | null>(-2);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="temperature-field">
        <FieldLabel htmlFor="temperature-input" className="text-sm font-semibold">
          Temperature Offset
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Adjust ambient offset (-10°C to +10°C). Allows typing leading minus sign.
        </FieldDescription>
        <NumberField
          id="temperature-input"
          min={-10}
          max={10}
          step={1}
          value={offset}
          onValueChange={setOffset}
        />
        <div className="mt-3 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Current Offset: {offset === null ? "null" : `${offset}°C`}
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Split Steppers Demo (Counter Layout)                                    */
/* -------------------------------------------------------------------------- */
export function SplitStepperDemo() {
  const [quantity, setQuantity] = React.useState<number | null>(1);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="split-counter-field">
        <FieldLabel htmlFor="split-counter-input" className="text-sm font-semibold">
          Item Quantity
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Split layout places decrement on the left and increment on the right.
        </FieldDescription>
        <NumberField
          id="split-counter-input"
          min={1}
          max={99}
          step={1}
          stepperPlacement="split"
          value={quantity}
          onValueChange={setQuantity}
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Controlled Number Field Demo                                            */
/* -------------------------------------------------------------------------- */
export function ControlledNumberFieldDemo() {
  const [val, setVal] = React.useState<number | null>(15);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm space-y-4">
      <Field id="controlled-num-field">
        <FieldLabel htmlFor="controlled-num-input" className="text-sm font-semibold">
          Controlled Counter
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Committed value strictly reflects parent React state.
        </FieldDescription>
        <NumberField
          id="controlled-num-input"
          min={0}
          max={100}
          step={5}
          value={val}
          onValueChange={setVal}
        />
      </Field>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-border/40">
        <button
          type="button"
          onClick={() => setVal(0)}
          className="text-xs px-2.5 py-1 rounded-md border border-border bg-muted/50 hover:bg-muted font-medium transition-colors cursor-pointer"
        >
          Set 0
        </button>
        <button
          type="button"
          onClick={() => setVal(50)}
          className="text-xs px-2.5 py-1 rounded-md border border-border bg-muted/50 hover:bg-muted font-medium transition-colors cursor-pointer"
        >
          Set 50
        </button>
        <button
          type="button"
          onClick={() => setVal(null)}
          className="text-xs px-2.5 py-1 rounded-md border border-border bg-muted/50 hover:bg-muted font-medium transition-colors cursor-pointer"
        >
          Clear (null)
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Invalid Number Field Demo                                               */
/* -------------------------------------------------------------------------- */
export function InvalidNumberFieldDemo() {
  const [val, setVal] = React.useState<number | null>(25);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-destructive/30 bg-destructive/5 backdrop-blur-md shadow-sm">
      <Field id="invalid-num-field" invalid>
        <FieldLabel htmlFor="invalid-num-input" className="text-sm font-semibold text-destructive">
          Concurrent Licenses
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          When marked invalid, error border and focused ring remain distinct.
        </FieldDescription>
        <NumberField
          id="invalid-num-input"
          min={1}
          max={20}
          step={1}
          value={val}
          onValueChange={setVal}
          invalid
        />
        <FieldError className="mt-2.5 text-xs text-destructive">
          Value exceeds maximum tier limit of 20 concurrent licenses.
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Disabled vs Read-Only Comparison Demo                                   */
/* -------------------------------------------------------------------------- */
export function DisabledAndReadOnlyDemo() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
        <span className="text-xs font-semibold text-muted-foreground block">Disabled (Interaction Locked)</span>
        <NumberField
          defaultValue={12}
          disabled
          aria-label="Disabled count"
        />
        <span className="text-[11px] text-muted-foreground block">
          Controls are unclickable, focus is prevented, and appearance is dimmed.
        </span>
      </div>

      <div className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-2">
        <span className="text-xs font-semibold text-muted-foreground block">Read-Only (Focusable & Selectable)</span>
        <NumberField
          defaultValue={42}
          readOnly
          aria-label="Read-only count"
        />
        <span className="text-[11px] text-muted-foreground block">
          Value is selectable and copyable, but steppers and keyboard typing cannot mutate it.
        </span>
      </div>
    </div>
  );
}
