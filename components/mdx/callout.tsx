import * as React from "react";
import { AlertCircleIcon, InformationCircleIcon, SparklesIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

const callouts = {
  note: { label: "Note", icon: InformationCircleIcon },
  tip: { label: "Tip", icon: SparklesIcon },
  important: { label: "Important", icon: InformationCircleIcon },
  warning: { label: "Warning", icon: AlertCircleIcon },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof callouts;
  title?: string;
  children: React.ReactNode;
}) {
  const config = callouts[type];
  return (
    <aside
      className={cn(
        "my-6 rounded-lg border border-border bg-muted/35 px-4 py-3 text-sm",
        type === "warning" && "border-destructive/35 bg-destructive/5",
      )}
    >
      <div className="mb-1 flex items-center gap-2 font-medium text-foreground">
        <HaloIcon icon={config.icon} size={16} />
        {title ?? config.label}
      </div>
      <div className="text-muted-foreground [&>p]:m-0">{children}</div>
    </aside>
  );
}
