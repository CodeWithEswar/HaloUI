import * as React from "react";

const PRINCIPLES = [
  {
    num: "01",
    title: "Source-owned",
    desc: "Install the source directly into your application. Read it, modify it, and make it yours.",
  },
  {
    num: "02",
    title: "Accessible by default",
    desc: "Interaction and semantics come before visual effects.",
  },
  {
    num: "03",
    title: "Material, not decoration",
    desc: "Glass is treated as a coherent material system, not a backdrop-blur utility.",
  },
  {
    num: "04",
    title: "Built for composition",
    desc: "Build complete interfaces from predictable, interoperable components.",
  },
];

export function PrinciplesSection() {
  return (
    <section className="w-full border-t border-border py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            A component registry, <br />
            not another UI dependency.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Install the source into your application. Read it. Change it. Own it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {PRINCIPLES.map((item) => (
            <div
              key={item.num}
              className="bg-background p-6 sm:p-8 flex flex-col justify-between space-y-4"
            >
              <div className="text-xs font-mono text-muted-foreground font-semibold">
                {item.num}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
