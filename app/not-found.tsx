import Link from "next/link";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-2xl flex-col justify-center px-6 py-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">404 / Not found</p>
      <h1 className="text-3xl font-semibold tracking-tight">This documentation route does not exist.</h1>
      <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
        The guide, preview, component, or registry item may have moved or may not be published yet.
      </p>
      <Link href="/docs" className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium underline underline-offset-4">
        <HaloIcon icon={ArrowLeft01Icon} size={15} /> Back to documentation
      </Link>
    </main>
  );
}
