"use client"

import type React from "react"

import { motion } from "framer-motion"
import { HoverEffects } from "@/components/animations/hover-effects"
import { cn } from "@/lib/utils"

interface CardWrapperProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: "scale" | "glow" | "tilt" | "lift" | "none"
  withAnimation?: boolean
  delay?: number
}

export function CardWrapper({
  children,
  className = "",
  hoverEffect = "lift",
  withAnimation = true,
  delay = 0,
}: CardWrapperProps) {
  const cardContent = (
    <div
      className={cn(
        "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden",
        "hover:border-green-500/50 transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  )

  const animatedContent = withAnimation ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {cardContent}
    </motion.div>
  ) : (
    cardContent
  )

  return hoverEffect !== "none" ? <HoverEffects type={hoverEffect}>{animatedContent}</HoverEffects> : animatedContent
}
