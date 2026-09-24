type DependencyGroup = { title: string; items: string[] };

export function DependencyList({ groups }: { groups: DependencyGroup[] }) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {groups.map((group) => (
        <section key={group.title} className="rounded-lg border border-border p-4">
          <h3 data-toc-ignore className="mb-3 text-sm font-medium">{group.title}</h3>
          {group.items.length ? (
            <ul className="space-y-1.5">
              {group.items.map((item) => <li key={item}><code className="text-xs">{item}</code></li>)}
            </ul>
          ) : <p className="text-sm text-muted-foreground">None.</p>}
        </section>
      ))}
    </div>
  );
}
