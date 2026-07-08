import * as React from "react"

import { cn } from "@/lib/utils"

import { tokens } from "@/design/tokens"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/50 selection:bg-primary/15 selection:text-primary-foreground",
        "flex w-full min-w-0 bg-background/60 backdrop-blur-sm px-3 py-1 text-sm",
        "border border-border/40 shadow-sm",
        "transition-all duration-200 outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:opacity-50 md:text-sm",
        "focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-primary/10",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "dark:border-border/30 dark:bg-card/40 dark:focus-visible:border-primary/40 dark:focus-visible:ring-primary/15",
        tokens.radius.classes.input,
        "h-10", // Updated to 40px height as per standard inputs
        className
      )}
      {...props}
    />
  )
}

export { Input }
