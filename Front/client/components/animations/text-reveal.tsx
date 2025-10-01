"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
}

export function TextReveal({ children, className = "", delay = 0, duration = 0.8, direction = "up" }: TextRevealProps) {
  const directions = {
    up: { y: 100 },
    down: { y: -100 },
    left: { x: 100 },
    right: { x: -100 },
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, ...directions[direction] }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.05,
}: {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}) {
  const words = text.split(" ")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const wordVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-2" variants={wordVariants}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
