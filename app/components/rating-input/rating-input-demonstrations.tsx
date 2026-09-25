"use client";

import * as React from "react";
import { RatingInput, type RatingSize } from "@/components/ui/rating-input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function PrimaryRatingInputExample() {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <Field id="primary-rating-field">
      <FieldLabel className="font-semibold text-foreground">
        Overall experience
      </FieldLabel>
      <FieldDescription>
        Rate your experience from 1 to 5.
      </FieldDescription>
      <div className="pt-2">
        <RatingInput
          value={value}
          onValueChange={setValue}
          aria-label="Overall experience"
        />
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Selected score: {value !== null ? `${value} of 5 stars` : "No rating chosen"}
      </p>
    </Field>
  );
}

export function ControlledRatingInputExample() {
  const [rating, setRating] = React.useState<number | null>(4);

  return (
    <div className="flex flex-col gap-3">
      <Field id="controlled-rating-field">
        <FieldLabel className="font-semibold text-foreground">
          Product Quality
        </FieldLabel>
        <FieldDescription>
          Programmatically controlled rating with reset capability.
        </FieldDescription>
        <div className="pt-2">
          <RatingInput
            value={rating}
            onValueChange={setRating}
            aria-label="Product Quality"
          />
        </div>
      </Field>

      <div className="flex items-center gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRating(null)}
          className="text-xs h-7"
        >
          Clear Rating
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRating(5)}
          className="text-xs h-7"
        >
          Set to 5 Stars
        </Button>
        <span className="text-xs text-muted-foreground ml-auto font-mono">
          State: {rating ?? "null"}
        </span>
      </div>
    </div>
  );
}

export function DescriptiveLabelsExample() {
  const [rating, setRating] = React.useState<number | null>(3);
  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <Field id="descriptive-labels-field">
      <FieldLabel className="font-semibold text-foreground">
        Customer Support
      </FieldLabel>
      <FieldDescription>
        Rating items announce descriptive labels alongside numeric values to screen readers.
      </FieldDescription>
      <div className="pt-2 flex items-center gap-3">
        <RatingInput
          value={rating}
          onValueChange={setRating}
          labels={labels}
          aria-label="Customer Support"
        />
        {rating !== null && (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            {labels[rating - 1]}
          </span>
        )}
      </div>
    </Field>
  );
}

export function CustomScaleExample() {
  const [rating10, setRating10] = React.useState<number | null>(7);

  return (
    <Field id="custom-scale-field">
      <FieldLabel className="font-semibold text-foreground">
        Net Promoter Score (1 to 10)
      </FieldLabel>
      <FieldDescription>
        Extended ordered scale dynamically validated for practical touch density.
      </FieldDescription>
      <div className="pt-2 overflow-x-auto pb-1">
        <RatingInput
          max={10}
          size="sm"
          value={rating10}
          onValueChange={setRating10}
          aria-label="Net Promoter Score"
        />
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Committed: {rating10 !== null ? `${rating10} of 10` : "None"}
      </p>
    </Field>
  );
}

export function SizesRatingInputExample() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="text-xs font-medium text-muted-foreground block mb-1.5">
          Small (16px icon, 32px hit target)
        </span>
        <RatingInput size="sm" defaultValue={3} aria-label="Small rating" />
      </div>
      <div>
        <span className="text-xs font-medium text-muted-foreground block mb-1.5">
          Medium — Default (20px icon, 40px touch hit target)
        </span>
        <RatingInput size="md" defaultValue={4} aria-label="Medium rating" />
      </div>
      <div>
        <span className="text-xs font-medium text-muted-foreground block mb-1.5">
          Large (24px icon, 48px touch hit target)
        </span>
        <RatingInput size="lg" defaultValue={5} aria-label="Large rating" />
      </div>
    </div>
  );
}

export function StatesRatingInputExample() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Empty / Unselected</span>
        <RatingInput defaultValue={null} aria-label="Empty rating" />
      </div>

      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Committed 4 / 5</span>
        <RatingInput defaultValue={4} aria-label="Committed rating" />
      </div>

      <div className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/5 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-destructive">Invalid (Field Error)</span>
        <RatingInput invalid defaultValue={null} aria-label="Invalid rating" />
        <span className="text-[11px] text-destructive">A rating score is required.</span>
      </div>

      <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground">Disabled</span>
        <RatingInput disabled defaultValue={3} aria-label="Disabled rating" />
      </div>
    </div>
  );
}

export function FormCompositionExample() {
  const [rating, setRating] = React.useState<number | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const isInvalid = submitted && rating === null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <Field id="feedback-rating" invalid={isInvalid} required>
        <FieldLabel className="font-semibold text-foreground">
          Platform Feedback
        </FieldLabel>
        <FieldDescription>
          Required single-choice evaluation for product usability.
        </FieldDescription>
        <div className="pt-2">
          <RatingInput
            value={rating}
            onValueChange={(val) => {
              setRating(val);
              if (submitted) setSubmitted(false);
            }}
            invalid={isInvalid}
            aria-label="Platform Feedback"
          />
        </div>
        {isInvalid && (
          <FieldError>Please select a rating before submitting feedback.</FieldError>
        )}
      </Field>

      <Button type="submit" size="sm" className="w-fit">
        Submit Feedback
      </Button>
    </form>
  );
}
