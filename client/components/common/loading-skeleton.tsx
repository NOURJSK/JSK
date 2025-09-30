import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  variant?: "default" | "card" | "text" | "avatar" | "button"
}

export function LoadingSkeleton({ className, variant = "default" }: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-700/50 rounded"

  const variants = {
    default: "h-4 w-full",
    card: "h-48 w-full",
    text: "h-4 w-3/4",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24",
  }

  return <div className={cn(baseClasses, variants[variant], className)} />
}

export function LoadingSkeletonGroup({
  count = 3,
  variant = "default",
  className,
}: {
  count?: number
  variant?: LoadingSkeletonProps["variant"]
  className?: string
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} variant={variant} />
      ))}
    </div>
  )
}
