"use client";

import * as React from "react";
import { TagInput } from "@/components/ui/tag-input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* 1. Primary Tag Input Demo (Section 53)                                     */
/* -------------------------------------------------------------------------- */

export function PrimaryTagInputDemo() {
  const [tags, setTags] = React.useState<string[]>([
    "React",
    "TypeScript",
  ]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Field id="skills-field">
        <FieldLabel htmlFor="skills-input">Skills</FieldLabel>
        <FieldDescription>
          Add technologies or areas of expertise.
        </FieldDescription>
        <TagInput
          id="skills-input"
          value={tags}
          onValueChange={setTags}
          placeholder="e.g. Accessibility..."
        />
      </Field>
      <div className="text-xs text-muted-foreground font-mono bg-muted/40 p-2.5 rounded-lg border border-border">
        Active tags: {JSON.stringify(tags)}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Empty Tag Input Demo (Section 54)                                       */
/* -------------------------------------------------------------------------- */

export function EmptyTagInputDemo() {
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Field id="empty-tags-field">
        <FieldLabel htmlFor="empty-tags-input">Interests</FieldLabel>
        <FieldDescription>
          No tags committed yet. Type an interest and press Enter.
        </FieldDescription>
        <TagInput
          id="empty-tags-input"
          value={tags}
          onValueChange={setTags}
          placeholder="Add your interests (e.g. Design, Web Performance)..."
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Multiple Tags & Wrapping Demo (Section 55)                              */
/* -------------------------------------------------------------------------- */

export function WrappingTagInputDemo() {
  const [tags, setTags] = React.useState<string[]>([
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Web Performance",
    "Design Systems",
    "Accessibility",
    "GraphQL",
    "Node.js",
  ]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Field id="wrapping-tags-field">
        <FieldLabel htmlFor="wrapping-tags-input">Extensive Stack</FieldLabel>
        <FieldDescription>
          Demonstrates responsive wrapping across multiple rows without horizontal page overflow.
        </FieldDescription>
        <TagInput
          id="wrapping-tags-input"
          value={tags}
          onValueChange={setTags}
          placeholder="Add another technology..."
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Long Tag Containment Demo (Section 56)                                  */
/* -------------------------------------------------------------------------- */

export function LongTagInputDemo() {
  const [tags, setTags] = React.useState<string[]>([
    "Normal Tag",
    "internationalization-and-localization-workflow-orchestrator-configuration",
    "Short Tag",
  ]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Field id="long-tags-field">
        <FieldLabel htmlFor="long-tags-input">Long Token Containment</FieldLabel>
        <FieldDescription>
          Long tags truncate cleanly with ellipsis while keeping removal reachable and full text inspectable via title attribute.
        </FieldDescription>
        <TagInput
          id="long-tags-input"
          value={tags}
          onValueChange={setTags}
          placeholder="Add token..."
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Size Variants Demo                                                      */
/* -------------------------------------------------------------------------- */

export function SizeVariantsTagInputDemo() {
  const [smTags, setSmTags] = React.useState<string[]>(["v1.0", "stable"]);
  const [defTags, setDefTags] = React.useState<string[]>(["Frontend", "Design System"]);
  const [lgTags, setLlgTags] = React.useState<string[]>(["Enterprise", "Cloud Native"]);

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <Field id="sm-tag-field">
        <FieldLabel htmlFor="sm-tag-input" className="text-xs font-semibold">
          Small (sm) — Compact Filters / Table Cell
        </FieldLabel>
        <TagInput
          id="sm-tag-input"
          size="sm"
          value={smTags}
          onValueChange={setSmTags}
          placeholder="Add version..."
        />
      </Field>

      <Field id="def-tag-field">
        <FieldLabel htmlFor="def-tag-input" className="text-sm font-semibold">
          Default — Standard Form Fields
        </FieldLabel>
        <TagInput
          id="def-tag-input"
          size="default"
          value={defTags}
          onValueChange={setDefTags}
          placeholder="Add category..."
        />
      </Field>

      <Field id="lg-tag-field">
        <FieldLabel htmlFor="lg-tag-input" className="text-base font-semibold">
          Large (lg) — Hero Search & Modal Workflows
        </FieldLabel>
        <TagInput
          id="lg-tag-input"
          size="lg"
          value={lgTags}
          onValueChange={setLlgTags}
          placeholder="Add deployment target..."
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Max Tags and Duplicate Prevention Demo (Section 57)                     */
/* -------------------------------------------------------------------------- */

export function MaxTagsAndValidationDemo() {
  const [tags, setTags] = React.useState<string[]>(["Architecture", "Security"]);
  const [notice, setNotice] = React.useState<string | null>(null);

  const handleDuplicate = (dup: string) => {
    setNotice(`Duplicate rejected: "${dup}" is already present.`);
    setTimeout(() => setNotice(null), 3500);
  };

  const isAtLimit = tags.length >= 4;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Field id="max-tags-field">
        <FieldLabel htmlFor="max-tags-input">
          Topic Badges (Max 4, No Duplicates)
        </FieldLabel>
        <FieldDescription>
          Type keyword and press Enter or comma. Duplicate entries are automatically prevented.
        </FieldDescription>
        <TagInput
          id="max-tags-input"
          value={tags}
          onValueChange={setTags}
          maxTags={4}
          allowDuplicates={false}
          onDuplicate={handleDuplicate}
          placeholder={isAtLimit ? "Tag limit reached (4/4)" : "Add topic..."}
        />
        {notice && (
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {notice}
          </p>
        )}
        <div className="flex justify-between text-xs text-muted-foreground pt-1">
          <span>{tags.length} of 4 maximum tags</span>
          {isAtLimit && <span className="text-amber-500 font-medium">Limit reached</span>}
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Delimiter and Multi-Tag Paste Demo                                      */
/* -------------------------------------------------------------------------- */

export function DelimiterAndPasteDemo() {
  const [tags, setTags] = React.useState<string[]>(["admin", "moderator"]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Field id="delimiter-tags-field">
        <FieldLabel htmlFor="delimiter-tags-input">
          Permission Scopes (Supports Bulk Paste)
        </FieldLabel>
        <FieldDescription>
          Copy and paste comma or newline-separated strings (e.g. <code className="bg-muted px-1 py-0.5 rounded text-[11px]">read, write, execute</code>).
        </FieldDescription>
        <TagInput
          id="delimiter-tags-input"
          value={tags}
          onValueChange={setTags}
          delimiters={[",", ";"]}
          addOnBlur={true}
          placeholder="Paste or type scopes..."
        />
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. Invalid State with Field Integration Demo                               */
/* -------------------------------------------------------------------------- */

export function InvalidTagInputDemo() {
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Field id="invalid-tags-field" aria-invalid="true">
        <FieldLabel htmlFor="invalid-tags-input">Mandatory Skills</FieldLabel>
        <FieldDescription>
          Add at least one technical qualification.
        </FieldDescription>
        <TagInput
          id="invalid-tags-input"
          value={tags}
          onValueChange={setTags}
          invalid
          placeholder="Required: add at least one skill..."
        />
        <FieldError>
          At least one skill is required to proceed.
        </FieldError>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. Disabled and Read-Only State Demo                                       */
/* -------------------------------------------------------------------------- */

export function DisabledAndReadOnlyDemo() {
  const readOnlyTags = ["Production", "Protected Branch", "Multi-Region"];
  const disabledTags = ["Legacy API", "Deprecated v1"];

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Field id="readonly-tags-field">
        <FieldLabel htmlFor="readonly-tags-input">Read-Only Tags</FieldLabel>
        <FieldDescription>
          Content is inspectable and accessible, but tokens cannot be removed or added.
        </FieldDescription>
        <TagInput
          id="readonly-tags-input"
          value={readOnlyTags}
          readOnly
        />
      </Field>

      <Field id="disabled-tags-field" disabled>
        <FieldLabel htmlFor="disabled-tags-input">Disabled Control</FieldLabel>
        <FieldDescription>
          Dimmed opacity with user interaction completely inhibited.
        </FieldDescription>
        <TagInput
          id="disabled-tags-input"
          value={disabledTags}
          disabled
        />
      </Field>
    </div>
  );
}
