"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloGlassContainerContext } from "./halo-glass-container";

export type HaloOpticalMaterial = "regular" | "clear" | "prominent";
export type HaloOpticalShape = "rounded" | "capsule" | "circle";

export interface HaloOpticalGlassProps
  extends React.ComponentPropsWithoutRef<"div"> {
  material?: HaloOpticalMaterial;
  shape?: HaloOpticalShape;
  interactive?: boolean;
  lensStrength?: "subtle" | "balanced" | "rich";
  children?: React.ReactNode;
}

/**
 * HaloOpticalGlass
 *
 * Progressive optical surface for controls that need more depth than the
 * canonical CSS material. It keeps content undistorted while rendering
 * meniscus, lens, caustic and specular layers behind it.
 *
 * This is intentionally renderer-safe: browsers cannot sample arbitrary DOM
 * pixels into a shader. The primitive therefore uses native backdrop
 * compositing plus geometry-aware optical layers and pointer-driven lens
 * coordinates. It can later host a WebGL/WebGPU renderer without changing the
 * public component contract.
 */
export const HaloOpticalGlass = React.forwardRef<
  HTMLDivElement,
  HaloOpticalGlassProps
>(function HaloOpticalGlass(
  {
    className,
    material = "regular",
    shape = "rounded",
    interactive = true,
    lensStrength = "balanced",
    children,
    onPointerMove,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    ...props
  },
  forwardedRef
) {
  const localRef = React.useRef<HTMLDivElement | null>(null);
  const glassContainer = React.useContext(HaloGlassContainerContext);
  const glassId = React.useId();

  React.useLayoutEffect(() => {
    const node = localRef.current;
    if (!node || !glassContainer) return;
    return glassContainer.register({ id: glassId, node });
  }, [glassContainer, glassId]);

  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef]
  );

  const updatePointer = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);
      if (!interactive) return;
      const node = localRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      node.style.setProperty("--halo-optical-x", `${(x * 100).toFixed(2)}%`);
      node.style.setProperty("--halo-optical-y", `${(y * 100).toFixed(2)}%`);
      node.style.setProperty("--halo-optical-nx", (x * 2 - 1).toFixed(3));
      node.style.setProperty("--halo-optical-ny", (y * 2 - 1).toFixed(3));
    },
    [interactive, onPointerMove]
  );

  const resetPointer = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(event);
      const node = localRef.current;
      if (!node) return;
      node.style.removeProperty("--halo-optical-x");
      node.style.removeProperty("--halo-optical-y");
      node.style.removeProperty("--halo-optical-nx");
      node.style.removeProperty("--halo-optical-ny");
      node.removeAttribute("data-pressed");
    },
    [onPointerLeave]
  );

  return (
    <div
      ref={setRef}
      data-halo-optical-glass=""
      data-material={material}
      data-shape={shape}
      data-lens={lensStrength}
      data-interactive={interactive || undefined}
      className={cn("halo-optical-glass", className)}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (interactive) event.currentTarget.setAttribute("data-pressed", "");
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        event.currentTarget.removeAttribute("data-pressed");
      }}
      {...props}
    >
      <span className="halo-optical-glass__bridge" aria-hidden="true" />
      <span className="halo-optical-glass__lens" aria-hidden="true" />
      <span className="halo-optical-glass__meniscus" aria-hidden="true" />
      <span className="halo-optical-glass__caustic" aria-hidden="true" />
      <span className="halo-optical-glass__specular" aria-hidden="true" />
      <div className="halo-optical-glass__content">{children}</div>
    </div>
  );
});

HaloOpticalGlass.displayName = "HaloOpticalGlass";
