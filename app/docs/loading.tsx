import { AppLogo } from "@/components/brand/app-logo";

export default function DocsLoading() {
  return (
    <div className="grid min-h-[22rem] place-items-center" role="status" aria-label="Preparing documentation">
      <div className="flex flex-col items-center gap-3 text-center">
        <AppLogo size="lg" loop />
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-foreground">Preparing documentation</p>
          <p className="text-xs text-muted-foreground">Assembling the interface</p>
        </div>
      </div>
    </div>
  );
}
