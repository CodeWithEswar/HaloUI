export type AnatomyPart = { name: string; selector?: string; description: string };

export function Anatomy({ parts }: { parts: AnatomyPart[] }) {
  return (
    <ol className="my-6 grid gap-3 sm:grid-cols-2">
      {parts.map((part, index) => (
        <li key={part.name} className="rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">{index + 1}</span>
            <span className="text-sm font-medium">{part.name}</span>
          </div>
          {part.selector && <code className="text-xs">{part.selector}</code>}
          <p className="mt-2 text-sm text-muted-foreground">{part.description}</p>
        </li>
      ))}
    </ol>
  );
}
