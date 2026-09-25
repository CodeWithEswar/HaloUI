import * as React from "react";
import type { Metadata } from "next";
import { CurrencyFieldPreviewStage } from "./currency-field-preview-stage";
import {
  PrimaryCurrencyFieldDemo,
  LocaleMatrixDemo,
  CurrencyChangeDemo,
  WithSteppersDemo,
  InvalidCurrencyFieldDemo,
  DisabledCurrencyFieldDemo,
} from "./currency-field-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Currency Field — Forms & Fields — HaloUI",
  description:
    "A locale-aware monetary entry control that separates numeric value from currency presentation.",
};

const CURRENCY_FIELD_PROPS: PropRow[] = [
  {
    name: "value",
    type: "number | null",
    default: "undefined",
    required: false,
    description: "The controlled semantic numeric value. Never returns a formatted string.",
  },
  {
    name: "defaultValue",
    type: "number",
    default: "undefined",
    required: false,
    description: "Initial numeric value when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(value: number | null) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked with the updated numeric amount.",
  },
  {
    name: "onValueCommit",
    type: "(value: number | null) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when editing is committed on blur or pointer release.",
  },
  {
    name: "currency",
    type: "string",
    default: '"USD"',
    required: false,
    description: "ISO 4217 standard currency code (e.g. USD, EUR, JPY, GBP, INR).",
  },
  {
    name: "locale",
    type: "string",
    default: "runtime locale / 'en-US'",
    required: false,
    description: "BCP 47 language/region tag governing symbol placement and separators.",
  },
  {
    name: "currencyDisplay",
    type: '"symbol" | "narrowSymbol" | "code" | "name"',
    default: '"symbol"',
    required: false,
    description: "Presentation format for the currency indicator.",
  },
  {
    name: "showCurrencyCode",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders an optical ISO currency code badge inside the control boundary.",
  },
  {
    name: "stepperPlacement",
    type: '"none" | "right" | "split"',
    default: '"none"',
    required: false,
    description: "Layout for optional increment and decrement buttons.",
  },
  {
    name: "minFractionDigits",
    type: "number",
    default: "derived from currency",
    required: false,
    description: "Optional override for minimum fraction digits.",
  },
  {
    name: "maxFractionDigits",
    type: "number",
    default: "derived from currency",
    required: false,
    description: "Optional override for maximum fraction digits.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Marks the field with a destructive error border and coordinated focus ring.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Locks interaction and dims visual presentation.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents mutation while preserving text selection and copyability.",
  },
];

const CURRENCY_FIELD_ANATOMY: AnatomyPart[] = [
  {
    name: "CurrencyField (Root)",
    description: "Manages monetary state, Intl.NumberFormat options, and caret stability.",
  },
  {
    name: "NumberFieldGroup",
    description: "The shared optical liquid glass boundary enclosing input, currency badge, and optional steppers.",
  },
  {
    name: "NumberFieldInput",
    description: "The accessible input rendering formatted currency text while preserving raw numeric parsing.",
  },
  {
    name: "Currency Code Badge",
    description: "Optional visual indicator displaying the active ISO 4217 currency identifier.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast accessibility perimeter around the focused control.",
  },
];

const CURRENCY_FIELD_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "currency-field.tsx",
            type: "file",
            description: "CurrencyField component with locale-aware formatting and numeric value separation.",
          },
          {
            name: "number-field.tsx",
            type: "file",
            description: "Underlying numeric entry architecture and stepper primitives.",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
        description: "Optical glass tokens, tactile press, and focus ring system.",
      },
    ],
  },
];

const CURRENCY_FIELD_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "External Package Dependencies",
    name: "External Package Dependencies",
    items: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "HaloUI Registry Dependencies",
    name: "HaloUI Registry Dependencies",
    items: ["number-field", "field", "halo-icon"],
  },
];

