"use client";

import * as React from "react";
import {
  ColorPicker,
  ColorPickerTrigger,
  ColorPickerContent,
  ColorSwatch,
} from "@/components/ui/color-picker";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

/**
 * 1. Primary Popover Color Picker Demonstration
 */
export function PrimaryColorPickerDemo() {
  const [color, setColor] = React.useState("#2563EB");

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-border/80 bg-card/40 flex flex-col items-center gap-3">
      <Field id="primary-color-field" className="w-full">
        <FieldLabel>Brand Primary Accent</FieldLabel>
        <FieldDescription>Click the swatch to choose an accent color.</FieldDescription>
        <div className="pt-2">
          <ColorPicker value={color} onValueChange={setColor} />
        </div>
      </Field>
    </div>
  );
}

/**
 * 2. Inline Color Picker Demonstration
 */
export function InlineColorPickerDemo() {
  const [color, setColor] = React.useState("#10B981");

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-border/80 bg-card/40 flex flex-col items-center">
      <div className="w-full space-y-2 mb-3">
        <h3 className="text-sm font-semibold text-foreground">Canvas Theme Color</h3>
        <p className="text-xs text-muted-foreground">Always-visible inline selection controls.</p>
      </div>
      <ColorPicker inline value={color} onValueChange={setColor} />
    </div>
  );
}

/**
 * 3. Transparency & Alpha Color Picker Demonstration
 */
export function AlphaColorPickerDemo() {
  const [color, setColor] = React.useState("#6366F1B3"); // 70% opacity

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-border/80 bg-card/40 flex flex-col items-center gap-3">
      <Field id="alpha-color-field" className="w-full">
        <FieldLabel>Backdrop Overlay Tint</FieldLabel>
        <FieldDescription>Includes transparency slider for 8-digit hex values.</FieldDescription>
        <div className="pt-2">
          <ColorPicker showAlpha value={color} onValueChange={setColor} />
        </div>
      </Field>
    </div>
  );
}

/**
 * 4. Controlled State with Preset Palette
 */
export function ControlledColorPickerDemo() {
  const [color, setColor] = React.useState("#8B5CF6");
  const presets = ["#EF4444", "#F59E0B", "#10B981", "#06B6D4", "#2563EB", "#8B5CF6", "#EC4899"];

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-border/80 bg-card/40 space-y-4">
      <Field id="palette-color-field" className="w-full">
        <FieldLabel>Interface Highlight</FieldLabel>
        <FieldDescription>Controlled by both visual picker and preset chips.</FieldDescription>
        <div className="pt-2">
          <ColorPicker value={color} onValueChange={setColor} />
        </div>
      </Field>

      <div className="space-y-1.5 pt-2 border-t border-border/60">
        <span className="text-xs font-medium text-muted-foreground">Quick Palette:</span>
        <div className="flex items-center gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              aria-label={`Select preset ${preset}`}
              onClick={() => setColor(preset)}
              className="rounded-lg p-0.5 transition-transform hover:scale-110 active:scale-95 outline-none halo-focus-ring"
            >
              <ColorSwatch color={preset} size="sm" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 5. White and Black Contrast Boundary Demonstration
 */
export function WhiteAndBlackContrastDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-2xl border border-border/80 bg-card/40 space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">Extreme Swatch Boundaries</h3>
        <p className="text-xs text-muted-foreground">
          Structural rims guarantee visibility of pure white on light modes and pure black on dark modes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-4 rounded-xl bg-white text-black border border-black/10 flex flex-col items-center gap-2">
          <span className="text-xs font-semibold">Pure White (#FFF)</span>
          <ColorPicker defaultValue="#FFFFFF" />
        </div>
        <div className="p-4 rounded-xl bg-black text-white border border-white/10 flex flex-col items-center gap-2">
          <span className="text-xs font-semibold">Pure Black (#000)</span>
          <ColorPicker defaultValue="#000000" />
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Disabled Color Picker Demonstration
 */
export function DisabledColorPickerDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-border/80 bg-card/40 opacity-75">
      <Field id="disabled-color-field" disabled className="w-full">
        <FieldLabel>System Accent (Locked)</FieldLabel>
        <FieldDescription>Modifications restricted by administrative policy.</FieldDescription>
        <div className="pt-2">
          <ColorPicker disabled defaultValue="#64748B" />
        </div>
      </Field>
    </div>
  );
}
