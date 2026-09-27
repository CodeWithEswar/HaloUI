"use client"

import { useEffect, useRef } from "react"
import styles from "./universe.module.css"

/** Decorative geometry only; all navigation and copy remain in the DOM. */
export function HaloUniverse() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = host.current
    if (!element) return
    let disposed = false
    let cleanup = () => {}
    void import("./universe-renderer")
      .then(({ mountUniverse }) => {
        if (!disposed) cleanup = mountUniverse(element)
      })
      .catch(() => {
        /* The static planet remains visible if WebGL cannot load. */
      })
    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <div ref={host} className={styles.canvas} aria-hidden="true">
      <div className={styles.fallback}>
        <div />
      </div>
    </div>
  )
}
