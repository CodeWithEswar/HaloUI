import * as React from "react";
import type { Metadata } from "next";
import { URLFieldPreviewStage } from "./url-field-preview-stage";
import {
  PrimaryURLFieldDemo,
  ComplexURLDemo,
  LongURLDemo,
  NormalizedOnBlurDemo,
  InvalidURLDemo,
  ReadOnlyURLDemo,
} from "./url-field-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "URL Field — Forms & Fields — HaloUI",
  description:
    "A URL-oriented text-entry control with browser-friendly input semantics, optional normalization, and clear validation affordances.",
};

const URL_FIELD_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "The controlled URL string value.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: '""',
    required: false,
    description: "Initial URL string when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(value: string, details: URLValueDetails) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked on input change, delivering the string and syntactic metadata.",
  },
  {
    name: "normalizeOnBlur",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to normalize URL on blur (trimming whitespace and prepending https:// if protocol is omitted).",
  },
  {
    name: "allowedProtocols",
    type: "string[]",
    default: '["https:", "http:"]',
    required: false,
    description: "Allowed URL protocols for syntactic validation.",
  },
  {
    name: "showIcon",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to display the decorative leading link/globe icon.",
  },
  {
    name: "icon",
    type: '"link" | "globe"',
    default: '"link"',
    required: false,
    description: "Choice of leading decorative icon.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Assembly height variant matching the standard Forms & Fields sizing scale.",
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
    description: "Locks the input against editing or focus.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents editing while keeping the URL selectable and copyable.",
  },
];

const URL_FIELD_ANATOMY: AnatomyPart[] = [
  {
    name: "URLField (Root)",
    description: "The outer liquid glass container with double-contrast focus boundary.",
  },
  {
    name: "Decorative URL Icon",
    description: "Optional non-interactive link or globe icon hidden from screen readers.",
  },
  {
    name: "URL Input",
    description: "Native input with type='url', inputMode='url', and dir='ltr' for reliable editing.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast accessibility perimeter around the focused control.",
  },
];

const URL_FIELD_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "url-field.tsx",
            type: "file",
            description: "URLField primitive with browser-friendly input semantics and optional normalization.",
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

