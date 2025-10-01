"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  [key: string]: any
}

export function MagneticButton({ children, className = "", strength = 0.3, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = (clientX - left - width / 2) * strength
    const y = (clientY - top - height / 2) * strength

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Button ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
        <motion.span
          className="relative z-10"
          animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {children}
        </motion.span>
      </Button>
    </motion.div>
  )
}
