import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { tokens } from "@/design/tokens"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all duration-200 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: cn(tokens.gradients.classes.primary, "border-transparent [a]:hover:opacity-90"),
        secondary:
          "bg-secondary text-secondary-foreground border-transparent [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive border-transparent focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border/50 text-foreground backdrop-blur-sm [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        glass:
          cn(tokens.glass.classes.subtle, "border-border/20 text-foreground shadow-sm"),
        ghost:
          "border-transparent hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
      },
      radius: {
        default: tokens.radius.classes.badge,
        sm: "rounded-md",
      }
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  radius = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, radius }), className),
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
