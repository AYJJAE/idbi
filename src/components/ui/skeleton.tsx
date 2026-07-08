import { cn } from "@/lib/utils"
import { tokens } from "@/design/tokens"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        tokens.radius.classes.card,
        "bg-muted/50 animate-pulse",
        "bg-[length:200%_100%] animate-[nexus-skeleton-shimmer_2s_ease-in-out_infinite]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
