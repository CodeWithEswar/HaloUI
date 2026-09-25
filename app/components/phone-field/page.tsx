import * as React from "react";
import type { Metadata } from "next";
import { PhoneFieldPreviewStage } from "./phone-field-preview-stage";
import {
  PrimaryPhoneFieldDemo,
  InternationalContextDemo,
  CountryChangeDemo,
  PastedInternationalDemo,
  InvalidPhoneFieldDemo,
  DisabledPhoneFieldDemo,
} from "./phone-field-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Phone Field — Forms & Fields — HaloUI",
  description:
    "A structured phone-number input for entering international telephone numbers with country context, formatting, and accessible validation support.",
};

const PHONE_FIELD_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "The controlled phone string value (E.164, national formatted, or raw digits).",
  },
  {
    name: "defaultValue",
    type: "string",
    default: '""',
    required: false,
    description: "Initial phone number string when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(value: string, details: PhoneValueDetails) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked on input, delivering the formatted string and parsed metadata (e164, isValid, country).",
  },
  {
    name: "defaultCountry",
    type: "CountryCode",
    default: '"US"',
    required: false,
    description: "ISO 3166-1 alpha-2 default country code context for national number parsing.",
  },
  {
    name: "country",
    type: "CountryCode",
    default: "undefined",
    required: false,
    description: "Controlled active country context.",
  },
  {
    name: "onCountryChange",
    type: "(country: CountryCode) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when the active country is changed.",
  },
  {
    name: "countries",
    type: "CountryCode[]",
    default: "all supported countries",
    required: false,
    description: "Optional custom list of allowed ISO country codes.",
  },
  {
    name: "disableCountrySelect",
    type: "boolean",
    default: "false",
    required: false,
    description: "Hides and disables the interactive country selector.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Height variant matching standard form inputs (32px, 40px, 48px).",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies destructive error styling with coordinated focus ring.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Locks interaction for both country selection and telephone input.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents editing while keeping text selectable and copyable.",
  },
];

const PHONE_FIELD_ANATOMY: AnatomyPart[] = [
  {
    name: "PhoneField (Root)",
    description: "The outer liquid glass container enclosing the country selector and telephone input.",
  },
  {
    name: "Country Selector",
    description: "An accessible trigger displaying flag emoji and calling code, backed by an accessible native select.",
  },
  {
    name: "Divider",
    description: "Subtle optical vertical divider separating country context from telephone input.",
  },
  {
    name: "Telephone Input",
    description: "The core input element with type='tel' and inputMode='tel' for accessible mobile keypads.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast accessibility perimeter around the focused control.",
  },
];

const PHONE_FIELD_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "phone-field.tsx",
            type: "file",
            description: "PhoneField primitive with libphonenumber-js, As-You-Type formatting, and country selector.",
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

const PHONE_FIELD_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "External Package Dependencies",
    name: "External Package Dependencies",
    items: [
      "libphonenumber-js",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "HaloUI Registry Dependencies",
    name: "HaloUI Registry Dependencies",
    items: ["field", "halo-icon"],
  },
];

