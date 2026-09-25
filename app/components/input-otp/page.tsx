import * as React from "react";
import type { Metadata } from "next";
import { InputOTPPreviewStage } from "./input-otp-preview-stage";
import {
  PrimaryInputOTPDemo,
  GroupedInputOTPDemo,
  ContinuousPinDemo,
  ControlledInputOTPDemo,
  InvalidInputOTPDemo,
  DisabledInputOTPDemo,
  SlotSizesDemo,
} from "./input-otp-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Input OTP — Forms & Fields — HaloUI",
  description:
    "A segmented one-time-code input optimized for short verification codes, paste, mobile keyboards, and platform OTP autofill.",
};

const INPUT_OTP_PROPS: PropRow[] = [
  {
    name: "maxLength",
    type: "number",
    default: "undefined",
    required: true,
    description: "The total number of code characters / slots expected in the input (e.g. 4, 6, 8).",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "The controlled single-string value of the entire code.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked whenever the user types, pastes, or edits the code.",
  },
  {
    name: "onComplete",
    type: "(value: string) => void",
    default: "undefined",
    required: false,
    description: "Optional callback invoked when the user enters the final character.",
  },
  {
    name: "pattern",
    type: "string",
    default: '"^[0-9]+$"',
    required: false,
    description: "Regex pattern string defining allowable characters.",
  },
  {
    name: "inputMode",
    type: '"numeric" | "text" | "tel"',
    default: '"numeric"',
    required: false,
    description: "Virtual keyboard hint for mobile devices.",
  },
  {
    name: "autoComplete",
    type: "string",
    default: '"one-time-code"',
    required: false,
    description: "Browser and platform autofill attribute for SMS/email one-time verification codes.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Highlights all slots in a destructive error treatment with coordinated focus ring.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents editing and dims slots while preserving code readability.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Sizing variant for individual optical slot boxes.",
  },
];

const INPUT_OTP_ANATOMY: AnatomyPart[] = [
  {
    name: "InputOTP (Root)",
    description: "The single logical input engine managing DOM focus, clipboard paste, IME, and keyboard entry.",
  },
  {
    name: "InputOTPGroup",
    description: "A semantic container grouping contiguous slots into visual segments.",
  },
  {
    name: "InputOTPSlot",
    description: "The physical optical glass cell rendering an individual character, empty state, or active insertion caret.",
  },
  {
    name: "InputOTPSeparator",
    description: "A decorative visual divider (hyphen/dash) hidden from assistive technology via aria-hidden.",
  },
  {
    name: "Fake Caret",
    description: "A pulsating vertical cursor showing the active entry position without creating independent inputs.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast accessibility boundary highlighting the active slot while preserving group coherence.",
  },
];

const INPUT_OTP_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "input-otp.tsx",
            type: "file",
            description: "Segmented OTP input with optical liquid glass slots and single-logical-input semantics.",
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
        description: "Shared optical tokens, focus rings, and caret blink animation.",
      },
    ],
  },
];

