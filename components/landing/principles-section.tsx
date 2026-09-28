import Link from "next/link"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HaloIcon } from "@/components/icons/halo-icon"
import styles from "./journey.module.css"

const principles = [
  {
    num: "01",
    title: "Source-owned",
    description:
      "Install the source in your repository. Read every layer, change every detail, make it yours.",
  },
  {
    num: "02",
    title: "Accessible by default",
    description:
      "Keyboard, semantics, and clear state come before visual effects.",
  },
  {
    num: "03",
    title: "Material with purpose",
    description:
      "Optical depth follows one shared light system, tuned to each component’s role.",
  },
  {
    num: "04",
    title: "Built to compose",
    description:
      "Independent primitives move together as one coherent interface language.",
  },
]

export function PrinciplesSection() {
  return (
    <section
      id="system"
      className={styles.principles}
      aria-labelledby="principles-heading"
    >
      <div className={styles.intro}>
        <p className={styles.kicker}>01 / THE SYSTEM</p>
        <h2 id="principles-heading">
          The source is
          <br />
          <em>your universe.</em>
        </h2>
        <p className={styles.introCopy}>
          HaloUI brings its material, motion, and accessible interaction into
          your codebase. Each part stands on its own. Together, they form a
          complete system.
        </p>
        <Link href="/docs/registry" className={styles.textLink}>
          How source ownership works{" "}
          <HaloIcon icon={ArrowRight01Icon} size={17} />
        </Link>
      </div>
      <div className={styles.principleList}>
        {principles.map((principle) => (
          <article className={styles.principle} key={principle.num}>
            <span className={styles.number}>{principle.num}</span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.sectionEnd}>DESIGNED AS ONE. OWNED BY YOU.</p>
    </section>
  )
}