export default function PhoneFieldDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            Forms & Fields 22
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            registry: phone-field
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Phone Field
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          A structured phone-number input for entering international telephone numbers with country context, formatting, and accessible validation support.
        </p>
      </div>

      {/* Section 55 Callout */}
      <Callout type="warning">
        <strong>Phone Field structures telephone-number entry; it does not verify ownership.</strong> Parsing or formatting a number does not prove that the number exists, can receive messages, or belongs to the current user. Verification remains a separate application/backend workflow.
      </Callout>

      {/* 1. Preview */}
      <section id="preview" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interactive Preview
        </h2>
        <PhoneFieldPreviewStage />
      </section>

      {/* 2. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Phone Field via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="phone-field" />
      </section>

      {/* 3. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { PhoneField } from "@/components/ui/phone-field";

export function ContactNumberExample() {
  const [phone, setPhone] = React.useState<string>("");

  return (
    <PhoneField
      defaultCountry="US"
      value={phone}
      onValueChange={(val, details) => {
        setPhone(val);
        console.log("E.164:", details.e164);
        console.log("Valid:", details.isValid);
      }}
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
          Compose with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">Field</code> for accessible label, description, and error messaging:
        </p>
        <PrimaryPhoneFieldDemo />
      </section>

      {/* 5. Controlled */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Controlled Model
        </h2>
        <p className="text-sm text-muted-foreground">
          Bind <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">value</code> and <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">onValueChange</code> to maintain state in the parent form. The callback passes the human-readable display string as the first argument, and full parsed metadata as the second.
        </p>
      </section>

      {/* 6. Uncontrolled */}
      <section id="uncontrolled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Uncontrolled
        </h2>
        <p className="text-sm text-muted-foreground">
          Supply <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">defaultValue</code> for self-contained form components:
        </p>
        <CodeBlock
          code={`<PhoneField defaultCountry="US" defaultValue="(415) 555-2671" />`}
          language="tsx"
        />
      </section>

      {/* 7. Default Country */}
      <section id="default-country" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Default Country Context
        </h2>
        {/* Section 56 Callout */}
        <Callout type="note">
          <strong>Country context controls parsing and presentation.</strong> It should not be interpreted as the user's physical location, nationality, or identity. Phone Field never makes silent IP geolocation requests.
        </Callout>
      </section>

      {/* 8. International Numbers */}
      <section id="international-numbers" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          International Numbers
        </h2>
        <p className="text-sm text-muted-foreground">
          Numbers beginning with a plus sign (<code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">+</code>) are automatically parsed according to international dialing plans. The country selector automatically synchronizes when a recognized international prefix is detected.
        </p>
        <InternationalContextDemo />
      </section>

      {/* 9. National Numbers */}
      <section id="national-numbers" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          National Numbers
        </h2>
        <p className="text-sm text-muted-foreground">
          When the user enters digits without a leading plus sign, digits are formatted according to the active country's national numbering conventions (such as US area-code parentheses).
        </p>
      </section>

      {/* 10. Country Selection */}
      <section id="country-selection" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Country Selection & Value Preservation
        </h2>
        <p className="text-sm text-muted-foreground">
          Changing country context preserves entered digits without silent number corruption:
        </p>
        <CountryChangeDemo />
      </section>

      {/* 11. Calling Codes */}
      <section id="calling-codes" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Calling Codes & Shared Plans
        </h2>
        <p className="text-sm text-muted-foreground">
          Multiple territories can share dialing prefixes (such as the North American Numbering Plan: US, CA, PR, GU sharing <code className="font-mono text-xs">+1</code>). Metadata is derived strictly from <code className="font-mono text-xs">libphonenumber-js</code> rather than naive prefix string splits.
        </p>
      </section>

      {/* 12. Formatting */}
      <section id="formatting" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          As-You-Type Formatting
        </h2>
        <p className="text-sm text-muted-foreground">
          Input characters are processed progressively through the <code className="font-mono text-xs">AsYouType</code> engine without jarring cursor hops or premature formatting rejections.
        </p>
      </section>

      {/* 13. Normalized Value */}
      <section id="normalized-value" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Normalized E.164 Representation
        </h2>
        {/* Section 57 Callout */}
        <Callout type="tip">
          <strong>Keep the normalized phone value separate from its human-readable presentation.</strong> While users see localized formats like <code className="font-mono text-xs">(415) 555-2671</code>, backend databases should store the canonical E.164 string <code className="font-mono text-xs">+14155552671</code> provided in <code className="font-mono text-xs">details.e164</code>.
        </Callout>
      </section>

      {/* 14. Paste */}
      <section id="paste" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Paste Support
        </h2>
        <p className="text-sm text-muted-foreground">
          Pasting international numbers with formatting characters, spaces, and hyphens is handled seamlessly:
        </p>
        <PastedInternationalDemo />
      </section>

      {/* 15. Validation */}
      <section id="validation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Validation Levels
        </h2>
        <p className="text-sm text-muted-foreground">
          HaloUI distinguishes three levels of telephone validation:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li><strong>Incomplete:</strong> Number is currently being entered.</li>
          <li><strong>Possible Length:</strong> Digit count matches possible national range.</li>
          <li><strong>Valid (Numbering Plan):</strong> Matches official ITU/national numbering plan rules.</li>
        </ul>
        <InvalidPhoneFieldDemo />
      </section>

      {/* 16. Disabled */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Disabled State
        </h2>
        <p className="text-sm text-muted-foreground">
          Locks both country selector and telephone input consistently:
        </p>
        <DisabledPhoneFieldDemo />
      </section>

      {/* 17. Read-only */}
      <section id="read-only" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Read-Only State
        </h2>
        <p className="text-sm text-muted-foreground">
          Locks country selection and editing while allowing text selection and clipboard copying.
        </p>
      </section>

      {/* 18. States */}
      <section id="states" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          States Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Empty</span>
            <span className="text-[11px] text-muted-foreground">Empty string without forced prefixes.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Country Focus</span>
            <span className="text-[11px] text-muted-foreground">Independent focus ring on country trigger.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Input Focus</span>
            <span className="text-[11px] text-muted-foreground">Double-contrast ring on container.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Invalid + Focus</span>
            <span className="text-[11px] text-muted-foreground">Destructive border coexists with ring.</span>
          </div>
        </div>
      </section>

      {/* 19. Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Composition & Sizing
        </h2>
        <p className="text-sm text-muted-foreground">
          Available in <code className="font-mono text-xs">size="sm"</code> (32px), <code className="font-mono text-xs">size="default"</code> (40px), and <code className="font-mono text-xs">size="lg"</code> (48px) matching the standard Forms & Fields sizing scale.
        </p>
      </section>

      {/* 20. Keyboard Behavior */}
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
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Tab</td>
                <td className="px-4 py-2.5">Moves from country selector to telephone input.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Space / Enter</td>
                <td className="px-4 py-2.5">When focused on country trigger, opens the native OS country picker.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Type letters</td>
                <td className="px-4 py-2.5">In country picker, jumps directly to country by name.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Backspace</td>
                <td className="px-4 py-2.5">Deletes characters naturally without caret jumps.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 21. Props */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Props
        </h2>
        <PropsTable rows={PHONE_FIELD_PROPS} />
      </section>

      {/* 22. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={PHONE_FIELD_ANATOMY} />
      </section>

      {/* 23. Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 leading-relaxed">
          <li><strong>Persistent Accessible Name:</strong> The country selector carries explicit <code className="font-mono text-xs">aria-label</code> detailing the current country and calling code.</li>
          <li><strong>Textual Country Names:</strong> Country options are readable full text, never emoji flags alone.</li>
          <li><strong>Independent Focus Visibility:</strong> Country trigger and telephone input have distinct, non-overlapping focus rings.</li>
        </ul>
      </section>

      {/* 24. Mobile Behavior */}
      <section id="mobile-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Mobile Behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Uses <code className="font-mono text-xs">type="tel"</code> and <code className="font-mono text-xs">inputMode="tel"</code> to evoke the native telephone keypad on iOS and Android devices, while preserving <code className="font-mono text-xs">autoComplete="tel-national"</code>.
        </p>
      </section>

      {/* 25. Responsive Behavior */}
      <section id="responsive-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Responsive Layout
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The compact country trigger consumes minimal horizontal space, ensuring sufficient editable width on narrow 320px phone viewports without horizontal clipping.
        </p>
      </section>

      {/* 26. RTL */}
      <section id="rtl" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          RTL & Bidi Direction
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Phone numbers remain standard LTR digits even within RTL documents to preserve ITU international dialing standards.
        </p>
      </section>

      {/* 27. Motion */}
      <section id="motion" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Motion & Transitions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Restrained 150ms border and focus transitions. Zero decorative flag bounces or number morphing.
        </p>
      </section>

      {/* 28. Performance */}
      <section id="performance" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Country lists and <code className="font-mono text-xs">Intl.DisplayNames</code> instances are memoized to avoid recalculations during typing.
        </p>
      </section>

      {/* 29. Phone Field vs Input */}
      <section id="phone-field-vs-input" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Phone Field vs Input
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use standard <code className="font-mono text-xs">Input</code> when entering arbitrary phone-like text without validation. Use <code className="font-mono text-xs">PhoneField</code> when your application requires country context, national format masking, E.164 normalization, and numbering-plan validation.
        </p>
      </section>

      {/* 30. Phone Field vs Input OTP */}
      <section id="phone-field-vs-input-otp" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Phone Field vs Input OTP
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Phone Field captures the telephone number. Input OTP captures the subsequent 6-digit SMS verification code. While often used sequentially in verification flows, they are independent primitives.
        </p>
      </section>

      {/* 31. Verification Boundaries */}
      <section id="verification-boundaries" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Verification Boundaries
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Phone Field can determine whether a string conforms to ITU numbering plans; it cannot determine whether an SMS can be delivered, whether carrier networks route to it, or who currently possesses the SIM card.
        </p>
      </section>

      {/* 32. Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={PHONE_FIELD_DEPENDENCIES} />
      </section>

      {/* 33. Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={PHONE_FIELD_FILES} />
      </section>

      {/* 34. Related Components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/components/input-otp"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Input OTP</span>
            <span className="text-xs text-muted-foreground">One-time code verification slot primitive.</span>
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

      {/* 35. Changelog */}
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
            Initial release of Phone Field with libphonenumber-js, accessible country selector, E.164 normalization, and As-You-Type formatting.
          </p>
        </div>
      </section>
    </div>
  );
}
