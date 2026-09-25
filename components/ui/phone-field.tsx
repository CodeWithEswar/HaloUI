"use client";

import * as React from "react";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  type CountryCode,
} from "libphonenumber-js";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Helpers & Types                                                            */
/* -------------------------------------------------------------------------- */

export type { CountryCode };

export interface PhoneValueDetails {
  raw: string;
  formatted: string;
  e164?: string;
  country?: CountryCode;
  countryCallingCode?: string;
  isPossible?: boolean;
  isValid?: boolean;
}

export interface PhoneFieldProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "defaultValue" | "onChange" | "size"
  > {
  /**
   * The controlled phone value (can be an E.164 string like "+14155552671",
   * national string like "(415) 555-2671", or raw digits).
   */
  value?: string;
  /**
   * The uncontrolled default phone value when initially rendered.
   */
  defaultValue?: string;
  /**
   * Event handler fired continuously as the user edits the phone number.
   * Delivers the formatted/typed string and complete parsed details (E.164, validity, country).
   */
  onValueChange?: (value: string, details: PhoneValueDetails) => void;
  /**
   * Default country code (ISO 3166-1 alpha-2) used for national number entry.
   * @default "US"
   */
  defaultCountry?: CountryCode;
  /**
   * Controlled active country code.
   */
  country?: CountryCode;
  /**
   * Callback fired when the active country context changes.
   */
  onCountryChange?: (country: CountryCode) => void;
  /**
   * Optional custom list of allowed countries. If omitted, all supported countries are available.
   */
  countries?: CountryCode[];
  /**
   * Whether to disable country selection.
   * @default false
   */
  disableCountrySelect?: boolean;
  /**
   * Size variant of the phone field assembly.
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  /**
   * Whether the phone field is marked as invalid.
   */
  invalid?: boolean;
  /**
   * Custom class name for the inner input element.
   */
  inputClassName?: string;
}

/**
 * Returns flag emoji for a given ISO 3166-1 alpha-2 country code.
 */
export function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/* -------------------------------------------------------------------------- */
/* PhoneField Component                                                       */
/* -------------------------------------------------------------------------- */

/**
 * PhoneField — Forms & Fields Primitive
 *
 * A structured phone-number input for entering international telephone numbers
 * with country context, formatting, and accessible validation support.
 */