const URL_FIELD_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "External Package Dependencies",
    name: "External Package Dependencies",
    items: [
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

export default function URLFieldDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            Forms & Fields 23
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            registry: url-field
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          URL Field
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          A URL-oriented text-entry control with browser-friendly input semantics, optional normalization, and clear validation affordances.
        </p>
      </div>

      {/* Section 118 Callout */}
      <Callout type="warning">
        <strong>URL Field validates URL-oriented input; it does not check whether a website exists.</strong> Network reachability, DNS resolution, redirects, ownership, uptime, safety scanning, metadata retrieval, and previews remain separate application concerns.
      </Callout>

      {/* 1. Preview */}
      <section id="preview" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interactive Preview
        </h2>
        <URLFieldPreviewStage />
      </section>

      {/* 2. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install URL Field via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="url-field" />
      </section>

      {/* 3. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import { URLField } from "@/components/ui/url-field";

export function WebsiteUrlExample() {
  const [url, setUrl] = React.useState<string>("https://example.com");

  return (
    <URLField
      value={url}
      onValueChange={(val, details) => {
        setUrl(val);
        console.log("Syntactically valid:", details.isSyntacticallyValid);
      }}
      placeholder="https://example.com"
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
        <PrimaryURLFieldDemo />
      </section>

      {/* 5. Controlled */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Controlled Model
        </h2>
        <p className="text-sm text-muted-foreground">
          Bind <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">value</code> and <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">onValueChange</code>. The value is a clean string, avoiding awkward object representations.
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
          code={`<URLField defaultValue="https://example.com" />`}
          language="tsx"
        />
      </section>

      {/* 7. URL Input Semantics */}
      <section id="url-input-semantics" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Native Input Semantics
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Configured with <code className="font-mono text-xs">type="url"</code>, <code className="font-mono text-xs">inputMode="url"</code>, <code className="font-mono text-xs">autoCapitalize="none"</code>, and <code className="font-mono text-xs">spellCheck="false"</code> to optimize virtual mobile keyboards for URL entry while disabling distracting autocorrect squiggles.
        </p>
      </section>

      {/* 8. Protocols */}
      <section id="protocols" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Protocols & Allowed Schemes
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By default, <code className="font-mono text-xs">allowedProtocols</code> accepts <code className="font-mono text-xs">https:</code> and <code className="font-mono text-xs">http:</code>. Potentially dangerous schemes such as <code className="font-mono text-xs">javascript:</code> are treated as syntactically invalid under default web form policies.
        </p>
      </section>

      {/* 9. Parsing */}
      <section id="parsing" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Syntactic URL Parsing
        </h2>
        {/* Section 119 Callout */}
        <Callout type="note">
          <strong>A parseable URL is not automatically a trusted or safe URL.</strong> Syntactic parsing confirms that a string adheres to WHATWG URL structure; application security policy must evaluate domain reputation, private network access, and user authorization.
        </Callout>
      </section>

      {/* 10. Normalization */}
      <section id="normalization" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Predictable Normalization
        </h2>
        {/* Section 120 Callout */}
        <Callout type="tip">
          <strong>Normalization must be explicit and predictable.</strong> URL Field never rewrites partially entered URLs while you type, preventing caret jumps. With <code className="font-mono text-xs">normalizeOnBlur</code>, trimming and scheme completion occur exclusively on blur.
        </Callout>
        <NormalizedOnBlurDemo />
      </section>

      {/* 11. Validation */}
      <section id="validation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Validation Levels
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI distinguishes empty fields, partial in-progress typing, and syntactically malformed URLs:
        </p>
        <InvalidURLDemo />
      </section>

      {/* 12. Query Parameters, 13. Fragments, 14. Ports */}
      <section id="complex-urls" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Ports, Paths, Queries, and Fragments
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Full support for developer URLs containing explicit port numbers (<code className="font-mono text-xs">:8443</code>), query parameters (<code className="font-mono text-xs">?key=val</code>), and hash fragments (<code className="font-mono text-xs">#section</code>):
        </p>
        <ComplexURLDemo />
      </section>

      {/* 15. Paste */}
      <section id="paste" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Paste Support
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Users commonly paste full URLs directly from browser address bars. Pasted text is received intact without destructive premature stripping.
        </p>
      </section>

      {/* 16. Long URLs */}
      <section id="long-urls" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Long Structured URLs
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Deep links can span hundreds of characters. The control maintains strict boundaries, preserving horizontal cursor scrolling without overflowing the layout:
        </p>
        <LongURLDemo />
      </section>

      {/* 17. Disabled */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Disabled State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Locks the input against user interaction and dims the control with reduced opacity.
        </p>
      </section>

      {/* 18. Read-only */}
      <section id="read-only" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Read-Only State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Permits text selection and copying while disallowing keyboard text modification:
        </p>
        <ReadOnlyURLDemo />
      </section>

      {/* 19. States */}
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
            <span className="text-xs font-semibold text-foreground block">Focused</span>
            <span className="text-[11px] text-muted-foreground">Double-contrast Halo Focus Ring.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Invalid</span>
            <span className="text-[11px] text-muted-foreground">Destructive border tone.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Invalid + Focus</span>
            <span className="text-[11px] text-muted-foreground">Coexisting error border and ring.</span>
          </div>
        </div>
      </section>

      {/* 20. Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Composition & Sizing
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Available in <code className="font-mono text-xs">size="sm"</code> (32px), <code className="font-mono text-xs">size="default"</code> (40px), and <code className="font-mono text-xs">size="lg"</code> (48px) matching the standard Forms & Fields scale.
        </p>
      </section>

      {/* 21. Keyboard Behavior */}
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
                <td className="px-4 py-2.5">Focuses the single input element.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Home / End</td>
                <td className="px-4 py-2.5">Jumps cursor to start or end of the URL.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Ctrl / Cmd + A</td>
                <td className="px-4 py-2.5">Selects the entire URL string for copying or replacement.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 22. Props */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Props
        </h2>
        <PropsTable rows={URL_FIELD_PROPS} />
      </section>

      {/* 23. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={URL_FIELD_ANATOMY} />
      </section>

      {/* 24. Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 leading-relaxed">
          <li><strong>Persistent Accessible Name:</strong> The inner input links directly to <code className="font-mono text-xs">FieldLabel</code> via <code className="font-mono text-xs">htmlFor</code> or explicit <code className="font-mono text-xs">aria-label</code>.</li>
          <li><strong>Decorative Icon Isolation:</strong> The leading link/globe icon is hidden from assistive technology via <code className="font-mono text-xs">aria-hidden="true"</code>.</li>
          <li><strong>Dual Indicator Visibility:</strong> Invalid state provides border and ring contrast without relying on color alone.</li>
        </ul>
      </section>

      {/* 25. Mobile Behavior */}
      <section id="mobile-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Mobile Behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Invokes URL-specific mobile keyboards with dedicated <code className="font-mono text-xs">.com</code> and slash keys, while disabling disruptive auto-capitalization.
        </p>
      </section>

      {/* 26. RTL */}
      <section id="rtl" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          RTL & Bidi Direction
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The input explicitly sets <code className="font-mono text-xs">dir="ltr"</code> so that web addresses always display in canonical Left-to-Right orientation even within Right-to-Left interfaces.
        </p>
      </section>

      {/* 27. Responsive Behavior */}
      <section id="responsive-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Responsive Layout
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Adapts smoothly from compact form layouts on desktop down to 320px mobile viewports without horizontal clipping.
        </p>
      </section>

      {/* 28. Motion */}
      <section id="motion" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Motion & Transitions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Restrained 150ms border and focus transitions. Zero decorative bounce or reveal effects.
        </p>
      </section>

      {/* 29. Performance */}
      <section id="performance" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Zero network calls or DNS checks. Syntactic parsing is lightweight and performed on input change.
        </p>
      </section>

      {/* 30. URL Field vs Input */}
      <section id="url-field-vs-input" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          URL Field vs Input
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use standard <code className="font-mono text-xs">Input</code> when arbitrary text is accepted. Use <code className="font-mono text-xs">URLField</code> when your application expects a web resource locator and benefits from URL keyboard hints, optional normalization on blur, and syntactic validation.
        </p>
      </section>

      {/* 31. URL Field vs Search Input */}
      <section id="url-field-vs-search-input" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          URL Field vs Search Input
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Search Input captures search queries; URL Field captures specific web addresses. Do not treat text without spaces as an automatic URL.
        </p>
      </section>

      {/* 32. Security Boundaries */}
      <section id="security-boundaries" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Security Boundaries
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Syntactic validation is not a security sanitizer. Applications must ensure domains belong to allowlists and guard against Server-Side Request Forgery (SSRF) when handling user-submitted URLs.
        </p>
      </section>

      {/* 33. Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={URL_FIELD_DEPENDENCIES} />
      </section>

      {/* 34. Installed Files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={URL_FIELD_FILES} />
      </section>

      {/* 35. Related Components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/components/phone-field"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Phone Field</span>
            <span className="text-xs text-muted-foreground">Structured international telephone number input.</span>
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

      {/* 36. Changelog */}
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
            Initial release of URL Field with browser-friendly input semantics, WHATWG URL parsing, optional normalization on blur, and liquid glass styling.
          </p>
        </div>
      </section>
    </div>
  );
}
