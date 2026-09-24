import { Badge } from "@/components/ui/badge";

export function ComponentStatus({ value }: { value: "Experimental" | "Preview" | "Stable" | "Deprecated" }) {
  return <Badge variant="outline" className="font-normal">{value}</Badge>;
}
