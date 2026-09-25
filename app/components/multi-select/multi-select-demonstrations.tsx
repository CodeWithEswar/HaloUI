"use client";

import * as React from "react";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectInput,
  MultiSelectContent,
  MultiSelectList,
  MultiSelectItem,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectSeparator,
  MultiSelectEmpty,
  MultiSelectClear,
  MultiSelectChevron,
} from "@/components/ui/multi-select";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

const FRAMEWORKS = [
  { label: "Angular", value: "Angular" },
  { label: "Astro", value: "Astro" },
  { label: "Next.js", value: "Next.js" },
  { label: "Nuxt", value: "Nuxt" },
  { label: "React", value: "React" },
  { label: "Remix", value: "Remix" },
  { label: "Svelte", value: "Svelte" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Vue", value: "Vue" },
];

/* -------------------------------------------------------------------------- */
/* 1. Primary Framework Multi Select Demo                                     */
/* -------------------------------------------------------------------------- */

export function PrimaryMultiSelectDemo() {
  const [selected, setSelected] = React.useState<string[]>(["React", "TypeScript"]);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-multi-primary">
        <FieldLabel htmlFor="demo-multi-input">Required frameworks</FieldLabel>
        <MultiSelect
          value={selected}
          onValueChange={(vals) => setSelected(vals)}
        >
          <MultiSelectTrigger>
            <MultiSelectValue />
            <MultiSelectInput
              id="demo-multi-input"
              placeholder={selected.length === 0 ? "Select frameworks..." : "Add more..."}
              aria-describedby="demo-multi-primary-desc"
            />
            {selected.length > 0 && <MultiSelectClear />}
            <MultiSelectChevron />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectList>
              {FRAMEWORKS.map((fw) => (
                <MultiSelectItem key={fw.value} value={fw.value}>
                  {fw.label}
                </MultiSelectItem>
              ))}
              <MultiSelectEmpty>No matching frameworks.</MultiSelectEmpty>
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>
        <FieldDescription id="demo-multi-primary-desc">
          Search and pick multiple technologies. Selected values become removable tokens.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Grouped Multi Select Demo                                              */
/* -------------------------------------------------------------------------- */

export function GroupedMultiSelectDemo() {
  const [stack, setStack] = React.useState<string[]>(["Next.js", "Tailwind CSS"]);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-multi-grouped">
        <FieldLabel htmlFor="demo-multi-grouped-input">Project capabilities</FieldLabel>
        <MultiSelect value={stack} onValueChange={(val) => setStack(val)}>
          <MultiSelectTrigger>
            <MultiSelectValue />
            <MultiSelectInput
              id="demo-multi-grouped-input"
              placeholder="Search technologies..."
              aria-describedby="demo-multi-grouped-desc"
            />
            <MultiSelectChevron />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectList>
              <MultiSelectGroup>
                <MultiSelectLabel>Frameworks & Runtimes</MultiSelectLabel>
                <MultiSelectItem value="Next.js">Next.js</MultiSelectItem>
                <MultiSelectItem value="React">React</MultiSelectItem>
                <MultiSelectItem value="Node.js">Node.js</MultiSelectItem>
                <MultiSelectItem value="Bun">Bun</MultiSelectItem>
              </MultiSelectGroup>
              <MultiSelectSeparator />
              <MultiSelectGroup>
                <MultiSelectLabel>Styling & Design</MultiSelectLabel>
                <MultiSelectItem value="Tailwind CSS">Tailwind CSS</MultiSelectItem>
                <MultiSelectItem value="Framer Motion">Framer Motion</MultiSelectItem>
                <MultiSelectItem value="Halo UI">Halo UI</MultiSelectItem>
              </MultiSelectGroup>
              <MultiSelectSeparator />
              <MultiSelectGroup>
                <MultiSelectLabel>Databases & Cloud</MultiSelectLabel>
                <MultiSelectItem value="PostgreSQL">PostgreSQL</MultiSelectItem>
                <MultiSelectItem value="Redis">Redis</MultiSelectItem>
                <MultiSelectItem value="Cloudflare Workers">Cloudflare Workers</MultiSelectItem>
              </MultiSelectGroup>
              <MultiSelectEmpty>No capabilities match your query.</MultiSelectEmpty>
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>
        <FieldDescription id="demo-multi-grouped-desc">
          Organized by engineering categories with keyboard-navigable list groups.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Token Wrapping & Overflow Stress Test                                   */
/* -------------------------------------------------------------------------- */

const MANY_TAGS = [
  "Microservices Architecture",
  "Zero-Knowledge Proofs",
  "High-Throughput Ingestion Pipeline",
  "WebAssembly Runtime",
  "Distributed Tracing",
  "Continuous Deployment Engine",
  "Real-Time WebSocket Synchronization",
];

export function TokenOverflowDemo() {
  const [tokens, setTokens] = React.useState<string[]>([
    "Microservices Architecture",
    "Zero-Knowledge Proofs",
    "High-Throughput Ingestion Pipeline",
    "WebAssembly Runtime",
  ]);

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-multi-overflow">
        <div className="flex items-center justify-between mb-1.5">
          <FieldLabel htmlFor="demo-multi-overflow-input">Tags & Topics</FieldLabel>
          <span className="text-xs text-muted-foreground">{tokens.length} selected</span>
        </div>
        <MultiSelect value={tokens} onValueChange={(val) => setTokens(val)}>
          <MultiSelectTrigger>
            <MultiSelectValue />
            <MultiSelectInput
              id="demo-multi-overflow-input"
              placeholder={tokens.length === 0 ? "Select topics..." : "Add topic..."}
            />
            {tokens.length > 0 && <MultiSelectClear />}
            <MultiSelectChevron />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectList>
              {MANY_TAGS.map((tag) => (
                <MultiSelectItem key={tag} value={tag}>
                  {tag}
                </MultiSelectItem>
              ))}
              <MultiSelectEmpty>No topics found.</MultiSelectEmpty>
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>
        <div className="flex items-center justify-between pt-2">
          <FieldDescription>
            Selected tokens wrap naturally using responsive CSS layout without layout shifts.
          </FieldDescription>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTokens([])}
            disabled={tokens.length === 0}
            className="text-xs shrink-0"
          >
            Clear tokens
          </Button>
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Form Validation & Dual-Indicator Invalid State                          */
/* -------------------------------------------------------------------------- */

export function InvalidMultiSelectDemo() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const isInvalid = selected.length === 0;

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-multi-invalid" invalid={isInvalid}>
        <FieldLabel htmlFor="demo-multi-invalid-input" required>
          Required security scopes
        </FieldLabel>
        <MultiSelect
          value={selected}
          onValueChange={(val) => setSelected(val)}
          invalid={isInvalid}
        >
          <MultiSelectTrigger>
            <MultiSelectValue />
            <MultiSelectInput
              id="demo-multi-invalid-input"
              placeholder="Select required scopes..."
              aria-describedby="demo-multi-invalid-err"
            />
            <MultiSelectChevron />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectList>
              <MultiSelectItem value="read:users">read:users</MultiSelectItem>
              <MultiSelectItem value="write:users">write:users</MultiSelectItem>
              <MultiSelectItem value="admin:org">admin:org</MultiSelectItem>
              <MultiSelectItem value="audit:log">audit:log</MultiSelectItem>
              <MultiSelectEmpty>No scopes available.</MultiSelectEmpty>
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>
        {isInvalid ? (
          <FieldError id="demo-multi-invalid-err">
            At least one authorization scope must be committed to create this token.
          </FieldError>
        ) : (
          <FieldDescription>
            Valid authorization scopes successfully selected.
          </FieldDescription>
        )}
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Disabled State & Disabled Options                                       */
/* -------------------------------------------------------------------------- */

export function DisabledMultiSelectDemo() {
  const [selected] = React.useState<string[]>(["Production", "Read Only"]);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-multi-disabled" disabled>
        <FieldLabel htmlFor="demo-multi-disabled-input">Protected environments (Locked)</FieldLabel>
        <MultiSelect value={selected} disabled>
          <MultiSelectTrigger>
            <MultiSelectValue />
            <MultiSelectInput
              id="demo-multi-disabled-input"
              placeholder="Locked control..."
              aria-describedby="demo-multi-disabled-desc"
            />
            <MultiSelectChevron />
          </MultiSelectTrigger>
        </MultiSelect>
        <FieldDescription id="demo-multi-disabled-desc">
          When the root is disabled, token removal and popup discovery are completely inaccessible.
        </FieldDescription>
      </Field>
    </div>
  );
}
