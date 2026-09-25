"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";
import { MinusSignIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Input OTP Context                                                          */
/* -------------------------------------------------------------------------- */

interface InputOTPUIContextValue {
  isInvalid?: boolean;
  size?: "sm" | "default" | "lg";
}

const InputOTPUIContext = React.createContext<InputOTPUIContextValue>({
  isInvalid: false,
  size: "default",
});

/* -------------------------------------------------------------------------- */
/* Input OTP Components                                                       */
/* -------------------------------------------------------------------------- */

export interface InputOTPProps extends React.ComponentProps<typeof OTPInput> {
  containerClassName?: string;
  invalid?: boolean;
  size?: "sm" | "default" | "lg";
}

export function InputOTP({
  className,
  containerClassName,
  disabled: propDisabled,
  required: propRequired,
  invalid: propInvalid,
  id: propId,
  size = "default",
  ...props
}: InputOTPProps) {
  const fieldProps = useFieldControlProps({
    id: propId,
    disabled: propDisabled,
    required: propRequired,
    "aria-invalid": propInvalid,
  });

  const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
  const isDisabled = Boolean(propDisabled || fieldProps.disabled);
  const isRequired = Boolean(propRequired || fieldProps.required);

  return (
    <InputOTPUIContext.Provider value={{ isInvalid, size }}>
      <OTPInput
        data-slot="input-otp"
        data-invalid={isInvalid ? "true" : undefined}
        id={fieldProps.id}
        aria-describedby={fieldProps["aria-describedby"]}
        aria-invalid={isInvalid ? "true" : undefined}
        disabled={isDisabled}
        required={isRequired}
        containerClassName={cn(
          "flex items-center gap-1.5 sm:gap-2 has-disabled:opacity-40 has-disabled:cursor-not-allowed select-none",
          containerClassName
        )}
        spellCheck={false}
        autoComplete="one-time-code"
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    </InputOTPUIContext.Provider>
  );
}

export function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center shadow-2xs isolate",
        className
      )}
      {...props}
    />
  );
}

export interface InputOTPSlotProps extends React.ComponentProps<"div"> {
  index: number;
}

export function InputOTPSlot({
  index,
  className,
  ...props
}: InputOTPSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const uiContext = React.useContext(InputOTPUIContext);

  const slot = inputOTPContext?.slots[index];
  const char = slot?.char ?? null;
  const hasFakeCaret = slot?.hasFakeCaret ?? false;
  const isActive = slot?.isActive ?? false;
  const isInvalid = Boolean(props["aria-invalid"] || uiContext.isInvalid);
  const size = uiContext.size || "default";

  const sizeClasses = {
    sm: "size-8 sm:size-9 text-xs sm:text-sm",
    default: "size-9 sm:size-10.5 text-sm sm:text-base",
    lg: "size-11 sm:size-12 text-base sm:text-lg",
  }[size];

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive ? "true" : undefined}
      data-invalid={isInvalid ? "true" : undefined}
      className={cn(
        // Physical optical slot channel
        "relative flex items-center justify-center font-semibold text-foreground transition-all duration-150 outline-none select-none",
        sizeClasses,
        "bg-black/[0.04] dark:bg-white/[0.06] backdrop-blur-md",
        "border-y border-r border-black/15 dark:border-white/18",
        "shadow-[inset_0_1px_1.5px_0_rgba(0,0,0,0.08),0_1px_1px_0_rgba(255,255,255,0.7)]",
        "dark:shadow-[inset_0_1px_1.5px_0_rgba(0,0,0,0.5),0_1px_1px_0_rgba(255,255,255,0.05)]",
        "first:rounded-l-xl first:border-l last:rounded-r-xl",
        // Active Focused Slot (Normal)
        isActive && !isInvalid && [
          "z-20 border-[var(--halo-focus-color)] ring-2 ring-[var(--halo-focus-color)] ring-offset-2 ring-offset-background halo-focus-ring",
          "bg-white/95 dark:bg-neutral-900/95",
        ],
        // Error / Invalid state
        isInvalid && [
          "border-destructive/70 text-destructive",
          "shadow-[inset_0_0_0_1px_rgba(239,68,68,0.25)]",
          // Active slot within Invalid state: distinct dual focus ring
          isActive && "z-20 border-destructive ring-2 ring-destructive/40 ring-offset-2 ring-offset-background bg-white/95 dark:bg-neutral-900/95",
        ],
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-0.5 animate-caret-blink bg-primary duration-1000 motion-reduce:animate-none" />
        </div>
      )}
    </div>
  );
}

export function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      aria-hidden="true"
      className={cn("flex items-center justify-center px-0.5 sm:px-1 text-muted-foreground select-none", className)}
      {...props}
    >
      <HaloIcon icon={MinusSignIcon} size={14} strokeWidth={2} />
    </div>
  );
}

export default InputOTP;

