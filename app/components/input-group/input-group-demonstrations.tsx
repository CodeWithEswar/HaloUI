"use client";

import * as React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Search01Icon,
  Copy01Icon,
  Tick02Icon,
  Cancel01Icon,
  Globe02Icon,
  AlertCircleIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Website Semantic Prefix Demo                                            */
/* -------------------------------------------------------------------------- */

export function WebsitePrefixDemo() {
  const [domain, setDomain] = React.useState("company.design");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="ig-website">
        <FieldLabel htmlFor="ig-website">Organization website</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText className="font-mono text-xs">https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="ig-website"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="domain.com"
            aria-describedby="ig-website-desc"
          />
        </InputGroup>
        <FieldDescription id="ig-website-desc">
          The prefix &quot;https://&quot; provides context; the submitted value is &quot;{domain}&quot;.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Search Bar with Clear Action                                            */
/* -------------------------------------------------------------------------- */

export function IconSearchDemo() {
  const [search, setSearch] = React.useState("components/button");

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="ig-search">
        <FieldLabel htmlFor="ig-search">Search documentation</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <HaloIcon icon={Search01Icon} size={16} className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            id="ig-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search primitives, tokens..."
          />
          {search.length > 0 && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setSearch("")}
                aria-label="Clear search input"
              >
                <HaloIcon icon={Cancel01Icon} size={14} />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Action Addon: Read-Only Copy Snippet                                    */
/* -------------------------------------------------------------------------- */

export function ActionCopyDemo() {
  const [copied, setCopied] = React.useState(false);
  const snippet = "pnpm dlx shadcn@latest add http://localhost:3000/r/input-group.json";

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="ig-install-snippet">
        <FieldLabel htmlFor="ig-install-snippet">Registry install command</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="ig-install-snippet"
            readOnly
            defaultValue={snippet}
            className="font-mono text-xs"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              variant="outline"
              size="xs"
              onClick={handleCopy}
              aria-label={copied ? "Copied install command" : "Copy install command to clipboard"}
              className="gap-1.5"
            >
              <HaloIcon icon={copied ? Tick02Icon : Copy01Icon} size={13} className={copied ? "text-emerald-500" : ""} />
              <span>{copied ? "Copied" : "Copy"}</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          Read-only input allows selection and keyboard focus; trailing button triggers clipboard operation.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Dual Addons: Prefix + Suffix                                            */
/* -------------------------------------------------------------------------- */

export function PrefixAndSuffixDemo() {
  const [amount, setAmount] = React.useState("2,500");

  return (
    <div className={cn("w-full max-w-sm mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="ig-currency">
        <FieldLabel htmlFor="ig-currency">Funding threshold</FieldLabel>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="ig-currency"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText className="font-mono text-xs">USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Invalid State with Action Focus (Flagship Regression Fixture)           */
/* -------------------------------------------------------------------------- */

export function InvalidActionFocusedDemo() {
  const [tokenValue, setTokenValue] = React.useState("invalid_sk_live_token");
  const [copied, setCopied] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const actionButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
      {/* Test toolbar to shift focus explicitly */}
      <div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-muted/40 border border-border">
        <span className="text-muted-foreground flex items-center gap-1.5">
          <HaloIcon icon={AlertCircleIcon} size={14} className="text-destructive" />
          Flagship Regression Test
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.focus()}
            className="h-7 text-xs px-2.5"
          >
            Focus Input
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => actionButtonRef.current?.focus()}
            className="h-7 text-xs px-2.5"
          >
            Focus Action Button
          </Button>
        </div>
      </div>

      <div className={cn("p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="ig-invalid-action" invalid>
          <FieldLabel htmlFor="ig-invalid-action" required>
            Security token
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              ref={inputRef}
              id="ig-invalid-action"
              aria-invalid="true"
              value={tokenValue}
              onChange={(e) => setTokenValue(e.target.value)}
              aria-describedby="ig-invalid-action-err"
              className="font-mono text-xs"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                ref={actionButtonRef}
                type="button"
                variant="outline"
                size="xs"
                onClick={handleCopy}
                aria-label="Copy invalid token"
                className="gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <HaloIcon icon={copied ? Tick02Icon : Copy01Icon} size={13} />
                <span>{copied ? "Copied" : "Copy"}</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldError id="ig-invalid-action-err">
            The provided token signature does not match enterprise workspace authorization.
          </FieldError>
        </Field>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/30 border border-border text-xs text-muted-foreground">
        <HaloIcon icon={InformationCircleIcon} size={15} className="mt-0.5 shrink-0 text-foreground" />
        <p className="leading-relaxed">
          <strong>Architectural Verification:</strong> Notice that when you click{" "}
          <code className="text-foreground">Focus Action Button</code>, the outer group boundary
          remains unmistakably red (communicating the invalid field), while the active 2px keyboard
          focus ring is located specifically on the Copy button. Focus location is never ambiguous.
        </p>
      </div>
    </div>
  );
}
