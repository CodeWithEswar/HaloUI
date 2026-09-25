"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Primary Checkbox Demo with Label & Description                          */
/* -------------------------------------------------------------------------- */

export function PrimaryCheckboxDemo() {
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(true);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-start gap-3">
        <Checkbox
          id="demo-primary-checkbox"
          checked={checked}
          onCheckedChange={setChecked}
          className="mt-0.5"
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="demo-primary-checkbox"
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Email notifications
          </Label>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Receive important account alerts, deployment reports, and security notices.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Indeterminate "Select All" Demo                                         */
/* -------------------------------------------------------------------------- */

interface FileItem {
  id: string;
  name: string;
  size: string;
  checked: boolean;
}

export function IndeterminateCheckboxDemo() {
  const [files, setFiles] = React.useState<FileItem[]>([
    { id: "f1", name: "README.md", size: "2.4 KB", checked: true },
    { id: "f2", name: "package.json", size: "1.8 KB", checked: false },
    { id: "f3", name: "tsconfig.json", size: "640 B", checked: true },
    { id: "f4", name: "halo-tokens.css", size: "8.2 KB", checked: false },
  ]);

  const allChecked = files.every((f) => f.checked);
  const someChecked = files.some((f) => f.checked);
  const parentState: boolean | "indeterminate" = allChecked
    ? true
    : someChecked
    ? "indeterminate"
    : false;

  const handleParentChange = () => {
    // If all or some are checked, toggle all off; otherwise toggle all on
    const nextValue = !allChecked;
    setFiles((prev) => prev.map((f) => ({ ...f, checked: nextValue })));
  };

  const handleChildChange = (id: string, nextChecked: boolean) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: nextChecked } : f))
    );
  };

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <div className="space-y-4">
        {/* Parent Checkbox */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Checkbox
              id="select-all-files"
              checked={parentState}
              onCheckedChange={handleParentChange}
            />
            <Label
              htmlFor="select-all-files"
              className="text-sm font-semibold text-foreground cursor-pointer"
            >
              Select all workspace files
            </Label>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {files.filter((f) => f.checked).length} of {files.length}
          </span>
        </div>

        {/* Child Checkboxes */}
        <div className="pl-6 space-y-2.5">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`file-${file.id}`}
                  checked={file.checked}
                  onCheckedChange={(val) => handleChildChange(file.id, val === true)}
                />
                <Label
                  htmlFor={`file-${file.id}`}
                  className="text-xs text-foreground font-mono cursor-pointer"
                >
                  {file.name}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">{file.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Field Integration & Validation Error Demo                               */
/* -------------------------------------------------------------------------- */

export function InvalidCheckboxDemo() {
  const [agreed, setAgreed] = React.useState<boolean | "indeterminate">(false);
  const isInvalid = agreed !== true;

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-terms-field" invalid={isInvalid}>
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms-agreement"
            checked={agreed}
            onCheckedChange={setAgreed}
            invalid={isInvalid}
            className="mt-0.5"
          />
          <div className="grid gap-1.5 leading-none">
            <FieldLabel htmlFor="terms-agreement" required className="cursor-pointer">
              I agree to the Terms of Service
            </FieldLabel>
            {isInvalid ? (
              <FieldError id="terms-err">
                You must accept the terms of service and license agreement to register.
              </FieldError>
            ) : (
              <FieldDescription>
                Thank you for accepting the developer license agreement.
              </FieldDescription>
            )}
          </div>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Disabled States Matrix Demo                                            */
/* -------------------------------------------------------------------------- */

export function DisabledCheckboxDemo() {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl space-y-4", DEMO_CONTAINER_GLASS)}>
      <div className="flex items-center gap-3 opacity-60">
        <Checkbox id="dis-unchecked" disabled />
        <Label htmlFor="dis-unchecked" className="text-xs text-foreground cursor-not-allowed">
          Disabled (Unchecked)
        </Label>
      </div>

      <div className="flex items-center gap-3 opacity-60">
        <Checkbox id="dis-checked" defaultChecked disabled />
        <Label htmlFor="dis-checked" className="text-xs text-foreground cursor-not-allowed">
          Disabled (Checked)
        </Label>
      </div>

      <div className="flex items-center gap-3 opacity-60">
        <Checkbox id="dis-indet" indeterminate disabled />
        <Label htmlFor="dis-indet" className="text-xs text-foreground cursor-not-allowed">
          Disabled (Indeterminate)
        </Label>
      </div>
    </div>
  );
}
