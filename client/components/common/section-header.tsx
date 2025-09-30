"use client"

import type React from "react"

import { motion } from "framer-motion"
import { TextReveal } from "@/components/animations/text-reveal"
import { useLanguage } from "@/lib/language-context"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  badge?: {
    icon?: React.ReactNode
    text: string
  }
  className?: string
  titleClassName?: string
  centered?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  description,
  badge,
  className = "",
  titleClassName = "",
  centered = true,
}: SectionHeaderProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`mb-16 ${centered ? "text-center" : ""} ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
          {badge.icon}
          <span className="text-green-400 text-sm font-medium">{badge.text}</span>
        </div>
      )}

      <TextReveal>
        <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 ${titleClassName}`}>
          {subtitle && <span className="text-green-500">{subtitle} </span>}
          {title}
        </h2>
      </TextReveal>

      {description && <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{description}</p>}
    </motion.div>
  )
}
