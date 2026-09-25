import * as React from "react";
import type { Metadata } from "next";
import { ColorPickerPreviewStage } from "./color-picker-preview-stage";
import {
  PrimaryColorPickerDemo,
  InlineColorPickerDemo,
  AlphaColorPickerDemo,
  ControlledColorPickerDemo,
  WhiteAndBlackContrastDemo,
  DisabledColorPickerDemo,
} from "./color-picker-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Color Picker — Forms & Fields — HaloUI",
  description:
    "An accessible color-selection control combining visual color adjustment with precise textual color entry.",
};

const COLOR_PICKER_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "Controlled canonical color value in standard hexadecimal format (e.g. '#2563EB').",
  },
  {
    name: "defaultValue",
    type: "string",
    default: '"#2563EB"',
    required: false,
    description: "Initial color value when operating in uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(color: string) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked whenever the user commits a valid color via visual controls or text entry.",
  },
  {
    name: "showAlpha",
    type: "boolean",
    default: "false",
    required: false,
    description: "Enables transparency/alpha slider and outputs 8-digit hexadecimal values ('#RRGGBBAA').",
  },
  {
    name: "inline",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders the color-picker panel inline directly in the document layout without a trigger popover.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction across the trigger button, visual sliders, and text input field.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies error perimeter styling and coordinates aria-invalid with surrounding form Field.",
  },
];

const COLOR_PICKER_ANATOMY: AnatomyPart[] = [
  {
    name: "ColorPicker",
    description: "Root context provider coordinating canonical color state, HSV representation, and popover toggle.",
  },
  {
    name: "ColorPickerTrigger",
    description: "Action button displaying the current swatch and hexadecimal value, activating the popover.",
  },
  {
    name: "ColorPickerContent",
    description: "Floating or inline surface housing the visual color area, spectrum sliders, and text input.",
  },
  {
    name: "ColorArea",
    description: "Two-dimensional saturation and brightness selection canvas operable by pointer and keyboard arrows.",
  },
  {
    name: "ColorHueSlider",
    description: "One-dimensional horizontal rainbow slider controlling the 360-degree color hue spectrum.",
  },
  {
    name: "ColorAlphaSlider",
    description: "Optional transparency slider with checkerboard substrate for selecting opacity from 0% to 100%.",
  },
  {
    name: "ColorValueInput",
    description: "Precise text field for entering hexadecimal values, keeping incomplete user input buffered during typing.",
  },
  {
    name: "ColorSwatch",
    description: "Optically neutral color indicator with dual structural rim ensuring visibility on pure white and black.",
  },
];

const COLOR_PICKER_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "color-picker.tsx", type: "file" },
          { name: "field.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [{ name: "halo-tokens.css", type: "file" }],
  },
];

const COLOR_PICKER_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "Core Dependencies",
    items: [
      "@radix-ui/react-popover",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Registry Dependencies",
    items: [
      "field",
    ],
  },
];

