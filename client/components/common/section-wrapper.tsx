"use client"

import type { ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  animate?: boolean
  delay?: number
}

export function SectionWrapper({ children, className, id, animate = true, delay = 0 }: SectionWrapperProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative",
        animate && "transition-all duration-1000 ease-out",
        animate && !isIntersecting && "opacity-0 translate-y-8",
        animate && isIntersecting && "opacity-100 translate-y-0",
        className,
      )}
      style={animate ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </section>
  )
}