export const PhoneField = React.forwardRef<HTMLInputElement, PhoneFieldProps>(
  function PhoneField(
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      defaultCountry = "US",
      country: controlledCountry,
      onCountryChange,
      countries: propCountries,
      disableCountrySelect = false,
      size = "default",
      disabled: propDisabled,
      readOnly,
      required: propRequired,
      invalid: propInvalid,
      id: propId,
      placeholder,
      inputClassName,
      ...props
    },
    ref
  ) {
    const fieldProps = useFieldControlProps({
      id: propId,
      disabled: propDisabled,
      required: propRequired,
      "aria-invalid": propInvalid,
    });

    const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
    const isDisabled = Boolean(propDisabled || fieldProps.disabled);
    const isRequired = Boolean(propRequired || fieldProps.required);

    // Country state
    const [internalCountry, setInternalCountry] = React.useState<CountryCode>(defaultCountry);
    const activeCountry = controlledCountry ?? internalCountry;

    // Value state (we keep human-entered / formatted text)
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(() => {
      if (defaultValue) {
        return new AsYouType(activeCountry).input(defaultValue);
      }
      return "";
    });

    const displayValue = isControlled ? controlledValue : internalValue;

    // Compute country calling code safely
    const callingCode = React.useMemo(() => {
      try {
        return getCountryCallingCode(activeCountry);
      } catch {
        return "1";
      }
    }, [activeCountry]);

    // Active flag
    const flag = React.useMemo(() => getCountryFlag(activeCountry), [activeCountry]);

    // Cache localized country options list
    const countryList = React.useMemo(() => {
      const allCodes = propCountries ?? getCountries();
      const displayNames =
        typeof Intl !== "undefined" && Intl.DisplayNames
          ? new Intl.DisplayNames(["en"], { type: "region" })
          : null;

      return allCodes
        .map((code) => {
          let name = code;
          let codeNum = "";
          try {
            name = displayNames ? displayNames.of(code) || code : code;
            codeNum = getCountryCallingCode(code);
          } catch {
            codeNum = "";
          }
          return { code, name, callingCode: codeNum };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    }, [propCountries]);

    // Helper to evaluate phone value details
    const evaluateDetails = React.useCallback(
      (text: string, currentCountry: CountryCode): PhoneValueDetails => {
        if (!text.trim()) {
          return {
            raw: "",
            formatted: "",
            isPossible: false,
            isValid: false,
          };
        }

        const ayt = new AsYouType(currentCountry);
        const formatted = ayt.input(text);
        const detectedCountry = ayt.getCountry() ?? currentCountry;
        let e164: string | undefined;
        let isPossible = false;
        let isValid = false;

        try {
          const parsed = parsePhoneNumberFromString(text, currentCountry);
          if (parsed) {
            e164 = parsed.format("E.164");
            isPossible = parsed.isPossible();
            isValid = parsed.isValid();
          } else {
            isPossible = isPossiblePhoneNumber(text, currentCountry);
            isValid = isValidPhoneNumber(text, currentCountry);
          }
        } catch {
          // ignore parsing exceptions on incomplete input
        }

        let codeNum: string | undefined;
        try {
          codeNum = getCountryCallingCode(detectedCountry);
        } catch {
          codeNum = undefined;
        }

        return {
          raw: text,
          formatted,
          e164,
          country: detectedCountry,
          countryCallingCode: codeNum,
          isPossible,
          isValid,
        };
      },
      []
    );

    // Handle typing / paste
    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawInput = e.target.value;

        // If user typed empty string, clear it cleanly
        if (!rawInput) {
          if (!isControlled) {
            setInternalValue("");
          }
          onValueChange?.("", {
            raw: "",
            formatted: "",
            isPossible: false,
            isValid: false,
          });
          return;
        }

        // Format as-you-type
        const ayt = new AsYouType(activeCountry);
        const formatted = ayt.input(rawInput);
        const detectedCountry = ayt.getCountry();

        // If an international number starting with '+' was pasted or entered, update country
        if (rawInput.trim().startsWith("+") && detectedCountry && detectedCountry !== activeCountry) {
          if (controlledCountry === undefined) {
            setInternalCountry(detectedCountry);
          }
          onCountryChange?.(detectedCountry);
        }

        if (!isControlled) {
          setInternalValue(formatted);
        }

        const details = evaluateDetails(rawInput, detectedCountry ?? activeCountry);
        onValueChange?.(formatted, details);
      },
      [activeCountry, controlledCountry, evaluateDetails, isControlled, onCountryChange, onValueChange]
    );

    // Handle country selector change
    const handleCountryChange = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCountry = e.target.value as CountryCode;
        if (controlledCountry === undefined) {
          setInternalCountry(newCountry);
        }
        onCountryChange?.(newCountry);

        // Re-evaluate current displayValue with new country context without destroying entered digits
        if (displayValue) {
          const ayt = new AsYouType(newCountry);
          const reFormatted = ayt.input(displayValue);
          if (!isControlled) {
            setInternalValue(reFormatted);
          }
          const details = evaluateDetails(displayValue, newCountry);
          onValueChange?.(reFormatted, details);
        }
      },
      [controlledCountry, displayValue, evaluateDetails, isControlled, onCountryChange, onValueChange]
    );

    // Size variants
    const sizeClasses = {
      sm: "h-8 text-xs",
      default: "h-10 text-sm",
      lg: "h-12 text-base",
    }[size];

    return (
      <div
        data-slot="phone-field-root"
        data-size={size}
        data-invalid={isInvalid ? "true" : undefined}
        className={cn(
          "halo-liquid-glass group/phone-field relative flex w-full min-w-0 items-center rounded-xl p-1 transition-all duration-150 outline-none isolate",
          sizeClasses,
          // Shared boundary focus when input is active
          "has-[input:focus-visible]:border-[var(--halo-focus-color)]",
          "has-[input:focus-visible]:ring-2",
          "has-[input:focus-visible]:ring-[var(--halo-focus-color)]",
          "has-[input:focus-visible]:ring-offset-2",
          "has-[input:focus-visible]:ring-offset-background",
          "has-[input:focus-visible]:halo-focus-ring",
          // Invalid state (Dual Indicator Visibility)
          isInvalid && [
            "border-destructive/80 dark:border-destructive/70 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)]",
            "has-[input:focus-visible]:ring-destructive/40 has-[input:focus-visible]:border-destructive",
          ],
          // Disabled state
          isDisabled && "pointer-events-none cursor-not-allowed opacity-40 shadow-none",
          className
        )}
      >
        {/* Country Selector Trigger & Native Select */}
        {!disableCountrySelect && (
          <div className="relative flex items-center shrink-0">
            <div
              data-slot="phone-field-country-trigger"
              className={cn(
                "relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium transition-colors select-none",
                "text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/15",
                // Distinct double-contrast Halo Focus Ring when Country Selector is focused
                "has-[select:focus-visible]:ring-2 has-[select:focus-visible]:ring-[var(--halo-focus-color)] has-[select:focus-visible]:ring-offset-1 has-[select:focus-visible]:ring-offset-background has-[select:focus-visible]:z-20 halo-focus-ring",
                isDisabled && "pointer-events-none opacity-50"
              )}
            >
              <span className="text-base leading-none select-none" aria-hidden="true">
                {flag}
              </span>
              <span className="font-mono text-xs text-muted-foreground font-semibold">
                +{callingCode}
              </span>
              <HaloIcon icon={ArrowDown01Icon} size={13} className="text-muted-foreground/80 shrink-0" />
              <select
                aria-label={`Phone country (currently +${callingCode})`}
                value={activeCountry}
                onChange={handleCountryChange}
                disabled={isDisabled || readOnly}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 disabled:cursor-not-allowed"
              >
                {countryList.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name} (+{item.callingCode})
                  </option>
                ))}
              </select>
            </div>
            {/* Divider line */}
            <div className="w-[1px] h-5 bg-border/60 mx-1 shrink-0" aria-hidden="true" />
          </div>
        )}

        {/* Telephone Input */}
        <input
          ref={ref}
          id={fieldProps.id}
          data-slot="phone-field-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={displayValue}
          onChange={handleInputChange}
          disabled={isDisabled}
          readOnly={readOnly}
          required={isRequired}
          placeholder={placeholder ?? "(555) 000-0000"}
          aria-describedby={fieldProps["aria-describedby"]}
          aria-invalid={isInvalid ? "true" : undefined}
          className={cn(
            "h-full flex-1 min-w-0 rounded-none border-0 bg-transparent px-2 text-foreground placeholder:text-muted-foreground outline-none ring-0 shadow-none selection:bg-primary/20",
            "disabled:cursor-not-allowed disabled:bg-transparent",
            "read-only:cursor-default read-only:select-text",
            inputClassName
          )}
          {...props}
        />
      </div>
    );
  }
);

PhoneField.displayName = "PhoneField";

export default PhoneField;