export default function CurrencyFieldDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            Forms & Fields 21
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            registry: currency-field
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Currency Field
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          A locale-aware monetary entry control that separates numeric value from currency presentation.
        </p>
      </div>

      {/* Section 110 Callout */}
      <Callout type="note">
        <strong>Currency Field formats monetary input; it does not perform financial calculations.</strong> Exchange rates, taxes, discounts, accounting arithmetic, payment processing, and authoritative monetary precision remain application or backend responsibilities.
      </Callout>

      {/* 1. Preview */}
      <section id="preview" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interactive Preview
        </h2>
        <CurrencyFieldPreviewStage />
      </section>

      {/* 2. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Currency Field via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="currency-field" />
      </section>

      {/* 3. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { CurrencyField } from "@/components/ui/currency-field";

export function PriceInputExample() {
  const [price, setPrice] = React.useState<number | null>(49.99);

  return (
    <CurrencyField
      currency="USD"
      locale="en-US"
      value={price}
      onValueChange={setPrice}
    />
  );
}`}
          language="tsx"
        />
      </section>

      {/* 4. With Field */}
      <section id="with-field" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          With Field
        </h2>
        <p className="text-sm text-muted-foreground">
          Compose with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">Field</code> for accessible label, description, and validation errors:
        </p>
        <PrimaryCurrencyFieldDemo />
      </section>

      {/* 5. Controlled */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Controlled Model
        </h2>
        {/* Section 111 Callout */}
        <Callout type="tip">
          <strong>Keep the monetary value separate from its localized presentation.</strong> A displayed value such as <code className="font-mono text-xs">$1,234.50</code> should not force consumers to parse that formatted string to recover the semantic amount. The <code className="font-mono text-xs">value</code> prop and <code className="font-mono text-xs">onValueChange</code> callback always deliver raw JavaScript numbers or <code className="font-mono text-xs">null</code>.
        </Callout>
      </section>

      {/* 6. Uncontrolled */}
      <section id="uncontrolled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Uncontrolled
        </h2>
        <p className="text-sm text-muted-foreground">
          Supply <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">defaultValue</code> for self-contained uncontrolled forms:
        </p>
        <CodeBlock
          code={`<CurrencyField currency="EUR" locale="de-DE" defaultValue={150} />`}
          language="tsx"
        />
      </section>

      {/* 7. Currency */}
      <section id="currency" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Currency Specification
        </h2>
        <p className="text-sm text-muted-foreground">
          Specify standard ISO 4217 identifiers such as <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">"USD"</code>, <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">"EUR"</code>, <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">"JPY"</code>, <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">"GBP"</code>, or <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">"INR"</code>. Never use raw symbols like "$" as the currency identity.
        </p>
      </section>

      {/* 8. Locale */}
      <section id="locale" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Locale Independence
        </h2>
        {/* Section 112 Callout */}
        <Callout type="note">
          <strong>Currency and locale are separate concepts.</strong> Currency identifies the monetary unit; locale determines how that unit and number are presented. An <code className="font-mono text-xs">en-US</code> user can enter Euros without altering the EUR currency identity.
        </Callout>
      </section>

      {/* 9. Numeric Value */}
      <section id="numeric-value" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Numeric Value Guarantee
        </h2>
        <p className="text-sm text-muted-foreground">
          The underlying state is strictly a major-unit number (e.g. <code className="font-mono text-xs">1234.5</code>), never a formatted string with currency symbols.
        </p>
        <LocaleMatrixDemo />
      </section>

      {/* 10. Display Formatting */}
      <section id="display-formatting" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Locale-Aware Formatting
        </h2>
        <p className="text-sm text-muted-foreground">
          Powered natively by platform <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">Intl.NumberFormat</code>:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li><strong>en-US (USD):</strong> Symbol precedes digits: <code className="font-mono text-xs">$1,234.50</code></li>
          <li><strong>de-DE (EUR):</strong> Symbol follows digits: <code className="font-mono text-xs">1.234,50 €</code></li>
          <li><strong>en-IN (INR):</strong> Indian Rupee grouping: <code className="font-mono text-xs">₹1,234.50</code></li>
          <li><strong>ja-JP (JPY):</strong> Zero fraction currency: <code className="font-mono text-xs">￥1,235</code></li>
        </ul>
      </section>

      {/* 11. Fraction Digits */}
      <section id="fraction-digits" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Fraction Digits & Minor Units
        </h2>
        <p className="text-sm text-muted-foreground">
          Fraction digits derive automatically from the ISO currency standard. JPY automatically formats with 0 decimals, whereas USD and EUR format with 2 decimals.
        </p>
      </section>

      {/* 12. Grouping Separators */}
      <section id="grouping-separators" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Grouping Separators
        </h2>
        <p className="text-sm text-muted-foreground">
          Grouping characters vary by locale (e.g. comma in <code className="font-mono text-xs">en-US</code>, period in <code className="font-mono text-xs">de-DE</code>). Typing adheres to locale rules without cursor hopping.
        </p>
      </section>

      {/* 13. Decimal Separators */}
      <section id="decimal-separators" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Decimal Separators
        </h2>
        <p className="text-sm text-muted-foreground">
          Locales using decimal commas (such as German or French) parse commas seamlessly as fraction boundaries.
        </p>
      </section>

      {/* 14. Negative Values */}
      <section id="negative-values" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Negative Monetary Values
        </h2>
        <p className="text-sm text-muted-foreground">
          Negative amounts (such as refunds or discounts) format according to locale conventions when <code className="font-mono text-xs">min &lt; 0</code>.
        </p>
      </section>

      {/* 15. Empty and Zero */}
      <section id="empty-and-zero" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Empty vs Zero
        </h2>
        <p className="text-sm text-muted-foreground">
          An empty field emits <code className="font-mono text-xs">null</code>, preserving distinction from an intentional <code className="font-mono text-xs">$0.00</code> value.
        </p>
      </section>

      {/* 16. Minimum and Maximum */}
      <section id="minimum-and-maximum" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Bounds Enforcement
        </h2>
        <p className="text-sm text-muted-foreground">
          Numeric limits are enforced via <code className="font-mono text-xs">min</code> and <code className="font-mono text-xs">max</code> directly on semantic numbers, not by comparing formatted strings.
        </p>
      </section>

      {/* 17. Step */}
      <section id="step" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Stepping
        </h2>
        <p className="text-sm text-muted-foreground">
          Configurable step increments (e.g. <code className="font-mono text-xs">step={25}</code> for bid increments or <code className="font-mono text-xs">step={0.01}</code> for cents).
        </p>
      </section>

      {/* 18. Increment and Decrement */}
      <section id="increment-and-decrement" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Optional Stepper Buttons
        </h2>
        <p className="text-sm text-muted-foreground">
          Steppers are disabled by default for clean monetary entry (<code className="font-mono text-xs">stepperPlacement="none"</code>), but can be enabled on the right or split:
        </p>
        <WithSteppersDemo />
      </section>

      {/* 19. Currency Selection */}
      <section id="currency-selection" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Currency Selection & Conversion
        </h2>
        {/* Section 113 Callout */}
        <Callout type="warning">
          <strong>Changing the currency identifier changes formatting context only.</strong> Currency Field must not silently perform exchange-rate conversion. If the surrounding application switches from USD to EUR, the value $1,500 becomes €1,500, preserving application authority over conversion logic.
        </Callout>
        <CurrencyChangeDemo />
      </section>

      {/* 20. Validation */}
      <section id="validation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Validation & Errors
        </h2>
        <p className="text-sm text-muted-foreground">
          Destructive optical border and tone render clearly when marked invalid:
        </p>
        <InvalidCurrencyFieldDemo />
      </section>

      {/* 21. Disabled */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Disabled State
        </h2>
        <p className="text-sm text-muted-foreground">
          Preserves formatted currency display while completely blocking editing:
        </p>
        <DisabledCurrencyFieldDemo />
      </section>

      {/* 22. Read-only */}
      <section id="read-only" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Read-Only State
        </h2>
        <p className="text-sm text-muted-foreground">
          Retains text selection and clipboard copying while disabling user mutation.
        </p>
      </section>

      {/* 23. States */}
      <section id="states" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          States Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Empty (null)</span>
            <span className="text-[11px] text-muted-foreground">Unforced empty placeholder state.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Zero ($0.00)</span>
            <span className="text-[11px] text-muted-foreground">Distinct from empty value.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Active Focus</span>
            <span className="text-[11px] text-muted-foreground">Double-contrast Halo Focus Ring.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Invalid + Focus</span>
            <span className="text-[11px] text-muted-foreground">Destructive indicator coexists with focus.</span>
          </div>
        </div>
      </section>

      {/* 24. Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Composition & Sizing
        </h2>
        <p className="text-sm text-muted-foreground">
          Supports <code className="font-mono text-xs">size="sm"</code> (32px), <code className="font-mono text-xs">size="default"</code> (40px), and <code className="font-mono text-xs">size="lg"</code> (48px) matching the standard Forms & Fields sizing scale.
        </p>
      </section>

      {/* 25. Keyboard Behavior */}
      <section id="keyboard-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-foreground">
              <tr>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">↑ / ↓ (Arrows)</td>
                <td className="px-4 py-2.5">Steps the monetary value up or down.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Shift + ↑ / ↓</td>
                <td className="px-4 py-2.5">Large monetary step (10x multiplier).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Home / End</td>
                <td className="px-4 py-2.5">Jumps to bounds if configured.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Standard text keys</td>
                <td className="px-4 py-2.5">Caret movement, selection, and deletion without caret jumps.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 26. Props */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Props
        </h2>
        <PropsTable rows={CURRENCY_FIELD_PROPS} />
      </section>

      {/* 27. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={CURRENCY_FIELD_ANATOMY} />
      </section>

      {/* 28. Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 leading-relaxed">
          <li><strong>Accessible Currency Semantics:</strong> Announces numeric amount and monetary unit to assistive technology.</li>
          <li><strong>Wheel Scrub Disabled:</strong> Prevents page scroll events from accidentally mutating monetary values.</li>
          <li><strong>Focus Visibility:</strong> Clear double-contrast ring on the input boundary.</li>
        </ul>
      </section>

      {/* 29. Mobile Behavior */}
      <section id="mobile-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Mobile Behavior & Keypads
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Evokes decimal keypad on mobile devices while adapting to locale separators.
        </p>
      </section>

      {/* 30. Responsive Behavior */}
      <section id="responsive-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Responsive Layout
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Long formatted amounts (such as multi-million currency values) resize smoothly without causing horizontal page clipping.
        </p>
      </section>

      {/* 31. Performance */}
      <section id="performance" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="font-mono text-xs">Intl.NumberFormat</code> instances are automatically cached, avoiding expensive object creation during typing.
        </p>
      </section>

      {/* 32. Currency Field vs Number Field */}
      <section id="currency-field-vs-number-field" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Currency Field vs Number Field
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-foreground">
              <tr>
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3">Currency Field</th>
                <th className="px-4 py-3">Number Field</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Presentation</td>
                <td className="px-4 py-2.5">Locale-aware monetary format (<code className="font-mono text-xs">$1,234.50</code>)</td>
                <td className="px-4 py-2.5">Generic numeric digits (<code className="font-mono text-xs">1234.5</code>)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Default Steppers</td>
                <td className="px-4 py-2.5">None (<code className="font-mono text-xs">stepperPlacement="none"</code>)</td>
                <td className="px-4 py-2.5">Right cluster (<code className="font-mono text-xs">stepperPlacement="right"</code>)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Currency Context</td>
                <td className="px-4 py-2.5">ISO 4217 currency code & symbols</td>
                <td className="px-4 py-2.5">None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 33. Currency Field vs Input Group */}
      <section id="currency-field-vs-input-group" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Currency Field vs Input Group
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          While <code className="font-mono text-xs">InputGroup</code> can visually position a static "$" prefix beside a plain text input, <code className="font-mono text-xs">CurrencyField</code> provides complete locale-aware thousand separators, decimal precision, BCP 47 compliance, and caret preservation.
        </p>
      </section>

      {/* 34. Financial Precision */}
      <section id="financial-precision" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Financial Precision Boundary
        </h2>
        {/* Section 114 Callout */}
        <Callout type="important">
          <strong>JavaScript numeric values are not a universal accounting representation.</strong> Applications requiring authoritative monetary arithmetic should use an appropriate minor-unit (integer cents) or decimal strategy outside the presentation component. Currency Field serves input and presentation, not accounting ledger arithmetic.
        </Callout>
      </section>

      {/* 35. Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={CURRENCY_FIELD_DEPENDENCIES} />
      </section>

      {/* 36. Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={CURRENCY_FIELD_FILES} />
      </section>

      {/* 37. Related Components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/components/number-field"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Number Field</span>
            <span className="text-xs text-muted-foreground">General-purpose numeric input with steppers and bounds.</span>
          </a>
          <a
            href="/components/field"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Field</span>
            <span className="text-xs text-muted-foreground">Accessible wrapper providing coordinated labels and error states.</span>
          </a>
        </div>
      </section>

      {/* 38. Changelog */}
      <section id="changelog" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Changelog
        </h2>
        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-foreground">v1.0.0</span>
            <span className="text-xs text-muted-foreground">• September 25, 2026</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Initial release of Currency Field with locale-aware monetary presentation, ISO 4217 currency support, decimal fraction handling, and caret stability.
          </p>
        </div>
      </section>
    </div>
  );
}
