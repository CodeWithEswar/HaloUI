import * as React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero-section";
import { PrinciplesSection } from "@/components/landing/principles-section";
import { RegistrySection } from "@/components/landing/registry-section";
import { ShowcaseSection } from "@/components/landing/showcase-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";

export const metadata: Metadata = {
  title: "HaloUI — Liquid-Glass Component Registry for React & Next.js",
  description:
    "A source-owned React component registry built around accessible liquid materials, thoughtful interaction, and the shadcn/ui ecosystem.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground">
      <HeroSection />
      <PrinciplesSection />
      <RegistrySection />
      <ShowcaseSection />
      <FinalCtaSection />
    </div>
  );
}
