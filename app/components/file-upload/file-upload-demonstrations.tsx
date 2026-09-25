"use client";

import * as React from "react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  type UploadHandler,
} from "@/components/ui/file-upload";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

// Simulated client-side upload handler (for demonstration only; transport is app-owned)
const createSimulatedUploader = (options?: {
  failRate?: number;
  determinate?: boolean;
}): UploadHandler => {
  return async (item, context) => {
    const isDeterminate = options?.determinate ?? true;
    const failRate = options?.failRate ?? 0;

    if (!isDeterminate) {
      // Indeterminate simulation: wait 2.5 seconds
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => {
          if (failRate > 0 && Math.random() < failRate) {
            reject(new Error("Network timeout: gateway unreachable."));
          } else {
            resolve();
          }
        }, 2200);

        context.abortSignal.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
      return;
    }

    // Determinate byte progress simulation
    let current = 0;
    while (current < 100) {
      if (context.abortSignal.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }
      await new Promise((r) => setTimeout(r, 120));
      current += Math.floor(Math.random() * 18) + 8;
      if (current > 100) current = 100;
      context.onProgress(current);

      if (current >= 80 && failRate > 0 && Math.random() < failRate) {
        throw new Error("HTTP 500: Remote storage cluster returned error.");
      }
    }
  };
};

/**
 * 1. Primary File Upload Demonstration
 */
export function PrimaryFileUploadDemo() {
  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-2xl border border-border/80 bg-card/40">
      <Field id="primary-upload-field">
        <FieldLabel>Project Assets</FieldLabel>
        <FieldDescription>
          Drag and drop compatible documents or images to upload into the workspace.
        </FieldDescription>
        <FileUpload
          multiple
          maxSize={10 * 1024 * 1024} // 10MB
          autoUpload
          onUpload={createSimulatedUploader()}
        >
          <FileUploadDropzone />
          <FileUploadList />
        </FileUpload>
      </Field>
    </div>
  );
}

/**
 * 2. Single File Upload Demonstration
 */
export function SingleFileUploadDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-2xl border border-border/80 bg-card/40">
      <Field id="avatar-upload-field">
        <FieldLabel>Profile Avatar</FieldLabel>
        <FieldDescription>
          Choose a single avatar image (.png, .jpg, .webp up to 2 MB).
        </FieldDescription>
        <FileUpload
          multiple={false}
          accept="image/png,image/jpeg,image/webp"
          maxSize={2 * 1024 * 1024}
          autoUpload
          onUpload={createSimulatedUploader()}
        >
          <FileUploadDropzone
            size="sm"
            heading={<span>Select profile image</span>}
            description="PNG, JPG, or WEBP up to 2MB"
          />
          <FileUploadList />
        </FileUpload>
      </Field>
    </div>
  );
}

/**
 * 3. Manual Queue Upload Demonstration
 */
export function ManualQueueUploadDemo() {
  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-2xl border border-border/80 bg-card/40">
      <Field id="manual-upload-field">
        <FieldLabel>Deployment Bundle</FieldLabel>
        <FieldDescription>
          Queue files locally, review the list, then initiate batch transfer.
        </FieldDescription>
        <FileUpload
          multiple
          autoUpload={false}
          onUpload={createSimulatedUploader({ determinate: true })}
        >
          <FileUploadDropzone />
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">Select files before submitting</span>
            <FileUploadTrigger className="text-xs">Browse Local Files</FileUploadTrigger>
          </div>
          <FileUploadList />
        </FileUpload>
      </Field>
    </div>
  );
}

/**
 * 4. Validation Rejection Demonstration
 */
export function ValidationFileUploadDemo() {
  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-2xl border border-border/80 bg-card/40">
      <Field id="validation-upload-field">
        <FieldLabel>PDF Invoices Only</FieldLabel>
        <FieldDescription>
          Strictly limited to .pdf documents under 1 MB. Max 3 files.
        </FieldDescription>
        <FileUpload
          multiple
          accept=".pdf,application/pdf"
          maxSize={1024 * 1024} // 1MB
          maxFiles={3}
          preventDuplicates
        >
          <FileUploadDropzone />
          <FileUploadList />
        </FileUpload>
      </Field>
    </div>
  );
}

/**
 * 5. Error & Retry Demonstration
 */
export function ErrorAndRetryUploadDemo() {
  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-2xl border border-border/80 bg-card/40">
      <Field id="error-upload-field">
        <FieldLabel>Unstable Network Simulation</FieldLabel>
        <FieldDescription>
          Simulates network failures. Click retry to recover individual failed items.
        </FieldDescription>
        <FileUpload
          multiple
          autoUpload
          onUpload={createSimulatedUploader({ failRate: 0.65 })}
        >
          <FileUploadDropzone />
          <FileUploadList />
        </FileUpload>
      </Field>
    </div>
  );
}

/**
 * 6. Disabled File Upload Demonstration
 */
export function DisabledFileUploadDemo() {
  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-2xl border border-border/80 bg-card/40 opacity-75">
      <Field id="disabled-upload-field" disabled>
        <FieldLabel>Archived Storage Container</FieldLabel>
        <FieldDescription>
          Upload operations are currently locked by the workspace administrator.
        </FieldDescription>
        <FileUpload disabled multiple>
          <FileUploadDropzone />
          <FileUploadList />
        </FileUpload>
      </Field>
    </div>
  );
}
