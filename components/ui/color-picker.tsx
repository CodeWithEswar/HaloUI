"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Color Math & Utilities                                                     */
/* -------------------------------------------------------------------------- */

export interface HsvColor {
  h: number; // 0..360
  s: number; // 0..100
  v: number; // 0..100
  a?: number; // 0..1
}

export interface RgbColor {
  r: number; // 0..255
  g: number; // 0..255
  b: number; // 0..255
  a?: number; // 0..1
}

export function isValidHex(hex: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(hex.trim());
}

export function normalizeHex(hex: string, uppercase = true): string {
  let cleaned = hex.trim();
  if (!cleaned.startsWith("#")) cleaned = `#${cleaned}`;
  if (cleaned.length === 4) {
    // Expand 3-digit hex (#RGB -> #RRGGBB)
    cleaned = `#${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}${cleaned[3]}${cleaned[3]}`;
  }
  return uppercase ? cleaned.toUpperCase() : cleaned.toLowerCase();
}

export function hexToRgb(hex: string): RgbColor {
  let c = hex.trim().replace(/^#/, "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  if (c.length === 8) {
    return {
      r: (num >> 24) & 255,
      g: (num >> 16) & 255,
      b: (num >> 8) & 255,
      a: Number(((num & 255) / 255).toFixed(2)),
    };
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
    a: 1,
  };
}

export function rgbToHsv(r: number, g: number, b: number, a = 1): HsvColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;

  if (max !== min) {
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  return { h, s: Math.round(s), v: Math.round(v), a };
}

export function hexToHsv(hex: string): HsvColor {
  if (!isValidHex(hex)) {
    return { h: 220, s: 80, v: 90, a: 1 };
  }
  const rgb = hexToRgb(hex);
  return rgbToHsv(rgb.r, rgb.g, rgb.b, rgb.a);
}

export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const sNorm = s / 100;
  const vNorm = v / 100;
  const c = vNorm * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vNorm - c;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (h >= 0 && h < 60) {
    rPrime = c;
    gPrime = x;
  } else if (h >= 60 && h < 120) {
    rPrime = x;
    gPrime = c;
  } else if (h >= 120 && h < 180) {
    gPrime = c;
    bPrime = x;
  } else if (h >= 180 && h < 240) {
    gPrime = x;
    bPrime = c;
  } else if (h >= 240 && h < 300) {
    rPrime = x;
    bPrime = c;
  } else {
    rPrime = c;
    bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  };
}

