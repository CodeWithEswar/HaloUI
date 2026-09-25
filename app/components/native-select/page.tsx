import * as React from "react";
import type { Metadata } from "next";
import { NativeSelectPreviewStage } from "./native-select-preview-stage";
import {
  PrimaryCountrySelectDemo,
  GroupedOptionsSelectDemo,
  NativeSelectStatesDemo,
  ControlledNativeSelectDemo,
} from "./native-select-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Native Select — Forms & Fields — HaloUI",
  description:
    "A styled native select for simple, reliable choices using the browser and operating system's built-in selection behavior.",
};

const NATIVE_SELECT_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes to append to the native select element.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native disabled attribute. Prevents interaction, popup trigger, and form submission.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native HTML validation constraint for mandatory single-choice selections.",
  },
  {
    name: "aria-invalid",
    type: 'boolean | "true" | "false"',
    default: "undefined",
    required: false,
    description: "Communicates validation failure to assistive technology and activates dual-indicator border tinting.",
  },
  {
    name: "size",
    type: "number",
    default: "undefined",
    required: false,
    description:
      "Native HTML row-count attribute. Preserved per HTML standard; not overloaded for visual sizing.",
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    required: false,
    description: "Native HTML attribute enabling multi-row selection listbox mode.",
  },
  {
    name: "...props",
    type: 'React.ComponentProps<"select">',
    default: "—",
    required: false,
    description: "All standard HTML <select> attributes (value, defaultValue, onChange, name, form, autoFocus, etc.).",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Select Root",
    description: "Relative isolation wrapper (div) that positions the native select and decorative indicator.",
  },
  {
    name: "Native Select",
    description: "Real HTML <select> element with appearance-none and calibrated right inline padding (pr-9).",
  },
  {
    name: "Decorative Chevron",
    description: "Pointer-events-none, aria-hidden Hugeicon (ArrowDown01Icon) aligned at inline-end.",
  },
  {
    name: "Optical Substrate",
    description: "Restrained 10-layer liquid glass surface with subtle backdrop diffusion and inner depth.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast 2px focus outline rendered via focus-visible, distinct from invalid error tinting.",
  },
];

const FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "native-select.tsx",
            type: "file",
            description: "Native select control primitive with optical glass substrate and chevron indicator.",
          },
          {
            name: "field.tsx",
            type: "file",
            description: "Accessible Field, Label, Description, and Error primitives.",
          },
        ],
      },
    ],
  },
];

const DEPENDENCIES_DATA: DependencyGroup[] = [
  {
    title: "Direct Dependencies",
    items: ["@hugeicons/core-free-icons", "@hugeicons/react", "clsx", "tailwind-merge"],
  },
];

