import * as React from "react"
import type { Metadata } from "next"
import { HeroSection } from "@/components/landing/hero-section"
import { PrinciplesSection } from "@/components/landing/principles-section"
import { FinalCtaSection } from "@/components/landing/final-cta-section"

import styles from "@/components/landing/universe.module.css"

export const metadata: Metadata = {
  title: "HaloUI — Liquid-Glass Component Registry for React & Next.js",
  description:
    "A source-owned React component registry built around accessible liquid materials, thoughtful interaction, and the shadcn/ui ecosystem.",
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <PrinciplesSection />
      <FinalCtaSection />
    </div>
  )
}