export default function ColorPickerDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-primary">
            Forms &amp; Fields · 27
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Color Control
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Color Picker
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl sm:text-lg">
          An accessible color-selection control combining visual color adjustment (2D Saturation/Brightness canvas and 1D Hue spectrum) with precise textual hexadecimal entry and zero optical material contamination.
        </p>
      </header>

      {/* Interactive Preview Stage */}
      <section id="interactive-stage" className="space-y-4">
        <ColorPickerPreviewStage />
      </section>

      {/* Optical Accuracy Callout */}
      <Callout type="important" title="Zero Optical Material Contamination">
        HaloUI material effects (diffuse blur, specular highlights, micro-grain noise, refraction rims) must never visually contaminate the active color canvas, spectrum sliders, or color swatch. The displayed swatch represents the chosen color faithfully and accurately without digital tinting.
      </Callout>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Installation</h2>
        <InstallCommand registry="color-picker" />
      </section>

      {/* Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Usage</h2>
        <CodeBlock
          code={`import { ColorPicker } from "@/components/ui/color-picker";

export function Example() {
  const [color, setColor] = React.useState("#2563EB");

  return (
    <ColorPicker
      value={color}
      onValueChange={setColor}
    />
  );
}`}
          language="tsx"
        />
      </section>

      {/* With Field */}
      <section id="with-field" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">With Field</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Composed inside HaloUI&apos;s <code>Field</code> component with accessible label and description:
        </p>
        <PrimaryColorPickerDemo />
      </section>

      {/* Controlled State */}
      <section id="controlled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Controlled State &amp; Palette Swatches</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Both visual controls and text input maintain synchronized alignment with external palette chips through a single canonical state:
        </p>
        <ControlledColorPickerDemo />
      </section>

      {/* Inline Usage */}
      <section id="inline-usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Inline Mode</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When configured with <code>inline</code>, the color adjustment panel renders statically within the document flow without requiring a popover click:
        </p>
        <InlineColorPickerDemo />
      </section>

      {/* Alpha & Transparency */}
      <section id="alpha" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Alpha Transparency</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Enabling <code>showAlpha</code> adds an opacity slider and outputs 8-digit hexadecimal color values (e.g. <code>#2563EBB3</code>):
        </p>
        <AlphaColorPickerDemo />
      </section>

      {/* Contrast & Structural Rim */}
      <section id="contrast-boundary" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Structural Boundary Visibility</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Pure white (<code>#FFFFFF</code>) on light themes and pure black (<code>#000000</code>) on dark themes are guaranteed to remain visually distinguishable through calibrated dual-contrast structural rims:
        </p>
        <WhiteAndBlackContrastDemo />
      </section>

      {/* Contrast Callout */}
      <Callout type="note" title="Contrast Guidance">
        Color Picker selects colors; it does not guarantee that a chosen color meets WCAG contrast requirements against arbitrary backgrounds. Contrast compliance should be evaluated by application validation or design-system tokens.
      </Callout>

      {/* Disabled */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Disabled State</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When disabled, popover triggers, visual sliders, and text inputs suppress pointer and keyboard interactions:
        </p>
        <DisabledColorPickerDemo />
      </section>

      {/* Color Picker vs Native Color Input */}
      <section id="color-picker-vs-native" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Color Picker vs Native Color Input</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Feature</th>
                <th className="px-4 py-3 font-medium">Native &lt;input type=&quot;color&quot;&gt;</th>
                <th className="px-4 py-3 font-medium">HaloUI Color Picker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Visual Design</td>
                <td className="px-4 py-3 text-muted-foreground">OS-dependent dialog</td>
                <td className="px-4 py-3 text-muted-foreground">Consistent cross-platform liquid glass shell</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Alpha Transparency</td>
                <td className="px-4 py-3 text-muted-foreground">Not supported in standard HTML</td>
                <td className="px-4 py-3 text-muted-foreground">Full 8-digit HEX alpha support</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Inline Presentation</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
                <td className="px-4 py-3 text-muted-foreground">Yes (via inline prop)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Synchronized Text Entry</td>
                <td className="px-4 py-3 text-muted-foreground">Requires external inputs</td>
                <td className="px-4 py-3 text-muted-foreground">Built-in buffered HEX input</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Keyboard Usability</td>
                <td className="px-4 py-3 text-muted-foreground">Platform-dependent</td>
                <td className="px-4 py-3 text-muted-foreground">Standardized ARIA slider arrow navigation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props Table */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Props Reference</h2>
        <PropsTable rows={COLOR_PICKER_PROPS} />
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Anatomy</h2>
        <Anatomy parts={COLOR_PICKER_ANATOMY} />
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Accessibility (WCAG 2.1 AA)</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
          <li><strong>Textual Communication:</strong> The chosen color is communicated through semantic text and hexadecimal representation, never visual swatch color alone.</li>
          <li><strong>Keyboard Slider Navigation:</strong> Arrow keys adjust 2D brightness and saturation in <code>ColorArea</code> and hue spectrum in <code>ColorHueSlider</code>. Holding <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">Shift</kbd> jumps in larger increments.</li>
          <li><strong>Safe Text Editing:</strong> Arrow keys inside the HEX input field behave normally for cursor movement and are not intercepted by slider handlers.</li>
          <li><strong>Focus Restoration:</strong> Closing the popover returns focus predictably to the trigger button.</li>
          <li><strong>Independent Focus Ring:</strong> The Halo focus perimeter remains visible regardless of the selected color value.</li>
        </ul>
      </section>

      {/* File Tree */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Installed Files</h2>
        <FileTree items={COLOR_PICKER_FILES} />
      </section>

      {/* Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Dependencies</h2>
        <DependencyList groups={COLOR_PICKER_DEPENDENCIES} />
      </section>
    </div>
  );
}
