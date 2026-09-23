import * as React from "react";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

const BENEFITS = [
  "No runtime lock-in",
  "Readable, idiomatic source",
  "Fully editable components",
  "Explicit dependencies declared",
  "Predictable CLI installation",
];

export function RegistrySection() {
  return (
    <section className="w-full border-t border-border py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Install the source. <br />
            Keep the source.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Add only the components you need through a shadcn-compatible registry. The installed files live directly inside your application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Terminal / Code Presentation Block */}
          <div className="lg:col-span-7 rounded-lg border border-border bg-muted/40 overflow-hidden font-mono text-xs">
            <div className="px-4 py-2.5 border-b border-border bg-muted/60 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
              <span className="ml-2 text-[11px] text-muted-foreground">Terminal</span>
            </div>
            <div className="p-5 space-y-2 text-foreground">
              <div className="text-muted-foreground">
                <span className="text-foreground">$</span> pnpm dlx shadcn@latest add https://haloui.dev/r/button.json
              </div>
              <div className="text-muted-foreground pt-1">
                ✓ Resolving registry item: <span className="text-foreground">button</span>
              </div>
              <div className="text-muted-foreground">
                ✓ Installing dependencies: <span className="text-foreground">@hugeicons/react, @radix-ui/react-slot</span>
              </div>
              <div className="text-muted-foreground">
                ✓ Writing component: <span className="text-foreground">components/ui/halo-button.tsx</span>
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-medium pt-2">
                Component successfully added to your project.
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
              Why Registry Distribution
            </h3>
            <ul className="space-y-3 text-sm">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-foreground">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    <HaloIcon icon={CheckmarkCircle01Icon} size={16} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
