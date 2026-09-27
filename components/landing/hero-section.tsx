import Link from "next/link"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HaloIcon } from "@/components/icons/halo-icon"
import { HaloUniverse } from "./halo-universe"
import styles from "./universe.module.css"

const satellites = [
  { name: "Button", slug: "button", kind: "Actions" },
  { name: "Tabs", slug: "tabs", kind: "Navigation" },
  { name: "Card", slug: "card", kind: "Surfaces" },
  { name: "Dialog", slug: "dialog", kind: "Overlays" },
  { name: "Input", slug: "input", kind: "Forms" },
  { name: "Switch", slug: "switch", kind: "Controls" },
]

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="sr-only">
        HaloUI — a universe of components
      </h1>
      <div className={styles.universe}>
        <HaloUniverse />
        <div className={styles.planetTitle} aria-hidden="true">
          <span className={styles.titleOverline}>THE COMPONENT UNIVERSE</span>
          <strong>HaloUI</strong>
          <span>DESIGNED TO BELONG TOGETHER</span>
        </div>
        <nav aria-label="Explore component planets" className={styles.orbits}>
          {satellites.map(({ name, slug, kind }, i) => (
            <Link
              key={slug}
              href={`/components/${slug}`}
              data-planet={i}
              className={`${styles.node} ${styles[`node${i}`]}`}
              aria-label={`Explore ${name} component`}
            >
              <span className={styles.planetFallback} aria-hidden="true" />
              <span className={styles.targetRing} aria-hidden="true" />
              <span className={styles.planetLabel}>
                <span>{name}</span>
                <small>{kind}</small>
              </span>
            </Link>
          ))}
        </nav>
        <div className={styles.coordinates} aria-hidden="true">
          01 — 06<span>A SHARED GRAVITATIONAL FIELD</span>
        </div>
      </div>
      <div className={styles.actions}>
        <Link href="/docs" className={styles.primary}>
          Get Started <HaloIcon icon={ArrowRight01Icon} size={16} />
        </Link>
        <Link href="/components" className={styles.secondary}>
          Explore the collection
        </Link>
      </div>
      <p className={styles.caption}>SIX WORLDS. ONE MATERIAL LANGUAGE.</p>
    </section>
  )
}
