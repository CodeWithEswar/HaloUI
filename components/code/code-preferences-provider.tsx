"use client";

import * as React from "react";

const STORAGE_KEY = "haloui:code-wrap";

type CodePreferences = {
  wrapCode: boolean;
  setWrapCode: (value: boolean) => void;
};

const CodePreferencesContext = React.createContext<CodePreferences | null>(null);

export function CodePreferencesProvider({ children }: { children: React.ReactNode }) {
  const [wrapCode, setWrapCodeState] = React.useState(false);

  React.useEffect(() => {
    setWrapCodeState(window.localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const setWrapCode = React.useCallback((value: boolean) => {
    setWrapCodeState(value);
    window.localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  const value = React.useMemo(() => ({ wrapCode, setWrapCode }), [wrapCode, setWrapCode]);
  return <CodePreferencesContext.Provider value={value}>{children}</CodePreferencesContext.Provider>;
}

export function useCodePreferences() {
  const context = React.useContext(CodePreferencesContext);
  if (!context) {
    throw new Error("useCodePreferences must be used inside CodePreferencesProvider");
  }
  return context;
}
