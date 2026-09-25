"use client";

import * as React from "react";
import { FileInput } from "@/components/ui/file-input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all p-5 sm:p-7 rounded-2xl";

/* -------------------------------------------------------------------------- */
/* 1. Primary File Input Demo (Section 124)                                   */
/* -------------------------------------------------------------------------- */

export function PrimaryFileInputDemo() {
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);

  return (
    <div className={cn("w-full max-w-md mx-auto space-y-4", DEMO_CONTAINER_GLASS)}>
      <Field id="attachment-field">
        <FieldLabel htmlFor="attachment-input">Attachment</FieldLabel>
        <FieldDescription>
          Choose a file to attach.
        </FieldDescription>
        <FileInput
          id="attachment-input"
          onFilesChange={(files) => setSelectedNames(files.map((f) => f.name))}
        />
      </Field>
      {selectedNames.length > 0 && (
        <div className="text-xs text-muted-foreground font-mono bg-muted/40 p-2.5 rounded-lg border border-border">
          Locally selected: {selectedNames.join(", ")}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Image Accept Preview Demo (Section 125)                                 */
/* -------------------------------------------------------------------------- */

export function ImageAcceptDemo() {
  const [fileCount, setFileCount] = React.useState<number>(0);

  return (
    <div className={cn("w-full max-w-md mx-auto space-y-4", DEMO_CONTAINER_GLASS)}>
      <Field id="avatar-field">
        <FieldLabel htmlFor="avatar-input">Profile Photo</FieldLabel>
        <FieldDescription>
          Choose an image file (PNG, JPG, WebP, SVG). The native picker will filter non-image formats.
        </FieldDescription>
        <FileInput
          id="avatar-input"
          accept="image/*"
          onFilesChange={(files) => setFileCount(files.length)}
        />
      </Field>
      {fileCount > 0 && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          Ready for local form submission ({fileCount} image selected).
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Multiple Files Selection Demo (Section 126)                             */
/* -------------------------------------------------------------------------- */

export function MultipleFilesDemo() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div className={cn("w-full max-w-md mx-auto space-y-4", DEMO_CONTAINER_GLASS)}>
      <Field id="documents-field">
        <FieldLabel htmlFor="documents-input">Supporting Documents</FieldLabel>
        <FieldDescription>
          Select one or more files from your device.
        </FieldDescription>
        <FileInput
          id="documents-input"
          multiple
          onFilesChange={setFiles}
        />
      </Field>
      {files.length > 0 && (
        <div className="text-xs text-muted-foreground font-mono bg-muted/40 p-2.5 rounded-lg border border-border space-y-1">
          <p className="font-semibold text-foreground">
            {files.length} {files.length === 1 ? "file" : "files"} selected:
          </p>
          <ul className="list-disc pl-4 space-y-0.5">
            {files.map((file, idx) => (
              <li key={`${file.name}-${idx}`} className="truncate">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Sizing Variants Demo                                                    */
/* -------------------------------------------------------------------------- */

export function SizeVariantsFileInputDemo() {
  return (
    <div className={cn("w-full max-w-lg mx-auto space-y-6", DEMO_CONTAINER_GLASS)}>
      <Field id="sm-file-field">
        <FieldLabel htmlFor="sm-file-input" className="text-xs font-semibold">
          Small (sm) — Compact Dialogs & Sidebar Panels
        </FieldLabel>
        <FileInput id="sm-file-input" size="sm" />
      </Field>

      <Field id="def-file-field">
        <FieldLabel htmlFor="def-file-input" className="text-sm font-semibold">
          Default — Standard Form Workflows
        </FieldLabel>
        <FileInput id="def-file-input" size="default" />
      </Field>

      <Field id="lg-file-field">
        <FieldLabel htmlFor="lg-file-input" className="text-base font-semibold">
          Large (lg) — Prominent Onboarding & File Upload Forms
        </FieldLabel>
        <FileInput id="lg-file-input" size="lg" />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Required and Invalid State Demo                                         */
/* -------------------------------------------------------------------------- */

export function InvalidFileInputDemo() {
  return (
    <div className={cn("w-full max-w-md mx-auto space-y-4", DEMO_CONTAINER_GLASS)}>
      <Field id="invalid-file-field" aria-invalid="true">
        <FieldLabel htmlFor="invalid-file-input">
          Identity Document <span className="text-destructive">*</span>
        </FieldLabel>
        <FieldDescription>
          Government-issued ID or passport scan required for verification.
        </FieldDescription>
        <FileInput
          id="invalid-file-input"
          required
          invalid
          accept=".pdf,.png,.jpg"
        />
        <FieldError>
          Please select a valid identity document to proceed with verification.
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Disabled State Demo                                                     */
/* -------------------------------------------------------------------------- */

export function DisabledFileInputDemo() {
  return (
    <div className={cn("w-full max-w-md mx-auto space-y-4", DEMO_CONTAINER_GLASS)}>
      <Field id="disabled-file-field" disabled>
        <FieldLabel htmlFor="disabled-file-input">Archived Attachment</FieldLabel>
        <FieldDescription>
          File selection is locked because this record has been finalized.
        </FieldDescription>
        <FileInput
          id="disabled-file-input"
          disabled
        />
      </Field>
    </div>
  );
}
