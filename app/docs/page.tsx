import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export const metadata: Metadata = {
  title: "Documentation — HaloUI Liquid Component Registry",
  description:
    "Comprehensive guides on integrating HaloUI optical components, configuring shadcn registries, and tailoring material tokens.",
};

const DOCS_SECTIONS = [
  {
    title: "Liquid Optical Engine",
    href: "/docs/liquid-material",
    desc: "Understanding the 10-layer physical material system, directional lighting vectors, and GPU performance bounds.",
    badge: "Core Theory",
  },
  {
    title: "Registry Architecture",
    href: "/docs/registry",
    desc: "How HaloUI integrates natively with shadcn/ui. Distributing components via URL, namespace, and GitHub.",
    badge: "Distribution",
  },
  {
    title: "Button Vertical Slice",
    href: "/components/button",
    desc: "The reference implementation component: specification, interactive stage, props table, and accessibility.",
    badge: "Reference Component",
  },
];

export default function DocsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3 border-b border-black/[0.06] dark:border-white/[0.06] pb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
          Developer Documentation
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-white">
          HaloUI System Guides
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400 max-w-2xl font-normal leading-relaxed">
          HaloUI is a companion liquid-glass component registry designed to enhance projects built on Next.js, Tailwind CSS, and shadcn/ui.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {DOCS_SECTIONS.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.015] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-black/10 dark:border-white/10 text-stone-500 uppercase">
                {section.badge}
              </span>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                {section.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {section.desc}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-stone-600 dark:text-stone-400 group-hover:translate-x-1 transition-transform">
              <span>Read guide</span>
              <HaloIcon icon={ArrowRight01Icon} size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
