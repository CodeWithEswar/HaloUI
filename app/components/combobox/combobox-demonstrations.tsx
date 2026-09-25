"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

const FRAMEWORKS = [
  { label: "Angular", value: "angular" },
  { label: "Astro", value: "astro" },
  { label: "Next.js", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Svelte", value: "svelte" },
  { label: "Vue", value: "vue" },
];

/* -------------------------------------------------------------------------- */
/* 1. Primary Framework Search & Selection Demo                               */
/* -------------------------------------------------------------------------- */

export function PrimaryFrameworkComboboxDemo() {
  const [value, setValue] = React.useState<string | null>("react");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-combo-framework">
        <FieldLabel htmlFor="demo-combo-input">Deploy template</FieldLabel>
        <Combobox
          value={value}
          onValueChange={(val) => setValue(val)}
        >
          <ComboboxInput
            id="demo-combo-input"
            placeholder="Search frameworks..."
            aria-describedby="demo-combo-desc"
          />
          <ComboboxContent>
            <ComboboxList>
              {FRAMEWORKS.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.label}>
                  {fw.label}
                </ComboboxItem>
              ))}
              <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <FieldDescription id="demo-combo-desc">
          Type to filter available templates or use arrow keys to navigate options.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Grouped Categories Demo                                                */
/* -------------------------------------------------------------------------- */

export function GroupedComboboxDemo() {
  const [tech, setTech] = React.useState<string | null>("Rust");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-combo-grouped">
        <FieldLabel htmlFor="demo-combo-grouped-input">Technology stack</FieldLabel>
        <Combobox value={tech} onValueChange={(val) => setTech(val)}>
          <ComboboxInput
            id="demo-combo-grouped-input"
            placeholder="Search tech stack..."
            aria-describedby="demo-combo-grouped-desc"
          />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxLabel>Frontend Frameworks</ComboboxLabel>
                <ComboboxItem value="React">React</ComboboxItem>
                <ComboboxItem value="Vue">Vue</ComboboxItem>
                <ComboboxItem value="Svelte">Svelte</ComboboxItem>
              </ComboboxGroup>
              <ComboboxSeparator />
              <ComboboxGroup>
                <ComboboxLabel>System Languages</ComboboxLabel>
                <ComboboxItem value="Rust">Rust</ComboboxItem>
                <ComboboxItem value="Go">Go</ComboboxItem>
                <ComboboxItem value="TypeScript">TypeScript</ComboboxItem>
              </ComboboxGroup>
              <ComboboxEmpty>No technologies match query.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <FieldDescription id="demo-combo-grouped-desc">
          Categorized options preserve group labels while filtering query matches.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Interaction States (Placeholder, Selected, Invalid, Disabled)           */
/* -------------------------------------------------------------------------- */

export function ComboboxStatesDemo() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. Empty / Placeholder State */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="combo-state-empty">
          <FieldLabel htmlFor="combo-input-empty">Empty Query</FieldLabel>
          <Combobox>
            <ComboboxInput
              id="combo-input-empty"
              placeholder="Search databases..."
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxItem value="PostgreSQL">PostgreSQL</ComboboxItem>
                <ComboboxItem value="ClickHouse">ClickHouse</ComboboxItem>
                <ComboboxItem value="Redis">Redis</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>Displays placeholder text until input is focused or typed.</FieldDescription>
        </Field>
      </div>

      {/* 2. Pre-selected Value */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="combo-state-selected">
          <FieldLabel htmlFor="combo-input-selected">Committed Selection</FieldLabel>
          <Combobox defaultValue="ClickHouse">
            <ComboboxInput id="combo-input-selected" />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxItem value="PostgreSQL">PostgreSQL</ComboboxItem>
                <ComboboxItem value="ClickHouse">ClickHouse</ComboboxItem>
                <ComboboxItem value="Redis">Redis</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>Initial committed choice initialized via defaultValue.</FieldDescription>
        </Field>
      </div>

      {/* 3. Invalid + Focused (Dual Indicator) */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="combo-state-invalid" invalid>
          <FieldLabel htmlFor="combo-input-invalid" required>
            Security enclave (Invalid)
          </FieldLabel>
          <Combobox>
            <ComboboxInput
              id="combo-input-invalid"
              placeholder="Choose mandatory enclave..."
              aria-invalid="true"
              aria-describedby="combo-state-invalid-err"
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxItem value="Nitro Enclave (AWS)">Nitro Enclave (AWS)</ComboboxItem>
                <ComboboxItem value="Confidential VM (GCP)">Confidential VM (GCP)</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldError id="combo-state-invalid-err">
            You must commit a verified security enclave zone.
          </FieldError>
        </Field>
      </div>

      {/* 4. Disabled State */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="combo-state-disabled" disabled>
          <FieldLabel htmlFor="combo-input-disabled">Subscription cluster (Disabled)</FieldLabel>
          <Combobox disabled defaultValue="Multi-Region Active">
            <ComboboxInput id="combo-input-disabled" disabled />
          </Combobox>
          <FieldDescription>Disabled input and trigger prevent popup open and query typing.</FieldDescription>
        </Field>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Controlled State (Query vs Value Separation)                            */
/* -------------------------------------------------------------------------- */

export function ControlledComboboxDemo() {
  const [value, setValue] = React.useState<string | null>("React");
  const [query, setQuery] = React.useState("React");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl space-y-4", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-controlled-combo">
        <FieldLabel htmlFor="demo-controlled-combo-input">Workspace architecture</FieldLabel>
        <Combobox
          value={value}
          onValueChange={(val) => {
            setValue(val);
            if (val) setQuery(val);
          }}
          inputValue={query}
          onInputValueChange={(q) => setQuery(q)}
        >
          <ComboboxInput
            id="demo-controlled-combo-input"
            placeholder="Type or select..."
            showClear
          />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem value="React">React (Client/Server)</ComboboxItem>
              <ComboboxItem value="Remix">Remix (Web Standards)</ComboboxItem>
              <ComboboxItem value="Next.js">Next.js (App Router)</ComboboxItem>
              <ComboboxItem value="Astro">Astro (Content Islands)</ComboboxItem>
              <ComboboxEmpty>No frameworks match &quot;{query}&quot;</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
          <span className="block text-muted-foreground mb-1">Active Query:</span>
          <code className="font-mono text-foreground font-semibold">&quot;{query}&quot;</code>
        </div>
        <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
          <span className="block text-muted-foreground mb-1">Committed Value:</span>
          <code className="font-mono text-foreground font-semibold">&quot;{value}&quot;</code>
        </div>
      </div>
    </div>
  );
}
