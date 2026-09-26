"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type GlassRegistration = {
  id: string;
  node: HTMLElement;
};

type HaloGlassContainerContextValue = {
  register: (entry: GlassRegistration) => () => void;
};

export const HaloGlassContainerContext =
  React.createContext<HaloGlassContainerContextValue | null>(null);

export interface HaloGlassContainerProps
  extends React.ComponentPropsWithoutRef<"div"> {
  spacing?: number;
  sharedLighting?: boolean;
}

/**
 * Coordinates nearby optical glass surfaces.
 *
 * Inspired by SwiftUI GlassEffectContainer semantics: children share an
 * environmental interaction region and receive proximity values that can be
 * used for attraction / bridge rendering without coupling component APIs.
 */
export const HaloGlassContainer = React.forwardRef<
  HTMLDivElement,
  HaloGlassContainerProps
>(function HaloGlassContainer(
  {
    className,
    spacing = 24,
    sharedLighting = true,
    children,
    onPointerMove,
    onPointerLeave,
    style,
    ...props
  },
  ref
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const surfaces = React.useRef(new Map<string, HTMLElement>());

  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const register = React.useCallback((entry: GlassRegistration) => {
    surfaces.current.set(entry.id, entry.node);
    return () => surfaces.current.delete(entry.id);
  }, []);

  const updateProximity = React.useCallback(() => {
    const entries = [...surfaces.current.values()];
    for (const node of entries) {
      const a = node.getBoundingClientRect();
      let nearest = Number.POSITIVE_INFINITY;
      for (const other of entries) {
        if (node === other) continue;
        const b = other.getBoundingClientRect();
        const dx = Math.max(b.left - a.right, a.left - b.right, 0);
        const dy = Math.max(b.top - a.bottom, a.top - b.bottom, 0);
        nearest = Math.min(nearest, Math.hypot(dx, dy));
      }
      const amount =
        nearest === Number.POSITIVE_INFINITY
          ? 0
          : Math.max(0, Math.min(1, 1 - nearest / Math.max(spacing, 1)));
      node.style.setProperty("--halo-glass-proximity", amount.toFixed(3));
      node.toggleAttribute("data-glass-near", amount > 0);
    }
  }, [spacing]);

  React.useLayoutEffect(() => {
    updateProximity();
    const observer = new ResizeObserver(updateProximity);
    if (rootRef.current) observer.observe(rootRef.current);
    for (const node of surfaces.current.values()) observer.observe(node);
    window.addEventListener("resize", updateProximity);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateProximity);
    };
  }, [updateProximity, children]);

  const value = React.useMemo(() => ({ register }), [register]);

  return (
    <HaloGlassContainerContext.Provider value={value}>
      <div
        ref={setRef}
        data-halo-glass-container=""
        className={cn("halo-glass-container", className)}
        style={{
          ...style,
          ["--halo-glass-container-spacing" as string]: `${spacing}px`,
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (!sharedLighting) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          event.currentTarget.style.setProperty("--halo-shared-light-x", `${x}%`);
          event.currentTarget.style.setProperty("--halo-shared-light-y", `${y}%`);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          event.currentTarget.style.removeProperty("--halo-shared-light-x");
          event.currentTarget.style.removeProperty("--halo-shared-light-y");
        }}
        {...props}
      >
        {children}
      </div>
    </HaloGlassContainerContext.Provider>
  );
});

HaloGlassContainer.displayName = "HaloGlassContainer";
