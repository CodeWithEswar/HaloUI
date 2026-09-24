type KeyboardRow = { keys: string[]; action: string };

export function KeyboardTable({ rows }: { rows: KeyboardRow[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/60 text-xs text-muted-foreground">
          <tr><th className="px-4 py-3 font-medium">Key</th><th className="px-4 py-3 font-medium">Action</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.keys.join("+")}>
              <td className="px-4 py-3">{row.keys.map((key) => <kbd key={key} className="mr-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">{key}</kbd>)}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
