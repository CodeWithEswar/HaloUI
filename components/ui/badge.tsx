import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "border border-primary/20 dark:border-white/18 bg-primary/90 text-primary-foreground backdrop-blur-sm backdrop-saturate-150 shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.25)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.18)] [a]:hover:bg-primary/95",
        secondary:
          "border border-black/[0.06] dark:border-white/10 bg-secondary/80 dark:bg-white/[0.08] text-secondary-foreground backdrop-blur-sm backdrop-saturate-150 shadow-[0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] [a]:hover:bg-secondary/95 dark:[a]:hover:bg-white/[0.12]",
        destructive:
          "border border-destructive/25 dark:border-destructive/35 bg-destructive/15 dark:bg-destructive/25 text-destructive backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.2)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/25 dark:[a]:hover:bg-destructive/35",
        outline:
          "border border-border/80 dark:border-white/15 bg-background/50 dark:bg-white/[0.04] text-foreground backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] [a]:hover:bg-muted/70 dark:[a]:hover:bg-white/[0.08]",
        glass:
          "border border-black/10 dark:border-white/20 bg-white/60 dark:bg-white/[0.1] text-foreground backdrop-blur-md backdrop-saturate-180 shadow-[0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.16)] [a]:hover:bg-white/80 dark:[a]:hover:bg-white/[0.15]",
        ghost:
          "hover:bg-muted/60 hover:text-foreground dark:hover:bg-white/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeProps = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
