"use client";

import * as React from "react";
import {
  URLField,
  type URLValueDetails,
} from "@/components/ui/url-field";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* 1. Primary URL Field Demo                                                  */
/* -------------------------------------------------------------------------- */
export function PrimaryURLFieldDemo() {
  const [url, setUrl] = React.useState<string>("https://example.com");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="primary-url-field">
        <FieldLabel htmlFor="primary-url-input" className="text-sm font-semibold">
          Website
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Enter the full URL for your personal or company website.
        </FieldDescription>
        <URLField
          id="primary-url-input"
          value={url}
          onValueChange={setUrl}
          placeholder="https://example.com"
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Complex URL Demo (Port, Path, Query, Fragment)                          */
/* -------------------------------------------------------------------------- */
export function ComplexURLDemo() {
  const [url, setUrl] = React.useState<string>(
    "https://example.com:8443/api/v1/search?query=haloui&sort=desc#results"
  );
  const [details, setDetails] = React.useState<URLValueDetails | null>(null);

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm space-y-4">
      <Field id="complex-url-field">
        <FieldLabel htmlFor="complex-url-input" className="text-sm font-semibold">
          API Endpoint
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Full URL containing port, pathname, search query parameters, and hash fragment.
        </FieldDescription>
        <URLField
          id="complex-url-input"
          value={url}
          onValueChange={(val, d) => {
            setUrl(val);
            setDetails(d);
          }}
        />
        <div className="mt-3 p-3 rounded-lg border border-border/40 bg-muted/30 grid grid-cols-2 gap-2 text-xs font-mono">
          <div><span className="text-muted-foreground">Port:</span> {details?.port || "8443"}</div>
          <div><span className="text-muted-foreground">Query:</span> {details?.search || "?query=..."}</div>
          <div><span className="text-muted-foreground">Hash:</span> {details?.hash || "#results"}</div>
          <div><span className="text-muted-foreground">Path:</span> {details?.pathname || "/api/v1/..."}</div>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Long URL Demo (Horizontal Scrolling & Zero Overflow)                    */
/* -------------------------------------------------------------------------- */
export function LongURLDemo() {
  const longUrl =
    "https://developer.mozilla.org/en-US/docs/Web/API/URL_API/Resolving_relative_references#resolving_relative_references_with_the_url_constructor_and_the_base_parameter_example_with_special_characters_and_long_paths";

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm space-y-3">
      <Field id="long-url-field">
        <FieldLabel htmlFor="long-url-input" className="text-sm font-semibold">
          Documentation Deep Link
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Long URLs remain contained inside the control without causing page-level overflow.
        </FieldDescription>
        <URLField
          id="long-url-input"
          defaultValue={longUrl}
          placeholder="https://..."
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Normalization on Blur Demo                                              */
/* -------------------------------------------------------------------------- */
export function NormalizedOnBlurDemo() {
  const [url, setUrl] = React.useState<string>("github.com/haloui");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm space-y-3">
      <Field id="norm-url-field">
        <FieldLabel htmlFor="norm-url-input" className="text-sm font-semibold">
          Repository URL
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Type a domain like "github.com" and click outside. The field automatically prepends "https://" on blur without fighting your typing.
        </FieldDescription>
        <URLField
          id="norm-url-input"
          value={url}
          onValueChange={setUrl}
          normalizeOnBlur
        />
        <div className="mt-2 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            Current value: "{url}"
          </span>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Invalid URL Demo                                                        */
/* -------------------------------------------------------------------------- */
export function InvalidURLDemo() {
  const [url, setUrl] = React.useState<string>("not-a-valid-url");

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-destructive/30 bg-destructive/5 backdrop-blur-md shadow-sm">
      <Field id="invalid-url-field" invalid>
        <FieldLabel htmlFor="invalid-url-input" className="text-sm font-semibold text-destructive">
          Webhook URL
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Syntactically malformed URL lacking scheme and domain structure.
        </FieldDescription>
        <URLField
          id="invalid-url-input"
          value={url}
          onValueChange={setUrl}
          invalid
        />
        <FieldError className="mt-2.5 text-xs text-destructive">
          Please enter a valid URL beginning with https:// or http://.
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Read-Only URL Demo                                                      */
/* -------------------------------------------------------------------------- */
export function ReadOnlyURLDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
      <Field id="readonly-url-field">
        <FieldLabel htmlFor="readonly-url-input" className="text-sm font-semibold text-muted-foreground">
          Canonical Link
        </FieldLabel>
        <FieldDescription className="text-xs text-muted-foreground mb-3">
          Immutable link; remains selectable and copyable.
        </FieldDescription>
        <URLField
          id="readonly-url-input"
          defaultValue="https://haloui.dev/components/url-field"
          readOnly
        />
      </Field>
    </div>
  );
}