const INPUT_OTP_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "External Runtime Dependencies",
    name: "External Runtime Dependencies",
    items: [
      "input-otp",
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

export default function InputOTPDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            Forms & Fields 19
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            registry: input-otp
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Input OTP
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          A segmented one-time-code input optimized for short verification codes, paste, mobile keyboards, and platform OTP autofill.
        </p>
      </div>

      {/* Section 121 Single Input Callout */}
      <Callout type="note">
        <strong>The segmented slots represent one logical value.</strong> Preserve paste, deletion, autofill, keyboard editing, and assistive-technology behavior rather than treating each visual slot as an unrelated form field.
      </Callout>

      {/* 1. Preview */}
      <section id="preview" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interactive Preview
        </h2>
        <InputOTPPreviewStage />
      </section>

      {/* 2. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install the component directly into your project via the HaloUI shadcn registry CLI:
        </p>
        <InstallCommand registry="input-otp" />
      </section>

      {/* 3. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export function VerificationExample() {
  return (
    <InputOTP maxLength={6}>
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
          Compose with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">Field</code>,{" "}
          <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">FieldLabel</code>, and{" "}
          <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">FieldDescription</code> for accessible names, descriptions, and error associations.
        </p>
        <PrimaryInputOTPDemo />
      </section>

      {/* 5. Controlled */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Controlled Value
        </h2>
        <p className="text-sm text-muted-foreground">
          Pass <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">value</code> and{" "}
          <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">onChange</code> to authoritatively control the OTP string from your component state.
        </p>
        <ControlledInputOTPDemo />
      </section>

      {/* 6. Uncontrolled */}
      <section id="uncontrolled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Uncontrolled
        </h2>
        <p className="text-sm text-muted-foreground">
          For uncontrolled form usage, supply <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">defaultValue</code>:
        </p>
        <CodeBlock
          code={`<InputOTP maxLength={6} defaultValue="381942">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
          language="tsx"
        />
      </section>

      {/* 7. Length */}
      <section id="length" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Explicit Code Length
        </h2>
        <p className="text-sm text-muted-foreground">
          The <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">maxLength</code> prop defines the exact number of characters accepted. Standard lengths are 4 (PIN codes), 6 (SMS/Authenticator 2FA), and 8 (Recovery codes).
        </p>
        <ContinuousPinDemo />
      </section>

      {/* 8. Numeric Codes */}
      <section id="numeric-codes" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Numeric Codes
        </h2>
        <p className="text-sm text-muted-foreground">
          By default, <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">inputMode="numeric"</code> is applied to automatically evoke the numeric keypad on iOS and Android virtual keyboards without blocking standard keyboard entry.
        </p>
      </section>

      {/* 9. Alphanumeric Codes */}
      <section id="alphanumeric-codes" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Alphanumeric Codes
        </h2>
        <p className="text-sm text-muted-foreground">
          For alphanumeric verification or recovery codes, supply custom pattern constraints via the underlying primitive:
        </p>
        <CodeBlock
          code={`import { REGEXP_ONLY_CHARS_AND_DIGITS } from "input-otp";

<InputOTP maxLength={8} pattern={REGEXP_ONLY_CHARS_AND_DIGITS} inputMode="text">
  {/* slots */}
</InputOTP>`}
          language="tsx"
        />
      </section>

      {/* 10. Groups and Separators */}
      <section id="groups-and-separators" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Groups and Separators
        </h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">&lt;InputOTPSeparator /&gt;</code> to visually segment codes into chunked groups. Separators are strictly presentation and are never included in the captured OTP value.
        </p>
        <GroupedInputOTPDemo />
      </section>

      {/* 11. Paste */}
      <section id="paste" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Clipboard Paste Interaction
        </h2>
        <p className="text-sm text-muted-foreground">
          Pasting is a first-class operation. Because HaloUI uses a single logical input under the hood:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li><strong>Full Paste:</strong> Pasting a full code (e.g. "381942") populates all slots in a single user action.</li>
          <li><strong>Partial Paste:</strong> Pasting fewer characters fills from the current active slot forward.</li>
          <li><strong>Overlength Paste:</strong> Clipboard content exceeding <code className="font-mono text-xs">maxLength</code> is truncated cleanly to the designated slot boundary.</li>
        </ul>
      </section>

      {/* 12. Autofill */}
      <section id="autofill" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Platform OTP Autofill
        </h2>
        {/* Section 122 Autofill Callout */}
        <Callout type="tip">
          <strong>Use appropriate platform hints such as <code>autocomplete="one-time-code"</code> when supported.</strong> These hints improve compatibility with mobile SMS autofill and password managers, but do not guarantee automatic code retrieval on every browser or device.
        </Callout>
      </section>

      {/* 13. Completion */}
      <section id="completion" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Completion Callback
        </h2>
        {/* Section 123 Auto-Submit Callout */}
        <Callout type="warning">
          <strong>Completing the final slot should not automatically verify or submit the code</strong> unless the consuming application deliberately chooses that behavior. Accidental automatic submissions create jarring error loops when users make typos on the final digit.
        </Callout>
        <CodeBlock
          code={`<InputOTP
  maxLength={6}
  onComplete={(code) => {
    // Consumer application decides when to verify or enable submission
    console.log("Ready to verify:", code);
  }}
>
  {/* slots */}
</InputOTP>`}
          language="tsx"
        />
      </section>

      {/* 14. Validation */}
      <section id="validation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Validation & Error States
        </h2>
        <p className="text-sm text-muted-foreground">
          When marked invalid, each slot displays a destructive optical border and inner tone, while preserving the active focused ring independently.
        </p>
        <InvalidInputOTPDemo />
      </section>

      {/* 15. Disabled */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Disabled State
        </h2>
        <p className="text-sm text-muted-foreground">
          Disabled Input OTP locks all keyboard input and removes interactive focus while preserving readable code contrast.
        </p>
        <DisabledInputOTPDemo />
      </section>

      {/* 16. States */}
      <section id="states" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interaction States Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Empty</span>
            <span className="text-[11px] text-muted-foreground">Subtle optical slot channel with clear boundaries.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Active / Focused</span>
            <span className="text-[11px] text-muted-foreground">Double-contrast Halo Focus Ring and blinking caret.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Filled</span>
            <span className="text-[11px] text-muted-foreground">Centered monospace character without toggle styling.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Invalid + Focus</span>
            <span className="text-[11px] text-muted-foreground">Destructive error indicator with distinct active ring.</span>
          </div>
        </div>
      </section>

      {/* 17. Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Slot Dimensions & Sizing
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose from three slot sizes to fit dense dialogs, mobile screens, or prominent security gates:
        </p>
        <SlotSizesDemo />
      </section>

      {/* 18. Keyboard Behavior */}
      <section id="keyboard-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keyboard Navigation Model
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
                <td className="px-4 py-2.5">Focuses the single logical OTP input (exactly one Tab stop).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Shift + Tab</td>
                <td className="px-4 py-2.5">Leaves the OTP input predictably in reverse DOM order.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Character Keys</td>
                <td className="px-4 py-2.5">Enters character at active slot and advances caret forward.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Backspace</td>
                <td className="px-4 py-2.5">Deletes preceding character and moves caret back one slot.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">← / → Arrow Keys</td>
                <td className="px-4 py-2.5">Moves insertion cursor between slot positions without losing focus.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 19. Props */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Component Props
        </h2>
        <PropsTable rows={INPUT_OTP_PROPS} />
      </section>

      {/* 20. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Component Anatomy
        </h2>
        <Anatomy parts={INPUT_OTP_ANATOMY} />
      </section>

      {/* 21. Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 leading-relaxed">
          <li><strong>Single Logical Tab Stop:</strong> Assistive technology navigates the component as a single coherent text field, preventing the confusion of 6 separate tab stops.</li>
          <li><strong>Accessible Label Association:</strong> Connects to parent <code className="font-mono text-xs">FieldLabel</code> and <code className="font-mono text-xs">FieldDescription</code> via <code className="font-mono text-xs">aria-describedby</code>.</li>
          <li><strong>Aria-Invalid:</strong> Exposes <code className="font-mono text-xs">aria-invalid="true"</code> when validation fails, announcing the error state to screen readers.</li>
          <li><strong>Hidden Decorative Separators:</strong> Visual dividers carry <code className="font-mono text-xs">aria-hidden="true"</code> to avoid announcing extraneous symbols.</li>
        </ul>
      </section>

      {/* 22. Mobile Behavior */}
      <section id="mobile-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Mobile Behavior & Keyboards
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Mobile operating systems (iOS and Android) support automatic SMS verification code suggestions above the keyboard when <code className="font-mono text-xs">autoComplete="one-time-code"</code> is set. Furthermore, tapping anywhere within the OTP group focuses the active slot comfortably without demanding microscopic precision.
        </p>
      </section>

      {/* 23. Responsive Behavior */}
      <section id="responsive-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Responsive Layout & Phone Viewports
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Slots automatically scale down on compact phone viewports (<code className="font-mono text-xs">size-9 sm:size-10.5</code> with <code className="font-mono text-xs">gap-1.5 sm:gap-2</code>), ensuring that 6-digit and 8-digit codes never create horizontal window scrolling even on narrow 320px screens.
        </p>
      </section>

      {/* 24. Motion */}
      <section id="motion" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Motion & Reduced Motion
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Transitions on slot borders and focus rings use rapid micro-durations (120ms). The fake caret blinking animation is instantly paused when the user enables <code className="font-mono text-xs">prefers-reduced-motion: reduce</code>.
        </p>
      </section>

      {/* 25. Performance */}
      <section id="performance" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Input OTP does not use mutation observers, per-slot event listeners, or interval timers. All visual slots derive from the underlying input’s synchronous React state.
        </p>
      </section>

      {/* 26. Security Boundaries */}
      <section id="security-boundaries" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Security Boundaries
        </h2>
        {/* Section 120 OTP Responsibility Callout */}
        <Callout type="important">
          <strong>Input OTP captures a one-time code; it does not verify it.</strong> Code delivery, expiration, resend countdowns, retry limits, server verification, authentication, and navigation remain application responsibilities.
        </Callout>
      </section>

      {/* 27. Input OTP vs Password Input */}
      <section id="input-otp-vs-password-input" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Input OTP vs Password Input
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-foreground">
              <tr>
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3">Input OTP</th>
                <th className="px-4 py-3">Password Input</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Value Purpose</td>
                <td className="px-4 py-2.5">Short ephemeral verification code (4–8 digits)</td>
                <td className="px-4 py-2.5">Persistent user credential</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Masking</td>
                <td className="px-4 py-2.5">Visible characters by default for easy typo correction</td>
                <td className="px-4 py-2.5">Masked bullets with optional reveal toggle</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Visual Layout</td>
                <td className="px-4 py-2.5">Segmented optical slot boxes</td>
                <td className="px-4 py-2.5">Continuous single-line text channel</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-foreground">Autofill</td>
                <td className="px-4 py-2.5"><code>autocomplete="one-time-code"</code></td>
                <td className="px-4 py-2.5"><code>autocomplete="current-password"</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 28. Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={INPUT_OTP_DEPENDENCIES} />
      </section>

      {/* 29. Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={INPUT_OTP_FILES} />
      </section>

      {/* 30. Related Components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/components/input"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Input</span>
            <span className="text-xs text-muted-foreground">Standard single-line text input for names, emails, and queries.</span>
          </a>
          <a
            href="/components/field"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Field</span>
            <span className="text-xs text-muted-foreground">Accessible wrapper providing coordinated labels, descriptions, and error messages.</span>
          </a>
        </div>
      </section>

      {/* 31. Changelog */}
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
            Initial production release of Input OTP with optical liquid glass slots, single-logical-input architecture, clipboard paste handling, mobile SMS autofill compatibility, and full WCAG 2.1 AA accessibility.
          </p>
        </div>
      </section>
    </div>
  );
}
