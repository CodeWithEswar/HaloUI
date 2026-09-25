export type PropRow = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
};

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="sticky top-0 border-b border-border bg-muted/60 text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="px-4 py-3 align-top font-mono text-xs font-medium">
                {row.name}{row.required && <span className="text-destructive"> *</span>}
              </td>
              <td className="px-4 py-3 align-top"><code>{row.type}</code></td>
              <td className="px-4 py-3 align-top"><code>{row.default ?? "—"}</code></td>
              <td className="max-w-sm px-4 py-3 align-top text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
