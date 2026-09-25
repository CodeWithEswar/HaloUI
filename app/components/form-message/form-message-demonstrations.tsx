"use client";

import * as React from "react";
import { FormMessage } from "@/components/ui/form-message";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";

export function FormMessageDemonstrations() {
  return (
    <div className="space-y-12">
      {/* 1. All Four Semantic Message Tones */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Semantic Tone Taxonomy</h3>
          <p className="text-sm text-muted-foreground">
            Form Message communicates focused feedback without overriding persistent field descriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-2xl border border-border/80 bg-muted/20">
          <div className="p-4 rounded-xl border border-border/60 bg-background/80 space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-destructive">Error</span>
            <FormMessage type="error">
              Password must contain at least 8 characters and one symbol.
            </FormMessage>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-background/80 space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Success</span>
            <FormMessage type="success">
              Domain configuration verified and SSL active.
            </FormMessage>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-background/80 space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Warning</span>
            <FormMessage type="warning">
              Rate limit threshold reached 80% of hourly allowance.
            </FormMessage>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-background/80 space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Info</span>
            <FormMessage type="info">
              Team members will receive an invite email immediately.
            </FormMessage>
          </div>
        </div>
      </section>

      {/* 2. Composition with Native Select and Input */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Field Control Compositions</h3>
          <p className="text-sm text-muted-foreground">
            Form Message integrates with standard text inputs, selects, and controls with stable accessible relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border border-border/80 bg-muted/20">
          {/* Composed with Input */}
          <Field id="account-subdomain" invalid>
            <FieldLabel className="font-semibold text-sm">Account Subdomain</FieldLabel>
            <FieldDescription>Choose your unique workspace slug.</FieldDescription>
            <div className="pt-1 pb-2">
              <Input defaultValue="api-gateway" aria-label="Account Subdomain" />
            </div>
            <FormMessage type="error">
              This subdomain is already claimed. Try <a href="#suggest">api-gateway-us</a> instead.
            </FormMessage>
          </Field>

          {/* Composed with Native Select */}
          <Field id="billing-region">
            <FieldLabel className="font-semibold text-sm">Primary Compute Region</FieldLabel>
            <FieldDescription>Geographic zone for container deployments.</FieldDescription>
            <div className="pt-1 pb-2">
              <NativeSelect defaultValue="iad">
                <option value="iad">US East (N. Virginia)</option>
                <option value="sfo">US West (Oregon)</option>
                <option value="fra">EU Central (Frankfurt)</option>
              </NativeSelect>
            </div>
            <FormMessage type="warning">
              Cross-region replication latencies may increase by up to 45ms.
            </FormMessage>
          </Field>
        </div>
      </section>
    </div>
  );
}
