import { cn } from "@/lib/utils"
import React from "react"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-light-700 dark:bg-dark-400", className)}
      {...props}
    />
  )
}

export { Skeleton }
