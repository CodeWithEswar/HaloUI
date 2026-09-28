import Link from "next/link"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HaloIcon } from "@/components/icons/halo-icon"
import styles from "./journey.module.css"

export function FinalCtaSection() {
  return (
    <section
      data-journey-finale
      className={styles.finale}
      aria-labelledby="finale-heading"
    >
      <div className={styles.finaleContent}>
        <p className={styles.kicker}>02 / YOUR NEXT INTERFACE</p>
        <h2 id="finale-heading">
          Make space
          <br />
          for <em>better.</em>
        </h2>
        <p>
          Explore the components, learn the material system, and take only the
          source you need. Your next interface starts here.
        </p>
        <div className={styles.actions}>
          <Link href="/docs" className={styles.primary}>
            Get Started <HaloIcon icon={ArrowRight01Icon} size={18} />
          </Link>
          <Link href="/components" className={styles.secondary}>
            Explore Components
          </Link>
        </div>
      </div>
      <div className={styles.finaleMark} aria-hidden="true">
        HALO / INFINITE POSSIBILITY
      </div>
    </section>
  )
}
