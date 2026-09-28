"use client"

import { useEffect, useRef } from "react"
import styles from "./journey.module.css"

/** One decorative canvas shared by the sections after the hero. */
export function JourneyCanvas() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = host.current
    if (!element) return
    let disposed = false
    let cleanup = () => {}
    void import("./journey-renderer")
      .then(({ mountJourney }) => {
        if (!disposed) cleanup = mountJourney(element)
      })
      .catch(() => {
        /* Editorial content remains usable when WebGL is unavailable. */
      })
    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return <div ref={host} className={styles.canvas} aria-hidden="true" />
}