export default function NativeSelectDocsPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Forms &amp; Fields</span>
          <span>·</span>
          <span>09</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
          Native Select
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A styled native select for simple, reliable choices using the browser and operating
          system&apos;s built-in selection behavior.
        </p>
      </div>

      {/* Live Interactive Preview Stage */}
      <NativeSelectPreviewStage />

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Installation
        </h2>
        <InstallCommand registry="native-select" />
      </section>

      {/* Callout 1: Core Philosophy */}
      <Callout type="note" title="Native Select intentionally keeps the browser's selection behavior">
        Use Native Select for straightforward choices where reliability, native keyboard interaction,
        and platform mobile picker behavior matter more than custom option rendering.
      </Callout>

      {/* Usage / With Field */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Usage with Field
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The canonical implementation pairs <code className="text-foreground">NativeSelect</code> with{" "}
          <code className="text-foreground">Field</code> and <code className="text-foreground">FieldLabel</code>.
          The disabled empty <code className="text-foreground">&lt;option value=&quot;&quot; disabled&gt;</code>{" "}
          serves as an accessible selection prompt:
        </p>
        <CodeBlock
          code={`import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";

export function RegionSelector() {
  return (
    <Field id="region-field">
      <FieldLabel htmlFor="region-field">Billing region</FieldLabel>
      <NativeSelect id="region-field" defaultValue="" aria-describedby="region-desc">
        <option value="" disabled>
          Select a country or territory
        </option>
        <option value="in">India</option>
        <option value="jp">Japan</option>
        <option value="de">Germany</option>
        <option value="br">Brazil</option>
        <option value="us">United States</option>
      </NativeSelect>
      <FieldDescription id="region-desc">
        Used for regional tax calculations and compliance invoicing.
      </FieldDescription>
    </Field>
  );
}`}
          language="tsx"
          filename="region-selector.tsx"
        />
        <PrimaryCountrySelectDemo />
      </section>

      {/* Grouped Options */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Option Groups (&lt;optgroup&gt;)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Native <code className="text-foreground">&lt;optgroup&gt;</code> elements structure complex lists into
          semantic categories. Desktop browsers render bold section headers, and mobile pickers group items into
          wheel segments without extra JavaScript:
        </p>
        <CodeBlock
          code={`<NativeSelect defaultValue="eu-central-1">
  <optgroup label="Asia Pacific">
    <option value="ap-south-1">Mumbai (ap-south-1)</option>
    <option value="ap-northeast-1">Tokyo (ap-northeast-1)</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="eu-central-1">Frankfurt (eu-central-1)</option>
    <option value="eu-west-1">Ireland (eu-west-1)</option>
  </optgroup>
</NativeSelect>`}
          language="tsx"
          filename="grouped-select.tsx"
        />
        <GroupedOptionsSelectDemo />
      </section>

      {/* Interaction States Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Interaction States &amp; Dual-Indicator Focus
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The critical state combination is <strong>Invalid + Focused</strong>. HaloUI ensures that
          error borders and the 2px double-contrast Halo Focus Ring remain independently distinct.
          Validation errors never suppress the active keyboard focus outline:
        </p>
        <NativeSelectStatesDemo />
      </section>

      {/* Controlled Selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Controlled Selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Native Select follows standard React controlled conventions using <code className="text-foreground">value</code>{" "}
          and <code className="text-foreground">onChange</code>. No synthetic wrapper events or custom state machines are required:
        </p>
        <ControlledNativeSelectDemo />
      </section>

      {/* Callout 2: Native Select vs Custom Select */}
      <Callout type="note" title="Native Select vs Custom Select / Combobox">
        Use a future custom Select or Combobox when the interface requires rich option content (avatars, descriptions),
        custom dropdown styling, searchable filtering, virtualization, or multi-select chips. Use Native Select when
        simplicity, speed, and mobile sheet/picker integration are paramount.
      </Callout>

      {/* Callout 3: Platform Popup Limitation */}
      <Callout type="warning" title="Platform Picker Styling Boundaries">
        HaloUI styles the closed Native Select control with 10-layer optical liquid glass. The expanded
        option list is rendered directly by the operating system or browser engine (e.g. macOS popup menu,
        iOS action wheel, Android bottom picker) and cannot be arbitrarily styled via CSS.
      </Callout>

      {/* Native HTML Size Semantics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Native HTML Size Semantics
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In HTML, <code className="text-foreground">&lt;select size=&quot;4&quot;&gt;</code> defines the number of
          visible rows, converting the dropdown into a scrollable listbox. HaloUI intentionally avoids overloading{" "}
          <code className="text-foreground">size</code> for visual dimensions (e.g. &quot;sm&quot; or &quot;lg&quot;) to
          protect native web standards. The control standardizes on a canonical 40px (<code className="text-foreground">h-10</code>)
          height matching <code className="text-foreground">Input</code>.
        </p>
      </section>

      {/* Read-Only Distinction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          No Native Read-Only State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The HTML specification does not define a <code className="text-foreground">readOnly</code> attribute on{" "}
          <code className="text-foreground">&lt;select&gt;</code> elements. HaloUI deliberately does not simulate a fake{" "}
          <code className="text-foreground">readOnly</code> prop. If an immutable value must participate in form submission,
          use a disabled select with a hidden input, or present the static selection via an accessible text node.
        </p>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Props Reference
        </h2>
        <PropsTable rows={NATIVE_SELECT_PROPS} />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Real Native Semantics:</strong> Implemented as a genuine{" "}
            <code className="text-foreground">&lt;select&gt;</code>, ensuring 100% compatibility with screen
            readers (VoiceOver, NVDA, JAWS) without synthetic ARIA roles or focus traps.
          </p>
          <p>
            <strong>Native Keyboard Interaction:</strong> Preserves all platform keyboard behaviors (Space to
            open on Windows, Alt+Down on Chrome, Up/Down arrow selection, type-ahead character jump).
          </p>
          <p>
            <strong>Double-Contrast Focus Ring:</strong> Uses the Halo Focus Ring with a 2px offset,
            rendering distinctly on light, dark, and complex optical glass backdrops.
          </p>
          <p>
            <strong>Dual-Indicator Invalid States:</strong> Errors are communicated through both
            high-contrast boundary color and association with an explicit{" "}
            <code className="text-foreground">FieldError</code> via{" "}
            <code className="text-foreground">aria-describedby</code> and{" "}
            <code className="text-foreground">aria-invalid=&quot;true&quot;</code>.
          </p>
          <p>
            <strong>Decorative Icon Isolation:</strong> The dropdown chevron is marked{" "}
            <code className="text-foreground">aria-hidden=&quot;true&quot;</code> with{" "}
            <code className="text-foreground">pointer-events-none</code>, preventing touch interference.
          </p>
        </div>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Performance &amp; Runtime
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Native Select delivers extreme runtime efficiency:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>100% Server Component compatible without <code className="text-foreground">&quot;use client&quot;</code>.</li>
          <li>0 React hooks, 0 layout effects, 0 ResizeObservers, 0 event listeners in the base primitive.</li>
          <li>0 external positioning libraries (no Radix Select, Popper, or Floating UI required).</li>
          <li>Instant initial render and 0ms interaction latency on low-power mobile devices.</li>
        </ul>
      </section>

      {/* File Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          File Structure
        </h2>
        <FileTree items={FILE_TREE} />
      </section>

      {/* Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </section>
    </div>
  );
}
