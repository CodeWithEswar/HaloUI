"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export type HaloTheme = "light" | "dark" | "system";
export type HaloMaterialIntensity = "subtle" | "balanced" | "rich";

export interface HaloThemeContextValue {
  theme: HaloTheme;
  setTheme: (theme: HaloTheme) => void;
  resolvedTheme: "light" | "dark";
  materialIntensity: HaloMaterialIntensity;
  setMaterialIntensity: (intensity: HaloMaterialIntensity) => void;
}

const HaloThemeContext = React.createContext<HaloThemeContextValue | undefined>(undefined);

export interface HaloThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: HaloTheme;
  defaultMaterialIntensity?: HaloMaterialIntensity;
  storageKey?: string;
  intensityStorageKey?: string;
  attribute?: React.ComponentProps<typeof NextThemesProvider>["attribute"];
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

function HaloThemeInnerProvider({
  children,
  defaultMaterialIntensity = "balanced",
  intensityStorageKey = "halo-material-intensity",
}: {
  children: React.ReactNode;
  defaultMaterialIntensity?: HaloMaterialIntensity;
  intensityStorageKey?: string;
}) {
  const nextThemes = useTheme();
  const [materialIntensity, setMaterialIntensityState] =
    React.useState<HaloMaterialIntensity>(defaultMaterialIntensity);
  const [mounted, setMounted] = React.useState(false);

  // Sync intensity with localStorage
  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(intensityStorageKey);
      if (stored === "subtle" || stored === "balanced" || stored === "rich") {
        setMaterialIntensityState(stored);
      }
    } catch {
      // Ignore localStorage errors (e.g. iframe / disabled cookies)
    }
  }, [intensityStorageKey]);

  const setMaterialIntensity = React.useCallback(
    (intensity: HaloMaterialIntensity) => {
      setMaterialIntensityState(intensity);
      try {
        localStorage.setItem(intensityStorageKey, intensity);
      } catch {
        // Ignore localStorage errors
      }
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-material-intensity", intensity);
      }
    },
    [intensityStorageKey]
  );

  React.useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.setAttribute("data-material-intensity", materialIntensity);
    }
  }, [materialIntensity, mounted]);

  const value = React.useMemo<HaloThemeContextValue>(() => {
    const rawTheme = (nextThemes.theme as HaloTheme) || "system";
    const resolved = (nextThemes.resolvedTheme as "light" | "dark") || "dark";
    return {
      theme: rawTheme,
      setTheme: (t: HaloTheme) => nextThemes.setTheme(t),
      resolvedTheme: resolved,
      materialIntensity,
      setMaterialIntensity,
    };
  }, [nextThemes.theme, nextThemes.resolvedTheme, nextThemes.setTheme, materialIntensity, setMaterialIntensity]);

  return <HaloThemeContext.Provider value={value}>{children}</HaloThemeContext.Provider>;
}

/**
 * HaloThemeProvider
 * Central orchestration for Light/Dark/System visual themes and
 * HaloUI physical material intensities (subtle, balanced, rich).
 */
export function HaloThemeProvider({
  children,
  defaultTheme = "system",
  defaultMaterialIntensity = "balanced",
  storageKey = "halo-theme",
  intensityStorageKey = "halo-material-intensity",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
}: HaloThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      <HaloThemeInnerProvider
        defaultMaterialIntensity={defaultMaterialIntensity}
        intensityStorageKey={intensityStorageKey}
      >
        {children}
      </HaloThemeInnerProvider>
    </NextThemesProvider>
  );
}

/**
 * useHaloTheme
 * Access current visual theme and material intensity state anywhere in the application.
 */
export function useHaloTheme(): HaloThemeContextValue {
  const context = React.useContext(HaloThemeContext);
  if (!context) {
    // Graceful fallback if rendered outside provider
    return {
      theme: "system",
      setTheme: () => {},
      resolvedTheme: "dark",
      materialIntensity: "balanced",
      setMaterialIntensity: () => {},
    };
  }
  return context;
}