export function hsvToHex(h: number, s: number, v: number, a = 1): string {
  const { r, g, b } = hsvToRgb(h, s, v);
  const toHex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
  if (a < 1) {
    const alphaHex = Math.round(a * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/* -------------------------------------------------------------------------- */
/* ColorPicker Context                                                        */
/* -------------------------------------------------------------------------- */

export interface ColorPickerContextValue {
  color: string;
  hsv: HsvColor;
  setHsv: (hsv: HsvColor | ((prev: HsvColor) => HsvColor)) => void;
  setColor: (color: string) => void;
  showAlpha: boolean;
  disabled: boolean;
  invalid: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  inline: boolean;
}

const ColorPickerContext = React.createContext<ColorPickerContextValue | null>(null);

export function useColorPickerContext(): ColorPickerContextValue {
  const ctx = React.useContext(ColorPickerContext);
  if (!ctx) {
    throw new Error("ColorPicker subcomponents must be used within <ColorPicker>");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/* ColorPicker Root Component                                                 */
/* -------------------------------------------------------------------------- */

export interface ColorPickerProps {
  /**
   * Canonical color value in HEX format (e.g. "#2563EB" or "#2563EBFF").
   */
  value?: string;
  /**
   * Uncontrolled default color value.
   * @default "#2563EB"
   */
  defaultValue?: string;
  /**
   * Event handler invoked whenever the committed canonical color changes.
   */
  onValueChange?: (color: string) => void;
  /**
   * Whether to support transparency/alpha adjustment.
   * @default false
   */
  showAlpha?: boolean;
  /**
   * Whether the color picker is rendered inline rather than inside a floating popover.
   * @default false
   */
  inline?: boolean;
  /**
   * Disables visual adjustments, popover opening, and textual editing.
   */
  disabled?: boolean;
  /**
   * Applies invalid state perimeter styling and coordinates with surrounding Field.
   */
  invalid?: boolean;
  /**
   * Surrounding field coordination ID.
   */
  id?: string;
  /**
   * Optional custom class name.
   */
  className?: string;
  /**
   * Child elements or custom trigger / content composition.
   */
  children?: React.ReactNode;
}

/**
 * ColorPicker — Forms & Fields 27
 *
 * An accessible color-selection control combining visual color adjustment
 * (2D Saturation/Brightness area, 1D Hue slider, optional Alpha) with precise
 * textual color entry and zero optical material contamination.
 */
export function ColorPicker({
  value: controlledValue,
  defaultValue = "#2563EB",
  onValueChange,
  showAlpha = false,
  inline = false,
  disabled: propDisabled,
  invalid: propInvalid,
  id: propId,
  className,
  children,
}: ColorPickerProps) {
  // Coordinate with surrounding Field if present
  const fieldProps = useFieldControlProps({
    id: propId,
    disabled: propDisabled,
    "aria-invalid": propInvalid,
  });

  const isDisabled = Boolean(propDisabled || fieldProps.disabled);
  const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);

  const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentColor = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = React.useState(false);
  const [hsv, setHsvState] = React.useState<HsvColor>(() => hexToHsv(currentColor));

  const hsvRef = React.useRef<HsvColor>(hsv);
  hsvRef.current = hsv;

  // Sync internal HSV when controlled color changes externally
  React.useEffect(() => {
    if (isControlled && isValidHex(controlledValue)) {
      const nextHsv = hexToHsv(controlledValue);
      hsvRef.current = nextHsv;
      setHsvState(nextHsv);
    }
  }, [controlledValue, isControlled]);

  const commitColor = React.useCallback(
    (newHex: string) => {
      const normalized = normalizeHex(newHex);
      if (!isControlled) {
        setInternalValue(normalized);
      }
      onValueChange?.(normalized);
    },
    [isControlled, onValueChange]
  );

  const setHsv = React.useCallback(
    (updater: HsvColor | ((prev: HsvColor) => HsvColor)) => {
      const prev = hsvRef.current;
      const next = typeof updater === "function" ? updater(prev) : updater;
      hsvRef.current = next;
      setHsvState(next);
      const newHex = hsvToHex(next.h, next.s, next.v, showAlpha ? next.a : 1);
      commitColor(newHex);
    },
    [commitColor, showAlpha]
  );

  const contextValue = React.useMemo<ColorPickerContextValue>(
    () => ({
      color: currentColor,
      hsv,
      setHsv,
      setColor: commitColor,
      showAlpha,
      disabled: isDisabled,
      invalid: isInvalid,
      isOpen,
      setIsOpen,
      inline,
    }),
    [commitColor, currentColor, hsv, inline, isDisabled, isInvalid, isOpen, setHsv, showAlpha]
  );

  if (inline) {
    return (
      <ColorPickerContext.Provider value={contextValue}>
        <div
          data-slot="color-picker"
          data-inline="true"
          className={cn("w-full max-w-[280px]", className)}
        >
          {children || <ColorPickerContent />}
        </div>
      </ColorPickerContext.Provider>
    );
  }

  return (
    <ColorPickerContext.Provider value={contextValue}>
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <div data-slot="color-picker" className={cn("inline-block", className)}>
          {children || (
            <>
              <ColorPickerTrigger />
              <ColorPickerContent />
            </>
          )}
        </div>
      </PopoverPrimitive.Root>
    </ColorPickerContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* ColorPickerTrigger                                                         */
/* -------------------------------------------------------------------------- */

export interface ColorPickerTriggerProps extends React.ComponentPropsWithoutRef<"button"> {}

export const ColorPickerTrigger = React.forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
  function ColorPickerTrigger({ className, ...props }, ref) {
    const ctx = useColorPickerContext();

    if (ctx.inline) return null;

    return (
      <PopoverPrimitive.Trigger asChild>
        <button
          ref={ref}
          type="button"
          disabled={ctx.disabled}
          aria-label={`Select color, current: ${ctx.color}`}
          aria-invalid={ctx.invalid ? "true" : undefined}
          data-slot="color-picker-trigger"
          className={cn(
            "halo-liquid-glass group/color-trigger relative inline-flex items-center gap-2.5 h-10 px-3 rounded-xl border border-border/80 bg-background/80 text-foreground font-mono text-xs shadow-xs transition-all outline-none",
            "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
            ctx.invalid && "border-destructive/80 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)]",
            "disabled:opacity-40 disabled:pointer-events-none",
            className
          )}
          {...props}
        >
          {/* Swatch with structural boundary preventing disappearance on white/black */}
          <ColorSwatch color={ctx.color} size="sm" />
          <span className="font-semibold uppercase tracking-wider">{ctx.color}</span>
        </button>
      </PopoverPrimitive.Trigger>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* ColorPickerContent                                                         */
/* -------------------------------------------------------------------------- */

export interface ColorPickerContentProps extends React.ComponentPropsWithoutRef<"div"> {}

export const ColorPickerContent = React.forwardRef<HTMLDivElement, ColorPickerContentProps>(
  function ColorPickerContent({ className, children, ...props }, ref) {
    const ctx = useColorPickerContext();

    const contentInner = (
      <div
        ref={ref}
        data-slot="color-picker-content"
        className={cn(
          "w-[270px] flex flex-col gap-3 p-3 rounded-2xl border border-border/80 bg-popover/95 text-popover-foreground shadow-xl backdrop-blur-xl transition-all outline-none",
          className
        )}
        {...props}
      >
        {children || (
          <>
            {/* 2D Color Saturation/Brightness Area */}
            <ColorArea />

            {/* Hue Slider */}
            <ColorHueSlider />

            {/* Optional Alpha Slider */}
            {ctx.showAlpha && <ColorAlphaSlider />}

            {/* Bottom Row: Swatch + Text Input */}
            <div className="flex items-center gap-2 pt-1 border-t border-border/60">
              <ColorSwatch color={ctx.color} size="md" />
              <ColorValueInput className="flex-1" />
            </div>
          </>
        )}
      </div>
    );

    if (ctx.inline) {
      return contentInner;
    }

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={8}
          className="z-50 outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          {contentInner}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* ColorArea (2D Saturation / Brightness Field)                               */
/* -------------------------------------------------------------------------- */

export interface ColorAreaProps extends React.ComponentPropsWithoutRef<"div"> {}

export const ColorArea = React.forwardRef<HTMLDivElement, ColorAreaProps>(
  function ColorArea({ className, ...props }, ref) {
    const ctx = useColorPickerContext();
    const areaRef = React.useRef<HTMLDivElement | null>(null);
    const isDragging = React.useRef(false);

    const updateFromPointer = React.useCallback(
      (clientX: number, clientY: number) => {
        if (!areaRef.current || ctx.disabled) return;
        const rect = areaRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

        const s = Math.round((x / rect.width) * 100);
        const v = Math.round((1 - y / rect.height) * 100);

        ctx.setHsv((prev) => ({ ...prev, s, v }));
      },
      [ctx]
    );

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (ctx.disabled) return;
      isDragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      updateFromPointer(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging.current) {
        updateFromPointer(e.clientX, e.clientY);
      }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      isDragging.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture already released
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (ctx.disabled) return;
      const step = e.shiftKey ? 10 : 2;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          ctx.setHsv((prev) => ({ ...prev, s: Math.max(0, prev.s - step) }));
          break;
        case "ArrowRight":
          e.preventDefault();
          ctx.setHsv((prev) => ({ ...prev, s: Math.min(100, prev.s + step) }));
          break;
        case "ArrowUp":
          e.preventDefault();
          ctx.setHsv((prev) => ({ ...prev, v: Math.min(100, prev.v + step) }));
          break;
        case "ArrowDown":
          e.preventDefault();
          ctx.setHsv((prev) => ({ ...prev, v: Math.max(0, prev.v - step) }));
          break;
      }
    };

    const pureHue = `hsl(${ctx.hsv.h}, 100%, 50%)`;

    return (
      <div
        ref={(node) => {
          areaRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="slider"
        aria-label="Color saturation and brightness"
        aria-valuetext={`Saturation ${ctx.hsv.s}%, Brightness ${ctx.hsv.v}%`}
        tabIndex={ctx.disabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        data-slot="color-area"
        className={cn(
          "relative w-full h-[150px] rounded-xl overflow-hidden cursor-crosshair select-none touch-none outline-none border border-black/10 dark:border-white/15",
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 halo-focus-ring",
          ctx.disabled && "pointer-events-none opacity-40",
          className
        )}
        style={{
          backgroundColor: pureHue,
        }}
        {...props}
      >
        {/* Optically neutral gradients without material blur contamination */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #FFFFFF, transparent)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #000000, transparent)",
          }}
        />

        {/* Thumb with high-contrast double ring for guaranteed contrast on pure white/black */}
        <div
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none shadow-[0_0_0_1.5px_#FFFFFF,0_0_0_3px_rgba(0,0,0,0.6)]"
          style={{
            left: `${ctx.hsv.s}%`,
            top: `${100 - ctx.hsv.v}%`,
            backgroundColor: ctx.color,
          }}
        />
      </div>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* ColorHueSlider (1D Spectrum Bar)                                           */
/* -------------------------------------------------------------------------- */

export interface ColorHueSliderProps extends React.ComponentPropsWithoutRef<"div"> {}

export const ColorHueSlider = React.forwardRef<HTMLDivElement, ColorHueSliderProps>(
  function ColorHueSlider({ className, ...props }, ref) {
    const ctx = useColorPickerContext();
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const isDragging = React.useRef(false);

    const updateHueFromPointer = (clientX: number) => {
      if (!trackRef.current || ctx.disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const h = Math.round((x / rect.width) * 360) % 360;
      ctx.setHsv((prev) => ({ ...prev, h }));
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (ctx.disabled) return;
      isDragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      updateHueFromPointer(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging.current) {
        updateHueFromPointer(e.clientX);
      }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      isDragging.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // release
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (ctx.disabled) return;
      const step = e.shiftKey ? 15 : 2;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        ctx.setHsv((prev) => ({ ...prev, h: (prev.h - step + 360) % 360 }));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        ctx.setHsv((prev) => ({ ...prev, h: (prev.h + step) % 360 }));
      }
    };

    const huePosition = (ctx.hsv.h / 360) * 100;

    return (
      <div
        ref={(node) => {
          trackRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="slider"
        aria-label="Color hue spectrum"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={ctx.hsv.h}
        tabIndex={ctx.disabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        data-slot="color-hue-slider"
        className={cn(
          "relative w-full h-3 rounded-full cursor-pointer select-none touch-none outline-none border border-black/10 dark:border-white/15",
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 halo-focus-ring",
          ctx.disabled && "pointer-events-none opacity-40",
          className
        )}
        style={{
          background:
            "linear-gradient(to right, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)",
        }}
        {...props}
      >
        <div
          className="absolute w-4 h-4 -top-0.5 -translate-x-1/2 rounded-full pointer-events-none shadow-[0_0_0_1.5px_#FFFFFF,0_0_0_3px_rgba(0,0,0,0.6)]"
          style={{
            left: `${huePosition}%`,
            backgroundColor: `hsl(${ctx.hsv.h}, 100%, 50%)`,
          }}
        />
      </div>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* ColorAlphaSlider (Transparency Control)                                    */
/* -------------------------------------------------------------------------- */

export interface ColorAlphaSliderProps extends React.ComponentPropsWithoutRef<"div"> {}

export const ColorAlphaSlider = React.forwardRef<HTMLDivElement, ColorAlphaSliderProps>(
  function ColorAlphaSlider({ className, ...props }, ref) {
    const ctx = useColorPickerContext();
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const isDragging = React.useRef(false);
    const currentAlpha = ctx.hsv.a ?? 1;

    const updateAlphaFromPointer = (clientX: number) => {
      if (!trackRef.current || ctx.disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const a = Number((x / rect.width).toFixed(2));
      ctx.setHsv((prev) => ({ ...prev, a }));
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (ctx.disabled) return;
      isDragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      updateAlphaFromPointer(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging.current) {
        updateAlphaFromPointer(e.clientX);
      }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      isDragging.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // release
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (ctx.disabled) return;
      const step = e.shiftKey ? 0.1 : 0.02;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        ctx.setHsv((prev) => ({ ...prev, a: Math.max(0, Number(((prev.a ?? 1) - step).toFixed(2))) }));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        ctx.setHsv((prev) => ({ ...prev, a: Math.min(1, Number(((prev.a ?? 1) + step).toFixed(2))) }));
      }
    };

    const opaqueHex = hsvToHex(ctx.hsv.h, ctx.hsv.s, ctx.hsv.v, 1);

    return (
      <div
        ref={(node) => {
          trackRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="slider"
        aria-label="Color transparency alpha"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(currentAlpha * 100)}
        tabIndex={ctx.disabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        data-slot="color-alpha-slider"
        className={cn(
          "relative w-full h-3 rounded-full cursor-pointer select-none touch-none outline-none border border-black/10 dark:border-white/15 overflow-hidden",
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 halo-focus-ring",
          ctx.disabled && "pointer-events-none opacity-40",
          className
        )}
        style={{
          backgroundImage:
            "linear-gradient(45deg, #CCC 25%, transparent 25%), linear-gradient(-45deg, #CCC 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #CCC 75%), linear-gradient(-45deg, transparent 75%, #CCC 75%)",
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
        }}
        {...props}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${opaqueHex})`,
          }}
        />
        <div
          className="absolute w-4 h-4 -top-0.5 -translate-x-1/2 rounded-full pointer-events-none shadow-[0_0_0_1.5px_#FFFFFF,0_0_0_3px_rgba(0,0,0,0.6)]"
          style={{
            left: `${currentAlpha * 100}%`,
            backgroundColor: ctx.color,
          }}
        />
      </div>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* ColorValueInput (Textual Entry with buffer)                                */
/* -------------------------------------------------------------------------- */

export interface ColorValueInputProps extends React.ComponentPropsWithoutRef<"input"> {}

export const ColorValueInput = React.forwardRef<HTMLInputElement, ColorValueInputProps>(
  function ColorValueInput({ className, ...props }, ref) {
    const ctx = useColorPickerContext();
    const [inputValue, setInputValue] = React.useState<string>(ctx.color);

    // Keep input field updated when external color changes, unless user is typing
    React.useEffect(() => {
      setInputValue(ctx.color);
    }, [ctx.color]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);

      // If typed value is a valid hex, update color immediately without resetting cursor
      if (isValidHex(val)) {
        ctx.setColor(val);
      }
    };

    const handleBlur = () => {
      if (isValidHex(inputValue)) {
        const normalized = normalizeHex(inputValue);
        setInputValue(normalized);
        ctx.setColor(normalized);
      } else {
        // Reset to canonical valid color
        setInputValue(ctx.color);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleBlur();
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        value={inputValue}
        disabled={ctx.disabled}
        spellCheck={false}
        autoComplete="off"
        maxLength={ctx.showAlpha ? 9 : 7}
        aria-label="Hex color value"
        data-slot="color-value-input"
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "h-8 px-2.5 rounded-lg border border-border/80 bg-background/80 text-foreground font-mono text-xs uppercase outline-none transition-all",
          "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] halo-focus-ring",
          "disabled:opacity-40 disabled:pointer-events-none",
          className
        )}
        {...props}
      />
    );
  }
);

/* -------------------------------------------------------------------------- */
/* ColorSwatch (Guaranteed Structural Boundary)                               */
/* -------------------------------------------------------------------------- */

export interface ColorSwatchProps extends React.ComponentPropsWithoutRef<"div"> {
  color: string;
  size?: "sm" | "md" | "lg";
}

export function ColorSwatch({ color, size = "md", className, style, ...props }: ColorSwatchProps) {
  const sizeClass = size === "sm" ? "w-5 h-5 rounded-md" : size === "lg" ? "w-10 h-10 rounded-xl" : "w-8 h-8 rounded-lg";

  return (
    <div
      data-slot="color-swatch"
      className={cn(
        "relative shrink-0 overflow-hidden ring-1 ring-black/15 dark:ring-white/25 shadow-2xs",
        sizeClass,
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(45deg, #DDD 25%, transparent 25%), linear-gradient(-45deg, #DDD 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #DDD 75%), linear-gradient(-45deg, transparent 75%, #DDD 75%)",
        backgroundSize: "6px 6px",
        backgroundPosition: "0 0, 0 3px, 3px -3px, -3px 0px",
        ...style,
      }}
      {...props}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}
